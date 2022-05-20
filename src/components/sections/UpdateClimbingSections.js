import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography} from '@mui/material'

function UpdateClimbingSections() {
  const urlParams = useParams();
  const gymId = urlParams.id;
  const [gym, setGym] = useState({});

  useEffect(() => {
    const getInfo = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_PATH}/gymWithSections/${gymId}`);

      setGym(data);
    };

    getInfo();
  }, [gymId]);

  const handleChange = (event, sectionType, gymId) => {
    const updatedSectionList = [...gym[sectionType]];
    const updatedSectionId = parseInt(gymId) - 1;

    updatedSectionList[updatedSectionId] = {
      ...updatedSectionList[updatedSectionId],
      name: event.target.value,
    };

    setGym({
      ...gym,
      [sectionType]: updatedSectionList,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const type = event.target.name;
    const sectionToUpdate = type === 'Boulder'
      ? gym.boulderSections
      : gym.routeSections;

    await axios.post(`${process.env.REACT_APP_API_PATH}/update${type}SectionNames`, { gymId, sectionToUpdate });
  };

  const addNewSection = (event, sectionType) => {
    const newSectionId = gym[sectionType].length + 1;
    const updatedGym = { ...gym };

    updatedGym[sectionType] = [
      ...updatedGym[sectionType],
      {
        id: newSectionId,
        gymId: gym.id,
        name: '',
      },
    ];

    setGym(updatedGym);
  };

  const renderSectionForm = (sections, type) => sections.map(section => (
    <Box key={`${type}-section-${section.id}`}>
      <TextField
        label="Name"
        variant="outlined"
        onChange={(event) => { handleChange(event, `${type}Sections`, section.id) }}
        value={section.name !== null ? section.name : ''}
        placeholder="Enter section name..."
      />
    </Box>
  ));

  return (
    <Container maxWidth="lg" sx={{ bgcolor: theme => theme.palette.primary.main, mt: 12, mb: 6, minHeight: '40rem', borderRadius: '8px', p: 3}}>
      <Typography variant="h2" className="centered-text" sx={{ color: theme => theme.palette.common.white, mb: 2, }}>{gym.name}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', bgcolor: theme => theme.palette.common.white, p: 2 }}>
        <Container className="centered-text">
          <Typography variant="h3" sx={{ mb: 2, }}>Ropes</Typography>
          <Box className="section-details" id="route-sections">
            {
              gym.routeSections
                ? renderSectionForm(gym.routeSections, 'route')
                : (<h2>No Route Sections Found.</h2>)
            }
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Button variant="contained" type="button" onClick={(event) => { addNewSection(event, 'routeSections') }} sx={{ mr: '0.75rem', mt: '1rem', }}>Add New Section</Button>
            <Button variant="contained" name="Route" onClick={handleSubmit} type="submit" sx={{ mt: '1rem', }}>Save Info</Button>
          </Box>
        </Container>

        <Container className="centered-text">
          <Typography variant="h3" sx={{ mb: 2, }}>Boulders</Typography>
          <Box className="section-details" id="boulder-sections">
            {
              gym.boulderSections
                ? renderSectionForm(gym.boulderSections, 'boulder')
                : (<h2>No Boulder Sections Found.</h2>)
            }
          </Box>
          <Box className="centered-text">
            <Button variant="contained" onClick={(event) => { addNewSection(event, 'boulderSections') }} sx={{ mr: '0.75rem', mt: '1rem', }}>Add New Section</Button>
            <Button variant="contained" name="Boulder" onClick={handleSubmit} type="submit" sx={{ mt: '1rem', }}>Save Info</Button>
          </Box>
        </Container>
      </Box>
    </Container>
  );
}

export default UpdateClimbingSections;

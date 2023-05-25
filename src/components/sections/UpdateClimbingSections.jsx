import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Container, Typography} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import SectionForm from './components/SectionForm';
import { useGetGymWithSectionsQuery, useUpdateSectionsMutation } from '../../services/gym';

const UpdateClimbingSections = () => {
  const urlParams = useParams();
  const gymId = urlParams.id;
  const [gym, setGym] = useState({});
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const {data} = useGetGymWithSectionsQuery(gymId);

  const [
    updateSections,
    // @TODO: set up loading and error handling
    {isLoading, isUpdating}
  ] = useUpdateSectionsMutation();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const snackBarAction = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  )
  
  useEffect(() => {
    const getInfo = async () => {
      setGym(data);
    };

    getInfo();
  }, [data]);

  const handleChange = (event, sectionType, sectionId) => {
    const updatedSectionList = [...gym[sectionType]];
    const updatedSectionId = parseInt(sectionId) - 1;

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
      ? gym?.boulderSections
      : gym?.routeSections;

    try {
      await updateSections({type, sectionToUpdate})

      setOpen(true)
      setSnackbarMessage('The sections info has been saved!')
    } catch {
      setOpen(true)
      setSnackbarMessage('Oops! Looks like something went wrong. Please Try again.')
    }
  };

  const addNewSection = (event, sectionType) => {
    const newSectionId = gym[sectionType].length + 1;
    const updatedGym = { ...gym };

    updatedGym[sectionType] = [
      ...updatedGym[sectionType],
      {
        id: newSectionId,
        gymId: gym?.id,
        name: '',
      },
    ];

    setGym(updatedGym);
  };


  return (
    <Container maxWidth="lg" sx={{ bgcolor: theme => theme.palette.primary.main, mt: 12, mb: 6, minHeight: '40rem', borderRadius: '8px', p: 3}}>
      <Typography variant="h2" className="centered-text" sx={{ color: theme => theme.palette.common.white, mb: 2, }}>{gym?.name}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', bgcolor: theme => theme.palette.common.white, p: 2 }}>
        <Container className="centered-text">
          <Typography variant="h3" sx={{ mb: 2, }}>Ropes</Typography>
          <Box className="section-details" id="route-sections">
            {
              gym?.routeSections
                ? SectionForm(gym?.routeSections, 'route', handleChange)
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
              gym?.boulderSections
                ? SectionForm(gym?.boulderSections, 'boulder', handleChange)
                : (<h2>No Boulder Sections Found.</h2>)
            }
          </Box>
          <Box className="centered-text">
            <Button variant="contained" onClick={(event) => { addNewSection(event, 'boulderSections') }} sx={{ mr: '0.75rem', mt: '1rem', }}>Add New Section</Button>
            <Button variant="contained" name="Boulder" onClick={handleSubmit} type="submit" sx={{ mt: '1rem', }}>Save Info</Button>
          </Box>
        </Container>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        message={snackbarMessage}
        onClose={handleClose}
        action={snackBarAction}
        sx={{ bottom: {xs: 16 } }}
      />
    </Container>
  );
}

export default UpdateClimbingSections;

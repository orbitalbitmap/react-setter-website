import { Box, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// @TODO: remove props?
function DistributionEditForm(props) {
  const urlParams = useParams();
  const [distributionSpread, setDistributionSpread] = useState({});
  const [gymId, setGymId] = useState(0);
  const [gym, setGym] = useState('')

  useEffect(() => {
    const getInfo = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_PATH}/${props.path}/${urlParams.id}`);
      const { gymId, gym, ...rest } = data;
      
      setDistributionSpread(rest);
      setGym(gym)
      setGymId(gymId);
    };

    getInfo();
  }, [urlParams, props.path]);

  const handleChange = (event) => {
    const newSpread = {
      ...distributionSpread,
      [event.target.name]: parseInt(event.target.value) || 0,
    };
    setDistributionSpread(newSpread);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post(`${process.env.REACT_APP_API_PATH}/saveDistribution/${props.type}`, { gymId, distributionSpread });
  };

  return (
    <Box sx={{ mt: 12, mx: 'auto', width: '40rem' }}>
      <Typography variant="h2" sx={{ textAlign: 'center', }}>{`${gym?.name}'s ${props?.type}`}</Typography>
      <form id="distribution-form" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', padding: '1rem', width: '30rem' }}>
        {
          Object.keys(distributionSpread).map((grade) => {
            const displayedGrade = props.type === 'routes'
              ? grade.replace('_', '.')
              : grade;
            const numberOfGrade = distributionSpread[grade];
            return (
              <Box key={grade} sx={{ display: 'flex', flexDirection: 'column', m: 3, width: '4rem', }}>
                <InputLabel sx={{ textAlign: 'center', }}>{displayedGrade}</InputLabel>
                <TextField
                  onChange={handleChange}
                  className="centered-text"
                  name={grade}
                  value={numberOfGrade}
                  InputProps={{
                    sx: { width: '4rem', }
                  }}
                />
              </Box>
            );
          })
        }

        <button onClick={handleSubmit} type="submit">Save Distribution</button>
      </form>
    </Box>
  );
}

export default DistributionEditForm;

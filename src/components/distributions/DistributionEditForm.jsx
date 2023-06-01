import { Box, InputLabel, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetDistributionEditFormDataQuery, useUpdateIdealDistributionMutation } from '../../services/gym';
import { LoadingButton } from '@mui/lab';

function DistributionEditForm({ path, type }) {
  const urlParams = useParams();
  const [distributionSpread, setDistributionSpread] = useState({});
  const [gymId, setGymId] = useState(0);
  const [gym, setGym] = useState('')

  const { data } = useGetDistributionEditFormDataQuery({path, gymId: urlParams.id});
  const [
    updateIdealDistribution,
    { isLoading, isUpdating }
  ] = useUpdateIdealDistributionMutation();

  useEffect(() => {
    const getInfo = async () => {
        if (data?.gymId) {
          const { gym, ...rest } = data;
          setDistributionSpread(rest);
          setGym(gym)
          setGymId(gymId);
        }
      
    };

    getInfo();
  }, [data, gymId]);

  const handleChange = (event) => {
    const newSpread = {
      ...distributionSpread,
      [event.target.name]: parseInt(event.target.value) || 0,
    };
    setDistributionSpread(newSpread);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await updateIdealDistribution({
      type,
      body: {
        gymId,
        distributionSpread,
      },
    });
  };

  return (
    <Box sx={{ mt: 12, mx: 'auto', width: '40rem' }}>
      <Typography variant="h2" sx={{ textAlign: 'center', }}>{`${gym?.name}'s ${type}`}</Typography>
      <form id="distribution-form" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', padding: '1rem', width: '30rem' }}>
        {
          Object.keys(distributionSpread).map((grade) => {
            const displayedGrade = type === 'routes'
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

        <LoadingButton
          loading={isLoading}
          variant="contained"
          onClick={handleSubmit}
          sx={{
            borderTop: '1px solid white',
            borderBottom: '1px solid white',
          }}
        >
            Save Distribution
        </LoadingButton>
      </form>
    </Box>
  );
}

export default DistributionEditForm;

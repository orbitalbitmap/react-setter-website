import { Box, InputLabel, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import useDistributionEditForm from './hooks/useDistributionEditForm';

function DistributionEditForm({ path, type }) {
  const {
    distributionSpread,
    gym,
    loading,
    handleChange,
    handleSubmit,
  } = useDistributionEditForm(path, type)

  return (
    <Box sx={{ mt: 12, mx: 'auto', width: '40rem' }}>
      <Typography variant="h2" sx={{ textAlign: 'center', }}>{`${gym?.name}'s ${type}`}</Typography>
      <form
        id="distribution-form"
        style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', padding: '1rem', width: '30rem' }}
        data-testid={`${type}-distribution-form`}
      >
        {
          Object.keys(distributionSpread).map((grade) => {
            const displayedGrade = type === 'routes'
              ? grade.replace('_', '.')
              : grade;
            const numberOfGrade = distributionSpread[grade];
            return (
              <Box
                key={grade}
                sx={{ display: 'flex', flexDirection: 'column', m: 3, width: '4rem', }}
                data-testid="form-input-container"
              >
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
          loading={loading}
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

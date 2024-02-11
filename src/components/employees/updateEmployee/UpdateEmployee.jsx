import { useParams } from 'react-router-dom';
import { Box, Container, Grid, Paper, Typography, } from '@mui/material';

import useEmployeeInfo from '../../../hooks/useEmployeeInfo';
import LocationSelector from './components/LocationSelector';
import EmployeeInfoGrid from './components/EmployeeInfoGrid';

const UpdateEmployee = () => {
  const urlParams = useParams();
  const urlId = parseInt(urlParams.id);
  const { employee, } = useEmployeeInfo(urlId);

  if (!employee.id) {
    return (<h2>Loading...</h2>);
  }

  return (
  <>
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        height: '100vh',
        width: '100%',
      }}
    >
      <Container maxWidth="xl" sx={{ mt: '7rem', }} data-testid="update-employee-container">
        <Grid container spacing={4}>
          <Grid item xs={8} sx={{ mx: 'auto' }}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                color: 'primary.contrastText',
                bgcolor: 'primary.main',
              }}
            >
              <Typography className="centered-text" variant="h2" sx={{mb: '0.5rem'}} >{`${employee.firstName}'s Info`}</Typography>
              <Paper className="centered-text" elevation={12} component="div" sx={{ pb: '0.5rem', pt: '1rem' }}>
                <EmployeeInfoGrid urlId={urlId} />
                <LocationSelector urlId={urlId} />
              </Paper>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
  );
};

export default UpdateEmployee;
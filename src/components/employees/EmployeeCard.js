import { Link } from 'react-router-dom';
import { Container, Grid, Paper, Typography, } from '@mui/material';

export const getLocationString = (employeeLocations) => {
  const locationNameList = employeeLocations.map(location => {
    return location.name
  });

  return locationNameList.join(', ');
}

const EmployeeCard = ({ employeeInfo }) => {
  return (
    <Grid item sx={{ pb: 4 }}>
      <Paper sx={{ width: '30rem', m: '0 auto', pb: 2, }}>
        <Typography variant="h5" key={employeeInfo?.id} className="centered-text" sx={{pt: 2}}>
          <Link to={`/employees/${employeeInfo?.id}`}>{`${employeeInfo?.firstName} ${employeeInfo?.lastName}`}</Link>
        </Typography>
        <Typography variant="body1" sx={{textAlign: 'center', mt: 2, }}>Locations:</Typography>
        <Container sx={{ textAlign: 'center' }}>
          {
            getLocationString(employeeInfo.gyms)
          }
        </Container>
      </Paper>
    </Grid>
  );
}

export default EmployeeCard;
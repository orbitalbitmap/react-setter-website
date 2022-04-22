import { Link } from 'react-router-dom';
import { Container, Grid, Paper, Typography, } from '@mui/material';

export const getLocationString = (employeeLocations) => {
  const locationNameList = employeeLocations.map(location => {
    return location.name;
  });

  return locationNameList.join(', ');
}

const EmployeeCardContainer = (props) => {
  return (
    <Grid key="employee-card-list-container" container xs={12} spacing={8} sx={{ m: '0 auto', }}>
      {
        props?.employees.map(employeeInfo => {
          return (
            <Grid key={employeeInfo?.id} item sx={{ pb: 4 }}>
              <Paper sx={{ width: '30rem', m: '0 auto', pb: 2, }}>
                <Typography variant="h5" className="centered-text" sx={{pt: 2}}>
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
          )
        })
      }
    </Grid>
  );
}

export default EmployeeCardContainer;
import { Link } from 'react-router-dom';
import { Container, Grid, Paper, Typography, } from '@mui/material';
import { useSelector } from 'react-redux';
import getLocationString from '../../utils/getLocationString';

const EmployeeCardContainer = () => {
  const employees = useSelector(state => state.employees)

  return (
    <Grid key="employee-card-list-container" container sx={{ m: '0 auto', }}>
      {
        employees?.map(employeeInfo => {
          return (
            <Grid
              key={employeeInfo.id}
              item
              xs={6}
              sx={{ py: 2 }}
              data-testid="employee-card-container"
            >
              <Paper sx={{ width: '30rem', m: '0 auto', pb: 4, }}>
                <Typography variant="h5" className="centered-text" sx={{pt: 2}}>
                  <Link to={`/employees/${employeeInfo.id}`}>{`${employeeInfo.firstName} ${employeeInfo.lastName}`}</Link>
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
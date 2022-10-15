import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import { getLocationString } from './EmployeeCardContainer';


const SingleEmployee = () => {
  const urlParams = useParams();
  const employeesList = useSelector(state => state.employees) 
  const employee = employeesList.find(emp => {
    return emp.id === parseInt(urlParams.id)
  })

  return (
    <Box sx={{
      bgcolor: theme => theme.palette.primary.main,
      height: 'fit-content',
      m: '8rem auto 0 auto',
      width: '50rem',
      px: 2,
      pb: 4, // makes sure the button is visually inside the outer most box
      borderRadius: 2,
    }}>
      <Typography variant="h3" className="centered-text" sx={{ py: 2, color: theme => theme.palette.common.white, }}>{`${employee.firstName} ${employee.lastName}`}</Typography>
      <Container style={{ overflowY: 'scroll', maxHeight: '40rem' }} sx={{ borderRadius: 2, bgcolor: theme => theme.palette.common.white}}>
        <Typography variant="h6" className="centered-text" sx={{ m: 2, }}>{employee.email}</Typography>
        <Typography variant="h6" className="centered-text" sx={{ m: 2, }}>{employee.phoneNumber}</Typography>

        <Typography variant="h4" className="centered-text" sx={{ mt: 6,  }}>Locations:</Typography>
        
        <Container sx={{ textAlign: 'center', p: 2, }}>
          {
            employee.gyms ? getLocationString(employee.gyms) : null
          }
        </Container>
      </Container>

      <Button variant="contained" sx={{
        position: 'relative',
        top: '0%',
        left: '50%',
        transform: 'translate(-50%, 50%)',
        width: '12rem',
        color: theme => theme.palette.common.black,
        bgcolor: theme => theme.palette.common.white,
          "&:hover": {
            color: theme => theme.palette.common.white,
            bgcolor: theme => theme.palette.primary.light,
          },
        }} >
        <Link className='centered-text' to={`/employees/edit/${employee?.id}`} style={{ color: 'inherit'}}>Edit Employee's info</Link>
      </Button>
    </Box>
  );
}

export default SingleEmployee;
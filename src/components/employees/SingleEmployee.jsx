import axios from 'axios';
import {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import { getLocationString } from './EmployeeCardContainer';


const SingleEmployee = (props) => {
  const urlParams = useParams();
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    const getInfo = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_PATH}/employees/${urlParams.id}`);

      setEmployee(data);
    }

    getInfo();
  }, [urlParams])

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
        // m: '1rem auto',
        width: '10rem',
        color: theme => theme.palette.common.black,
        bgcolor: theme => theme.palette.common.white,
          "&:hover": {
            color: theme => theme.palette.common.white,
            bgcolor: theme => theme.palette.primary.light,
          },
        }} >
        <Link className='centered-text' to={`/admin/employee/${employee?.id}`} style={{ color: 'inherit'}}>Edit Gym info</Link>
      </Button>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps, {})(SingleEmployee);
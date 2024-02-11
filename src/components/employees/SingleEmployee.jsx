import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import getLocationString from '../../utils/getLocationString';
import useButtonDisplay from './hooks/useButtonDisplayType';
import { useGetEmployeeByIdQuery } from '../../services/gym';


const SingleEmployee = () => {
  const user = useSelector(state => state.user)
  const urlParams = useParams();
  const { data: employee } = useGetEmployeeByIdQuery(urlParams?.id)

const {buttonDisplayType} = useButtonDisplay(employee, user);

  return (
    <Box
      sx={{
        bgcolor: theme => theme.palette.primary.main,
        height: 'fit-content',
        m: '8rem auto 0 auto',
        width: '50rem',
        px: 2,
        pb: 4, // makes sure the button is visually inside the outer most box
        borderRadius: 2,
      }}
    >
      <Typography variant="h3" className="centered-text" sx={{ py: 2, color: theme => theme.palette.common.white, }}>{`${employee?.firstName} ${employee?.lastName}`}</Typography>
      <Container
        style={{ overflowY: 'scroll', maxHeight: '40rem' }}
        sx={{ borderRadius: 2, bgcolor: theme => theme.palette.common.white}}
        data-testid="employee-container"
      >
        <Typography variant="h6" className="centered-text" sx={{ m: 2, }}>{employee?.email}</Typography>
        <Typography variant="h6" className="centered-text" sx={{ m: 2, }}>{employee?.phoneNumber}</Typography>

        <Typography variant="h4" className="centered-text" sx={{ mt: 6,  }}>Locations:</Typography>
        
        <Container sx={{ textAlign: 'center', p: 2, }} data-testid="employee-locations-container">
          {
            employee?.gyms ? getLocationString(employee?.gyms) : null
          }
        </Container>
      </Container>

      <Button
        variant="contained"
        sx={{
          display: buttonDisplayType,
          position: 'relative',
          top: '0%',
          left: '50%',
          transform: 'translate(-50%, 50%)',
          width: '15rem',
          color: theme => theme.palette.common.black,
          bgcolor: theme => theme.palette.common.white,
            "&:hover": {
              color: theme => theme.palette.common.white,
              bgcolor: theme => theme.palette.primary.light,
            },
          }}
          data-testid="button-container"
        >
        <Link className='centered-text' to={`/employees/edit/${employee?.id}`} style={{ color: 'inherit'}}>Edit Employee's info</Link>
      </Button>
    </Box>
  );
}

export default SingleEmployee;
import { Link, useParams } from 'react-router-dom';
import { Box, Button, Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import useSingleGymInfo from './hooks/useSingleGymInfo';

const SingleGym = () => {
  const urlParams = useParams();
  const {
    gymInfo,
    fullTimeEmployeeList,
    headSetter,
    partTimeEmployeeList,
  } = useSingleGymInfo(urlParams);

    return (
      <Box sx={{
        bgcolor: theme => theme.palette.primary.main,
        height: '50rem',
        m: '8rem auto 0 auto',
        width: '50rem',
        px: 2,
        borderRadius: 2,
      }}>
        <Typography variant="h3" className="centered-text" sx={{ py: 2, color: theme => theme.palette.common.white, }}>{gymInfo.name}</Typography>
        <Container style={{ overflowY: 'scroll', height: '40rem' }} sx={{ borderRadius: 2, bgcolor: theme => theme.palette.common.white}}>
          <Link to={`/sections/${gymInfo.id}`}>
              Sections
          </Link>
          <Typography variant="h6" className="centered-text">{gymInfo.address}</Typography>
          <Typography variant="h6" className="centered-text">{gymInfo.phoneNumber}</Typography>
          <Typography variant="h6" className="centered-text">{`Facebook: ${gymInfo.facebook !== null ? gymInfo.facebook : 'None available'}`}</Typography>
          <Typography variant="h6" className="centered-text">{`Instagram: ${gymInfo.instagram !== null ? gymInfo.instagram : 'None available'}`}</Typography>
          <Typography variant="h6" className="centered-text">{`Twitter: ${gymInfo.twitter !== null ? gymInfo.twitter : 'None available'}`}</Typography>

          <Typography variant="h4" className="centered-text">The Setters:</Typography>
          <Typography variant="h6" className="centered-text">Head Setter:</Typography>
          
          <List className="centered-text" sx={{ bgcolor: theme => theme.palette.common.white}}>
            <ListItem>
              <ListItemText key={headSetter?.id} className="centered-text inside-bullet">
                <Link to={`/employees/${headSetter?.id || ''}`}>{`${headSetter?.firstName || 'Not'} ${headSetter?.lastName || 'Available'}`}</Link>
              </ListItemText>
            </ListItem>
          </List>

          <Typography variant="h6" className="centered-text">Full Time Setters</Typography>
          <List sx={{ bgcolor: theme => theme.palette.common.white}}>
            {
              fullTimeEmployeeList?.map(setter => {
                return (
                  <ListItem key={`full-time-${setter?.id}`}>
                    <ListItemText className="centered-text inside-bullet">
                      <Link to={`/employees/${setter?.id}`}>{`${setter?.firstName} ${setter?.lastName}`}</Link>
                    </ListItemText>
                  </ListItem>
                )
              })
            }
          </List>

          <Typography variant="h6" className="centered-text">Part Time Setters</Typography>
          <List sx={{ bgcolor: theme => theme.palette.common.white,}}>
          {
              partTimeEmployeeList?.map(setter => {
                return (
                  <ListItem key={`part-time-${setter?.id}`}>
                    <ListItemText className="centered-text inside-bullet">
                      <Link to={`/employees/${setter?.id}`}>{`${setter?.firstName} ${setter?.lastName}`}</Link>
                    </ListItemText>
                  </ListItem>
                )
              })
            }
          </List>
        </Container>

        <Button variant="contained" sx={{
          position: 'relative',
          top: '0%',
          left: '50%',
          transform: 'translate(-50%, 50%)',
          width: '10rem',
          color: theme => theme.palette.common.black,
          bgcolor: theme => theme.palette.common.white,
            "&:hover": {
              color: theme => theme.palette.common.white,
              bgcolor: theme => theme.palette.primary.light,
            },
          }} >
          <Link className='centered-text' to={`/admin/location/${gymInfo?.id}`} style={{ color: 'inherit'}}>Edit Gym info</Link>
        </Button>
      </Box>
    );
  }

export default SingleGym;
import { Link } from 'react-router-dom';
import { Grid, Paper, Typography, List, ListItem, ListItemText  } from '@mui/material';
import { useGetAllLocationsQuery } from '../../services/gym';

const GymCardsContainer = () => {
  const { data: locations } = useGetAllLocationsQuery();

  return (
    <Grid 
      key="gym-card-list-container"
      container sx={{ m: '0 auto', }}
      data-testid="location-cards-container"
    >
      {
        locations?.map(gymInfo => {
          return (
            <Grid key={gymInfo?.id} item xs={6} sx={{ py: 2 }} data-testid="location-card">
              <Paper sx={{ width: '30rem', m: '0 auto', pb: 2, }}>
                <Typography variant="h5" key={gymInfo?.name} className="centered-text" sx={{pt: 2}}>
                  <Link to={`/locations/${gymInfo?.id}`}>{gymInfo?.name}</Link>
                </Typography>
                <List
                  sx={{ bgcolor: theme => theme.palette.common.white, }}
                >
                  <ListItem sx={{ textAlign: 'center', }} >
                    <ListItemText
                      sx={{ color: theme => theme.palette.common.black, }}
                    >
                      Address: {gymInfo?.address}
                    </ListItemText>
                  </ListItem>
                  <ListItem sx={{ textAlign: 'center', }} >
                    <ListItemText
                      sx={{ color: theme => theme.palette.common.black, }}
                    >
                      Phone Number: {gymInfo?.phoneNumber}
                    </ListItemText>
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          )
        })
      }
    </Grid>
  )
}

export default GymCardsContainer;
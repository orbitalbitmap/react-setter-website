import { Link } from 'react-router-dom';
import { Grid, Paper, Typography, List, ListItem, ListItemText  } from '@mui/material';

const GymCardsContainer = (props) => {
  return (
    <Grid key="gym-card-list-container" container xs={12} spacing={8} sx={{ m: '0 auto', }}>
      {
        props.gyms?.map(gymInfo => {
          return (
            <Grid key={gymInfo.id} item sx={{ pb: 4 }}>
              <Paper sx={{ width: '30rem', m: '0 auto', pb: 2, }}>
                <Typography variant="h5" key={gymInfo.name} className="centered-text" sx={{pt: 2}}>
                  <Link to={`/locations/${gymInfo.id}`}>{gymInfo.name}</Link>
                </Typography>
                <List
                  sx={{ bgcolor: theme => theme.palette.common.white, }}
                >
                  <ListItem sx={{ textAlign: 'center', }} >
                    <ListItemText
                      sx={{ color: theme => theme.palette.common.black, }}
                    >
                      Address: {gymInfo.address}
                    </ListItemText>
                  </ListItem>
                  <ListItem sx={{ textAlign: 'center', }} >
                    <ListItemText
                      sx={{ color: theme => theme.palette.common.black, }}
                    >
                      Phone Number: {gymInfo.phoneNumber}
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

export default GymCardsContainer
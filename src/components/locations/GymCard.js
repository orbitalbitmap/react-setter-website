import { Link } from 'react-router-dom'
import { Grid, Paper, Typography, List, ListItem, ListItemText  } from '@mui/material'

const GymCard = ({ gymInfo }) => {
  return (
    <Grid item sx={{ pb: 4 }}>
      <Paper sx={{ width: '30rem', m: '0 auto', p: 0, borderRadius: 2, }}>
        <Typography variant="h5" key={gymInfo.name} className="centered-text" sx={{pt: 2}}>
          <Link to={`/locations/${gymInfo.id}`}>{gymInfo.name}</Link>
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
        </Typography>
      </Paper>
    </Grid>
  )
}

export default GymCard
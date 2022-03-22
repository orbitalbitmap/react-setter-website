import * as React from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { connect } from 'react-redux'

import GymTabContainer from './gymTabContainer/GymTabContainer'

const Content = (props) => {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      {/* Toolbar is inserted for spacing the content down enough */}
      <Toolbar /> 
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4, }}>
        <Grid container spacing={4}>
          {
            props?.user?.gyms.map(gym => (
              <Grid key={gym.id} item xs={6}>
                <Paper
                elevation={24}
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                  }}
                >
                  <Typography variant="h6" align="center">{gym.name}</Typography>
                  <GymTabContainer gym={gym} />
                </Paper>
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </Box>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    gyms: state.gyms
  }
}

export default connect(mapStateToProps, {})(Content)

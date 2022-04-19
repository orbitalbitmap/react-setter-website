import React from 'react'
import { connect } from 'react-redux'
import { Box, Container, Grid, Typography } from '@mui/material'

import GymCard from './GymCard'

const Gyms = (props) => (
  <>
    <Box
      sx={{
        bgcolor: theme => theme.palette.primary.main,
        height: '50rem',
        m: '8rem auto',
        maxWidth: '75rem',
        px: 2,
        borderRadius: 4,
      }}
    >
      <Typography
        variant="h3"
        className="centered-text"
        sx={{
          py: 2,
          color: theme => theme.palette.primary.contrastText
        }}
      >
        Locations:
      </Typography>
      <Container
        style={{ overflowY: 'scroll', height: '40rem', }}
        sx={{
          color: theme => theme.palette.primary.contrastText,
          bgcolor: theme => theme.palette.primary.light,
          m: '0 auto',
          borderRadius: 4,
        }}>
        <Grid container xs={12} spacing={8} sx={{ m: '0 auto', }}>
          {
            props.gyms?.map(gym => {
              return (
                <GymCard key={gym.name} gymInfo={gym} />
              )
            })
          }
        </Grid>
      </Container>
    </Box>
  </>
)

const mapStateToProps = (state) => {
  return {
    user: state.user,
    gyms: state.gyms
  }
}

export default connect(mapStateToProps, {})(Gyms)
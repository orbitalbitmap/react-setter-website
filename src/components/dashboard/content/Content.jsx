import {
  Container,
  Grid,
  Box,
  Paper,
  Typography,
} from '@mui/material';
import GymTabContainer from './gymTabContainer/GymTabContainer';
import useGetUserInfo from '../../../hooks/useGetUserInfo';

const Content = () => {
  const { userLocations } = useGetUserInfo();

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
      data-testid="dashboard-content-component"
    >
      <Container maxWidth="xl" sx={{ mt: 12, mb: 4, }} data-testid="location-tabs-container">
        <Grid container spacing={4}>
          {
            userLocations?.map(gym => {
              return (
              <Grid key={gym.id} item xs={6} data-testid={`panel-${gym.name}`}>
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
            )
          })
          }
        </Grid>
      </Container>
    </Box>
  )
}

export default Content;
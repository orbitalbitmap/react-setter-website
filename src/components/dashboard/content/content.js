import * as React from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import {Link} from 'react-router-dom'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Content = ({ gyms }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <Grid container spacing={2}>
          {
            gyms.map(gym => (
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
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    sx={{bgcolor: 'primary.light'}} style={{borderRadius: '4px 4px 0 0'}}
                  >
                    <Tab label="Ropes" />
                    <Tab label="Boulders" />
                  </Tabs>
                  <TabPanel value={value} index={0}>
                    <Grid container spacing={12}>
                      <Grid item xs={6}>
                        <Paper
                          sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'rows',
                            bgcolor: '#fff',
                            color: '#000',
                            mt: '1rem',
                          }}
                        >
                          <Link to="/" style={{margin: '0 auto'}}>Current Rope Climbs</Link>
                        </Paper>
                      </Grid>
                      <Grid item xs={6}>
                        <Paper
                          sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'rows',
                            bgcolor: '#fff',
                            color: '#000',
                            mt: '1rem',
                          }}
                        >
                          <Link to="/" style={{margin: '0 auto'}}>Ideal Rope Distribution</Link>
                        </Paper>
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                  <Grid container spacing={12}>
                      <Grid item xs={6}>
                        <Paper
                          sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'rows',
                            bgcolor: '#fff',
                            color: '#000',
                            mt: '1rem',
                          }}
                        >
                          <Link to="/" style={{margin: '0 auto'}}>Current Boulder Problems</Link>
                        </Paper>
                      </Grid>
                      <Grid item xs={6}>
                        <Paper
                          sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'rows',
                            bgcolor: '#fff',
                            color: '#000',
                            mt: '1rem',
                          }}
                        >
                          <Link to="/" style={{margin: '0 auto'}}>Ideal Boulder Distribution</Link>
                        </Paper>
                      </Grid>
                    </Grid>
                  </TabPanel>
                </Paper>
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </Box>
  )
}

export default Content


/*

<Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              test large and tall
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              thin and tall
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              short and long
            </Paper>
          </Grid>




*/
import * as React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


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

const GymTabContainer = ({ gym }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
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
              <Link
                to={`/distribution/current/ropes/${gym.id}`}
                style={{
                    color:
                    '#000',
                  margin: '0 auto',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                Current Rope Climbs
              </Link>

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
              <Link
                to={`/distribution/ideal/ropes/${gym.id}`}
                style={{
                    color:
                    '#000',
                  margin: '0 auto',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                  Ideal Rope Distribution
              </Link>

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
              <Link
                to={`/distribution/current/boulders/${gym.id}`}
                style={{
                  color: '#000',
                  margin: '0 auto',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                Current Boulder Problems
              </Link>

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
              <Link
                to={`/distribution/ideal/boulders/${gym.id}`}
                style={{
                    color: '#000',
                  margin: '0 auto',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                Ideal Boulder Distribution
              </Link>

            </Paper>
          </Grid>
        </Grid>
      </TabPanel>
    </>
  )
}

export default GymTabContainer
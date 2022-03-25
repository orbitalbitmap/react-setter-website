import * as React from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Tabs, Tab } from "@mui/material";

import NewEmployeeForm from './NewEmployeeForm'
import NewGymForm from './NewGymForm'

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

const AdminDashboard = () => {
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
      <Container maxWidth="50rem" sx={{ mt: 18 }} >
        <Grid container spacing={4} sx={{justifyContent: 'center'}}>
          <Grid item xs={8}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              color: 'primary.contrastText',
              bgcolor: 'primary.main',
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
              sx={{bgcolor: 'primary.light'}}
              style={{borderRadius: '4px 4px 0 0'}}
            >
              <Tab label="Add New Setter" />
              <Tab label="Add New Gym" />
            </Tabs>
            <TabPanel value={value} index={0} style={{textAlign: 'center'}}>
              <NewEmployeeForm />
            </TabPanel>
            <TabPanel value={value} index={1} style={{textAlign: 'center'}}>
              <NewGymForm />
            </TabPanel>
          </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default AdminDashboard

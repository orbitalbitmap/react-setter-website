import { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Tabs, Tab } from "@mui/material";

import NewEmployeeForm from './components/NewEmployeeForm';
import NewGymForm from './components/NewGymForm';
import AdminTabPanel from './components/AdminTabPanel';

const AdminDashboard = () => {
  const [value, setValue] = useState(0);

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
        m: '0 auto',
      }}
    >
      <Container sx={{ mt: '7rem', mx: 'auto', }}>
        <Grid container>
          <Grid item xs={10}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              color: 'primary.contrastText',
              bgcolor: 'primary.main',
              mx: 'auto',
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
              <Tab label="Add New Setter" data-testid="new-setter-tab" />
              <Tab label="Add New Gym" data-testid="new-gym-tab" />
            </Tabs>
            <AdminTabPanel value={value} index={0} style={{textAlign: 'center'}}>
              <NewEmployeeForm />
            </AdminTabPanel>
            <AdminTabPanel value={value} index={1} style={{textAlign: 'center'}}>
              <NewGymForm />
            </AdminTabPanel>
          </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default AdminDashboard;

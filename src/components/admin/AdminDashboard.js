import * as React from 'react'
import { Link } from "react-router-dom"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Tabs, Tab } from "@mui/material";

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
      <Container maxWidth="xl" sx={{ mt: 18, justifyContent: 'center'}} >
        <Grid container spacing={4} sx={{justifyContent: 'center'}}>
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
              sx={{bgcolor: 'primary.light'}} style={{borderRadius: '4px 4px 0 0'}}
            >
              <Tab label="Add New Setter" />
              <Tab label="Add New Gym" />
            </Tabs>
            <TabPanel value={value} index={0} style={{textAlign: 'center'}}>
              Test 1
            </TabPanel>
            <TabPanel value={value} index={1} style={{textAlign: 'center'}}>
              Test 2
            </TabPanel>
          </Paper>
        </Grid>
      </Container>
    </Box>
  )
}

export default AdminDashboard


{/* <div className="centered-text">
  <h3>
    <ul>
      <li style={{listStyle: 'none'}}>
        <Link to="/admin/employee/new">Add new setter</Link>
      </li>
      <li style={{listStyle: 'none'}}>
        <Link to="/admin/location/new">Add new gym</Link>
      </li>
    </ul>
  </h3>
</div> */}
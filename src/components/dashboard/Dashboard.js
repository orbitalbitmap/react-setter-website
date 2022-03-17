// import { Link } from 'react-router-dom'

// const Dashboard = (props) => {
//   const renderList = () => {
//     return props.user.gyms.map(gym => {
//       return (
//         <ul key={`user-gym-list-${gym.name}`}>
//           <li key={gym.id}>
//             <h3> 
//               <Link to={`/locations/${gym.id}`}>{gym.name}</Link>
//             </h3>
//             <ul key={`sections-${gym.id}`}>
//               <li key={`list-${gym.id}`}>
//                 <h4>Sections</h4>
//                 <ul key={`section-list-${gym.id}`}>
//                   <li key={`all-sections-${gym.id}`}>
//                     <Link to={`/sections/${gym.id}`}> Wall Sections</Link>
//                   </li>
//                   <li key={`edit-sections-${gym.id}`}>
//                     <Link to={`/sections/edit/${gym.id}`}> Edit All Section Names</Link>
//                   </li>
//                 </ul>
//               </li>
//             </ul>
//             <ul key={`distribution-${gym.id}`}>
//               <li key={`ideal-distribution-${gym.id}`}>
//                 <h4>Ideal</h4>
//                 <ul key={`ideal-distribution-list-${gym.id}`}>
//                   <li key={`ideal-route-distribution-${gym.id}`}>
//                     <Link to={`/distribution/ideal/ropes/${gym.id}`}> Route Distribution</Link>
//                   </li>
//                   <li key={`ideal-boulder-distribution-${gym.id}`}>
//                     <Link to={`/distribution/ideal/boulders/${gym.id}`}>Boulder Distribution</Link>
//                   </li>
//                 </ul>
//               </li>
//               <li key={`current-distribution-${gym.id}`}>
//                 <h4>Current</h4>
//                 <ul key={`current-distribution-list-${gym.id}`}>
//                   <li key={`current-route-distribution-${gym.id}`}>
//                     <Link to={`/distribution/current/ropes/${gym.id}`}>Current Route Distribution</Link>
//                   </li>
//                   <li key={`current-boulder-distribution-${gym.id}`}>
//                     <Link to={`/distribution/current/boulders/${gym.id}`}>Current Boulder Distribution</Link>
//                   </li>
//                 </ul>
//               </li>
//               </ul>
//           </li>
//         </ul>
//         ) 
//       }
//     )
//   }

//   return (
//     <div className="main-content">
//     <h1 className="centered-text"> Welcome {props.user.firstName} {props.user.lastName}!</h1>
//     <h2>Your main work locations are:</h2>
//       {renderList()}
//     </div>
//   )
// }

// export default Dashboard

import * as React from 'react';
import { connect } from 'react-redux'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItems from './listItems/ListItems';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItems />
          </List>
        </Drawer>
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
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    gyms: state.gyms
  }
}

export default connect(mapStateToProps, {})(DashboardContent)
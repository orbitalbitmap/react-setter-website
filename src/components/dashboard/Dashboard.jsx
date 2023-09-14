import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItems from './sidebar/ListItems';
import AppBar from './styledComponents/AppBar';
import Drawer from './styledComponents/Drawer';
import useSetGymAndEmployeeLists from './hooks/useSetGymAndEmployeeLists';

function DashboardContent({ children }) {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useSetGymAndEmployeeLists();

  return (
      <Box sx={{ display: 'flex', }}>
        <AppBar position="fixed" open={open} className="noprint">
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer is closed
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
        <Drawer
          variant="permanent"
          open={open}
          sx={{ height: '100%', position: 'fixed', zIndex: 999}}
          PaperProps={{ sx: { bgcolor: '#202A56' } }}
          className="noprint"
        >
          <Toolbar
            sx={{
              display: 'flex',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav" >
            <ListItems drawerOpen={open} drawerSetter={setOpen}/>
          </List>
        </Drawer>
        {children}
      </Box>
  );
}

export default DashboardContent
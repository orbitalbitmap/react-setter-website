import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const mainBlue = '#202A56'
const actionBlue ='#364784'

export default createTheme({
  palette: {
    common: {
      primaryBlue: `${mainBlue}`,
      lighterBlue: `${actionBlue}`,
    },
    primary: {
      main: `${mainBlue}`,
      light: `${actionBlue}`,
      contrastText: "#fff",
    },
    secondary: {
      main: `${grey[500]}`,
    }
  },
  components: {
    MuiButton: {
      styleOverrides : {
        root: {
          "&:hover": {
            backgroundColor: `${actionBlue}`,
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: `${mainBlue}`,
        }
      }
    },
    MuiListItemText: {
      styleOverrides : {
        root: {
            color: `#fff`,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides : {
        root: {
            color: `#fff`,
        },
      },
    },
    MuiDivider: {
      styleOverrides : {
        root: {
            borderColor: `${grey[500]}`,
        },
      }
    },
    // MuiDrawer: {
    //   styleOverrides: {
    //     root: {
    //       borderRight: '2px solid',
    //     },
    //   },
    // },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
  },
})

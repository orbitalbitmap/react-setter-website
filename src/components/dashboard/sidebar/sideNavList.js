import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';

// restructure
const sideNavList = [
  // {
  //   id: 1,
  //   title: 'Admin Dashboard',
  //   url: '/admin',
  // },
  {
    id: 2,
    title: 'Dashboard',
    url: '/dashboard/',
    icon: <DashboardIcon />,
  },
  {
    id: 3,
    title: 'Locations',
    url: '/locations/',
  },
  {
    id: 4,
    title: 'Employees',
    url: '/employees/',
    icon: <PeopleIcon />,
  },
  {
    id: 5,
    title: 'Metrics',
    url: '/metrics/',
  },
  // {
  //   id: 6,
  //   title: 'Profile',
  //   url: '/dashboard',
  //   icon: <LayersIcon />,
  // },
  // {
  //   id: 7,
  //   title: 'Logout',
  //   url: '/',
  //   onClick: ()=>{},
  // },
];

export default sideNavList;
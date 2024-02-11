import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';

const sideNavList = [
  {
    id: 1,
    title: 'Dashboard',
    url: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    id: 2,
    title: 'Locations',
    url: '/locations',
  },
  {
    id: 3,
    title: 'Employees',
    url: '/employees',
    icon: <PeopleIcon />,
  },
  {
    id: 4,
    title: 'Metrics',
    url: '/metrics',
  },
];

export default sideNavList;
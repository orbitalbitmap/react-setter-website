import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import dayjs from 'dayjs';

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://robert-perron.com">
        robert-perron.com
      </Link>{' '}
      {dayjs().year()}
      {'.'}
    </Typography>
  );
}

export default Copyright;
import { Typography } from '@mui/material';
import useRoutesPerSetter from '../hooks/useRoutesPerSetter';

function RoutesPerSetter() {
  useRoutesPerSetter();

  return (
    <>
      <Typography>Routes Per Setter</Typography>
      <svg id="routes-per-setter"></svg>
    </>
  )
}

export default RoutesPerSetter;
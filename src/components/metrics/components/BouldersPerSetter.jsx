import { Typography } from '@mui/material';
import useBouldersPerSetter from '../hooks/useBouldersPerSetter';

function BouldersPerSetter() {
useBouldersPerSetter();

  return (
    <>
      <Typography>Boulders Per Setter</Typography>
      <svg id="boulders-per-setter"></svg>
    </>
  )
}

export default BouldersPerSetter;

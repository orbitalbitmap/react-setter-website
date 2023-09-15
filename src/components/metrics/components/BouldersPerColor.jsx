import { Typography } from '@mui/material';
import useBouldersPerColor from '../hooks/useBouldersPerColor';

function BouldersPerColor() {
  useBouldersPerColor();

  return (
    <>
      <Typography>Boulders Per Color</Typography>
      <svg id="boulders-per-color" width="600" height="600" />
    </>
  )
}

export default BouldersPerColor;

import { Typography } from '@mui/material';
import useRoutesPerColor from '../hooks/useRoutesPerColor';

function RoutesPerColor() {
  useRoutesPerColor();

  return (
    <>
      <Typography>Routes Per Color</Typography>
      <svg id="routes-per-color" width="600" height="600" />
    </>
  )
}

export default RoutesPerColor;

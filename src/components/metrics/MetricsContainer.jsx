import { Box, Container, Typography } from '@mui/material';

import BoulderIdealVsCurrent from './components/BoulderIdealVsCurrent';
import BouldersPerSetter from './components/BouldersPerSetter';
import BouldersPerColor from './components/BouldersPerColor';
import RouteIdealVsCurrent from './components/RouteIdealVsCurrent';
import RoutesPerSetter from './components/RoutesPerSetter';
import RoutesPerColor from './components/RoutesPerColor';
import useMetricsContainer from './hooks/useMetricsContainer';

function MetricsContainer() {
  const {
    gymMetrics,
    gymName,
  } = useMetricsContainer();

  return (
    <Container sx={{ mt: 12 }}>
      <Typography className="centered-text" variant="h3">
        {gymName}
        {' '}
        Metrics
      </Typography>

      <Box
        className="idealVsCurrent-wrapper centered-text"
        data-testid="boulders-per-setter-container"
      >
        {
          gymMetrics?.bouldersPerSetter?.length
            ? <BouldersPerSetter />
            : <Typography className="centered-text" variant="h6" >No Data Found For Setters Per Boulders</Typography>
        }
      </Box>

      <Box
        className="idealVsCurrent-wrapper centered-text"
        data-testid="routes-per-setter-container"
      >
        {
          gymMetrics?.routesPerSetter?.length
            ? <RoutesPerSetter />
            : <Typography className="centered-text" variant="h6" >No Data Found For Setters Per Routes</Typography>
        }
      </Box>

      {/* boulders per color */}
      <Box
        className="idealVsCurrent-wrapper centered-text"
        data-testid="boulders-per-color-container"
      >
        {
          gymMetrics?.bouldersPerColor?.length
            ? <BouldersPerColor />
            : <Typography className="centered-text" variant="h6" >No Data Found For Boulders Per Color</Typography>
        }
      </Box>

      {/* routes per color */}
      <Box
        className="idealVsCurrent-wrapper centered-text"
        data-testid="routes-per-color-container"
      >
        {
          gymMetrics?.routesPerColor?.length
            ? <RoutesPerColor />
            : <Typography className="centered-text" variant="h6" >No Data Found For Routes Per Colors</Typography>
        }
      </Box>

      {/* ideal vs current boulder */}
      <Box
        className="idealVsCurrent-wrapper centered-text"
        data-testid="ideal-vs-current-boulder-container"
      >
        {
          (gymMetrics?.currentVsIdealBoulderGrades?.length)
            ?  <BoulderIdealVsCurrent />
            : <Typography className="centered-text" variant="h6" >No Data Found For the Ideal vs Current # of Boulders</Typography>
        }
      </Box>

      {/* ideal vs current rope */}
      <Box
        className="idealVsCurrent-wrapper centered-text"
        data-testid="ideal-vs-current-route-container"
      >
        {
          (gymMetrics?.currentVsIdealRouteGrades?.length)
            ? <RouteIdealVsCurrent />
            : <Typography className="centered-text" variant="h6" >No Data Found For the Ideal vs Current # of Routes</Typography>
        }
      </Box>
    </Container>
  );
}

export default MetricsContainer;

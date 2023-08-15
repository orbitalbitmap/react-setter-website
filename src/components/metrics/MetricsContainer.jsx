import { Box, Container, Typography } from '@mui/material';

import BoulderIdealVsCurrent from './partials/BoulderIdealVsCurrent';
import BouldersPerSetter from './partials/BouldersPerSetter';
import BouldersPerColor from './partials/BouldersPerColor';
import RouteIdealVsCurrent from './partials/RouteIdealVsCurrent';
import RoutesPerSetter from './partials/RoutesPerSetter';
import RoutesPerColor from './partials/RoutesPerColor';
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

      <Box className="idealVsCurrent-wrapper centered-text">
        {
          gymMetrics?.bouldersPerSetter?.length
            ? <BouldersPerSetter />
            : <Typography className="centered-text" variant="h6" >No Data Found For Setters Per Boulders</Typography>
        }
      </Box>

      <Box className="idealVsCurrent-wrapper centered-text">
        {
          gymMetrics?.routesPerSetter?.length
            ? <RoutesPerSetter />
            : <Typography className="centered-text" variant="h6" >No Data Found For Setters Per Routes</Typography>
        }
      </Box>

      {/* boulders per color */}
      <Box className="idealVsCurrent-wrapper centered-text">
        {
          gymMetrics?.bouldersPerColor?.length
            ? <BouldersPerColor />
            : <Typography className="centered-text" variant="h6" >No Data Found For Boulders Per Color</Typography>
        }
      </Box>

      {/* routes per color */}
      <Box className="idealVsCurrent-wrapper centered-text">
        {
          gymMetrics?.routesPerColor?.length
            ? <RoutesPerColor />
            : <Typography className="centered-text" variant="h6" >No Data Found For Setters Per Routes</Typography>
        }
      </Box>

      {/* ideal vs current boulder */}
      <Box className="idealVsCurrent-wrapper centered-text">
        {
          (gymMetrics?.currentBouldersPerGrade?.length && gymMetrics?.idealBouldersPerGrade?.length)
            ?  <BoulderIdealVsCurrent />
            : <Typography className="centered-text" variant="h6" >No Data Found For Setters Per Boulders</Typography>
        }
      </Box>

      {/* ideal vs current rope */}
      <Box className="idealVsCurrent-wrapper centered-text">
        {
          (gymMetrics?.currentRoutesPerGrade?.length && gymMetrics?.idealRoutesPerGrade?.length)
            ? <RouteIdealVsCurrent />
            : <Typography className="centered-text" variant="h6" >No Data Found For Setters Per Routes</Typography>
        }
      </Box>
    </Container>
  );
}

export default MetricsContainer;

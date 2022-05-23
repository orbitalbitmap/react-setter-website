import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import BoulderIdealVsCurrent from './partials/BoulderIdealVsCurrent';
import BouldersPerSetter from './partials/BouldersPerSetter';
import BouldersPerColor from './partials/BouldersPerColor';
import RouteIdealVsCurrent from './partials/RouteIdealVsCurrent';
import RoutesPerSetter from './partials/RoutesPerSetter';
import RoutesPerColor from './partials/RoutesPerColor';
import { Box, Container, Typography } from '@mui/material';

function MetricsContainer() {
  const urlParams = useParams();
  const [gymName, setGymName] = useState('');
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    const getInfo = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_PATH}/metrics/${urlParams.id}`);

      setGymName(data.gym.name);
      setMetrics(data.metrics);
    };

    getInfo();
  }, [urlParams]);

  return (
    <Container sx={{ mt: 12 }}>
      <Typography className="centered-text" variant="h3">
        {gymName}
        {' '}
        Metrics
      </Typography>

      <Box className="idealVsCurrent-wrapper centered-text">
        {
          metrics.boulderSetterCount
            ? <BouldersPerSetter data={metrics.boulderSetterCount} />
            : <Typography className="centered-text" variant="h6" >No Data Found For Setters Per Boulders</Typography>
        }
      </Box>

      <Box className="idealVsCurrent-wrapper centered-text">
        {
          metrics.routeSetterCount
            ? <RoutesPerSetter data={metrics.routeSetterCount} />
            : <Typography className="centered-text" variant="h6" >No Data Found For Setters Per Routes</Typography>
        }
      </Box>

      <Box className="idealVsCurrent-wrapper centered-text">
        {
          metrics.boulderColorCount
            ? <BouldersPerColor data={metrics.boulderColorCount} />
            : <Typography className="centered-text" variant="h6" >No Data Found For Boulders Per Color</Typography>
        }
      </Box>

      {/* r/color */}
      <Box className="idealVsCurrent-wrapper centered-text">
        {
          metrics.routeColorCount
            ? <RoutesPerColor data={metrics.routeColorCount} />
            : <Typography className="centered-text" variant="h6" >No Data Found For Setters Per Routes</Typography>
        }
      </Box>

      {/* ideal vs current boulder */}
      <Box className="idealVsCurrent-wrapper centered-text">
        {
          metrics.boulderSetterCount
            ? (
              <BoulderIdealVsCurrent
                data={{
                  currentBoulderGradeCount: metrics.currentBoulderGradeCount,
                  idealBoulderGradeCount: metrics.idealBoulderGradeCount,
                }}
              />
            )
            : <Typography className="centered-text" variant="h6" >No Data Found For Setters Per Routes</Typography>
        }
      </Box>

      {/* ideal vs current rope */}
      <Box className="idealVsCurrent-wrapper centered-text">
        {
          metrics.currentRouteGradeCount && metrics.idealRouteGradeCount
            ? (
              <RouteIdealVsCurrent
                data={{
                  currentRouteGradeCount: metrics.currentRouteGradeCount,
                  idealRouteGradeCount: metrics.idealRouteGradeCount,
                }}
              />
            )
            : <Typography className="centered-text" variant="h6" >No Data Found For Setters Per Routes</Typography>
        }
      </Box>
    </Container>
  );
}

export default MetricsContainer;

import { Box, Container, Typography } from '@mui/material';
import { useEffect, } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import BoulderIdealVsCurrent from './partials/BoulderIdealVsCurrent';
import BouldersPerSetter from './partials/BouldersPerSetter';
import BouldersPerColor from './partials/BouldersPerColor';
import RouteIdealVsCurrent from './partials/RouteIdealVsCurrent';
import RoutesPerSetter from './partials/RoutesPerSetter';
import RoutesPerColor from './partials/RoutesPerColor';
import { setGymMetrics } from '../../reducers/distribution/metricsReducers';
import { useGetGymMetricsQuery } from '../../services/gym';

function MetricsContainer() {
  const dispatch = useDispatch();
  const gymName = useSelector((state) => state.metrics.gymName);
  const gymMetrics = useSelector((state) => state.metrics.gymMetrics);
  const urlParams = useParams();
  const {data} = useGetGymMetricsQuery(urlParams.id);

  useEffect(() => {
    const getInfo = async () => {
      dispatch(setGymMetrics({
        gymName: data?.gym?.name,
        gymMetrics: data?.metrics,
      }));
    };

    getInfo();
  }, [data, dispatch]);

  return (
    <Container sx={{ mt: 12 }}>
      <Typography className="centered-text" variant="h3">
        {gymName}
        {' '}
        Metrics
      </Typography>

      <Box className="idealVsCurrent-wrapper centered-text">
        {
          gymMetrics.bouldersPerSetter
            ? <BouldersPerSetter />
            : <Typography className="centered-text" variant="h6" >No Data Found For Setters Per Boulders</Typography>
        }
      </Box>

      <Box className="idealVsCurrent-wrapper centered-text">
        {
          gymMetrics.routesPerSetter
            ? <RoutesPerSetter />
            : <Typography className="centered-text" variant="h6" >No Data Found For Setters Per Routes</Typography>
        }
      </Box>

      {/* boulders per color */}
      <Box className="idealVsCurrent-wrapper centered-text">
        {
          gymMetrics.bouldersPerColor
            ? <BouldersPerColor />
            : <Typography className="centered-text" variant="h6" >No Data Found For Boulders Per Color</Typography>
        }
      </Box>

      {/* routes per color */}
      <Box className="idealVsCurrent-wrapper centered-text">
        {
          gymMetrics.routesPerColor
            ? <RoutesPerColor />
            : <Typography className="centered-text" variant="h6" >No Data Found For Setters Per Routes</Typography>
        }
      </Box>

      {/* ideal vs current boulder */}
      <Box className="idealVsCurrent-wrapper centered-text">
        {
          (gymMetrics.currentBouldersPerGrade && gymMetrics.idealBouldersPerGrade)
            ?  <BoulderIdealVsCurrent />
            : <Typography className="centered-text" variant="h6" >No Data Found For Setters Per Boulders</Typography>
        }
      </Box>

      {/* ideal vs current rope */}
      <Box className="idealVsCurrent-wrapper centered-text">
        {
          (gymMetrics.currentRoutesPerGrade && gymMetrics.idealRoutesPerGrade)
            ? <RouteIdealVsCurrent />
            : <Typography className="centered-text" variant="h6" >No Data Found For Setters Per Routes</Typography>
        }
      </Box>
    </Container>
  );
}

export default MetricsContainer;

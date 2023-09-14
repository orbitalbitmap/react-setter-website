import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

import BarChart from "./BarChart";

function RouteIdealVsCurrent() {
  const { currentVsIdealRouteGrades } = useSelector((state) => state.metrics.gymMetrics)

  return (
    <Box>
      <BarChart data={currentVsIdealRouteGrades} width={1000} height={500} chartId="ideal-vs-current-routes" /> {/* domain={routeGradesArray} */}
    </Box>
  )
}

export default RouteIdealVsCurrent;

import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

import GroupedBarChart from "./GroupedBarChart";

function RouteIdealVsCurrent() {
  const { currentVsIdealRouteGrades } = useSelector((state) => state.metrics.gymMetrics)

  return (
    <Box>
      { currentVsIdealRouteGrades.length
        ? <GroupedBarChart data={currentVsIdealRouteGrades} width={1000} height={500} chartId="ideal-vs-current-routes" />
        : <p>Not available</p>
      }
    </Box>
  )
}

export default RouteIdealVsCurrent;

import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

import GroupedBarChart from "./GroupedBarChart";

function BoulderIdealVsCurrent() {
  const { currentVsIdealBoulderGrades } = useSelector((state) => state.metrics.gymMetrics)

  return (
    <Box>
      <GroupedBarChart data={currentVsIdealBoulderGrades} width={1000} height={500} chartId="ideal-vs-current-boulders" />
    </Box>
  )
}

export default BoulderIdealVsCurrent;

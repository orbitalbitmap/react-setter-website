import { Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import getCurrentRoutesPerGrade from '../utils/getOrderedCurrentRoutesPerGrade';
import getOrderedIdealRoutesPerGrade from '../utils/getOrderedIdealRoutesPerGrade';

function RouteIdealVsCurrent() {
  const { currentRoutesPerGrade, idealRoutesPerGrade } = useSelector(state => state.metrics.gymMetrics);
  
  // @TODO: memoize this
  const orderedCurrentRoutesPerGrade = getCurrentRoutesPerGrade(currentRoutesPerGrade)
  const orderedIdealRoutesPerGrade = getOrderedIdealRoutesPerGrade(idealRoutesPerGrade);

  const chartData = {
    labels: Object.keys(orderedIdealRoutesPerGrade),
    datasets: [
      {
        data: Object.values(orderedIdealRoutesPerGrade),
        label: 'Ideal Route Grades',
        backgroundColor: 'black',
        fill: false,
      },
      {
        data: Object.values(orderedCurrentRoutesPerGrade),
        label: 'Current Route Grades',
        backgroundColor: 'darkred',
        fill: false,
      },
    ],
  };

  return (
    <Box>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Ideal Vs Current Routes',
            },
            legend: {
              display: true,
              position: 'bottom',
            },
          },
        }}
      />
    </Box>
  );
}

export default RouteIdealVsCurrent;

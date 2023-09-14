import { Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import getOrderedCurrentBouldersPerGrade from '../utils/getOrderedCurrentBouldersPerGrade';
import getOrderedIdealBouldersPerGrade from '../utils/getOrderedIdealBouldersPerGrade';

function BoulderIdealVsCurrent() {
  const { currentBouldersPerGrade, idealBouldersPerGrade } = useSelector(state => state.metrics.gymMetrics);

  const orderedCurrentBouldersPerGrade = getOrderedCurrentBouldersPerGrade(currentBouldersPerGrade);
  const orderedIdealBouldersPerGrade = getOrderedIdealBouldersPerGrade(idealBouldersPerGrade);


  const chartData = {
    labels: Object.keys(orderedIdealBouldersPerGrade),
    datasets: [
      {
        data: Object.values(orderedIdealBouldersPerGrade),
        label: 'Ideal Boulder Grades',
        backgroundColor: 'black',
        fill: false,
      },
      {
        data: Object.values(orderedCurrentBouldersPerGrade),
        label: 'Current Boulder Grades',
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
              text: 'Ideal Vs Current Boulders',
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

export default BoulderIdealVsCurrent;

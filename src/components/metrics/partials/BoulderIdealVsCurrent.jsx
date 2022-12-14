import { Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

function BoulderIdealVsCurrent() {
  const { currentBouldersPerGrade, idealBouldersPerGrade } = useSelector(state => state.metrics.gymMetrics);

  // @TODO Move these out to a separate file
  const orderedIdealBouldersPerGrade = {
    VB: idealBouldersPerGrade.VB,
    V0: idealBouldersPerGrade.V0,
    V1: idealBouldersPerGrade.V1,
    V2: idealBouldersPerGrade.V2,
    V3: idealBouldersPerGrade.V3,
    V4: idealBouldersPerGrade.V4,
    V5: idealBouldersPerGrade.V5,
    V6: idealBouldersPerGrade.V6,
    V7: idealBouldersPerGrade.V7,
    V8: idealBouldersPerGrade.V8,
    V9: idealBouldersPerGrade.V9,
    V10: idealBouldersPerGrade.V10,
    V11: idealBouldersPerGrade.V11,
    V12: idealBouldersPerGrade.V12,
    V13: idealBouldersPerGrade.V13,
    V14: idealBouldersPerGrade.V14,
    V15: idealBouldersPerGrade.V15,
    V16: idealBouldersPerGrade.V16,
  };

  // @TODO Move these out to a separate file
  const orderedCurrentBouldersPerGrade = {
    VB: currentBouldersPerGrade.VB || 0,
    V0: currentBouldersPerGrade.V0 || 0,
    V1: currentBouldersPerGrade.V1 || 0,
    V2: currentBouldersPerGrade.V2 || 0,
    V3: currentBouldersPerGrade.V3 || 0,
    V4: currentBouldersPerGrade.V4 || 0,
    V5: currentBouldersPerGrade.V5 || 0,
    V6: currentBouldersPerGrade.V6 || 0,
    V7: currentBouldersPerGrade.V7 || 0,
    V8: currentBouldersPerGrade.V8 || 0,
    V9: currentBouldersPerGrade.V9 || 0,
    V10: currentBouldersPerGrade.V10 || 0,
    V11: currentBouldersPerGrade.V11 || 0,
    V12: currentBouldersPerGrade.V12 || 0,
    V13: currentBouldersPerGrade.V13 || 0,
    V14: currentBouldersPerGrade.V14 || 0,
    V15: currentBouldersPerGrade.V15 || 0,
    V16: currentBouldersPerGrade.V16 || 0,
  };


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

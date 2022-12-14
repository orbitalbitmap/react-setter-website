import { Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

function BouldersPerSetter() {
  const bouldersPerSetter = useSelector(state => state.metrics.gymMetrics.bouldersPerSetter);
  
  const labels = Object.keys(bouldersPerSetter);
  const data = Object.values(bouldersPerSetter);

  const chartData = {
    labels,
    datasets: [
      {
        data,
        label: 'Total Boulders',
        backgroundColor: 'black',
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
              text: 'Boulders Per Setter',
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

export default BouldersPerSetter;

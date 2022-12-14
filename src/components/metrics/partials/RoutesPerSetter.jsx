import { Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

function RoutesPerSetter() {
  const routesPerSetter = useSelector(state => state.metrics.gymMetrics.routesPerSetter);
  const labels = Object.keys(routesPerSetter);
  const data = Object.values(routesPerSetter);

  const chartData = {
    labels,
    datasets: [
      {
        data,
        label: 'Total Routes',
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
              text: 'Routes Per Setter',
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

export default RoutesPerSetter;

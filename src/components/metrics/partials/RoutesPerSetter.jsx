import { Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';

function RoutesPerSetter(props) {
  const chartData = {
    labels: Object.keys(props.data) || null,
    datasets: [
      {
        data: Object.values(props.data) || null,
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

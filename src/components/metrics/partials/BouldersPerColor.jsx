import { Box } from '@mui/material';
import { Pie } from 'react-chartjs-2';

function BouldersPerColor(props) {
  const colorList = Object.keys(props.data) || null;

  const chartData = {
    labels: colorList,
    datasets: [
      {
        borderColor: 'black',
        borderWidth: 1,
        data: Object.values(props.data),
        backgroundColor: colorList,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <Box className="centered-text" style={{ width: 800, height: 360, margin: '0 auto' }}>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Boulders Per Color',
            },
            legend: {
              display: true,
              position: 'bottom',
            },
          },
          maintainAspectRatio: false,
        }}
      />
    </Box>
  );
}

export default BouldersPerColor;

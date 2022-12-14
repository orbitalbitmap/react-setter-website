import { Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

function RouteIdealVsCurrent() {
  const { currentRoutesPerGrade, idealRoutesPerGrade } = useSelector(state => state.metrics.gymMetrics);

  // @TODO Move these out to a separate file
  const orderedIdealRoutesPerGrade = {
    '5.3': idealRoutesPerGrade['5_3'] || 0,
    '5.4': idealRoutesPerGrade['5_4'] || 0,
    '5.5': idealRoutesPerGrade['5_5'] || 0,
    '5.6': idealRoutesPerGrade['5_6'] || 0,
    '5.7': idealRoutesPerGrade['5_7'] || 0,
    '5.8': idealRoutesPerGrade['5_8'] || 0,
    '5.9': idealRoutesPerGrade['5_9'] || 0,
    '5.10-': idealRoutesPerGrade['5_10-'] || 0,
    '5.10': idealRoutesPerGrade['5_10'] || 0,
    '5.10+': idealRoutesPerGrade['5_10+'] || 0,
    '5.11-': idealRoutesPerGrade['5_11-'] || 0,
    '5.11': idealRoutesPerGrade['5_11'] || 0,
    '5.11+': idealRoutesPerGrade['5_11+'] || 0,
    '5.12-': idealRoutesPerGrade['5_12-'] || 0,
    '5.12': idealRoutesPerGrade['5_12'] || 0,
    '5.12+': idealRoutesPerGrade['5_12+'] || 0,
    '5.13-': idealRoutesPerGrade['5_13-'] || 0,
    '5.13': idealRoutesPerGrade['5_13'] || 0,
    '5.13+': idealRoutesPerGrade['5_13+'] || 0,
    '5.14-': idealRoutesPerGrade['5_14-'] || 0,
    '5.14': idealRoutesPerGrade['5_14'] || 0,
    '5.14+': idealRoutesPerGrade['5_14+'] || 0,
    '5.15-': idealRoutesPerGrade['5_15-'] || 0,
    '5.15': idealRoutesPerGrade['5_15'] || 0,
    '5.15+': idealRoutesPerGrade['5_15+'] || 0,
  };

  // @TODO Move these out to a separate file
  const orderedCurrentRoutesPerGrade = {
    '5.3': currentRoutesPerGrade['5.3'] || 0,
    '5.4': currentRoutesPerGrade['5.4'] || 0,
    '5.5': currentRoutesPerGrade['5.5'] || 0,
    '5.6': currentRoutesPerGrade['5.6'] || 0,
    '5.7': currentRoutesPerGrade['5.7'] || 0,
    '5.8': currentRoutesPerGrade['5.8'] || 0,
    '5.9': currentRoutesPerGrade['5.9'] || 0,
    '5.10-': currentRoutesPerGrade['5.10-'] || 0,
    '5.10': currentRoutesPerGrade['5.10'] || 0,
    '5.10+': currentRoutesPerGrade['5.10+'] || 0,
    '5.11-': currentRoutesPerGrade['5.11-'] || 0,
    '5.11': currentRoutesPerGrade['5.11'] || 0,
    '5.11+': currentRoutesPerGrade['5.11+'] || 0,
    '5.12-': currentRoutesPerGrade['5.12-'] || 0,
    '5.12': currentRoutesPerGrade['5.12'] || 0,
    '5.12+': currentRoutesPerGrade['5.12+'] || 0,
    '5.13-': currentRoutesPerGrade['5.13-'] || 0,
    '5.13': currentRoutesPerGrade['5.13'] || 0,
    '5.13+': currentRoutesPerGrade['5.13+'] || 0,
    '5.14-': currentRoutesPerGrade['5.14-'] || 0,
    '5.14': currentRoutesPerGrade['5.14'] || 0,
    '5.14+': currentRoutesPerGrade['5.14+'] || 0,
    '5.15-': currentRoutesPerGrade['5.15-'] || 0,
    '5.15': currentRoutesPerGrade['5.15'] || 0,
    '5.15+': currentRoutesPerGrade['5.15+'] || 0,
  };

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

import React from 'react'
import { Bar } from 'react-chartjs-2'

class RouteIdealVsCurrent extends React.Component {
  render() {

    const {idealRouteGradeCount, currentRouteGradeCount} = this.props.data

    const orderedidealRouteGradeCount = {
      '5.3': idealRouteGradeCount['5_3'] || 0,
      '5.4': idealRouteGradeCount['5_4'] || 0,
      '5.5': idealRouteGradeCount['5_5'] || 0,
      '5.6': idealRouteGradeCount['5_6'] || 0,
      '5.7': idealRouteGradeCount['5_7'] || 0,
      '5.8': idealRouteGradeCount['5_8'] || 0,
      '5.9': idealRouteGradeCount['5_9'] || 0,
      '5.10-': idealRouteGradeCount['5_10-'] || 0,
      '5.10': idealRouteGradeCount['5_10'] || 0,
      '5.10+': idealRouteGradeCount['5_10+'] || 0,
      '5.11-': idealRouteGradeCount['5_11-'] || 0,
      '5.11': idealRouteGradeCount['5_11'] || 0,
      '5.11+': idealRouteGradeCount['5_11+'] || 0,
      '5.12-': idealRouteGradeCount['5_12-'] || 0,
      '5.12': idealRouteGradeCount['5_12'] || 0,
      '5.12+': idealRouteGradeCount['5_12+'] || 0,
      '5.13-': idealRouteGradeCount['5_13-'] || 0,
      '5.13': idealRouteGradeCount['5_13'] || 0,
      '5.13+': idealRouteGradeCount['5_13+'] || 0,
      '5.14-': idealRouteGradeCount['5_14-'] || 0,
      '5.14': idealRouteGradeCount['5_14'] || 0,
      '5.14+': idealRouteGradeCount['5_14+'] || 0,
      '5.15-': idealRouteGradeCount['5_15-'] || 0,
      '5.15': idealRouteGradeCount['5_15'] || 0,
      '5.15+': idealRouteGradeCount['5_15+'] || 0
    }

    const orderedCurrentRouteGradeCount = {
      '5.3': currentRouteGradeCount['5.3'] || 0,
      '5.4': currentRouteGradeCount['5.4'] || 0,
      '5.5': currentRouteGradeCount['5.5'] || 0,
      '5.6': currentRouteGradeCount['5.6'] || 0,
      '5.7': currentRouteGradeCount['5.7'] || 0,
      '5.8': currentRouteGradeCount['5.8'] || 0,
      '5.9': currentRouteGradeCount['5.9'] || 0,
      '5.10-': currentRouteGradeCount['5.10-'] || 0,
      '5.10': currentRouteGradeCount['5.10'] || 0,
      '5.10+': currentRouteGradeCount['5.10+'] || 0,
      '5.11-': currentRouteGradeCount['5.11-'] || 0,
      '5.11': currentRouteGradeCount['5.11'] || 0,
      '5.11+': currentRouteGradeCount['5.11+'] || 0,
      '5.12-': currentRouteGradeCount['5.12-'] || 0,
      '5.12': currentRouteGradeCount['5.12'] || 0,
      '5.12+': currentRouteGradeCount['5.12+'] || 0,
      '5.13-': currentRouteGradeCount['5.13-'] || 0,
      '5.13': currentRouteGradeCount['5.13'] || 0,
      '5.13+': currentRouteGradeCount['5.13+'] || 0,
      '5.14-': currentRouteGradeCount['5.14-'] || 0,
      '5.14': currentRouteGradeCount['5.14'] || 0,
      '5.14+': currentRouteGradeCount['5.14+'] || 0,
      '5.15-': currentRouteGradeCount['5.15-'] || 0,
      '5.15': currentRouteGradeCount['5.15'] || 0,
      '5.15+': currentRouteGradeCount['5.15+'] || 0
    }

    const chartData = {
      labels: Object.keys(orderedidealRouteGradeCount),
      datasets: [
        {
          data: Object.values(orderedidealRouteGradeCount),
          label: 'Ideal Route Grades',
          backgroundColor: 'black',
          fill: false
        },
        {
          data: Object.values(orderedCurrentRouteGradeCount),
          label: 'Current Route Grades',
          backgroundColor: 'darkred',
          fill: false
        }
      ]
  }

    return (
      <div>
        <Bar
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Ideal Vs Current Routes"
              },
              legend: {
                display: true,
                position: "bottom"
              }
            }
          }}
        />
      </div>
    )
  }
}

export default RouteIdealVsCurrent

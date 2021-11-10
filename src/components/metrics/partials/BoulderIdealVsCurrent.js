import React from 'react'
import { Bar } from 'react-chartjs-2'

class BoulderIdealVsCurrent extends React.Component {
  render() {

    const {idealBoulderGradeCount, currentBoulderGradeCount} = this.props.data

    const orderedIdealBoulderGradeCount = {
      'VB': idealBoulderGradeCount['VB'],
      'V0': idealBoulderGradeCount['V0'],
      'V1': idealBoulderGradeCount['V1'],
      'V2': idealBoulderGradeCount['V2'],
      'V3': idealBoulderGradeCount['V3'],
      'V4': idealBoulderGradeCount['V4'],
      'V5': idealBoulderGradeCount['V5'],
      'V6': idealBoulderGradeCount['V6'],
      'V7': idealBoulderGradeCount['V7'],
      'V8': idealBoulderGradeCount['V8'],
      'V9': idealBoulderGradeCount['V9'],
      'V10': idealBoulderGradeCount['V10'],
      'V11': idealBoulderGradeCount['V11'],
      'V12': idealBoulderGradeCount['V12'],
      'V13': idealBoulderGradeCount['V13'],
      'V14': idealBoulderGradeCount['V14'],
      'V15': idealBoulderGradeCount['V15'],
      'V16': idealBoulderGradeCount['V16']
    }
  
    const orderedCurrentBoulderGradeCount = {
      'VB': currentBoulderGradeCount['VB'] || 0,
      'V0': currentBoulderGradeCount['V0'] || 0,
      'V1': currentBoulderGradeCount['V1'] || 0,
      'V2': currentBoulderGradeCount['V2'] || 0,
      'V3': currentBoulderGradeCount['V3'] || 0,
      'V4': currentBoulderGradeCount['V4'] || 0,
      'V5': currentBoulderGradeCount['V5'] || 0,
      'V6': currentBoulderGradeCount['V6'] || 0,
      'V7': currentBoulderGradeCount['V7'] || 0,
      'V8': currentBoulderGradeCount['V8'] || 0,
      'V9': currentBoulderGradeCount['V9'] || 0,
      'V10': currentBoulderGradeCount['V10'] || 0,
      'V11': currentBoulderGradeCount['V11'] || 0,
      'V12': currentBoulderGradeCount['V12'] || 0,
      'V13': currentBoulderGradeCount['V13'] || 0,
      'V14': currentBoulderGradeCount['V14'] || 0,
      'V15': currentBoulderGradeCount['V15'] || 0,
      'V16': currentBoulderGradeCount['V16'] || 0
    }

    const chartData = {
      labels: Object.keys(orderedIdealBoulderGradeCount),
      datasets: [
        {
          data: Object.values(orderedIdealBoulderGradeCount),
          label: 'Ideal Route Grades',
          backgroundColor: 'black',
          fill: false
        },
        {
          data: Object.values(orderedCurrentBoulderGradeCount),
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
                text: "Ideal Vs Current Boulders"
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

export default BoulderIdealVsCurrent

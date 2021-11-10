import React from 'react'
import { Bar } from 'react-chartjs-2'

class BouldersPerSetter extends React.Component {
  render() {
    const chartData = {
      labels: Object.keys(this.props.data) || null,
      datasets: [
        {
          data: Object.values(this.props.data) || null,
          label: 'Total Boulders',
          backgroundColor: 'black',
          fill: false
        },
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
                  text: "Boulders Per Setter"
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


export default BouldersPerSetter

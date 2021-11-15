import React from 'react'
import { Pie } from 'react-chartjs-2'

class BouldersPerColor extends React.Component{

  render() {
    const colorList = Object.keys(this.props.data) || null

    const chartData = {
      labels: colorList,
      datasets: [
        {
          borderColor: 'black',
          borderWidth: 1,
          data: Object.values(this.props.data),
          backgroundColor: colorList,
          hoverOffset: 4
        },
      ]
    }

    return (
      <div className="centered-text" style={{width: 800, height: 360, margin: '0 auto'}}>
        <Pie
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Boulders Per Color"
              },
              legend: {
                display: true,
                position: "bottom"
              }
            },
            maintainAspectRatio: false
          }}
        />
      </div>
    )
  }
}

export default BouldersPerColor
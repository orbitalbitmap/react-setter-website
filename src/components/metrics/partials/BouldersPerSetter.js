import { Bar } from 'react-chartjs-2'

const BouldersPerSetter = (props) => {
  const chartData = {
    labels: Object.keys(props.data) || null,
    datasets: [
      {
        data: Object.values(props.data) || null,
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

export default BouldersPerSetter

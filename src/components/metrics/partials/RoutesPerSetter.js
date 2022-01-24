import { Bar } from 'react-chartjs-2'

const RoutesPerSetter = (props) => {
  const chartData = {
    labels: Object.keys(props.data) || null,
    datasets: [
      {
        data: Object.values(props.data) || null,
        label: 'Total Routes',
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
                text: "Routes Per Setter"
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

export default RoutesPerSetter

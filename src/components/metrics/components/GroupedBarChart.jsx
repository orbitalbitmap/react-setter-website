import useGroupedBarChart from "../hooks/useGroupedBarChart";

const GroupedBarChart = ({data, chartId, width, height}) => {
useGroupedBarChart(data, chartId, width, height)

  return (
    <div className="chart" width="100%">
      <svg id={chartId} height={300} width={450}/>
      <svg id={`${chartId}-legend`} />
    </div>
  
  )
}

export default GroupedBarChart;
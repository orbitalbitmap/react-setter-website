// import { Box } from '@mui/material';
// import { Pie } from 'react-chartjs-2';
// import { useSelector } from 'react-redux';

// function BouldersPerColor() {
//   const bouldersPerColor = useSelector(state => state.metrics.gymMetrics.bouldersPerColor);
//   const data = Object.values(bouldersPerColor);
//   const colorList = Object.keys(bouldersPerColor) || null;

//   const chartData = {
//     labels: colorList,
//     datasets: [
//       {
//         borderColor: 'black',
//         borderWidth: 1,
//         data,
//         backgroundColor: colorList,
//         hoverOffset: 4,
//       },
//     ],
//   };

//   return (
//     <Box className="centered-text" style={{ width: 800, height: 360, margin: '0 auto' }}>
//       <Pie
//         data={chartData}
//         options={{
//           plugins: {
//             title: {
//               display: true,
//               text: 'Boulders Per Color',
//             },
//             legend: {
//               display: true,
//               position: 'bottom',
//             },
//           },
//           maintainAspectRatio: false,
//         }}
//       />
//     </Box>
//   );
// }

// export default BouldersPerColor;

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import * as d3 from 'd3';
import './highlight.css'

function BouldersPerColor() {
  const bouldersPerColor = useSelector(state => state.metrics.gymMetrics.bouldersPerColor);  

  let toggleClass = (element, toggle) => {
    d3.select(element.children[0]).classed('highlightBar', toggle);
    d3.select(element.children[2]).classed('highlightText', toggle);
  };

  useEffect(() => {
    // Step 3
  const svg = d3.select("#boulder-per-color"),
    width = svg.attr("width"),
    height = svg.attr("height"),
    radius = 200;


  var g = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // Step 4
  var ordScale = d3.scaleOrdinal()
    .domain(bouldersPerColor)
    .range(bouldersPerColor.map(data => data.name));

  // Step 5
  var pie = d3.pie().value(function(d) { 
    return d.count; 
    });

  var arc = g.selectAll("arc")
    .data(pie(bouldersPerColor))
      .enter();

  // Step 6
  var path = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);

  arc.append("path")
    .attr("d", path)
    .attr("fill", function(d) { return ordScale(d.data.name); });

  arc.append("text")
  .attr("transform", function(d) {
    return "translate(" + 
      ( (radius + 12) * Math.sin( ((d.endAngle - d.startAngle) / 2) + d.startAngle ) ) +
      ", " +
      ( -1 * (radius + 12) * Math.cos( ((d.endAngle - d.startAngle) / 2) + d.startAngle ) ) +
    ")";
  })
.attr("text-anchor", function(d) {
  // are we past the center?
  return (d.endAngle + d.startAngle)/2 > Math.PI ?
      "end" : "start";
})
    .text(function(d) { return d.data.name; })
    .style("font-family", "arial")
    .style("font-size", 15);

  }, [bouldersPerColor])

  return (
    <>
      <Typography>Boulders Per Color</Typography>
      <svg id="boulder-per-color" width="600" height="600" />
    </>
  )
}

export default BouldersPerColor;

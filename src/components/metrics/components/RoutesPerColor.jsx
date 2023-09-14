import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import * as d3 from 'd3';
import './highlight.css'

function RoutesPerColor() {
  const routesPerColor = useSelector(state => state.metrics.gymMetrics.routesPerColor);  

  function mouseOver() {
    d3.select(this).transition()
      .duration(200)
      .attr('opacity', .5)
  }
  function mouseOut() {
    d3.select(this).transition()
    .duration(200)
      .attr('opacity', 1)
  }

  useEffect(() => {
  const svg = d3.select("#route-per-color"),
    width = svg.attr("width"),
    height = svg.attr("height"),
    radius = 200;

  const g = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  const ordScale = d3.scaleOrdinal()
    .domain(routesPerColor)
    .range(routesPerColor.map(data => data.name));

  const pie = d3.pie().value(function(d) { 
    return d.count; 
    });

  const arc = g.selectAll("arc")
    .data(pie(routesPerColor))
      .enter();

  const path = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);

  arc.append("path")
    .attr("d", path)
    .attr("fill", function(d) { return ordScale(d.data.name); })
    .on('mouseover', mouseOver)
    .on('mouseout', mouseOut);

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

  }, [routesPerColor])

  return (
    <>
      <Typography>Routes Per Color</Typography>
      <svg id="route-per-color" width="600" height="600" />
    </>
  )
}

export default RoutesPerColor;

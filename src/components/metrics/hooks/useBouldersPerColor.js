import { pie as d3Pie, arc as d3Arc, scaleOrdinal, select } from "d3";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useBouldersPerColor = () =>{
  const bouldersPerColor = useSelector(state => state.metrics.gymMetrics.bouldersPerColor);  

  function mouseOver() {
    select(this).attr('opacity', .5)
  }
  function mouseOut() {
    select(this).attr('opacity', 1)
  }

  useEffect(() => {
  const svg = select("#boulders-per-color"),
    width = svg.attr("width"),
    height = svg.attr("height"),
    radius = 200;

  const g = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  const ordScale = scaleOrdinal()
    .domain(bouldersPerColor)
    .range(bouldersPerColor.map(data => data.name));

  const pie = d3Pie().value(function(d) { 
    return d.count; 
    });

  const arc = g.selectAll("arc")
    .data(pie(bouldersPerColor))
      .enter();

  const path = d3Arc()
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

  }, [bouldersPerColor])
}

export default useBouldersPerColor;
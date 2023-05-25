import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import * as d3 from 'd3';
import './highlight.css'

function BouldersPerSetter() {
  const bouldersPerSetter = useSelector(state => state.metrics.gymMetrics.bouldersPerSetter);  

  let toggleClass = (element, toggle) => {
    d3.select(element.children[0]).classed('highlightBar', toggle);
    d3.select(element.children[2]).classed('highlightText', toggle);
  };

  useEffect(() => {
  const svg = d3.select("#boulder-per-setter")
      .attr("width", 1000)
      .attr("height", 300)
      .attr("font-family", "sans-serif")
      .attr("font-size", "10")
      .attr("text-anchor", "end");

  const bar = svg.selectAll("g")
    .data(bouldersPerSetter)
      .enter()
    .append("g")
    .on("mouseover", function () { toggleClass(this, true); })
    .on("mouseout", function() { toggleClass(this, false); })

  bar.append("rect")
      .attr("fill", "#364784")
      .attr("width", d => d.count * 20)
      .attr("height", 30)
      .attr("x", 60)
      .attr('y', (d,i) => i * 35)
      .attr('padding', '4px')

  bar.append("text")
      .attr("fill", "black")
      .attr("x", 55)
      .attr("y",  (d,i) =>  i * 35)
      .attr("dy", 20)
      .text(d => d.name);

  bar.append("text")
      .attr("fill", "white")
      .attr("x", d => d.count * 20 + 56)
      .attr("y",  (d,i) =>  i * 35)
      .attr("dy", 20)
      .text(d => d.count);
  }, [bouldersPerSetter])

  return (
    <>
      <Typography>Boulders Per Setter</Typography>
      <svg id="boulder-per-setter"></svg>
    </>
  )
}

export default BouldersPerSetter;

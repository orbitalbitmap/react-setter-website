import { axisBottom, axisLeft, group, max, scaleBand, scaleLinear, scaleOrdinal, select } from "d3";
import { useEffect } from "react";

const useGroupedBarChart = (data, chartId, width, height) => {
  const marginTop = 10;
  const marginRight = 10;
  const marginBottom = 20;
  const marginLeft = 40;

  function mouseOver() {
    select(this).attr('opacity', .5)
  }

  function mouseOut() {
    select(this).attr('opacity', 1)
  }

  useEffect(() => {
    const grades = new Set(data?.map(d => d.label));
    const types = new Set(data?.map(d => d.type));
    // Prepare the scales for positional and color encodings.
    // Fx encodes the state.
    const fx = scaleBand()
      .domain(grades)
      .rangeRound([marginLeft, width - marginRight])
      .paddingInner(0.2);

    // Both x and color encode the type class.
    const x = scaleBand()
      .domain(types)
      .rangeRound([0, fx.bandwidth()])
      .padding(0.05);

    const color = scaleOrdinal(types, ['red', 'black'])
      // .domain(types, ['red', 'black']);

    // Y encodes the height of the bar.
    const y = scaleLinear()
      .domain([0, max(data, d => d.value)]).nice()
      .rangeRound([height - marginBottom, marginTop]);

    // Create the SVG container.
    const svg = select(`#${chartId}`)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    // Append a group for each grade, and a rect for each category type.
    svg.append("g")
      .selectAll()
      .data(group(data, d => d.label))
      .join("g")
        .attr("transform", ([label]) => `translate(${fx(label)},0)`)
      .selectAll()
      .data(([, d]) => d)
      .join("rect")
        .attr("id", d => `${d.type}-${d.label}`)
        .attr("x", (d, i) => x(d.type))
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => y(0) - y(d.value))
        .attr("fill", d => color(d.type))
        .on('mouseover', mouseOver)
        .on('mouseout', mouseOut)
        .append("title") // tooltip
          .text(d => `${d.type} ${d.label}\n ${d.value}`)
        

    // Append the horizontal axis.
    svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(axisBottom(fx).tickSizeOuter(0))
      .call(g => g.selectAll(".domain").remove());

    // Append the vertical axis.
    svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(axisLeft(y).ticks(null))
      .call(g => g.selectAll(".domain").remove());

  let size = 20;
  const legend = select(`#${chartId}-legend`)
    .attr("width", 450)
    .attr("height", 300)
    .attr("viewBox", [0, 0, 450, 300])

  legend.selectAll("legend-squares")
    .data(types)
    .enter()
    .append("rect")
      .attr("x", 100)
      .attr("y", function(d,i){ return 100 + i*(size+5)}) // 100 is where the first square appears. 25 is the distance between square
      .attr("width", size)
      .attr("height", size)
      .style("fill", function(d){ return color(d)})
  
  // Add one square in the legend for each name.
  legend.selectAll("legend-labels")
    .data(types)
    .enter()
    .append("text")
      .attr("x", 100 + size*1.2)
      .attr("y", function(d,i){ return 100 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
      .style("fill", function(d){ return color(d)})
      .text(function(d){ return d})
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")
}, [data, width, height, chartId])
}

export default useGroupedBarChart;
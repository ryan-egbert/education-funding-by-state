const margin = {top: 20, right: 20, bottom: 30, left: 40};
const width = 1000 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const rectWidth = width / 12;
const rectHeight = height / 10;

function matrix(data){ 
  let svg = d3.select("#Matrix")
              .append("svg")
              .attr("width",width)
              .attr("height",height);
  let currentRectangles = svg.selectAll('rect');

  currentRectangles
    .exit()
    .remove();

  currentRectangles.data(data)
    .enter()
    .append("rect")
    .attr("class", "tile")
    .attr("x", function(d) { return +d.Column * rectWidth; })
    .attr("width", rectWidth)
    .attr("y", function(d) { return +d.Row * rectHeight })
    .attr("height", function(d) { return rectHeight; })
    .attr("id", function(d){return `${d.Abbreviation + `Matrix`}`})
    .merge(currentRectangles)
}
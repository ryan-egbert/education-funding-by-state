let matrix_margin = {top: 20, right: 20, bottom: 30, left: 40};
let matrix_width = 750 - matrix_margin.left - matrix_margin.right;
let matrix_height = 500 - matrix_margin.top - matrix_margin.bottom;

const rect_width = matrix_width / 12;
const rect_height = matrix_height / 10;

function matrix(data){ 
  let svg = d3.select("#Matrix")
              .append("svg")
              .attr("width",matrix_width)
              .attr("height",matrix_height);
  let currentRectangles = svg.selectAll('rect');

  currentRectangles
    .exit()
    .remove();

  currentRectangles.data(data)
    .enter()
    .append("rect")
    .attr("class", "tile")
    .attr("x", function(d) { return +d.Column * rect_width; })
    .attr("width", rect_width)
    .attr("y", function(d) { return +d.Row * rect_height })
    .attr("height", function(d) { return rect_height; })
    .attr("id", function(d){return `${d.Abbreviation + `Matrix`}`})
    .attr("rx", 10)
    .on("mouseover", (d,i) => {
      d3.select(event.currentTarget).style("fill", "#ff0000");
    })
    .on("mouseout", (d,i) => {
      d3.select(event.currentTarget).style("fill", "#ff6060")
    })
    .merge(currentRectangles)

    svg.selectAll('label')
    .data(data)
    .enter()
    .append('text')
    .attr('x', d => rect_width*d.Column + rect_width/2)
    .attr('y', d => rect_height*d.Row + rect_height)
    .attr('dy', '-1em')
    .text(d => `${d.Abbreviation}`)
    .attr('text-anchor', 'middle')
    .classed('tilestext', true)
    .attr('class', 'label')
    .attr('pointer-events', 'none')
}
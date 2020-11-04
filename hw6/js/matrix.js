let matrix_margin = {top: 20, right: 20, bottom: 30, left: 40};
let matrix_width = 750 - matrix_margin.left - matrix_margin.right;
let matrix_height = 500 - matrix_margin.top - matrix_margin.bottom;
let colors = ["#e41a1c", "#377eb8", "#4daf4a", "#000000", "#e41a1c", "#377eb8", "#4daf4a"]
let c_index = 0;

let plus = "#52d972"
let minus = "#ff8586"
let plus_deep = "#00940c";
let minus_deep = "#ff333a";

const rect_width = matrix_width / 12;
const rect_height = matrix_height / 10;

function matrix(data, fin_data, year){ 
  let plus_states = new Set();
  let minus_states = new Set();
  // console.log(data);
  // console.log(fin_data);
  // console.log(year)
  d3.selectAll("#Matrix > *").remove();
  let svg = d3.select("#Matrix")
              .append("svg")
              .attr("width",matrix_width)
              .attr("height",matrix_height);
  let currentRectangles = svg.selectAll('rect');

  currentRectangles
    .exit()
    .remove();

  console.log(data)

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
    .style("fill", d => {
      let total_expend = 0;
      let total_rev = 0;
      for (let i = 0; i < fin_data.length; i++) {
        if (fin_data[i].state_lc == d.State && fin_data[i].year == year) {
          total_expend = fin_data[i].total_expend;
          total_rev = fin_data[i].total_rev;
          break;
        }
      }
      if (total_expend > total_rev) {
        minus_states.add(d.State);
        return minus;
      }
      else {
        plus_states.add(d.State);
        return plus;
      }
    })
    .on("mouseover", (d,i) => {
      // console.log(minus_states);
      // console.log(plus_states)
      if (minus_states.has(d.State)) {
        d3.select(event.currentTarget).style("fill", minus_deep);
      }
      else {
        d3.select(event.currentTarget).style("fill", plus_deep);
      }
      d3.selectAll(`.${d.State.replace(" ", "_")}`)
        .style("fill", d => {
          let res = colors[c_index];
          c_index++;
          return res;
        });
      d3.selectAll(`.${d.State.replace(" ", "_")}_circle`)
        .style("fill", "black")
    })
    .on("mouseout", (d,i) => {
      if (minus_states.has(d.State)) {
        d3.select(event.currentTarget).style("fill", minus);
      }
      else {
        d3.select(event.currentTarget).style("fill", plus);
      }
      d3.selectAll(`.${d.State.replace(" ", "_")}`)
        .style("fill", "#bbbbbb");
      d3.selectAll(`.${d.State.replace(" ", "_")}_circle`)
        .style("fill", "none")
      c_index = 0;
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
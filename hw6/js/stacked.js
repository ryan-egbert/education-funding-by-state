let stacked_margin = {top: 20, right: 20, bottom: 30, left: 40};
let stacked_width = 750 - stacked_margin.left - stacked_margin.right;
let stacked_height = 250 - stacked_margin.top - stacked_margin.bottom;

function expendBarGraph(all_data, year){
  let data = [];
  all_data.forEach(d => {
    if (d.year == year) {
      data.push(d);
    }
  });
  var subgroups = ["instrunction_expend", "support_expend", "capital_expend" , "other_expend"];
  var groups = d3.map(data, function(d){return(d.state_lc)}).keys()
  // // console.log(groups)
  // append the svg object to the body of the page
  d3.selectAll("#Expend > *").remove();
  let svg = d3.select("#Expend")
              .append("svg")
              .attr("width", stacked_width + stacked_margin.left + stacked_margin.right)
              .attr("height", stacked_height + stacked_margin.top + stacked_margin.bottom)
              .append("g")
              .attr("transform", "translate(" + stacked_margin.left + "," + stacked_margin.top + ")");

  let x = d3.scaleBand()
            .domain(groups)
            .range([0, stacked_width])
            .padding([0.2])

  svg.append("g")
     .attr("transform", "translate(0," + stacked_height + ")")
     .call(d3.axisBottom(x).tickFormat(""));

  let y = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return +d.total_expend; })])
            .range([ stacked_height, 0 ]);

  svg.append("g")
     .call(d3.axisLeft(y).tickFormat(""))
  // color palette = one color per subgroup
  var color = d3.scaleOrdinal()
                .domain(subgroups)
                .range(['#e41a1c','#377eb8','#4daf4a', '#000000'])

  var stackedData = d3.stack()
                      .keys(subgroups)(data)
 
  // console.log(stackedData);

  // Show the bars
  svg.append("g")
  .selectAll("g")
  .data(stackedData)
  .enter().append("g")
    .attr("fill", function(d) { return color(d.key); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
            .attr("x", function(d) { return x(d.data.state_lc) })
            .attr("y", function(d) { return y(d[1]); })
            .attr("height", function(d) { return y(d[0]) - y(d[1]); })
            .attr("width",x.bandwidth())
            .on('mouseover', function(d){
                  d3.select(this)
                  .append("svg:title")
                  .text(`${d.data.state_lc}\n Percent of Total: ${100 * (+d[1] - +d[0])/ d.data.total_expend}`);
            })
      var legend = svg.selectAll(".legend")
                      .data(color.range())
                      .enter().append("g")
                      .attr("class", "legend")
                      .attr("transform", function(d, i) { return "translate(-225," + i * 19 + ")"; });
      // console.log(color.range())
      legend.append("rect")
            .attr("x", stacked_width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function(d, i) {
                  return color.range()[i]});
           
      legend.append("text")
            .attr("x", stacked_width + 5)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .text(function(d, i) { 
              switch (i) {
                case 0: return "Instructional Expenditures";
                case 1: return "Support Expenditures";
                case 2: return "Capital Expenditures";
                case 3: return "Other Expenditures";
              }
            });
}

function revenueBarGraph(all_data, year){
      let data = [];
      all_data.forEach(d => {
        if (d.year == year) {
          data.push(d);
        }
      });
      var subgroups = ["local_rev", "state_rev", "fed_rev"];
      var groups = d3.map(data, function(d){return(d.state_lc)}).keys()
      // console.log(groups)
      // append the svg object to the body of the page
      d3.select("#Revenue > *").remove();
      let svg = d3.select("#Revenue")
                  .append("svg")
                  .attr("width", stacked_width + stacked_margin.left + stacked_margin.right)
                  .attr("height", stacked_height + stacked_margin.top + stacked_margin.bottom)
                  .append("g")
                  .attr("transform", "translate(" + stacked_margin.left + "," + stacked_margin.top + ")");
    
      let x = d3.scaleBand()
                .domain(groups)
                .range([0, stacked_width])
                .padding([0.2])
    
      svg.append("g")
         .attr("transform", "translate(0," + stacked_height + ")")
         .call(d3.axisBottom(x).tickFormat(""));
    
      let y = d3.scaleLinear()
                .domain([0, d3.max(data, function(d) { return +d.total_rev; })])
                .range([ stacked_height, 0 ]);
    
      svg.append("g")
         .call(d3.axisLeft(y).tickFormat(""))
      // color palette = one color per subgroup
      var color = d3.scaleOrdinal()
                    .domain(subgroups)
                    .range(['#e41a1c','#377eb8','#4daf4a'])
    
      var stackedData = d3.stack()
                          .keys(subgroups)(data)
     
      // console.log(stackedData);
    
      // Show the bars
      svg.append("g")
      .selectAll("g")
      .data(stackedData)
      .enter().append("g")
        .attr("fill", function(d) { return color(d.key); })
        .selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
                .attr("x", function(d) { return x(d.data.state_lc) })
                .attr("y", function(d) { return y(d[1]); })
                .attr("height", function(d) { return y(d[0]) - y(d[1]); })
                .attr("width",x.bandwidth())
                .on('mouseover', function(d){
                  d3.select(this)
                  .append("svg:title")
                  .text(`${d.data.state_lc}\n Percent of Total: ${100 * (+d[1] - +d[0])/ d.data.total_rev}`);
         });
      
      var legend = svg.selectAll(".legend")
                      .data(color.range())
                      .enter().append("g")
                      .attr("class", "legend")
                      .attr("transform", function(d, i) { return "translate(-225," + i * 19 + ")"; });
      legend.append("rect")
            .attr("x", stacked_width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function(d, i) {return color.range()[i]});
                 
      legend.append("text")
            .attr("x", stacked_width + 5)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .text(function(d, i) { 
                  switch (i) {
                      case 0: return "Local Revenue";
                      case 1: return "State Revenue";
                      case 2: return "Federal Revenue";
                  }
            });   
}

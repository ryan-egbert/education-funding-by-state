function expendBarGraph(data){
  var subgroups = ["instrunction_expend", "support_expend", "other_expend", "capital_expend"];
  var groups = d3.map(data, function(d){return(d.state_lc)}).keys()
  console.log(groups)
  // append the svg object to the body of the page
  let svg = d3.select("#Expend")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  let x = d3.scaleBand()
            .domain(groups)
            .range([0, width])
            .padding([0.2])

  svg.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(x).tickFormat(""));

  let y = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return +d.total_expend; })])
            .range([ height, 0 ]);

  svg.append("g")
     .call(d3.axisLeft(y).tickFormat(""))
  // color palette = one color per subgroup
  var color = d3.scaleOrdinal()
                .domain(subgroups)
                .range(['#e41a1c','#377eb8','#4daf4a', '#000000'])

  var stackedData = d3.stack()
                      .keys(subgroups)(data)
 
  console.log(stackedData);

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
}

function revenueBarGraph(data){
      var subgroups = ["local_rev", "state_rev", "fed_rev"];
      var groups = d3.map(data, function(d){return(d.state_lc)}).keys()
      console.log(groups)
      // append the svg object to the body of the page
      let svg = d3.select("#Revenue")
                  .append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
      let x = d3.scaleBand()
                .domain(groups)
                .range([0, width])
                .padding([0.2])
    
      svg.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(x).tickFormat(""));
    
      let y = d3.scaleLinear()
                .domain([0, d3.max(data, function(d) { return +d.total_rev; })])
                .range([ height, 0 ]);
    
      svg.append("g")
         .call(d3.axisLeft(y).tickFormat(""))
      // color palette = one color per subgroup
      var color = d3.scaleOrdinal()
                    .domain(subgroups)
                    .range(['#e41a1c','#377eb8','#4daf4a'])
    
      var stackedData = d3.stack()
                          .keys(subgroups)(data)
     
      console.log(stackedData);
    
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
}


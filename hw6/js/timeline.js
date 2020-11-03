
function minSet(s) {
    min = null;
    s.forEach(e => {
        if (min == null || e < min) {
            min = e;
        }
    });

    return min;
}

function maxSet(s) {
    max = null;
    s.forEach(e => {
        if (max == null || e > max) {
            max = e;
        }
    });

    return max;
}

function createTimeline(data) {
    svg = d3.select("#timeline");
    years = new Set();
    for (let i = 0; i < data.length; i++) {
        years.add(parseInt(data[i].year));
    }

    let margin = 30;
    let xscale = d3.scaleLinear()
        .domain([minSet(years), maxSet(years)])
        .range([margin, 1350 - margin]);

    svg.selectAll("line")
        .data([{x1:margin,x2:1350-margin,y1:25,y2:25}])
        .enter()
        .append("line")
        .attr("x1", d => d.x1)
        .attr("x2", d => d.x2)
        .attr("y1", d => d.y1)
        .attr("y2", d => d.y2)
        .attr("style", "stroke: black");

    // svg.selectAll("circle").exit().remove();

    svg.selectAll("circle")
        .data(Array.from(years))
        .enter()
        .append("circle")
        .attr("r", 10)
        .attr("cx", d => xscale(d))
        .attr("cy", 25)
        .attr("fill", "black")
        .on("mouseover", (d,i) => {
            let bubble = d3.select(event.currentTarget);
            bubble.attr("r", 15);
            bubble.style("fill", "red");

            let text = d3.select(`#circle-${d}`);
            text.style("font-size", "2em");
            text.style("color", "red");
        })
        .on("mouseout", (d,i) => {
            let bubble = d3.select(event.currentTarget);
            bubble.attr("r", 10);
            bubble.style("fill", "black");

            let text = d3.select(`#circle-${d}`);
            text.style("font-size", "1em");
            text.style("color", "black");
        })

    svg.selectAll("text")
        .data(Array.from(years))
        .enter()
        .append("text")
        .text(d => d)
        .attr("id", d => `circle-${d}`)
        .attr("x", d => xscale(d))
        .attr("y", 55)
        .attr("text-anchor", "middle");
}


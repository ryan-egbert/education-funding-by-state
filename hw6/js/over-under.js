function minArrX(arr) {
    let min = null;
    for (let i = 0; i < arr.length; i++) {
        if (min == null || arr[i].percent < min) {
            min = arr[i].percent;
        }
    }
    return min;
}

function maxArrX(arr) {
    let max = null;
    for (let i = 0; i < arr.length; i++) {
        if (max == null || arr[i].percent > max) {
            max = arr[i].percent;
        }
    }
    return max;
}

function minArrR(arr) {
    let min = null;
    for (let i = 0; i < arr.length; i++) {
        if (min == null || parseInt(arr[i].enroll) < min) {
            min = parseInt(arr[i].enroll);
        }
    }
    return min;
}

function maxArrR(arr) {
    let max = null;
    for (let i = 0; i < arr.length; i++) {
        if (max == null || parseInt(arr[i].enroll) > max) {
            max = parseInt(arr[i].enroll);
        }
    }
    return max;
}

function updateOverUnderList(state_list) {
    let html = "<ul>";
    for (let i = 0; i < state_list.length; i++) {
        let color = "#52d972";
        if (state_list[i].percent < 1) {
            color = "#ff8586";
        }
        html += `<li style="color: ${color}">${state_list[i].state}</li>`
    }
    html += "</ul>"

    d3.select("#over-under-list").html(html);
}

function createOverUnder(state_data, year) {
    d3.selectAll("#over-under > *").remove();
    let svg = d3.select("#over-under");

    let all_states = []

    for (let i = 0; i < state_data.length; i++) {
        if (state_data[i].year == year) {
            let perc = state_data[i].total_rev / state_data[i].total_expend
            all_states.push({
                state: state_data[i].state_lc,
                enroll: state_data[i].enroll,
                percent: perc
            });
        }
    }

    all_states.sort((a,b) => {
        return b.percent - a.percent;
    });

    let xscale = d3.scaleLinear()
        // .domain([minArrX(all_states), maxArrX(all_states)])
        .domain([0.9,1.1])
        .range([30,1170])

    let rscale = d3.scaleLinear()
        .domain([minArrR(all_states), maxArrR(all_states)])
        .range([5,12])

    // console.log(minArrX(all_states))
    // console.log(maxArrX(all_states))
    // console.log(minArrX(all_states))
    // console.log(minArrX(all_states))
    // console.log(all_states[0])
    // console.log(xscale(all_states[0].enroll))
    // console.log(xscale(parseInt(all_states[0].enroll)))

    console.log(all_states)
    console.log(xscale(all_states[50].percent))

    let margin = 30

    let centerLine = svg.selectAll("line")
        .data([0.9, 1, 1.1]);
    
    centerLine.enter()
        .append("line")
        .merge(centerLine)
        .attr("x1", d => xscale(d))
        .attr("x2", d => xscale(d))
        .attr("y1", 20)
        .attr("y2", 70)
        .style("stroke", "black")
        .style("stroke-width", 3)

    svg.selectAll("line")
        .data(all_states)
        .enter()
        .append("line")
        // .merge(centerLine)
        .attr("x1", d => xscale(d.percent))
        .attr("x2", d => xscale(d.percent))
        .attr("y1", d => 45 + rscale(d.enroll))
        .attr("y2", d => 45 - rscale(d.enroll))
        .style("stroke", d => {
            if (d.percent < 1) {
                return "red";
            }
            else {
                return "green";
            }
        })
        .style("stroke-width", 2)
        .attr("class","over-under-lines")

    let circles = svg.selectAll("circle")
        .data(all_states)
    
    circles
        .enter()
        .append("circle")
        .attr("cx", d => xscale(d.percent))
        .attr("cy", 45)
        .attr("r", d => rscale(parseInt(d.enroll)))
        .attr("class", d => `${d.state.replace(" ", "_")}_circle`)
        // .attr("width", d => xscale(parseInt(d.enroll)))
        // .attr("height", 15)
        .style("fill", "none")
        .style("stroke", "none");

    let textPos = [
        { text: "-10%", x: 30, y: 100 },
        { text: "0%", x: 600, y: 100 },
        { text: "10%", x: 1170, y: 100 },
    ]
    svg.selectAll("text")
        .data(textPos)
        .enter()
        .append("text")
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .attr("text-anchor", "middle")
        .text(d => d.text);

    let brush = d3.brushX()
        .extent([[0,0], [1200,75]])
        .on("end", () => {
            let x0 = d3.event.selection[0];
            let x1 = d3.event.selection[1];
            let lines = svg.selectAll("line.over-under-lines")
            let selected = [];

            lines.each(d => {
                let x = xscale(d.percent)
                if (x > x0 && x < x1) {
                    selected.push(d)
                }
            });

            updateOverUnderList(selected);
        })

    svg.append("g").attr("class", "brush").call(brush);
}
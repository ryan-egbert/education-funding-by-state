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

function create_over_under(state_data, year) {
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
        .range([30,1030])

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

    svg.selectAll("circle")
        .data(all_states)
        .enter()
        .append("circle")
        .attr("cx", d => 30 + xscale(d.percent))
        .attr("cy", 15)
        .attr("r", d => rscale(parseInt(d.enroll)))
        .attr("class", d => `${d.state.replace(" ", "_")}_circle`)
        // .attr("width", d => xscale(parseInt(d.enroll)))
        // .attr("height", 15)
        .style("fill", "none")
        .style("stroke", "black")
}
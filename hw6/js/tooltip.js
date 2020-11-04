function createTooltip() {
    let tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("border", "solid black 1px")
        .style("padding", "10px")
        .style("z-index", "10")
        .style("visibility", "hidden")
        // .attr("opacity", 0)
        .style("background", "#FFFFFF")
        .attr('id', 'tooltip')
        .attr('class', 'tooltipDiv');
}

function tooltipClass(data) {
    if (data.total_rev < data.total_expend) {
        return "under";
    }
    return "over";
}

function gainLoss(data) {
    if (data.total_rev < data.total_expend) {
        return "Loss";
    }
    return "Gain";
}

function tooltipHtml(data) {
    let html = `<h2 class="${tooltipClass(data)}">${data.state}</h2>`;
    html += `<p>Total Revenue : ${data.total_rev}</p>`;
    html += `<p>Total Expenditures : ${data.total_expend}</p>`;
    html += `<p class="${tooltipClass(data)}">Net ${gainLoss(data)} for ${data.year} : ${data.total_rev - data.total_expend}</p>`

    return html;
}

function tooltipMouseOver(data) {
    let tooltip = d3.select("#tooltip");
    tooltip.html(tooltipHtml(data))
        .style("visibility", "visible");
}

function tooltipMouseMove() {
    let tooltip = d3.select("#tooltip");
    tooltip.style("top", (d3.event.pageY-10)+"px")
        .style("left", (d3.event.pageX+10)+"px")
}

function tooltipMouseOut() {
    let tooltip = d3.select("#tooltip");
    tooltip.style("visibility", "hidden")
}
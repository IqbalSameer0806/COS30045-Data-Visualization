
d3.csv("data/ARE_Spot_Prices.csv", d => {
    return {
        year: +d.Year,
        averagePrice: +d["Average Price (notTas-Snowy)"]
    };
}).then(data => {

    data.sort((a, b) => a.year - b.year);

    console.log("Processed electricity data:", data);

    drawLineChart(data);

}).catch(error => {
    console.error("Error loading electricity data:", error);
});

const drawLineChart = data => {

    const width = 800;
    const height = 500;

    const margin = {
        top: 50,
        right: 40,
        bottom: 80,
        left: 100
    };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select("#line-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("border", "1px solid black");

    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.averagePrice)])
        .nice()
        .range([innerHeight, 0]);

    const bottomAxis = d3.axisBottom(xScale)
        .ticks(10)
        .tickFormat(d3.format("d"));

    const leftAxis = d3.axisLeft(yScale);

    innerChart.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    innerChart.append("g")
        .call(leftAxis);

    innerChart.append("text")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 55)
        .attr("text-anchor", "middle")
        .style("font-size", "15px")
        .text("Year");

    innerChart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -65)
        .attr("text-anchor", "middle")
        .style("font-size", "15px")
        .text("Average Electricity Price ($/MWh)");

    const lineGenerator = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.averagePrice));

    innerChart.append("path")
        .datum(data)
        .attr("d", lineGenerator)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2.5);

    innerChart.selectAll(".data-point")
        .data(data)
        .join("circle")
        .attr("class", "data-point")
        .attr("r", 4)
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d.averagePrice))
        .attr("fill", "darkorange");
};

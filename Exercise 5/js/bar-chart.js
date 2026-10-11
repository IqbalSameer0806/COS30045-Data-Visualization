

d3.csv("data/Data_exercise 5.1-1.csv", d => {
    return {
        screenType: d.Screen_Tech,
        energy: +d["Mean(Labelled energy consumption (kWh/year))"]
    };
}).then(data => {

    data.sort((a, b) => b.energy - a.energy);

    console.log("Processed data:", data);

    drawBarChart(data);

}).catch(error => {
    console.error("Error loading data:", error);
});

const drawBarChart = data => {

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

    const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("border", "1px solid black");

    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleBand()
        .domain(data.map(d => d.screenType))
        .range([0, innerWidth])
        .padding(0.3);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.energy)])
        .nice()
        .range([innerHeight, 0]);

    const bottomAxis = d3.axisBottom(xScale);

    const leftAxis = d3.axisLeft(yScale);

    innerChart.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    innerChart.append("g")
        .call(leftAxis);

    innerChart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -65)
        .attr("text-anchor", "middle")
        .style("font-size", "15px")
        .text("Average Energy Consumption (kWh/year)");

    innerChart.append("text")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 55)
        .attr("text-anchor", "middle")
        .style("font-size", "15px")
        .text("Screen Technology");

    innerChart.selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.screenType))
        .attr("y", d => yScale(d.energy))
        .attr("width", xScale.bandwidth())
        .attr("height", d => innerHeight - yScale(d.energy))
        .attr("fill", "steelblue");

    innerChart.selectAll(".value-label")
        .data(data)
        .join("text")
        .attr("class", "value-label")
        .attr("x", d => xScale(d.screenType) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d.energy) - 10)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text(d => d.energy.toFixed(2));
};

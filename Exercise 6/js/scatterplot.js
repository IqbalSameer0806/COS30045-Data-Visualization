function drawScatterplot(data) {

    // Convert star ratings into numbers
    const scatterData = data.filter(d =>
        Number.isFinite(+d.star) &&
        Number.isFinite(d.energyConsumption)
    );

    // Create SVG
    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("width", width)
        .attr("height", height);

    // Create inner chart
    innerChartS = svg.append("g")
        .attr(
            "transform",
            `translate(${margin.left}, ${margin.top})`
        );

    // X scale: Star rating
    xScaleS
        .domain([0, d3.max(scatterData, d => +d.star)])
        .range([0, innerWidth])
        .nice();

    // Y scale: Energy consumption
    yScaleS
        .domain([0, d3.max(scatterData, d => d.energyConsumption)])
        .range([innerHeight, 0])
        .nice();

    // Draw circles
    innerChartS
        .selectAll(".scatter-point")
        .data(scatterData)
        .join("circle")
        .attr("class", "scatter-point")
        .attr("r", 4)
        .attr("cx", d => xScaleS(+d.star))
        .attr("cy", d => yScaleS(d.energyConsumption))
        .attr("fill", d => colorScale(d.screenTech))
        .attr("opacity", 0.5);

    // X axis
    innerChartS
        .append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(xScaleS));

    // Y axis
    innerChartS
        .append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(yScaleS));

    // X axis label
    innerChartS
        .append("text")
        .attr("class", "axis-label")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 55)
        .attr("text-anchor", "middle")
        .text("Star Rating");

    // Y axis label
    innerChartS
        .append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -50)
        .attr("text-anchor", "middle")
        .text("Energy Consumption (kWh/year)");

    // Legend
    const legend = innerChartS
        .append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${innerWidth - 95}, 10)`);

    const categories = ["LCD", "LED", "OLED"];

    const legendItems = legend
        .selectAll(".legend-item")
        .data(categories)
        .join("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => `translate(0, ${i * 22})`);

    legendItems
        .append("rect")
        .attr("width", 14)
        .attr("height", 14)
        .attr("fill", d => colorScale(d));

    legendItems
        .append("text")
        .attr("x", 22)
        .attr("y", 11)
        .attr("font-size", "13px")
        .text(d => d);

    console.log("Scatterplot created:", scatterData.length, "TVs");
}
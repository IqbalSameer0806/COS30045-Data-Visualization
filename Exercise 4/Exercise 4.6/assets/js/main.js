
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 600 900")
    .style("border", "1px solid black");

d3.csv("data/tvBrandCount.csv", d => {
    return {
        brand: d.brand,
        count: +d.count
    };
}).then(data => {

    data.sort((a, b) => b.count - a.count);

    console.log("Loaded TV brand data:", data);

    drawBarChart(data);

}).catch(error => {
    console.error("Error loading CSV:", error);
});

const drawBarChart = data => {

    const xScale = d3.scaleLinear()
        .domain([0, 1200])
        .range([0, 400]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, 900])
        .padding(0.15);

    const barAndLabel = svg
        .selectAll("g.bar-group")
        .data(data)
        .join("g")
        .attr("class", "bar-group")
        .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

    barAndLabel
        .append("rect")
        .attr("x", 130)
        .attr("y", 0)
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "steelblue");

    barAndLabel
        .append("text")
        .text(d => d.brand)
        .attr("x", 120)
        .attr("y", yScale.bandwidth() / 2)
        .attr("text-anchor", "end")
        .attr("dominant-baseline", "middle")
        .style("font-size", "13px");

    barAndLabel
        .append("text")
        .text(d => d.count)
        .attr("x", d => 135 + xScale(d.count))
        .attr("y", yScale.bandwidth() / 2)
        .attr("dominant-baseline", "middle")
        .style("font-size", "13px");
};

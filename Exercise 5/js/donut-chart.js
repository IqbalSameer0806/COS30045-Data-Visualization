
d3.csv("data/Data_exercise 5.3.csv", d => {
    return {
        category: d.Screensize_Category,
        count: +d.Count
    };
}).then(data => {

    console.log("Processed donut data:", data);

    drawDonutChart(data);

}).catch(error => {
    console.error("Error loading donut chart data:", error);
});

const drawDonutChart = data => {

    const width = 800;
    const height = 500;

    const radius = Math.min(width, height) / 2 - 60;

    const total = d3.sum(data, d => d.count);

    const colorScale = d3.scaleOrdinal()
        .domain(data.map(d => d.category))
        .range(d3.schemeSet2);

    const pieGenerator = d3.pie()
        .value(d => d.count)
        .sort(null);

    const arcGenerator = d3.arc()
        .innerRadius(radius * 0.6)
        .outerRadius(radius)
        .padAngle(0.02)
        .cornerRadius(5);

    const svg = d3.select("#donut-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("border", "1px solid black");

    const innerChart = svg.append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const arcs = pieGenerator(data);

    innerChart.selectAll(".donut-slice")
        .data(arcs)
        .join("path")
        .attr("class", "donut-slice")
        .attr("d", arcGenerator)
        .attr("fill", d => colorScale(d.data.category))
        .attr("stroke", "white")
        .attr("stroke-width", 2);

    innerChart.selectAll(".donut-label")
        .data(arcs)
        .join("text")
        .attr("class", "donut-label")
        .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .text(d => {
            const percentage = (d.data.count / total) * 100;
            return `${d.data.category} ${percentage.toFixed(1)}%`;
        });

    innerChart.append("text")
        .attr("text-anchor", "middle")
        .attr("y", -5)
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .text("TV Models");

    innerChart.append("text")
        .attr("text-anchor", "middle")
        .attr("y", 22)
        .style("font-size", "16px")
        .text(`Total: ${total.toLocaleString()}`);
};


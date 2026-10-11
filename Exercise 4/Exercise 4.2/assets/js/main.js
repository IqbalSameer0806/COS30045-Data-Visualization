d3.select("h1")
    .style("color", "green");

d3.select(".hero-content")
    .append("p")
    .text("Purchasing a low energy consumption TV will help with your energy bills!");

d3.select("#d3-demo")
    .append("rect")
    .attr("x", 50)
    .attr("y", 50)
    .attr("width", 100)
    .attr("height", 30)
    .style("fill", "green");
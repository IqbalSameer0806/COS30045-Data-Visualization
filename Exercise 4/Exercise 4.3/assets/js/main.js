d3.csv("data/tvBrandCount.csv", d => {
    return {
        brand: d.brand,
        count: +d.count
    };
}).then(data => {

    console.log("TV Brand Data:");
    console.log(data);

    console.log("Number of brands:");
    console.log(data.length);

    console.log("Maximum count:");
    console.log(d3.max(data, d => d.count));

    console.log("Minimum count:");
    console.log(d3.min(data, d => d.count));

    console.log("Count extent:");
    console.log(d3.extent(data, d => d.count));

    data.sort((a, b) => b.count - a.count);

    console.log("Sorted data:");
    console.log(data);

    drawBarChart(data);
});

function drawBarChart(data) {
    console.log("Data passed to drawBarChart:");
    console.log(data);
}
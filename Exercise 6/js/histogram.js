function drawHistogram(data) {

    // Create SVG
    const svg = d3.select("#histogram")
        .append("svg")
        .attr("width", width)
        .attr("height", height);


    // Create inner chart
    const innerChart = svg.append("g")
        .attr(
            "transform",
            `translate(${margin.left}, ${margin.top})`
        );


    // Generate histogram bins
    const bins = binGenerator(data);

    console.log("Histogram bins:");
    console.log(bins);


    // Get lower and upper bounds of the histogram
    const binsMin = bins[0].x0;

    const binsMax = bins[bins.length - 1].x1;


    // Find the largest bin
    const binsMaxLength = d3.max(
        bins,
        d => d.length
    );


    console.log("Minimum:", binsMin);
    console.log("Maximum:", binsMax);
    console.log("Largest bin:", binsMaxLength);


    // X scale
    xScale
        .domain([binsMin, binsMax])
        .range([0, innerWidth]);


    // Y scale
    yScale
        .domain([0, binsMaxLength])
        .range([innerHeight, 0])
        .nice();


    // Draw histogram bars
    innerChart
        .selectAll(".bar")
        .data(bins)
        .join("rect")
        .attr("class", "bar")

        .attr("x", d => xScale(d.x0))

        .attr("y", d => yScale(d.length))

        .attr("width", d =>
            Math.max(
                0,
                xScale(d.x1) -
                xScale(d.x0) -
                1
            )
        )

        .attr("height", d =>
            innerHeight - yScale(d.length)
        )

        .attr("fill", barColor);


    // X axis
    const bottomAxis = d3.axisBottom(xScale);


    innerChart
        .append("g")
        .attr("class", "axis")
        .attr(
            "transform",
            `translate(0, ${innerHeight})`
        )
        .call(bottomAxis);


    // Y axis
    const leftAxis = d3.axisLeft(yScale);


    innerChart
        .append("g")
        .attr("class", "axis")
        .call(leftAxis);


    // X axis label
    innerChart
        .append("text")
        .attr("class", "axis-label")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 55)
        .attr("text-anchor", "middle")
        .text("Energy Consumption");


    // Y axis label
    innerChart
        .append("text")
        .attr("class", "axis-label")
        .attr(
            "transform",
            "rotate(-90)"
        )
        .attr("x", -innerHeight / 2)
        .attr("y", -50)
        .attr("text-anchor", "middle")
        .text("Frequency");
}

function updateHistogram(data, selectedId) {

    const updatedData = selectedId === "all"
        ? data
        : data.filter(d => d.screenTech === selectedId);

    console.log("Selected filter:", selectedId);
    console.log("Filtered TV count:", updatedData.length);

    // Keep the original histogram's bin boundaries
    const updatedBins = binGenerator
        .domain(xScale.domain())
        .thresholds(xScale.ticks(14))(updatedData);

    const innerChart = d3.select("#histogram svg g");

    innerChart
        .selectAll(".bar")
        .data(updatedBins)
        .join("rect")
        .attr("class", "bar")
        .attr("fill", barColor)
        .attr("x", d => xScale(d.x0))
        .attr("width", d =>
            Math.max(0, xScale(d.x1) - xScale(d.x0) - 1)
        )
        .transition()
        .duration(600)
        .ease(d3.easeCubicInOut)
        .attr("y", d => yScale(d.length))
        .attr("height", d =>
            innerHeight - yScale(d.length)
        );
}
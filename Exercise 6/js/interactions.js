function populateFilters(data) {

    const buttons = d3.select("#filters_screen")
        .selectAll("button")
        .data(screenFilters)
        .join("button")
        .attr("type", "button")
        .attr("class", "filter-button")
        .classed("active", d => d.isActive)
        .text(d => d.label)

        .on("click", function(event, selectedFilter) {

            // Update the active state of each filter
            screenFilters.forEach(filter => {
                filter.isActive = filter.id === selectedFilter.id;
            });

            // Update button styling
            d3.select("#filters_screen")
                .selectAll(".filter-button")
                .classed("active", d => d.isActive);

            // Check which filter was selected
            console.log("Selected filter:", selectedFilter.id);
            updateHistogram(data, selectedFilter.id);

        });

}
function createTooltip() {

    // Create tooltip group inside scatterplot
    const tooltip = innerChartS
        .append("g")
        .attr("class", "scatter-tooltip")
        .style("opacity", 0)
        .style("pointer-events", "none");

    // Tooltip background
    tooltip
        .append("rect")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("rx", 6)
        .attr("ry", 6)
        .attr("fill", barColor)
        .attr("opacity", 0.9);

    // Tooltip text
    tooltip
        .append("text")
        .attr("class", "tooltip-text")
        .attr("x", tooltipWidth / 2)
        .attr("y", tooltipHeight / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", "white")
        .attr("font-size", "13px");

}
function handleMouseEvents() {

    innerChartS
        .selectAll(".scatter-point")

        .on("mouseenter", function(event, d) {

            console.log("Mouse entered:", d);

            const tooltip = innerChartS.select(".scatter-tooltip");

            // Get the selected circle's position
            const cx = +this.getAttribute("cx");
            const cy = +this.getAttribute("cy");

            // Update tooltip text
            tooltip
                .select(".tooltip-text")
                .text(`Screen: ${d.screenSize}"`);

            // Keep tooltip inside the chart
            const tooltipX = Math.max(
                0,
                Math.min(cx + 12, innerWidth - tooltipWidth)
            );

            const tooltipY = Math.max(
                0,
                cy - tooltipHeight - 12
            );

            // Show tooltip
            tooltip
                .attr(
                    "transform",
                    `translate(${tooltipX}, ${tooltipY})`
                )
                .interrupt()
                .transition()
                .duration(200)
                .style("opacity", 1);

        })

        .on("mouseleave", function() {

            innerChartS
                .select(".scatter-tooltip")
                .interrupt()
                .transition()
                .duration(200)
                .style("opacity", 0);

        });

}
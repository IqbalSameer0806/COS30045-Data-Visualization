d3.csv("data/Ex6_TVdata_withStar.csv", d => {

    return {
        ...d,
        energyConsumption: +d.energyConsumption
    };

}).then(data => {

    console.log("TV Data:", data);
    console.log("Column names:", Object.keys(data[0]));
    console.log("First TV:", data[0]);

    drawHistogram(data);
    populateFilters(data);
    drawScatterplot(data);
    // Activate scatterplot tooltips
    createTooltip();
    handleMouseEvents();   

}).catch(error => {

    console.error("Error loading the data:", error);

});
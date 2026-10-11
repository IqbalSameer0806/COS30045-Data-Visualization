const width = 900;
const height = 500;

const margin = {
    top: 40,
    right: 40,
    bottom: 70,
    left: 70
};

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;


// Colours

const barColor = "steelblue";
const bodyBackgroundColor = "white";


// Scales

const xScale = d3.scaleLinear();

const yScale = d3.scaleLinear();


// Bin generator

const binGenerator = d3.bin()
    .value(d => d.energyConsumption)
    .thresholds(14);

// Screen technology filters

const screenFilters = [
    { id: "all", label: "All TVs", isActive: true },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "LED", label: "LED", isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];

// Scatterplot shared variables

let innerChartS;

const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();

const colorScale = d3.scaleOrdinal()
    .domain(["LCD", "LED", "OLED"])
    .range(["#4e79a7", "#f28e2b", "#59a14f"]);

// Tooltip dimensions

const tooltipWidth = 150;
const tooltipHeight = 35;
// First, we will create some constants to define non-data-related parts of the visualization
var w = 700; // Width of our visualization
var h = 500; // Height of our visualization
var xOffset = 40; // Space for x-axis labels
var yOffset = 100; // Space for y-axis labels
var margin = 10; // Margin around visualization
var vals = ['Rank', 'Frequency', 'TFIDF', 'Document Frequency']; // List of data attributes
var xVal = vals[0]; // Value to plot on x-axis
var yVal = vals[1]; // Value to plot on y-axis


// set the dimensions and margins of the graph
var margin= {top:20, right:20, bottom:30, left:50};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;


// set the ranges
var x = d3.scaleLinear()
    .domain([, ])
    .range([0,width ]);

var y = d3.scaleLinear()
    .domain([, ])
    .range([ height , 0 ]);  //flipping becasue the start point on left top is (0,0)
å
// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body")
            .append("svg")
            .attr("width",width + margin.left + margin.right)
            .attr("height",height + margin.top + margin.bottom)
            .append("g")  //regular graphic operation
            .attr("transform","translate("+margin.left + ","+margin.top +")");


// Get the data
d3.csv('shakespeare_top100.csv', function(error, data) {
    if(error) throw error;
    console.log(data);
    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d[xVal]; }));
    y.domain([0, d3.max(data, function(d) { return d[yVal]; })]);

    // Add the scatterplot points
    svg.selectAll("circle")
       .data(data)
       .enter()
       .append("circle");
    // Add the X Axis

    // Add the Y Axis
});





// A function to retrieve the next value in the vals list
function getNextVal(val) {
	return vals[(vals.indexOf(val) + 1) % vals.length];
};

// A function to change what values we plot on the x-axis
function setXval(val) {
	// Update xVal
	xVal = val;
	// Update the axis
	xScale.domain([d3.min(data, function(d) { return parseFloat(d[xVal]); })-1,
				   d3.max(data, function(d) { return parseFloat(d[xVal]); })+1])
	xAxis.scale(xScale);
	xAxisG.call(xAxis);
	xLabel.text(xVal);
	// Update the points

};

// A function to change what values we plot on the y-axis
function setYval(val) {
	// Update yVal
	yVal = val;
	// Update the axis
	yScale.domain([d3.min(data, function(d) { return parseFloat(d[yVal]); })-1,
				   d3.max(data, function(d) { return parseFloat(d[yVal]); })+1])
	yAxis.scale(yScale);
	yAxisG.call(yAxis);
	yLabel.text(yVal);
	// Update the points

};

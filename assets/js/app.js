

// Step 1: Set up chart
//= ================================
var svgWidth = 1000;
var svgHeight = 600;

var margin = {
  top: 20,
  right: 50,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 3:
// Import data from the data.csv file
// =================================
d3.csv("./assets/data/data.csv").then(function(healthData) {

  // Step 4: Create Scales
  //= ============================================

  var x = d3.scaleLinear()
    .domain([0, d3.max(healthData, d => d.age)])
    .range([0, width]);

  var y = d3.scaleLinear()
    .domain([0, d3.max(healthData, d => +d.healthcare)+2])
    .range([height, 0]);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(x);
  var leftAxis = d3.axisLeft(y);

  // Add bottomAxis
  chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .attr("stroke", "black") 
      .call(bottomAxis);

  // Add leftAxis
  chartGroup.append("g")
    .attr("stroke", "black")
    .call(leftAxis);

  // Append dots
  svg.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
        .attr("cx", d => x(d.age))
        .attr("cy", d => y(+d.healthcare))
        // .attr("cx", function (d) { return x(d.age);})
        // .attr("cy", function (d) { return y(+d.healthcare);})
        .attr("r", 7)
        .style("fill", "69b3a2")
        .attr("class", "circle")
        // .text(function (d) { return x(d.attr);});
        .text(d => d.abbr);
  
  // Append state abbreviation to dots

//   svg.selectAll("text")
//   .data(healthData)
//   .enter()
//   .append("text")
//   .text(function (d) { return x(d.abbr);})
//   .attr("x", d => xLinearScale(d.age))
//   .attr("y", d => yLinearScale(d.healthcare))
//   .attr("font_family", "sans-serif")  // Font type
//   .attr("font-size", "12px")  // Font size
//   .attr("fill", "red");   // Font color

//   chartGroup.selectAll(".stateAbbr")
//     .data(healthData)
//     .enter()
//     .append("text")
//     .attr("class", "stateAbbr")
//     .attr("x", function (d) { return x(d.age);})
//     .attr("y", function (d) { return y(d.healthcare);})
//     .text(function (d) { return x(d.state);})
//     .style("font-size", "12px")
//     .style("text-anchor", "middle")
//     .style('fill', 'red');
  chartGroup.selectAll(".stateAbbr")
    .data(healthData)
    .enter()
    .append("text")
        .attr("x", d => x(d.age))
        .attr("y", d => y(+d.healthcare))
        .text(d => d.abbr)
        .attr("class", "stateAbbr")
        .style("font-size", "12px")
        .style("text-anchor", "middle")
        .style('fill', 'red');
        
    
  // Add titles to x and y axes

  chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + 50})`)
  .attr("class", "axisText")
  .text("Average Age");

  chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - (height / 1.8))
  .attr("dy", "1em")
  .attr("class", "axisText")
  .text("Healthcare (%)");

}).catch(function(error) {
    console.log(error);

});



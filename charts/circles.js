'use strict';

function drawCircles (data) {

  // Select the SVG element on the DOM
  const plot = d3.select('#svg-sandbox');

  // Bind data elements to any existing SVG circles
  const circles = plot.selectAll('circle').data(data);

  // Update existing circles: color grey
  circles.attr('fill', 'darkrgrey')
    .attr('cx', d => d*30)
    .attr('cy', d => d*10)
    .attr('r', d => 5+d);

  // Create new circles for unmapped data (blue)
  circles.enter().append('circle')
    .transition()
    .attr('cx', d => d*30)
    .attr('cy', d => d*10)
    .attr('r', d => 5+d)
    .attr('fill', 'cornflowerblue');
  
  // Remove unmapped elements (red -> remove)
  circles.exit()
    .transition()
    .duration(1000)
    .attr('fill', 'red')
    .remove(3000);
  
}

function scaleCircles (data) {
  // Select the SVG
  const plot = d3.select('#svg-sandbox');
  
  // get width; 
  const width = d3.select('#wrapper-sandbox').node().getBoundingClientRect().width;
  const height = d3.select('#wrapper-sandbox').node().getBoundingClientRect().height;

  // create scales
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data))
    .range([30, width-30]);
  const yScale = d3.scaleLinear()
    .domain(d3.extent(data))
    .range([30, height-30]);
  const colourScale = d3.scaleLinear()
    .domain(d3.extent(data))
    .range(['blue', 'red']);

  // Map data to any existing SVG circles
  const circles = plot.selectAll('circle').data(data);

  // Colour any existing circles grey and make sure they are in the right position
  circles.attr('fill', 'darkrgrey')
    .attr('cx', d => xScale(d))
    .attr('cy', d => yScale(d))
    .attr('r', d => 5+d)
    .attr('fill', d => colourScale(d));

  // Create circles for any data elements that could not be mapped (colour blue)
  circles.enter().append('circle')
    .transition()
    .attr('cx', d => xScale(d))
    .attr('cy', d => yScale(d))
    .attr('r', d => 5+d)
    .attr('fill', d => colourScale(d));
  
  // If there are more circles than elements colour them red then remove after 3s
  circles.exit()
    .transition()
    .duration(1000)
    .attr('fill', 'red')
    .remove(3000);
    
}
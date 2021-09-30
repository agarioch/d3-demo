'use strict';
function drawScatter () {
  
  //#region ACCESS DATA
  const xAccessor = d => d.dewPoint;
  const yAccessor = d => d.humidity;
  const colourAccessor = d => d.cloudCover;

  //#endregion ACCESS DATA

  //#region CHART DIMENSIONS
  const width = d3.min([window.innerHeight * 0.9, window.innerWidth * 0.9]);

  let dimensions = {
    width,
    height: width,
    margin: {top: 10, right: 10, bottom: 40, left: 60}
  };
  dimensions.plotWidth = dimensions.width - dimensions.margin.right - dimensions.margin.left;
  dimensions.plotHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;
  //#endregion CHART DIMENSIONS

  //#region DRAW CANVAS
  const wrapper = d3.select('#wrapper-scatter')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height);
    
  const plot = wrapper.append('g')
    .style('transform', `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`);
  //#endregion DRAW CANVAS

  //#region SCALES
  const xScale = d3.scaleLinear()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.plotWidth])
    .nice();
  const yScale = d3.scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.plotHeight, 0])
    .nice();
  const colourScale = d3.scaleLinear()
    .domain(d3.extent(dataset, colourAccessor))
    .range(['#91ACF1', '#676A73']);
  //#endregion SCALES

  //#region DRAW DATA
  // check if points already exist to avoid re-drawing
  function plotPoints (data) {
    const points = plot.selectAll('circle').data(data);

    points.join('circle') // shortcut for .enter().append('circle').merge(dataset)
      .attr('cx', d => xScale(xAccessor(d)))
      .attr('cy', d => yScale(yAccessor(d)))
      .attr('r', 5)
      .attr('fill', d => colourScale(colourAccessor(d)));
  }
  plotPoints(dataset);
  //#endregion DRAW DATA

  //#region DRAW PERIPHERALS
  const xAxisGenerator = d3.axisBottom(xScale);
  const xAxis = plot.append('g').call(xAxisGenerator)
    .style('transform', `translateY(${dimensions.plotHeight}px)`);
  
  const yAxisGenerator = d3.axisLeft(yScale);
  const yAxis = plot.append('g').call(yAxisGenerator);

  const yAxisLabel = yAxis.append('text')
    .attr('x', -dimensions.plotHeight /2)
    .attr('y', -dimensions.margin.left + 10)
    .attr('fill', '#454551')
    .text('Relative Humidity')
    .style('transform', 'rotate(-90deg)')
    .attr('class', 'axisLabel');
    
  const xAxisLabel = xAxis.append('text')
    .attr('x', dimensions.plotWidth/2)
    .attr('y', dimensions.margin.bottom)
    .attr('fill', '#454551')
    .text('Dew Point')
    .attr('class', 'axisLabel');


  //#endregion DRAW PERIPHERALS

}

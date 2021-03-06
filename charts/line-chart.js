'use strict';

function drawLineChart () {

  // data accessors - reusable functions to access data
  const dateParser = d3.timeParse('%Y-%m-%d');
  const yAccessor = d => (d.temperatureMax - 32) * 5/9;
  const xAccessor = d => dateParser(d.date);

  // plot dimensions
  const dimensions = {
    width: window.innerWidth * 0.9,
    height: 400,
    margin: {
      top: 15,
      right: 15,
      bottom: 40,
      left: 60,
    },
  };
  dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  // scale - linear scale with data domain based on [min, max] from dataset
  // range based on height of plot area
  const yScale = d3.scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.boundedHeight, 0]);
  
  const xScale = d3.scaleTime()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.boundedWidth]);

  // wrapper - svg with specified dimensions
  const wrapper = d3.select('#wrapper-line')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height);

  // bounds - svg group element translated & sized based on margins
  const bounds = wrapper.append('g')
    .style('transform', `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`);

  // share plot area below freezing
  const freezingTemperaturePlacement = yScale(0);
  const freezingTemperatures = bounds.append('rect')
    .attr('x', 0)
    .attr('width', dimensions.boundedWidth)
    .attr('y', freezingTemperaturePlacement)
    .attr('height', dimensions.boundedHeight - freezingTemperaturePlacement)
    .attr('fill', '#DCEDF8');

  // RE: styles can be applied in 3 ways
  //  1. inline style:  .style('css-prop', 'prop-value')
  //  2. stylesheet:    .attr('class', 'class-name')
  //  3. svg property:  .attr('svg-prop', 'prop-value')

  const lineGenerator = d3.line()
    .x(d => xScale(xAccessor(d)))
    .y(d => yScale(yAccessor(d)));
  
  const line = bounds.append('path')
    .attr('d', lineGenerator(dataset))
    .attr('fill', 'none')
    .attr('stroke', '#454551')
    .attr('stroke-width', 2);

  // create axis
  const yAxisGenerator = d3.axisLeft()
    .scale(yScale);

  const yAxis = bounds.append('g')
    .call(yAxisGenerator);

  const xAxisGenerator = d3.axisBottom()
    .scale(xScale);
  
  const xAxis = bounds.append('g')
    .call(xAxisGenerator)
    .style('transform', `translateY(${dimensions.boundedHeight}px)`);
} 
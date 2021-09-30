'use strict';

function drawBar () {
  //#region DATASET
  const metricAccessor = (d) => d.humidity;
  const yAccessor = d => d.length; // distribution frequency
  //#endregion DATASET

  //#region CHART DIMENSIONS
  const width = 600;
  const dimensions = {
    width,
    height: width * 0.6,
    margin: {
      top: 30,
      right: 10,
      bottom: 50,
      left: 50
    }
  };
  dimensions.plotWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.plotHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;
  //#endregion CHART DIMENSIONS

  //#region DRAW CANVAS
  const wrapper = d3.select('#wrapper-bar').append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height);

  const plot = wrapper.append('g')
    .style('transform', `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`);
  //#endregion DRAW CANVAS

  //#region CREATE SCALES
  const xScale = d3.scaleLinear()
    .domain(d3.extent(dataset, metricAccessor))
    .range([0, dimensions.plotWidth])
    .nice();
  
  const binsGenerator = d3.bin()
    .domain(xScale.domain())
    .value(metricAccessor)
    .thresholds(12);

  const bins = binsGenerator(dataset);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(bins, yAccessor)])
    .range([dimensions.plotHeight, 0])
    .nice();
  //#endregion CREATE SCALES

  //#region DRAW DATA
  const binsGroup = plot.append('g');
  const binGroups = binsGroup.selectAll('g').data(bins)
    .enter()
    .append('g');
  
  const barPadding = 1;

  const barRects = binGroups.append('rect')
    .attr('x', d => xScale(d.x0) + barPadding/2)
    .attr('y', d => yScale(yAccessor(d)))
    .attr('width', d => d3.max([0, xScale(d.x1) - xScale(d.x0) - barPadding]))
    .attr('height', d => dimensions.plotHeight - yScale(yAccessor(d)))
    .attr('fill', '#91ACF1');
  
  const barText = binGroups.filter(yAccessor)
    .append('text')
    .attr('x', d => xScale(d.x0) + (xScale(d.x1) - xScale(d.x0)) /2)
    .attr('y', d => yScale(yAccessor(d)) -5)
    .text(d => yAccessor(d))
    .attr('class', 'label');

  const mean = d3.mean(dataset, metricAccessor);

  const meanLine = plot.append('line')
    .attr('x1', xScale(mean))
    .attr('y1', 0)
    .attr('x2', xScale(mean))
    .attr('y2', dimensions.plotHeight)
    .attr('stroke', '#686868  ');
  //#endregion DRAW DATA

  //#region DRAW PERIPHERALS

  //#endregion
}
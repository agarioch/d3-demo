'use strict';

let dataset;

d3.json('./data/my_weather_data.json')
  .then((data) => dataset= data)
  .then(drawLineChart)
  .then(drawScatter)
  .then(drawBar);
async function drawLineChart () {
  const dataset = await d3.json('./data/nyc_weather_data.json');
  console.log(xAccessor(dataset[0]));
}

const dateParser = d3.timeParse('%Y-%m-%d');
const yAccessor = d => d.temperatureMax;
const xAccessor = d => dateParser(d.date);

drawLineChart();
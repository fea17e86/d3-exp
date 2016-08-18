import React from 'react';
import { render } from 'react-dom';
import * as d3 from 'd3';

import BarChart from './components/BarChart';
import ScatterChart from './components/ScatterChart';
import LineChart from './components/LineChart';

const simpleData = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                11, 12, 15, 20, 18, 17, 16, 18, 23, 25];
const height = 300;
const width = 350;

render(<BarChart data={simpleData} height={height} width={width} />, document.getElementById('bar_chart'));
render(<ScatterChart data={simpleData} height={height} width={width} />, document.getElementById('scatter_chart'));

d3.tsv('data/data.tsv', (error, data) => {
  if (error) {
    throw error;
  }

  render(<LineChart data={data} height={height} width={width} />, document.getElementById('line_chart'));
});

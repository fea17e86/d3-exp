import React from 'react';
import { render } from 'react-dom';
import * as d3 from 'd3';

import LineChart from './components/LineChart';

// const simpleData = [4, 8, 15, 16, 23, 42];
const height = 300;
const width = 350;

d3.tsv('data/data.tsv', (error, data) => {
  if (error) {
    throw error;
  }

  render(<LineChart data={data} height={height} width={width} />, document.getElementById('line_chart'));
});

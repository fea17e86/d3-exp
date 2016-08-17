import React from 'react';
import { render } from 'react-dom';
import BarChart from './components/BarChart';

const data = [4, 8, 15, 16, 23, 42];
const height = 300;
const width = 400;

render(<BarChart data={data} height={height} width={width} />, document.getElementById('bar_chart'));

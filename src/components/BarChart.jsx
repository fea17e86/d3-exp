import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';

// https://bost.ocks.org/mike/bar/

const margin = { top: 30, right: 30, bottom: 30, left: 30 };

export default class BarChart extends Component {

  static propTypes = {
    data: PropTypes.array,
    height: PropTypes.number,
    width: PropTypes.number
  }

  render() {
    if (!this.fauxDOMNode) {
      this.fauxDOMNode = ReactFauxDOM.createElement('svg');
    }
    return this.createChart(this.fauxDOMNode).toReact();
  }

  createChart(domNode) {
    const width = this.props.width - margin.left - margin.right;
    const height = this.props.height - margin.top - margin.bottom;
    const data = this.props.data;
    const barWidth = Math.floor((width - (data.length - 1)) / data.length);

    const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([0, data.length * barWidth + data.length - 1]);
    const xAxis = d3.axisBottom(xScale);
    const yScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d)]).range([0, height]).nice();
    const yAxis = d3.axisLeft(yScale);

    const chart = d3.select(domNode)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    chart.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate('+ margin.left +', '+ margin.top +')')
      .call(yAxis);

    chart.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
      .call(xAxis);

    const bars = chart.selectAll('rect.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => xScale(i) + margin.left)
      .attr('y', (d) => height + margin.top - yScale(d))
      .attr('width', barWidth)
      .attr('height', (d) => yScale(d));

    const labels = chart.selectAll('text.bar-label')
      .data(data)
      .enter()
      .append('text')
      .text((d) => d)
      .attr('class', 'bar-label')
      .attr('text-anchor', 'middle')
      .attr('x', (d, i) => xScale(i) + margin.left + barWidth / 2)
      .attr('y', (d, i) => height + margin.top - yScale(d) + 10)
      .attr('font-family', 'sans-serif')
      .attr('font-size', '9px');

    return domNode;
  }
};

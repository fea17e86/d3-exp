import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';

const margin = {top: 20, right: 20, bottom: 30, left: 50};
const parseDate = d3.timeParse('%d-%b-%y');

const xDomain = (d) => d.date;
const yDomain = (d) => d.close;

export default class LineChart extends Component {

  static propTypes = {
    data: PropTypes.array,
    height: PropTypes.number,
    width: PropTypes.number
  }

  createChart(domNode) {
    const data = this.props.data;
    const width = this.props.width - margin.left - margin.right;
    const height = this.props.height - margin.top - margin.bottom;

    const x = d3.scaleTime().range([0, width]);
    const xValue = (d) => x(d.date);
    const xAxis = d3.axisBottom(x);

    const y = d3.scaleLinear().range([height, 0]);
    const yValue = (d) => y(d.close);
    const yAxis = d3.axisLeft(y);

    const line = d3.line().x(xValue).y(yValue);

    const svg = d3.select(domNode)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    data.forEach((d) => {
      d.date = parseDate(d.date);
      d.close = +d.close;
    });

    x.domain(d3.extent(data, xDomain));
    y.domain(d3.extent(data, yDomain));

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Price ($)');

    svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line);

    return domNode.toReact();
  }

  render() {
    this.fauxDOMNode = this.fauxDOMNode || ReactFauxDOM.createElement('svg');

    return this.createChart(this.fauxDOMNode);
  }
};

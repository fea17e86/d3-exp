import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';

// https://bost.ocks.org/mike/bar/

const margin = { top: 20, right: 20, bottom: 20, left: 20 };

export default class ScatterChart extends Component {

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

    const circles = d3.select(domNode)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .selectAll('circle')
        .data(data)
      .enter()
        .append('circle');

    circles.attr('cx', (d, i) => i * 15 + margin.left)
      .attr('cy', (d) => height + margin.top - d * 8)
      .attr('r', 1.5);

    return domNode;
  }
};

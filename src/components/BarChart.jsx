import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ReactFauxDOM from 'react-faux-dom';
import d3 from 'd3';

// https://bost.ocks.org/mike/bar/

const margin = { top: 20, right: 20, bottom: 20, left: 20 };

export default class BarChart extends Component {

  static propTypes = {
    data: PropTypes.array,
    height: PropTypes.number,
    width: PropTypes.number
  }

  render() {
    this.fauxDOMNode = ReactFauxDOM.createElement('svg');

    return this.createChart(this.fauxDOMNode);
  }

  createChart(domNode) {

    console.log(d3);

    const width = this.props.width - margin.left - margin.right;
    const height = this.props.height - margin.top - margin.bottom;

    const data = this.props.data;

    d3.select(domNode)
      .selectAll('div')
        .data(data)
      .enter().append('div')
        .style('width', function(d) { return d * 10 + 'px'; })
        .text(function(d) { return d; });

    return domNode.toReact();
  }
};

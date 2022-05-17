import React, { Component } from 'react';
import { render } from 'react-dom';
import SolidGauge from 'react-solidgauge';
 
const values = [
  { label: 'Tier1', value: 189, fill: '#FF8373' },
  { label: 'Tier2', value: 65,  fill: '#A3A0FB' },
  { label: 'Tier3', value: 49,  fill: '#FFDA83' },
  { label: 'Average Review', value: 29,  fill: '#55D8FE'},
];
 
class solid extends Component {
  constructor() {
    super();
    this.state = {
      values : values
    } 
    this.onClick = this.onClick.bind(this);
  }
 
  onClick() {
    this.setState({
      values: values.map(d => {
        d.values = Math.random() * 100;
        return d;
      })
    });
  }
 
  render() {
    return (
      <div style={{
        width: '100%',
        height: '240px',
      }}>
        <SolidGauge
        background={{
          fill: '#ddd',
          stroke: '#aaa',
        }}
          responsive={true}
          pathWidth={0.2}
          pathMargin={0.1}
          values={this.state.values}
          animationTime={2000}
          showTooltip = {true}
          animateTime={2000}
          ease='easeLinear'
          fontSize={14}
          endAngle = {Math.PI*1.4}
          />
        </div>
    );
  }
}
export default solid;
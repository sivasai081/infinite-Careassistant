import React from 'react';
import {
  PolarChart,
  CommonSeriesSettings,
  Series,
  Export,
  Legend,
  Tooltip
} from 'devextreme-react/polar-chart';
// import { fruitSources, productionData } from './data.js';

class SpiderChart extends React.Component {

  render() {
      const fruitSources = [
        { value: 'q1', name: 'Q1', color: '#536DFE' },
        { value: 'q2', name: 'Q2', color: '#DF2F2F' },
        { value: 'q3', name: 'Q3', color: "#7CB342" },
        { value: 'q4', name: 'Q4', color: '#29B6F6' }
      ];
      const productionData = [{
        arg: 'Addiction Medicine',
        q1: 4.21,
        q2: 6.22,
        q3: 0.8,
        q4: 7.47
      }, {
        arg: 'Gynacological Oncology',
        q1: 3.33,
        q2: 8.65,
        q3: 4.5,
        q4: 5
      }, {
        arg: 'Interventional Cardiology',
        q1: 2.6,
        q2: 4.25,
        q3: 2.78,
        q4: 1.71
      }, {
        arg: 'Interventional Radiology',
        q1: 2.2,
        q2: 7.78,
        q3: 3.52,
        q4: 2.39
      }, {
        arg: 'Medical Oncology',
        q1: 2.16,
        q2: 2.26,
        q3: 3.09,
        q4: 6.26
      }, {
        arg: 'Occupational Therapy',
        q1: 2.16,
        q2: 2.26,
        q3: 3.09,
        q4: 6.26
      }, {
        arg: 'Osteopathic Manipulative',
        q1: 2.16,
        q2: 2.26,
        q3: 3.09,
        q4: 6.26
      },{
        arg: 'Pain Managemen',
        q1: 4.21,
        q2: 6.22,
        q3: 6.8,
        q4: 7.47
      }, {
        arg: 'Preventative Medicine',
        q1: 3.33,
        q2: 8.65,
        q3: 1.06,
        q4: 5
      }, {
        arg: 'Surgical Oncology',
        q1: 2.6,
        q2: 4.25,
        q3: 1.78,
        q4: 1.71
      },];
    return (
      <PolarChart
        id="chart"
        dataSource={productionData}
        useSpiderWeb={true}
        title=""
      >
        <CommonSeriesSettings type="line" />
        {
          fruitSources.map(function(item) {
            return <Series key={item.value} valueField={item.value} name={item.name} color={item.color} />;
          })
        }
        {/* <Export enabled={true} /> */}
        <Tooltip enabled={true} />
        <Legend
          verticalAlignment="bottom"
          horizontalAlignment="center"
          hoverMode="excludePoints"
          paddingTop="50px"
        />
      </PolarChart>
    );
  }
}

export default SpiderChart;
import React from 'react';
import {Line} from 'react-chartjs-2';

export default class CGMgraph extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      realDataY: this.props.realDataY,
      chartData : {
        labels:['12:00', 'Nov 5th', '12:00', 'Nov 6th', '12:00', 'Nov 7th', '12:00', 'Nov 8th', '12:00', 'Nov 9th'],
  datasets:[{
        label:'No Risk',
        fill: false,
        lineTension:0,
        // data:[
        //   45, 100, 300, 250, 170, 88, 112, 245, 128, 65
        // ],
        data: this.props.realDataY,
        backgroundColor:[
          '#db1962', '#424242', '#db1962', '#db1962','#424242', '#424242', '#424242', '#db1962','#424242', '#424242',
        ],
        borderDash: [5, 5],
        borderWidth:2,
        borderColor:'#c9cccf',
        pointRadius:5,
      },{
        label:'Medium Risk',
        fill: false,
        lineTension:0,
        data:[
          15, 90, 280, 220, 140, 98, 102, 222, 111, 101
        ],
        // data: this.props.predictedDataY,
        backgroundColor:[
          '#db1962', '#424242', '#db1962', '#db1962','#424242', '#424242', '#424242', '#db1962','#424242', '#424242',
        ],
        borderWidth:2,
        borderColor:'#424242',
        pointRadius:5,
      },
      {
        label: 'High Risk'
      },
      {
        label: 'Real'
      },
      {
        label: 'Abnormal'
      },
      {
        label: 'Prediction'
      }]
      }
    }
  }
  render() {
    // console.log(this.state.realDataY,"this.props.realDataY")
    return (
      <div>
        <Line
          data={this.props.chartData}
          options={{
            annotation:{
              annotations:[{
                type:'box',
                yScaleID:'y-axis-0',
                yMin: 0,
                yMax: 50,
                backgroundColor: 'rgba(190, 30, 45, 0.1)',
                borderColor: 'rgba(190, 30, 45, 0.1)'
              },
              {
                type:'box',
                yScaleID:'y-axis-0',
                yMin: 50,
                yMax: 70,
                backgroundColor: 'rgba(247, 148, 29, 0.1)',
                borderColor: 'rgba(247, 148, 29, 0.1)'
              },
              {
                type:'box',
                yScaleID:'y-axis-0',
                yMin: 70,
                yMax: 140,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.1)'
              },
              {
                type:'box',
                yScaleID:'y-axis-0',
                yMin: 140,
                yMax: 200,
                backgroundColor: 'rgba(247, 148, 29, 0.1)',
                borderColor: 'rgba(247, 148, 29, 0.1)'
              },
              {
                type:'box',
                yScaleID:'y-axis-0',
                yMin: 200,
                yMax: 300,
                backgroundColor: 'rgba(190, 30, 45, 0.1)',
                borderColor: 'rgba(190, 30, 45, 0.1)'
              }]
            },
            legend:{
              display:false,
              position:'bottom'
            },
            layout: {
              padding:{
                left:100,
                right:0,
                bottom:0,
                top:100
              }
            },
            tooltops:{
              enabled:true
            },
            scales:{
              yAxes:[{
                gridLines: {
                  display: false,
                }
              }],
              xAxes:[{
                gridLines: {
                  display: false,
                }
              }]
            }
          }}
        />
      </div>
    );
  }
}
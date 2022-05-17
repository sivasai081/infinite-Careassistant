import React from "react";
import Plot from 'react-plotly.js';
import moment from 'moment';
import ReactHighcharts from 'react-highcharts';

export default function Chart(props) {
 console.log("Chardata==",props.data)
  
const xValue = ['Procedures', 'Observations', 'Encounter-Inpatient','Encounter-Outpatient','Encounter-Emergency'];
const yValue = [20, 14, 23];
let  encDate=[], procDate=[],obsDate=[], immuDate=[],condDate=[],mediDate=[],imgDate=[],allergyDate=[];

props.data.forEach((el,i )=>{
  if (el.resource.resourceType == "Encounter"){
    encDate.push(moment(el.resource.date).format("YYYY-MM-DD"))
  }
  if (el.resource.resourceType == "Immunization"){
    immuDate.push(moment(el.resource.date).format("YYYY-MM-DD"))
  }
  if (el.resource.resourceType == "Observation"){
    obsDate.push(moment(el.resource.date).format("YYYY-MM-DD"))
  }
  if (el.resource.resourceType == "Procedure"){
    procDate.push(moment(el.resource.date).format("YYYY-MM-DD"))
  }
  if (el.resource.resourceType == "Condition"){
    condDate.push(moment(el.resource.date).format("YYYY-MM-DD"))
  }
  if (el.resource.resourceType == "MedicationRequest"){
    mediDate.push(moment(el.resource.date).format("YYYY-MM-DD"))
  }
  if (el.resource.resourceType == "ImagingStudy"){
    imgDate.push(moment(el.resource.date).format("YYYY-MM-DD"))
  }
  if (el.resource.resourceType == "AllergyIntolerance"){
    allergyDate.push(moment(el.resource.date).format("YYYY-MM-DD"))
  }
});

const count = dates =>
  dates.reduce((a, b) => ({ ...a,
    [b]: (a[b] || 0) + 1
  }), {})

let encounter = count(encDate);
let immunization = count(immuDate);
let observation = count(obsDate);
let procedure = count(procDate);
let condition = count(condDate);
let medication = count(mediDate);
let imaging = count(imgDate);
let allergy = count(allergyDate);

const getTotalData = (data) =>{
    let newData = [];
    data.forEach((ob)=>{
    if(ob > 1){
        for(let i=1; i < ob; i++){
          newData.push(null)
        }
        newData.push(ob)
      }else{
        newData.push(ob)
      }
    })
    return newData;
}

const getOccurrence =(array, value)=> {
  let count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}
const categoriesCount = (dates, catDates)=>{
  let count = []

    dates.forEach((dat)=>{
      let x = getOccurrence(catDates, dat);
      count.push(x)
    })
return count;
}

const detailsbutton = (el) => {
  localStorage.setItem("health360details", el);
  window.location.href = '/health360details';
}

let categoriesList = new Set([...encDate, ...immuDate, ...obsDate, ...procDate, ...condDate, ...mediDate, ...imgDate, ...allergyDate]);
let categories = [...categoriesList];

const highchartdetails = {
  chart: {
      height: 190,
      type: 'column',
      zoomType: 'x',
      style: {
          fontFamily: 'Open Sans',
          fontSize: "10px"
       }
  },
  credits: {
      enabled: false
    },
  title: {
      text: ''
  },
  yAxis: {
    title: {
      text: 'Count'
    }
  },
  plotOptions: {
    column: {
      stacking: 'normal'
    },
    series: {
      pointWidth: 12,
      cursor: 'pointer',
      point: {
        events: {
          click: (e) => { 
              detailsbutton(e.point.series.name)
             console.log(e.point);  
          }
        }
      }
    }
  },

  
    
 
  colors: ['#9E9E9E', '#388E3C', '#FF8A80', '#00897B', '#7CB342', '#536DFE'],
  xAxis: {
    categories: categories
  },

  series: [{
    name: 'allergies',
    data: categoriesCount(categories,allergyDate)
  }, {
    name: 'medications',
    data: categoriesCount(categories,mediDate)
  },
  {
    name: 'conditions',
    data: categoriesCount(categories,condDate)
  }, {
    name: 'observations',
    data: categoriesCount(categories,obsDate)
  }, {
    name: 'immunizations',
    data: categoriesCount(categories,immuDate)
  }, {
    name: 'encounters',
    data: categoriesCount(categories,encDate)
  }]
};



let trace1 = {
  type: "bar",
  name: 'Encounters',
  x: encDate,
  y: getTotalData(Object.values(encounter)),
  opacity: 0.6
}


let trace2 = {
  type: "bar",
  name: 'Immunizations',
  x: immuDate,
  y: getTotalData(Object.values(immunization)),
  opacity: 0.6
}


let trace3 = {
  type: "bar",
  name: 'Observations',
  x: obsDate,
  y: getTotalData(Object.values(observation)),
  opacity: 0.6
}

let trace4 = {
  type: "bar",
  name: 'Conditions',
  x: condDate,
  y: getTotalData(Object.values(condition)),
  opacity: 0.6
}

let trace5 = {
  type: "bar",
  name: 'Procedures',
  x: procDate,
  y: getTotalData(Object.values(procedure)),
  opacity: 0.6
}

let trace6 = {
  type: "bar",
  name: 'Medications',
  x: mediDate,
  y: getTotalData(Object.values(medication)),
  opacity: 0.6
}

let trace7 = {
  type: "bar",
  name: 'Imaging',
  x: imgDate,
  y: getTotalData(Object.values(imaging)),
  opacity: 0.6
}

let trace8 = {
  type: "bar",
  name: 'Allergy',
  x: allergyDate,
  y: getTotalData(Object.values(allergy)),
  opacity: 0.6
}


 let data = [trace1,trace2, trace3,trace4,trace5, trace6,trace7, trace8];


 let layout = {
  title: '',
  barmode: 'stack',
  xaxis: {
    autorange: true,
    range: ['2015-02-17', '2020-07-16'],
    rangeselector: {buttons: [
        {
          count: 1,
          label: '1m',
          step: 'month',
          stepmode: 'backward'
        },
        {
          count: 6,
          label: '6m',
          step: 'month',
          stepmode: 'backward'
        },
        {step: 'all'}
      ]},
    rangeslider: {range: ['2015-02-17', '2020-07-16']},
    type: 'date'
  },
  yaxis: {
    autorange: true,
    range: [86.8700008333, 138.870004167],
    type: 'linear'
  }
};

//})
  return (
    <React.Fragment>
     {props.isHighChart ? 
     <ReactHighcharts config={highchartdetails}></ReactHighcharts>
     :
      <Plot
        data={data}
        layout={ layout }
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
        
      />
    }
   
   </React.Fragment>
  )
}

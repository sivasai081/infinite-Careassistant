
import React, { Component } from "react";
import {
    MDBRow, MDBCol, MDBTypography, MDBSelect, MDBCard, MDBCardBody, MDBDataTable, MDBTimeline, MDBTimelineStep, MDBInput, MDBCollapse, MDBBtn, MDBModal,
    MDBModalHeader, MDBModalBody, MDBModalFooter, MDBChipsInput, MDBSelectInput, MDBSelectOptions, MDBSelectOption
} from "mdbreact";
import ReactHighcharts from 'react-highcharts';
import Highcharts from 'highcharts' //core
import HighchartsReact from 'highcharts-react-official';
import HC_more from 'highcharts/highcharts-more.src' //module
// HC_more(Highcharts) //init module
import SpiderChart from '../components/SpiderChart';
import QualityofCareStyles from '../styles/QualityofCare';
import Head from 'next/head'
import Layout from "../components/layout";
import Loader from '../components/loader';
import * as data from '../data/data';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';



class QualityOfCare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValueforPopulation: "",
            selectedspecialityFilterValue:"",
            selectedsatisfactionFilterValue:"",
            populationFilterData: [{
                text: "Yearly",
                value: "0"
            }, {
                text: "Quarterly",
                value: "1"
            }, {
                text: "Monthly",
                value: "2"
            }],
            specialityFilterData: [{
                text: "2019",
                value: "0"
            }, {
                text: "2020",
                value: "1"
            }],
            satisfactionFilterData: [{
                text: "2019",
                value: "0"
            }, {
                text: "2020",
                value: "1"
            }],
            populationYearlyData: {
                columns: [
                    {
                        label: 'Type',
                        field: 'type',
                        sort: 'asc',

                    },
                    {
                        label: '2017',
                        field: 'secondyear',
                        sort: 'asc',
                    },
                    {
                        label: '2018',
                        field: 'thirdyear',
                        sort: 'asc',
                    },
                    {
                        label: '2019',
                        field: 'fourthyear',
                        sort: 'asc',
                    },
                    {
                        label: '2020',
                        field: 'fifthyear',
                        sort: 'asc',
                    },
                    {
                        label: '2021 (Predicted)',
                        field: 'sixthyear',
                        sort: 'asc',
                    }
                ],
                rows: [
                    {
                        type: "Quality of Care",
                        secondyear: "2.994",
                        thirdyear: "2.995",
                        fourthyear: "2.996",
                        fifthyear: "2.997",
                        sixthyear:"3.000"
                    },
                    {
                        type: "Member Count",
                        secondyear: "9233",
                        thirdyear: "7092",
                        fourthyear: "6224",
                        fifthyear: "6530",
                        sixthyear: "7002"
                    },
                    {
                        type: "Average Age",
                        secondyear: "49.01",
                        thirdyear: "51.4",
                        fourthyear: "50.73",
                        fifthyear: "51.2",
                        sixthyear: "50.5"
                    },
                    {
                        type: "%Females",
                        secondyear: "41%",
                        thirdyear: "45%",
                        fourthyear: "47%",
                        fifthyear: "43%",
                        sixthyear: "46%"
                    },
                    {
                        type: "%Kids",
                        secondyear: "7%",
                        thirdyear: "7%",
                        fourthyear: "9%",
                        fifthyear: "9%",
                        sixthyear: "9%"
                    }
                ]
            },
            specialityYearlyData_2019: {
                columns: [
                    {
                        label: 'Speciality',
                        field: 'speciality',
                        sort: 'asc',

                    },
                    {
                        label: 'Addiction Medicine',
                        field: 'addictionmedicine',
                        sort: 'asc',
                    },
                    {
                        label: 'Gynecological Oncology',
                        field: 'gynecologicaloncology',
                        sort: 'asc',
                    },
                    {
                        label: 'Interventional Cardiology',
                        field: 'interventionalcardiology',
                        sort: 'asc',
                    },
                    {
                        label: 'Interventional Radiology',
                        field: 'interventionaleadiology',
                        sort: 'asc',
                    },
                    {
                        label: 'Medical Oncology',
                        field: 'medicaloncology',
                        sort: 'asc',
                    },
                    {
                        label: 'Occupational Theraphy',
                        field: 'occupationaltheraphy',
                        sort: 'asc',
                    },
                    {
                        label: 'Osteopathic Manipulative Medicine',
                        field: 'osteopathicmanipulativemedicine',
                        sort: 'asc',
                    },
                    {
                        label: 'Pain Management',
                        field: 'painmanagement',
                        sort: 'asc',
                    },
                    {
                        label: 'Preventative Medicine',
                        field: 'preventativemedicine',
                        sort: 'asc',
                    },
                    {
                        label: 'Surgical Oncology',
                        field: 'surgicaloncology',
                        sort: 'asc',
                    }
                ],
                rows: [
                    {
                        speciality: "Quality Of Care",
                        addictionmedicine: "2.950",
                        gynecologicaloncology: "3.091",
                        interventionalcardiology: "3.106",
                        interventionaleadiology:"3.545",
                        medicaloncology: "3.061",
                        occupationaltheraphy: "2.782",
                        osteopathicmanipulativemedicine:"3.121",
                        painmanagement:"3.036",
                        preventativemedicine:"2.864",
                        surgicaloncology:"3.591"

                    },
                    {
                        speciality: "Member Count",
                        addictionmedicine: "286",
                        gynecologicaloncology: "562",
                        interventionalcardiology: "852",
                        interventionaleadiology:"241",
                        medicaloncology: "1652",
                        occupationaltheraphy: "733",
                        osteopathicmanipulativemedicine:"374",
                        painmanagement:"259",
                        preventativemedicine:"312",
                        surgicaloncology:"292"
                    },
                    {
                        speciality: "Average Age",
                        addictionmedicine: "32",
                        gynecologicaloncology: "39",
                        interventionalcardiology: "44",
                        interventionaleadiology:"68",
                        medicaloncology: "79",
                        occupationaltheraphy: "32",
                        osteopathicmanipulativemedicine:"39",
                        painmanagement:"44",
                        preventativemedicine:"68",
                        surgicaloncology:"79"
                    },
                    {
                        speciality: "%Females",
                        addictionmedicine: "45%",
                        gynecologicaloncology: "50%",
                        interventionalcardiology: "38%",
                        interventionaleadiology:"52%",
                        medicaloncology: "45%",
                        occupationaltheraphy: "45%",
                        osteopathicmanipulativemedicine:"50%",
                        painmanagement:"38%",
                        preventativemedicine:"52%",
                        surgicaloncology:"45%"
                    },
                    {
                        speciality: "%Kids",
                        addictionmedicine: "24%",
                        gynecologicaloncology: "12%",
                        interventionalcardiology: "8%",
                        interventionaleadiology:"2%",
                        medicaloncology: "2%",
                        occupationaltheraphy: "24%",
                        osteopathicmanipulativemedicine:"12%",
                        painmanagement:"8%",
                        preventativemedicine:"2%",
                        surgicaloncology:"2%"
                    }
                ]
            },
            specialityYearlyData_2020: {
                columns: [
                    {
                        label: 'Speciality',
                        field: 'speciality',
                        sort: 'asc',

                    },
                    {
                        label: 'Addiction Medicine',
                        field: 'addictionmedicine',
                        sort: 'asc',
                    },
                    {
                        label: 'Gynecological Oncology',
                        field: 'gynecologicaloncology',
                        sort: 'asc',
                    },
                    {
                        label: 'Interventional Cardiology',
                        field: 'interventionalcardiology',
                        sort: 'asc',
                    },
                    {
                        label: 'Interventional Radiology',
                        field: 'interventionaleadiology',
                        sort: 'asc',
                    },
                    {
                        label: 'Medical Oncology',
                        field: 'medicaloncology',
                        sort: 'asc',
                    },
                    {
                        label: 'Occupational Theraphy',
                        field: 'occupationaltheraphy',
                        sort: 'asc',
                    },
                    {
                        label: 'Osteopathic Manipulative Medicine',
                        field: 'osteopathicmanipulativemedicine',
                        sort: 'asc',
                    },
                    {
                        label: 'Pain Management',
                        field: 'painmanagement',
                        sort: 'asc',
                    },
                    {
                        label: 'Preventative Medicine',
                        field: 'preventativemedicine',
                        sort: 'asc',
                    },
                    {
                        label: 'Surgical Oncology',
                        field: 'surgicaloncology',
                        sort: 'asc',
                    }
                ],
                rows: [
                    {
                        speciality: "Quality Of Care",
                        addictionmedicine: "3.005",
                        gynecologicaloncology: "3.000",
                        interventionalcardiology: "2.994",
                        interventionaleadiology:"2.995",
                        medicaloncology: "2.996",
                        occupationaltheraphy: "2.997",
                        osteopathicmanipulativemedicine:"3.005",
                        painmanagement:"3.000",
                        preventativemedicine:"2.994",
                        surgicaloncology:"2.995"

                    },
                    {
                        speciality: "Member Count",
                        addictionmedicine: "237",
                        gynecologicaloncology: "594",
                        interventionalcardiology: "900",
                        interventionaleadiology:"231",
                        medicaloncology: "1685",
                        occupationaltheraphy: "774",
                        osteopathicmanipulativemedicine:"362",
                        painmanagement:"251",
                        preventativemedicine:"306",
                        surgicaloncology:"313"
                    },
                    {
                        speciality: "Average Age",
                        addictionmedicine: "32",
                        gynecologicaloncology: "39",
                        interventionalcardiology: "44",
                        interventionaleadiology:"68",
                        medicaloncology: "79",
                        occupationaltheraphy: "32",
                        osteopathicmanipulativemedicine:"39",
                        painmanagement:"44",
                        preventativemedicine:"68",
                        surgicaloncology:"79"
                    },
                    {
                        speciality: "%Females",
                        addictionmedicine: "50%",
                        gynecologicaloncology: "55%",
                        interventionalcardiology: "42%",
                        interventionaleadiology:"57%",
                        medicaloncology: "50%",
                        occupationaltheraphy: "50%",
                        osteopathicmanipulativemedicine:"55%",
                        painmanagement:"42%",
                        preventativemedicine:"57%",
                        surgicaloncology:"50%"
                    },
                    {
                        speciality: "%Kids",
                        addictionmedicine: "26%",
                        gynecologicaloncology: "13%",
                        interventionalcardiology: "9%",
                        interventionaleadiology:"2%",
                        medicaloncology: "2%",
                        occupationaltheraphy: "26%",
                        osteopathicmanipulativemedicine:"13%",
                        painmanagement:"9%",
                        preventativemedicine:"2%",
                        surgicaloncology:"2%"
                    }
                ]
            },
            satisfactionYearlyData_2019: {
                columns: [
                    {
                        label: 'Criteria',
                        field: 'criteria',
                        sort: 'asc',

                    },
                    {
                        label: 'Addiction Medicine',
                        field: 'addictionmedicine',
                        sort: 'asc',
                    },
                    {
                        label: 'Gynecological Oncology',
                        field: 'gynecologicaloncology',
                        sort: 'asc',
                    },
                    {
                        label: 'Interventional Cardiology',
                        field: 'interventionalcardiology',
                        sort: 'asc',
                    },
                    {
                        label: 'Interventional Radiology',
                        field: 'interventionaleadiology',
                        sort: 'asc',
                    },
                    {
                        label: 'Medical Oncology',
                        field: 'medicaloncology',
                        sort: 'asc',
                    },
                    {
                        label: 'Occupational Theraphy',
                        field: 'occupationaltheraphy',
                        sort: 'asc',
                    },
                    {
                        label: 'Osteopathic Manipulative Medicine',
                        field: 'osteopathicmanipulativemedicine',
                        sort: 'asc',
                    },
                    {
                        label: 'Pain Management',
                        field: 'painmanagement',
                        sort: 'asc',
                    },
                    {
                        label: 'Preventative Medicine',
                        field: 'preventativemedicine',
                        sort: 'asc',
                    },
                    {
                        label: 'Surgical Oncology',
                        field: 'surgicaloncology',
                        sort: 'asc',
                    }
                ],
                rows: [
                    {
                        criteria: "Quality Of Care",
                        addictionmedicine: "3.156",
                        gynecologicaloncology: "3.150",
                        interventionalcardiology: "3.143",
                        interventionaleadiology:"3.145",
                        medicaloncology: "3.146",
                        occupationaltheraphy: "3.147",
                        osteopathicmanipulativemedicine:"3.156",
                        painmanagement:"3.150",
                        preventativemedicine:"3.143",
                        surgicaloncology:"3.145"

                    },
                    {
                        criteria: "Member Count",
                        addictionmedicine: "398",
                        gynecologicaloncology: "380",
                        interventionalcardiology: "313",
                        interventionaleadiology:"236",
                        medicaloncology: "186",
                        occupationaltheraphy: "133",
                        osteopathicmanipulativemedicine:"398",
                        painmanagement:"380",
                        preventativemedicine:"313",
                        surgicaloncology:"236"
                    },
                    {
                        criteria: "Average Age",
                        addictionmedicine: "57",
                        gynecologicaloncology: "66",
                        interventionalcardiology: "59",
                        interventionaleadiology:"77",
                        medicaloncology: "71",
                        occupationaltheraphy: "67",
                        osteopathicmanipulativemedicine:"57",
                        painmanagement:"66",
                        preventativemedicine:"59",
                        surgicaloncology:"77"
                    },
                    {
                        criteria: "%Females",
                        addictionmedicine: "47%",
                        gynecologicaloncology: "53%",
                        interventionalcardiology: "40%",
                        interventionaleadiology:"49%",
                        medicaloncology: "53%",
                        occupationaltheraphy: "42%",
                        osteopathicmanipulativemedicine:"47%",
                        painmanagement:"53%",
                        preventativemedicine:"40%",
                        surgicaloncology:"49%"
                    },
                    {
                        criteria: "%Kids",
                        addictionmedicine: "5%",
                        gynecologicaloncology: "0%",
                        interventionalcardiology: "11%",
                        interventionaleadiology:"6%",
                        medicaloncology: "8%",
                        occupationaltheraphy: "11%",
                        osteopathicmanipulativemedicine:"5%",
                        painmanagement:"0%",
                        preventativemedicine:"11%",
                        surgicaloncology:"6%"
                    }
                ]
            },
            satisfactionYearlyData_2020: {
                columns: [
                    {
                        label: 'Criteria',
                        field: 'criteria',
                        sort: 'asc',

                    },
                    {
                        label: 'Addiction Medicine',
                        field: 'addictionmedicine',
                        sort: 'asc',
                    },
                    {
                        label: 'Gynecological Oncology',
                        field: 'gynecologicaloncology',
                        sort: 'asc',
                    },
                    {
                        label: 'Interventional Cardiology',
                        field: 'interventionalcardiology',
                        sort: 'asc',
                    },
                    {
                        label: 'Interventional Radiology',
                        field: 'interventionaleadiology',
                        sort: 'asc',
                    },
                    {
                        label: 'Medical Oncology',
                        field: 'medicaloncology',
                        sort: 'asc',
                    },
                    {
                        label: 'Occupational Theraphy',
                        field: 'occupationaltheraphy',
                        sort: 'asc',
                    },
                    {
                        label: 'Osteopathic Manipulative Medicine',
                        field: 'osteopathicmanipulativemedicine',
                        sort: 'asc',
                    },
                    {
                        label: 'Pain Management',
                        field: 'painmanagement',
                        sort: 'asc',
                    },
                    {
                        label: 'Preventative Medicine',
                        field: 'preventativemedicine',
                        sort: 'asc',
                    },
                    {
                        label: 'Surgical Oncology',
                        field: 'surgicaloncology',
                        sort: 'asc',
                    }
                ],
                rows: [
                    {
                        criteria: "Quality Of Care",
                        addictionmedicine: "3.005",
                        gynecologicaloncology: "3.000",
                        interventionalcardiology: "2.994",
                        interventionaleadiology:"2.995",
                        medicaloncology: "2.996",
                        occupationaltheraphy: "2.997",
                        osteopathicmanipulativemedicine:"3.005",
                        painmanagement:"3.000",
                        preventativemedicine:"2.994",
                        surgicaloncology:"2.995"

                    },
                    {
                        criteria: "Member Count",
                        addictionmedicine: "379",
                        gynecologicaloncology: "362",
                        interventionalcardiology: "298",
                        interventionaleadiology:"225",
                        medicaloncology: "177",
                        occupationaltheraphy: "127",
                        osteopathicmanipulativemedicine:"379",
                        painmanagement:"362",
                        preventativemedicine:"298",
                        surgicaloncology:"225"
                    },
                    {
                        criteria: "Average Age",
                        addictionmedicine: "54",
                        gynecologicaloncology: "63",
                        interventionalcardiology: "56",
                        interventionaleadiology:"73",
                        medicaloncology: "68",
                        occupationaltheraphy: "64",
                        osteopathicmanipulativemedicine:"54",
                        painmanagement:"63",
                        preventativemedicine:"56",
                        surgicaloncology:"73"
                    },
                    {
                        criteria: "%Females",
                        addictionmedicine: "45%",
                        gynecologicaloncology: "50%",
                        interventionalcardiology: "38%",
                        interventionaleadiology:"47%",
                        medicaloncology: "50%",
                        occupationaltheraphy: "40%",
                        osteopathicmanipulativemedicine:"45%",
                        painmanagement:"50%",
                        preventativemedicine:"38%",
                        surgicaloncology:"47%"
                    },
                    {
                        criteria: "%Kids",
                        addictionmedicine: "5%",
                        gynecologicaloncology: "0%",
                        interventionalcardiology: "10%",
                        interventionaleadiology:"6%",
                        medicaloncology: "8%",
                        occupationaltheraphy: "10%",
                        osteopathicmanipulativemedicine:"5%",
                        painmanagement:"0%",
                        preventativemedicine:"10%",
                        surgicaloncology:"6%"
                    }
                ]
            },
        }
    }

    componentDidMount() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        this.setState({
            selectedValueforPopulation: "Yearly",
            selectedspecialityFilterValue: "2020",
            selectedsatisfactionFilterValue:"2020"
        })
    }
    populationDataChange(day) {
        if (day[0] === "0") {
            this.setState({
                selectedValueforPopulation: "Yearly"
            })
        } else if (day[0] === "1") {
            this.setState({
                selectedValueforPopulation: "Quarterly"
            })
        } else if (day[0] === "2") {
            this.setState({
                selectedValueforPopulation: "Monthly"
            })
        }
    }
    specialityFilterDataChange(day) {
        if (day[0] === "0") {
            this.setState({
                selectedspecialityFilterValue: "2019"
            })
        } else if (day[0] === "1") {
            this.setState({
                selectedspecialityFilterValue: "2020"
            })
        } 
    }
    satisfactionFilterDataChange(day){
        if (day[0] === "0") {
            this.setState({
                selectedsatisfactionFilterValue: "2019"
            })
        } else if (day[0] === "1") {
            this.setState({
                selectedsatisfactionFilterValue: "2020"
            })
        } 
    }
    render() {
        const populationGraphData = {
            chart: {
                type: "line",
                height: 300,
                zoomType: 'x',
                style: {
                    fontFamily: 'Open Sans',
                }
            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            colors: ['#DB1962'],
            yAxis: {
                title: {
                    text: 'Quality of Care Score (1-5)'
                },

            },
            plotOptions: {
                series: {
                    lineWidth: 1,

                }
            },
            xAxis: {
                categories: ["2017", "2018", "2019", "2020", "2021 (Predicted)"]
            },

            series: [{
                showInLegend: false,
                name: 'Quality of Care Score (1-5)',
                data: [2.994, 2.995, 2.996, 2.997, 3.000]
            }]
        };
        const populationQuarterlyGraphData = {
            chart: {
                height: 300,
                type: 'column'
            },
            colors: ['#536DFE', '#DF2F2F', '#7CB342', '#29B6F6'],
            title: {
                text: ''
            },
            xAxis: {
                categories: ['2017', '2018', '2019', '2020', '2021 (Predicted)']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Quality of Care Score (1-5)'
                },
                labels: {
                    enabled: false
                }
            },
            // tooltip: {
            //     pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            //     shared: true
            // },
            plotOptions: {
                series: {
                    pointWidth: 15,
                    animation: {
                        duration: 3000
                    }
                },
                column: {
                    stacking: 'normal'
                }
            },
            series: [{
                name: 'Q1',
                data: [3.000, 2.994, 2.995, 2.996, 2.995]
            }, {
                name: 'Q2',
                data: [2.996, 2.994, 2.997, 2.996, 2.997]
            }, {
                name: 'Q3',
                data: [3.000, 2.994, 2.995, 2.996, 2.995]
            }, {
                name: 'Q4',
                data: [2.996, 2.994, 2.995, 3.005, 2.997]
            }]
        }
        const populationMonthlyGraphData = {
            chart: {
                type: "line",
                height: 300,
                zoomType: 'x',
                style: {
                    fontFamily: 'Open Sans',
                }
            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            colors: ['#00897B'],
            yAxis: {
                title: {
                    text: 'Quality of Care Score (1-5)'
                }
            },
            plotOptions: {
                series: {
                    lineWidth: 1
                }
            },
            xAxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan 21 (Predicted)", "Feb 21 (Predicted)", "Mar 21 (Predicted)"]
            },
            series: [{
                showInLegend: false,
                name: 'Quality of Care Score (1-5)',
                data: [3.002, 3.010, 2.988, 3.029, 2.987, 3.005, 3.007, 2.972, 2.993, 2.983, 2.988, 3.001, 2.981, 3.013, 2.968]
            }]
        };
        const specialityGraphData = {
            chart: {
                type: 'column',
                height: 480
            },
            colors: ['#DF2F2F', '#536DFE', '#7CB342', '#F89E1B', '#29B6F6', '#FF8A80', '#9E9E9E', '#388E3C', '#3A4DB9', '#00897B'],
            title: {
                text: ''
            },
            xAxis: {
                categories: ['2017', '2018', '2019', '2020', '2021 (Predicted)']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Quality of Care Score (1-5)'
                },
                labels: {
                    enabled: false
                }
            },
            plotOptions: {
                series: {
                    pointWidth: 15,
                    animation: {
                        duration: 3000
                    }
                },
                column: {
                    stacking: 'normal',

                }
            },
            series: [{
                name: 'Addiction Medicine',
                data: [2.98, 3.82, 2.950, 3.005, 2.86]
            }, {
                name: 'Gynecological Oncology',
                data: [0, 0, 3.091, 3.000, 2.94]
            }, {
                name: 'Interventional Cardiology',
                data: [2.79, 2.91, 3.106, 2.994, 3.33]
            }, {
                name: 'Interventional Radiology',
                data: [2.98, 3.16, 3.545, 2.995, 0]
            }, {
                name: 'Medical Oncology',
                data: [2.84, 3.08, 3.061, 2.996, 3.09]
            }, {
                name: 'Occupational Theraphy',
                data: [3.04, 3.06, 2.782, 2.997, 3.12]
            }, {
                name: 'Osteopathic Manipulative Medicine',
                data: [3.18, 2.61, 3.121, 3.005, 3.59]
            }, {
                name: 'Pain Management',
                data: [3.03, 3.09, 3.036, 3.000, 3.16]
            }, {
                name: 'Preventative Medicine',
                data: [3.36, 3.18, 2.864, 2.994, 2.95]
            }, {
                name: 'Surgical Oncology',
                data: [2.84, 0, 3.591, 2.995, 2.89]
            }]
        };
        const satisfactionGraphData = {
            chart: {
                type: 'column',
                height: 450
            },
            colors: ['#DF2F2F', '#536DFE', '#7CB342', '#F89E1B', '#29B6F6', '#FF8A80', '#9E9E9E', '#388E3C', '#3A4DB9', '#00897B'],
            title: {
                text: ''
            },
            xAxis: {
                categories: ['2017', '2018', '2019', '2020', '2021 (Predicted)']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Quality of Care Score (1-5)'
                },
                labels: {
                    enabled: false
                }
            },
            plotOptions: {
                series: {
                    pointWidth: 15,
                    animation: {
                        duration: 3000
                    }
                },
                column: {
                    stacking: 'normal'
                }
            },
            series: [{
                name: 'Addiction Medicine',
                data: [3.01, 2.99, 3.156, 3.005, 2.99]
            }, {
                name: 'Gynecological Oncology',
                data: [2.97, 3.02, 3.150, 3.000, 3.01]
            }, {
                name: 'Interventional Cardiology',
                data: [2.99, 2.99, 3.143, 2.994, 2.98]
            }, {
                name: 'Interventional Radiology',
                data: [2.99, 3.00, 3.145, 2.995, 3.00]
            }, {
                name: 'Medical Oncology',
                data: [3.01, 3.00, 3.146, 2.996, 3.00]
            }, {
                name: 'Occupational Theraphy',
                data: [3.00, 3.00, 3.147, 2.997, 3.00]
            }, {
                name: 'Osteopathic Manipulative Medicine',
                data: [2.99, 3.00, 3.156, 3.005, 3.00]
            }, {
                name: 'Pain Management',
                data: [3.02, 2.95, 3.150, 3.000, 3.02]
            }, {
                name: 'Preventative Medicine',
                data: [3.00, 3.00, 3.143, 2.994, 2.99]
            }, {
                name: 'Surgical Oncology',
                data: [3.00, 3.00, 3.145, 2.995, 2.99]
            }]
        };
        return (
            <React.Fragment>
                <Head>
                    <title>Healthlligence</title>
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
                    {/* <script src="https://code.highcharts.com/highcharts-more.js"></script> */}
                </Head>
                <Layout>
                    <MDBRow>
                        <MDBCol sm="12" md="12" lg="12" style={{ marginBottom: "16px" }}>
                            <MDBCard style={{ height: "100%" }} className="population-graph">
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol md="10">
                                            {this.state.selectedValueforPopulation === "Yearly" ? <MDBTypography tag="h5" className="card-title"> Yearly Quality of Care Score </MDBTypography> : ""}
                                            {this.state.selectedValueforPopulation === "Quarterly" ? <MDBTypography tag="h5" className="card-title"> Quarterly Quality of Care Score </MDBTypography> : ""}
                                            {this.state.selectedValueforPopulation === "Monthly" ? <MDBTypography tag="h5" className="card-title"> Monthly Quality of Care Score </MDBTypography> : ""}
                                        </MDBCol>
                                        <MDBCol md="2" className="measuresdropdown">
                                            <MDBSelect
                                                options={this.state.populationFilterData}
                                                // outline
                                                selected={this.state.selectedValueforPopulation}
                                                className="month-right-dropdown1"
                                                getValue={(val) => this.populationDataChange(val)}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <br />
                                    <MDBRow>
                                        <MDBCol md="6">
                                            {this.state.selectedValueforPopulation === "Yearly" ? <ReactHighcharts config={populationGraphData}></ReactHighcharts> : ""}
                                            {this.state.selectedValueforPopulation === "Quarterly" ? <ReactHighcharts config={populationQuarterlyGraphData}></ReactHighcharts> : ""}
                                            {this.state.selectedValueforPopulation === "Monthly" ? <ReactHighcharts config={populationMonthlyGraphData}></ReactHighcharts> : ""}
                                        </MDBCol>
                                        <MDBCol md="6">
                                            <MDBDataTable
                                                small
                                                hover={true}
                                                responsive={true}
                                                paging={false}
                                                searching={false}
                                                className="populationTable"
                                                data={this.state.populationYearlyData}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol sm="12" md="12" lg="12" style={{ marginBottom: "16px" }}>
                            <MDBCard style={{ height: "100%" }} className="speciality-graph">
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol md="10">
                                            <MDBTypography tag="h5" className="card-title"> Quality of Care Score for Top 10 Different Specialities </MDBTypography>
                                        </MDBCol>
                                        <MDBCol md="2" className="measuresdropdown">
                                            <MDBSelect
                                                options={this.state.specialityFilterData}
                                                // outline
                                                selected={this.state.selectedspecialityFilterValue}
                                                className="month-right-dropdown1"
                                                getValue={(val) => this.specialityFilterDataChange(val)}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <br />
                                    <MDBRow>
                                        <MDBCol md="6">
                                            <ReactHighcharts config={specialityGraphData}></ReactHighcharts>
                                        </MDBCol>
                                        <MDBCol md="6">
                                            <MDBDataTable
                                                small
                                                hover={true}
                                                responsive={true}
                                                paging={false}
                                                searching={false}
                                                className=""
                                                data={this.state.selectedspecialityFilterValue === "2019" ? this.state.specialityYearlyData_2019 : this.state.specialityYearlyData_2020}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol sm="12" md="12" lg="12" style={{ marginBottom: "16px" }}>
                            <MDBCard style={{ height: "100%" }} className="satisfaction-graph">
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol md="10">
                                            <MDBTypography tag="h5" className="card-title"> Quality of Care Score for Different Facilities  </MDBTypography>
                                        </MDBCol>
                                        <MDBCol md="2" className="measuresdropdown">
                                            <MDBSelect
                                                options={this.state.satisfactionFilterData}
                                                // outline
                                                selected={this.state.selectedsatisfactionFilterValue}
                                                className="month-right-dropdown1"
                                                getValue={(val) => this.satisfactionFilterDataChange(val)}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <br />
                                    <MDBRow>
                                        <MDBCol md="6">
                                            <ReactHighcharts config={satisfactionGraphData}></ReactHighcharts>
                                        </MDBCol>
                                        <MDBCol md="6">
                                            <MDBDataTable
                                                small
                                                hover={true}
                                                responsive={true}
                                                paging={false}
                                                searching={false}
                                                className=""
                                                data={this.state.selectedsatisfactionFilterValue === "2019" ? this.state.satisfactionYearlyData_2019 : this.state.satisfactionYearlyData_2020}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    <style jsx>{QualityofCareStyles}</style>
                </Layout>
            </React.Fragment>
        );
    }
};

export default QualityOfCare;

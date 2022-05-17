
import React, { Component } from "react";
import {
    MDBRow, MDBCol, MDBTypography, MDBSelect, MDBCard, MDBCardBody, MDBDataTable, MDBTimeline, MDBTimelineStep, MDBInput, MDBCollapse, MDBBtn, MDBModal,
    MDBModalHeader, MDBModalBody, MDBModalFooter, MDBChipsInput, MDBSelectInput, MDBSelectOptions, MDBSelectOption
} from "mdbreact";

import PatientEngagementStyles from '../styles/PatientEngagement';
import Head from 'next/head'
import Layout from "../components/layout";
import Highcharts from 'highcharts'
import HighchartsHeatmap from 'highcharts/modules/heatmap';
import HighchartsReact from 'highcharts-react-official'

if (typeof Highcharts === 'object') {
    HighchartsHeatmap(Highcharts)
}

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';



class PatientEngagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    render() {
        const diabetesChartdata = {
            chart: {
                type: 'heatmap',
                marginTop: 40,
                marginBottom: 80,
                plotBorderWidth: 0
            },
            plotOptions: {
                series: {
                  states: {
                    hover: {
                        color: '#424242',
                        enabled: false
                    }
                  }
                }
              },
            tooltip: {
                style: {
                    color: '#424242'
                },
                formatter: function () {                    
                    return '<b>' + this.series.xAxis.categories[this.point.x] + '<b>' + ': '+Highcharts.numberFormat(this.point.value, 2) + '</b>';
                }
            },
            title: {
                text: ''
            },

            xAxis: {
                categories: ['Heart Failure Self Management Plan',
                    'Demential Management',
                    'Mental Health Careplan', 'Diabetes self management plan',
                    'Dialysis Careplan',
                    'Major Depressive Disorder Clinical Management Plan',
                    'Anti-suicide Psychotherapy',
                    'Lifestyle Education Regarding Hypertension',
                    'Hyperlipidemia clinical management plan',
                    'Medication adherence program',
                    'Agreeing on diabetes care plan','Heart Failure Self Management Plan',
                    'Demential Management',
                    'Mental Health Careplan', 'Diabetes self management plan',
                    'Dialysis Careplan',
                    'Major Depressive Disorder Clinical Management Plan',
                    'Anti-suicide Psychotherapy',
                    'Lifestyle Education Regarding Hypertension',
                    'Hyperlipidemia clinical management plan',
                    'Medication adherence program',
                    'Agreeing on diabetes care plan','Heart Failure Self Management Plan',
                    'Demential Management',
                    'Mental Health Careplan', 'Diabetes self management plan',
                    'Dialysis Careplan',
                    'Major Depressive Disorder Clinical Management Plan',
                    'Anti-suicide Psychotherapy',
                    'Lifestyle Education Regarding Hypertension',
                    'Hyperlipidemia clinical management plan',
                    'Medication adherence program',
                    'Agreeing on diabetes care plan','Heart Failure Self Management Plan',
                    'Demential Management',
                    'Mental Health Careplan', 'Diabetes self management plan',
                    'Dialysis Careplan',
                    'Major Depressive Disorder Clinical Management Plan',
                    'Anti-suicide Psychotherapy',
                    'Lifestyle Education Regarding Hypertension',
                    'Hyperlipidemia clinical management plan',
                    'Medication adherence program',
                    'Agreeing on diabetes care plan','Heart Failure Self Management Plan',
                    'Demential Management',
                    'Mental Health Careplan', 'Diabetes self management plan',
                    'Dialysis Careplan',
                    'Major Depressive Disorder Clinical Management Plan',
                    'Anti-suicide Psychotherapy',
                    'Lifestyle Education Regarding Hypertension',
                    'Hyperlipidemia clinical management plan',
                    'Medication adherence program',
                    'Agreeing on diabetes care plan'],
                opposite: false,

            },
            credits: {
                enabled: false
            },
            yAxis: {
                categories: ['2017', '2018', '2019', '2020', '2021 (Prediction)'],
                title: null,
                reversed: true,
                opposite: true,
            },



            colorAxis: {
                min: 0,
                minColor: '#e8ffeb',
                maxColor: '#00897B'
            },

            legend: {
                align: 'left',
                layout: 'vertical',
                margin: 0,
                verticalAlign: 'top',
                y: 25,
                symbolHeight: 280,
                symbolWidth: 8
            },

            series: [{
                name: '',
                borderWidth: 0,
                // data: [[0, 0, 0.5], [0, 1, 0.3], [0, 2, 0.5], [0, 3, 0.9], [0, 4, 0.4],[0, 5, 0.7],[0, 6, 0.6],[0, 7, 0.4],[0, 8, 0.8], [0, 9, 0.2],[0, 10, 0.4], [1, 0, 0.9], [1, 1, 0.6], [1, 2, 0.9], [1, 3, 0.3], [1, 4, 0.3], [1, 5, 0.7], [1, 6, 0.9],[1, 7, 0.3],[1, 8, 0.2], [1, 9, 0.2], [1, 10, 1], [2, 0, 0.5], [2, 1, 0.5], [2, 2, 0.7], [2, 3, 0.9], [2, 4, 0.7], [2, 5, 0.8],[2, 6, 0.7],[2, 7, 0.7],[2, 8, 0.2], [2, 9, 0.6], [2, 10, 0.5], [3, 0, 0.6], [3, 1, 0.5], [3, 2, 0.7], [3, 3, 0.7], [3, 4, 0.5], [3, 5, 0.7],[3, 6, 0.7],[3, 7, 0.5],[3, 8, 0.4], [3, 9, 0.3], [3, 10, 0.6]],
                data: [[0, 0, 0.2], [1, 0, 0.6], [2, 0, 0.5], [3, 0, 0.1], [4, 0, 0.2], [5, 0, 0.7],[6, 0, 0.4] ,[7, 0, 0.6], [8, 0, 0.7], [9, 0, 0.1],[10, 0, 0.6],
                [0, 1, 0.5], [1, 1, 0.3], [2, 1, 0.5], [3, 1, 0.9], [4, 1, 0.4], [5, 1, 0.7],[6, 1, 0.6] ,[7, 1, 0.4], [8, 1, 0.8], [9, 1, 0.2],[10, 1, 0.4],
                [0, 2, 0.9], [1, 2, 0.6], [2, 2, 0.9], [3, 2, 0.3], [4, 2, 0.3], [5, 2, 0.7],[6, 2, 0.9] ,[7, 2, 0.3], [8, 2, 0.2], [9, 2, 0.2], [10, 2, 1], 
                [0, 3, 0.5], [1, 3, 0.5], [2, 3, 0.7], [3, 3, 0.9], [4, 3, 0.7], [5, 3, 0.8],[6, 3, 0.7] ,[7, 3, 0.7], [8, 3, 0.2], [9, 3, 0.6], [10, 3, 0.5],
                [0, 4, 0.6], [1, 4, 0.5], [2, 4, 0.7], [3, 4, 0.7], [4, 4, 0.5], [5, 4, 0.7],[6, 4, 0.7] ,[7, 4, 0.5], [8, 4, 0.4], [9, 4, 0.3], [10, 4, 0.6]],
                dataLabels: {
                    enabled: true,
                    color: '#FFFFFF',
                    style: {
                        textShadow: false ,
                        textOutline: false 
                    }
                }
            }],
        }
        const hypertensionChartdata = {
            chart: {
                type: 'heatmap',
                marginTop: 40,
                marginBottom: 120,
                plotBorderWidth: 0
            },
            plotOptions: {
                series: {
                  states: {
                    hover: {
                        color: '#424242',
                        enabled: false
                    }
                  }
                }
              },
            tooltip: {
                style: {
                    color: '#424242'
                },
                formatter: function () {                    
                    return '<b>' + this.series.xAxis.categories[this.point.x] + '<b>' + ': '+Highcharts.numberFormat(this.point.value, 2) + '</b>';
                }
            },
            title: {
                text: ''
            },

            xAxis: {
                categories: ['Heart failure self management plan',
                    'Urinary tract infection care',
                    'Demential management', 'Psychiatry care plan',
                    'Cancer care plan',
                    'Care Plan',
                    'Overactivity/inattention behavior management',
                    'Mental health care plan (record artifact)',
                    'Hyperlipidemia clinical management plan',
                    'Mental health care plan',
                    'Lifestyle education regarding hypertension', 'Major depressive disorder clinical management plan', 'Anti-suicide psychotherapy',
                    'Heart failure self management plan',
                    'Urinary tract infection care',
                    'Demential management', 'Psychiatry care plan',
                    'Cancer care plan',
                    'Care Plan',
                    'Overactivity/inattention behavior management',
                    'Mental health care plan (record artifact)',
                    'Hyperlipidemia clinical management plan',
                    'Mental health care plan',
                    'Lifestyle education regarding hypertension', 'Major depressive disorder clinical management plan', 'Anti-suicide psychotherapy',
                    'Heart failure self management plan',
                    'Urinary tract infection care',
                    'Demential management', 'Psychiatry care plan',
                    'Cancer care plan',
                    'Care Plan',
                    'Overactivity/inattention behavior management',
                    'Mental health care plan (record artifact)',
                    'Hyperlipidemia clinical management plan',
                    'Mental health care plan',
                    'Lifestyle education regarding hypertension', 'Major depressive disorder clinical management plan', 'Anti-suicide psychotherapy', 'Heart failure self management plan',
                    'Urinary tract infection care',
                    'Demential management', 'Psychiatry care plan',
                    'Cancer care plan',
                    'Care Plan',
                    'Overactivity/inattention behavior management',
                    'Mental health care plan (record artifact)',
                    'Hyperlipidemia clinical management plan',
                    'Mental health care plan',
                    'Lifestyle education regarding hypertension', 'Major depressive disorder clinical management plan', 'Anti-suicide psychotherapy', 'Heart failure self management plan',
                    'Urinary tract infection care',
                    'Demential management', 'Psychiatry care plan',
                    'Cancer care plan',
                    'Care Plan',
                    'Overactivity/inattention behavior management',
                    'Mental health care plan (record artifact)',
                    'Hyperlipidemia clinical management plan',
                    'Mental health care plan',
                    'Lifestyle education regarding hypertension', 'Major depressive disorder clinical management plan', 'Anti-suicide psychotherapy'],
                
                opposite: false,

            },
            credits: {
                enabled: false
            },
            yAxis: {
                categories: ['2017', '2018', '2019', '2020', '2021 (Prediction)'],
                title: null,
                reversed: true,
                opposite: true,
            },



            colorAxis: {
                min: 0,
                minColor: '#e6eaff',
                maxColor: '#536DFE'
            },

            legend: {
                align: 'left',
                layout: 'vertical',
                margin: 0,
                verticalAlign: 'top',
                y: 25,
                symbolHeight: 240,
                symbolWidth: 8
            },

            series: [{
                name: '',
                borderWidth: 0,
                data: [[0, 0, 0.2], [1, 0, 0.6], [2, 0, 0.5], [3, 0, 0.1], [4, 0, 0.2], [5, 0, 0.7],[6, 0, 0.4] ,[7, 0, 0.6], [8, 0, 0.7], [9, 0, 0.1],[10, 0, 0.6], [11, 0, 0.2],[12, 0, 0.7],
                [0, 1, 1],   [1, 1, 0.2], [2, 1, 0.2], [3, 1, 0.9], [4, 1, 0.5], [5, 1, 0.6],[6, 1, 1] ,  [7, 1, 0.6], [8, 1, 0.4], [9, 1, 0.2], [10, 1, 0.6], [11, 1, 1],   [12, 1, 0.2],
                [0, 2, 0.2], [1, 2, 0.9], [2, 2, 0.9], [3, 2, 0.8], [4, 2, 0.3], [5, 2, 0.3],[6, 2, 0.8] ,[7, 2, 0.5], [8, 2, 0.8], [9, 2, 0.3], [10, 2, 0.9], [11, 2, 0.8], [12, 2, 0],
                [0, 3, 0.6], [1, 3, 0.2], [2, 3, 1],   [3, 3, 1],   [4, 3, 0.4], [5, 3, 0.5],[6, 3, 0.9] ,[7, 3, 0.8], [8, 3, 0.9], [9, 3, 0.6], [10, 3, 0.2], [11, 3, 1],   [12, 3, 0.1],
                [0, 4, 0.6], [1, 4, 0.4], [2, 4, 0.7], [3, 4, 0.9], [4, 4, 0.4], [5, 4, 0.5],[6, 4, 0.9] ,[7, 4, 0.6], [8, 4, 0.7], [9, 4, 0.4], [10, 4, 0.6], [11, 4, 0.9], [12, 4, 0.4]],
                dataLabels: {
                    enabled: true,
                    color: '#FFFFFF',
                    style: {
                        textShadow: false ,
                        textOutline: false 
                    }
                }
            }],
        }
        const copdChartdata = {
            chart: {
                type: 'heatmap',
                marginTop: 40,
                marginBottom: 120,
                plotBorderWidth: 0,
            },
            tooltip: {
                style: {
                    color: '#424242'
                },
                formatter: function () {                    
                    return '<b>' + this.series.xAxis.categories[this.point.x] + '<b>' + ': '+Highcharts.numberFormat(this.point.value, 2) + '</b>';
                }
            },
            plotOptions: {
                series: {
                  states: {
                    hover: {
                        color: '#424242',
                        enabled: false
                    }
                  }
                }
              },
            title: {
                text: ''
            },

            xAxis: {
                categories: ['Chronic obstructive pulmonary disease clinical management plan',
                    'Asthma self management',
                    'Heart failure self management plan', 'Demential management',
                    'Chronic obstructive pulmonary disease clinical management plan',
                    'Respiratory therapy',
                    'Mental health care plan (record artifact)',
                    'Hyperlipidemia clinical management plan',
                    'Routine antenatal care',
                    'Mental health care plan',
                    'Lifestyle education regarding hypertension', 'Major depressive disorder clinical management plan', 'Allergic disorder monitoring', 'Asthma self management', 'Anti-suicide psychotherapy', 'Chronic obstructive pulmonary disease clinical management plan',
                    'Asthma self management',
                    'Heart failure self management plan', 'Demential management',
                    'Chronic obstructive pulmonary disease clinical management plan',
                    'Respiratory therapy',
                    'Mental health care plan (record artifact)',
                    'Hyperlipidemia clinical management plan',
                    'Routine antenatal care',
                    'Mental health care plan',
                    'Lifestyle education regarding hypertension', 'Major depressive disorder clinical management plan', 'Allergic disorder monitoring', 'Asthma self management', 'Anti-suicide psychotherapy', 'Chronic obstructive pulmonary disease clinical management plan',
                    'Asthma self management',
                    'Heart failure self management plan', 'Demential management',
                    'Chronic obstructive pulmonary disease clinical management plan',
                    'Respiratory therapy',
                    'Mental health care plan (record artifact)',
                    'Hyperlipidemia clinical management plan',
                    'Routine antenatal care',
                    'Mental health care plan',
                    'Lifestyle education regarding hypertension', 'Major depressive disorder clinical management plan', 'Allergic disorder monitoring', 'Asthma self management', 'Anti-suicide psychotherapy', 'Chronic obstructive pulmonary disease clinical management plan',
                    'Asthma self management',
                    'Heart failure self management plan', 'Demential management',
                    'Chronic obstructive pulmonary disease clinical management plan',
                    'Respiratory therapy',
                    'Mental health care plan (record artifact)',
                    'Hyperlipidemia clinical management plan',
                    'Routine antenatal care',
                    'Mental health care plan',
                    'Lifestyle education regarding hypertension', 'Major depressive disorder clinical management plan', 'Allergic disorder monitoring', 'Asthma self management', 'Anti-suicide psychotherapy', 'Chronic obstructive pulmonary disease clinical management plan',
                    'Asthma self management',
                    'Heart failure self management plan', 'Demential management',
                    'Chronic obstructive pulmonary disease clinical management plan',
                    'Respiratory therapy',
                    'Mental health care plan (record artifact)',
                    'Hyperlipidemia clinical management plan',
                    'Routine antenatal care',
                    'Mental health care plan',
                    'Lifestyle education regarding hypertension', 'Major depressive disorder clinical management plan', 'Allergic disorder monitoring', 'Asthma self management', 'Anti-suicide psychotherapy'],
                opposite: false,

            },
            credits: {
                enabled: false
            },
            yAxis: {
                categories: ['2017', '2018', '2019', '2020', '2021 (Prediction)'],
                title: null,
                reversed: true,
                opposite: true,
            },



            colorAxis: {
                min: 0,
                minColor: '#F3B6B6',
                maxColor: '#DF2F2F'
            },

            legend: {
                align: 'left',
                layout: 'vertical',
                margin: 0,
                verticalAlign: 'top',
                y: 25,
                symbolHeight: 240,
                symbolWidth: 8
            },

            series: [{
                name: '',
                borderWidth: 0,
                data: [[0, 0, 0.2], [1, 0, 0.6], [2, 0, 0.5], [3, 0, 0.1], [4, 0, 0.2], [5, 0, 0.7],[6, 0, 0.4] ,[7, 0, 0.6], [8, 0, 0.7], [9, 0, 0.1],[10, 0, 0.6], [11, 0, 0.2],[12, 0, 0.7],[13, 0, 0.6],[14, 0, 0.2],
                        [0, 1, 0.5], [1, 1, 0.7], [2, 1, 0.8], [3, 1, 0.2], [4, 1, 0.6], [5, 1, 0.2], [6, 1, 0.2] ,[7, 1, 0.8], [8, 1, 0.1], [9, 1, 0.7], [10, 1, 0.2], [11, 1, 0.3], [12, 1, 0.5], [13, 1, 0.8], [14, 1, 0.4],
                        [0, 2, 0.5], [1, 2, 0.7], [2, 2, 0.5], [3, 2, 0.3], [4, 2, 0.6], [5, 2, 0.7], [6, 2, 0.4], [7, 2, 0.2] ,[8, 2, 0.8], [9, 2, 0.9], [10, 2, 0.4],  [11, 2, 0.9], [12, 2, 0],   [13, 2, 0.7], [14, 2, 0.2],
                        [0, 3, 0.2], [1, 3, 0.9], [2, 3, 0.2], [3, 3, 0.1], [4, 3, 0.2], [5, 3, 0.4], [6, 3, 0.2] ,[7, 3, 0.1], [8, 3, 0.7], [9, 3, 0.1], [10, 3, 0.6], [11, 3, 0.9], [12, 3, 0.8], [13, 3, 0.7], [14, 3, 0.9],
                        [0, 4, 0.4], [1, 4, 0.8], [2, 4, 0.5], [3, 4, 0.5], [4, 4, 0.5], [5, 4, 0.4], [6, 4, 0.3] ,[7, 4, 0.4], [8, 4, 0.5], [9, 4, 0.6], [10, 4, 0.4], [11, 4, 0.7], [12, 4, 0.7], [13, 4, 0.7], [14, 4, 0.5]],
                dataLabels: {
                    enabled: true,
                    color: '#FFFFFF',
                    style: {
                        textShadow: false ,
                        textOutline: false 
                    }
                }
            }],
        }

        return (
            <React.Fragment>
                <Head>
                    <title>Healthlligence</title>
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />

                </Head>
                <Layout>
                    <MDBRow>
                        <MDBCol sm="12" md="12" lg="12">
                            <MDBCard className="population-graph">
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol sm="12" md="12" style={{ marginBottom: "12px" }}>
                                            <MDBTypography tag="h5" className="card-title"> Diabetes </MDBTypography>
                                            <div className="value" style={{color:"#00897B"}}>0.68 <span style={{ fontSize: "14px", color: "#424242", fontWeight: "normal" }}> Average Score</span></div>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow style={{marginTop:"-15px"}}>
                                        <MDBCol sm="12" md="12">
                                            <HighchartsReact highcharts={Highcharts} options={diabetesChartdata} />
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol sm="12" md="12" lg="12">
                            <MDBCard className="population-graph">
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol sm="12" md="12" style={{ marginBottom: "12px" }}>
                                            <MDBTypography tag="h5" className="card-title"> Hypertension </MDBTypography>
                                            <div className="value" style={{color:"#536DFE"}}>0.73 <span style={{ fontSize: "14px", color: "#424242", fontWeight: "normal" }}>Average Score</span></div>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow style={{marginTop:"-15px"}}>
                                        <MDBCol sm="12" md="12">
                                            <HighchartsReact highcharts={Highcharts} options={hypertensionChartdata} />
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol sm="12" md="12" lg="12">
                            <MDBCard className="population-graph">
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol sm="12" md="12" style={{ marginBottom: "12px" }}>
                                            <MDBTypography tag="h5" className="card-title"> COPD </MDBTypography>
                                            <div className="value" style={{color:"#DF2F2F"}}>0.73 <span style={{ fontSize: "14px", color: "#424242", fontWeight: "normal" }}> Average Score</span></div>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow style={{marginTop:"-15px"}}>
                                        <MDBCol sm="12" md="12">
                                            <HighchartsReact highcharts={Highcharts} options={copdChartdata} />
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    <style jsx>{PatientEngagementStyles}</style>
                </Layout>
            </React.Fragment>
        );
    }
};

export default PatientEngagement;

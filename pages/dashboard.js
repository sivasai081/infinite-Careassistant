
import React, { Component } from "react";
import Head from 'next/head'
import Layout from "../components/layout";
import dashboardStyle from '../styles/dashboard';
import dynamic from 'next/dynamic';
import moment from 'moment';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Snackbar from '@material-ui/core/Snackbar';
import {
    StaticRouter,
} from "react-router-dom";
import Link from 'next/link';
import axios from 'axios';
import Loader from '../components/loader';
import TaskLoader  from '../components/taskloader';
import * as Constants from '../constants/constant';
import ReactHighcharts from 'react-highcharts';
import StartDatetimepicker from '../components/DatetimePicker';
import EndDatetimepicker from '../components/DatetimePicker1';
import FullCalendar from '../components/FullCalendar';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import {MDBRow, MDBCol, MDBTypography, MDBCard, MDBCardBody, MDBModal, MDBModalBody, MDBModalHeader, MDBInput, MDBSelect, MDBTimeline, MDBTimelineStep, MDBBtn, MDBDataTable, MDBIcon} from "mdbreact";
const OwlCarousel = dynamic(
    () => {
      return import("react-owl-carousel");
    },
    { ssr: false }
  );

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            dashboardchartdetails: [],
            patientslist: [],
            opencreateAppointment: false,
            title:"",
            description: "",
            startDate: "",
            searchedText: "",
            startdateValue:"",
            enddateValue:"",
            selectedAppointment:"",
            scrollBarPosition:"",
            editedId:"",
            typeOfOperation:"",
            allappointments: [],
            recentactivities: [],
            filteredrecentactivities: [],
            assessmentalertsresponse: [],
            dashboardalerts: [],
            dashboardtasks: '',
            dashboardnotestasks: [],
            dashboardappointmenttasks: [],
            snackbaropen: false,
            snackBarMessage: '',
            vertical: 'top',
            horizontal: 'center',
            supervisorDropdown: [{
                text: "Last 6 Months",
                value: "1"
            }],
            appointmentTypes: [
                {text: "ICT",value: 0},
                {text: "Doctor Appointment",value: 1},
                {text: "Other",value: 2}
            ],
            options: {
                scrollZoom: true,
                showLink: false,
                modeBarButtonsToRemove: ['toImage', 'autoScale2d', 'select2d', 'pan2d', 'lasso2d', 'zoom2d', 'hoverCompareCartesian', 'hoverClosestCartesian', 'toggleSpikelines'],
                displaylogo: false,
            },

            trace1: {
                type: "bar",
                name: 'High',
                y: [23, 62, 53, 62, 41],
                x: ['SBVI', 'CMS HCC', 'HHS HCC', 'CCI', 'CCC'],
                marker: {
                    color: '#B71C1C',
                    width: 1
                },
            },
            trace2: {
                y: [28, 14, 18, 18, 33],
                x: ['SBVI', 'CMS HCC', 'HHS HCC', 'CCI', 'CCC'],
                name: 'Med',
                type: 'bar',
                marker: {
                    color: '#FBC02D',
                    width: 1
                }
            },
            trace3: {
                y: [51, 14, 18, 20, 14],
                x: ['SBVI', 'CMS HCC', 'HHS HCC', 'CCI', 'CCC'],
                name: 'Low',
                marker: {
                    color: '#1B5E20',
                    width: 1
                },
                type: 'bar'
            },
            dataBar: {
                labels: ["TOTAL", "TIER1", "TIER2", "TIER3"],
                datasets: [
                    {
                        label: "TOTAL",
                        data: [900, 300, 450, 150],
                        backgroundColor: ["#424242", "#2A2D71", "#5C6BC0", "#C5CAE9"],
                        borderWidth: 4,
                        borderColor: ["#424242", "#2A2D71", "#5C6BC0", "#C5CAE9"]
                    }
                ]
            },

            tier1: {
                x: ["Mar 20", "Apr 20", "May 20", "Jun 20", "Jul 20", "Aug 20"],
                y: [70, 25, 35, 90, 55, 62],
                name: 'Tier 1',
                type: 'bar',
                marker: {
                    color: '#D50000',
                    width: 1
                },
            },
            tier2: {
                x: ["Mar 20", "Apr 20", "May 20", "Jun 20", "Jul 20", "Aug 20"],
                y: [50, 95, 45, 50, 62, 45],
                name: 'Tier 2',
                type: 'bar',
                marker: {
                    color: '#FF8A80',
                    width: 1
                },
            },
            tier3: {
                x: ["Mar 20", "Apr 20", "May 20", "Jun 20", "Jul 20", "Aug 20"],
                y: [65, 62, 35, 45, 25, 98],
                name: 'Tier 3',
                type: 'bar',
                marker: {
                    color: '#FFCDD2',
                    width: 1
                },
            },

            taken: {
                x: ["HRA", "Diabetes", "Hypertension", "Lung Cancer"],
                y: [900, 700, 400, 800],
                name: 'Taken',
                type: 'bar',
                marker: {
                    color: '#1B5E20',
                    width: 1
                },
            },
            pending: {
                x: ["HRA", "Diabetes", "Hypertension", "Lung Cancer"],
                y: [600, 500, 900, 550],
                name: 'Pending',
                type: 'bar',
                marker: {
                    color: '#FBC02D',
                    width: 1
                },
            },

            patientengaagementchartdata: {
                y: [1400, 980, 230, 170, 23],
                x: ['Total Users', 'Active Users', 'Moderate Users', 'Downloaded', 'Not Downloaded'],
                name: 'Users Count',
                type: 'bar',
                marker: {
                    color: ['#727272', '#1B5E20', '#2A2D71', '#FBC02D', '#B71C1C'],
                    width: 1
                },
            },
            assessmentslayout: {
                title: '',
                barmode: 'group',
                legend: Constants.plotlylegend,
                yaxis: {
                    title: {
                        text: 'PATIENT COUNT',
                        font: {
                            family: 'Open Sans',
                            size: 16,
                            color: '#424242'
                        }
                    },
                }
            },
            rctier1: {
                x: ["Lung Cancer", "Diabetes", "Hypertension"],
                y: [700, 500, 510],
                name: 'Tier 1',
                type: 'bar',
                marker: {
                    color: '#D50000',
                    width: 1
                },
            },
            rctier2: {
                x: ["Lung Cancer", "Diabetes", "Hypertension"],
                y: [505, 487, 678],
                name: 'Tier 2',
                type: 'bar',
                marker: {
                    color: '#FF8A80',
                    width: 1
                },
            },
            rctier3: {
                x: ["Lung Cancer", "Diabetes", "Hypertension"],
                y: [615, 603, 575],
                name: 'Tier 3',
                type: 'bar',
                marker: {
                    color: '#FFCDD2',
                    width: 1
                },
            },




            measurestabledata: {
                columns: [
                    {
                        label: 'Measures',
                        field: 'name',
                        sort: 'asc',

                    },
                    {
                        label: 'Total',
                        field: 'count',
                        sort: 'asc',
                    },
                    {
                        label: 'Action',
                        field: 'action',

                    }
                ],
                rows: [

                    {
                        name: "Diabetes",
                        count: "15"

                    },
                    {
                        name: "Lung Cancer",
                        count: "200"

                    },
                    {
                        name: "Hypertension",
                        count: "75"

                    }
                ]
            },






            barChartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [
                        {
                            barPercentage: 1,
                            gridLines: {
                                display: true,
                                color: "rgba(0, 0, 0, 0.1)"
                            }
                        }
                    ],
                    yAxes: [
                        {
                            gridLines: {
                                display: true,
                                color: "rgba(0, 0, 0, 0.1)"
                            },
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                }
            },

        }
    }
    componentDidMount() {
        localStorage.setItem("roleName", "");
        let patientIds = [];
        let caremnagerId = localStorage.getItem('caremanagerId');
        let patient_id = localStorage.getItem('patientId');
        this.setState({
            caremnagerId, patient_id
        });

            axios({
                method:'GET',
                url: `/api/appointments`,
                params: {
                    id: caremnagerId,
                    role: "CAREMANAGER"
                }
            })
            .then(res => {
                this.setState({ allappointments: res.data.json.details });
            })


        axios({
            method: 'GET',
            url: `/api/telemedicine`,
            params: {
                id: caremnagerId
            }
        })
            .then((response) => {
                let patientdetailsresponse = response && response.data && response.data.json;
                patientdetailsresponse && patientdetailsresponse.members && patientdetailsresponse.members.map((el) => {
                    patientIds.push(el.patient_id);
                })
                this.setState({
                    patient_ids: patientIds
                });
                let obj = {
                    "query": { "bool": { "filter": { "terms": { "patient_id.keyword": patientIds } } } }
                }

                axios({
                    method: 'POST',
                    url: `/api/patientslist`,
                    data: obj
                })
                .then(res => {
                    this.setState({patientslist: res.data.json.hits.hits });
                })


                axios({
                    method: 'POST',
                    url: `/api/recentactivity`,
                    data: obj
                })
                .then(res => {
                    this.setState({filteredrecentactivities: res.data.json.hits.hits, recentactivities: res.data.json.hits.hits });
                })

                axios({
                    method: 'POST',
                    url: `/api/dashboardalerts`,
                    data: obj
                })
                .then(res => {
                    this.setState({dashboardalerts: res.data.json.hits.hits });
                })

                axios.get(`/api/getalltasks`, {
                    params: {
                        id: caremnagerId
                    }
                })
                .then(res => {
                    let notesresponse = res.data.json && res.data.json.notes;
                   this.setState({  dashboardnotestasks: notesresponse});
                })

                axios.get(`/api/fetchtaskappointments`, {
                    params: {
                        id: caremnagerId
                    }
                })
                .then(res => {
                    let appointmentresponse = res.data.json && res.data.json.details;
                    this.setState({  dashboardappointmenttasks: appointmentresponse });
                })

                axios.get(`/api/fetchassessmentalerts`, {
                    params: {
                        id: caremnagerId
                    }
                })
                .then(res => {
                    let assessmentalertsresponse = res.data.json.patient_assessments && res.data.json.patient_assessments;
                   this.setState({ assessmentalertsresponse: assessmentalertsresponse});
                })




            })



        let obj = {
            size: 5000,
            sort: [{ run_date: { order: "asc" } }

            ],
            query: {
                bool: {
                    must: {
                        match: {
                            caremanager_id: caremnagerId
                        }
                    },

                    filter: {
                        range: {
                            run_date: {
                                gte: "2020-07-04T18:16:00",
                                lte: "2020-12-18T20:00:00"

                            }
                        }
                    }
                }
            }
        }


        axios({
            method: 'POST',
            url: `/api/dashboard`,
            data: obj,
        })
            .then((response) => {
                this.setState({
                    dashboardchartdetails: response.data.json.hits.hits
                }, () => {
                    let totalusers = this.state.dashboardchartdetails.length;
                    let activeusers = this.state.dashboardchartdetails.filter(el => el._source.Active_User).length;
                    let downloadedusers = this.state.dashboardchartdetails.filter(el => el._source.Active_User).length;
                    let tier1diabetescount = this.state.dashboardchartdetails.filter(el => el._source.Tier == 1 && el._source.Registry == "Diabeties").length;
                    let tier1lungcancercount = this.state.dashboardchartdetails.filter(el => el._source.Tier == 1 && el._source.Registry == "Lung cancer").length;
                    let tier1hypertentioncount = this.state.dashboardchartdetails.filter(el => el._source.Tier == 1 && el._source.Registry == "Hyper tension").length;
                    let tier2diabetescount = this.state.dashboardchartdetails.filter(el => el._source.Tier == 2 && el._source.Registry == "Diabeties").length;
                    let tier2lungcancercount = this.state.dashboardchartdetails.filter(el => el._source.Tier == 2 && el._source.Registry == "Lung cancer").length;
                    let tier2hypertentioncount = this.state.dashboardchartdetails.filter(el => el._source.Tier == 2 && el._source.Registry == "Hyper tension").length;
                    let tier3diabetescount = this.state.dashboardchartdetails.filter(el => el._source.Tier == 3 && el._source.Registry == "Diabeties").length;
                    let tier3lungcancercount = this.state.dashboardchartdetails.filter(el => el._source.Tier == 3 && el._source.Registry == "Lung cancer").length;
                    let tier3hypertentioncount = this.state.dashboardchartdetails.filter(el => el._source.Tier == 3 && el._source.Registry == "Hyper tension").length;
                    let hrataken = this.state.dashboardchartdetails.filter(el => el._source.HRA == "TAKEN").length;
                    let hrapending = this.state.dashboardchartdetails.filter(el => el._source.HRA == "PENDING").length;
                    let diabetestaken = this.state.dashboardchartdetails.filter(el => el._source.DIA == "TAKEN").length;
                    let diabetespending = this.state.dashboardchartdetails.filter(el => el._source.DIA == "PENDING").length;
                    let postdischargetaken = this.state.dashboardchartdetails.filter(el => el._source.PostDischarge == "TAKEN").length;
                    let postdischargepending = this.state.dashboardchartdetails.filter(el => el._source.PostDischarge == "PENDING").length;
                    let sbvihighrange = this.state.dashboardchartdetails.filter(el => el._source.SBVI_range == "HIGH").length;
                    let sbvilowrange = this.state.dashboardchartdetails.filter(el => el._source.SBVI_range == "LOW").length;
                    let sbvimediumrange = this.state.dashboardchartdetails.filter(el => el._source.SBVI_range == "MEDIUM").length;
                    let lacehighrange = this.state.dashboardchartdetails.filter(el => el._source.LACE_range == "HIGH").length;
                    let lacelowrange = this.state.dashboardchartdetails.filter(el => el._source.LACE_range == "LOW").length;
                    let lacemediumrange = this.state.dashboardchartdetails.filter(el => el._source.LACE_range == "MEDIUM").length;
                    let CCChighrange = this.state.dashboardchartdetails.filter(el => el._source.CCC_range == "HIGH").length;
                    let CCClowrange = this.state.dashboardchartdetails.filter(el => el._source.CCC_range == "LOW").length;
                    let CCCmediumrange = this.state.dashboardchartdetails.filter(el => el._source.CCC_range == "MEDIUM").length;
                    let CCIhighrange = this.state.dashboardchartdetails.filter(el => el._source.CCI_range == "HIGH").length;
                    let CCIlowrange = this.state.dashboardchartdetails.filter(el => el._source.CCI_range == "LOW").length;
                    let CCImediumrange = this.state.dashboardchartdetails.filter(el => el._source.CCI_range == "MEDIUM").length;
                    let populationtiercategories = this.state.dashboardchartdetails.map(el => moment(el._source.run_date).format("YYYY-MM-DD"));
                    let tier1patients = this.state.dashboardchartdetails.filter(el => el._source.Tier == 1).length;
                    let tier2patients = this.state.dashboardchartdetails.filter(el => el._source.Tier == 2).length;
                    let tier3patients = this.state.dashboardchartdetails.filter(el => el._source.Tier == 3).length;
                    let janmonthtier1 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Jan")).filter(el => el._source.Tier == 1).length;
                    let janmonthtier2 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Jan")).filter(el => el._source.Tier == 2).length;
                    let janmonthtier3 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Jan")).filter(el => el._source.Tier == 3).length;
                    let febmonthtier1 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Feb")).filter(el => el._source.Tier == 1).length;
                    let febmonthtier2 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Feb")).filter(el => el._source.Tier == 2).length;
                    let febmonthtier3 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Feb")).filter(el => el._source.Tier == 3).length;
                    let marmonthtier1 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Mar")).filter(el => el._source.Tier == 1).length;
                    let marmonthtier2 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Mar")).filter(el => el._source.Tier == 2).length;
                    let marmonthtier3 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Mar")).filter(el => el._source.Tier == 3).length;
                    let aprmonthtier1 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Apr")).filter(el => el._source.Tier == 1).length;
                    let aprmonthtier2 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Apr")).filter(el => el._source.Tier == 2).length;
                    let aprmonthtier3 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Apr")).filter(el => el._source.Tier == 3).length;
                    let maymonthtier1 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "May")).filter(el => el._source.Tier == 1).length;
                    let maymonthtier2 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "May")).filter(el => el._source.Tier == 2).length;
                    let maymonthtier3 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "May")).filter(el => el._source.Tier == 3).length;
                    let junmonthtier1 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Jun")).filter(el => el._source.Tier == 1).length;
                    let junmonthtier2 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Jun")).filter(el => el._source.Tier == 2).length;
                    let junmonthtier3 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Jun")).filter(el => el._source.Tier == 3).length;
                    let julymonthtier1 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Jul")).filter(el => el._source.Tier == 1).length;
                    let julymonthtier2 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Jul")).filter(el => el._source.Tier == 2).length;
                    let julymonthtier3 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Jul")).filter(el => el._source.Tier == 3).length;
                    let augmonthtier1 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Aug")).filter(el => el._source.Tier == 1).length;
                    let augmonthtier2 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Aug")).filter(el => el._source.Tier == 2).length;
                    let augmonthtier3 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Aug")).filter(el => el._source.Tier == 3).length;
                    let sepmonthtier1 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Sep")).filter(el => el._source.Tier == 1).length;
                    let sepmonthtier2 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Sep")).filter(el => el._source.Tier == 2).length;
                    let sepmonthtier3 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Sep")).filter(el => el._source.Tier == 3).length;
                    let octmonthtier1 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Oct")).filter(el => el._source.Tier == 1).length;
                    let octmonthtier2 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Oct")).filter(el => el._source.Tier == 2).length;
                    let octmonthtier3 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Oct")).filter(el => el._source.Tier == 3).length;
                    let novmonthtier1 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Nov")).filter(el => el._source.Tier == 1).length;
                    let novmonthtier2 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Nov")).filter(el => el._source.Tier == 2).length;
                    let novmonthtier3 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Nov")).filter(el => el._source.Tier == 3).length;
                    let decmonthtier1 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Dec")).filter(el => el._source.Tier == 1).length;
                    let decmonthtier2 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Dec")).filter(el => el._source.Tier == 2).length;
                    let decmonthtier3 = (this.state.dashboardchartdetails.filter(el => moment((el._source.run_date)).format("MMM") === "Dec")).filter(el => el._source.Tier == 3).length;

                    let uniquepopulationtiercategories = [...new Set(populationtiercategories)];
                    this.setState({
                        totalusers, activeusers, downloadedusers,
                        notdownloadedusers: totalusers - downloadedusers,
                        moderateusers: totalusers - activeusers,
                        tier1lungcancercount, tier1diabetescount, tier1hypertentioncount,
                        tier2diabetescount, tier2lungcancercount, tier1patients, tier2patients, tier3patients,
                        tier2hypertentioncount, tier3diabetescount, tier3lungcancercount, tier3hypertentioncount,
                        hrataken, hrapending, diabetestaken, diabetespending, postdischargetaken,
                        postdischargepending, sbvihighrange, sbvilowrange, sbvimediumrange, lacehighrange, lacelowrange, lacemediumrange,
                        CCChighrange, CCClowrange, CCCmediumrange, CCIhighrange, CCIlowrange, CCImediumrange,
                        uniquepopulationtiercategories, janmonthtier1, janmonthtier2, janmonthtier3, febmonthtier1, febmonthtier2, febmonthtier3, marmonthtier1,
                        marmonthtier2, marmonthtier3, aprmonthtier1, aprmonthtier2, aprmonthtier3, maymonthtier1, maymonthtier2,
                        maymonthtier3, junmonthtier1, junmonthtier2, junmonthtier3, julymonthtier1, julymonthtier2, julymonthtier3,
                        augmonthtier1, augmonthtier2, augmonthtier3, sepmonthtier1, sepmonthtier2, sepmonthtier3, octmonthtier1,
                        octmonthtier2, octmonthtier3, novmonthtier1, novmonthtier2, novmonthtier3, decmonthtier1, decmonthtier2, decmonthtier3
                    }, ()=>{ 
                        this.setState({
                            populationtiertable:  {
                                columns: [
                                    {
                                        label: 'Tier Level',
                                        field: 'name',
                                        sort: 'asc',
                    
                                    },
                    
                                    {
                                        label: 'Total',
                                        field: 'count',
                                        sort: 'asc',
                                    },
                                ],
                                rows: [
                                    {
                                        name: 'Tier 1',
                                        count: this.state.tier1patients,
                                    },
                                    {
                                        name: 'Tier 2',
                                        count: this.state.tier2patients,
                                    },
                                    {
                                        name: 'Tier 3',
                                        count: this.state.tier3patients
                                    }
                                ]
                            },
                            riskscoretabledata:  {
                                columns: [
                                    {
                                        label: 'Registries',
                                        field: 'name',
                                        sort: 'asc',
                    
                                    },
                                    {
                                        label: 'High',
                                        field: 'high',
                                        sort: 'asc',
                    
                                    },
                                    {
                                        label: 'Low',
                                        field: 'low',
                                        sort: 'asc',
                    
                                    },
                                    {
                                        label: 'Medium',
                                        field: 'medium',
                                        sort: 'asc',
                    
                                    }
                                ],
                                rows: [{
                                    name: "SBVI",
                                    high: this.state.sbvihighrange,
                                    low: this.state.sbvilowrange,
                                    medium: this.state.sbvimediumrange
                                },
                                {
                                    name: "CCI",
                                    high: this.state.CCIhighrange,
                                    low: this.state.CCIlowrange,
                                    medium: this.state.CCImediumrange
                                },
                                {
                                    name: "CCC",
                                    high: this.state.CCChighrange,
                                    low: this.state.CCClowrange,
                                    medium: this.state.CCCmediumrange
                    
                    
                                },
                                {
                                    name: "LACE",
                                    high: this.state.lacehighrange,
                                    low: this.state.lacelowrange,
                                    medium: this.state.lacemediumrange,
                                }
                                ]
                            },
                            assessmentstable : {
                                columns: [
                                    {
                                        label: 'Assessments',
                                        field: 'name',
                                        sort: 'asc',
                    
                                    },
                                    {
                                        label: 'Taken',
                                        field: 'taken',
                                        sort: 'asc',
                    
                                    },
                                    {
                                        label: 'Pending',
                                        field: 'pending',
                                        sort: 'asc',
                    
                                    }
                    
                                ],
                                rows: [
                    
                                    {
                                        name: "HRA",
                                        taken: this.state.hrataken,
                                        pending: this.state.hrapending
                    
                    
                                    },
                                    {
                                        name: "Diabetes",
                                        taken: this.state.diabetestaken,
                                        pending: this.state.diabetespending
                    
                    
                                    },
                                    {
                                        name: "Post Discharge",
                                        taken: this.state.postdischargetaken,
                                        pending: this.state.postdischargepending
                    
                                    }
                                ],
                            },
                            patientengaagementtabledata: {
                                columns: [
                                    {
                                        label: 'Users',
                                        field: 'name',
                                        sort: 'asc',
                    
                                    },
                                    {
                                        label: 'Total',
                                        field: 'count',
                                        sort: 'asc',
                                    }
                                ],
                                rows: [
                    
                                    {
                                        name: "Total Users",
                                        count: this.state.totalusers
                    
                                    },
                                    {
                                        name: "Active Users",
                                        count: this.state.activeusers
                    
                                    },
                                    {
                                        name: "Moderate Users",
                                        count: this.state.moderateusers
                    
                                    },
                                    {
                                        name: "Downloaded",
                                        count: this.state.downloadedusers
                    
                                    },
                                    {
                                        name: "Not Downloaded",
                                        count: this.state.notdownloadedusers
                    
                                    }
                                ]
                            },
                            registriestable : {
                                columns: [
                                    {
                                        label: 'Registries',
                                        field: 'name',
                                        sort: 'asc',
                    
                                    },
                                    {
                                        label: 'Tier 1 ',
                                        field: 'tier1value',
                                        sort: 'asc',
                    
                                    },
                                    {
                                        label: 'Tier 2',
                                        field: 'tier2value',
                                        sort: 'asc',
                    
                                    },
                                    {
                                        label: 'Tier 3',
                                        field: 'tier3value',
                                        sort: 'asc',
                    
                                    }
                                ],
                                rows: [
                                    {
                                        name: "Lung Cancer",
                                        tier1value: this.state.tier1lungcancercount,
                                        tier2value: this.state.tier2lungcancercount,
                                        tier3value: this.state.tier3lungcancercount
                    
                                    },
                                    {
                                        name: "Diabetes",
                                        tier1value: this.state.tier1diabetescount,
                                        tier2value: this.state.tier2diabetescount,
                                        tier3value: this.state.tier3diabetescount
                    
                    
                                    },
                                    {
                                        name: "Hypertension",
                                        tier1value: this.state.tier1hypertentioncount,
                                        tier2value: this.state.tier2hypertentioncount,
                                        tier3value: this.state.tier3hypertentioncount
                    
                    
                                    }
                                ],
                            }
                        }, ()=>{

                            let populationtier = this.state.populationtiertable;
                            let registriestabledata = this.state.registriestable;
                            let riskscoretable = this.state.riskscoretabledata;
                            let patientengaagement = this.state.patientengaagementtabledata;
                            let assessmentstabledata = this.state.assessmentstable;
                            for (let i = 0; i < populationtier.rows.length; i++) {
                                if (populationtier.rows[i].name === "Tier 1"){
                                    populationtier.rows[i].count = <span style={{color: "#00897b", fontWeight: "600"}}>{this.state.tier1patients}</span>
                                }
                                else if (populationtier.rows[i].name === "Tier 2"){
                                    populationtier.rows[i].count = <span style={{color: "#32a095", fontWeight: "600"}}>{this.state.tier2patients}</span>
                                }
                                else if (populationtier.rows[i].name === "Tier 3"){
                                    populationtier.rows[i].count = <span style={{color: "#66b8af", fontWeight: "600"}}>{this.state.tier3patients}</span>
                                }
                            }
                            for (let i = 0; i < registriestabledata.rows.length; i++) {
                                if (registriestabledata.rows[i].name === "Lung Cancer"){
                                    registriestabledata.rows[i].tier1value = <span style={{color: "#ff7367", fontWeight: "600"}}>{this.state.tier1lungcancercount}</span>
                                    registriestabledata.rows[i].tier2value = <span style={{color: "#ff8f85", fontWeight: "600"}}>{this.state.tier2lungcancercount}</span>
                                    registriestabledata.rows[i].tier3value = <span style={{color: "#ffaba3", fontWeight: "600"}}>{this.state.tier3lungcancercount}</span>
                                }
                                else if (registriestabledata.rows[i].name === "Diabetes"){
                                    registriestabledata.rows[i].tier1value = <span style={{color: "#ff7367", fontWeight: "600"}}>{this.state.tier1diabetescount}</span>
                                    registriestabledata.rows[i].tier2value = <span style={{color: "#ff8f85", fontWeight: "600"}}>{this.state.tier2diabetescount}</span>
                                    registriestabledata.rows[i].tier3value = <span style={{color: "#ffaba3", fontWeight: "600"}}>{this.state.tier3diabetescount}</span>
                                }
                                else if (registriestabledata.rows[i].name === "Hypertension"){
                                    registriestabledata.rows[i].tier1value = <span style={{color: "#ff7367", fontWeight: "600"}}>{this.state.tier1hypertentioncount}</span>
                                    registriestabledata.rows[i].tier2value = <span style={{color: "#ff8f85", fontWeight: "600"}}>{this.state.tier2hypertentioncount}</span>
                                    registriestabledata.rows[i].tier3value = <span style={{color: "#ffaba3", fontWeight: "600"}}>{this.state.tier3hypertentioncount}</span>
                                }

                                
                            }
                            for (let i = 0; i < assessmentstabledata.rows.length; i++) {
                                if (assessmentstabledata.rows[i].name === "HRA"){
                                    assessmentstabledata.rows[i].taken = <span style={{color: "#1265f0", fontWeight: "600"}}>{this.state.hrataken}</span>
                                    assessmentstabledata.rows[i].pending = <span style={{color: "#70a2f6", fontWeight: "600"}}>{this.state.hrapending}</span>
                                }
                                else if (assessmentstabledata.rows[i].name === "Diabetes"){
                                    assessmentstabledata.rows[i].taken = <span style={{color: "#1265f0", fontWeight: "600"}}>{this.state.diabetestaken}</span>
                                    assessmentstabledata.rows[i].pending = <span style={{color: "#70a2f6", fontWeight: "600"}}>{this.state.diabetespending}</span>
                                }
                                else if (assessmentstabledata.rows[i].name === "Post Discharge"){
                                    assessmentstabledata.rows[i].taken = <span style={{color: "#1265f0", fontWeight: "600"}}>{this.state.postdischargetaken}</span>
                                    assessmentstabledata.rows[i].pending = <span style={{color: "#70a2f6", fontWeight: "600"}}>{this.state.postdischargepending}</span>
                                }
                                

                                
                            }
                            for (let i = 0; i < riskscoretable.rows.length; i++) {
                                if (riskscoretable.rows[i].name === "SBVI"){
                                    riskscoretable.rows[i].high = <span style={{color: "#B71C1C", fontWeight: "600"}}>{this.state.sbvihighrange}</span>
                                    riskscoretable.rows[i].low = <span style={{color: "#F7B000", fontWeight: "600"}}>{this.state.sbvilowrange}</span>
                                    riskscoretable.rows[i].medium = <span style={{color: "#378C3B", fontWeight: "600"}}>{this.state.sbvimediumrange}</span>
                                }
                                else if (riskscoretable.rows[i].name === "CCI"){
                                    riskscoretable.rows[i].high = <span style={{color: "#B71C1C", fontWeight: "600"}}>{this.state.CCIhighrange}</span>
                                    riskscoretable.rows[i].low = <span style={{color: "#F7B000", fontWeight: "600"}}>{this.state.CCIlowrange}</span>
                                    riskscoretable.rows[i].medium = <span style={{color: "#378C3B", fontWeight: "600"}}>{this.state.CCImediumrange}</span>
                                }
                                else if (riskscoretable.rows[i].name === "CCC"){
                                    riskscoretable.rows[i].high = <span style={{color: "#B71C1C", fontWeight: "600"}}>{this.state.CCChighrange}</span>
                                    riskscoretable.rows[i].low = <span style={{color: "#F7B000", fontWeight: "600"}}>{this.state.CCClowrange}</span>
                                    riskscoretable.rows[i].medium = <span style={{color: "#378C3B", fontWeight: "600"}}>{this.state.CCCmediumrange}</span>
                                }

                                else if (riskscoretable.rows[i].name === "LACE"){
                                    riskscoretable.rows[i].high = <span style={{color: "#B71C1C", fontWeight: "600"}}>{this.state.lacehighrange}</span>
                                    riskscoretable.rows[i].low = <span style={{color: "#F7B000", fontWeight: "600"}}>{this.state.lacelowrange}</span>
                                    riskscoretable.rows[i].medium = <span style={{color: "#378C3B", fontWeight: "600"}}>{this.state.lacemediumrange}</span>
                                }
                            }
                            for (let i = 0; i < patientengaagement.rows.length; i++) {
                                if (patientengaagement.rows[i].name === "Total Users"){
                                    patientengaagement.rows[i].count = <span style={{color: "#00897B", fontWeight: "600"}}>{this.state.totalusers}</span>
                                }
                                else if (patientengaagement.rows[i].name === "Active Users"){
                                    patientengaagement.rows[i].count = <span style={{color: "#29B6F6", fontWeight: "600"}}>{this.state.activeusers}</span>
                                }
                                else if (patientengaagement.rows[i].name === "Moderate Users"){
                                    patientengaagement.rows[i].count = <span style={{color: "#7CB342", fontWeight: "600"}}>{this.state.moderateusers}</span>
                                }
                                else if (patientengaagement.rows[i].name === "Downloaded"){
                                    patientengaagement.rows[i].count = <span style={{color: "#FF8A80", fontWeight: "600"}}>{this.state.downloadedusers}</span>
                                }
                                else if (patientengaagement.rows[i].name === "Not Downloaded"){
                                    patientengaagement.rows[i].count = <span style={{color: "#D32F2F", fontWeight: "600"}}>{this.state.notdownloadedusers}</span>
                                }
                            }


                            this.setState({
                                finalpopulationtiertable: populationtier,
                                finalregistries: registriestabledata, 
                                finalriskscoretable: riskscoretable,
                                finalpatientengaagementtabledata: patientengaagement,
                                finalassessmenttable : assessmentstabledata,
                                isLoaded: false

                            });
                       
                       
                        });
                    });

                });
            })
            .catch(function (response) { console.log(response); });
           

        let measures = this.state.measurestabledata;
        for (let i = 0; i < measures.rows.length; i++) {
            measures.rows[i].action = <MDBBtn color="" size="sm" className="tablebutton"> View </MDBBtn>
        }
    }

    componentDidUpdate() {
        localStorage.setItem('dashboarddetails', this.state.dashboarddetails);

    }

    detailsbutton(el) {
        this.setState({
            dashboarddetails: el
        })
    }

    handleSearch(e, search) {
        this.setState({ searchedText: e.target.value }, () => {
            const filteredData = this.state.filteredrecentactivities.filter(value => {
                const searchStr = this.state.searchedText.toLowerCase();
                const noteTypeMatches = value._source.msg_type.toLowerCase().includes(searchStr);
                const noteTitleMatches = value._source.msg.toLowerCase().includes(searchStr);
                return noteTypeMatches || noteTitleMatches;
            });
            this.setState({ recentactivities: filteredData });

        })
    }
    snackbarClose = (event) => {
        this.setState({
            snackbaropen: false,
            snackBarMessage:""
        })
    }
    updateAppointmenttoggle = () => {
        document.body.classList.remove("create-group-modal");
        if(localStorage.getItem('patientId') === null){
            this.setState({
                opencreateAppointment: false,
                snackbaropen: true,
                snackBarMessage: 'Patient is not selected for updating an appointment !!'
            })
        }else{
            if(this.state.startdateValue < moment(new Date()).format("YYYY-MM-DDTHH:mm:ss")){
                this.setState({
                    opencreateAppointment: false,
                    snackbaropen: true,
                    snackBarMessage: 'You cannot update old Appointments!!'
                })
            }else{
                let color;
                if (this.state.title === "Doctor Appointment") {
                    color = "pink accent-3";
                } else if (this.state.title === "ICT Meeting") {
                    color = "indigo accent-2";
                } else if (this.state.title === "Remote visit") {
                    color = "teal darken-1";
                }
                else {
                    color = "red darken-2";
                }
                this.setState({opencreateAppointment: !this.state.opencreateAppointment, isLoaded: true });
                window.scrollTo({ top: `${this.state.scrollBarPosition}`, behavior: 'smooth' });
                // window.scrollTo({ top: `${window.scrollY-400}`, behavior: 'smooth' });
                axios({
                    method: 'POST',
                    url: `/api/editAppointment`,
                    params: {
                        appointment_id:this.state.editedId,
                        patient_id: this.state.patient_id,
                        caremanager_id: this.state.caremnagerId,
                        title: this.state.title,
                        start_date: moment(this.state.startdateValue).format("YYYY-MM-DDTHH:mm:ss"),
                        end_date: moment(this.state.enddateValue).format("YYYY-MM-DDTHH:mm:ss"),
                        color: color,
                        description: this.state.description,
                        appointment_type: this.state.selectedAppointment
                    }
                })
                .then((response) => {
                    this.setState({
                        createappointmentresponse: response.data.json
                    });
                    axios({
                            method:'GET',
                            url: `/api/appointments`,
                            params: {
                                id: this.state.caremnagerId,
                                role: "CAREMANAGER"
                            }
                        })
                        .then(res => {
                            this.setState({  allappointments: res.data.json.details, isLoaded: false, });
                        })

                })
                .catch((error) => {
                    console.log(error);
                });
            }

        }
    }
    deleteAppointmenttoggle = () => {
        document.body.classList.remove("create-group-modal");
        if(localStorage.getItem('patientId') === null){
            this.setState({
                opencreateAppointment: false,
                snackbaropen: true,
                snackBarMessage: 'Patient is not selected for deleting an appointment !!'
            })
        }else{
            this.setState({ opencreateAppointment: !this.state.opencreateAppointment, isLoaded: true });
            window.scrollTo({ top: `${this.state.scrollBarPosition}`, behavior: 'smooth' });
            // window.scrollTo({ top: `${window.scrollY-400}`, behavior: 'smooth' });
             axios({
                    method:'POST',
                    url: `/api/deleteappointment`,
                    params: {
                        id: this.state.editedId,
                        role:"CAREMANAGER"
                    }
                })
                .then(res => {
                        axios({
                            method:'GET',
                            url: `/api/appointments`,
                            params: {
                                id: this.state.caremnagerId,
                                role: "CAREMANAGER"
                            }
                        })
                        .then(res => {
                            this.setState({  allappointments: res.data.json.details, isLoaded: false, });
                        })
                })
        }
    }
    createAppointmenttoggle = () => {
        document.body.classList.remove("create-group-modal");
        if(localStorage.getItem('patientId') === null){
            this.setState({
                opencreateAppointment: false,
                snackbaropen: true,
                snackBarMessage: 'Patient is not selected for creating an appointment !!'
            })
        }else{
            // console.log(this.state.startdateValue,new Date(),"dates" )
            if(this.state.startdateValue < moment(new Date()).format("YYYY-MM-DDTHH:mm:ss")){
                this.setState({
                    opencreateAppointment: false,
                    snackbaropen: true,
                    snackBarMessage: 'You cannot create Appointments on old date !!'
                })
            }
            else if(this.state.title == ""){
                this.setState({
                    snackbaropen: true,
                    snackBarMessage: 'Please Select Title'
            })
           }
            else if(this.state.selectedAppointment == ""){
                this.setState({
                    snackbaropen: true,
                    snackBarMessage: 'Please Select Appointment Type'
            })
            }else{
                let color;
                if (this.state.selectedAppointment === "Doctor Appointment") {
                    color = "pink accent-3";
                } else if (this.state.selectedAppointment === "ICT") {
                    color = "indigo accent-2";
                }
                else {
                    color = "red darken-2";
                }
                let data = {
                    patient_id: this.state.patient_id,
                    caremanager_id: this.state.caremnagerId,
                    title: this.state.title,
                    start_date: moment(this.state.startdateValue).format("YYYY-MM-DDTHH:mm:ss"),
                    end_date: moment(this.state.enddateValue).format("YYYY-MM-DDTHH:mm:ss"),
                    color: color,
                    description: this.state.description,
                    appointment_type: this.state.selectedAppointment
                }
                this.setState({opencreateAppointment: !this.state.opencreateAppointment, isLoaded: true });
                window.scrollTo({ top: `${this.state.scrollBarPosition}`, behavior: 'smooth' });
                axios({
                    method: 'POST',
                    url: `/api/createAppointment`,
                    params: {
                        patient_id: this.state.patient_id,
                        caremanager_id: this.state.caremnagerId,
                        title: this.state.title,
                        start_date: moment(this.state.startdateValue).format("YYYY-MM-DDTHH:mm:ss"),
                        end_date: moment(this.state.enddateValue).format("YYYY-MM-DDTHH:mm:ss"),
                        color: color,
                        description: this.state.description,
                        appointment_type: this.state.selectedAppointment
                    },
                    data: data,
                })
                .then((response) => {
                    this.setState({
                        createappointmentresponse: response.data.json,
                        selectedAppointment: "",
                        title: ""

                    });
                    axios({
                            method:'GET',
                            url: `/api/appointments`,
                            params: {
                                id: this.state.caremnagerId,
                                role: "CAREMANAGER"
                            }
                        })
                        .then(res => {
                            this.setState({  allappointments: res.data.json.details, isLoaded: false, selectedAppointment:"" });
                        })

                })
                .catch((error) => {
                    console.log(error);
                });
            }

        }
    }
    
    handleClose = () => {
        this.setState({
            open: false
        })
    }
    handleDateClick = e => {
            let top = `${window.scrollY}`;
            this.setState({
                scrollBarPosition: top
            })
            document.body.classList.add("create-group-modal");
            this.setState({
                opencreateAppointment: !this.state.opencreateAppointment,
                typeOfOperation: "CREATE",
                title: "",
                description: "",
                startdateValue: "",
                enddateValue: "",
                selectedAppointment: "",
            })
     
    }
    cancelAppointmenttoggle = e => {
        this.setState({
            opencreateAppointment: !this.state.opencreateAppointment
        })
        document.body.classList.remove("create-group-modal");
        window.scrollTo({ top: `${this.state.scrollBarPosition}`, behavior: 'smooth' });
    }
    cancelEditAppointmenttoggle = e => {
        this.setState({
            opencreateAppointment: !this.state.opencreateAppointment
        })
        document.body.classList.remove("create-group-modal");
        window.scrollTo({ top: `${this.state.scrollBarPosition}`, behavior: 'smooth' });
    }
    handleEventClick = (clickInfo) => {
        let top = `${window.scrollY}`;
        this.setState({
            scrollBarPosition: top
        })
        document.body.classList.add("create-group-modal");
        let selctedIndex;
        this.setState({
            opencreateAppointment: !this.state.opencreateAppointment,
            typeOfOperation: "EDIT",
            title: "",
            description: "",
            startdateValue: "",
            enddateValue: "",
            selectedAppointment: "",
            editedId: clickInfo.event.id
        })
        let appointments = this.state.allappointments;
        appointments && appointments.map((el) => {
            if(clickInfo.event.id === el.id){
                this.state.appointmentTypes.map((item,index) => {
                    if(item.text === el.appointment_type){
                        selctedIndex = index;
                        
                    }
                })
                // console.log( this.state.appointmentTypes[0].text,"this.state.appointmentTypes")
                this.setState({
                    title: el.title,
                    description: el.description,
                    startdateValue: moment(el.start_date).format("YYYY-MM-DDTHH:mm"),
                    enddateValue: moment(el.end_date).format("YYYY-MM-DDTHH:mm"),
                    selectedAppointment: this.state.appointmentTypes[selctedIndex].text
                })
            }
        });
        // console.log(clickInfo.event.title,clickInfo.event.title,clickInfo.event.startStr,clickInfo.event.endStr,clickInfo.event.id,"clickInfo")
    }
    titlehandler = e => {
        this.setState({
            title: e.target.value
        })
    }
    descriptionChange = e => {
        this.setState({
            description: e.target.value
        })
    }
    handleStartDateChange = e => {
    }
    appointmentTypesChange = e => {
        this.setState({
            selectedAppointment: this.state.appointmentTypes[e[0]].text
        })
    }
    startDate = startdate => {
        this.setState({startdateValue: startdate+":00"});
    }
    endDate = enddate => {
        this.setState({enddateValue: enddate+":00"});
    }
    render() {
        console.log("changes commited")
        let activepatients = this.state.patientslist.filter(el => el._source.status == "ACTIVE");
        let inactivepatients = this.state.patientslist.filter(el => el._source.status == "INACTIVE");
        let dashboardalerts = this.state.dashboardalerts.length;
        let dashboardnotestasks = this.state.dashboardnotestasks.length;
        let dashboardappointmenttasks = this.state.dashboardappointmenttasks && this.state.dashboardappointmenttasks.length;
        let assessmentalertsresponse = this.state.assessmentalertsresponse && this.state.assessmentalertsresponse.length;
        let dashboardtasks = dashboardnotestasks + dashboardappointmenttasks;
        const patientengaagement = {
            chart: {
                height: 190,
                type: 'column',
                style: {
                    fontFamily: 'Open Sans',
                    fontSize: "10px"
                }
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['Total Users', 'Active Users', 'Moderate Users', 'Downloaded', 'Not Downloaded']

            },
            yAxis: {
                min: 0,
                title: {
                    text: 'USERS COUNT',

                },
            },
            plotOptions: {
                series: {
                    pointWidth: 15,
                    animation: {
                        duration: 3000
                    }
                }
            },

            

            credits: {
                enabled: false
            },
            colors: ['#00897B', '#29B6F6', '#7CB342', '#FF8A80', '#D32F2F'],
            series: [{
                name: 'Count',
                colorByPoint: true,
                showInLegend: false,
                data: [this.state.totalusers, this.state.activeusers, this.state.moderateusers, this.state.downloadedusers, this.state.notdownloadedusers]
            }]
        };
        const Registireschart = {

            chart: {
                height: 190,
                type: "column",
                style: {
                    fontFamily: 'Open Sans',
                    fontSize: "10px"
                }
            },
            title: {
                text: ""
            },
            credits: {
                enabled: false
            },
            yAxis: {
                title: {
                    text: 'PATIENT COUNT'
                }
            },
            plotOptions: {
                series: {
                    pointWidth: 8,
                    animation: {
                        duration: 3000
                    }
                }
            },

            xAxis: {
                categories: ["Lung Cancer", "Diabetes", "Hypertension"],
                crosshair: true
            },
            colors: ['#ff7367', '#ff8f85', '#ffaba3'],
            series: [{
                name: 'Tier 1',
                data: [this.state.tier1lungcancercount, this.state.tier1diabetescount, this.state.tier1hypertentioncount]
            }, {
                name: 'Tier 2',
                data: [this.state.tier2lungcancercount, this.state.tier2diabetescount, this.state.tier2hypertentioncount]
            }, {
                name: 'Tier 3',
                data: [this.state.tier3lungcancercount, this.state.tier3diabetescount, this.state.tier3hypertentioncount]
            }]
        };
        const populationtier = {
            chart: {
                height: 190,
                type: "column",
                zoomType: 'x',
                style: {
                    fontFamily: 'Open Sans',
                    fontSize: "10px"
                }
            },
            title: {
                text: ""
            },
            
            credits: {
                enabled: false
            },
            yAxis: {
                title: {
                    text: 'PATIENT COUNT'
                }
            },
            xAxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
                crosshair: true
            },

            colors: ['#00897b', '#32a095', '#66b8af'],
            series: [{
                name: 'Tier 1',
                data: [this.state.janmonthtier1, this.state.febmonthtier1, this.state.marmonthtier1, this.state.aprmonthtier1, this.state.maymonthtier1, this.state.junmonthtier1, this.state.julymonthtier1, this.state.augmonthtier1, this.state.sepmonthtier1, this.state.octmonthtier1, this.state.novmonthtier1, this.state.decmonthtier1]
            }, {
                name: 'Tier 2',
                data: [this.state.janmonthtier2, this.state.febmonthtier2, this.state.marmonthtier2, this.state.aprmonthtier2, this.state.maymonthtier2, this.state.junmonthtier2, this.state.julymonthtier2, this.state.augmonthtier2, this.state.sepmonthtier2, this.state.octmonthtier2, this.state.novmonthtier2, this.state.decmonthtier2]
            }, {
                name: 'Tier 3',
                data: [this.state.janmonthtier3, this.state.febmonthtier3, this.state.marmonthtier3, this.state.aprmonthtier3, this.state.maymonthtier3, this.state.junmonthtier3, this.state.julymonthtier3, this.state.augmonthtier3, this.state.sepmonthtier3, this.state.octmonthtier3, this.state.novmonthtier3, this.state.decmonthtier3]
            }]
        };
        
        const assessmentschart = {
            chart: {
                height: 190,
                type: "column",
                style: {
                    fontFamily: 'Open Sans',
                    fontSize: "10px"
                }
            },
            title: {
                text: ""
            },

            plotOptions: {
                series: {
                    pointWidth: 8
                }
            },

            credits: {
                enabled: false
            },
            yAxis: {
                title: {
                    text: 'PATIENT COUNT'
                }
            },

            colors: ['#1265f0', '#70a2f6'],
            xAxis: {
                categories: ["HRA", "Diabetes", "Post Discharge"],
                crosshair: true
            },
            series: [{
                name: 'Taken',
                data: [this.state.hrataken, this.state.diabetestaken, this.state.postdischargetaken]
            }, {
                name: 'Pending',
                data: [this.state.hrapending, this.state.diabetespending, this.state.postdischargepending],
            }]
        };
        const riskscorechart = {
            chart: {
                height: 190,
                type: 'bar',
                style: {
                    fontFamily: 'Open Sans',
                    fontSize: "10px"
                }
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['SBVI', 'CCI', 'CCC', 'LACE']
            },
            colors: ['#B71C1C', '#F7B000', '#378C3B'],
            yAxis: {
                title: {
                    text: 'POPULATION COUNT'
                }
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    stacking: 'normal',

                },

            },

            series: [{
                name: 'High',
                data: [this.state.sbvihighrange, this.state.CCIhighrange, this.state.CCChighrange, this.state.lacehighrange]
            }, {
                name: 'Medium',
                data: [this.state.sbvimediumrange, this.state.CCImediumrange, this.state.CCCmediumrange, this.state.lacemediumrange]
            }, {
                name: 'Low',
                data: [this.state.sbvilowrange, this.state.CCIlowrange, this.state.CCClowrange, this.state.lacelowrange]
            }]
        };
        let appointments = this.state.allappointments;
        let appointmenttasks = appointments && appointments.map((el) => {
            return {
                id: el.id,
                title: el.title,
                start: el.start_date,
                end: el.end_date,
                color: el.appointment_type == "Doctor Appointment" ? "#DB1962" : el.appointment_type == "ICT" ? "#7cb342" : "#536dfe"
            }
            // moment(el.start_date).format('LT') + " " + 
        });
        return (
            <React.Fragment>
                <Head>
                    <title>Healthlligence</title>
                    {/* <script
                            src="https://code.jquery.com/jquery-3.3.1.js"
                            integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
                            crossorigin="anonymous"></script> */}
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
                </Head>
            <Layout isLoaded={this.state.isLoaded}>
                <MDBRow>
                    <MDBCol sm="2" md="2" lg="2" style={{ marginBottom: "16px" }}>
                        <Link href="/patientlist">
                            <MDBCard onClick={this.detailsbutton.bind(this, "newpatients")} style={{height: "100%"}}>
                                <div className="hoverable">
                                    <MDBCardBody>
                                        <div className="dashboardkpiicons color-newpatients">

                                            <img src="/images/patient_icon_kpi.svg" alt="" className="white-text" style={{width: "24px", height: "24px"}}/>

                                        </div>
                                        <MDBTypography
                                            tag="h6"
                                            variant="h6-responsive"
                                            className="align-center kpilabel"
                                        >
                                            New Patients
                                        </MDBTypography>
                                        <MDBTypography
                                            tag="h4"
                                            variant="h4-responsive"
                                            className="align-center counter-text"
                                        >
                                            {inactivepatients && inactivepatients.length}
                                    </MDBTypography>
                                    </MDBCardBody>
                                </div>
                            </MDBCard>
                        </Link>
                    </MDBCol>
                    <MDBCol sm="2" md="2" lg="2" style={{ marginBottom: "16px" }}>
                        <Link href="/patientlist">
                            <MDBCard onClick={this.detailsbutton.bind(this, "activepatients")} style={{height: "100%"}}>
                                <div className="hoverable">
                                    <MDBCardBody>
                                        <div className="dashboardkpiicons color-activepatients">

                                            <img src="/images/patient_icon_kpi.svg" alt="" className="white-text" style={{width: "24px", height: "24px"}}/>

                                        </div>
                                        <MDBTypography
                                            tag="h6"
                                            variant="h6-responsive"
                                            className="align-center kpilabel"
                                        >
                                            Active Patients
                                        </MDBTypography>
                                        <MDBTypography
                                            tag="h4"
                                            variant="h4-responsive"
                                            className="align-center counter-text"
                                        >
                                            {activepatients && activepatients.length}
                                    </MDBTypography>
                                    </MDBCardBody>
                                </div>
                            </MDBCard>
                        </Link>
                    </MDBCol>
                    <MDBCol sm="2" md="2" lg="2" style={{ marginBottom: "16px" }}>
                        <Link href="/dashboarddetails">
                            <MDBCard onClick={this.detailsbutton.bind(this, "alerts")} style={{height: "100%"}}>
                                <div className="hoverable">
                                    <MDBCardBody>
                                        <div className="dashboardkpiicons color-1">

                                            <img src="/images/dashboard_alerticon.png" alt="" className="white-text" />

                                        </div>
                                        <MDBTypography
                                            tag="h6"
                                            variant="h6-responsive"
                                            className="align-center kpilabel"
                                        >
                                            Alerts
                                        </MDBTypography>
                                        <MDBTypography
                                            tag="h4"
                                            variant="h4-responsive"
                                            className="align-center counter-text"
                                        >
                                            {dashboardalerts}
                                    </MDBTypography>
                                    </MDBCardBody>
                                </div>
                            </MDBCard>
                        </Link>
                    </MDBCol>
                    <MDBCol sm="2" md="2" lg="2" style={{ marginBottom: "16px" }}>
                        <Link href="/dashboarddetails">
                            <MDBCard onClick={this.detailsbutton.bind(this, "tasks")} style={{height: "100%"}}>
                                <div className="hoverable">
                                    <MDBCardBody>
                                        <div className="dashboardkpiicons color-2">
                                        <MDBIcon icon="tasks" className="whitecolor" />
                                        </div>
                                        <MDBTypography
                                            tag="h6"
                                            variant="h6-responsive"
                                            className="align-center kpilabel"
                                        >
                                            Tasks
                                    </MDBTypography>
                                        <MDBTypography
                                            tag="h4"
                                            variant="h4-responsive"
                                            className="align-center counter-text"
                                        >
                                            {dashboardtasks}
                                    </MDBTypography>
                                    </MDBCardBody>
                                </div>
                            </MDBCard>
                        </Link>
                    </MDBCol>
                    <MDBCol sm="2" md="2" lg="2" style={{ marginBottom: "16px" }}>
                        <Link href="/dashboarddetails">
                            <MDBCard onClick={this.detailsbutton.bind(this, "assessments")} style={{height: "100%"}}>
                                <div className="hoverable">
                                    <MDBCardBody >
                                        <div className="dashboardkpiicons color-assessment">
                                            <img src="/images/dashboard_assessmenticon.png" alt="" className="white-text" />

                                        </div>
                                        <MDBTypography
                                            tag="h6"
                                            variant="h6-responsive"
                                            className="align-center kpilabel"
                                        >
                                            Assessments
                                    </MDBTypography>
                                        <MDBTypography
                                            tag="h4"
                                            variant="h4-responsive"
                                            className="align-center counter-text"
                                        >
                                            {assessmentalertsresponse}
                                    </MDBTypography>
                                    </MDBCardBody>
                                </div>
                            </MDBCard>
                        </Link>
                    </MDBCol>
                    <MDBCol sm="2" md="2" lg="2" style={{ marginBottom: "16px" }}>
                        <Link href="/dashboarddetails">
                            <MDBCard onClick={this.detailsbutton.bind(this, "events")} style={{height: "100%"}}>
                                <div className="hoverable">
                                    <MDBCardBody>
                                        <div className="dashboardkpiicons color-4">
                                            <img src="/images/dashboard_eventicon.png" alt="" className="white-text" />

                                        </div>
                                        <MDBTypography
                                            tag="h6"
                                            variant="h6-responsive"
                                            className="align-center kpilabel"
                                        >
                                            Events
                                    </MDBTypography>
                                        <MDBTypography
                                            tag="h4"
                                            variant="h4-responsive"
                                            className="align-center counter-text"
                                        >
                                            7
                                    </MDBTypography>
                                    </MDBCardBody>
                                </div>
                            </MDBCard>
                        </Link>
                    </MDBCol>

                </MDBRow>

                <MDBRow>
                    <MDBCol sm="12" md="12" lg="4" className="col-one"  style={{ marginBottom: "16px", paddingLeft:"8px", paddingRight:"8px"}}>
                        <MDBCard style={{ height: "100%" }}>
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol md="12">
                                        <MDBTypography tag="h5" variant="h5-responsive" className="card-title"> Population Tier</MDBTypography>
                                        <div className="card-sub-title"><span className="count">{this.state.totalusers}</span> Total Patients</div>
                                    </MDBCol>
                                    
                                </MDBRow>
                                
                                <br />
                                <MDBRow>
                                    <MDBCol md="12">
                                        <ReactHighcharts config={populationtier}></ReactHighcharts>
                                    </MDBCol>


                                </MDBRow>
                                <MDBRow style={{ marginTop: "24px" }}>
                                    <MDBCol md="12">
                                        <MDBDataTable
                                            small
                                            hover={true}
                                            responsive={true}
                                            paging={false}
                                            searching={false}
                                            data={this.state.finalpopulationtiertable}
                                        />
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol sm="12" md="12" lg="4" className="col-two"  style={{ marginBottom: "16px" }}>
                        <MDBCard className="" style={{ height: "100%" }}>
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol md="6">
                                        <MDBTypography tag="h5" variant="h5-responsive" className="card-title"> Registries </MDBTypography>
                                        <div className="card-sub-title"><span className="count">3</span> Registry(s)</div>
                                    </MDBCol>
                                    <MDBCol sm="6" md="6" lg="6"  className="dropdown-col" style={{ marginTop: "8px" }}>
                                        {/* <MDBSelect
                                            options={this.state.supervisorDropdown}
                                            // outline
                                            selected="Last 6 Months"
                                            className="month-right-dropdown registries-dropdown"
                                        /> */}
                                    </MDBCol>
                                </MDBRow>
                                {/* <MDBRow>
                                    <MDBCol md="12">
                                        <div className="card-sub-title"><span className="count">3</span> Registry(s)</div>
                                    </MDBCol>
                                </MDBRow> */}
                                <br />
                                <MDBRow>
                                    <MDBCol md="12">
                                        <ReactHighcharts config={Registireschart}></ReactHighcharts>
                                    </MDBCol>


                                </MDBRow>
                                <MDBRow style={{ marginTop: "24px" }}>
                                    <MDBCol md="12">
                                        <MDBDataTable
                                            small
                                            hover={true}
                                            responsive={true}
                                            paging={false}
                                            searching={false}
                                            data={this.state.finalregistries}
                                        />
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol sm="12" md="12" lg="4" className="col-three"  style={{ marginBottom: "16px" }}>
                        <MDBCard className="" style={{ height: "100%" }}>
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol md="12">
                                        <MDBTypography tag="h5" variant="h5-responsive" className="card-title"> Assessments</MDBTypography>
                                        <div className="card-sub-title"><span className="count">3</span> Assessment(s)</div>
                                    </MDBCol>
                                </MDBRow>
                                {/* <MDBRow>
                                    <MDBCol md="12">
                                    <div className="card-sub-title"><span className="count">3</span> Assessment(s)</div>
                                    </MDBCol>
                                </MDBRow> */}
                                <br />
                                <MDBRow>

                                    <MDBCol md="12">
                                        <ReactHighcharts config={assessmentschart}></ReactHighcharts>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow style={{ marginTop: "24px" }}>
                                    <MDBCol md="12">
                                        <MDBDataTable
                                            small
                                            hover={true}
                                            responsive={true}
                                            paging={false}
                                            searching={false}
                                            data={this.state.finalassessmenttable}
                                        />
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol sm="12" md="12" lg="4" className="col-one" style={{ marginBottom: "16px", paddingLeft:"8px", paddingRight:"8px"}}>
                        <MDBCard style={{ height: "100%" }}>
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol md="12">
                                        <MDBTypography tag="h5" variant="h5-responsive" className="card-title"> Patient Engagement</MDBTypography>
                                    </MDBCol>

                                </MDBRow>
                                
                                <MDBRow>
                                    <MDBCol md="12">
                                        <ReactHighcharts config={patientengaagement}></ReactHighcharts>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow style={{ marginTop: "24px" }}>
                                    <MDBCol md="12">
                                        <MDBDataTable
                                            small
                                            hover={true}
                                            responsive={true}
                                            paging={false}
                                            searching={false}
                                            data={this.state.finalpatientengaagementtabledata}
                                        />
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol sm="12" md="12" lg="4" className="col-two" style={{ marginBottom: "16px" }}>
                        <MDBCard className="" style={{ height: "100%" }}>
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol md="12">
                                        <MDBTypography tag="h5" variant="h5-responsive" className="card-title"> Population by Risk Score</MDBTypography>
                                        {/* <div className="card-sub-title"><span className="count">6</span></div> */}
                                    </MDBCol>
                                </MDBRow>
                                {/* <MDBRow>
                                    <MDBCol md="12">
                                    <div className="card-sub-title"><span className="count">6</span></div>
                                        
                                    </MDBCol>
                                </MDBRow> */}
                               
                                <MDBRow>
                                    <MDBCol md="12">
                                        <ReactHighcharts config={riskscorechart}></ReactHighcharts>
                                    </MDBCol>


                                </MDBRow>
                                <MDBRow style={{ marginTop: "28px" }}>
                                    <MDBCol md="12">
                                        <MDBDataTable
                                            small
                                            hover={true}
                                            responsive={true}
                                            paging={false}
                                            searching={false}
                                            data={this.state.finalriskscoretable}
                                        />
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol sm="12" md="12" lg="4" className="col-three" style={{ marginBottom: "16px" }}>
                        <MDBCard className="" style={{ height: "100%" }}>
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol md="12">
                                        <MDBTypography tag="h5" variant="h5-responsive" className="card-title"> Measures Not Completed</MDBTypography>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow style={{ marginTop: "16px" }}>
                                    <MDBCol md="12">
                                        <MDBDataTable
                                            small
                                            hover={true}
                                            responsive={true}
                                            paging={false}
                                            searching={false}
                                            data={this.state.measurestabledata}
                                        />
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md="12" style={{paddingLeft:"8px", paddingRight:"8px"}}>
                        <MDBCard>
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol md="6">
                                        <MDBTypography tag="h5" variant="h5-responsive" className="card-title"> Recent Activity </MDBTypography>
                                    </MDBCol>
                                    <MDBCol md="6">
                                        
                                        <div class="recent_activity_search_container">
                                            <MDBIcon icon="search" className="recent_activity_search_icon" style={{ color: "#424242" }} />
                                            <input placeholder="Search" id="searching" className="recent_activity_search_bar" type="text" value={this.state.searchedText} onChange={this.handleSearch.bind(this)}></input>
                                            <MDBBtn color="" className="primarybutton" style={{width:"130px;"}} >View All</MDBBtn>
                                        </div>
                                    </MDBCol>
                                    {/* <MDBCol md="1" className="primarybutton-classname">
                                        <MDBBtn color="" size="sm" className="primarybutton">View All</MDBBtn>
                                    </MDBCol> */}
                                </MDBRow>

                                {this.state.recentactivities && this.state.recentactivities.length ?

                                    <MDBRow className="timeline-container">
                                        <MDBCol md="12">

                                            <MDBTimeline>
                                                {
                                                    this.state.recentactivities.map((el) => {
                                                        return (

                                                            <MDBTimelineStep inverted  color={el._source.msg_type == "hospitalised " ? "red accent-1" : el._source.msg_type == "Assessment " ? "orange darken-2" : "teal darken-1"} icon={el._source.msg_type == "hospitalised " ? "signal" : el._source.msg_type == "Assessment " ? "file-alt" : "check"}>
                                                                <p>{el._source.msg}</p>
                                                                <h6>4 Hours ago</h6>
                                                            </MDBTimelineStep>

                                                        )
                                                    })
                                                }
                                            </MDBTimeline>
                                        </MDBCol>
                                    </MDBRow> :
                                    <MDBRow>
                                        <MDBCol className="d-flex align-items-center justify-content-center">
                                            <div className="img-not-found oneColumn">
                                                <img src="/images/NoMatchingRecordsFound.svg" className="not-found-img" />
                                                <MDBTypography tag="h6" variant="h6-responsive" className="align-center no-found-text">No Matching Records Found </MDBTypography>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>}
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                </MDBRow>
                <Snackbar
                    anchorOrigin={{ vertical:'top', horizontal:'center' }}
                    open={this.state.snackbaropen}
                    autoHideDuration = {6000}
                    onClose={this.snackbarClose}
                    message= {<span id ="message-id">{this.state.snackBarMessage}</span>}
                    // action={[
                    //     <IconButton
                    //         key="close"
                    //         aria-label="Close"
                    //         color= "inherit"
                    //         onClick={this.snackbarClose}
                    //         >
                    //         x
                    //         </IconButton>
                    // ]}
                />
                <MDBRow className='timeline-graph'>
                    <MDBCol md="12" style={{paddingLeft:"8px", paddingRight:"8px"}}>
                        <StaticRouter>
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol md="6">
                                            <MDBTypography tag="h5" variant="h5-responsive" className="card-title"> Care Manager's Calendar </MDBTypography>
                                            <div className="card-sub-title"><span className="count" style={{fontWeight: "700"}}>{this.state.allappointments.length}</span> Appointments</div>
                                        </MDBCol>

                                        {/* <MDBCol md="6">
                                            <MDBBtn color="" size="sm" className="customizebutton pull-right">Customize</MDBBtn>
                                        </MDBCol> */}
                                    </MDBRow>
                                    <MDBRow style={{ marginTop: "32px", padding:"0rem .9rem" }} className="calneder-row">
                                        <FullCalendar
                                            defaultView="dayGridMonth"
                                            timeZone= 'UTC'
                                            headerToolbar={{
                                                left: 'prev,next,today',
                                                center: 'title',
                                                right: 'dayGridMonth,timeGridWeek,timeGridDay'
                                            }}
                                            selectable={true}
                                            editable = {true}
                                            events={appointmenttasks}
                                            select={this.handleDateClick.bind(this)}
                                            eventClick={this.handleEventClick.bind(this)}
                                        />

                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>

                        </StaticRouter>
                    </MDBCol>
                </MDBRow>
                <MDBModal isOpen={this.state.opencreateAppointment} toggle={this.cancelEditAppointmenttoggle} className="createappointment" id="createappointment-modal">
                    <MDBModalHeader className="modaltitle" toggle={this.cancelEditAppointmenttoggle}>{this.state.typeOfOperation === "EDIT" ? "Edit Appointment" : "Create an Appointment"}</MDBModalHeader>
                    <MDBModalBody className="md-form-margin">
                    <MDBInput label="Title" className="appointment-title" icon="" value = {this.state.title} onChange={this.titlehandler} />
                    <MDBInput
                        type="textarea"
                        label="Description"
                        value={this.state.description}
                        onChange={(e) => this.descriptionChange(e)}
                    ></MDBInput>
                    <MDBRow>
                        <MDBCol size ="6">
                            <StartDatetimepicker startDate={this.startDate} startdateValue={this.state.startdateValue}/>
                        </MDBCol>
                        <MDBCol size ="6">
                            <EndDatetimepicker endDate={this.endDate} enddateValue={this.state.enddateValue}/>
                        </MDBCol>
                    </MDBRow>
                    <MDBSelect
                        options={this.state.appointmentTypes}
                        // outline
                        // label={"Please Select appointment type"}
                        className="appointment-dropdown"
                        selected={this.state.selectedAppointment ? this.state.selectedAppointment : "Please Select appointment type"}
                        getValue={(val) => this.appointmentTypesChange(val)}
                    />
                    {/* <MDBDatePicker value={this.state.startDate} onChange={this.handleStartDateChange} /> */}
                    <div className="text-right">
                        {this.state.typeOfOperation === "EDIT" ? <MDBBtn flat className="flatbutton" onClick={this.deleteAppointmenttoggle}>DELETE</MDBBtn> : <MDBBtn flat className="flatbutton" onClick={this.cancelAppointmenttoggle}>CANCEL</MDBBtn>}
                        {this.state.typeOfOperation === "EDIT" ? <MDBBtn flat className="flatbutton" onClick={this.updateAppointmenttoggle}>UPDATE</MDBBtn> : <MDBBtn flat className="flatbutton" onClick={this.createAppointmenttoggle}>CREATE</MDBBtn>}
                    </div>
                    </MDBModalBody>
                </MDBModal>
                {this.state.isLoaded && <Loader />}
                
                
                <style jsx>{dashboardStyle}</style>
                {/* <style jsx>{TimelineStyle}</style> */}
            </Layout>
        </React.Fragment>
        );
    }
};

export default Dashboard;

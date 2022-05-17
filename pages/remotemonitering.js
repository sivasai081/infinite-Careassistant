
import React, { Component } from "react";
import Layout from "../components/layout";
import remoteMoniteringStyle from '../styles/remotemonitering';
import dynamic from 'next/dynamic';
import moment from 'moment';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Link from 'next/link';
import Head from 'next/head'
import axios from 'axios';
import Loader from '../components/loader';
import 'chartjs-plugin-annotation';
import ReactHighcharts from 'react-highcharts';
import { MDBRow, MDBCol, MDBTypography, MDBCard, MDBCardBody, MDBSelect, MDBBtnGroup, MDBBtn, MDBDataTable } from "mdbreact";
// import CGMgraph from "../components/CGMgraph";
const Plot = dynamic(
    () => import('react-plotly.js'),
    { ssr: false }
)

class RemoteMonitering extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {},
            remotemoniteringdetails: '',
            cgmresponse: {},
            cgmresponseDialy: {},
            cgmHourlyrealdataresponse: {},
            cgmDialyrealdataresponse: {},
            cgmGraphData: [],
            cgmDialyGraphData: [],
            cgmrealGraphData: [],
            cgmrealGraphDialyData: [],
            realData: [],
            cgmrealMeanData: [],
            cgmrealMaxData: [],
            cgmrealMinData: [],
            abnormalData: [],
            predictedData: [],
            predictedDialyMeanData: [],
            predictedDialyMaxData: [],
            predictedDialyMinData: [],
            abnormalGlucosedata: [],
            isLoaded: true,
            hourlyTab: "activeClass",
            dialyTab: "",
            abnormal_low_threshold: [],
            abnormal_high_threshold: [],
            abnormal_low_threshold_dialy: [],
            abnormal_high_threshold_dialy: [],
            cgmDropdown: [{
                text: "Last 24 Hours",
                value: "0"
            }, {
                text: "Last 7 Days",
                value: "1"
            }, {
                text: "Last 30 Days",
                value: "2"
            }],
            bloodpressuretable: {
                columns: [
                    {
                        label: 'DATE',
                        field: 'date',
                        sort: 'asc',

                    },
                    {
                        label: 'SYSTOLIC',
                        field: 'systolic',
                        sort: 'asc',
                    },
                    {
                        label: 'DIASTOLIC',
                        field: 'diastolic',
                        sort: 'asc',

                    }
                ],
                rows: [

                    {
                        date: "09/14/2020",
                        systolic: "114",
                        diastolic: "93",
                        warning: "-",
                        danger: "-",
                    },
                    {
                        date: "09/15/2020",
                        systolic: "109",
                        diastolic: "73",
                        warning: "-",
                        danger: "46",
                    },
                    {
                        date: "09/16/2020",
                        systolic: "127",
                        diastolic: "84",
                        warning: "-",
                        danger: "-",
                    },
                    {
                        date: "09/17/2020",
                        systolic: "114",
                        diastolic: "93",
                        warning: "-",
                        danger: "-",
                    }

                ]
            },
            glucosemoniteringtable: {
                columns: [
                    {
                        label: 'DATE',
                        field: 'date',
                        sort: 'asc',

                    },
                    // {
                    //     label: 'Real',
                    //     field: 'systolic',
                    //     sort: 'asc',
                    // },
                    {
                        label: 'Abnormal',
                        field: 'diastolic',
                        sort: 'asc',

                    }
                ],
                rows: [

                    {
                        date: "09/14/2020",
                        // systolic: "114",
                        diastolic: "93",

                    },
                    {
                        date: "09/15/2020",
                        // systolic: "109",
                        diastolic: "73",

                    },
                    {
                        date: "09/16/2020",
                        // systolic: "127",
                        diastolic: "84",

                    },
                    {
                        date: "09/17/2020",
                        // systolic: "114",
                        diastolic: "93",

                    },
                    {
                        date: "09/18/2020",
                        // systolic: "128",
                        diastolic: "98",

                    },
                    {
                        date: "09/19/2020",
                        // systolic: "112",
                        diastolic: "92",

                    }

                ]
            },

            CGMabnormalGlucosedatatable: {
                columns: [
                    {
                        label: 'DATE',
                        field: 'x',
                        sort: 'asc',

                    },
                    {
                        label: 'Abnormal',
                        field: 'y',
                        sort: 'asc',
                    }
                ],
                rows: []
            },

            
            heartratemonitertable: {
                columns: [
                    {
                        label: 'DATE',
                        field: 'date',
                        sort: 'asc',

                    },
                    {
                        label: 'HIGH',
                        field: 'wakeup',
                        sort: 'asc',
                    },
                    {
                        label: 'LOW',
                        field: 'breakfast',
                        sort: 'asc',

                    }
                ],
                rows: [

                    {
                        date: "09/14/2020",
                        wakeup: "71",
                        breakfast: "121",

                    },
                    {
                        date: "09/15/2020",
                        wakeup: "61",
                        breakfast: "120",

                    },
                    {
                        date: "09/16/2020",
                        wakeup: "73",
                        breakfast: "112",

                    },
                    {
                        date: "09/17/2020",
                        wakeup: "74",
                        breakfast: "111",

                    }

                ]
            },
            dailyoximetrytable: {
                columns: [
                    {
                        label: 'DATE',
                        field: 'date',
                        sort: 'asc',

                    },
                    {
                        label: 'O2',
                        field: 'o2',
                        sort: 'asc',
                    },
                    {
                        label: 'NORMAL',
                        field: 'normal',
                        sort: 'asc',

                    },
                    {
                        label: 'LOW',
                        field: 'low',
                        sort: 'asc',
                    },
                    {
                        label: 'WARNING',
                        field: 'warning',
                        sort: 'asc',
                    },
                    {
                        label: 'DANGER',
                        field: 'danger',
                        sort: 'asc',
                    }
                ],
                rows: [

                    {
                        date: "09/14/2020",
                        o2: "14",
                        normal: "93",
                        low: "62",
                        warning: "62",
                        danger: ""
                    },
                    {
                        date: "09/15/2020",
                        o2: "14",
                        normal: "93",
                        low: "62",
                        warning: "62",
                        danger: "46"
                    },
                    {
                        date: "09/16/2020",
                        o2: "14",
                        normal: "93",
                        low: "62",
                        warning: "62",
                        danger: ""
                    },
                    {
                        date: "09/17/2020",
                        o2: "14",
                        normal: "93",
                        low: "62",
                        warning: "62",
                        danger: ""
                    }

                ]
            },
            ekgreadingtable: {
                columns: [
                    {
                        label: 'DATE',
                        field: 'date',
                        sort: 'asc',

                    },
                    {
                        label: 'ACTUAL',
                        field: 'actual',
                        sort: 'asc',
                    },
                    {
                        label: 'BRADYCARDIA',
                        field: 'bradycardia',
                        sort: 'asc',

                    },
                    {
                        label: 'TACHYCARDIA',
                        field: 'tachycardia',
                        sort: 'asc',
                    },
                    {
                        label: 'AF',
                        field: 'af',
                        sort: 'asc',
                    }
                ],
                rows: [

                    {
                        date: "09/14/2020",
                        actual: "114",
                        bradycardia: "93",
                        tachycardia: "62",
                        af: "",
                    },
                    {
                        date: "09/14/2020",
                        actual: "114",
                        bradycardia: "93",
                        tachycardia: "62",
                        af: "46",
                    },
                    {
                        date: "09/14/2020",
                        actual: "114",
                        bradycardia: "93",
                        tachycardia: "62",
                        af: "",
                    },
                    {
                        date: "09/14/2020",
                        actual: "114",
                        bradycardia: "93",
                        tachycardia: "62",
                        af: "",
                    },
                    {
                        date: "09/14/2020",
                        actual: "114",
                        bradycardia: "93",
                        tachycardia: "62",
                        af: "46",
                    }

                ]
            },
            datatable: {
                columns: [
                    {
                        label: 'DATE',
                        field: 'date',
                        sort: 'asc',

                    },
                    {
                        label: 'LDL',
                        field: 'ldl',
                        sort: 'asc',
                    },
                    {
                        label: 'HDL',
                        field: 'hdl',
                        sort: 'asc',

                    },
                    {
                        label: 'CHOLESTEROL',
                        field: 'cholesterol',
                        sort: 'asc',
                    },
                    {
                        label: 'TRIGLYC',
                        field: 'triglyc',
                        sort: 'asc',
                    }
                ],
                rows: [
                    {
                        date: "9/14/2020",
                        ldl: "161",
                        hdl: "35",
                        cholesterol: "241",
                        triglyc: "203",
                    },
                    {
                        date: "9/15/2020",
                        ldl: "158",
                        hdl: "36",
                        cholesterol: "230",
                        triglyc: "199",
                    },
                    {
                        date: "9/16/2020",
                        ldl: "158",
                        hdl: "36",
                        cholesterol: "230",
                        triglyc: "199",
                    },
                    {
                        date: "9/17/2020",
                        ldl: "150",
                        hdl: "34",
                        cholesterol: "218",
                        triglyc: "195",
                    },
                    {
                        date: "9/18/2020",
                        ldl: "158",
                        hdl: "36",
                        cholesterol: "230",
                        triglyc: "199",
                    },
                    {
                        date: "9/19/2020",
                        ldl: "158",
                        hdl: "36",
                        cholesterol: "230",
                        triglyc: "199",
                    }
                ]
            },
            sleepstagestable: {
                columns: [
                    {
                        label: 'DATE',
                        field: 'date',
                        sort: 'asc',

                    },
                    {
                        label: 'AWAKE 10PM',
                        field: 'awake10pm',
                        sort: 'asc',
                    },
                    {
                        label: 'REM 10PM',
                        field: 'rem10pm',
                        sort: 'asc',

                    },
                    {
                        label: 'LIGHT SLEEP 10PM',
                        field: 'lightsleep10pm',
                        sort: 'asc',
                    },
                    {
                        label: 'DEEP SLEEP 10PM',
                        field: 'deepsleep10pm',
                        sort: 'asc',
                    },
                    {
                        label: 'LIGHT SLEEP 2AM',
                        field: 'lightsleep2am',
                        sort: 'asc',

                    },
                    {
                        label: 'DEEP SLEEP 2AM',
                        field: 'deepsleep2am',
                        sort: 'asc',
                    },
                    {
                        label: 'LIGHT SLEEP 4AM',
                        field: 'lightsleep4am',
                        sort: 'asc',

                    },
                    {
                        label: 'REM 4AM',
                        field: 'rem4am',
                        sort: 'asc',
                    },
                    {
                        label: 'DLIGHT SLEEP 6AM',
                        field: 'lightsleep6am',
                        sort: 'asc',
                    }
                ],
                rows: [
                    {
                        date: "09/14/2020",
                        awake10pm: "114",
                        rem10pm: "93",
                        lightsleep10pm: "62",
                        deepsleep10pm: "84",
                        lightsleep2am: "64",
                        deepsleep2am: "104",
                        lightsleep4am: "93",
                        rem4am: "93",
                        lightsleep6am: "10",
                    },
                    {
                        date: "09/15/2020",
                        awake10pm: "114",
                        rem10pm: "93",
                        lightsleep10pm: "62",
                        deepsleep10pm: "84",
                        lightsleep2am: "64",
                        deepsleep2am: "104",
                        lightsleep4am: "93",
                        rem4am: "93",
                        lightsleep6am: "10",
                    },
                    {
                        date: "09/16/2020",
                        awake10pm: "114",
                        rem10pm: "93",
                        lightsleep10pm: "62",
                        deepsleep10pm: "84",
                        lightsleep2am: "64",
                        deepsleep2am: "104",
                        lightsleep4am: "93",
                        rem4am: "93",
                        lightsleep6am: "10",
                    },
                    {
                        date: "09/17/2020",
                        awake10pm: "114",
                        rem10pm: "93",
                        lightsleep10pm: "62",
                        deepsleep10pm: "84",
                        lightsleep2am: "64",
                        deepsleep2am: "104",
                        lightsleep4am: "93",
                        rem4am: "93",
                        lightsleep6am: "10",
                    },
                    {
                        date: "09/18/2020",
                        awake10pm: "114",
                        rem10pm: "93",
                        lightsleep10pm: "62",
                        deepsleep10pm: "84",
                        lightsleep2am: "64",
                        deepsleep2am: "104",
                        lightsleep4am: "93",
                        rem4am: "93",
                        lightsleep6am: "10",
                    }



                ]
            },
            layout: {
                title: '',
                xaxis: {
                    autorange: true,
                    rangeselector: {
                        buttons: [
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
                            { step: 'all' }
                        ]
                    },
                    rangeslider: { range: ['1999-02-17', moment(new Date()).format("YYYY-MM-DD")] },
                    type: 'date'
                },
                yaxis: {
                    autorange: true,
                    range: [0, 500],
                    type: 'linear'
                },

            },
            diastolic: {
                x: ["2020-09-01", "2020-09-05", "2020-09-08", "2020-09-12", "2020-09-18", "2020-09-22", "2020-09-25", "2020-09-30"],
                y: [80, 90, 80, 120, 120, 105, 80, 50],
                mode: 'lines',
                name: 'Diastolic',
                line: {
                    dash: 'solid',
                    width: 2
                },
                marker: {
                    color: '#DB1962',
                    width: 1
                }
            },
            Glomerulartable: {
                columns: [
                    {
                        label: 'DATE',
                        field: 'date',
                        sort: 'asc',

                    },
                    {
                        label: 'GFR',
                        field: 'gfr',
                        sort: 'asc',
                    },
                    {
                        label: 'GFR WARNING -STAGE 3',
                        field: 'gfrwarningstage3',
                        sort: 'asc',

                    },
                    {
                        label: 'GFR DANGER - STAGE 5 CKD',
                        field: 'gfrdangerstage5ckd',
                        sort: 'asc',
                    },
                    {
                        label: 'GFR WARNING',
                        field: 'gfrwarning',
                        sort: 'asc',
                    },
                    {
                        label: 'GFR DANGER',
                        field: 'gfrdanger',
                        sort: 'asc',

                    },
                    {
                        label: 'MILDLY LOW',
                        field: 'mildlylow',
                        sort: 'asc',
                    },
                    {
                        label: 'ML FLAG',
                        field: 'mlflag',
                        sort: 'asc',

                    },
                    {
                        label: 'SEVERE FLAG',
                        field: 'severeflag',
                        sort: 'asc',
                    },
                    {
                        label: 'GFR AA',
                        field: 'gfraa',
                        sort: 'asc',
                    }
                ],
                rows: [
                    {
                        date: "09/14/2020",
                        gfr: "114",
                        gfrwarningstage3: "93",
                        gfrdangerstage5ckd: "62",
                        gfrwarning: "48",
                        gfrdanger: "24",
                        mildlylow: "90",
                        mlflag: "73",
                        severeflag: "21",
                        gfraa: "23"
                    },
                    {
                        date: "09/15/2020",
                        gfr: "114",
                        gfrwarningstage3: "93",
                        gfrdangerstage5ckd: "62",
                        gfrwarning: "48",
                        gfrdanger: "24",
                        mildlylow: "90",
                        mlflag: "73",
                        severeflag: "21",
                        gfraa: "23"
                    },
                    {
                        date: "09/16/2020",
                        gfr: "114",
                        gfrwarningstage3: "93",
                        gfrdangerstage5ckd: "62",
                        gfrwarning: "48",
                        gfrdanger: "24",
                        mildlylow: "90",
                        mlflag: "73",
                        severeflag: "21",
                        gfraa: "23"
                    },
                    {
                        date: "09/17/2020",
                        gfr: "114",
                        gfrwarningstage3: "93",
                        gfrdangerstage5ckd: "62",
                        gfrwarning: "48",
                        gfrdanger: "24",
                        mildlylow: "90",
                        mlflag: "73",
                        severeflag: "21",
                        gfraa: "23"
                    },
                    {
                        date: "09/18/2020",
                        gfr: "114",
                        gfrwarningstage3: "93",
                        gfrdangerstage5ckd: "62",
                        gfrwarning: "48",
                        gfrdanger: "24",
                        mildlylow: "90",
                        mlflag: "73",
                        severeflag: "21",
                        gfraa: "23"
                    },
                    {
                        date: "09/19/2020",
                        gfr: "114",
                        gfrwarningstage3: "93",
                        gfrdangerstage5ckd: "62",
                        gfrwarning: "48",
                        gfrdanger: "24",
                        mildlylow: "90",
                        mlflag: "73",
                        severeflag: "21",
                        gfraa: "23"
                    }
                ],
            },
            Underweightbmi: {
                columns: [
                    {
                        label: 'DATE',
                        field: 'date',
                        sort: 'asc',

                    },
                    {
                        label: 'BMI',
                        field: 'bmi',
                        sort: 'asc',
                    },
                    {
                        label: 'UNDER LIMIT',
                        field: 'underlimit',
                        sort: 'asc',

                    },
                    {
                        label: 'UNDER FLAG',
                        field: 'underflag',
                        sort: 'asc',
                    }
                ],
                rows: [
                    {
                        date: "09/14/2020",
                        bmi: "114",
                        underlimit: "93",
                        underflag: "62"
                    },
                    {
                        date: "09/15/2020",
                        bmi: "114",
                        underlimit: "93",
                        underflag: "62"
                    },
                    {
                        date: "09/16/2020",
                        bmi: "114",
                        underlimit: "93",
                        underflag: "62"
                    },
                    {
                        date: "09/17/2020",
                        bmi: "114",
                        underlimit: "93",
                        underflag: "62"
                    },
                    {
                        date: "09/18/2020",
                        bmi: "114",
                        underlimit: "93",
                        underflag: "62"
                    },
                    {
                        date: "09/19/2020",
                        bmi: "114",
                        underlimit: "93",
                        underflag: "62"
                    }
                ]
            },
        }
    }
    handleCGMdayChange(day) {
        if (this.state.hourlyTab === "activeClass") {
            let dataForHourlyCGMReal; let dataForHourlyCGMPrediction;
            if (day[0] === "0") {
                dataForHourlyCGMReal = {
                    size: 5000,
                    sort: [{ date: { order: "asc" } }],
                    query: {
                        bool: {
                            must: { match: { patient_id: 188 } },
                            filter: {
                                range: { date: { gte: "2019-09-15T13:00:00", lte: "2019-09-15T23:59:00" } }
                            }
                        }
                    }
                };
                dataForHourlyCGMPrediction = {
                    size: 5000,
                    sort: [{ date: { order: "asc" } }],
                    query: {
                        bool: {
                            must: { match: { patient_id: 188 } },
                            filter: {
                                range: {
                                    date: { gte: "2019-09-16T00:01:00", lte: "2019-09-16T12:59:59" }
                                }
                            }
                        }
                    }
                }
            }
            if (day[0] === "1") {
                dataForHourlyCGMReal = {
                    size: 5000,
                    sort: [{ date: { order: "asc" } }],
                    query: {
                        bool: {
                            must: { match: { patient_id: 188 } },
                            filter: {
                                range: { date: { gte: "2019-09-12T00:00:00", lte: "2019-09-15T04:30:00" } }
                            }
                        }
                    }
                };
                dataForHourlyCGMPrediction = {
                    size: 5000,
                    sort: [{ date: { order: "asc" } }],
                    query: {
                        bool: {
                            must: { match: { patient_id: 188 } },
                            filter: {
                                range: {
                                    date: { gte: "2019-09-15T04:31:00", lte: "2019-09-18T23:59:50" }
                                }
                            }
                        }
                    }
                }
            }
            if (day[0] === "2") {
                dataForHourlyCGMReal = {
                    size: 5000,
                    sort: [{ date: { order: "asc" } }],
                    query: {
                        bool: {
                            must: { match: { patient_id: 188 } },
                            filter: {
                                range: { date: { gte: "2019-09-01T00:00:00", lte: "2019-09-15T15:00:00" } }
                            }
                        }
                    }
                };
                dataForHourlyCGMPrediction = {
                    size: 5000,
                    sort: [{ date: { order: "asc" } }],
                    query: {
                        bool: {
                            must: { match: { patient_id: 188 } },
                            filter: {
                                range: {
                                    date: { gte: "2019-09-15T15:30:00", lte: "2019-09-30T15:00:00" }
                                }
                            }
                        }
                    }
                }
            }
            this.hourlyCGMdataCalculations(dataForHourlyCGMReal, dataForHourlyCGMPrediction);
        } else {
            let dataForDialyCGMReal; let dataForDialyCGMPrediction;
            if (day[0] === "0") {
                dataForDialyCGMReal = {
                    size: 5000,
                    sort: [{ date: { order: "asc" } }],
                    query: {
                        bool: {
                            must: { match: { patient_id: 188 } },
                            filter: {
                                range: { date: { gte: "2019-09-13T00:01:00", lte: "2019-09-15T04:30:00" } }
                            }
                        }
                    }
                };
                dataForDialyCGMPrediction = {
                    size: 5000,
                    sort: [{ date: { order: "asc" } }],
                    query: {
                        bool: {
                            must: { match: { patient_id: 188 } },
                            filter: {
                                range: {
                                    date: { gte: "2019-09-15T09:30:00", lte: "2019-09-16T23:59:59" }
                                }
                            }
                        }
                    }
                }
            }
            if (day[0] === "1") {
                dataForDialyCGMReal = {
                    size: 5000,
                    sort: [{ date: { order: "asc" } }],
                    query: {
                        bool: {
                            must: { match: { patient_id: 188 } },
                            filter: {
                                range: { date: { gte: "2019-09-11T00:00:00", lte: "2019-09-15T04:30:00" } }
                            }
                        }
                    }
                };
                dataForDialyCGMPrediction = {
                    size: 5000,
                    sort: [{ date: { order: "asc" } }],
                    query: {
                        bool: {
                            must: { match: { patient_id: 188 } },
                            filter: { range: { date: { gte: "2019-09-15T09:30:00", lte: "2019-09-18T15:00:00" } } }
                        }
                    }
                }
            }
            if (day[0] === "2") {
                dataForDialyCGMReal = {
                    size: 5000,
                    sort: [{ date: { order: "asc" } }],
                    query: {
                        bool: {
                            must: { match: { patient_id: 188 } },
                            filter: {
                                range: { date: { gte: "2019-09-10T00:00:00", lte: "2019-09-15T04:30:00" } }
                            }
                        }
                    }
                };
                dataForDialyCGMPrediction = {
                    size: 5000,
                    sort: [{ date: { order: "asc" } }],
                    query: {
                        bool: {
                            must: { match: { patient_id: 188 } },
                            filter: {
                                range: {
                                    date: { gte: "2019-09-15T09:30:00", lte: "2019-10-10T23:59:00" }
                                }
                            }
                        }
                    }
                }
            }
            this.dialyCGMdataCalculations(dataForDialyCGMReal, dataForDialyCGMPrediction);
        }
    }
    componentDidMount() {
        let dataForHourlyCGMReal = {
            size: 5000,
            sort: [
                {
                    date: { order: "asc" }
                }
            ],
            query: {
                bool: {
                    must: {
                        match: {
                            patient_id: 188
                        }
                    },
                    filter: {
                        range: {
                            date: {
                                gte: "2019-09-10T00:00:00",
                                lte: "2019-09-17T04:30:00"
                            }
                        }
                    }
                }
            }
        };
        let dataForHourlyCGMPrediction = {
            size: 5000,
            sort: [
                {
                    date: { order: "asc" }
                }
            ],
            query: {
                bool: {
                    must: {
                        match: {
                            patient_id: 188
                        }
                    },
                    filter: {
                        range: {
                            date: {
                                gte: "2019-09-15T09:30:00",
                                lte: "2019-09-17T15:00:00"
                            }
                        }
                    }
                }
            }
        }
        this.hourlyCGMdataCalculations(dataForHourlyCGMReal, dataForHourlyCGMPrediction);
        let dataForDialyCGMReal = {
            size: 5000,
            sort: [
                {
                    date: { order: "asc" }
                }
            ],
            query: {
                bool: {
                    must: {
                        match: {
                            patient_id: 188
                        }
                    },
                    filter: {
                        range: {
                            date: {
                                gte: "2019-09-10T00:00:00",
                                lte: "2019-09-17T04:30:00"
                            }
                        }
                    }
                }
            }
        };
        let dataForDialyCGMPrediction = {
            size: 5000,
            sort: [
                {
                    date: { order: "asc" }
                }
            ],
            query: {
                bool: {
                    must: {
                        match: {
                            patient_id: 188
                        }
                    },
                    filter: {
                        range: {
                            date: {
                                gte: "2019-09-15T09:30:00",
                                lte: "2019-09-21T15:00:00"
                            }
                        }
                    }
                }
            }
        }
        this.dialyCGMdataCalculations(dataForDialyCGMReal, dataForDialyCGMPrediction);
    }
    hourlyCGMdataCalculations = (dataForHourlyCGMReal, dataForHourlyCGMPrediction) => {
        let abnormal_low_threshold_real = []; let abnormal_high_threshold_real = [];
        let abnormal_low_threshold_predicted = []; let abnormal_high_threshold_predicted = []; let abnormalGlucosedata1 = []; let abnormalGlucosedatatable1 = [];
        let lastObj; let lastdate;

        axios({
            method: 'POST',
            url: `/api/rpmhourlycgmreal`,
            data: dataForHourlyCGMReal,
        })
            .then((response) => {
                this.setState({
                    cgmHourlyrealdataresponse: response.data.json.hits.hits
                }, () => {
                    let cgmRealdateValues = [];
                    let cgm_realvalue = [];
                    let cgmrealgraphdata = this.state.cgmHourlyrealdataresponse && this.state.cgmHourlyrealdataresponse.map((item) => {
                        return (
                            item._source
                        )
                    })
                    this.setState({
                        cgmrealGraphData: cgmrealgraphdata
                    }, () => {
                        this.state.cgmrealGraphData.forEach((ele) => {
                            cgmRealdateValues.push(moment(ele.date).format('YYYY-MM-DD HH:mm:ss'));
                            if (ele.abnormal === true) {
                                let abnormalGlucosevalue1 = { x: Date.parse(ele.date), y: ele.gulcose_real };
                                abnormalGlucosedata1.push(abnormalGlucosevalue1);
                                let abnormalGlucosedatatablevalue1 = { x: moment(ele.date).format("MM-DD-YYYY"), y: Math.round(ele.gulcose_real) };
                                abnormalGlucosedatatable1.push(abnormalGlucosedatatablevalue1);


                                
                            }
                            let cgm_real_seriesdata = { x: Date.parse(ele.date), y: ele.gulcose_real };
                            let abnormal_low_threshold = { x: Date.parse(ele.date), y: ele.abnormal_low_blood_sugar_threshold };
                            let abnormal_high_threshold = { x: Date.parse(ele.date), y: ele.abnormal_high_blood_sugar_threshold };
                            cgm_realvalue.push(cgm_real_seriesdata);
                            abnormal_low_threshold_real.push(abnormal_low_threshold);
                            abnormal_high_threshold_real.push(abnormal_high_threshold);
                            lastdate = cgmRealdateValues[cgmRealdateValues.length - 1];
                            lastObj = cgm_realvalue[cgm_realvalue.length - 1];
                        });
                        this.setState({
                            realData: cgm_realvalue
                        })
                    })
                });
            })
            .then(() => {
                axios({
                    method: 'POST',
                    url: `/api/rpmhourlycgm`,
                    data: dataForHourlyCGMPrediction,
                })
                    .then((response) => {
                        this.setState({
                            cgmresponse: response.data.json.hits.hits,
                        }, () => {
                            let dateValues = [];
                            let graphdata = this.state.cgmresponse && this.state.cgmresponse.map((item) => {
                                return (
                                    item._source
                                )
                            })
                            this.setState({
                                cgmGraphData: graphdata
                            }, () => {
                                let predictedData = []; let finalPredictedData = []; let abnormalGlucosedata2 = [];  let abnormalGlucosedatatable2 = [];
                                this.state.cgmGraphData.forEach((ele) => {
                                    dateValues.push(moment(ele.date).format('YYYY-MM-DD HH:mm:ss'));
                                    if (ele.abnormal === true) {
                                        let abnormalGlucosevalue2 = { x: Date.parse(ele.date), y: ele.gulcosevalue_predection };
                                        abnormalGlucosedata2.push(abnormalGlucosevalue2);

                                        let abnormalGlucosedatatablevalue2 = { x: moment(ele.date).format("MM-DD-YYYY"), y: Math.round(ele.gulcosevalue_predection) };
                                        abnormalGlucosedatatable2.push(abnormalGlucosedatatablevalue2);
                                        
                                    }
                                    // if (moment(ele.date).format('YYYY-MM-DD HH:mm:ss') > lastdate) {
                                    let seriesdata = { x: Date.parse(ele.date), y: ele.gulcosevalue_predection };
                                    predictedData.push(seriesdata);
                                    let abnormal_low_threshold = { x: Date.parse(ele.date), y: ele.abnormal_low_blood_sugar_threshold };
                                    let abnormal_high_threshold = { x: Date.parse(ele.date), y: ele.abnormal_high_blood_sugar_threshold };
                                    abnormal_low_threshold_predicted.push(abnormal_low_threshold);
                                    abnormal_high_threshold_predicted.push(abnormal_high_threshold);
                                    finalPredictedData = [lastObj, ...predictedData];
                                    // }
                                });
                                this.setState({
                                    predictedData: finalPredictedData,
                                    abnormalGlucosedata: abnormalGlucosedata1.concat(abnormalGlucosedata2),
                                    abnormalGlucosedatatable: abnormalGlucosedatatable1.concat(abnormalGlucosedatatable2),
                                    abnormal_low_threshold: abnormal_low_threshold_real.concat(abnormal_low_threshold_predicted),
                                    abnormal_high_threshold: abnormal_high_threshold_real.concat(abnormal_high_threshold_predicted),
                                    isLoaded: false
                                }, () => {
                                    this.setState({
                                        CGMabnormalGlucosedatatable: {
                                            columns: [
                                                {
                                                    label: 'DATE',
                                                    field: 'x',
                                                    sort: 'asc',
                                        
                                                },
                                                {
                                                    label: 'Abnormal',
                                                    field: 'y',
                                                    sort: 'asc',
                                                }
                                            ],
                                            rows: this.state.abnormalGlucosedatatable
                                        },
                                    });
                                    console.log(abnormal_low_threshold_real, "abnormal_low_threshold")
                                })
                            })
                        });
                    })
            })
            .catch(function (response) { console.log(response); });
    }
    dialyCGMdataCalculations = (dataForDialyCGMReal, dataForDialyCGMPrediction) => {
        let abnormal_low_threshold_real = []; let abnormal_high_threshold_real = [];
        let abnormal_low_threshold_predicted = []; let abnormal_high_threshold_predicted = []; let abnormalGlucosedata1 = [];
        let lastCgmMeanValue; let lastCgmMaxValue; let lastCgmMinValue; let lastdate; let objForRealData; let objForPrediction;

        axios({
            method: 'POST',
            url: `/api/rpmdialycgmreal`,
            data: dataForDialyCGMReal,
        })
            .then((response) => {
                this.setState({
                    cgmDialyrealdataresponse: response.data.json.hits.hits
                }, () => {
                    let cgmRealdateValues = [];
                    let cgm_meanvalue = []; let cgm_maxValues = []; let cgm_minValues = [];
                    let cgmrealgraphdata = this.state.cgmDialyrealdataresponse && this.state.cgmDialyrealdataresponse.map((item) => {
                        return (
                            item._source
                        )
                    })
                    this.setState({
                        cgmrealGraphDialyData: cgmrealgraphdata
                    }, () => {
                        this.state.cgmrealGraphDialyData.forEach((ele) => {
                            cgmRealdateValues.push(moment(ele.date).format('YYYY-MM-DD HH:mm:ss'));
                            // if(ele.abnormal === true){
                            //     let abnormalGlucosevalue1 = { x:Date.parse(ele.date), y: ele.gulcose_real};
                            //     abnormalGlucosedata1.push(abnormalGlucosevalue1);
                            // }
                            let cgm_real_mean = { x: Date.parse(ele.date), y: ele.mean };
                            let cgm_real_max = { x: Date.parse(ele.date), y: ele.max };
                            let cgm_real_min = { x: Date.parse(ele.date), y: ele.min };
                            let abnormal_low_threshold = { x: Date.parse(ele.date), y: ele.abnormal_low_blood_sugar_threshold };
                            let abnormal_high_threshold = { x: Date.parse(ele.date), y: ele.abnormal_high_blood_sugar_threshold };
                            cgm_meanvalue.push(cgm_real_mean);
                            cgm_maxValues.push(cgm_real_max);
                            cgm_minValues.push(cgm_real_min);
                            abnormal_low_threshold_real.push(abnormal_low_threshold);
                            abnormal_high_threshold_real.push(abnormal_high_threshold);
                            lastdate = cgmRealdateValues[cgmRealdateValues.length - 1];
                            lastCgmMeanValue = cgm_meanvalue[cgm_meanvalue.length - 1];
                            lastCgmMaxValue = cgm_maxValues[cgm_maxValues.length - 1];
                            lastCgmMinValue = cgm_minValues[cgm_minValues.length - 1];
                        });
                        this.setState({
                            cgmrealMeanData: cgm_meanvalue,
                            cgmrealMaxData: cgm_maxValues,
                            cgmrealMinData: cgm_minValues,

                        })
                    })
                });
            })
            .then(() => {
                axios({
                    method: 'POST',
                    url: `/api/rpmdialycgm`,
                    data: dataForDialyCGMPrediction,
                })
                    .then((response) => {
                        this.setState({
                            cgmresponseDialy: response.data.json.hits.hits,
                        }, () => {
                            let dateValues = [];
                            let graphdata = this.state.cgmresponseDialy && this.state.cgmresponseDialy.map((item) => {
                                return (
                                    item._source
                                )
                            })
                            this.setState({
                                cgmDialyGraphData: graphdata
                            }, () => {
                                let predictedMeanData = []; let predictedMaxData = []; let predictedMinData = [];
                                let finalPredictedMeanData = []; let finalPredictedMaxData = []; let finalPredictedMinData = []; let abnormalGlucosedata2 = [];
                                this.state.cgmDialyGraphData.forEach((ele) => {
                                    dateValues.push(moment(ele.date).format('YYYY-MM-DD HH:mm:ss'));
                                    // if(ele.abnormal === true){
                                    //     let abnormalGlucosevalue2 = { x:Date.parse(ele.date), y: ele.gulcosevalue_predection };
                                    //     abnormalGlucosedata2.push(abnormalGlucosevalue2);
                                    //     console.log(ele,"ele")
                                    // }
                                    // if (moment(ele.date).format('YYYY-MM-DD HH:mm:ss') > lastdate) {
                                    let predictedMeandata = { x: Date.parse(ele.date), y: ele.mean };
                                    predictedMeanData.push(predictedMeandata);
                                    let predictedMaxdata = { x: Date.parse(ele.date), y: ele.max };
                                    predictedMaxData.push(predictedMaxdata);
                                    let predictedMindata = { x: Date.parse(ele.date), y: ele.min };
                                    predictedMinData.push(predictedMindata);
                                    let abnormal_low_threshold = { x: Date.parse(ele.date), y: ele.abnormal_low_blood_sugar_threshold };
                                    let abnormal_high_threshold = { x: Date.parse(ele.date), y: ele.abnormal_high_blood_sugar_threshold };
                                    abnormal_low_threshold_predicted.push(abnormal_low_threshold);
                                    abnormal_high_threshold_predicted.push(abnormal_high_threshold);
                                    finalPredictedMeanData = [lastCgmMeanValue, ...predictedMeanData];
                                    finalPredictedMaxData = [lastCgmMaxValue, ...predictedMaxData];
                                    finalPredictedMinData = [lastCgmMinValue, ...predictedMinData];
                                    // }
                                });
                                this.setState({
                                    predictedDialyMeanData: finalPredictedMeanData,
                                    predictedDialyMaxData: finalPredictedMaxData,
                                    predictedDialyMinData: finalPredictedMinData,
                                    // abnormalGlucosedata: abnormalGlucosedata1.concat(abnormalGlucosedata2),
                                    abnormal_low_threshold_dialy: abnormal_low_threshold_real.concat(abnormal_low_threshold_predicted),
                                    abnormal_high_threshold_dialy: abnormal_high_threshold_real.concat(abnormal_high_threshold_predicted),
                                    isLoaded: false,
                                }, () => {
                                    // console.log(abnormal_low_threshold_real,"abnormal_low_threshold")
                                })
                            })
                        });
                    })
            })
            .catch(function (response) { console.log(response); });
    }
    detailsbutton(el) {
        this.setState({
            remotemoniteringdetails: el
        });
    }

    componentDidUpdate() {
        localStorage.setItem('remotemoniteringdetails', this.state.remotemoniteringdetails)
    }
    showHourlyGraph = () => {
        this.setState({
            hourlyTab: "activeClass",
            dialyTab: ""
        })
    }
    showDialyGraph = () => {
        this.setState({
            hourlyTab: "",
            dialyTab: "activeClass"
        })
    }
    render() {
        console.log("abnormalGlucosedata", this.state.abnormalGlucosedata, this.state.abnormalGlucosedatatable);
        const bloodsugar = {
            chart: {
                height: 220,
                type: "line",
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
            colors: ['#DB1962', '#2A2D71'],
            yAxis: {
                title: {
                    text: 'Blood Pressure Values'
                }
            },
            plotOptions: {
                series: {
                    lineWidth: 1,

                }
            },
            xAxis: {
                categories: ["09/01/20", "09/02/20", "09/03/20", "09/04/20", "09/05/20", "09/06/20", "09/07/20", "09/08/20", "09/09/20", "09/10/20"]
            },

            series: [{
                name: 'Systolic',
                data: [90, 110, 85, 130, 145, 150, 90, 70]
            }, {
                name: 'Diastolic',
                data: [80, 90, 80, 120, 120, 105, 80, 50]
            }]

        };
        const diabeticCGMHourlyData = {
            chart: {
                height: 270,
                zoomType: 'x',
                style: {
                    fontFamily: 'Open Sans',
                    fontSize: "10px"
                }
            },
            title: {
                text: ''
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    lineWidth: 1,
                    animation: {
                        duration: 3000
                    }
                }
            },
            yAxis: {
                title: {
                    text: 'Glucose'
                }
            },
            xAxis: {
                type: 'datetime',
            },
            series: [
                {
                    name: "Real",
                    data: this.state.realData,
                    color: '#00897b',
                    lineWidth: 2,
                },
                {
                    name: "Prediction",
                    data: this.state.predictedData,
                    color: '#0288d1',
                    lineWidth: 1,
                },
                {
                    name: "Abnormal Glucose Value",
                    data: this.state.abnormalGlucosedata,
                    color: '#FFFFFF',
                    lineWidth: 0,
                    marker: {
                        enabled: true,
                        symbol: 'circle',
                        lineColor: '#d32f2f',
                        fillColor: '#d32f2f'
                    },
                },
                {
                    name: "Abnormal Low Threshold",
                    data: this.state.abnormal_low_threshold,
                    color: '#e8b78e',
                    lineWidth: 1,
                    marker: {
                        enabled: false
                    },
                },
                {
                    name: "Abnormal High Threshold",
                    data: this.state.abnormal_high_threshold,
                    color: '#e8b78e',
                    lineWidth: 1,
                    marker: {
                        enabled: false
                    },
                },
            ]
        };
        const diabeticCGMDialyData = {
            chart: {
                height: 270,
                zoomType: 'x',
                style: {
                    fontFamily: 'Open Sans',
                    fontSize: "10px"
                }
            },
            title: {
                text: ''
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    lineWidth: 1,
                    animation: {
                        duration: 3000
                    }
                }
            },
            yAxis: {
                title: {
                    text: 'Glucose'
                }
            },
            xAxis: {
                type: 'datetime',
            },
            series: [
                {
                    name: "Real",
                    data: this.state.cgmrealMeanData,
                    color: '#00897b',
                    lineWidth: 2,
                },
                {
                    name: "Max Real",
                    data: this.state.cgmrealMaxData,
                    color: 'red',
                    lineWidth: 2,

                },
                {
                    name: "Min Real",
                    data: this.state.cgmrealMinData,
                    color: '#db1962',
                    lineWidth: 2,

                },
                {
                    name: "Prediction",
                    data: this.state.predictedDialyMeanData,
                    color: '#0288d1',
                    lineWidth: 1,
                    dashStyle: 'longdash'
                },
                {
                    name: "Max Prediction",
                    data: this.state.predictedDialyMaxData,
                    color: 'red',
                    lineWidth: 1,
                    dashStyle: 'longdash'

                },
                {
                    name: "Min Prediction",
                    data: this.state.predictedDialyMinData,
                    color: '#db1960',
                    lineWidth: 1,
                    dashStyle: 'longdash'

                },
                {
                    name: "Abnormal Low Threshold",
                    data: this.state.abnormal_low_threshold_dialy,
                    color: '#e8b78e',
                    lineWidth: 1,
                    marker: {
                        enabled: false,
                    },
                },
                {
                    name: "Abnormal High Threshold",
                    data: this.state.abnormal_high_threshold_dialy,
                    color: '#e8b78e',
                    lineWidth: 1,
                    marker: {
                        enabled: false
                    },
                },
            ]
        };
        const heartratemonitering = {
            chart: {
                height: 220,
                type: 'line',
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
            xAxis: {
                categories: ["2020-09-01", "2020-09-02", "2020-09-03", "2020-09-04", "2020-09-05", "2020-09-06", "2020-09-07", "2020-09-08", "2020-09-09", "2020-09-10"]
            },
            plotOptions: {
                series: {
                    lineWidth: 1,

                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Glucose Levels'
                }
            },
            colors: ['#2A2D71', '#D60000'],
            series: [{
                name: 'High',
                data: [10, 20, 10, 15, 10, 30, 5, 10, 28, 10]
            }, {
                name: 'Low',
                data: [20, 30, 20, 15, 10, 40, 5, 20, 38, 20]
            }]
        };
        const oximeteryreading = {
            chart: {
                height: 220,
                type: "line",
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
            colors: ['#2A2D71', '#FFCE00', '#DB1962'],
            yAxis: {
                title: {
                    text: 'Blood Pressure Values'
                }
            },
            xAxis: {
                categories: ["09/01/20", "09/02/20", "09/03/20", "09/04/20", "09/05/20", "09/06/20", "09/07/20", "09/08/20"]
            },
            plotOptions: {
                series: {
                    lineWidth: 1,

                }
            },

            series: [{
                name: 'O2 Saturation',
                data: [90, 110, 85, 130, 145, 150, 90, 70]
            }, {
                name: 'Warning O2',
                data: [100, 120, 95, 140, 155, 160, 100, 80]
            }, {
                name: 'Danger O2',
                data: [100, 130, 105, 150, 165, 170, 110, 90]
            }]
        };
        const ekgreading = {
            chart: {
                height: 220,
                type: 'spline',
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
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct']
            },
            colors: ['#2A2D71', '#FF9D00', '#2A2D71', '#2A2D71', '#2A2D71', '#DB1962'],
            plotOptions: {
                series: {
                    lineWidth: 1,

                }
            },
            series: [{
                name: 'Actual BPM',
                marker: {
                    symbol: 'square'
                },
                data: [90, 110, 85, 130, 145, 150, 90, 70]

            }, {
                name: 'Bradycardia < 60BPM',
                marker: {
                    symbol: 'diamond'
                },
                data: [110, 130, 105, 150, 165, 170, 110, 90]
            }, {
                name: 'Tachycardia > 100BPM',
                marker: {
                    symbol: 'circle'
                },
                data: [116, 136, 111, 156, 171, 176, 116, 96]
            }, {
                name: 'Possible AF Detected',
                marker: {
                    symbol: 'triangle'
                },
                data: [126, 146, 121, 166, 181, 186, 126, 106]
            }, {
                name: 'Unclassifed Review Rhythm Strip',
                data: [132, 106, 111, 86, 111, 182, 116, 16]
            }, {
                name: 'Unreadable Too Much Interference',
                data: [136, 156, 131, 176, 191, 156, 116, 106],
            }]
        }
        const gfr = {
            chart: {
                height: 270,
                type: 'spline',
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
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct']
            },
            plotOptions: {
                series: {
                    lineWidth: 1,

                }
            },
            colors: ['#2A2D71', '#FF9D00', '#2A2D71', '#2A2D71', '#2A2D71', '#DB1962', '#FF72A7', '#F00'],
            series: [{
                name: 'Non African-American GFR',
                marker: {
                    symbol: 'square'
                },
                data: [90, 110, 85, 130, 145, 150, 90, 70]

            }, {
                name: 'Moderate to Severe CKD (GFR>15, <60)',
                marker: {
                    symbol: 'diamond'
                },
                data: [110, 130, 105, 150, 165, 170, 110, 90]
            }, {
                name: 'Non African-American Mildly Low Flag',
                marker: {
                    symbol: 'circle'
                },
                data: [116, 136, 111, 156, 171, 176, 116, 96]
            }, {
                name: 'Non African-American Modern to Severe Flag',
                marker: {
                    symbol: 'triangle'
                },
                data: [126, 146, 121, 166, 181, 186, 126, 106]
            }, {
                name: 'Mildly Low (>=60, <90)',
                data: [132, 106, 111, 86, 111, 182, 116, 16]
            }, {
                name: 'African-American GFR',
                data: [136, 156, 131, 176, 191, 156, 116, 106]
            }, {
                name: 'African American Mildly Low Flag',
                data: [176, 116, 21, 66, 81, 86, 12, 16]
            }, {
                name: 'African American Moderate to Severe',
                data: [166, 146, 161, 206, 221, 226, 166, 146]
            }]
        }
        const underweightBMI = {
            chart: {
                height: 190,
                type: 'spline',
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
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct']
            },
            colors: ['#2A2D71', '#FF9300', '#DB1962'],
            plotOptions: {
                series: {
                    lineWidth: 1,

                }
            },
            series: [{
                name: 'Actual BMI',
                marker: {
                    symbol: 'square'
                },
                data: [90, 110, 85, 130, 145, 150, 90, 70]

            }, {
                name: 'Underweight Limit',
                marker: {
                    symbol: 'diamond'
                },
                data: [100, 120, 95, 140, 155, 160, 100, 80]
            }, {
                name: 'Underweight Flag',
                marker: {
                    symbol: 'circle'
                },
                data: [100, 130, 105, 150, 165, 170, 110, 90]
            }]
        };
        const overweightBMI = {
            chart: {
                height: 190,
                type: 'spline',
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
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct']
            },
            colors: ['#2A2D71', '#FF9300', '#DB1962'],
            plotOptions: {
                series: {
                    lineWidth: 1,

                }
            },
            series: [{
                name: 'Actual BMI',
                marker: {
                    symbol: 'square'
                },
                data: [90, 110, 85, 130, 145, 150, 90, 70]

            }, {
                name: 'Underweight Limit',
                marker: {
                    symbol: 'diamond'
                },
                data: [100, 120, 95, 140, 155, 160, 100, 80]
            }, {
                name: 'Underweight Flag',
                marker: {
                    symbol: 'circle'
                },
                data: [100, 130, 105, 150, 165, 170, 110, 90]
            }]
        }
        const totalcholestrol = {
            chart: {
                height: 190,
                type: 'spline',
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
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct']
            },
            colors: ['#6C6C6C', '#000', '#DB1962', '#B018D9'],
            plotOptions: {
                series: {
                    lineWidth: 1,

                }
            },
            series: [{
                name: 'Total Cholesterol',
                marker: {
                    symbol: 'square'
                },
                data: [1, 10, 12, 8, 15, 9, 12, 14]

            }, {
                name: 'LDL',
                marker: {
                    symbol: 'diamond'
                },
                data: [7, 16, 18, 14, 21, 15, 18, 20]
            }, {
                name: 'HDL',
                marker: {
                    symbol: 'circle'
                },
                data: [27, 36, 38, 34, 41, 35, 38, 40]
            }, {
                name: 'Triglycerides',
                marker: {
                    symbol: 'triangle'
                },
                data: [33, 42, 44, 40, 47, 42, 44, 46]
            }]
        }
        const stagesofsleep = {
            chart: {
                height: 270,
                type: 'spline',
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
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct']
            },
            colors: ['#6C6C6C', '#000', '#DB1962', '#B018D9', '#FFC400', '#2A712D', '#2A2D71', '#DB1962'],
            plotOptions: {
                series: {
                    lineWidth: 1,

                }
            },
            series: [{
                name: 'Light Sleep - 4am',
                marker: {
                    symbol: 'square'
                },
                data: [1, 10, 12, 8, 15, 9, 12, 14]

            }, {
                name: 'REM - 4am',
                marker: {
                    symbol: 'diamond'
                },
                data: [7, 16, 18, 14, 21, 15, 18, 20]
            }, {
                name: 'Light Sleep - 8am',
                marker: {
                    symbol: 'circle'
                },
                data: [27, 36, 38, 34, 41, 35, 38, 40]
            }, {
                name: 'Deep Sleep - 2am',
                marker: {
                    symbol: 'triangle'
                },
                data: [33, 42, 44, 40, 47, 42, 44, 46]
            }, {
                name: 'Light Sleep - 2am',
                marker: {
                    symbol: 'square'
                },
                data: [53, 62, 64, 60, 67, 62, 64, 66]

            }, {
                name: 'Deep Sleep - 10pm',
                marker: {
                    symbol: 'diamond'
                },
                data: [59, 68, 70, 66, 73, 68, 70, 73]
            }, {
                name: 'Light Sleep - 10pm',
                marker: {
                    symbol: 'circle'
                },
                data: [79, 88, 90, 86, 93, 88, 90, 93]
            }, {
                name: 'Awake - 10pm',
                marker: {
                    symbol: 'triangle'
                },
                data: [85, 94, 96, 92, 99, 94, 96, 99]
            }]
        };
        return (
            <React.Fragment>
                <Head>
                    <title>Healthlligence</title>
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
                </Head>
                <Layout isLoaded={this.state.isLoaded}>
                <MDBRow style={{marginTop:"-16px"}}>
                <MDBCol sm="12" md="12" lg="12">
                    <MDBCard className="cgm-graph" style={{marginBottom:"16px"}}>
                        <MDBCardBody>
                            <MDBRow>
                                <MDBCol sm-="12" md="12" lg="8">
                                    <MDBRow>
                                        <MDBCol sm="6" md="8">
                                            <MDBTypography tag="h5" className="card-title"> Continuous Glucose Monitoring </MDBTypography>
                                        </MDBCol>

                                        <MDBCol sm="6" md="4" className="justify-content-end">
                                            <MDBSelect
                                                options={this.state.cgmDropdown}
                                                // outline
                                                selected="Select Date"
                                                className="month-right-dropdown1"
                                                getValue={(val) => this.handleCGMdayChange(val)}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol md="12" style={{ marginTop: "-8px" }} className="justify-content-start cgm-buttons">
                                            <MDBBtnGroup style={{ marginLeft: "18px", marginTop: "5px" }}>
                                                <MDBBtn className={"customClass " + this.state.hourlyTab} onClick={this.showHourlyGraph}>Hourly</MDBBtn>
                                                <MDBBtn className={"customClass " + this.state.dialyTab} onClick={this.showDialyGraph}>Daily</MDBBtn>
                                            </MDBBtnGroup>
                                        </MDBCol>

                                    </MDBRow>


                                    <MDBRow>
                                        {this.state.hourlyTab === "activeClass" ?
                                            <MDBCol md="12">
                                                <ReactHighcharts config={diabeticCGMHourlyData}></ReactHighcharts>
                                               </MDBCol> :
                                            <MDBCol md="12">
                                                <ReactHighcharts config={diabeticCGMDialyData}></ReactHighcharts>
                                            </MDBCol>
                                        }
                                    </MDBRow>

                                </MDBCol>
                                <MDBCol sm="12" md="12" lg="4">
                                    <MDBRow className="CGMTable">
                                        <MDBCol md="12">
                                            <MDBDataTable
                                                small
                                                hover={true}
                                                responsive={true}
                                                paging={false}
                                                searching={false}
                                                className="glucosemoniteringtablestyle"
                                                data={this.state.CGMabnormalGlucosedatatable}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol md="12">
                                            <div className="text-center">
                                                <Link href="/remotemoniteringdetails">
                                                    <MDBBtn color="" size="sm" className="details-btn" onClick={this.detailsbutton.bind(this, "glucosemonitering")}>See More</MDBBtn>
                                                </Link>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>

                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                </MDBRow>  
                    <MDBRow style={{marginTop:"-16px"}}>
                        <MDBCol sm="12" md="12" lg="4" style={{marginBottom:"16px"}} className="blood-pressure-graph">
                            <MDBCard>
                                <MDBCardBody>

                                    <MDBRow>
                                        <MDBCol md="12" className="justify-content-start">
                                            <MDBTypography tag="h5" className="card-title"> Blood Pressure </MDBTypography>
                                        </MDBCol>

                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol md="12">
                                            <ReactHighcharts config={bloodsugar}></ReactHighcharts>
                                        </MDBCol>
                                    </MDBRow>

                                    <MDBRow style={{marginTop:"12px"}}>
                                        <MDBCol md="12">
                                            <MDBDataTable
                                                small
                                                hover={true}
                                                responsive={true}
                                                paging={false}
                                                searching={false}
                                                className="bloodpressuretablestyle"
                                                data={this.state.bloodpressuretable}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol md="12" style={{paddingBottom:"5px"}}>
                                            <div className="text-center">
                                                <Link href="/remotemoniteringdetails">
                                                    <MDBBtn color="" size="sm" className="details-btn" onClick={this.detailsbutton.bind(this, "bloodpressure")}>See More</MDBBtn>
                                                </Link>

                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol sm="12" md="12" lg="4" style={{marginBottom:"16px"}} className="dialy-heart-rate-graph">
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol md="12" className="justify-content-start">
                                            <MDBTypography tag="h5" className="card-title"> Daily Heart Rate Monitor </MDBTypography>
                                        </MDBCol>

                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol md="12">
                                            <ReactHighcharts config={heartratemonitering}></ReactHighcharts>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow style={{marginTop:"12px"}}>
                                        <MDBCol md="12">
                                            <MDBDataTable
                                                small
                                                hover={true}
                                                responsive={true}
                                                paging={false}
                                                searching={false}
                                                className="heartratemonitertablestyle"
                                                data={this.state.heartratemonitertable}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol md="12" style={{paddingBottom:"5px"}}>
                                            <div className="text-center">
                                                <Link href="/remotemoniteringdetails">
                                                    <MDBBtn color="" size="sm" className="details-btn" onClick={this.detailsbutton.bind(this, "heartratemoniter")}>See More</MDBBtn>
                                                </Link>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>

                                </MDBCardBody>
                            </MDBCard>

                        </MDBCol>
                        <MDBCol sm="12" md="12" lg="4" style={{marginBottom:"16px"}} className="oximetry-graph">
                            <MDBCard>
                                <MDBCardBody>

                                    <MDBRow>
                                        <MDBCol md="12" className="justify-content-start">
                                            <MDBTypography tag="h5" className="card-title"> Daily Oximetry Readings </MDBTypography>
                                        </MDBCol>

                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol md="12">
                                            <ReactHighcharts config={oximeteryreading}></ReactHighcharts>
                                        </MDBCol>
                                    </MDBRow>


                                    <MDBRow style={{marginTop:"12px"}}>
                                        <MDBCol md="12">
                                            <MDBDataTable
                                                small
                                                hover={true}
                                                responsive={true}
                                                paging={false}
                                                searching={false}
                                                className="dailyoximetrytablestyle"
                                                data={this.state.dailyoximetrytable}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol md="12">
                                            <div className="text-center">
                                                <Link href="/remotemoniteringdetails">
                                                    <MDBBtn color="" size="sm" className="details-btn" onClick={this.detailsbutton.bind(this, "oximetryreading")}>See More</MDBBtn>

                                                </Link>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>


                                </MDBCardBody>
                            </MDBCard>

                        </MDBCol>

                    </MDBRow>
                    <MDBRow style={{marginTop:"-16px"}}>
                        <MDBCol sm="12" md="12" lg="6" style={{marginBottom:"16px" }} className="ekg-reading-graph">
                            <MDBCard style={{ height: "100%" }}>
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol md="12" className="justify-content-start">
                                            <MDBTypography tag="h5" className="card-title"> EKG Readings </MDBTypography>
                                        </MDBCol>

                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol md="12">
                                            <ReactHighcharts config={ekgreading}></ReactHighcharts>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow style={{marginTop:"12px"}}>
                                        <MDBCol md="12">
                                            <MDBDataTable
                                                small
                                                hover={true}
                                                responsive={true}
                                                paging={false}
                                                searching={false}
                                                className="ekgreadingtablestyle"
                                                data={this.state.ekgreadingtable}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol md="12">
                                            <div className="text-center">
                                                <Link href="/remotemoniteringdetails">
                                                    <MDBBtn color="" size="sm" className="details-btn" onClick={this.detailsbutton.bind(this, "ekgreadings")}>See More</MDBBtn>

                                                </Link>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>

                        </MDBCol>
                        <MDBCol sm="12" md="12" lg="6" style={{marginBottom:"16px" }} className="total-cholesterol">
                            <MDBCard style={{ height: "100%" }}>
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol md="12" className="justify-content-start">
                                            <MDBTypography tag="h5" className="card-title"> Total Cholesterol, LDL, HDL and Triglycerides </MDBTypography>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol md="12">
                                            <ReactHighcharts config={totalcholestrol}></ReactHighcharts>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow style={{marginTop:"12px"}}>
                                        <MDBCol md="12">
                                            <MDBDataTable
                                                small
                                                hover={true}
                                                responsive={true}
                                                paging={false}
                                                searching={false}
                                                className="datatablestyle"
                                                data={this.state.datatable}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol md="12">
                                            <div className="text-center">
                                                <Link href="/remotemoniteringdetails">
                                                    <MDBBtn color="" size="sm" className="details-btn" onClick={this.detailsbutton.bind(this, "Triglycerides")}>See More</MDBBtn>

                                                </Link>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>

                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol sm="12" md="12" lg="6" style={{marginBottom:"16px" }} className="under-weight-graph">
                            <MDBCard>
                                <MDBCardBody>

                                    <MDBRow>
                                        <MDBCol md="12">
                                            <MDBTypography tag="h5" className="card-title"> Underweight BMI </MDBTypography>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol md="12">
                                            <ReactHighcharts config={underweightBMI}></ReactHighcharts>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow style={{marginTop:"12px"}}>
                                        <MDBCol md="12">
                                            <MDBDataTable
                                                small
                                                hover={true}
                                                responsive={true}
                                                paging={false}
                                                searching={false}
                                                className="Underweightbmi"
                                                data={this.state.Underweightbmi}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol md="12">
                                            <div className="text-center">
                                                <Link href="/remotemoniteringdetails">
                                                    <MDBBtn color="" size="sm" className="details-btn" onClick={this.detailsbutton.bind(this, "underweightBMI")}>See More</MDBBtn>

                                                </Link>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>

                        </MDBCol>
                        <MDBCol sm="12" md="12" lg="6" style={{marginBottom:"16px" }} className="over-weight-graph">
                            <MDBCard>
                                <MDBCardBody>

                                    <MDBRow>
                                        <MDBCol md="12">
                                            <MDBTypography tag="h5" className="card-title"> Overweight BMI </MDBTypography>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol md="12">
                                            <ReactHighcharts config={overweightBMI}></ReactHighcharts>
                                        </MDBCol>
                                    </MDBRow>

                                    <MDBRow style={{marginTop:"12px"}}>
                                        <MDBCol md="12">
                                            <MDBDataTable
                                                small
                                                hover={true}
                                                responsive={true}
                                                paging={false}
                                                searching={false}
                                                className="Underweightbmi"
                                                data={this.state.Underweightbmi}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol md="12">
                                            <div className="text-center">
                                                <Link href="/remotemoniteringdetails">
                                                    <MDBBtn color="" size="sm" className="details-btn" onClick={this.detailsbutton.bind(this, "overweightBMI")}>See More</MDBBtn>

                                                </Link>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>


                                </MDBCardBody>
                            </MDBCard>

                        </MDBCol>
                    </MDBRow>
                    <MDBRow style={{marginTop:"-16px"}}>
                        <MDBCol sm="12" md="12" lg="12" style={{marginBottom:"16px"}}>
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol md="12" className="justify-content-start">
                                            <MDBTypography tag="h5" className="card-title"> Stages of Sleep from 10pm-6am </MDBTypography>
                                        </MDBCol>

                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol md="12">
                                            <ReactHighcharts config={stagesofsleep}></ReactHighcharts>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow style={{marginTop:"12px"}}>
                                        <MDBCol md="12">
                                            <MDBDataTable
                                                small
                                                hover={true}
                                                responsive={true}
                                                paging={false}
                                                searching={false}
                                                className="sleepstagestablestyle"
                                                data={this.state.sleepstagestable}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>

                        </MDBCol>
                    </MDBRow>
                    <MDBRow style={{marginTop:"-16px"}}>
                        <MDBCol sm="12" md="12" lg="12" style={{marginBottom:"16px"}}>
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol md="12">
                                            <MDBTypography tag="h5" className="card-title"> Glomerular Filtration Rate (GFR) - Non African-American </MDBTypography>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol md="12">
                                            <ReactHighcharts config={gfr}></ReactHighcharts>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow style={{marginTop:"12px"}}>
                                        <MDBCol md="12">
                                            <MDBDataTable
                                                small
                                                hover={true}
                                                responsive={true}
                                                paging={false}
                                                searching={false}
                                                className="Glomerulartablestyle"
                                                data={this.state.Glomerulartable}
                                            />
                                        </MDBCol>
                                    </MDBRow>

                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>


                    {this.state.isLoaded ? <Loader /> : ""}
                    <style jsx>{remoteMoniteringStyle}</style>
                </Layout>
            </React.Fragment>
        );
    }
};

export default RemoteMonitering;


import React, { Component } from "react";
import {
    MDBRow, MDBCol, MDBTypography, MDBSelect, MDBCard, MDBCardBody, MDBDataTable, MDBTimeline, MDBTimelineStep, MDBInput, MDBCollapse, MDBBtn, MDBModal,
    MDBModalHeader, MDBModalBody, MDBModalFooter, MDBChipsInput, MDBSelectInput, MDBSelectOptions, MDBSelectOption
} from "mdbreact";
import ReactHighcharts from 'react-highcharts';
import longitudanalStyles from '../styles/longitudanalStyles';
import Head from 'next/head'
import Layout from "../components/layout";
import Loader from '../components/loader';
import * as data from '../data/data';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
} from 'mdb-react-ui-kit';





class LongitudinalAnalysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            basicActive: 'tab1',
            admissiontypefor2019: "2020",
            diagnosistypefor2019: "2020",
            lengthofstayadmissionTypefor2019: '2020',
            lengthofstaydiagnosisfor2019: '2020',
            Readmissionriskadmissionfor2019: '2020',
            ReadmissionriskDiagnosisfor2019: '2020',
            populationtiervalue: '',
            yearDropdown: [
                { text: "2019", value: "2019" },
                { text: "2020", value: "2020" },
            ],
            selectDropdown: [
                { text: "Yearly", value: "yearly" },
                { text: "Quarterly", value: "quarterly" },
                { text: "Monthly", value: "monthly" }
            ],
            populationtier: {
                columns: [
                    {
                        label: 'Value',
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
                        type: "Hospitalization Risk",
                        secondyear: "5.87%",
                        thirdyear: "4.01%",
                        fourthyear: "4.80%",
                        fifthyear: "5.32%",
                        sixthyear: "7.41%"
                    }, {
                        type: "Member Count",
                        secondyear: "579",
                        thirdyear: "549",
                        fourthyear: "583",
                        fifthyear: "620",
                        sixthyear: "324"
                    },
                    {
                        type: "Average Age",
                        secondyear: "34",
                        thirdyear: "22",
                        fourthyear: "28",
                        fifthyear: "33",
                        sixthyear: "24"
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
            readmissionriskpopulationtier: {
                columns: [
                    {
                        label: 'Value',
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
                        type: "Readmission Risk",
                        secondyear: "6%",
                        thirdyear: "4%",
                        fourthyear: "5%",
                        fifthyear: "5%",
                        sixthyear: "7%"
                    },
                    {
                        type: "Member Count",
                        secondyear: "579",
                        thirdyear: "549",
                        fourthyear: "583",
                        fifthyear: "620",
                        sixthyear: "324"
                    },
                    {
                        type: "Average Age",
                        secondyear: "34",
                        thirdyear: "22",
                        fourthyear: "28",
                        fifthyear: "33",
                        sixthyear: "24"
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
            lengthofstaypopulationtier: {
                columns: [
                    {
                        label: 'Value',
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
                        type: "Length of Stay",
                        secondyear: "39.55",
                        thirdyear: "40.8",
                        fourthyear: "42.21",
                        fifthyear: "39.04",
                        sixthyear: "41.57"
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
            lengthofstaypopulationtierquarterlydata: {
                columns: [
                    {
                        label: 'Year',
                        field: 'year',
                        sort: 'asc',

                    },
                    {
                        label: 'Q1',
                        field: 'q1',
                        sort: 'asc',
                    },
                    {
                        label: 'Q2',
                        field: 'q2',
                        sort: 'asc',
                    },
                    {
                        label: 'Q3',
                        field: 'q3',
                        sort: 'asc',
                    },
                    {
                        label: 'Q4',
                        field: 'q4',
                        sort: 'asc',
                    }
                ],
                rows: [

                    {
                        year: "2017",
                        q1: "10.14",
                        q2: "10.04",
                        q3: "9.41",
                        q4: "9.96"
                    },
                    {
                        year: "2018",
                        q1: "10.53",
                        q2: "10.03",
                        q3: "10.19",
                        q4: "10.05"
                    },
                    {
                        year: "2019",
                        q1: "10.92",
                        q2: "10.55",
                        q3: "10.06",
                        q4: "10.68"
                    },
                    {
                        year: "2020",
                        q1: "10.10",
                        q2: "9.87",
                        q3: "9.26",
                        q4: "9.81"
                    },
                    {
                        year: "2021 (Predicted)",
                        q1: "10.36",
                        q2: "10.52",
                        q3: "10.20",
                        q4: "10.48"
                    }
                ]
            },
            admissionTypedata: {
                columns: [
                    {
                        label: 'Type',
                        field: 'type',
                    },
                    {
                        label: 'Inpatient',
                        field: 'emergency',

                    },
                    {
                        label: 'Observations',
                        field: 'newborn',


                    },
                    {
                        label: 'Emergency',
                        field: 'urgent',

                    }
                ],
                rows: [

                    {
                        type: "Hospitalization Risk",
                        emergency: "5%",
                        newborn: "0.33%",
                        urgent: "0.32%"
                    },
                    {
                        type: "Member Count",
                        emergency: "5877",
                        newborn: "131",
                        urgent: "196"
                    },
                    {
                        type: "Average Age",
                        emergency: "54",
                        newborn: "0.8",
                        urgent: "38"
                    },
                    {
                        type: "% Females",
                        emergency: "45%",
                        newborn: "50%",
                        urgent: "38%"
                    },
                    {
                        type: "% Kids",
                        emergency: "5%",
                        newborn: "0.10%",
                        urgent: "10%"
                    }

                ]
            },
            admissionTypedata2: {
                columns: [
                    {
                        label: 'Type',
                        field: 'type',
                    },
                    {
                        label: 'Inpatient',
                        field: 'emergency',

                    },
                    {
                        label: 'Observations',
                        field: 'newborn',


                    },
                    {
                        label: 'Emergency',
                        field: 'urgent',

                    }
                ],
                rows: [

                    {
                        type: "Hospitalization Risk",
                        emergency: "3.98%",
                        newborn: "0.40%",
                        urgent: "0.42%"
                    },
                    {
                        type: "Member Count",
                        emergency: "7052",
                        newborn: "157",
                        urgent: "235"
                    },
                    {
                        type: "Average Age",
                        emergency: "54",
                        newborn: "0.8",
                        urgent: "38"
                    },
                    {
                        type: "% Females",
                        emergency: "43%",
                        newborn: "51%",
                        urgent: "39%"
                    },
                    {
                        type: "% Kids",
                        emergency: "4%",
                        newborn: "8%",
                        urgent: "7%"
                    }

                ]
            },
            readmissionriskadmissionTypedata: {
                columns: [
                    {
                        label: 'Type',
                        field: 'type',
                    },
                    {
                        label: 'Viral Illness',
                        field: 'emergency',

                    },
                    {
                        label: 'Respiratory',
                        field: 'newborn',


                    },
                    {
                        label: 'Cardiac',
                        field: 'urgent',

                    }
                ],
                rows: [

                    {
                        type: "Readmission Risk",
                        emergency: "5.00%",
                        newborn: "0.48%",
                        urgent: "0.32%"
                    },
                    {
                        type: "Member Count",
                        emergency: "5877",
                        newborn: "131",
                        urgent: "196"
                    },
                    {
                        type: "Average Age",
                        emergency: "54",
                        newborn: "0.8",
                        urgent: "38"
                    },
                    {
                        type: "% Females",
                        emergency: "45%",
                        newborn: "50%",
                        urgent: "38%"
                    },
                    {
                        type: "% Kids",
                        emergency: "5%",
                        newborn: "0.10%",
                        urgent: "10%"
                    }

                ]
            },
            readmissionriskadmissionTypedata1:  {
                columns: [
                    {
                        label: 'Type',
                        field: 'type',
                    },
                    {
                        label: 'Viral Illness',
                        field: 'emergency',

                    },
                    {
                        label: 'Respiratory',
                        field: 'newborn',


                    },
                    {
                        label: 'Cardiac',
                        field: 'urgent',

                    }
                ],
                rows: [

                    {
                        type: "Readmission Risk",
                        emergency: "4.46%",
                        newborn: "0.69%",
                        urgent: "0.34%"
                    },
                    {
                        type: "Member Count",
                        emergency: "5602",
                        newborn: "124",
                        urgent: "187"
                    },
                    {
                        type: "Average Age",
                        emergency: "54",
                        newborn: "0.8",
                        urgent: "38"
                    },
                    {
                        type: "% Females",
                        emergency: "49%",
                        newborn: "48%",
                        urgent: "36%"
                    },
                    {
                        type: "% Kids",
                        emergency: "4%",
                        newborn: "9%",
                        urgent: "8%"
                    }

                ]
            },
            lengthofstayadmissionTypedata: {
                columns: [
                    {
                        label: 'Type',
                        field: 'type',
                    },
                    {
                        label: 'Emergency',
                        field: 'emergency',

                    },
                    {
                        label: 'Newborn',
                        field: 'newborn',


                    },
                    {
                        label: 'Inpatient',
                        field: 'urgent',

                    },
                    {
                        label: 'Elective',
                        field: 'elective',

                    }
                ],
                rows: [

                    {
                        type: "Length of Stay",
                        emergency: "9.82%",
                        newborn: "10.8%",
                        urgent: "11.74%",
                        elective: "8.03%"
                    },
                    {
                        type: "Member Count",
                        emergency: "5877",
                        newborn: "131",
                        urgent: "196",
                        elective: "20"
                    },
                    {
                        type: "Average Age",
                        emergency: "54",
                        newborn: "0.8",
                        urgent: "38",
                        elective: "10"
                    },
                    {
                        type: "% Females",
                        emergency: "45%",
                        newborn: "50%",
                        urgent: "38%",
                        elective: "12%"
                    },
                    {
                        type: "% Kids",
                        emergency: "5%",
                        newborn: "0.10%",
                        urgent: "10%",
                        elective: "8%"
                    }

                ]
            },
            lengthofstayadmissionTypedata1: {
                columns: [
                    {
                        label: 'Type',
                        field: 'type',
                    },
                    {
                        label: 'Emergency',
                        field: 'emergency',

                    },
                    {
                        label: 'Newborn',
                        field: 'newborn',


                    },
                    {
                        label: 'Inpatient',
                        field: 'urgent',

                    },
                    {
                        label: 'Elective',
                        field: 'elective',

                    }
                ],
                rows: [

                    {
                        type: "Length of Stay",
                        emergency: "5.00%",
                        newborn: "0.33%",
                        urgent: "0.32%",
                        elective: "8.03%"
                    },
                    {
                        type: "Member Count",
                        emergency: "5602",
                        newborn: "124",
                        urgent: "187",
                        elective: "20"
                    },
                    {
                        type: "Average Age",
                        emergency: "56",
                        newborn: "1",
                        urgent: "39",
                        elective: "10"
                    },
                    {
                        type: "% Females",
                        emergency: "47%",
                        newborn: "49%",
                        urgent: "41%",
                        elective: "12%"
                    },
                    {
                        type: "% Kids",
                        emergency: "5%",
                        newborn: "9%",
                        urgent: "11%",
                        elective: "8%"
                    }

                ]
            },
            diagnosisdata: {
                columns: [
                    {
                        label: 'Diagnosis',
                        field: 'diagnosis',
                    },
                    {
                        label: 'Single lb in-hosp w/o cs',
                        field: 'Singlelbinhospwocs',
                    },
                    {
                        label: 'Crnry athrscl natve vssl',
                        field: 'Crnryathrsclnatvevssl',
                    },
                    {
                        label: 'Single lb in-hosp w cs',
                        field: 'Singlelbinhospwcs',
                    },
                    {
                        label: 'Septicemia NOS',
                        field: 'SepticemiaNOS',
                    },
                    {
                        label: 'Subendo infarct, initial',
                        field: 'Subendoinfarctinitial',
                    },
                    {
                        label: 'Acute respiratry failure',
                        field: 'Acuterespiratryfailure',
                    },
                    {
                        label: 'Aortic valve disorder',
                        field: 'Aorticvalvedisorder',
                    },
                    {
                        label: 'Intracerebral hemorrhage',
                        field: 'Intracerebralhemorrhage',
                    },
                    {
                        label: 'Twin-mate lb-in hos w cs',
                        field: 'Twinmatelbinhoswcs',
                    },
                    {
                        label: 'CHF NOS',
                        field: 'CHFNOS',
                    }
                ],
                rows: [
                    {
                        diagnosis: "Hospitalization Risk",
                        Singlelbinhospwocs: "1.05%",
                        Crnryathrsclnatvevssl: "1.08%",
                        Singlelbinhospwcs: "0.62%",
                        SepticemiaNOS: "0.59%",
                        Subendoinfarctinitial: "0.46%",
                        Acuterespiratryfailure: "0.22%",
                        Aorticvalvedisorder: "0.37%",
                        Intracerebralhemorrhage: "0.34%",
                        Twinmatelbinhoswcs: "0.12%",
                        CHFNOS: "0.15%",
                    },
                    {
                        diagnosis: "Member Count",
                        Singlelbinhospwocs: "34",
                        Crnryathrsclnatvevssl: "35",
                        Singlelbinhospwcs: "20",
                        SepticemiaNOS: "19",
                        Subendoinfarctinitial: "15",
                        Acuterespiratryfailure: "7",
                        Aorticvalvedisorder: "12",
                        Intracerebralhemorrhage: "11",
                        Twinmatelbinhoswcs: "4",
                        CHFNOS: "5",
                    },
                    {
                        diagnosis: "Average Age",
                        Singlelbinhospwocs: "54",
                        Crnryathrsclnatvevssl: "63",
                        Singlelbinhospwcs: "56",
                        SepticemiaNOS: "73",
                        Subendoinfarctinitial: "68",
                        Acuterespiratryfailure: "64",
                        Aorticvalvedisorder: "70",
                        Intracerebralhemorrhage: "53",
                        Twinmatelbinhoswcs: "49",
                        CHFNOS: "57",
                    },
                    {
                        diagnosis: "% Females",
                        Singlelbinhospwocs: "45%",
                        Crnryathrsclnatvevssl: "50%",
                        Singlelbinhospwcs: "38%",
                        SepticemiaNOS: "47%",
                        Subendoinfarctinitial: "50%",
                        Acuterespiratryfailure: "40%",
                        Aorticvalvedisorder: "43%",
                        Intracerebralhemorrhage: "43%",
                        Twinmatelbinhoswcs: "42%",
                        CHFNOS: "42%",
                    },
                    {
                        diagnosis: "% Kids",
                        Singlelbinhospwocs: "5%",
                        Crnryathrsclnatvevssl: "0%",
                        Singlelbinhospwcs: "10%",
                        SepticemiaNOS: "6%",
                        Subendoinfarctinitial: "8%",
                        Acuterespiratryfailure: "10%",
                        Aorticvalvedisorder: "11%",
                        Intracerebralhemorrhage: "9%",
                        Twinmatelbinhoswcs: "11%",
                        CHFNOS: "12%",
                    }
                ]
            },
            diagnosisdata2: {
                columns: [
                    {
                        label: 'Diagnosis',
                        field: 'diagnosis',
                    },
                    {
                        label: 'Single lb in-hosp w/o cs',
                        field: 'Singlelbinhospwocs',
                    },
                    {
                        label: 'Crnry athrscl natve vssl',
                        field: 'Crnryathrsclnatvevssl',
                    },
                    {
                        label: 'Single lb in-hosp w cs',
                        field: 'Singlelbinhospwcs',
                    },
                    {
                        label: 'Septicemia NOS',
                        field: 'SepticemiaNOS',
                    },
                    {
                        label: 'Subendo infarct, initial',
                        field: 'Subendoinfarctinitial',
                    },
                    {
                        label: 'Acute respiratry failure',
                        field: 'Acuterespiratryfailure',
                    },
                    {
                        label: 'Aortic valve disorder',
                        field: 'Aorticvalvedisorder',
                    },
                    {
                        label: 'Intracerebral hemorrhage',
                        field: 'Intracerebralhemorrhage',
                    },
                    {
                        label: 'Twin-mate lb-in hos w cs',
                        field: 'Twinmatelbinhoswcs',
                    },
                    {
                        label: 'CHF NOS',
                        field: 'CHFNOS',
                    }
                ],
                rows: [
                    {
                        diagnosis: "Hospitalization Risk",
                        Singlelbinhospwocs: "0.92%",
                        Crnryathrsclnatvevssl: "0.75%",
                        Singlelbinhospwcs: "0.67%",
                        SepticemiaNOS: "0.42%",
                        Subendoinfarctinitial: "0.42%",
                        Acuterespiratryfailure: "0.22%",
                        Aorticvalvedisorder: "0.25%",
                        Intracerebralhemorrhage: "0.20%",
                        Twinmatelbinhoswcs: "0.32%",
                        CHFNOS: "0.27%",
                    },
                    {
                        diagnosis: "Member Count",
                        Singlelbinhospwocs: "37",
                        Crnryathrsclnatvevssl: "30",
                        Singlelbinhospwcs: "27",
                        SepticemiaNOS: "17",
                        Subendoinfarctinitial: "17",
                        Acuterespiratryfailure: "9",
                        Aorticvalvedisorder: "10",
                        Intracerebralhemorrhage: "8",
                        Twinmatelbinhoswcs: "13",
                        CHFNOS: "11",
                    },
                    {
                        diagnosis: "Average Age",
                        Singlelbinhospwocs: "54",
                        Crnryathrsclnatvevssl: "63",
                        Singlelbinhospwcs: "56",
                        SepticemiaNOS: "73",
                        Subendoinfarctinitial: "68",
                        Acuterespiratryfailure: "64",
                        Aorticvalvedisorder: "70",
                        Intracerebralhemorrhage: "53",
                        Twinmatelbinhoswcs: "49",
                        CHFNOS: "57",
                    },
                    {
                        diagnosis: "% Females",
                        Singlelbinhospwocs: "41%",
                        Crnryathrsclnatvevssl: "45%",
                        Singlelbinhospwcs: "34%",
                        SepticemiaNOS: "42%",
                        Subendoinfarctinitial: "45%",
                        Acuterespiratryfailure: "36%",
                        Aorticvalvedisorder: "39%",
                        Intracerebralhemorrhage: "39%",
                        Twinmatelbinhoswcs: "38%",
                        CHFNOS: "38%",
                    },
                    {
                        diagnosis: "% Kids",
                        Singlelbinhospwocs: "5%",
                        Crnryathrsclnatvevssl: "0%",
                        Singlelbinhospwcs: "9%",
                        SepticemiaNOS: "5%",
                        Subendoinfarctinitial: "7%",
                        Acuterespiratryfailure: "9%",
                        Aorticvalvedisorder: "10%",
                        Intracerebralhemorrhage: "8%",
                        Twinmatelbinhoswcs: "10%",
                        CHFNOS: "11%",
                    }
                ]
            },

            lengthofstaydiagnosisdata: {
                columns: [
                    {
                        label: 'Diagnosis',
                        field: 'type',
                    },
                    {
                        label: 'Length of Stay',
                        field: 'hospitalization',

                    },
                    {
                        label: 'Member Count',
                        field: 'member',


                    },
                    {
                        label: 'Average Age',
                        field: 'average',

                    },
                    {
                        label: '% Females',
                        field: 'females',


                    },
                    {
                        label: '% Kids',
                        field: 'kids',

                    }
                ],
                rows: [
                    {
                        type: "Twin-mate lb in-hosp w cs",
                        hospitalization: "11.84",
                        member: "379",
                        average: "54",
                        females: '45%',
                        kids: '5%',
                    },
                    {
                        type: "Subendo infarct, initial",
                        hospitalization: "10.19",
                        member: "362",
                        average: "63",
                        females: '50%',
                        kids: '0%',
                    },
                    {
                        type: "Single lb in-hosp w/o cs",
                        hospitalization: "9.5",
                        member: "298",
                        average: "56",
                        females: '38%',
                        kids: '10%',
                    },
                    {
                        type: "Single lb in-hosp w cs",
                        hospitalization: "9.8",
                        member: "225",
                        average: "73",
                        females: '47%',
                        kids: '6%',
                    },
                    {
                        type: "Septicemia NOS",
                        hospitalization: "10.18",
                        member: "177",
                        average: "68",
                        females: '50%',
                        kids: '8%',
                    },
                    {
                        type: "pneumonia, organism, NOS",
                        hospitalization: "9.7",
                        member: "127",
                        average: "64",
                        females: '40%',
                        kids: '10%',
                    },
                    {
                        type: "Intracerebral hemorrhage",
                        hospitalization: "10.5",
                        member: "119",
                        average: "70",
                        females: '43%',
                        kids: "11%",
                    },
                    {
                        type: "crnry athrscl natve vssl",
                        hospitalization: "9.27",
                        member: "118",
                        average: "53",
                        females: '43%',
                        kids: '9%',
                    },
                    {
                        type: "Aortic valve disorder",
                        hospitalization: "10.87",
                        member: "105",
                        average: "49",
                        females: '42%',
                        kids: '11%',
                    },
                    {
                        type: "Acute respiratry failure",
                        hospitalization: "10.72",
                        member: "83",
                        average: "57",
                        females: '42%',
                        kids: '12%',
                    }

                ]
            },
            lengthofstaydiagnosisdata1: {
                columns: [
                    {
                        label: 'Diagnosis',
                        field: 'type',
                    },
                    {
                        label: 'Length of Stay',
                        field: 'hospitalization',

                    },
                    {
                        label: 'Member Count',
                        field: 'member',


                    },
                    {
                        label: 'Average Age',
                        field: 'average',

                    },
                    {
                        label: '% Females',
                        field: 'females',


                    },
                    {
                        label: '% Kids',
                        field: 'kids',

                    }
                ],
                rows: [
                    {
                        type: "Twin-mate lb in-hosp w cs",
                        hospitalization: "32",
                        member: "95",
                        average: "44",
                        females: '29%',
                        kids: '10%',
                    },
                    {
                        type: "Subendo infarct, initial",
                        hospitalization: "43",
                        member: "159",
                        average: "61",
                        females: '35%',
                        kids: '6%',
                    },
                    {
                        type: "Single lb in-hosp w/o cs",
                        hospitalization: "45",
                        member: "341",
                        average: "49",
                        females: '36%',
                        kids: '4%',
                    },
                    {
                        type: "Single lb in-hosp w cs",
                        hospitalization: "45",
                        member: "268",
                        average: "50",
                        females: '27%',
                        kids: '8%',
                    },
                    {
                        type: "Septicemia NOS",
                        hospitalization: "34",
                        member: "75",
                        average: "51",
                        females: '25%',
                        kids: '7%',
                    },
                    {
                        type: "pneumonia, organism, NOS",
                        hospitalization: "9.7",
                        member: "127",
                        average: "64",
                        females: '40%',
                        kids: '10%',
                    },
                    {
                        type: "Intracerebral hemorrhage",
                        hospitalization: "32",
                        member: "106",
                        average: "48",
                        females: '34%',
                        kids: "8%",
                    },
                    {
                        type: "crnry athrscl natve vssl",
                        hospitalization: "44",
                        member: "326",
                        average: "57",
                        females: '35%',
                        kids: '0%',
                    },
                    {
                        type: "Aortic valve disorder",
                        hospitalization: "42",
                        member: "107",
                        average: "63",
                        females: '30%',
                        kids: '8%',
                    },
                    {
                        type: "Acute respiratry failure",
                        hospitalization: "46",
                        member: "114",
                        average: "58",
                        females: '32%',
                        kids: '9%',
                    }

                ]
            },
            readmissionriskdiagnosisdata: {
                columns: [
                    {
                        label: 'Diagnosis',
                        field: 'type',
                    },
                    {
                        label: 'Single lb in-hosp w/o cs',
                        field: 'Singlelbinhospwocs',

                    },
                    {
                        label: 'Crnry athrscl natve vssl',
                        field: 'Crnryathrsclnatvevssl',


                    },
                    {
                        label: 'Single lb in-hosp w cs',
                        field: 'Singlelbinhospwcs',

                    },
                    {
                        label: 'Septicemia NOS',
                        field: 'SepticemiaNOS',


                    },
                    {
                        label: 'Subendo infarct, initial',
                        field: 'Subendoinfarctinitial',

                    },
                    {
                        label: 'Acute respiratry failure',
                        field: 'Acuterespiratryfailure',

                    },
                    {
                        label: 'Aortic valve disorder',
                        field: 'Aorticvalvedisorder',


                    },
                    {
                        label: 'Intracerebral hemorrhage',
                        field: 'Intracerebralhemorrhage',

                    },
                    {
                        label: 'Twin-mate lb-in hos w cs',
                        field: 'Twinmatelbinhoswcs',


                    },
                    {
                        label: 'CHF NOS',
                        field: 'CHFNOS',

                    }
                ],
                rows: [
                    {
                        type: "Readmission Risk",
                        Singlelbinhospwocs: "1.05%",
                        Crnryathrsclnatvevssl: "1.08%",
                        Singlelbinhospwcs: "0.62%",
                        SepticemiaNOS: "0.59%",
                        Subendoinfarctinitial: "0.46%",
                        Acuterespiratryfailure: "0.22%",
                        Aorticvalvedisorder: "0.37%",
                        Intracerebralhemorrhage: "0.34%",
                        Twinmatelbinhoswcs: "0.12%",
                        CHFNOS: "0.15%"
                    },
                    {
                        type: "Member count",
                        Singlelbinhospwocs: "379",
                        Crnryathrsclnatvevssl: "362",
                        Singlelbinhospwcs: "298",
                        SepticemiaNOS: "225",
                        Subendoinfarctinitial: "177",
                        Acuterespiratryfailure: "127",
                        Aorticvalvedisorder: "119",
                        Intracerebralhemorrhage: "118",
                        Twinmatelbinhoswcs: "105",
                        CHFNOS: "83"
                    },
                    {
                        type: "Average Age",
                        Singlelbinhospwocs: "54",
                        Crnryathrsclnatvevssl: "63",
                        Singlelbinhospwcs: "56",
                        SepticemiaNOS: "73",
                        Subendoinfarctinitial: "68",
                        Acuterespiratryfailure: "64",
                        Aorticvalvedisorder: "70",
                        Intracerebralhemorrhage: "53",
                        Twinmatelbinhoswcs: "49",
                        CHFNOS: "57"
                    },
                    {
                        type: "% Females",
                        Singlelbinhospwocs: "45%",
                        Crnryathrsclnatvevssl: "50%",
                        Singlelbinhospwcs: "38%",
                        SepticemiaNOS: "47%",
                        Subendoinfarctinitial: "50%",
                        Acuterespiratryfailure: "40%",
                        Aorticvalvedisorder: "43%",
                        Intracerebralhemorrhage: "43%",
                        Twinmatelbinhoswcs: "42%",
                        CHFNOS: "42%"
                    },
                    {
                        type: "% Kids",
                        Singlelbinhospwocs: "5%",
                        Crnryathrsclnatvevssl: "0%",
                        Singlelbinhospwcs: "10%",
                        SepticemiaNOS: "6%",
                        Subendoinfarctinitial: "8%",
                        Acuterespiratryfailure: "10%",
                        Aorticvalvedisorder: "11%",
                        Intracerebralhemorrhage: "9%",
                        Twinmatelbinhoswcs: "11%",
                        CHFNOS: "12%"
                    }

                ]
            },
            readmissionriskdiagnosisdata1: {
                columns: [
                    {
                        label: 'Diagnosis',
                        field: 'type',
                    },
                    {
                        label: 'Single lb in-hosp w/o cs',
                        field: 'Singlelbinhospwocs',

                    },
                    {
                        label: 'Crnry athrscl natve vssl',
                        field: 'Crnryathrsclnatvevssl',


                    },
                    {
                        label: 'Single lb in-hosp w cs',
                        field: 'Singlelbinhospwcs',

                    },
                    {
                        label: 'Septicemia NOS',
                        field: 'SepticemiaNOS',


                    },
                    {
                        label: 'Subendo infarct, initial',
                        field: 'Subendoinfarctinitial',

                    },
                    {
                        label: 'Acute respiratry failure',
                        field: 'Acuterespiratryfailure',

                    },
                    {
                        label: 'Aortic valve disorder',
                        field: 'Aorticvalvedisorder',


                    },
                    {
                        label: 'Intracerebral hemorrhage',
                        field: 'Intracerebralhemorrhage',

                    },
                    {
                        label: 'Twin-mate lb-in hos w cs',
                        field: 'Twinmatelbinhoswcs',


                    },
                    {
                        label: 'CHF NOS',
                        field: 'CHFNOS',

                    }
                ],
                rows: [
                    {
                        type: "Readmission Risk",
                        Singlelbinhospwocs: "0.92%",
                        Crnryathrsclnatvevssl: "0.75%",
                        Singlelbinhospwcs: "0.67%",
                        SepticemiaNOS: "0.42%",
                        Subendoinfarctinitial: "0.42%",
                        Acuterespiratryfailure: "0.22%",
                        Aorticvalvedisorder: "0.25%",
                        Intracerebralhemorrhage: "0.20%",
                        Twinmatelbinhoswcs: "0.32%",
                        CHFNOS: "0.27%"
                    },
                    {
                        type: "Member count",
                        Singlelbinhospwocs: "360",
                        Crnryathrsclnatvevssl: "344",
                        Singlelbinhospwcs: "283",
                        SepticemiaNOS: "214",
                        Subendoinfarctinitial: "168",
                        Acuterespiratryfailure: "121",
                        Aorticvalvedisorder: "113",
                        Intracerebralhemorrhage: "112",
                        Twinmatelbinhoswcs: "100",
                        CHFNOS: "79"
                    },
                    {
                        type: "Average Age",
                        Singlelbinhospwocs: "54",
                        Crnryathrsclnatvevssl: "63",
                        Singlelbinhospwcs: "56",
                        SepticemiaNOS: "73",
                        Subendoinfarctinitial: "68",
                        Acuterespiratryfailure: "64",
                        Aorticvalvedisorder: "70",
                        Intracerebralhemorrhage: "53",
                        Twinmatelbinhoswcs: "49",
                        CHFNOS: "57"
                    },
                    {
                        type: "% Females",
                        Singlelbinhospwocs: "45%",
                        Crnryathrsclnatvevssl: "50%",
                        Singlelbinhospwcs: "38%",
                        SepticemiaNOS: "47%",
                        Subendoinfarctinitial: "50%",
                        Acuterespiratryfailure: "40%",
                        Aorticvalvedisorder: "43%",
                        Intracerebralhemorrhage: "43%",
                        Twinmatelbinhoswcs: "42%",
                        CHFNOS: "42%"
                    },
                    {
                        type: "% Kids",
                        Singlelbinhospwocs: "5%",
                        Crnryathrsclnatvevssl: "0%",
                        Singlelbinhospwcs: "10%",
                        SepticemiaNOS: "6%",
                        Subendoinfarctinitial: "8%",
                        Acuterespiratryfailure: "10%",
                        Aorticvalvedisorder: "11%",
                        Intracerebralhemorrhage: "9%",
                        Twinmatelbinhoswcs: "11%",
                        CHFNOS: "12%"
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
        let population = this.state.populationtier;
        let admission = this.state.admissionTypedata;
        let admission2 = this.state.admissionTypedata2;
        let admissiondata = this.state.readmissionriskadmissionTypedata;
        let admissiondata1 = this.state.readmissionriskadmissionTypedata1;
        let losadmissiondata = this.state.lengthofstayadmissionTypedata;
        let lengthofstayadmissionTypedata1  = this.state.lengthofstayadmissionTypedata1;
        let diagnosis = this.state.diagnosisdata;
        let diagnosis2 = this.state.diagnosisdata2;
        let diagnosisdata = this.state.readmissionriskdiagnosisdata;
        let diagnosisdata1 = this.state.readmissionriskdiagnosisdata1;
        let losdiagnosisdata = this.state.lengthofstaydiagnosisdata;
        let losdiagnosisdata1 = this.state.lengthofstaydiagnosisdata1;
        let readmissionpopulation = this.state.readmissionriskpopulationtier;
        let lengthofstaydata = this.state.lengthofstaypopulationtier;
        let lengthofstaypopulationtierquarterlydata = this.state.lengthofstaypopulationtierquarterlydata;

        for (let i = 0; i < diagnosis2.rows.length; i++) {
            diagnosis2.rows[i].Singlelbinhospwocs = <div style={{ color: "#2A2D71", fontWeight: "600" }}>{this.state.diagnosisdata2.rows[i].Singlelbinhospwocs}</div>
            diagnosis2.rows[i].Crnryathrsclnatvevssl = <div style={{ color: "#00897B", fontWeight: "600" }}>{this.state.diagnosisdata2.rows[i].Crnryathrsclnatvevssl}</div>
            diagnosis2.rows[i].Singlelbinhospwcs = <div style={{ color: "#DF2F2F", fontWeight: "600" }}>{this.state.diagnosisdata2.rows[i].Singlelbinhospwcs}</div>
            diagnosis2.rows[i].SepticemiaNOS = <div style={{ color: "#F89E1B", fontWeight: "600" }}>{this.state.diagnosisdata2.rows[i].SepticemiaNOS}</div>
            diagnosis2.rows[i].Subendoinfarctinitial = <div style={{ color: "#9E9E9E", fontWeight: "600" }}>{this.state.diagnosisdata2.rows[i].Subendoinfarctinitial}</div>
            diagnosis2.rows[i].Acuterespiratryfailure = <div style={{ color: "#29B6F6", fontWeight: "600" }}>{this.state.diagnosisdata2.rows[i].Acuterespiratryfailure}</div>
            diagnosis2.rows[i].Aorticvalvedisorder = <div style={{ color: "#FF8A80", fontWeight: "600" }}>{this.state.diagnosisdata2.rows[i].Aorticvalvedisorder}</div>
            diagnosis2.rows[i].Intracerebralhemorrhage = <div style={{ color: "#4CAF50", fontWeight: "600" }}>{this.state.diagnosisdata2.rows[i].Intracerebralhemorrhage}</div>
            diagnosis2.rows[i].Twinmatelbinhoswcs = <div style={{ color: "#536DFE", fontWeight: "600" }}>{this.state.diagnosisdata2.rows[i].Twinmatelbinhoswcs}</div>
            diagnosis2.rows[i].CHFNOS = <div style={{ color: "#DF2F2F" }}>{this.state.diagnosisdata2.rows[i].CHFNOS}</div>
        }

        for (let i = 0; i < diagnosisdata.rows.length; i++) {
            diagnosisdata.rows[i].Singlelbinhospwocs = <div style={{ color: "#2A2D71", fontWeight: "600" }}>{this.state.readmissionriskdiagnosisdata.rows[i].Singlelbinhospwocs}</div>
            diagnosisdata.rows[i].Crnryathrsclnatvevssl = <div style={{ color: "#00897B", fontWeight: "600" }}>{this.state.readmissionriskdiagnosisdata.rows[i].Crnryathrsclnatvevssl}</div>
            diagnosisdata.rows[i].Singlelbinhospwcs = <div style={{ color: "#DF2F2F", fontWeight: "600" }}>{this.state.readmissionriskdiagnosisdata.rows[i].Singlelbinhospwcs}</div>
            diagnosisdata.rows[i].SepticemiaNOS = <div style={{ color: "#F89E1B", fontWeight: "600" }}>{this.state.readmissionriskdiagnosisdata.rows[i].SepticemiaNOS}</div>
            diagnosisdata.rows[i].Subendoinfarctinitial = <div style={{ color: "#9E9E9E", fontWeight: "600" }}>{this.state.readmissionriskdiagnosisdata.rows[i].Subendoinfarctinitial}</div>
            diagnosisdata.rows[i].Acuterespiratryfailure = <div style={{ color: "#29B6F6", fontWeight: "600" }}>{this.state.readmissionriskdiagnosisdata.rows[i].Acuterespiratryfailure}</div>
            diagnosisdata.rows[i].Aorticvalvedisorder = <div style={{ color: "#FF8A80", fontWeight: "600" }}>{this.state.readmissionriskdiagnosisdata.rows[i].Aorticvalvedisorder}</div>
            diagnosisdata.rows[i].Intracerebralhemorrhage = <div style={{ color: "#4CAF50", fontWeight: "600" }}>{this.state.readmissionriskdiagnosisdata.rows[i].Intracerebralhemorrhage}</div>
            diagnosisdata.rows[i].Twinmatelbinhoswcs = <div style={{ color: "#536DFE", fontWeight: "600" }}>{this.state.readmissionriskdiagnosisdata.rows[i].Twinmatelbinhoswcs}</div>
            diagnosisdata.rows[i].CHFNOS = <div style={{ color: "#DF2F2F" }}>{this.state.readmissionriskdiagnosisdata.rows[i].CHFNOS}</div>
        }
        for (let i = 0; i < diagnosisdata1.rows.length; i++) {
            diagnosisdata1.rows[i].Singlelbinhospwocs = <div style={{ color: "#2A2D71", fontWeight: "600" }}>{this.state.readmissionriskdiagnosisdata1.rows[i].Singlelbinhospwocs}</div>
            diagnosisdata1.rows[i].Crnryathrsclnatvevssl = <div style={{ color: "#00897B", fontWeight: "600" }}>{this.state.readmissionriskdiagnosisdata1.rows[i].Crnryathrsclnatvevssl}</div>
            diagnosisdata1.rows[i].Singlelbinhospwcs = <div style={{ color: "#DF2F2F", fontWeight: "600" }}>{this.state.readmissionriskdiagnosisdata1.rows[i].Singlelbinhospwcs}</div>
            diagnosisdata1.rows[i].SepticemiaNOS = <div style={{ color: "#F89E1B", fontWeight: "600" }}>{this.state.readmissionriskdiagnosisdata1.rows[i].SepticemiaNOS}</div>
            diagnosisdata1.rows[i].Subendoinfarctinitial = <div style={{ color: "#9E9E9E", fontWeight: "600" }}>{this.state.readmissionriskdiagnosisdata1.rows[i].Subendoinfarctinitial}</div>
            diagnosisdata1.rows[i].Acuterespiratryfailure = <div style={{ color: "#29B6F6", fontWeight: "600" }}>{this.state.readmissionriskdiagnosisdata1.rows[i].Acuterespiratryfailure}</div>
            diagnosisdata1.rows[i].Aorticvalvedisorder = <div style={{ color: "#FF8A80", fontWeight: "600" }}>{this.state.readmissionriskdiagnosisdata1.rows[i].Aorticvalvedisorder}</div>
            diagnosisdata1.rows[i].Intracerebralhemorrhage = <div style={{ color: "#4CAF50", fontWeight: "600" }}>{this.state.readmissionriskdiagnosisdata1.rows[i].Intracerebralhemorrhage}</div>
            diagnosisdata1.rows[i].Twinmatelbinhoswcs = <div style={{ color: "#536DFE", fontWeight: "600" }}>{this.state.readmissionriskdiagnosisdata1.rows[i].Twinmatelbinhoswcs}</div>
            diagnosisdata1.rows[i].CHFNOS = <div style={{ color: "#DF2F2F" }}>{this.state.diagnosisdata2.rows[i].CHFNOS}</div>
        }

        

        for (let i = 0; i < lengthofstayadmissionTypedata1.rows.length; i++) {
            lengthofstayadmissionTypedata1.rows[i].emergency = <div style={{ color: "#DF2F2F", fontWeight: "600" }}>{this.state.lengthofstayadmissionTypedata1.rows[i].emergency}</div>
            lengthofstayadmissionTypedata1.rows[i].newborn = <div style={{ color: "#7CB342", fontWeight: "600" }}>{this.state.lengthofstayadmissionTypedata1.rows[i].newborn}</div>
            lengthofstayadmissionTypedata1.rows[i].urgent = <div style={{ color: "#536DFE", fontWeight: "600" }}>{this.state.lengthofstayadmissionTypedata1.rows[i].urgent}</div>
            lengthofstayadmissionTypedata1.rows[i].elective = <div style={{ color: "#ff8a80", fontWeight: "600" }}>{this.state.lengthofstayadmissionTypedata1.rows[i].elective}</div>
        }


        for (let i = 0; i < lengthofstaypopulationtierquarterlydata.rows.length; i++) {
            lengthofstaypopulationtierquarterlydata.rows[i].q1 = <div style={{ color: "#536DFE", fontWeight: "600" }}>{this.state.lengthofstaypopulationtierquarterlydata.rows[i].q1}</div>
            lengthofstaypopulationtierquarterlydata.rows[i].q2 = <div style={{ color: "#DF2F2F", fontWeight: "600" }}>{this.state.lengthofstaypopulationtierquarterlydata.rows[i].q2}</div>
            lengthofstaypopulationtierquarterlydata.rows[i].q3 = <div style={{ color: "#7CB342", fontWeight: "600" }}>{this.state.lengthofstaypopulationtierquarterlydata.rows[i].q3}</div>
            lengthofstaypopulationtierquarterlydata.rows[i].q4 = <div style={{ color: "#29B6F6", fontWeight: "600" }}>{this.state.lengthofstaypopulationtierquarterlydata.rows[i].q4}</div>

        }
        for (let i = 0; i < population.rows.length; i++) {
            population.rows[i].hospitalizationRisk = <div style={{ color: "#DB1962", fontWeight: "600" }}>{this.state.populationtier.rows[i].hospitalizationRisk}</div>
            population.rows[i].membercount = <div style={{ color: "#66B8AF", fontWeight: "600" }}>{this.state.populationtier.rows[i].membercount}</div>
            population.rows[i].averageage = <div style={{ color: "#00897B", fontWeight: "600" }}>{this.state.populationtier.rows[i].averageage}</div>
        }
        for (let i = 0; i < lengthofstaydata.rows.length; i++) {
            lengthofstaydata.rows[i].hospitalizationRisk = <div style={{ color: "#DB1962", fontWeight: "600" }}>{this.state.lengthofstaypopulationtier.rows[i].hospitalizationRisk}</div>
            lengthofstaydata.rows[i].membercount = <div style={{ color: "#91A1F9", fontWeight: "600" }}>{this.state.lengthofstaypopulationtier.rows[i].membercount}</div>
            lengthofstaydata.rows[i].averageage = <div style={{ color: "#536DFE", fontWeight: "600" }}>{this.state.lengthofstaypopulationtier.rows[i].averageage}</div>
        }
        for (let i = 0; i < readmissionpopulation.rows.length; i++) {
            readmissionpopulation.rows[i].hospitalizationRisk = <div style={{ color: "#DB1962", fontWeight: "600" }}>{this.state.readmissionriskpopulationtier.rows[i].hospitalizationRisk}</div>
            readmissionpopulation.rows[i].membercount = <div style={{ color: "#91A1F9", fontWeight: "600" }}>{this.state.readmissionriskpopulationtier.rows[i].membercount}</div>
            readmissionpopulation.rows[i].averageage = <div style={{ color: "#536DFE", fontWeight: "600" }}>{this.state.readmissionriskpopulationtier.rows[i].averageage}</div>
        }
        for (let i = 0; i < admission.rows.length; i++) {
            admission.rows[i].emergency = <div style={{ color: "#DF2F2F", fontWeight: "600" }}>{this.state.admissionTypedata.rows[i].emergency}</div>
            admission.rows[i].newborn = <div style={{ color: "#536DFE", fontWeight: "600" }}>{this.state.admissionTypedata.rows[i].newborn}</div>
            admission.rows[i].urgent = <div style={{ color: "#7CB342", fontWeight: "600" }}>{this.state.admissionTypedata.rows[i].urgent}</div>
        }
        for (let i = 0; i < admission2.rows.length; i++) {
            admission2.rows[i].emergency = <div style={{ color: "#DF2F2F", fontWeight: "600" }}>{this.state.admissionTypedata2.rows[i].emergency}</div>
            admission2.rows[i].newborn = <div style={{ color: "#536DFE", fontWeight: "600" }}>{this.state.admissionTypedata2.rows[i].newborn}</div>
            admission2.rows[i].urgent = <div style={{ color: "#7CB342", fontWeight: "600" }}>{this.state.admissionTypedata2.rows[i].urgent}</div>
        }
        for (let i = 0; i < admissiondata.rows.length; i++) {
            admissiondata.rows[i].emergency = <div style={{ color: "#DF2F2F", fontWeight: "600" }}>{this.state.readmissionriskadmissionTypedata.rows[i].emergency}</div>
            admissiondata.rows[i].newborn = <div style={{ color: "#536DFE", fontWeight: "600" }}>{this.state.readmissionriskadmissionTypedata.rows[i].newborn}</div>
            admissiondata.rows[i].urgent = <div style={{ color: "#7CB342", fontWeight: "600" }}>{this.state.readmissionriskadmissionTypedata.rows[i].urgent}</div>
        }
        for (let i = 0; i < admissiondata1.rows.length; i++) {
            admissiondata1.rows[i].emergency = <div style={{ color: "#DF2F2F", fontWeight: "600" }}>{this.state.readmissionriskadmissionTypedata1.rows[i].emergency}</div>
            admissiondata1.rows[i].newborn = <div style={{ color: "#536DFE", fontWeight: "600" }}>{this.state.readmissionriskadmissionTypedata1.rows[i].newborn}</div>
            admissiondata1.rows[i].urgent = <div style={{ color: "#7CB342", fontWeight: "600" }}>{this.state.readmissionriskadmissionTypedata1.rows[i].urgent}</div>
        }

        
        for (let i = 0; i < losadmissiondata.rows.length; i++) {
            losadmissiondata.rows[i].emergency = <div style={{ color: "#DF2F2F", fontWeight: "600" }}>{this.state.lengthofstayadmissionTypedata.rows[i].emergency}</div>
            losadmissiondata.rows[i].newborn = <div style={{ color: "#7CB342", fontWeight: "600" }}>{this.state.lengthofstayadmissionTypedata.rows[i].newborn}</div>
            losadmissiondata.rows[i].urgent = <div style={{ color: "#536DFE", fontWeight: "600" }}>{this.state.lengthofstayadmissionTypedata.rows[i].urgent}</div>
            losadmissiondata.rows[i].elective = <div style={{ color: "#ff8a80", fontWeight: "600" }}>{this.state.lengthofstayadmissionTypedata.rows[i].elective}</div>
        }
        for (let i = 0; i < diagnosis.rows.length; i++) {
            diagnosis.rows[i].Singlelbinhospwocs = <div style={{ color: "#2A2D71", fontWeight: "600" }}>{this.state.diagnosisdata.rows[i].Singlelbinhospwocs}</div>
            diagnosis.rows[i].Crnryathrsclnatvevssl = <div style={{ color: "#00897B", fontWeight: "600" }}>{this.state.diagnosisdata.rows[i].Crnryathrsclnatvevssl}</div>
            diagnosis.rows[i].Singlelbinhospwcs = <div style={{ color: "#DF2F2F", fontWeight: "600" }}>{this.state.diagnosisdata.rows[i].Singlelbinhospwcs}</div>
            diagnosis.rows[i].SepticemiaNOS = <div style={{ color: "#F89E1B", fontWeight: "600" }}>{this.state.diagnosisdata.rows[i].SepticemiaNOS}</div>
            diagnosis.rows[i].Subendoinfarctinitial = <div style={{ color: "#9E9E9E", fontWeight: "600" }}>{this.state.diagnosisdata.rows[i].Subendoinfarctinitial}</div>
            diagnosis.rows[i].Acuterespiratryfailure = <div style={{ color: "#29B6F6", fontWeight: "600" }}>{this.state.diagnosisdata.rows[i].Acuterespiratryfailure}</div>
            diagnosis.rows[i].Aorticvalvedisorder = <div style={{ color: "#FF8A80", fontWeight: "600" }}>{this.state.diagnosisdata.rows[i].Aorticvalvedisorder}</div>
            diagnosis.rows[i].Intracerebralhemorrhage = <div style={{ color: "#4CAF50", fontWeight: "600" }}>{this.state.diagnosisdata.rows[i].Intracerebralhemorrhage}</div>
            diagnosis.rows[i].Twinmatelbinhoswcs = <div style={{ color: "#536DFE", fontWeight: "600" }}>{this.state.diagnosisdata.rows[i].Twinmatelbinhoswcs}</div>
            diagnosis.rows[i].CHFNOS = <div style={{ color: "#DF2F2F" }}>{this.state.diagnosisdata.rows[i].CHFNOS}</div>
        }

        for (let i = 0; i < diagnosis2.rows.length; i++) {
            diagnosis2.rows[i].Singlelbinhospwocs = <div style={{ color: "#2A2D71", fontWeight: "600" }}>{this.state.diagnosisdata2.rows[i].Singlelbinhospwocs}</div>
            diagnosis2.rows[i].Crnryathrsclnatvevssl = <div style={{ color: "#00897B", fontWeight: "600" }}>{this.state.diagnosisdata2.rows[i].Crnryathrsclnatvevssl}</div>
            diagnosis2.rows[i].Singlelbinhospwcs = <div style={{ color: "#DF2F2F", fontWeight: "600" }}>{this.state.diagnosisdata2.rows[i].Singlelbinhospwcs}</div>
            diagnosis2.rows[i].SepticemiaNOS = <div style={{ color: "#F89E1B", fontWeight: "600" }}>{this.state.diagnosisdata2.rows[i].SepticemiaNOS}</div>
            diagnosis2.rows[i].Subendoinfarctinitial = <div style={{ color: "#9E9E9E", fontWeight: "600" }}>{this.state.diagnosisdata2.rows[i].Subendoinfarctinitial}</div>
            diagnosis2.rows[i].Acuterespiratryfailure = <div style={{ color: "#29B6F6", fontWeight: "600" }}>{this.state.diagnosisdata2.rows[i].Acuterespiratryfailure}</div>
            diagnosis2.rows[i].Aorticvalvedisorder = <div style={{ color: "#FF8A80", fontWeight: "600" }}>{this.state.diagnosisdata2.rows[i].Aorticvalvedisorder}</div>
            diagnosis2.rows[i].Intracerebralhemorrhage = <div style={{ color: "#4CAF50", fontWeight: "600" }}>{this.state.diagnosisdata2.rows[i].Intracerebralhemorrhage}</div>
            diagnosis2.rows[i].Twinmatelbinhoswcs = <div style={{ color: "#536DFE", fontWeight: "600" }}>{this.state.diagnosisdata2.rows[i].Twinmatelbinhoswcs}</div>
            diagnosis2.rows[i].CHFNOS = <div style={{ color: "#DF2F2F" }}>{this.state.diagnosisdata2.rows[i].CHFNOS}</div>
        }


        
        for (let i = 0; i < losdiagnosisdata.rows.length; i++) {
            if (losdiagnosisdata.rows[i].type === "Twin-mate lb in-hosp w cs")
                losdiagnosisdata.rows[i].type = <div style={{ color: "#2A2D71", fontWeight: "600" }}>{this.state.lengthofstaydiagnosisdata.rows[i].type}</div>
            else if (losdiagnosisdata.rows[i].type === "Subendo infarct, initial")
                losdiagnosisdata.rows[i].type = <div style={{ color: "#00897B", fontWeight: "600" }}>{this.state.lengthofstaydiagnosisdata.rows[i].type}</div>
            else if (losdiagnosisdata.rows[i].type === "Single lb in-hosp w/o cs")
                losdiagnosisdata.rows[i].type = <div style={{ color: "#DF2F2F", fontWeight: "600" }}>{this.state.lengthofstaydiagnosisdata.rows[i].type}</div>
            else if (losdiagnosisdata.rows[i].type === "Single lb in-hosp w cs")
                losdiagnosisdata.rows[i].type = <div style={{ color: "#F89E1B", fontWeight: "600" }}>{this.state.lengthofstaydiagnosisdata.rows[i].type}</div>
            else if (losdiagnosisdata.rows[i].type === "Septicemia NOS")
                losdiagnosisdata.rows[i].type = <div style={{ color: "#9E9E9E", fontWeight: "600" }}>{this.state.lengthofstaydiagnosisdata.rows[i].type}</div>
            else if (losdiagnosisdata.rows[i].type === "pneumonia, organism, NOS")
                losdiagnosisdata.rows[i].type = <div style={{ color: "#29B6F6", fontWeight: "600" }}>{this.state.lengthofstaydiagnosisdata.rows[i].type}</div>
            else if (losdiagnosisdata.rows[i].type === "Intracerebral hemorrhage")
                losdiagnosisdata.rows[i].type = <div style={{ color: "#FF8A80", fontWeight: "600" }}>{this.state.lengthofstaydiagnosisdata.rows[i].type}</div>
            else if (losdiagnosisdata.rows[i].type === "crnry athrscl natve vssl")
                losdiagnosisdata.rows[i].type = <div style={{ color: "#4CAF50", fontWeight: "600" }}>{this.state.lengthofstaydiagnosisdata.rows[i].type}</div>
            else if (losdiagnosisdata.rows[i].type === "Aortic valve disorder")
                losdiagnosisdata.rows[i].type = <div style={{ color: "#536DFE", fontWeight: "600" }}>{this.state.lengthofstaydiagnosisdata.rows[i].type}</div>
            else if (losdiagnosisdata.rows[i].type === "Acute respiratry failure")
                losdiagnosisdata.rows[i].type = <div style={{ color: "#DF2F2F" }}>{this.state.lengthofstaydiagnosisdata.rows[i].type}</div>
        }
        for (let i = 0; i < losdiagnosisdata1.rows.length; i++) {
            if (losdiagnosisdata1.rows[i].type === "Twin-mate lb in-hosp w cs")
            losdiagnosisdata1.rows[i].type = <div style={{ color: "#2A2D71", fontWeight: "600" }}>{this.state.lengthofstaydiagnosisdata1.rows[i].type}</div>
            else if (losdiagnosisdata1.rows[i].type === "Subendo infarct, initial")
            losdiagnosisdata1.rows[i].type = <div style={{ color: "#00897B", fontWeight: "600" }}>{this.state.lengthofstaydiagnosisdata1.rows[i].type}</div>
            else if (losdiagnosisdata1.rows[i].type === "Single lb in-hosp w/o cs")
            losdiagnosisdata1.rows[i].type = <div style={{ color: "#DF2F2F", fontWeight: "600" }}>{this.state.lengthofstaydiagnosisdata1.rows[i].type}</div>
            else if (losdiagnosisdata1.rows[i].type === "Single lb in-hosp w cs")
            losdiagnosisdata1.rows[i].type = <div style={{ color: "#F89E1B", fontWeight: "600" }}>{this.state.lengthofstaydiagnosisdata1.rows[i].type}</div>
            else if (losdiagnosisdata1.rows[i].type === "Septicemia NOS")
            losdiagnosisdata1.rows[i].type = <div style={{ color: "#9E9E9E", fontWeight: "600" }}>{this.state.lengthofstaydiagnosisdata1.rows[i].type}</div>
            else if (losdiagnosisdata1.rows[i].type === "pneumonia, organism, NOS")
            losdiagnosisdata1.rows[i].type = <div style={{ color: "#29B6F6", fontWeight: "600" }}>{this.state.lengthofstaydiagnosisdata1.rows[i].type}</div>
            else if (losdiagnosisdata1.rows[i].type === "Intracerebral hemorrhage")
            losdiagnosisdata1.rows[i].type = <div style={{ color: "#FF8A80", fontWeight: "600" }}>{this.state.lengthofstaydiagnosisdata1.rows[i].type}</div>
            else if (losdiagnosisdata1.rows[i].type === "crnry athrscl natve vssl")
            losdiagnosisdata1.rows[i].type = <div style={{ color: "#4CAF50", fontWeight: "600" }}>{this.state.lengthofstaydiagnosisdata1.rows[i].type}</div>
            else if (losdiagnosisdata1.rows[i].type === "Aortic valve disorder")
            losdiagnosisdata1.rows[i].type = <div style={{ color: "#536DFE", fontWeight: "600" }}>{this.state.lengthofstaydiagnosisdata1.rows[i].type}</div>
            else if (losdiagnosisdata1.rows[i].type === "Acute respiratry failure")
            losdiagnosisdata1.rows[i].type = <div style={{ color: "#DF2F2F" }}>{this.state.lengthofstaydiagnosisdata1.rows[i].type}</div>
        }
        this.setState({
            lengthofstaydiagnosisdata: losdiagnosisdata,
            lengthofstaydiagnosisdata1 : losdiagnosisdata1,
            readmissionriskdiagnosisdata: diagnosisdata,
            readmissionriskadmissionTypedata: admissiondata,
            lengthofstayadmissionTypedata: losadmissiondata,
            admissionTypedata: admission,
            admissionTypedata2: admission2,
            lengthofstaypopulationtier: lengthofstaydata,
            populationtier: population,
            diagnosisdata: diagnosis,
            readmissionriskpopulationtier: readmissionpopulation
        });

    }

    handleBasicClick = (value) => {
        this.setState({
            basicActive: value
        });
    }

    handleSelectChange = (value) => {
        this.setState({
            populationtiervalue: value[0]
        });
    }

    hospitalizationRiskadmissiontypedropdown(value) {
        this.setState({
            admissiontypefor2019: value[0]
        })
    }

    hospitalizationRiskdiagnosistypedropdown(value) {
        this.setState({
            diagnosistypefor2019: value[0]
        })
    }

    lengthofstayadmissionTypedropdown(value) {
        this.setState({
            lengthofstayadmissionTypefor2019: value[0]
        })
    }

    lengthofstaydiagnosisdropdown(value) {
        this.setState({
            lengthofstaydiagnosisfor2019: value[0]
        })
    }

    ReadmissionriskadmissionTypedropdown(value) {
        this.setState({
            Readmissionriskadmissionfor2019: value[0]
        })
    }

    ReadmissionriskDiagnosisTypedropdown(value) {
        this.setState({
            ReadmissionriskDiagnosisfor2019: value[0]
        })
    }


    render() {
        let basicActive = this.state.basicActive;
        const populationtier = {
            chart: {
                height: 300,
                style: {
                    fontFamily: 'Open Sans',
                    fontSize: "14px"
                }
            },
            title: {
                text: ''
            },
            xAxis: [{
                categories: ['2017', '2018', '2019', '2020', '2021 (Predicted)'],

            }],
            yAxis: [{
                labels: {
                    format: '{value} %',
                },
                title: {
                    text: 'Hospitallization Risk'
                },
            }, {
                title: {
                    text: 'Patients'
                },
                opposite: true
            }],
            colors: ['#00897B', '#66B8AF', '#DB1962'],
            series: [{
                name: 'Average Age',
                type: 'column',
                yAxis: 1,
                data: [34, 22, 28, 33, 24]
            }, {
                name: 'Member Count',
                type: 'column',
                yAxis: 1,
                data: [579, 549, 583, 620, 324]
            }, {
                name: 'Hospitalization Risk',
                type: 'line',
                data: [5.87, 4.01, 4.80, 5.32, 7.41],
                tooltip: {
                    valueSuffix: ' %'
                }
            }],

            plotOptions: {
                series: {
                    pointWidth: 12,
                }
            },
            credits: {
                enabled: false
            }

        };
        const lengthofstaypopulationtier = {
            chart: {
                height: 300,
                style: {
                    fontFamily: 'Open Sans',
                    fontSize: "14px"
                }
            },
            title: {
                text: ''
            },
            xAxis: [{
                categories: ['2017', '2018', '2019', '2020', '2021 (Predicted)'],

            }],
            yAxis: [{
                title: {
                    text: 'Length of stay'
                },
            }, {
                title: {
                    text: 'Patients'
                },
                opposite: true
            }],

            colors: ['#00897B', '#66B8AF', '#DB1962'],
            series: [{
                name: 'Average Age',
                type: 'column',
                yAxis: 1,
                data: [49.01, 51.4, 50.73, 51.2, 50.5]
            }, {
                name: 'Member Count',
                type: 'column',
                yAxis: 1,
                data: [9233, 7092, 6224, 6530, 7002]
            }, {
                name: 'Length of Stay',
                type: 'line',
                data: [39.55, 40.80, 42.21, 39.04, 41.57]

            }],

            plotOptions: {
                series: {
                    pointWidth: 12,
                }
            },
            credits: {
                enabled: false
            }

        };



        const lengthofstaypopulationtierquaterly = {
            chart: {
                type: 'column',
                height: 300,
                style: {
                    fontFamily: 'Open Sans',
                    fontSize: "14px"
                }
            },
            title: {
                text: ''
            },
            xAxis: [{
                categories: ['2016', '2017', '2018', '2019', '2020', '2021 (Predicted)'],

            }],
            yAxis: [{
                title: {
                    text: 'Length of Stay'
                },
            }],
            colors: ['#29B6F6', '#7CB342', '#DF2F2F', '#536DFE'],
            series: [{
                name: 'Q4',
                data: [9.96, 9.96, 10.05, 10.68, 9.81, 10.48]
            },
            {
                name: 'Q3',
                data: [9.41, 9.41, 10.19, 10.06, 9.26, 10.20]
            },
            {
                name: 'Q2',
                data: [10.04, 10.04, 10.03, 10.55, 9.87, 10.52]
            },
            {
                name: 'Q1',
                data: [10.14, 10.14, 10.53, 10.92, 10.10, 10.36]
            }],

            plotOptions: {
                series: {
                    pointWidth: 12,
                },
                column: {
                    stacking: 'normal',

                }
            },
            credits: {
                enabled: false
            }

        };
        const lengthofstaypopulationtiermonthly = {
            chart: {
                type: 'line',
                height: 300,
                style: {
                    fontFamily: 'Open Sans',
                    fontSize: "14px"
                }
            },

            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['Jun 20', 'Jul 20', 'Aug 20', 'Sep 20', 'Oct 20', 'Nov 20', 'Dec 20', 'Jan 21', 'Feb 21', 'Mar 21', 'Apr 21', 'May 21(Predicted)', 'Jun 21(Predicted)']
            },
            yAxis: {
                title: {
                    text: 'Length of Stay'
                },

            },
            plotOptions: {
                series: {
                    pointWidth: 12,
                }

            },
            colors: ['#DB1962'],
            series: [{
                name: 'Length of Stay',
                data: [11, 9, 10, 8, 10, 10, 8.5, 6, 7, 8, 9, 6, 9]
            }]
        };
        const readimissionriskpopulationtier = {
            chart: {
                height: 300,
                style: {
                    fontFamily: 'Open Sans',
                    fontSize: "14px"
                }
            },
            title: {
                text: ''
            },
            xAxis: [{
                categories: ['2017', '2018', '2019', '2020', '2021 (Predicted)'],

            }],
            yAxis: [{
                labels: {
                    format: '{value} %',
                },
                title: {
                    text: 'Readmission Risk'
                },
            }, {
                title: {
                    text: 'Patients'
                },
                opposite: true
            }],
            colors: ['#536DFE', '#91A1F9', '#DB1962'],
            series: [{
                name: 'Average Age',
                type: 'column',
                yAxis: 1,
                data: [34, 22, 28, 33, 24]
            }, {
                name: 'Member Count',
                type: 'column',
                yAxis: 1,
                data: [579, 549, 583, 620, 324]
            }, {
                name: 'Readmission Risk',
                type: 'line',
                data: [6, 4, 5, 5, 7],
                tooltip: {
                    valueSuffix: ' %'
                }
            }],

            plotOptions: {
                series: {
                    pointWidth: 12,
                }
            },
            credits: {
                enabled: false
            }

        };

        const admissionType = {
            chart: {
                type: 'column',
                height: 280,
                style: {
                    fontFamily: 'Open Sans',
                    fontSize: "14px"
                }
            },

            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['2017', '2018', '2019', '2020', '2021 (Predicted)']
            },
            tooltip: {
                valueSuffix: " %"
            },
            yAxis: {
                title: {
                    text: 'Hospitalization Risk'
                },

                labels: {
                    enabled: false
                }
            },
            plotOptions: {
                series: {
                    pointWidth: 12,
                },
                column: {
                    stacking: 'normal',

                }
            },
            colors: ['#7CB342', '#536DFE', '#DF2F2F'],
            series: [{
                name: 'Emergency',
                data: [0.17, 0.00, 0.42, 0.32, 0.31]
            }, {
                name: 'Observations',
                data: [0.35, 0.25, 0.40, 0.33, 0.42]
            }, {
                name: 'Inpatient',
                data: [5.35, 3.64, 3.98, 5.00, 6.79]
            }]
        };
        const lengthofstayadmissionType = {
            chart: {
                type: 'column',
                height: 280,
                style: {
                    fontFamily: 'Open Sans',
                    fontSize: "14px"
                }
            },

            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['2017', '2018', '2019', '2020', '2021 (Predicted)']
            },
            yAxis: {
                title: {
                    text: 'Length of Stay'
                },

                labels: {
                    enabled: false
                }
            },
            plotOptions: {
                series: {
                    pointWidth: 12,
                },
                column: {
                    stacking: 'normal',

                }
            },
            colors: ['#FF8A80', '#536DFE', '#7CB342', '#DF2F2F'],
            series: [{
                name: 'Elective',
                data: [8.55, 9.71, 9.53, 8.03, 8.67]
            }, {
                name: 'Inpatient',
                data: [11.22, 11.93, 14.46, 11.74, 11.80]
            }, {
                name: 'Newborn',
                data: [11.60, 11.51, 12.72, 10.80, 12.13]
            }, {
                name: 'Emergency',
                data: [9.77, 9.99, 10.19, 9.82, 10.32]
            }]
        };
        const admissionriskadmissionType = {
            chart: {
                type: 'column',
                height: 280,
                style: {
                    fontFamily: 'Open Sans',
                    fontSize: "14px"
                }
            },

            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['2017', '2018', '2019', '2020', '2021 (Predicted)']
            },
            yAxis: {
                title: {
                    text: 'Readmission Risk'
                },

                labels: {
                    enabled: false
                }
            },
            tooltip: {
                valueSuffix: " %"
            },
            plotOptions: {
                series: {
                    pointWidth: 12,
                },
                column: {
                    stacking: 'normal',

                }
            },
            colors: ['#7CB342', '#536DFE', '#DF2F2F'],
            series: [{
                name: 'Cardiac',
                data: [0.17, 0.55, 0.34, 0.32, 0.31]
            }, {
                name: 'Respiratory',
                data: [0.35, 0.91, 0.69, 0.48, 1.23]
            }, {
                name: 'Viral Illness',
                data: [5.35, 3.64, 4.46, 5.00, 6.79]
            }]
        };
        const diagnosis = {
            chart: {
                type: 'column',
                height: 450,
                style: {
                    fontFamily: 'Open Sans',
                    fontSize: "14px"
                }
            },

            credits: {
                enabled: false
            },
            tooltip: {
                valueSuffix: ' %'

            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['2017', '2018', '2019', '2020', '2021 (Predicted)']
            },
            yAxis: {
                title: {
                    text: 'Hospitalization Risk'
                },
                labels: {
                    enabled: false,
                }
            },

            plotOptions: {
                series: {
                    pointWidth: 16,
                },
                column: {
                    stacking: 'normal'

                }
            },
            colors: ['#2A2D71', '#00897B', '#DF2F2F', '#F89E1B', '#9E9E9E', '#29B6F6', '#FF8A80', '#4CAF50', '#536DFE', '#DF2F2F', '#DF2F2F', '#536DFE', '#4CAF50', '#FF8A80', '#29B6F6', '#9E9E9E', '#F89E1B', '#DF2F2F', '#00897B', '#2A2D71'],
            series: [{
                name: 'Single lb in-hosp w/o cs',
                data: [1.10, 0.64, 0.92, 1.05, 1.22]
            }, {
                name: 'Crnry athrscl natve vssl',
                data: [0.92, 0.59, 0.75, 1.08, 1.25]
            }, {
                name: 'Single lb in-hosp w cs',
                data: [0.86, 0.57, 0.67, 0.62, 0.93]
            }, {
                name: 'Septicemia NOS',
                data: [0.52, 0.46, 0.42, 0.59, 0.58]
            }, {
                name: 'Subendo infarct, initial',
                data: [0.43, 0.37, 0.42, 0.46, 0.74]
            }, {
                name: 'Acute respiratry failure',
                data: [0.31, 0.20, 0.22, 0.22, 0.38]
            }, {
                name: 'Aortic valve disorder',
                data: [0.46, 0.18, 0.25, 0.37, 0.61]
            }, {
                name: 'Intracerebral hemorrhage',
                data: [0.15, 0.22, 0.20, 0.34, 0.38]
            }, {
                name: 'Twin-mate lb-in hos w cs',
                data: [0.43, 0.20, 0.32, 0.12, 0.35]
            }, {
                name: 'CHF NOS',
                data: [0.18, 0.22, 0.27, 0.15, 0.35]
            }]

        };

        const readmissionriskdiagnosis = {
            chart: {
                type: 'column',
                height: 450,
                style: {
                    fontFamily: 'Open Sans',
                    fontSize: "14px"
                }
            },

            credits: {
                enabled: false
            },
            tooltip: {
                valueSuffix: ' %'

            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['2017', '2018', '2019', '2020', '2021 (Predicted)']
            },
            yAxis: {
                title: {
                    text: 'Readmission Risk'
                },
                labels: {
                    enabled: false,
                }
            },

            plotOptions: {
                series: {
                    pointWidth: 16,
                },
                column: {
                    stacking: 'normal'

                }
            },
            colors: ['#2A2D71', '#00897B', '#DF2F2F', '#F89E1B', '#9E9E9E', '#29B6F6', '#FF8A80', '#4CAF50', '#536DFE', '#DF2F2F', '#DF2F2F', '#536DFE', '#4CAF50', '#FF8A80', '#29B6F6', '#9E9E9E', '#F89E1B', '#DF2F2F', '#00897B', '#2A2D71'],
            series: [{
                name: 'Single lb in-hosp w/o cs',
                data: [1.10, 0.64, 0.92, 1.05, 1.22]
            }, {
                name: 'Crnry athrscl natve vssl',
                data: [0.92, 0.59, 0.75, 1.08, 1.25]
            }, {
                name: 'Single lb in-hosp w cs',
                data: [0.86, 0.57, 0.67, 0.62, 0.93]
            }, {
                name: 'Septicemia NOS',
                data: [0.52, 0.46, 0.42, 0.59, 0.58]
            }, {
                name: 'Subendo infarct, initial',
                data: [0.43, 0.37, 0.42, 0.46, 0.74]
            }, {
                name: 'Acute respiratry failure',
                data: [0.31, 0.20, 0.22, 0.22, 0.38]
            }, {
                name: 'Aortic valve disorder',
                data: [0.46, 0.18, 0.25, 0.37, 0.61]
            }, {
                name: 'Intracerebral hemorrhage',
                data: [0.15, 0.22, 0.20, 0.34, 0.38]
            }, {
                name: 'Twin-mate lb-in hos w cs',
                data: [0.43, 0.20, 0.32, 0.12, 0.35]
            }, {
                name: 'CHF NOS',
                data: [0.18, 0.22, 0.27, 0.15, 0.35]
            }]

        };
        const lenthofstaydiagnosis = {
            chart: {
                type: 'column',
                height: 450,
                style: {
                    fontFamily: 'Open Sans',
                    fontSize: "14px"
                }
            },

            credits: {
                enabled: false
            },

            title: {
                text: ''
            },
            xAxis: {
                categories: ['2017', '2018', '2019', '2020', '2021 (Predicted)']
            },
            yAxis: {
                title: {
                    text: 'Length of Stay'
                },
                labels: {
                    enabled: false,
                }
            },

            plotOptions: {
                series: {
                    pointWidth: 16,
                },
                column: {
                    stacking: 'normal'

                }
            },
            colors: ['#2A2D71', '#00897B', '#DF2F2F', '#F89E1B', '#9E9E9E', '#29B6F6', '#FF8A80', '#4CAF50', '#536DFE', '#DF2F2F', '#DF2F2F', '#536DFE', '#4CAF50', '#FF8A80', '#29B6F6', '#9E9E9E', '#F89E1B', '#DF2F2F', '#00897B', '#2A2D71'],
            series: [{
                name: 'Twin-mate lb in-hosp w cs',
                data: [10.73, 9.63, 9.46, 11.84, 11.21]
            }, {
                name: 'Subendo infarct, initial',
                data: [10.16, 10.15, 9.30, 10.19, 11.77]
            }, {
                name: 'Single lb in-hosp w/o cs',
                data: [9.94, 10.69, 11.60, 9.50, 9.90]
            }, {
                name: 'Single lb in-hosp w cs',
                data: [9.73, 10.05, 10.38, 9.80, 10.68]
            }, {
                name: 'Septicemia NOS',
                data: [9.26, 11.72, 9.68, 10.18, 9.91]
            }, {
                name: 'pneumonia, organism, NOS',
                data: [8.90, 11.15, 9.43, 9.70, 9.11]
            }, {
                name: 'Intracerebral hemorrhage',
                data: [10.90, 9.08, 7.72, 10.50, 10.82]
            }, {
                name: 'crnry athrscl natve vssl',
                data: [10.97, 10.24, 9.22, 9.27, 10.62]
            }, {
                name: 'Aortic valve disorder',
                data: [9.38, 11.58, 10.14, 10.87, 7.59]
            }, {
                name: 'Acute respiratry failure',
                data: [8.46, 9.15, 11.25, 10.72, 9.77]
            }]

        };


        return (
            <React.Fragment>
                <Head>
                    <title>Healthlligence</title>
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
                </Head>
                <Layout>
                    <MDBRow className="longitudanaltabs">
                        <MDBTabs className='mb-3' style={{ marginTop: "12px" }}>
                            <MDBTabsItem>
                                <MDBTabsLink onClick={() => this.handleBasicClick('tab1')} active={basicActive === 'tab1'}>
                                    Hospitalization Risk
                                </MDBTabsLink>
                            </MDBTabsItem>
                            <MDBTabsItem>
                                <MDBTabsLink onClick={() => this.handleBasicClick('tab2')} active={basicActive === 'tab2'}>
                                    Readmission Risk
                                </MDBTabsLink>
                            </MDBTabsItem>

                            <MDBTabsItem>
                                <MDBTabsLink onClick={() => this.handleBasicClick('tab3')} active={basicActive === 'tab3'}>
                                    Length of Stay
                                </MDBTabsLink>
                            </MDBTabsItem>

                        </MDBTabs>

                        <MDBTabsContent className="longitudanaltabcontent">
                            <MDBTabsPane show={basicActive === 'tab1'}>
                                <MDBRow>
                                    <MDBCol sm="12" md="12" lg="12" style={{ marginBottom: "16px" }}>
                                        <MDBCard style={{ height: "100%" }}>
                                            <MDBCardBody>
                                                <MDBRow>
                                                    <MDBCol md="12">
                                                        <MDBTypography tag="h5" className="card-title">Hospitalization Risk </MDBTypography>
                                                    </MDBCol>
                                                </MDBRow>
                                                <br />
                                                <MDBRow>
                                                    <MDBCol md="6">
                                                        <ReactHighcharts config={populationtier}></ReactHighcharts>
                                                    </MDBCol>
                                                    <MDBCol md="6">
                                                        <MDBDataTable
                                                            small
                                                            hover={true}
                                                            responsive={true}
                                                            paging={false}
                                                            searching={false}
                                                            className="populationTable"
                                                            data={this.state.populationtier}
                                                        />
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol sm="12" md="12" lg="12" style={{ marginBottom: "16px" }}>
                                        <MDBCard style={{ height: "100%" }}>
                                            <MDBCardBody>
                                                <MDBRow>
                                                    <MDBCol md="10">
                                                        <MDBTypography tag="h5" className="card-title"> Hospitalization Risk for Different Admission Types </MDBTypography>
                                                    </MDBCol>
                                                    <MDBCol md="2" className="measuresdropdown">
                                                        <MDBSelect
                                                            options={this.state.yearDropdown}
                                                            // outline
                                                            selected="2020"
                                                            getValue={(val) => this.hospitalizationRiskadmissiontypedropdown(val)}
                                                            className="month-right-dropdown1"
                                                        />
                                                    </MDBCol>
                                                </MDBRow>

                                                <br />
                                                <MDBRow>
                                                    <MDBCol md="6">
                                                        <ReactHighcharts config={admissionType}></ReactHighcharts>
                                                    </MDBCol>
                                                    <MDBCol md="6">

                                                        <MDBDataTable
                                                            small
                                                            hover={true}
                                                            responsive={true}
                                                            paging={false}
                                                            searching={false}
                                                            data={this.state.admissiontypefor2019 == "2019" ? this.state.admissionTypedata2 : this.state.admissionTypedata}
                                                        />
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol sm="12" md="12" lg="12" style={{ marginBottom: "16px" }}>
                                        <MDBCard style={{ height: "100%" }}>
                                            <MDBCardBody>
                                                <MDBRow>
                                                    <MDBCol md="10">
                                                        <MDBTypography tag="h5" className="card-title"> Hospitalization Risk for Diagnoses (Top 10 Diseases) </MDBTypography>
                                                    </MDBCol>
                                                    <MDBCol md="2" className="measuresdropdown">
                                                        <MDBSelect
                                                            options={this.state.yearDropdown}
                                                            // outline
                                                            selected="2020"
                                                            getValue={(val) => this.hospitalizationRiskdiagnosistypedropdown(val)}
                                                            className="month-right-dropdown1"
                                                        />
                                                    </MDBCol>
                                                </MDBRow>

                                                <br />
                                                <MDBRow>
                                                    <MDBCol md="6">
                                                        <ReactHighcharts config={diagnosis}></ReactHighcharts>
                                                    </MDBCol>
                                                    <MDBCol md="6">
                                                        <MDBDataTable
                                                            small
                                                            hover={true}
                                                            responsive={true}
                                                            paging={false}
                                                            searching={false}
                                                            data={this.state.diagnosistypefor2019 == "2019" ? this.state.diagnosisdata2 : this.state.diagnosisdata}
                                                        />
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>

                            </MDBTabsPane>
                            <MDBTabsPane show={basicActive === 'tab2'}>
                                <MDBRow>
                                    <MDBCol sm="12" md="12" lg="12" style={{ marginBottom: "16px" }}>
                                        <MDBCard style={{ height: "100%" }}>
                                            <MDBCardBody>
                                                <MDBRow>
                                                    <MDBCol md="12">
                                                        <MDBTypography tag="h5" className="card-title"> Readmission Risk </MDBTypography>
                                                    </MDBCol>

                                                </MDBRow>

                                                <br />
                                                <MDBRow>
                                                    <MDBCol md="6">
                                                        <ReactHighcharts config={readimissionriskpopulationtier}></ReactHighcharts>
                                                    </MDBCol>
                                                    <MDBCol md="6">
                                                        <MDBDataTable
                                                            small
                                                            hover={true}
                                                            responsive={true}
                                                            paging={false}
                                                            searching={false}
                                                            className="populationTable"
                                                            data={this.state.readmissionriskpopulationtier}
                                                        />
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol sm="12" md="12" lg="12" style={{ marginBottom: "16px" }}>
                                        <MDBCard style={{ height: "100%" }}>
                                            <MDBCardBody>
                                                <MDBRow>
                                                    <MDBCol md="10">
                                                        <MDBTypography tag="h5" className="card-title"> Readmission Risk for Different Admission Type </MDBTypography>
                                                    </MDBCol>
                                                    <MDBCol md="2" className="measuresdropdown">
                                                        <MDBSelect
                                                            options={this.state.yearDropdown}
                                                            // outline
                                                            selected="2020"
                                                            getValue={(val) => this.ReadmissionriskadmissionTypedropdown(val)}
                                                            className="month-right-dropdown1"
                                                        />
                                                    </MDBCol>
                                                </MDBRow>

                                                <br />
                                                <MDBRow>
                                                    <MDBCol md="6">
                                                        <ReactHighcharts config={admissionriskadmissionType}></ReactHighcharts>
                                                    </MDBCol>
                                                    <MDBCol md="6">
                                                        {
                                                            this.state.Readmissionriskadmissionfor2019 == "2019" ? <MDBDataTable
                                                            small
                                                            hover={true}
                                                            responsive={true}
                                                            paging={false}
                                                            searching={false}
                                                            data={this.state.readmissionriskadmissionTypedata1}
                                                        /> : 
                                                        <MDBDataTable
                                                            small
                                                            hover={true}
                                                            responsive={true}
                                                            paging={false}
                                                            searching={false}
                                                            data={this.state.readmissionriskadmissionTypedata}
                                                        />
                                                        }
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol sm="12" md="12" lg="12" style={{ marginBottom: "16px" }}>
                                        <MDBCard style={{ height: "100%" }}>
                                            <MDBCardBody>
                                                <MDBRow>
                                                    <MDBCol md="10">
                                                        <MDBTypography tag="h5" className="card-title"> Readmission Risk for Diagnosis (Top 10 Diseases) </MDBTypography>
                                                    </MDBCol>
                                                    <MDBCol md="2" className="measuresdropdown">
                                                        <MDBSelect
                                                            options={this.state.yearDropdown}
                                                            // outline
                                                            selected="2020"
                                                            getValue={(val) => this.ReadmissionriskDiagnosisTypedropdown(val)}
                                                            className="month-right-dropdown1"
                                                        />
                                                    </MDBCol>
                                                </MDBRow>

                                                <br />
                                                <MDBRow>
                                                    <MDBCol md="6">
                                                        <ReactHighcharts config={readmissionriskdiagnosis}></ReactHighcharts>
                                                    </MDBCol>
                                                    <MDBCol md="6">
                                                        {
                                                            this.state.ReadmissionriskDiagnosisfor2019 == "2019" ? 
                                                            <MDBDataTable
                                                            small
                                                            hover={true}
                                                            responsive={true}
                                                            paging={false}
                                                            searching={false}
                                                            data={this.state.readmissionriskdiagnosisdata1}
                                                        /> : 
                                                       
                                                        <MDBDataTable
                                                            small
                                                            hover={true}
                                                            responsive={true}
                                                            paging={false}
                                                            searching={false}
                                                            data={this.state.readmissionriskdiagnosisdata}
                                                        />
                                                    }
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>


                            </MDBTabsPane>
                            <MDBTabsPane show={basicActive === 'tab3'}>
                                <MDBRow>
                                    <MDBCol sm="12" md="12" lg="12" style={{ marginBottom: "16px" }}>
                                        <MDBCard style={{ height: "100%" }}>
                                            <MDBCardBody>
                                                <MDBRow>
                                                    <MDBCol md="10">
                                                        <MDBTypography tag="h5" className="card-title">
                                                            {
                                                                this.state.populationtiervalue == "monthly" ? "Monthly Length of Stay" : this.state.populationtiervalue == "quarterly" ? "Quarterly Length of Stay" : "Yearly Length of Stay"
                                                            }
                                                        </MDBTypography>
                                                    </MDBCol>
                                                    <MDBCol md="2" className="measuresdropdown">
                                                        <MDBSelect
                                                            options={this.state.selectDropdown}
                                                            // outline
                                                            selected="Yearly"
                                                            getValue={this.handleSelectChange}
                                                            className="month-right-dropdown1"
                                                        />
                                                    </MDBCol>
                                                </MDBRow>

                                                <br />
                                                <MDBRow>
                                                    <MDBCol md="6">
                                                        {
                                                            this.state.populationtiervalue == "monthly" ? <ReactHighcharts config={lengthofstaypopulationtiermonthly}></ReactHighcharts> : this.state.populationtiervalue == "quarterly" ? <ReactHighcharts config={lengthofstaypopulationtierquaterly}></ReactHighcharts> : <ReactHighcharts config={lengthofstaypopulationtier}></ReactHighcharts>
                                                        }

                                                    </MDBCol>
                                                    <MDBCol md="6">
                                                        {
                                                            this.state.populationtiervalue == "quarterly" ?
                                                                <MDBDataTable
                                                                    small
                                                                    hover={true}
                                                                    responsive={true}
                                                                    paging={false}
                                                                    searching={false}
                                                                    data={this.state.lengthofstaypopulationtierquarterlydata}
                                                                />
                                                                :
                                                                <MDBDataTable
                                                                    small
                                                                    hover={true}
                                                                    responsive={true}
                                                                    paging={false}
                                                                    searching={false}
                                                                    className="populationTable"
                                                                    data={this.state.lengthofstaypopulationtier}
                                                                />
                                                        }

                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol sm="12" md="12" lg="12" style={{ marginBottom: "16px" }}>
                                        <MDBCard style={{ height: "100%" }}>
                                            <MDBCardBody>
                                                <MDBRow>
                                                    <MDBCol md="10">
                                                        <MDBTypography tag="h5" className="card-title"> Length of Stay for Different Admission Type </MDBTypography>
                                                    </MDBCol>
                                                    <MDBCol md="2" className="measuresdropdown">
                                                        <MDBSelect
                                                            options={this.state.yearDropdown}
                                                            // outline
                                                            selected="2020"
                                                            getValue={(val) => this.lengthofstayadmissionTypedropdown(val)}
                                                            className="month-right-dropdown1"
                                                        />
                                                    </MDBCol>
                                                </MDBRow>

                                                <br />
                                                <MDBRow>
                                                    <MDBCol md="6">
                                                        <ReactHighcharts config={lengthofstayadmissionType}></ReactHighcharts>
                                                    </MDBCol>
                                                    <MDBCol md="6">
                                                        {
                                                            this.state.lengthofstayadmissionTypefor2019 == "2019" ?
                                                                <MDBDataTable
                                                                    small
                                                                    hover={true}
                                                                    responsive={true}
                                                                    paging={false}
                                                                    searching={false}
                                                                    data={this.state.lengthofstayadmissionTypedata1}
                                                                />
                                                                :
                                                                <MDBDataTable
                                                                    small
                                                                    hover={true}
                                                                    responsive={true}
                                                                    paging={false}
                                                                    searching={false}
                                                                    data={this.state.lengthofstayadmissionTypedata}
                                                                />}




                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol sm="12" md="12" lg="12" style={{ marginBottom: "16px" }}>
                                        <MDBCard style={{ height: "100%" }}>
                                            <MDBCardBody>
                                                <MDBRow>
                                                    <MDBCol md="10">
                                                        <MDBTypography tag="h5" className="card-title"> Length of Stay for Different Diagnoses (Top 10 Diseases) </MDBTypography>
                                                    </MDBCol>
                                                    <MDBCol md="2" className="measuresdropdown">
                                                        <MDBSelect
                                                            options={this.state.yearDropdown}
                                                            // outline
                                                            selected="2020"
                                                            getValue={(val) => this.lengthofstaydiagnosisdropdown(val)}
                                                            className="month-right-dropdown1"
                                                        />
                                                    </MDBCol>
                                                </MDBRow>

                                                <br />
                                                <MDBRow>
                                                    <MDBCol md="6">
                                                        <ReactHighcharts config={lenthofstaydiagnosis}></ReactHighcharts>
                                                    </MDBCol>
                                                    <MDBCol md="6">
                                                        {
                                                            this.state.lengthofstaydiagnosisfor2019 == "2019" ?
                                                            <MDBDataTable
                                                            small
                                                            hover={true}
                                                            responsive={true}
                                                            paging={false}
                                                            searching={false}
                                                            data={this.state.lengthofstaydiagnosisdata1}
                                                        /> 
                                                      : 
                                                        <MDBDataTable
                                                            small
                                                            hover={true}
                                                            responsive={true}
                                                            paging={false}
                                                            searching={false}
                                                            data={this.state.lengthofstaydiagnosisdata}
                                                        />
                                                    }
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>


                            </MDBTabsPane>

                        </MDBTabsContent>
                    </MDBRow>
                    <style jsx>{longitudanalStyles}</style>
                </Layout>
            </React.Fragment>
        );
    }
};

export default LongitudinalAnalysis;


import React, { Component } from "react";
import {
    MDBRow, MDBCol, MDBTypography, MDBSelect, MDBCard, MDBCardBody, MDBDataTable, MDBTimeline, MDBTimelineStep, MDBInput, MDBCollapse, MDBBtn, MDBModal,
    MDBModalHeader, MDBModalBody, MDBModalFooter, MDBChipsInput, MDBSelectInput, MDBSelectOptions, MDBSelectOption
} from "mdbreact";
import ReactHighcharts from 'react-highcharts';
import UtilizationStyles from '../styles/Utilization';
import Head from 'next/head'
import Layout from "../components/layout";
import Loader from '../components/loader';
import * as data from '../data/data';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';



class Utilization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValueforPopulation: "",
            selctedRisklevelFilterValue:"",
            selctedServicesFilterValue:"",
            selctedDiagnosisFilterValue: "",
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
            risklevelFilterData: [{
                text: "2019",
                value: "0"
            }, {
                text: "2020",
                value: "1"
            }],
            servicesFilterData: [{
                text: "2019",
                value: "0"
            }, {
                text: "2020",
                value: "1"
            }],
            claimTotalDiagnosisFilterData: [{
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
                        type: "Claims Total Cost",
                        secondyear: "1,156,664",
                        thirdyear: "1,130,540",
                        fourthyear: "1,170,990",
                        fifthyear: "1,208,010",
                        sixthyear:"1,195,135"
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
            risklevelData_2019: {
                columns: [
                    {
                        label: 'Risk Group',
                        field: 'riskgroup',
                        sort: 'asc',

                    },
                    {
                        label: 'Well',
                        field: 'well',
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
                    },
                    {
                        label: 'High',
                        field: 'high',
                        sort: 'asc',
                    },
                    {
                        label: 'Catastrophic',
                        field: 'catastrophic',
                        sort: 'asc',
                    }
                ],
                rows: [
                    {
                        riskgroup: "Claims Total Cost",
                        well: "35130",
                        low: "81969",
                        medium: "292748",
                        high: "351297",
                        catastrophic: "409847"

                    },
                    {
                        riskgroup: "Member Count",
                        well: "877",
                        low: "431",
                        medium: "1196",
                        high: "2800",
                        catastrophic: "1226"
                    },
                    {
                        riskgroup: "Average Age",
                        well: "32",
                        low: "39",
                        medium: "44",
                        high: "68",
                        catastrophic: "79"
                    },
                    {
                        riskgroup: "%Females",
                        well: "45%",
                        low: "50%",
                        medium: "38%",
                        high: "52%",
                        catastrophic: "45%"
                    },
                    {
                        riskgroup: "%Kids",
                        well: "24%",
                        low: "12%",
                        medium: "8%",
                        high: "2%",
                        catastrophic: "2%"
                    }
                ]
            },
            risklevelData_2020: {
                columns: [
                    {
                        label: 'Type',
                        field: 'type',
                        sort: 'asc',

                    },
                    {
                        label: 'Well',
                        field: 'well',
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
                    },
                    {
                        label: 'High',
                        field: 'high',
                        sort: 'asc',
                    },
                    {
                        label: 'Catastrophic',
                        field: 'catastrophic',
                        sort: 'asc',
                    }
                ],
                rows: [
                    {
                        type: "Claims Total Cost",
                        well: "36240",
                        low: "84561",
                        medium: "302002",
                        high: "362403",
                        catastrophic: "422803"

                    },
                    {
                        type: "Member Count",
                        well: "789",
                        low: "388",
                        medium: "1076",
                        high: "2520",
                        catastrophic: "1103"
                    },
                    {
                        type: "Average Age",
                        well: "38",
                        low: "47",
                        medium: "53",
                        high: "78",
                        catastrophic: "81"
                    },
                    {
                        type: "%Females",
                        well: "47%",
                        low: "53%",
                        medium: "40%",
                        high: "55%",
                        catastrophic: "47%"
                    },
                    {
                        type: "%Kids",
                        well: "25%",
                        low: "13%",
                        medium: "8%",
                        high: "2%",
                        catastrophic: "2%"
                    }
                ]
            },
            servicesYearlyData_2019: {
                columns: [
                    {
                        label: 'Service',
                        field: 'service',
                        sort: 'asc',

                    },
                    {
                        label: 'Ambulatory',
                        field: 'ambulatory',
                        sort: 'asc',
                    },
                    {
                        label: 'Emergenecy',
                        field: 'emergency',
                        sort: 'asc',
                    },
                    {
                        label: 'Inpatient',
                        field: 'inpatient',
                        sort: 'asc',
                    },
                    {
                        label: 'Outpatient',
                        field: 'outpatient',
                        sort: 'asc',
                    },
                    {
                        label: 'Urgentcare',
                        field: 'urgentcare',
                        sort: 'asc',
                    },
                    {
                        label: 'Wellness',
                        field: 'wellness',
                        sort: 'asc',
                    }
                ],
                rows: [
                    {
                        service: "Claims Total Cost",
                        ambulatory: "306013",
                        emergency: "38798",
                        inpatient: "98138",
                        outpatient: "91575",
                        urgentcare: "172405",
                        wellness:"543634"

                    },
                    {
                        service: "Member Count",
                        ambulatory: "5582",
                        emergency: "697",
                        inpatient: "1874",
                        outpatient: "3355",
                        urgentcare: "1087",
                        wellness:"4539"
                    },
                    {
                        service: "Average Age",
                        ambulatory: "54",
                        emergency: "63",
                        inpatient: "56",
                        outpatient: "58",
                        urgentcare: "38",
                        wellness:"59"
                    },
                    {
                        service: "%Females",
                        ambulatory: "45%",
                        emergency: "50%",
                        inpatient: "39%",
                        outpatient: "47%",
                        urgentcare: "46%",
                        wellness:"50%"
                    },
                    {
                        service: "%Kids",
                        ambulatory: "5%",
                        emergency: "0%",
                        inpatient: "10%",
                        outpatient: "6%",
                        urgentcare: "6%",
                        wellness:"5%"
                    }
                ]
            },
            servicesYearlyData_2020: {
                columns: [
                    {
                        label: 'Service',
                        field: 'service',
                        sort: 'asc',

                    },
                    {
                        label: 'Ambulatory',
                        field: 'ambulatory',
                        sort: 'asc',
                    },
                    {
                        label: 'Emergenecy',
                        field: 'emergency',
                        sort: 'asc',
                    },
                    {
                        label: 'Inpatient',
                        field: 'inpatient',
                        sort: 'asc',
                    },
                    {
                        label: 'Outpatient',
                        field: 'outpatient',
                        sort: 'asc',
                    },
                    {
                        label: 'Urgentcare',
                        field: 'urgentcare',
                        sort: 'asc',
                    },
                    {
                        label: 'Wellness',
                        field: 'wellness',
                        sort: 'asc',
                    }
                ],
                rows: [
                    {
                        service: "Claims Total Cost",
                        ambulatory: "331645",
                        emergency: "41471",
                        inpatient: "97837",
                        outpatient: "100367",
                        urgentcare: "186558",
                        wellness:"540147"

                    },
                    {
                        service: "Member Count",
                        ambulatory: "5331",
                        emergency: "692",
                        inpatient: "1854",
                        outpatient: "3393",
                        urgentcare: "1119",
                        wellness:"4585"
                    },
                    {
                        service: "Average Age",
                        ambulatory: "56",
                        emergency: "62",
                        inpatient: "57",
                        outpatient: "59",
                        urgentcare: "41",
                        wellness:"62"
                    },
                    {
                        service: "%Females",
                        ambulatory: "44%",
                        emergency: "51%",
                        inpatient: "44%",
                        outpatient: "39%",
                        urgentcare: "50%",
                        wellness:"49%"
                    },
                    {
                        service: "%Kids",
                        ambulatory: "5%",
                        emergency: "0%",
                        inpatient: "10%",
                        outpatient: "6%",
                        urgentcare: "7%",
                        wellness:"8%"
                    }
                ]
            },
            claimTotalDiagnosisYrData_2019: {
                columns: [
                    {
                        label: 'Diagnosis',
                        field: 'diagnosis',
                        sort: 'asc',

                    },
                    {
                        label: 'Acute bronchitis (disorder)',
                        field: 'acutebronchitis',
                        sort: 'asc',
                    },
                    {
                        label: 'Acute viral pharyngitis (disorder)',
                        field: 'acuteviralpharyngitis',
                        sort: 'asc',
                    },
                    {
                        label: 'Asthma',
                        field: 'asthma',
                        sort: 'asc',
                    },
                    {
                        label: 'Chronic congestive heart failure (disorder)',
                        field: 'chroniccongestiveheartfailure',
                        sort: 'asc',
                    },
                    {
                        label: 'Hyperlipidemia',
                        field: 'hyperlipidemia',
                        sort: 'asc',
                    },
                    {
                        label: 'Malignant neoplasm of breast (disorder)',
                        field: 'malignantneoplasmofbreast',
                        sort: 'asc',
                    },
                    {
                        label: 'Malignant tumor of colon',
                        field: 'malignanttumorofcolon',
                        sort: 'asc',
                    },
                    {
                        label: 'Normal pregnancy',
                        field: 'normalpregnancy',
                        sort: 'asc',
                    },
                    {
                        label: 'Secondary malignant neoplasm of colon',
                        field: 'secondarymalignantneoplasmofcolon',
                        sort: 'asc',
                    },
                    {
                        label: 'Viral sinusitis (disorder)',
                        field: 'viralsinusitis',
                        sort: 'asc',
                    }
                ],
                rows: [
                    {
                        diagnosis: "Claims Total Cost",
                        acutebronchitis: "13984",
                        acuteviralpharyngitis: "16778",
                        asthma: "7731",
                        chroniccongestiveheartfailure: "34612",
                        hyperlipidemia: "52342",
                        malignantneoplasmofbreast:"100541",
                        malignanttumorofcolon:"10375",
                        normalpregnancy:"32279",
                        secondarymalignantneoplasmofcolon:"9917",
                        viralsinusitis:"30275"
                    },
                    {
                        diagnosis: "Member Count",
                        acutebronchitis: "242",
                        acuteviralpharyngitis: "321",
                        asthma: "141",
                        chroniccongestiveheartfailure: "451",
                        hyperlipidemia: "836",
                        malignantneoplasmofbreast:"1739",
                        malignanttumorofcolon:"201",
                        normalpregnancy:"585",
                        secondarymalignantneoplasmofcolon:"183",
                        viralsinusitis:"535"
                    },
                    {
                        diagnosis: "Average Age",
                        acutebronchitis: "46",
                        acuteviralpharyngitis: "41",
                        asthma: "36",
                        chroniccongestiveheartfailure: "41",
                        hyperlipidemia: "36",
                        malignantneoplasmofbreast:"35",
                        malignanttumorofcolon:"53",
                        normalpregnancy:"22",
                        secondarymalignantneoplasmofcolon:"42",
                        viralsinusitis:"41"
                    },
                    {
                        diagnosis: "%Females",
                        acutebronchitis: "47%",
                        acuteviralpharyngitis: "49%",
                        asthma: "53%",
                        chroniccongestiveheartfailure: "52%",
                        hyperlipidemia: "50%",
                        malignantneoplasmofbreast:"49%",
                        malignanttumorofcolon:"51%",
                        normalpregnancy:"49%",
                        secondarymalignantneoplasmofcolon:"52%",
                        viralsinusitis:"53%"
                    },
                    {
                        diagnosis: "%Kids",
                        acutebronchitis: "2%",
                        acuteviralpharyngitis: "12%",
                        asthma: "11%",
                        chroniccongestiveheartfailure: "10%",
                        hyperlipidemia: "12%",
                        malignantneoplasmofbreast:"2%",
                        malignanttumorofcolon:"9%",
                        normalpregnancy:"0",
                        secondarymalignantneoplasmofcolon:"8%",
                        viralsinusitis:"4%"
                    }
                ]
            },
            claimTotalDiagnosisYrData_2020: {
                columns: [
                    {
                        label: 'Diagnosis',
                        field: 'diagnosis',
                        sort: 'asc',

                    },
                    {
                        label: 'Acute bronchitis (disorder)',
                        field: 'acutebronchitis',
                        sort: 'asc',
                    },
                    {
                        label: 'Acute viral pharyngitis (disorder)',
                        field: 'acuteviralpharyngitis',
                        sort: 'asc',
                    },
                    {
                        label: 'Asthma',
                        field: 'asthma',
                        sort: 'asc',
                    },
                    {
                        label: 'Chronic congestive heart failure (disorder)',
                        field: 'chroniccongestiveheartfailure',
                        sort: 'asc',
                    },
                    {
                        label: 'Hyperlipidemia',
                        field: 'hyperlipidemia',
                        sort: 'asc',
                    },
                    {
                        label: 'Malignant neoplasm of breast (disorder)',
                        field: 'malignantneoplasmofbreast',
                        sort: 'asc',
                    },
                    {
                        label: 'Malignant tumor of colon',
                        field: 'malignanttumorofcolon',
                        sort: 'asc',
                    },
                    {
                        label: 'Normal pregnancy',
                        field: 'normalpregnancy',
                        sort: 'asc',
                    },
                    {
                        label: 'Secondary malignant neoplasm of colon',
                        field: 'secondarymalignantneoplasmofcolon',
                        sort: 'asc',
                    },
                    {
                        label: 'Viral sinusitis (disorder)',
                        field: 'viralsinusitis',
                        sort: 'asc',
                    }
                ],
                rows: [
                    {
                        diagnosis: "Claims Total Cost",
                        acutebronchitis: "14719",
                        acuteviralpharyngitis: "17587",
                        asthma: "6467",
                        chroniccongestiveheartfailure: "13250",
                        hyperlipidemia: "55584",
                        malignantneoplasmofbreast:"108253",
                        malignanttumorofcolon:"13786",
                        normalpregnancy:"25926",
                        secondarymalignantneoplasmofcolon:"8412",
                        viralsinusitis:"29872"
                    },
                    {
                        diagnosis: "Member Count",
                        acutebronchitis: "252",
                        acuteviralpharyngitis: "314",
                        asthma: "124",
                        chroniccongestiveheartfailure: "227",
                        hyperlipidemia: "868",
                        malignantneoplasmofbreast:"1780",
                        malignanttumorofcolon:"274",
                        normalpregnancy:"440",
                        secondarymalignantneoplasmofcolon:"162",
                        viralsinusitis:"558"
                    },
                    {
                        diagnosis: "Average Age",
                        acutebronchitis: "58",
                        acuteviralpharyngitis: "59",
                        asthma: "52",
                        chroniccongestiveheartfailure: "58",
                        hyperlipidemia: "45",
                        malignantneoplasmofbreast:"44",
                        malignanttumorofcolon:"59",
                        normalpregnancy:"32",
                        secondarymalignantneoplasmofcolon:"47",
                        viralsinusitis:"59"
                    },
                    {
                        diagnosis: "%Females",
                        acutebronchitis: "50%",
                        acuteviralpharyngitis: "54%",
                        asthma: "47%",
                        chroniccongestiveheartfailure: "54%",
                        hyperlipidemia: "52%",
                        malignantneoplasmofbreast:"48%",
                        malignanttumorofcolon:"53%",
                        normalpregnancy:"47%",
                        secondarymalignantneoplasmofcolon:"51%",
                        viralsinusitis:"50%"
                    },
                    {
                        diagnosis: "%Kids",
                        acutebronchitis: "2%",
                        acuteviralpharyngitis: "9%",
                        asthma: "5%",
                        chroniccongestiveheartfailure: "5%",
                        hyperlipidemia: "7%",
                        malignantneoplasmofbreast:"3%",
                        malignanttumorofcolon:"11%",
                        normalpregnancy:"0",
                        secondarymalignantneoplasmofcolon:"3%",
                        viralsinusitis:"7%"
                    }
                ]
            }
        }
    }
    componentDidMount() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        this.setState({
            selectedValueforPopulation: "Yearly",
            selctedRisklevelFilterValue:"2020",
            selctedServicesFilterValue: "2020",
            selctedDiagnosisFilterValue: "2020"
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
    risklevelFilterDataChange(day){
        if(day[0] === "0"){
            this.setState({
                selctedRisklevelFilterValue: "2019"
            })
        }else if(day[0] === "1"){
            this.setState({
                selctedRisklevelFilterValue: "2020"
            })
        }
    }
    servicesFilterDataChange(day){
        if(day[0] === "0"){
            this.setState({
                selctedServicesFilterValue: "2019"
            })
        }else if(day[0] === "1"){
            this.setState({
                selctedServicesFilterValue: "2020"
            })
        }
    }
    claimTotalDiagnosisFilterDataChange(day){
        if(day[0] === "0"){
            this.setState({
                selctedDiagnosisFilterValue: "2019"
            })
        }else if(day[0] === "1"){
            this.setState({
                selctedDiagnosisFilterValue: "2020"
            })
        }
    }
    render() {
        const populationGraphData = {
            chart: {
                type: "line",
                height: 320,
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
                    text: 'Claims Total Cost($)'
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
                name: 'Claims Total Cost($)',
                data: [1156664, 1130540, 1170990, 1208010, 1195135]
            }]

        };
        const populationQuarterlyGraphData = {
            chart: {
                height: 320,
                type: 'column'
            },
            colors: ['#536DFE', '#DF2F2F', '#7CB342', '#29B6F6'],
            title: {
                text: 'Stacked column chart'
            },
            xAxis: {
                categories: ['2017', '2018', '2019', '2020', '2021 (Predicted)'],
                title: {
                    text: 'Years'
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Claims Total Cost($)'
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
                name: 'Q1',
                data: [261993, 261484, 265504, 277727, 271456]
            }, {
                name: 'Q2',
                data: [370615, 348471, 366037, 370510, 363996]
            }, {
                name: 'Q3',
                data: [261276, 258352, 271202, 283533, 280729]
            }, {
                name: 'Q4',
                data: [262780, 262234, 268248, 276240, 278955]
            }]
        }
        const populationMonthlyGraphData = {
            chart: {
                type: "line",
                height: 320,
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
                    text: 'Claims Total Cost($)'
                },
                labels: {
                    enabled: false
                }
            },
            plotOptions: {
                series: {
                    lineWidth: 1
                }
            },
            xAxis: {
                categories: ["June 20", "July 20", "Aug 20", "Sep 20", "Oct 20", "Nov 20", "Dec 20", "jan 21", "Feb 21", "3/1/2021(Predicted)", "4/1/2021(Predicted)", "5/1/2021(Predicted)"]
            },
            series: [{
                name: 'Claims Total Cost($)',
                data: [95530, 87924, 88002, 86169, 90813, 90720, 96293, 94169, 91088, 95471, 90779, 92705]
            }]

        };
        const risklevelGraphData = {
            chart: {
                height: 320,
                type: 'column'
            },
            colors: ['#FF8A80', '#F04E30', '#7CB342', '#DF2F2F', '#536DFE'],
            title: {
                text: ''
            },
            xAxis: {
                categories: ['2017', '2018', '2019', '2020', '2021 (Predicted)'],
                title: {
                    text: 'Year'
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Claims Total Cost($)'
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
                name: 'Catastrophic',
                data: [404832, 395689, 409847, 422803, 418297]
            }, {
                name: 'High',
                data: [346699, 339162, 351297, 362403, 358541]
            }, {
                name: 'Medium',
                data: [289166, 282635, 292748, 302002, 298784]
            }, {
                name: 'Low',
                data: [80966, 79138, 81969, 84561, 83659]
            }, {
                name: 'Well',
                data: [34700, 33916, 35130, 36240, 35854]
            }]
        };
        const servicesGraphData = {
            chart: {
                height: 300,
                type: 'column'
            },
            colors: ['#FF8A80', '#F04E30', '#536DFE', '#7CB342', '#F89E1B', '#29B6F6'],
            title: {
                text: ''
            },
            xAxis: {
                categories: ['2017', '2018', '2019', '2020', '2021 (Predicted)'],
                title: {
                    text: 'Year'
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Claims Total Cost($)'
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
                name: 'Wellness',
                data: [542730, 544539, 543634, 540147, 542214]
            }, {
                name: 'Urgentcare',
                data: [168558, 164313, 172405, 186558, 180073]
            }, {
                name: 'Outpatient',
                data: [88018, 89986, 91575, 100367, 104171]
            }, {
                name: 'Inpatient',
                data: [103910, 81553, 98138, 97837, 93134]
            }, {
                name: 'Emergency',
                data: [37317, 37249, 38798, 41471, 39020]
            }, {
                name: 'Ambulatory',
                data: [299800, 291376, 306013, 331645, 321125]
            }]
        };
        const claimTotalDiagnosisGraphData = {
            chart: {
                type: 'column',
                height: 650
            },
            colors: ['#F04E30', '#00897B', '#3A4DB9', '#F89E1B', '#9E9E9E', '#29B6F6', '#FF8A80', '#7CB342', '#536DFE', '#DF2F2F', '#29B6F6'],
            title: {
                text: 'Stacked column chart'
            },
            xAxis: {
                categories: ['2017', '2018', '2019', '2020', '2021 (Predicted)'],
                title: {
                    text: 'Year'
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Claims Total Cost($)'
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
                name: 'Acute bronchitis (disorder)',
                data: [14296, 13515, 14719, 13984, 10096.56]
            }, {
                name: 'Acute viral pharyngitis (disorder)',
                data: [15972, 17604, 17587, 16778, 15168.48]
            }, {
                name: 'Asthma',
                data: [6359, 7031, 6467, 7731, 5954.4]
            }, {
                name: 'Chronic congestive heart failure (disorder)',
                data: [5137, 19129, 13250, 34612, 7296.84]
            }, {
                name: 'Hyperlipidemia',
                data: [45352, 48891, 55584, 52342, 42758.64]
            }, {
                name: 'Malignant neoplasm of breast (disorder)',
                data: [91517, 95535, 108253, 100541, 77877.84]
            }, {
                name: 'Malignant tumor of colon',
                data: [13034, 11805, 13786, 10375, 11396.4]
            }, {
                name: 'Normal pregnancy',
                data: [33257, 33092, 25926, 32279, 16905.72]
            }, {
                name: 'Secondary malignant neoplasm of colon',
                data: [11352, 7538, 8412, 9917, 7004.28]
            }, {
                name: 'Viral sinusitis (disorder)',
                data: [31490, 29025, 29872, 30275, 23560.2]
            }]
        };
        return (
            <React.Fragment>
                <Head>
                    <title>Healthlligence</title>
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
                </Head>
                <Layout>
                    <MDBRow>
                        <MDBCol sm="12" md="12" lg="12" style={{ marginBottom: "16px" }}>
                            <MDBCard style={{ height: "100%" }}>
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol md="10">
                                            {this.state.selectedValueforPopulation === "Yearly" ? <MDBTypography tag="h5" className="card-title"> Yearly Claims Total Cost </MDBTypography> : ""}
                                            {this.state.selectedValueforPopulation === "Quarterly" ? <MDBTypography tag="h5" className="card-title"> Quarterly Claims Total Cost </MDBTypography> : ""}
                                            {this.state.selectedValueforPopulation === "Monthly" ? <MDBTypography tag="h5" className="card-title"> Monthly Claims Total Cost </MDBTypography> : ""}
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
                            <MDBCard style={{ height: "100%" }} className="risklevel-graph">
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol md="10">
                                            <MDBTypography tag="h5" className="card-title"> Claims Total Cost for Different Risk Groups </MDBTypography>
                                        </MDBCol>
                                        <MDBCol md="2" className="measuresdropdown">
                                            <MDBSelect
                                                options={this.state.risklevelFilterData}
                                                // outline
                                                selected={this.state.selctedRisklevelFilterValue}
                                                className="month-right-dropdown1"
                                                getValue={(val) => this.risklevelFilterDataChange(val)}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <br />
                                    <MDBRow>
                                        <MDBCol md="6">
                                            <ReactHighcharts config={risklevelGraphData}></ReactHighcharts>
                                        </MDBCol>
                                        <MDBCol md="6">
                                            <MDBDataTable
                                                small
                                                hover={true}
                                                responsive={true}
                                                paging={false}
                                                searching={false}
                                                className=""
                                                data={this.state.selctedRisklevelFilterValue === "2019" ? this.state.risklevelData_2019 : this.state.risklevelData_2020}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol sm="12" md="12" lg="12" style={{ marginBottom: "16px" }}>
                            <MDBCard style={{ height: "100%" }} className="services-graph">
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol md="10">
                                            <MDBTypography tag="h5" className="card-title"> Claims Total Cost for Different Services </MDBTypography>
                                        </MDBCol>
                                        <MDBCol md="2" className="measuresdropdown">
                                            <MDBSelect
                                                options={this.state.servicesFilterData}
                                                // outline
                                                selected={this.state.selctedServicesFilterValue}
                                                className="month-right-dropdown1"
                                                getValue={(val) => this.servicesFilterDataChange(val)}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <br />
                                    <MDBRow>
                                        <MDBCol md="6">
                                            <ReactHighcharts config={servicesGraphData}></ReactHighcharts>
                                        </MDBCol>
                                        <MDBCol md="6">
                                            <MDBDataTable
                                                small
                                                hover={true}
                                                responsive={true}
                                                paging={false}
                                                searching={false}
                                                className=""
                                                data={this.state.selctedServicesFilterValue === "2019" ? this.state.servicesYearlyData_2019 : this.state.servicesYearlyData_2020}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol sm="12" md="12" lg="12" style={{ marginBottom: "16px" }}>
                            <MDBCard style={{ height: "100%" }} className="diagnosis-graph">
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol md="10">
                                            <MDBTypography tag="h5" className="card-title"> Claims Total Cost for Top 10 Different Diagnoses</MDBTypography>
                                        </MDBCol>
                                        <MDBCol md="2" className="measuresdropdown">
                                            <MDBSelect
                                                options={this.state.claimTotalDiagnosisFilterData}
                                                // outline
                                                selected={this.state.selctedDiagnosisFilterValue}
                                                className="month-right-dropdown1"
                                                getValue={(val) => this.claimTotalDiagnosisFilterDataChange(val)}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <br />
                                    <MDBRow>
                                        <MDBCol md="6">
                                            <ReactHighcharts config={claimTotalDiagnosisGraphData}></ReactHighcharts>
                                        </MDBCol>
                                        <MDBCol md="6">
                                            <MDBDataTable
                                                small
                                                hover={true}
                                                responsive={true}
                                                paging={false}
                                                searching={false}
                                                className=""
                                                data={this.state.selctedDiagnosisFilterValue === "2019" ? this.state.claimTotalDiagnosisYrData_2019 : this.state.claimTotalDiagnosisYrData_2020}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    <style jsx>{UtilizationStyles}</style>
                </Layout>
            </React.Fragment>
        );
    }
};

export default Utilization;

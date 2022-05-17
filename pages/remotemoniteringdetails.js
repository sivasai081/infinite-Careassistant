
import React, { Component } from "react";
import { MDBCard, MDBCardBody, MDBTypography, MDBIcon, MDBDataTable } from "mdbreact";
import Health360Style from '../styles/health360.js';
import Layout from "../components/layout";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Loader from '../components/loader';
import Head from 'next/head'


class RemoteMoniteringDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remotemoniteringdetails: "bloodpressure",
            tab:"",
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
                    },
                    {
                        date: "09/18/2020",
                        systolic: "128",
                        diastolic: "98",
                        warning: "76",
                        danger: "-",
                    },
                    {
                        date: "09/19/2020",
                        systolic: "112",
                        diastolic: "92",
                        warning: "-",
                        danger: "-",
                    },
                    {
                        date: "09/20/2020",
                        systolic: "114",
                        diastolic: "81",
                        warning: "63",
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
                    {
                        label: 'WAKE-UP',
                        field: 'systolic',
                        sort: 'asc',
                    },
                    {
                        label: 'BREAKFAST',
                        field: 'diastolic',
                        sort: 'asc',

                    },
                    {
                        label: 'MID-MORN',
                        field: 'warning',
                        sort: 'asc',
                    },
                    {
                        label: 'LUNCH',
                        field: 'danger',
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
                    },
                    {
                        date: "09/18/2020",
                        systolic: "128",
                        diastolic: "98",
                        warning: "76",
                        danger: "-",
                    },
                    {
                        date: "09/19/2020",
                        systolic: "112",
                        diastolic: "92",
                        warning: "-",
                        danger: "-",
                    },
                    {
                        date: "09/20/2020",
                        systolic: "114",
                        diastolic: "81",
                        warning: "63",
                        danger: "-",
                    }

                ]
            },
            heartratemonitertable: {
                columns: [
                    {
                        label: 'DATE',
                        field: 'date',
                        sort: 'asc',

                    },
                    {
                        label: 'WAKE-UP',
                        field: 'wakeup',
                        sort: 'asc',
                    },
                    {
                        label: 'BREAKFAST',
                        field: 'breakfast',
                        sort: 'asc',

                    },
                    {
                        label: 'MID-MORN',
                        field: 'midmorn',
                        sort: 'asc',
                    },
                    {
                        label: 'LUNCH',
                        field: 'lunch',
                        sort: 'asc',
                    }
                ],
                rows: [

                    {
                        date: "09/14/2020",
                        wakeup: "71",
                        breakfast: "121",
                        midmorn: "82",
                        lunch: "119",
                    },
                    {
                        date: "09/15/2020",
                        wakeup: "61",
                        breakfast: "120",
                        midmorn: "80",
                        lunch: "119",
                    },
                    {
                        date: "09/16/2020",
                        wakeup: "73",
                        breakfast: "112",
                        midmorn: "77",
                        lunch: "120",
                    },
                    {
                        date: "09/17/2020",
                        wakeup: "74",
                        breakfast: "111",
                        midmorn: "84",
                        lunch: "118",
                    },
                    {
                        date: "09/18/2020",
                        wakeup: "78",
                        breakfast: "119",
                        midmorn: "81",
                        lunch: '115',
                    },
                    {
                        date: "09/19/2020",
                        wakeup: "69",
                        breakfast: "117",
                        midmorn: "79",
                        lunch: "116",
                    },
                    {
                        date: "09/20/2020",
                        wakeup: "67",
                        breakfast: "124",
                        midmorn: "78",
                        lunch: "117",
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
                    },
                    {
                        date: "09/18/2020",
                        o2: "14",
                        normal: "93",
                        low: "62",
                        warning: "62",
                        danger: "46"
                    },
                    {
                        date: "09/19/2020",
                        o2: "14",
                        normal: "93",
                        low: "62",
                        warning: "62",
                        danger: ""
                    },
                    {
                        date: "09/20/2020",
                        o2: "14",
                        normal: "93",
                        low: "62",
                        warning: "62",
                        danger: ""
                    },
                    {
                        date: "09/21/2020",
                        o2: "14",
                        normal: "93",
                        low: "62",
                        warning: "62",
                        danger: "46"
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
                    },
                    {
                        date: "9/20/2020",
                        ldl: "158",
                        hdl: "36",
                        cholesterol: "230",
                        triglyc: "199",
                    }
                ]
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
    componentDidMount() {
        let route = localStorage.getItem('remotemoniteringdetails');
        this.setState({ remotemoniteringdetails: route, tab: "first" });
    }

    sortDateClick() {
        this.setState({ tab: "first" })
    };
    sortAlphabeticalClick() {
        this.setState({ tab: "second" })
    };
    sortRiskClick() {
        this.setState({ tab: "third" })
    };

    onHandleSearch(e, search) {
        console.log(e.target.value);
    }



    render() {
        return (
            <React.Fragment>
            <Head>
                <title>Healthlligence</title>
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
            </Head>
            <Layout>
                 {/* <div className="titleAndSort" >
                     <MDBTypography tag="h2" variant="h2-responsive" className="rpm-header-title"></MDBTypography>  */}
                    {/* {this.state.remotemoniteringdetails == "glucosemonitering" ? <MDBTypography tag="h2" variant="h2-responsive" className="rpm-header-title">{`Remote Patient Monitoring > Continuous Glucose Monitoring`}</MDBTypography> : null}
                    {this.state.remotemoniteringdetails == "heartratemoniter" ? <MDBTypography tag="h2" variant="h2-responsive" className="rpm-header-title">{`Remote Patient Monitoring > Daily Heart Rate Monitor`}</MDBTypography> : null}
                    {this.state.remotemoniteringdetails == "oximetryreading" ? <MDBTypography tag="h2" variant="h2-responsive" className="rpm-header-title">{`Remote Patient Monitoring > Daily Oximetry Readings`}</MDBTypography> : null}
                    {this.state.remotemoniteringdetails == "ekgreadings" ? <MDBTypography tag="h2" variant="h2-responsive" className="rpm-header-title">{`Remote Patient Monitoring > EKG Readings`}</MDBTypography> : null}
                    {this.state.remotemoniteringdetails == "Triglycerides" ? <MDBTypography tag="h2" variant="h2-responsive" className="rpm-header-title">{`Remote Patient Monitoring > Total Cholesterol, LDL, HDL and Triglycerides`}</MDBTypography> : null}
                    {this.state.remotemoniteringdetails == "overweightBMI" ? <MDBTypography tag="h2" variant="h2-responsive" className="rpm-header-title">{`Remote Patient Monitoring > Overweight BMI`}</MDBTypography> : null}
                    {this.state.remotemoniteringdetails == "underweightBMI" ? <MDBTypography tag="h2" variant="h2-responsive" className="rpm-header-title">{`Remote Patient Monitoring > Underweight BMI`}</MDBTypography> : null} */}

                    {/* <div className="controls">
                        <div className={this.state.tab == "first" ? "dataHandling active" : "dataHandling"} onClick={this.sortDateClick.bind(this)}><p >Date</p></div>
                        <div className={this.state.tab == "second" ? "dataHandling active" : "dataHandling"} onClick={this.sortAlphabeticalClick.bind(this)}><p >A to Z</p></div>
                        <div className="searchingdiv">
                            <MDBIcon icon="search" className="searchIcon" />
                            <input placeholder="Search" id="searching" className="searching" type="text" onChange={this.onHandleSearch.bind(this)} />
                        </div>
                    </div> */}

                    

                {/* </div>  */}
            <div className="rpm-details-table" style={{maxWidth:"1400px", margin:"0 auto"}}>
                {this.state.remotemoniteringdetails == "bloodpressure" ? 
                            <div className='patients-table'>
                                <div className="titleAndSort" >
                                    <MDBTypography tag="h2"  variant="h2-responsive" className="header-title"></MDBTypography>
                                    <div className="controls">
                                        <div className={this.state.tab == "first" ? "dataHandling active" : "dataHandling"} onClick={this.sortDateClick.bind(this)}><p >Date</p></div>
                                        <div className={this.state.tab == "second" ? "dataHandling active" : "dataHandling"} onClick={this.sortAlphabeticalClick.bind(this)}><p >A to Z</p></div>
                                        <div className="searchingdiv">
                                            <MDBIcon icon="search" className="searchIcon" />
                                            <input placeholder="Search" id="searching" className="searching" type="text" onChange={this.onHandleSearch.bind(this)} />
                                        </div>
                                    </div>
                                </div>
                                <MDBCard narrow>
                                <MDBCardBody cascade style={{marginBottom: "16px"}}>
                                    <MDBDataTable
                                        small
                                        hover={true}
                                        responsive={true}
                                        paging={false}
                                        searching={false}
                                        data={this.state.bloodpressuretable}
                                    />
                                </MDBCardBody>
                                </MDBCard>
                            </div> : "" }
                {this.state.remotemoniteringdetails == "glucosemonitering" ? 
                            <div className='patients-table'>
                                <div className="titleAndSort" >
                                    <MDBTypography tag="h2"  variant="h2-responsive" className="header-title"></MDBTypography>
                                    <div className="controls">
                                        <div className={this.state.tab == "first" ? "dataHandling active" : "dataHandling"} onClick={this.sortDateClick.bind(this)}><p >Date</p></div>
                                        <div className={this.state.tab == "second" ? "dataHandling active" : "dataHandling"} onClick={this.sortAlphabeticalClick.bind(this)}><p >A to Z</p></div>
                                        <div className="searchingdiv">
                                            <MDBIcon icon="search" className="searchIcon" />
                                            <input placeholder="Search" id="searching" className="searching" type="text" onChange={this.onHandleSearch.bind(this)} />
                                        </div>
                                    </div>
                                </div>
                                <MDBCard narrow>
                                <MDBCardBody cascade style={{marginBottom: "16px"}}>
                                    <MDBDataTable
                                        small
                                        hover={true}
                                        responsive={true}
                                        paging={false}
                                        searching={false}
                                        data={this.state.glucosemoniteringtable}
                                    />
                                    </MDBCardBody>
                                </MDBCard>
                            </div> : "" }
                {this.state.remotemoniteringdetails == "heartratemoniter" ? 
                            <div className='patients-table'>
                                <div className="titleAndSort" >
                                    <MDBTypography tag="h2"  variant="h2-responsive" className="header-title"></MDBTypography>
                                    <div className="controls">
                                        <div className={this.state.tab == "first" ? "dataHandling active" : "dataHandling"} onClick={this.sortDateClick.bind(this)}><p >Date</p></div>
                                        <div className={this.state.tab == "second" ? "dataHandling active" : "dataHandling"} onClick={this.sortAlphabeticalClick.bind(this)}><p >A to Z</p></div>
                                        <div className="searchingdiv">
                                            <MDBIcon icon="search" className="searchIcon" />
                                            <input placeholder="Search" id="searching" className="searching" type="text" onChange={this.onHandleSearch.bind(this)} />
                                        </div>
                                    </div>
                                </div>
                                <MDBCard narrow>
                                <MDBCardBody cascade style={{marginBottom: "16px"}}>
                                    <MDBDataTable
                                        small
                                        hover={true}
                                        responsive={true}
                                        paging={false}
                                        searching={false}
                                        data={this.state.heartratemonitertable}
                                    />
                                </MDBCardBody>
                                </MDBCard>
                            </div> : "" }
                {this.state.remotemoniteringdetails == "oximetryreading" ? 
                            <div className='patients-table'>
                                <div className="titleAndSort" >
                                    <MDBTypography tag="h2"  variant="h2-responsive" className="header-title"></MDBTypography>
                                    <div className="controls">
                                        <div className={this.state.tab == "first" ? "dataHandling active" : "dataHandling"} onClick={this.sortDateClick.bind(this)}><p >Date</p></div>
                                        <div className={this.state.tab == "second" ? "dataHandling active" : "dataHandling"} onClick={this.sortAlphabeticalClick.bind(this)}><p >A to Z</p></div>
                                        <div className="searchingdiv">
                                            <MDBIcon icon="search" className="searchIcon" />
                                            <input placeholder="Search" id="searching" className="searching" type="text" onChange={this.onHandleSearch.bind(this)} />
                                        </div>
                                    </div>
                                </div>
                                <MDBCard narrow>
                                <MDBCardBody cascade style={{marginBottom: "16px"}}>
                                    <MDBDataTable
                                        small
                                        hover={true}
                                        responsive={true}
                                        paging={false}
                                        searching={false}
                                        data={this.state.dailyoximetrytable}
                                    />
                                </MDBCardBody>
                                </MDBCard>
                            </div> : "" }
                {this.state.remotemoniteringdetails == "ekgreadings" ? 
                            <div className='patients-table'>
                                <div className="titleAndSort" >
                                    <MDBTypography tag="h2"  variant="h2-responsive" className="header-title"></MDBTypography>
                                    <div className="controls">
                                        <div className={this.state.tab == "first" ? "dataHandling active" : "dataHandling"} onClick={this.sortDateClick.bind(this)}><p >Date</p></div>
                                        <div className={this.state.tab == "second" ? "dataHandling active" : "dataHandling"} onClick={this.sortAlphabeticalClick.bind(this)}><p >A to Z</p></div>
                                        <div className="searchingdiv">
                                            <MDBIcon icon="search" className="searchIcon" />
                                            <input placeholder="Search" id="searching" className="searching" type="text" onChange={this.onHandleSearch.bind(this)} />
                                        </div>
                                    </div>
                                </div>
                                <MDBCard narrow>
                                <MDBCardBody cascade style={{marginBottom: "16px"}}>
                                    <MDBDataTable
                                        small
                                        hover={true}
                                        responsive={true}
                                        paging={false}
                                        searching={false}
                                        data={this.state.ekgreadingtable}
                                    />
                                </MDBCardBody>
                                </MDBCard>
                            </div> : "" }
                {this.state.remotemoniteringdetails == "Triglycerides" ?
                            <div className='patients-table'>
                                <div className="titleAndSort" >
                                    <MDBTypography tag="h2"  variant="h2-responsive" className="header-title"></MDBTypography>
                                    <div className="controls">
                                        <div className={this.state.tab == "first" ? "dataHandling active" : "dataHandling"} onClick={this.sortDateClick.bind(this)}><p >Date</p></div>
                                        <div className={this.state.tab == "second" ? "dataHandling active" : "dataHandling"} onClick={this.sortAlphabeticalClick.bind(this)}><p >A to Z</p></div>
                                        <div className="searchingdiv">
                                            <MDBIcon icon="search" className="searchIcon" />
                                            <input placeholder="Search" id="searching" className="searching" type="text" onChange={this.onHandleSearch.bind(this)} />
                                        </div>
                                    </div>
                                </div>
                                <MDBCard narrow>
                                <MDBCardBody cascade style={{marginBottom: "16px"}}>
                                    <MDBDataTable
                                        small
                                        hover={true}
                                        responsive={true}
                                        paging={false}
                                        searching={false}
                                        data={this.state.datatable}
                                    />
                                </MDBCardBody>
                                </MDBCard>
                            </div> : "" }
                {this.state.remotemoniteringdetails == "underweightBMI" ? 
                            <div className='patients-table'>
                                <div className="titleAndSort" >
                                    <MDBTypography tag="h2"  variant="h2-responsive" className="header-title"></MDBTypography>
                                    <div className="controls">
                                        <div className={this.state.tab == "first" ? "dataHandling active" : "dataHandling"} onClick={this.sortDateClick.bind(this)}><p >Date</p></div>
                                        <div className={this.state.tab == "second" ? "dataHandling active" : "dataHandling"} onClick={this.sortAlphabeticalClick.bind(this)}><p >A to Z</p></div>
                                        <div className="searchingdiv">
                                            <MDBIcon icon="search" className="searchIcon" />
                                            <input placeholder="Search" id="searching" className="searching" type="text" onChange={this.onHandleSearch.bind(this)} />
                                        </div>
                                    </div>
                                </div>
                                <MDBCard narrow>
                                <MDBCardBody cascade style={{marginBottom: "16px"}}>
                                    <MDBDataTable
                                        small
                                        hover={true}
                                        responsive={true}
                                        paging={false}
                                        searching={false}
                                        data={this.state.Underweightbmi}
                                    />
                                </MDBCardBody>
                                </MDBCard>
                            </div> : "" }
                {this.state.remotemoniteringdetails == "overweightBMI" ?
                            <div className='patients-table'>
                                <div className="titleAndSort" >
                                    <MDBTypography tag="h2"  variant="h2-responsive" className="header-title"></MDBTypography>
                                    <div className="controls">
                                        <div className={this.state.tab == "first" ? "dataHandling active" : "dataHandling"} onClick={this.sortDateClick.bind(this)}><p >Date</p></div>
                                        <div className={this.state.tab == "second" ? "dataHandling active" : "dataHandling"} onClick={this.sortAlphabeticalClick.bind(this)}><p >A to Z</p></div>
                                        <div className="searchingdiv">
                                            <MDBIcon icon="search" className="searchIcon" />
                                            <input placeholder="Search" id="searching" className="searching" type="text" onChange={this.onHandleSearch.bind(this)} />
                                        </div>
                                    </div>
                                </div>
                                <MDBCard narrow>
                                <MDBCardBody cascade style={{marginBottom: "16px"}}>
                                    <MDBDataTable
                                        small
                                        hover={true}
                                        responsive={true}
                                        paging={false}
                                        searching={false}
                                        data={this.state.Underweightbmi}
                                    />
                                </MDBCardBody>
                                </MDBCard>
                            </div> : "" }



                <style jsx>{Health360Style}</style>
            </div>

            </Layout >
            </React.Fragment>
        );
    }
};

export default RemoteMoniteringDetails;


import React, { Component } from "react";
import { MDBRow, MDBCol, MDBTypography, MDBSelect, MDBTimeline, MDBTimelineStep, MDBInput, MDBBtn, MDBCard, MDBIcon } from "mdbreact";
import Layout from "../components/layout";
import * as data from '../data/data';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Pagination from '@material-ui/lab/Pagination';
import DashboardDetailStyle from '../styles/dashboarddetails';
import { StaticRouter } from "react-router-dom";
import Head from 'next/head'
import FullCalendar from '../components/FullCalendar';
import Loader from '../components/loader';
import dashboardStyle from '../styles/dashboard';
import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';



class DashboardDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            maxLength: 350,
            selectedAssesment: '',
            dashboardalerts: [],
            dashboardnotestasks: [],
            dashboardappointmenttasks: [],
            assessmentalertsresponse: [],
            assessmentfilteralertsresponse: [],
            tasks: [
                {
                    id: 'task1',
                    title: 'Today',
                    start: new Date().setHours(0, 0, 0),
                    end: new Date().setHours(23, 59, 59),
                    color: 'danger',
                    dark: true,
                    link: true,

                },
                {
                    id: 'task2',
                    title: 'Event',
                    start: new Date().setDate(2),
                    end: new Date().setDate(3),
                    color: 'info',
                    link: true,
                    to: 'test1',
                },
                {
                    id: 'task3',
                    title: 'Task name',
                    start: new Date().setDate(4),
                    end: new Date().setDate(5),
                    color: 'warning',
                    dark: true,
                    link: true,
                    to: 'test2',
                }
            ],
            searchFrom: [
                { text: "All", value: "1" },
                { text: "Call Note", value: "2" },
                { text: "Care Plan", value: "3" },
                { text: "EMR", value: "4" },
                { text: "ICT Note", value: "5" },
            ],
            assessmentlist: [],
            tasksdropdown: [
                { text: "All", value: "1" },
                { text: "ICT Task", value: "2" },
                { text: "Delivery Task", value: "3" },
                { text: "Follow Up Task", value: "3" },
            ],
            fromTo: [
                { text: "All Time", value: "1" },

            ],
            totalCountofrecords: 12,
            pageFrom: 1,
            perPage: 5,
            page: 1,
            searchedText: '',
            notesData: data.notesData.data.slice(0, 4),

        }
    }
    handleSearch = _e => {
        this.setState({ searchedText: _e.target.value }, () => {

            if (this.state.searchedText == "") {
                this.setState({
                    assessmentalertsresponse: this.state.assessmentfilteralertsresponse
                })
            } else {
                const filteredData = this.state.assessmentalertsresponse && this.state.assessmentalertsresponse.filter(value => {
                    const searchStr = this.state.searchedText.toLowerCase();
                    const firstname = value.first_name.toLowerCase().includes(searchStr);
                    const lastname = value.last_name.toLowerCase().includes(searchStr);
                    return firstname || lastname
                });
                this.setState({
                    assessmentalertsresponse: filteredData
                })
            }

        })
    }

    handleSearchAssessment = val => {
        if (val.length > 0) {
            this.setState({ selectedAssesment: val[0] }, () => {
                if (this.state.selectedAssesment == "All") {
                    this.setState({
                        assessmentalertsresponse: this.state.assessmentfilteralertsresponse
                    })
                } else {
                    let filter = this.state.assessmentfilteralertsresponse && this.state.assessmentfilteralertsresponse.filter(el => el.assessments.display_name == this.state.selectedAssesment)
                    this.setState({
                        assessmentalertsresponse: filter
                    })
                }
            })
        }
    }

    handleSearchNote = val => {
        let notes = '';
        if (val[0] === '1') {
            notes = data.notesData.data.slice(0, 12)
        } else {
            notes = data.notesData.data.filter((el) => el.id === val[0])
        }

        this.setState({ notesData: notes })
    }

    handleMonths = val => {
        console.log("months=", val)
    }

    handlePageChange = (e, val) => {
        this.setState({
            pageFrom: ((val * this.state.perPage) - (this.state.perPage - 1)), page: val
        }, () => {
            let pfrom = (this.state.pageFrom - 1);
            let topage = (this.state.page * pfrom);
            this.setState({ notesData: data.notesData.data.slice(pfrom, topage) })

        });
    }


    GFG_sortFunction(a, b) {
        var dateA = new Date(a.date).getTime();
        var dateB = new Date(b.date).getTime();
        return dateA > dateB ? 1 : -1;
    };


    componentDidMount() {
        let patientIds = [];
        let route = localStorage.getItem('dashboarddetails');
        let caremnagerId = localStorage.getItem('caremanagerId');
        this.setState({ dashboarddetails: route, caremnagerId: caremnagerId }, () => {
            axios.get(`/api/getalltasks`, {
                params: {
                    id: caremnagerId
                }
            })
                .then(res => {
                    let notesresponse = res.data.json && res.data.json.notes;
                    this.setState({ dashboardnotestasks: notesresponse });
                })

            axios.get(`/api/fetchtaskappointments`, {
                params: {
                    id: caremnagerId
                }
            })
                .then(res => {
                    let appointmentresponse = res.data.json && res.data.json.details;
                    this.setState({ dashboardappointmenttasks: appointmentresponse });
                })

            axios.get(`/api/fetchassessmentalerts`, {
                params: {
                    id: caremnagerId
                }
            })
                .then(res => {
                    let assessmentalertsresponse = res.data.json.patient_assessments && res.data.json.patient_assessments;
                    this.setState({ assessmentalertsresponse: assessmentalertsresponse, assessmentfilteralertsresponse: assessmentalertsresponse });
                })


        });

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
                    url: `/api/dashboardalerts`,
                    data: obj
                })
                    .then(res => {
                        this.setState({ dashboardalerts: res.data.json.hits.hits, isLoaded: false });
                    })
            })

        axios.get(`/api/assessmentlist`)
            .then(res => {
                this.setState({ assessmentlist: res.data.json.assessment_question_map, isLoaded: false });
            })


        axios({
            method: 'GET',
            url: `/api/appointments`,
            params: {
                id: caremnagerId,
                role: "CAREMANAGER"
            }
        })
            .then(res => {
                this.setState({ allappointments: res.data.json.details, isLoaded: false });
            })


    }


    paginate(array, page_size, page_number) {
        return array.slice((page_number - 1) * page_size, page_number * page_size);
    }

    onTaskClick = (el) => {
        this.setState({ isLoaded: true })
        if (el.type == "Follow Up Task") {
            let data = {
                task_id: el.id
            }
            axios({
                method: 'PUT',
                url: `/api/updateappointmenttask`,
                params: {
                    task_id: el.id
                },
                data: data,
            })
                .then((response) => {
                    this.setState({
                        updateTask: response.data,
                    }, () => {
                        axios.get(`/api/getalltasks`, {
                            params: {
                                id: this.state.caremnagerId
                            }
                        })
                            .then(res => {
                                let notesresponse = res.data.json && res.data.json.notes;
                                this.setState({ dashboardnotestasks: notesresponse });
                            })

                        axios.get(`/api/fetchtaskappointments`, {
                            params: {
                                id: this.state.caremnagerId
                            }
                        })
                            .then(res => {
                                let appointmentresponse = res.data.json && res.data.json.details;
                                this.setState({ dashboardappointmenttasks: appointmentresponse, isLoaded: false });
                            })
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            let data = {
                task_id: el.id
            }
            axios({
                method: 'PUT',
                url: `/api/updateTask`,
                params: {
                    task_id: el.id
                },
                data: data,
            })
                .then((response) => {
                    this.setState({
                        updateTask: response.data,
                    }, () => {
                        axios.get(`/api/getalltasks`, {
                            params: {
                                id: this.state.caremnagerId
                            }
                        })
                            .then(res => {
                                let notesresponse = res.data.json && res.data.json.notes;
                                this.setState({ dashboardnotestasks: notesresponse });
                            })

                        axios.get(`/api/fetchtaskappointments`, {
                            params: {
                                id: this.state.caremnagerId
                            }
                        })
                            .then(res => {
                                let appointmentresponse = res.data.json && res.data.json.details;
                                this.setState({ dashboardappointmenttasks: appointmentresponse, isLoaded: false });
                            })
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    }

    onAlertClick = (ele) => {
        let el = ele._source;
        let data = {
            doc: {
                patient_id: el.patient_id,
                title: el.title,
                description: el.description,
                alert_type: el.alert_type,
                read_status: true,
                status: "",
                created_datetime: el.created_datetime,
                updated_datetime: moment().format("YYYY-MM-DDThh:mm:ss")
            }
        }
        let data1 = {
            id: el.row_id,
            patient_id: el.patient_id,
            title: el.title,
            description: el.description,
            alert_type: el.alert_type,
            read_status: true,
            status: "",
            created_datetime: el.created_datetime,
            updated_datetime: moment().format("YYYY-MM-DDThh:mm:ss")
        }
        axios({
            method: 'POST',
            url: `/api/updatealert`,
            params: {
                id: ele._id,
            },
            data: data,
        })
            .then((response) => {
                this.setState({
                    updatealert: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });


        axios({
            method: 'PUT',
            url: `/api/alertupdate`,
            data: data1,
        })
            .then((response) => {
                this.setState({
                    alertupdate: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });

    }



    render() {
        let appointments = this.state.allappointments;
        let appointmenttasks = appointments && appointments.map((el) => {
            return {
                id: el.id,
                title: moment(el.start_date).format('LT') + " " + el.title,
                start: el.start_date,
                end: el.end_date,
                color: el.appointment_type == "Doctor Appointment" ? "#DB1962" : el.appointment_type == "ICT" ? "#7cb342" : "#536dfe"
            }

        });
        let dashboardalerts = this.state.dashboardalerts;
        let rowslength = this.state.dashboardalerts.length;
        const arrOfObjects = [
            { color: 'elegant-color', title: 'Test', dark: true },
            { color: 'danger-color', title: 'Test1', dark: false },
            { color: 'warning-color', title: 'Meeting', dark: false },
            { color: 'success-color', title: 'Home', dark: false },
            { color: 'info-color', title: 'Lunch', dark: false },
            { color: 'default-color', title: 'Something', dark: false },
            { color: 'primary-color', title: 'Pool', dark: false },
            { color: 'secondary-color', title: 'Footbal', dark: true },
        ];
        let assessmentlist = this.state.assessmentlist;
        let inputAll = [{ text: "ALL", value: "All" }]
        let apiallassessmentnames = assessmentlist && assessmentlist.map((el) => { return ({ text: el.display_name, value: el.display_name }) })
        let allassessmentnames = [...inputAll, ...apiallassessmentnames];
        let arr1 = this.state.dashboardnotestasks.map(pet => ({
            title: pet.title,
            description: pet.notes,
            date: pet.due_date,
            type: "Action Note",
            id: pet.id,
            read_status: pet.read_status
        }));
        let arr2 = this.state.dashboardappointmenttasks && this.state.dashboardappointmenttasks.map(pet => ({
            title: pet.title,
            description: pet.description,
            date: pet.start_date,
            type: "Follow Up Task",
            id: pet.id,
            read_status: pet.caremanager_read_status
        }));

        let response = arr1.concat(arr2);
        let alltasks = response && response.sort(this.GFG_sortFunction);
        let assessmentalertsresponse = this.state.assessmentalertsresponse;


        return (
            <React.Fragment>
                <Head>
                    <title>Healthlligence</title>
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
                </Head>
                <Layout isLoaded={this.state.isLoaded}>
                    <MDBRow className='row search-container' >
                        <MDBCol md="3">
                            {this.state.dashboarddetails == "assessments" ?
                                <MDBSelect
                                    options={allassessmentnames}
                                    className="taskdetailsdropdown"
                                    selected={this.state.selectedAssesment ? this.state.selectedAssesment : "Select an Assessment"}
                                    getValue={(val) => this.handleSearchAssessment(val)}
                                /> : null}


                        </MDBCol>

                        <MDBCol md="4" className="notes-dropdown">
                        </MDBCol>

                        <MDBCol md="5" style={{ textAlign: "right" }}>
                            {this.state.dashboarddetails == "assessments" ?
                                <div class="alert_search_container" style={{ marginTop: "25px" }}>
                                    <MDBIcon icon="search" className="alert_search_icon" style={{ color: "#424242" }} />
                                    <input placeholder="Search" id="searching" className="alert_search_bar" type="text" onChange={(e) => this.handleSearch(e)}></input>
                                </div> :

                                <div class="alert_search_container" style={{ marginTop: "25px" }}>
                                    <MDBIcon icon="search" className="alert_search_icon" style={{ color: "#424242" }} />
                                    <input placeholder="Search" id="searching" className="alert_search_bar" type="text" ></input>
                                </div>
                            }
                        </MDBCol>
                    </MDBRow>



                    {this.state.dashboarddetails == "alerts" ? <MDBRow className="notes-container">
                        <MDBCol md="12">
                            <MDBTimeline>
                                {
                                    this.paginate(dashboardalerts, this.state.perPage, this.state.page).map((el) => {
                                        return (
                                            <MDBTimelineStep inverted color={el._source.read_status ? "grey darken-1" : "danger-color-dark"} icon="bell">
                                                <p>{moment(el._source.created_datetime).format("MM/DD/YYYY, h:mm:ss a")}</p>
                                                <div style={{ marginTop: "8px" }} className="notes-type notes-color1">{el._source.alert_type}</div>
                                                <Link href={el._source.alert_type == "RPM Alert" ? "/remotemonitering" : el._source.alert_type == "New Medication Alert" ? "/health360" : el._source.alert_type == "Hospital Alert" ? "/health360" : el._source.alert_type == "New Diagnosis Alert" ? "/health360" : el._source.alert_type == "New Patient Added Alert" ? "/patientlist" : null}>
                                                    <h5 onClick={() => this.onAlertClick(el)} className={el._source.read_status ? "note-title-read" : "note-title"}>
                                                        {el._source.title}
                                                    </h5>
                                                </Link>
                                                <div className="notes-description">{el._source.description} </div>
                                            </MDBTimelineStep>
                                        )
                                    })
                                }
                            </MDBTimeline>
                        </MDBCol>
                    </MDBRow>
                        : null
                    }
                    {this.state.dashboarddetails == "alerts" ?
                        <MDBRow className="notes-pagination">
                            <MDBCol>
                                <Pagination count={Math.ceil(rowslength / this.state.perPage)} page={this.state.page} color="primary" onChange={this.handlePageChange} />
                            </MDBCol>
                        </MDBRow> : null}
                    {this.state.dashboarddetails == "tasks" ? <MDBRow className="notes-container">
                        <MDBCol md="12">
                            <MDBTimeline>
                                {
                                    alltasks && alltasks.map((el) => {
                                        return (
                                            <MDBTimelineStep inverted color={el.read_status ? "grey darken-1" : "blue accent-3"} icon="tasks">
                                                <p>{moment(el.date).format("MM/DD/YYYY, h:mm:ss a")}  </p>
                                                <div style={{ marginTop: "8px" }} className="notes-type notes-color1">{el.type}</div>
                                                <h5 onClick={() => this.onTaskClick(el)} className={el.read_status ? "note-title-read" : "note-title"}>  {el.title}  </h5>
                                                <div className="notes-description">{el.description} </div>

                                            </MDBTimelineStep>
                                        )
                                    })
                                }
                            </MDBTimeline>
                        </MDBCol>
                    </MDBRow> : null}
                    {this.state.dashboarddetails == "assessments" ? <MDBRow className="notes-container">
                        <MDBCol md="12">
                            <MDBTimeline>
                                {
                                    assessmentalertsresponse && assessmentalertsresponse.map((el) => {
                                        return (
                                            <MDBTimelineStep inverted icon="file-alt" color="red accent-1">
                                                <p>{moment(el.starteddate).format("MM/DD/YYYY, h:mm:ss a")}</p>
                                                <div style={{ marginTop: "8px" }} className="notes-type notes-color5">Assessment Alert</div>
                                                <h5 className="note-title">{el.assessments.display_name + " " + "Due for Patient " + el.first_name + " " + el.last_name}</h5>
                                                <div className="notes-description">{el.progress_percentage + "% Completed"} </div>
                                            </MDBTimelineStep>
                                        )
                                    })
                                }

                            </MDBTimeline>
                        </MDBCol>
                    </MDBRow> : null}

                    {
                        this.state.dashboarddetails == "events" ?
                            <StaticRouter>
                                <MDBRow>
                                    <MDBCol md="12">
                                        <MDBCard style={{ padding: "1rem" }}>
                                            <FullCalendar
                                                defaultView="dayGridMonth"
                                                headerToolbar={{
                                                    left: 'prev,next,today',
                                                    center: 'title',
                                                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                                                }}
                                                selectable={true}
                                                editable={true}
                                                events={appointmenttasks}
                                            />
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                            </StaticRouter> : null
                    }

                    {this.state.isLoaded && <Loader />}
                    <style jsx>{DashboardDetailStyle}</style>
                    <style jsx>{dashboardStyle}</style>

                </Layout>
            </React.Fragment>
        );
    }
};

export default DashboardDetails;

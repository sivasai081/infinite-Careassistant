import React, { Component } from "react";
import Head from 'next/head'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Layout from '../components/layout';
import Link from 'next/link';
import Loader from '../components/loader';
import axios from 'axios';
import { MDBTypography, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBIcon, MDBSelect, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";
import AssessmentListStyle from '../styles/assessmentlist';
import moment from 'moment';



class AssessmentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: 0,
            isLoaded: true,
            showassignAssesmentmodal: false,
            assessmentlist: [],
			health360assessments: [],
            assessment_id: '',
            assessmentDropdown: [
                {
                    text: "Health Risk",
                    value: "1"
                },
                {
                    text: "Post Discharge",
                    value: "2"
                },
                {
                    text: "Diabetes",
                    value: "3"
                }
            ],
            tab: "",
        };
    }

    componentDidMount() {
        let patientId = localStorage.getItem("patientId");
        this.setState({patientId, tab:"first"});
        axios.get(`/api/assessmentlist`)
        .then(res => {
            this.setState({ assessmentlist: res.data.json });
        })

        axios.get(`/api/health360assessment`, {
            params: {
              id: patientId
            }
          })
        .then(res => {
            this.setState({ health360assessments: res.data.json.patient_assessments, isLoaded: false });
        })


    }

    componentDidUpdate(){
        localStorage.setItem("assessment_id", this.state.assessment_id);
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
    assignAssesmenttoggle() {
        this.setState({
            showassignAssesmentmodal: false
        })
    }
    cancelAssesmenttoggle() {
        this.setState({
            showassignAssesmentmodal: false
        })
    }
    saveassignAssesment() {
        this.setState({
            isLoaded: true
        })
        let obj = {
            patient_id: this.state.patientId,
            status: "NEW",
            assessment_id: localStorage.getItem("assignassessmentId"),
            patient_responses: [],
            modifiedon: new Date(),
            updatedby: "",
            progress_percentage: 0,
            completedby: "",
            startedby: "",
            starteddate: new Date(),
            duedate: moment(new Date()).add(21, 'd').format('YYYY-MM-DDTHH:mm:ss'),
            completeddate: moment(new Date()).add(21, 'd').format('YYYY-MM-DDTHH:mm:ss'),
            version: ""
        }
        axios({
            method: 'PATCH',
            url: `/api/assessment`,
            data: obj,
          })
            .then(function (response) { 
                window.location.reload()
                console.log(response);
             })
            .catch(function (response) { console.log(response); });
            this.setState({
                showassignAssesmentmodal: false,
                isLoaded: false
            })
        
    }
    assignAssessmentHandler() {
        this.setState({
            showassignAssesmentmodal: true
        })
    }
    

    

    AssessmentClick(el) {
        this.setState({
            assessment_id : el
        });
    }

    

    hrastart() {
        this.setState({
            assessment_id: "HRA001"
        });
    }

    PDstart() {
        this.setState({
            assessment_id: "PDA001"
        });
    }
    Diabetesstart() {
        this.setState({
            assessment_id: "DIA001"
        });
    }


    Hypertensionstart() {
        this.setState({
            assessment_id: "HTA001"
        });
    }
    Behaviroalhealthstart() {
        this.setState({
            assessment_id: "BHA001"
        });
    }

    handleSelectChange(e) {
        localStorage.setItem("assignassessmentId",  e[0]);
    }
    componentDidUpdate(){
        localStorage.setItem("assessment_id", this.state.assessment_id);
    }
    
    render() {
        let allassessments = this.state.assessmentlist && this.state.assessmentlist.assessment_question_map;
        let patientassessments = this.state.health360assessments;
        let allassessmentsids = allassessments && allassessments.map((el) => el.assessment_id);
        let health360assessments = this.state.health360assessments && this.state.health360assessments.map((el) => el.assessment_id);
        let pendingassignassements = allassessmentsids && allassessmentsids.filter(x => !health360assessments.includes(x));
        let pendingassessments = allassessments && allassessments.filter(item => pendingassignassements.includes(item.assessment_id));
        let assesmentlistdropdown = pendingassessments && pendingassessments.map((el) => {
            return {
                text: el.display_name,
                value: el.assessment_id
            }

        });
        return (
            <React.Fragment>
            <Head>
                <title>Healthlligence</title>
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
            </Head>
                <Layout isLoaded={this.state.isLoaded}>
                    <MDBTypography tag="h4" className="new-assessments">Pending</MDBTypography>
                    {
                        patientassessments && patientassessments.map((el) => {
                            return (
                                <MDBCard style={{ marginTop: "16px" }} className="assesments-cards">
                                    <MDBCardBody>
                                        <MDBRow className="align-items-center">

                                            <MDBCol md="1">
                                                {
                                                    el.assessment_id == "HRA001" ? <img src="/images/hraassessment.png" alt=""  /> : null
                                                }
                                                {
                                                    el.assessment_id == "PDA001" ? <img src="/images/postdischargeassessment.png" alt=""  /> : null
                                                }
                                                {
                                                    el.assessment_id == "DIA001" ? <img src="/images/disclosureassessment.png" alt=""  /> : null
                                                }
                                                {
                                                    el.assessment_id == "HTA001" ? <img src="/images/hypertensionassessment.png" alt=""  /> : null
                                                }

{
                                                    el.assessment_id == "BHA001" ? <img src="/images/Behaviouralhealthassessment.png" alt=""  /> : null
                                                }
                                            </MDBCol>
                                            <MDBCol md="8">
                                               <span className="assessmentName">{el.assessments.display_name}</span>
                                                <span className="assessmentduedate">Due date : {moment(el.duedate).format("MMM Do YY")}</span>
                                            </MDBCol>
                                                
                                                
                                            

                                            <MDBCol md="3">
                                            <Link href={el.assessment_id == "HRA001" ? "/hra" : el.assessment_id == "PDA001" ? "/postdischarge" : el.assessment_id == "DIA001" ? "/diabets" : el.assessment_id == "HTA001" ? "/hypertension" : el.assessment_id == "BHA001" ? "/BehavioralHealth" : null}>
                                                <MDBBtn className="startresume-btn" onClick={this.AssessmentClick.bind(this, el.assessment_id)}> Start</MDBBtn>
                                            </Link>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>
                                </MDBCard>
                            )

                        })
                    }
                    
                     <MDBRow className="align-items-end" style={{ marginTop: "40px", marginBottom: "40px" }}>
                        <MDBCol md="12">
                            <MDBBtn color="" size="" className="details-btn" style={{ marginBottom: "24px" }} onClick={this.assignAssessmentHandler.bind(this)}> Assign Assessment</MDBBtn>

                        </MDBCol>
                    </MDBRow>
                    <div className="assesment-divider">

                    </div>
                    <div className="sorting">
                        <div>
                            <MDBTypography tag="h4" className="history-assessments">History</MDBTypography>
                        </div>
                        <div className="controls">
                            <div className={this.state.tab == "first" ? "dataHandling active" : "dataHandling"} onClick={this.sortDateClick.bind(this)}><p >Date</p></div>
                            <div className={this.state.tab == "second" ? "dataHandling active" : "dataHandling"} onClick={this.sortAlphabeticalClick.bind(this)}><p >A to Z</p></div>
                            <div className="searchingdiv">
                                <MDBIcon icon="search" className="searchIconAssessment" />
                                <input placeholder="Search" id="searching" className="searching" type="text" onChange={this.onHandleSearch.bind(this)} />
                            </div>
                        </div>
                    </div>

                     
                    <MDBCard style={{ marginTop: "16px" }} className="assesments-cards">
                        <MDBCardBody>
                            <MDBRow className="align-items-center">

                                <MDBCol md="1">
                                    <img src="/images/hraassessment.png" alt="" style={{  }} />
                                </MDBCol>
                                <MDBCol md="8">
                                    <span className="assessmentName" style={{color: "#727272", fontWeight: "500"}}>Health Risk Assessment</span>
                                    <span className="assessmentfinisheddate">Completed: July 25th, 2020</span>
                                </MDBCol>

                                <MDBCol md="3">
                                    <Link href="/assessment">
                                        <MDBBtn className="viewdetailbutton" onClick={this.hrastart.bind(this)}> View</MDBBtn>
                                    </Link>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                    

                    {/* Assign Assesment Modal */}
                    <MDBModal isOpen={this.state.showassignAssesmentmodal} toggle={this.assignAssesmenttoggle.bind(this)} className="assignAssesmentModal">
                        <MDBModalHeader className="modaltitle"  toggle={this.assignAssesmenttoggle.bind(this)}>Assign Assessment</MDBModalHeader>
                        <MDBModalBody className="assessmentbodyModal">
                            <MDBRow style={{marginTop: "-20px"}}>
                                <MDBCol md="12" className="assessmentdropdown">
                                    <MDBSelect
                                        options={assesmentlistdropdown}
                                        selected={"Choose an Assessment"}
                                        className="month-right-dropdown"
                                        getValue={(val) => this.handleSelectChange(val)}
                                    />
                                </MDBCol>
                            </MDBRow>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn flat className="flatbutton"  onClick={this.cancelAssesmenttoggle.bind(this)}>Cancel</MDBBtn>
                            <MDBBtn flat className="flatbutton" onClick={this.saveassignAssesment.bind(this)}>save</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>


                    {this.state.isLoaded && <Loader />}
                    <style jsx>{AssessmentListStyle}</style>
                </Layout>
            </React.Fragment>
        );
    }

}

export default AssessmentList;
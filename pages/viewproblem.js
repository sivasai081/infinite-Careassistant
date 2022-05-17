
import React, { Component } from "react";
import { MDBInput, MDBDatePickerV5, MDBCollapse, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBTypography, MDBIcon, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";
import CarePlanStyle from '../styles/careplan.js';
import Health360Style from '../styles/health360.js';
import Layout from "../components/layout";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import axios from 'axios';
import moment from 'moment';
import Head from 'next/head';
import Loader from '../components/loader';
// import MDBFileupload from 'mdb-react-fileupload';



class CarePlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            problems: [],
            newbarriermodal: false,
            newproblemmodal: false,
            newinterventionmodal: false,
            newpatientsactionmodal: false,
            newnotemodal: false,
            evaluationdatemodal: false,
            evaluationdateconfirmationmodal: false,
            evaluationdatehistorymodal: false,
            requestclosingmodal: false,
            requestclosingconfirmationmodal: false,
            closingrequestpendingenable: false,
            cancelclosingrequestmodal: false,
            cancelrequestpendingenable: false,
            newgoalmodal: false,
            barrier: [{
                barrier_statement: ''
            }],
            interventions: [{
                intervention_statement: '',
            }],
            patientAction: [{
                action_statement: ''
            }],
            problemId: '',
            carePlanData: {},
            careProblems: [],


        }
    }
    componentDidMount() {
        axios.get(`/api/riskscore`)
            .then(res => {
                this.setState({ isLoaded: true, riskscorelist: res.data.json.root }, () => {
                    this.setState({
                        riskscorelistcount: this.state.riskscorelist.length
                    });

                });
            })

        axios.get(`/api/health360assessment`)
            .then(res => {
                this.setState({ isLoaded: true, health360assessments: res.data.json.root }, () => {
                    this.setState({
                        health360assessmentscount: this.state.health360assessments.length
                    });

                });
            })
        axios.get(`/api/health360`)
            .then(res => {
                this.setState({
                    health360data: res.data.json.entry, isLoaded: true
                }, () => {
                    let allergies = this.state.health360data.filter(el => el.resource.resourceType == "AllergyIntolerance");
                    let imaging = this.state.health360data.filter(el => el.resource.resourceType == "ImagingStudy");
                    let medications = this.state.health360data.filter(el => el.resource.resourceType == "MedicationRequest");
                    let encounters = this.state.health360data.filter(el => el.resource.resourceType == "Encounter");
                    let claims = this.state.health360data.filter(el => el.resource.resourceType == "Claim");
                    let procedures = this.state.health360data.filter(el => el.resource.resourceType == "Procedure");
                    let conditions = this.state.health360data.filter(el => el.resource.resourceType == "Condition");
                    let observations = this.state.health360data.filter(el => el.resource.resourceType == "Observation");
                    let immunization = this.state.health360data.filter(el => el.resource.resourceType == "Immunization");
                    let patientdata = this.state.health360data.filter(el => el.resource.resourceType == "Patient")
                    let allergiescount = this.state.health360data.filter(el => el.resource.resourceType == "AllergyIntolerance").length;
                    let conditionscount = this.state.health360data.filter(el => el.resource.resourceType == "Condition").length;
                    let encounterscount = this.state.health360data.filter(el => el.resource.resourceType == "Encounter").length;
                    let medicationscount = this.state.health360data.filter(el => el.resource.resourceType == "MedicationRequest").length;
                    let observationscount = this.state.health360data.filter(el => el.resource.resourceType == "Observation").length;
                    let imagingcount = this.state.health360data.filter(el => el.resource.resourceType == "ImagingStudy").length;
                    let Immunizationscount = this.state.health360data.filter(el => el.resource.resourceType == "Immunization").length;
                    let Procedurescount = this.state.health360data.filter(el => el.resource.resourceType == "Procedure").length;
                    this.setState({
                        conditionscount,
                        encounterscount,
                        medicationscount,
                        observationscount,
                        imagingcount,
                        imaging,
                        Immunizationscount,
                        Procedurescount,
                        patientdata,
                        procedures,
                        immunization,
                        observations,
                        conditions,
                        claims,
                        encounters,
                        medications,
                        allergies,
                        allergiescount,
                        isLoaded: false
                    });
                });
            })
            .catch((error) => {
                this.setState({ isLoaded: true });

            })
        axios.get(`/api/careplan`)
            .then(res => {

                let problemsList = [];
                res.data.json.problems.map((el) => {
                    problemsList.push(el.problem_statement)
                })

                this.setState({
                    isLoaded: true,
                    carePlanData: res.data.json,
                    problems: problemsList.reverse(),
                    problemId: 0,
                    careProblems: res.data.json.problems[problemsList.length - 1]
                });
            })

    }

    //Barrier Modal functions
    addnewbarrier() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.setState({
            newbarriermodal: true
        });
    }
    newbarriertoggle = () => {
        this.setState({
            newbarriermodal: !this.state.newbarriermodal
        });
    }

    //intervention Modal functions
    addnewintervention() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.setState({
            newinterventionmodal: true
        });
    }
    newinterventiontoggle = () => {
        this.setState({
            newinterventionmodal: !this.state.newinterventionmodal
        });
    }

    //evaluation Modal functions
    changeevaluationDate = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.setState({
            evaluationdatemodal: true
        });
    }
    evaluationdatetoggle = () => {
        this.setState({
            evaluationdatemodal: !this.state.evaluationdatemodal
        });
    }

    //evaluation Comfirmation modal functions
    changeReevaluationDate = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.setState({
            evaluationdateconfirmationmodal: true, evaluationdatemodal: false
        });
    }
    evaluationdateconfirmationtoggle = () => {
        this.setState({
            evaluationdateconfirmationmodal: !this.state.evaluationdateconfirmationmodal,

        });
    }

    //evaluationdate history

    evaluationdatehistory = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.setState({
            evaluationdatehistorymodal: true
        });
    }
    evaluationdatehistorytoggle = () => {
        this.setState({
            evaluationdatehistorymodal: !this.state.evaluationdatehistorymodal,

        });
    }

    //Patient Action Modal functions
    addnewpatientsaction() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.setState({
            newpatientsactionmodal: true
        });
    }
    newpatientsactiontoggle = () => {
        this.setState({
            newpatientsactionmodal: !this.state.newpatientsactionmodal
        });
    }

    //Note Modal functions
    addnewnote() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.setState({
            newnotemodal: true
        });
    }
    newnotetoggle = () => {
        this.setState({
            newnotemodal: !this.state.newnotemodal
        });
    }

    createnewgoalmodal() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.setState({
            newgoalmodal: true
        });
    }

    createnewgoaltoggle = () => {
        this.setState({
            newgoalmodal: !this.state.newgoalmodal
        });
    }

    //Problem Modal functions
    addnewproblem() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.setState({
            newproblemmodal: true
        });
    }
    newproblemtoggle = () => {
        this.setState({
            newproblemmodal: !this.state.newproblemmodal
        });
    }

    //Request closing
    requestclosing() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.setState({
            requestclosingmodal: true
        });
    }
    requestclosingtoggle = () => {
        this.setState({
            requestclosingmodal: !this.state.requestclosingmodal
        });
    }

    //Requestclosingconfirmation

    saverequestClosing() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.setState({
            requestclosingconfirmationmodal: true, requestclosingmodal: false
        });
    }
    requestclosingconfirmationtoggle = () => {
        this.setState({
            requestclosingconfirmationmodal: !this.state.requestclosingconfirmationmodal
        });
    }

    confirmRequestClosing() {
        this.setState({
            closingrequestpendingenable: true, requestclosingconfirmationmodal: false, cancelrequestpendingenable: false
        })
    }

    cancelrequestclosing() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.setState({
            cancelclosingrequestmodal: true
        });
    }

    savecancelrequestclosing() {
        this.setState({
            cancelrequestpendingenable: true, cancelclosingrequestmodal: false, closingrequestpendingenable: false
        });
    }

    cancelclosingrequestoggle = () => {
        this.setState({
            cancelclosingrequestmodal: !this.state.cancelclosingrequestmodal
        });
    }

    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));

    handlegoalchnage = (e) => {
        this.setState({
            goaldescription: e.target.value
        });
    }

    handlereevaluationdatechange = (value) => {
        this.setState({
            reevaluationdate: value
        });
    }

    addBarrier = () => {
        let barrier = this.state.barrier;
        let newBarrier = { barrier_statement: '' }
        barrier.push(newBarrier);
        this.setState({ barrier }, () => {

        })
    }
    handleBarrierChange = (e, i) => {
        let barrier = [...this.state.barrier]
        barrier[i].barrier_statement = e.target.value;
        this.setState({ barrier })
    }

    addInterventions = () => {
        let interventions = this.state.interventions;
        let newIntervention = { intervention_statement: '' }
        interventions.push(newIntervention);
        this.setState({ interventions }, () => {

        })
    }

    handleInterventionChange = (e, i) => {
        let interventions = [...this.state.interventions]
        interventions[i].intervention_statement = e.target.value;
        this.setState({ interventions })
    }

    addPatientAction = () => {
        let patientAction = this.state.patientAction;
        let newPatient = { action_statement: '' }
        patientAction.push(newPatient);
        this.setState({ patientAction }, () => {

        })
    }
    handlePatientChange = (e, i) => {
        let patientAction = [...this.state.patientAction]
        patientAction[i].action_statement = e.target.value;
        this.setState({ patientAction })
    }

    handleproblem = inc => {
        this.setState({
            problemId: inc,
            careProblems: this.state.carePlanData.problems[inc]
        });
    }

    savenewBarrier = inc =>{
        
    }

    render() {
        return (
            <React.Fragment>
            <Head>
                <title>Healthlligence</title>
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
            </Head>
            <Layout isLoaded={this.state.isLoaded}>

                <MDBTypography tag="h2" className="header-title">Careplan</MDBTypography>
                <MDBRow>
                    <MDBCol md="2">
                        <MDBTypography tag="h6" className="problems">Problems</MDBTypography>
                        {
                            this.state.problems.map((el, i) => {
                                return (
                                    <MDBCard>
                                        <MDBCardBody className={`${this.state.problemId === i ? 'activeproblemcard' : 'problemscard'}`} onClick={() => this.handleproblem(i)}>
                                            <MDBTypography tag="h6" variant="h6-responsive" className={`${this.state.problemId === i ? 'activeproblemname' : 'problemsname'}`}> {el}
                                            </MDBTypography>
                                            
                                        </MDBCardBody>
                                    </MDBCard>
                                )
                            })
                        }

                        {/* <MDBCard >
                            <MDBCardBody className="activeproblemcard">
                                <MDBTypography tag="h6" variant="h6-responsive" className="activeproblemname"> New Problem
              </MDBTypography>
                            </MDBCardBody>
                        </MDBCard> */}
                        <MDBBtn color="primary" md="sm" className="buttonstyle" onClick={this.addnewproblem.bind(this)}> Add new problems</MDBBtn>



                    </MDBCol>

                    <MDBCol md="10">
                        <div className="tengrid-container view">
                            <MDBRow>
                                <MDBCol>
                                    <MDBCard>
                                        <div className="hoverable">
                                            <MDBCardBody>
                                                <div className="icons color-1">
                                                    <MDBIcon icon="poll" className="white-text" />
                                                </div>
                                                <MDBTypography
                                                    tag="h6"
                                                    variant="h6-responsive"
                                                    className="align-center kpilabel"
                                                >
                                                    Conditions
              </MDBTypography>
                                                <MDBTypography
                                                    tag="h4"
                                                    variant="h4-responsive"
                                                    className="align-center counter-text"
                                                >
                                                    {this.state.conditionscount == undefined ? "-" : this.state.conditionscount}
                                                </MDBTypography>
                                            </MDBCardBody>
                                        </div>
                                    </MDBCard>
                                </MDBCol>

                                <MDBCol>
                                    <MDBCard>
                                        <div className="hoverable">
                                            <MDBCardBody>
                                                <div className="icons color-2">
                                                    <MDBIcon icon="exchange-alt" className="white-text" />
                                                </div>
                                                <MDBTypography
                                                    tag="h6"
                                                    variant="h6-responsive"
                                                    className="align-center kpilabel"
                                                >
                                                    Encounters
              </MDBTypography>
                                                <MDBTypography
                                                    tag="h4"
                                                    variant="h4-responsive"
                                                    className="align-center counter-text"
                                                >
                                                    {this.state.encounterscount == undefined ? "-" : this.state.encounterscount}
                                                </MDBTypography>
                                            </MDBCardBody>
                                        </div>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol>
                                    <MDBCard>
                                        <div className="hoverable">
                                            <MDBCardBody>
                                                <div className="icons color-3">
                                                    <MDBIcon icon="exclamation-triangle" className="white-text" />
                                                </div>
                                                <MDBTypography
                                                    tag="h6"
                                                    variant="h6-responsive"
                                                    className="align-center kpilabel"
                                                >
                                                    Risk Score
              </MDBTypography>
                                                <MDBTypography
                                                    tag="h4"
                                                    variant="h4-responsive"
                                                    className="align-center counter-text"
                                                >
                                                    {this.state.riskscorelistcount == undefined ? "-" : this.state.riskscorelistcount}

                                                </MDBTypography>
                                            </MDBCardBody>
                                        </div>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol>
                                    <MDBCard>
                                        <div className="hoverable">
                                            <MDBCardBody>
                                                <div className="icons color-4">
                                                    <MDBIcon
                                                        icon="prescription-bottle-alt"
                                                        className="white-text"
                                                    />
                                                </div>
                                                <MDBTypography
                                                    tag="h6"
                                                    variant="h6-responsive"
                                                    className="align-center kpilabel"
                                                >
                                                    Medications
              </MDBTypography>
                                                <MDBTypography
                                                    tag="h4"
                                                    variant="h4-responsive"
                                                    className="align-center counter-text"
                                                >
                                                    {this.state.medicationscount == undefined ? "-" : this.state.medicationscount}
                                                </MDBTypography>
                                            </MDBCardBody>
                                        </div>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol>
                                    <MDBCard>
                                        <div className="hoverable">
                                            <MDBCardBody>
                                                <div className="icons color-5">
                                                    <MDBIcon icon="check" className="white-text" />
                                                </div>
                                                <MDBTypography
                                                    tag="h6"
                                                    variant="h6-responsive"
                                                    className="align-center kpilabel"
                                                >
                                                    Observations
              </MDBTypography>
                                                <MDBTypography
                                                    tag="h4"
                                                    variant="h4-responsive"
                                                    className="align-center counter-text"
                                                >
                                                    {this.state.observationscount == undefined ? "-" : this.state.observationscount}
                                                </MDBTypography>
                                            </MDBCardBody>
                                        </div>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol>
                                    <MDBCard>
                                        <div className="hoverable">
                                            <MDBCardBody>
                                                <div className="icons color-6">
                                                    <MDBIcon icon="image" className="white-text" />
                                                </div>
                                                <MDBTypography
                                                    tag="h6"
                                                    variant="h6-responsive"
                                                    className="align-center kpilabel"
                                                >
                                                    Imaging
              </MDBTypography>
                                                <MDBTypography
                                                    tag="h4"
                                                    variant="h4-responsive"
                                                    className="align-center counter-text"
                                                >
                                                    {this.state.imagingcount == undefined ? "-" : this.state.imagingcount}
                                                </MDBTypography>
                                            </MDBCardBody>
                                        </div>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol>
                                    <MDBCard>
                                        <div className="hoverable">
                                            <MDBCardBody>
                                                <div className="icons color-7">
                                                    <MDBIcon icon="file-alt" className="white-text" />
                                                </div>
                                                <MDBTypography
                                                    tag="h6"
                                                    variant="h6-responsive"
                                                    className="align-center kpilabel"
                                                >
                                                    Assessment
              </MDBTypography>
                                                <MDBTypography
                                                    tag="h4"
                                                    variant="h4-responsive"
                                                    className="align-center counter-text"
                                                >
                                                    {this.state.health360assessmentscount == undefined ? "-" : this.state.health360assessmentscount}


                                                </MDBTypography>
                                            </MDBCardBody>
                                        </div>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol>
                                    <MDBCard>
                                        <div className="hoverable">
                                            <MDBCardBody>
                                                <div className="icons color-8">
                                                    <MDBIcon icon="ban" className="white-text" />
                                                </div>
                                                <MDBTypography
                                                    tag="h6"
                                                    variant="h6-responsive"
                                                    className="align-center kpilabel"
                                                >
                                                    Allergies
              </MDBTypography>
                                                <MDBTypography
                                                    tag="h4"
                                                    variant="h4-responsive"
                                                    className="align-center counter-text"
                                                >
                                                    {this.state.allergiescount == undefined ? "-" : this.state.allergiescount}
                                                </MDBTypography>
                                            </MDBCardBody>
                                        </div>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol>
                                    <MDBCard>
                                        <div className="hoverable">
                                            <MDBCardBody>
                                                <div className="icons color-9">
                                                    <MDBIcon icon="plus-square" className="white-text" />
                                                </div>
                                                <MDBTypography
                                                    tag="h6"
                                                    variant="h6-responsive"
                                                    className="align-center kpilabel"
                                                >
                                                    Immunization
              </MDBTypography>
                                                <MDBTypography
                                                    tag="h4"
                                                    variant="h4-responsive"
                                                    className="align-center counter-text"
                                                >
                                                    {this.state.Immunizationscount == undefined ? "-" : this.state.Immunizationscount}
                                                </MDBTypography>
                                            </MDBCardBody>
                                        </div>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol>
                                    <MDBCard>
                                        <div className="hoverable">
                                            <MDBCardBody>
                                                <div className="icons color-10">
                                                    <MDBIcon icon="hospital" className="white-text" />
                                                </div>
                                                <MDBTypography
                                                    tag="h6"
                                                    variant="h6-responsive"
                                                    className="align-center kpilabel"
                                                >
                                                    Procedures
              </MDBTypography>
                                                <MDBTypography
                                                    tag="h4"
                                                    variant="h4-responsive"
                                                    className="align-center counter-text"
                                                >
                                                    {this.state.Procedurescount == undefined ? "-" : this.state.Procedurescount}
                                                </MDBTypography>
                                            </MDBCardBody>
                                        </div>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                        </div>
                        <MDBCard>
                            <MDBCardBody style={{ display: "flex", boxShadow: "2px 0 2px 0 rgba(0,0,0,0.3)" }}>
                                <MDBRow>
                                    <p className="caredetails">Case Number <span> 09001234</span></p>
                                    <p className="caredetails">Owner <span> Iva Mendez_CM</span></p>
                                    <p className="caredetails">Co-Owner <span> Micheal Keegan</span></p>
                                    <p className="caredetails">Status <span> Open</span></p>
                                    <p className="caredetails">Created Date <span> 06/08/2020</span></p>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>

                        {this.state.careProblems && this.state.careProblems.goals && this.state.careProblems.goals.map((gol, inc) => {
                         return(
                         <>   
                        <MDBRow>
                            <MDBCol md="12">
                                <MDBCard>
                                    <MDBCardBody>
                                        <p className="newproblemtitle">{`${this.state.careProblems ? this.state.careProblems.problem_statement : 'New Problem'}`} <span style={{ color: "#DB1B60", fontSize: "12px" }}>{this.state.closingrequestpendingenable ? "Closing Request Pending" : null}{this.state.cancelrequestpendingenable ? "Cancel Request Pending" : null}</span></p>
                                      
                                                <MDBRow>
                                                    <MDBCol md="2">
                                                      <MDBTypography tag="h3" className="goaltitle">Goal #{inc+1}</MDBTypography>
                                                    </MDBCol>
                                                    <MDBCol md="10" className="goalInformation">
                                                        <p className="goalcreator">{moment(gol.evaluation_date).format("MMM DD YYYY")} by Care Manager</p>
                                                        <p className="goaldescription">{gol.goal_statement}</p>
                                                         <p className="goalevaluationdatelabel">Re-evaluation Date <span className="goalevaluationdate">{moment(gol.evaluation_date).format("MMM DD YYYY")}</span> {this.state.careProblems.goal_history.length ? <span className="edited">Edited</span>:'' } <span className="goalevaluationdate"> <MDBIcon icon="pencil-alt" onClick={this.changeevaluationDate.bind(this)} /></span>{this.state.careProblems.goal_history.length ? <span className="goalevaluationdate" onClick={this.evaluationdatehistory.bind(this)}>   SEE HISTORY</span>:''}</p>
                                                    </MDBCol>
                                                </MDBRow>
                                         
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>

                            <MDBCol md="4">
                                <MDBCard>
                                    <MDBCardBody>
                                        {this.state.careProblems.goals && this.state.careProblems.goals[inc].barriers && this.state.careProblems.goals[inc].barriers.map((barer, i) => {
                                            return (
                                                <>
                                                    <MDBTypography tag="h3" className="barriertitle">Barrier #{i + 1}</MDBTypography>
                                                    <p onClick={this.toggleCollapse(`barrier${i + 1}`)}> March 3, 2020 by Care Manager  <span style={{ float: "right" }}><i className={this.state.collapseID === `barrier${i + 1}` ? "fa fa-angle-down rotate-icon" : "fa fa-angle-down "} /></span> </p>
                                                    <hr />
                                                    <MDBCollapse id={`barrier${i + 1}`} isOpen={this.state.collapseID}>
                                                        <MDBCardBody style={{ padding: "0px" }}> {barer.barrier_statement}</MDBCardBody>
                                                    </MDBCollapse>
                                                </>
                                            );
                                        })}
                                        <div className="text-center">
                                            <MDBBtn color="primary" className="viewaddbarrier-button" onClick={this.addnewbarrier.bind(this)}>Add Barrier</MDBBtn>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>


                            <MDBCol md="4">
                                <MDBCard>
                                    <MDBCardBody>
                                        {this.state.careProblems.goals && this.state.careProblems.goals[inc].interventions && this.state.careProblems.goals[inc].interventions.map((inv, i) => {
                                            return (
                                                <>
                                                    <MDBTypography tag="h3" className="interventiontitle">Intervention #{i + 1}</MDBTypography>
                                                    <p onClick={this.toggleCollapse(`intervention${i + 1}`)}> March 3, 2020 by Care Manager  <span style={{ float: "right" }}><i className={this.state.collapseID === `intervention${i + 1}` ? "fa fa-angle-down rotate-icon" : "fa fa-angle-down "} /></span> </p>
                                                    <hr />
                                                    <MDBCollapse id={`intervention${i + 1}`} isOpen={this.state.collapseID}>
                                                        <MDBCardBody style={{ padding: "0px" }}>{inv.intervention_statement}</MDBCardBody>
                                                    </MDBCollapse>
                                                </>
                                            );
                                        })}

                                        <div className="text-center">
                                            <MDBBtn color="primary" className="viewaddintervention-button" onClick={this.addnewintervention.bind(this)}>Add Intervention</MDBBtn>
                                        </div>

                                        <br /><br />

                                        {this.state.careProblems.goals && this.state.careProblems.goals[inc].patient_actions && this.state.careProblems.goals[inc].patient_actions.map((pact, i) => {
                                            return (
                                                <>
                                                    <MDBTypography tag="h3" className="patientactiontitle">Patient Action #{i + 1}</MDBTypography>

                                                    <p onClick={this.toggleCollapse(`patientaction${i + 1}`)}> March 3, 2020 by Care Manager  <span style={{ float: "right" }}><i className={this.state.collapseID === `patientaction${i + 1}` ? "fa fa-angle-down rotate-icon" : "fa fa-angle-down "} /></span> </p>
                                                    <hr />
                                                    <MDBCollapse id={`patientaction${i + 1}`} isOpen={this.state.collapseID}>
                                                        <MDBCardBody style={{ padding: "0px" }}>{pact.action_statement}</MDBCardBody>
                                                    </MDBCollapse>
                                                </>
                                            );
                                        })}

                                        <div className="text-center">
                                            <MDBBtn color="primary" className="viewpatientaction-button" onClick={this.addnewpatientsaction.bind(this)}>Add Patient's Action</MDBBtn>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>

                            <MDBCol md="4">
                                <MDBCard>
                                    <MDBCardBody>
                                        {this.state.careProblems.goals && this.state.careProblems.goals[inc].goal_notes && this.state.careProblems.goals[inc].goal_notes.map((gnot, i) => {
                                            return (
                                                <>
                                                    <MDBTypography tag="h3" className="goaltitle">Note #{i + 1}</MDBTypography>

                                                    <p onClick={this.toggleCollapse(`note${i + 1}`)}> {moment(gnot.note_date).format("MMM DD YYYY")} by Care Manager  <span style={{ float: "right" }}><i className={this.state.collapseID === `note${i + 1}` ? "fa fa-angle-down rotate-icon" : "fa fa-angle-down "} /></span> </p>
                                                    <hr />
                                                    <MDBCollapse id={`note${i + 1}`} isOpen={this.state.collapseID}>
                                                        <MDBCardBody style={{ padding: "0px" }}>{gnot.goal_note}</MDBCardBody>
                                                    </MDBCollapse>
                                                </>
                                            );
                                        })}


                                        <div className="text-center">
                                            <MDBBtn color="primary" className="viewaddnote-button" onClick={this.addnewnote.bind(this)}>Add Note</MDBBtn>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>


                        {/* Barrier Modal */}
                        <MDBModal isOpen={this.state.newbarriermodal} toggle={this.newbarriertoggle} className="newproblemmodal">
                            <MDBModalHeader className="modaltitle" toggle={this.newbarriertoggle}>Add Barrier</MDBModalHeader>
                            <MDBModalBody className="newproblemmodalbody">
                                <MDBTypography tag="h3" className="modalbarriertitle">Barrier #2</MDBTypography>
                                <MDBRow>
                                    <MDBCol md="12">
                                        <div className="goalcardbody">
                                            <MDBInput type="textarea" label="please write the barrier"></MDBInput>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn flat className="flatbutton" onClick={this.newbarriertoggle}>Cancel</MDBBtn>
                                <MDBBtn flat className="flatbutton" onClick={()=>this.savenewBarrier(inc)}>save</MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>

                         {/* Patients action Modal */}
                <MDBModal isOpen={this.state.newpatientsactionmodal} toggle={this.newpatientsactiontoggle} className="newproblemmodal">
                    <MDBModalHeader className="modaltitle" toggle={this.newpatientsactiontoggle}>Add Patient Action</MDBModalHeader>
                    <MDBModalBody className="newproblemmodalbody">
                        <MDBTypography tag="h3" className="modalbarriertitle">Patinet Action #2</MDBTypography>
                        <MDBRow>
                            <MDBCol md="12">
                                <div className="goalcardbody">
                                    <MDBInput type="textarea" label="please write the action"></MDBInput>
                                </div>

                            </MDBCol>
                        </MDBRow>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn flat className="flatbutton" onClick={this.newpatientsactiontoggle}>Cancel</MDBBtn>
                        <MDBBtn flat className="flatbutton">save</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>

                 {/* Note Modal */}
                 <MDBModal isOpen={this.state.newnotemodal} toggle={this.newnotetoggle} className="newproblemmodal">
                    <MDBModalHeader className="modaltitle" toggle={this.newnotetoggle}>Add Note</MDBModalHeader>
                    <MDBModalBody className="newproblemmodalbody">
                        <MDBTypography tag="h3" className="modalbarriertitle">Note #2</MDBTypography>
                        <MDBRow>
                            <MDBCol md="12">
                                <div className="goalcardbody">
                                    <MDBInput type="textarea" label="please write the action"></MDBInput>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn flat className="flatbutton" onClick={this.newnotetoggle}>Cancel</MDBBtn>
                        <MDBBtn flat className="flatbutton">save</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>

                {/* Intervention Modal */}
                <MDBModal isOpen={this.state.newinterventionmodal} toggle={this.newinterventiontoggle} className="newproblemmodal">
                    <MDBModalHeader className="modaltitle" toggle={this.newinterventiontoggle}>Add Intervention</MDBModalHeader>
                    <MDBModalBody className="newproblemmodalbody">
                        <MDBTypography tag="h3" className="modalbarriertitle">Intervention #2</MDBTypography>
                        <MDBRow>
                            <MDBCol md="12">
                                <div className="goalcardbody">
                                    <MDBInput type="textarea" label="please write the task"></MDBInput>
                                </div>

                            </MDBCol>
                        </MDBRow>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn flat className="flatbutton" onClick={this.newinterventiontoggle}>Cancel</MDBBtn>
                        <MDBBtn flat className="flatbutton">save</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>

                        </>

                         );

                    })}

                        <MDBRow className="" style={{ float: "right", marginTop: "50px" }}>
                            {
                                this.state.closingrequestpendingenable ? <MDBBtn color="blue-grey" className="problemcancel-button" onClick={this.cancelrequestclosing.bind(this)}>Cancel Request</MDBBtn> : <MDBBtn color="blue-grey" className="problemcancel-button" onClick={this.requestclosing.bind(this)}>Request Closing</MDBBtn>
                            }
                            <MDBBtn color="primary" className="addnewgoal-button" onClick={this.createnewgoalmodal.bind(this)}>Add new goal</MDBBtn>


                        </MDBRow>

                    </MDBCol>

                </MDBRow>

                {/* Problem Modal */}
                <MDBModal isOpen={this.state.newproblemmodal} toggle={this.newproblemtoggle} className="newproblemmodal">
                    <MDBModalHeader className="modaltitle" toggle={this.newproblemtoggle}>New Problem</MDBModalHeader>
                    <MDBModalBody className="newproblemmodalbody">
                        <MDBInput label="Problem Name" size="lg" />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn flat className="flatbutton" onClick={this.newproblemtoggle}>Cancel</MDBBtn>
                        <MDBBtn flat className="flatbutton">save</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>

                

               

               
                {/* Re evaluation date Modal */}
                <MDBModal isOpen={this.state.evaluationdatemodal} toggle={this.evaluationdatetoggle} className="newproblemmodal">
                    <MDBModalHeader className="modaltitle" toggle={this.evaluationdatetoggle}>Change Re-evaluation Date</MDBModalHeader>
                    <MDBModalBody className="newproblemmodalbody">
                        <MDBRow>
                            <MDBCol md="12">
                                <div className="goalcardbody">
                                    <MDBInput type="textarea" label="please write the Reason"></MDBInput>
                                </div>

                            </MDBCol>
                        </MDBRow>

                        <MDBRow>
                            <MDBCol md="12">
                                <MDBDatePickerV5 theme="danger" valueDefault={null} getValue={(e) => console.log(e)} />
                            </MDBCol>
                        </MDBRow>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn flat className="flatbutton" onClick={this.evaluationdatetoggle}>Cancel</MDBBtn>
                        <MDBBtn flat className="flatbutton" onClick={this.changeReevaluationDate.bind(this)}>save</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>

                {/* Re evaluation date Confirmation Modal */}
                <MDBModal isOpen={this.state.evaluationdateconfirmationmodal} toggle={this.evaluationdateconfirmationtoggle} className="newproblemmodal">
                    <MDBModalHeader className="modaltitle" toggle={this.evaluationdateconfirmationtoggle}>Confirmation</MDBModalHeader>
                    <MDBModalBody className="newproblemmodalbody">
                        <p className="confirmationmodalmessage">Are you sure you want to change the Re-evaluation date to <span>August 13, 2020</span> ?</p>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn flat className="flatbutton" onClick={this.evaluationdateconfirmationtoggle}>Cancel</MDBBtn>
                        <MDBBtn flat className="flatbutton">Confirm</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>

                {/* Re evaluation date History Modal */}
                <MDBModal isOpen={this.state.evaluationdatehistorymodal} toggle={this.evaluationdatehistorytoggle} className="newproblemmodal">
                    <MDBModalHeader className="modaltitle" toggle={this.evaluationdatehistorytoggle}>Confirmation</MDBModalHeader>
                    {this.state.careProblems.goal_history && this.state.careProblems.goal_history.map((his, i) => {
                        return (
                            <MDBModalBody className="newproblemmodalbody">
                                <MDBCard>
                                    <MDBCardBody style={{ padding: "1rem 0rem 0rem 1rem" }}>
                                        <p className="historydate"> {moment(his.evaluation_date).format("MMM DD YYYY")} </p>
                                        <p className="historydescription"> {his.goal_statement} </p>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBModalBody>
                        )
                    })}
                    <MDBModalFooter>
                        <MDBBtn flat className="flatbutton" onClick={this.evaluationdatehistorytoggle}>Close</MDBBtn>

                    </MDBModalFooter>
                </MDBModal>

                {/* Request Closing Modal */}
                <MDBModal isOpen={this.state.requestclosingmodal} toggle={this.requestclosingtoggle} className="newproblemmodal">
                    <MDBModalHeader className="modaltitle" toggle={this.requestclosingtoggle}>Request Closing</MDBModalHeader>
                    <MDBModalBody className="newproblemmodalbody">
                        <MDBRow>
                            <MDBCol md="12">
                                <div className="goalcardbody">
                                    <MDBInput type="textarea" label="please write the Reason"></MDBInput>
                                </div>

                            </MDBCol>
                        </MDBRow>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn flat className="flatbutton" onClick={this.requestclosingtoggle}>Cancel</MDBBtn>
                        <MDBBtn flat className="flatbutton" onClick={this.saverequestClosing.bind(this)}>save</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>


                {/* Request closing Confirmation Modal */}
                <MDBModal isOpen={this.state.requestclosingconfirmationmodal} toggle={this.requestclosingconfirmationtoggle} className="newproblemmodal">
                    <MDBModalHeader className="modaltitle" toggle={this.requestclosingconfirmationtoggle}>Confirmation</MDBModalHeader>
                    <MDBModalBody className="newproblemmodalbody">
                        <p className="confirmationmodalmessage">Are you sure you want to close the Careplan <span>Chronic Sinusitis</span> ?</p>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn flat className="flatbutton" onClick={this.requestclosingconfirmationtoggle}>Cancel</MDBBtn>
                        <MDBBtn flat className="flatbutton" onClick={this.confirmRequestClosing.bind(this)}>Confirm</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>


                {/* Cancel Request closing Modal */}
                <MDBModal isOpen={this.state.cancelclosingrequestmodal} toggle={this.cancelclosingrequestoggle} className="newproblemmodal">
                    <MDBModalHeader className="modaltitle" toggle={this.cancelclosingrequestoggle}>Cancel Closing Request</MDBModalHeader>
                    <MDBModalBody className="newproblemmodalbody">
                        <MDBRow>
                            <MDBCol md="12">
                                <div className="goalcardbody">
                                    <MDBInput type="textarea" label="please write the Reason"></MDBInput>
                                </div>

                            </MDBCol>
                        </MDBRow>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn flat className="flatbutton" onClick={this.cancelclosingrequestoggle}>Cancel</MDBBtn>
                        <MDBBtn flat className="flatbutton" onClick={this.savecancelrequestclosing.bind(this)}>save</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>


                {/* New Goal modal Modal */}
                <MDBModal isOpen={this.state.newgoalmodal} toggle={this.createnewgoaltoggle} className="newproblemmodal">
                    <MDBModalHeader className="modaltitle" toggle={this.createnewgoaltoggle}>Goal #2</MDBModalHeader>
                    <MDBModalBody className="newproblemmodalbody">
                        <MDBTypography tag="h3" className="goaltitle">Goal </MDBTypography>

                        <MDBRow>
                            <MDBCol md="12">
                                <div className="goalcardbody">
                                    <MDBInput type="textarea" label="please write the goal" onChange={this.handlegoalchnage} value={this.state.goaldescription}> </MDBInput>
                                </div>

                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md="12">
                                <MDBDatePickerV5 theme="danger" valueDefault={null} getValue={(value) => this.handlereevaluationdatechange(value)} />
                            </MDBCol>
                        </MDBRow>

                        {this.state.barrier.map((row, index) => {
                            return (
                                <>
                                    <MDBTypography tag="h3" className="barriertitle">Barrier #{index + 1}</MDBTypography>
                                    <MDBRow>
                                        <MDBCol md="12">

                                            <div className="goalcardbody">
                                                <MDBInput
                                                    type="textarea"
                                                    label="please write the barrier"
                                                    value={this.state.barrier[index]['barrier_statement']}
                                                    onChange={(e, i) => this.handleBarrierChange(e, index)}
                                                ></MDBInput>
                                            </div>

                                        </MDBCol>
                                    </MDBRow>
                                </>
                            );
                        })}

                        <MDBBtn color="primary" className="addbarrier-button" onClick={this.addBarrier}>Add Barrier</MDBBtn>
                        <br />

                        {this.state.interventions.map((row, index) => {
                            return (
                                <>
                                    <MDBTypography tag="h3" className="interventiontitle">Intervention #{index + 1}</MDBTypography>
                                    <MDBRow>
                                        <MDBCol md="12">
                                            <div className="goalcardbody">
                                                <MDBInput
                                                    type="textarea"
                                                    label="please write the task"
                                                    value={this.state.interventions[index]['intervention_statement']}
                                                    onChange={(e, i) => this.handleInterventionChange(e, index)}
                                                ></MDBInput>
                                            </div>

                                        </MDBCol>
                                    </MDBRow>

                                    {/* <MDBRow>
                                        <MDBCol md="12">
                                            <MDBCard>
                                                <MDBCardBody>
                                                    
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                    </MDBRow> */}
                                </>
                            );
                        })}
                        <MDBBtn color="primary" className="addintervention-button" onClick={this.addInterventions}>Add Task</MDBBtn>
                        <br />

                        {this.state.patientAction.map((row, index) => {
                            return (
                                <>
                                    <MDBTypography tag="h3" className="patientactiontitle">Patient Action #{index + 1}</MDBTypography>
                                    <MDBRow>
                                        <MDBCol md="12">
                                            <div className="goalcardbody">
                                                <MDBInput
                                                    type="textarea"
                                                    label="please write the action"
                                                    value={this.state.patientAction[index]['action_statement']}
                                                    onChange={(e, i) => this.handlePatientChange(e, index)}
                                                ></MDBInput>
                                            </div>

                                        </MDBCol>
                                    </MDBRow>
                                </>
                            );
                        })}
                        <MDBBtn color="primary" className="patientaction-button" onClick={this.addPatientAction}>Add Action</MDBBtn>

                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn flat className="flatbutton" onClick={this.createnewgoaltoggle}>Cancel</MDBBtn>
                        <MDBBtn flat className="flatbutton">save</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
                {this.state.isLoaded && <Loader />}
                <style jsx>{CarePlanStyle}</style>
                <style jsx>{Health360Style}</style>
            </Layout>
        </React.Fragment>
        );
    }
};

export default CarePlan;

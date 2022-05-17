import React, { Component } from "react";
import Head from 'next/head'
import Link from 'next/link';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Layout from '../components/layout';
import {MDBTypography, MDBProgress, MDBCard, MDBCardBody, MDBBtn} from "mdbreact";
import AssessmentStyle from '../styles/assessment';




class Assessment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: 100,
        };
    }

    submitAssessment() {
        this.setState({
            enablefinalscreen: true
        });
    }

    componentDidMount(){
        let patientname = localStorage.getItem('patientName');
        this.setState({
            patientname
        });
    }

    render() {

        return (
            <React.Fragment>
            <Head>
                <title>Healthlligence</title>
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
            </Head>
                <Layout>
                    <MDBTypography
                        tag="h2"
                        className="completionassessmentheader-title"
                    >Health Risk Assessment
                </MDBTypography>


                    <MDBTypography tag="h6" className="your-progress">Your Progress</MDBTypography>
                    <MDBTypography tag="h6" className="progress-text"> 0% Left to Complete </MDBTypography>
                    <MDBProgress value={this.state.completed} className="assessment-progress-bar" />






                    {
                        this.state.enablefinalscreen ? <div> <MDBCard>
                            <MDBCardBody>
                            <div className="text-center Healthriskassessmenttitle">Health Risk Assessment Complete</div>
                                <div className='finalassessmentconfirmation'>
                                    <p> Patient <span>{this.state.patientname}</span> has finished and completed the Health Risk Assessment on </p>
                                </div>
                                <div className='successfulcompletion'> April 15th, 2021, 13:07:26 PST. </div>

                                <div className="text-center buttons-container" style={{ marginTop: "16px", marginBottom: "16px" }}>
                                <Link href="/assessment">
                                    <MDBBtn color="blue-grey" className="back-button">EDIT</MDBBtn>
                                </Link>
                                <Link href="/assessmentlist">
                                <MDBBtn className="next-button">RETURN TO DASHBOARD</MDBBtn>
                                </Link>
                            </div>

                            </MDBCardBody>
                        </MDBCard>
                            </div> : <div><MDBCard>
                                <MDBCardBody>
                                    <div className='successfulcompletion'>You have successfully completed all the questions within the Health Risk Assessment for Patient {this.state.patientname}.</div>
                                    <div className="hradescription">
                                        <p> If you wish to make any changes, you may go back now. </p>
                                    </div>

                                    <div className="assessmentconfirmation">
                                        <p>If you would like to conclude and confirm the information within this Health Risk Assessment and would like to submit the Health Risk Assessment as complete; </p>
                                    </div>
                                    <div className="agreeterms">
                                        <p><span className="hraspanbold">Please click “SUBMIT” as seen below. </span> </p>
                                    </div>
                                    <div className="text-center buttons-container" style={{marginBottom: "16px"}}>
                                    <Link href="/assessment">
                                        <MDBBtn color="blue-grey" className="back-button">BACK</MDBBtn>
                                    </Link>
                                    <MDBBtn className="next-button" onClick={this.submitAssessment.bind(this)}>Submit</MDBBtn>
                                </div>
                                </MDBCardBody>
                            </MDBCard>
                                
                            </div>
                    }




                    <style jsx>{AssessmentStyle}</style>
                </Layout>
            </React.Fragment>
        );
    }

}

export default Assessment;
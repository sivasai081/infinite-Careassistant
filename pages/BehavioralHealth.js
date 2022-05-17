import React, { Component } from "react";
import Head from 'next/head'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Layout from '../components/layout';
import Link from 'next/link';
import { MDBTypography, MDBProgress, MDBCard, MDBCardBody, MDBBtn} from "mdbreact";
import AssessmentStyle from '../styles/assessment';




class Assessment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: 0,
        };
    }



    render() {

        return (
            <React.Fragment>
            <Head>
                <title>Healthlligence</title>
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
            </Head>
                <Layout>
                    {/* <MDBTypography
                        tag="h2"
                        className="header-title"
                    >Health Risk Assessment
                </MDBTypography> */}


                    <MDBTypography tag="h6" className="your-progress">Your Progress</MDBTypography>
                    <MDBTypography tag="h6" className="progress-text"> 100% Left to Complete </MDBTypography>
                    <MDBProgress value={this.state.completed} className="assessment-progress-bar" />


                    <MDBCard>
                        <MDBCardBody>
                            <div className="text-center Healthriskassessmenttitle">Behavioral Health Assessment</div>
                            <div className="you-will-have-10-day">You will have 10 days to complete the assessment. The clock will start when the assessment is displayed and after you have clicked the "Start" button. After answering each question, the results will be provided to your care manager. This will allow the care manager to assess your current health status and needs. If the system detects that there is no activity for 10 minutes during the assessment, the page will automatically close and you may resume by clicking the “start” button.</div>
                            <div className="text-center buttons-container">
                            <Link href="/assessment"><MDBBtn className="next-button">Start</MDBBtn></Link>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                    


                    <style jsx>{AssessmentStyle}</style>
                </Layout>
            </React.Fragment>
        );
    }

}

export default Assessment;
import React, {Component} from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Head from 'next/head';
import axios from 'axios';
import Loader from '../components/loader';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBBtn,
    MDBTypography
  } from 'mdbreact';
  import guestUserStyles from '../styles/guestUserStyles';

class guestUser extends Component{
constructor(props){
super(props);
    this.state = {
        isGuestUserValid : false,
        showNoAccessMessage: false,
        isLoaded: true
    }
}
componentDidMount(){
    axios({
        method: 'POST',
        url: `/api/validateGuestUser`,
        data: {
            meeting_url_id: "4b935cc3-c739-42ba-a54c-2d36d81846b4"
          }
    })
    .then((response) => {
        console.log(response.data.json.guest_status, typeof response.data.json.guest_status,"res")
        this.setState({
            isGuestUserValid : response.data.json.guest_status,
            isLoaded: false
        })
    })
}
showConfirmDeletetoggle = () => {
    if(!this.state.isGuestUserValid){
        window.location.href = "/guestUsertelemedicine"
    }else{
        this.setState({
            showNoAccessMessage: true
        })
    }
}
cancelNoACcessModal = () => {
    this.setState({
        showNoAccessMessage: false
    })
}
render(){
    return(
        <React.Fragment>
        <Head>
            <title>Healthlligence</title>
            <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
        </Head>
            
            <div className="invited-container">
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md='12' lg='6' xl='5' sm='12'  style={{ height: '95vh' }} fluid className='mx-auto'>
                        {this.state.showNoAccessMessage ? 
                        <MDBCard className="invitedScreen-card">
                            <MDBCardBody>
                                <MDBTypography className="accept-header">Invitation link is Expired !!!</MDBTypography>
                                <MDBBtn className="btn btn-primary accept-button" onClick={this.cancelNoACcessModal}>CANCEL</MDBBtn>
                            </MDBCardBody>
                        </MDBCard> : 
                            <MDBCard className="invitedScreen-card">
                            <MDBCardBody>
                                <MDBTypography className="accept-header">Do you accept the invitation ?</MDBTypography>
                                <MDBBtn className="btn btn-primary accept-button" onClick={this.showConfirmDeletetoggle}>ACCEPT</MDBBtn>
                            </MDBCardBody>
                        </MDBCard> }
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                {this.state.isLoaded && <Loader />}
                <style jsx>{guestUserStyles}</style>
            </div>
            
        </React.Fragment>
    )
}
}
export default guestUser;
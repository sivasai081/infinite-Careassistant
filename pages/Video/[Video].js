import React, { useState, useEffect } from "react";
import {useRouter} from "next/router";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Head from 'next/head'
import Link from 'next/link';
import axios from 'axios';
// import Layout from "../components/layout";
import {
    MDBContainer,
    MDBNavbarToggler,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBMask,
    MDBInput,
    MDBIcon,
    MDBView,
    MDBBtn,
    MDBCardTitle,
    MDBFooter,
    MDBTypography
  } from 'mdbreact';
import GuestUsertelemedicine from '../../pages/guestUsertelemedicine';
import guestUserStyles from '../../styles/guestUserStyles';

const Video = () => {
    const router = useRouter();
    const[isGuestUserValid, setisGuestUserValid] = useState(true);
    const[showNoAccessMessage, setshowNoAccessMessage] = useState(false);
    const[showTelemedicine, setshowTelemedicine] = useState(false);
    const[meetingId, setmeetingId] = useState("");
useEffect(() => {
        
}, []);

const cancelNoACcessModal = () => {
    setisGuestUserValid(true);
    setshowNoAccessMessage(!showNoAccessMessage);
}

const showConfirmDeletetoggle = () => {
    setmeetingId(router.query.Video);
    axios({
        method: 'POST',
        url: `/api/validateGuestUser`,
        data: {
            meeting_url_id: router.query.Video
        }
    })
    .then((response) => {
        // setisGuestUserValid(response.data.json.guest_status);
        if(response.data.json.guest_status){
            setshowTelemedicine(true);
            setisGuestUserValid(false)
        }else{
            setshowNoAccessMessage(true);
            setisGuestUserValid(false);
        }
    })
}

    return (
        <>
            <Head>
                    <title>Healthlligence</title>
                    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
            </Head>
            
            <div>
                    {isGuestUserValid ? 
                        <MDBRow className="invited-container">
                            <MDBCol md='12' lg='6' xl='5' sm='12'  style={{ height: '95vh' }} fluid className='mx-auto'>
                            <MDBCard className="invitedScreen-card">
                                <MDBCardBody>
                                    <MDBTypography className="accept-header">Ready to join ?</MDBTypography>
                                    <MDBBtn className="btn btn-primary accept-button" onClick={showConfirmDeletetoggle}>JOIN</MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                            </MDBCol>
                        </MDBRow> : "" 
                    }
                    {showTelemedicine ? <GuestUsertelemedicine meetingId={meetingId}/> : ""}
                    {showNoAccessMessage ? 
                        <MDBRow className="invited-container">
                            <MDBCol md='12' lg='6' xl='5' sm='12'  style={{ height: '95vh' }} fluid className='mx-auto'>
                                <MDBCard className="invitedScreen-card">
                                    <MDBCardBody>
                                        <MDBTypography className="accept-header">Meeting is not started or Invitation link is Expired !!!</MDBTypography>
                                        <MDBBtn className="btn btn-primary accept-button" onClick={cancelNoACcessModal}>CANCEL</MDBBtn>
                                    </MDBCardBody>
                                </MDBCard> 
                            </MDBCol>
                        </MDBRow> : ""
                    }
            </div>
            
            <style jsx>{guestUserStyles}</style>
        </>
    );
};
export default Video;
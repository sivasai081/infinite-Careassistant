import React, {Component} from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Head from 'next/head'
import VideoComponent from '../components/VideoComponent';
import Link from 'next/link';
import axios from 'axios';
import GuestUserNavbar from '../components/guestUserNavbar';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
  } from 'mdbreact';
  import guestUsertelemedicineStyles from '../styles/guestUsertelemedicineStyles';

class guestUsertelemedicine extends Component{
constructor(props){
super(props);
    this.remoteMedia = React.createRef();
    this.localMedia = React.createRef();
    this.video = React.createRef();
    this.state = {
        showAcceptConfirm : false,
        videochatopened: false,
        chatopened: false,
        unique_name: "",
        group_name:"",
        member_list:[]
    }
}
componentDidMount(){
    let caremnagerId = localStorage.getItem('caremanagerId');
    let patientId = localStorage.getItem('patientId');
    let careManagerFirstname = localStorage.getItem('careManagerFirstname');
    let unique_name; let member_list_Emails = []; let member_firstnames =[];
    axios({
        method: 'POST',
        url: `/api/fetchGroupName`,
        params: {
          id: caremnagerId
        }
      })
        .then((response) => {
            response.data.json.details && response.data.json.details.forEach((member,index) => {
                if(member.uuid_str === this.props.meetingId){ 
                // if(member.uuid_str === "d233e0ba-267b-4661-8148-51e6170bdf07"){ // Static Condition
                    // console.log(member,"member")
                    unique_name = member.unique_name;
                    member_list_Emails = member.member_list.concat(caremnagerId.toString());
                    this.setState({
                        unique_name: member.unique_name,
                        group_name :member.group_name
                    })
                }
            })
            axios({
                method: 'GET',
                url: `/api/getCareTeamDetails`,
                params: {
                  id: patientId
                }
            })
            .then((res) => {
                res.data.json.members.map((el) => {
                    // console.log(member_list_Emails,"element")
                    if(member_list_Emails.indexOf(el.email_id) !== -1){
                        member_firstnames.push(el.firstname);
                    }
                });
                this.setState({
                    member_list: member_firstnames.concat(careManagerFirstname.toString())
                }, () => {
                    console.log(this.state.member_list,"member_list")
                })
            })
        })
}
callvideo = () => {
    this.setState({
        videochatopened: true, chatopened: false
    } , () => {
        this.video.current.start()
    })
}
render(){
    // console.log(this.state.member_firstnames, this.state.group_name, this.state.unique_name, "member_firstnames")
    return(
        <React.Fragment>
        <Head>
            <title>Healthlligence</title>
            <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
        </Head>
            <div className="guest-telemedicine">
            <GuestUserNavbar />
                <MDBContainer>
                    <MDBRow style={{marginTop: "100px"}}>
                        <MDBCol md='12' className="video-col" >
                            <MDBCard className="video-card videoCall">
                            <MDBCardBody className="v-container">
                                <div>
                                    <MDBRow className="member-search ">
                                        <MDBCol md="8">
                                        <div className="chatuser">
                                            <div className="groupNameClass">{this.state.group_name}</div>
                                            <span className="groupMemberClass" style={{fontSize:"12px"}}>{this.state.member_list.join(", ")}</span>
                                        </div>
                                        </MDBCol>
                                        <MDBCol md="4" style={{marginTop:"5px"}}>
                                            {/* <MDBIcon icon="phone" className="chat-v-icons" style={{ float: "right" }} /> */}
                                            <MDBIcon far icon="comment-alt" className="chat-v-icons" style={{ float: "right", marginLeft:"10px", cursor:"pointer" }} />
                                            <MDBIcon icon="video" className="chat-v-icons" style={{ float: "right", cursor:"pointer" }} onClick={this.callvideo} />
                                        
                                        </MDBCol>
                                    </MDBRow>
                                    {!this.state.chatopened && !this.state.videochatopened ?
                                    <MDBRow className="justify-content-center align-items-center empty-container">
                                        <MDBCol className="col-md-6 col-lg-6 col-xl-8">
                                        <img src="/images/chat_video_fn.svg" alt="Telemedicin-Icon" className="img-fluid telemedicine-icon-class"></img>
                                        <div className="welcome-text">Welcome to Telemedicine</div>
                                        </MDBCol>
                                    </MDBRow> :
                                    <MDBRow className="video-chat-container">
                                        {this.state.videochatopened && !this.state.chatopened &&
                                        <VideoComponent className="video-container" ref={this.video} unique_name ={this.state.unique_name} /> 
                                        } 
                                    </MDBRow>
                                    }
                                </div>
                            </MDBCardBody>
                            </MDBCard>
                            {/* <div className="send-messages">
                                <MDBRow className="mesgsend-row">
                                <MDBCol md="11" className="message-general">
                                    <MDBInput label="Type Something" className="message-input" />
                                </MDBCol>
                                <div className="msg-general-icons">
                                    <MDBIcon far icon="folder" className="chat-c-icon" />
                                    <MDBIcon far icon="user-circle" className="chat-c-icon" />
                                    <MDBIcon far icon="file-alt" className="chat-c-icon" />
                                </div>
                                <MDBCol md="1">
                                    <img src="images/send.png" className="send-general-icon" />
                                </MDBCol>
                                </MDBRow>
                            </div> */}
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <style jsx>{guestUsertelemedicineStyles}</style>
            </div>
        </React.Fragment>
    )
}
}
export default guestUsertelemedicine;
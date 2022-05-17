// import React from "react";
import React, { Component } from 'react';
import { MDBAvatar, MDBBadge,  MDBIcon, MDBListGroupItem } from "mdbreact";
import TelemedicineStyle from '../styles/telemedicineStyles';

class GuestList extends Component {
    constructor(props) {
      super(props);
    }
    render(){
        console.log(this.props.friend,"friend")
        let activeClass ;
        if(this.props.invitedmemberEmail[0] === this.props.friend.email_id){
            activeClass = "active";
        }else{
            activeClass = "";
        }
    return (
        <MDBListGroupItem
            href="#!"
            className={"d-flex  p-2 border-light chat-list "+activeClass}
            onMouseEnter={(e)=>this.props.handleuserdetails(e,this.props.friend.id,this.props.friend)}
            onMouseLeave={(e)=>this.props.handleuserdetailsleave(e,this.props.friend.id)}
            onClick={this.props.handleuserdetailsOnClick.bind(this)}
        >
            {/* <MDBAvatar
                tag="img"
                src={"images/member1.png"}
                alt="avatar"
                circle
                className="mr-2 z-depth-1 chat-avatar"
                //onClick={()=>props.handleUserInfo(id)}
            /> */}
            <div className="friendscircleClass">
                <span className="friendscircletext">
                       {this.props.friend.firstname.charAt(0).toUpperCase()}
                </span>
            </div>
            <div style={{ fontSize: "0.95rem",marginLeft:"8px",width:"100%" }}>
                <strong className={this.props.friend.toRespond ? "chatusername" : "chatusername nottorespond"} >{this.props.friend.name}</strong>
                <p className="chatusermessage text-muted" style={{marginBottom:"0rem"}}>{this.props.friend.specilization}</p>
                {/* <div className="recentmessagedetails text-muted" style={{fontSize:"12px"}}>
                    <span>{this.props.friend.recentMessageSender !== undefined ? this.props.friend.recentMessageSender + ": " : ""}</span>
                    <span className="last-message">{this.props.friend.recentMessage}</span>
                </div> */}
            </div>
            <div>
               
                {this.props.friend.seen ? (
                    <span className="text-muted float-right">
                        <MDBIcon className="fa-check" aria-hidden="true" />
                    </span>
                ) : this.props.friend.toRespond ? (
                    // <MDBBadge color="danger" className="float-right">
                    //     {toRespond}
                    // </MDBBadge>
                    <></>
                ) : null }
            </div>

      <style jsx>{TelemedicineStyle}</style>
        </MDBListGroupItem>
    );
    }
}

export default GuestList;
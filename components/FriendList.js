// import React from "react";
import React, { Component } from 'react';
import { MDBAvatar, MDBBadge,  MDBIcon, MDBListGroupItem } from "mdbreact";
import TelemedicineStyle from '../styles/telemedicineStyles';

class FriendList extends Component {
    constructor(props) {
      super(props);
    }
    render(){
        let activeClass ;
        if(this.props.invitedmemberEmail.length === 1 && this.props.invitedmemberEmail[0] === this.props.friend.email_id){
            activeClass = "active";
        }else{
            activeClass = "";
        }
        // console.log(this.props.invitedmember, this.props.key, this.props.friend, "invitedmember")
    return (
        <MDBListGroupItem
            href="#!"
            className={"border-light chat-list "+activeClass}
            onMouseEnter={(e)=>this.props.handleuserdetails(e,this.props.friend.email_id,this.props.friend, this.props.color)}
            onMouseLeave={(e)=>this.props.handleuserdetailsleave(e,this.props.friend.email_id)}
            onClick={this.props.handleuserdetailsOnClick.bind(this)}
            
        >
            <div  className={this.props.friend.role_type === "GUEST" ? "guest-user" : "friendscircleClass"} style={{backgroundColor:this.props.color}}>
                <span className="friendscircletext">
                       {this.props.friend.firstname.charAt(0).toUpperCase()}
                </span>
            </div>
            <div style={{ fontSize: "0.95rem",marginLeft:"8px",width:"83%" }}>
                <strong className={this.props.friend.toRespond ? "chatusername" : "chatusername nottorespond"} >{this.props.friend.firstname}</strong>
                <p className="chatusermessage text-muted" style={{marginBottom:"0rem"}}>{this.props.friend.role_type === "GUEST" ? "GUEST" : ""  + this.props.friend.specialization}</p>
                <div className="recentmessagedetails text-muted">
                    <span>{this.props.friend.recentMessageSender !== undefined ? this.props.friend.recentMessageSender + ": " : ""}</span>
                    <span className="last-message">{this.props.friend.recentMessage}</span>
                </div>
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

export default FriendList;
import React from "react";
import { MDBAvatar, MDBBadge, MDBIcon, MDBListGroupItem, MDBPopover, MDBPopoverBody } from "mdbreact";
import TelemedicineStyle from '../styles/telemedicineStyles';


function CareTeamList(props) {
     const { personid, firstname, lastname, specialization, when, toRespond, seen, status, role } = props.friend;
     
    return (
        <div className="contact-info" >
       <MDBListGroupItem
            href="#!"
            className={`d-flex  p-1 border-light contact-list-group ${props.chatsearch && 'chatsearch'}`}
            onClick={props.handleuserdetailsOnClick.bind(this)}
        >
            <div className="circleClass" style={{backgroundColor: props.color}}>
                <span className="circletext">
                       {firstname.charAt(0).toUpperCase()}
                </span>
            </div>
            <div className="contact-user">
                <strong className="chatusername" >{firstname + " " + lastname}</strong>
                <p className="userspecilization text-muted" style={{marginBottom: "0rem"}}>{role + " - " + specialization}</p>
            </div>
            <style jsx>{TelemedicineStyle}</style>
        </MDBListGroupItem>
        </div>
    );
}

export default CareTeamList;
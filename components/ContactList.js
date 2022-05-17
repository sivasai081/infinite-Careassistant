import React from "react";
import { MDBAvatar, MDBBadge, MDBIcon, MDBListGroupItem, MDBPopover, MDBPopoverBody } from "mdbreact";
import TelemedicineStyle from '../styles/telemedicineStyles';


function ContactList(props) {
    // const { id, name, avatar, specilization, when, toRespond, seen, active } = props.friend;
    const { personid, email_id, firstname, specialization, when, toRespond, seen, status } = props.friend;
    const handlehover = e => {
        console.log("eeee==",e.target)
    }
    return (
       
        <div className="contact-info" >
          
       <MDBListGroupItem
            href="#!"
            className={`d-flex  p-1 border-light contact-list-group ${props.chatsearch && 'chatsearch'}`}
            
        >
            <div onMouseEnter={(e)=>props.handleuserdetails(e,email_id)} onMouseLeave={(e)=>props.handleuserdetailsleave(e,email_id)} className="circleClass" style={{backgroundColor: props.color}}>
                <span className="circletext">
                       {firstname.charAt(0).toUpperCase()}
                </span>
            </div>
            <div className="contact-user">
                <strong className="chatusername" >{firstname}</strong>
                <p className="userspecilization text-muted">{specialization}</p>
            </div>
          
            <style jsx>{TelemedicineStyle}</style>


        

        </MDBListGroupItem>
        
      
       
      


        </div>
        
        
    );
}

export default ContactList;
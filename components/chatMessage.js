import React from "react";
import { MDBAvatar,  MDBCard, MDBCardBody } from "mdbreact";

function ChatMessage(props) {
 
    return (
        <li className="chat-message d-flex justify-content-between mb-4">
    <MDBAvatar
      tag="img"
      src={props.avatar}
      alt="avatar"
      circle
      className="mx-2 z-depth-1 chat-avatar"
    />
    <MDBCard>
      <MDBCardBody>
        <div>
          <strong className="primary-font">{props.message.author.name}</strong>
          <small className="pull-right text-muted">
            <i className="far fa-clock" /> {props.message.timestamp}
          </small>
        </div>
        <hr />
        <p className="mb-0">{props.message.text}</p>
      </MDBCardBody>
    </MDBCard>
  </li>
    );
}

export default ChatMessage;
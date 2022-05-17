import React from "react";
import { MDBTooltip } from "mdbreact";

function Chevron(props) {
  return (
    props.withTooltip ? (
    <MDBTooltip  domElement placement={props.tooltipPosition || 'top'}> 
    <svg
      className={props.className}
      height={props.height}
      width={props.width}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        fill={props.fill}
        d="M11,7h2V9H11Zm0,4h2v6H11Zm1-9A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.011,8.011,0,0,1,12,20Z"
      />
    </svg>
    <span>{props.tooltipText}</span>
    </MDBTooltip>
    ):(
      <svg
      className={props.className}
      height={props.height}
      width={props.width}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        fill={props.fill}
        d="M11,7h2V9H11Zm0,4h2v6H11Zm1-9A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.011,8.011,0,0,1,12,20Z"
      />
    </svg>
    )
  );
}

export default Chevron;

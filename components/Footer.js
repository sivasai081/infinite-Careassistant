import React from 'react';
import {  MDBContainer, MDBFooter } from 'mdbreact';

const FooterPage = () => {
  return (
    <MDBFooter
      className='font-small py-2 mt-4 footer-copyright text-center'
    >
      {/* <MDBContainer fluid> */}
      <div>
        {/* &copy; {new Date().getFullYear()}  healthlligence Inc All Rights Reserved */}
      </div>
      {/* </MDBContainer> */}
    </MDBFooter>
  );
};

export default FooterPage;

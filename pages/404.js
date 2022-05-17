import React, { useState, useEffect } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBTypography, MDBRow, MDBCol, MDBContainer } from 'mdbreact';
import NavBar from '../components/NavBar';
import pageNotFoundStyles from '../styles/pageNotFoundStyles';
import Head from 'next/head';


function PageNotFound(props) {

  useEffect(() => {
    }, []);
    const bgPink = { background: 'transparent linear-gradient(180deg, #DB1962 0%, #7B1138 100%) 0% 0% no-repeat padding-box' }
  return (
    <>
    <Head>
    <title>Healthlligence</title>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <MDBNavbar style={bgPink} dark expand="md" fixed="top">
      {/* <span style={{color:"red"}}>Menu</span> */}
        <MDBNavbarBrand>
          <MDBTypography tag="h5" variant="h5-responsive" className="header-title responsivelogo"><span style={{cursor: "pointer"}} onClick={() => window.location.href="/dashboard"}>careassistant.ai</span>
          </MDBTypography>
        </MDBNavbarBrand>
      </MDBNavbar>
    </Head>
      <MDBRow>
        <MDBCol>
          <div className="error-section">
            <div className="not-text">404</div>
            <div className="error-text">ERROR</div>
            <div className="divider"></div>
            <div className="page-not-found">Page Not Found</div>
          </div>
        </MDBCol>
      </MDBRow>
    <style jsx>{pageNotFoundStyles}</style>
  </>
  );
}
export default PageNotFound;

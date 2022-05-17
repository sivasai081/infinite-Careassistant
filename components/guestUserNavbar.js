import React from 'react';
import { MDBNavbar, MDBBtn, MDBModal,MDBModalBody, MDBTypography, MDBNavbarBrand, MDBModalHeader, MDBNavbarNav, MDBBadge, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon, MDBModalFooter } from 'mdbreact';
import Link from 'next/link';
import { StaticRouter } from "react-router-dom";
import guestUsertelemedicineStyles from '../styles/guestUsertelemedicineStyles';

class guestUserNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
 
    };
  }

  render() {
    const bgPink = { background: 'transparent linear-gradient(180deg, #DB1962 0%, #7B1138 100%) 0% 0% no-repeat padding-box' }
    return (
      <StaticRouter>
          <header>
            <MDBNavbar style={bgPink} dark expand="md" fixed="top">
              <MDBNavbarBrand>
                <MDBTypography tag="h5" variant="h5-responsive" className="guestUser-header"><span style={{cursor: "pointer"}} >{"careassistant.ai > Telemedicine"}</span></MDBTypography> 
              </MDBNavbarBrand>
            </MDBNavbar>
          </header>
          <style jsx>{guestUsertelemedicineStyles}</style>
        </StaticRouter>
    );
  }
}

export default guestUserNavbar;


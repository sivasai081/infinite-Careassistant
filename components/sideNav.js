import React, { Component } from "react";
import { StaticRouter } from "react-router-dom";
import { MDBSideNavCat, MDBSideNavNav, MDBSideNav, MDBSideNavLink, MDBContainer, MDBIcon, MDBBtn, MDBNav, MDBNavItem, MDBLink } from "mdbreact";
import Router from 'next/router';
import axios from 'axios';


class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideNavLeft: false,
      selectedPath: '',
      roleName: '',
      toggleSubMenu: false,
      toggleUMSubMenu: false,
      toggleManageaccountSubMenu: false,
      fetchrolemodules: [],
    }

  }

  componentDidMount() {
    const { pathname } = Router;
    this.setState({
      selectedPath: pathname,
      patientName: localStorage.getItem("patientName"),
      roleName: localStorage.getItem("roleName"),
      role: localStorage.getItem("role")
    }, () => {
      axios({
        method: 'GET',
        url: `/api/fetchRole`,
        params: {
          role_type: this.state.role
        }
      })
        .then((response) => {
          this.setState({
            fetchrolemodules: response.data.json.result
          })
        })
    })


  }

  // componentDidUpdate(){
  //   this.setState({
  //     patientName: localStorage.getItem("patientName")
  //   });
  // }

  sidenavToggle = sidenavId => {
    const sidenavNr = `sideNav${sidenavId}`
    this.setState({
      [sidenavNr]: !this.state[sidenavNr]
    }, () => {

      if (this.props.handleSideNav) this.props.handleSideNav(this.state.sideNavLeft)
    });
  };

  toggleHover = () => {
    const slim = document.querySelector('.closed');
    if (slim) {
      slim.classList.add("hovered")
    }
    this.props.handlehover(true);
  }
  toggleHoverout = () => {
    this.props.handlehover("");
    const slim = document.querySelector('.closed');
    if (slim) {
      slim.classList.remove("hovered")
    }
    this.props.handlehover(false);
  }

  redirectTo = path => {
    Router.push(path)
  }
  showSubMenus = () => {
    this.setState({
      toggleSubMenu: !this.state.toggleSubMenu
    })
  }
  showUMSubMenus = () => {
    this.setState({
      toggleUMSubMenu: !this.state.toggleUMSubMenu
    })
  }

  showManageacountMenus = () => {
    this.setState({
      toggleManageaccountSubMenu: !this.state.toggleManageaccountSubMenu
    }, ()=>{
      console.log(this.state.toggleManageaccountSubMenu)
    })
  }

  render() {

    let fetchrolemodules = this.state.fetchrolemodules;
    let whiteIconClass = this.props.screenwidth <= 1053 ? "whiteIconClass" : "";
    let sideNavClassWithoutPatientCard = (this.props.pageInfo === "/dashboard") || (this.props.pageInfo === "/dashboarddetails") || (this.props.pageInfo === "/qualityofcare") || (this.props.pageInfo === "/utilization") || (this.props.pageInfo === "/patientengagement") || (this.props.pageInfo === "/longitudinalanalysis") || (this.props.pageInfo === "/patientlist") || (this.props.pageInfo === "/pop360") || (this.props.pageInfo === "/pop360teams") || (this.props.pageInfo === "/manageaccount") || (this.props.pageInfo === "/educationmaterials") || (this.props.pageInfo === "/users") || (this.props.pageInfo === "/adduser") || (this.props.pageInfo === "/roles") || (this.props.pageInfo === "/messages") || (this.props.pageInfo === "/assignments") || (this.props.pageInfo === "/utilization") || (this.props.pageInfo === "/outpatient") || (this.props.pageInfo === "/inpatient") || (this.props.pageInfo === "/umnotes") || (this.props.pageInfo === "/authview") || (this.props.pageInfo === "/inpatientauthview") || (this.props.pageInfo === "/inpatientnote") ? "newsideNavClass" : "";
    let permissions = fetchrolemodules && fetchrolemodules[0] && fetchrolemodules[0].permissions;
    return (
      // <StaticRouter>
      <MDBSideNav slim fixed mask="rgba-white-strong" breakWidth={1300}
        className={`side-menu-bar ${this.props.menuexpanded ? 'opened' : 'closed'} ${this.props.userInfoNav && 'userinfo-expanded'} ` + sideNavClassWithoutPatientCard}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHoverout}
      >
        <MDBSideNavNav>
          <div className={"nav-container " + sideNavClassWithoutPatientCard + " " + whiteIconClass}>

            <div>
              {
                permissions && permissions.includes("Dashboard") ? <div className={`nav-sub-container ${(this.state.selectedPath === '/dashboard' || this.state.selectedPath === '/dashboarddetails') && 'selected'}`}

                  onClick={() => this.redirectTo("/dashboard")}
                >
                  <div className={`navicon ${(this.state.selectedPath === '/dashboard' || this.state.selectedPath === '/dashboarddetails') && 'active'}`}><img src="images/icons/home.svg" className="nav-img" /></div>
                  <span className="nav-text"> Home </span>
                </div> : null
              }
              {
                permissions && permissions.includes("pop360") ? <div className={`nav-sub-container ${(this.state.selectedPath === '/pop360' || this.state.selectedPath === '/pop360teams') && 'selected'}`}

                  onClick={() => this.redirectTo("/pop360")}
                >
                  <div className={`navicon ${(this.state.selectedPath === '/pop360' || this.state.selectedPath === '/pop360teams') && 'active'}`}> <img src="images/icons/pop.svg" className="nav-img" /></div>
                  <span className="nav-text"> pop360 </span>
                </div> : null
              }
              {
                permissions && permissions.includes("Search Patient") ? <div className={`nav-sub-container ${this.state.selectedPath === '/patientlist' && 'selected'}`}

                  onClick={() => this.redirectTo("/patientlist")}
                >
                  <div className={`navicon ${this.state.selectedPath === '/patientlist' && 'active'}`}><img src="images/icons/patientList.svg" className="nav-img" /></div>
                  <span className="nav-text"> Patient List </span>
                </div> : null
              }
              {
                permissions && permissions.includes("health360") ? <div className={`nav-sub-container ${this.state.selectedPath === '/health360' && 'selected'} ${this.state.patientName == null && 'disableaction'}`}

                  onClick={this.state.patientName == null ? null : () => this.redirectTo("/health360")}
                >
                  <div className={`navicon ${this.state.selectedPath === '/health360' && 'active'}`}><img src="images/icons/health360_v5.svg" className="nav-img" /></div>
                  <span className="nav-text"> health360 </span>
                </div> : null

              }
              {
                permissions && permissions.includes("Timeline") ? <div className={`nav-sub-container ${this.state.selectedPath === '/timeline' && 'selected'} ${this.state.patientName == null && 'disableaction'}`}

                  onClick={this.state.patientName == null ? null : () => this.redirectTo("/timeline")}
                >
                  <div className={`navicon ${this.state.selectedPath === '/timeline' && 'active'}`}><img src="images/icons/timeline.svg" className="nav-img" /></div>
                  <span className="nav-text"> Timeline </span>
                </div> : null

              }
              {
                permissions && permissions.includes("Assessment") ? <div className={`nav-sub-container ${(this.state.selectedPath === '/assessmentlist' || this.state.selectedPath === '/hra' || this.state.selectedPath === '/assessment') && 'selected'} ${this.state.patientName == null && 'disableaction'}`}

                  onClick={this.state.patientName == null ? null : () => this.redirectTo("/assessmentlist")}
                >
                  <div className={`navicon ${(this.state.selectedPath === '/assessmentlist' || this.state.selectedPath === '/hra' || this.state.selectedPath === '/assessment') && 'active'}`}><img src="images/icons/assessment.svg" className="nav-img" /></div>
                  <span className="nav-text"> Assessment </span>
                </div> : null

              }
              {
                permissions && permissions.includes("RPM") ? <div className={`nav-sub-container ${(this.state.selectedPath === '/remotemonitering' || this.state.selectedPath === '/remotemoniteringdetails') && 'selected'} ${this.state.patientName == null && 'disableaction'}`}

                  onClick={this.state.patientName == null ? null : () => this.redirectTo("/remotemonitering")}
                >
                  <div className={`navicon ${(this.state.selectedPath === '/remotemonitering' || this.state.selectedPath === '/remotemoniteringdetails') && 'active'}`}><img src="images/icons/rpm_new.svg" className="nav-img" /></div>
                  <span className="nav-text"> RPM </span>
                </div> : null

              }
              {
                permissions && permissions.includes("Telemedicine") ? <div className={`nav-sub-container ${this.state.selectedPath === '/telemedicine' && 'selected'} ${this.state.patientName == null && 'disableaction'}`}

                  onClick={this.state.patientName == null ? null : () => this.redirectTo("/telemedicine")}
                >
                  <div className={`navicon ${this.state.selectedPath === '/telemedicine' && 'active'}`}><img src="images/telemedicine_grey.svg" className="nav-img" /></div>
                  <span className="nav-text"> Telemedicine </span>
                </div> : null

              }
              {
                permissions && permissions.includes("Careplan") ? <div className={`nav-sub-container ${(this.state.selectedPath === '/careplan') && 'selected'} ${this.state.patientName == null && 'disableaction'}`}

                  onClick={this.state.patientName == null ? null : () => this.redirectTo("/careplan")}
                >
                  <div className={`navicon ${(this.state.selectedPath === '/careplan') && 'active'}`}> <img src="images/icons/careplan.svg" className="nav-img" /></div>
                  <span className="nav-text"> Careplan </span>
                </div> : null

              }
              {
                permissions && permissions.includes("Note") ? <div className={`nav-sub-container ${this.state.selectedPath === '/notes' && 'selected'} ${this.state.patientName == null && 'disableaction'}`}

                  onClick={this.state.patientName == null ? null : () => this.redirectTo("/notes")}
                >
                  <div className={`navicon ${this.state.selectedPath === '/notes' && 'active'}`}> <img src="images/icons/note.svg" className="nav-img" /></div>
                  <span className="nav-text"> Note </span>
                </div> : null
              }
              {
                permissions && permissions.includes("Payer Analytics") ? <div>
                  <div className={`nav-sub-container`}>
                    <div className={`navicon`}> <img src="images/PayerAnalytics.svg" className="nav-img" /></div>
                    <span className="nav-text" onClick={this.showSubMenus}> Payer Analytics <span style={{ marginLeft: "20px" }}><MDBIcon icon="caret-down" /></span></span>
                  </div>



                  {this.state.toggleSubMenu || this.state.selectedPath === '/longitudinalanalysis' || this.state.selectedPath === '/patientengagement' || this.state.selectedPath === '/utilization' || this.state.selectedPath === '/qualityofcare' ?
                    <div className={`nav-sub-container ${this.state.selectedPath === '/longitudinalanalysis' && 'selected'}`}

                      onClick={() => this.redirectTo("/longitudinalanalysis")}
                    >
                      <div className={`navicon ${this.state.selectedPath === '/longitudinalanalysis' && 'active'}`}> <img src="images/longniyudinal.svg" className="nav-img" /></div>
                      <span className="nav-text"> Longitudinal Analysis </span>
                    </div>
                    : ""}
                  {this.state.toggleSubMenu || this.state.selectedPath === '/longitudinalanalysis' || this.state.selectedPath === '/patientengagement' || this.state.selectedPath === '/utilization' || this.state.selectedPath === '/qualityofcare' ?
                    <div className={`nav-sub-container ${this.state.selectedPath === '/qualityofcare' && 'selected'} `}

                      onClick={() => this.redirectTo("/qualityofcare")}
                    >
                      <div className={`navicon ${this.state.selectedPath === '/qualityofcare' && 'active'}`}> <img src="images/qualityofcare.svg" className="nav-img" /></div>
                      <span className="nav-text"> Quality of Care </span>
                    </div>
                    : ""}
                  {this.state.toggleSubMenu || this.state.selectedPath === '/longitudinalanalysis' || this.state.selectedPath === '/patientengagement' || this.state.selectedPath === '/utilization' || this.state.selectedPath === '/qualityofcare' ?
                    <div className={`nav-sub-container ${this.state.selectedPath === '/utilization' && 'selected'} `}

                      onClick={() => this.redirectTo("/utilization")}
                    >
                      <div className={`navicon ${this.state.selectedPath === '/utilization' && 'active'}`}> <img src="images/navutilization.svg" className="nav-img" /></div>
                      <span className="nav-text"> Utilization </span>
                    </div>
                    : ""}
                  {this.state.toggleSubMenu || this.state.selectedPath === '/longitudinalanalysis' || this.state.selectedPath === '/patientengagement' || this.state.selectedPath === '/utilization' || this.state.selectedPath === '/qualityofcare' ?
                    <div className={`nav-sub-container ${this.state.selectedPath === '/patientengagement' && 'selected'}`}

                      onClick={() => this.redirectTo("/patientengagement")}
                    >
                      <div className={`navicon ${this.state.selectedPath === '/patientengagement' && 'active'}`}> <img src="images/icons/patientEngagement.svg" className="nav-img" /></div>
                      <span className="nav-text"> Patient Engagement </span>
                    </div>
                    : ""} </div> : null
              }

              {
                permissions && permissions.includes("UM") ? <div> <div className={`nav-sub-container`}>
                  <div className={`navicon`}> <img src="images/icons/um.svg" className="nav-img" /></div>
                  <span className="nav-text" onClick={this.showUMSubMenus}> Utilization Mgmt <span style={{ marginLeft: "10px" }}><MDBIcon icon="caret-down" /></span></span>
                </div>
                  {this.state.toggleUMSubMenu || this.state.selectedPath === '/outpatient' || this.state.selectedPath === '/inpatient' || this.state.selectedPath === '/umnotes' || this.state.selectedPath === '/authview' || this.state.selectedPath === '/inpatientauthview' || this.state.selectedPath === '/inpatientnote' ?
                    <div className={`nav-sub-container ${this.state.selectedPath === '/outpatient' && 'selected'} ${this.state.patientName == null && 'disableaction'}`}

                      onClick={this.state.patientName == null ? null : () => this.redirectTo("/outpatient")}
                    >
                      <div className={`navicon ${(this.state.selectedPath === '/outpatient' || this.state.selectedPath === '/authview') && 'active'}`}> <img src="images/icons/umoutpatient.svg" className="nav-img" /></div>
                      <span className="nav-text"> Outpatient </span>
                    </div>
                    : ""}
                  {this.state.toggleUMSubMenu || this.state.selectedPath === '/outpatient' || this.state.selectedPath === '/inpatient' || this.state.selectedPath === '/umnotes' || this.state.selectedPath === '/authview' || this.state.selectedPath === '/inpatientauthview' || this.state.selectedPath === '/inpatientnote' ?
                    <div className={`nav-sub-container ${(this.state.selectedPath === '/inpatient' || this.state.selectedPath === '/inpatientauthview' || this.state.selectedPath === '/inpatientnote') && 'selected'} ${this.state.patientName == null && 'disableaction'}`}

                      onClick={this.state.patientName == null ? null : () => this.redirectTo("/inpatient")}
                    >
                      <div className={`navicon ${this.state.selectedPath === '/inpatient' && 'active'}`}> <img src="images/uminpatient.svg" className="nav-img" /></div>
                      <span className="nav-text"> Inpatient </span>
                    </div>
                    : ""} </div> : null
              }

              <div>
                <div className={`nav-sub-container`}>
                  <div className={`navicon`}> <img src="images/account.svg" className="nav-img" /></div>
                  <span className="nav-text" onClick={this.showManageacountMenus}> Manage Account <span style={{ marginLeft: "20px" }}><MDBIcon icon="caret-down" /></span></span>
                </div>

                {this.state.toggleManageaccountSubMenu || this.state.selectedPath === '/users' || this.state.selectedPath === '/adduser' || this.state.selectedPath === '/roles' || this.state.selectedPath === '/assignments' || this.state.selectedPath === '/messages' || this.state.selectedPath === '/educationmaterials' ?
                  <div className={`nav-sub-container ${this.state.selectedPath === '/users' && 'selected'}`}

                    onClick={() => this.redirectTo("/users")}
                  >
                    <div className={`navicon ${(this.state.selectedPath === '/users') && 'active'}`}><img src="images/users.png" className="nav-img" /></div>
                    <span className="nav-text"> Users </span>
                  </div>
                  : ""}
                {this.state.toggleManageaccountSubMenu ||  this.state.selectedPath === '/users' || this.state.selectedPath === '/adduser' || this.state.selectedPath === '/roles' || this.state.selectedPath === '/assignments' || this.state.selectedPath === '/messages' || this.state.selectedPath === '/educationmaterials' ?
                  <div className={`nav-sub-container ${this.state.selectedPath === '/adduser' && 'selected'}`}

                    onClick={() => this.redirectTo("/adduser")}
                  >
                    <div className={`navicon ${(this.state.selectedPath === '/adduser') && 'active'}`}><img src="images/adduser.png" className="nav-img" /></div>
                    <span className="nav-text"> Add Users </span>
                  </div>
                  : ""}
                {this.state.toggleManageaccountSubMenu || this.state.selectedPath === '/users' || this.state.selectedPath === '/adduser' || this.state.selectedPath === '/roles' || this.state.selectedPath === '/assignments' || this.state.selectedPath === '/messages' || this.state.selectedPath === '/educationmaterials' ?
                  <div className={`nav-sub-container ${this.state.selectedPath === '/roles' && 'selected'}`}

                    onClick={() => this.redirectTo("/roles")}
                  >
                    <div className={`navicon ${(this.state.selectedPath === '/roles') && 'active'}`}><img src="images/roles.png" className="nav-img" /></div>
                    <span className="nav-text"> Roles </span>
                  </div>
                  : ""}
                 {this.state.toggleManageaccountSubMenu || this.state.selectedPath === '/users' || this.state.selectedPath === '/adduser' || this.state.selectedPath === '/roles' || this.state.selectedPath === '/assignments' || this.state.selectedPath === '/messages' || this.state.selectedPath === '/educationmaterials' ?
                  <div className={`nav-sub-container ${this.state.selectedPath === '/assignments' && 'selected'}`}

                    onClick={() => this.redirectTo("/assignments")}
                  >
                    <div className={`navicon ${(this.state.selectedPath === '/assignments') && 'active'}`}><img src="images/assignments.png" className="nav-img" /></div>
                    <span className="nav-text"> Assignments</span>
                  </div>
                  : ""}
                 {this.state.toggleManageaccountSubMenu || this.state.selectedPath === '/users' || this.state.selectedPath === '/adduser' || this.state.selectedPath === '/roles' || this.state.selectedPath === '/assignments' || this.state.selectedPath === '/messages' || this.state.selectedPath === '/educationmaterials' ?
                  <div className={`nav-sub-container ${this.state.selectedPath === '/messages' && 'selected'}`}

                    onClick={() => this.redirectTo("/messages")}
                  >
                    <div className={`navicon ${(this.state.selectedPath === '/messages') && 'active'}`}><img src="images/message.png" className="nav-img" /></div>
                    <span className="nav-text"> Messages </span>
                  </div>
                  : ""}
                 {this.state.toggleManageaccountSubMenu || this.state.selectedPath === '/users' || this.state.selectedPath === '/adduser' || this.state.selectedPath === '/roles' || this.state.selectedPath === '/assignments' || this.state.selectedPath === '/messages' || this.state.selectedPath === '/educationmaterials' ?
                  <div className={`nav-sub-container ${this.state.selectedPath === '/educationmaterials' && 'selected'}`}

                    onClick={() => this.redirectTo("/educationmaterials")}
                  >
                    <div className={`navicon ${(this.state.selectedPath === '/educationmaterials') && 'active'}`}><img src="images/educationalmaterial.svg" className="nav-img" /></div>
                    <span className="nav-text"> Education Materials </span>
                  </div>
                  : ""}

              </div>


            </div>


          </div>

        </MDBSideNavNav>
      </MDBSideNav>

      // </StaticRouter>
    );
  }
}

export default SideNav;
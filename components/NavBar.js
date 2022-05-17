import React from 'react';
import { MDBNavbar, MDBBtn, MDBModal, MDBModalBody, MDBTypography, MDBNavbarBrand, MDBModalHeader, MDBNavbarNav, MDBBadge, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon, MDBModalFooter } from 'mdbreact';
import Link from 'next/link';
import { StaticRouter } from "react-router-dom";
import Router from 'next/router';
import WhiteSideBar from '../components/whiteSideBar'
import axios from 'axios';
import moment from 'moment';


const ImgUpload = ({
  onChange,
  src
}) =>
  <label htmlFor="photo-upload" className="custom-file-upload fas">
    <div className="img-wrap profileimage" >
      <img for="photo-upload" src={src} />
    </div>

    {/* <input id="photo-upload" onChange={onChange} type="file" accept=".png, .jpg, .jpeg, .svg, .heic" />  */}
  </label>

const NavbarImgUpload = ({
  onChange,
  src
}) =>
  <label htmlFor="photo-upload" className="fas">
    <div className="img-navbarwrap profileimage" >
      <img for="photo-upload" src={src} />
    </div>

    {/* <input id="photo-upload" onChange={onChange} type="file" accept=".png, .jpg, .jpeg, .svg, .heic" />  */}
  </label>

const Edit = ({
  onSubmit,
  children,
}) =>
  <div style={{textAlign: "center"}} onClick={onSubmit}>
    {children}
  </div>

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      nameclick: false,
      alerttoggle: false,
      seemore: false,
      selectedPath: '',
      routename: '',
      dashboardroutename: '',
      rpmroutename: '',
      roleName: 'admin',
      pop360teams: '',
      authNumber: '',
      inpatientauthNumber: '',
      role: "",
      dashboardalerts: [],
    };
    this.onClick = this.onClick.bind(this);
  }



  componentDidMount() {
    const { pathname } = Router
    this.setState({ selectedPath: pathname });
    let screenName = localStorage.getItem('screenName');
    let route = localStorage.getItem('health360details');
    let pop360teams = localStorage.getItem('pop360teams');
    let dashboardroute = localStorage.getItem('dashboarddetails');
    let rpmroute = localStorage.getItem('remotemoniteringdetails');
    let caremanagername = localStorage.getItem('careManagerFirstname');
    let caremanageremail = localStorage.getItem('caremanagerId');
    let assessment_ID = localStorage.getItem('assessment_id');
    let authNumber = localStorage.getItem('authNumber');
    let inpatientauthNumber = localStorage.getItem('inpatientauthNumber');
    let role = localStorage.getItem('role');
    let patientIds = [];
    this.setState({
      caremanagername, caremanageremail, role, routename: route, screenName: screenName, dashboardroutename: dashboardroute, rpmroutename: rpmroute, pop360teams, assessment_ID, authNumber, inpatientauthNumber
    })

    axios.get(`/api/getprofileimage`, {
      params: {
        id: caremanageremail,
        member_type: "CAREMANAGER"
      }
    })
      .then(res => {
        this.setState({
          imageresponse: res.data.json
        })
      })
    axios({
      method: 'GET',
      url: `/api/telemedicine`,
      params: {
        id: caremanageremail
      }
    })
      .then((response) => {
        let patientdetailsresponse = response && response.data && response.data.json;
        patientdetailsresponse && patientdetailsresponse.members && patientdetailsresponse.members.map((el) => {
          patientIds.push(el.patient_id);
        })
        this.setState({
          patient_ids: patientIds
        });
        let obj = {
          "query": { "bool": { "filter": { "terms": { "patient_id.keyword": patientIds } } } }
        }
        axios({
          method: 'POST',
          url: `/api/dashboardalerts`,
          data: obj
        })
          .then(res => {
            this.setState({ dashboardalerts: res.data.json.hits.hits });
          })
      })




  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  nameClick() {
    this.setState({
      alerttoggle: false,
      nameclick: true
    });
  }

  userprofiletoggle = () => {
    this.setState({
      nameclick: !this.state.nameclick
    });
  }

  alertclick() {
    this.setState({
      alerttoggle: true, seemore: false
    });
  }

  alerttoggle = () => {
    this.setState({
      alerttoggle: !this.state.alerttoggle, seemore: false
    });
  }
  seemoreClick = () => {
    this.setState({
      seemore: true
    });
  }



  render() {
    let color;
    if (this.state.role.toLowerCase() === "socialworker") {
      color = "#28b6f6";
    } else if (this.state.role.toLowerCase() === "doctor" || this.state.role.toLowerCase().includes("doctor")) {
      color = "#0288d1";
    } else if (this.state.role.toLowerCase() === "caremanager") {
      color = "#db1962";
    } else if (this.state.role.toLowerCase() === "super admin") {
      color = "#9e9e9e";
    } else if (this.state.role.toLowerCase() === "supervisor") {
      color = "#db1962";
    } else if (this.state.role.toLowerCase() === "nurse") {
      color = "#ff7367";
    } else if (this.state.role.toLowerCase() === "coordinator") {
      color = "#00897b";
    } else if (this.state.role.toLowerCase() === "md") {
      color = "#536dfe";
    } else if (this.state.role.toLowerCase() === "caregiver") {
      color = "#7cb342";
    } else if (this.state.role.toLowerCase() === "patient") {
      color = "#ff8a00";
    }
    let width;
    if (typeof window !== 'undefined') {
      width = window.innerWidth;
    }
    const bgPink = { background: 'transparent linear-gradient(180deg, #DB1962 0%, #7B1138 100%) 0% 0% no-repeat padding-box' }
    let route = this.state.routename;
    let dashboardroute = this.state.dashboardroutename;
    let rpmroute = this.state.rpmroutename;
    let pop360teams = this.state.pop360teams;
    let dashboardalerts = this.state.dashboardalerts;
    let unreadNotificationsCount = this.state.dashboardalerts.filter(el => !el._source.read_status).length;
    console.log(unreadNotificationsCount)
    return (
      <StaticRouter>
        <header>
          <MDBNavbar style={bgPink} dark expand="md" fixed="top">
            {width <= 1053 ? <WhiteSideBar handleSideNav={this.props.handleSideNav} userExpanded={this.props.userExpanded} pageInfo={this.props.pageInfo} sidenavHover={this.props.sidenavHover} /> : ""}
            {/* <span style={{color:"red"}}>Menu</span> */}
            <MDBNavbarBrand>
              {width > 992 ?
                <MDBTypography tag="h5" variant="h5-responsive" style={{ fontWeight: "400" }} className="header-title responsivelogo"><span style={{ cursor: "pointer" }} onClick={() => window.location.href = "/dashboard"}>careassistant.ai</span>
                  {` > `}
                  {this.state.selectedPath == "/health360" ? "health360" : null}
                  {this.state.selectedPath == "/manageaccount" ? "Personal Info" : null}
                  {this.state.selectedPath == "/users" ? "Manage Account > Users" : null}
                  {this.state.selectedPath == "/roles" ? "Manage Account > Roles" : null}
                  {this.state.selectedPath == "/messages" ? "Manage Account > Messages" : null}
                  {this.state.selectedPath == "/adduser" ? "Manage Account > Add Users" : null}
                  {this.state.selectedPath == "/assignments" ? "Manage Account > Assignments" : null}
                  {this.state.selectedPath == "/educationmaterials" ? "Manage Account > Educational Materials" : null}
                  {this.state.selectedPath == "/health360details" && route == "riskscore" ? <> <a onClick={() => Router.back()}> {this.state.screenName} </a>{` > Risk Score`}</> : null}
                  {this.state.selectedPath == "/health360details" && route == "conditions" ? <> <a onClick={() => Router.back()}> {this.state.screenName}</a>{` > Conditions`}</> : null}
                  {this.state.selectedPath == "/health360details" && route == "medications" ? <> <a onClick={() => Router.back()}> {this.state.screenName}</a>{` > Medications`}</> : null}
                  {this.state.selectedPath == "/health360details" && route == "observations" ? <> <a onClick={() => Router.back()}> {this.state.screenName}</a>{` > Observations`}</> : null}
                  {this.state.selectedPath == "/health360details" && route == "procedures" ? <> <a onClick={() => Router.back()}> {this.state.screenName}</a>{` > Procedures`}</> : null}
                  {this.state.selectedPath == "/health360details" && route == "encounters" ? <> <a onClick={() => Router.back()}> {this.state.screenName}</a>{` > Encounters`}</> : null}
                  {this.state.selectedPath == "/health360details" && route == "assessments" ? <> <a onClick={() => Router.back()}> {this.state.screenName}</a>{` > Assessments`}</> : null}
                  {this.state.selectedPath == "/health360details" && route == "allergies" ? <> <a onClick={() => Router.back()}> {this.state.screenName}</a>{` > Allergies`}</> : null}
                  {this.state.selectedPath == "/health360details" && route == "immunizations" ? <> <a onClick={() => Router.back()}> {this.state.screenName}</a>{` > Immunizations`}</> : null}
                  {this.state.selectedPath == "/health360details" && route == "imaging" ? <> <a onClick={() => Router.back()}> {this.state.screenName}</a>{` > Imaging`}</> : null}
                  {this.state.selectedPath == "/dashboard" ? "Dashboard" : null}
                  {this.state.selectedPath == "/dashboarddetails" && dashboardroute == "alerts" ? <> <a onClick={() => Router.back()}> Dashboard</a>{` > Alert`}</> : null}
                  {this.state.selectedPath == "/dashboarddetails" && dashboardroute == "tasks" ? <> <a onClick={() => Router.back()}> Dashboard</a>{` > Task`}</> : null}
                  {this.state.selectedPath == "/dashboarddetails" && dashboardroute == "assessments" ? <> <a onClick={() => Router.back()}> Dashboard</a>{` > Assessment`}</> : null}
                  {this.state.selectedPath == "/dashboarddetails" && dashboardroute == "events" ? <> <a onClick={() => Router.back()}> Dashboard</a>{` > Events`}</> : null}
                  {this.state.selectedPath == "/pop360" ? "Pop360" : null}
                  {this.state.selectedPath == "/pop360teams" && pop360teams == "pop360teams" ? <> <a onClick={() => Router.back()}> Pop360</a>{` > Care Management Team`}</> : null}
                  {this.state.selectedPath == "/patientlist" ? "Patient List" : null}
                  {this.state.selectedPath == "/timeline" ? "Timeline" : null}
                  {this.state.selectedPath == "/assessmentlist" ? "Assessment" : null}
                  {this.state.selectedPath == "/assessmentcompletion" ? <> <a onClick={() => Router.back()}> Assessment</a>{` > Health Risk Sssessment`}</> : null}
                  {this.state.selectedPath == "/postdischarge" ? <> <a onClick={() => Router.back()}> Assessment</a>{` > Post Discharge Assessment`}</> : null}
                  {this.state.selectedPath == "/diabets" ? <> <a onClick={() => Router.back()}> Assessment</a>{` > Diabetes Assessment`}</> : null}
                  {this.state.selectedPath == "/hypertension" ? <> <a onClick={() => Router.back()}> Assessment</a>{` > Hypertension Assessment`}</> : null}
                  {this.state.selectedPath == "/BehavioralHealth" ? <> <a onClick={() => Router.back()}> Assessment</a>{` > Behavioral Health Assessment`}</> : null}
                  {this.state.selectedPath == "/hra" ? <> <a onClick={() => Router.back()}> Assessment</a>{` > health risk assessment`}</> : null}
                  {this.state.selectedPath == "/assessment" && this.state.assessment_ID == "HRA001" ? <> <a onClick={() => window.location.href = "/assessmentlist"}> Assessment</a>{` > Health Risk Assessment`}</> : null}
                  {this.state.selectedPath == "/assessment" && this.state.assessment_ID == "PDA001" ? <> <a onClick={() => window.location.href = "/assessmentlist"}> Assessment</a>{` > Post Discharge Assessment`}</> : null}
                  {this.state.selectedPath == "/assessment" && this.state.assessment_ID == "DIA001" ? <> <a onClick={() => window.location.href = "/assessmentlist"}> Assessment</a>{` > Diabetes Assessment`}</> : null}
                  {this.state.selectedPath == "/assessment" && this.state.assessment_ID == "BHA001" ? <> <a onClick={() => window.location.href = "/assessmentlist"}> Assessment</a>{` > Behavioral Health Assessment`}</> : null}
                  {this.state.selectedPath == "/assessment" && this.state.assessment_ID == "HTA001" ? <> <a onClick={() => window.location.href = "/assessmentlist"}> Assessment</a>{` > Hypertension Assessment`}</> : null}
                  {this.state.selectedPath == "/remotemonitering" ? "RPM" : null}
                  {this.state.selectedPath == "/remotemoniteringdetails" && rpmroute == "bloodpressure" ? <> <a onClick={() => Router.back()}> RPM</a>{` > Blood Pressure`}</> : null}
                  {this.state.selectedPath == "/remotemoniteringdetails" && rpmroute == "glucosemonitering" ? <> <a onClick={() => Router.back()}> RPM</a>{` > Continuous Glucose Monitoring`}</> : null}
                  {this.state.selectedPath == "/remotemoniteringdetails" && rpmroute == "heartratemoniter" ? <> <a onClick={() => Router.back()}> RPM</a>{` > Daily Heart Rate Monitor`}</> : null}
                  {this.state.selectedPath == "/remotemoniteringdetails" && rpmroute == "oximetryreading" ? <> <a onClick={() => Router.back()}> RPM</a>{` > Daily Oximetry Readings`}</> : null}
                  {this.state.selectedPath == "/remotemoniteringdetails" && rpmroute == "ekgreadings" ? <> <a onClick={() => Router.back()}> RPM</a>{` > EKG Readings`}</> : null}
                  {this.state.selectedPath == "/remotemoniteringdetails" && rpmroute == "Triglycerides" ? <> <a onClick={() => Router.back()}> RPM</a>{` > Total Cholesterol`}</> : null}
                  {this.state.selectedPath == "/remotemoniteringdetails" && rpmroute == "overweightBMI" ? <> <a onClick={() => Router.back()}> RPM</a>{` > Overweight BMI`}</> : null}
                  {this.state.selectedPath == "/remotemoniteringdetails" && rpmroute == "underweightBMI" ? <> <a onClick={() => Router.back()}> RPM</a>{` > Underweight BMI`}</> : null}
                  {this.state.selectedPath == "/telemedicine" ? "Telemedicine" : null}
                  {this.state.selectedPath == "/careplan" ? "Careplan" : null}
                  {this.state.selectedPath == "/notes" ? "Notes" : null}
                  {this.state.selectedPath == "/longitudinalanalysis" ? <> <a onClick={() => window.location.href = "/longitudinalanalysis"}>{`Longitudinal Analysis`}</a></> : null}
                  {this.state.selectedPath == "/qualityofcare" ? <> <a onClick={() => window.location.href = "/qualityofcare"}>{`Quality of Care`}</a></> : null}
                  {this.state.selectedPath == "/utilization" ? <> <a onClick={() => window.location.href = "/utilization"}>{`Utilization`}</a></> : null}
                  {this.state.selectedPath == "/patientengagement" ? <> <a onClick={() => window.location.href = "/patientengagement"}>{`Patient Engagement`}</a></> : null}
                  {this.state.selectedPath == "/outpatient" ? <> <a onClick={() => window.location.href = "/outpatient"}> Utilization Management</a>{` > Outpatient`}</> : null}
                  {this.state.selectedPath == "/inpatient" ? <> <a onClick={() => window.location.href = "/dashboard"}> Utilization Management</a>{` > Inpatient`}</> : null}
                  {this.state.selectedPath == "/umnotes" ? <> <a onClick={() => window.location.href = "/outpatient"}> Utilization Management</a>{` > UM Notes`}</> : null}
                  {this.state.selectedPath == "/authview" ? <> <a onClick={() => window.location.href = "/outpatient"}> Utilization Management</a>{" > " + this.state.authNumber}</> : null}
                  {this.state.selectedPath == "/inpatientauthview" ? <> <a onClick={() => window.location.href = "/inpatient"}> Utilization Management</a>{" > " + this.state.authNumber}</> : null}
                  {this.state.selectedPath == "/inpatientnote" ? <> <a onClick={() => window.location.href = "/inpatient"}> Utilization Management</a>{" > " + this.state.authNumber + " > " + "Inpatient Note"}</> : null}
                </MDBTypography> :
                <MDBTypography tag="h5" variant="h5-responsive" style={{ fontWeight: "400" }} className="header-title responsivelogo">
                  {this.state.selectedPath == "/dashboard" ? <> <a onClick={() => window.location.href = "/dashboard"}>{`careassitant.ai`}</a></> : null}
                  {this.state.selectedPath == "/health360" ? <> <a onClick={() => window.location.href = "/health360"}>{`health360`}</a></> : null}
                  {this.state.selectedPath == "/manageaccount" ? <> <a onClick={() => window.location.href = "/dashboard"}>{`< Personal Info`}</a></> : null}
                  {this.state.selectedPath == "/users" ? <> <a onClick={() => window.location.href = "/manageaccount"}>{`< Users`}</a></> : null}
                  {this.state.selectedPath == "/roles" ? <> <a onClick={() => window.location.href = "/manageaccount"}>{`< Roles`}</a></> : null}
                  {this.state.selectedPath == "/messages" ? <> <a onClick={() => window.location.href = "/manageaccount"}>{`< Messages`}</a></> : null}
                  {this.state.selectedPath == "/adduser" ? <> <a onClick={() => window.location.href = "/manageaccount"}>{`< Add User`}</a></> : null}
                  {this.state.selectedPath == "/educationmaterials" ? <> <a onClick={() => window.location.href = "/manageaccount"}>{`< Education Material`}</a></> : null}
                  {this.state.selectedPath == "/health360details" && route == "riskscore" ? <><a onClick={() => window.location.href = "/health360"}>{`< Risk Score`}</a></> : null}
                  {this.state.selectedPath == "/health360details" && route == "conditions" ? <><a onClick={() => window.location.href = "/health360"}>{`< Conditions`}</a></> : null}
                  {this.state.selectedPath == "/health360details" && route == "medications" ? <><a onClick={() => window.location.href = "/health360"}>{`< Medications`}</a></> : null}
                  {this.state.selectedPath == "/health360details" && route == "observations" ? <><a onClick={() => window.location.href = "/health360"}>{`< Observations`}</a></> : null}
                  {this.state.selectedPath == "/health360details" && route == "procedures" ? <><a onClick={() => window.location.href = "/health360"}>{`< Procedures`}</a></> : null}
                  {this.state.selectedPath == "/health360details" && route == "encounters" ? <><a onClick={() => window.location.href = "/health360"}>{`< Encounters`}</a></> : null}
                  {this.state.selectedPath == "/health360details" && route == "assessments" ? <><a onClick={() => window.location.href = "/health360"}>{`< Assessments`}</a></> : null}
                  {this.state.selectedPath == "/health360details" && route == "allergies" ? <><a onClick={() => window.location.href = "/health360"}>{`< Allergies`}</a></> : null}
                  {this.state.selectedPath == "/health360details" && route == "immunizations" ? <><a onClick={() => window.location.href = "/health360"}>{`< Immunizations`}</a></> : null}
                  {this.state.selectedPath == "/health360details" && route == "imaging" ? <><a onClick={() => window.location.href = "/health360"}>{`< Imaging`}</a></> : null}
                  {/* {this.state.selectedPath == "/dashboard" ? "Dashboard" : null } */}
                  {this.state.selectedPath == "/dashboarddetails" && dashboardroute == "alerts" ? <> <a onClick={() => window.location.href = "/dashboard"}>{`< Alert`}</a></> : null}
                  {this.state.selectedPath == "/dashboarddetails" && dashboardroute == "tasks" ? <> <a onClick={() => window.location.href = "/dashboard"}>{`< Task`}</a></> : null}
                  {this.state.selectedPath == "/dashboarddetails" && dashboardroute == "assessments" ? <> <a onClick={() => window.location.href = "/dashboard"}>{`< Assessment`}</a></> : null}
                  {this.state.selectedPath == "/dashboarddetails" && dashboardroute == "events" ? <> <a onClick={() => window.location.href = "/dashboard"}>{`< Event`}</a></> : null}
                  {this.state.selectedPath == "/pop360" ? <> <a onClick={() => window.location.href = "/dashboard"}>{`< pop360`}</a></> : null}
                  {this.state.selectedPath == "/pop360teams" && pop360teams == "pop360teams" ? <><a onClick={() => window.location.href = "/pop360"}>{`< Care Management Team`}</a></> : null}
                  {this.state.selectedPath == "/patientlist" ? <><a onClick={() => window.location.href = "/dashboard"}>{`< Patient List`}</a></> : null}
                  {this.state.selectedPath == "/timeline" ? <><a onClick={() => window.location.href = "/dashboard"}>{`< Timeline`}</a></> : null}
                  {this.state.selectedPath == "/assessmentlist" ? <><a onClick={() => window.location.href = "/dashboard"}>{`< Assessment`}</a></> : null}
                  {this.state.selectedPath == "/assessmentcompletion" ? <><a onClick={() => window.location.href = "/assessmentlist"}>{`< Health Risk Assessment`}</a></> : null}
                  {this.state.selectedPath == "/postdischarge" ? <><a onClick={() => window.location.href = "/assessmentlist"}>{`< Post Discharge Assessment`}</a></> : null}
                  {this.state.selectedPath == "/diabets" ? <><a onClick={() => window.location.href = "/assessmentlist"}>{`< Diabetes Assessment`}</a></> : null}
                  {this.state.selectedPath == "/hypertension" ? <><a onClick={() => window.location.href = "/assessmentlist"}>{`< Hypertension Assessment`}</a></> : null}
                  {this.state.selectedPath == "/BehavioralHealth" ? <><a onClick={() => window.location.href = "/assessmentlist"}>{`< Behavioral Health Assessment`}</a></> : null}
                  {this.state.selectedPath == "/hra" ? <><a onClick={() => window.location.href = "/assessmentlist"}>{`< Health Risk Assessment`}</a></> : null}
                  {this.state.selectedPath == "/assessment" && this.state.assessment_ID == "HRA001" ? <> <a onClick={() => window.location.href = "/assessmentlist"}>{`< Health Risk Assessment`}</a></> : null}
                  {this.state.selectedPath == "/assessment" && this.state.assessment_ID == "PDA001" ? <> <a onClick={() => window.location.href = "/assessmentlist"}>{`< Post Discharge Assessment`}</a></> : null}
                  {this.state.selectedPath == "/assessment" && this.state.assessment_ID == "DIA001" ? <> <a onClick={() => window.location.href = "/assessmentlist"}>{`< Diabetes Assessment`}</a></> : null}
                  {this.state.selectedPath == "/assessment" && this.state.assessment_ID == "BHA001" ? <> <a onClick={() => window.location.href = "/assessmentlist"}>{`< Behavioral Health Assessment`}</a></> : null}
                  {this.state.selectedPath == "/assessment" && this.state.assessment_ID == "HTA001" ? <> <a onClick={() => window.location.href = "/assessmentlist"}>{`< Hypertension Assessment`}</a></> : null}
                  {this.state.selectedPath == "/remotemonitering" ? <> <a onClick={() => window.location.href = "/dashboard"}>{`< RPM`}</a></> : null}
                  {this.state.selectedPath == "/remotemoniteringdetails" && rpmroute == "bloodpressure" ? <> <a onClick={() => window.location.href = "/remotemonitering"}>{`< Blood Pressure`}</a></> : null}
                  {this.state.selectedPath == "/remotemoniteringdetails" && rpmroute == "glucosemonitering" ? <> <a onClick={() => window.location.href = "/remotemonitering"}>{`< Continuous Glucose Monitoring`}</a></> : null}
                  {this.state.selectedPath == "/remotemoniteringdetails" && rpmroute == "heartratemoniter" ? <> <a onClick={() => window.location.href = "/remotemonitering"}>{`< Daily Heart Rate Monitor`}</a></> : null}
                  {this.state.selectedPath == "/remotemoniteringdetails" && rpmroute == "oximetryreading" ? <> <a onClick={() => window.location.href = "/remotemonitering"}>{`< Daily Oximetry Readings`}</a></> : null}
                  {this.state.selectedPath == "/remotemoniteringdetails" && rpmroute == "ekgreadings" ? <> <a onClick={() => window.location.href = "/remotemonitering"}>{`< EKG Readings`}</a></> : null}
                  {this.state.selectedPath == "/remotemoniteringdetails" && rpmroute == "Triglycerides" ? <> <a onClick={() => window.location.href = "/remotemonitering"}>{`< Total Cholesterol`}</a></> : null}
                  {this.state.selectedPath == "/remotemoniteringdetails" && rpmroute == "overweightBMI" ? <> <a onClick={() => window.location.href = "/remotemonitering"}>{`< Overweight BMI`}</a></> : null}
                  {this.state.selectedPath == "/remotemoniteringdetails" && rpmroute == "underweightBMI" ? <> <a onClick={() => window.location.href = "/remotemonitering"}>{`< Underweight BMI`}</a></> : null}
                  {this.state.selectedPath == "/telemedicine" ? <> <a onClick={() => window.location.href = "/dashboard"}>{`< Telemedicine`}</a></> : null}
                  {this.state.selectedPath == "/careplan" ? <> <a onClick={() => window.location.href = "/dashboard"}>{`< Careplan`}</a></> : null}
                  {this.state.selectedPath == "/notes" ? <> <a onClick={() => window.location.href = "/dashboard"}>{`< Notes`}</a></> : null}
                  {this.state.selectedPath == "/longitudinalanalysis" ? <> <a onClick={() => window.location.href = "/longitudinalanalysis"}>{`< Longitudinal Analysis`}</a></> : null}
                  {this.state.selectedPath == "/qualityofcare" ? <> <a onClick={() => window.location.href = "/qualityofcare"}>{`< Quality of Care`}</a></> : null}
                  {this.state.selectedPath == "/utilization" ? <> <a onClick={() => window.location.href = "/utilization"}>{`< Utilization`}</a></> : null}
                  {this.state.selectedPath == "/patientengagement" ? <> <a onClick={() => window.location.href = "/patientengagement"}>{`< Patient Engagement`}</a></> : null}
                  {this.state.selectedPath == "/outpatient" ? <> <a onClick={() => window.location.href = "/dashboard"}>{` < Outpatient`}</a></> : null}
                  {this.state.selectedPath == "/inpatient" ? <> <a onClick={() => window.location.href = "/dashboard"}>{` < Inpatient`}</a></> : null}
                  {this.state.selectedPath == "/umnotes" ? <> <a onClick={() => window.location.href = "/dashboard"}>{` < UM Notes`}</a></> : null}
                  {this.state.selectedPath == "/authview" ? <> <a onClick={() => window.location.href = "/outpatient"}>{" < " + this.state.authNumber}</a></> : null}
                  {this.state.selectedPath == "/inpatientauthview" ? <> <a onClick={() => window.location.href = "/inpatient"}>{" < " + this.state.authNumber}</a></> : null}
                  {this.state.selectedPath == "/inpatientnote" ? <> <a onClick={() => window.location.href = "/inpatient"}> {" > " + this.state.authNumber + " > " + "Inpatient Note"}</a></> : null}
                  {/* {this.state.selectedPath == "/assessmentlist" ? <> <a onClick={() => window.location.href="/dashboard"}>careassistant.ai</a>{` > Assessment`}</> : null }
                {this.state.selectedPath == "/assessment" && this.state.assessment_ID == "HRA001" ? <> <a onClick={() => window.location.href="/assessmentlist"}>{` < Health Risk Assessment`}</a></> : null } */}
                </MDBTypography>
              }
            </MDBNavbarBrand>
            {/* version 9 */}
            <MDBNavbarNav right className="navbaricons">

              <img src="/images/icons/Bell-Alert-Notification.svg" alt="Logo" style={{ cursor: "pointer" }} onClick={this.alertclick.bind(this)} className="white-text menu-img">
              </img><span className="notificationbadge">{unreadNotificationsCount}</span>

              {this.state.imageresponse == undefined ?
                <div className="userprofileicons counter-texticon menu-icon" onClick={this.nameClick.bind(this)}>
                  <span>HP</span>
                </div> :
                <Edit onSubmit={this.nameClick.bind(this)}>
                  <NavbarImgUpload src={"data:image/jpeg;base64," + this.state.imageresponse} />
                </Edit>
              }





            </MDBNavbarNav>
          </MDBNavbar>
        </header>

        <MDBModal isOpen={this.state.nameclick} toggle={this.userprofiletoggle} side position="top-right" className="userprofilemodal">
          <MDBModalBody>
            <div className="profile-section" style={{ marginTop: "16px" }}>

              {this.state.imageresponse == undefined ?
                <div className="profile-circle" style={{ backgroundColor: color }}>
                  <span>HP</span>
                </div>
                 :
                <Edit>
                  <ImgUpload src={"data:image/jpeg;base64," + this.state.imageresponse} />
                </Edit>}


            </div>
            <MDBTypography tag="h6" className="userprofilename">{this.state.caremanagername}</MDBTypography>
            <MDBTypography tag="h6" className="userprofiledesignation">{this.state.role}</MDBTypography>
            <MDBTypography tag="h6" className="userprofileemail">{this.state.caremanageremail}</MDBTypography>
            <div className="text-center" style={{ marginTop: "20px" }}>
              <a href="/manageaccount">
                <MDBBtn className="manage-account"> PERSONAL INFO </MDBBtn>
              </a>
            </div>
            <div className="text-center">
              <a href="/">
                <MDBBtn className="sign-out"> Sign Out</MDBBtn>
              </a>
            </div>
           </MDBModalBody>
        </MDBModal>
        <MDBModal backdrop={false} isOpen={this.state.alerttoggle} toggle={this.alerttoggle} className="alertsmodal">
          <MDBModalHeader>
            <h5 className="alertsheading">Notification <MDBBadge pill color="pink">{unreadNotificationsCount}</MDBBadge></h5>
          </MDBModalHeader>

          <MDBModalBody style={{ minHeight: "20px", maxHeight: "380px", overflowY: "auto" }}>
            <div className="alerts">
              {
                this.state.dashboardalerts.map((el)=>{
                  return(
                    <div>
                    <p className="alertnotificationheading">{el._source.alert_type}</p>
                    { el._source.read_status ? <p className="readalertnotificationsubheading">{el._source.title}</p> :  <p className="alertnotificationsubheading">{el._source.title}</p> }
                    <p className="alertnotificationdescription">{el._source.description}</p>
                    <p className="alertnotificationdate">{moment(el._source.created_datetime).format("MM/DD/YYYY, h:mm:ss a")}</p>
      
                    <hr />
                  </div>
                  )
                })
              }
              
           </div>
          </MDBModalBody>
          <MDBModalFooter>
            <div className="text-right">
              <MDBBtn flat className="alertflatbutton" onClick={this.alerttoggle}>Close</MDBBtn>
              {/* <MDBBtn flat className="alertflatbutton" onClick={this.seemoreClick.bind(this)}>See more</MDBBtn> */}
            </div>
          </MDBModalFooter>
        </MDBModal>

      </StaticRouter>


    );
  }
}

export default Navbar;


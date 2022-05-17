import React from "react";
import { MDBIcon } from "mdbreact";



class SideBar extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        isOpen: false
      };
}

  handleToggle = () => {
    this.setState(
      {
        isOpen: !this.state.isOpen
      },
      () => {
        if(this.props.handleSideNav) this.props.handleSideNav(this.state.isOpen)
      }
    );
  };
componentDidMount(){
  this.setState({ isOpen: false })
}


  render() {
    let SideBarIconStyle = this.props.screenwidth <= 1053 ? "showdarkIcon" : "";
    let hoveredClassname = this.props.sidenavHover  ? "hovered" : "";
    let menuIconClass = (this.props.pageInfo === "/dashboard") || (this.props.pageInfo === "/dashboarddetails") || (this.props.pageInfo === "/patientlist") || (this.props.pageInfo === "/pop360") || (this.props.pageInfo === "/pop360teams") || (this.props.pageInfo === "/manageaccount") || (this.props.pageInfo === "/users") || (this.props.pageInfo === "/educationmaterials") || (this.props.pageInfo === "/adduser") || (this.props.pageInfo === "/roles") || (this.props.pageInfo === "/messages") || (this.props.pageInfo === "/assignments") || (this.props.pageInfo === "/health360" && this.props.patientId === true) || (this.props.pageInfo === "/health360details" && this.props.patientId === true) || (this.props.pageInfo === "/telemedicine" && this.props.patientId === true) || (this.props.pageInfo === "/timeline" && this.props.patientId === true) || (this.props.pageInfo === "/assessment" && this.props.patientId === true) || (this.props.pageInfo === "/remotemonitering" && this.props.patientId === true) || (this.props.pageInfo === "/remotemoniteringdetails" && this.props.patientId === true) || (this.props.pageInfo === "/careplan" && this.props.patientId === true) || (this.props.pageInfo === "/notes" && this.props.patientId === true) || (this.props.pageInfo === "/longitudinalanalysis") || (this.props.pageInfo === "/qualityofcare") || (this.props.pageInfo === "/utilization") || (this.props.pageInfo === "/patientengagement") || (this.props.pageInfo === "/outpatient" && this.props.patientId === true) || (this.props.pageInfo === "/inpatient" && this.props.patientId === true) || (this.props.pageInfo === "/umnotes" && this.props.patientId === true) || (this.props.pageInfo === "/authview" && this.props.patientId === true) || (this.props.pageInfo === "/inpatientauthview" && this.props.patientId === true) || (this.props.pageInfo === "/inpatientnote" && this.props.patientId === true)? "newClass" : "" ;
    const { isOpen } = this.state;
    return (
        <div className={`menu-button-container ${isOpen && 'opened'} ${this.props.userExpanded && 'expanded'} ` + menuIconClass + " " + hoveredClassname}>
            <MDBIcon icon="bars" size="lg" onClick={this.handleToggle}/>
        </div>
    );
  }
}

export default SideBar;
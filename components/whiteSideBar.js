import React from "react";
import { MDBIcon } from "mdbreact";

class whiteSideBar extends React.Component {
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
    let hoveredClassname = this.props.sidenavHover  ? "hovered" : "";
    let menuIconClass = (this.props.pageInfo === "/dashboard") || (this.props.pageInfo === "/dashboarddetails") || (this.props.pageInfo === "/patientlist") || (this.props.pageInfo === "/pop360") || (this.props.pageInfo === "/pop360teams") ? "newClass" : "" ;
    const { isOpen } = this.state;
    return (
        <div className={`menu-button-container ${isOpen && 'opened'} ` + menuIconClass + " " + hoveredClassname + " "+ "whiteIcon"}>
            <MDBIcon icon="bars" size="lg" onClick={this.handleToggle} className="whitecolor"/>
        </div>
    );
  }
}

export default whiteSideBar;
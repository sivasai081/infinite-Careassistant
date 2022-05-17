import React, { Component } from "react";
import Head from 'next/head'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Layout from '../components/layout';
import Link from 'next/link';
import { MDBTypography, MDBProgress, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBIcon, MDBInput, MDBDatePicker } from "mdbreact";
import manageaccountstyle from '../styles/manageaccount';
import axios from 'axios';
import * as Constants from '../constants/constant';

const ImgUpload = ({
  onChange,
  src
}) =>
  <label htmlFor="photo-upload" className="personal-custom-file-upload fas filetypeicon">
    <div className="img-wrap img-upload profileimage" >
      <img for="photo-upload" src={src} />
      <input id="photo-upload" type="file" onChange={onChange} />
    </div>
  </label>
const Edit = ({
  onSubmit,
  children,
}) =>
  <div onClick={onSubmit}>
    {children}
  </div>

class ManageAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      changepassword: false,
      newpassworderror: false,
      confirmationmodal: false,
      newpassword: "",
      patient_uuid: {
        firstname: "",
        lastname: "",
        primaryphone: "",
        id: ""
      },
    };
  }

  componentDidMount() {
    localStorage.setItem("roleName", "supervisor");
    let role = localStorage.getItem("role")
    let roleName = localStorage.getItem("roleName");
    let email = localStorage.getItem("caremanagerId");
    this.setState({
      roleName: roleName,
      role: role,
      email: email
    });
    axios({
      method: 'GET',
      url: `/api/careteammemberdetail`,
      params: {
        email: email
      }
    })
      .then((response) => {
        this.setState({
          patient_uuid: response.data.json.result && response.data.json.result
        })

      })

    axios.get(`/api/getprofileimage`, {
      params: {
        id: email,
        member_type: "CAREMANAGER"
      }
    })
      .then(res => {
        this.setState({
          imageresponse: res.data.json
        })
      })
  }

  changepasswordtoggle = () => {
    this.setState({
      changepassword: !this.state.changepassword
    });
  }

  changedpasswordconfirmationtoggle = () => {
    this.setState({
      confirmationmodal: !this.state.confirmationmodal
    });
  }

  CloseChangePassword = () => {
    this.setState({
      confirmationmodal: false
    }, () => {
      window.location.href = "/"
    });
  }

  handleSubmit = () => {
    if (this.state.newpassword == "") {
      this.setState({ newpassworderror: true })
    } else {
      let data = {
        username: this.state.email,
        email_id: this.state.email,
        new_password: this.state.newpassword
      }
      axios({
        method: 'POST',
        url: `/api/changepassword`,
        data: {
          username: this.state.email,
          email_id: this.state.email,
          new_password: this.state.newpassword
        }
      })
        .then((response) => {
          console.log(response)
          this.setState({ changepassword: false, confirmationmodal: true })
        })


    }

  }

  handleChangePassword = () => {
    this.setState({
      changepassword: true, newpassword: "", newpassworderror: false
    });
  }

  handlePasswordChage = (e) => {
    this.setState({
      newpassword: e.target.value
    }, () => {
      if (this.state.newpassword == "") {
        this.setState({ newpassworderror: true })
      } else {
        this.setState({ newpassworderror: false })
      }
    });
  }

  photoUpload = e => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file)
    let formData = new FormData();
    formData.append('file', file)
    formData.append('id', this.state.email)
    formData.append('member_type', "CAREMANAGER")
    axios({
      method: 'POST',
      url: `/api/profileimage`,
      data: formData

    })
      .then((response) => {
        window.location.href = "/dashboard"
      })
      .catch((err) => {
        console.log("err", err)
      })

  }

  render() {
    let patientdetails = this.state.patient_uuid;
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
    return (
      <React.Fragment>
        <Head>
          <title>Healthlligence</title>
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
        </Head>
        <Layout>
          <MDBTypography tag="h5" className="personal-info">Personal Info</MDBTypography>
          <MDBTypography tag="h6" className="basic-info"> Basic info, like your name and email, that you use on careassistant.ai </MDBTypography>
          <div className="profile-section" style={{ marginTop: "16px" }}>
            <div style={{ backgroundColor: color, display: "flex", justifyContent: "center" }}>

              {this.state.imageresponse == undefined ? <div className="profile-circle" style={{ backgroundColor: color }}>
                <span>HP</span>
              </div> : <Edit>
                <ImgUpload onChange={this.photoUpload} src={"data:image/jpeg;base64," + this.state.imageresponse} />
              </Edit>

              }



            </div>



          </div>
          <MDBCard style={{ maxWidth: "900px", margin: "0 auto", marginTop: "24px" }}>
            <MDBCardBody>
              <MDBRow>
                <MDBCol sm="6" md="6" lg="4">
                  <p className="manageuserdeatilslabel"> Name</p>
                </MDBCol>
                <MDBCol sm="6" md="6" lg="8">
                  <p className="manageuserdeatilsvalue"> {patientdetails.firstname + " " + patientdetails.lastname}</p>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="6" md="6" lg="4">
                  <p className="manageuserdeatilslabel"> Email</p>
                </MDBCol>
                <MDBCol sm="6" md="6" lg="8">
                  <p className="manageuserdeatilsvalue"> {this.state.email}</p>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="6" md="6" lg="4">
                  <p className="manageuserdeatilslabel"> Specialization</p>
                </MDBCol>
                <MDBCol sm="6" md="6" lg="8">
                  <p className="manageuserdeatilsvalue"> {patientdetails.specialization} </p>
                </MDBCol>
              </MDBRow>
              <hr />

              <MDBRow>
                <MDBCol sm="6" md="6" lg="4">
                  <p className="manageuserdeatilslabel"> Password</p>
                </MDBCol>
                <MDBCol sm="6" md="6" lg="8">

                  <MDBRow>
                    <MDBCol sm="6" md="6" lg="8">
                      <p className="manageuserdeatilsvalue"> .................. </p>
                    </MDBCol>
                    <MDBCol sm="6" md="6" lg="4">
                      <MDBBtn color="primary" className="changepasswordbutton" onClick={this.handleChangePassword}>Change Password</MDBBtn>
                    </MDBCol>
                  </MDBRow>


                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="6" md="6" lg="4">
                  <p className="manageuserdeatilslabel"> ID </p>
                </MDBCol>
                <MDBCol sm="6" md="6" lg="8">
                  <p className="manageuserdeatilsvalue"> {patientdetails.id}</p>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="6" md="6" lg="4">
                  <p className="manageuserdeatilslabel"> Role</p>
                </MDBCol>
                <MDBCol sm="6" md="6" lg="8">
                  <p className="manageuserdeatilsvalue"> {patientdetails.role}</p>
                </MDBCol>
              </MDBRow>

            </MDBCardBody>

          </MDBCard>
          <MDBModal isOpen={this.state.changepassword} toggle={this.changepasswordtoggle} className="educationalmodal">
            <MDBModalHeader className="modaltitle" toggle={this.changepasswordtoggle}>Change Password</MDBModalHeader>
            <MDBModalBody className="newproblemmodalbody" style={{ marginLeft: "12px" }}>
              <MDBRow>
                <MDBCol md="12" className="disabledfield">
                  <MDBInput label="Email" disabled value={this.state.email} />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="12" className="disabledfield">
                  <MDBInput label="Username" disabled value={this.state.email} />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="12">
                  <MDBInput label="New Password" onChange={this.handlePasswordChage.bind(this)} />
                  {
                    this.state.newpassworderror ? <p style={{ marginTop: "-12px", color: "#DB1962", fontSize: "12px" }}>Please Enter the Valid Password</p> : null
                  }
                </MDBCol>
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn flat className="flatbutton" onClick={this.changepasswordtoggle}>Cancel</MDBBtn>
              <MDBBtn flat className="flatbutton" onClick={this.handleSubmit}>Save</MDBBtn>
            </MDBModalFooter>
          </MDBModal>

          <MDBModal isOpen={this.state.confirmationmodal} toggle={this.changedpasswordconfirmationtoggle} className="educationalmodal">
            <MDBModalHeader className="modaltitle" toggle={this.changedpasswordconfirmationtoggle} style={{ margin: "auto" }}>Confirmation</MDBModalHeader>
            <MDBModalBody className="newproblemmodalbody">
              <p className="confirmationmodalmessage" style={{ textAlign: "center" }}>Your password has been changed.</p>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn flat className="flatbutton" onClick={this.CloseChangePassword}>Close</MDBBtn>
            </MDBModalFooter>
          </MDBModal>


          <style jsx>{manageaccountstyle}</style>
        </Layout>
      </React.Fragment>
    );
  }

}

export default ManageAccount;
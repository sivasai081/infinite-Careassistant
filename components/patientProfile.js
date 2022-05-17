import React from 'react'
import Link from 'next/link';
import axios from 'axios';
import moment from 'moment';
import patientliststyles from '../styles/patientliststyles';
import CareTeamList from '../components/CareTeamList';
import Loader from '../components/loader';
import StartDatetimepicker from '../components/DatetimePicker';
// import Link from 'next/link';
import { MDBDropdown, MDBInput, MDBModalHeader, MDBBtnGroup, MDBAvatar, MDBListGroupItem, MDBSelect, MDBCardBody, MDBChipsInput, MDBListGroup, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBNavbar, MDBNavbarBrand, MDBIcon, MDBRow, MDBCol, MDBCard, MDBBox, MDBBtn, MDBModal, MDBModalBody, MDBTypography, MDBDatePicker, MDBDatePickerV5 } from "mdbreact";



class PatientProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      teammemberClick: false,
      patientName: "",
      inputValue: '',
      attemptContactModal: false,
      patientCareteam: [],
      attemptDetails:[],
      filteredcareteam: [],
      showInvitesuccessModal: false,
      searchPeople: '',
      groupMemList: [],
      searchgroup: false,
      searchStarts: false,
      groupmembers: [],
      showCareTeamDetailspopup: false,
      searchStarts: false,
      ListCareTeamDetails: [],
      entireListCareTeam: [],
      isLoaded: true,
      typeOfOperation: "",
      deletedItem: {},
      groupmemData: [],
      showConfirmonDelete: false,
      guestFirstName: "",
      guestLastName: "",
      startDate: "",
      startdateValue:"",
      guestEmail:"",
      guestphoneNumber:"",
      guestRoletypes:[
        {text: "Doctor", value: 0},
        {text: "Caregiver", value: 1},
        {text: "Social Worker", value: 2},
        {text: "Other", value: 3}
      ],
      accessTypes: [
        {text: "Primary", value: 0},
        {text: "Guest", value: 1}
      ],
      guestSelectedRole:"",
      selectedaccessType: "",
      guestRole: "",
      search:"",
      guestContent: true,
      historyContent: true,
      primaryPrefix:"",
      primarySuffix: "",
      primaryFirstName:"",
      primaryLastName: "",
      primarySpeializarionl:"",
      primaryEmail:"",
      primaryPhoneNumber:"",
      primaryRoletypes:[
        {text: "Doctor", value: 0},
        {text: "Caregiver", value: 1},
        {text: "Social Worker", value: 2},
        {text: "Other", value: 3}
      ],
      typeDropdown :[
        {text: "Patient", value: 13},
        {text: "Provider", value: 0},
        {text: "Child", value: 1},
        {text: "Family Member", value: 2},
        {text: "Friend", value: 3},
        {text: "Guardian", value: 4},
        {text: "Healthcare Proxy", value: 5},
        {text: "Member/Beneficiary/Representative", value: 6},
        {text: "Neighbor/Community Resource", value: 7},
        {text: "Parent", value: 8},
        {text: "POA/AOR", value: 9},
        {text: "Significant Other", value: 10},
        {text: "Spouse", value: 11},
        {text: "Care Manager ", value: 12}
      ],
      methodDropdown:[
        {text: "E-mail", value: 0},
        {text: "Fax", value: 1},
        {text: "In Person", value: 2},
        {text: "Mail", value: 3},
        {text: "Phone", value: 4},
        {text: "text", value: 5}
      ],
      outcomeDropdown:[
        {text: "Successful", value: 0},
        {text: "Unsuccessful", value: 1}
      ],
      timeDropdown:[
        {text: "Doctor", value: 0},
        {text: "Caregiver", value: 1},
        {text: "Social Worker", value: 2},
        {text: "Other", value: 3}
      ],
      attemptValue:"",
      callCycleValue:"",
      descValue:"",
      selectedTimeType:"",
      selectedOutcomeType:"",
      selectedMethodType:"",
      primarySelectedRole:"",
      selectedType:"",
      guestClicked:true,
      contactClicked: true,
      guestDetails: [
        // {
        //   "email_id": "",
        //   "firstname": "",
        //   "lastname": "",
        //   "role": "",
        //   "isinvited" : "",
        //   "phone": "",
        //   "twilio_details":{},
        //   "image_url":""
        // }
      ]
    }
  }
  componentDidMount() {
    this.setState({ isLoaded: false });
    let patientId = localStorage.getItem('patientId');
    const move = document.querySelector('.profileBar');
    move.style.transform = `translateX(0px)`;
    let ListCareTeamDetails = []; let patientsIds = []; let emailIds = [];
    move.style.width = `97%`;
    let patientname = localStorage.getItem('patientName');
    this.setState({
      patientName: patientname, patientId: this.state.patientId
    });
    axios({
      method: 'GET',
      url: `/api/fetchAttemptHistory`,
      params: {
        id: patientId
      }
    })
    .then((response) => {
      response.data.json && response.data.json.result.map((item) => {
        this.setState({
          attemptDetails: response.data.json.result
        })
      })
    })
    axios({
      method: 'GET',
      url: `/api/getCareTeamDetails`,
      params: {
        id: patientId
      }
    })
      .then((response) => {
        if(response.data.json !== null){
          this.setState({ isLoaded: true });
          response.data.json && response.data.json.members.map((item) => {
            emailIds.push(item.email_id);
          })
          this.setState({
            patientCareteam: response.data.json.members, filteredcareteam: response.data.json.members, groupMemList: response.data.json.members
          })
        }
        axios({
          method: 'GET',
          url: `/api/listCareTeamDetails`
        })
          .then((response) => {
            this.setState({ isLoaded: true });
            response.data.json && response.data.json.result.map((member) => {
              if (!(emailIds.indexOf(member.email_id) !== -1)) {
                ListCareTeamDetails.push(member);
                
              }
            })

          })
        this.setState({
          ListCareTeamDetails: ListCareTeamDetails
        }, () => {
          this.setState({
            entireListCareTeam: this.state.ListCareTeamDetails
          })
        })
      })
  }

  toggleMoreInfo = () => {
    this.setState({
      isExpanded: !this.state.isExpanded
    }, () => {
      if (this.props.userInfoExpanded) {
        this.props.userInfoExpanded(this.state.isExpanded)
      }
    })
  }
  toggleMoreInfoMobile = () => {
    this.setState({
      isExpanded: !this.state.isExpanded
    }, () => {
      if (this.props.userInfoExpanded) {
        this.props.userInfoExpanded(this.state.isExpanded)
      }
    })
  }

  teammemberClick() {
    this.setState({
      teammemberClick: true
    });
  }

  teammemberClick2() {
    this.setState({
      teammemberClick2: true
    });
  }

  editcareteamClick() {
    this.setState({
      editcareteamClick: true, teammemberClick: false
    });
    let patientId = localStorage.getItem('patientId');
    let careTeamIds = []; let ListCareTeamDetails = [];
    this.state.filteredcareteam.map(el => {
      careTeamIds.push(el.email_id);
    })
    axios({
      method: 'GET',
      url: `/api/listCareTeamDetails`
    })
      .then((response) => {
        this.setState({ isLoaded: true });
        response.data.json.result.map((member) => {
          if (!(careTeamIds.indexOf(member.email_id) !== -1)) {
            ListCareTeamDetails.push(member);
          }
        })
      })
    this.setState({
      ListCareTeamDetails: ListCareTeamDetails
    }, () => {
      this.setState({
        entireListCareTeam: this.state.ListCareTeamDetails
      })
    })


  }

  invitecareteamClick() {
    this.setState({
      invitecareteamClick: true, teammemberClick: false
    });
  }

  teammembertoggle = () => {
    this.setState({
      teammemberClick: !this.state.teammemberClick
    });
  }

  teammembertoggle2 = () => {
    this.setState({
      teammemberClick2: !this.state.teammemberClick2
    });
  }

  editcareteammembertoggle = () => {
    this.setState({
      editcareteamClick: !this.state.editcareteamClick, filteredcareteam: this.state.patientCareteam
    });
  }

  invitecareteammembertoggle = () => {
    this.setState({
      invitecareteamClick: !this.state.invitecareteamClick
    });
  }
  inviteSuccessModal = () => {
    this.setState({
      invitecareteamClick: !this.state.invitecareteamClick,
      showInvitesuccessModal: !this.state.showInvitesuccessModal
    })
  }
  inviteSuccesstoggle = () => {
    let guestUserEmail = localStorage.setItem('guestUserEmail', this.state.guestEmail);
    this.setState({
      showInvitesuccessModal: !this.state.showInvitesuccessModal,
      // guestDetails:[{
      //   "email_id": this.state.guestEmail,
      //   "firstname": this.state.guestFirstName,
      //   "lastname": this.state.guestLastName,
      //   "role": this.state.guestRole,
      //   "isinvited" : "Invited",
      //   "phone": this.state.guestphoneNumber,
      //   "twilio_details":{},
      //   "image_url": "images/member1.png"
      // }]
    })
    // axios({
    //   method: 'POST',
    //   url: `/api/generateUserTwilioIdentification`,
    //   params: {
    //     id: this.state.email
    //   }
    // })
    // .then((response) => {
    //   console.log(response,"res")
    // })
  }
  startDate = startdate => {
    this.setState({startdateValue: startdate+":00"});
}
  removePatientCard = () => {
    // localStorage.removeItem(key)
    localStorage.removeItem('patientName');
    localStorage.removeItem('patientId');
    this.props.updateList(true);
    window.location.href = "/dashboard"
  }
  openAttemptContactModal = () => {
    this.setState({
      selectedType:"",
      selectedMethodType:"",
      selectedOutcomeType:"",
      startdateValue:"",
      attemptValue:"",
      callCycleValue:"",
      descValue:"",
      attemptContactModal: !this.state.attemptContactModal
    })
  }
  changeStateInputValue = (e) => {
    // this.setState({
    //   searchPeople: e.target.value
    // })
    // let groupMemList = this.state.ListCareTeamDetails.filter(f => f.firstname.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 || f.specialization.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 );
    // if (e.target.value === "") {
    //   this.setState({ entireListCareTeam: this.state.ListCareTeamDetails });
    // } else {
    //   this.setState({ entireListCareTeam: groupMemList })
    // }
    let groupMemList = this.state.ListCareTeamDetails.length ? this.state.ListCareTeamDetails : this.state.entireListCareTeam;
    groupMemList = groupMemList.filter((f) => {
        if (f.firstname.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
          return f;
        }
      })
      if (groupMemList.length) {
        this.setState({ entireListCareTeam : groupMemList})
      } else {
        this.setState({ entireListCareTeam: this.state.ListCareTeamDetails });
      }
      this.setState({
        searchPeople: e.target.value
      })
  }
  getCareTeamDetailsSearch = () => {
    this.setState({ searchStarts: true })
  }
  nosearching = () => {
    this.setState({ searchStarts: false })
  }
  handleuserdetailsOnClick = (details) => {
    let groupmembers = this.state.groupmembers;
    groupmembers.push(details.firstname);
    let groupmemData = this.state.groupmemData;
    let found = groupmemData.some((m) => m.email_id === details.email_id);
    if (!found) {
      groupmemData.push(details)
    }
    this.setState({
      filteredcareteam: this.state.patientCareteam.concat(this.state.groupmemData),
      searchStarts: false,
      groupmembers: groupmembers,
      groupmemData: groupmemData
    });
    // this.setState(prevState => ({
    //   filteredcareteam: [...prevState.patientCareteam, details],
    //   searchStarts: false,
    //   groupmembers: groupmembers,
    //   groupmemData: groupmemData
    // }));
  }
  addNewMembertoCareteam = () => {
    // if (this.state.typeOfOperation === "DELETE") {
    //   this.setState({
    //     editcareteamClick: !this.state.editcareteamClick,
    //     showConfirmonDelete: !this.state.showConfirmonDelete
    //   })
    // } else {
      this.setState({ isLoaded: false });
      let patientId = localStorage.getItem('patientId');
      let careTeamIds = []; 
      this.state.filteredcareteam.map(el => {
        careTeamIds.push(el.email_id);
      })
      axios({
        method: 'POST',
        url: `/api/listCareTeamDetails`,
        params: {
          id: patientId
        },
        data: careTeamIds
      })
        .then(res => {
          this.setState({ isLoaded: true, editcareteamClick: false });
          axios({
                method: 'GET',
                url: `/api/getCareTeamDetails`,
                params: {
                  id: patientId
                }
              })
                .then((response) => {
                  this.setState({ isLoaded: true, patientCareteam: response.data.json.members });
                  
                })
          
        })
    // }
  }
  deleteCareTeamMember = (item) => {
    this.setState({
      editcareteamClick: !this.state.editcareteamClick,
      showConfirmonDelete: !this.state.showConfirmonDelete
    })
    let patientId = localStorage.getItem('patientId');
    let careTeamIds = []; let patientCareteam = []; 
    this.state.patientCareteam.map(el => {
      if (el.email_id !== item.email_id) {
        patientCareteam.push(el);
        
      }
    })
    this.setState({
      patientCareteam: patientCareteam
    })
  }
  closeCareTeamDetails = () => {
    if (this.state.searchStarts) {
      let ele1 = document.getElementById("add-people");
      let ele2 = document.getElementById("edit-careteam");
      document.addEventListener('click', event => {
        if (event.target.tagName === "INPUT") {
        } else if (event.target.tagName === "DIV") {
          this.setState({
            searchStarts: false
          })
        }
      })
    }
  }
  handlememRemove = (mem) => {
    let groupmemData = [];
    let groupmembers = this.state.groupmembers;
    this.state.groupmemData.map((item, index) => {
      if (item.firstname !== mem) {
        groupmemData.push(item);
      }
    })
    groupmembers = groupmembers.filter((g) => g !== mem)
    this.setState({ groupmembers: groupmembers, groupmemData: groupmemData });
  }
  showConfirmDeletetoggle = () => {
    this.setState({
      showConfirmonDelete: !this.state.showConfirmonDelete
    })
  }
  handleDeleteCareteamMember = () => {
    let patientId = localStorage.getItem('patientId');
    let careTeamIds = []; let ListCareTeamDetails = [];
    this.state.patientCareteam.map(el => {
        careTeamIds.push(el.email_id);
    })
    this.setState({ isLoaded: false });
    axios({
      method: 'POST',
      url: `/api/listCareTeamDetails`,
      params: {
        id: patientId
      },
      data: careTeamIds
    })
      .then(res => {
        axios({
          method: 'GET',
          url: `/api/getCareTeamDetails`,
          params: {
            id: patientId
          }
        })
        .then((response) => {
          this.setState({ isLoaded: true, patientCareteam: response.data.json.members, filteredcareteam: response.data.json.members, showConfirmonDelete: false });
          
        })
      })
  }
  guestRoleTypeChange(e) {
    this.setState({
      guestSelectedRole: this.state.guestRoletypes[e[0]].text
    })
  }
  typeChange(e) {
    this.setState({
      selectedType: this.state.typeDropdown[e[0]].text
    })
  }
  methodTypeChange(e) {
    this.setState({
      selectedMethodType: this.state.methodDropdown[e[0]].text
    })
  }
  outcomeTypeChange(e){
    this.setState({
      selectedOutcomeType: this.state.outcomeDropdown[e[0]].text
    })
  }
  timeTypeChange(e){
    this.setState({
      selectedTimeType: this.state.timeDropdown[e[0]].text
    })
  }
  primaryRoleTypeChange(e){
    this.setState({
      primarySelectedRole: this.state.primaryRoletypes[e[0]].text
    })
  }
  handleAccessTypeChange = (e) => {
    this.setState({
      selectedaccessType: this.state.accessTypes[e[0]].text
    })
  }
  guestFirstNameHandler = (e) => {
    this.setState({
      guestFirstName: e.target.value
    })
  }
  guestEmailHandler = (e) => {
    this.setState({
      guestEmail: e.target.value
    })
  }
  guestLastNameHandler = (e) => {
    this.setState({
      guestLastName : e.target.value
    })
  }
  guestRoleHandler = (e) => {
    this.setState({
      guestRole: e.target.value
    })
  }
  guestPhoneNumberHandler= (e) => {
    this.setState({
      guestphoneNumber: e.target.value
    })
  }
  primaryPhoneNumberHandler = (e) => {
    this.setState({
      primaryPhoneNumber: e.target.value
    })
  }
  primaryEmailHandler = (e) => {
    this.setState({
      primaryEmail: e.target.value
    })
  }
  primarySpeializarionlHandler = (e) => {
    this.setState({
      primarySpeializarionl: e.target.value
    })
  }
  primaryLastNameHandler = (e) => {
    this.setState({
      primaryLastName: e.target.value
    })
  }
  primaryFirstNameHandler = (e) =>{
    this.setState({
      primaryFirstName: e.target.value
    })
  }
  primarySuffixHandler = (e) =>{
    this.setState({
      primarySuffix: e.target.value
    })
  }
  primaryPrefixHandler = (e) => {
    this.setState({
      primaryPrefix: e.target.value
    })
  }
  searching = ()=> {

  }
  handleSearch = () => {

  }
  showGuestContent = () => {
    this.setState({
      guestClicked:true,
      guestContent: true
    })
  }
  showPrimaryContent = () =>{
    this.setState({
      guestClicked:false,
      guestContent: false
    })
  }
  showContactContent = () => {
    this.setState({
      contactClicked:true,
      historyContent: false
    })
  }
  showHistoryContent = () =>{
    this.setState({
      contactClicked:false,
      historyContent: true
    })
  }
  attemptValueHandler = e => {
    this.setState({
      attemptValue: e.target.value
    })
  }
  callCycleValueHandler = e => {
    this.setState({
      callCycleValue: e.target.value
    })
  }
  handleattemptTextarea = e => {
    this.setState({
      descValue: e.target.value
    })
  }
  SaveAttemptDetails = e => {
    let patientId = localStorage.getItem('patientId');
    this.setState({
      attemptContactModal: !this.state.attemptContactModal,
      isLoaded: false
    })
    let data = {
      patient_id: patientId,
        p_type: this.state.selectedType,
        method: this.state.selectedMethodType,
        outcome: this.state.selectedOutcomeType,
        date_time: moment(this.state.startdateValue).format("YYYY-MM-DDTHH:mm:ss"),
        attempt: this.state.attemptValue,
        calCycle: this.state.callCycleValue,
        reason: this.state.descValue
  }
    axios({
      method: 'POST',
      url: `/api/insertAttemptDetails`,
      params: {
        patient_id: patientId,
        p_type: this.state.selectedType,
        method: this.state.selectedMethodType,
        outcome: this.state.selectedOutcomeType,
        date_time: moment(this.state.startdateValue).format("YYYY-MM-DDTHH:mm:ss"),
        attempt: this.state.attemptValue,
        calCycle: this.state.callCycleValue,
        reason: this.state.descValue
      },
      // data: data,
    })
    .then((response) => { 
      axios({
        method: 'GET',
        url: `/api/fetchAttemptHistory`,
        params: {
          id: patientId
        }
      })
      .then((response) => {
        response.data.json && response.data.json.result.map((item) => {
         this.setState({
          isLoaded: true,
           attemptDetails: response.data.json.result
         })
        })
      })
    })
    // console.log(this.state.descValue, this.state.callCycleValue, this.state.attemptValue,this.state.selectedType,"type")
  }
  roleColorCode = (role) => {
    // console.log(role, "role")
    let color;
    if (role.toLowerCase() === "socialworker") {
      color = "#28b6f6";
    } else if (role.toLowerCase() === "doctor" || role.toLowerCase().includes("doctor")) {
      color = "#0288d1";
    } else if (role.toLowerCase() === "caremanager") {
      color = "#db1962";
    } else if (role.toLowerCase() === "super admin") {
      color = "#9e9e9e";
    } else if (role.toLowerCase() === "supervisor") {
      color = "#db1962";
    } else if (role.toLowerCase() === "nurse") {
      color = "#ff7367";
    } else if (role.toLowerCase() === "coordinator") {
      color = "#00897b";
    } else if (role.toLowerCase() === "md") {
      color = "#536dfe";
    } else if (role.toLowerCase() === "caregiver") {
      color = "#7cb342";
    } else if (role.toLowerCase() === "patient") {
      color = "#ff8a00";
    }
    return color;
  }
  render() {
    // console.log(this.state.attempDetails,"attempDetails")
    let guestClass; let primaryClass;
    if(this.state.guestClicked){
      guestClass = "activeClass";
      primaryClass= "";
    }else{
      guestClass = "";
      primaryClass= "activeClass";
    }
    let contactClass; let historyClass;
    if(this.state.contactClicked){
      contactClass = "activeClass";
      historyClass= "";
    }else{
      contactClass = "";
      historyClass= "activeClass";
    }
    return (
      <>
        <div>
          <MDBNavbar className={`${this.props.menuexpanded && 'profile-expanded'} profileBar ${this.state.isExpanded && 'userexpanded'}`} expand="md" scrolling fixed="top">
            <MDBRow className="mobile-patientcard">
              <MDBRow className="left-mobile">
                <div className="usercard">
                  <MDBCol md="8">
                    <div className="user-data">
                      <MDBIcon size="2x" icon="user-circle" className="profile-pic" />
                      <p className="name">
                        <abbr title={this.state.patientName} style={{ textDecoration: "none", cursor: "default" }}>
                          {this.state.patientName == "" ? "" : this.state.patientName}
                        </abbr>
                      </p>
                      <img src="/images/trending_up.svg" alt="" style={{ marginTop: "6px" }} />
                    </div>
                  </MDBCol>
                  <MDBCol md="1">
                    <div className="mobileview-details">
                      {!this.state.isExpanded ? <span className="mobileview"><MDBIcon icon="angle-down" onClick={this.toggleMoreInfo} /></span> :
                        <span className="mobileview"><MDBIcon icon="angle-up" onClick={this.toggleMoreInfo} /></span>
                      }
                    </div>
                  </MDBCol>

                  <div className="userbrand">
                    <div style={{ color: "#424242", marginTop: "14px", marginRight: "16px", cursor: "pointer", textDecoration: "underline" }} onClick={this.teammemberClick.bind(this)}>Care Team </div>
                      {/* <span style={{ marginLeft: "8px" }}> <MDBIcon icon="angle-down" /></span> */}
                    <div className="attempttocontact">
                      {/* <img src="/images/attempttocontact.png" alt="attempttocontact" style={{width:"24px", height:"24px"}} onClick={this.openAttemptContactModal} style={{cursor:"pointer"}} /> */}
                      <MDBIcon icon="phone-alt" onClick={this.openAttemptContactModal} style={{cursor:"pointer", width:"24px", height:"24px",  marginTop: "18px", marginLeft: "8px"}} />
                    </div>
                    <div className="patientcard-closeIcon">
                      <img src="/images/close.svg" alt="patientcard-closeIcon" onClick={this.removePatientCard}></img>
                    </div>
                  </div>

                  <MDBCol md="1"></MDBCol>
                </div>
              </MDBRow>
              <MDBRow className="right-mobile">
                <MDBCol md="10">
                  <MDBNavbarBrand className="left-side">

                    <p className={`details details-1 ${!this.state.isExpanded && 'first-expanded'}`}>id: <span>p9001234</span></p>
                    <p className={`details details-2 ${!this.state.isExpanded && 'first-expanded'}`}>dob: <span>6/13/1963</span></p>
                    <p className={`details ${!this.state.isExpanded && 'first-expanded'}`}>pcp: <span>dr.sarah west</span></p>
                    <p className={`details ${!this.state.isExpanded && 'first-expanded'}`}>plan: <span>atena</span></p>
                    <p className={`details ${!this.state.isExpanded && 'first-expanded'}`}>m: <span>1-555-222-2334</span></p>
                    <p className={`details ${!this.state.isExpanded && 'first-expanded'}`}>
                      {!this.state.isExpanded ? <span className="expandicon"><MDBIcon icon="angle-down" onClick={this.toggleMoreInfo} /></span> :
                        <span className="expandicon"><MDBIcon icon="angle-up" onClick={this.toggleMoreInfo} /></span>
                      }
                    </p>

                    {this.state.isExpanded &&
                      <>

                        <p className="details details-1">PCP Address: <span>10101 Main st, Anaheim CA 92208</span></p>
                        <p className="details details-2">PCP Phone: <span>1-555-999-00001</span></p>
                        <p className="details">Medical Group: <span>Kaiser</span></p>


                        <p className="details">Address: <span>378 Starbucks st, Anaheim CA 92208</span></p>
                        <p className="details lob">Lob: <span>N/A</span></p>
                        <p className="details caregiver">Care Giver: <span>St.Jude</span></p>

                        <p className="details">Allergies: <span>Peanut,Latex</span></p>
                        <p className="details">Language: <span>English</span></p>

                      </>
                    }

                  </MDBNavbarBrand>
                </MDBCol>
              </MDBRow>
            </MDBRow>
            <MDBRow className="user-info-bar" >
              <MDBCol md='3'>
                <div className="user-data">
                  <MDBIcon size="2x" icon="user-circle" className="profile-pic" />
                  <p className="name">
                    <abbr  style={{ textDecoration: "none", cursor: "default" }}>
                      {this.state.patientName == "" ? "" : this.state.patientName}
                    </abbr>
                </p>
                  <img src="/images/trending_up.svg" alt="" style={{ marginTop: "6px" }} />
                </div>
              </MDBCol>

              <MDBCol md='6'>
                <MDBNavbarBrand className="left-side">

                  <p className={`details details-1 ${!this.state.isExpanded && 'first-expanded'}`}>id: <span>p9001234</span></p>
                  <p className={`details details-2 ${!this.state.isExpanded && 'first-expanded'}`}>dob: <span>6/13/1963</span></p>
                  <p className={`details ${!this.state.isExpanded && 'first-expanded'}`}>pcp: <span>dr.sarah west</span></p>
                  <p className={`details ${!this.state.isExpanded && 'first-expanded'}`}>plan: <span>atena</span></p>
                  <p className={`details ${!this.state.isExpanded && 'first-expanded'}`}>m: <span>1-555-222-2334</span></p>


                  {this.state.isExpanded &&
                    <>


                      <p className="details details-1">PCP Address: <span>10101 Main st, Anaheim CA 92208</span></p>
                      <p className="details details-2">PCP Phone: <span>1-555-999-00001</span></p>
                      <p className="details">Medical Group: <span>Kaiser</span></p>


                      <p className="details">Address: <span>378 Starbucks st, Anaheim CA 92208</span></p>
                      <p className="details lob">Lob: <span>N/A</span></p>
                      <p className="details caregiver">Care Giver: <span>St.Jude</span></p>

                      <p className="details">Allergies: <span>Peanut,Latex</span></p>
                      <p className="details">Language: <span>English</span></p>

                    </>
                  }

                </MDBNavbarBrand>
              </MDBCol>
              <MDBCol md='1' className="expand-collapse">
                <p className={`details ${!this.state.isExpanded && 'first-expanded'}`}>
                  {!this.state.isExpanded ? <span className="expandicon"><MDBIcon icon="angle-down" onClick={this.toggleMoreInfo} /></span> :
                    <span className="expandicon"><MDBIcon icon="angle-up" onClick={this.toggleMoreInfo} /></span>
                  }
                </p>
              </MDBCol>
              <div className="user-right">
                <div style={{ color: "#424242", marginTop: "14px", marginRight: "16px", cursor:"pointer", fontWeight:"600", textDecoration: "underline" }} onClick={this.teammemberClick.bind(this)}>Care Team </div>
                <div className="attempttocontact">
                <MDBIcon icon="phone-alt" onClick={this.openAttemptContactModal} style={{cursor:"pointer", width:"24px", height:"24px", marginTop: "18px", marginLeft: "8px"}} />
                {/* <img src="/images/attempttocontact.png" alt="attempttocontact" style={{width:"24px", height:"24px"}} onClick={this.openAttemptContactModal} style={{cursor:"pointer"}} /> */}
                </div>
                <div className="patientcard-closeIcon">
                  <img src="/images/close.svg" alt="patientcard-closeIcon" onClick={this.removePatientCard}></img>
                </div>

              </div>
            </MDBRow>
          </MDBNavbar>
          <MDBModal isOpen={this.state.teammemberClick} toggle={this.teammembertoggle} side position="top-right" className="caretemamembermodal">
            <MDBModalBody>
              <div className="oldCareteam-list">
              <MDBListGroup className="">
                {this.state.patientCareteam.map((item) => {
                  return (
                    <MDBListGroupItem className="p-2 border-light chat-list">
                      <MDBAvatar
                        tag="img"
                        src={"images/member1.png"}
                        alt="avatar"
                        circle
                        className="mr-2 z-depth-1 careteamchat-avatar"
                      />
                      <div>
                        <strong className="careteamname">{item.firstname + " " + item.lastname}</strong>
                        <p className="careteamspecialization">{item.role + " - " + item.specialization}</p>
                      </div>
                    </MDBListGroupItem>
                  )
                })
                }
              </MDBListGroup>
              {/* <MDBListGroup className="">
                {this.state.guestDetails.map((item) => {
                  return (
                    <MDBListGroupItem className="d-flex  p-2 border-light chat-list">
                      {item.image_url !== "" ?<MDBAvatar
                        tag="img"
                        src={item.image_url}
                        alt="avatar"
                        circle
                        className="mr-2 z-depth-1 careteamchat-avatar"
                      /> : ""}
                      <div>
                        <strong className="careteamname">{item.firstname + " " + item.lastname}</strong>
                        <p className="careteamspecialization">{item.role}</p>
                      </div>
                      <div style={{color:"#DD266B", margin:"10px 10px 10px 20px"}}>
                        {item.isinvited}
                      </div>
                    </MDBListGroupItem>
                  )
                })
                }
              </MDBListGroup> */}
              </div>
              <div className="text-right">
                <MDBBtn flat className="flatbutton" onClick={this.teammembertoggle}>Close</MDBBtn>
                {/* <MDBBtn flat className="flatbutton" onClick={this.invitecareteamClick.bind(this)}>Invite</MDBBtn> */}
                <MDBBtn flat className="flatbutton" onClick={this.editcareteamClick.bind(this)}>Edit</MDBBtn>
              </div>


            </MDBModalBody>
          </MDBModal>
          <MDBModal isOpen={this.state.editcareteamClick} toggle={this.editcareteammembertoggle} className="editcareteammodal" onClick={this.closeCareTeamDetails} id="edit-careteam">
            <MDBModalHeader className="modaltitle">Edit Care Team</MDBModalHeader>
            <MDBModalBody className="md-form-margin">
              <MDBInput
                label="Add People"
                icon="user-plus"
                id="add-people"
                value={this.state.searchPeople}
                // onBlur={this.nosearching}
                onChange={this.changeStateInputValue}
                onFocus={this.getCareTeamDetailsSearch}
              />
              <div className={this.state.searchStarts ? 'contact-list' : 'contact-list hide'}>
                {this.state.entireListCareTeam.length ? this.state.entireListCareTeam.map(member => (
                  <CareTeamList key={member.email_id} friend={member} color={this.roleColorCode(member.role)} handleuserdetailsOnClick={this.handleuserdetailsOnClick.bind(this, member)} />
                )) : <div className="text-center" style={{ marginTop: "32px" }}>No Matching Records Found </div>
                }
              </div>

              <MDBListGroup style={{ marginLeft: "-10px" }} className="oldCareteam-list">
                {this.state.filteredcareteam.map((item) => {
                  return (
                    <MDBListGroupItem className="d-flex  p-2 border-light chat-list">
                      <MDBAvatar
                        tag="img"
                        src={"images/member1.png"}
                        alt="avatar"
                        circle
                        className="mr-2 z-depth-1 careteamchat-avatar"
                      />
                      <div style={{ width: "90%", cursor: "pointer", marginLeft: "8px" }}>
                        <strong className="careteamname" style={{fontSize: "14px"}}>{item.firstname + " " + item.lastname}</strong>
                        <p className="careteamspecialization">{item.specialization}</p>
                      </div>
                      <div className="text-right" style={{ width: "10%", marginTop: "8px", cursor: "pointer" }} onClick={this.deleteCareTeamMember.bind(this, item)}>
                        <MDBIcon icon="trash-alt" className="icon-color" style={{ color: "#DB1962" }} />
                      </div>
                    </MDBListGroupItem>
                  )
                })
                }
              </MDBListGroup>
              <div className="text-right">
                <MDBBtn flat className="flatbutton" onClick={this.editcareteammembertoggle}>Cancel</MDBBtn>
                <MDBBtn flat className="flatbutton" onClick={this.addNewMembertoCareteam}>Save</MDBBtn>
              </div>
            </MDBModalBody>
          </MDBModal>
          <MDBModal isOpen={this.state.invitecareteamClick} toggle={this.invitecareteammembertoggle} className="">
            <MDBModalHeader className="modaltitle">Invite Care Team</MDBModalHeader>
            <MDBModalBody>
            <MDBRow>
              <MDBCol md='12' className="mb-4">
                <MDBBtnGroup style={{marginLeft:"5px", width:"450px"}}>
                  <MDBBtn className={"customClass "+ guestClass} onClick={this.showGuestContent}>Guest</MDBBtn>
                  <MDBBtn className={"customClass "+ primaryClass} onClick={this.showPrimaryContent}>Primary</MDBBtn>
                </MDBBtnGroup>
              </MDBCol>
            </MDBRow>
            {this.state.guestContent ? 
              <div>
                <MDBRow className="search-form">
                  <MDBCol md="12">
                    <MDBInput
                      type='text'
                      label='Search'
                      name='search'
                      value={this.state.search}
                      className=''
                      outline
                      autoComplete="off"
                      onFocus={this.searching}
                      onChange={this.handleSearch}
                      // onBlur={this.nosearching}
                      icon='search'
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow  style={{marginBottom: "-30px"}}>
                  <MDBCol size="6">
                    <MDBInput label="First Name" icon="user" value = {this.state.guestFirstName} onChange={this.guestFirstNameHandler} />
                  </MDBCol>
                  <MDBCol size="6">
                    <MDBInput label="Last Name" icon="user" value = {this.state.guestLastName} onChange={this.guestLastNameHandler} />
                  </MDBCol>
                </MDBRow>
                <MDBInput label="Email" icon="envelope" value = {this.state.guestEmail} onChange={this.guestEmailHandler} />
                <MDBInput label="Phone" icon="phone-alt" value = {this.state.guestphoneNumber} onChange={this.guestPhoneNumberHandler} />
                <MDBSelect
                      label="Role"
                      options={this.state.guestRoletypes}
                      // outline
                      // selected={"Choose role type"}
                      selected={this.state.guestSelectedRole ? this.state.guestSelectedRole : "Role"}
                      className="roleType-dropdown"
                      getValue={(val) => this.guestRoleTypeChange(val)}

                    />
                {this.state.guestSelectedRole === "Other" ? <MDBInput label="Define Role" icon="user-check" value = {this.state.guestRole} onChange={this.guestRoleHandler}/> : "" }
                {/* <MDBSelect
                      label="Access Type"
                      options={this.state.accessTypes}
                      outline
                      // selected={"Choose role type"}
                      selected={this.state.selectedaccessType ? this.state.selectedaccessType : "Access Type"}
                      className="roleType-dropdown"
                      getValue={(val) => this.handleAccessTypeChange(val)}

                    /> */}
                  {/* <div className="text-right">
                    <MDBBtn flat className="flatbutton" onClick={this.invitecareteammembertoggle}>Cancel</MDBBtn>
                    <MDBBtn flat className="flatbutton" onClick={this.inviteSuccessModal}>Invite</MDBBtn>
                  </div> */}
                </div> : 
                <div>
                  <MDBRow  style={{marginBottom: "-30px"}}>
                    <MDBCol size="6">
                      <MDBInput label="Prefix" icon="user" value = {this.state.primaryPrefix} onChange={this.primaryPrefixHandler} />
                    </MDBCol>
                    <MDBCol size="6">
                      <MDBInput label="Suffix" icon="user" value = {this.state.primarySuffix} onChange={this.primarySuffixHandler} />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow  style={{marginBottom: "-30px"}}>
                    <MDBCol size="6">
                      <MDBInput label="First Name" icon="user" value = {this.state.primaryFirstName} onChange={this.primaryFirstNameHandler} />
                    </MDBCol>
                    <MDBCol size="6">
                      <MDBInput label="Last Name" icon="user" value = {this.state.primaryLastName} onChange={this.primaryLastNameHandler} />
                    </MDBCol>
                  </MDBRow>
                  <MDBInput label="Specialization" icon="plus-square" value = {this.state.primarySpeializarionl} onChange={this.primarySpeializarionlHandler} />
                  <MDBInput label="Email" icon="envelope" value = {this.state.primaryEmail} onChange={this.primaryEmailHandler} />
                  <MDBInput label="Phone" icon="phone-alt" value = {this.state.primaryPhoneNumber} onChange={this.primaryPhoneNumberHandler} />
                  <MDBSelect
                        label="Role"
                        options={this.state.primaryRoletypes}
                        // outline
                        // selected={"Choose role type"}
                        selected={this.state.primarySelectedRole ? this.state.primarySelectedRole : "Role"}
                        className="roleType-dropdown"
                        getValue={(val) => this.primaryRoleTypeChange(val)}

                      />
                  {/* {this.state.selectedRole === "Other" ? <MDBInput label="Define Role" icon="user-check" value = {this.state.role} onChange={this.roleHandler}/> : "" } */}
                  {/* <MDBSelect
                        label="Access Type"
                        options={this.state.accessTypes}
                        outline
                        // selected={"Choose role type"}
                        selected={this.state.selectedaccessType ? this.state.selectedaccessType : "Access Type"}
                        className="roleType-dropdown"
                        getValue={(val) => this.handleAccessTypeChange(val)}

                      /> */}
                </div>
              }
              <div className="text-right">
                <MDBBtn flat className="flatbutton" onClick={this.invitecareteammembertoggle}>Cancel</MDBBtn>
                <MDBBtn flat className="flatbutton" onClick={this.inviteSuccessModal}>Invite</MDBBtn>
              </div>
            </MDBModalBody>
          </MDBModal>
          <MDBModal isOpen={this.state.showInvitesuccessModal} toggle={this.inviteSuccesstoggle} className="invitation-success-modal">
          <MDBModalBody>Invitation has been sent</MDBModalBody>
          <MDBBtn flat className="flatbutton" onClick={this.inviteSuccesstoggle}>CLOSE</MDBBtn>
          </MDBModal>
          <MDBModal isOpen={this.state.showConfirmonDelete} toggle={this.showConfirmDeletetoggle} className="delete-modal">
            <MDBModalHeader className="modaltitle">Delete Care Team</MDBModalHeader>
            <MDBModalBody>
              <div className="modalconfirmationtitle text-left" style={{marginLeft: "10px", marginBottom: "24px"}}> Are you sure to delete the Care team member ? </div>
                <div className="text-right">
                  <MDBBtn flat className="flatbutton" onClick={this.showConfirmDeletetoggle}>Cancel</MDBBtn>
                  <MDBBtn flat className="flatbutton" onClick={this.handleDeleteCareteamMember}>Delete</MDBBtn>
                </div>
            </MDBModalBody>
          </MDBModal>
          <MDBModal isOpen={this.state.attemptContactModal} toggle={this.openAttemptContactModal} className="attempt-modal">
            <MDBModalHeader className="modaltitle">Attempt to Contact</MDBModalHeader>
            <MDBModalBody>
                <MDBRow>
                  <MDBCol md='12' className="mb-4 attempt-contact">
                    <MDBBtnGroup>
                      <MDBBtn flat className={"customClass "+ contactClass} onClick={this.showContactContent}>Contact</MDBBtn>
                      <MDBBtn flat className={"customClass "+ historyClass} onClick={this.showHistoryContent}>History</MDBBtn>
                    </MDBBtnGroup>
                  </MDBCol>
                </MDBRow>
                {this.state.contactClicked ? 
                <div className="contact-details">
                <MDBRow style={{marginTop:"-30px"}}>
                  <MDBCol md="6" className="attempt-dropdown" >
                      <MDBSelect
                          options={this.state.typeDropdown}
                          // outline
                          selected={this.state.selectedType ? this.state.selectedType : "Type"}
                          className="attempt"
                          getValue={(val) => this.typeChange(val)}
                      />
                  </MDBCol>
                  <MDBCol md="6" className="attempt-dropdown">
                      <MDBSelect
                          options={this.state.methodDropdown}
                          // outline
                          selected={this.state.selectedMethodType ? this.state.selectedMethodType :"Method"}
                          className="attempt"
                          getValue={(val) => this.methodTypeChange(val)}
                      />
                  </MDBCol>
                  </MDBRow>
                  <MDBRow style={{marginTop:"-30px"}}>
                  <MDBCol md="6" className="attempt-dropdown" >
                      <MDBSelect
                          options={this.state.outcomeDropdown}
                          // outline
                          selected={this.state.selectedOutcomeType ? this.state.selectedOutcomeType : "Outcome"}
                          className="attempt"
                          getValue={(val) => this.outcomeTypeChange(val)}
                      />
                  </MDBCol>
                  
                  <MDBCol md="6"  style={{top:"-8px"}}>
                      

                      {/* <MDBDatePicker keyboard={true} format='MM/DD/YYYY' className="main-datepicker" emptyLabel={"Service Requested Date"} valueDefault={null} value={this.state.serviceRequestDate} getValue={(value) => this.handleserviceRequestDate(value)} /> */}

                      <MDBDatePickerV5 className="calender" theme="danger" format='MM/DD/YYYY hh:mm:ss' emptyLabel='Start Date' keyboard={true} startDate={this.startDate} startdateValue={this.state.startdateValue}  />
                      {/* <MDBDatePickerV5 className="calender" theme="danger" emptyLabel='Re-Evaluation Date' getValue={(value) => this.handlereevaluationdatechange(value)} /> */}
                      {/* <StartDatetimepicker className="main-datepicker" startDate={this.startDate} startdateValue={this.state.startdateValue}/> */}
                  </MDBCol>
                </MDBRow>
                <MDBRow style={{marginTop:"-40px"}}>
                  <MDBCol md="6" className="attempt-textfield1">
                    <MDBInput className="label_attempt" label="Attempt" value = {this.state.attemptValue} onChange={this.attemptValueHandler} />
                  </MDBCol>
                  <MDBCol md="6" className="attempt-textfield2">
                    <MDBInput className="label_attempt" label="Call Cycle" value = {this.state.callCycleValue} onChange={this.callCycleValueHandler} />
                  </MDBCol>
                </MDBRow>
                <MDBRow className="reason-section">
                    <MDBCol md="12">
                      <div className="attemptTextarea">
                        <MDBInput
                          type="textarea"
                          label="Please write the Reason"
                          value={this.state.descValue}
                          onChange={(e) => this.handleattemptTextarea(e)}
                        ></MDBInput>
                      </div>

                    </MDBCol>
                  </MDBRow>
                </div>
                :
                <div className="history-content">
                  {this.state.attemptDetails.map((item) => {
                    return (
                            <MDBCard>
                            <MDBCardBody>
                              <MDBRow className="time-type-content">
                                <MDBCol style={{fontSize:"14px"}}><span style={{fontWeight:"600"}}>Time:</span> {item.date_time}</MDBCol>
                                <MDBCol style={{fontSize:"14px"}}><span style={{fontWeight:"600", fontSize:"14px"}}>Type: </span>{item.p_type}</MDBCol>
                              </MDBRow>
                              <MDBRow className="method-outcome-content">
                                <MDBCol style={{fontSize:"14px"}}><span style={{fontWeight:"600", fontSize:"14px"}}>Method: </span> {item.method}</MDBCol>
                                <MDBCol style={{fontSize:"14px"}}><span style={{fontWeight:"600", fontSize:"14px"}}>Outcome: </span>{item.outcome}</MDBCol>
                              </MDBRow>
                              <MDBRow className="attempt-call-content">
                                <MDBCol style={{fontSize:"14px"}}><span style={{fontWeight:"600", fontSize:"14px"}}>Attempt: </span> {item.attempt}</MDBCol>
                                <MDBCol style={{fontSize:"14px"}}><span style={{fontWeight:"600", fontSize:"14px"}}>Call Cycle: </span>{item.calCycle}</MDBCol>
                              </MDBRow>
                              <MDBRow className="note-content" style={{fontWeight:"600", fontSize:"14px", marginBottom:"-5px"}}>
                                <MDBCol>
                                  Note
                                </MDBCol>
                              </MDBRow>
                                <MDBRow style={{fontSize:"13px", marginBottom:"20px", paddingRight:"10px"}}>
                                  <MDBCol>
                                   {item.reason}
                                  </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                          </MDBCard>
                    )
                  }) 
                }
                </div>
                }
                <div className="text-right" style={{marginTop:"15px"}}>
                  <MDBBtn flat className="flatbutton" onClick={this.openAttemptContactModal}>CANCEL</MDBBtn>
                  <MDBBtn flat className="flatbutton" onClick={this.SaveAttemptDetails}>SAVE</MDBBtn>
                </div>
            </MDBModalBody>
          </MDBModal>
          {!this.state.isLoaded && <Loader />}
          <style jsx>{patientliststyles}</style>

        </div>
      </>

    )
  }
}
export default PatientProfile;
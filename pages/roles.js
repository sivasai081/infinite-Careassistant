import React, { Component } from "react";
import Head from 'next/head'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Layout from '../components/layout';
import Link from 'next/link';
import Loader from '../components/loader';
import axios from 'axios';
import AssessmentStyle from '../styles/assessment';
import { MDBTypography, MDBProgress, MDBModal, MDBSelect, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBDataTableV5, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBIcon, MDBInput, MDBDatePicker } from "mdbreact";
import rolesstyle from '../styles/roles';

import Pagination from '@material-ui/lab/Pagination';

class Roles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValues: [],
            selectedRole: "",
            roles: ["Dashboard", "pop360", "pop360 - CMP", "Search Patient", "health360" , "Timeline" , "Assessment" ,"RPM", "Telemedicine", "Careplan", "Note", "UM", "Payer Analytics"],
            superVisorRolename:"",
            adminRolename:"",
            rolename:"",
            isLoaded: true,
            careasssitantValue: false,
            dashboardValue: false,
            pop360Value: false,
            pop360ValueCMP: false,
            searchPatientValue: false,
            health360Value: false,
            timelineValue: false,
            assessmentsValue: false,
            RPMValue: false,
            telemedicineValue: false,
            careplanValue: false,
            notesValue : false,
            rolet_ypes: [
                {text: "GUEST",value: 0},
                {text: "PERMANENT",value: 1},
            ],
            supervisorroleRows : [],
            rolesdata: {
                columns: [
                    {
                        label: 'Role Type',
                        field: 'name',
                    },
                    {
                        label: 'Dashboard',
                        field: 'dashboardpermission',
                    },
                    {
                        label: 'pop360',
                        field: 'pop360permission',
                    },
                    {
                        label: 'pop360 - CMP',
                        field: 'pop360CMPpermission',
                    },
                    {
                        label: 'Search Patient',
                        field: 'searchpatientpermission',
                    },
                    {
                        label: 'health360',
                        field: 'health360permission',
                    },
                    {
                        label: 'Timeline',
                        field: 'timelinepermission',
                    },
                    {
                        label: 'Assessment',
                        field: 'assessmentpermission',
                    },
                    {
                        label: 'RPM',
                        field: 'RPMpermission',
                    },
                    {
                        label: 'Telemedicine',
                        field: 'telemedicinepermission',
                    },
                    {
                        label: 'Careplan',
                        field: 'careplanpermission',
                    },
                    {
                        label: 'Note',
                        field: 'notespermission',
                    },
                    {
                        label: 'UM',
                        field: 'umpermission',
                    },
                    {
                        label: 'Payer Analytics',
                        field: 'PApermission',
                    }],
                    rows: []
            },
            adminnewrolemodal: false,
        };
    }

    componentDidMount() {
        let roleName = localStorage.getItem("roleName");
        this.setState({
            roleName: roleName
        });
        let array = [];
        let adminRow = {
            name: "",
            dashboardpermission: false,
            pop360permission: false,
            pop360CMPpermission: false,
            searchpatientpermission: false,
            health360permission: false,
            timelinepermission: false,
            assessmentpermission: false,
            RPMpermission: false,
            telemedicinepermission: false,
            careplanpermission: false,
            notespermission: false,
            umpermission: false,
            PApermission: false,
        }
        axios({
            method: 'GET',
            url: `/api/fetchRole`,
            params: {
                role_type: "ALL"
              }
        })
        .then((response) => {
            response.data.json.result.map((row,ind) => {
                adminRow = {
                        name: row.role,
                        dashboardpermission: response.data.json.result[ind].permissions.includes("Dashboard") ? true : false,
                        pop360permission: response.data.json.result[ind].permissions.includes("pop360") ? true : false,
                        pop360CMPpermission: response.data.json.result[ind].permissions.includes("pop360 - CMP") ? true : false,
                        searchpatientpermission: response.data.json.result[ind].permissions.includes("Search Patient") ? true : false,
                        health360permission: response.data.json.result[ind].permissions.includes("health360") ? true : false,
                        timelinepermission: response.data.json.result[ind].permissions.includes("Timeline") ? true : false,
                        assessmentpermission: response.data.json.result[ind].permissions.includes("Assessment") ? true : false,
                        RPMpermission: response.data.json.result[ind].permissions.includes("RPM") ? true : false,
                        telemedicinepermission: response.data.json.result[ind].permissions.includes("Telemedicine") ? true : false,
                        careplanpermission: response.data.json.result[ind].permissions.includes("Careplan") ? true : false,
                        notespermission: response.data.json.result[ind].permissions.includes("Note") ? true : false,
                        umpermission: response.data.json.result[ind].permissions.includes("UM") ? true : false,
                        PApermission: response.data.json.result[ind].permissions.includes("Payer Analytics") ? true : false,
                    }
                array.push(adminRow);
            })
            this.setState({
                isLoaded: false,
                rolesdata: {
                    columns: [
                        {
                            label: 'Role Type',
                            field: 'name',
                        },
                        {
                            label: 'Dashboard',
                            field: 'dashboardpermission',
                        },
                        {
                            label: 'pop360',
                            field: 'pop360permission',
                        },
                        {
                            label: 'pop360 - CMP',
                            field: 'pop360CMPpermission',
                        },
                        {
                            label: 'Search Patient',
                            field: 'searchpatientpermission',
                        },
                        {
                            label: 'health360',
                            field: 'health360permission',
                        },
                        {
                            label: 'Timeline',
                            field: 'timelinepermission',
                        },
                        {
                            label: 'Assessment',
                            field: 'assessmentpermission',
                        },
                        {
                            label: 'RPM',
                            field: 'RPMpermission',
                        },
                        {
                            label: 'Telemedicine',
                            field: 'telemedicinepermission',
                        },
                        {
                            label: 'Careplan',
                            field: 'careplanpermission',
                        },
                        {
                            label: 'Note',
                            field: 'notespermission',
                        },
                        {
                            label: 'UM',
                            field: 'umpermission',
                        },
                        {
                            label: 'Payer Analytics',
                            field: 'PApermission',
                        }],
                        rows: array
                }
            }, () => {
                let adminroles = this.state.rolesdata;
                console.log("adminroles", adminroles);
                if(adminroles.rows){
                    for (let i = 0; i < adminroles.rows.length; i++) {
                        adminroles.rows[i].dashboardpermission = <div>{ this.state.rolesdata.rows[i].dashboardpermission ? <MDBIcon icon="check"></MDBIcon> : null }</div>,
                        adminroles.rows[i].pop360permission = <div>{ this.state.rolesdata.rows[i].pop360permission ? <MDBIcon icon="check"></MDBIcon> : null }</div>,
                        adminroles.rows[i].pop360CMPpermission = <div>{ this.state.rolesdata.rows[i].pop360CMPpermission ? <MDBIcon icon="check"></MDBIcon> : null }</div>,
                        adminroles.rows[i].searchpatientpermission = <div>{ this.state.rolesdata.rows[i].searchpatientpermission ? <MDBIcon icon="check"></MDBIcon> : null }</div>
                        adminroles.rows[i].health360permission = <div>{ this.state.rolesdata.rows[i].health360permission ? <MDBIcon icon="check"></MDBIcon> : null }</div>,
                        adminroles.rows[i].timelinepermission = <div>{ this.state.rolesdata.rows[i].timelinepermission ? <MDBIcon icon="check"></MDBIcon> : null }</div>,
                        adminroles.rows[i].assessmentpermission = <div>{ this.state.rolesdata.rows[i].assessmentpermission ? <MDBIcon icon="check"></MDBIcon> : null }</div>,
                        adminroles.rows[i].RPMpermission = <div>{ this.state.rolesdata.rows[i].RPMpermission ? <MDBIcon icon="check"></MDBIcon> : null }</div>,
                        adminroles.rows[i].telemedicinepermission = <div>{ this.state.rolesdata.rows[i].telemedicinepermission ? <MDBIcon icon="check"></MDBIcon> : null }</div>,
                        adminroles.rows[i].careplanpermission = <div>{ this.state.rolesdata.rows[i].careplanpermission ? <MDBIcon icon="check"></MDBIcon> : null }</div>,
                        adminroles.rows[i].notespermission = <div>{ this.state.rolesdata.rows[i].notespermission ? <MDBIcon icon="check"></MDBIcon> : null }</div>
                        adminroles.rows[i].umpermission = <div>{ this.state.rolesdata.rows[i].umpermission ? <MDBIcon icon="check"></MDBIcon> : null }</div>
                        adminroles.rows[i].PApermission = <div>{ this.state.rolesdata.rows[i].PApermission ? <MDBIcon icon="check"></MDBIcon> : null }</div>
                    }
                }
               
            })
            
        })
    }
    supervisornewrole(){
        this.setState({
            supervisornewrolemodal: true
        });
        
    }

    adminaddnewrole(){
        this.setState({
            adminnewrolemodal: true,
            selectedValues:[],
            adminRolename:"",
            careasssitantValue: false,
            dashboardValue: false,
            pop360Value: false,
            pop360ValueCMP: false,
            searchPatientValue: false,
            health360Value: false,
            timelineValue: false,
            assessmentsValue: false,
            RPMValue: false,
            telemedicineValue: false,
            careplanValue: false,
            notesValue: false,
            notesValue: false
        });
    }
    adminnewrolemodaltoggle = () => {
        this.setState({
            adminnewrolemodal: !this.state.adminnewrolemodal,

        });
    }

    supervisornewrolemodaltoggle = () => {
        this.setState({
            supervisornewrolemodal: !this.state.supervisornewrolemodal,

        });
    }

    handleAdminInput = e => {
        this.setState({
            adminRolename: e.target.value
        })
    }
    getcareasssitantValue = e => {
        this.setState({
            careasssitantValue: e
        })
    }
    getdashboardValue = e =>{
        this.setState({
            dashboardValue: e
        })
    }
    getpop360Value = e => {
        this.setState({
            pop360Value: e
        })
    }
    getpop360ValueCMP = e => {
        this.setState({
            pop360ValueCMP: e
        })
    }
    getsearchPatientValue = e => {
        this.setState({
            searchPatientValue: e
        })
    }
    gethealth360Value = e => {
        this.setState({
            health360Value: e
        })
    }
    gettimelineValue = e => {
        this.setState({
            timelineValue: e
        })
    }
    getassessmentsValue = e => {
        this.setState({
            assessmentsValue: e
        })
    }
    getRPMValue = e => {
        this.setState({
            RPMValue: e
        })
    }
    gettelemedicineValue  = e => {
        this.setState({
            telemedicineValue: e
        })
    }
    getcareplanValue = e => {
        this.setState({
            careplanValue: e
        })
    }
    getnotesValue = e => {
        this.setState({
            notesValue: e
        })
    }
    adminRoleAddMethod = e => { 
        let array = [];
        let adminRow = {
            name: "",
            selectedRole: "",
            dashboardpermission: false,
            pop360permission: false,
            pop360CMPpermission: false,
            searchpatientpermission: false,
            health360permission: false,
            timelinepermission: false,
            assessmentpermission: false,
            RPMpermission: false,
            telemedicinepermission: false,
            careplanpermission: false,
            notespermission: false,
            umpermission: false,
            PApermission: false,
        }
        this.setState({
            adminnewrolemodal: !this.state.adminnewrolemodal,
            isLoaded: true
        })
        axios({
            method: 'POST',
            url: `/api/createNewRole`,
            data: {
              role: this.state.adminRolename,
              selectedRole: this.state.selectedRole,
              details: this.state.selectedValues
            
            }
        })
        .then((response) => {
            axios({
                method: 'GET',
                url: `/api/fetchRole`,
                params: {
                    role_type: "ALL"
                  }
            })
            .then((response) => {
                response.data.json.result.map((row,ind) => {
                        adminRow = {
                            name: row.role,
                            dashboardpermission: response.data.json.result[ind].permissions.includes("Dashboard") ? true : false,
                            pop360permission: response.data.json.result[ind].permissions.includes("pop360") ? true : false,
                            pop360CMPpermission: response.data.json.result[ind].permissions.includes("pop360 - CMP") ? true : false,
                            searchpatientpermission: response.data.json.result[ind].permissions.includes("Search Patient") ? true : false,
                            health360permission: response.data.json.result[ind].permissions.includes("health360") ? true : false,
                            timelinepermission: response.data.json.result[ind].permissions.includes("Timeline") ? true : false,
                            assessmentpermission: response.data.json.result[ind].permissions.includes("Assessment") ? true : false,
                            RPMpermission: response.data.json.result[ind].permissions.includes("RPM") ? true : false,
                            telemedicinepermission: response.data.json.result[ind].permissions.includes("Telemedicine") ? true : false,
                            careplanpermission: response.data.json.result[ind].permissions.includes("Careplan") ? true : false,
                            notespermission: response.data.json.result[ind].permissions.includes("Note") ? true : false,
                            umpermission: response.data.json.result[ind].permissions.includes("UM") ? true : false,
                            PApermission: response.data.json.result[ind].permissions.includes("Payer Analytics") ? true : false,
                        }
                    array.push(adminRow);
                })
                this.setState({
                    isLoaded: false,
                    rolesdata: {
                        columns: [
                            {
                                label: 'Role Type',
                                field: 'name',
                            },
                            {
                                label: 'Dashboard',
                                field: 'dashboardpermission',
                            },
                            {
                                label: 'pop360',
                                field: 'pop360permission',
                            },
                            {
                                label: 'pop360 - CMP',
                                field: 'pop360CMPpermission',
                            },
                            {
                                label: 'Search Patient',
                                field: 'searchpatientpermission',
                            },
                            {
                                label: 'health360',
                                field: 'health360permission',
                            },
                            {
                                label: 'Timeline',
                                field: 'timelinepermission',
                            },
                            {
                                label: 'Assessment',
                                field: 'assessmentpermission',
                            },
                            {
                                label: 'RPM',
                                field: 'RPMpermission',
                            },
                            {
                                label: 'Telemedicine',
                                field: 'telemedicinepermission',
                            },
                            {
                                label: 'Careplan',
                                field: 'careplanpermission',
                            },
                            {
                                label: 'Note',
                                field: 'notespermission',
                            },
                            {
                                label: 'UM',
                                field: 'umpermission'
                            },
                            {
                                label: 'Payer Analytics',
                                field: 'PApermission',
                            }],
                            rows: array
                    }
                }, () => {
                    let adminroles = this.state.rolesdata;
                    if(adminroles.rows){
                        for (let i = 0; i < adminroles.rows.length; i++) {
                            adminroles.rows[i].dashboardpermission = <div>{ this.state.rolesdata.rows[i].dashboardpermission ? <MDBIcon icon="check"></MDBIcon> : null }</div>,
                            adminroles.rows[i].pop360permission = <div>{ this.state.rolesdata.rows[i].pop360permission ? <MDBIcon icon="check"></MDBIcon> : null }</div>,
                            adminroles.rows[i].pop360CMPpermission = <div>{ this.state.rolesdata.rows[i].pop360CMPpermission ? <MDBIcon icon="check"></MDBIcon> : null }</div>,
                            adminroles.rows[i].searchpatientpermission = <div>{ this.state.rolesdata.rows[i].searchpatientpermission ? <MDBIcon icon="check"></MDBIcon> : null }</div>
                            adminroles.rows[i].health360permission = <div>{ this.state.rolesdata.rows[i].health360permission ? <MDBIcon icon="check"></MDBIcon> : null }</div>,
                            adminroles.rows[i].timelinepermission = <div>{ this.state.rolesdata.rows[i].timelinepermission ? <MDBIcon icon="check"></MDBIcon> : null }</div>,
                            adminroles.rows[i].assessmentpermission = <div>{ this.state.rolesdata.rows[i].assessmentpermission ? <MDBIcon icon="check"></MDBIcon> : null }</div>,
                            adminroles.rows[i].RPMpermission = <div>{ this.state.rolesdata.rows[i].RPMpermission ? <MDBIcon icon="check"></MDBIcon> : null }</div>,
                            adminroles.rows[i].telemedicinepermission = <div>{ this.state.rolesdata.rows[i].telemedicinepermission ? <MDBIcon icon="check"></MDBIcon> : null }</div>,
                            adminroles.rows[i].careplanpermission = <div>{ this.state.rolesdata.rows[i].careplanpermission ? <MDBIcon icon="check"></MDBIcon> : null }</div>,
                            adminroles.rows[i].notespermission = <div>{ this.state.rolesdata.rows[i].notespermission ? <MDBIcon icon="check"></MDBIcon> : null }</div>
                            adminroles.rows[i].umpermission = <div>{ this.state.rolesdata.rows[i].umpermission ? <MDBIcon icon="check"></MDBIcon> : null }</div>
                            adminroles.rows[i].PApermission = <div>{ this.state.rolesdata.rows[i].PApermission ? <MDBIcon icon="check"></MDBIcon> : null }</div>
                        }
                    }
                })
                
            })
        })
    }
    handleMultiSelection = (event) => {
        let field_name = event.target.name;
        if(this.state.selectedValues.indexOf(event.target.name) !== -1){
            let selectedValues = [];
            selectedValues = this.state.selectedValues.filter(ele => ele !== event.target.name)
            this.setState({
                selectedValues: selectedValues
            });
        }else{
            let selectedValues = [];
            selectedValues.push(field_name);
            this.setState(prevState => ({
                selectedValues: [...prevState.selectedValues, field_name]
            }));
        }
    }
    handleRoleChange = (e) => {
        this.setState({
            selectedRole: this.state.rolet_ypes[e[0]].text
        })
    }
    render() {
        console.log(this.state.rolesdata,"selectedValues")
        return (
            <React.Fragment>
            <Head>
                <title>Healthlligence</title>
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
            </Head>
                <Layout isLoaded={this.state.isLoaded}>
                    <div style={{maxWidth:"1400px", margin:"0 auto"}}>
                        <MDBTypography tag="h5" className="personalusers-info">Roles</MDBTypography>
                        <MDBTypography tag="h6" className="basic-info"> You can create new roles </MDBTypography>

                        <MDBCard style={{marginTop:"16px"}}>
                            <MDBCardBody>
                                 <MDBDataTableV5
                                    hover
                                    responsive
                                    data={this.state.rolesdata}
                                    paging={false}
                                    searchBottom={false}
                                />

                                {/* }  */}
                            </MDBCardBody>
                        </MDBCard>
                        <MDBRow className="justify-content-end">
                            <div style={{marginRight: "10px", float: "right", marginTop: "16px" }} className="buttons-container">
                                {/* {
                                    this.state.roleName == "supervisor" ? <MDBBtn color="primary" className="edit-button" onClick={this.supervisornewrole.bind(this)}>Add New Role</MDBBtn>:  */}
                                    <MDBBtn color="primary" className="edit-button" onClick={this.adminaddnewrole.bind(this)}>Add New Role</MDBBtn> 
                                    {/* } */}
                            </div>
                        </MDBRow>
                    </div>

                    <MDBModal isOpen={this.state.adminnewrolemodal} toggle={this.adminnewrolemodaltoggle} className="newproblemmodal">
                        <MDBModalHeader className="modal-title" toggle={this.adminnewrolemodaltoggle} style={{ margin: "auto" }}>
                            Add New Role
                        </MDBModalHeader>
                        <MDBModalBody className="newproblemmodalbody">
                           <MDBInput label="Name" value={this.state.adminRolename} name="rolename" onChange={this.handleAdminInput} />
                           <MDBSelect
                                    // label="Choose a Role Type"
                                    label = "Requesting to Speciality"
                                    options={this.state.rolet_ypes}
                                    // selected={"Choose role type"}
                                    selected={this.state.selectedRole ? this.state.selectedRole : ""}
                                    className="roleType-dropdown"
                                    getValue={(val) => this.handleRoleChange(val)}
                            />
                           
                            <div>
                                <MDBRow className="assessment-row pt-3 pl-1 pr-1">
                                    {
                                        this.state.roles.map((elm, index) => {
                                            return (
                                                <>
                                                <div className={`assessment-option ${(this.state.selectedValues.includes(elm)) ? 'hasSelected' : ''}`}>
                                                    <input
                                                    type="checkbox"
                                                    className={`custom-control-input assessmentOption`}
                                                    name={elm}
                                                    value={elm}
                                                    id={index + elm}
                                                    checked={true}
                                                    onClick={(event) => this.handleMultiSelection(event)}
                                                    />
                                                    {elm == "Dashboard" ? <span className={`navicon ${(this.state.selectedValues.includes(elm)) && 'active'}`} style={{paddingLeft:"10px"}}><img src="images/icons/home.svg" className="nav-img" /></span> : null}
                                                    {elm == "pop360" ? <span className={`navicon ${(this.state.selectedValues.includes(elm)) && 'active'}`}><img src="images/icons/pop.svg" className="nav-img" style={{marginLeft: "12px"}}/></span> : null}
                                                    {elm == "pop360 - CMP" ? <span className={`navicon ${(this.state.selectedValues.includes(elm)) && 'active'}`}><img src="images/icons/pop.svg" className="nav-img" style={{marginLeft: "12px"}}/></span> : null}
                                                    {elm == "Search Patient" ? <span className={`navicon ${(this.state.selectedValues.includes(elm)) && 'active'}`}><img src="images/icons/patientList.svg" className="nav-img" style={{marginLeft: "12px"}}/></span> : null}
                                                    {elm == "health360" ? <span className={`navicon ${(this.state.selectedValues.includes(elm)) && 'active'}`}><img src="images/icons/health360_v5.svg" className="nav-img" style={{marginLeft: "12px"}}/></span> : null}
                                                    {elm == "Timeline" ? <span className={`navicon ${(this.state.selectedValues.includes(elm)) && 'active'}`}><img src="images/icons/timeline.svg" className="nav-img" style={{marginLeft: "12px"}}/></span> : null}
                                                    {elm == "Assessment" ? <span className={`navicon ${(this.state.selectedValues.includes(elm)) && 'active'}`}><img src="images/icons/assessment.svg" className="nav-img" style={{marginLeft: "12px"}}/></span> : null}
                                                    {elm == "RPM" ? <span className={`navicon ${(this.state.selectedValues.includes(elm)) && 'active'}`}><img src="images/icons/rpm_new.svg" className="nav-img" style={{marginLeft: "12px"}}/></span> : null}
                                                    {elm == "Telemedicine" ? <span className={`navicon ${(this.state.selectedValues.includes(elm)) && 'active'}`}><img src="images/telemedicine_grey.svg" className="nav-img" style={{marginLeft: "12px"}}/></span> : null}
                                                    {elm == "Careplan" ? <span className={`navicon ${(this.state.selectedValues.includes(elm)) && 'active'}`}><img src="images/icons/careplan.svg" className="nav-img" style={{marginLeft: "12px"}}/></span> : null}
                                                    {elm == "Note" ? <span className={`navicon ${(this.state.selectedValues.includes(elm)) && 'active'}`}><img src="images/icons/note.svg" className="nav-img" style={{marginLeft: "12px"}}/></span> : null}
                                                    {elm == "UM" ? <span className={`navicon ${(this.state.selectedValues.includes(elm)) && 'active'}`}><img src="images/navutilization.svg" className="nav-img" style={{marginLeft: "12px"}}/></span> : null}
                                                    {elm == "Payer Analytics" ? <span className={`navicon ${(this.state.selectedValues.includes(elm)) && 'active'}`}><img src="images/PayerAnalytics.svg" className="nav-img" style={{marginLeft: "12px"}}/></span> : null}
                                                    
                                                    <label for={index + elm} className={"roles-option-label"}> &nbsp; {(/.*\(.*\).*/.test(elm)) ? elm.substr(0, elm.indexOf('(')) : elm}  &nbsp;
                                        {(/.*\(.*\).*/.test(elm) && elm.match(/\(([^)]+)\)/)[1].length > 1)
                                                    }
                                                    </label>
                                                </div>

                                                </>
                                            )
                                        })
                                    }
                                
                                </MDBRow>
                            </div>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn flat className="flatbutton" onClick={this.adminnewrolemodaltoggle}>Cancel</MDBBtn>
                            <MDBBtn flat className="flatbutton" onClick={this.adminRoleAddMethod}>Save</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>

                    <MDBModal isOpen={this.state.supervisornewrolemodal} toggle={this.supervisornewrolemodaltoggle} className="newproblemmodal">
                        <MDBModalHeader className="modal-title" toggle={this.supervisornewrolemodaltoggle}>
                            Add New Role
                        </MDBModalHeader>
                        <MDBModalBody className="newproblemmodalbody">
                           <MDBInput label="Name" value={this.state.superVisorRolename} name="rolename" onChange={this.handleInput} />
                            <div>
                                <MDBInput type="checkbox" id="checkbox1" value={this.state.careasssitantValue} getValue={this.getcareasssitantValue}> 
                                    <img src="images/users.png" className="nav-img" style={{marginTop: "-20px"}}/> 
                                    <span style={{position: "absolute", marginLeft: "8px"}}> careassistant.ai </span>
                                </MDBInput>
                                <hr/>
                                <MDBInput type="checkbox" id="checkbox2" value={this.state.dashboardValue} getValue={this.getdashboardValue}>
                                    <img src="images/icons/home.svg" className="nav-img" style={{marginTop: "-20px"}}/>
                                    <span style={{position: "absolute", marginLeft: "8px"}}> dashboard </span>
                                </MDBInput>
                                 <hr/>
                                <MDBInput type="checkbox" id="checkbox3" value={this.state.pop360Value} getValue={this.getpop360Value}> 
                                    <img src="images/icons/pop.svg" className="nav-img" style={{marginTop: "-20px"}} />
                                    <span style={{position: "absolute", marginLeft: "8px"}}> pop360 </span>
                                </MDBInput> 
                                <hr/>
                                <MDBInput type="checkbox" id="checkbox4" value={this.state.telemedicineValue} getValue={this.gettelemedicineValue}>
                                    <img src="images/icons/monitor.svg" className="nav-img" style={{marginTop: "-20px"}} />
                                    <span style={{position: "absolute", marginLeft: "8px"}}> telemedicine </span>
                                </MDBInput> 
                                <hr/>
                                
                            </div>
                      
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn flat className="flatbutton" onClick={this.supervisornewrolemodaltoggle}>Cancel</MDBBtn>
                            <MDBBtn flat className="flatbutton" onClick={this.supervisornewrolemodaltoggle}>Save</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>

                    {this.state.isLoaded ? <Loader /> : ""}
                    <style jsx>{rolesstyle}</style>
                    <style jsx>{AssessmentStyle}</style>
                </Layout>
            </React.Fragment>
        );
    }

}

export default Roles;
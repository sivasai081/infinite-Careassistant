import React, { Component } from "react";
import Head from 'next/head'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Layout from '../components/layout';
import axios from 'axios';
import Loader from '../components/loader';
import { MDBTypography, MDBSelect, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBInput } from "mdbreact";
import usersstyle from '../styles/users';
import manageaccountstyle from '../styles/manageaccount';
import { Upload } from "@progress/kendo-react-upload";
import '@progress/kendo-theme-default/dist/all.css';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            roles: [],
            prefix: "",
            suffix: "",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            speialization: "",
            selectedRole: "",
            patientCareteam: [],
            files: [],
            filePreviews: {},
        };
    }

    componentDidMount() {
        let patientId = localStorage.getItem('patientId');
        let roles = [];
        let emailIds = [];
        axios({
            method: 'GET',
            url: `/api/getCareTeamDetails`,
            params: {
              id: patientId
            }
        })
        .then((response) => {
            if(response.data.json !== null){
                // this.setState({ isLoaded: true });
                response.data.json && response.data.json.members.map((item) => {
                  emailIds.push(item.email_id);
                })
                this.setState({
                  patientCareteam: response.data.json.members
                })
              }
        })

        axios({
            method: 'GET',
            url: `/api/fetchRole`,
            params: {
                role_type: "ALL"
              }
        })
        .then((response) => {
            response.data.json.result.map((el,index) => {
                roles.push({text: el.role, value: index});
                this.setState({
                    roles: roles,
                    isLoaded: false
                });
            })
        })
    }
    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleRoleChange = (e) => {
        console.log(e)
        if(e.length > 0){
            this.setState({
                selectedRole: this.state.roles[e[0]].text
            })
        }
    }
    prefixHandler = (e) => {
        this.setState({
            prefix : e.target.value
        })
    }
    suffixHandler = e => {
        this.setState({
            suffix: e.target.value
        })
    }
    firstNameHandler = e  =>{
        this.setState({
            firstName: e.target.value
        })
    }
    lastNameHandler = e =>{
        this.setState({
            lastName: e.target.value
        })
    }
    emailHandler = e => {
        this.setState({
            email: e.target.value
        })
    }
    phoneNumberHandler = e => {
        this.setState({
            phoneNumber: e.target.value
        })
    }
    specializationHandler = e => {
        this.setState({
            speialization: e.target.value
        })
    }
    addUserToCareTeam = (e) => {
        this.setState({
            isLoaded: true
        })
        axios({
            method: 'GET',
            url: `/api/fetchRole`,
            params: {
              role_type: this.state.selectedRole
            }
        })
        .then((response) => {
            
            let role_Type = response.data.json.result[0].role_type;
            axios({
                method: 'POST',
                url: `/api/addCareTeamMember`,
                data: {
                    email: this.state.email,
                    firstname: this.state.firstName,
                    lastname: this.state.lastName,
                    role: this.state.selectedRole,
                    role_type: role_Type,
                    details: {
                        "specialization": this.state.speialization,
                        "prefix": this.state.prefix,
                        "suffix": this.state.suffix,
                        "phone": this.state.phoneNumber
                    }
                }
            }).then((response) => {
                axios({
                    method: 'POST',
                    url: `/api/generateUserTwilioIdentification`,
                    data: {
                        identity: this.state.email
                    }
                })
                .then((response) => {
                    this.setState({
                        isLoaded: false
                    })
                })
            })
        })
        
    }

    onRemove = (event) => {
        const filePreviews = {
            ...this.state.filePreviews,
        };

        event.affectedFiles.forEach((file) => {
            delete filePreviews[file.uid];
        });

        this.setState({
            files: event.newState,
            filePreviews: filePreviews,
        });
    };

    onProgress = (event) => {
        this.setState({
            files: event.newState,
            
        });
    };

    onStatusChange = (event) => {
        this.setState({
            files: event.newState,
        });
    };
    onAdd = (event) => {
        const afterStateChange = () => {
            event.affectedFiles
                .filter((file) => !file.validationErrors)
                .forEach((file) => {
                    const reader = new FileReader();

                    reader.onloadend = (ev) => {
                        this.setState({
                            filePreviews: {
                                ...this.state.filePreviews,
                                [file.uid]: ev.target.result,
                            },
                        });
                    };

                    reader.readAsDataURL(file.getRawFile());
                });
        };

        this.setState(
            {
                files: event.newState,
                
            },
            afterStateChange
        );
    };

    render() {
        return (
            <React.Fragment>
            <Head>
                <title>Healthlligence</title>
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
            </Head>
                <Layout isLoaded={this.state.isLoaded}>
                    <MDBTypography tag="h5" className="personalusers-info">Add Users</MDBTypography>
                    <MDBTypography tag="h6" className="basic-info"> Add a new user with the existing role </MDBTypography>

                    <MDBCard style={{maxWidth:"600px", margin:"16px auto 0px auto"}} className="adduser-card">
                        <MDBCardBody>
                            <MDBRow  style={{marginBottom: "-30px"}}>
                                <MDBCol size="6">
                                <MDBInput label="Prefix" icon="user" value = {this.state.prefix} onChange={this.prefixHandler} />
                                </MDBCol>
                                <MDBCol size="6">
                                <MDBInput label="Suffix" icon="user" value = {this.state.suffix} onChange={this.suffixHandler} />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow  style={{marginBottom: "-30px"}}>
                                <MDBCol size="6">
                                <MDBInput label="First Name" icon="user" value = {this.state.firstName} onChange={this.firstNameHandler} />
                                </MDBCol>
                                <MDBCol size="6">
                                <MDBInput label="Last Name" icon="user" value = {this.state.lastName} onChange={this.lastNameHandler} />
                                </MDBCol>
                            </MDBRow>
                            <MDBInput label="Email" icon="envelope" value = {this.state.email} onChange={this.emailHandler} />
                            {/* <MDBInput label="Phone" icon="phone-alt" value = {this.state.phoneNumber} onChange={this.phoneNumberHandler} /> */}
                            <MDBInput label="Specialization" icon="plus-square" value = {this.state.speialization} onChange={this.specializationHandler} />
                            <MDBRow  style={{marginTop: "-24px"}}>
                            <MDBCol sm="12" md="12" lg="12" className="dropdown-col" style={{marginLeft: "4px"}}>
                                <MDBSelect
                                    options={this.state.roles}
                                    selected={this.state.selectedRole ? this.state.selectedRole : "Choose a Role"}
                                    getValue={(val) => this.handleRoleChange(val)}
                                    className="month-right-dropdown registries-dropdown"
                                />
                            </MDBCol>
                            </MDBRow>
                            <div style={{marginBottom: "24px"}}>
                                <Upload
                                    batch={false}
                                    multiple={false}
                                    files={this.state.files}
                                    onAdd={this.onAdd}
                                    onRemove={this.onRemove}
                                    onProgress={this.onProgress}
                                    onStatusChange={this.onStatusChange}
                                    withCredentials={false}
                                    saveUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/save'}
                                    removeUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/remove'}
                                />
                               </div>
                                {this.state.files.length ? (
                                    <div style={{marginBottom: "24px"}}>
                                        {Object.keys(this.state.filePreviews).map((fileKey, index) => (
                                            <img
                                                src={this.state.filePreviews[fileKey]}
                                                alt={"image preview"}
                                                className="mediaimage"
                                                key={index}
                                            />
                                        ))}
                                    </div>
                                ) : undefined}
                        </MDBCardBody>
                    </MDBCard>

                    <div className="text-center buttons-container" style={{ marginTop: "16px" }}>
                        <MDBBtn color="primary" className="edit-button" onClick={this.addUserToCareTeam}>Add User</MDBBtn>
                    </div>




                    {this.state.isLoaded && <Loader />} 
                    <style jsx>{usersstyle}</style>
                    <style jsx>{manageaccountstyle}</style>
                </Layout>
            </React.Fragment>
        );
    }

}

export default Users;
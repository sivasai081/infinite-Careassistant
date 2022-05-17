import React, { Component } from "react";
import Head from 'next/head'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Layout from '../components/layout';
import Link from 'next/link';
import { MDBTypography, MDBSelect, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBDataTableV5, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBIcon, MDBInput, MDBDatePicker } from "mdbreact";
import usersstyle from '../styles/users';
import manageaccountstyle from '../styles/manageaccount';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';
import Loader from '../components/loader';
import { Upload } from "@progress/kendo-react-upload";
import '@progress/kendo-theme-default/dist/all.css';
import * as Constants from '../constants/constant';
import FormData from "form-data";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            perPage: 10,
            page: 1,
            render: false,
            files: [],
            filePreviews: {},
            pageFrom: 1,
            selectedRole: "",
            userdeleteconfirmationmodal: false,
            headername: "Users",
            roles: [],
            headersubname: "Find and edit users among 8 users",
            allusers: [],
            usersdata: {
                columns: [
                    {
                        label: 'Name',
                        field: 'name',
                        sort: 'asc'

                    },
                    {
                        label: 'Role',
                        field: 'role',


                    },
                    {
                        label: 'Email',
                        field: 'email',


                    }, {
                        label: 'Action',
                        field: 'action',


                    }],
                rows: []
            }

        };
    }

    

    

    componentDidMount() {
        let rolename = localStorage.getItem("roleName");
        axios({
            method: 'GET',
            url: `/api/fetchRole`,
            params: {
                role_type: "ALL"
              }
        })
        .then((response) => {
            let roles = [];
            response.data.json.result.map((el,index) => {
                roles.push({text: el.role, value: index});
                this.setState({
                    roles: roles
                });
            })
        })
        axios({
            method: 'GET',
            url: `/api/listCareTeamDetails`
        })
            .then((response) => {
                this.setState({ rolename: rolename, allusers: response.data.json.result }, () => {
                    this.setState({
                        usersdata: {
                            columns: [
                                {
                                    label: 'Name',
                                    field: 'firstname',
                                   

                                },
                                {
                                    label: 'Role',
                                    field: 'role',


                                },
                                {
                                    label: 'Email',
                                    field: 'email_id',


                                }, {
                                    label: 'Specialization',
                                    field: 'specialization',


                                },
                                {
                                    label: 'Action',
                                    field: 'action',


                                }],
                            rows: this.state.allusers
                            
                        }
                    }, ()=>{
                            this.setState({render: true, isLoaded: false});
                             
                             let users = this.state.usersdata;
                             for (let i = 0; i < users.rows.length; i++) {
                                let color;
                                if (users.rows[i].role.toLowerCase() === "socialworker") {
                                  color = "#28b6f6";
                                } else if (users.rows[i].role.toLowerCase() === "doctor" || users.rows[i].role.toLowerCase().includes("doctor")) {
                                  color = "#0288d1";
                                } else if (users.rows[i].role.toLowerCase() === "caremanager") {
                                  color = "#db1962";
                                } else if (users.rows[i].role.toLowerCase() === "super admin") {
                                  color = "#9e9e9e";
                                } else if (users.rows[i].role.toLowerCase() === "supervisor") {
                                  color = "#db1962";
                                } else if (users.rows[i].role.toLowerCase() === "nurse") {
                                  color = "#ff7367";
                                } else if (users.rows[i].role.toLowerCase() === "coordinator") {
                                  color = "#00897b";
                                } else if (users.rows[i].role.toLowerCase() === "md") {
                                  color = "#536dfe";
                                } else if (users.rows[i].role.toLowerCase() === "caregiver") {
                                  color = "#7cb342";
                                } else if (users.rows[i].role.toLowerCase() === "patient") {
                                  color = "#ff8a00";
                                }
                                //  this.state.render || !this.state.render ? users.rows[i].firstname = <div><div style={{ marginRight: "12px", backgroundColor:color }} className="usericons countertexticon menuicon">{((this.state.usersdata.rows[i].firstname).charAt(0).toUpperCase() + (this.state.usersdata.rows[i].lastname).charAt(0).toUpperCase())}</div> {(this.state.usersdata.rows[i].firstname +  " " + this.state.usersdata.rows[i].lastname)}</div> : null
                                {
                                    this.state.render ||  !this.state.render ?  this.state.rolename == "Care Manager" ?
                                        users.rows[i].action = <div><MDBIcon icon="eye" className="iconcolor" onClick={this.viewUser.bind(this, this.state.usersdata.rows[i])} />   </div>
                                        : users.rows[i].action = <div><MDBIcon icon="eye" className="iconcolor" onClick={this.viewUser.bind(this, this.state.usersdata.rows[i])} /> <MDBIcon icon="edit" className="icon-color" onClick={this.editUser.bind(this, this.state.usersdata.rows[i])} /> <MDBIcon icon="trash-alt" className="icon-color" onClick={this.deleteUser.bind(this)} />  </div> : null
                                }
                                

                            }
                    });
                });


            })





    }

    handlePageChange = (e, val) => {
        this.setState({ pageFrom: ((val * this.state.perPage) - (this.state.perPage - 1)), page: val });
    }

    deleteUser() {
        this.setState({
            userdeleteconfirmationmodal: true,
        });
    }

    viewUser(el) {
        console.log(el);
        this.setState({
            headername: "VIEW USER",
            headersubname: "Basic info, like your name and email, that you use on careassistant.ai",
            viewusername: el.firstname + " " + el.lastname,
            firstname: el.firstname,
            lastname: el.lastname,
            viewuseremail: el.email_id,
            viewuserrole: el.role,
            viewuserid: el.specialization
        });
    }
    editUser(el) {
        console.log(el) 
        this.setState({
            headername: "EDIT USER",
            headersubname: "Edit a chosen user's information",
            firstname: el.firstname,
            lastname: el.lastname,
            role: el.role,
            selectedRole: el.role,
            id: el.specialization,
            email: el.email_id,
            phone: '1-320-920-1923'

        });
    }

    viewedituser() {
        this.setState({
            headername: "EDIT USER",
            headersubname: "Edit a chosen user's information",
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            role: this.state.viewuserrole,
            selectedRole: this.state.viewuserrole,
            id: this.state.viewuserid,
            email: this.state.viewuseremail,
            phone: '1-320-920-1923'

        });
    }

    backtousers() {
        this.setState({
            headername: "Users",
            headersubname: "Find and edit users among 8 users"
        });
    }

    deleteUserconfirmationtoggle = () => {
        this.setState({
            userdeleteconfirmationmodal: !this.state.userdeleteconfirmationmodal,

        });
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    paginate(array, page_size, page_number) {
        console.log(array.slice((page_number - 1) * page_size, page_number * page_size))
        return array.slice((page_number - 1) * page_size, page_number * page_size);
    }

    
    handleRoleChange = (e) => {
        console.log(e)
        if(e.length > 0){
            this.setState({
                selectedRole: this.state.roles[e[0]].text
            })
        }
    }

    editUserToCareTeam = (e) => {
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
            console.log("this.state.firstName,", this.state.firstName,)
            let role_Type = response.data.json.result[0].role_type;
            axios({
                method: 'PUT',
                url: `/api/addCareTeamMember`,
                params: {
                    email: this.state.email,
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    role: this.state.selectedRole,
                    role_type: role_Type,
                },
               
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

                 
                
                let formData = new FormData();
                formData.append('file', this.state.files)
                formData.append('id', this.state.email)
                formData.append('member_type', "CAREMANAGER")
                 axios({
                    method: 'POST',
                    url: `/api/profileimage`,
                    data: formData
                    
                })
                .then((response) => {
                    window.location.reload()
                    console.log("response", response)
                 })
                 .catch((err)=>{
                     console.log("err", err)
                 })


                
                
            })
        })
        
    }
    

    onfileChange = event =>{
        console.log(event.target.files[0].size)
        this.setState({
            files: event.target.files[0]
        })
    }


    render() {
        let rowslength = this.state.allusers.length;
        return (
            <React.Fragment>
                <Head>
                <title>Healthlligence</title>
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
            </Head>
                <Layout isLoaded={this.state.isLoaded}>
                    <MDBTypography tag="h5" className="personalusers-info">{this.state.headername}</MDBTypography>
                    <MDBTypography tag="h6" className="basic-info"> {this.state.headersubname} </MDBTypography>
                    
                    
                    {this.state.headername == "VIEW USER" ? <div style={{ maxWidth:"1200px", margin:"16px auto 0px auto"}}>
                        <div className="text-center" style={{ marginTop: "16px" }}>
                            <img src="/images/userprofilecircle.png" alt='profileimage' id='profileimage' />
                        </div>

                        <MDBCard style={{ marginLeft: "20%", marginRight: "20%" }}>
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol md="4">
                                        <p className="manageuserdeatilslabel"> Name</p>
                                    </MDBCol>
                                    <MDBCol md="8">
                                        <p className="manageuserdeatilsvalue"> {this.state.viewusername}</p>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol md="4">
                                        <p className="manageuserdeatilslabel"> Email</p>
                                    </MDBCol>
                                    <MDBCol md="8">
                                        <p className="manageuserdeatilsvalue"> {this.state.viewuseremail}</p>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                {/* <MDBRow>
                                    <MDBCol md="4">
                                        <p className="manageuserdeatilslabel"> Phone</p>
                                    </MDBCol>
                                    <MDBCol md="8">
                                        <p className="manageuserdeatilsvalue"> (213) 555-1234 </p>
                                    </MDBCol>
                                </MDBRow>
                                <hr /> */}

                                <MDBRow>
                                    <MDBCol md="4">
                                        <p className="manageuserdeatilslabel"> Password</p>
                                    </MDBCol>
                                    <MDBCol md="8">
                                        <p className="manageuserdeatilsvalue"> .................. </p>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol md="4">
                                        <p className="manageuserdeatilslabel"> Specialization  </p>
                                    </MDBCol>
                                    <MDBCol md="8">
                                        <p className="manageuserdeatilsvalue"> {this.state.viewuserid}</p>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol md="4">
                                        <p className="manageuserdeatilslabel"> Role</p>
                                    </MDBCol>
                                    <MDBCol md="8">
                                        <p className="manageuserdeatilsvalue"> {this.state.viewuserrole}</p>
                                    </MDBCol>
                                </MDBRow>

                            </MDBCardBody>

                        </MDBCard>


                        <div className="text-center buttons-container" style={{ marginTop: "16px" }}>
                            <MDBBtn className="back-button" onClick={this.backtousers.bind(this)}>BACK</MDBBtn>
                            <MDBBtn color="primary" className="edit-button" onClick={this.viewedituser.bind(this)}>Edit</MDBBtn>
                        </div>


                    </div> : null
                    }
                    {this.state.headername == "Users" ? <div style={{ maxWidth:"1200px", margin:"16px auto 0px auto"}}>
                        <MDBRow className="justify-content-center align-items-center">
                            <MDBCol sm="9" md="9" lg="9">
                                <div style={{ marginLeft: "12px" }}>
                                    {
                                        this.state.rolename == "Care Manager" ? null :
                                            <div><MDBIcon icon="trash" /> <span className="recyclebin"> Recycle Bin </span> </div>
                                    }
                                </div>
                            </MDBCol>
                            <MDBCol sm="3" md="3" lg="3">
                                <div class="custom_search_container" style={{marginTop:"10px"}}>
                                            <MDBIcon icon="search" className="custom_search_icon" style={{ color: "#424242" }} />
                                            <input placeholder="Member ID or Name" id="searching" className="custom_search_bar" type="text" ></input>
                                        </div>
                                {/* <div className="searchingdiv" style={{ float: "right" }}>
                                    <MDBIcon icon="search" className="searchIcon" />
                                    <input placeholder="Member ID or Name" id="searching" className="searching" type="text" />
                                </div> */}
                            </MDBCol>
                        </MDBRow>
                        <MDBCard narrow style={{marginTop: "-8px"}}>
                            <MDBCardBody cascade style={{ marginBottom: "16px" }}>
                                <MDBDataTableV5
                                    hover
                                    responsive
                                    rows={this.paginate(this.state.usersdata.rows, this.state.perPage, this.state.page)}
                                    columns={this.state.usersdata.columns}
                                    paging={false}
                                    searchBottom={false}
                                />

                            </MDBCardBody>
                        </MDBCard>

                        <div className="pagination-container" style={{ marginBottom: "80px", marginLeft: "70px" }}>
                            <Pagination count={Math.ceil(rowslength / this.state.perPage)} page={this.state.page} color="primary" onChange={this.handlePageChange} />
                        </div>


                    </div> : null}
                    {this.state.headername == "EDIT USER" ? <div>
                        <MDBCard style={{ marginLeft: "30%", marginRight: "30%" }}>
                            <MDBCardBody>
                                <MDBInput label="First Name" value={this.state.firstname} name="firstname" onInput={this.handleInput} />
                                <MDBInput label="Last Name" value={this.state.lastname} name="lastname" onInput={this.handleInput} />
                                <MDBInput label="Email" value={this.state.email} name="email" onInput={this.handleInput} />
                                {/* <MDBInput label="Phone" value={this.state.phone} name="phone" onInput={this.handleInput} /> */}
                                {/* <MDBInput label="Specialization" value={this.state.id} name="id" onInput={this.handleInput} /> */}
                                {/* <MDBInput label="Role" value={this.state.role} name="role" onInput={this.handleInput} /> */}
                                
                                
                                <MDBSelect
                                    options={this.state.roles}
                                    outline
                                    selected={this.state.selectedRole ? this.state.selectedRole : "Choose a Role"}
                                    getValue={(val) => this.handleRoleChange(val)}
                                    className="month-right-dropdown"
                                />

                            <div className="imageupload" style={{marginBottom: "24px"}}>
                               <input onChange={this.onfileChange} className="form-control" type="file" ref={input => this.fileInput = input} accept=".png, .jpg, .jpeg, .svg" />
                           </div>
                           
                            </MDBCardBody>
                        </MDBCard>

                        <div className="text-center buttons-container" style={{ marginTop: "16px" }}>
                            <MDBBtn className="back-button" onClick={this.backtousers.bind(this)}>Cancel</MDBBtn>
                            <MDBBtn color="primary" className="edit-button" onClick={this.editUserToCareTeam}>Save</MDBBtn>
                        </div>
                    </div> : null}


                    <MDBModal isOpen={this.state.userdeleteconfirmationmodal} toggle={this.deleteUserconfirmationtoggle} className="newproblemmodal">
                        <MDBModalHeader className="modaltitle" toggle={this.deleteUserconfirmationtoggle}>
                            Confirmation
                        </MDBModalHeader>
                        <MDBModalBody className="newproblemmodalbody" style={{marginLeft: "4px"}}>
                            <p className="confirmationmodalmessage">Are you sure you want to delete ?</p>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn flat className="flatbutton" onClick={this.deleteUserconfirmationtoggle}>Cancel</MDBBtn>
                            <MDBBtn flat className="flatbutton" onClick={this.deleteUserconfirmationtoggle}>Save</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                    {this.state.isLoaded && <Loader />}
                    <style jsx>{usersstyle}</style>
                    <style jsx>{manageaccountstyle}</style>
                </Layout>
            </React.Fragment>
        );
    }

}

export default Users;
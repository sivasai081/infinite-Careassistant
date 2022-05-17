import React, { Component } from "react";
import Head from 'next/head'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Layout from '../components/layout';
import Link from 'next/link';
import { MDBTypography, MDBProgress, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBDataTableV5, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBIcon, MDBInput, MDBDatePicker } from "mdbreact";
import usersstyle from '../styles/users';
import manageaccountstyle from '../styles/manageaccount';
import Pagination from '@material-ui/lab/Pagination';

class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totaluserscount: 10,
            perPage: 5,
            page: 1,
            history: false,
            messagehistory: {
                columns: [
                    {
                        label: 'Name',
                        field: 'name',


                    },
                    {
                        label: 'Request',
                        field: 'request',


                    },
                    {
                        label: 'Reason',
                        field: 'reason',


                    },
                    {
                        label: 'Description',
                        field: 'description',


                    },
                    {
                        label: 'Date',
                        field: 'date',


                    },
                    {
                        label: 'Action',
                        field: 'action',


                    }],
                rows: [
                    {
                        name: 'Iva Mendez',
                        request: 'Close the Goal',
                        reason: 'Met the Goal',
                        description: 'N/A',
                        date: '11/29/2020',
                        action: ''
                    },
                    {
                        name: 'Jamie Franco',
                        request: 'Cancel the request',
                        reason: 'Changed Status',
                        description: 'Misunderstood the charts',
                        date: '11/29/2020',
                        action: ''
                    },
                    {
                        name: 'Iva Mendez',
                        request: 'Close the Goal',
                        reason: 'Met the Goal',
                        description: 'N/A',
                        date: '11/29/2020',
                        action: ''
                    },
                    {
                        name: 'Jamie Franco',
                        request: 'Cancel the request',
                        reason: 'Changed Status',
                        description: 'Misunderstood the charts',
                        date: '11/29/2020',
                        action: ''
                    },
                    {
                        name: 'Iva Mendez',
                        request: 'Close the Goal',
                        reason: 'Met the Goal',
                        description: 'N/A',
                        date: '11/29/2020',
                        action: ''
                    },
                    {
                        name: 'Jamie Franco',
                        request: 'Cancel the request',
                        reason: 'Changed Status',
                        description: 'Misunderstood the charts',
                        date: '11/29/2020',
                        action: ''
                    },
                    {
                        name: 'Iva Mendez',
                        request: 'Close the Goal',
                        reason: 'Met the Goal',
                        description: 'N/A',
                        date: '11/29/2020',
                        action: ''
                    },
                    {
                        name: 'Jamie Franco',
                        request: 'Cancel the request',
                        reason: 'Changed Status',
                        description: 'Misunderstood the charts',
                        date: '11/29/2020',
                        action: ''
                    },
                    {
                        name: 'Lauren Wied',
                        request: 'Close the case',
                        reason: 'Changed Status',
                        date: '11/29/2020',
                        description: 'N/A',
                        action: ''
                    }
                ]
            },
            usersdata: {
                columns: [
                    {
                        label: 'Name',
                        field: 'name',


                    },
                    {
                        label: 'Request',
                        field: 'request',


                    },
                    {
                        label: 'Reason',
                        field: 'reason',


                    },
                    {
                        label: 'Description',
                        field: 'description',


                    },
                    {
                        label: 'Action',
                        field: 'action',


                    }],
                rows: [
                    {
                        name: 'Iva Mendez',
                        request: 'Close the Goal',
                        reason: 'Met the Goal',
                        description: 'N/A',
                        action: ''
                    },
                    {
                        name: 'Jamie Franco',
                        request: 'Cancel the request',
                        reason: 'Changed Status',
                        description: 'Misunderstood the charts',
                        action: ''
                    },
                    {
                        name: 'Lauren Wied',
                        request: 'Close the case',
                        reason: 'Changed Status',
                        description: 'N/A',
                        action: ''
                    }
                ]
            }

        };
    }

    componentDidMount() {
        let width;
        if (typeof window !== 'undefined') {
          width = window.innerWidth;
          // console.log(this.props.screenwidth, window.innerWidth,"this.props.screenwidth")
        }
        let rolename = localStorage.getItem("roleName");
        this.setState({
            rolename: rolename
        }, () => {
            let users = this.state.usersdata;
            let history = this.state.messagehistory;
            for (let i = 0; i < users.rows.length; i++) {
                {width < 599 ? users.rows[i].name =  <div><div style={{ marginRight: "12px" }} className="usericons countertexticon menuicon">{(this.state.usersdata.rows[i].name).match(/\b(\w)/g).join('')}</div> {this.state.usersdata.rows[i].name}</div> :"" }
                users.rows[i].action = <div> <MDBBtn flat className="messageactionbutton">DENY</MDBBtn>
                    <MDBBtn flat className="messageactionbutton">APPROVE</MDBBtn> </div>
            }

            for (let i = 0; i < history.rows.length; i++) {
                history.rows[i].name = <div><div style={{ marginRight: "12px" }} className="usericons countertexticon menuicon">{(this.state.messagehistory.rows[i].name).match(/\b(\w)/g).join('')}</div> {this.state.messagehistory.rows[i].name}</div>
                history.rows[i].action = <div> <MDBBtn flat className="messageactionbutton">RESTORE</MDBBtn> </div>
            }
        });

    }

    handlePageChange = (e, val) => {
        this.setState({ pageFrom: ((val * this.state.perPage) - (this.state.perPage - 1)), page: val });
    }

    historymessages() {
        this.setState({
            history: true
        });
    }

    currentmessages() {
        this.setState({
            history: false
        });
    }

    render() {
        let width;
        if (typeof window !== 'undefined') {
          width = window.innerWidth;
          // console.log(this.props.screenwidth, window.innerWidth,"this.props.screenwidth")
        }
        return (
            <React.Fragment>
            <Head>
                <title>Healthlligence</title>
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
            </Head>
                <Layout>
                    <MDBTypography tag="h5" className="personalusers-info">Messages</MDBTypography>
                    <MDBTypography tag="h6" className="basic-info"> You can approve the request from Care Managers </MDBTypography>
                    <div style={{ maxWidth:"1200px", margin:"16px auto 0px auto"}}>
                        <MDBRow className="justify-content-center align-items-center">
                            <MDBCol sm="9" md="9" lg="9">
                                <div style={{ marginLeft: "12px" }}>
                                    {
                                        this.state.history ? <div><MDBIcon far icon="envelope" /> <span className="recyclebin" onClick={this.currentmessages.bind(this)}> Current Message </span> </div> : <div><MDBIcon icon="history" /> <span className="recyclebin" onClick={this.historymessages.bind(this)}> History </span> </div>
                                    }

                                </div>
                            </MDBCol>
                            <MDBCol sm="3" md="3" lg="3">
                            <div class="custom_search_container" style={{marginTop:"10px"}}>
                                            <MDBIcon icon="search" className="custom_search_icon" style={{ color: "#424242" }} />
                                            <input placeholder="Search" id="searching" className="custom_search_bar" type="text"></input>
                                        </div>
                            {/* <div className="searchingdiv"  style={{ float: "right" }}>
                    <MDBIcon icon="search" className="searchIcon" />
                    <input placeholder="Search" id="searching"  className="searching" type="text" />
                  </div> */}
                                {/* <div className="searchingdiv" style={{ float: "right" }}>
                                    <MDBIcon icon="search" className="searchIcon" />
                                    <input placeholder="Search" id="searching" className="searching" type="text" />
                                </div> */}
                            </MDBCol>
                        </MDBRow>
                        {
                            this.state.history ? <div><MDBCard narrow style={{ marginBottom: "16px" }}>
                                <MDBCardBody cascade style={{ marginBottom: "16px" }}>
                                    <MDBDataTableV5
                                        hover
                                        responsive
                                        data={this.state.messagehistory}
                                        paging={false}
                                        searchBottom={false}
                                    />

                                </MDBCardBody>
                            </MDBCard>

                                <div className="pagination-container" style={{marginBottom: "80px", marginLeft:"60px"}}>
                                    <Pagination count={Math.ceil(this.state.totaluserscount / this.state.perPage)} page={this.state.page} color="primary" onChange={this.handlePageChange} />
                                </div>
                            </div> :
                                <div>
                                    <MDBCard narrow style={{ marginBottom: "16px" }}>
                                        <MDBCardBody cascade style={{ marginBottom: "16px" }}>
                                            <MDBDataTableV5
                                                hover
                                                responsive
                                                data={this.state.usersdata}
                                                paging={false}
                                                searchBottom={false}
                                            />

                                        </MDBCardBody>
                                    </MDBCard>

                                    <div className="pagination-container" style={{marginBottom: "80px", marginLeft:"60px"}}>
                                        <Pagination count={Math.ceil(this.state.totaluserscount / this.state.perPage)} page={this.state.page} color="primary" onChange={this.handlePageChange} />
                                    </div>
                                </div>

                        }
                    </div>

                    <style jsx>{usersstyle}</style>
                    <style jsx>{manageaccountstyle}</style>
                </Layout>
            </React.Fragment>
        );
    }

}

export default Messages;
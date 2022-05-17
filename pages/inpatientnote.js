
import React, { Component } from "react";
import {
    MDBRow, MDBCol, MDBTooltip, MDBTypography, MDBSelect, MDBCard, MDBCardBody, MDBDataTable, MDBCollapseHeader, MDBIcon, MDBDatePicker, MDBTimeline, MDBTimelineStep, MDBInput, MDBCollapse, MDBBtn, MDBModal,
    MDBDataTableV5, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBChipsInput, MDBSelectInput, MDBSelectOptions, MDBSelectOption, MDBCardTitle
} from "mdbreact";
import moment from 'moment';
import ReactHighcharts from 'react-highcharts';
import outpatientStyles from '../styles/outpatient';
import educationMaterialstyles from '../styles/educationmaterials';
import authviewStyles from '../styles/authview';
import Head from 'next/head';
import axios from 'axios';
import Loader from '../components/loader';
import Layout from "../components/layout";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
} from 'mdb-react-ui-kit';
import win from "global";
import { divide } from "lodash";





class Outpatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inpatientauthdetails: {},
            InpatientNoteModal: false,
            InpatientAddendumModal: false,
            mailmodal: false,
            historyDetails: [],
            historymodal: false,
            notecriteria: '',
            dayradio: '',
            notedescription: '',
            reviewradio: '',
            locdropdown: [{
                text: "ICU",
                value: "ICU"
            },
            {
                text: "Medical Surgery",
                value: "medical surgery"
            },
            {
                text: "Telemedicine",
                value: "telemedicine"
            },
            {
                text: "SNF",
                value: "snf"
            }
        ],

        inpatientnotepdfs: {
            columns: [
                {
                    label: 'Name',
                    field: 'name',
                },
                {
                    label: 'Action',
                    field: 'action',
                }],
            rows: [{
                name: "Esteban536Friego535_InpatientNote.pdf",
                action: "",
            }]
        },
            inpatientnotetable: {
                columns: [
                    {
                        label: 'Date',
                        field: 'date',
                    },
                    {
                        label: 'LOC',
                        field: 'loc',
                    },
                    {
                        label: 'Note',
                        field: 'note',
                    },
                    {
                        label: 'Medical Records',
                        field: 'medicalrecords',
                    },
                    {
                        label: 'MD Review',
                        field: 'mdreview',
                    },
                    {
                        label: 'Day Approved',
                        field: 'datapproved',
                    },
                    {
                        label: 'Addendum',
                        field: 'addendum',
                    },
                    {
                        label: 'Run Criteria',
                        field: 'runcriteria',
                    }


                ],
                rows: []
            },
        }
    }

    componentDidMount() {
        let authNumber = localStorage.getItem('authNumber');
        this.setState({
            authNumber: authNumber
        });
        

        axios({
            method: 'GET',
            url: `/api/getAuthById`,
            params: {
                patient_type: "INPATIENT",
                auth_id: authNumber
            }
        })
            .then((response) => {
                this.setState({
                    inpatientauthdetails: response.data.json,

                })
            })

        axios({
            method: 'GET',
            url: `/api/inpatientAuthNote`,
            params: {
                authid: authNumber
            }
        })
            .then((response) => {
                this.setState({
                    inpatientNotes: response.data.json,
                }, ()=>{
                    let inpatientnotetable = {
                        columns: [
                            {
                                label: 'Date',
                                field: 'date',
                            },
                            {
                                label: 'LOC',
                                field: 'loc',
                            },
                            {
                                label: 'Note',
                                field: 'note',
                            },
                            {
                                label: 'Medical Records',
                                field: 'medicalrecords',
                            },
                            {
                                label: 'MD Review',
                                field: 'md_review',
                            },
                            {
                                label: 'Day Approved',
                                field: 'day_approved',
                            },
                            {
                                label: 'Addendum',
                                field: 'addendum',
                            },
                            {
                                label: 'Run Criteria',
                                field: 'run_criteria',
                            }
        
        
                        ],
                        rows: this.state.inpatientNotes && this.state.inpatientNotes.result
                    }
                    this.setState({
                        inpatientnotetable: inpatientnotetable
                    }, ()=> {
                        let inpatientnotetable = this.state.inpatientnotetable;
                        for (let i = 0; i < inpatientnotetable.rows.length; i++) {
                            inpatientnotetable.rows[i].date = <div>{moment(this.state.inpatientnotetable.rows[i].date).format("DD/MM/YYYY")}</div>
                            inpatientnotetable.rows[i].medicalrecords = <div><MDBIcon icon="eye" className="viewicon"></MDBIcon><MDBIcon icon="download" style={{ marginLeft: "12px" }} id='profileimage' /></div>
                            inpatientnotetable.rows[i].addendum = <div><MDBIcon icon="eye" className="viewicon" onClick={() => this.viewInpatientAddendum(this.state.inpatientnotetable.rows[i])}></MDBIcon> <MDBIcon icon="pencil-alt" style={{ marginLeft: "12px", height: "20px" }} id='profileimage' onClick={() => this.addnewInAddendumModal(this.state.inpatientnotetable.rows[i])} /></div>
                            inpatientnotetable.rows[i].run_criteria = <div style={{ color: "#DB1962", textDecoration: "underline", cursor: "pointer" }}>{this.state.inpatientnotetable.rows[i].run_criteria}</div>
                            inpatientnotetable.rows[i].day_approved = <div> {this.state.inpatientnotetable.rows[i].day_approved ? "Yes" : "No"} </div>
                            inpatientnotetable.rows[i].md_review = <div>{this.state.inpatientnotetable.rows[i].md_review  ? "Yes" : "No"}</div>
                            
                        }
                    });
                    
                })
            })

            let inpatientnotepdfs = this.state.inpatientnotepdfs;
            for (let i = 0; i < inpatientnotepdfs.rows.length; i++) {
                inpatientnotepdfs.rows[i].action = <div><MDBIcon icon="eye" className="viewicon"></MDBIcon><img style={{ marginLeft: "12px" }} src="/images/maildownload.svg" alt='profileimage' id='profileimage' /></div>
               
            }
            
    }
    backToAuthEnterSCreen = () => {
        window.location.href = "/inpatientauthview"
    }


    InpatientNotetoggle = () => {
        this.setState({
            InpatientNoteModal: !this.state.InpatientNoteModal
        });
    }

    InpatientAddendumCanceltoggle = () => {
        this.setState({
            InpatientAddendumModal: !this.state.InpatientAddendumModal
        });
    }



    addnewInpatientModal = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.setState({
            InpatientNoteModal: true,
        });
    }

    addMailModal = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.setState({
            mailmodal: true,
        });
    }

    addnewInAddendumModal = (el) => {
        console.log(el);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.setState({
            InpatientAddendumModal: true,
            note_id: el.id
        });
    }

    

    inpatienttoggle = () => {

    }

    inpatientAddendumtoggle = () => {

    }

    onClickdayapproved = nr => () => {
        this.setState({
          dayradio: nr
        });
      };

      onClickdayMDReview = nr => () => {
        this.setState({
          reviewradio: nr
        });
      };
    
      handleLOCChange(value){
          this.setState({
              selectedLOC: value[0]
          });
      }

      viewInpatientAddendum = (el) => {
        this.setState({
            note_id: el.id,
            historymodal: true
        }, ()=>{
            axios({
                method: 'GET',
                url: `/api/inpatientAddendum`,
                params: {
                    authid: this.state.authNumber,
                    note_id: this.state.note_id
                }
            })
            .then((response) => {
                this.setState({
                    viewaddendumresponse: response.data.json
                }, ()=>{
                    this.setState({
                        historyDetails: this.state.viewaddendumresponse.result
                    }, ()=>{
                        console.log(this.state.historyDetails);
                    });
                });
            })
        });
        

        
      }

      saveInpatientAddendum = () =>{
        let data = {
            modified_date: moment(new Date()).format(),
            modified_by_email_id: localStorage.getItem("caremanagerId"),
            modified_by_name: localStorage.getItem("careManagerFirstname"),
            modified_by_role: localStorage.getItem("role"),
            addendum: this.state.addendumdescription
        }
        axios({
            method: 'POST',
            url: `/api/inpatientAddendum`,
            params: {
                authid: this.state.authNumber,
                note_id: this.state.note_id
            },
            data: data,
        })
        .then((response) => {
            this.setState({
                InpatientAddendumModal: false
            });
        })

      }

      saveInpatientNote = () => {
          let data = {
            date: moment(new Date()).format(),
            loc: this.state.selectedLOC,
            note: this.state.notedescription,
            medical_records: "",
            md_review: this.state.reviewradio == 1 ? true : false,
            addendum: [],
            day_approved: this.state.dayradio == 1 ? true : false,
            run_criteria: this.state.notecriteria,
            last_modified_by: localStorage.getItem("caremanagerId")
        }

        
        axios({
            method: 'POST',
            url: `/api/inpatientAuthNote`,
            params: {
                authid: this.state.authNumber
            },
            data: data,
        })
        .then((response) => {
            this.setState({
                InpatientNoteModal: false
            }, ()=> {
                axios({
                    method: 'GET',
                    url: `/api/inpatientAuthNote`,
                    params: {
                        authid: this.state.authNumber
                    }
                })
                    .then((response) => {
                        this.setState({
                            inpatientNotes: response.data.json,
                        }, ()=>{
                            let inpatientnotetable = {
                                columns: [
                                    {
                                        label: 'Date',
                                        field: 'date',
                                    },
                                    {
                                        label: 'LOC',
                                        field: 'loc',
                                    },
                                    {
                                        label: 'Note',
                                        field: 'note',
                                    },
                                    {
                                        label: 'Medical Records',
                                        field: 'medicalrecords',
                                    },
                                    {
                                        label: 'MD Review',
                                        field: 'md_review',
                                    },
                                    {
                                        label: 'Day Approved',
                                        field: 'day_approved',
                                    },
                                    {
                                        label: 'Addendum',
                                        field: 'addendum',
                                    },
                                    {
                                        label: 'Run Criteria',
                                        field: 'run_criteria',
                                    }
                
                
                                ],
                                rows: this.state.inpatientNotes && this.state.inpatientNotes.result
                            }
                            this.setState({
                                inpatientnotetable: inpatientnotetable
                            }, ()=> {
                                let inpatientnotetable = this.state.inpatientnotetable;
                                for (let i = 0; i < inpatientnotetable.rows.length; i++) {
                                    inpatientnotetable.rows[i].date = <div>{moment(this.state.inpatientnotetable.rows[i].date).format("DD/MM/YYYY")}</div>
                                    inpatientnotetable.rows[i].medicalrecords = <div><MDBIcon icon="eye" className="viewicon"></MDBIcon><img style={{ marginLeft: "12px" }} src="/images/maildownload.svg" alt='profileimage' id='profileimage' /></div>
                                    inpatientnotetable.rows[i].addendum = <div><MDBIcon icon="eye" className="viewicon" onClick={() => this.viewInpatientAddendum(this.state.inpatientnotetable.rows[i])}></MDBIcon> <img style={{ marginLeft: "12px", height: "20px" }} src="/images/icons/edit.svg" alt='profileimage' id='profileimage' onClick={() => this.addnewInAddendumModal(this.state.inpatientnotetable.rows[i])}/></div>
                                    inpatientnotetable.rows[i].run_criteria = <div style={{ color: "#DB1962", textDecoration: "underline", cursor: "pointer" }}>{this.state.inpatientnotetable.rows[i].run_criteria}</div>
                                    inpatientnotetable.rows[i].day_approved = <div> {this.state.inpatientnotetable.rows[i].day_approved ? "Yes" : "No"} </div>
                                    inpatientnotetable.rows[i].md_review = <div>{this.state.inpatientnotetable.rows[i].md_review  ? "Yes" : "No"}</div>
                                    
                                }
                            });
                            
                        })
                    })
            });
        })
      }

      handleNotedescriptionchnage = (e) => {
        this.setState({
            notedescription: e.target.value
        });
    }

    handleAddendumchnage = (e) => {
        this.setState({
            addendumdescription: e.target.value
        });
    }

    handleCriteriachnage = (e) => {
        this.setState({
            notecriteria: e.target.value
        });
    }

    historymodaltoggle = () => {
        this.setState({
            historymodal: !this.state.historymodal
        });
    }

    mailmodaltoggle = () => {
        this.setState({
            mailmodal: !this.state.mailmodal
        });
    }

    onHandleSearch = (e) => {
        this.setState({
            historysearch: e.target.value
        });
    }
    mouseHoverEnter(type){
        if(type === "mail"){
            this.setState({
                mailHover: true
            })
        }else if(type === "print"){
            this.setState({
                printHover: true
            })
        }
    }
    mouseHoverleave(type){
        if(type === "mail"){
            this.setState({
                mailHover: false
            })
        }else if(type === "print"){
            this.setState({
                printHover: false
            })
        }
    }

    render() {
        let inpatientnotes = this.state.inpatientNotes && this.state.inpatientNotes.result;
       return (
            <React.Fragment>
                <Head>
                    <title>Healthlligence</title>
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
                </Head>
                <Layout>

                    <MDBRow>
                        <MDBCol>
                            <MDBCard style={{ marginTop: "0px" }}>
                                <MDBCardBody>
                                    <MDBRow className="UnassignedQueues" style={{ paddingBottom: "1rem" }}>
                                        <MDBCol md="4">Inpatient Note</MDBCol>
                                        <MDBCol md="8">
                                            <div style={{ display: "flex", float: "right" }}>
                                                <MDBTooltip domElement tag="span" placement="bottom">
                                                    {/* <img src="/images/icons/generateSendaLetter.svg" alt='profileimage' id='profileimage' onClick={() => this.addMailModal()}/> */}
                                                    <span style={{ marginLeft: "12px" }} onMouseOver={this.mouseHoverEnter.bind(this,"mail")} onMouseOut={this.mouseHoverleave.bind(this,"mail")}>
                                                        {this.state.mailHover ? <img  src="/images/icons/mail_hover.svg"  onClick={() => this.addMailModal()} alt='printIcon' id='printIcon' style={{width:"24px", height:"24px"}} /> : <img src="/images/icons/generateSendaLetter.svg" onClick={() => this.addMailModal()} alt='printIcon' id='printIcon' /> }
                                                    </span>
                                                    <span>Generate & send a Letter</span>
                                                </MDBTooltip>
                                                <MDBTooltip domElement tag="span" placement="bottom">
                                                    {/* <img style={{ marginLeft: "12px" }} src="/images/icons/print.svg" alt='profileimage' id='profileimage' /> */}
                                                    <span style={{ marginLeft: "12px" }} onMouseOver={this.mouseHoverEnter.bind(this,"print")} onMouseOut={this.mouseHoverleave.bind(this,"print")}>
                                                        {this.state.printHover ? <img  src="/images/icons/print_hover.svg" alt='printIcon' id='printIcon' style={{width:"24px", height:"24px"}} /> : <img src="/images/icons/print.svg" alt='printIcon' id='printIcon' /> }
                                                    </span>
                                                    <span>Print</span>
                                                </MDBTooltip>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol md="2" style={{ marginLeft: "16px" }}>
                                            <div style={{ fontWeight: "700", fontSize: "12px", color: "#424242" }}> Authorzation Number </div>
                                            <div style={{ fontSize: "14px", color: "#424242" }}> {this.state.authNumber} </div>
                                        </MDBCol>

                                        <MDBCol md="2">
                                            <div style={{ fontWeight: "700", fontSize: "12px", color: "#424242" }}> Date Auth Entered </div>
                                            <div style={{ fontSize: "14px", color: "#424242" }}> {moment(this.state.inpatientauthdetails.assigned_date).format("MM/DD/YYYY")} </div>
                                        </MDBCol>

                                        <MDBCol md="2">
                                            <div style={{ fontWeight: "700", fontSize: "12px", color: "#424242" }}> Admission Date </div>
                                            <div style={{ fontSize: "14px", color: "#424242" }}> {moment(this.state.inpatientauthdetails.created_date).format("MM/DD/YYYY")} </div>
                                        </MDBCol>

                                        <MDBCol md="2">
                                            <div style={{ fontWeight: "700", fontSize: "12px", color: "#424242" }}> Discharge Date </div>
                                            <div style={{ fontSize: "14px", color: "#424242" }}> 01/02/2021 </div>
                                        </MDBCol>

                                        <MDBCol md="2">
                                            <div style={{ fontWeight: "700", fontSize: "12px", color: "#424242" }}> Place of Service </div>
                                            <div style={{ fontSize: "14px", color: "#424242" }}> {this.state.inpatientauthdetails.place_of_service && this.state.inpatientauthdetails.place_of_service.service} </div>
                                        </MDBCol>
                                    </MDBRow>

                                    <MDBRow style={{ marginTop: "12px", marginLeft: "16px", marginBottom: "12px", fontSize: "16px", fontWeight: "700", color: "#424242" }}>Notes</MDBRow>
                                    <div style={{ marginLeft: "12px" }}>
                                        <MDBDataTable
                                            small
                                            hover={true}
                                            responsive={true}
                                            paging={false}
                                            searching={false}
                                            data={this.state.inpatientnotetable}
                                        />
                                    </div>

                                    <div style={{ float: "right" }}>
                                        <MDBBtn color="" className="addnote" onClick={() => this.addnewInpatientModal()}>Add Note</MDBBtn>
                                    </div>

                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <div style={{ textAlign: "center", marginTop: "20px" }}>
                                <MDBBtn color="" className="addnote" onClick={this.backToAuthEnterSCreen}>Done</MDBBtn>
                            </div>
                        </MDBCol>
                    </MDBRow>

                    <MDBModal isOpen={this.state.InpatientNoteModal} toggle={this.inpatienttoggle} className="educationalmodal">
                        <MDBModalHeader className="" toggle={this.inpatienttoggle}>Add Inpatient Note</MDBModalHeader>
                        <MDBModalBody className="newproblemmodalbody" style={{ marginTop: "-12px", overflowY: "scroll", maxHeight: "400px" }}>


                            <MDBRow className="languagedropdown">
                                <MDBCol sm="12" md="12">
                                    <MDBSelect
                                        options={this.state.locdropdown}
                                        selected="LOC"
                                        getValue={(val) => this.handleLOCChange(val)}

                                    />
                                </MDBCol>
                            </MDBRow>


                            <MDBRow>
                                <MDBCol md="12">
                                    <div className="goalcardbody createedumodal">
                                        <MDBInput type="textarea" label="Please write the reason" onChange={this.handleNotedescriptionchnage} value={this.state.notedescription}></MDBInput>
                                    </div>

                                </MDBCol>
                            </MDBRow>


                            <MDBRow style={{ marginTop: "16px" }}>
                                <span className="materials"> Medical Records</span>
                            </MDBRow>
                            <MDBRow className="createmedialibrary">
                                <MDBBtn color="primary" className="medialibrary" onClick={() => this.medialibrarymodal()}>MEDIA LIBRARY</MDBBtn>

                            </MDBRow>


                            <MDBRow>
                                <MDBCol md="6">
                                    <div style={{ marginTop: "16px" }}>
                                        <span className="materialsradio"> MD Review</span>
                                    </div>
                                    <div style={{ marginTop: "8px", display: "flex", marginLeft: "5px"  }}>
                                    <MDBInput
                                            onClick={this.onClickdayMDReview(1)}
                                            checked={this.state.reviewradio === 1 ? true : false}
                                            label='Yes'
                                            type='radio'
                                            id='radio3'
                                            containerClass='mr-5'
                                        />
                                        <MDBInput
                                            onClick={this.onClickdayMDReview(2)}
                                            checked={this.state.reviewradio === 2 ? true : false}
                                            label='No'
                                            type='radio'
                                            id='radio4'
                                            containerClass='mr-5'
                                        />
                                    </div>

                                </MDBCol>
                                <MDBCol md="6">
                                    <div style={{ marginTop: "16px" }}> <span className="materialsradio"> Day Approved</span></div>
                                    <div style={{ marginTop: "8px", display: "flex", marginLeft: "5px" }}>
                                        <MDBInput
                                            onClick={this.onClickdayapproved(1)}
                                            checked={this.state.dayradio === 1 ? true : false}
                                            label='Yes'
                                            type='radio'
                                            id='radio1'
                                            containerClass='mr-5'
                                        />
                                        <MDBInput
                                            onClick={this.onClickdayapproved(2)}
                                            checked={this.state.dayradio === 2 ? true : false}
                                            label='No'
                                            type='radio'
                                            id='radio2'
                                            containerClass='mr-5'
                                        />
                                    </div>

                                </MDBCol>
                            </MDBRow>



                            <MDBRow style={{ marginTop: "16px" }}>
                                <span className="materials"> Run Criteria</span>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="12">
                                    <div className="goalcardbody createedumodal">
                                        <MDBInput type="textarea" label="Please enter the hyper link" onChange={this.handleCriteriachnage} value={this.state.notecriteria}></MDBInput>
                                    </div>

                                </MDBCol>
                            </MDBRow>



                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn flat className="flatbutton" onClick={this.InpatientNotetoggle}>Cancel</MDBBtn>
                            <MDBBtn flat className="flatbutton" onClick={this.saveInpatientNote}>SAVE</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                    <MDBModal isOpen={this.state.InpatientAddendumModal} toggle={this.inpatientAddendumtoggle} className="educationalmodal">
                        <MDBModalHeader className="" toggle={this.inpatientAddendumtoggle}>Add Addendum</MDBModalHeader>
                        <MDBModalBody className="newproblemmodalbody" style={{ marginTop: "-12px", overflowY: "scroll", maxHeight: "400px" }}>
                            <MDBRow>
                                <MDBCol md="12">
                                    <div className="goalcardbody createedumodal">
                                        <MDBInput type="textarea" label="Please enter the reason" onChange={this.handleAddendumchnage} value={this.state.addendumdescription}></MDBInput>
                                    </div>

                                </MDBCol>
                            </MDBRow>
                         </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn flat className="flatbutton" onClick={this.InpatientAddendumCanceltoggle}>Cancel</MDBBtn>
                            <MDBBtn flat className="flatbutton" onClick={this.saveInpatientAddendum}>SAVE</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>

                    <MDBModal isOpen={this.state.historymodal} toggle={this.historymodaltoggle} className="historymodal">
                        <MDBModalHeader className="modaltitle" toggle={this.historymodaltoggle}>Addendum History</MDBModalHeader>
                        <MDBModalBody className="modalbody">
                            <div>
                                <MDBIcon icon="search" className="historysearchIcon" />
                                <input placeholder="Keywords" id="searching" className="historysearching" type="text" onChange={this.onHandleSearch.bind(this)} />
                            </div>
                            <MDBRow style={{ marginTop: "12px", marginLeft: "12px", overflowY: "auto", maxHeight: "350px" }}>
                                {this.state.historyDetails && this.state.historyDetails.map((item) => {
                                    return(
                                    <div className="historycontent" style={{width: "100%"}}>
                                        <p style={{ marginTop: "8px", color: "#424242", fontSize: "14px", lineHeight: "19px", fontWeight: "bolder" }}>{moment(item.modified_date).format('MM/DD/YYYY hh:mm')}</p>
                                        <p style={{ color: "#424242", fontSize: "14px", lineHeight: "19px" }}><span style={{ color: "#4CAF50", fontWeight: "600" }}>{item.modified_by_name + " , " + item.modified_by_role}</span> added </p>
                                        <p style={{ color: "#424242", fontSize: "14px", lineHeight: "19px" }}><span style={{ fontWeight: "600" }}>{item.addendum}</span> </p>
                                   
                                    </div>
                                    )
                                })}
                                

                            </MDBRow>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn flat className="flatbutton" onClick={this.historymodaltoggle}>Close</MDBBtn>

                        </MDBModalFooter>
                    </MDBModal>
                    <MDBModal isOpen={this.state.mailmodal} toggle={this.mailmodaltoggle} className="mailmodal">
                        <MDBModalHeader className="modaltitle" toggle={this.mailmodaltoggle}>Generate and Send a Letter</MDBModalHeader>
                        <MDBModalBody className="modalbody">
                           <MDBRow style={{ marginLeft: "8px", fontSize: "16px", fontWeight: "700", color: "#424242" }}>PDF</MDBRow>
                           <div style={{ marginLeft: "8px" }}>
                               <MDBDataTable
                                   small
                                   hover={true}
                                   responsive={true}
                                   paging={false}
                                   searching={false}
                                   data={this.state.inpatientnotepdfs}
                               />
                           </div>
                           
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn flat className="flatbutton" onClick={this.mailmodaltoggle}>Close</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                    



                    <style jsx>{outpatientStyles}</style>
                    <style jsx>{authviewStyles}</style>
                    <style jsx>{educationMaterialstyles}</style>
                </Layout>
            </React.Fragment>
        );
    }
};

export default Outpatient;

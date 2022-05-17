import React, { Component } from "react";
import Head from 'next/head'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Layout from '../components/layout';
import Link from 'next/link';
import Chevron from '../components/Chevron';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { MDBTypography, MDBSelect, MDBPopover, MDBTooltip, MDBContainer, MDBPopoverBody, MDBPopoverHeader, MDBProgress, MDBAvatar, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBDataTableV5, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBIcon, MDBInput, MDBDatePicker } from "mdbreact";
import Assignmentstyle from '../styles/assignments.js';
import PatientListStyle from '../styles/patientliststyles.js';
import CarePlanStyle from '../styles/careplan.js';
import Pagination from '@material-ui/lab/Pagination';
import * as data from '../data/data';
import axios from 'axios';
import moment from 'moment';
import Loader from '../components/loader';

class Assignments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            tab: "second",
            perPage: 10,
            pageFrom: 1,
            page: 1,
            tabselected: "first",
            searchCaremanager: "",
            searchStarts: false,
            selectedCaremanager: [],
            sourceCaremanagerName: "",
            manualassignmenthistory: {},
            destinationCareManagerName: "",
            CaremanagerSelected: false,
            selectedCaremanagerList: [],
            searchData: data.searchData.data,
            caremanagerusers: data.caremanagerusers.data,
            caremanagerPatients: data.caremanagerPatients.data,
            listofallcaremanagers: [],
            movedDestinationCaremanagerPatientList: [],
            autoreasssignpatients: false,
            autoreasssignconfirmationmodal: false,
            restoreconfirmationmodal: false,
            historymodal: false,
            restoremodal: false,
            reassignmodal: false,
            loggedUser: "",
            autoreassignreasonname: '',
            reasonDropdown: [
                {
                    text: "Vacation",
                    value: "vacation"
                },
                {
                    text: "Resign",
                    value: "resign"
                },
                {
                    text: "Others",
                    value: "others"
                }
            ],
            restoreDropdown: [
                {
                    text: "Got back from Vacation",
                    value: "Got back from Vacation"
                },
                {
                    text: "Others",
                    value: "others"
                }
            ],
            historyofassignments: [
                {
                    date: "2/11/2021 10:01 AM",
                    reason: "Supervisor transferred a patient BJ Armstrong from Iva Mendez to James Rodriguez"
                },
                {
                    date: "2/12/2021 03:21 PM",
                    reason: "Supervisor transferred 32 patients from Iva Mendez to James Rodriguez, David Hazard, Johhny Newman, Dora Lin, Joe Chung, Rodney Rodgers due to Vacation"
                }
            ],

            tasks: [
                { name: "Learn Angular", category: "wip", bgcolor: "yellow" },
                { name: "React", category: "wip", bgcolor: "pink" },
                { name: "Vue", category: "complete", bgcolor: "skyblue" }
            ]
        };
    }

    componentDidMount() {
        let loggedUser = localStorage.getItem('careManagerFirstname');
        this.setState({ loggedUser: loggedUser });
        axios({
            method: 'GET',
            url: `/api/listCareTeamDetails`
        })
            .then((response) => {
                this.setState({ isLoaded: false, listcareteamdetails: response.data.json.result }, () => {
                    let listofallcaremanagers = this.state.listcareteamdetails.filter(el => el.role.toLowerCase() == "care manager");
                    this.setState({ filterlistofallcaremanagers: listofallcaremanagers, listofallcaremanagers: listofallcaremanagers });
                });
            })
    }

    sortDateClick() {
        this.setState({ tab: "first" })
        // array.sort(function(a,b){
        //     return new Date(b.date) - new Date(a.date);
        //   });
    };
    sortAlphabeticalClick() {
        this.setState({ tab: "second" })
        this.state.filterlistofallcaremanagers.sort(function (a, b) {
            if (a.firstname < b.firstname) { return -1; }
            if (a.firstname > b.firstname) { return 1; }
            return 0;
        })
    };

    onHandleSearch = _e => {
        this.setState({ searchedText: _e.target.value }, () => {
            const filteredData = this.state.filterlistofallcaremanagers.filter(value => {
                const searchStr = this.state.searchedText.toLowerCase();
                const nameMatches = value.firstname.toLowerCase().includes(searchStr);
                const emailMatches = value.email_id.toLowerCase().includes(searchStr);


                return nameMatches || emailMatches
            });
            this.setState({ listofallcaremanagers: filteredData });

        })

    }

    autoreasssignpatientstoggle = () => {
        this.setState({
            autoreasssignpatients: !this.state.autoreasssignpatients
        });
    }

    autoreasssignconfirmationtoggle = () => {
        this.setState({
            autoreasssignconfirmationmodal: !this.state.autoreasssignconfirmationmodal
        });
    }

    restoreconfirmationmodaltoggle = () => {
        this.setState({
            restoreconfirmationmodal: !this.state.restoreconfirmationmodal
        });
    }


    autoreasssignpatients() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.setState({
            autoreasssignpatients: true, autoreasssignconfirmationmodal: false
        });
    }

    autoreasssignconfirmationmodal() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.setState({
            autoreasssignpatients: false, autoreasssignconfirmationmodal: true
        });
    }

    restoreModal() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.setState({
            restoremodal: true, autoreasssignconfirmationmodal: false, autoreasssignpatients: false,
        });
    }

    historyModal(Caremanager) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.setState({
            historymodal: true
        });
        axios.get(`/api/assignment`, {
            params: {
                caremanger_id: Caremanager.email_id
            }
        })
            .then((response) => {
                this.setState({
                    manualassignmenthistory: response.data.json
                });

            })
            .catch(function (response) { console.log(response); });
    }


    handleautoreassignChange(e) {
        this.setState({
            autoreassignreasonname: e.length === 0 ? 0 : e[0],
        });

    }

    handleautoreassignReason = e => {
        this.setState({ autoreassignreason: e.target.value })
    }

    restoremodaltoggle = () => {
        this.setState({
            restoremodal: !this.state.restoremodal
        });
    }

    historymodaltoggle = () => {
        this.setState({
            historymodal: !this.state.historymodal
        });
    }

    reassignmodaltoggle = () => {
        this.setState({
            reassignmodal: !this.state.reassignmodal
        });
    }
    handlearestoreChange(e) {
        this.setState({
            restorereasonname: e.length === 0 ? 0 : e[0],
        });

    }
    handlerestoreReason = e => {
        this.setState({ restorereason: e.target.value })
    }

    restoreconfirmationmodal() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.setState({
            restoreconfirmationmodal: true, restoremodal: false
        });
    }

    reassignModal(Caremanager) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        let selectedCaremanager = [];
        selectedCaremanager.push(Caremanager);
        let filterlistofallcaremanagers = this.state.filterlistofallcaremanagers;
        let destinationCaremanagers = filterlistofallcaremanagers.filter((item) => item.email_id !== Caremanager.email_id);
        this.setState({
            selectedCaremanager: selectedCaremanager,
            reassignmodal: true,
            isLoaded: true,
            sourceCaremangerId: Caremanager.email_id,
            sourceCaremanagerName: Caremanager.firstname,
            searchData: destinationCaremanagers,
            destinationCaremanagers: destinationCaremanagers
        }, () => {
            let patientIds = [];
            axios({
                method: 'GET',
                url: `/api/telemedicine`,
                params: {
                    id: this.state.sourceCaremangerId
                }
            })
                .then((response) => {
                    let patientdetailsresponse = response && response.data && response.data.json;
                    patientdetailsresponse.members.map((el) => {
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
                        url: `/api/patientslist`,
                        data: obj
                    })
                        .then(res => {
                            this.setState({ isLoaded: false, initialsourcecaremanagerpatientslist: res.data.json.hits.hits, sourcecaremanagerpatientslist: res.data.json.hits.hits });
                        })
                })
        });
    }
    onCaremanagerSearch = e => {
        this.setState({
            searchCaremanager: e.target.value
        })
        let searchData = this.state.destinationCaremanagers.filter(el => el.firstname.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 || el.lastname.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1);

        if (e.target.value === "") {
            this.setState({
                searchData: this.state.destinationCaremanagers
            })
        } else {
            this.setState({
                searchData: searchData
            })
        }
    }
    getCareTeamDetailsSearch = () => {
        this.setState({ searchStarts: true })
    }
    closeCareTeamDetails = () => {
        if (this.state.searchStarts) {
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
    selectedCaremanager = (details) => {
        let selectedCaremanagerList = [];
        selectedCaremanagerList = selectedCaremanagerList.push(details);
        this.setState({
            searchStarts: false,
            CaremanagerSelected: true,
            destinationCareManagerId: details.email_id,
            destinationCareManagerName: details.firstname,
            selectedCaremanagerList: [...this.state.selectedCaremanagerList, details],
            caremanagerPatients: data.caremanagerPatients.data
        }, () => {
            let patientIds = [];
            axios({
                method: 'GET',
                url: `/api/telemedicine`,
                params: {
                    id: this.state.destinationCareManagerId
                }
            })
                .then((response) => {
                    let patientdetailsresponse = response && response.data && response.data.json;
                    patientdetailsresponse.members.map((el) => {
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
                        url: `/api/patientslist`,
                        data: obj
                    })
                        .then(res => {
                            this.setState({ isLoaded: false, destinationcaremanagerpatientslist: res.data.json.hits.hits });
                        })
                })



        })
    }
    riskSortMethod = e => {
        this.setState({
            tabselected: "first"
        })
    }
    alphabeticalSortMethod = e => {
        this.setState({
            tabselected: "second"
        })
    }
    showAllSortMethod = e => {
        this.setState({
            tabselected: "third"
        })
    }
    closeSelectedCaremanager = () => {
        this.setState({
            selectedCaremanagerList: [],
            CaremanagerSelected: false,
            caremanagerPatients: []
        })
    }
    openAttemptContactModal = (e) => {
        this.setState({
            reassignmodal: false
        })
    }

    onDragStart = (event, id) => {
        event.dataTransfer.setData("id", id);
    }
    onDragOver = (event) => {
        event.preventDefault();
    }

    comparer(otherArray) {
        return function (current) {
            return otherArray.filter(function (other) {
                return other.value == current.value && other.display == current.display
            }).length == 0;
        }
    }


    onDrop = (event, type) => {
        let id = event.dataTransfer.getData("id");
        if (type === "LTR") {
            let destinationoldcaremanagerPatients = this.state.destinationcaremanagerpatientslist;
            let index;
            this.state.destinationcaremanagerpatientslist.map((el, ind) => {
                if (el._source.patient_id === id) {
                    index = ind;
                    this.setState({
                        sourcecaremanagerpatientslist: [...this.state.sourcecaremanagerpatientslist, el]
                    })
                }
            });
            destinationoldcaremanagerPatients.splice(index, 1);
            this.setState({
                destinationcaremanagerpatientslist: destinationoldcaremanagerPatients
            })
        } else if (type === "RTL") {
            let index;
            let sourceoldcaremanagerPatients = this.state.sourcecaremanagerpatientslist;
            let initialdestinationcaremanagerpatientslist = this.state.destinationcaremanagerpatientslist
            this.state.sourcecaremanagerpatientslist.map((el, ind) => {
                if (el._source.patient_id === id) {
                    index = ind;
                    this.setState({
                        destinationcaremanagerpatientslist: [...this.state.destinationcaremanagerpatientslist, el],
                        movedDestinationCaremanagerPatientList: [...this.state.movedDestinationCaremanagerPatientList, el]
                    });
                }

            });


            sourceoldcaremanagerPatients.splice(index, 1);
            this.setState({
                sourcecaremanagerpatientslist: sourceoldcaremanagerPatients,

            });

        }
    }

    SaveAttemptDetails = () => {
        let manualassignment = {
            patient_id_list: this.state.movedDestinationCaremanagerPatientList.map(el => el._source.patient_id),
            patient_name_list: this.state.movedDestinationCaremanagerPatientList.map(el => el._source.firstname),
        }
        axios({
            method: 'PUT',
            url: `/api/assignment`,
            data: manualassignment,
            params: {
                logged_user: this.state.loggedUser,
                source_caremanger_id: this.state.sourceCaremangerId,
                source_caremanger_name: this.state.sourceCaremanagerName,
                destination_caremanger_id: this.state.destinationCareManagerId,
                destination_caremanger_name: this.state.destinationCareManagerName
            }
        })
            .then((response) => {
                this.setState({
                    manualassignmentresponse: response.data.json
                });

            })
            .catch(function (response) { console.log(response); });
        this.setState({
            reassignmodal: false
        });
    }

    handlePageChange = (e, val) => {
        this.setState({ pageFrom: ((val * this.state.perPage) - (this.state.perPage - 1)), page: val });
    }

    paginate(array, page_size, page_number) {
        console.log(array.slice((page_number - 1) * page_size, page_number * page_size))
        return array.slice((page_number - 1) * page_size, page_number * page_size);
    }


    render() {
        let manualassignmenthistory = this.state.manualassignmenthistory.result;
        let rowslength = this.state.listofallcaremanagers.length;
        return (
            <React.Fragment>
                <Head>
                    <title>Healthlligence</title>
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
                </Head>

                <Layout isLoaded={this.state.isLoaded}>

                    <MDBTypography tag="h5" className="personalusers-info">Assignments</MDBTypography>
                    <MDBTypography tag="h6" className="basic-info"> Manage patient's assignment </MDBTypography>


                    <div className="manage-patients-list" style={{marginTop:"16px"}}>
                        <MDBCard style={{marginTop:"0px"}}>
                            <div className="titleAndSort" style={{ margin: "10px" }}>
                                <MDBTypography tag="h2" variant="h2-responsive" className="header-title"></MDBTypography>
                                <div className="controls">
                                    {/* <div className={this.state.tab == "first" ? "dataHandling active" : "dataHandling"} onClick={this.sortDateClick.bind(this)}><p >Date</p></div> */}
                                    <div className={this.state.tab == "second" ? "dataHandling active" : "dataHandling"} onClick={this.sortAlphabeticalClick.bind(this)}><p >A to Z</p></div>
                                    <div className="">
                                        <MDBIcon icon="search" className="caremanagerlistsearchIcon" />
                                        <input placeholder="Care Manager's Member ID or Name" id="searching" className="caremanagerlistsearching" type="text" onChange={this.onHandleSearch.bind(this)} />
                                    </div>
                                </div>
                            </div>
                            <MDBCard className="patients-items" style={{ margin: "-7px 12px 12px 12px", boxShadow: "none", border: "1px solid #dbdbdb" }}>
                                <MDBCardBody>
                                    

                                    { this.paginate(this.state.listofallcaremanagers, this.state.perPage, this.state.page).map((el) => {
                                            return (
                                                <MDBRow className="align-items-center patients-items-row" style={{ padding: "5px" }}>
                                                    <MDBCol sm="7" md="7" lg="7" className="align-items-center details">
                                                        <div className="circleClass">
                                                            <span className="circletext">
                                                                {el.firstname.charAt(0).toUpperCase() + el.lastname.charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <div className="name-details">
                                                            <div style={{ fontSize: "14px", color: "#424242" }}>{el.firstname + " " + el.lastname}</div>
                                                            <div style={{ fontSize: "12px", color: "#424242", fontWeight: "500", marginTop: "2px" }}>{el.email_id}</div>
                                                        </div>
                                                    </MDBCol>
                                                    <MDBCol sm="1" md="1" lg="1" className="align-items-center">
                                                    </MDBCol>
                                                    <MDBCol sm="3" md="3" lg="3" className="align-items-center text-right">

                                                        <MDBIcon icon="user-check" style={{ cursor: "pointer" }} onClick={this.reassignModal.bind(this, el)} />
                                                        <MDBIcon icon="history" style={{ marginLeft: "30px", cursor: "pointer" }} onClick={this.historyModal.bind(this, el)} />
                                                    </MDBCol>
                                                </MDBRow>

                                            )
                                        })
                                    }

                                </MDBCardBody>
                            </MDBCard>
                        </MDBCard>
                        <div className="pagination-container" style={{ marginBottom: "80px", marginLeft: "70px" }}>
                            <Pagination count={Math.ceil(rowslength / this.state.perPage)} page={this.state.page} color="primary" onChange={this.handlePageChange} />
                        </div>
                    </div>
                    <MDBModal isOpen={this.state.autoreasssignpatients} toggle={this.autoreasssignpatientstoggle} className="newproblemmodal">
                        <MDBModalHeader className="modaltitle" toggle={this.autoreasssignpatientstoggle}>Auto-Reassign Patients</MDBModalHeader>
                        <MDBModalBody className="modalbody">
                            <MDBRow>
                                <MDBCol md="12">
                                    <MDBRow>
                                        <MDBCol md="12" style={{ marginTop: "-12px" }} className="problemsdropdown">
                                            <MDBSelect
                                                options={this.state.reasonDropdown}
                                                outline
                                                selected={"Reason"}
                                                className="month-right-dropdown"
                                                getValue={(val) => this.handleautoreassignChange(val)}
                                            />
                                        </MDBCol>
                                    </MDBRow>

                                    {
                                        this.state.autoreassignreasonname == "others" ? <div className="goalcardbody">
                                            <MDBInput type="textarea" label="Please write the Reason" onChange={(e) => this.handleautoreassignReason(e)}></MDBInput>
                                        </div> : null
                                    }


                                </MDBCol>
                            </MDBRow>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn flat className="flatbutton" onClick={this.autoreasssignpatientstoggle}>Cancel</MDBBtn>
                            <MDBBtn flat className="flatbutton" onClick={this.autoreasssignconfirmationmodal.bind(this)}>save</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                    <MDBModal isOpen={this.state.autoreasssignconfirmationmodal} toggle={this.autoreasssignconfirmationtoggle} className="newproblemmodal">
                        <MDBModalHeader className="modaltitle" toggle={this.autoreasssignconfirmationtoggle}>Confirmation</MDBModalHeader>
                        <MDBModalBody className="modalbody">
                            <p className="confirmationmodalmessage">Are you sure you want to auto-reassign <span style={{ color: "#DB1962" }}>32</span>  patients from <span style={{ color: "#DB1962" }}>Iva Mendez</span> ? </p>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn flat className="flatbutton" onClick={this.autoreasssignconfirmationtoggle}>Cancel</MDBBtn>
                            <MDBBtn flat className="flatbutton" onClick={this.autoreasssignconfirmationtoggle}>Confirm</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                    <MDBModal isOpen={this.state.restoremodal} toggle={this.restoremodaltoggle} className="newproblemmodal">
                        <MDBModalHeader className="modaltitle" toggle={this.restoremodaltoggle}>Restore Patients</MDBModalHeader>
                        <MDBModalBody className="modalbody">
                            <MDBRow>
                                <MDBCol md="12">
                                    <MDBRow>
                                        <MDBCol md="12" style={{ marginTop: "-12px" }} className="problemsdropdown">
                                            <MDBSelect
                                                options={this.state.restoreDropdown}
                                                outline
                                                selected={"Reason"}
                                                className="month-right-dropdown"
                                                getValue={(val) => this.handlearestoreChange(val)}
                                            />
                                        </MDBCol>
                                    </MDBRow>

                                    {
                                        this.state.restorereasonname == "others" ? <div className="goalcardbody">
                                            <MDBInput type="textarea" label="Please write the Reason" onChange={(e) => this.handlerestoreReason(e)}></MDBInput>
                                        </div> : null
                                    }


                                </MDBCol>
                            </MDBRow>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn flat className="flatbutton" onClick={this.restoremodaltoggle}>Cancel</MDBBtn>
                            <MDBBtn flat className="flatbutton" onClick={this.restoreconfirmationmodal.bind(this)}>Save</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                    <MDBModal isOpen={this.state.restoreconfirmationmodal} toggle={this.restoreconfirmationmodaltoggle} className="newproblemmodal">
                        <MDBModalHeader className="modaltitle" toggle={this.restoreconfirmationmodaltoggle}>Confirmation</MDBModalHeader>
                        <MDBModalBody className="modalbody">
                            <p className="confirmationmodalmessage">Are you sure you want to restore all <span style={{ color: "#DB1962" }}>32</span>  patients for <span style={{ color: "#DB1962" }}>Iva Mendez</span> ? </p>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn flat className="flatbutton" onClick={this.restoreconfirmationmodaltoggle}>Cancel</MDBBtn>
                            <MDBBtn flat className="flatbutton" onClick={this.restoreconfirmationmodaltoggle}>Confirm</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                    <MDBModal isOpen={this.state.historymodal} toggle={this.historymodaltoggle} className="historymodal">
                        <MDBModalHeader className="modaltitle" toggle={this.historymodaltoggle}>History</MDBModalHeader>
                        <MDBModalBody className="modalbody">
                            <div className="" style={{ marginLeft: "-14px" }}>
                                         <div class="assignments_search_container" style={{marginTop:"10px"}}>
                                            <MDBIcon icon="search" className="assignments_search_icon" style={{ color: "#424242" }} />
                                            <input placeholder="Keywords" id="searching" className="assignments_search_bar" type="text"  onChange={this.onHandleSearch.bind(this)}></input>
                                        </div>
                                {/* <MDBIcon icon="search" className="historysearchIcon" />
                                <input placeholder="Keywords" id="searching" className="historysearching" type="text" onChange={this.onHandleSearch.bind(this)} /> */}
                            </div>
                            <MDBRow style={{ marginLeft: "-12px" }}>
                                {
                                    manualassignmenthistory && manualassignmenthistory.map((el) => {
                                        return (
                                            <div className="historycontent">
                                                <p style={{ marginTop: "32px", color: "#424242", fontSize: "14px", lineHeight: "19px", fontWeight: "bolder"}}>{moment(el.date_time).format("YYYY-MM-DD hh:mm:ss")}</p>
                                                <p style={{ color: "#424242", fontSize: "14px", lineHeight: "19px" }}>{el.modified_by} transferred <span style={{color: "#4CAF50", fontWeight: "600"}}>{el.patient_details}</span> from <span style={{color: "#536DFE", fontWeight: "600"}}>{el.source_caremanager}</span> to <span style={{color: "#DB1962", fontWeight: "600"}}>{el.destination_caremanger}</span></p>
                                             </div>

                                        )

                                    })
                                }
                            </MDBRow>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn flat className="flatbutton" onClick={this.historymodaltoggle}>Close</MDBBtn>

                        </MDBModalFooter>
                    </MDBModal>
                    <MDBModal isOpen={this.state.reassignmodal} size="lg" toggle={this.reassignmodaltoggle} className="reassignmodal">
                        {/* <MDBModalHeader className="modaltitle" toggle={this.reassignmodaltoggle}>Reassign patients</MDBModalHeader>
                        <MDBModalBody className="modalbody">
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn flat className="flatbutton" onClick={this.reassignmodaltoggle}>Cancel</MDBBtn>
                            <MDBBtn flat className="flatbutton" onClick={this.reassignmodaltoggle}>Save</MDBBtn>
                        </MDBModalFooter> */}
                        <MDBModalBody className="modalbody">
                            <MDBRow className="fullcontainer">
                                <MDBCol sm="12" md="4" lg="4" className="left-section">
                                    <div className="reassign-header">
                                        <h4>Reassign patients</h4>
                                    </div>
                                    <div className="users-left-sec">
                                        <div className="patient-s-selected">
                                            <span style={{ color: " #DB1B60" }}>0</span> patients(s) selected
                                        </div>
                                        <div>
                                            {this.state.selectedCaremanager && this.state.selectedCaremanager.map(el => {
                                                return (
                                                    <div className="user-1">
                                                        <div md="6" className="align-items-center details">
                                                            <div className="ellipse">
                                                                <span className="circletext">
                                                                    {el.firstname.charAt(0).toUpperCase() + el.lastname.charAt(0).toUpperCase()}
                                                                </span>
                                                            </div>
                                                            <div className="name-details">
                                                                <div style={{ fontSize: "12px", color: "#424242" }}>{el.firstname + " " + el.lastname}</div>
                                                            </div>
                                                        </div>
                                                        {/* <div className="align-items-center count">
                                                            <span className="total">{el.highusers + el.moderateusers + el.lowusers}</span><span className="high">{el.highusers}</span><span className="medium">{el.moderateusers}</span><span className="low">{el.lowusers}</span>
                                                        </div> */}
                                                    </div>
                                                )
                                            })
                                            }
                                        </div>
                                    </div>
                                    <div style={{marginRight: "1.5rem" }}>
                                        <div>
                                            <div className="filter-text">
                                                <div className={this.state.tabselected == "first" ? "risk active" : "risk"} onClick={this.riskSortMethod.bind(this)}>Risk</div>
                                                <div className={this.state.tabselected == "second" ? "a-t-z active" : "a-t-z"} onClick={this.alphabeticalSortMethod.bind(this)}>A to Z</div>
                                                {/* <div className={this.state.tabselected == "third" ? "select-all active" : "select-all"} onClick={this.showAllSortMethod.bind(this)}>Select All</div> */}
                                            </div>
                                            <div className="patients container-drag" onDragOver={(event) => this.onDragOver(event)} onDrop={(event) => this.onDrop(event, "LTR")}>
                                                {/* patients Start */}
                                                {this.state.sourcecaremanagerpatientslist && this.state.sourcecaremanagerpatientslist.map((el) => {
                                                    return (
                                                        <div className="users" draggable='true' onDragStart={(e) => this.onDragStart(e, el._source.patient_id)}>
                                                            <div className="details">
                                                                <div className="ellipse">
                                                                    <span className="circletext">
                                                                        {el._source.firstname.charAt(0).toUpperCase() + el._source.lastname.charAt(0).toUpperCase()}
                                                                    </span>
                                                                </div>
                                                                <div className="name-details">
                                                                    <div style={{ fontSize: "12px", color: "#424242" }}>{el._source.firstname}</div>
                                                                    <div style={{ fontSize: "10px", color: "#424242" }}>{el._source.primaryphone}</div>
                                                                </div>
                                                            </div>
                                                            <div className="icons-class">
                                                                <Tooltip title={moment(el._source.dateofbirth).format("MM/DD/YYYY") + " , " + el._source.gender + " , " + " PCP : " + el._source.pcpname + " , " + " PLAN : " + el._source.plan + " , " + " M :  " + el._source.pcpphone} arrow placement="top">
                                                                    <Button><MDBIcon icon="exclamation-circle" /></Button>
                                                                </Tooltip>
                                                                {/* <Chevron
                                                                    style={{ marginRight: "5px", cursor: "pointer" }}
                                                                    fill={"primary"}
                                                                    width={20}
                                                                    withTooltip
                                                                    tooltipPosition="top"
                                                                    tooltipText={"Sample tip"}
                                                                    /> */}
                                                            </div>



                                                        </div>



                                                    )
                                                })
                                                }
                                                {/* patients End */}
                                            </div>


                                            {/* <div className="container-drag">
                                                <div className="wip"
                                                    onDragOver={(e) => this.onDragOver(e)}
                                                    onDrop={(e) => { this.onDrop(e, "wip") }}>
                                                    <span className="task-header">WIP</span>
                                                    {tasks.wip}
                                                </div>
                                                
                                            </div> */}




                                        </div>
                                    </div>
                                </MDBCol>
                                <MDBCol sm="12" md="8" lg="8" className="right-section" onClick={this.closeCareTeamDetails} id="edit-careteam">
                                    <div className="care-header">
                                        <h4>Care Managers</h4>
                                    </div>
                                    <div className="caremanager-search">
                                        <MDBIcon icon="search" className="searchIcon1" />
                                        <input placeholder="Member ID or Name" id="searching1" className="searching1" type="text" value={this.state.searchCaremanager} onChange={this.onCaremanagerSearch} onFocus={this.getCareTeamDetailsSearch} />
                                    </div>
                                    <div className={this.state.searchStarts ? 'contact-list' : 'contact-list hide'}>
                                        {
                                            this.state.searchData && this.state.searchData.map((el) => {
                                                return (
                                                    <MDBRow className="justify-content-start patients-items-row" style={{ padding: "5px" }} onClick={this.selectedCaremanager.bind(this, el)}>
                                                        <MDBCol sm="6" md="6" lg="6" className="align-items-center details">
                                                            <div className="circleClass">
                                                                <span className="circletext">
                                                                    {el.firstname.charAt(0).toUpperCase() + el.lastname.charAt(0).toUpperCase()}
                                                                </span>
                                                            </div>
                                                            <div className="name-details">
                                                                <div style={{ fontSize: "14px", color: "#424242" }}>{el.firstname + " " + el.lastname}</div>
                                                                <div style={{ fontSize: "12px", color: "#424242", fontWeight: "500" }}>{el.email_id}</div>
                                                            </div>
                                                        </MDBCol>
                                                        <MDBCol sm="2" md="2" lg="2">

                                                        </MDBCol>
                                                        <MDBCol sm="3" md="3" lg="3" className="count-details" style={{ marginTop: "5px" }}>
                                                            {/* <div className="count">
                                                                    <span className="total">{el.highusers + el.moderateusers + el.lowusers}</span><span className="high">{el.highusers}</span><span className="medium">{el.moderateusers}</span><span className="low">{el.lowusers}</span>
                                                                </div> */}
                                                        </MDBCol>
                                                    </MDBRow>

                                                )
                                            })
                                        }
                                    </div>
                                    <div className={this.state.CaremanagerSelected ? "selected-list" : "selected-list hide"}>
                                        {
                                            this.state.selectedCaremanagerList && this.state.selectedCaremanagerList.map((el) => {
                                                return (
                                                    <MDBRow className="align-items-center patients-items-row" style={{ padding: "5px" }}>
                                                        <MDBCol sm="6" md="6" lg="6" className="align-items-center details">
                                                            <div className="circleClass">
                                                                <span className="circletext">
                                                                    {el.firstname.charAt(0).toUpperCase() + el.lastname.charAt(0).toUpperCase()}
                                                                </span>
                                                            </div>
                                                            <div className="name-details">
                                                                <div style={{ fontSize: "14px", color: "#424242" }}>{el.firstname + " " + el.lastname}</div>
                                                                <div style={{ fontSize: "12px", color: "#424242", fontWeight: "500" }}>{el.email_id}</div>
                                                            </div>
                                                        </MDBCol>
                                                        <MDBCol sm="2" md="2" lg="2" className="align-items-center">
                                                            {/* <div className="count">
                                                                    <span className="total">{el.highusers + el.moderateusers + el.lowusers}</span><span className="high">{el.highusers}</span><span className="medium">{el.moderateusers}</span><span className="low">{el.lowusers}</span>
                                                                </div> */}
                                                        </MDBCol>
                                                        <MDBCol sm="2" md="2" lg="2" className="align-items-center text-right closeIcon">
                                                            <img src="/images/close.svg" alt="closeIcon" style={{ cursor: "pointer" }} onClick={this.closeSelectedCaremanager}></img>
                                                        </MDBCol>
                                                    </MDBRow>

                                                )
                                            })
                                        }
                                    </div>
                                    {this.state.CaremanagerSelected ?
                                        <div className="selected-careteam-patients">
                                            <div>
                                                <div className="filter-text">
                                                    <div className={this.state.tabselected == "first" ? "risk active" : "risk"} onClick={this.riskSortMethod.bind(this)}>Risk</div>
                                                    <div className={this.state.tabselected == "second" ? "a-t-z active" : "a-t-z"} onClick={this.alphabeticalSortMethod.bind(this)}>A to Z</div>
                                                    {/* <div className={this.state.tabselected == "third" ? "select-all active" : "select-all"} onClick={this.showAllSortMethod.bind(this)}>Select All</div> */}
                                                </div>
                                                <div className="patients droppable" onDragOver={(event) => this.onDragOver(event)} onDrop={(event) => this.onDrop(event, "RTL")}>
                                                    {/* patients Start */}
                                                    {this.state.destinationcaremanagerpatientslist && this.state.destinationcaremanagerpatientslist.map((el) => {
                                                        return (
                                                            <div className="users" draggable='true' onDragStart={(e) => this.onDragStart(e, el._source.patient_id)}>
                                                                <div className="details">
                                                                    <div className="ellipse">
                                                                        <span className="circletext">
                                                                            {el._source.firstname.charAt(0).toUpperCase() + el._source.lastname.charAt(0).toUpperCase()}
                                                                        </span>
                                                                    </div>
                                                                    <div className="name-details">
                                                                        <div style={{ fontSize: "12px", color: "#424242" }}>{el._source.firstname}</div>
                                                                        <div style={{ fontSize: "10px", color: "#424242" }}>{el._source.primaryphone}</div>
                                                                    </div>
                                                                </div>
                                                                <div className="icons-class">
                                                                    <Tooltip title={el._source.firstname + " " + el._source.lastname} arrow placement="top">
                                                                        <Button><MDBIcon icon="exclamation-circle" /></Button>
                                                                    </Tooltip>
                                                                    {/* <Chevron
                                                                        style={{ marginRight: "5px", cursor: "pointer" }}
                                                                        fill={"primary"}
                                                                        width={20}
                                                                        withTooltip
                                                                        tooltipPosition="top"
                                                                        tooltipText={"Sample tip"}
                                                                        /> */}
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                    }
                                                    {/* patients End */}
                                                </div>
                                            </div>
                                        </div>
                                        : ""}

                                    {/* <div className="droppable"
                                        onDragOver={(e) => this.onDragOver(e)}
                                        onDrop={(e) => this.onDrop(e, "complete")}>
                                        <span className="task-header">COMPLETED</span>
                                        {tasks.firstname}
                                    </div> */}



                                    <div className="text-right1" style={{ marginTop: "15px" }}>
                                        <MDBBtn flat className="flatbutton" onClick={this.openAttemptContactModal}>CANCEL</MDBBtn>
                                        <MDBBtn flat className="flatbutton" onClick={this.SaveAttemptDetails}>SAVE</MDBBtn>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                        </MDBModalBody>
                    </MDBModal>

                    {this.state.isLoaded && <Loader />}
                    <style jsx>{Assignmentstyle}</style>
                    {/* <style jsx>{CarePlanStyle}</style> */}
                    <style jsx>{PatientListStyle}</style>

                </Layout>
            </React.Fragment>
        );
    }

}

export default Assignments;
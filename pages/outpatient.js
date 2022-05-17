
import React, { Component } from "react";
import {
    MDBRow, MDBCol, MDBTypography, MDBSelect, MDBCard, MDBCardBody, MDBDataTable, MDBCollapseHeader, MDBIcon, MDBDatePicker, MDBTimeline, MDBTimelineStep, MDBInput, MDBCollapse, MDBBtn, MDBModal,
    MDBDataTableV5, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBChipsInput, MDBSelectInput, MDBSelectOptions, MDBSelectOption, MDBCardTitle
} from "mdbreact";
import moment from 'moment';
import outpatientStyles from '../styles/outpatient';
import PatientListStyle from '../styles/patientliststyles.js';
import ReactHighcharts from 'react-highcharts';
import Head from 'next/head';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';
import Loader from '../components/loader';
import Layout from "../components/layout";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import * as Data from '../data/data';
import 'mdbreact/dist/css/mdb.css';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
} from 'mdb-react-ui-kit';

class Outpatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            basicActive: 'tab1',
            subMenuActive: 'ALL',
            pageFrom: 0,
            errorShown: false,
            perPage: 10,
            page: 1,
            totalCountofpatients: 1,
            myAssignmentToggle: true,
            assignedQueName: "",
            oralNotificationHeader: "",
            rowClicked: "",
            assignementsindex: "",
            isLoaded: false,
            collapseID: "",
            serviceTypes: [],
            finalRowsData: [],
            selctedServiceType: "",
            serviceCategories: [],
            placeofServiceCategories: [],
            patientIds: [],
            patientslist: [],
            authAllHistory: [],
            openAuthHistory: [],
            approvedAuthHistory: [],
            rejectedAuthHistory: [],
            canceledAuthHistoty: [],
            authscreencreatedby: [],
            authscreenmodifiedby: [],
            resArr: [],
            searchauthstatus: [{
                text: "OPEN",
                value: "0"
            },
            {
                text: "APPROVED",
                value: "1"
            },
            {
                text: "REJECTED",
                value: "2"
            },
            {
                text: "CANCEL",
                value: "3"
            }],
            authDropdownValues: [
                {
                    text: "DAILY",
                    value: "0"
                },
                {
                    text: "WEEKLY",
                    value: "1"
                },
                {
                    text: "MONTHLY",
                    value: "2"
                },
                {
                    text: "YEARLY",
                    value: "3"
                }
            ],
            selctedAuthdropdownValue: "MONTHLY",
            selectedsearchauthstatus: "",
            authscreenassigned: [{
                text: "Assigned to me",
                value: "4"
            }],
            selectedprioritytype: "",
            selctedServiceCategory: "",
            serviceRequestDate: "",
            fromDate: "",
            toDate: "",
            requestReceivedDate: "",
            placeofService: "",
            authorizationToggle: true,
            patientDetailsToggle: false,
            requestingproviderdetails: false,
            refferedproviderdetails: false,
            requestingProviderId: "",
            requestingProviderDetailsName: "",
            requestingProviderDetailsSpeciality: "",
            requestingProviderDetailsGroup: "",
            requestingProviderCell: "",
            requestingProviderFax: "",
            referredProviderId: "",
            referredProviderDetailsName: "",
            referredProviderDetailsSpeciality: "",
            referredProviderDetailsGroup: "",
            referredProviderCell: "",
            referredProviderFax: "",
            providerdetailsdescription:"",
            userDataRows: [],
            patientDetails: [],
            oldPatientDetails: [],
            serachTableData: [],
            urgentUnassignedMedicare: "",
            routineUnassignedMedicare: "",
            retroAppealAuthList: "",
            urgentMedicalUnassigned: "",
            routineMedicalUnassigned: "",
            urgentMediclaimRowObj: "",
            diagnosisArray: [],
            servicerequestDetailsList: [],
            oldservicerequestDetailsList: [],
            adddiagnosisDetailsList: [],
            oldadddiagnosisDetailsList: [],
            selectedPatientData: [],
            filteredTables: [],
            searchStarts: false,
            showWarningModal: false,
            requestprovidersearchStarts: false,
            refferedprovidersearchStarts: false,
            searchedText: "",
            searchedProviderDetailsText: '',
            showServiceTypeMessage: false,
            showServiceCategoryErrorMessage: false,
            showServiceRequestErrorMessage: false,
            servicerequestdetails: false,
            showValidPlaceErrorMessage: false,
            showFromDateErrorMessage: false,
            showToDateErrorMessage: false,
            showRecivedDateErrorMessage: false,
            authorizationauthToggle: false,
            memberauthtoggle: false,
            requesteddoctortoggle: false,
            trackingdetailstoggle: false,
            authrequestreceivedate: "",
            authrequestreceivedate1: "",
            authauthorizationdate: "",
            authfinaldecisiondate: "",
            servicerequestProviderData:[],
            authmemberid: "",
            authfirstname: "",
            authlastname: "",
            authdelegate: "",
            authssn: "",
            authlob: "",
            authdateofbirth: "",
            authrequestingdoctorid: "",
            authrequestingorganizationid: "",
            selectedrequestingspeciality: "",
            selectedreferringspeciality: "",
            authrequesteddoctorid: "",
            authrequestedorganizationid: "",
            selectedauthscreenassigned: "",
            selectedcreatedby: "",
            authdateofmodification: "",
            selectedmodifiedby: "",
            authscreenproblemcategory: "",
            authscreenfacility: "",
            searchresults: false,
            showConfirmonModal: false,
            quantity: "",
            modifier: "",
            finacialResponsibility: "",
            patientsdata: {
                columns: [{
                    label: 'Requested Date',
                    field: 'requesteddate',
                },
                {
                    label: 'Patients Name',
                    field: 'patientname',
                },
                {
                    label: 'Auth No.',
                    field: 'authno',
                },
                {
                    label: 'Place of Service',
                    field: 'placeofservice',
                },
                {
                    label: 'Valid From',
                    field: 'validfrom',
                },
                {
                    label: 'Valid To',
                    field: 'validto',
                },
                {
                    label: 'Assignment History',
                    field: 'assignmenthistory',
                },
                {
                    label: 'Oral Notification',
                    field: 'oralnotification',
                },
                {
                    label: 'Status',
                    field: 'status',
                }],
                rows: []
            },
            covered: "",
            usersdata: {
                columns: [
                    {
                        label: 'No',
                        field: 'no',


                    },
                    {
                        label: 'Diagnosis Code',
                        field: 'diagnosiscode',


                    },
                    {
                        label: 'Diagnosis Code Description',
                        field: 'diagnosiscodedescription',


                    },
                    {
                        label: 'Action',
                        field: 'action',


                    }],
                rows: [

                ]
            },
        }
    }

    handleactivateClick(data, header, index, ind, name) {
        // this.setState({
        //     type: el.type,
        // }, () => {
        this.setState({
            activateclick: true,
            serachTableData: data,
            oralNotificationHeader: header,
            assignementsindex: ind,
            rowClicked: index,
            assignedQueName: name
        });
        setTimeout(() => {
            var element = document.getElementById("box");
            element.scrollIntoView({ behavior: "smooth" });
        }, 0)
    }

    componentDidMount() {
        let routineMedicareMyAssignmentArray = []; let routineMedicalAndCommercialMyAssignmentArray = [];
        // Routine Medicare Auth Variables
        let caremnagerId = localStorage.getItem('caremanagerId');
        // My Assignment Tables
        axios({
            method: 'GET',
            url: `/api/getAuthByServiceType`,
            params: {
                patient_type: "OUTPATIENT",
                service_type: "Expedited/Urgent",
                assigned_to: caremnagerId
            }
        })
            .then(res => {
                axios({
                    method: 'GET',
                    url: `/api/getAuthByServiceType`,
                    params: {
                        patient_type: "OUTPATIENT",
                        service_type: "Standard/Routine",
                        assigned_to: caremnagerId
                    }
                })
                .then((response)=> {
                    let finalresponse = res.data.json.result.concat(response.data.json.result)
                    this.myAssignmentData(finalresponse, caremnagerId);
                    finalresponse.map((item) => {
                        if (item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare") {
                            routineMedicareMyAssignmentArray.push(item);
                        };
                        if (item.service_type.service_type === "Standard/Routine" && (item.p_lob === "Medical" || item.p_lob === "Commercial")) {
                            routineMedicalAndCommercialMyAssignmentArray.push(item);
                        }
                    })
                    this.setState({
                        routineMedicareMyAssignmentArray: routineMedicareMyAssignmentArray,
                        routineMedicalAndCommercialMyAssignmentArray: routineMedicalAndCommercialMyAssignmentArray
                    })

                })
            })
        // End of // My Assignment Tables
        // Unassigned Tables
        axios({
            method: 'GET',
            url: `/api/getAuthListByAssignedTo`,
            params: {
                patient_type: "OUTPATIENT",
                assigned_to: "UNASSIGNED"
            }
        })
            .then(res => {
                // console.log(res.data.json.result,"res.data.json.result")
                res.data && res.data.json && res.data.json.result && this.unassignedData(res.data.json.result)
            })
        //End of Unassigned Tables
        // Asiigned Tables data
        let assignedData = []; let obj = { "gmail": "", "details": [], "firstname": "", "lastname": "", "role": "", "color":"" }
        axios({
            method: 'GET',
            url: `/api/getAssignedAuthList`,
            params: {
                patient_type: "OUTPATIENT",
                assigned_to: caremnagerId
            }
        })
            .then(res => {
                for (let key in res.data.json) {
                    if (res.data.json.hasOwnProperty(key)) {
                        let role = "";
                        if(res.data.json[key].role ==="Coordinator"){
                            role= "#00897b";
                        }else if(res.data.json[key].role ==="Nurse"){
                            role = "#ff7367";
                        }else if(res.data.json[key].role ==="MD"){
                            role= "#536dfe";
                        }else if(res.data.json[key].role ==="Supervisor"){
                            role = "#9e9e9e";
                        }else if(res.data.json[key].role ==="Care manager"){
                            role = "#db1962";
                        }else if(res.data.json[key].role ==="Caregiver"){
                            role = "#7cb342";
                        }else if(res.data.json[key].role ==="Physician"){
                            role = "#0288d1";
                        }
                        obj = { "gmail": key, "details": res.data.json[key], "firstname": res.data.json[key].first_name, "lastname": res.data.json[key].last_name, "role": res.data.json[key].role, "color":role }
                        assignedData.push(obj);
                        //    console.log(key, res.data.json[key]);
                    }
                }
                assignedData.map((item) => {
                    this.assignedData(item.details.data, item.gmail, item.firstname, item.lastname, item.role, item.color);
                })
                // console.log(assignedData,"assignedData")
            });
        // End of Assigned tables data
        // Oral Notification Table             
        axios({
            method: 'GET',
            url: `/api/getOralNotificationAuthData`,
            params: {
                patient_type: "OUTPATIENT",
                assigned_to: caremnagerId
            }
        })
            .then(res => {
                // console.log(res.data.json.result,"2")
                res.data && res.data.json && res.data.json.result && this.oralNotificationsData(res.data.json.result);
            })
        this.setState({
            isLoaded: true
        })
    }
    calculateDayCount = (reqDate) => {
        var reqDateFormat = new Date(moment(reqDate.service_requested_date).format('MM/DD/YYYY'));
        var a = moment(new Date(), 'MM/DD/YYYY');
        var b = moment(reqDateFormat, 'MM/DD/YYYY');
        var diffDays = a.diff(b, 'days');
        return diffDays;
    }
    myAssignmentData = (response, caremnagerId) => {
        // console.log(response,"res")
        let urgentMedicareRowObj = {
            "oneDay": [], "twoDay": [], "thirdDay": []
        };
        let urgentMediclaimRowObj = {
            "oneDay": [], "twoDay": [], "thirdDay": []
        };
        let urgentCommercialRowObj = {
            "oneDay": [], "twoDay": [], "thirdDay": []
        };
        let routineMedicareMyAssignment = {
            "oneDay": [], "twoDay": [], "thirdDay": [], "fourthDay": [], "fifthDay": [], "sixtDay": [], "seventhDay": [], "eightDay": [], "ninthDay": [], "tenthDay": [], "elevenDay": [],
            "twelveDay": [], "thirtheenDay": [], "fourtheenDay": []
        };
        let routineMediclaimMyAssignment = {
            "oneDay": [], "twoDay": [], "thirdDay": [], "fourthDay": [], "fifthDay": [],
        };
        response.map((item) => {
            if (this.calculateDayCount(item) === 0 || this.calculateDayCount(item) === 1) {
                item.service_type.service_type === "Expedited/Urgent" && item.p_lob === "Medicare" ? urgentMedicareRowObj.oneDay.push(item) : "";
                item.service_type.service_type === "Expedited/Urgent" && item.p_lob === "Medical" ? urgentMediclaimRowObj.oneDay.push(item) : "";
                item.service_type.service_type === "Expedited/Urgent" && item.p_lob === "Commercial" ? urgentCommercialRowObj.oneDay.push(item) : "";
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? routineMedicareMyAssignment.oneDay.push(item) : "";
                item.service_type.service_type === "Standard/Routine" && (item.p_lob === "Medical" || item.p_lob === "Commercial") ? routineMediclaimMyAssignment.oneDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 2) {
                item.service_type.service_type === "Expedited/Urgent" && item.p_lob === "Medicare" ? urgentMedicareRowObj.twoDay.push(item) : "";
                item.service_type.service_type === "Expedited/Urgent" && item.p_lob === "Medical" ? urgentMediclaimRowObj.twoDay.push(item) : "";
                item.service_type.service_type === "Expedited/Urgent" && item.p_lob === "Commercial" ? urgentCommercialRowObj.twoDay.push(item) : "";
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? routineMedicareMyAssignment.twoDay.push(item) : "";
                item.service_type.service_type === "Standard/Routine" && (item.p_lob === "Medical" || item.p_lob === "Commercial") ? routineMediclaimMyAssignment.twoDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 3) {
                item.service_type.service_type === "Expedited/Urgent" && item.p_lob === "Medicare" ? urgentMedicareRowObj.thirdDay.push(item) : "";
                item.service_type.service_type === "Expedited/Urgent" && item.p_lob === "Medical" ? urgentMediclaimRowObj.thirdDay.push(item) : "";
                item.service_type.service_type === "Expedited/Urgent" && item.p_lob === "Commercial" ? urgentCommercialRowObj.thirdDay.push(item) : "";
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? routineMedicareMyAssignment.thirdDay.push(item) : "";
                item.service_type.service_type === "Standard/Routine" && (item.p_lob === "Medical" || item.p_lob === "Commercial") ? routineMediclaimMyAssignment.fourthDay.push(item) : "";
            }
            if (this.calculateDayCount(item) > 3) {
                item.service_type.service_type === "Expedited/Urgent" && item.p_lob === "Medicare" ? urgentMedicareRowObj.thirdDay.push(item) : "";
                item.service_type.service_type === "Expedited/Urgent" && item.p_lob === "Medical" ? urgentMediclaimRowObj.thirdDay.push(item) : "";
                item.service_type.service_type === "Expedited/Urgent" && item.p_lob === "Commercial" ? urgentCommercialRowObj.thirdDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 4) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? routineMedicareMyAssignment.fourthDay.push(item) : "";
                item.service_type.service_type === "Standard/Routine" && (item.p_lob === "Medical" || item.p_lob === "Commercial") ? routineMediclaimMyAssignment.fourthDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 5) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? routineMedicareMyAssignment.fifthDay.push(item) : "";
                item.service_type.service_type === "Standard/Routine" && (item.p_lob === "Medical" || item.p_lob === "Commercial") ? routineMediclaimMyAssignment.fifthDay.push(item) : "";
            }
            if (this.calculateDayCount(item) > 5) {
                item.service_type.service_type === "Standard/Routine" && (item.p_lob === "Medical" || item.p_lob === "Commercial") ? routineMediclaimMyAssignment.fifthDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 6) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? routineMedicareMyAssignment.sixtDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 7) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? routineMedicareMyAssignment.seventhDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 8) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? routineMedicareMyAssignment.eightDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 9) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? routineMedicareMyAssignment.ninthDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 10) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? routineMedicareMyAssignment.tenthDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 11) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? routineMedicareMyAssignment.elevenDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 12) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? routineMedicareMyAssignment.twelveDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 13) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? routineMedicareMyAssignment.thirtheenDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 14 || this.calculateDayCount(item) > 14) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? routineMedicareMyAssignment.fourtheenDay.push(item) : "";
            }
        });
        this.setState({
            urgentMedicareRowObj: urgentMedicareRowObj,
            urgentMediclaimRowObj: urgentMediclaimRowObj,
            urgentCommercialRowObj: urgentCommercialRowObj,
            routineMedicareMyAssignment: routineMedicareMyAssignment,
            routineMediclaimMyAssignment: routineMediclaimMyAssignment
        })
    }
    oralNotificationsData = (response) => {
        let oralNotificationsObj = {
            "oneDay": [], "twoDay": [], "thirdDay": []
        };
        response.map((item) => {
            // console.log(this.calculateDayCount(item),"diff")
            if (this.calculateDayCount(item) === 0 || this.calculateDayCount(item) === 1) {
                item.service_type.service_type === "Expedited/Urgent" && item.p_lob === "Medicare" ? oralNotificationsObj.oneDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 2) {
                item.service_type.service_type === "Expedited/Urgent" && item.p_lob === "Medicare" ? oralNotificationsObj.twoDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 3 || this.calculateDayCount(item) > 3) {
                item.service_type.service_type === "Expedited/Urgent" && item.p_lob === "Medicare" ? oralNotificationsObj.thirdDay.push(item) : "";
            }
        });
        this.setState({
            oralNotificationsObj: oralNotificationsObj
        })
    }
    assignedData = (response, gmail, firstname, lastname, role, color) => {
        let resArr = [];
        let resObj = {
            "urgentMedicareObj": {}, "medicalRoutinesObj": {}, "medicareRoutinesObj": {}, "gmail": "", "fname": "", "lname": "", "role": "", "color":""
        };
        let urgentMedicareObj = {
            "oneDay": [], "twoDay": [], "thirdDay": [],
        };
        let medicalRoutinesObj = {
            "oneDay": [], "twoDay": [], "thirdDay": [], "fourthDay": [], "fifthDay": [],
        };
        let medicareRoutinesObj = {
            "oneDay": [], "twoDay": [], "thirdDay": [], "fourthDay": [], "fifthDay": [], "sixtDay": [], "seventhDay": [], "eightDay": [], "ninthDay": [], "tenthDay": [], "elevenDay": [],
            "twelveDay": [], "thirtheenDay": [], "fourtheenDay": []
        };
        response.map((item) => {
            if (this.calculateDayCount(item) === 0 || this.calculateDayCount(item) === 1) {
                item.service_type.service_type === "Expedited/Urgent" && item.p_lob === "Medicare" ? urgentMedicareObj.oneDay.push(item) : "";
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medical" ? medicalRoutinesObj.oneDay.push(item) : "";
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? medicareRoutinesObj.oneDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 2) {
                item.service_type.service_type === "Expedited/Urgent" && item.p_lob === "Medicare" ? urgentMedicareObj.twoDay.push(item) : "";
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medical" ? medicalRoutinesObj.twoDay.push(item) : "";
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? medicareRoutinesObj.twoDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 3) {
                item.service_type.service_type === "Expedited/Urgent" && item.p_lob === "Medicare" ? urgentMedicareObj.thirdDay.push(item) : "";
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medical" ? medicalRoutinesObj.thirdDay.push(item) : "";
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? medicareRoutinesObj.thirdDay.push(item) : "";
            }
            if (this.calculateDayCount(item) > 3) {
                item.service_type.service_type === "Expedited/Urgent" && item.p_lob === "Medicare" ? urgentMedicareObj.thirdDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 4) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medical" ? medicalRoutinesObj.fourthDay.push(item) : "";
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? medicareRoutinesObj.fourthDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 5) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medical" ? medicalRoutinesObj.fifthDay.push(item) : "";
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? medicareRoutinesObj.fifthDay.push(item) : "";
            }
            if (this.calculateDayCount(item) > 5) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medical" ? medicalRoutinesObj.fifthDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 6) {
                item.service_type.service_type === "Standard/Routine" && (item.p_lob === "Medicare" || item.p_lob === "Commercial") ? medicareRoutinesObj.sixtDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 7) {
                item.service_type.service_type === "Standard/Routine" && (item.p_lob === "Medicare" || item.p_lob === "Commercial") ? medicareRoutinesObj.seventhDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 8) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? medicareRoutinesObj.eightDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 9) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? medicareRoutinesObj.ninthDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 10) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? medicareRoutinesObj.tenthDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 11) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? medicareRoutinesObj.elevenDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 12) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? medicareRoutinesObj.twelveDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 13) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? medicareRoutinesObj.thirtheenDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 14 || this.calculateDayCount(item) > 14) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? medicareRoutinesObj.fourtheenDay.push(item) : "";
            }
            resObj = {
                "urgentMedicareObj": urgentMedicareObj, "medicalRoutinesObj": medicalRoutinesObj, "medicareRoutinesObj": medicareRoutinesObj, "gmail": gmail, "fname": firstname, "lname": lastname, "role": role, color: color
            };
        })
        resArr.push(resObj);
        this.setState({
            resArr: [...this.state.resArr, resObj]
        })
    };
    unassignedData = (response) => {
        //Standard/Routine, Retro, Appeal, Expedited/Urgent
        let urgentMedicareObj = {
            "oneDay": [], "twoDay": [], "thirdDay": []
        };
        let urgentMediclaimObj = {
            "oneDay": [], "twoDay": [], "thirdDay": []
        };
        let routineMediclaimObj = {
            "oneDay": [], "twoDay": [], "thirdDay": [], "fourthDay": [], "fifthDay": [],
        };
        let retroAppealAuthObj = {
            "oneDay": [], "twoDay": [], "thirdDay": [], "fourthDay": [], "fifthDay": [], "sixtDay": [], "seventhDay": [], "eightDay": [], "ninthDay": [], "tenthDay": [], "elevenDay": [],
            "twelveDay": [], "thirtheenDay": [], "fourtheenDay": []
        };
        let routineMedicareObj = {
            "oneDay": [], "twoDay": [], "thirdDay": [], "fourthDay": [], "fifthDay": [], "sixtDay": [], "seventhDay": [], "eightDay": [], "ninthDay": [], "tenthDay": [], "elevenDay": [],
            "twelveDay": [], "thirtheenDay": [], "fourtheenDay": []
        };
        response.map((item) => {
            if (this.calculateDayCount(item) === 0 || this.calculateDayCount(item) === 1) {
                item.service_type.service_type === "Expedited/Urgent" && item.p_lob === "Medicare" ? urgentMedicareObj.oneDay.push(item) : "";
                item.service_type.service_type === "Expedited/Urgent" && (item.p_lob === "Medical" || item.p_lob === "Commercial") ? urgentMediclaimObj.oneDay.push(item) : "";
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? routineMedicareObj.oneDay.push(item) : "";
                item.service_type.service_type === "Standard/Routine" && (item.p_lob === "Medical" || item.p_lob === "Commercial") ? routineMediclaimObj.oneDay.push(item) : "";
                item.service_type.service_type === "Retro" || item.service_type.service_type === "Appeal" ? retroAppealAuthObj.oneDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 2) {
                item.service_type.service_type === "Expedited/Urgent" && item.p_lob === "Medicare" ? urgentMedicareObj.twoDay.push(item) : "";
                item.service_type.service_type === "Expedited/Urgent" && (item.p_lob === "Medical" || item.p_lob === "Commercial") ? urgentMediclaimObj.twoDay.push(item) : "";
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? routineMedicareObj.twoDay.push(item) : "";
                item.service_type.service_type === "Standard/Routine" && (item.p_lob === "Medical" || item.p_lob === "Commercial") ? routineMediclaimObj.twoDay.push(item) : "";
                item.service_type.service_type === "Retro" || item.service_type.service_type === "Appeal" ? retroAppealAuthObj.twoDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 3) {
                item.service_type.service_type === "Expedited/Urgent" && item.p_lob === "Medicare" ? urgentMedicareObj.thirdDay.push(item) : "";
                item.service_type.service_type === "Expedited/Urgent" && (item.p_lob === "Medical" || item.p_lob === "Commercial") ? urgentMediclaimObj.thirdDay.push(item) : "";
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? routineMedicareObj.thirdDay.push(item) : "";
                item.service_type.service_type === "Standard/Routine" && (item.p_lob === "Medical" || item.p_lob === "Commercial") ? routineMediclaimObj.thirdDay.push(item) : "";
                item.service_type.service_type === "Retro" || item.service_type.service_type === "Appeal" ? retroAppealAuthObj.thirdDay.push(item) : "";
            }
            if (this.calculateDayCount(item) > 3) {
                item.service_type.service_type === "Expedited/Urgent" && item.p_lob === "Medicare" ? urgentMedicareObj.thirdDay.push(item) : "";
                item.service_type.service_type === "Expedited/Urgent" && (item.p_lob === "Medical" || item.p_lob === "Commercial") ? urgentMediclaimObj.thirdDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 4) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? routineMedicareObj.fourthDay.push(item) : "";
                item.service_type.service_type === "Standard/Routine" && (item.p_lob === "Medical" || item.p_lob === "Commercial") ? routineMediclaimObj.fourthDay.push(item) : "";
                item.service_type.service_type === "Retro" || item.service_type.service_type === "Appeal" ? retroAppealAuthObj.fourthDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 5) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? routineMedicareObj.fifthDay.push(item) : "";
                item.service_type.service_type === "Standard/Routine" && (item.p_lob === "Medical" || item.p_lob === "Commercial") ? routineMediclaimObj.fifthDay.push(item) : "";
                item.service_type.service_type === "Retro" || item.service_type.service_type === "Appeal" ? retroAppealAuthObj.fifthDay.push(item) : "";
            }
            if (this.calculateDayCount(item) > 5) {
                item.service_type.service_type === "Standard/Routine" && (item.p_lob === "Medical" || item.p_lob === "Commercial") ? routineMediclaimObj.fifthDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 6) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? routineMedicareObj.sixtDay.push(item) : "";
                item.service_type.service_type === "Retro" || item.service_type.service_type === "Appeal" ? retroAppealAuthObj.sixtDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 7) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? routineMedicareObj.seventhDay.push(item) : "";
                item.service_type.service_type === "Retro" || item.service_type.service_type === "Appeal" ? retroAppealAuthObj.seventhDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 8) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? routineMedicareObj.eightDay.push(item) : "";
                item.service_type.service_type === "Retro" || item.service_type.service_type === "Appeal" ? retroAppealAuthObj.eightDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 9) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? routineMedicareObj.ninthDay.push(item) : "";
                item.service_type.service_type === "Retro" || item.service_type.service_type === "Appeal" ? retroAppealAuthObj.ninthDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 10) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? routineMedicareObj.tenthDay.push(item) : "";
                item.service_type.service_type === "Retro" || item.service_type.service_type === "Appeal" ? retroAppealAuthObj.tenthDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 11) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? routineMedicareObj.elevenDay.push(item) : "";
                item.service_type.service_type === "Retro" || item.service_type.service_type === "Appeal" ? retroAppealAuthObj.elevenDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 12) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? routineMedicareObj.twelveDay.push(item) : "";
                item.service_type.service_type === "Retro" || item.service_type.service_type === "Appeal" ? retroAppealAuthObj.twelveDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 13) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? routineMedicareObj.thirtheenDay.push(item) : "";
                item.service_type.service_type === "Retro" || item.service_type.service_type === "Appeal" ? retroAppealAuthObj.thirtheenDay.push(item) : "";
            }
            if (this.calculateDayCount(item) === 14 || this.calculateDayCount(item) > 14) {
                item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare" ? routineMedicareObj.fourtheenDay.push(item) : "";
                item.service_type.service_type === "Retro" || item.service_type.service_type === "Appeal" ? retroAppealAuthObj.fourtheenDay.push(item) : "";
            }
        });
        this.setState({
            urgentUnassignedMedicare: urgentMedicareObj,
            routineUnassignedMedicare: routineMedicareObj,
            retroAppealAuthList: retroAppealAuthObj,
            urgentMedicalUnassigned: urgentMediclaimObj,
            routineMedicalUnassigned: routineMediclaimObj,
        })
    }
    handleSubMenuClick = (value) => {
        this.setState({
            subMenuActive: value
        });
        if (value === "ALL") {
            this.setState({
                authAllHistory: this.state.authAllHistoryCopy,
                totalCountofpatients: this.state.authAllHistoryCopy.length,
                pageFrom: 0,
                perPage: 10,
                page: 1,
            }, () => {
                this.paginate(this.state.authAllHistory && this.state.authAllHistory, this.state.perPage, this.state.page, "ALL")
            })
        } else if (value === "OPEN") {
            let openAuthHistory = this.state.authAllHistoryCopy.filter((item) => item.status === "OPEN");
            this.setState({
                openAuthHistory: openAuthHistory,
                openAuthHistoryCopy: openAuthHistory,
                totalCountofpatients: openAuthHistory.length,
                pageFrom: 0,
                perPage: 10,
                page: 1,
            }, () => {
                this.paginate(this.state.openAuthHistory && this.state.openAuthHistory, this.state.perPage, this.state.page, "OPEN")
            })
        } else if (value === "APPROVED") {
            let approvedAuthHistory = this.state.authAllHistoryCopy.filter((item) => item.status === "APPROVED");
            this.setState({
                approvedAuthHistory: approvedAuthHistory,
                approvedAuthHistoryCopy: approvedAuthHistory,
                totalCountofpatients: approvedAuthHistory.length,
                pageFrom: 0,
                perPage: 10,
                page: 1,
            }, () => {
                this.paginate(this.state.approvedAuthHistory && this.state.approvedAuthHistory, this.state.perPage, this.state.page, "APPROVED")
            })
        } else if (value === "REJECTED") {
            let rejectedAuthHistory = this.state.authAllHistoryCopy.filter((item) => item.status === "REJECTED");
            this.setState({
                rejectedAuthHistory: rejectedAuthHistory,
                rejectedAuthHistoryCopy: rejectedAuthHistory,
                totalCountofpatients: rejectedAuthHistory.length,
                pageFrom: 0,
                perPage: 10,
                page: 1,
            }, () => {
                this.paginate(this.state.rejectedAuthHistory && this.state.rejectedAuthHistory, this.state.perPage, this.state.page, "REJECTED")
            })
        } else {
            let canceledAuthHistoty = this.state.authAllHistoryCopy.filter((item) => item.status === "CANCEL");
            this.setState({
                canceledAuthHistoty: canceledAuthHistoty,
                canceledAuthHistotyCopy: canceledAuthHistoty,
                totalCountofpatients: canceledAuthHistoty.length,
                pageFrom: 0,
                perPage: 10,
                page: 1,
            }, () => {
                this.paginate(this.state.canceledAuthHistoty && this.state.canceledAuthHistoty, this.state.perPage, this.state.page, "CANCEL")
            })
        }
    }
    handleBasicClick = (value) => {
        this.setState({
            basicActive: value
        });
        if (value === "tab1") {
            this.setState({
                isLoaded: false
            })
            let routineMedicareMyAssignmentArray = []; let routineMedicalAndCommercialMyAssignmentArray = [];
            // Routine Medicare Auth Variables
            let caremnagerId = localStorage.getItem('caremanagerId');
            // My Assignment Tables
            axios({
                method: 'GET',
                url: `/api/getAuthByServiceType`,
                params: {
                    patient_type: "OUTPATIENT",
                    service_type: "Expedited/Urgent",
                    assigned_to: caremnagerId
                }
            })
                .then(res => {
                    axios({
                        method: 'GET',
                        url: `/api/getAuthByServiceType`,
                        params: {
                            patient_type: "OUTPATIENT",
                            service_type: "Standard/Routine",
                            assigned_to: caremnagerId
                        }
                    })
                    .then((response) => {
                        let finalResponse = res.data.json.result.concat(response.data.json.result);
                        finalResponse && this.myAssignmentData(finalResponse, caremnagerId);
                        finalResponse && finalResponse.map((item) => {
                            if (item.service_type.service_type === "Standard/Routine" && item.p_lob === "Medicare") {
                                routineMedicareMyAssignmentArray.push(item);
                            };
                            if (item.service_type.service_type === "Standard/Routine" && (item.p_lob === "Medical" || item.p_lob === "Commercial")) {
                                routineMedicalAndCommercialMyAssignmentArray.push(item);
                            }
                        })
                        this.setState({
                            routineMedicareMyAssignmentArray: routineMedicareMyAssignmentArray,
                            routineMedicalAndCommercialMyAssignmentArray: routineMedicalAndCommercialMyAssignmentArray
                        })

                    })
                })
            // End of // My Assignment Tables
            // Unassigned Tables
            axios({
                method: 'GET',
                url: `/api/getAuthListByAssignedTo`,
                params: {
                    patient_type: "OUTPATIENT",
                    assigned_to: "UNASSIGNED"
                }
            })
                .then(res => {
                    // console.log(res.data.json.result,"res.data.json.result")
                    res.data && res.data.json && res.data.json.result && this.unassignedData(res.data.json.result)
                })
            //End of Unassigned Tables
            // Asiigned Tables data
            let assignedData = []; let obj = { "gmail": "", "details": [], "firstname": "", "lastname": "", "role": "" }
            axios({
                method: 'GET',
                url: `/api/getAssignedAuthList`,
                params: {
                    patient_type: "OUTPATIENT",
                    assigned_to: caremnagerId
                }
            })
                .then(res => {
                    for (let key in res.data.json) {
                        if (res.data.json.hasOwnProperty(key)) {
                            obj = { "gmail": key, "details": res.data.json[key], "firstname": res.data.json[key].first_name, "lastname": res.data.json[key].last_name, "role": res.data.json[key].role }
                            assignedData.push(obj);
                            //    console.log(key, res.data.json[key]);
                        }
                    }
                    assignedData.map((item) => {
                        this.assignedData(item.details.data, item.gmail, item.firstname, item.lastname, item.role);
                    })
                    // console.log(assignedData,"assignedData")
                });
            // End of Assigned tables data
            // Oral Notification Table             
            axios({
                method: 'GET',
                url: `/api/getOralNotificationAuthData`,
                params: {
                    patient_type: "OUTPATIENT",
                    assigned_to: caremnagerId
                }
            })
                .then(res => {
                    // console.log(res.data.json.result,"2")
                    res.data && res.data.json && res.data.json.result && this.oralNotificationsData(res.data.json.result);
                    this.setState({
                        isLoaded: true
                    })
                })
        } else if (value === "tab2") {
            this.setState({
                isLoaded: false
            })
            let patientIds = []; let serviceTypes = []; let placeofServiceCategories = [];
            let caremnagerId = localStorage.getItem('caremanagerId');
            // axios({
            //     method: 'GET',
            //     url: `/api/telemedicine`,
            //     params: {
            //         id: caremnagerId
            //     }
            // })
            //     .then((response) => {
            //         let patientdetailsresponse = response && response.data && response.data.json;
            //         patientdetailsresponse.members.map((el) => {
            //             patientIds.push(el.patient_id);
            //         })
            //         this.setState({
            //             patient_ids: patientIds
            //         });
            //         let obj = {
            //             "query": { "bool": { "filter": { "terms": { "patient_id.keyword": patientIds } } } }
            //         }
            //         axios({
            //             method: 'POST',
            //             url: `/api/patientslist`,
            //             data: obj
            //         })
            //             .then(res => {
            //                 // console.log(res.data.json.hits.hits, "res.data.json.hits.hits")
            //                 this.setState({ oldPatientDetails: res.data.json.hits.hits, patientDetails: res.data.json.hits.hits })
            //             });
            //     });
            axios({
                method: 'GET',
                url: `/api/getServiceTypes`,
            })
                .then((response) => {
                    let serviceObj = { "text": "", "value": "" };
                    response.data.json.result && response.data.json.result.map(item => {
                        serviceObj = { "text": item.service_type, "value": item.id };
                        serviceTypes.push(serviceObj);
                    })
                    this.setState({
                        serviceTypes: serviceTypes
                    })
                })
            axios({
                method: 'GET',
                url: `/api/getPlaceOfServices`,
                params: {
                    patient_type: "OUTPATIENT",
                },
            })
                .then((response) => {
                    let serviceObj = { "text": "", "value": "" };
                    response.data.json.result && response.data.json.result.map(item => {
                        serviceObj = { "text": item.id + " " + item.service, "value": item.id };
                        placeofServiceCategories.push(serviceObj);
                    })
                    this.setState({
                        placeofServiceCategories: placeofServiceCategories,
                        isLoaded: true
                    })
                })
        } else if (value === "tab3") {
            this.setState({
                isLoaded: false
            })
            let roles = []; let serviceTypes = [];
            axios({
                method: 'GET',
                url: `/api/fetchRole`,
                params: {
                    role_type: "ALL"
                }
            })
                .then((response) => {
                    response.data.json.result.map((el) => {
                        roles.push({ text: el.role, value: el.role });
                        this.setState({
                            authscreencreatedby: roles,
                            authscreenmodifiedby: roles
                        });
                    })
                })
            axios({
                method: 'GET',
                url: `/api/getServiceTypes`,
            })
                .then((response) => {
                    let serviceObj = { "text": "", "value": "" };
                    response.data.json.result && response.data.json.result.map(item => {
                        serviceObj = { "text": item.service_type, "value": item.id };
                        serviceTypes.push(serviceObj);
                    })
                    this.setState({
                        serviceTypes: serviceTypes,
                        isLoaded: true
                    })
                })
        } else {
            this.setState({
                isLoaded: false
            })
            let MonthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            let monthlyOpenData = []; let monthlyApprovedData = []; let monthlyRejectedData = []; let monthlyCancelData = [];
            axios({
                method: 'GET',
                url: `/api/getReferalBasedOnStatus`,
                params: {
                    patient_type: "OUTPATIENT",
                    status: "ALL",
                    time_line: this.state.selctedAuthdropdownValue
                }
            })
                .then((response) => {
                    MonthsArray.filter((mnth, index) => {
                        let monthlyOpenDatalength = (response.data.json.result && response.data.json.result.filter(el => moment((el.service_requested_date)).format("MMM") === mnth)).filter(el => el.status == "OPEN").length;
                        let monthlyApprovedDatalength = (response.data.json.result && response.data.json.result.filter(el => moment((el.service_requested_date)).format("MMM") === mnth)).filter(el => el.status == "APPROVED").length;
                        let monthlyRejectedDatalength = (response.data.json.result && response.data.json.result.filter(el => moment((el.service_requested_date)).format("MMM") === mnth)).filter(el => el.status == "REJECTED").length;
                        let monthlyCancelDatalength = (response.data.json.result && response.data.json.result.filter(el => moment((el.service_requested_date)).format("MMM") === mnth)).filter(el => el.status == "CANCEL").length;
                        monthlyOpenData.push(monthlyOpenDatalength);
                        monthlyApprovedData.push(monthlyApprovedDatalength);
                        monthlyRejectedData.push(monthlyRejectedDatalength);
                        monthlyCancelData.push(monthlyCancelDatalength);
                    })
                    this.paginate(response.data.json.result && response.data.json.result, this.state.perPage, this.state.page, "ALL")
                    this.setState({
                        authAllHistoryCopy: response.data.json.result,
                        totalCountofpatients: response.data.json.result.length,
                        openData: monthlyOpenData,
                        approvedData: monthlyApprovedData,
                        rejectedData: monthlyRejectedData,
                        cancelData: monthlyCancelData,
                        xAxisValues: MonthsArray,
                        isLoaded: true
                    })
                })
        }
    }

    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
    }
    toggleCollapse2 = collapseID => () => {
        this.setState(prevState => ({
            collapseID2: prevState.collapseID2 !== collapseID ? collapseID : ""
        }));
    }
    handleSelectChange(value) {
        this.state.serviceTypes && this.state.serviceTypes.map((item) => {
            if(item.text === value){
                this.setState({
                    selctedServiceType: item.value
                })
            }
        })
    }
    // handleServiceCategoryChange(value) {
    //     this.setState({
    //         selctedServiceCategory: parseInt(value)
    //     })
    // }
    handleserviceRequestDate = (value) => {
        this.setState({
            serviceRequestDate: moment(value).toISOString()
        });
    }
    handleFromDate = (value) => {
        this.setState({
            fromDate: moment(value).toISOString()
        });
    }
    handleToDate = (value) => {
        this.setState({
            toDate: moment(value).toISOString()
        });
    }
    handleRequestReceivedDate = (value) => {
        this.setState({
            requestReceivedDate: moment(value).toISOString()
        });
    }
    handlePlaceofService(value) {
        this.state.placeofServiceCategories && this.state.placeofServiceCategories.map((item) => {
            if(item.text === value){
                this.setState({
                    placeofService: item.value
                })
            }
        })
        // this.setState({
        //     placeofService: parseInt(value)
        // })
    }
    authorizationToggle = () => {
        this.setState({
            authorizationToggle: !this.state.authorizationToggle
        })
    }
    patientDetailsToggle = () => {
        this.setState({
            patientDetailsToggle: !this.state.patientDetailsToggle
        })
    }

    RequestingProviderDetailsToggle = () => {
        this.setState({
            requestingproviderdetails: !this.state.requestingproviderdetails
        })
    }

    RefferedProviderDetailsToggle = () => {
        this.setState({
            refferedproviderdetails: !this.state.refferedproviderdetails
        })
    }

    AdddiagnosisToggle = () => {
        this.setState({
            adddiagnosisdetails: !this.state.adddiagnosisdetails
        })
    }

    ServiceRequestToggle = () => {
        this.setState({
            servicerequestdetails: !this.state.servicerequestdetails
        })
    }


    onHandleSearch = e => {
        if (e && e.target && e.target.value !== "") {
            let searchText = '';
            if (e && e.target) searchText = e.target.value;
            else searchText = search;
            let obj = {
                query: {
                    query_string: {
                        query: '*' + searchText + '*'
                    }
                }
            }
            this.setState({ isLoaded: false });
            axios({
                method: 'POST',
                url: `/api/patientslist`,
                data: obj,
            })
                .then(res => {
                    // console.log(res.data.json.hits.hits, "res.data.json.hits.hits")
                    this.setState({ oldPatientDetails: res.data.json.hits.hits, patientDetails: res.data.json.hits.hits, isLoaded: true })
                });
            this.setState({
                searchedText: e.target.value
            })
        } else {
            let searchText = '';
            if (e && e.target) searchText = e.target.value;
            else searchText = search;
            let obj = {
                "query": { "bool": { "filter": { "terms": { "patient_id.keyword": this.state.patient_ids } } } },
                size: this.state.perPage,
                from: this.state.pageFrom
            }
            this.setState({ isLoaded: false });
            axios({
                method: 'POST',
                url: `/api/patientslist`,
                data: obj,
            })
                .then(res => {
                    // console.log(res.data.json.hits.hits, "res.data.json.hits.hits")
                    this.setState({ oldPatientDetails: [], patientDetails: [], isLoaded: true })
                    // this.setState({ oldPatientDetails: res.data.json.hits.hits, patientDetails: res.data.json.hits.hits, isLoaded: true })
                });
            this.setState({
                searchedText: e.target.value
            })
        }
    }

    onHandleadddiagnosisSearch = e => {
        if (e && e.target && e.target.value !== "") {
            let searchText = '';
            if (e && e.target) searchText = e.target.value;
            else searchText = search;
            let obj = {
                query: {
                    query_string: {
                        query: '*' + searchText + '*'
                    }
                }
            }
            // this.setState({ isLoaded: false });
            axios({
                method: 'POST',
                url: `/api/diagnosisDetails`,
                data: obj,
            })
                .then(res => {
                    this.setState({ adddiagnosisDetailsList: res.data.json.hits.hits, oldadddiagnosisDetailsList: res.data.json.hits.hits })
                });
            this.setState({
                adddiagnosisDetailsText: e.target.value
            })
        } else {
            this.setState({ adddiagnosisDetailsList: [], oldadddiagnosisDetailsList: [], adddiagnosisDetailsText: e.target.value })
        }
    }

    onHandleaservicerequestSearch = e => {
        if (e && e.target && e.target.value !== "") {
            let searchText = '';
            if (e && e.target) searchText = e.target.value;
            else searchText = search;
            let obj = {
                query: {
                    query_string: {
                        query: '*' + searchText + '*'
                    }
                }
            }
            // this.setState({ isLoaded: false });
            axios({
                method: 'POST',
                url: `/api/serviceRequestDetails`,
                data: obj,
            })
                .then(res => {
                    this.setState({ servicerequestDetailsList: res.data.json.hits.hits, oldservicerequestDetailsList: res.data.json.hits.hits })

                });
            this.setState({
                servicerequestDetailsText: e.target.value
            })
        } else {
            this.setState({ servicerequestDetailsList: [], oldservicerequestDetailsList: [], servicerequestDetailsText: e.target.value })
        }
    }

    getCareTeamDetailsSearch = () => {
        this.setState({ searchStarts: true })
    }

    getRequestProviderDetailsSearch = () => {
        this.setState({ requestprovidersearchStarts: true })
    }

    getRefferedProviderDetailsSearch = () => {
        this.setState({ refferedprovidersearchStarts: true })
    }

    addDiagnosisSearch = () => {
        this.setState({ adddiagnosissearchStarts: true })
    }

    serviceRequestSearch = () => {
        this.setState({ servicerequestsearchStarts: true })
    }

    showSelectedPatientDetails = (el) => {
        // console.log(typeof el._source.patient_id, "type")
        let selectedData = [];
        selectedData.push(el)
        this.setState({
            searchedText: el._source.firstname + " " + el._source.lastname + " " + el._source.patient_id + " " + moment(el._source.dateofbirth).format('MM/DD/YYYY'),
            searchStarts: false,
            selectedPatientData: selectedData
        })
    }
    showSelectedRequestedProviderDetails = (el) => {
        let selectedData = [];
        selectedData.push(el)
        this.setState({
            searchedProviderDetailsText: el.value,
            requestprovidersearchStarts: false,
            selectedRequestedProviderData: selectedData
        })
    }

    showSelectedRefferedProviderDetails = (el) => {
        let selectedData = [];
        selectedData.push(el)
        this.setState({
            searchedPreferredDetailsText: el.value,
            refferedprovidersearchStarts: false,
            selectedRefferedProviderData: selectedData
        })
    }

    showSelectedadddiagnosisDetails = (el, index) => {
        let usersdata = {
            columns: [
                {
                    label: 'No',
                    field: 'no',


                },
                {
                    label: 'Diagnosis Code',
                    field: 'diagnosiscode',


                },
                {
                    label: 'Diagnosis Code Description',
                    field: 'diagnosiscodedescription',


                },
                {
                    label: 'Action',
                    field: 'action',


                }],
            rows: []
        };
        // let diagnosisArray = [];
        let row = { "no": this.state.userDataRows.length + 1, "diagnosiscode": el._source.code, "diagnosiscodedescription": el._source.description, action: "" };
        let addedRow = { "diagnosis_code": el._source.code, "diagnosis_code_description": el._source.description };
        usersdata.rows = [...this.state.userDataRows, row]
        // console.log(usersdata, "usersdata")
        this.setState({
            // adddiagnosisDetailsText: el._source.code + " " + el._source.description,
            adddiagnosisDetailsText:"",
            userDataRows: usersdata.rows,
            usersdata: usersdata,
            diagnosisArray: [...this.state.diagnosisArray, addedRow]
        }, () => {
            let users = this.state.usersdata;
            for (let i = 0; i < users.rows.length; i++) {
                // users.rows[i].name =  <div><div style={{ marginRight: "12px" }} className="usericons countertexticon menuicon">{(this.state.usersdata.rows[i].name).match(/\b(\w)/g).join('')}</div> {this.state.usersdata.rows[i].name}</div>
                users.rows[i].action = <div> <MDBIcon style={{ color: "#727272", fontSize: "16px" }} icon="trash" onClick={this.removeRowDetails.bind(this, users.rows[i], i)} /></div>
            }
        })
    }
    removeRowDetails = (item, ind) => {
        let usersdata = {
            columns: [
                {
                    label: 'No',
                    field: 'no',


                },
                {
                    label: 'Diagnosis Code',
                    field: 'diagnosiscode',


                },
                {
                    label: 'Diagnosis Code Description',
                    field: 'diagnosiscodedescription',


                },
                {
                    label: 'Action',
                    field: 'action',


                }],
            rows: []
        };
        let userDataRows = this.state.userDataRows;
        userDataRows.splice(ind, 1);
        usersdata.rows = userDataRows;
        // console.log(userDataRows, "this.state.userDataRows")
        this.setState({
            userDataRows: usersdata.rows,
            usersdata: usersdata
        })
    }
    showSelectedServiceRequestDetails = (el) => {
        let selectedData = [];
        selectedData.push(el)
        this.setState({
            servicerequestDetailsText: el.value,
            servicerequestsearchStarts: false,
            servicerequestProviderData: selectedData
        })
    }

    handleproviderdetailschange = (e) => {
        this.setState({
            providerdetailsdescription: e.target.value
        });
    }


    validateDetails = () => {
        if (this.state.selctedServiceType === "" || this.state.serviceRequestDate === "" || this.state.placeofService === "" ||
            this.state.fromDate === "" || this.state.toDate === "" || this.state.requestReceivedDate === "" || this.state.selectedPatientData.length === 0 || 
            this.state.requestingProviderId ==="" || this.state.requestingProviderDetailsName ==="" || this.state.requestingProviderDetailsSpeciality ==="" || this.state.requestingProviderDetailsGroup ==="" || this.state.requestingProviderCell ==="" || this.state.requestingProviderFax === "" || 
            this.state.referredProviderId === "" || this.state.referredProviderDetailsName ==="" || this.state.referredProviderDetailsSpeciality ==="" || this.state.referredProviderDetailsGroup ==="" || this.state.referredProviderCell ==="" || this.state.referredProviderFax ==="" || this.state.providerdetailsdescription === "" ||
            this.state.usersdata.rows.length === 0 || this.state.servicerequestProviderData.length === 0 || this.state.quantity ==="" || this.state.modifier === "" || this.state.finacialResponsibility === "" || this.state.covered === "") {
                this.setState({
                    errorShown: true,
                    showWarningModal: true
                })
        } else {
            this.setState({
                isLoaded: false
            })
            let patientid = localStorage.getItem('patientId');
            let createReferalData = {
                "service_type_id": parseInt(this.state.selctedServiceType),
                // "service_category_id": this.state.selctedServiceCategory,
                "service_requested_date": this.state.serviceRequestDate,
                "place_of_service_id": parseInt(this.state.placeofService),
                "valid_from_date": this.state.fromDate,
                "valid_to_date": this.state.toDate,
                "request_received_date": this.state.requestReceivedDate,
                "auth_notes": [],
                "patient_id": this.state.selectedPatientData[0]._source.patient_id,
                "p_hp_member_id": this.state.selectedPatientData[0]._source.patient_id,
                "p_name": this.state.selectedPatientData[0]._source.firstname + " " + this.state.selectedPatientData[0]._source.lastname,
                "p_dob": moment(this.state.selectedPatientData[0]._source.dateofbirth).format('YYYY-MM-DD'),
                "p_language": this.state.selectedPatientData[0]._source.language,
                "p_age": parseInt(moment(new Date()).format('YYYY')) - parseInt(moment(this.state.selectedPatientData[0]._source.dateofbirth).format('YYYY')),
                "p_gender": this.state.selectedPatientData[0]._source.gender,
                "p_hp_effective_date": "2021-07-16",
                "p_mr_no": this.state.selectedPatientData[0]._source.patient_id,
                "p_guardian_poa_name": "Jenni Garth",
                "p_phone_number": this.state.selectedPatientData[0]._source.primaryphone,
                "p_address": this.state.selectedPatientData[0]._source.address,
                "p_lob": "Medicare",
                "p_pcp_id": "P7896",
                "p_pcp_effective_date": "2021-07-12T03:52:36.218Z",
                "p_pcp_name": this.state.selectedPatientData[0]._source.pcpname,
                "p_pcp_phone_number": this.state.selectedPatientData[0]._source.pcpphone,
                "p_pcp_fax": "n/a",
                "p_pcp_made_aware_request": "Yes",
                "rp_id": this.state.requestingProviderId,
                "rp_name": this.state.requestingProviderDetailsName,
                "rp_speciality": this.state.requestingProviderDetailsSpeciality,
                "rp_affiliate_group": this.state.requestingProviderDetailsGroup,
                "rp_phone_number": this.state.requestingProviderCell,
                "rp_fax_number": this.state.requestingProviderFax,
                "rp_notes": [],
                "rtp_id": this.state.referredProviderId,
                "rtp_name": this.state.referredProviderDetailsName,
                "rtp_speciality": this.state.referredProviderDetailsSpeciality,
                "rtp_affiliate_group": this.state.referredProviderDetailsGroup,
                "rtp_phone_number": this.state.referredProviderCell,
                "rtp_fax_number": this.state.referredProviderFax,
                "rtp_description": this.state.providerdetailsdescription,
                "rtp_notes": [],
                "diagnosis": this.state.diagnosisArray,
                "sr_code_id": this.state.servicerequestProviderData[0]._source.code,
                "sr_quantity": this.state.quantity,
                "sr_modifier": this.state.modifier,
                "sr_financial_responsibility": this.state.finacialResponsibility,
                "sr_covered": this.state.covered,
                "assigned_to": "UNASSIGNED",
                "assigned_date": null,
                "status": "OPEN",
                "created_date": new Date(),
                "created_by": localStorage.getItem("caremanagerId"),
                "created_by_role": localStorage.getItem("role"),
                "oral_notification": false
            };
            axios({
                method: 'POST',
                url: `/api/createAuthReferral`,
                data: createReferalData,
            })
                .then((response) => {
                    this.setState({
                        isLoaded: true,
                        showConfirmonModal: true
                    })
                    // console.log(response, "response")
                })
        }
    }
    saveCreateReferalDetails = () => {
        this.setState({
            showConfirmonModal: false
        })
    }
    showConfirmonModalToggle = () => {
        this.setState({
            showConfirmonModal: false
        })
    }
    closeSearchPatientDetails = () => {
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
    closeDiagnosisSearchBar = () => {
        if (this.state.adddiagnosissearchStarts) {
            document.addEventListener('click', event => {
                if (event.target.tagName === "INPUT") {
                } else if (event.target.tagName === "DIV") {
                    this.setState({
                        adddiagnosissearchStarts: false
                    })
                }
            })
        }
    }
    requestingProviderIdChange = (e) => {
        this.setState({
            requestingProviderId: e.target.value
        })
    }
    requestingProviderDetailsNameChange = (e) => {
        this.setState({
            requestingProviderDetailsName: e.target.value
        })
    }
    requestingProviderDetailsSpecialityChange = (e) => {
        this.setState({
            requestingProviderDetailsSpeciality: e.target.value
        })
    }
    requestingProviderDetailsGroupChange = (e) => {
        this.setState({
            requestingProviderDetailsGroup: e.target.value
        })
    }
    requestingProviderCellChange = (e) => {
        this.setState({
            requestingProviderCell: e.target.value
        })
    }
    requestingProviderFaxChange = (e) => {
        this.setState({
            requestingProviderFax: e.target.value
        })
    }
    referredProviderIdChange = (e) => {
        this.setState({
            referredProviderId: e.target.value
        })
    }
    referredProviderDetailsNameChange = (e) => {
        this.setState({
            referredProviderDetailsName: e.target.value
        })
    }
    referredProviderDetailsSpecialityChange = (e) => {
        this.setState({
            referredProviderDetailsSpeciality: e.target.value
        })
    }
    referredProviderDetailsGroupChange = (e) => {
        this.setState({
            referredProviderDetailsGroup: e.target.value
        })
    }
    referredProviderCellChange = (e) => {
        this.setState({
            referredProviderCell: e.target.value
        })
    }
    referredProviderFaxChange = (e) => {
        this.setState({
            referredProviderFax: e.target.value
        })
    }
    authorizationauthToggle = (e) => {
        this.setState({
            authorizationauthToggle: !this.state.authorizationauthToggle
        })
    }
    MemberDetailsAuthToggle = () => {
        this.setState({
            memberauthtoggle: !this.state.memberauthtoggle
        })
    }
    RequestedDoctorAuthToggle = () => {
        this.setState({
            requesteddoctortoggle: !this.state.requesteddoctortoggle
        })
    }
    TrackingDetailstoggle = () => {
        this.setState({
            trackingdetailstoggle: !this.state.trackingdetailstoggle
        })
    }
    myAssignmentToggle = () => {
        this.setState({
            myAssignmentToggle: !this.state.myAssignmentToggle
        })
    }
    handleAuthorizationNumber = (e) => {
        this.setState({
            authorizationnumber: e.target.value
        })
    }
    handleselectedsearchauthstatus = (text) => {
        this.setState({
            selectedsearchauthstatus: text
        })
    }
    handleauthRequestReceiveDate = (value) => {
        this.setState({
            authrequestreceivedate: moment(value).format("YYYY-MM-DDTHH:mm:ss")
        });
    }
    handleauthRequestReceiveDate1 = (value) => {
        this.setState({
            authrequestreceivedate1: moment(value).format("YYYY-MM-DDTHH:mm:ss")
        });
    }
    handleauthaurizationdate = (value) => {
        this.setState({
            authauthorizationdate: moment(value).format("YYYY-MM-DDTHH:mm:ss")
        });
    }
    handleauthFinalDecisionDate = (value) => {
        this.setState({
            authfinaldecisiondate: moment(value).format("MM/DD/YYYY")
        });
    }
    handleselectedPriorityType(value) {
        this.setState({
            selectedprioritytype: parseInt(value)
        });
    }
    handleAuthMemberId = (e) => {
        this.setState({
            authmemberid: e.target.value
        });
    }
    handleAuthFirstName = (e) => {
        this.setState({
            authfirstname: e.target.value
        });
    }
    handleAuthLastName = (e) => {
        this.setState({
            authlastname: e.target.value
        })
    }
    handleAuthDelegate = (e) => {
        this.setState({
            authdelegate: e.target.value
        })
    }
    handleAuthSSN = (e) => {
        this.setState({
            authssn: e.target.value
        })
    }
    handleAuthLOB = (e) => {
        this.setState({
            authlob: e.target.value
        })
    }
    handleauthDOB = (value) => {
        this.setState({
            authdateofbirth: moment(value).format("YYYY-MM-DD")
        });
    }
    handleAuthRequestingDoctorId = (e) => {
        this.setState({
            authrequestingdoctorid: e.target.value
        })
    }
    handleAuthRequestingOrganizationId = (e) => {
        this.setState({
            authrequestingorganizationid: e.target.value
        })
    }
    handleselectedrequestingspeciality = (text) => {
        this.setState({
            selectedrequestingspeciality: text
        })
    }
    handleselectedreferringspeciality = (text) => {
        this.setState({
            selectedreferringspeciality: text
        })
    }
    handleAuthRequestedDoctorId = (e) => {
        this.setState({
            authrequesteddoctorid: e.target.value
        })
    }
    handleAuthRequestedOrganizationId = (e) => {
        this.setState({
            authrequestedorganizationid: e.target.value
        })
    }
    handleselectedauthscreenassigned = (text) => {
        this.setState({
            selectedauthscreenassigned: text === "Assigned to me" ? localStorage.getItem('caremanagerId') : ""
        })
    }
    handleselectedauthscreencreatedby = (text) => {
        this.setState({
            selectedcreatedby: text
        })
    }
    handleauthDateofmofification = (value) => {
        this.setState({
            authdateofmodification: moment(value).format("MM/DD/YYYY")
        })
    }
    handleselectedauthscreenmodifiedby = (text) => {
        this.setState({
            selectedmodifiedby: text
        })
    }
    handleAuthProblemCategory = (e) => {
        this.setState({
            authscreenproblemcategory: e.target.value
        })
    }
    handleAuthScreenFacility = (e) => {
        this.setState({
            authscreenfacility: e.target.value
        })
    }
    resetAuthDetails = () => {
        this.setState({
            authorizationnumber: "",
            authrequestreceivedate: "",
            selectedsearchauthstatus: "",
            selectedprioritytype: "",
            authmemberid: "",
            authfirstname: "",
            authdateofbirth: "",
            authrequestingdoctorid: "",
            selectedreferringspeciality: "",
            selectedauthscreenassigned: ""
        })
    }
    searchAuthDetails = () => {
        this.setState({
            isLoaded: false
        })
        let createReferalData = {
            "id": this.state.authorizationnumber ? this.state.authorizationnumber : 0,
            "request_received_date": this.state.authrequestreceivedate,
            "status": this.state.selectedsearchauthstatus,
            "service_type_id": this.state.selectedprioritytype ? this.state.selectedprioritytype : 0,
            "p_hp_member_id": this.state.authmemberid,
            "p_name": this.state.authfirstname,
            "p_dob": this.state.authdateofbirth,
            "rp_id": this.state.authrequestingdoctorid,
            "rp_speciality": "",
            "assigned_to": this.state.selectedauthscreenassigned
        };
        axios({
            method: 'POST',
            url: `/api/searchAuthReferral`,
            params: {
                patient_type: "OUTPATIENT",
            },
            data: createReferalData,
        })
            .then((response) => {
                // console.log(response.data.json.result,"response");
                this.setState({
                    searchresults: true,
                    filteredTables: response.data.json.result,
                    isLoaded: true
                });
            })
    }
    handleClcick() {
    }
    quantityHandler = (e) => {
        this.setState({
            quantity: e.target.value
        })
    }
    modifierHandler = (e) => {
        this.setState({
            modifier: e.target.value
        })
    }
    finacialResponsibilityHandler = (e) => {
        this.setState({
            finacialResponsibility: e.target.value
        })
    }
    coveredHandler = (e) => {
        this.setState({
            covered: e.target.value
        })
    }
    showAuthDetailsscreen(authnumber) {
        window.location.href = "/authview";
        localStorage.setItem('authNumber', authnumber);
    }
    handlePageChange = (e, val) => {
        if (this.state.subMenuActive === "ALL") {
            this.setState({
                pageFrom: ((val * this.state.perPage) - (this.state.perPage - 1)),
                page: val,
                authAllHistory: this.state.authAllHistoryCopy.slice((val * this.state.perPage) - (this.state.perPage - 1), ((val * this.state.perPage) + 1))
            });
        } else if (this.state.subMenuActive === "OPEN") {
            this.setState({
                pageFrom: ((val * this.state.perPage) - (this.state.perPage - 1)),
                page: val,
                openAuthHistory: this.state.openAuthHistoryCopy.slice((val * this.state.perPage) - (this.state.perPage - 1), ((val * this.state.perPage) + 1))
            });
        } else if (this.state.subMenuActive === "APPROVED") {
            this.setState({
                pageFrom: ((val * this.state.perPage) - (this.state.perPage - 1)),
                page: val,
                approvedAuthHistory: this.state.approvedAuthHistoryCopy.slice((val * this.state.perPage) - (this.state.perPage - 1), ((val * this.state.perPage) + 1))
            });
        } else if (this.state.subMenuActive === "REJECTED") {
            this.setState({
                pageFrom: ((val * this.state.perPage) - (this.state.perPage - 1)),
                page: val,
                rejectedAuthHistory: this.state.rejectedAuthHistoryCopy.slice((val * this.state.perPage) - (this.state.perPage - 1), ((val * this.state.perPage) + 1))
            });
        } else {
            this.setState({
                pageFrom: ((val * this.state.perPage) - (this.state.perPage - 1)),
                page: val,
                canceledAuthHistoty: this.state.canceledAuthHistotyCopy.slice((val * this.state.perPage) - (this.state.perPage - 1), ((val * this.state.perPage) + 1))
            });
        }
    }
    paginate(array, page_size, page_number, tab) {
        if (tab === "ALL") {
            this.setState({
                authAllHistory: array.slice((page_number - 1) * page_size, (page_number * page_size) + 1)
            })
        } else if (tab === "OPEN") {
            this.setState({
                openAuthHistory: array.slice((page_number - 1) * page_size, (page_number * page_size) + 1)
            })
        } else if (tab === "APPROVED") {
            this.setState({
                approvedAuthHistory: array.slice((page_number - 1) * page_size, (page_number * page_size) + 1)
            })
        } else if (tab === "REJECTED") {
            this.setState({
                rejectedAuthHistory: array.slice((page_number - 1) * page_size, (page_number * page_size) + 1)
            })
        } else {
            this.setState({
                canceledAuthHistoty: array.slice((page_number - 1) * page_size, (page_number * page_size) + 1)
            })
        }

    }
    authviewHistoryModal = (authId) => {
        let historyDetails = [];
        this.setState({
            isLoaded: false
        })
        axios({
            method: 'GET',
            url: `/api/getAssignmentHistoryByAuthId`,
            params: {
                patient_type: "OUTPATIENT",
                auth_id: authId
            }
        })
            .then((response) => {
                historyDetails = response.data.json.result && response.data.json.result.sort((a, b) => {
                    return new Date(b.modified_date) - new Date(a.modified_date)
                })
                this.setState({
                    historyDetails: historyDetails,
                    historyDetailsCopy: historyDetails,
                    isLoaded: true,
                    historymodal: true
                })
            })
    }
    historymodaltoggle = () => {
        this.setState({
            historymodal: !this.state.historymodal
        });
    }
    historySearch = (e) => {
        if (e.target.value !== "") {
            let historyDetails = this.state.historyDetails;
            historyDetails = historyDetails.filter((el) => {
                if ((el.assigned_to.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) && (el.modified_by.toLowerCase().indexOf(e.target.value.toLowerCase() !== -1))) {
                    return el;
                }
            })
            if (historyDetails.length) {
                this.setState({ historyDetails: historyDetails })
            } else {
                this.setState({ historyDetails: this.state.historyDetails })
            }
        } else {
            this.setState({ historyDetails: this.state.historyDetailsCopy })
        }
        this.setState({
            historysearch: e.target.value
        });
    }
    authDropdownValuesChange = (text) => {
        if (text === "DAILY") {
            this.setState({
                selctedAuthdropdownValue: text,
                subMenuActive: "ALL",
                isLoaded: false
            })
            let hoursArray = ["01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
            let hourlyOpenData = []; let hourlyApprovedData = []; let hourlyRejectedData = []; let hourlyCancelData = [];
            axios({
                method: 'GET',
                url: `/api/getReferalBasedOnStatus`,
                params: {
                    patient_type: "OUTPATIENT",
                    status: "ALL",
                    time_line: text
                }
            })
                .then((response) => {
                    hoursArray.filter((hr, index) => {
                        let hourlyOpenDatalength = (response.data.json.result && response.data.json.result.filter(el => moment((el.service_requested_date)).format("HH:00") === hr)).filter(el => el.status == "OPEN").length;
                        let hourlyApprovedDatalength = (response.data.json.result && response.data.json.result.filter(el => moment((el.service_requested_date)).format("HH:00") === hr)).filter(el => el.status == "APPROVED").length;
                        let hourlyRejectedDatalength = (response.data.json.result && response.data.json.result.filter(el => moment((el.service_requested_date)).format("HH:00") === hr)).filter(el => el.status == "REJECTED").length;
                        let hourlyCancelDatalength = (response.data.json.result && response.data.json.result.filter(el => moment((el.service_requested_date)).format("HH:00") === hr)).filter(el => el.status == "CANCEL").length;
                        hourlyOpenData.push(hourlyOpenDatalength);
                        hourlyApprovedData.push(hourlyApprovedDatalength);
                        hourlyRejectedData.push(hourlyRejectedDatalength);
                        hourlyCancelData.push(hourlyCancelDatalength);
                    })
                    this.paginate(response.data.json.result && response.data.json.result, this.state.perPage, this.state.page, "ALL")
                    this.setState({
                        authAllHistoryCopy: response.data.json.result,
                        totalCountofpatients: response.data.json.result.length,
                        openData: hourlyOpenData,
                        approvedData: hourlyApprovedData,
                        rejectedData: hourlyRejectedData,
                        cancelData: hourlyCancelData,
                        xAxisValues: hoursArray,
                        isLoaded: true
                    })
                })
        } else if (text === "WEEKLY") {
            this.setState({
                selctedAuthdropdownValue: text,
                subMenuActive: "ALL",
                isLoaded: false
            })
            let weekArray = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
            let weeklyOpenData = []; let weeklyApprovedData = []; let weeklyRejectedData = []; let weeklyCancelData = [];
            axios({
                method: 'GET',
                url: `/api/getReferalBasedOnStatus`,
                params: {
                    patient_type: "OUTPATIENT",
                    status: "ALL",
                    time_line: text
                }
            })
                .then((response) => {
                    weekArray.filter((week, index) => {
                        let weeklyOpenDatalength = (response.data.json.result && response.data.json.result.filter(el => new Date(el.service_requested_date).toLocaleString("default", { weekday: "short" }) === week)).filter(el => el.status == "OPEN").length;
                        let weeklyApprovedDatalength = (response.data.json.result && response.data.json.result.filter(el => new Date(el.service_requested_date).toLocaleString("default", { weekday: "short" }) === week)).filter(el => el.status == "APPROVED").length;
                        let weeklyRejectedDatalength = (response.data.json.result && response.data.json.result.filter(el => new Date(el.service_requested_date).toLocaleString("default", { weekday: "short" }) === week)).filter(el => el.status == "REJECTED").length;
                        let weeklyCancelDatalength = (response.data.json.result && response.data.json.result.filter(el => new Date(el.service_requested_date).toLocaleString("default", { weekday: "short" }) === week)).filter(el => el.status == "CANCEL").length;
                        weeklyOpenData.push(weeklyOpenDatalength);
                        weeklyApprovedData.push(weeklyApprovedDatalength);
                        weeklyRejectedData.push(weeklyRejectedDatalength);
                        weeklyCancelData.push(weeklyCancelDatalength);
                    })
                    this.paginate(response.data.json.result && response.data.json.result, this.state.perPage, this.state.page, "ALL")
                    this.setState({
                        authAllHistoryCopy: response.data.json.result,
                        totalCountofpatients: response.data.json.result.length,
                        openData: weeklyOpenData,
                        approvedData: weeklyApprovedData,
                        rejectedData: weeklyRejectedData,
                        cancelData: weeklyCancelData,
                        xAxisValues: weekArray,
                        isLoaded: true
                    })
                })
        } else if (text === "MONTHLY") {
            this.setState({
                selctedAuthdropdownValue: text,
                subMenuActive: "ALL",
                isLoaded: false
            })
            let MonthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            let monthlyOpenData = []; let monthlyApprovedData = []; let monthlyRejectedData = []; let monthlyCancelData = [];
            axios({
                method: 'GET',
                url: `/api/getReferalBasedOnStatus`,
                params: {
                    patient_type: "OUTPATIENT",
                    status: "ALL",
                    time_line: text
                }
            })
                .then((response) => {
                    MonthsArray.filter((mnth, index) => {
                        let monthlyOpenDatalength = (response.data.json.result && response.data.json.result.filter(el => moment((el.service_requested_date)).format("MMM") === mnth)).filter(el => el.status == "OPEN").length;
                        let monthlyApprovedDatalength = (response.data.json.result && response.data.json.result.filter(el => moment((el.service_requested_date)).format("MMM") === mnth)).filter(el => el.status == "APPROVED").length;
                        let monthlyRejectedDatalength = (response.data.json.result && response.data.json.result.filter(el => moment((el.service_requested_date)).format("MMM") === mnth)).filter(el => el.status == "REJECTED").length;
                        let monthlyCancelDatalength = (response.data.json.result && response.data.json.result.filter(el => moment((el.service_requested_date)).format("MMM") === mnth)).filter(el => el.status == "CANCEL").length;
                        monthlyOpenData.push(monthlyOpenDatalength);
                        monthlyApprovedData.push(monthlyApprovedDatalength);
                        monthlyRejectedData.push(monthlyRejectedDatalength);
                        monthlyCancelData.push(monthlyCancelDatalength);
                    })
                    this.paginate(response.data.json.result && response.data.json.result, this.state.perPage, this.state.page, "ALL")
                    this.setState({
                        authAllHistoryCopy: response.data.json.result,
                        totalCountofpatients: response.data.json.result.length,
                        openData: monthlyOpenData,
                        approvedData: monthlyApprovedData,
                        rejectedData: monthlyRejectedData,
                        cancelData: monthlyCancelData,
                        xAxisValues: MonthsArray,
                        isLoaded: true
                    })
                })
        } else if ("YEARLY") {
            this.setState({
                selctedAuthdropdownValue: text,
                subMenuActive: "ALL",
                isLoaded: false
            })
            let yearlyArray = ["2017", "2018", "2019", "2020", "2021"];
            let yearlyOpenData = []; let yearlyApprovedData = []; let yearlyRejectedData = []; let yearlyCancelData = [];
            axios({
                method: 'GET',
                url: `/api/getReferalBasedOnStatus`,
                params: {
                    patient_type: "OUTPATIENT",
                    status: "ALL",
                    time_line: text
                }
            })
                .then((response) => {
                    yearlyArray.filter((mnth, index) => {
                        let yearlyOpenDatalength = (response.data.json.result && response.data.json.result.filter(el => moment((el.service_requested_date)).format("YYYY") === mnth)).filter(el => el.status == "OPEN").length;
                        let yearlyApprovedDatalength = (response.data.json.result && response.data.json.result.filter(el => moment((el.service_requested_date)).format("YYYY") === mnth)).filter(el => el.status == "APPROVED").length;
                        let yearlyRejectedDatalength = (response.data.json.result && response.data.json.result.filter(el => moment((el.service_requested_date)).format("YYYY") === mnth)).filter(el => el.status == "REJECTED").length;
                        let yearlyCancelDatalength = (response.data.json.result && response.data.json.result.filter(el => moment((el.service_requested_date)).format("YYYY") === mnth)).filter(el => el.status == "CANCEL").length;
                        yearlyOpenData.push(yearlyOpenDatalength);
                        yearlyApprovedData.push(yearlyApprovedDatalength);
                        yearlyRejectedData.push(yearlyRejectedDatalength);
                        yearlyCancelData.push(yearlyCancelDatalength);
                    })
                    this.paginate(response.data.json.result && response.data.json.result, this.state.perPage, this.state.page, "ALL")
                    this.setState({
                        authAllHistoryCopy: response.data.json.result,
                        totalCountofpatients: response.data.json.result.length,
                        openData: yearlyOpenData,
                        approvedData: yearlyApprovedData,
                        rejectedData: yearlyRejectedData,
                        cancelData: yearlyCancelData,
                        xAxisValues: yearlyArray,
                        isLoaded: true
                    })
                })
        } else {

        }
    }
    toggleForWarningMessage =() => {
        this.setState({
            showWarningModal: false
        })
    }
    render() {
        this.state.resArr && this.state.resArr.map((item) => {
            console.log(item,"item")
        })
        const authGraph = {
            chart: {
                height: 190,
                type: "column",
                zoomType: 'x',
                style: {
                    fontFamily: 'Open Sans',
                    fontSize: "10px"
                }
            },
            plotOptions: {
                series: {
                    pointWidth: 4
                }
            },
            title: {
                text: ""
            },

            credits: {
                enabled: false
            },
            yAxis: {
                title: {
                    text: 'AUTH REFERAL COUNT'
                }
            },
            xAxis: {
                categories: this.state.xAxisValues,
                crosshair: true,
            },

            colors: ['#06887b', '#536DFE', '#DF2F2F', '#7CB342'],
            series: [{
                name: 'Open',
                data: this.state.openData
            }, {
                name: 'Approved',
                data: this.state.approvedData
            }, {
                name: 'Rejected',
                data: this.state.rejectedData
            }, {
                name: 'Canceled',
                data: this.state.cancelData
            }]
        };
        let basicActive = this.state.basicActive;
        let subMenuActive = this.state.subMenuActive;
        const { collapseID } = this.state;
        const { collapseID2 } = this.state;
        return (
            <React.Fragment>
                <Head>
                    <title>Healthlligence</title>
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
                </Head>
                <Layout>
                    <MDBRow className="umtabs">
                        <MDBTabs className='mb-3' style={{ marginTop: "12px" }}>
                            <MDBTabsItem>
                                <MDBTabsLink onClick={() => this.handleBasicClick('tab1')} active={basicActive === 'tab1'}>
                                    Dashboard
                                </MDBTabsLink>
                            </MDBTabsItem>
                            <MDBTabsItem>
                                <MDBTabsLink onClick={() => this.handleBasicClick('tab2')} active={basicActive === 'tab2'}>
                                    Create Referral
                                </MDBTabsLink>
                            </MDBTabsItem>

                            <MDBTabsItem>
                                <MDBTabsLink onClick={() => this.handleBasicClick('tab3')} active={basicActive === 'tab3'}>
                                    Search Auth
                                </MDBTabsLink>
                            </MDBTabsItem>

                            <MDBTabsItem>
                                <MDBTabsLink onClick={() => this.handleBasicClick('tab4')} active={basicActive === 'tab4'}>
                                    Auth Status
                                </MDBTabsLink>
                            </MDBTabsItem>

                        </MDBTabs>

                        <MDBTabsContent className="umtabcontent">
                            <MDBTabsPane show={basicActive === 'tab1'} className="tab1">
                                <MDBRow>
                                    <MDBCol sm="12" md="12" lg="12">
                                        <MDBCard>
                                            <MDBCardBody>
                                                <MDBRow className="UnassignedQueues" style={{ paddingBottom: ".8rem" }}>
                                                    <div style={{ paddingLeft: "12px" }}>My Assignment</div>
                                                </MDBRow>
                                                <i style={{ float: "right", marginTop: "-34px", paddingBottom: ".5rem", color: "#424242", fontSize: "1.25rem" }} className={this.state.myAssignmentToggle === true ? "fa fa-angle-up rotate-icon" : "fa fa-angle-down"} onClick={this.myAssignmentToggle} />
                                                {/* <MDBRow>
                                                    <MDBCol md="11">
                                                        <MDBTypography tag="h5" className="card-title">My Assignment </MDBTypography>
                                                    </MDBCol>
                                                    <i style={{ float: "right", marginTop: "-34px", paddingBottom: ".5rem", color: "#424242" }} className={this.state.authorizationToggle === true ? "fa fa-angle-up rotate-icon" : "fa fa-angle-down"} onClick={this.authorizationToggle} />
                                                </MDBRow> */}
                                                {this.state.myAssignmentToggle &&
                                                    <>
                                                        <MDBRow>
                                                            <MDBCol md="6">
                                                                <MDBRow>
                                                                    <MDBCol md="12">
                                                                        <MDBTypography tag="h5" className="card-sub-title">Urgent Queue </MDBTypography>
                                                                    </MDBCol>
                                                                </MDBRow>
                                                                <div style={{ overflowX: "auto", width: "100%", display: "block" }}>
                                                                    <table className="oral-notification-table">
                                                                        <thead>
                                                                            <tr><th>Type</th><th>0-1D</th><th>2D</th><th>3D</th></tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>Medicare</td>
                                                                                {this.state.urgentMedicareRowObj && Object.values(this.state.urgentMedicareRowObj).map((arr, index) => {
                                                                                    return (
                                                                                        <td key={index} className={this.state.rowClicked === index && this.state.oralNotificationHeader === "Urgent Queue - Medicare" ? "selected" : ""} style={{ color: "#CA2128", fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, arr, "Urgent Queue - Medicare", index)}>{arr && arr.length}</td>
                                                                                    )
                                                                                })}
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Medical</td>
                                                                                {this.state.urgentMediclaimRowObj && Object.values(this.state.urgentMediclaimRowObj).map((arr, index) => {
                                                                                    return (
                                                                                        <td key={index} className={this.state.rowClicked === index && this.state.oralNotificationHeader === "Urgent Queue - Medical" ? "selected" : ""} style={{ color: "#CA2128", fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, arr, "Urgent Queue - Medical", index)}>{arr && arr.length}</td>
                                                                                    )
                                                                                })}
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Commercial</td>
                                                                                {this.state.urgentCommercialRowObj && Object.values(this.state.urgentCommercialRowObj).map((arr, index) => {
                                                                                    return (
                                                                                        <td key={index} className={this.state.rowClicked === index && this.state.oralNotificationHeader === "Urgent Queue - Commercial" ? "selected" : ""} style={{ color: "#CA2128", fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, arr, "Urgent Queue - Commercial", index)}>{arr && arr.length}</td>
                                                                                    )
                                                                                })}
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </MDBCol>
                                                            <MDBCol md="6">
                                                                <MDBRow>
                                                                    <MDBCol md="12">
                                                                        <MDBTypography tag="h5" className="card-sub-title">Oral Notification </MDBTypography>
                                                                    </MDBCol>
                                                                </MDBRow>
                                                                <div style={{ overflowX: "auto", width: "100%", display: "block" }}>
                                                                    <table className="oral-notification-table">
                                                                        <thead>
                                                                            <tr><th>Type</th><th>0-1D</th><th>2D</th><th>3D</th></tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>Medicare</td>
                                                                                {this.state.oralNotificationsObj && Object.values(this.state.oralNotificationsObj).map((arr, index) => {
                                                                                    return (
                                                                                        <td key={index} className={this.state.rowClicked === index && this.state.oralNotificationHeader === "Oral Notification - Medicare" ? "selected" : ""} style={{ color: "#CA2128", fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, arr, "Oral Notification - Medicare", index)}>{arr && arr.length}</td>
                                                                                    )
                                                                                })}
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </MDBCol>
                                                        </MDBRow>
                                                        <hr />
                                                        <MDBRow style={{ paddingBottom: "32px" }}>

                                                            <MDBCol md="6">
                                                                <MDBRow>
                                                                    <MDBCol md="12">
                                                                        <MDBTypography tag="h5" className="card-sub-title">Routine Medicare </MDBTypography>
                                                                    </MDBCol>
                                                                </MDBRow>
                                                                <MDBRow>
                                                                    <MDBCol md="12">
                                                                        <p className="myassignmentcount">{this.state.routineMedicareMyAssignmentArray && this.state.routineMedicareMyAssignmentArray.length}<span>Total</span></p>
                                                                    </MDBCol>
                                                                </MDBRow>
                                                                <div style={{ overflowX: "auto", width: "100%", display: "block" }}>
                                                                    <table className="routine-table">
                                                                        <thead>
                                                                            <tr><th>0-1D</th><th>2D</th><th>3D</th><th>4D</th><th>5D</th><th>6D</th><th>7D</th><th>8D</th><th>9D</th><th>10D</th><th>11D</th><th>12D</th><th>13D</th><th>14D</th></tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                {this.state.routineMedicareMyAssignment && Object.values(this.state.routineMedicareMyAssignment).map((arr, index) => {
                                                                                    return (
                                                                                        <td key={index} className={this.state.rowClicked === index && this.state.oralNotificationHeader === "Routine Medicare" ? "selected" : ""} style={{ fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, arr, "Routine Medicare", index)}>{arr && arr.length}</td>
                                                                                    )
                                                                                })}
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </MDBCol>
                                                            <MDBCol md="6">
                                                                <MDBRow>
                                                                    <MDBCol md="12">
                                                                        <MDBTypography tag="h5" className="card-sub-title">Routine Medi-cal / Commercial </MDBTypography>
                                                                    </MDBCol>
                                                                </MDBRow>
                                                                <MDBRow>
                                                                    <MDBCol md="12">
                                                                        <p className="myassignmentcount">{this.state.routineMedicalAndCommercialMyAssignmentArray && this.state.routineMedicalAndCommercialMyAssignmentArray.length}<span>Total</span></p>
                                                                    </MDBCol>
                                                                </MDBRow>
                                                                <div style={{ overflowX: "auto", width: "100%", display: "block" }}>
                                                                    <table className="routine-meical-table">
                                                                        <thead>
                                                                            <tr><th>0-1D</th><th>2D</th><th>3D</th><th>4D</th><th>5D</th></tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                {this.state.routineMediclaimMyAssignment && Object.values(this.state.routineMediclaimMyAssignment).map((arr, index) => {
                                                                                    return (
                                                                                        <td key={index} className={this.state.rowClicked === index && this.state.oralNotificationHeader === "Routine Medi-cal / Commercial" ? "selected" : ""} style={{ fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, arr, "Routine Medi-cal / Commercial", index)}>{arr && arr.length}</td>
                                                                                    )
                                                                                })}
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </MDBCol>
                                                        </MDBRow>
                                                    </>
                                                }
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>

                                <MDBCard className="Unassignedqueuecollapse">
                                    <MDBCollapseHeader onClick={this.toggleCollapse("collapse1")}>
                                        <MDBRow className="UnassignedQueues">
                                            <div style={{ paddingLeft: "8px" }}>Unassigned Queues</div>
                                            {/* <img style={{ height: "20px", width: "20px", marginLeft: "8px", marginTop: "2px" }} src="/images/outpatientqueryicon.png" alt='profileimage' id='profileimage' /> */}
                                        </MDBRow>

                                        <i style={{ float: "right", marginTop: "-20px", color: "#424242" }} className={collapseID === "collapse1" ? "fa fa-angle-up rotate-icon" : "fa fa-angle-down"} />
                                    </MDBCollapseHeader>
                                    <MDBCollapse id="collapse1" isOpen={collapseID}>
                                        <MDBCardBody>
                                            <MDBRow>
                                                <MDBCol md="4">
                                                    <MDBRow>
                                                        <MDBCol md="12">
                                                            <MDBTypography tag="h5" className="card-sub-title">Urgent Medicare</MDBTypography>
                                                        </MDBCol>
                                                    </MDBRow>
                                                    <div style={{ overflowX: "auto", width: "100%", display: "block" }}>
                                                        <table className="routine-meical-table">
                                                            <thead>
                                                                <tr><th>0-1D</th><th>2D</th><th>3D</th></tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    {this.state.urgentUnassignedMedicare && Object.values(this.state.urgentUnassignedMedicare).map((arr, index) => {
                                                                        return (
                                                                            <td key={index} className={this.state.rowClicked === index && this.state.oralNotificationHeader === "Urgent Medicare" ? "selected" : ""} style={{ color: "#CA2128", fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, arr, "Urgent Medicare", index)}>{arr && arr.length}</td>
                                                                        )
                                                                    })}
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </MDBCol>
                                                <MDBCol md="4">
                                                    <MDBRow>
                                                        <MDBCol md="12">
                                                            <MDBTypography tag="h5" className="card-sub-title">Urgent Medical/Commercial </MDBTypography>
                                                        </MDBCol>
                                                    </MDBRow>
                                                    <div style={{ overflowX: "auto", width: "100%", display: "block" }}>
                                                        <table className="routine-meical-table">
                                                            <thead>
                                                                <tr><th>0-1D</th><th>2D</th><th>3D</th></tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    {this.state.urgentMedicalUnassigned && Object.values(this.state.urgentMedicalUnassigned).map((arr, index) => {
                                                                        return (
                                                                            <td key={index} className={this.state.rowClicked === index && this.state.oralNotificationHeader === "Urgent Medical/Commercial" ? "selected" : ""} style={{ color: "#CA2128", fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, arr, "Urgent Medical/Commercial", index)}>{arr && arr.length}</td>
                                                                        )
                                                                    })}
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </MDBCol>
                                                <MDBCol md="4">
                                                    <MDBRow>
                                                        <MDBCol md="12">
                                                            <MDBTypography tag="h5" className="card-sub-title">Routine Medical/Commercial</MDBTypography>
                                                        </MDBCol>
                                                    </MDBRow>
                                                    <div style={{ overflowX: "auto", width: "100%", display: "block" }}>
                                                        <table className="routine-meical-table">
                                                            <thead>
                                                                <tr><th>0-1D</th><th>2D</th><th>3D</th><th>4D</th><th>5D</th></tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    {this.state.routineMedicalUnassigned && Object.values(this.state.routineMedicalUnassigned).map((arr, index) => {
                                                                        return (
                                                                            <td key={index} className={this.state.rowClicked === index && this.state.oralNotificationHeader === "Routine Medical/Commercial" ? "selected" : ""} style={{ fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, arr, "Routine Medical/Commercial", index)}>{arr && arr.length}</td>
                                                                        )
                                                                    })}
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow style={{ paddingBottom: "32px", marginTop: "20px" }}>

                                                <MDBCol md="6">
                                                    <MDBRow>
                                                        <MDBCol md="12">
                                                            <MDBTypography tag="h5" className="card-sub-title">Routine Medicare </MDBTypography>
                                                        </MDBCol>
                                                    </MDBRow>
                                                    <div style={{ overflowX: "auto", width: "100%", display: "block" }}>
                                                        <table className="routine-table">
                                                            <thead>
                                                                <tr><th>0-1D</th><th>2D</th><th>3D</th><th>4D</th><th>5D</th><th>6D</th><th>7D</th><th>8D</th><th>9D</th><th>10D</th><th>11D</th><th>12D</th><th>13D</th><th>14D</th></tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    {this.state.routineUnassignedMedicare && Object.values(this.state.routineUnassignedMedicare).map((arr, index) => {
                                                                        return (
                                                                            <td key={index} className={this.state.rowClicked === index && this.state.oralNotificationHeader === "Routine Medicare" ? "selected" : ""} style={{ fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, arr, "Routine Medicare", index)}>{arr && arr.length}</td>
                                                                        )
                                                                    })}
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </MDBCol>
                                                <MDBCol md="6">
                                                    <MDBRow>
                                                        <MDBCol md="12">
                                                            <MDBTypography tag="h5" className="card-sub-title">Retro/Appeal </MDBTypography>
                                                        </MDBCol>
                                                    </MDBRow>
                                                    {/* <MDBDataTable
                                                        small
                                                        hover={true}
                                                        responsive={true}
                                                        paging={false}
                                                        className="myassignmenttables"
                                                        searching={false}
                                                        data={this.state.unassignedDelay}
                                                    /> */}
                                                    <div style={{ overflowX: "auto", width: "100%", display: "block" }}>
                                                        <table className="routine-table">
                                                            <thead>
                                                                <tr><th>0-1D</th><th>2D</th><th>3D</th><th>4D</th><th>5D</th><th>6D</th><th>7D</th><th>8D</th><th>9D</th><th>10D</th><th>11D</th><th>12D</th><th>13D</th><th>14D</th></tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    {this.state.retroAppealAuthList && Object.values(this.state.retroAppealAuthList).map((arr, index) => {
                                                                        return (
                                                                            <td key={index} className={this.state.rowClicked === index && this.state.oralNotificationHeader === "Retro/Appeal" ? "selected" : ""} style={{ fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, arr, "Retro/Appeal", index)}>{arr && arr.length}</td>
                                                                        )
                                                                    })}
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </MDBCol>
                                            </MDBRow>


                                        </MDBCardBody>
                                    </MDBCollapse>
                                </MDBCard>

                                <MDBCard className="mt-3 Unassignedqueuecollapse">
                                    <MDBCollapseHeader onClick={this.toggleCollapse2("collapse2")}>
                                        <MDBRow className="UnassignedQueues">
                                            <div style={{ paddingLeft: "8px" }}>Assigned Queues </div>
                                            {/* <img style={{ height: "20px", width: "20px", marginLeft: "8px", marginTop: "2px" }} src="/images/outpatientqueryicon.png" alt='profileimage' id='profileimage' /> */}
                                        </MDBRow>
                                        <i style={{ float: "right", marginTop: "-20px", color: "#424242" }} className={collapseID2 === "collapse2" ? "fa fa-angle-up rotate-icon" : "fa fa-angle-down"} />
                                    </MDBCollapseHeader>
                                    <MDBCollapse id="collapse2" isOpen={collapseID2}>
                                        <MDBCardBody>
                                            {this.state.resArr && this.state.resArr.map((item, ind) => {
                                                return (
                                                    <>
                                                        <MDBRow className="justify-content-start patients-items-row" style={{ padding: "5px" }}>
                                                            <MDBCol sm="6" md="6" lg="6" className="align-items-center details">
                                                                <div className="circleClass" style={{backgroundColor:item.color}}>
                                                                    <span className="circletext">
                                                                        {item.fname.charAt(0).toUpperCase()}
                                                                    </span>
                                                                </div>
                                                                <div className="name-details">
                                                                    <span style={{ fontSize: "16px", color: "#424242", fontWeight: "600" }}>{item.fname + " " + item.lname}</span>
                                                                    <span style={{ fontSize: "14px", color: "#727272", marginLeft: "4px" }}>{item.role}</span>
                                                                </div>
                                                            </MDBCol>
                                                        </MDBRow>
                                                        <MDBRow style={{ paddingBottom: "32px" }}>
                                                            <MDBCol md="3">
                                                                <MDBRow>
                                                                    <MDBCol md="12">
                                                                        <MDBTypography tag="h5" className="card-sub-title">Urgents</MDBTypography>
                                                                    </MDBCol>
                                                                </MDBRow>
                                                                <div style={{ overflowX: "auto", width: "100%", display: "block" }}>
                                                                    <table className="routine-meical-table">
                                                                        <thead>
                                                                            <tr><th>0-1D</th><th>2D</th><th>3D</th></tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                {item.urgentMedicareObj && Object.values(item.urgentMedicareObj).map((arr, index) => {
                                                                                    return (
                                                                                        <td key={index} className={this.state.rowClicked === index && this.state.oralNotificationHeader === "Urgents" && this.state.assignementsindex === ind ? "selected" : ""} style={{ fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, arr, "Urgents", index, ind, item.fname)}>{arr && arr.length}</td>
                                                                                    )
                                                                                })}
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </MDBCol>
                                                            <MDBCol md="3">
                                                                <MDBRow>
                                                                    <MDBCol md="12">
                                                                        <MDBTypography tag="h5" className="card-sub-title">Medi-cal Routines </MDBTypography>
                                                                    </MDBCol>
                                                                </MDBRow>
                                                                <div style={{ overflowX: "auto", width: "100%", display: "block" }}>
                                                                    <table className="routine-meical-table">
                                                                        <thead>
                                                                            <tr><th>0-1D</th><th>2D</th><th>3D</th><th>4D</th><th>5D</th></tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                {item.medicalRoutinesObj && Object.values(item.medicalRoutinesObj).map((arr, index) => {
                                                                                    return (
                                                                                        <td key={index} className={this.state.rowClicked === index && this.state.oralNotificationHeader === "Medi-cal Routines" && this.state.assignementsindex === ind ? "selected" : ""} style={{ fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, arr, "Medi-cal Routines", index, ind, item.fname)}>{arr && arr.length}</td>
                                                                                    )
                                                                                })}
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </MDBCol>
                                                            <MDBCol md="6">
                                                                <MDBRow>
                                                                    <MDBCol md="12">
                                                                        <MDBTypography tag="h5" className="card-sub-title">Medicare Routines</MDBTypography>
                                                                    </MDBCol>
                                                                </MDBRow>
                                                                <div style={{ overflowX: "auto", width: "100%", display: "block" }}>
                                                                    <table className="routine-meical-table">
                                                                        <thead>
                                                                            <tr><th>0-1D</th><th>2D</th><th>3D</th><th>4D</th><th>5D</th><th>6D</th><th>7D</th><th>8D</th><th>9D</th><th>10D</th><th>11D</th><th>12D</th> <th>13D</th> <th>14D</th></tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                {item.medicareRoutinesObj && Object.values(item.medicareRoutinesObj).map((arr, index) => {
                                                                                    return (
                                                                                        <td key={index} className={this.state.rowClicked === index && this.state.oralNotificationHeader === "Medicare Routines" && this.state.assignementsindex === ind ? "selected" : ""} style={{ fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, arr, "Medicare Routines", index, ind, item.fname)}>{arr && arr.length}</td>
                                                                                    )
                                                                                })}
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </MDBCol>

                                                        </MDBRow>
                                                    </>
                                                )
                                            })}
                                        </MDBCardBody>
                                    </MDBCollapse>
                                </MDBCard>

                                {
                                    this.state.activateclick ?
                                        <MDBCard>
                                            <MDBCardBody id="box">
                                                <MDBRow>
                                                    <MDBCol md="8">
                                                        <MDBTypography tag="h5" className="card-title">{this.state.assignedQueName !== undefined ? this.state.assignedQueName + " - " + this.state.oralNotificationHeader : this.state.oralNotificationHeader}</MDBTypography>
                                                    </MDBCol>
                                                    <MDBCol sm="4" md="4" lg="4">
                                                        <div className="" style={{ float: "right", marginLeft: "2px", marginTop: "4px" }}>
                                                            <MDBIcon icon="search" className="assignmentsearchIcon" />
                                                            <input placeholder="Search" id="searching" className="assignmentsearching" type="text" />
                                                        </div>
                                                    </MDBCol>
                                                </MDBRow>
                                                <div style={{ overflowX: "auto", width: "100%", display: "block", padding: "10px 5px 20px 5px" }}>
                                                    <table className="">
                                                        <thead>
                                                            <tr><th>Requested Date</th><th>Patient Name</th><th>Auth No.</th><th>Place of Service</th><th>Valid From</th><th>Valid To</th><th>Status</th></tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.serachTableData && this.state.serachTableData.map((item) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{moment(item.request_received_date).format('YYYY/MM/DD')}</td>
                                                                        <td>{item.p_name}</td>
                                                                        <td style={{ color: "#db1962", textDecoration: "underline", fontWeight: "700" }} onClick={this.showAuthDetailsscreen.bind(this, item.id)}>{item.id}</td>
                                                                        <td>{item.p_address}</td>
                                                                        <td>{item.valid_from_date}</td>
                                                                        <td>{item.valid_to_date}</td>
                                                                        <td>{item.status}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </MDBCardBody>
                                        </MDBCard>
                                        : null
                                }

                            </MDBTabsPane>
                            <MDBTabsPane show={basicActive === 'tab2'} className="tab2">
                                {/* Authorization Details Section Start */}
                                <MDBRow>
                                    <MDBCol>
                                        <MDBCard>
                                            <MDBCardBody>
                                                <MDBRow className="UnassignedQueues" style={{ paddingBottom: ".8rem" }} onClick={this.authorizationToggle}> Authorization Details
                                                    {/* <img style={{ height: "20px", width: "20px", marginLeft: "8px", marginTop: "2px" }} src="/images/outpatientqueryicon.png" alt='profileimage' id='profileimage' /> */}
                                                    {/* {this.state.showServiceTypeMessage || this.state.showServiceCategoryErrorMessage || this.state.showServiceRequestErrorMessage || this.state.showValidPlaceErrorMessage || this.state.showFromDateErrorMessage || this.state.showToDateErrorMessage || this.state.showRecivedDateErrorMessage ? <MDBIcon style={{ color: "#db1962", fontSize: "16px", marginLeft: "8px", marginTop: "5px" }} icon="exclamation-circle" /> : ""} */}
                                                    {(this.state.selctedServiceType !== "" && this.state.serviceRequestDate !== "" && this.state.placeofService !== "" && this.state.fromDate !== "" && this.state.toDate !== "" && this.state.requestReceivedDate !== "" && this.state.errorShown) ? <img style={{ height: "20px", width: "20px", marginLeft: "8px", marginTop: "5px" }} src="/images/icons/checkmark.svg" alt='green_checkmark' id='green_checkmark' /> : ""}
                                                </MDBRow>

                                                <i style={{ float: "right", marginTop: "-34px", paddingBottom: ".5rem", color: "#424242" }} className={this.state.authorizationToggle === true ? "fa fa-angle-up rotate-icon" : "fa fa-angle-down"} onClick={this.authorizationToggle} />
                                                {this.state.authorizationToggle &&
                                                    <>
                                                        <MDBRow style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBSelect
                                                                    options={this.state.serviceTypes}
                                                                    // label="Priority Type"
                                                                    // selected="Priority Type"
                                                                    selected={this.state.selctedServiceType ? this.state.selctedServiceType : "Priority Type"}
                                                                    // getValue={(val) => this.handleSelectChange(val)}
                                                                    getTextContent={(text) => this.handleSelectChange(text)}
                                                                />
                                                                {this.state.selctedServiceType === "" && this.state.errorShown === true ?
                                                                    <div className="invalid-feedback" style={{ marginTop: "-.5rem" }}>
                                                                        Please provide a valid Priority Type.
                                                                    </div>: ""}
                                                            </MDBCol>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBDatePicker keyboard={true} format='MM/DD/YYYY' className="main-datepicker" emptyLabel={"Service Requested Date"} valueDefault={null} value={this.state.serviceRequestDate} getValue={(value) => this.handleserviceRequestDate(value)} />
                                                                {this.state.serviceRequestDate === "" &&  this.state.errorShown === true ?
                                                                    <div className="invalid-feedback" style={{ marginTop: ".2rem" }}>
                                                                        Please provide a valid service requested date.
                                                                    </div> : ""}
                                                            </MDBCol>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBSelect
                                                                    options={this.state.placeofServiceCategories}
                                                                    // label="Place of Servive"
                                                                    // selected="Place of Service"
                                                                    selected={this.state.placeofService ? this.state.placeofService : "Place of Service"}
                                                                    // getValue={(val) => this.handlePlaceofService(val)}
                                                                    getTextContent={(text) => this.handlePlaceofService(text)}
                                                                />
                                                                {this.state.placeofService === "" && this.state.errorShown === true ? 
                                                                    <div className="invalid-feedback" style={{ marginTop: "-.5rem" }}>
                                                                        Please provide a valid place of service.
                                                                    </div> : ""}
                                                            </MDBCol>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBDatePicker format='MM/DD/YYYY' keyboard={true} className="main-datepicker" emptyLabel={'Request Received Date'} valueDefault={null} value={this.state.requestReceivedDate} getValue={(value) => this.handleRequestReceivedDate(value)} />
                                                                {this.state.requestReceivedDate === "" && this.state.errorShown === true ? 
                                                                    <div className="invalid-feedback">
                                                                        Please provide a valid requested recived date.
                                                                    </div>:""}
                                                            </MDBCol>
                                                        </MDBRow>
                                                        <MDBRow style={{ marginTop: "-10px", marginBottom: "32px", paddingLeft: "5px", paddingRight: "5px" }}>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBDatePicker format='MM/DD/YYYY' keyboard={true} className="main-datepicker" emptyLabel={'Valid From'} valueDefault={null} value={this.state.fromDate} getValue={(value) => this.handleFromDate(value)} />
                                                                {this.state.fromDate === "" && this.state.errorShown === true ? 
                                                                    <div className="invalid-feedback">
                                                                        Please provide a valid date.
                                                                    </div>:""}
                                                            </MDBCol>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBDatePicker format='MM/DD/YYYY' keyboard={true} className="main-datepicker" emptyLabel={'Valid To'} valueDefault={null} value={this.state.toDate} getValue={(value) => this.handleToDate(value)} />
                                                                {this.state.toDate === "" && this.state.errorShown === true ?
                                                                    <div className="invalid-feedback">
                                                                        Please provide a valid date.
                                                                    </div>:""}
                                                            </MDBCol>
                                                        </MDBRow>
                                                    </>
                                                }
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                                {/* Authorization Details Section End */}
                                {/* Patient Details Information Start */}
                                <MDBRow>
                                    <MDBCol>
                                        <MDBCard>
                                            <MDBCardBody closeSearchPatientDetails={this.closeSearchPatientDetails}>
                                                <MDBRow className="UnassignedQueues" style={{ paddingBottom: ".8rem" }} onClick={this.patientDetailsToggle}> Patient Details/ Information
                                                    {/* <MDBIcon style={{ color: "#db1962", fontSize: "16px", marginLeft: "8px", marginTop: "5px" }} icon="exclamation-circle" /> */}
                                                    {this.state.selectedPatientData.length > 0 ? <img style={{ height: "20px", width: "20px", marginLeft: "8px", marginTop: "5px" }} src="/images/icons/checkmark.svg" alt='green_checkmark' id='green_checkmark' /> : ""}
                                                    {/* <img style={{ height: "20px", width: "20px", marginLeft: "8px", marginTop: "2px" }} src="/images/outpatientqueryicon.png" alt='profileimage' id='profileimage' /> */}
                                                </MDBRow>
                                                <i style={{ float: "right", marginTop: "-34px", paddingBottom: ".5rem", color: "#424242" }} className={this.state.patientDetailsToggle === true ? "fa fa-angle-up rotate-icon" : "fa fa-angle-down"} onClick={this.patientDetailsToggle} />
                                                {this.state.patientDetailsToggle &&
                                                    <>
                                                        {this.state.selectedPatientData.length === 0 && this.state.errorShown === true ?
                                                            <div className="invalid-feedback" style={{marginTop:"-10px", marginBottom:"10px"}}>
                                                                Please select the patient from search field.
                                                            </div>:""}
                                                        <div className="" style={{ marginBottom: "32px", marginTop: "4px" }}>
                                                            <MDBIcon icon="search" className="caremanagerlistsearchIcon" style={{ color: "#424242" }} />
                                                            <input placeholder="Patient Name or HP Member ID or DOB" id="searching" className="caremanagerlistsearching" type="text" value={this.state.searchedText} onChange={this.onHandleSearch.bind(this)} onFocus={this.getCareTeamDetailsSearch} />
                                                        </div>
                                                        <div style={{ marginTop: "-32px" }} className={this.state.searchStarts && this.state.oldPatientDetails.length > 0 && this.state.searchedText !== "" ? 'contact-list' : 'contact-list hide'}>
                                                            {
                                                                this.state.oldPatientDetails && this.state.oldPatientDetails.map((el) => {
                                                                    return (
                                                                        <MDBRow className="">
                                                                            <div className="patient-details" style={{ display: "flex", padding: "5px 20px", cursor: "pointer" }} onClick={this.showSelectedPatientDetails.bind(this, el)}>
                                                                                <div style={{ margin: " 0px 5px" }}>{el._source.firstname + " " + el._source.lastname}</div>
                                                                                <div style={{ margin: " 0px 5px" }}>{el._source.patient_id}</div>
                                                                                <div style={{ margin: " 0px 5px" }}>{moment(el._source.dateofbirth).format('MM/DD/YYYY')}</div>
                                                                            </div>
                                                                        </MDBRow>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                        {this.state.selectedPatientData && this.state.selectedPatientData.map(el => {
                                                            return (
                                                                <>
                                                                    {/* <MDBRow className=""> */}
                                                                    <div className="patient-details" style={{ marginLeft: "-20px", display: "flex", flexWrap: "wrap", marginTop: "-20px", padding: "5px 10px" }}>
                                                                        <div className="patient-detail">
                                                                            <div className="header">HP Member ID</div>
                                                                            <div className="value">12365P</div>
                                                                        </div>
                                                                        <div className="patient-detail">
                                                                            <div className="header">Patient Name</div>
                                                                            <div className="value">{el._source.firstname + " " + el._source.lastname}</div>
                                                                        </div>
                                                                        <div className="patient-detail">
                                                                            <div className="header">DOB</div>
                                                                            <div className="value">{moment(el._source.dateofbirth).format('MM/DD/YYYY')}</div>
                                                                        </div>
                                                                        <div className="patient-detail">
                                                                            <div className="header">Language</div>
                                                                            <div className="value">{el._source.language}</div>
                                                                        </div>
                                                                        <div className="patient-detail">
                                                                            <div className="header">Age</div>
                                                                            <div className="value">{parseInt(moment(new Date()).format('YYYY')) - parseInt(moment(el._source.dateofbirth).format('YYYY'))}</div>
                                                                        </div>
                                                                        <div className="patient-detail">
                                                                            <div className="header">Sex</div>
                                                                            <div className="value">{el._source.gender}</div>
                                                                        </div>
                                                                        <div className="patient-detail">
                                                                            <div className="header">HP Effective Date</div>
                                                                            <div className="value">12/16/1971</div>
                                                                        </div>
                                                                        <div className="patient-detail">
                                                                            <div className="header">MR#</div>
                                                                            <div className="value">{el._source.patient_id}</div>
                                                                        </div>
                                                                        <div className="patient-detail">
                                                                            <div className="header">Guardian/POA Name</div>
                                                                            <div className="value">Jenni Garth</div>
                                                                        </div>
                                                                        <div className="patient-detail">
                                                                            <div className="header">Cell/Phone Number</div>
                                                                            <div className="value">{el._source.primaryphone}</div>
                                                                        </div>
                                                                        <div className="patient-detail">
                                                                            <div className="header">Address</div>
                                                                            <div className="value">{el._source.address}</div>
                                                                        </div>
                                                                        <div className="patient-detail">
                                                                            <div className="header">LOB</div>
                                                                            <div className="value">Medicare</div>
                                                                        </div>
                                                                    </div>
                                                                    {/* </MDBRow> */}
                                                                    <MDBRow style={{ marginTop: "15px" }}><MDBCol className="" style={{ fontSize: "16px", fontWeight: "700", color: "#424242" }}>Primary Doctor Details/Information</MDBCol></MDBRow>

                                                                    <div className="patient-details" style={{ marginLeft: "-20px", display: "flex", flexWrap: "wrap", padding: "5px 10px 32px 10px" }} onClick={this.showSelectedPatientDetails.bind(this, el)}>
                                                                        <div className="patient-detail">
                                                                            <div className="header">PCP ID</div>
                                                                            <div className="value">P7896</div>
                                                                        </div>
                                                                        <div className="patient-detail">
                                                                            <div className="header">PCP Effective Date</div>
                                                                            <div className="value">01/11/2003</div>
                                                                        </div>
                                                                        <div className="patient-detail">
                                                                            <div className="header">PCP Name</div>
                                                                            <div className="value">{el._source.pcpname}</div>
                                                                        </div>
                                                                        <div className="patient-detail">
                                                                            <div className="header">PCP Cell/Phone Number</div>
                                                                            <div className="value">{el._source.pcpphone}</div>
                                                                        </div>
                                                                        <div className="patient-detail">
                                                                            <div className="header">PCP Fax</div>
                                                                            <div className="value">909-383-0291</div>
                                                                        </div>
                                                                        <div className="patient-detail">
                                                                            <div className="header">PCP Made Aware of Request</div>
                                                                            <div className="value">Yes</div>
                                                                        </div>
                                                                    </div>

                                                                </>
                                                            )
                                                        })}
                                                    </>
                                                }
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                                {/* Patient Details Information End */}
                                {/* Requesting Provider Details Start */}
                                <MDBRow>
                                    <MDBCol>
                                        <MDBCard>
                                            <MDBCardBody>
                                                <MDBRow className="UnassignedQueues" style={{ paddingBottom: ".8rem" }} onClick={this.RequestingProviderDetailsToggle}> Requesting Provider Details
                                                    {(this.state.requestingProviderId !=="" && this.state.requestingProviderDetailsName !=="" && this.state.requestingProviderDetailsSpeciality !=="" && this.state.requestingProviderDetailsGroup !=="" && this.state.requestingProviderCell !=="" && this.state.requestingProviderFax !=="" && this.state.errorShown) ? <img style={{ height: "20px", width: "20px", marginLeft: "8px", marginTop: "5px" }} src="/images/icons/checkmark.svg" alt='green_checkmark' id='green_checkmark' /> : ""}
                                                    {/* <img style={{ height: "20px", width: "20px", marginLeft: "8px", marginTop: "2px" }} src="/images/outpatientqueryicon.png" alt='profileimage' id='profileimage' /> */}
                                                </MDBRow>
                                                <i style={{ float: "right", marginTop: "-34px", paddingBottom: ".5rem", color: "#424242" }} className={this.state.requestingproviderdetails === true ? "fa fa-angle-up rotate-icon" : "fa fa-angle-down"} onClick={this.RequestingProviderDetailsToggle} />
                                                {this.state.requestingproviderdetails &&
                                                    <>
                                                        <MDBRow style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBInput label="Requesting Provider ID" value={this.state.requestingProviderId} onChange={this.requestingProviderIdChange} />
                                                                {this.state.requestingProviderId ==="" && this.state.errorShown === true ?
                                                                    <div className="invalid-feedback">
                                                                        Please provide a valid Requesting Provider ID.
                                                                    </div>:""}
                                                            </MDBCol>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBInput label="Name" value={this.state.requestingProviderDetailsName} onChange={this.requestingProviderDetailsNameChange} />
                                                                {this.state.requestingProviderDetailsName ==="" && this.state.errorShown === true ?
                                                                    <div className="invalid-feedback">
                                                                        Please provide a valid Name.
                                                                    </div>:""}
                                                            </MDBCol>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBInput label="Speciality" value={this.state.requestingProviderDetailsSpeciality} onChange={this.requestingProviderDetailsSpecialityChange} />
                                                                {this.state.requestingProviderDetailsSpeciality ===""  && this.state.errorShown === true ?
                                                                    <div className="invalid-feedback">
                                                                        Please provide a valid Speciality.
                                                                    </div>:""}
                                                            </MDBCol>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBInput label="Affiliated Group" value={this.state.requestingProviderDetailsGroup} onChange={this.requestingProviderDetailsGroupChange} />
                                                                {this.state.requestingProviderDetailsGroup ==="" && this.state.errorShown === true ?
                                                                    <div className="invalid-feedback">
                                                                        Please provide a valid Affiliated Group.
                                                                    </div>:""}
                                                            </MDBCol>
                                                        </MDBRow>
                                                        <MDBRow style={{ marginBottom: "32px", paddingLeft: "5px", paddingRight: "5px" }}>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBInput label="Cell/Phone" value={this.state.requestingProviderCell} onChange={this.requestingProviderCellChange} />
                                                                {this.state.requestingProviderCell ==="" && this.state.errorShown === true ?
                                                                    <div className="invalid-feedback">
                                                                        Please provide a valid Cell/Phone.
                                                                    </div>:""}
                                                            </MDBCol>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBInput label="Fax" value={this.state.requestingProviderFax} onChange={this.requestingProviderFaxChange} />
                                                                {this.state.requestingProviderFax ==="" && this.state.errorShown === true ?
                                                                    <div className="invalid-feedback">
                                                                        Please provide a valid Fax number.
                                                                    </div>:""}
                                                            </MDBCol>
                                                        </MDBRow>
                                                    </>
                                                }
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                                {/* Requesting Provider Details End */}
                                {/* Referred to Provider Details Start */}
                                <MDBRow>
                                    <MDBCol>
                                        <MDBCard>
                                            <MDBCardBody>
                                                <MDBRow className="UnassignedQueues" style={{ paddingBottom: ".8rem" }} onClick={this.RefferedProviderDetailsToggle}> Referred to Provider Details
                                                    {(this.state.referredProviderId !== "" && this.state.referredProviderDetailsName !=="" && this.state.referredProviderDetailsSpeciality !=="" && this.state.referredProviderDetailsGroup!=="" && this.state.referredProviderCell !=="" && this.state.referredProviderFax !=="" && this.state.providerdetailsdescription !=="" && this.state.errorShown) ? <img style={{ height: "20px", width: "20px", marginLeft: "8px", marginTop: "5px" }} src="/images/icons/checkmark.svg" alt='green_checkmark' id='green_checkmark' /> : ""}
                                                    {/* <img style={{ height: "20px", width: "20px", marginLeft: "8px", marginTop: "2px" }} src="/images/outpatientqueryicon.png" alt='profileimage' id='profileimage' /> */}
                                                </MDBRow>

                                                <i style={{ float: "right", marginTop: "-34px", paddingBottom: ".5rem", color: "#424242" }} className={this.state.refferedproviderdetails === true ? "fa fa-angle-up rotate-icon" : "fa fa-angle-down"} onClick={this.RefferedProviderDetailsToggle} />
                                                {this.state.refferedproviderdetails &&
                                                    <>
                                                        <MDBRow style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBInput label="Requesting Provider ID" value={this.state.referredProviderId} onChange={this.referredProviderIdChange} />
                                                                {this.state.referredProviderId ==="" && this.state.errorShown === true ?
                                                                    <div className="invalid-feedback">
                                                                        Please provide a valid Requesting Provider ID.
                                                                    </div>:""}
                                                            </MDBCol>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBInput label="Name" value={this.state.referredProviderDetailsName} onChange={this.referredProviderDetailsNameChange} />
                                                                {this.state.referredProviderDetailsName ==="" && this.state.errorShown === true ?
                                                                    <div className="invalid-feedback">
                                                                        Please provide a valid Name.
                                                                    </div>:""}
                                                            </MDBCol>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBInput label="Speciality" value={this.state.referredProviderDetailsSpeciality} onChange={this.referredProviderDetailsSpecialityChange} />
                                                                {this.state.referredProviderDetailsSpeciality ==="" && this.state.errorShown === true ?
                                                                    <div className="invalid-feedback">
                                                                        Please provide a valid Speciality.
                                                                    </div>:""}
                                                            </MDBCol>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBInput label="Affiliated Group" value={this.state.referredProviderDetailsGroup} onChange={this.referredProviderDetailsGroupChange} />
                                                                {this.state.referredProviderDetailsGroup ==="" && this.state.errorShown === true ?
                                                                    <div className="invalid-feedback">
                                                                        Please provide a valid Affiliated Group.
                                                                    </div>:""}
                                                            </MDBCol>
                                                        </MDBRow>
                                                        <MDBRow style={{ marginBottom: "32px", paddingLeft: "5px", paddingRight: "5px" }}>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBInput label="Cell/Phone" value={this.state.referredProviderCell} onChange={this.referredProviderCellChange} />
                                                                {this.state.referredProviderCell ==="" && this.state.errorShown === true ?
                                                                    <div className="invalid-feedback">
                                                                        Please provide a valid Cell/Phone.
                                                                    </div>:""}
                                                            </MDBCol>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBInput label="Fax" value={this.state.referredProviderFax} onChange={this.referredProviderFaxChange} />
                                                                {this.state.referredProviderFax ==="" && this.state.errorShown === true ?
                                                                    <div className="invalid-feedback">
                                                                        Please provide a valid Fax number.
                                                                    </div>:""}
                                                            </MDBCol>
                                                            <MDBCol sm="12" md="6" lg="6">
                                                                <div className="goalcardbody createedumodal">
                                                                    {/* <MDBInput type="textarea" label="Provider Details" onChange={this.handleNotedescriptionchnage} value={this.state.notedescription}></MDBInput> */}
                                                                    <MDBInput type="textarea" label="Provider Details" onChange={this.handleproviderdetailschange} value={this.state.providerdetailsdescription} />
                                                                    
                                                                </div>
                                                                {this.state.providerdetailsdescription ==="" && this.state.errorShown === true ?
                                                                    <div className="invalid-feedback">
                                                                        Please provide a valid Provider Details.
                                                                    </div>:""}
                                                            </MDBCol>
                                                        </MDBRow>
                                                    </>
                                                }

                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                                {/* Referred to Provider Details End */}
                                {/* Add Diagnosis Start */}
                                <MDBRow>
                                    <MDBCol>
                                        <MDBCard onClick={this.closeDiagnosisSearchBar}>
                                            <MDBCardBody>
                                                <MDBRow className="UnassignedQueues" style={{ paddingBottom: ".8rem" }} onClick={this.AdddiagnosisToggle}> Add Diagnosis
                                                    {this.state.usersdata.rows && this.state.usersdata.rows.length > 0 ? <img style={{ height: "20px", width: "20px", marginLeft: "8px", marginTop: "5px" }} src="/images/icons/checkmark.svg" alt='green_checkmark' id='green_checkmark' /> : ""}
                                                    {/* <img style={{ height: "20px", width: "20px", marginLeft: "8px", marginTop: "2px" }} src="/images/outpatientqueryicon.png" alt='profileimage' id='profileimage' /> */}
                                                </MDBRow>

                                                <i style={{ float: "right", marginTop: "-34px", paddingBottom: ".5rem", color: "#424242" }} className={this.state.adddiagnosisdetails === true ? "fa fa-angle-up rotate-icon" : "fa fa-angle-down"} onClick={this.AdddiagnosisToggle} />
                                                {this.state.adddiagnosisdetails &&
                                                    <>
                                                        {this.state.usersdata.rows.length === 0 && this.state.errorShown === true ?
                                                            <div className="invalid-feedback" style={{ marginBottom:"10px"}}>
                                                                Please select the Diagnosis details from search field.
                                                            </div>:""}
                                                        <div className="" style={{ marginBottom: "10px", marginTop: "4px" }}>
                                                            <MDBIcon icon="search" className="caremanagerlistsearchIcon" style={{ color: "#424242" }} />
                                                            <input placeholder="Search Diagnosis" id="searching" className="caremanagerlistsearching" type="text" value={this.state.adddiagnosisDetailsText} onChange={this.onHandleadddiagnosisSearch.bind(this)} onFocus={this.addDiagnosisSearch} />
                                                        </div>
                                                        <div className={(this.state.adddiagnosissearchStarts && this.state.adddiagnosisDetailsList.length > 0 && this.state.adddiagnosisDetailsText !== "") ? 'contact-list1' : 'contact-list1 hide'}>
                                                            {
                                                                this.state.adddiagnosisDetailsList && this.state.adddiagnosisDetailsList.map((el, index) => {
                                                                    return (
                                                                        <MDBRow className="">
                                                                            <div className="patient-details" style={{ display: "flex", padding: "5px 20px", cursor: "pointer" }} onClick={this.showSelectedadddiagnosisDetails.bind(this, el, index)}>
                                                                                <div style={{ margin: " 0px 5px" }}>{el._source.code}</div>
                                                                                <div style={{ margin: " 0px 5px" }}>{el._source.description}</div>
                                                                            </div>
                                                                        </MDBRow>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                        <div style={{ marginBottom: "32px" }}>
                                                            <MDBDataTableV5
                                                                hover
                                                                responsive
                                                                data={this.state.usersdata}
                                                                paging={false}
                                                                searchBottom={false}
                                                            />

                                                        </div>
                                                    </>
                                                }
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                                {/* Add Diagnosis End */}
                                <MDBRow>
                                    <MDBCol>
                                        <MDBCard>
                                            <MDBCardBody>
                                                <MDBRow className="UnassignedQueues" style={{ paddingBottom: ".8rem" }} onClick={this.ServiceRequestToggle}> Service Request
                                                    {(this.state.servicerequestProviderData.length > 0 && this.state.quantity !=="" && this.state.modifier !=="" && this.state.finacialResponsibility !=="" && this.state.covered !=="" && this.state.errorShown) ? <img style={{ height: "20px", width: "20px", marginLeft: "8px", marginTop: "5px" }} src="/images/icons/checkmark.svg" alt='green_checkmark' id='green_checkmark' /> : ""}
                                                    {/* <img style={{ height: "20px", width: "20px", marginLeft: "8px", marginTop: "2px" }} src="/images/outpatientqueryicon.png" alt='profileimage' id='profileimage' /> */}
                                                </MDBRow>

                                                <i style={{ float: "right", marginTop: "-34px", paddingBottom: ".5rem", color: "#424242" }} className={this.state.servicerequestdetails === true ? "fa fa-angle-up rotate-icon" : "fa fa-angle-down"} onClick={this.ServiceRequestToggle} />
                                                {this.state.servicerequestdetails &&
                                                    <>
                                                        {this.state.servicerequestProviderData.length === 0 && this.state.errorShown === true ?
                                                            <div className="invalid-feedback" style={{ marginBottom:"10px"}}>
                                                                Please select the Service details from search field.
                                                            </div>:""}
                                                        <div className="" style={{ marginBottom: "32px", marginTop: "4px" }}>
                                                            <MDBIcon icon="search" className="caremanagerlistsearchIcon" style={{ color: "#424242" }} />
                                                            <input placeholder="Search Service" id="searching" className="caremanagerlistsearching" type="text" value={this.state.servicerequestDetailsText} onChange={this.onHandleaservicerequestSearch.bind(this)} onFocus={this.serviceRequestSearch} />
                                                        </div>
                                                        <div style={{ marginTop: "-32px" }} className={this.state.servicerequestsearchStarts && this.state.servicerequestDetailsList.length > 0 && this.state.servicerequestDetailsText !== "" ? 'contact-list' : 'contact-list hide'}>
                                                            {
                                                                this.state.servicerequestDetailsList && this.state.servicerequestDetailsList.map((el) => {
                                                                    return (
                                                                        <MDBRow className="">
                                                                            <div className="patient-details" style={{ display: "flex", padding: "5px 20px", cursor: "pointer" }} onClick={this.showSelectedServiceRequestDetails.bind(this, el)}>
                                                                                <div style={{ margin: " 0px 5px" }}>{el._source.code + " " + el._source.description}</div>
                                                                            </div>
                                                                        </MDBRow>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                        {this.state.servicerequestProviderData && this.state.servicerequestProviderData.map(el => {
                                                            return (
                                                                <>
                                                                    <div className="">
                                                                        <div className="patient-details" style={{ marginLeft: "-20px", display: "flex", flexWrap: "wrap", padding: "5px 10px" }}>
                                                                            <MDBCol sm="6" md="3" lg="3" style={{ margin: "10px 0px" }}>
                                                                                <div className="header">Service Code</div>
                                                                                <div className="value">{el._source.code}</div>
                                                                            </MDBCol>
                                                                            <MDBCol sm="6" md="3" lg="3" style={{ margin: "10px 0px" }}>
                                                                                <div className="header">Service Code Description</div>
                                                                                <div className="value">{el._source.description}</div>
                                                                            </MDBCol>
                                                                            <MDBCol sm="12" md="6" lg="6" style={{ margin: "10px 0px" }}>
                                                                                <div className="header">Division of Financially Responsibility</div>
                                                                                <div className="value"><img src="/images/icons/pdf.svg" /><a href="https://www.lacare.org/sites/default/files/medi-cal-shared-risk-amendment-template.pdf" target="_blank" style={{ color: "#15C", marginLeft: "5px" }} >https://www.lacare.org/sites/default/files/medi-cal-shared-risk-amendment-template.pdf</a>
                                                                                </div>
                                                                            </MDBCol>
                                                                        </div>

                                                                        <div className="patient-details" style={{ marginLeft: "-20px", marginTop: "-30px", display: "flex", flexWrap: "wrap", padding: "5px 10px", marginBottom: "32px" }}>
                                                                            <MDBCol sm="6" md="3" lg="3" style={{ margin: "10px 0px" }}>
                                                                                <MDBInput label="Quantity/Units" value={this.state.quantity} onChange={this.quantityHandler} />
                                                                                {this.state.quantity === "" && this.state.errorShown === true ?
                                                                                    <div className="invalid-feedback" style={{ marginBottom:"10px"}}>
                                                                                        Please selecte a valid Quantity/Units details.
                                                                                    </div>:""}
                                                                            </MDBCol>
                                                                            <MDBCol sm="6" md="3" lg="3" style={{ margin: "10px 0px" }}>
                                                                                <MDBInput label="Modifier" value={this.state.modifier} onChange={this.modifierHandler} />
                                                                                {this.state.modifier === "" && this.state.errorShown === true ?
                                                                                    <div className="invalid-feedback" style={{ marginBottom:"10px"}}>
                                                                                        Please selecte a valid modifier details.
                                                                                    </div>:""}
                                                                            </MDBCol>
                                                                            <MDBCol sm="6" md="3" lg="3" style={{ margin: "10px 0px" }}>
                                                                                <MDBInput label="Financial Responsibilty" value={this.state.finacialResponsibility} onChange={this.finacialResponsibilityHandler} />
                                                                                {this.state.finacialResponsibility === "" && this.state.errorShown === true ?
                                                                                    <div className="invalid-feedback" style={{ marginBottom:"10px"}}>
                                                                                        Please selecte a valid Financial Responsibilty details.
                                                                                    </div>:""}
                                                                            </MDBCol>
                                                                            <MDBCol sm="6" md="3" lg="3" style={{ margin: "10px 0px" }}>
                                                                                <MDBInput label="Covered" value={this.state.covered} onChange={this.coveredHandler} />
                                                                                {this.state.covered === "" && this.state.errorShown === true ?
                                                                                    <div className="invalid-feedback" style={{ marginBottom:"10px"}}>
                                                                                        Please selecte a valid Covered details
                                                                                    </div>:""}
                                                                            </MDBCol>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )
                                                        })}
                                                    </>
                                                }
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>


                                <div className="text-center buttons-container" style={{ marginBottom: "96px" }}>
                                    <MDBBtn className="cancel-button">CANCEL</MDBBtn>
                                    <MDBBtn color="" className="next-button" onClick={this.validateDetails}>SAVE</MDBBtn>
                                </div>
                                { /* End of Patient Details Card */}
                            </MDBTabsPane>
                            <MDBTabsPane show={basicActive === 'tab3'} className="tab3">
                                <MDBRow>
                                    <MDBCol>
                                        <MDBCard>
                                            <MDBCardBody>
                                                <MDBRow className="UnassignedQueues" style={{ paddingBottom: ".8rem" }} onClick={this.authorizationauthToggle}> Authorization Details
                                                    {/* <img style={{ height: "20px", width: "20px", marginLeft: "8px", marginTop: "2px" }} src="/images/outpatientqueryicon.png" alt='profileimage' id='profileimage' /> */}
                                                </MDBRow>

                                                <i style={{ float: "right", marginTop: "-34px", paddingBottom: ".5rem", color: "#424242" }} className={this.state.authorizationauthToggle === true ? "fa fa-angle-up rotate-icon" : "fa fa-angle-down"} onClick={this.authorizationauthToggle} />
                                                {this.state.authorizationauthToggle &&
                                                    <>
                                                        <MDBRow style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBInput label="Authorization Number" value={this.state.authorizationnumber} onChange={this.handleAuthorizationNumber} />
                                                            </MDBCol>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBSelect
                                                                    options={this.state.searchauthstatus}
                                                                    // label="Status"
                                                                    selected="Status"
                                                                    className="authorization-dropdown"
                                                                    // selected={this.state.selectedsearchauthstatus}
                                                                    // getValue={(val) => this.handleselectedsearchauthstatus(val)}
                                                                    getTextContent={(text) => this.handleselectedsearchauthstatus(text)}
                                                                />

                                                            </MDBCol>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBDatePicker keyboard={true} format='MM/DD/YYYY' className="main-datepicker" emptyLabel={"Request / Received Date"} valueDefault={null} value={this.state.authrequestreceivedate} getValue={(value) => this.handleauthRequestReceiveDate(value)} />
                                                            </MDBCol>
                                                            {/* <MDBCol sm="6" md="3" lg="3">
                                                                <MDBDatePicker keyboard={true} format='DD/MM/YYYY' className="main-datepicker" emptyLabel={"Request Received Date"} valueDefault={null} value={this.state.authrequestreceivedate1} getValue={(value) => this.handleauthRequestReceiveDate1(value)} />
                                                            </MDBCol> */}
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBSelect
                                                                    options={this.state.serviceTypes}
                                                                    // label="Priority Type"
                                                                    selected="Priority Type"
                                                                    // selected={this.state.selectedprioritytype}
                                                                    getValue={(val) => this.handleselectedPriorityType(val)}
                                                                // getTextContent={(text) => this.handleselectedPriorityType(text)}
                                                                />
                                                            </MDBCol>
                                                        </MDBRow>
                                                        <MDBRow style={{ marginTop: "-10px", marginBottom: "32px", paddingLeft: "5px", paddingRight: "5px" }}>
                                                            {/* <MDBCol sm="6" md="3" lg="3">
                                                                <MDBDatePicker keyboard={true} format='DD/MM/YYYY' className="main-datepicker" emptyLabel={"Authorization Date"} valueDefault={null} value={this.state.authauthorizationdate} getValue={(value) => this.handleauthaurizationdate(value)} />
                                                            </MDBCol> */}
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBDatePicker keyboard={true} format='MM/DD/YYYY' className="main-datepicker" emptyLabel={"Final Decision Date"} valueDefault={null} value={this.state.authfinaldecisiondate} getValue={(value) => this.handleauthFinalDecisionDate(value)} />
                                                            </MDBCol>
                                                        </MDBRow>
                                                    </>
                                                }
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <MDBCard>
                                            <MDBCardBody>
                                                <MDBRow className="UnassignedQueues" style={{ paddingBottom: ".8rem" }} onClick={this.MemberDetailsAuthToggle}> Member / Patient Details
                                                    {/* <img style={{ height: "20px", width: "20px", marginLeft: "8px", marginTop: "2px" }} src="/images/outpatientqueryicon.png" alt='profileimage' id='profileimage' /> */}
                                                </MDBRow>

                                                <i style={{ float: "right", marginTop: "-34px", paddingBottom: ".5rem", color: "#424242" }} className={this.state.memberauthtoggle === true ? "fa fa-angle-up rotate-icon" : "fa fa-angle-down"} onClick={this.MemberDetailsAuthToggle} />
                                                {this.state.memberauthtoggle &&
                                                    <>
                                                        <MDBRow style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBInput label="Member ID" value={this.state.authmemberid} onChange={this.handleAuthMemberId} />
                                                            </MDBCol>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBInput label="First Name" value={this.state.authfirstname} onChange={this.handleAuthFirstName} />
                                                            </MDBCol>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBInput label="Last Name" value={this.state.authlastname} onChange={this.handleAuthLastName} />
                                                            </MDBCol>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBInput label="Delegate / IPA" value={this.state.authdelegate} onChange={this.handleAuthDelegate} />
                                                            </MDBCol>
                                                        </MDBRow>
                                                        <MDBRow style={{ marginTop: "-5px", marginBottom: "32px", paddingLeft: "5px", paddingRight: "5px" }}>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBInput label="SSN" value={this.state.authssn} onChange={this.handleAuthSSN} />
                                                            </MDBCol>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBInput label="LOB" value={this.state.authlob} onChange={this.handleAuthLOB} />
                                                            </MDBCol>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBDatePicker keyboard={true} format='MM/DD/YYYY' className="main-datepicker" emptyLabel={"DOB"} valueDefault={null} value={this.state.authdateofbirth} getValue={(value) => this.handleauthDOB(value)} />
                                                            </MDBCol>
                                                        </MDBRow>
                                                    </>
                                                }
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <MDBCard>
                                            <MDBCardBody>
                                                <MDBRow className="UnassignedQueues" style={{ paddingBottom: ".8rem" }} onClick={this.RequestedDoctorAuthToggle}> Requested / Requesting Doctor
                                                    {/* <img style={{ height: "20px", width: "20px", marginLeft: "8px", marginTop: "2px" }} src="/images/outpatientqueryicon.png" alt='profileimage' id='profileimage' /> */}
                                                </MDBRow>

                                                <i style={{ float: "right", marginTop: "-34px", paddingBottom: ".5rem", color: "#424242" }} className={this.state.requesteddoctortoggle === true ? "fa fa-angle-up rotate-icon" : "fa fa-angle-down"} onClick={this.RequestedDoctorAuthToggle} />
                                                {this.state.requesteddoctortoggle &&
                                                    <>
                                                        <MDBRow style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBInput label="Requesting Doctor ID" value={this.state.authrequestingdoctorid} onChange={this.handleAuthRequestingDoctorId} />
                                                            </MDBCol>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBInput label="Requesting Organization ID" value={this.state.authrequestingorganizationid} onChange={this.handleAuthRequestingOrganizationId} />
                                                            </MDBCol>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBSelect
                                                                    options={Data.speciality}
                                                                    // label="Requesting to Speciality"
                                                                    // selected={this.state.selectedrequestingspeciality}
                                                                    selected="Requesting to Specialty"
                                                                    getTextContent={(text) => this.handleselectedrequestingspeciality(text)}
                                                                />
                                                            </MDBCol>

                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBSelect
                                                                    options={Data.speciality}
                                                                    // label="Reffering to Speciality"
                                                                    // selected={this.state.selectedreferringspeciality}
                                                                    selected="Referring to Specialty"
                                                                    getTextContent={(text) => this.handleselectedreferringspeciality(text)}
                                                                />
                                                            </MDBCol>

                                                        </MDBRow>
                                                        <MDBRow style={{ marginTop: "-10px", marginBottom: "32px", paddingLeft: "5px", paddingRight: "5px" }}>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBInput label="Requested Doctor ID" value={this.state.authrequesteddoctorid} onChange={this.handleAuthRequestedDoctorId} />
                                                            </MDBCol>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBInput label="Requested Organization ID" value={this.state.authrequestedorganizationid} onChange={this.handleAuthRequestedOrganizationId} />
                                                            </MDBCol>
                                                        </MDBRow>
                                                    </>
                                                }
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <MDBCard>
                                            <MDBCardBody>
                                                <MDBRow className="UnassignedQueues" style={{ paddingBottom: ".8rem" }} onClick={this.TrackingDetailstoggle}> Tracking Details
                                                    {/* <img style={{ height: "20px", width: "20px", marginLeft: "8px", marginTop: "2px" }} src="/images/outpatientqueryicon.png" alt='profileimage' id='profileimage' /> */}
                                                </MDBRow>

                                                <i style={{ float: "right", marginTop: "-34px", paddingBottom: ".5rem", color: "#424242" }} className={this.state.trackingdetailstoggle === true ? "fa fa-angle-up rotate-icon" : "fa fa-angle-down"} onClick={this.TrackingDetailstoggle} />
                                                {this.state.trackingdetailstoggle &&
                                                    <>
                                                        <MDBRow style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBSelect
                                                                    options={this.state.authscreenassigned}
                                                                    // label="Assigned"
                                                                    selected="Assigned"
                                                                    // selected={this.state.selectedauthscreenassigned}
                                                                    getTextContent={(text) => this.handleselectedauthscreenassigned(text)}
                                                                />
                                                            </MDBCol>

                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBSelect
                                                                    options={this.state.authscreencreatedby}
                                                                    // label="Created by"
                                                                    // selected={this.state.selectedcreatedby}
                                                                    selected="Created by"
                                                                    getTextContent={(text) => this.handleselectedauthscreencreatedby(text)}
                                                                />
                                                            </MDBCol>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBDatePicker keyboard={true} format='MM/DD/YYYY' className="main-datepicker" emptyLabel={"Date of Modification"} valueDefault={null} value={this.state.authdateofmodification} getValue={(value) => this.handleauthDateofmofification(value)} />
                                                            </MDBCol>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBSelect
                                                                    options={this.state.authscreenmodifiedby}
                                                                    // label="Modified By"
                                                                    selected="Modified By"
                                                                    // selected={this.state.selectedmodifiedby}
                                                                    getTextContent={(text) => this.handleselectedauthscreenmodifiedby(text)}
                                                                />
                                                            </MDBCol>
                                                        </MDBRow>
                                                        <MDBRow style={{ marginTop: "-10px", marginBottom: "32px", paddingLeft: "5px", paddingRight: "5px" }}>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBInput label="Problem Category" value={this.state.authscreenproblemcategory} onChange={this.handleAuthProblemCategory} />
                                                            </MDBCol>
                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBInput label="Facility (When Created by External Entity)" value={this.state.authscreenfacility} onChange={this.handleAuthScreenFacility} />
                                                            </MDBCol>
                                                        </MDBRow>
                                                    </>
                                                }
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                                <div className="text-center buttons-container">
                                    {/* <MDBBtn color="" className="next-button" onClick={this.resetAuthDetails}>RESET</MDBBtn> */}
                                    <MDBBtn color="" className="next-button" onClick={this.searchAuthDetails}>SEARCH</MDBBtn>
                                </div>
                                {
                                    this.state.searchresults ?
                                        <MDBCard style={{ marginBottom: "96px" }}>
                                            <MDBCardBody>
                                                <MDBRow>
                                                    <MDBCol md="12">
                                                        <MDBTypography tag="h5" className="card-title">Search Result </MDBTypography>
                                                    </MDBCol>
                                                </MDBRow>
                                                {this.state.filteredTables.length > 0 ?
                                                    <div style={{ overflowX: "auto", width: "100%", display: "block", padding: "10px 5px 20px 5px" }}>
                                                        <table className="">
                                                            <thead>
                                                                <tr><th>Requested Date</th><th>Patient Name</th><th>Auth No.</th><th>Place of Service</th><th>Valid From</th><th>Valid To</th><th>Status</th></tr>
                                                            </thead>
                                                            <tbody>
                                                                {this.state.filteredTables && this.state.filteredTables.map((item) => {
                                                                    return (
                                                                        <tr>
                                                                            <td>{moment(item.request_received_date).format('YYYY/MM/DD')}</td>
                                                                            <td>{item.p_name}</td>
                                                                            <td style={{ color: "#db1962", textDecoration: "underline", fontWeight: "700" }} onClick={this.showAuthDetailsscreen.bind(this, item.id)}>{item.id}</td>
                                                                            <td>{item.p_address}</td>
                                                                            <td>{item.valid_from_date}</td>
                                                                            <td>{item.valid_to_date}</td>
                                                                            <td>{item.status}</td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    </div> :
                                                    <div style={{ overflowX: "auto", width: "100%", display: "block", padding: "10px 5px 20px 5px" }}>
                                                        <table className="">
                                                            <thead>
                                                                <tr><th>Requested Date</th><th>Patient Name</th><th>Auth No.</th><th>Place of Service</th><th>Valid From</th><th>Valid To</th><th>Status Reason</th></tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td colSpan={7} style={{ textAlign: "center" }}>No Matching Data is available</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                }
                                            </MDBCardBody>
                                        </MDBCard> : null
                                }

                            </MDBTabsPane>
                            <MDBTabsPane show={basicActive === 'tab4'} className="tab4">
                                <MDBRow className="umsubtabs">
                                    <MDBTabs className='mb-3' style={{ marginTop: "20px" }}>
                                        <MDBTabsItem>
                                            <MDBTabsLink onClick={() => this.handleSubMenuClick('ALL')} active={subMenuActive === 'ALL'}>
                                                All
                                            </MDBTabsLink>
                                        </MDBTabsItem>
                                        <MDBTabsItem>
                                            <MDBTabsLink onClick={() => this.handleSubMenuClick('OPEN')} active={subMenuActive === 'OPEN'}>
                                                Open
                                            </MDBTabsLink>
                                        </MDBTabsItem>
                                        <MDBTabsItem>
                                            <MDBTabsLink onClick={() => this.handleSubMenuClick('APPROVED')} active={subMenuActive === 'APPROVED'}>
                                                Approved
                                            </MDBTabsLink>
                                        </MDBTabsItem>

                                        <MDBTabsItem>
                                            <MDBTabsLink onClick={() => this.handleSubMenuClick('REJECTED')} active={subMenuActive === 'REJECTED'}>
                                                Rejected
                                            </MDBTabsLink>
                                        </MDBTabsItem>

                                        <MDBTabsItem>
                                            <MDBTabsLink onClick={() => this.handleSubMenuClick('CANCEL')} active={subMenuActive === 'CANCEL'}>
                                                Canceled
                                            </MDBTabsLink>
                                        </MDBTabsItem>

                                    </MDBTabs>
                                    <MDBTabsContent className="umtabcontent">
                                        <MDBTabsPane show={subMenuActive === 'ALL'} className="ALL">
                                            <MDBCard narrow>
                                                <MDBCardBody cascade style={{ marginBottom: "16px" }}>
                                                    <MDBRow className="justify-content-end">
                                                        <MDBCol md="2">
                                                            <MDBSelect
                                                                options={this.state.authDropdownValues}
                                                                // selected = "MONTHLY"
                                                                style={{ paddingRight: "4px", marginRight: "10px", paddingBottom: "10px" }}
                                                                // label="Oral Notification"
                                                                selected={this.state.selctedAuthdropdownValue}
                                                                getTextContent={(text) => this.authDropdownValuesChange(text)}
                                                            />
                                                        </MDBCol>
                                                    </MDBRow>
                                                    <MDBRow>
                                                        <MDBCol>
                                                            <ReactHighcharts config={authGraph}></ReactHighcharts>
                                                        </MDBCol>
                                                    </MDBRow>
                                                    <MDBRow>
                                                        <MDBCol>
                                                            {this.state.authAllHistory.length > 0 ?
                                                                <div style={{ overflowX: "auto", width: "100%", display: "block", padding: "10px 5px 20px 5px" }}>
                                                                    <table className="">
                                                                        <thead>
                                                                            <tr><th>Requested Date</th><th>Patient Name</th><th>Auth No.</th><th>Place of Service</th><th>Valid From</th><th>Valid To</th><th>Assignment History</th><th>Oral Notification</th><th>Status</th></tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {this.state.authAllHistory && this.state.authAllHistory.map((item, index) => {
                                                                                return (
                                                                                    <tr key={index}>
                                                                                        <td>{moment(item.request_received_date).format('YYYY/MM/DD')}</td>
                                                                                        <td>{item.p_name}</td>
                                                                                        <td><div style={{ cursor: "pointer", color: "#db1962", textDecoration: "underline", fontWeight: "700" }} onClick={this.showAuthDetailsscreen.bind(this, item.id)}>{item.id}</div></td>
                                                                                        <td>{item.place_of_service.service}</td>
                                                                                        <td>{item.valid_from_date}</td>
                                                                                        <td>{item.valid_to_date}</td>
                                                                                        <td><div style={{ cursor: "pointer" }} onClick={this.authviewHistoryModal.bind(this, item.id)}><MDBIcon icon="eye" className="iconcolor" /></div></td>
                                                                                        <td>{item.oral_notification === true ? "true" : "false"}</td>
                                                                                        <td>{item.status}</td>
                                                                                    </tr>
                                                                                )
                                                                            })}
                                                                        </tbody>
                                                                    </table>
                                                                </div> :
                                                                <div style={{ overflowX: "auto", width: "100%", display: "block", padding: "10px 5px 20px 5px" }}>
                                                                    <table className="">
                                                                        <thead>
                                                                            <tr><th>Requested Date</th><th>Patient Name</th><th>Auth No.</th><th>Place of Service</th><th>Valid From</th><th>Valid To</th><th>Assignment History</th><th>Oral Notification</th><th>Status</th></tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td colSpan={9} style={{ textAlign: "center" }}>No Data is available</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            }
                                                        </MDBCol>
                                                    </MDBRow>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBTabsPane>
                                        <MDBTabsPane show={subMenuActive === 'OPEN'} className="OPEN">
                                            <MDBCard narrow>
                                                <MDBCardBody cascade style={{ marginBottom: "16px" }}>
                                                    <MDBRow className="justify-content-end">
                                                        <MDBCol md="2">
                                                            <MDBSelect
                                                                options={this.state.authDropdownValues}
                                                                // selected = "MONTHLY"
                                                                style={{ paddingRight: "4px", marginRight: "10px", paddingBottom: "10px" }}
                                                                // label="Oral Notification"
                                                                selected={this.state.selctedAuthdropdownValue}
                                                                getTextContent={(text) => this.authDropdownValuesChange(text)}
                                                            />
                                                        </MDBCol>
                                                    </MDBRow>
                                                    <MDBRow>
                                                        <MDBCol>
                                                            <ReactHighcharts config={authGraph}></ReactHighcharts>
                                                        </MDBCol>
                                                    </MDBRow>
                                                    <MDBRow>
                                                        <MDBCol>
                                                            {this.state.openAuthHistory.length > 0 ?
                                                                <div style={{ overflowX: "auto", width: "100%", display: "block", padding: "10px 5px 20px 5px" }}>
                                                                    <table className="">
                                                                        <thead>
                                                                            <tr><th>Requested Date</th><th>Patient Name</th><th>Auth No.</th><th>Place of Service</th><th>Valid From</th><th>Valid To</th><th>Assignment History</th><th>Oral Notification</th><th>Status</th></tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {this.state.openAuthHistory && this.state.openAuthHistory.map((item, index) => {
                                                                                return (
                                                                                    <tr key={index}>
                                                                                        <td>{moment(item.request_received_date).format('YYYY/MM/DD')}</td>
                                                                                        <td>{item.p_name}</td>
                                                                                        <td><div style={{ cursor: "pointer", color: "#db1962", textDecoration: "underline", fontWeight: "700" }} onClick={this.showAuthDetailsscreen.bind(this, item.id)}>{item.id}</div></td>
                                                                                        <td>{item.place_of_service.service}</td>
                                                                                        <td>{item.valid_from_date}</td>
                                                                                        <td>{item.valid_to_date}</td>
                                                                                        <td><div style={{ cursor: "pointer" }} onClick={this.authviewHistoryModal.bind(this, item.id)}><MDBIcon icon="eye" className="iconcolor" /></div></td>
                                                                                        <td>{item.oral_notification === true ? "true" : "false"}</td>
                                                                                        <td>{item.status}</td>
                                                                                    </tr>
                                                                                )
                                                                            })}
                                                                        </tbody>
                                                                    </table>
                                                                </div> :
                                                                <div style={{ overflowX: "auto", width: "100%", display: "block", padding: "10px 5px 20px 5px" }}>
                                                                    <table className="">
                                                                        <thead>
                                                                            <tr><th>Requested Date</th><th>Patient Name</th><th>Auth No.</th><th>Place of Service</th><th>Valid From</th><th>Valid To</th><th>Assignment History</th><th>Oral Notification</th><th>Status</th></tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td colSpan={9} style={{ textAlign: "center" }}>No Data is available</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            }
                                                        </MDBCol>
                                                    </MDBRow>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBTabsPane>
                                        <MDBTabsPane show={subMenuActive === 'APPROVED'} className="APPROVED">
                                            <MDBCard narrow>
                                                <MDBCardBody cascade style={{ marginBottom: "16px" }}>
                                                    <MDBRow className="justify-content-end">
                                                        <MDBCol md="2">
                                                            <MDBSelect
                                                                options={this.state.authDropdownValues}
                                                                // selected = "MONTHLY"
                                                                style={{ paddingRight: "4px", marginRight: "10px", paddingBottom: "10px" }}
                                                                // label="Oral Notification"
                                                                selected={this.state.selctedAuthdropdownValue}
                                                                getTextContent={(text) => this.authDropdownValuesChange(text)}
                                                            />
                                                        </MDBCol>
                                                    </MDBRow>
                                                    <MDBRow>
                                                        <MDBCol>
                                                            <ReactHighcharts config={authGraph}></ReactHighcharts>
                                                        </MDBCol>
                                                    </MDBRow>
                                                    <MDBRow>
                                                        <MDBCol>
                                                            {this.state.approvedAuthHistory.length > 0 ?
                                                                <div style={{ overflowX: "auto", width: "100%", display: "block", padding: "10px 5px 20px 5px" }}>
                                                                    <table className="">
                                                                        <thead>
                                                                            <tr><th>Requested Date</th><th>Patient Name</th><th>Auth No.</th><th>Place of Service</th><th>Valid From</th><th>Valid To</th><th>Assignment History</th><th>Oral Notification</th><th>Status</th></tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {this.state.approvedAuthHistory && this.state.approvedAuthHistory.map((item, index) => {
                                                                                return (
                                                                                    <tr key={index}>
                                                                                        <td>{moment(item.request_received_date).format('YYYY/MM/DD')}</td>
                                                                                        <td>{item.p_name}</td>
                                                                                        <td><div style={{ cursor: "pointer", color: "#db1962", textDecoration: "underline", fontWeight: "700" }} onClick={this.showAuthDetailsscreen.bind(this, item.id)}>{item.id}</div></td>
                                                                                        <td>{item.place_of_service.service}</td>
                                                                                        <td>{item.valid_from_date}</td>
                                                                                        <td>{item.valid_to_date}</td>
                                                                                        <td><div style={{ cursor: "pointer" }} onClick={this.authviewHistoryModal.bind(this, item.id)}><MDBIcon icon="eye" className="iconcolor" /></div></td>
                                                                                        <td>{item.oral_notification === true ? "true" : "false"}</td>
                                                                                        <td>{item.status}</td>
                                                                                    </tr>
                                                                                )
                                                                            })}
                                                                        </tbody>
                                                                    </table>
                                                                </div> :
                                                                <div style={{ overflowX: "auto", width: "100%", display: "block", padding: "10px 5px 20px 5px" }}>
                                                                    <table className="">
                                                                        <thead>
                                                                            <tr><th>Requested Date</th><th>Patient Name</th><th>Auth No.</th><th>Place of Service</th><th>Valid From</th><th>Valid To</th><th>Assignment History</th><th>Oral Notification</th><th>Status</th></tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td colSpan={9} style={{ textAlign: "center" }}>No Data is available</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            }
                                                        </MDBCol>
                                                    </MDBRow>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBTabsPane>
                                        <MDBTabsPane show={subMenuActive === 'REJECTED'} className="REJECTED">
                                            <MDBCard narrow>
                                                <MDBCardBody cascade style={{ marginBottom: "16px" }}>
                                                    <MDBRow className="justify-content-end">
                                                        <MDBCol md="2">
                                                            <MDBSelect
                                                                options={this.state.authDropdownValues}
                                                                style={{ paddingRight: "4px", marginRight: "10px", paddingBottom: "10px" }}
                                                                selected={this.state.selctedAuthdropdownValue}
                                                                getTextContent={(text) => this.authDropdownValuesChange(text)}
                                                            />
                                                        </MDBCol>
                                                    </MDBRow>
                                                    <MDBRow>
                                                        <MDBCol>
                                                            <ReactHighcharts config={authGraph}></ReactHighcharts>
                                                        </MDBCol>
                                                    </MDBRow>
                                                    <MDBRow>
                                                        <MDBCol>
                                                            {this.state.rejectedAuthHistory.length > 0 ?
                                                                <div style={{ overflowX: "auto", width: "100%", display: "block", padding: "10px 5px 20px 5px" }}>
                                                                    <table className="">
                                                                        <thead>
                                                                            <tr><th>Requested Date</th><th>Patient Name</th><th>Auth No.</th><th>Place of Service</th><th>Valid From</th><th>Valid To</th><th>Assignment History</th><th>Oral Notification</th><th>Status</th></tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {this.state.rejectedAuthHistory && this.state.rejectedAuthHistory.map((item, index) => {
                                                                                return (
                                                                                    <tr key={index}>
                                                                                        <td>{moment(item.request_received_date).format('YYYY/MM/DD')}</td>
                                                                                        <td>{item.p_name}</td>
                                                                                        <td><div style={{ cursor: "pointer", color: "#db1962", textDecoration: "underline", fontWeight: "700" }} onClick={this.showAuthDetailsscreen.bind(this, item.id)}>{item.id}</div></td>
                                                                                        <td>{item.place_of_service.service}</td>
                                                                                        <td>{item.valid_from_date}</td>
                                                                                        <td>{item.valid_to_date}</td>
                                                                                        <td><div style={{ cursor: "pointer" }} onClick={this.authviewHistoryModal.bind(this, item.id)}><MDBIcon icon="eye" className="iconcolor" /></div></td>
                                                                                        <td>{item.oral_notification === true ? "true" : "false"}</td>
                                                                                        <td>{item.status}</td>
                                                                                    </tr>
                                                                                )
                                                                            })}
                                                                        </tbody>
                                                                    </table>
                                                                </div> :
                                                                <div style={{ overflowX: "auto", width: "100%", display: "block", padding: "10px 5px 20px 5px" }}>
                                                                    <table className="">
                                                                        <thead>
                                                                            <tr><th>Requested Date</th><th>Patient Name</th><th>Auth No.</th><th>Place of Service</th><th>Valid From</th><th>Valid To</th><th>Assignment History</th><th>Oral Notification</th><th>Status</th></tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td colSpan={9} style={{ textAlign: "center" }}>No Data is available</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            }
                                                        </MDBCol>
                                                    </MDBRow>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBTabsPane>
                                        <MDBTabsPane show={subMenuActive === 'CANCEL'} className="CANCEL">
                                            <MDBCard narrow>
                                                <MDBCardBody cascade style={{ marginBottom: "16px" }}>
                                                    <MDBRow className="justify-content-end">
                                                        <MDBCol md="2">
                                                            <MDBSelect
                                                                options={this.state.authDropdownValues}
                                                                // selected = "MONTHLY"
                                                                style={{ paddingRight: "4px", marginRight: "10px", paddingBottom: "10px" }}
                                                                // label="Oral Notification"
                                                                selected={this.state.selctedAuthdropdownValue}
                                                                getTextContent={(text) => this.authDropdownValuesChange(text)}
                                                            />
                                                        </MDBCol>
                                                    </MDBRow>
                                                    <MDBRow>
                                                        <MDBCol>
                                                            <ReactHighcharts config={authGraph}></ReactHighcharts>
                                                        </MDBCol>
                                                    </MDBRow>
                                                    <MDBRow>
                                                        <MDBCol>
                                                            {this.state.canceledAuthHistoty.length > 0 ?
                                                                <div style={{ overflowX: "auto", width: "100%", display: "block", padding: "10px 5px 20px 5px" }}>
                                                                    <table className="">
                                                                        <thead>
                                                                            <tr><th>Requested Date</th><th>Patient Name</th><th>Auth No.</th><th>Place of Service</th><th>Valid From</th><th>Valid To</th><th>Assignment History</th><th>Oral Notification</th><th>Status</th></tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {this.state.canceledAuthHistoty && this.state.canceledAuthHistoty.map((item, index) => {
                                                                                return (
                                                                                    <tr key={index}>
                                                                                        <td>{moment(item.request_received_date).format('YYYY/MM/DD')}</td>
                                                                                        <td>{item.p_name}</td>
                                                                                        <td><div style={{ cursor: "pointer", color: "#db1962", textDecoration: "underline", fontWeight: "700" }} onClick={this.showAuthDetailsscreen.bind(this, item.id)}>{item.id}</div></td>
                                                                                        <td>{item.place_of_service.service}</td>
                                                                                        <td>{item.valid_from_date}</td>
                                                                                        <td>{item.valid_to_date}</td>
                                                                                        <td><div style={{ cursor: "pointer" }} onClick={this.authviewHistoryModal.bind(this, item.id)}><MDBIcon icon="eye" className="iconcolor" /></div></td>
                                                                                        <td>{item.oral_notification === true ? "true" : "false"}</td>
                                                                                        <td>{item.status}</td>
                                                                                    </tr>
                                                                                )
                                                                            })}
                                                                        </tbody>
                                                                    </table>
                                                                </div> :
                                                                <div style={{ overflowX: "auto", width: "100%", display: "block", padding: "10px 5px 20px 5px" }}>
                                                                    <table className="">
                                                                        <thead>
                                                                            <tr><th>Requested Date</th><th>Patient Name</th><th>Auth No.</th><th>Place of Service</th><th>Valid From</th><th>Valid To</th><th>Assignment History</th><th>Oral Notification</th><th>Status</th></tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td colSpan={9} style={{ textAlign: "center" }}>No Data is available</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            }
                                                        </MDBCol>
                                                    </MDBRow>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBTabsPane>
                                        <div className="pagination-container" style={{ marginLeft: "60px" }}>
                                            <Pagination count={Math.ceil(this.state.totalCountofpatients / this.state.perPage)} page={this.state.page} color="primary" onChange={this.handlePageChange} />
                                        </div>
                                    </MDBTabsContent>
                                </MDBRow>
                            </MDBTabsPane>
                        </MDBTabsContent>
                    </MDBRow>
                    <MDBModal isOpen={this.state.showConfirmonModal} toggle={this.showConfirmonModalToggle} className="create-referal-modal">
                        <MDBModalHeader className="modaltitle">Confirmation</MDBModalHeader>
                        <MDBModalBody>
                            <div className="modalconfirmationtitle text-left" style={{ marginLeft: "10px", marginTop: "-20px" }}> The new referal has been save successfully. Please check Dashboard to view it. </div>
                            <div className="text-right">
                                {/* <MDBBtn flat className="flatbutton" onClick={this.showConfirmDeletetoggle}>Cancel</MDBBtn> */}
                                <MDBBtn flat className="flatbutton" onClick={this.saveCreateReferalDetails}>Confirm</MDBBtn>
                            </div>
                        </MDBModalBody>
                    </MDBModal>
                    <MDBModal isOpen={this.state.historymodal} toggle={this.historymodaltoggle} className="historymodal">
                        <MDBModalHeader className="modaltitle" toggle={this.historymodaltoggle}>History</MDBModalHeader>
                        <MDBModalBody className="modalbody">
                            <div>
                                <MDBIcon icon="search" className="historysearchIcon" />
                                <input placeholder="Keywords" id="searching" className="historysearching" type="text" onChange={this.historySearch.bind(this)} />
                            </div>
                            <MDBRow style={{ marginTop: "12px", marginLeft: "12px", overflowY: "auto", maxHeight: "350px" }}>
                                {this.state.historyDetails && this.state.historyDetails.map((item) => {
                                    return (
                                        <div className="historycontent">
                                            <p style={{ marginTop: "8px", color: "#424242", fontSize: "14px", lineHeight: "19px", fontWeight: "bolder" }}>{moment(item.modified_date).format('MM/DD/YYYY hh:mm')}</p>
                                            {item.assigned_to === "UNASSIGNED" ? <p style={{ color: "#424242", fontSize: "14px", lineHeight: "19px" }}><span style={{ color: "#4CAF50", fontWeight: "600" }}>{item.modified_by + " , " + item.modified_user_role}</span> created the referral.</p> :
                                                <p style={{ color: "#424242", fontSize: "14px", lineHeight: "19px" }}><span style={{ color: "#4CAF50", fontWeight: "600" }}>{item.modified_by + " , " + item.modified_user_role}</span> reassigned to <span style={{ color: "#536DFE", fontWeight: "600" }}>{item.assigned_to + " , " + item.assigned_to_user_role}</span></p>
                                            }
                                        </div>
                                    )
                                })}
                            </MDBRow>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn flat className="flatbutton" onClick={this.historymodaltoggle}>Close</MDBBtn>

                        </MDBModalFooter>
                    </MDBModal>
                    <MDBModal isOpen={this.state.showWarningModal} toggle={this.toggleForWarningMessage} className="create-referal-modal">
                        <MDBModalHeader className="modaltitle">Warning</MDBModalHeader>
                        <MDBModalBody>
                            <div className="modalconfirmationtitle text-left" style={{ marginLeft: "10px", marginTop: "-20px" }}>Please fill all the details to create referal</div>
                            <div className="text-right">
                                {/* <MDBBtn flat className="flatbutton" onClick={this.showConfirmDeletetoggle}>Cancel</MDBBtn> */}
                                <MDBBtn flat className="flatbutton" onClick={this.toggleForWarningMessage}>ok</MDBBtn>
                            </div>
                        </MDBModalBody>
                    </MDBModal>
                    {!this.state.isLoaded && <Loader />}
                    <style jsx>{outpatientStyles}</style>
                    <style jsx>{PatientListStyle}</style>
                </Layout>
            </React.Fragment>
        );
    }
};

export default Outpatient;

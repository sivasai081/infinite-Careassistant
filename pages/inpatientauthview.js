
import React, { Component } from "react";
import {
    MDBRow, MDBCol, MDBTooltip, MDBTypography, MDBSelect, MDBCard, MDBCardBody, MDBDataTable, MDBCollapseHeader, MDBIcon, MDBDatePicker, MDBTimeline, MDBTimelineStep, MDBInput, MDBCollapse, MDBBtn, MDBModal,
    MDBDataTableV5, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBChipsInput, MDBSelectInput, MDBSelectOptions, MDBSelectOption, MDBCardTitle
} from "mdbreact";
import moment from 'moment';
import ReactHighcharts from 'react-highcharts';
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





class AuthView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roles: [],
            reassignmembers: [],
            contractedModal: false,
            noncontractedModal: false,
            authorizationModal: false,
            authNumber: "",
            assignedMember: "",
            isLoaded: false,
            searchStarts: false,
            nameOfService:"",
            historymodal: false,
            reassignDescription: "",
            reassignModal: false,
            refertoprogramModal: false,
            refertoprogramconfirmationmodal: false,
            patientdetailsinfomrationtoggle: false,
            authorizationtoggle: false,
            pcpinfomrationtoggle: false,
            showConfirmonModal: false,
            contracteddoctortoggle: false,
            noncontracteddoctortoggle: false,
            diagnosistoggle: false,
            servicerequesttoggle: false,
            authnotestoggle: false,
            selectedAuthDetails:[],
            diagnosisRowArray: [],
            selectedAuthService: {},
            selectedPerson: [],
            disabled: false,
            created_by: "",
            created_date: "",
            searchData: [],
            careManagerFirstname:"",
            assigneeMember: "",
            role:"",
            referToProgramhospitals: [],
            hospitalsbasedonreferToProgram: [],
            departments: [{
                text: "Discharge Planner",
                value: "discharge"
            },
            {
                text: "Lone Term Acute Care",
                value: "loneterm"
            },
            {
                text: "Transition Care",
                value: "transitioncare"
            }],
            refertoprogramroles: [{
                text: "Coordinator",
                value: "Coordinator"
            },
            {
                text: "Nurse",
                value: "Nurse"
            },
            {
                text: "MD",
                value: "MD"
            },
            {
                text: "Supervisor",
                value: "suoervisor"
            }],
            reassignedroles: [{
                text: "Coordinator",
                value: "Coordinator"
            },
            {
                text: "Nurse",
                value: "Nurse"
            },
            {
                text: "MD",
                value: "MD"
            },
            {
                text: "Supervisor",
                value: "suoervisor"
            }],
            oralnotifications: [{
                text: "Yes",
                value: "yes"
            },
            {
                text: "No",
                value: "no"
            }],
            notetypes: [{
                text: "Justification",
                value: "0"
            },
            {
                text: "General Auth",
                value: "1"
            }],
            authTypes: [{
                text: "Justification",
                value: "0"
            },
            {
                text: "General Auth",
                value: "1"
            },
            {
                text: "Other",
                value: "2"
            }],
            nonContractednotetypes: [{
                text: "Justification",
                value: "0"
            },
            {
                text: "General Auth",
                value: "1"
            }],
            status: [{
                text: "OPEN",
                value: "0"
            },{
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
            requestedcontractedtable: {
                columns: [
                    {
                        label: 'Requesting Provider ID',
                        field: 'providerId',
                    },
                    {
                        label: 'Name',
                        field: 'name',
                    },
                    {
                        label: 'Speciality',
                        field: 'speciality',
                    },
                    {
                        label: 'Affliated Group',
                        field: 'affliatedgroup',
                    },
                    {
                        label: 'Phone',
                        field: 'phone',
                    },
                    {
                        label: 'Fax',
                        field: 'fax',
                    }
                ],
                rows: []
            },
            requestedcontractednotestable: {
                columns: [
                    {
                        label: 'No',
                        field: 'number',
                    },
                    {
                        label: 'Type',
                        field: 'type',
                    },
                    {
                        label: 'Note',
                        field: 'note',
                    },
                    {
                        label: 'Written By',
                        field: 'writtenby',
                    },
                    {
                        label: 'Date',
                        field: 'date',
                    }
                ],
                rows: [
                    {
                        number: "1",
                        type: "Justification",
                        note: "Patient had tired PT and NSAIDS and has failed conservative treatment, needs orthopedic ecaluation.",
                        writtenby: "Dave Hansen, MD",
                        date: "12/21/2020"
                    }
                ]
            },
            requestednoncontractedtable: {
                columns: [
                    {
                        label: 'Requesting Provider ID',
                        field: 'providerId',
                    },
                    {
                        label: 'Name',
                        field: 'name',
                    },
                    {
                        label: 'Speciality',
                        field: 'speciality',
                    },
                    {
                        label: 'Affliated Group',
                        field: 'affliatedgroup',
                    },
                    {
                        label: 'Phone',
                        field: 'phone',
                    },
                    {
                        label: 'Fax',
                        field: 'fax',
                    }
                ],
                rows: []
            },
            requestednoncontractednotestable: {
                columns: [
                    {
                        label: 'No',
                        field: 'number',
                    },
                    {
                        label: 'Type',
                        field: 'type',
                    },
                    {
                        label: 'Note',
                        field: 'note',
                    },
                    {
                        label: 'Written By',
                        field: 'writtenby',
                    },
                    {
                        label: 'Date',
                        field: 'date',
                    }
                ],
                rows: [
                    {
                        number: "3",
                        type: "Justification",
                        note: "Patient had tired PT and NSAIDS and has failed conservative treatment, needs orthopedic ecaluation.",
                        writtenby: "Iva Mendez, Nurse",
                        date: "07/07/2021"
                    },
                    {
                        number: "2",
                        type: "Justification",
                        note: "m dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis disparturient montes,",
                        writtenby: "James Russel, MD",
                        date: "11/20/2019"
                    },
                    {
                        number: "1",
                        type: "Oral",
                        note: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. ",
                        writtenby: "Iva Mendez, Nurse",
                        date: "02/23/2019"
                    }
                ]
            },
            authnotestable: {
                columns: [
                    {
                        label: 'No',
                        field: 'number',
                    },
                    {
                        label: 'Type',
                        field: 'type',
                    },
                    {
                        label: 'Note',
                        field: 'note',
                    },
                    {
                        label: 'Written By',
                        field: 'writtenby',
                    },
                    {
                        label: 'Date',
                        field: 'date',
                    }
                ],
                rows: [
                    {
                        number: "2",
                        type: "General Auth",
                        note: "Patient BIBA for SOB, admitted to ICU for Respiratory failure. (This is an in-patient note)",
                        writtenby: "Iva Mendez, Nurse",
                        date: "07/07/2021"
                    },
                    {
                        number: "1",
                        type: "Justification",
                        note: "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque.",
                        writtenby: "James Russel, MD",
                        date: "11/20/2019"
                    }
                ]
            },
            AuthorizationDetailstable: {
                columns: [
                    {
                        label: 'Priority Type',
                        field: 'priority',
                    },
                    {
                        label: 'Service Requested Date',
                        field: 'servicerequestDate',
                    },
                    {
                        label: 'Place of Service',
                        field: 'placeofservice',
                    },
                    {
                        label: 'Request Received Date',
                        field: 'receiveddate',
                    },
                    {
                        label: 'Valid From',
                        field: 'ValidFrom',
                    },
                    {
                        label: 'Valid To',
                        field: 'ValidTo',
                    }],
                rows: []
            },
            patientdetailsinformationtable: {
                columns: [
                    {
                        label: 'HP Member ID',
                        field: 'hpmemberid',
                    },
                    {
                        label: 'Name',
                        field: 'name',
                    },
                    {
                        label: 'DOB',
                        field: 'dob',
                    },
                    {
                        label: 'Language',
                        field: 'language',
                    },
                    {
                        label: 'Age',
                        field: 'age',
                    },
                    {
                        label: 'Sex',
                        field: 'sex',
                    },
                    {
                        label: 'HP Effective Date',
                        field: 'hpeffectivedate',
                    },
                    {
                        label: 'MR#',
                        field: 'mr',
                    },
                    {
                        label: 'Guardian / POA',
                        field: 'guardian',
                    },
                    {
                        label: 'Phone',
                        field: 'phone',
                    },
                    {
                        label: 'Address',
                        field: 'address',
                    },

                ],
                rows: [
                    // {
                    //     hpmemberid: "12365P",
                    //     name: "Pam Sardine",
                    //     dob: "12/16/1971",
                    //     language: "English",
                    //     age: "49",
                    //     sex: "Female",
                    //     hpeffectivedate: "1/12/2003",
                    //     mr: "23658",
                    //     guardian: "Jenni Garth",
                    //     phone: "909-111-8989",
                    //     address: "12 J street, Lincoln PA 15037"
                    // }
                ]
            },
            pcpinformationtable: {
                columns: [
                    {
                        label: 'PCP ID',
                        field: 'pcpid',
                    },
                    {
                        label: 'PCP Effective Date',
                        field: 'pcpeffectivedate',
                    },
                    {
                        label: 'PCP Name',
                        field: 'pcpname',
                    },
                    {
                        label: 'PCP Phone',
                        field: 'pcpphone',
                    },
                    {
                        label: 'PCP Fax',
                        field: 'pcpfax',
                    },
                    {
                        label: 'PCP Made Aware of Request',
                        field: 'pcprequest',
                    }

                ],
                rows: []
            },
            diagnosistable: {
                columns: [
                    {
                        label: 'Diagnosis Code',
                        field: 'diagnosisrequest',
                    },
                    {
                        label: 'Diagnosis Code Description',
                        field: 'codedescription',
                    }
                ],
                rows: []
            },
            servicerequesttable: {
                columns: [
                    {
                        label: 'Service Code',
                        field: 'servicecode',
                    },
                    {
                        label: 'Service Code Description',
                        field: 'codedescription',
                    },
                    {
                        label: 'Quantity / Units',
                        field: 'quantityunits',
                    },
                    {
                        label: 'Modifier',
                        field: 'mofifier',
                    },
                    {
                        label: 'Financial Reponsibility',
                        field: 'financialresponsibility',
                    },
                    {
                        label: 'Covered',
                        field: 'covered',
                    }


                ],
                rows: []
            },
        }
    }
    componentDidMount(){
        let referToProgram = [];
        axios({
            method: 'GET',
            url: `/api/refertoprogramcategories`
        })
        .then((response) => {
            let refertoprogramObj = { "text": "", "value": "" };
            response.data.json.result && response.data.json.result.map(item => {
                refertoprogramObj = { "text": item.facility_type, "value": item.id };
                referToProgram.push(refertoprogramObj);
            })
            this.setState({
                referToProgram: referToProgram,
                isLoaded: true
            })
        })
        let roles = [];
        let careManagerFirstname = localStorage.getItem('careManagerFirstname');
        let role = localStorage.getItem('role');
        this.setState({
            careManagerFirstname: careManagerFirstname,
            role: role
        })
        let authorizationrow = [{
            "priority": "", "servicerequestDate": "", "placeofservice": "", "receiveddate": "", "ValidFrom": "", "ValidTo": ""
        }];
        let patientRow = [{
            "hpmemberid": "", "name": "", "dob": "", "language": "", "age": "", "sex": "",
            "hpeffectivedate": "", "mr": "", "guardian": "", "phone": "", "address": ""
        }];
        let pcpDetailsRow = [{
            "pcpid": "", "pcpeffectivedate": "", "pcpname": "", "pcpphone": "", "pcpfax": "", "pcprequest": ""
        }];
        let reqContractedDetailRow = [{
            "providerId": "","name": "","speciality": "","affliatedgroup": "","phone": "","fax": "",
            "notes": []
        }];
        let reqnonContractedDetailRow = [{
            "providerId": "","name": "","speciality": "","affliatedgroup": "","phone": "","fax": "",
            "notes": []
        }];
        let diagnosisRow = {
            "diagnosisrequest": "","codedescription": ""
        };
        let authnotesRowArray = [];
        let diagnosisRowArray = [];
        let reqContractedDetailRowNotesArr = []; let reqnonContractedDetailRowNotesArr = [];
        let serviceRequestRow = [{
                "servicecode": "", "codedescription": "", "quantityunits": "", "mofifier": "", "financialresponsibility": "", "covered": ""
        }];
        let authNumber = localStorage.getItem('authNumber');
        this.setState({authNumber: authNumber});
        let reqContractedDetailRowNotes = {
            "type": "",
            "note": "",
            "written_by_id": "",
            "written_by": "",
            "date": ""
        };
        let reqnonContractedDetailRowNotes = {
            "type": "",
            "note": "",
            "written_by_id": "",
            "written_by": "",
            "date": ""
        };
        axios({
            method: 'GET',
            url: `/api/fetchRole`,
            params: {
                role_type: "ALL"
              }
        })
        .then((response) => {
            response.data.json.result.map((el) => {
                roles.push({text: el.role, value: el.role});
                this.setState({
                    roles: roles
                });
            })
        })
        axios({
            method: 'GET',
            url: `/api/getAuthById`,
            params: {
                patient_type: "INPATIENT",
                auth_id: authNumber
            }
        })
        .then(res => {
            res.data.json.rp_notes && res.data.json.rp_notes.map((item) => {
                reqContractedDetailRowNotes = {
                    "type": item.type,
                    "note": item.note,
                    "written_by_id": item.written_by_id,
                    "written_by": item.written_by,
                    "date": item.date
                };
                if(item.type !== ""){
                    reqContractedDetailRowNotesArr.push(reqContractedDetailRowNotes);
                    // reqContractedDetailRow.notes && reqContractedDetailRow.notes.push(reqContractedDetailRowNotes);
                }
            });
            reqContractedDetailRow.notes = reqContractedDetailRowNotesArr;
            res.data.json.rtp_notes && res.data.json.rtp_notes.map((item) => {
                reqnonContractedDetailRowNotes = {
                    "type": item.type,
                    "note": item.note,
                    "written_by_id": item.written_by_id,
                    "written_by": item.written_by,
                    "date": item.date
                };
                if(item.type !== ""){
                    reqnonContractedDetailRowNotesArr.push(reqnonContractedDetailRowNotes);
                    // reqnonContractedDetailRow.notes && reqnonContractedDetailRow.notes.push(reqnonContractedDetailRowNotes);
                }
            });
            res.data.json.auth_notes && res.data.json.auth_notes.map((item) => {
                let authnotesRow = {
                    "type": item.type,
                    "note": item.note,
                    "written_by_id": item.written_by_id,
                    "written_by": item.written_by,
                    "date": item.date
                };
                if(item.type !== ""){
                    authnotesRowArray.push(authnotesRow);
                    // reqnonContractedDetailRow.notes && reqnonContractedDetailRow.notes.push(reqnonContractedDetailRowNotes);
                }
            })
            reqnonContractedDetailRow.notes = reqnonContractedDetailRowNotesArr;
            // console.log(reqContractedDetailRow, reqnonContractedDetailRow, "123")
            this.setState({
                selectedstatus: res.data.json.status,
                assignedMember: res.data.json.assigned_to,
                created_by: res.data.json.created_by,
                created_date: res.data.json.created_date,
                reqContractedDetailRowNotesArr: reqContractedDetailRowNotesArr,
                reqnonContractedDetailRowNotesArr: reqnonContractedDetailRowNotesArr,
                selectedAuthService: res.data.json,
                nameOfService: res.data.json.place_of_service.id + " " + res.data.json.place_of_service.service,
                reqContractedDetailRow: reqContractedDetailRow,
                reqnonContractedDetailRow: reqnonContractedDetailRow,
            });

            authorizationrow[0].priority = res.data.json.service_type.service_type,
            authorizationrow[0].servicerequestDate = moment(res.data.json.service_requested_date).format("DD/MM/YYYY"),
            authorizationrow[0].placeofservice = res.data.json.place_of_service.service,
            authorizationrow[0].receiveddate = moment(res.data.json.request_received_date).format("DD/MM/YYYY"),
            authorizationrow[0].ValidFrom = moment(res.data.json.valid_from_date).format("DD/MM/YYYY"),
            authorizationrow[0].ValidTo = moment(res.data.json.valid_to_date).format("DD/MM/YYYY"),
            // console.log(res.data.json.result[0].place_of_service.service + " " + res.data.json.result[0].place_of_service.service,"res")
            patientRow[0].hpmemberid = res.data.json.patient_id;
            patientRow[0].name = res.data.json.p_name;
            patientRow[0].dob = res.data.json.p_dob;
            patientRow[0].language = res.data.json.p_language;
            patientRow[0].age = res.data.json.p_age;
            patientRow[0].sex = res.data.json.p_gender;
            patientRow[0].hpeffectivedate = res.data.json.p_hp_effective_date;
            patientRow[0].mr = res.data.json.p_mr_no;
            patientRow[0].guardian = res.data.json.p_guardian_poa_name;
            patientRow[0].phone = res.data.json.p_phone_number;
            patientRow[0].address = res.data.json.p_address;
            pcpDetailsRow[0].pcpid = res.data.json.p_pcp_id;
            pcpDetailsRow[0].pcpeffectivedate = res.data.json.p_pcp_effective_date;
            pcpDetailsRow[0].pcpname = res.data.json.p_pcp_name;
            pcpDetailsRow[0].pcpphone = res.data.json.p_pcp_phone_number;
            pcpDetailsRow[0].pcpfax = res.data.json.p_pcp_fax;
            pcpDetailsRow[0].pcprequest = res.data.json.p_pcp_made_aware_request;
            reqContractedDetailRow[0].providerId = res.data.json.rp_id;
            reqContractedDetailRow[0].name = res.data.json.rp_name;
            reqContractedDetailRow[0].speciality = res.data.json.rp_speciality;
            reqContractedDetailRow[0].affliatedgroup = res.data.json.rp_affiliate_group;
            reqContractedDetailRow[0].phone = res.data.json.rp_phone_number;
            reqContractedDetailRow[0].fax = res.data.json.rp_fax_number;
            // reqContractedDetailRow[0].notes = res.data.json.rp_notes;
            reqnonContractedDetailRow[0].providerId = res.data.json.rtp_id;//
            reqnonContractedDetailRow[0].name = res.data.json.rtp_name;
            reqnonContractedDetailRow[0].speciality = res.data.json.rtp_speciality;
            reqnonContractedDetailRow[0].affliatedgroup = res.data.json.rtp_affiliate_group;
            reqnonContractedDetailRow[0].phone = res.data.json.rtp_phone_number;
            reqnonContractedDetailRow[0].fax = res.data.json.rtp_fax_number;
            // reqnonContractedDetailRow[0].notes = res.data.json.rtp_notes;
            res.data.json.diagnosis && res.data.json.diagnosis.map((item) => {
                diagnosisRow = {"diagnosisrequest": item.diagnosis_code, "codedescription" : item.diagnosis_code_description};
                if(item.diagnosis_code !== ""){
                    diagnosisRowArray.push(diagnosisRow);
                }
                return diagnosisRowArray;
            })
            // diagnosisRow[0].diagnosisrequest = res.data.json.diagnosis[0].diagnosis_code;
            // diagnosisRow[0].codedescription = res.data.json.diagnosis[0].diagnosis_code_description;
            serviceRequestRow[0].servicecode = res.data.json.sr_code_id;
            serviceRequestRow[0].codedescription = res.data.json.sr_detail.description;
            serviceRequestRow[0].quantityunits = res.data.json.sr_quantity;
            serviceRequestRow[0].mofifier = res.data.json.sr_modifier;
            serviceRequestRow[0].financialresponsibility = res.data.json.sr_financial_responsibility;
            serviceRequestRow[0].covered = res.data.json.sr_covered;
        });
        let AuthorizationDetailstable = {
            columns: [
                {
                    label: 'Priority Type',
                    field: 'priority',
                },
                {
                    label: 'Service Requested Date',
                    field: 'servicerequestDate',
                },
                {
                    label: 'Place of Service',
                    field: 'placeofservice',
                },
                {
                    label: 'Request Received Date',
                    field: 'receiveddate',
                },
                {
                    label: 'Valid From',
                    field: 'ValidFrom',
                },
                {
                    label: 'Valid To',
                    field: 'ValidTo',
                }],
            rows: authorizationrow
        };
        let patientdetailsinformationtable = {
            columns: [
                {
                    label: 'HP Member ID',
                    field: 'hpmemberid',
                },
                {
                    label: 'Name',
                    field: 'name',
                },
                {
                    label: 'DOB',
                    field: 'dob',
                },
                {
                    label: 'Language',
                    field: 'language',
                },
                {
                    label: 'Age',
                    field: 'age',
                },
                {
                    label: 'Sex',
                    field: 'sex',
                },
                {
                    label: 'HP Effective Date',
                    field: 'hpeffectivedate',
                },
                {
                    label: 'MR#',
                    field: 'mr',
                },
                {
                    label: 'Guardian / POA',
                    field: 'guardian',
                },
                {
                    label: 'Phone',
                    field: 'phone',
                },
                {
                    label: 'Address',
                    field: 'address',
                },
            ],
            rows: patientRow
        };
        let pcpinformationtable = {
            columns: [
                {
                    label: 'PCP ID',
                    field: 'pcpid',
                },
                {
                    label: 'PCP Effective Date',
                    field: 'pcpeffectivedate',
                },
                {
                    label: 'PCP Name',
                    field: 'pcpname',
                },
                {
                    label: 'PCP Phone',
                    field: 'pcpphone',
                },
                {
                    label: 'PCP Fax',
                    field: 'pcpfax',
                },
                {
                    label: 'PCP Made Aware of Request',
                    field: 'pcprequest',
                }
            ],
            rows: pcpDetailsRow
        };
        let requestedcontractedtable = {
            columns: [
                {
                    label: 'Requesting Provider ID',
                    field: 'providerId',
                },
                {
                    label: 'Name',
                    field: 'name',
                },
                {
                    label: 'Speciality',
                    field: 'speciality',
                },
                {
                    label: 'Affliated Group',
                    field: 'affliatedgroup',
                },
                {
                    label: 'Phone',
                    field: 'phone',
                },
                {
                    label: 'Fax',
                    field: 'fax',
                }
            ],
            rows: reqContractedDetailRow
        };
        let requestednoncontractedtable = {
            columns: [
                {
                    label: 'Requesting Provider ID',
                    field: 'providerId',
                },
                {
                    label: 'Name',
                    field: 'name',
                },
                {
                    label: 'Speciality',
                    field: 'speciality',
                },
                {
                    label: 'Affliated Group',
                    field: 'affliatedgroup',
                },
                {
                    label: 'Phone',
                    field: 'phone',
                },
                {
                    label: 'Fax',
                    field: 'fax',
                }
            ],
            rows: reqnonContractedDetailRow
        };
        let diagnosistable = {
            columns: [
                {
                    label: 'Diagnosis Code',
                    field: 'diagnosisrequest',
                },
                {
                    label: 'Diagnosis Code Description',
                    field: 'codedescription',
                }
            ],
            rows: diagnosisRowArray
        };
        let servicerequesttable = {
            columns: [
                {
                    label: 'Service Code',
                    field: 'servicecode',
                },
                {
                    label: 'Service Code Description',
                    field: 'codedescription',
                },
                {
                    label: 'Quantity / Units',
                    field: 'quantityunits',
                },
                {
                    label: 'Modifier',
                    field: 'mofifier',
                },
                {
                    label: 'Financial Reponsibility',
                    field: 'financialresponsibility',
                },
                {
                    label: 'Covered',
                    field: 'covered',
                }


            ],
            rows: serviceRequestRow
        };
        this.setState({
            patientdetailsinformationtable : patientdetailsinformationtable,
            AuthorizationDetailstable: AuthorizationDetailstable,
            pcpinformationtable: pcpinformationtable,
            requestedcontractedtable: requestedcontractedtable,
            requestednoncontractedtable: requestednoncontractedtable,
            diagnosistable: diagnosistable,
            servicerequesttable: servicerequesttable,
            authnotesRowArray: authnotesRowArray,
            diagnosisRowArray: diagnosisRowArray,
            isLoaded: true
        }, () => {
            // console.log(this.state.diagnosisrequest,"diagnosisrequest")
        })
    }
    patientdetailsInformationToggle = () => {
        this.setState({
            patientdetailsinfomrationtoggle: !this.state.patientdetailsinfomrationtoggle
        })
    }
    pcpInformationToggle = () => {
        this.setState({
            pcpinfomrationtoggle: !this.state.pcpinfomrationtoggle
        })
    }
    ContractedDoctorToggle = () => {
        this.setState({
            contracteddoctortoggle: !this.state.contracteddoctortoggle
        })
    }
    NonContractedDoctorToggle = () => {
        this.setState({
            noncontracteddoctortoggle: !this.state.noncontracteddoctortoggle
        })
    }
    DiagnosisToggle = () => {
        this.setState({
            diagnosistoggle: !this.state.diagnosistoggle
        })
    }
    ServiceRequestToggle = () => {
        this.setState({
            servicerequesttoggle: !this.state.servicerequesttoggle
        })
    }
    AuthNotesToggle = () => {
        this.setState({
            authnotestoggle: !this.state.authnotestoggle
        })
    }

    handleSelectStatusChange(text) {
        this.setState({
            selectedstatus: text
        })
    }

    handleSelectOralNotificationChange(text) {
        this.setState({
            oralnotification: text
        })
    }

    handleDepartmentChange(value) {
        this.setState({
            department: value
        })
    }
    handleProgramRoleChange(value) {
        this.setState({
            referetoprogramrole: value
        })
    }


    contracteddoctorModal = () => {
        this.setState({
            contractedModal: true
        });
    }

    noncontracteddoctorModal = () => {
        this.setState({
            noncontractedModal: true
        });
    }

    authorizationModal = () => {
        this.setState({
            authorizationModal: true
        });
    }

    authviewHistoryModal = () => {
        let historyDetails = [];
        this.setState({
            isLoaded: false
        })
        axios({
            method: 'GET',
            url: `/api/getAssignmentHistoryByAuthId`,
            params: {
                patient_type: "INPATIENT",
                auth_id: this.state.authNumber 
            }
        })
        .then((response) => {
            historyDetails = response.data.json.result && response.data.json.result.sort((a,b) => {
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

    authviewReassignModal = () => {
        this.setState({
            reassignModal: true
        });
    }

    refertoProgramModal = () =>{
        this.setState({
            refertoprogramModal: true
        });
    }

    contractedmodaltoggle = () => {
        this.setState({
            contractedModal: !this.state.contractedModal
        });
    }
    saveNotes = () => {
        this.setState({
            isLoaded: false,
            contractedModal: false
        });
        let caremanagerId = localStorage.getItem('caremanagerId');
        let careManagerFirstname = localStorage.getItem('careManagerFirstname');
        let reqContractedDetailRowNotesArr = [];
        let createReferalData = {
            "type": this.state.selectednotetype,
            "note": this.state.notedescription,
            "written_by_id": caremanagerId,
            "written_by": careManagerFirstname,
            "date": moment(new Date()).format('YYYY-MM-DDThh:mm:ss')
        };
        axios({
            method: 'POST',
            url: `/api/insertUMNote`,
            params: {
                patient_type: "INPATIENT",
                note_type: "RP_NOTE",
                auth_id: this.state.authNumber
            },
            data: createReferalData,
        })
        .then((response) => {
            reqContractedDetailRowNotesArr.push(createReferalData);
            let reqContractedDetailRow = this.state.reqContractedDetailRow;
            reqContractedDetailRow.notes = [...this.state.reqContractedDetailRowNotesArr, reqContractedDetailRowNotesArr ]
            this.setState({
                reqContractedDetailRowNotesArr: [...this.state.reqContractedDetailRowNotesArr, createReferalData],
                isLoaded: true
            })
        })
    }
    saveNonContractedNotes = () => {
        this.setState({
            isLoaded: false,
            noncontractedModal: false
        });
        let caremanagerId = localStorage.getItem('caremanagerId');
        let careManagerFirstname = localStorage.getItem('careManagerFirstname');
        let reqnonContractedDetailRowNotesArr = [];
        let createReferalData = {
            "type": this.state.nonContractednotetype,
            "note": this.state.nonContracteddescription,
            "written_by_id": caremanagerId,
            "written_by": careManagerFirstname,
            "date": moment(new Date()).format('YYYY-MM-DDThh:mm:ss')
        };
        axios({
            method: 'POST',
            url: `/api/insertUMNote`,
            params: {
                patient_type: "INPATIENT",
                note_type: "RTP_NOTE",
                auth_id: this.state.authNumber
            },
            data: createReferalData,
        })
        .then((response) => {
            reqnonContractedDetailRowNotesArr.push(createReferalData);
            let reqnonContractedDetailRow = this.state.reqnonContractedDetailRow;
            reqnonContractedDetailRow.notes = [...this.state.reqnonContractedDetailRowNotesArr, reqnonContractedDetailRowNotesArr ]
            this.setState({
                reqnonContractedDetailRowNotesArr: [...this.state.reqnonContractedDetailRowNotesArr, createReferalData],
                isLoaded: true,
            })
        })
    }
    saveAuthNotes = () => {
        this.setState({
            isLoaded: false,
            authorizationModal: false
        });
        let caremanagerId = localStorage.getItem('caremanagerId');
        let careManagerFirstname = localStorage.getItem('careManagerFirstname');
        let authnotesRowArray = [];
        let createReferalData = {
            "type": this.state.selectedAuthTypes,
            "note": this.state.authNoteDescription,
            "written_by_id": caremanagerId,
            "written_by": careManagerFirstname,
            "date": moment(new Date()).format('YYYY-MM-DDThh:mm:ss')
        };
        axios({
            method: 'POST',
            url: `/api/insertUMNote`,
            params: {
                patient_type: "INPATIENT",
                note_type: "AUTH_NOTE",
                auth_id: this.state.authNumber
            },
            data: createReferalData,
        })
        .then((response) => {
            authnotesRowArray.push(createReferalData);
            this.setState({
                authnotesRowArray: [...this.state.authnotesRowArray, createReferalData],
                isLoaded: true,
            })
        })
    }
    noncontractedmodaltoggle = () => {
        this.setState({
            noncontractedModal: !this.state.noncontractedModal
        });
    }

    authorizationmodaltoggle = () => {
        this.setState({
            authorizationModal: !this.state.authorizationModal
        });
    }

    historymodaltoggle = () => {
        this.setState({
            historymodal: !this.state.historymodal
        });
    }

    reassignmodaltoggle = () => {
        this.setState({
            reassignModal: !this.state.reassignModal,
            selectedPerson: []
        });
    }
    handleNoteTypeChange(text) {
        this.setState({
            selectednotetype: text
        })
    }
    handleNonContractedNoteTypeChange(text){
        this.setState({
            nonContractednotetype: text
        })
    }
    handleAuthTypeChange(text){
        this.setState({
            selectedAuthTypes: text
        })
    }
    authNoteTypeHandler = (e) => {
        this.setState({
            authNoteDescription : e.target.value
        })
    }
    handleRoleChange(value) {
        this.setState({
            assignedrole: value
        }, ()=>{
            axios({
                method: 'GET',
                url: `/api/listcareteamdetailsbyrole`,
                params: {
                    role_type: this.state.assignedrole[0]
                  }
            })
            .then((response) => {
               this.setState({
                  reassignmembers: response.data.json.result,
                  copyOfOfreassignmembers: response.data.json.result
                });
               
            })
        })
    }

    handleNotedescriptionchnage = (e) => {
        this.setState({
            notedescription: e.target.value
        });
    }
    handleNonContracteddescriptionchnage = (e) => {
        this.setState({
            nonContracteddescription: e.target.value
        });
    }
    reassignDescriptionChane = (e) => {
        this.setState({
            reassignDescription: e.target.value
        });
    }
    onHandleSearch = (e) => {
        if(e.target.value !== ""){
            let historyDetails = this.state.historyDetails;
            historyDetails = historyDetails.filter((el) => {
                if((el.assigned_to.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) && (el.modified_by.toLowerCase().indexOf(e.target.value.toLowerCase() !== -1))){
                    return el;
                }
            })
            if(historyDetails.length){
                this.setState({historyDetails: historyDetails})
            }else{
                this.setState({historyDetails: this.state.historyDetails})
            }
        }else{
            this.setState({historyDetails: this.state.historyDetailsCopy})
        }
        this.setState({
            historysearch: e.target.value
        });
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
    getreassignMemberSearch = () => {
        this.setState({ searchStarts: true})
    }
    onReassignMemberSearch = e => {
        let groupMemList = this.state.reassignmembers.length ? this.state.reassignmembers : this.state.copyOfOfreassignmembers;
            groupMemList = groupMemList.filter((f) => {
                if (f.firstname.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 || f.lastname.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
                return f;
                }
            })
            if (groupMemList.length) {
                this.setState({ copyOfOfreassignmembers : groupMemList})
            } else {
                this.setState({ copyOfOfreassignmembers: this.state.reassignmembers });
            }
            this.setState({
                searchMember: e.target.value
            })

    }
    selectedCaremanager = (details) => {
        let selectedPerson = [];
        // selectedPerson = selectedPerson.push(details);
        if(this.state.selectedPerson.length === 0){
            this.setState({
                searchStarts: false,
                selectedPerson: [...this.state.selectedPerson, details],
                assigneeMember: details.firstname + " " + details.lastname,
                assigneeMemberEmail: details.email_id,
                assigneeMemberRole: details.role
            })
        }else{

        }
    }
    refferprogrammodaltoggle = () => {
        this.setState({
            refertoprogramModal: !this.state.refertoprogramModal
        });
    }

    autoreasssignconfirmationtoggle = () => {
        this.setState({
            autoreasssignconfirmationmodal: !this.state.autoreasssignconfirmationmodal
        });
    }

    saveReassignModal = () => {
        this.setState({
            reassignModal: false, autoreasssignconfirmationmodal: true
        });
    }

    toggleconfirmationtoggle = () => {
        this.setState({
            autoreasssignconfirmationmodal: !this.state.autoreasssignconfirmationmodal
        });
    }
    confirmReassignModal = () => {
        this.setState({
            autoreasssignconfirmationmodal: false,
            isLoaded: false
        });
        /////
        let createReferalData = {
            "auth_id": this.state.authNumber,
            "assigned_to": this.state.assigneeMemberEmail,
            "modified_user_role": this.state.role,
            "assigned_to_user_role": this.state.assigneeMemberRole,
            "note": this.state.reassignDescription,
            "text": "",
            "modified_date": moment(new Date()).format('YYYY-MM-DDThh:mm:ss'),
            "modified_by": this.state.careManagerFirstname
        };
        axios({
            method: 'POST',
            url: `/api/assignUMUser`,
            params: {
                patient_type: "INPATIENT"
            },
            data: createReferalData,
        })
        .then((response) => {
            this.setState({
                isLoaded: true
            })
        })
    }
    refertoprogramConfirmationModal = () => {
        this.setState({
            refertoprogramModal: false, refertoprogramconfirmationmodal: true
        });
    }

    refertoprogramConfirmationModalToggle = () => {
        this.setState({
            refertoprogramconfirmationmodal: !this.state.refertoprogramconfirmationmodal
        });
    }
    validateDetails = () => {
        let patientid = localStorage.getItem('patientId');
            let createReferalData = {
                "service_type_id": this.state.selectedAuthService.service_type_id,
                // "service_category_id": this.state.selctedServiceCategory,
                "service_requested_date": this.state.selectedAuthService.service_requested_date,
                "place_of_service_id": this.state.selectedAuthService.place_of_service_id,
                "valid_from_date": this.state.selectedAuthService.valid_from_date,
                "valid_to_date": this.state.selectedAuthService.valid_to_date,
                "request_received_date": this.state.selectedAuthService.request_received_date,
                "auth_notes": this.state.authnotesRowArray,
                "patient_id": this.state.selectedAuthService.patient_id,
                "p_hp_member_id": this.state.selectedAuthService.p_hp_member_id,
                "p_name": this.state.selectedAuthService.p_name,
                "p_dob": this.state.selectedAuthService.p_dob,
                "p_language": this.state.selectedAuthService.p_language,
                "p_age": this.state.selectedAuthService.p_age,
                "p_gender": this.state.selectedAuthService.p_gender,
                "p_hp_effective_date": this.state.selectedAuthService.p_hp_effective_date,
                "p_mr_no": this.state.selectedAuthService.p_mr_no,
                "p_guardian_poa_name": this.state.selectedAuthService.p_guardian_poa_name,
                "p_phone_number": this.state.selectedAuthService.p_phone_number,
                "p_address": this.state.selectedAuthService.p_address,
                "p_lob": this.state.selectedAuthService.p_lob,
                "p_pcp_id": this.state.selectedAuthService.p_pcp_id,
                "p_pcp_effective_date": this.state.selectedAuthService.p_pcp_effective_date,
                "p_pcp_name": this.state.selectedAuthService.p_pcp_name,
                "p_pcp_phone_number": this.state.selectedAuthService.p_pcp_phone_number,
                "p_pcp_fax": this.state.selectedAuthService.p_pcp_fax,
                "p_pcp_made_aware_request": this.state.selectedAuthService.p_pcp_made_aware_request,
                "rp_id": this.state.selectedAuthService.rp_id,
                "rp_name": this.state.selectedAuthService.rp_name,
                "rp_speciality": this.state.selectedAuthService.rp_speciality,
                "rp_affiliate_group": this.state.selectedAuthService.rp_affiliate_group,
                "rp_phone_number": this.state.selectedAuthService.rp_phone_number,
                "rp_fax_number": this.state.selectedAuthService.rp_fax_number,
                "rp_notes": this.state.reqContractedDetailRowNotesArr,
                "rtp_id": this.state.selectedAuthService.rtp_id,
                "rtp_name": this.state.selectedAuthService.rtp_name,
                "rtp_speciality": this.state.selectedAuthService.rtp_speciality,
                "rtp_affiliate_group": this.state.selectedAuthService.rtp_affiliate_group,
                "rtp_phone_number": this.state.selectedAuthService.rtp_phone_number,
                "rtp_fax_number": this.state.selectedAuthService.rtp_fax_number,
                "rtp_description": this.state.selectedAuthService.rtp_description,
                "rtp_notes": this.state.reqnonContractedDetailRowNotesArr,
                "diagnosis": this.state.diagnosisRowArray,
                "sr_code_id": this.state.selectedAuthService.sr_code_id,
                "sr_quantity": this.state.selectedAuthService.sr_quantity,
                "sr_modifier": this.state.selectedAuthService.sr_modifier,
                "sr_financial_responsibility": this.state.selectedAuthService.sr_financial_responsibility,
                "sr_covered": this.state.selectedAuthService.sr_covered,
                "assigned_to": this.state.assigneeMemberEmail,
                "assigned_date": new Date(),
                "created_date": this.state.created_date,
                "created_by": this.state.created_by,
                "created_by_role": localStorage.getItem("role"),
                "status": this.state.selectedstatus,
                "oral_notification": false,
                "refer_id": this.state.selectedReferToProgram[0],
                "facility_id": this.state.hopitalfacility && this.state.hopitalfacility[0], 
            };
            // console.log(createReferalData,"createReferalData");
            axios({
                method: 'PUT',
                url: `/api/updateAuthReferral`,
                params: {
                    auth_id: this.state.authNumber
                },
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

    handleReferToProgram(value){
        this.setState({
            selectedReferToProgram: value
        }, ()=>{
            let hospitalsbasedonreferToProgram = [];
            // console.log("selectedReferToProgram", this.state.selectedReferToProgram[0]);
            axios({
                method: 'GET',
                url: `/api/hospitalsbasedonreference`,
                params: {
                    refer_id: this.state.selectedReferToProgram[0]
                },
            })
            .then((response) => {
                let refertoprogramhospitalObj = { "text": "", "value": "" };
                response.data.json.result && response.data.json.result.map(item => {
                    refertoprogramhospitalObj = { "text": item.facility_name, "value": item.id };
                    hospitalsbasedonreferToProgram.push(refertoprogramhospitalObj);
                })
                this.setState({
                    hospitalsbasedonreferToProgram: hospitalsbasedonreferToProgram,
                    isLoaded: true
                })
            })
        })
    }

    handleHospitalsReferToProgram(value){
        this.setState({
            hopitalfacility: value
        });
    }
    mouseHoverEnter(type){
        if(type === "reassign"){
            this.setState({
                reassignHover: true
            })
        }else if(type === "print"){
            this.setState({
                printHover: true
            })
        }else if(type === "history"){
            this.setState({
                historyHover: true
            })
        }else if(type === "inpatientnote"){
            this.setState({
                inpatientHover: true
            })
        }
    }
    mouseHoverleave(type){
        if(type === "reassign"){
            this.setState({
                reassignHover: false
            })
        }else if(type === "print"){
            this.setState({
                printHover: false
            })
        }else if(type === "history"){
            this.setState({
                historyHover: false
            })
        }else if(type === "inpatientnote"){
            this.setState({
                inpatientHover: false
            })
        }
    }
    removeSelctedMember = () => {
        this.setState({ selectedPerson: [] })
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

    AuthorizationDetailsToggle = () => {
        this.setState({
            authorizationtoggle: !this.state.authorizationtoggle
        })
    }

    render() {
        return (
            <React.Fragment>
                <Head>
                    <title>Healthlligence</title>
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
                </Head>
                <Layout>
                    <MDBRow className="align-items-center" style={{marginBottom:"-10px"}}>
                        <MDBCol sm="12" md="6" lg={this.state.hospitalsbasedonreferToProgram && this.state.hospitalsbasedonreferToProgram.length ? "4": "6" }>
                            <div style={{ display: "flex", marginTop: "20px" }}>
                                <p style={{ fontWeight: "600", color: "#424242", fontSize: "16px", marginLeft:"5px" }}> Authorization Number : <span style={{ color: "#DB1962", fontSize: "16px", fontWeight: "600" }}> {this.state.authNumber} </span></p>
                                <p style={{ fontWeight: "600", color: "#424242", fontSize: "16px", marginLeft: "40px" }}> Place of Service : <span style={{ color: "#DB1962", fontSize: "16px", fontWeight: "600" }}> {this.state.nameOfService} </span></p>
                            </div>
                        </MDBCol>
                        <MDBCol sm="12" md="2" lg="2">
                            <div style={{ display: "flex", float: "right" }}>
                                <MDBTooltip domElement tag="span" placement="bottom">
                                    <span onMouseOver={this.mouseHoverEnter.bind(this,"reassign")} onMouseOut={this.mouseHoverleave.bind(this,"reassign")}>
                                        {this.state.reassignHover ? <img src="/images/icons/reassign_hover.svg" alt='profileimage' id='profileimage' style={{width:"24px", height:"24px"}} onClick={this.authviewReassignModal} /> : <img src="/images/icons/reassign.svg" onClick={this.authviewReassignModal} alt='profileimage' id='profileimage' /> }
                                    </span>
                                    {/* <img src="/images/icons/reassign.svg" onClick={this.authviewReassignModal} alt='profileimage' id='profileimage' /> */}
                                    <span>Reassign</span>
                                </MDBTooltip>
                                <MDBTooltip domElement tag="span" placement="bottom">
                                    <span style={{ marginLeft: "12px" }} onMouseOver={this.mouseHoverEnter.bind(this,"print")} onMouseOut={this.mouseHoverleave.bind(this,"print")}>
                                        {this.state.printHover ? <img  src="/images/icons/print_hover.svg"  onClick={this.authviewReassignModal} alt='printIcon' id='printIcon' style={{width:"24px", height:"24px"}} /> : <img src="/images/icons/print.svg" alt='printIcon' id='printIcon' /> }
                                    </span>
                                    {/* <img style={{ marginLeft: "12px" }} src="/images/icons/print.svg" alt='profileimage' id='profileimage' /> */}
                                    <span>Print</span>
                                </MDBTooltip>
                                <MDBTooltip domElement tag="span" placement="bottom">
                                    {/* <img style={{ marginLeft: "12px" }} onClick={this.authviewHistoryModal} src="/images/icons/history.svg" alt='profileimage' id='profileimage' /> */}
                                    <span style={{ marginLeft: "12px" }} onMouseOver={this.mouseHoverEnter.bind(this,"history")} onMouseOut={this.mouseHoverleave.bind(this,"history")}>
                                        {this.state.historyHover ? <img  src="/images/icons/history_hover.svg" alt='history_icon' id='history_icon' style={{width:"24px", height:"24px"}} onClick={this.authviewHistoryModal} /> : <img src="/images/icons/history.svg" onClick={this.authviewHistoryModal} alt='history_icon' id='history_icon' /> }
                                    </span>
                                    <span>History</span>
                                </MDBTooltip>
                                <MDBTooltip domElement tag="span" placement="bottom">
                                    <span style={{ marginLeft: "12px" }} onMouseOver={this.mouseHoverEnter.bind(this,"inpatientnote")} onMouseOut={this.mouseHoverleave.bind(this,"inpatientnote")}>
                                        {this.state.inpatientHover ? <img  src="/images/icons/inpatientNote_hover.svg" onClick={() => window.location.href="/inpatientnote"} alt='inpatient_note_icon' id='inpatient_note_icon' style={{width:"24px", height:"24px"}} /> : <img src="/images/icons/inpatientNote.svg" onClick={() => window.location.href="/inpatientnote"} alt='inpatient_note_icon' id='inpatient_note_icon' /> }
                                    </span>
                                    {/* <img style={{ marginLeft: "12px" }} onClick={() => window.location.href="/inpatientnote"} src="/images/icons/inpatientNote.svg" alt='profileimage' id='profileimage' /> */}
                                    <span>Inpatient Note</span>
                                </MDBTooltip>
                            </div>
                        </MDBCol>
                        <MDBCol sm="12" md="2" lg="2">
                                <div style={{ marginLeft: "0px" }}>
                                    <MDBSelect
                                        options={this.state.referToProgram}
                                        // label="Refer To Program"
                                        selected = "Refer To Program"
                                        getValue={(val) => this.handleReferToProgram(val)}
                                    />
                                </div>
                        </MDBCol>
                        {
                            this.state.hospitalsbasedonreferToProgram && this.state.hospitalsbasedonreferToProgram.length ?
                                <MDBCol sm="12" md="2" lg="2">
                                    <div style={{ marginLeft: "0px" }}>
                                        <MDBSelect
                                            options={this.state.hospitalsbasedonreferToProgram}
                                            // label="Facilities"
                                            selected = "Choose Facility"
                                            getValue={(val) => this.handleHospitalsReferToProgram(val)}
                                        />
                                    </div>
                                </MDBCol> : null
                        }

                        

                        <MDBCol sm="12" md="2" lg="2">
                            <div style={{ marginLeft: "0px" }}>
                                <MDBSelect
                                    options={this.state.status}
                                    // label="Status"
                                    // selected = "Status"
                                    selected={this.state.selectedstatus}
                                    getTextContent ={(text) => this.handleSelectStatusChange(text)}
                                />
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBRow className="UnassignedQueues" style={{ paddingBottom: "1rem" }} onClick={this.AuthorizationDetailsToggle}> Authorization Details   </MDBRow>

                                    <i style={{ float: "right", marginTop: "-40px", paddingBottom: ".5rem", color: "#424242" }} className={this.state.authorizationtoggle === true ? "fa fa-angle-up rotate-icon" : "fa fa-angle-down"} onClick={this.AuthorizationDetailsToggle} />
                                    {this.state.authorizationtoggle &&
                                        <>
                                            <MDBDataTable
                                                small
                                                hover={true}
                                                responsive={true}
                                                paging={false}
                                                searching={false}
                                                data={this.state.AuthorizationDetailstable}
                                            />
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
                                    <MDBRow className="UnassignedQueues" style={{ paddingBottom: "1rem" }} onClick={this.patientdetailsInformationToggle} > Patient Details / Information   </MDBRow>

                                    <i style={{ float: "right", marginTop: "-40px", paddingBottom: ".5rem", color: "#424242" }} className={this.state.patientdetailsinfomrationtoggle === true ? "fa fa-angle-up rotate-icon" : "fa fa-angle-down"} onClick={this.patientdetailsInformationToggle} />
                                    {this.state.patientdetailsinfomrationtoggle &&
                                        <>
                                            <MDBDataTable
                                                small
                                                hover={true}
                                                responsive={true}
                                                paging={false}
                                                searching={false}
                                                data={this.state.patientdetailsinformationtable}
                                            />
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
                                    <MDBRow className="UnassignedQueues" style={{ paddingBottom: "1rem" }} onClick={this.pcpInformationToggle}> PCP Doctor Details / Information  </MDBRow>

                                    <i style={{ float: "right", marginTop: "-40px", paddingBottom: ".5rem", color: "#424242" }} className={this.state.pcpinfomrationtoggle === true ? "fa fa-angle-up rotate-icon" : "fa fa-angle-down"} onClick={this.pcpInformationToggle} />
                                    {this.state.pcpinfomrationtoggle &&
                                        <>
                                            <MDBDataTable
                                                small
                                                hover={true}
                                                responsive={true}
                                                paging={false}
                                                searching={false}
                                                data={this.state.pcpinformationtable}
                                            />
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
                                    <MDBRow className="UnassignedQueues" style={{ paddingBottom: "1rem" }} onClick={this.ContractedDoctorToggle}> Requested/Requesting Doctor (Contracted)  </MDBRow>

                                    <i style={{ float: "right", marginTop: "-40px", paddingBottom: ".5rem", color: "#424242" }} className={this.state.contracteddoctortoggle === true ? "fa fa-angle-up rotate-icon" : "fa fa-angle-down"} onClick={this.ContractedDoctorToggle} />
                                    {this.state.contracteddoctortoggle &&
                                        <>

                                            <MDBDataTable
                                                small
                                                hover={true}
                                                responsive={true}
                                                paging={false}
                                                searching={false}
                                                data={this.state.requestedcontractedtable}
                                            />

                                            <MDBRow style={{ marginLeft: "0px", marginBottom: "12px", fontSize: "16px", fontWeight: "700", color: "#424242" }}>
                                                Notes
                                            </MDBRow>
                                            {this.state.reqContractedDetailRowNotesArr && this.state.reqContractedDetailRowNotesArr.length > 0 ?
                                            <div style={{ overflowX: "auto", width: "100%", display: "block", padding: "10px 5px 20px 5px" }}>
                                                    <table className="oral-notification-table">
                                                        <thead>
                                                            <tr><th>No</th><th>Type</th><th>Note</th><th>Written By</th><th>Date</th></tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.reqContractedDetailRowNotesArr && this.state.reqContractedDetailRowNotesArr.map((item) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{item.type}</td>
                                                                        <td>{item.note}</td>
                                                                        <td>{item.written_by_id}</td>
                                                                        <td>{item.written_by}</td>
                                                                        <td>{item.date}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div> : "" }
                                            {/* <MDBDataTable
                                                small
                                                hover={true}
                                                responsive={true}
                                                paging={false}
                                                searching={false}
                                                data={this.state.requestedcontractednotestable}
                                            /> */}
                                            <div style={{ float: "right" }}>
                                                <MDBBtn color="" className="addnote" onClick={this.contracteddoctorModal}>Add Note</MDBBtn>
                                            </div>


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
                                    <MDBRow className="UnassignedQueues" style={{ paddingBottom: "1rem" }} onClick={this.NonContractedDoctorToggle}> Requested/Requesting Doctor (Non - Contracted)  </MDBRow>

                                    <i style={{ float: "right", marginTop: "-40px", paddingBottom: ".5rem", color: "#424242" }} className={this.state.noncontracteddoctortoggle === true ? "fa fa-angle-up rotate-icon" : "fa fa-angle-down"} onClick={this.NonContractedDoctorToggle} />
                                    {this.state.noncontracteddoctortoggle &&
                                        <>
                                            <MDBDataTable
                                                small
                                                hover={true}
                                                responsive={true}
                                                paging={false}
                                                searching={false}
                                                data={this.state.requestednoncontractedtable}
                                            />

                                            <MDBRow style={{ marginLeft: "0px", marginBottom: "12px", fontSize: "16px", fontWeight: "700", color: "#424242" }}>
                                                Notes
                                            </MDBRow>
                                            {this.state.reqnonContractedDetailRowNotesArr && this.state.reqnonContractedDetailRowNotesArr.length > 0 ?
                                            <div style={{ overflowX: "auto", width: "100%", display: "block", padding: "10px 5px 20px 5px" }}>
                                                    <table className="oral-notification-table">
                                                        <thead>
                                                            <tr><th>No</th><th>Type</th><th>Note</th><th>Written By</th><th>Date</th></tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.reqnonContractedDetailRowNotesArr && this.state.reqnonContractedDetailRowNotesArr.map((item) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{item.type}</td>
                                                                        <td>{item.note}</td>
                                                                        <td>{item.written_by_id}</td>
                                                                        <td>{item.written_by}</td>
                                                                        <td>{item.date}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div> : "" }
                                            {/* <MDBDataTable
                                                small
                                                hover={true}
                                                responsive={true}
                                                paging={false}
                                                searching={false}
                                                data={this.state.requestednoncontractednotestable}
                                            /> */}
                                            <div style={{ float: "right" }}>
                                                <MDBBtn color="" className="addnote" onClick={this.noncontracteddoctorModal}>Add Note</MDBBtn>
                                            </div>
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
                                    <MDBRow className="UnassignedQueues" style={{ paddingBottom: "1rem" }} onClick={this.DiagnosisToggle}> Diagnosis  </MDBRow>

                                    <i style={{ float: "right", marginTop: "-40px", paddingBottom: ".5rem", color: "#424242" }} className={this.state.diagnosistoggle === true ? "fa fa-angle-up rotate-icon" : "fa fa-angle-down"} onClick={this.DiagnosisToggle} />
                                    {this.state.diagnosistoggle &&
                                        <>
                                            <MDBDataTable
                                                small
                                                hover={true}
                                                responsive={true}
                                                paging={false}
                                                searching={false}
                                                data={this.state.diagnosistable}
                                            />
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
                                    <MDBRow className="UnassignedQueues" style={{ paddingBottom: "1rem" }} onClick={this.ServiceRequestToggle}> Service Request </MDBRow>

                                    <i style={{ float: "right", marginTop: "-40px", paddingBottom: ".5rem", color: "#424242" }} className={this.state.servicerequesttoggle === true ? "fa fa-angle-up rotate-icon" : "fa fa-angle-down"} onClick={this.ServiceRequestToggle} />
                                    {this.state.servicerequesttoggle &&
                                        <>
                                            <MDBDataTable
                                                small
                                                hover={true}
                                                responsive={true}
                                                paging={false}
                                                searching={false}
                                                data={this.state.servicerequesttable}
                                            />
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
                                    <MDBRow className="UnassignedQueues" style={{ paddingBottom: "1rem" }} onClick={this.AuthNotesToggle}> Authorization Notes  </MDBRow>

                                    <i style={{ float: "right", marginTop: "-40px", paddingBottom: ".5rem", color: "#424242" }} className={this.state.authnotestoggle === true ? "fa fa-angle-up rotate-icon" : "fa fa-angle-down"} onClick={this.AuthNotesToggle} />
                                    {this.state.authnotestoggle &&
                                        <>
                                            {/* <MDBDataTable
                                                small
                                                hover={true}
                                                responsive={true}
                                                paging={false}
                                                searching={false}
                                                data={this.state.authnotestable}
                                            /> */}
                                            {this.state.authnotesRowArray && this.state.authnotesRowArray.length > 0 ?
                                            <div style={{ overflowX: "auto", width: "100%", display: "block", padding: "10px 5px 20px 5px" }}>
                                                    <table className="oral-notification-table">
                                                        <thead>
                                                            <tr><th>No</th><th>Type</th><th>Note</th><th>Written By</th><th>Date</th></tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.authnotesRowArray && this.state.authnotesRowArray.map((item) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{item.type}</td>
                                                                        <td>{item.note}</td>
                                                                        <td>{item.written_by_id}</td>
                                                                        <td>{item.written_by}</td>
                                                                        <td>{item.date}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div> : "" }

                                            <div style={{ float: "right" }}>
                                                <MDBBtn color="" className="addnote" onClick={this.authorizationModal}>Add Note</MDBBtn>
                                            </div>
                                        </>
                                    }
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    <div className="text-center buttons-container" style={{ marginBottom: "96px" }}>
                        <MDBBtn color="" className="next-button" onClick={this.validateDetails}>SAVE</MDBBtn>
                    </div>
                    <MDBModal isOpen={this.state.contractedModal} toggle={this.contractedmodaltoggle} className="newauthviewmodal">
                        <MDBModalHeader className="modaltitle" toggle={this.contractedmodaltoggle}>Add Note</MDBModalHeader>
                        <MDBModalBody className="newauthviewmodalbody">
                            <MDBRow>
                                <MDBCol md="12">
                                    <MDBSelect
                                        options={this.state.notetypes}
                                        // label="Type"
                                        selected = "Type"
                                        className="notetypedropdown"
                                        // selected={this.state.selectednotetype}
                                        getTextContent={(text) => this.handleNoteTypeChange(text)}
                                        // getCon={(val) => this.handleNoteTypeChange(val)}
                                    />

                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="12">
                                    <div className="authviewcardbody">
                                        <MDBInput type="textarea" label="Please write the action" onChange={this.handleNotedescriptionchnage} value={this.state.notedescription}></MDBInput>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn flat className="flatbutton" onClick={this.contractedmodaltoggle}>Cancel</MDBBtn>
                            <MDBBtn flat className="flatbutton" onClick={this.saveNotes}>save</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                    <MDBModal isOpen={this.state.noncontractedModal} toggle={this.noncontractedmodaltoggle} className="newauthviewmodal">
                        <MDBModalHeader className="modaltitle" toggle={this.noncontractedmodaltoggle}>Add Note</MDBModalHeader>
                        <MDBModalBody className="newauthviewmodalbody">
                            <MDBRow>
                                <MDBCol md="12">
                                    <MDBSelect
                                        options={this.state.nonContractednotetypes}
                                        // label="Type"
                                        className="notetypedropdown"
                                        selected = "Type"
                                        // selected={this.state.nonContractednotetype}
                                        getTextContent={(text) => this.handleNonContractedNoteTypeChange(text)}
                                        // getValue={(val) => this.handleNoteTypeChange(val)}
                                    />

                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="12">
                                    <div className="authviewcardbody">
                                        <MDBInput type="textarea" label="Please write the action" onChange={this.handleNonContracteddescriptionchnage} value={this.state.nonContracteddescription}></MDBInput>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn flat className="flatbutton" onClick={this.noncontractedmodaltoggle}>Cancel</MDBBtn>
                            <MDBBtn flat className="flatbutton" onClick={this.saveNonContractedNotes}>save</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                    <MDBModal isOpen={this.state.authorizationModal} toggle={this.authorizationmodaltoggle} className="newauthviewmodal">
                        <MDBModalHeader className="modaltitle" toggle={this.authorizationmodaltoggle}>Add Authorization Note</MDBModalHeader>
                        <MDBModalBody className="newauthviewmodalbody">
                            <MDBRow>
                                <MDBCol md="12">
                                    <MDBSelect
                                        options={this.state.authTypes}
                                        // label="Type"
                                        className="notetypedropdown"
                                        selected = "Type"
                                        // selected={this.state.selectedAuthTypes}
                                        getTextContent={(text) => this.handleAuthTypeChange(text)}
                                    />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="12">
                                    <div className="authviewcardbody">
                                        <MDBInput type="textarea" label="Please write the action" onChange={this.authNoteTypeHandler} value={this.state.authNoteDescription}></MDBInput>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn flat className="flatbutton" onClick={this.authorizationmodaltoggle}>Cancel</MDBBtn>
                            <MDBBtn flat className="flatbutton" onClick={this.saveAuthNotes}>save</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                    <MDBModal isOpen={this.state.historymodal} toggle={this.historymodaltoggle} className="historymodal">
                        <MDBModalHeader className="modaltitle" toggle={this.historymodaltoggle}>History</MDBModalHeader>
                        <MDBModalBody className="modalbody">
                            <div>
                                <MDBIcon icon="search" className="historysearchIcon" />
                                <input placeholder="Keywords" id="searching" className="historysearching" type="text" onChange={this.onHandleSearch.bind(this)} />
                            </div>
                            <MDBRow style={{ marginTop: "12px", marginLeft: "12px", overflowY: "auto", maxHeight: "350px" }}>
                                {this.state.historyDetails && this.state.historyDetails.map((item) => {
                                    return(
                                    <div className="historycontent">
                                        <p style={{ marginTop: "8px", color: "#424242", fontSize: "14px", lineHeight: "19px", fontWeight: "bolder" }}>{moment(item.modified_date).format('MM/DD/YYYY hh:mm')}</p>
                                        {item.assigned_to === "UNASSIGNED" ? <p style={{ color: "#424242", fontSize: "14px", lineHeight: "19px" }}><span style={{ color: "#4CAF50", fontWeight: "600" }}>{item.modified_by + " , " + item.modified_user_role}</span> created the referral.</p> : 
                                            <p style={{ color: "#424242", fontSize: "14px", lineHeight: "19px" }}><span style={{ color: "#4CAF50", fontWeight: "600" }}>{item.modified_by + " , " + item.modified_user_role}</span> reassigned to <span style={{ color: "#536DFE", fontWeight: "600" }}>{item.assigned_to + " , "+ item.assigned_to_user_role}</span></p>
                                        }
                                    </div>
                                    )
                                })}
                                {/* <div className="historycontent">
                                    <p style={{ marginTop: "8px", color: "#424242", fontSize: "14px", lineHeight: "19px", fontWeight: "bolder" }}>7/15/2021 11:01 AM</p>
                                    <p style={{ color: "#424242", fontSize: "14px", lineHeight: "19px" }}><span style={{ color: "#4CAF50", fontWeight: "600" }}>{"Ina Mendez, Nurse"}</span> reassigned to <span style={{ color: "#536DFE", fontWeight: "600" }}>Jacey Young, Coordinator</span></p>
                                </div>
                                <div className="historycontent">
                                    <p style={{ marginTop: "8px", color: "#424242", fontSize: "14px", lineHeight: "19px", fontWeight: "bolder" }}>7/15/2021 11:01 AM</p>
                                    <p style={{ color: "#424242", fontSize: "14px", lineHeight: "19px" }}><span style={{ color: "#4CAF50", fontWeight: "600" }}>{"Danny Green, MD"}</span> reassigned to <span style={{ color: "#536DFE", fontWeight: "600" }}>Jason Tatum, Supervisor</span></p>
                                </div>
                                <div className="historycontent">
                                    <p style={{ marginTop: "8px", color: "#424242", fontSize: "14px", lineHeight: "19px", fontWeight: "bolder" }}>7/15/2021 11:01 AM</p>
                                    <p style={{ color: "#424242", fontSize: "14px", lineHeight: "19px" }}><span style={{ color: "#4CAF50", fontWeight: "600" }}>{"Jacey Young, Coordinator"}</span> reassigned to <span style={{ color: "#536DFE", fontWeight: "600" }}>Danny Green, MD</span></p>
                                </div>
                                <div className="historycontent">
                                    <p style={{ marginTop: "8px", color: "#424242", fontSize: "14px", lineHeight: "19px", fontWeight: "bolder" }}>7/15/2021 11:01 AM</p>
                                    <p style={{ color: "#424242", fontSize: "14px", lineHeight: "19px" }}><span style={{ color: "#4CAF50", fontWeight: "600" }}>{"Jason Tatum, Supervisor"}</span> reassigned to <span style={{ color: "#536DFE", fontWeight: "600" }}>Carl Pittman, Nurse</span></p>
                                </div> */}

                            </MDBRow>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn flat className="flatbutton" onClick={this.historymodaltoggle}>Close</MDBBtn>

                        </MDBModalFooter>
                    </MDBModal>
                    <MDBModal isOpen={this.state.reassignModal} toggle={this.reassignmodaltoggle} className="newauthviewmodal" onClick={this.closeCareTeamDetails}>
                        <MDBModalHeader className="modaltitle" toggle={this.reassignmodaltoggle}>Reassign Queue</MDBModalHeader>
                        <MDBModalBody className="newauthviewmodalbody">
                            <MDBRow>
                                <MDBCol md="12">
                                    <MDBSelect
                                        options={this.state.roles}
                                        // label="Type"
                                        selected = "Type"
                                        className="notetypedropdown"
                                        // selected={this.state.assignedrole}
                                        getValue={(val) => this.handleRoleChange(val)}
                                    />
                                </MDBCol>
                            </MDBRow>
                           <div>
                                <MDBIcon icon="search" className="reassignsearchIcon" />
                                <input placeholder="Member ID or Name" id="searching" className="historysearching" type="text" disabled={this.state.selectedPerson.length > 0 ? true : false} value={this.state.searchMember} onChange={this.onReassignMemberSearch} onFocus={this.getreassignMemberSearch} />
                            </div>
                            <div className={this.state.searchStarts ? 'contact-list' : 'contact-list hide'}>
                                        {
                                            this.state.copyOfOfreassignmembers && this.state.copyOfOfreassignmembers.map((el) => {
                                                return (
                                                    <MDBRow className="justify-content-start patients-items-row" style={{ padding: "5px" }} onClick={this.selectedCaremanager.bind(this, el)}>
                                                        <MDBCol sm="8" md="8" lg="8" className="align-items-center details">
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
                                                    </MDBRow>

                                                )
                                            })
                                        }
                            </div>
                            {this.state.selectedPerson && this.state.selectedPerson.map((item) => {
                                return(
                                    <MDBRow>
                                       <div className="users">
                                            <div className="details">
                                                <div className="ellipse">
                                                    <span className="circletext">{item.firstname.charAt(0).toUpperCase() + item.lastname.charAt(0).toUpperCase()}</span>
                                                </div>
                                                <div className="name-details">
                                                    <div style={{ fontSize: "12px", color: "#424242" }}>{item.firstname + " " + item.lastname}</div>
                                                    <div style={{ fontSize: "10px", color: "#424242" }}>9032760358</div>
                                                </div>
                                            </div>
                                            <div className="icons-class"><MDBIcon icon="times" onClick={this.removeSelctedMember}/> </div>
                                        </div>
                                    </MDBRow>
                                )
                            })}
                            <MDBRow>
                                <MDBCol>
                                    <div className="authviewcardbody">
                                        <MDBInput type="textarea" label="Please write the action" onChange={this.reassignDescriptionChane} value={this.state.reassignDescription}></MDBInput>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn flat className="flatbutton" onClick={this.reassignmodaltoggle}>Cancel</MDBBtn>
                            <MDBBtn flat className="flatbutton" onClick={this.saveReassignModal}>save</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                    <MDBModal isOpen={this.state.autoreasssignconfirmationmodal} toggle={this.toggleconfirmationtoggle} className="newauthviewmodal">
                        <MDBModalHeader className="modaltitle" toggle={this.toggleconfirmationtoggle}>Confirmation</MDBModalHeader>
                        <MDBModalBody className="modalbody">
                        {this.state.assignedMember === "UNASSIGNED" ? 
                            <p className="confirmationmodalmessage">Are you sure you want to assign the referal to <span style={{ color: "#DB1962", fontWeight:"600" }}>{this.state.assigneeMember}</span> ? </p> : 
                            <p className="confirmationmodalmessage">Are you sure you want to reassign the queue from  <span style={{ color: "#DB1962", fontWeight:"600" }}>{this.state.assignedMember}</span>  to <span style={{ color: "#DB1962", fontWeight:"600" }}>{this.state.assigneeMember}</span> ? </p>
                            }
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn flat className="flatbutton" onClick={this.toggleconfirmationtoggle}>Cancel</MDBBtn>
                            <MDBBtn flat className="flatbutton" onClick={this.confirmReassignModal}>Confirm</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                    <MDBModal isOpen={this.state.refertoprogramModal} toggle={this.refferprogrammodaltoggle} className="newauthviewmodal">
                        <MDBModalHeader className="modaltitle" toggle={this.refferprogrammodaltoggle}>Refer to Program</MDBModalHeader>
                        <MDBModalBody className="newauthviewmodalbody">
                            <MDBRow>
                                <MDBCol md="12">
                                    <MDBSelect
                                        options={this.state.departments}
                                        // label="Department"
                                        className="notetypedropdown"
                                        // selected={this.state.department}
                                        selected = "Department"
                                        getValue={(val) => this.handleDepartmentChange(val)}
                                    />

                                </MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol md="12">
                                    <MDBSelect
                                        options={this.state.refertoprogramroles}
                                        // label="Role"
                                        className="notetypedropdown"
                                        selected = "Role"
                                        // selected={this.state.referetoprogramrole}
                                        getValue={(val) => this.handleProgramRoleChange(val)}
                                    />

                                </MDBCol>
                            </MDBRow>
                           <div>
                                    <MDBIcon icon="search" className="reassignsearchIcon" />
                                    <input placeholder="Member ID or Name" id="searching" className="historysearching" type="text" value={this.state.searchMember} onChange={this.onReassignMemberSearch} onFocus={this.getreassignMemberSearch} />
                                </div>
                            <MDBRow>
                               <div className="users">
                                    <div className="details">
                                        <div className="ellipse">
                                            <span className="circletext">C</span>
                                        </div>
                                        <div className="name-details">
                                            <div style={{ fontSize: "12px", color: "#424242" }}>Carl Pittman</div>
                                            <div style={{ fontSize: "10px", color: "#424242" }}>123099202334</div>
                                        </div>
                                    </div>
                                    <div className="icons-class"><MDBIcon icon="times"/> </div>



                                </div>
                            </MDBRow>

                            <MDBRow style={{marginTop: "16px"}} >
                                <MDBCol md="12">
                                    <div className="authviewcardbody">
                                        <MDBInput type="textarea" label="Note" onChange={this.handleNotedescriptionchnage} value={this.state.notedescription}></MDBInput>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn flat className="flatbutton" onClick={this.refferprogrammodaltoggle}>Cancel</MDBBtn>
                            <MDBBtn flat className="flatbutton" onClick={this.refertoprogramConfirmationModal}>save</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                    <MDBModal isOpen={this.state.refertoprogramconfirmationmodal} toggle={this.autoreasssignconfirmationtoggle} className="newauthviewmodal">
                        <MDBModalHeader className="modaltitle" toggle={this.refertoprogramConfirmationModalToggle}>Confirmation</MDBModalHeader>
                        <MDBModalBody className="modalbody">
                            <p className="confirmationmodalmessage">Are you sure you want to refer to program to  <span style={{ color: "#DB1962" }}>Carl Pittman</span> ? </p>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn flat className="flatbutton" onClick={this.refertoprogramConfirmationModalToggle}>Cancel</MDBBtn>
                            <MDBBtn flat className="flatbutton" onClick={this.refertoprogramConfirmationModalToggle}>Confirm</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                    <MDBModal isOpen={this.state.showConfirmonModal} toggle={this.showConfirmonModalToggle} className="create-referal-modal">
                        <MDBModalHeader className="modaltitle">Confirmation</MDBModalHeader>
                        <MDBModalBody>
                            <div className="modalconfirmationtitle text-left" style={{ marginLeft: "10px", marginTop: "-20px" }}> The referal has been updated successfully.</div>
                            <div className="text-right">
                                {/* <MDBBtn flat className="flatbutton" onClick={this.showConfirmDeletetoggle}>Cancel</MDBBtn> */}
                                <MDBBtn flat className="flatbutton" onClick={this.saveCreateReferalDetails}>Confirm</MDBBtn>
                            </div>
                        </MDBModalBody>
                    </MDBModal>
                    

                    {!this.state.isLoaded && <Loader />}
                    <style jsx>{authviewStyles}</style>
                </Layout>
            </React.Fragment>
        );
    }
};

export default AuthView;

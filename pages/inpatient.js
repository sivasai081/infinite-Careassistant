
import React, { Component } from "react";
import {
    MDBRow, MDBCol, MDBTypography, MDBSelect, MDBCard, MDBCardBody, MDBDataTable, MDBCollapseHeader, MDBIcon, MDBDatePicker, MDBTimeline, MDBTimelineStep, MDBInput, MDBCollapse, MDBBtn, MDBModal,
    MDBDataTableV5, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBChipsInput, MDBSelectInput, MDBSelectOptions, MDBSelectOption, MDBCardTitle
} from "mdbreact";
import moment from 'moment';
import ReactHighcharts from 'react-highcharts';
import inpatientStyles from '../styles/inpatient';
import Head from 'next/head';
import axios from 'axios';
import Loader from '../components/loader';
import Layout from "../components/layout";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import * as Data from '../data/data';
import outpatientStyles from '../styles/outpatient';
import PatientListStyle from '../styles/patientliststyles.js';
import Pagination from '@material-ui/lab/Pagination';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
} from 'mdb-react-ui-kit';





class Inpatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageFrom: 0,
            perPage: 10,
            page: 1,
            totalCountofpatients: 1,
            subMenuActive: 'ALL',
            selctedAuthdropdownValue: "MONTHLY",
            authAllHistory: [],
            openAuthHistory: [],
            approvedAuthHistory: [],
            rejectedAuthHistory: [],
            canceledAuthHistoty: [],
            diagnosisArray: [],
            oralNotificationHeader: "",
            rowClicked: "",
            rowTitle: "",
            unassignedInpatients: [],
            assignedCoodinators: [],
            authscreencreatedby: [],
            authscreenmodifiedby: [],
            servicerequestProviderData:[],
            basicActive: 'tab1',
            showWarningModal:false,
            collapseID: "",
            isLoaded: false,
            serviceTypes: [],
            selctedServiceType: "",
            serviceCategories: [],
            providerdetailsdescription:"",
            inpatientassignedinpatientQueue: [],
            inpatientassignedCoordinatorQueue: [],
            inpatientassignedNurseQueue: [],
            inpatientassignedMDQueue: [],
            inpatientassignedTOCQueue: [],
            inpatientassignedFeeforServiceQueue: [],
            inpatientassignedDRGQueue: [],
            inpatientassignedSkilledQueue: [],
            inpatientassignedCatastrophocQueue: [],
            inpatientassignedDPQueue: [],
            serachTableData: [],
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
            searchauthstatus: [{
                text: "OPEN",
                value: "0"
            }, {
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
            // serviceCategories: [{
            //     text: "Diagnosis",
            //     value: "0"
            // },
            // {
            //     text: "Retro",
            //     value: "1"
            // },
            // {
            //     text: "Appeal",
            //     value: "2"
            // }],
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
            userDataRows: [],
            showConfirmonModal: false,
            patientDetails: [],
            oldPatientDetails: [],
            requestingProviderDetailsList: [
                { value: "12548" },
                { value: "12549" },
                { value: "12550" }
            ],

            oldrequestingProviderDetailsList: [
                { value: "12548" },
                { value: "12549" },
                { value: "12550" }
            ],
            requestingPrefferedDetailsList: [
                { value: "56987" },
                { value: "56988" },
                { value: "56989" }
            ],
            oldrequestingPrefferedDetailsList: [
                { value: "56987" },
                { value: "56988" },
                { value: "56989" }
            ],
            servicerequestDetailsList: [],
            oldservicerequestDetailsList: [],


            adddiagnosisDetailsList: [],
            oldadddiagnosisDetailsList: [],


            selectedPatientData: [],
            searchStarts: false,
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
            selectedprioritytype: "",
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
            quantity: "",
            modifier: "",
            finacialResponsibility: "",
            covered: "",
            myassignmenturgentqueue: {
                columns: [
                    {
                        label: 'Type',
                        field: 'type',
                    },
                    {
                        label: '0-1D',
                        field: 'onedimension',
                    },
                    {
                        label: '2D',
                        field: 'twodimension',
                    },
                    {
                        label: '3D',
                        field: 'threedimension',
                    },
                ],
                rows: [
                    {
                        type: "Medicare",
                        onedimension: "1",
                        twodimension: "0",
                        threedimension: "1"
                    },
                    {
                        type: "Medi-cal",
                        onedimension: "0",
                        twodimension: "0",
                        threedimension: "3"
                    },
                    {
                        type: "Commercial",
                        onedimension: "2",
                        twodimension: "0",
                        threedimension: "1"
                    }
                ]
            },
            urgentmedicaretable: {
                columns: [
                    {
                        label: '0-1D',
                        field: 'onedimension',
                    },
                    {
                        label: '2D',
                        field: 'twodimension',
                    },
                    {
                        label: '3D',
                        field: 'threedimension',
                    },
                ],
                rows: [
                    {
                        onedimension: "1",
                        twodimension: "2",
                        threedimension: "0"
                    }
                ]
            },
            medicalcommercialtable: {
                columns: [
                    {
                        label: '0-1D',
                        field: 'onedimension',
                    },
                    {
                        label: '2D',
                        field: 'twodimension',
                    },
                    {
                        label: '3D',
                        field: 'threedimension',
                    },
                ],
                rows: [
                    {
                        onedimension: "1",
                        twodimension: "2",
                        threedimension: "0"
                    }
                ]
            },
            routinemedicalcommercialtable: {
                columns: [
                    {
                        label: '0-1D',
                        field: 'onedimension',
                    },
                    {
                        label: '2D',
                        field: 'twodimension',
                    },
                    {
                        label: '3D',
                        field: 'threedimension',
                    },
                    {
                        label: '4D',
                        field: 'fourdimension',
                    },
                    {
                        label: '5D',
                        field: 'fivedimension',
                    },
                ],
                rows: [
                    {
                        onedimension: "1",
                        twodimension: "2",
                        threedimension: "0",
                        fourdimension: "1",
                        fivedimension: "1",
                    }
                ]
            },
            pharmacytable: {
                columns: [
                    {
                        label: '24 hours',
                        field: 'onedimension',
                    }
                ],
                rows: [
                    {
                        onedimension: "1",

                    }
                ]
            },
            myassignmentoralnotification: {
                columns: [
                    {
                        label: 'Type',
                        field: 'type',
                    },
                    {
                        label: '0-1D',
                        field: 'onedimension',
                    },
                    {
                        label: '2D',
                        field: 'twodimension',
                    },
                    {
                        label: '3D',
                        field: 'threedimension',
                    },
                ],
                rows: [
                    {
                        type: "Medicare",
                        onedimension: "1",
                        twodimension: "2",
                        threedimension: "0"
                    },
                    {
                        type: "Pharmacy",
                        onedimension: "4",
                        twodimension: "1",
                        threedimension: "3"
                    }
                ]
            },
            myassignmentroutinemedicare: {
                columns: [

                    {
                        label: '0-1D',
                        field: 'onedimension',
                    },
                    {
                        label: '2D',
                        field: 'twodimension',
                    },
                    {
                        label: '3D',
                        field: 'threedimension',
                    },
                    {
                        label: '4D',
                        field: 'fourdimension',
                    },
                    {
                        label: '5D',
                        field: 'fivedimension',
                    },
                    {
                        label: '6D',
                        field: 'sixdimension',
                    },
                    {
                        label: '7D',
                        field: 'sevendimension',
                    },
                    {
                        label: '8D',
                        field: 'eightdimension',
                    },
                    {
                        label: '9D',
                        field: 'ninedimension',
                    },
                    {
                        label: '10D',
                        field: 'tendimension',
                    },
                    {
                        label: '11D',
                        field: 'elevendimension',
                    },
                    {
                        label: '12D',
                        field: 'twelvedimension',
                    },
                    {
                        label: '13D',
                        field: 'thirteendimension',
                    },
                    {
                        label: '14D',
                        field: 'fourteendimension',
                    }

                ],
                rows: [
                    {
                        onedimension: "4",
                        twodimension: "6",
                        threedimension: "3",
                        fourdimension: "3",
                        fivedimension: "2",
                        sixdimension: "3",
                        sevendimension: "1",
                        eightdimension: "1",
                        ninedimension: "1",
                        tendimension: "1",
                        elevendimension: "1",
                        twelvedimension: "1",
                        thirteendimension: "1",
                        fourteendimension: "1"
                    }
                ]
            },
            unassignedroutinemedicare: {
                columns: [

                    {
                        label: '0-1D',
                        field: 'onedimension',
                    },
                    {
                        label: '2D',
                        field: 'twodimension',
                    },
                    {
                        label: '3D',
                        field: 'threedimension',
                    },
                    {
                        label: '4D',
                        field: 'fourdimension',
                    },
                    {
                        label: '5D',
                        field: 'fivedimension',
                    },
                    {
                        label: '6D',
                        field: 'sixdimension',
                    },
                    {
                        label: '7D',
                        field: 'sevendimension',
                    },
                    {
                        label: '8D',
                        field: 'eightdimension',
                    },
                    {
                        label: '9D',
                        field: 'ninedimension',
                    },
                    {
                        label: '10D',
                        field: 'tendimension',
                    },
                    {
                        label: '11D',
                        field: 'elevendimension',
                    },
                    {
                        label: '12D',
                        field: 'twelvedimension',
                    },
                    {
                        label: '13D',
                        field: 'thirteendimension',
                    },
                    {
                        label: '14D',
                        field: 'fourteendimension',
                    }

                ],
                rows: [
                    {
                        onedimension: "1",
                        twodimension: "2",
                        threedimension: "0",
                        fourdimension: "1",
                        fivedimension: "1",
                        sixdimension: "1",
                        sevendimension: "1",
                        eightdimension: "1",
                        ninedimension: "1",
                        tendimension: "1",
                        elevendimension: "1",
                        twelvedimension: "1",
                        thirteendimension: "1",
                        fourteendimension: "1"
                    }
                ]
            },
            unassignedDelay: {
                columns: [

                    {
                        label: '0-1D',
                        field: 'onedimension',
                    },
                    {
                        label: '2D',
                        field: 'twodimension',
                    },
                    {
                        label: '3D',
                        field: 'threedimension',
                    },
                    {
                        label: '4D',
                        field: 'fourdimension',
                    },
                    {
                        label: '5D',
                        field: 'fivedimension',
                    },
                    {
                        label: '6D',
                        field: 'sixdimension',
                    },
                    {
                        label: '7D',
                        field: 'sevendimension',
                    },
                    {
                        label: '8D',
                        field: 'eightdimension',
                    },
                    {
                        label: '9D',
                        field: 'ninedimension',
                    },
                    {
                        label: '10D',
                        field: 'tendimension',
                    },
                    {
                        label: '11D',
                        field: 'elevendimension',
                    },
                    {
                        label: '12D',
                        field: 'twelvedimension',
                    },
                    {
                        label: '13D',
                        field: 'thirteendimension',
                    },
                    {
                        label: '14D',
                        field: 'fourteendimension',
                    }

                ],
                rows: [
                    {
                        onedimension: "1",
                        twodimension: "2",
                        threedimension: "0",
                        fourdimension: "1",
                        fivedimension: "1",
                        sixdimension: "1",
                        sevendimension: "1",
                        eightdimension: "1",
                        ninedimension: "1",
                        tendimension: "1",
                        elevendimension: "1",
                        twelvedimension: "1",
                        thirteendimension: "1",
                        fourteendimension: "1"
                    }
                ]
            },
            myassignmentroutinemedical: {
                columns: [
                    {
                        label: '0-1D',
                        field: 'onedimension',
                    },
                    {
                        label: '2D',
                        field: 'twodimension',
                    },
                    {
                        label: '3D',
                        field: 'threedimension',
                    },
                    {
                        label: '4D',
                        field: 'fourdimension',
                    },
                    {
                        label: '5D',
                        field: 'fivedimension',
                    },
                ],
                rows: [
                    {
                        onedimension: "4",
                        twodimension: "6",
                        threedimension: "3",
                        fourdimension: "3",
                        fivedimension: "2"
                    }
                ]
            },
            oralnotificationdetails: {
                columns: [
                    {
                        label: 'Request Type',
                        field: 'requesttype',
                    },
                    {
                        label: 'Patient Name',
                        field: 'patientname',
                    },
                    {
                        label: 'Auth No.',
                        field: 'authnumber',
                    },
                    {
                        label: 'Drug Name',
                        field: 'drugname',
                    },
                    {
                        label: 'Task',
                        field: 'task',
                    },
                    {
                        label: 'Effective',
                        field: 'effective',
                    },
                    {
                        label: 'Term',
                        field: 'term',
                    },
                    {
                        label: 'Received',
                        field: 'received',
                    },
                    {
                        label: 'Provider Last Name',
                        field: 'providerlastname',
                    },
                    {
                        label: 'Status Reason',
                        field: 'reason',
                    },
                ],
                rows: [
                    {
                        requesttype: "Coverage Detail",
                        patientname: "Doyna Miller",
                        authnumber: "15211464074",
                        drugname: "REMICADE For uncerative colitis",
                        task: "Post-Decision is needed",
                        effective: "Jul 30 2015",
                        term: "July 30 2017",
                        received: "Jul 30 2015 23:11:22",
                        providerlastname: "Shah",
                        reason: "Criteria Meet"
                    },
                    {
                        requesttype: "Redetermination",
                        patientname: "Johhny Evans",
                        authnumber: "15211464074",
                        drugname: "REMICADE For uncerative colitis",
                        task: "Post-Decision is needed",
                        effective: "Jul 30 2015",
                        term: "July 30 2017",
                        received: "Jul 30 2015 23:11:22",
                        providerlastname: "Shah",
                        reason: "Criteria Meet"
                    },
                    {
                        requesttype: "Coverage Detail",
                        patientname: "Johhny Evans",
                        authnumber: "15211464074",
                        drugname: "REMICADE For uncerative colitis",
                        task: "Post-Decision is needed",
                        effective: "Jul 30 2015",
                        term: "July 30 2017",
                        received: "Jul 30 2015 23:11:22",
                        providerlastname: "Shah",
                        reason: "Criteria Meet"
                    },
                    {
                        requesttype: "Redetermination",
                        patientname: "Doyna Miller",
                        authnumber: "15211464074",
                        drugname: "REMICADE For uncerative colitis",
                        task: "Post-Decision is needed",
                        effective: "Jul 30 2015",
                        term: "July 30 2017",
                        received: "Jul 30 2015 23:11:22",
                        providerlastname: "Shah",
                        reason: "Criteria Meet"
                    }
                ]
            },
            assignesqueuesurgents: {
                columns: [
                    {
                        label: '0-1D',
                        field: 'onedimension',
                    },
                    {
                        label: '2D',
                        field: 'twodimension',
                    },
                    {
                        label: '3D',
                        field: 'threedimension',
                    },
                ],
                rows: [
                    {
                        onedimension: "1",
                        twodimension: "2",
                        threedimension: "0"
                    }
                ]
            },
            assignesqueuesmedicalroutines: {
                columns: [
                    {
                        label: '0-1D',
                        field: 'onedimension',
                    },
                    {
                        label: '2D',
                        field: 'twodimension',
                    },
                    {
                        label: '3D',
                        field: 'threedimension',
                    },
                    {
                        label: '4D',
                        field: 'fourdimension',
                    },
                    {
                        label: '5D',
                        field: 'fivedimension',
                    },
                ],
                rows: [
                    {
                        onedimension: "1",
                        twodimension: "2",
                        threedimension: "0",
                        fourdimension: "1",
                        fivedimension: "1"
                    }
                ]
            },
            assignesqueuesmedicareroutines: {
                columns: [

                    {
                        label: '0-1D',
                        field: 'onedimension',
                    },
                    {
                        label: '2D',
                        field: 'twodimension',
                    },
                    {
                        label: '3D',
                        field: 'threedimension',
                    },
                    {
                        label: '4D',
                        field: 'fourdimension',
                    },
                    {
                        label: '5D',
                        field: 'fivedimension',
                    },
                    {
                        label: '6D',
                        field: 'sixdimension',
                    },
                    {
                        label: '7D',
                        field: 'sevendimension',
                    },
                    {
                        label: '8D',
                        field: 'eightdimension',
                    },
                    {
                        label: '9D',
                        field: 'ninedimension',
                    },
                    {
                        label: '10D',
                        field: 'tendimension',
                    },
                    {
                        label: '11D',
                        field: 'elevendimension',
                    },
                    {
                        label: '12D',
                        field: 'twelvedimension',
                    },
                    {
                        label: '13D',
                        field: 'thirteendimension',
                    },
                    {
                        label: '14D',
                        field: 'fourteendimension',
                    }

                ],
                rows: [
                    {
                        onedimension: "1",
                        twodimension: "2",
                        threedimension: "0",
                        fourdimension: "1",
                        fivedimension: "1",
                        sixdimension: "1",
                        sevendimension: "1",
                        eightdimension: "1",
                        ninedimension: "1",
                        tendimension: "1",
                        elevendimension: "1",
                        twelvedimension: "1",
                        thirteendimension: "1",
                        fourteendimension: "1"
                    }
                ]
            },
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
            authscreensearchresults: {
                columns: [
                    {
                        label: 'Request Type',
                        field: 'requesttype',
                    },
                    {
                        label: 'Patient Name',
                        field: 'patientname',
                    },
                    {
                        label: 'Auth No.',
                        field: 'authnumber',
                    },
                    {
                        label: 'Drug Name',
                        field: 'drugname',
                    },
                    {
                        label: 'Task',
                        field: 'task',
                    },
                    {
                        label: 'Effective',
                        field: 'effective',
                    },
                    {
                        label: 'Term',
                        field: 'term',
                    },
                    {
                        label: 'Received',
                        field: 'received',
                    },
                    {
                        label: 'Provider Last Name',
                        field: 'providerlastname',
                    },
                    {
                        label: 'Status Reason',
                        field: 'reason',
                    },
                ],
                rows: [
                    {
                        requesttype: "Coverage Detail",
                        patientname: "Doyna Miller",
                        authnumber: "15211464074",
                        drugname: "REMICADE For uncerative colitis",
                        task: "Post-Decision is needed",
                        effective: "Jul 30 2015",
                        term: "July 30 2017",
                        received: "Jul 30 2015 23:11:22",
                        providerlastname: "Shah",
                        reason: "Criteria Meet"
                    }
                ]
            },

            //Tab1 states start

            unassignedinpatientqueue: {
                columns: [
                    {
                        label: 'Facility',
                        field: 'facility'
                    },
                    {
                        label: '24 Hours',
                        field: 'hours'
                    }
                ],
                rows: [
                    {
                        facility: "Kaiser",
                        hours: "5"
                    },
                    {
                        facility: "St. Francis",
                        hours: "2"
                    },
                    {
                        facility: "Kaiser",
                        hours: "5"
                    },
                    {
                        facility: "Dignity",
                        hours: "1"
                    },
                    {
                        facility: "Unlisted Facility",
                        hours: "2"
                    }
                ],
            },
            assignedcordinatorqueues: {
                columns: [
                    {
                        label: 'Name',
                        field: 'name'
                    },
                    {
                        label: 'New admission',
                        field: 'newadmission'
                    },
                    {
                        label: 'Existing Cases',
                        field: 'exixtingcases'
                    },
                    {
                        label: 'Retro',
                        field: 'retro'
                    }
                ],
                rows: [
                    {
                        name: "Lisa Johnson",
                        newadmission: "5",
                        exixtingcases: "10",
                        retro: "3"
                    },
                    {
                        name: "Linda Maul",
                        newadmission: "1",
                        exixtingcases: "7",
                        retro: "0"
                    },
                    {
                        name: "Sam Mitchell",
                        newadmission: "2",
                        exixtingcases: "8",
                        retro: "2"
                    }
                ],
            },
            unassignednursequeue: {
                columns: [
                    {
                        label: 'Name',
                        field: 'name'
                    },
                    {
                        label: 'New admission',
                        field: 'newadmission'
                    },
                    {
                        label: 'Existing Cases',
                        field: 'exixtingcases'
                    },
                    {
                        label: 'Retro',
                        field: 'retro'
                    }
                ],
                rows: [
                    {
                        name: "Travis Hall",
                        newadmission: "5",
                        exixtingcases: "10",
                        retro: "3"
                    },
                    {
                        name: "Sarah Jones",
                        newadmission: "1",
                        exixtingcases: "7",
                        retro: "0"
                    },
                    {
                        name: "Paul Newman",
                        newadmission: "2",
                        exixtingcases: "8",
                        retro: "2"
                    }
                ],
            },
            assignedmdqueues: {
                columns: [
                    {
                        label: 'Name',
                        field: 'name'
                    },
                    {
                        label: 'New admission',
                        field: 'newadmission'
                    },
                    {
                        label: 'Existing Cases',
                        field: 'exixtingcases'
                    },
                    {
                        label: 'Retro',
                        field: 'retro'
                    },
                    {
                        label: 'Pier to Pier',
                        field: 'piertopier'
                    }
                ],
                rows: [
                    {
                        name: "Tobbie Harris",
                        newadmission: "5",
                        exixtingcases: "10",
                        retro: "3",
                        piertopier: '3',
                    },
                    {
                        name: "Jason kidd",
                        newadmission: "2",
                        exixtingcases: "3",
                        retro: "1",
                        piertopier: '1',
                    },
                    {
                        name: "marc kwon",
                        newadmission: "5",
                        exixtingcases: "11",
                        retro: "1",
                        piertopier: '2',
                    }
                ],
            },
            assigneddischargeplannerqueues: {
                columns: [
                    {
                        label: 'Name',
                        field: 'name'
                    },
                    {
                        label: 'Queue',
                        field: 'queue'
                    },

                ],
                rows: [
                    {
                        name: "Manny Ramirez",
                        queue: "1",
                    },
                    {
                        name: "Ryan Anderson",
                        queue: "1",
                    },
                    {
                        name: "Tony Alberts",
                        queue: "1",
                    },
                    {
                        name: "James Lee",
                        queue: "2",
                    },
                ],
            },
            assignedTOCqueues: {
                columns: [
                    {
                        label: 'Name',
                        field: 'name'
                    },
                    {
                        label: 'Queue',
                        field: 'queue'
                    },

                ],
                rows: [
                    {
                        name: "June Buick",
                        queue: "1",
                    },
                    {
                        name: "Stacey Augman",
                        queue: "1",
                    },
                    {
                        name: "Jenny Salah",
                        queue: "1",
                    },
                    {
                        name: "Vivien Allston",
                        queue: "2",
                    },
                ],
            },
            Feeforservicehospital: {
                columns: [
                    {
                        label: 'Facility',
                        field: 'facility'
                    },
                    {
                        label: 'Queue',
                        field: 'queue'
                    },

                ],
                rows: [
                    {
                        facility: "Kaiser",
                        queue: "5",
                    },
                    {
                        facility: "St. Francis",
                        queue: "2",
                    },
                    {
                        facility: "Dignity",
                        queue: "1",
                    },
                    {
                        facility: "Unlisted Facility",
                        queue: "2",
                    },
                ],
            },
            DRGhospital: {
                columns: [
                    {
                        label: 'Facility',
                        field: 'facility'
                    },
                    {
                        label: 'Queue',
                        field: 'queue'
                    },

                ],
                rows: [
                    {
                        facility: "White Memorial",
                        queue: "5",
                    },
                    {
                        facility: "St. Francis",
                        queue: "2",
                    },
                    {
                        facility: "Dignity",
                        queue: "1",
                    },
                    {
                        facility: "Unlisted Facility",
                        queue: "2",
                    },
                ],
            },
            skilledltacsabacutecustodialcases: {
                columns: [
                    {
                        label: 'Facility',
                        field: 'facility'
                    },
                    {
                        label: 'Queue',
                        field: 'queue'
                    },

                ],
                rows: [
                    {
                        facility: "Kaiser",
                        queue: "5",
                    },
                    {
                        facility: "St. Francis",
                        queue: "2",
                    },
                    {
                        facility: "Dignity",
                        queue: "1",
                    },
                    {
                        facility: "Unlisted Facility",
                        queue: "2",
                    },
                ],
            },
            catastrophoccases: {
                columns: [
                    {
                        label: 'Facility',
                        field: 'facility'
                    },
                    {
                        label: 'Queue',
                        field: 'queue'
                    },

                ],
                rows: [
                    {
                        facility: "Kaiser",
                        queue: "5",
                    },
                    {
                        facility: "St. Francis",
                        queue: "2",
                    },
                    {
                        facility: "Dignity",
                        queue: "1",
                    },
                    {
                        facility: "Unlisted Facility",
                        queue: "2",
                    },
                ],
            },
            oralnoticationpharmacy: {
                columns: [
                    {
                        label: 'Request Type',
                        field: 'requesttype',
                    },
                    {
                        label: 'Patients Name',
                        field: 'patientsname',
                    },
                    {
                        label: 'Auth No.',
                        field: 'authno',
                    },
                    {
                        label: 'Drug Name',
                        field: 'drugname',
                    },
                    {
                        label: 'Task',
                        field: 'task',
                    },
                    {
                        label: 'Effective',
                        field: 'effective',
                    },
                    {
                        label: 'Term',
                        field: 'term',
                    },
                    {
                        label: 'Received',
                        field: 'received',
                    },
                    {
                        label: 'Provider Last Name',
                        field: 'providerlastname',
                    },
                    {
                        label: 'Status Reason',
                        field: 'statusreason',
                    },

                ],
                rows: [
                    {
                        requesttype: "Coverage Details",
                        patientsname: "Doyna Miller",
                        authno: "15211464074",
                        drugname: "REMICADE For uncerative colitis",
                        task: "Post-Decision is needed",
                        effective: "Jul 30 2015",
                        term: "July 30 2017",
                        received: "Jul 30 2015 23:11:22",
                        providerlastname: "Shah",
                        statusreason: "Criteria Meet",
                    },
                    {
                        requesttype: "Redetermination",
                        patientsname: "Johhny Evans",
                        authno: "15211464074",
                        drugname: "REMICADE For uncerative colitis",
                        task: "Post-Decision is needed",
                        effective: "Jul 30 2015",
                        term: "July 30 2017",
                        received: "Jul 30 2015 23:11:22",
                        providerlastname: "Shah",
                        statusreason: "Criteria Meet",
                    },
                    {
                        requesttype: "Covverrage Details",
                        patientsname: "Johhny Evans",
                        authno: "15211464074",
                        drugname: "REMICADE For uncerative colitis",
                        task: "Post-Decision is needed",
                        effective: "Jul 30 2015",
                        term: "July 30 2017",
                        received: "Jul 30 2015 23:11:22",
                        providerlastname: "Shah",
                        statusreason: "Criteria Meet",
                    },
                    {
                        requesttype: "Redetermination",
                        patientsname: "Rodney Rodgers",
                        authno: "15211464074",
                        drugname: "REMICADE For uncerative colitis",
                        task: "Post-Decision is needed",
                        effective: "Jul 30 2015",
                        term: "July 30 2017",
                        received: "Jul 30 2015 23:11:22",
                        providerlastname: "Shah",
                        statusreason: "Criteria Meet",
                    },
                ],
            },

            //Tab1 states end
        }
    }
    componentDidMount() {
        let serviceTypes = []; let serviceCategories = []; let placeofServiceCategories = [];
        let patientIds = [];
        let caremnagerId = localStorage.getItem('caremanagerId');
        let MonthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let monthlyOpenData = []; let monthlyApprovedData = []; let monthlyRejectedData = []; let monthlyCancelData = [];
        axios({
            method: 'GET',
            url: `/api/getReferalBasedOnStatus`,
            params: {
                patient_type: "INPATIENT",
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
        let assignedTOCs = [];
        let assignedTOCobj = {
            "name": "", "details": [],
        };
        axios({
            method: 'GET',
            url: `/api/authFacilityListByReferId`,
            params: {
                refer_id: "1",
            },
        })
            .then(res => {
                for (let key in res.data.json) {
                    if (res.data.json.hasOwnProperty(key)) {
                        assignedTOCobj = { "name": key, "details": res.data.json[key] }
                        assignedTOCs.push(assignedTOCobj);
                    }
                }
                assignedTOCs.map((item) => {
                    this.AssignedTOCInpatientData(item);
                })

            });


        let assignedFFSs = [];
        let assignedFFSobj = {
            "name": "", "details": [],
        };

        axios({
            method: 'GET',
            url: `/api/authFacilityListByReferId`,
            params: {
                refer_id: "2",
            },
        })
            .then(res => {
                if (res.data.json.status == "SUCCESS") {
                    console.log("if");
                } else {
                    for (let key in res.data.json) {
                        if (res.data.json.hasOwnProperty(key)) {
                            assignedFFSobj = { "name": key, "details": res.data.json[key] }
                            assignedFFSs.push(assignedFFSobj);
                        }
                    }
                    assignedFFSs && assignedFFSs.map((item) => {
                        this.AssignedFeeforServiceInpatientData(item);
                    })
                }

            });


        let assignedDRGs = [];
        let assignedDRGobj = {
            "name": "", "details": [],
        };

        axios({
            method: 'GET',
            url: `/api/authFacilityListByReferId`,
            params: {
                refer_id: "3",
            },
        })
            .then(res => {
                if (res.data.json.status == "SUCCESS") {
                    console.log("if");
                } else {
                    for (let key in res.data.json) {
                        if (res.data.json.hasOwnProperty(key)) {
                            assignedDRGobj = { "name": key, "details": res.data.json[key] }
                            assignedDRGs.push(assignedDRGobj);
                            console.log("assignedDRGs", assignedDRGs);
                        }
                    }
                    assignedDRGs && assignedDRGs.map((item) => {
                        this.AssignedDRGInpatientData(item);
                    })
                }


            });


        let assignedSkilleds = [];
        let assignedSkilledobj = {
            "name": "", "details": [],
        };

        axios({
            method: 'GET',
            url: `/api/authFacilityListByReferId`,
            params: {
                refer_id: "4",
            },
        })
            .then(res => {


                if (res.data.json.status == "SUCCESS") {
                    console.log("if");
                } else {
                    for (let key in res.data.json) {
                        if (res.data.json.hasOwnProperty(key)) {
                            assignedSkilledobj = { "name": key, "details": res.data.json[key] }
                            assignedSkilleds && assignedSkilleds.push(assignedSkilledobj);
                        }
                    }
                    assignedSkilleds && assignedSkilleds.map((item) => {
                        this.AssignedSkilledInpatientData(item);
                    })
                }

            });


        let assignedCatastrophics = [];
        let assignedCatastrophicobj = {
            "name": "", "details": [],
        };


        axios({
            method: 'GET',
            url: `/api/authFacilityListByReferId`,
            params: {
                refer_id: "5",
            },
        })
            .then(res => {
                if (res.data.json.status == "SUCCESS") {
                    console.log("if");
                } else {
                    for (let key in res.data.json) {
                        if (res.data.json.hasOwnProperty(key)) {
                            assignedCatastrophicobj = { "name": key, "details": res.data.json[key] }
                            assignedCatastrophics.push(assignedCatastrophicobj);
                        }
                    }
                    assignedCatastrophics && assignedCatastrophics.map((item) => {
                        this.AssignedCatastrophocInpatientData(item);
                    })
                }

            });


        let assigneddischargeplanner = [];
        let assignedDPobj = {
            "name": "", "details": [],
        };


        axios({
            method: 'GET',
            url: `/api/AssignedAuthListReferId`,
            params: {
                refer_id: "7",
            },
        })
            .then(res => {
                if (res.data.json.status == "SUCCESS") {
                    console.log("if");
                } else {
                    for (let key in res.data.json) {
                        if (res.data.json.hasOwnProperty(key)) {
                            assignedDPobj = { "name": res.data.json[key].first_name, "details": res.data.json[key] }
                            assigneddischargeplanner.push(assignedDPobj);
                        }
                    }
                    assigneddischargeplanner && assigneddischargeplanner.map((item) => {
                        this.AssignedDischargePlannerInpatientData(item);
                    })
                }

            });


        let assignedMDs = [];
        let assignedMDobj = {
            "name": "", "details": [],
        };

        axios({
            method: 'GET',
            url: `/api/inpatientassignedqueuesbasedonrole`,
            params: {
                patient_type: "INPATIENT",
                role: "MD",
            },
        })
            .then(res => {
                for (let key in res.data.json) {
                    if (res.data.json.hasOwnProperty(key)) {
                        assignedMDobj = { "name": res.data.json[key].first_name, "details": res.data.json[key] }
                        assignedMDs.push(assignedMDobj);
                        console.log("assignedNurses", assignedMDs)
                    }
                }
                assignedMDs.map((item) => {
                    this.AssignedMDInpatientData(item);
                })

            });



        let assignedNurses = [];
        let assignedNurseobj = {
            "name": "", "details": [],
        };

        axios({
            method: 'GET',
            url: `/api/inpatientassignedqueuesbasedonrole`,
            params: {
                patient_type: "INPATIENT",
                role: "Nurse",
            },
        })
            .then(res => {
                for (let key in res.data.json) {
                    if (res.data.json.hasOwnProperty(key)) {
                        assignedNurseobj = { "name": res.data.json[key].first_name, "details": res.data.json[key] }
                        assignedNurses.push(assignedNurseobj);
                        console.log("assignedNurses", assignedNurses)
                    }
                }
                assignedNurses.map((item) => {
                    this.AssignedNurseInpatientData(item);
                })

            });

        let assignedCoodinators = [];
        let assignedCoodinatorobj = {
            "name": "", "details": [],
        };

        axios({
            method: 'GET',
            url: `/api/inpatientassignedqueuesbasedonrole`,
            params: {
                patient_type: "INPATIENT",
                role: "Coordinator",
            },
        })
            .then(res => {
                for (let key in res.data.json) {
                    if (res.data.json.hasOwnProperty(key)) {
                        assignedCoodinatorobj = { "name": res.data.json[key].first_name, "details": res.data.json[key] }
                        assignedCoodinators.push(assignedCoodinatorobj);
                        console.log("assignedCoodinators", assignedCoodinators)
                    }
                }
                assignedCoodinators.map((item) => {
                    this.AssignedcoordinatorInpatientData(item);
                })

            });

        let unassignedInpatients = [];
        let obj = {
            "name": "", "details": [],

        };
        axios({
            method: 'GET',
            url: `/api/inpatientUnAssignedAuthList`,
        })
            .then(res => {
                for (let key in res.data.json) {
                    if (res.data.json.hasOwnProperty(key)) {
                        obj = { "name": key, "details": res.data.json[key] }
                        unassignedInpatients.push(obj);
                    }
                }
                unassignedInpatients.map((item) => {
                    this.unAssignedInpatientData(item);
                })
                // this.setState({
                //     unassignedInpatients: unassignedInpatients
                // });
            });

        axios({
            method: 'GET',
            url: `/api/getPlaceOfServices`,
            params: {
                patient_type: "INPATIENT",
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
        let roles = [];
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
        let myassignmenturgentqueue = this.state.myassignmenturgentqueue;
        let myassignmentoralnotification = this.state.myassignmentoralnotification;
        let myassignmentroutinemedicare = this.state.myassignmentroutinemedicare;
        let myassignmentroutinemedical = this.state.myassignmentroutinemedical;
        let oralnotificationdetails = this.state.oralnotificationdetails;
        let urgentmedicaretable = this.state.urgentmedicaretable;
        let medicalcommercialtable = this.state.medicalcommercialtable;
        let routinemedicalcommercialtable = this.state.routinemedicalcommercialtable;
        let pharmacytable = this.state.pharmacytable;
        let unassignedroutinemedicare = this.state.unassignedroutinemedicare;
        let unassignedDelay = this.state.unassignedDelay;
        let assignesqueuesurgents = this.state.assignesqueuesurgents;
        let assignesqueuesmedicalroutines = this.state.assignesqueuesmedicalroutines;
        let assignesqueuesmedicareroutines = this.state.assignesqueuesmedicareroutines;
        let authscreensearchresults = this.state.authscreensearchresults;


        let unassignedinpatientqueue = this.state.unassignedinpatientqueue;
        for (let i = 0; i < unassignedinpatientqueue.rows.length; i++) {
            unassignedinpatientqueue.rows[i].hours = <div style={{ color: "#DB1962", fontWeight: "600" }} ><u>{this.state.unassignedinpatientqueue.rows[i].hours}</u></div>
        }

        let assignedcordinatorqueues = this.state.assignedcordinatorqueues;
        for (let i = 0; i < assignedcordinatorqueues.rows.length; i++) {
            assignedcordinatorqueues.rows[i].newadmission = <div style={{ color: "#DB1962", fontWeight: "600" }} ><u>{this.state.assignedcordinatorqueues.rows[i].newadmission}</u></div>
            assignedcordinatorqueues.rows[i].exixtingcases = <div style={{ color: "#424242", fontWeight: "600" }} ><u>{this.state.assignedcordinatorqueues.rows[i].exixtingcases}</u></div>
            assignedcordinatorqueues.rows[i].retro = <div style={{ color: "#424242", fontWeight: "600" }} ><u>{this.state.assignedcordinatorqueues.rows[i].retro}</u></div>
        }
        let unassignednursequeue = this.state.unassignednursequeue;
        for (let i = 0; i < unassignednursequeue.rows.length; i++) {
            unassignednursequeue.rows[i].newadmission = <div style={{ color: "#00897B", fontWeight: "600" }} ><u>{this.state.unassignednursequeue.rows[i].newadmission}</u></div>
            unassignednursequeue.rows[i].exixtingcases = <div style={{ color: "#424242", fontWeight: "600" }} ><u>{this.state.unassignednursequeue.rows[i].exixtingcases}</u></div>
            unassignednursequeue.rows[i].retro = <div style={{ color: "#424242", fontWeight: "600" }} ><u>{this.state.unassignednursequeue.rows[i].retro}</u></div>
        }
        let assignedmdqueues = this.state.assignedmdqueues;
        for (let i = 0; i < assignedmdqueues.rows.length; i++) {
            assignedmdqueues.rows[i].newadmission = <div style={{ color: "#00897B", fontWeight: "600" }} ><u>{this.state.assignedmdqueues.rows[i].newadmission}</u></div>
            assignedmdqueues.rows[i].exixtingcases = <div style={{ color: "#424242", fontWeight: "600" }} ><u>{this.state.assignedmdqueues.rows[i].exixtingcases}</u></div>
            assignedmdqueues.rows[i].retro = <div style={{ color: "#424242", fontWeight: "600" }} ><u>{this.state.assignedmdqueues.rows[i].retro}</u></div>
            assignedmdqueues.rows[i].piertopier = <div style={{ color: "#424242", fontWeight: "600" }} ><u>{this.state.assignedmdqueues.rows[i].piertopier}</u></div>
        }
        let assigneddischargeplannerqueues = this.state.assigneddischargeplannerqueues;
        for (let i = 0; i < assigneddischargeplannerqueues.rows.length; i++) {
            assigneddischargeplannerqueues.rows[i].queue = <div style={{ color: "#DB1962", fontWeight: "600" }} ><u>{this.state.assigneddischargeplannerqueues.rows[i].queue}</u></div>
        }
        let assignedTOCqueues = this.state.assignedTOCqueues;
        for (let i = 0; i < assignedTOCqueues.rows.length; i++) {
            assignedTOCqueues.rows[i].queue = <div style={{ color: "#DB1962", fontWeight: "600" }} ><u>{this.state.assignedTOCqueues.rows[i].queue}</u></div>
        }
        let Feeforservicehospital = this.state.Feeforservicehospital;
        for (let i = 0; i < Feeforservicehospital.rows.length; i++) {
            Feeforservicehospital.rows[i].queue = <div style={{ color: "#DB1962", fontWeight: "600" }} ><u>{this.state.Feeforservicehospital.rows[i].queue}</u></div>
        }
        let DRGhospital = this.state.DRGhospital;
        for (let i = 0; i < DRGhospital.rows.length; i++) {
            DRGhospital.rows[i].queue = <div style={{ color: "#DB1962", fontWeight: "600" }} ><u>{this.state.DRGhospital.rows[i].queue}</u></div>
        }
        let skilledltacsabacutecustodialcases = this.state.skilledltacsabacutecustodialcases;
        for (let i = 0; i < skilledltacsabacutecustodialcases.rows.length; i++) {
            skilledltacsabacutecustodialcases.rows[i].queue = <div style={{ color: "#DB1962", fontWeight: "600" }} ><u>{this.state.skilledltacsabacutecustodialcases.rows[i].queue}</u></div>
        }
        let catastrophoccases = this.state.catastrophoccases;
        for (let i = 0; i < catastrophoccases.rows.length; i++) {
            catastrophoccases.rows[i].queue = <div style={{ color: "#DB1962", fontWeight: "600" }} ><u>{this.state.catastrophoccases.rows[i].queue}</u></div>
        }
        let oralnoticationpharmacy = this.state.oralnoticationpharmacy;
        for (let i = 0; i < oralnoticationpharmacy.rows.length; i++) {
            oralnoticationpharmacy.rows[i].authno = <div style={{ color: "#DB1962", fontWeight: "600", cursor: "pointer" }} onClick={this.showAuthDetailsscreen.bind(this, this.state.oralnoticationpharmacy.rows[i].authno)}><u>{this.state.oralnoticationpharmacy.rows[i].authno}</u></div>
        }



        for (let i = 0; i < assignesqueuesurgents.rows.length; i++) {

            assignesqueuesurgents.rows[i].onedimension = <div style={{ color: "#CA2128", fontWeight: "600" }} ><u>{this.state.assignesqueuesurgents.rows[i].onedimension}</u></div>
            assignesqueuesurgents.rows[i].twodimension = <div style={{ color: "#F89E1B", fontWeight: "600" }} ><u>{this.state.assignesqueuesurgents.rows[i].twodimension}</u></div>
            assignesqueuesurgents.rows[i].threedimension = <div style={{ color: "#F89E1B", fontWeight: "600" }} ><u>{this.state.assignesqueuesurgents.rows[i].threedimension}</u></div>
        }

        for (let i = 0; i < assignesqueuesmedicalroutines.rows.length; i++) {
            assignesqueuesmedicalroutines.rows[i].onedimension = <div style={{ color: "#CA2128", fontWeight: "600" }} ><u>{this.state.assignesqueuesmedicalroutines.rows[i].onedimension}</u></div>
            assignesqueuesmedicalroutines.rows[i].twodimension = <div style={{ color: "#F89E1B", fontWeight: "600" }} ><u>{this.state.assignesqueuesmedicalroutines.rows[i].twodimension}</u></div>
            assignesqueuesmedicalroutines.rows[i].threedimension = <div style={{ color: "#F89E1B", fontWeight: "600" }} ><u>{this.state.assignesqueuesmedicalroutines.rows[i].threedimension}</u></div>
        }

        for (let i = 0; i < assignesqueuesmedicareroutines.rows.length; i++) {
            assignesqueuesmedicareroutines.rows[i].onedimension = <div style={{ color: "#CA2128", fontWeight: "600" }} ><u>{this.state.assignesqueuesmedicareroutines.rows[i].onedimension}</u></div>
            assignesqueuesmedicareroutines.rows[i].twodimension = <div style={{ color: "#F89E1B", fontWeight: "600" }} ><u>{this.state.assignesqueuesmedicareroutines.rows[i].twodimension}</u></div>
            assignesqueuesmedicareroutines.rows[i].threedimension = <div style={{ color: "#F89E1B", fontWeight: "600" }} ><u>{this.state.assignesqueuesmedicareroutines.rows[i].threedimension}</u></div>
        }

        for (let i = 0; i < pharmacytable.rows.length; i++) {
            pharmacytable.rows[i].onedimension = <div style={{ color: "#CA2128", fontWeight: "600" }} ><u>{this.state.pharmacytable.rows[i].onedimension}</u></div>
        }

        for (let i = 0; i < unassignedroutinemedicare.rows.length; i++) {
            unassignedroutinemedicare.rows[i].onedimension = <div style={{ color: "#CA2128", fontWeight: "600" }} ><u>{this.state.unassignedroutinemedicare.rows[i].onedimension}</u></div>
            unassignedroutinemedicare.rows[i].twodimension = <div style={{ color: "#F89E1B", fontWeight: "600" }} ><u>{this.state.unassignedroutinemedicare.rows[i].twodimension}</u></div>
            unassignedroutinemedicare.rows[i].threedimension = <div style={{ color: "#F89E1B", fontWeight: "600" }} ><u>{this.state.unassignedroutinemedicare.rows[i].threedimension}</u></div>
        }


        for (let i = 0; i < unassignedDelay.rows.length; i++) {
            unassignedDelay.rows[i].onedimension = <div style={{ color: "#CA2128", fontWeight: "600" }} ><u>{this.state.unassignedDelay.rows[i].onedimension}</u></div>
            unassignedDelay.rows[i].twodimension = <div style={{ color: "#F89E1B", fontWeight: "600" }} ><u>{this.state.unassignedDelay.rows[i].twodimension}</u></div>
            unassignedDelay.rows[i].threedimension = <div style={{ color: "#F89E1B", fontWeight: "600" }} ><u>{this.state.unassignedDelay.rows[i].threedimension}</u></div>
        }


        for (let i = 0; i < authscreensearchresults.rows.length; i++) {
            authscreensearchresults.rows[i].authnumber = <div style={{ color: "#DB1962", fontWeight: "600", cursor: "pointer" }} onClick={this.showAuthDetailsscreen.bind(this, this.state.authscreensearchresults.rows[i].authnumber)}><u>{this.state.authscreensearchresults.rows[i].authnumber}</u></div>
        }

        for (let i = 0; i < urgentmedicaretable.rows.length; i++) {
            urgentmedicaretable.rows[i].onedimension = <div style={{ color: "#CA2128", fontWeight: "600" }} ><u>{this.state.urgentmedicaretable.rows[i].onedimension}</u></div>
            urgentmedicaretable.rows[i].twodimension = <div style={{ color: "#F89E1B", fontWeight: "600" }} ><u>{this.state.urgentmedicaretable.rows[i].twodimension}</u></div>
            urgentmedicaretable.rows[i].threedimension = <div style={{ color: "#F89E1B", fontWeight: "600" }} ><u>{this.state.urgentmedicaretable.rows[i].threedimension}</u></div>
        }

        for (let i = 0; i < medicalcommercialtable.rows.length; i++) {
            medicalcommercialtable.rows[i].onedimension = <div style={{ color: "#CA2128", fontWeight: "600" }} ><u>{this.state.medicalcommercialtable.rows[i].onedimension}</u></div>
            medicalcommercialtable.rows[i].twodimension = <div style={{ color: "#F89E1B", fontWeight: "600" }} ><u>{this.state.medicalcommercialtable.rows[i].twodimension}</u></div>
            medicalcommercialtable.rows[i].threedimension = <div style={{ color: "#F89E1B", fontWeight: "600" }} ><u>{this.state.medicalcommercialtable.rows[i].threedimension}</u></div>
        }


        for (let i = 0; i < routinemedicalcommercialtable.rows.length; i++) {
            routinemedicalcommercialtable.rows[i].onedimension = <div style={{ color: "#CA2128", fontWeight: "600" }} ><u>{this.state.routinemedicalcommercialtable.rows[i].onedimension}</u></div>
            routinemedicalcommercialtable.rows[i].twodimension = <div style={{ color: "#F89E1B", fontWeight: "600" }} ><u>{this.state.routinemedicalcommercialtable.rows[i].twodimension}</u></div>
            routinemedicalcommercialtable.rows[i].threedimension = <div style={{ color: "#F89E1B", fontWeight: "600" }} ><u>{this.state.routinemedicalcommercialtable.rows[i].threedimension}</u></div>
        }





        for (let i = 0; i < oralnotificationdetails.rows.length; i++) {
            oralnotificationdetails.rows[i].authnumber = <div style={{ color: "#DB1962", fontWeight: "600" }}><u>{this.state.oralnotificationdetails.rows[i].authnumber}</u></div>
        }
        for (let i = 0; i < myassignmenturgentqueue.rows.length; i++) {
            myassignmenturgentqueue.rows[i].onedimension = <div style={{ color: "#CA2128", fontWeight: "600" }}><u>{this.state.myassignmenturgentqueue.rows[i].onedimension}</u></div>
            myassignmenturgentqueue.rows[i].twodimension = <div style={{ color: "#F89E1B", fontWeight: "600" }}><u>{this.state.myassignmenturgentqueue.rows[i].twodimension}</u></div>
            myassignmenturgentqueue.rows[i].threedimension = <div style={{ color: "#F89E1B", fontWeight: "600" }}><u>{this.state.myassignmenturgentqueue.rows[i].threedimension}</u></div>
        }

        // for (let i = 0; i < myassignmentoralnotification.rows.length; i++) {
        //     myassignmentoralnotification.rows[i].onedimension = <div style={{ color: "#CA2128", fontWeight: "600" }} onClick={this.handleactivateClick.bind(this, this.state.myassignmentoralnotification.rows[i])}><u>{this.state.myassignmentoralnotification.rows[i].onedimension}</u></div>
        //     myassignmentoralnotification.rows[i].twodimension = <div style={{ color: "#F89E1B", fontWeight: "600" }} onClick={this.handleactivateClick.bind(this, this.state.myassignmentoralnotification.rows[i])}><u>{this.state.myassignmentoralnotification.rows[i].twodimension}</u></div>
        //     myassignmentoralnotification.rows[i].threedimension = <div style={{ color: "#F89E1B", fontWeight: "600" }} onClick={this.handleactivateClick.bind(this, this.state.myassignmentoralnotification.rows[i])}><u>{this.state.myassignmentoralnotification.rows[i].threedimension}</u></div>
        // }

        for (let i = 0; i < myassignmentroutinemedicare.rows.length; i++) {
            myassignmentroutinemedicare.rows[i].onedimension = <div style={{ color: "#CA2128", fontWeight: "600" }}><u>{this.state.myassignmentroutinemedicare.rows[i].onedimension}</u></div>
            myassignmentroutinemedicare.rows[i].twodimension = <div style={{ color: "#F89E1B", fontWeight: "600" }}><u>{this.state.myassignmentroutinemedicare.rows[i].twodimension}</u></div>
            myassignmentroutinemedicare.rows[i].threedimension = <div style={{ color: "#F89E1B", fontWeight: "600" }}><u>{this.state.myassignmentroutinemedicare.rows[i].threedimension}</u></div>
        }

        for (let i = 0; i < myassignmentroutinemedical.rows.length; i++) {
            myassignmentroutinemedical.rows[i].onedimension = <div style={{ color: "#CA2128", fontWeight: "600" }}><u>{this.state.myassignmentroutinemedical.rows[i].onedimension}</u></div>
            myassignmentroutinemedical.rows[i].twodimension = <div style={{ color: "#F89E1B", fontWeight: "600" }}><u>{this.state.myassignmentroutinemedical.rows[i].twodimension}</u></div>
            myassignmentroutinemedical.rows[i].threedimension = <div style={{ color: "#F89E1B", fontWeight: "600" }}><u>{this.state.myassignmentroutinemedical.rows[i].threedimension}</u></div>
        }

        // let users = this.state.usersdata;
        // for (let i = 0; i < users.rows.length; i++) {
        //     users.rows[i].name =  <div><div style={{ marginRight: "12px" }} className="usericons countertexticon menuicon">{(this.state.usersdata.rows[i].name).match(/\b(\w)/g).join('')}</div> {this.state.usersdata.rows[i].name}</div>
        //     users.rows[i].action = <div> <MDBIcon style={{color: "#db1962", fontSize:"20px"}} icon="trash" /></div>
        // }
    }

    handleactivateClick(data, header, ind, title) {
        this.setState({
            activateclick: true,
            serachTableData: data,
            oralNotificationHeader: header,
            rowClicked: ind,
            rowTitle: title
        });
        setTimeout(() => {
            var element = document.getElementById("box");
            element.scrollIntoView({ behavior: "smooth" });
        }, 0)
    }

    calculateDayCount = (reqDate) => {
        var reqDateFormat = new Date(moment(reqDate.created_date).format('MM/DD/YYYY'));
        var a = moment(new Date(), 'MM/DD/YYYY');
        var b = moment(reqDateFormat, 'MM/DD/YYYY');
        var diffDays = a.diff(b, 'days');
        return diffDays;
    }


    unAssignedInpatientData = (unassignedInpatients) => {
        //let assignedinpatientQueue = [];
        let unassignedinpatientqueue = { "name": "", "data": [] };
        unassignedinpatientqueue.data[0] = new Array();
        unassignedinpatientqueue.data[1] = new Array();
        unassignedInpatients.details.data.map((item) => {
            if (this.calculateDayCount(item) === 0) {
                unassignedinpatientqueue.name = unassignedInpatients.name,
                    unassignedinpatientqueue.data[0] = [...unassignedinpatientqueue.data[0], item];
            }
            if (this.calculateDayCount(item) > 0) {
                unassignedinpatientqueue.name = unassignedInpatients.name,
                    unassignedinpatientqueue.data[1] = [...unassignedinpatientqueue.data[1], item];
            }
        })
        //assignedinpatientQueue.push(unassignedinpatientqueue);
        this.setState({
            inpatientassignedinpatientQueue: [...this.state.inpatientassignedinpatientQueue, unassignedinpatientqueue]
        })
    }
    AssignedcoordinatorInpatientData = (unassignedInpatients) => {
        let assignedcoordinatorqueues = { "name": "", "data": [] };
        assignedcoordinatorqueues.data[0] = new Array();
        assignedcoordinatorqueues.data[1] = new Array();
        assignedcoordinatorqueues.data[2] = new Array();
        unassignedInpatients.details.data.map((item) => {
            if (this.calculateDayCount(item) === 0) {
                if (item.service_type.service_type != "Retro") {
                    assignedcoordinatorqueues.name = unassignedInpatients.name,
                        assignedcoordinatorqueues.data[0] = [...assignedcoordinatorqueues.data[0], item];
                } else {
                    item.service_type.service_type === "Retro" ? assignedcoordinatorqueues.data[2] = [...assignedcoordinatorqueues.data[2], item] : [];

                }


            }
            if (this.calculateDayCount(item) > 0) {
                if (item.service_type.service_type != "Retro") {
                    assignedcoordinatorqueues.name = unassignedInpatients.name,
                        assignedcoordinatorqueues.data[1] = [...assignedcoordinatorqueues.data[1], item];

                } else {
                    item.service_type.service_type === "Retro" ? assignedcoordinatorqueues.data[2] = [...assignedcoordinatorqueues.data[2], item] : [];

                }
            }


        })
        this.setState({
            inpatientassignedCoordinatorQueue: [...this.state.inpatientassignedCoordinatorQueue, assignedcoordinatorqueues]
        })
    }
    AssignedNurseInpatientData = (unassignedInpatients) => {
        let assignednursequeues = { "name": "", "data": [] };
        assignednursequeues.data[0] = new Array();
        assignednursequeues.data[1] = new Array();
        assignednursequeues.data[2] = new Array();
        unassignedInpatients.details.data.map((item) => {
            if (this.calculateDayCount(item) === 0) {
                if (item.service_type.service_type != "Retro") {
                    assignednursequeues.name = unassignedInpatients.name,
                        assignednursequeues.data[0] = [...assignednursequeues.data[0], item];
                } else {
                    item.service_type.service_type === "Retro" ? assignednursequeues.data[2] = [...assignednursequeues.data[2], item] : [];

                }

            }
            if (this.calculateDayCount(item) > 0) {
                if (item.service_type.service_type != "Retro") {
                    assignednursequeues.name = unassignedInpatients.name,
                        assignednursequeues.data[1] = [...assignednursequeues.data[1], item];
                } else {
                    item.service_type.service_type === "Retro" ? assignednursequeues.data[2] = [...assignednursequeues.data[2], item] : [];

                }

            }
        })
        this.setState({
            inpatientassignedNurseQueue: [...this.state.inpatientassignedNurseQueue, assignednursequeues]
        })
    }
    AssignedMDInpatientData = (unassignedInpatients) => {
        let assignedMDqueues = { "name": "", "data": [] };
        assignedMDqueues.data[0] = new Array();
        assignedMDqueues.data[1] = new Array();
        assignedMDqueues.data[2] = new Array();
        assignedMDqueues.data[3] = new Array();
        unassignedInpatients.details.data.map((item) => {
            if (this.calculateDayCount(item) === 0) {
                if (item.service_type.service_type != "Retro" && item && item.refer_details && item.refer_details.facility_type != "Pier to Pier") {
                    assignedMDqueues.name = unassignedInpatients.name,
                        assignedMDqueues.data[0] = [...assignedMDqueues.data[0], item];
                }
                if (item && item.refer_details && item.refer_details.facility_type == "Pier to Pier") {
                    assignedMDqueues.name = unassignedInpatients.name,
                        assignedMDqueues.data[3] = [...assignedMDqueues.data[3], item];
                } else {
                    item.service_type.service_type === "Retro" ? assignedMDqueues.data[2] = [...assignedMDqueues.data[2], item] : [];

                }

            }
            if (this.calculateDayCount(item) > 0) {
                if (item.service_type.service_type != "Retro" && item && item.refer_details && item.refer_details.facility_type != "Pier to Pier") {
                    assignedMDqueues.name = unassignedInpatients.name,
                        assignedMDqueues.data[1] = [...assignedMDqueues.data[1], item];
                }
                if (item && item.refer_details && item.refer_details.facility_type == "Pier to Pier") {
                    assignedMDqueues.name = unassignedInpatients.name,
                        assignedMDqueues.data[3] = [...assignedMDqueues.data[3], item];
                } else {
                    item.service_type.service_type === "Retro" ? assignedMDqueues.data[2] = [...assignedMDqueues.data[2], item] : [];

                }

            }
        })
        this.setState({
            inpatientassignedMDQueue: [...this.state.inpatientassignedMDQueue, assignedMDqueues]
        })
    }
    AssignedTOCInpatientData = (unassignedInpatients) => {
        let assignedTOCqueues = { "name": "", "data": [] };
        assignedTOCqueues.data[0] = new Array();
        assignedTOCqueues.data[1] = new Array();
        unassignedInpatients.details.data.map((item) => {
            if (this.calculateDayCount(item) === 0) {
                assignedTOCqueues.name = unassignedInpatients.name,
                    assignedTOCqueues.data[0] = [...assignedTOCqueues.data[0], item];
            }
            if (this.calculateDayCount(item) > 0) {
                assignedTOCqueues.name = unassignedInpatients.name,
                    assignedTOCqueues.data[1] = [...assignedTOCqueues.data[1], item];
            }
        })
        this.setState({
            inpatientassignedTOCQueue: [...this.state.inpatientassignedTOCQueue, assignedTOCqueues]
        })
    }

    AssignedFeeforServiceInpatientData = (unassignedInpatients) => {
        let assignedFeeforServicequeues = { "name": "", "data": [] };
        assignedFeeforServicequeues.data[0] = new Array();
        assignedFeeforServicequeues.data[1] = new Array();
        unassignedInpatients.details.data.map((item) => {
            if (this.calculateDayCount(item) === 0) {
                assignedFeeforServicequeues.name = unassignedInpatients.name,
                    assignedFeeforServicequeues.data[0] = [...assignedFeeforServicequeues.data[0], item];
            }
            if (this.calculateDayCount(item) > 0) {
                assignedFeeforServicequeues.name = unassignedInpatients.name,
                    assignedFeeforServicequeues.data[1] = [...assignedFeeforServicequeues.data[1], item];
            }
        })
        this.setState({
            inpatientassignedFeeforServiceQueue: [...this.state.inpatientassignedFeeforServiceQueue, assignedFeeforServicequeues]
        })
    }
    AssignedDRGInpatientData = (unassignedInpatients) => {
        let assignedDRGqueues = { "name": "", "data": [] };
        assignedDRGqueues.data[0] = new Array();
        assignedDRGqueues.data[1] = new Array();
        unassignedInpatients.details && unassignedInpatients.details.data && unassignedInpatients.details.data.map((item) => {
            if (this.calculateDayCount(item) === 0) {
                assignedDRGqueues.name = unassignedInpatients.name,
                    assignedDRGqueues.data[0] = [...assignedDRGqueues.data[0], item];
            }
            if (this.calculateDayCount(item) > 0) {
                assignedDRGqueues.name = unassignedInpatients.name,
                    assignedDRGqueues.data[1] = [...assignedDRGqueues.data[1], item];
            }
        })
        this.setState({
            inpatientassignedDRGQueue: [...this.state.inpatientassignedDRGQueue, assignedDRGqueues]
        })
    }
    AssignedSkilledInpatientData = (unassignedInpatients) => {
        let assignedSkilledqueues = { "name": "", "data": [] };
        assignedSkilledqueues.data[0] = new Array();
        assignedSkilledqueues.data[1] = new Array();
        unassignedInpatients.details && unassignedInpatients.details.data && unassignedInpatients.details.data.map((item) => {
            if (this.calculateDayCount(item) === 0) {
                assignedSkilledqueues.name = unassignedInpatients.name,
                    assignedSkilledqueues.data[0] = [...assignedSkilledqueues.data[0], item];
            }
            if (this.calculateDayCount(item) > 0) {
                assignedSkilledqueues.name = unassignedInpatients.name,
                    assignedSkilledqueues.data[1] = [...assignedSkilledqueues.data[1], item];
            }
        })
        this.setState({
            inpatientassignedSkilledQueue: [...this.state.inpatientassignedSkilledQueue, assignedSkilledqueues]
        })
    }
    AssignedCatastrophocInpatientData = (unassignedInpatients) => {
        let assignedCatastrophocqueues = { "name": "", "data": [] };
        assignedCatastrophocqueues.data[0] = new Array();
        assignedCatastrophocqueues.data[1] = new Array();
        unassignedInpatients.details && unassignedInpatients.details.data && unassignedInpatients.details.data.map((item) => {
            if (this.calculateDayCount(item) === 0) {
                assignedCatastrophocqueues.name = unassignedInpatients.name,
                    assignedCatastrophocqueues.data[0] = [...assignedCatastrophocqueues.data[0], item];
            }
            if (this.calculateDayCount(item) > 0) {
                assignedCatastrophocqueues.name = unassignedInpatients.name,
                    assignedCatastrophocqueues.data[1] = [...assignedCatastrophocqueues.data[1], item];
            }
        })
        this.setState({
            inpatientassignedCatastrophocQueue: [...this.state.inpatientassignedCatastrophocQueue, assignedCatastrophocqueues]
        })
    }

    AssignedDischargePlannerInpatientData = (unassignedInpatients) => {
        let assignedDischargePlannerqueues = { "name": "", "data": [] };
        assignedDischargePlannerqueues.data[0] = new Array();
        assignedDischargePlannerqueues.data[1] = new Array();
        unassignedInpatients.details && unassignedInpatients.details.data && unassignedInpatients.details.data.map((item) => {
            if (this.calculateDayCount(item) === 0) {
                assignedDischargePlannerqueues.name = unassignedInpatients.name,
                    assignedDischargePlannerqueues.data[0] = [...assignedDischargePlannerqueues.data[0], item];
            }
            if (this.calculateDayCount(item) > 0) {
                assignedDischargePlannerqueues.name = unassignedInpatients.name,
                    assignedDischargePlannerqueues.data[1] = [...assignedDischargePlannerqueues.data[1], item];
            }
        })
        this.setState({
            inpatientassignedDPQueue: [...this.state.inpatientassignedDPQueue, assignedDischargePlannerqueues]
        })
    }


    handleBasicClick = (value) => {
        this.setState({
            basicActive: value
        });
    }

    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));

    handleSelectChange(value) {
        this.state.serviceTypes && this.state.serviceTypes.map((item) => {
            if(item.text === value){
                this.setState({
                    selctedServiceType: item.value
                })
            }
        })
    }
    handleServiceCategoryChange(value) {
        this.setState({
            selctedServiceCategory: parseInt(value)
        })
    }
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
                    this.setState({ oldPatientDetails: [], patientDetails: [], isLoaded: true })
                    // this.setState({ oldPatientDetails: res.data.json.hits.hits, patientDetails: res.data.json.hits.hits, isLoaded: true })
                });
            this.setState({
                searchedText: e.target.value
            })
        }
        // let patientDetails = this.state.patientDetails.filter((f) => {
        //     if (f._source.firstname.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 || f._source.lastname.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 || f._source.patient_id.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
        //         return f;
        //     }
        // })
        // if (patientDetails.length) {
        //     this.setState({ oldPatientDetails: patientDetails })
        // } else {
        //     this.setState({ oldPatientDetails: this.state.patientDetails });
        // }
        // this.setState({
        //     searchedText: e.target.value
        // })
    }

    onHandleProviderDetailsSearch = e => {
        let requestingProviderDetailsList = this.state.requestingProviderDetailsList.filter((f) => {
            if (f.value.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
                return f;
            }
        })
        if (requestingProviderDetailsList.length) {
            this.setState({ oldrequestingProviderDetailsList: requestingProviderDetailsList })
        } else {
            this.setState({ oldrequestingProviderDetailsList: this.state.requestingProviderDetailsList });
        }
        this.setState({
            searchedProviderDetailsText: e.target.value
        })

    }

    onHandlePrefferedDetailsSearch = e => {
        let requestingPrefferedDetailsList = this.state.requestingPrefferedDetailsList.filter((f) => {
            if (f.value.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
                return f;
            }
        })
        if (requestingPrefferedDetailsList.length) {
            this.setState({ oldrequestingPrefferedDetailsList: requestingPrefferedDetailsList })
        } else {
            this.setState({ oldrequestingPrefferedDetailsList: this.state.requestingPrefferedDetailsList });
        }
        this.setState({
            searchedPreferredDetailsText: e.target.value
        })

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
            // let searchText = '';
            // if (e && e.target) searchText = e.target.value;
            // else searchText = search;
            // let obj = {
            //     "query" : {"bool" : {"filter" : {"terms" : {"patient_id.keyword" : this.state.patient_ids}}}},
            //     size: this.state.perPage,
            //     from: this.state.pageFrom
            // }
            // this.setState({isLoaded: false});
            // axios({
            //     method: 'POST',
            //     url: `/api/patientslist`,
            //     data: obj,
            // })
            // .then(res => {
            this.setState({ adddiagnosisDetailsList: [], oldadddiagnosisDetailsList: [] })
            // });
            this.setState({
                adddiagnosisDetailsText: e.target.value
            })
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
            this.setState({ servicerequestDetailsList: [], oldservicerequestDetailsList: [] })
            // });
            this.setState({
                servicerequestDetailsText: e.target.value
            })
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
        let row = { "no": this.state.userDataRows.length + 1, "diagnosiscode": el._source.code, "diagnosiscodedescription": el._source.description, action: "" };
        let addedRow = { "diagnosis_code": el._source.code, "diagnosis_code_description": el._source.description };
        usersdata.rows = [...this.state.userDataRows, row]
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
                "assigned_date": new Date(),
                "created_date": new Date(),
                "created_by": localStorage.getItem("caremanagerId"),
                "created_by_role": localStorage.getItem("role"),
                "status": "OPEN",
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
            authrequestreceivedate: moment(value).format("MM/DD/YYYY")
        });
    }
    handleauthRequestReceiveDate1 = (value) => {
        this.setState({
            authrequestreceivedate1: moment(value).format("MM/DD/YYYY")
        });
    }
    handleauthaurizationdate = (value) => {
        this.setState({
            authauthorizationdate: moment(value).format("MM/DD/YYYY")
        });
    }
    handleauthFinalDecisionDate = (value) => {
        this.setState({
            authfinaldecisiondate: moment(value).format("MM/DD/YYYY")
        });
    }
    handleselectedPriorityType = (text) => {
        this.setState({
            selectedprioritytype: text
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
            authdateofbirth: moment(value).format("MM/DD/YYYY")
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
            selectedauthscreenassigned: text
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
                patient_type: "INPATIENT",
            },
            data: createReferalData,
        })
            .then((response) => {
                this.setState({
                    searchresults: true,
                    filteredTables: response.data.json.result,
                    isLoaded: true
                });
            })
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
        window.location.href = "/inpatientauthview";
        localStorage.setItem('authNumber', authnumber);
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
                    patient_type: "INPATIENT",
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
                    patient_type: "INPATIENT",
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
                    console.log(weeklyOpenData, "weeklyOpenData")
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
                    patient_type: "INPATIENT",
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
                    patient_type: "INPATIENT",
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

    authviewHistoryModal = (authId) => {
        let historyDetails = [];
        this.setState({
            isLoaded: false
        })
        axios({
            method: 'GET',
            url: `/api/getAssignmentHistoryByAuthId`,
            params: {
                patient_type: "INPATIENT",
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
    toggleForWarningMessage =() => {
        this.setState({
            showWarningModal: false
        })
    }

    render() {
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
                                    <MDBCol md="6">
                                        <MDBCard style={{ height: "100%" }}>
                                            <MDBCardBody>
                                                <MDBTypography tag="h5" className="card-title">Unassigned Inpatient Queue</MDBTypography>
                                                <div style={{ overflowX: "auto", width: "100%", display: "block", paddingBottom: "32px" }}>
                                                    <table className="oral-notification-table">
                                                        <thead>
                                                            <tr>
                                                                <th>Facility</th>
                                                                <th>24 Hours</th>
                                                                <th> Above 1 Day </th></tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.inpatientassignedinpatientQueue && this.state.inpatientassignedinpatientQueue.map((ele, index) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{ele.name}</td>
                                                                        <td key={index} className={this.state.rowClicked === 0 && this.state.oralNotificationHeader === "Unassigned Inpatient Queue" && this.state.rowTitle === ele.name ? "selected" : ""} style={{ color: "#CA2128", fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, ele && ele.data && ele.data[0], "Unassigned Inpatient Queue", 0, ele.name)}>{ele.data && ele.data[0].length}</td>
                                                                        <td key={index} className={this.state.rowClicked === 1 && this.state.oralNotificationHeader === "Unassigned Inpatient Queue" && this.state.rowTitle === ele.name ? "selected" : ""} style={{ color: "#424242", fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, ele && ele.data && ele.data[1], "Unassigned Inpatient Queue", 1, ele.name)}>{ele.data && ele.data[1].length}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                    <MDBCol md="6">
                                        <MDBCard style={{ height: "100%" }}>
                                            <MDBCardBody>
                                                <MDBTypography tag="h5" className="card-title">Assigned Coordinator Queues</MDBTypography>
                                                <div style={{ overflowX: "auto", width: "100%", display: "block", paddingBottom: "32px" }}>
                                                    <table className="oral-notification-table">
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>New Admission</th>
                                                                <th> Existing Cases </th>
                                                                <th> Retro </th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.inpatientassignedCoordinatorQueue && this.state.inpatientassignedCoordinatorQueue.map((ele, index) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{ele.name}</td>
                                                                        <td key={index} className={this.state.rowClicked === 0 && this.state.oralNotificationHeader === "Assigned Coordinator Queues" && this.state.rowTitle === ele.name ? "selected" : ""} style={{ color: "#CA2128", fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, ele && ele.data && ele.data[0], "Assigned Coordinator Queues", 0, ele.name)}>{ele.data && ele.data[0].length}</td>
                                                                        <td key={index} className={this.state.rowClicked === 1 && this.state.oralNotificationHeader === "Assigned Coordinator Queues" && this.state.rowTitle === ele.name ? "selected" : ""} style={{ color: "#424242", fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, ele && ele.data && ele.data[1], "Assigned Coordinator Queues", 1, ele.name)}>{ele.data && ele.data[1].length}</td>
                                                                        <td key={index} className={this.state.rowClicked === 2 && this.state.oralNotificationHeader === "Assigned Coordinator Queues" && this.state.rowTitle === ele.name ? "selected" : ""} style={{ color: "#424242", fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, ele && ele.data && ele.data[2], "Assigned Coordinator Queues", 2, ele.name)}>{ele.data && ele.data[2].length}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow style={{ marginTop: "16px" }}>
                                    <MDBCol md="6">
                                        <MDBCard style={{ height: "100%" }}>
                                            <MDBCardBody>
                                                <MDBTypography tag="h5" className="card-title">Assigned Nurse Queues</MDBTypography>
                                                <div style={{ overflowX: "auto", width: "100%", display: "block", paddingBottom: "32px" }}>
                                                    <table className="oral-notification-table">
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>New Admission</th>
                                                                <th> Existing Cases </th>
                                                                <th> Retro </th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.inpatientassignedNurseQueue && this.state.inpatientassignedNurseQueue.map((ele, index) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{ele.name}</td>
                                                                        <td key={index} className={this.state.rowClicked === 0 && this.state.oralNotificationHeader === "Assigned Nurse Queues" && this.state.rowTitle === ele.name ? "selected" : ""} style={{ color: "#00897B", fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, ele && ele.data && ele.data[0], "Assigned Nurse Queues", 0, ele.name)}>{ele.data && ele.data[0].length}</td>
                                                                        <td key={index} className={this.state.rowClicked === 1 && this.state.oralNotificationHeader === "Assigned Nurse Queues" && this.state.rowTitle === ele.name ? "selected" : ""} style={{ color: "#424242", fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, ele && ele.data && ele.data[1], "Assigned Nurse Queues", 1, ele.name)}>{ele.data && ele.data[1].length}</td>
                                                                        <td key={index} className={this.state.rowClicked === 2 && this.state.oralNotificationHeader === "Assigned Nurse Queues" && this.state.rowTitle === ele.name ? "selected" : ""} style={{ color: "#424242", fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, ele && ele.data && ele.data[2], "Assigned Nurse Queues", 2, ele.name)}>{ele.data && ele.data[2].length}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                    <MDBCol md="6">
                                        <MDBCard style={{ height: "100%" }}>
                                            <MDBCardBody>
                                                <MDBTypography tag="h5" className="card-title">Assigned MD Queues</MDBTypography>
                                                <div style={{ overflowX: "auto", width: "100%", display: "block", paddingBottom: "32px" }}>
                                                    <table className="oral-notification-table">
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>New Admission</th>
                                                                <th> Existing Cases </th>
                                                                <th> Retro </th>
                                                                <th> Pier to Pier </th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.inpatientassignedMDQueue && this.state.inpatientassignedMDQueue.map((ele, index) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{ele.name}</td>
                                                                        <td key={index} className={this.state.rowClicked === 0 && this.state.oralNotificationHeader === "Assigned MD Queues" && this.state.rowTitle === ele.name ? "selected" : ""} style={{ color: "#00897B", fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, ele && ele.data && ele.data[0], "Assigned MD Queues", 0, ele.name)}>{ele.data && ele.data[0].length}</td>
                                                                        <td key={index} className={this.state.rowClicked === 1 && this.state.oralNotificationHeader === "Assigned MD Queues" && this.state.rowTitle === ele.name ? "selected" : ""} style={{ color: "#424242", fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, ele && ele.data && ele.data[1], "Assigned MD Queues", 1, ele.name)}>{ele.data && ele.data[1].length}</td>
                                                                        <td key={index} className={this.state.rowClicked === 2 && this.state.oralNotificationHeader === "Assigned MD Queues" && this.state.rowTitle === ele.name ? "selected" : ""} style={{ color: "#424242", fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, ele && ele.data && ele.data[2], "Assigned MD Queues", 2, ele.name)}>{ele.data && ele.data[2].length}</td>
                                                                        <td key={index} className={this.state.rowClicked === 3 && this.state.oralNotificationHeader === "Assigned MD Queues" && this.state.rowTitle === ele.name ? "selected" : ""} style={{ color: "#424242", fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, ele && ele.data && ele.data[3], "Assigned MD Queues", 3, ele.name)}>{ele.data && ele.data[3].length}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow style={{ marginTop: "16px" }}>
                                    <MDBCol md="6">
                                        <MDBCard style={{ height: "100%" }}>
                                            <MDBCardBody>
                                                <MDBTypography tag="h5" className="card-title">Assigned Discharge Planner Queues</MDBTypography>
                                                <div style={{ overflowX: "auto", width: "100%", display: "block", paddingBottom: "32px" }}>
                                                    <table className="oral-notification-table">
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>New Admission</th>
                                                                <th> Existing Cases </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.inpatientassignedDPQueue && this.state.inpatientassignedDPQueue.map((ele, index) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{ele.name}</td>
                                                                        <td key={index} className={this.state.rowClicked === 0 && this.state.oralNotificationHeader === "Assigned Discharge Planner Queues" && this.state.rowTitle === ele.name ? "selected" : ""} style={{ color: "#CA2128", fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, ele && ele.data && ele.data[0], "Assigned Discharge Planner Queues", 0, ele.name)}>{ele.data && ele.data[0].length}</td>
                                                                        <td key={index} className={this.state.rowClicked === 1 && this.state.oralNotificationHeader === "Assigned Discharge Planner Queues" && this.state.rowTitle === ele.name ? "selected" : ""} style={{ color: "#424242", fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, ele && ele.data && ele.data[1], "Assigned Discharge Planner Queues", 1, ele.name)}>{ele.data && ele.data[1].length}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>


                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                    <MDBCol md="6">
                                        <MDBCard style={{ height: "100%" }}>
                                            <MDBCardBody>
                                                <MDBTypography tag="h5" className="card-title">Assigned TOC Queues</MDBTypography>
                                                <div style={{ overflowX: "auto", width: "100%", display: "block", paddingBottom: "32px" }}>
                                                    <table className="oral-notification-table">
                                                        <thead>
                                                            <tr>
                                                                <th>Facility</th>
                                                                <th>New Admission</th>
                                                                <th> Existing Cases </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.inpatientassignedTOCQueue && this.state.inpatientassignedTOCQueue.map((ele, index) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{ele.name}</td>
                                                                        <td key={index} className={this.state.rowClicked === 0 && this.state.oralNotificationHeader === "Assigned TOC Queues" && this.state.rowTitle === ele.name ? "selected" : ""} style={{ color: "#CA2128", fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, ele && ele.data && ele.data[0], "Assigned TOC Queues", 0, ele.name)}>{ele.data && ele.data[0].length}</td>
                                                                        <td key={index} className={this.state.rowClicked === 1 && this.state.oralNotificationHeader === "Assigned TOC Queues" && this.state.rowTitle === ele.name ? "selected" : ""} style={{ color: "#424242", fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, ele && ele.data && ele.data[1], "Assigned TOC Queues", 1, ele.name)}>{ele.data && ele.data[1].length}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow style={{ marginTop: "16px" }}>
                                    <MDBCol md="6">
                                        <MDBCard style={{ height: "100%" }}>
                                            <MDBCardBody>
                                                <MDBTypography tag="h5" className="card-title">Fee for Service Hospital</MDBTypography>
                                                <div style={{ overflowX: "auto", width: "100%", display: "block", paddingBottom: "32px" }}>
                                                    <table className="oral-notification-table">
                                                        <thead>
                                                            <tr>
                                                                <th>Facility</th>
                                                                <th>New Admission</th>
                                                                <th> Existing Cases </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.inpatientassignedFeeforServiceQueue && this.state.inpatientassignedFeeforServiceQueue.map((ele, index) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{ele.name}</td>
                                                                        <td key={index} className={this.state.rowClicked === 0 && this.state.oralNotificationHeader === "Fee for Service Hospital" && this.state.rowTitle === ele.name ? "selected" : ""} style={{ color: "#CA2128", fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, ele && ele.data && ele.data[0], "Fee for Service Hospital", 0, ele.name)}>{ele.data && ele.data[0].length}</td>
                                                                        <td key={index} className={this.state.rowClicked === 1 && this.state.oralNotificationHeader === "Fee for Service Hospital" && this.state.rowTitle === ele.name ? "selected" : ""} style={{ color: "#424242", fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, ele && ele.data && ele.data[1], "Fee for Service Hospital", 1, ele.name)}>{ele.data && ele.data[1].length}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                    <MDBCol md="6">
                                        <MDBCard style={{ height: "100%" }}>
                                            <MDBCardBody>
                                                <MDBTypography tag="h5" className="card-title">DRG Hospital</MDBTypography>
                                                <div style={{ overflowX: "auto", width: "100%", display: "block", paddingBottom: "32px" }}>
                                                    <table className="oral-notification-table">
                                                        <thead>
                                                            <tr>
                                                                <th>Facility</th>
                                                                <th>New Admission</th>
                                                                <th> Existing Cases </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.inpatientassignedDRGQueue && this.state.inpatientassignedDRGQueue.map((ele, index) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{ele.name}</td>
                                                                        <td key={index} className={this.state.rowClicked === 0 && this.state.oralNotificationHeader === "DRG Hospital" && this.state.rowTitle === ele.name ? "selected" : ""} style={{ color: "#CA2128", fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, ele && ele.data && ele.data[0], "DRG Hospital", 0, ele.name)}>{ele.data && ele.data[0].length}</td>
                                                                        <td key={index} className={this.state.rowClicked === 1 && this.state.oralNotificationHeader === "DRG Hospital" && this.state.rowTitle === ele.name ? "selected" : ""} style={{ color: "#424242", fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, ele && ele.data && ele.data[1], "DRG Hospital", 1, ele.name)}>{ele.data && ele.data[1].length}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow style={{ marginTop: "16px" }}>
                                    <MDBCol md="6">
                                        <MDBCard style={{ height: "100%" }}>
                                            <MDBCardBody>
                                                <MDBTypography tag="h5" className="card-title">Skilled, LTAC, Sabacute, Custodial Cases</MDBTypography>
                                                <div style={{ overflowX: "auto", width: "100%", display: "block", paddingBottom: "32px" }}>
                                                    <table className="oral-notification-table">
                                                        <thead>
                                                            <tr>
                                                                <th>Facility</th>
                                                                <th>New Admission</th>
                                                                <th> Existing Cases </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.inpatientassignedSkilledQueue && this.state.inpatientassignedSkilledQueue.map((ele, index) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{ele.name}</td>
                                                                        <td key={index} className={this.state.rowClicked === 0 && this.state.oralNotificationHeader === "Skilled, LTAC, Sabacute, Custodial Cases" && this.state.rowTitle === ele.name ? "selected" : ""} style={{ color: "#CA2128", fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, ele && ele.data && ele.data[0], "Skilled, LTAC, Sabacute, Custodial Cases", 0, ele.name)}>{ele.data && ele.data[0].length}</td>
                                                                        <td key={index} className={this.state.rowClicked === 1 && this.state.oralNotificationHeader === "Skilled, LTAC, Sabacute, Custodial Cases" && this.state.rowTitle === ele.name ? "selected" : ""} style={{ color: "#424242", fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, ele && ele.data && ele.data[1], "Skilled, LTAC, Sabacute, Custodial Cases", 1, ele.name)}>{ele.data && ele.data[1].length}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                    <MDBCol md="6">
                                        <MDBCard style={{ height: "100%" }}>
                                            <MDBCardBody>
                                                <MDBTypography tag="h5" className="card-title">Catastrophic Cases</MDBTypography>
                                                <div style={{ overflowX: "auto", width: "100%", display: "block", paddingBottom: "32px" }}>
                                                    <table className="oral-notification-table">
                                                        <thead>
                                                            <tr>
                                                                <th>Facility</th>
                                                                <th>New Admission</th>
                                                                <th> Existing Cases </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.inpatientassignedCatastrophocQueue && this.state.inpatientassignedCatastrophocQueue.map((ele, index) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{ele.name}</td>
                                                                        <td key={index} className={this.state.rowClicked === 0 && this.state.oralNotificationHeader === "Catastrophic Cases" && this.state.rowTitle === ele.name ? "selected" : ""} style={{ color: "#CA2128", fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, ele && ele.data && ele.data[0], "Catastrophic Cases", 0, ele.name)}>{ele.data && ele.data[0].length}</td>
                                                                        <td key={index} className={this.state.rowClicked === 1 && this.state.oralNotificationHeader === "Catastrophic Cases" && this.state.rowTitle === ele.name ? "selected" : ""} style={{ color: "#424242", fontWeight: "600", textDecoration: "underline" }} onClick={this.handleactivateClick.bind(this, ele && ele.data && ele.data[1], "Catastrophic Cases", 1, ele.name)}>{ele.data && ele.data[1].length}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow style={{ marginTop: "16px" }}>
                                    <MDBCol md="12">
                                        <MDBCard style={{ height: "100%" }}>
                                            <MDBCardBody id="box">
                                                <MDBTypography tag="h5" className="card-title">{this.state.oralNotificationHeader}</MDBTypography>
                                                <div style={{ overflowX: "auto", width: "100%", display: "block", padding: "10px 5px 32px 5px" }}>
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
                                    </MDBCol>
                                </MDBRow>


                            </MDBTabsPane>
                            <MDBTabsPane show={basicActive === 'tab2'} className="tab2">
                                {/* Authorization Details Section Start */}
                                <MDBRow>
                                    <MDBCol>
                                        <MDBCard>
                                            <MDBCardBody>
                                                <MDBRow className="UnassignedQueues" style={{ paddingBottom: ".8rem" }} onClick={this.authorizationToggle}> Authorization Details
                                                    {/* <img style={{ height: "20px", width: "20px", marginLeft: "8px", marginTop: "2px" }} src="/images/outpatientqueryicon.png" alt='profileimage' id='profileimage' /> */}
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
                                            <MDBCardBody onClick={this.closeSearchPatientDetails}>
                                                <MDBRow className="UnassignedQueues" style={{ paddingBottom: ".8rem" }} onClick={this.patientDetailsToggle}> Patient Details/ Information
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
                                                                    <div className="patient-details" style={{ marginLeft: "-20px", display: "flex", marginTop: "-20px", flexWrap: "wrap", padding: "5px 10px" }}>
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
                                                {/* {this.state.requestingproviderdetails &&
                                                    <>
                                                        <div className="" style={{marginBottom:"20px"}}>
                                                            <MDBIcon icon="search" className="caremanagerlistsearchIcon" />
                                                            <input placeholder="Request Provider ID" id="searching" className="caremanagerlistsearching" type="text" value={this.state.searchedProviderDetailsText} onChange={this.onHandleProviderDetailsSearch.bind(this)} onFocus={this.getRequestProviderDetailsSearch} />
                                                        </div>
                                                        <div className={this.state.requestprovidersearchStarts ? 'contact-list' : 'contact-list hide'}>
                                                            {
                                                                this.state.oldrequestingProviderDetailsList && this.state.oldrequestingProviderDetailsList.map((el) => {
                                                                    return (
                                                                        <MDBRow className="">
                                                                            <div className="patient-details" style={{ display: "flex", padding: "5px 20px", cursor:"pointer" }} onClick={this.showSelectedRequestedProviderDetails.bind(this, el)}>
                                                                                <div style={{ margin: " 0px 5px" }}>{el.value}</div>
                                                                                
                                                                            </div>
                                                                        </MDBRow>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                        {this.state.selectedRequestedProviderData && this.state.selectedRequestedProviderData.map(el => {
                                                            return (
                                                                <>
                                                                <div className="">
                                                                    <div className="patient-details" style={{ marginLeft: "-16px",display: "flex", flexWrap:"wrap", padding: "5px 5px" }}>
                                                                        <MDBCol sm="6" md="2" lg="2" style={{margin:"10px 0px"}}>
                                                                            <div className="header">Requesting Provider ID</div>
                                                                            <div className="value">12548</div>
                                                                        </MDBCol>
                                                                        <MDBCol sm="6" md="2" lg="2" style={{margin:"10px 0px"}}>
                                                                            <div className="header">Name</div>
                                                                            <div className="value">Janet Talib</div>
                                                                        </MDBCol>
                                                                        <MDBCol sm="6" md="2" lg="2" style={{margin:"10px 0px"}}>
                                                                            <div className="header">Speciality</div>
                                                                            <div className="value">Primary</div>
                                                                        </MDBCol>
                                                                        <MDBCol sm="6" md="2" lg="2" style={{margin:"10px 0px"}}>
                                                                            <div className="header">Affliated Group</div>
                                                                            <div className="value">Apple</div>
                                                                        </MDBCol>
                                                                        <MDBCol sm="6" md="2" lg="2" style={{margin:"10px 0px"}}>
                                                                            <div className="header">Cell / Phone Number</div>
                                                                            <div className="value">909-383-0292</div>
                                                                        </MDBCol>
                                                                        <MDBCol sm="6" md="2" lg="2" style={{margin:"10px 0px"}}>
                                                                            <div className="header">Fax Number</div>
                                                                            <div className="value">909-383-0292</div>
                                                                        </MDBCol>
                                                                        
                                                                    </div>
                                                                </div>
                                                             </>
                                                            )
                                                        })}
                                                    </>
                                                } */}
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
                                                {/* {this.state.refferedproviderdetails &&
                                                    <>
                                                        <div className="" style={{marginBottom:"20px"}}>
                                                            <MDBIcon icon="search" className="caremanagerlistsearchIcon" />
                                                            <input placeholder="Request Provider ID" id="searching" className="caremanagerlistsearching" type="text" value={this.state.searchedPreferredDetailsText} onChange={this.onHandlePrefferedDetailsSearch.bind(this)} onFocus={this.getRefferedProviderDetailsSearch} />
                                                        </div>
                                                        <div className={this.state.refferedprovidersearchStarts ? 'contact-list' : 'contact-list hide'}>
                                                            {
                                                                this.state.oldrequestingPrefferedDetailsList && this.state.oldrequestingPrefferedDetailsList.map((el) => {
                                                                    return (
                                                                        <MDBRow className="">
                                                                            <div className="patient-details" style={{ display: "flex", padding: "5px 20px", cursor:"pointer" }} onClick={this.showSelectedRefferedProviderDetails.bind(this, el)}>
                                                                                <div style={{ margin: " 0px 5px" }}>{el.value}</div>
                                                                                
                                                                            </div>
                                                                        </MDBRow>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                        {this.state.selectedRefferedProviderData && this.state.selectedRefferedProviderData.map(el => {
                                                            return (
                                                                <>
                                                                <div className="">
                                                                    <div className="patient-details" style={{ marginLeft: "-16px",display: "flex", flexWrap:"wrap", padding: "5px 5px" }}>
                                                                        <MDBCol sm="6" md="2" lg="2" style={{margin:"10px 0px"}}>
                                                                            <div className="header">Reffered to Provider ID</div>
                                                                            <div className="value">56987</div>
                                                                        </MDBCol>
                                                                        <MDBCol sm="6" md="2" lg="2" style={{margin:"10px 0px"}}>
                                                                            <div className="header">Name</div>
                                                                            <div className="value">Jane Russel</div>
                                                                        </MDBCol>
                                                                        <MDBCol sm="6" md="2" lg="2" style={{margin:"10px 0px"}}>
                                                                            <div className="header">Speciality</div>
                                                                            <div className="value">Orthopedic</div>
                                                                        </MDBCol>
                                                                        <MDBCol sm="6" md="2" lg="2" style={{margin:"10px 0px"}}>
                                                                            <div className="header">Affliated Group</div>
                                                                            <div className="value">Mid Century Orthopedics Union Los Angeles</div>
                                                                        </MDBCol>
                                                                        <MDBCol sm="6" md="2" lg="2" style={{margin:"10px 0px"}}>
                                                                            <div className="header">Cell / Phone Number</div>
                                                                            <div className="value">213-272-9928</div>
                                                                        </MDBCol>
                                                                        <MDBCol sm="6" md="2" lg="2" style={{margin:"10px 0px"}}>
                                                                            <div className="header">Fax Number</div>
                                                                            <div className="value">213-272-9928</div>
                                                                        </MDBCol>
                                                                        
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <MDBInput type="textarea" label="Provider Details" onChange={this.handleproviderdetailschange} value={this.state.providerdetailsdescription}> </MDBInput>
                                                                     
                                                                 </div>
                                                             </>
                                                            )
                                                        })}
                                                    </>
                                                } */}
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
                                                        <div style={{ marginTop: "-10px" }} className={(this.state.adddiagnosissearchStarts && this.state.adddiagnosisDetailsList.length > 0 && this.state.adddiagnosisDetailsText !== "") ? 'contact-list1' : 'contact-list1 hide'}>
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
                                                    {this.state.servicerequestProviderData.length === 0 ?
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
                                                                        <div className="patient-details" style={{ marginLeft: "-16px", display: "flex", flexWrap: "wrap", padding: "5px 10px" }}>
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
                                                                            {/* <MDBCol sm="6" md="3" lg="3" style={{ margin: "10px 0px" }}>
                                                                                <div className="header">Service Type</div>
                                                                                <div className="value">P</div>
                                                                            </MDBCol>
                                                                            <MDBCol sm="6" md="3" lg="3" style={{ margin: "10px 0px" }}>
                                                                                <div className="header">Unit Type</div>
                                                                                <div className="value"></div>
                                                                            </MDBCol> */}
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
                                                                    selected="Requesting to Specialty"
                                                                    // selected={this.state.selectedrequestingspeciality}
                                                                    getTextContent={(text) => this.handleselectedrequestingspeciality(text)}
                                                                />
                                                            </MDBCol>

                                                            <MDBCol sm="6" md="3" lg="3">
                                                                <MDBSelect
                                                                    options={Data.speciality}
                                                                    // label="Reffering to Speciality"
                                                                    selected="Referring to Specialty"
                                                                    // selected={this.state.selectedreferringspeciality}
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
                                                                    selected="Created by"
                                                                    // selected={this.state.selectedcreatedby}
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
                                                                    selected="Modified by"
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
                                                {/* <MDBDataTable
                                                    small
                                                    hover={true}
                                                    responsive={true}
                                                    paging={false}
                                                    className="oraltables"
                                                    searching={false}
                                                    data={this.state.authscreensearchresults}
                                                /> */}
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
                    <style jsx>{inpatientStyles}</style>
                    <style jsx>{outpatientStyles}</style>
                    <style jsx>{PatientListStyle}</style>
                </Layout>
            </React.Fragment>
        );
    }
};

export default Inpatient;

const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');
const withImages = require('next-images');
const withPlugins = require("next-compose-plugins");

//module.exports = withPlugins([withCSS, withFonts, withImages]);


require('dotenv').config()
module.exports = withCSS(withImages({
     env: {
        API_BASEURL: process.env.API_BASEURL,
        API_USERNAME: process.env.API_USERNAME,
        API_PASSWORD: process.env.API_PASSWORD,
        API_PATIENTLIST : "v1patients/_search",
        API_DIAGNOSISDETAILSENDPOINT : "diagnosis_details/_search",
        API_SERVICEREQUESTDETAILSENDPOINT : "service_request_details/_search",
        API_AUTHLOGIN :  "authapi/login",
        API_FORGETPASSWORD: "authapi/forgotpassword",
        API_USER_DETAILS: "memberapi/memberbyemailid",
        API_CARETEAMMEMBERDEATILS: "memberapi/careteammemberbyemailid",
        API_USER_DETAILS_UUID: "memberapi/memberbyuuid",
        API_USERDETAILS : "memberapi/v1/member",
        API_PATINETDETAILS: "memberapi/v1/memberfull/",
        API_UPDATEALERT: "alerts/_update/",
        API_NOTESCREATE: "memberapi/patientnotes/insert",
        API_GETALLNOTES: "memberapi/patientnotes/all/",
        API_GETALLTASKS: "memberapi/membertasks",
        API_FETCHTASKAPPOINTMENTS: "calendarapi/fetchTaskAppointments",
        API_ALERTUPDATE: "memberapi/updateAlert",
        API_TASKUPDATE: "memberapi/updateCareTeamMemberTask",
        API_UPDATEAPPOINTMENTTASK: "calendarapi/updateAppointmentReadStatus",
        API_DASHBOARDCHARTS: "home_screen/_search",
        API_DASHBOARD: "recent_activity/_search",
        API_DASHBOARD_ALERTS: "alerts/_search",
        API_ASSESSMENTS_ALERTS: "assessmentapi/getUpcomingAssessmentByCareManager",
        API_UPLOADIMAGE: "memberapi/uploadprofileimage/",
        API_UPLOADIMAGEPATH: "memberapi/uploadprofileimageformdata/",
        // API_UPLOADIMAGEPATH: "memberapi/uploadprofileimageOnlyFile/",
        API_PROFILEIMAGE : "memberapi/profileimage",
        API_ASSESSMENTLIST : "assessmentapi/getPatientAssessment",
        API_POSTASSESSMENT:"assessmentapi/updatePatientAssessment",
        API_LISTOFALLASSESSMENTS: "assessmentapi/getAllAssessmentName",
        API_FETCHAPPOINTMENTS: "calendarapi/fetchAppointments",
        API_CREATEAPPOINTMENT: "calendarapi/createAppointment",
        API_EDITAPPOINTMENT: "calendarapi/editAppointments",
        API_DELETEAPPOINTMENT: "calendarapi/deleteAppointments",
        API_HEALTH360ASSESSMENT : "assessmentapi/getPatientAllAssessments",
        API_RISKSCORELIST: "memberapi/riskscores/",
        // API_HEALTH360ASSESSMENT : "assessmentapi/v1/assessments/c73cb036-a36f-4911-93c5-7268c00c2e5f",
        // API_RISKSCORELIST: "memberapi/v1/riskscores/c73cb036-a36f-4911-93c5-7268c00c2e5f",
        API_HEALTH360: "fhir/Patient/$everything",
        API_HEALTH360_FHIR: "fhir/Patient",
        // API_HEALTH360: "fhirapi/v1/Patient/c73cb036-a36f-4911-93c5-7268c00c2e5f/%24everything",
        API_PATINETHEALTH360: "fhirapi/Patient",
        API_CAREPLAN: "memberapi/careplan",
        API_UPDATE_CAREPLAN: "memberapi/careplan/updateCareplan",
        //API_CAREPLAN: "memberapi/v1/careplan/96d74ea9-aeef-41a5-a384-e41972114569",
        //API_CAREPLAN_CASENUMBER: "memberapi/casenumberDetails?patientid=96d74ea9-aeef-41a5-a384-e41972114569",
        API_CAREPLAN_CASENUMBER: "memberapi/casenumberDetails",
        API_RPMCGM: "patient_cgm_anamaly/_search",
        API_RPMCGMREAL: "patient_cgm_real/_search",
        API_RPMCGMDIALY: "patient_cgm_daily_prediction/_search",
        API_RPMCGMREALDIALY: "patient_cgm_daily_real/_search",
        API_CREATEMEMBER: "telemedicineapi/createMemberResource",
        API_SAVEGROUP: "telemedicineapi/saveGroupName",
        API_FETCHGROUP: "telemedicineapi/fetchGroupName",
        API_DELETEGROUP: "telemedicineapi/deletGroupName",
        API_SENDPUSHDATAMESSAGE: "telemedicineapi/sendPushDataMessage",
        API_LISTCARETEAMDETAILS: "memberapi/listCareTeamDetails",
        API_SAVECARETEAMDETAILS: "memberapi/saveCareTeamDetails",
        API_FETCHROLE: "memberapi/fetchRole",
        API_CREATENEWROLE: "memberapi/createNewRole",
        API_CHANGEPASSWORD: "authapi/changepassword",
        API_ADDNEWCARETEAMMEMBER: "authapi/addCareTeamMember",
        API_EDITNEWCARETEAMMEMBER: "authapi/editCareTeamMember",
        API_GENERATETWILIODETAILS: "telemedicineapi/generateUserTwilioIdentification",
        API_FETCHATTEMPTHISTORY: "memberapi/fetchAttemptHistory",
        API_INSERTATTEMPTDETAILS: "memberapi/insertAttemptDetails",
        API_VALIDATEGUESTUSER: "telemedicineapi/validateGuestUser",
        API_MANUALASSIGNMENT: "memberapi/patientManualAssignment",
        API_MANUALASSIGNMENTHISTORY: "memberapi/patientManualAssignmentHistory",
        BROWSER:JSON.stringify(true),
        TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
        TWILIO_API_KEY_SID: process.env.TWILIO_API_KEY_SID,
        TWILIO_API_KEY_SECRET: process.env.TWILIO_API_KEY_SECRET,
        TELEMEDICINE_ASSIGNEDPATIENTDETAILS: "telemedicineapi/getAssignedPatientDetails",
        TELEMEDICINE_CARETEAMDETAILS: "telemedicineapi/getCareTeamDetails",
        TWILIO_CHAT_TOKEN: "telemedicineapi/generateUserChatToken",
        TWILIO_VIDEO_TOKEN: "telemedicineapi/generateUserVideoToken",
        API_GETSERVICETYPES:"memberapi/getServiceTypes",
        API_GETREFERTOPROGRAMCATEGORIES: "memberapi/getReferToProgramCategories",
        API_GETHOSPITALSBASEDONREFERTOPROGRAM : "memberapi/getFacilitiesByReferId",
        API_GETSERVICECATEGORIES:"memberapi/getServiceCategories",
        API_CREATEREFERAL: "memberapi/createAuthReferral",
        API_PLACESOFSERVICE: "memberapi/getPlaceOfServices",
        API_DIAGNOSISDETAILS: "memberapi/getDiagnosisBySearchKey",
        API_SERVICEREQUESTDETAILS: "memberapi/getServiceRequestBySearchKey",
        API_GETAUTHLISTASSIGNED: "memberapi/getAuthListByAssignedTo",
        API_GETHAUTHDETAILSBYID:"memberapi/getAuthById",
        API_GETAUTHSERVICEBYTYPE: "memberapi/getAuthByServiceType",
        API_ORALNOTIFICATIONS: "memberapi/getOralNotificationAuthData",
        API_SEARCHAUTHDETAILS: "memberapi/searchAuthReferral",
        API_INSERTUMNOTES: "memberapi/insertUMNote",
        API_UPDATEREFERAL: "memberapi/updateAuthReferral",
        API_ASSIGNUMUSER: "memberapi/assignUMUser",
        API_ASSIGNMENTHISTOTYBYAUTH: "memberapi/getAssignmentHistoryByAuthId",
        API_GETASSIGNEDAUTHLIST: "memberapi/getAssignedAuthList",
        API_GETREFERALBASEDONSTATUS: "memberapi/getReferalBasedOnStatus"
      },
      webpack(config, options) {

        config.module.rules.push({

            test: /\.(woff2|woff)(\?v=[0-9]\.[0-9]\.[0-9])?(\?#iefix)?$/,

            loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]',

            options: {

                publicPath: './static'

            }

        });

        config.module.rules.push({

            test: /\.(ttf|eot|svg|png|jpg|gif|ico|otf)(\?v=[0-9]\.[0-9]\.[0-9])?(\?#iefix)?$/,

            loader: 'file-loader?name=[name].[ext]',

            options: {

                publicPath: './static'

            }

        });

        return config

    },

}));
export const BaseURL = process.env.API_BASEURL;
export const userDetailsEndpoint  = process.env.API_USERDETAILS;
export const patienttdetailsendpoint = process.env.API_PATINETDETAILS;
export const assessmentEndpoint = process.env.API_ASSESSMENTLIST;
export const patientslistEndPoint= process.env.API_PATIENTLIST;
export const userdetailsbyemail = process.env.API_USER_DETAILS;
export const careteammemberdetailsbyemail = process.env.API_CARETEAMMEMBERDEATILS;
export const userdetailsbyuuid = process.env.API_USER_DETAILS_UUID;
export const diagnosisDetails= process.env.API_DIAGNOSISDETAILSENDPOINT;
export const serviceRequestDetails= process.env.API_SERVICEREQUESTDETAILSENDPOINT;
export const changepassword = process.env.API_CHANGEPASSWORD;
export const updateAlert = process.env.API_UPDATEALERT;
export const appointmenttaskupdate = process.env.API_UPDATEAPPOINTMENTTASK;
export const assessmentsalerts = process.env.API_ASSESSMENTS_ALERTS;
export const alertupdate = process.env.API_ALERTUPDATE;
export const taskupdate = process.env.API_TASKUPDATE;
export const notescreate = process.env.API_NOTESCREATE;
export const getallnotes = process.env.API_GETALLNOTES;
export const getalltasks = process.env.API_GETALLTASKS;
export const dashboardcharts = process.env.API_DASHBOARDCHARTS;
export const dashboardalerts = process.env.API_DASHBOARD_ALERTS;
export const dashboardrecentactivity = process.env.API_DASHBOARD;
export const uploadimage = process.env.API_UPLOADIMAGE;
export const uploadimagepath = process.env.API_UPLOADIMAGEPATH;
export const profileimage = process.env.API_PROFILEIMAGE;
export const assessmentList = process.env.API_LISTOFALLASSESSMENTS;
export const fetchTaskAppointments = process.env.API_FETCHTASKAPPOINTMENTS;
export const health360assessmentendpoint = process.env.API_HEALTH360ASSESSMENT;
export const postassessment = process.env.API_POSTASSESSMENT;
export const fetchappointments = process.env.API_FETCHAPPOINTMENTS;
export const createAppointment = process.env.API_CREATEAPPOINTMENT;
export const editAppointment = process.env.API_EDITAPPOINTMENT;
export const deleteappointment = process.env.API_DELETEAPPOINTMENT;
export const authlogin = process.env.API_AUTHLOGIN;
export const forgetpassword = process.env.API_FORGETPASSWORD;
export const health360Endpoint = process.env.API_HEALTH360;
export const apihealth360fhir = process.env.API_HEALTH360_FHIR;
export const patinethealth360Endpoint = process.env.API_PATINETHEALTH360;
export const riskscoreendpoint = process.env.API_RISKSCORELIST;
export const careplanendpoint = process.env.API_CAREPLAN;
export const updatecareplanendpoint = process.env.API_UPDATE_CAREPLAN;
export const careplancasenumberdetails = process.env.API_CAREPLAN_CASENUMBER;
export const rpmscgm = process.env.API_RPMCGM;
export const rpmscgmreal = process.env.API_RPMCGMREAL;
export const rpmscgm_dialy = process.env.API_RPMCGMDIALY;
export const rpmscgmreal_dialy = process.env.API_RPMCGMREALDIALY;
export const createMember = process.env.API_CREATEMEMBER;
export const saveGroup = process.env.API_SAVEGROUP;
export const fetchGroup = process.env.API_FETCHGROUP;
export const deleteGroup = process.env.API_DELETEGROUP;
export const sendPushDataMessage = process.env.API_SENDPUSHDATAMESSAGE;
export const listCareTeamDetails = process.env.API_LISTCARETEAMDETAILS;
export const saveCareTeamDetails = process.env.API_SAVECARETEAMDETAILS;
export const fetchRole = process.env.API_FETCHROLE;
export const validateGuestUser = process.env.API_VALIDATEGUESTUSER;
export const createNewRole = process.env.API_CREATENEWROLE;
export const addCareTeamMember = process.env.API_ADDNEWCARETEAMMEMBER;
export const editCareTeamMember = process.env.API_EDITNEWCARETEAMMEMBER;
export const generateTwilioIdentification = process.env.API_GENERATETWILIODETAILS;
export const fetchAttemptHistory = process.env.API_FETCHATTEMPTHISTORY;
export const insertAttemptDetails = process.env.API_INSERTATTEMPTDETAILS;
export const manualassignment = process.env.API_MANUALASSIGNMENT;
export const manualassignmenthistory = process.env.API_MANUALASSIGNMENTHISTORY;
export const getServiceTypes = process.env.API_GETSERVICETYPES;
export const refertoprogramcategories = process.env.API_GETREFERTOPROGRAMCATEGORIES;
export const hospitalcategoriesbasedonreferencetoprogram = process.env.API_GETHOSPITALSBASEDONREFERTOPROGRAM;
export const getServiceCategories = process.env.API_GETSERVICECATEGORIES;
export const createAuthReferral = process.env.API_CREATEREFERAL;
export const getPlaceOfServices = process.env.API_PLACESOFSERVICE;
export const getDiagnosisBySearchKey = process.env.API_DIAGNOSISDETAILS;
export const getServiceRequestBySearchKey = process.env.API_SERVICEREQUESTDETAILS;
export const getAuthListByAssignedTo = process.env.API_GETAUTHLISTASSIGNED;
export const getAuthById = process.env.API_GETHAUTHDETAILSBYID;
export const getAuthByServiceType = process.env.API_GETAUTHSERVICEBYTYPE;
export const getOralNotificationAuthData = process.env.API_ORALNOTIFICATIONS;
export const searchAuthReferral = process.env.API_SEARCHAUTHDETAILS;
export const insertUMNote = process.env.API_INSERTUMNOTES;
export const updateAuthReferral = process.env.API_UPDATEREFERAL;
export const assignUMUser = process.env.API_ASSIGNUMUSER;
export const getAssignmentHistoryByAuthId = process.env.API_ASSIGNMENTHISTOTYBYAUTH;
export const getAssignedAuthList = process.env.API_GETASSIGNEDAUTHLIST;
export const getReferalBasedOnStatus = process.env.API_GETREFERALBASEDONSTATUS;
let username = process.env.API_USERNAME;
let password = process.env.API_PASSWORD;
let auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
export const config = {
      headers: { 
        "Authorization" : auth,
      },
};
export const profileconfig = {
  headers: { 
    "Authorization" : auth,
  },
  responseType:'arraybuffer'
};

export const Auth = "Basic " + new Buffer(username + ":" + password).toString("base64");


export const plotlylegend = {
  x: 0,
  y: 1.2,
  orientation: "h",
  bgcolor: 'rgba(255, 255, 255, 0)',
  bordercolor: 'rgba(255, 255, 255, 0)'
}
export const plotlygraphlegend = {
  x: 0,
  y: 1.4,
  orientation: "h",
  bgcolor: 'rgba(255, 255, 255, 0)',
  bordercolor: 'rgba(255, 255, 255, 0)'
}

export const twiliochattoken = process.env.TWILIO_CHAT_TOKEN;
export const twiliovideotoken = process.env.TWILIO_VIDEO_TOKEN;
export const telemedicineassignedpatientdetails = process.env.TELEMEDICINE_ASSIGNEDPATIENTDETAILS;
export const telemedicinegetcareteamdetails = process.env.TELEMEDICINE_CARETEAMDETAILS;


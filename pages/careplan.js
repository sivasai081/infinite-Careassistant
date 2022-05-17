
import React, { Component } from "react";
import { MDBSelect, MDBInput, MDBDatePickerV5, MDBCard, MDBCardBody, MDBCollapse, MDBRow, MDBCol, MDBTypography, MDBIcon, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBChipsInput, MDBPopover, MDBPopoverHeader, MDBPopoverBody } from "mdbreact";
import CarePlanStyle from '../styles/careplan.js';
import Health360Style from '../styles/health360.js';
import Layout from "../components/layout";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Loader from '../components/loader';
import axios from 'axios';
import Link from 'next/link';
import moment from 'moment';
import ExistingNotes from '../components/existingNotes'
import MDBFileupload from 'mdb-react-fileupload';
import Head from 'next/head'



class CarePlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myAssignmentToggle: false,
      isLoaded: true,
      cancelproblemreasonname: '',
      cancelprobemDropdown: [
        {
          text: "Goals met",
          value: "1"
        },
        {
          text: "Goals not met",
          value: "2"
        },
        {
          text: "Goals closed",
          value: "3"
        }
      ],
      addClass: true,
      newproblemmodal: false,
      problemsaved: false,
      viewproblemenabled: true,
      newbarriermodal: false,
      newproblemmodal: false,
      newinterventionmodal: false,
      newpatientsactionmodal: false,
      newnotemodal: false,
      evaluationdatemodal: false,
      evaluationdateconfirmationmodal: false,
      evaluationdatehistorymodal: false,
      requestclosingmodal: false,
      requestclosingconfirmationmodal: false,
      closingrequestpendingenable: false,
      cancelclosingrequestmodal: false,
      cancelrequestpendingenable: false,
      newgoalmodal: false,
      problemId: "",
      problemName: '',
      goaldescription: "",
      reevaluationdate: '',
      problems: [],
      barrier: [{
        barrier_statement: ''
      }],
      interventions: [{
        intervention_statement: '',
      }],
      patientAction: [{
        action_statement: ''
      }],
      viewbarrier: {},
      viewinterventions: {},
      viewpatientAction: {},
      viewgoalnotes: '',
      viewRevaluationReason: '',
      viewRevaluationDate: null,
      viewrequestclosingreason: '',
      viewcancelrequestreason: '',
      carePlanData: {},
      careProblems: [],
      modalGoalId: 0,
      newBarrierNoteModal: false,
      selectedBarrierData: '',
      seemorenotes: false,
      problemsDropdown: [],
      carePlancasenumberData: {},
    }
  }
  componentDidMount() {
    let patientid = localStorage.getItem('patientId');
    axios.get(`/api/riskscore`, {
      params: {
        id: patientid
      }
    })
      .then(res => {
        this.setState({ riskscorelist: [] }, () => {
          // this.setState({riskscorelist: res.data.json }, () => { // commented because no API is there
          this.setState({
            riskscorelistcount: this.state.riskscorelist && this.state.riskscorelist.total
          });

        });
      })

    axios.get(`/api/health360assessment`, {
      params: {
        id: patientid
      }
    })
      .then(res => {
        this.setState({ health360assessments: res.data.json.patient_assessments }, () => {
          this.setState({
            health360assessmentscount: this.state.health360assessments.length
          });

        });
      })
    axios.get(`/api/patienthealth360`, {
      params: {
        id: patientid
      }
    })

      .then(res => {
        this.setState({ patientfhirdetails: res.data.json.entry[0].resource.id }, () => {
          axios({
            method: 'GET',
            url: `/api/patientfhirdata`,
            params: {
              id: this.state.patientfhirdetails,

            }
          })
            .then(res => {
              this.setState({
                health360data: res.data.json.entry
              }, () => {
                let allergies = this.state.health360data.filter(el => el.resource.resourceType == "AllergyIntolerance");
                let imaging = this.state.health360data.filter(el => el.resource.resourceType == "ImagingStudy");
                let medications = this.state.health360data.filter(el => el.resource.resourceType == "MedicationRequest");
                let encounters = this.state.health360data.filter(el => el.resource.resourceType == "Encounter");
                let claims = this.state.health360data.filter(el => el.resource.resourceType == "Claim");
                let procedures = this.state.health360data.filter(el => el.resource.resourceType == "Procedure");
                let conditions = this.state.health360data.filter(el => el.resource.resourceType == "Condition");
                let observations = this.state.health360data.filter(el => el.resource.resourceType == "Observation");
                let immunization = this.state.health360data.filter(el => el.resource.resourceType == "Immunization");
                let patientdata = this.state.health360data.filter(el => el.resource.resourceType == "Patient")
                let allergiescount = this.state.health360data.filter(el => el.resource.resourceType == "AllergyIntolerance").length;
                let conditionscount = this.state.health360data.filter(el => el.resource.resourceType == "Condition").length;
                let encounterscount = this.state.health360data.filter(el => el.resource.resourceType == "Encounter").length;
                let medicationscount = this.state.health360data.filter(el => el.resource.resourceType == "MedicationRequest").length;
                let observationscount = this.state.health360data.filter(el => el.resource.resourceType == "Observation").length;
                let imagingcount = this.state.health360data.filter(el => el.resource.resourceType == "ImagingStudy").length;
                let Immunizationscount = this.state.health360data.filter(el => el.resource.resourceType == "Immunization").length;
                let Procedurescount = this.state.health360data.filter(el => el.resource.resourceType == "Procedure").length;
                this.setState({
                  conditionscount,
                  encounterscount,
                  medicationscount,
                  observationscount,
                  imagingcount,
                  imaging,
                  Immunizationscount,
                  Procedurescount,
                  patientdata,
                  procedures,
                  immunization,
                  observations,
                  conditions,
                  claims,
                  encounters,
                  medications,
                  allergies,
                  allergiescount
                });
              });
            })

        });
      })
      .catch((error) => {
        this.setState({ isLoaded: true });

      })

    axios.get(`/api/careplancasenumber`, {
      params: {
        id: patientid
      }
    })
      .then(res => {
        this.setState({
          carePlancasenumberData: res.data.json,
        }, () => {
          let careplancasedetails = this.state.carePlancasenumberData.result;
          this.setState({
            careplan_id: careplancasedetails && careplancasedetails.careplan_id,
            careplan_status: careplancasedetails && careplancasedetails.careplan_status,
            careplan_owner: careplancasedetails && careplancasedetails.firstname + " " + careplancasedetails.lastname,
            careplan_coowner: careplancasedetails && careplancasedetails.caregivers == [] ? [] : careplancasedetails && careplancasedetails.caregivers && careplancasedetails.caregivers[0] && careplancasedetails.caregivers[0].firstname + " " + careplancasedetails && careplancasedetails.caregivers && careplancasedetails.caregivers[0] && careplancasedetails.caregivers[0].lastname + "," + careplancasedetails && careplancasedetails.caregivers && careplancasedetails.caregivers[0] && careplancasedetails.caregivers[0].relationship,
            careplan_createdDate: moment(careplancasedetails && careplancasedetails.created_date).format("DD/MM/YYYY"),
          });

        });
      })



    axios.get(`/api/careplan`, {
      params: {
        id: patientid
      }
    })
      .then(res => {
        let problemsList = [];
        res.data.json && res.data.json.result && res.data.json.result.problems.map((el) => {
          problemsList.push(el.problem_statement)
        })
        this.setState({
          carePlanData: res.data.json.result,
          problems: problemsList,
          problemsDropdown: problemsList.map((el, i) => {
            return {
              text: el.toUpperCase(),
              value: i
            }

          }),
          problemId: 0,
          careProblems: res.data.json.result != null ? res.data.json && res.data.json.result.problems && res.data.json.result.problems[0] : [],
          isLoaded: false,
        });
      })
    window.addEventListener('scroll', this.myScrollFunc);
  }

  myScrollFunc = () => {
    let y = window.scrollY;
    let win = window,
      doc = document,
      docElem = doc.documentElement,
      body = doc.getElementsByTagName('body')[0],
      x = win.innerWidth || docElem.clientWidth || body.clientWidth;
    let div = document.getElementsByClassName("careplan-problems")[0];

    if (div && x >= 768) {
      div.style.marginTop = y + "px";
    }
  }

  //Barrier Modal functions
  addnewbarrier = inc => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.setState({
      newbarriermodal: true,
      modalGoalId: inc
    });
  }
  newbarriertoggle = () => {
    this.setState({
      newbarriermodal: !this.state.newbarriermodal
    });
  }

  //intervention Modal functions
  addnewintervention = (inc) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.setState({
      newinterventionmodal: true,
      modalGoalId: inc
    });
  }
  newinterventiontoggle = () => {
    this.setState({
      newinterventionmodal: !this.state.newinterventionmodal
    });
  }

  //evaluation Modal functions
  changeevaluationDate = (inc) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.setState({
      evaluationdatemodal: true,
      modalGoalId: inc
    });
  }
  evaluationdatetoggle = () => {
    this.setState({
      evaluationdatemodal: !this.state.evaluationdatemodal
    });
  }

  //evaluation Comfirmation modal functions
  changeReevaluationDate = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.setState({
      evaluationdateconfirmationmodal: true, evaluationdatemodal: false
    });
  }
  evaluationdateconfirmationtoggle = () => {
    this.setState({
      evaluationdateconfirmationmodal: !this.state.evaluationdateconfirmationmodal,

    });
  }

  //evaluationdate history

  evaluationdatehistory = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.setState({
      evaluationdatehistorymodal: true
    });
  }
  evaluationdatehistorytoggle = () => {
    this.setState({
      evaluationdatehistorymodal: !this.state.evaluationdatehistorymodal,

    });
  }

  //Patient Action Modal functions
  addnewpatientsaction = (inc) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.setState({
      newpatientsactionmodal: true,
      modalGoalId: inc
    });
  }
  newpatientsactiontoggle = () => {
    this.setState({
      newpatientsactionmodal: !this.state.newpatientsactionmodal
    });
  }

  //Note Modal functions
  addnewnote = (inc) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.setState({
      newnotemodal: true,
      modalGoalId: inc
    });
  }
  newnotetoggle = () => {
    this.setState({
      newnotemodal: !this.state.newnotemodal
    });
  }

  createnewgoalmodal() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.setState({
      newgoalmodal: true
    });
  }

  createnewgoaltoggle = () => {
    this.setState({
      newgoalmodal: !this.state.newgoalmodal
    });
  }
  //Request closing
  requestclosing() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.setState({
      requestclosingmodal: true
    });
  }
  requestclosingtoggle = () => {
    this.setState({
      requestclosingmodal: !this.state.requestclosingmodal
    });
  }

  //Requestclosingconfirmation

  saverequestClosing() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.setState({
      requestclosingconfirmationmodal: true, requestclosingmodal: false
    });

  }
  requestclosingconfirmationtoggle = () => {
    this.setState({
      requestclosingconfirmationmodal: !this.state.requestclosingconfirmationmodal
    });
  }

  cancelrequestclosing() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.setState({
      cancelclosingrequestmodal: true
    });
  }

  savecancelrequestclosing() {
    this.setState({
      isLoaded: true
    })
    let patientid = localStorage.getItem('patientId');
    let problm = this.state.carePlanData.problems[this.state.problemId];
    problm.problem_status = "CLOSED";
    problm.closed_request_reason = this.state.viewcancelrequestreason;
    this.state.carePlanData.problems[this.state.problemId] = problm;
    axios({
      method: 'PUT',
      url: `/api/careplan`,
      data: this.state.carePlanData,
      params: {
        id: patientid
      }
    })
      .then((response) => {
        this.setState({
          carePlanData: response.data.json.result, cancelrequestpendingenable: true, cancelclosingrequestmodal: false, closingrequestpendingenable: false, isLoaded: true
        });

      })
      .catch(function (response) { console.log(response); });

  }

  cancelclosingrequestoggle = () => {
    this.setState({
      cancelclosingrequestmodal: !this.state.cancelclosingrequestmodal
    });
  }

  toggleCollapse(collapseID, gol, ind) {
    this.setState({
      collapseID: collapseID
    });
    var element = document.getElementById(`Goal${ind + 1} ${collapseID}`);
    if (!element.classList.contains("hideAccordion")) {
      element.classList.add("hideAccordion");
    } else if (element.classList.contains("hideAccordion")) {
      element.classList.remove("hideAccordion");
    }
  }
  addnewproblem() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.setState({
      newproblemmodal: true
    });
  }

  newproblemtoggle = () => {
    this.setState({
      newproblemmodal: !this.state.newproblemmodal
    });
  }
  addBarrier = () => {
    let barrier = this.state.barrier;
    let newBarrier = { barrier_statement: '' }
    barrier.push(newBarrier);
    this.setState({ barrier }, () => {

    })
  }
  handleBarrierChange = (e, i) => {
    let barrier = [...this.state.barrier]
    barrier[i].barrier_statement = e.target.value;
    this.setState({ barrier })
  }

  addInterventions = () => {
    let interventions = this.state.interventions;
    let newIntervention = { intervention_statement: '' }
    interventions.push(newIntervention);
    this.setState({ interventions }, () => {

    })
  }

  handleInterventionChange = (e, i) => {
    let interventions = [...this.state.interventions]
    interventions[i].intervention_statement = e.target.value;
    this.setState({ interventions })
  }

  addPatientAction = () => {
    let patientAction = this.state.patientAction;
    let newPatient = { action_statement: '' }
    patientAction.push(newPatient);
    this.setState({ patientAction }, () => {

    })
  }
  handlePatientChange = (e, i) => {
    let patientAction = [...this.state.patientAction]
    patientAction[i].action_statement = e.target.value;
    this.setState({ patientAction })
  }

  handlegoalchnage = (e) => {
    this.setState({
      goaldescription: e.target.value
    });
  }

  handlereevaluationdatechange = (value) => {
    this.setState({
      reevaluationdate: value
    });
  }

  saveProblem = () => {
    this.setState({
      isLoaded: true
    })
    let request = this.state.carePlanData;
    let problemsavailable = this.state.carePlanData && this.state.carePlanData.problems && this.state.carePlanData.problems.length
    if (problemsavailable == undefined) {
      console.log("empty object")
      let patientid = localStorage.getItem('patientId');
      let request = {
        careplan_id: "ddfc1872-e316-11ea-9363-3af9d3a464c1",
        patient_id: patientid,
        subject_id: "",
        problems: [{
          problem_statement: this.state.problemName,
          problem_status: "INPROGRESS",
          request_reason: "",
          closed_request_reason: "",
          requested_closed_by: "",
          goals: [
            {
              goal_statement: this.state.goaldescription,
              evaluation_date: this.state.reevaluationdate,
              barriers: [],
              interventions: [],
              patient_actions: [],
              goal_notes: []
            }
          ],
          goal_history: [],
          source_nlp_text: "",
          matched_topics: []
        }],
        auto_generated: false
      }
      axios({
        method: 'PUT',
        url: `/api/careplan`,
        data: request,
        params: {
          id: patientid
        }
      })
        .then((response) => {
          let careProblems = response.data.json.result.problems;
          this.setState({ carePlanData: response.data.json.result, careProblems, problemId: 0, viewproblemenabled: true, isLoaded: false });
          location.reload()
        })
        .catch(function (response) { console.log(response); });
    } else {
      console.log("not empty object")
      let problemRequest = {
        problem_statement: this.state.problemName,
        problem_status: "INPROGRESS",
        request_reason: "",
        closed_request_reason: "",
        requested_closed_by: "",
        goals: [
          {
            goal_statement: this.state.goaldescription,
            evaluation_date: this.state.reevaluationdate,
            barriers: [],
            interventions: [],
            patient_actions: [],
            goal_notes: []
          }
        ],
        goal_history: [],
        source_nlp_text: "",
        matched_topics: []
      }
      this.setState({ isLoaded: true })
      request.problems = [problemRequest, ...request.problems];
      let patientid = localStorage.getItem('patientId');
      axios({
        method: 'PUT',
        url: `/api/careplan`,
        data: request,
        params: {
          id: patientid
        }
      })
        .then((response) => {
          let careProblems = response.data.json.result.problems;
          this.setState({ carePlanData: response.data.json.result, careProblems, problemId: 0, viewproblemenabled: true, isLoaded: false });
          location.reload()
        })
        .catch(function (response) { console.log(response); });
    }



    let problemsdropdown = this.state.problemsDropdown;
    problemsdropdown.map((el, i) => el.value = i + 1);
    problemsdropdown.unshift({ text: this.state.problemName.toUpperCase(), value: 0 });
    this.setState({ viewproblemenabled: false, problemsDropdown: problemsdropdown, newproblemmodal: false, problemsaved: true });

  }

  handleproblemName(e) {
    this.setState({
      problemName: e.target.value
    });
  }

  handleGoalSave = () => {
    let request = this.state.carePlanData;
    let problemRequest =
    {
      problem_statement: this.state.problemName,
      problem_status: "INPROGRESS",
      request_reason: "",
      closed_request_reason: "",
      requested_closed_by: "",
      goals: [
        {
          goal_statement: this.state.goaldescription,
          evaluation_date: this.state.reevaluationdate,
          barriers: this.state.barrier[0].barrier_statement ? this.state.barrier : [],
          interventions: this.state.interventions[0].intervention_statement ? this.state.interventions : [],
          patient_actions: this.state.patientAction[0].action_statement ? this.state.patientAction : [],
          goal_notes: []
        }
      ],
      goal_history: [],
      source_nlp_text: "",
      matched_topics: []
    }
    this.setState({ isLoaded: true })
    request.problems = [problemRequest, ...request.problems];
    let patientid = localStorage.getItem('patientId');
    axios({
      method: 'PUT',
      url: `/api/careplan`,
      data: request,
      params: {
        id: patientid
      }
    })
      .then((response) => {
        let careProblems = response.data.json.result.problems;
        this.setState({ carePlanData: response.data.json.result, careProblems, problemId: 0, viewproblemenabled: true, isLoaded: true });
        location.reload()
      })
      .catch(function (response) { console.log(response); });

  }

  handleProblemChange(e) {
    this.setState({
      problemsaved: false,
      problemId: e.length === 0 ? 0 : e[0],
      careProblems: e.length === 0 ? this.state.carePlanData && this.state.carePlanData.problems && this.state.carePlanData.problems[0] : this.state.carePlanData && this.state.carePlanData.problems && this.state.carePlanData.problems[e[0]],
      viewproblemenabled: true,
    });
  }


  handleviewBarrierChange = (_e, i) => {
    let viewbarrier = this.state.viewbarrier
    viewbarrier.barrier_statement = _e.target.value;
    this.setState({ viewbarrier })
  }
  saveviewBarrier = i => {
    this.setState({ isLoaded: true })
    let gole = this.state.carePlanData.problems[this.state.problemId].goals[i];
    gole.barriers.push(this.state.viewbarrier)
    this.state.carePlanData.problems[this.state.problemId].goals[i] = gole;
    let patientid = localStorage.getItem('patientId');
    axios({
      method: 'PUT',
      url: `/api/careplan`,
      data: this.state.carePlanData,
      params: {
        id: patientid
      }
    })
      .then((response) => {
        let careProblems = response.data.json.result.problems[this.state.problemId];
        this.setState({ carePlanData: response.data.json.result, careProblems, newbarriermodal: false, isLoaded: false });

      })
      .catch(function (response) { console.log(response); });
  }
  handleviewActionChange = (_e, i) => {
    let viewpatientAction = this.state.viewpatientAction
    viewpatientAction.action_statement = _e.target.value;
    this.setState({ viewpatientAction })
  }
  saveviewActions = i => {
    this.setState({ isLoaded: true })
    let gole = this.state.carePlanData.problems[this.state.problemId].goals[i];
    gole.patient_actions.push(this.state.viewpatientAction)
    this.state.carePlanData.problems[this.state.problemId].goals[i] = gole;
    let patientid = localStorage.getItem('patientId');
    axios({
      method: 'PUT',
      url: `/api/careplan`,
      data: this.state.carePlanData,
      params: {
        id: patientid
      }
    })
      .then((response) => {
        let careProblems = response.data.json.result.problems[this.state.problemId];
        this.setState({ carePlanData: response.data.json.result, careProblems, newpatientsactionmodal: false, isLoaded: false });

      })
      .catch(function (response) { console.log(response); });
  }
  handleviewInterventionChange = (_e, i) => {
    let viewinterventions = this.state.viewinterventions
    viewinterventions.intervention_statement = _e.target.value;
    this.setState({ viewinterventions })
  }

  saveviewIntervention = i => {
    this.setState({
      isLoaded: true
    })
    let gole = this.state.carePlanData.problems[this.state.problemId].goals[i];
    gole.interventions.push(this.state.viewinterventions)
    this.state.carePlanData.problems[this.state.problemId].goals[i] = gole;
    let patientid = localStorage.getItem('patientId');
    axios({
      method: 'PUT',
      url: `/api/careplan`,
      data: this.state.carePlanData,
      params: {
        id: patientid
      }
    })
      .then((response) => {
        let careProblems = response.data.json.result.problems[this.state.problemId];
        this.setState({ carePlanData: response.data.json.result, careProblems, newinterventionmodal: false, isLoaded: false });

      })
      .catch(function (response) { console.log(response); });
  }

  handleviewNoteChange = (_e, i) => {
    this.setState({ viewgoalnotes: _e.target.value })
  }

  saveviewNotes = i => {
    this.setState({
      isLoaded: true
    })
    let note = {};
    note.goal_note = this.state.viewgoalnotes;
    note.note_date = new Date();
    let gole = this.state.carePlanData.problems[this.state.problemId].goals[i];
    gole.goal_notes.push(note)
    this.state.carePlanData.problems[this.state.problemId].goals[i] = gole;
    let patientid = localStorage.getItem('patientId');
    axios({
      method: 'PUT',
      url: `/api/careplan`,
      data: this.state.carePlanData,
      params: {
        id: patientid
      }
    })
      .then((response) => {
        let careProblems = response.data.json.result.problems[this.state.problemId];
        this.setState({ carePlanData: response.data.json.result, careProblems, newnotemodal: false, isLoaded: false });

      })
      .catch(function (response) { console.log(response); });
  }

  handlerevaluationreason = e => {
    this.setState({ viewRevaluationReason: e.target.value })
  }
  handleviewrevaluationdate = date => {
    this.setState({ viewRevaluationDate: date })
  }
  saveRevaluationDate = () => {
    this.setState({
      isLoaded: true
    })
    let goal_history = this.state.carePlanData.problems[this.state.problemId].goal_history;
    let goal_history_obj = {};
    goal_history_obj.goal_statement = this.state.viewRevaluationReason;
    goal_history_obj.evaluation_date = this.state.viewRevaluationDate;
    goal_history.push(goal_history_obj);
    let gole = this.state.carePlanData.problems[this.state.problemId].goals[this.state.modalGoalId];
    gole.evaluation_date = this.state.viewRevaluationDate;
    this.state.carePlanData.problems[this.state.problemId].goals[this.state.modalGoalId] = gole;
    let patientid = localStorage.getItem('patientId');
    axios({
      method: 'PUT',
      url: `/api/careplan`,
      data: this.state.carePlanData,
      params: {
        id: patientid
      }
    })
      .then((response) => {
        let careProblems = response.data.json.result.problems[this.state.problemId];
        this.setState({ carePlanData: response.data.json.result, careProblems, evaluationdateconfirmationmodal: false, isLoaded: false });

      })
      .catch(function (response) { console.log(response); });
  }

  handlerequestClosingReason = e => {
    this.setState({ viewrequestclosingreason: e.target.value })
  }

  confirmRequestClosing = () => {
    this.setState({
      isLoaded: true
    })
    let problm = this.state.carePlanData.problems[this.state.problemId];
    problm.problem_status = "REQUEST_FOR_CLOSING";
    problm.request_reason = this.state.viewrequestclosingreason;
    this.state.carePlanData.problems[this.state.problemId] = problm;
    let patientid = localStorage.getItem('patientId');
    axios({
      method: 'PUT',
      url: `/api/careplan`,
      data: this.state.carePlanData,
      params: {
        id: patientid
      }
    })
      .then((response) => {
        let careProblems = response.data.json.result.problems[this.state.problemId];
        this.setState({
          carePlanData: response.data.json.result, careProblems, closingrequestpendingenable: true, requestclosingconfirmationmodal: false, cancelrequestpendingenable: false, isLoaded: false
        })

      })
      .catch(function (response) { console.log(response); });

  }

  handleviewcancelrequest = e => {
    this.setState({ viewcancelrequestreason: e.target.value })
  }

  savenewgoaltoproblem = () => {
    this.setState({
      isLoaded: true
    })
    let newgoal = this.state.carePlanData.problems[this.state.problemId].goals;
    let goalRequest = {
      goal_statement: this.state.goaldescription,
      evaluation_date: this.state.reevaluationdate,
      barriers: this.state.barrier[0].barrier_statement ? this.state.barrier : [],
      interventions: this.state.interventions[0].intervention_statement ? this.state.interventions : [],
      patient_actions: this.state.patientAction[0].action_statement ? this.state.patientAction : [],
      goal_notes: []
    }
    newgoal.push(goalRequest);
    this.state.carePlanData.problems[this.state.problemId].goals = newgoal;
    let patientid = localStorage.getItem('patientId');
    axios({
      method: 'PUT',
      url: `/api/careplan`,
      data: this.state.carePlanData,
      params: {
        id: patientid
      }
    })
      .then((response) => {
        let careProblems = response.data.json.result.problems[this.state.problemId];
        this.setState({ carePlanData: response.data.json.result, careProblems, newgoalmodal: false }, () => {
          this.setState({
            goaldescription: '',
            reevaluationdate: '',
            barrier: [{
              barrier_statement: ''
            }],
            interventions: [{
              intervention_statement: '',
            }],
            patientAction: [{
              action_statement: ''
            }],
            isLoaded: false
          })
        });

      })
      .catch(function (response) { console.log(response); });
  }

  newbarriernotetoggle = () => {
    this.setState({
      newBarrierNoteModal: !this.state.newBarrierNoteModal
    });
  }

  addnewbarrierNote = inc => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.setState({
      newBarrierNoteModal: true,
      modalGoalId: inc
    });
  }
  selectedBarrierNote = (i, desc) => {
    this.setState({ selectedBarrierData: desc }, () => {
      this.setState({ newBarrierNoteModal: false })
    })
  }
  titlecase = (str) => {
    return str.toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
  }

  handleChip = (val) => {
    console.log("Added")

  }

  handleremoveChip = (val) => {
    console.log("Removed")

  }

  seemoreNote = () => {
    this.setState({ seemorenotes: true })
  }
  barriernotemoretoggle = () => {
    this.setState({
      seemorenotes: !this.state.seemorenotes
    });
  }

  handleviewBarrierNoteChange(e, i) {
    this.setState({
      selectedBarrierData: e.target.value
    });
  }

  handleCanelProblemChange(e) {
    this.setState({
      cancelproblemreasonname: e.length === 0 ? 0 : e[0],
    });

  }


  detailsbutton(el) {
    this.setState({
      health360details: el
    });
  }

  componentDidUpdate() {
    localStorage.setItem('health360details', this.state.health360details);
    localStorage.setItem('screenName', "Care plan");
  }



  render() {
    console.log(this.state.carePlanData && this.state.carePlanData.problems && this.state.carePlanData.problems.length)
    return (
      <React.Fragment>
        <Head>
          <title>Healthlligence</title>
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
        </Head>
        <Layout isLoaded={this.state.isLoaded}>
          <>
            <div className="tengrid-container view">
              <MDBRow className="kpicards-health360">
                <MDBCol>
                  <MDBCard>
                    <div className="hoverable">
                      <Link href="/health360details">
                        <MDBCardBody onClick={this.detailsbutton.bind(this, "conditions")}>
                          <div className="icons color-1" style={{ margin: "0 auto" }}>
                            <MDBIcon icon="poll" className="white-text" />
                          </div>
                          <MDBTypography
                            tag="h6"
                            variant="h6-responsive"
                            className="align-center kpilabel"
                            style={{ marginTop: "5px" }}
                          >
                            Conditions
                          </MDBTypography>
                          <MDBTypography
                            tag="h4"
                            variant="h4-responsive"
                            className="align-center counter-text"
                          >
                            {this.state.conditionscount == undefined ? "-" : this.state.conditionscount}
                          </MDBTypography>
                        </MDBCardBody>
                      </Link>
                    </div>
                  </MDBCard>
                </MDBCol>

                <MDBCol>
                  <MDBCard>
                    <div className="hoverable">
                      <Link href="/health360details">
                        <MDBCardBody onClick={this.detailsbutton.bind(this, "encounters")}>
                          <div className="icons color-2" style={{ margin: "0 auto" }}>
                            <MDBIcon icon="exchange-alt" className="white-text" />
                          </div>
                          <MDBTypography
                            tag="h6"
                            variant="h6-responsive"
                            className="align-center kpilabel"
                            style={{ marginTop: "5px" }}
                          >
                            Encounters
                          </MDBTypography>
                          <MDBTypography
                            tag="h4"
                            variant="h4-responsive"
                            className="align-center counter-text"
                          >
                            {this.state.encounterscount == undefined ? "-" : this.state.encounterscount}
                          </MDBTypography>
                        </MDBCardBody>
                      </Link>
                    </div>
                  </MDBCard>
                </MDBCol>
                <MDBCol>
                  <MDBCard>
                    <div className="hoverable">
                      <Link href="/health360details">
                        <MDBCardBody onClick={this.detailsbutton.bind(this, "riskscore")}>
                          <div className="icons color-3" style={{ margin: "0 auto" }}>
                            <MDBIcon icon="exclamation-triangle" className="white-text" />
                          </div>
                          <MDBTypography
                            tag="h6"
                            variant="h6-responsive"
                            className="align-center kpilabel"
                            style={{ marginTop: "5px" }}
                          >
                            Risk Scores
                          </MDBTypography>
                          <MDBTypography
                            tag="h4"
                            variant="h4-responsive"
                            className="align-center counter-text"
                          >
                            {this.state.riskscorelistcount == undefined ? "-" : this.state.riskscorelistcount}

                          </MDBTypography>
                        </MDBCardBody>
                      </Link>
                    </div>
                  </MDBCard>
                </MDBCol>
                <MDBCol>
                  <MDBCard>
                    <div className="hoverable">
                      <Link href="/health360details">
                        <MDBCardBody onClick={this.detailsbutton.bind(this, "medications")}>
                          <div className="icons color-4" style={{ margin: "0 auto" }}>
                            <MDBIcon
                              icon="prescription-bottle-alt"
                              className="white-text"
                            />
                          </div>
                          <MDBTypography
                            tag="h6"
                            variant="h6-responsive"
                            className="align-center kpilabel"
                            style={{ marginTop: "5px" }}
                          >
                            Medications
                          </MDBTypography>
                          <MDBTypography
                            tag="h4"
                            variant="h4-responsive"
                            className="align-center counter-text"
                          >
                            {this.state.medicationscount == undefined ? "-" : this.state.medicationscount}
                          </MDBTypography>
                        </MDBCardBody>
                      </Link>
                    </div>
                  </MDBCard>
                </MDBCol>
                <MDBCol>
                  <MDBCard>
                    <div className="hoverable">
                      <Link href="/health360details">
                        <MDBCardBody onClick={this.detailsbutton.bind(this, "observations")}>
                          <div className="icons color-5" style={{ margin: "0 auto" }}>
                            <MDBIcon icon="check" className="white-text" />
                          </div>
                          <MDBTypography
                            tag="h6"
                            variant="h6-responsive"
                            className="align-center kpilabel"
                            style={{ marginTop: "5px" }}
                          >
                            Observations
                          </MDBTypography>
                          <MDBTypography
                            tag="h4"
                            variant="h4-responsive"
                            className="align-center counter-text"
                          >
                            {this.state.observationscount == undefined ? "-" : this.state.observationscount}
                          </MDBTypography>
                        </MDBCardBody>
                      </Link>
                    </div>
                  </MDBCard>
                </MDBCol>
                <MDBCol>
                  <MDBCard>
                    <div className="hoverable">
                      <Link href="/health360details" onClick={this.detailsbutton.bind(this, "imaging")}>
                        <MDBCardBody>
                          <div className="icons color-6" style={{ margin: "0 auto" }}>
                            <MDBIcon icon="image" className="white-text" />
                          </div>
                          <MDBTypography
                            tag="h6"
                            variant="h6-responsive"
                            className="align-center kpilabel"
                            style={{ marginTop: "5px" }}
                          >
                            Imaging
                          </MDBTypography>
                          <MDBTypography
                            tag="h4"
                            variant="h4-responsive"
                            className="align-center counter-text"
                          >
                            {this.state.imagingcount == undefined ? "-" : this.state.imagingcount}
                          </MDBTypography>
                        </MDBCardBody>
                      </Link>
                    </div>
                  </MDBCard>
                </MDBCol>
                <MDBCol>
                  <MDBCard>
                    <div className="hoverable">
                      <Link href="/health360details">
                        <MDBCardBody onClick={this.detailsbutton.bind(this, "assessments")}>
                          <div className="icons color-7" style={{ margin: "0 auto" }}>
                            <MDBIcon icon="file-alt" className="white-text" />
                          </div>
                          <MDBTypography
                            tag="h6"
                            variant="h6-responsive"
                            className="align-center kpilabel"
                            style={{ marginTop: "5px" }}
                          >
                            Assessments
                          </MDBTypography>
                          <MDBTypography
                            tag="h4"
                            variant="h4-responsive"
                            className="align-center counter-text"
                          >
                            {this.state.health360assessmentscount == undefined ? "-" : this.state.health360assessmentscount}


                          </MDBTypography>
                        </MDBCardBody>
                      </Link>
                    </div>
                  </MDBCard>
                </MDBCol>
                <MDBCol>
                  <MDBCard>
                    <div className="hoverable">
                      <Link href="/health360details">
                        <MDBCardBody onClick={this.detailsbutton.bind(this, "allergies")}>
                          <div className="icons color-8" style={{ margin: "0 auto" }}>
                            <MDBIcon icon="ban" className="white-text" />
                          </div>
                          <MDBTypography
                            tag="h6"
                            variant="h6-responsive"
                            className="align-center kpilabel"
                            style={{ marginTop: "5px" }}
                          >
                            Allergies
                          </MDBTypography>
                          <MDBTypography
                            tag="h4"
                            variant="h4-responsive"
                            className="align-center counter-text"
                          >
                            {this.state.allergiescount == undefined ? "-" : this.state.allergiescount}
                          </MDBTypography>
                        </MDBCardBody>
                      </Link>
                    </div>
                  </MDBCard>
                </MDBCol>
                <MDBCol>
                  <MDBCard>
                    <div className="hoverable">
                      <Link href="/health360details">
                        <MDBCardBody onClick={this.detailsbutton.bind(this, "immunizations")}>
                          <div className="icons color-9" style={{ margin: "0 auto" }}>
                            <MDBIcon icon="plus-square" className="white-text" />
                          </div>
                          <MDBTypography
                            tag="h6"
                            variant="h6-responsive"
                            className="align-center kpilabel"
                            style={{ marginTop: "5px" }}
                          >
                            Immunizations
                          </MDBTypography>
                          <MDBTypography
                            tag="h4"
                            variant="h4-responsive"
                            className="align-center counter-text"
                          >
                            {this.state.Immunizationscount == undefined ? "-" : this.state.Immunizationscount}
                          </MDBTypography>
                        </MDBCardBody>
                      </Link>
                    </div>
                  </MDBCard>
                </MDBCol>
                <MDBCol>
                  <MDBCard>
                    <div className="hoverable">
                      <Link href="/health360details">
                        <MDBCardBody onClick={this.detailsbutton.bind(this, "procedures")}>
                          <div className="icons color-10" style={{ margin: "0 auto" }}>
                            <MDBIcon icon="hospital" className="white-text" />
                          </div>
                          <MDBTypography
                            tag="h6"
                            variant="h6-responsive"
                            className="align-center kpilabel"
                            style={{ marginTop: "5px" }}
                          >
                            Procedures
                          </MDBTypography>
                          <MDBTypography
                            tag="h4"
                            variant="h4-responsive"
                            className="align-center counter-text"
                          >
                            {this.state.Procedurescount == undefined ? "-" : this.state.Procedurescount}
                          </MDBTypography>
                        </MDBCardBody>
                      </Link>
                    </div>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </div>
            <MDBRow>
              <MDBCol sm="12" md="12" lg="12">
                <MDBCard className="careplaninfo-card">
                  <MDBCardBody className="careplandetailsinfo">
                    <MDBRow style={{ marginLeft: "-8px" }}>
                      <p className="caredetails">Case Number <span> {this.state.careplan_id}</span></p>
                      <p className="caredetails">Owner <span>  {this.state.careplan_owner}</span></p>
                      {
                        this.state.careplan_coowner == undefined ? null : <p className="caredetails">Co-Owner <span> {this.state.careplan_coowner}</span></p>
                      }

                      <p className="caredetails">Status <span> {this.state.careplan_status == undefined ? "Open" : this.state.careplan_status}</span></p>
                      <p className="caredetails">Created Date <span> {this.state.careplan_createdDate}</span></p>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
            <MDBRow className="problemsdropdown-row">
              <MDBCol sm="3" md="3" lg="3">
                <MDBSelect
                  // label="Choose a problem"
                  options={this.state.problemsDropdown}
                  // outline
                  selected="Choose a problem"
                  //selected={this.state.problemsDropdown.length ? this.state.problemsDropdown[0].text : "Choose a problem"}
                  className="month-right-dropdown-careplan"
                  getValue={(val) => this.handleProblemChange(val)}
                />
              </MDBCol>
              <MDBCol sm="9" md="9" lg="9" className="newproblem-button-col">
                <MDBBtn color="" md="sm" className="buttonstyle" onClick={this.addnewproblem.bind(this)}>ADD NEW PROBLEM</MDBBtn>
              </MDBCol>
            </MDBRow>


            {
              this.state.viewproblemenabled ?
                <div className="text">
                  {this.state.careProblems && this.state.careProblems.goals && this.state.careProblems.goals.map((gol, inc) => {

                    return (
                      <>
                        <MDBRow>
                          <MDBCol className="col-md-12 col-lg-12">
                            <MDBCard>
                              <MDBCardBody>
                                <p className="newproblemtitle">{`${this.state.careProblems ? this.state.careProblems.problem_statement : 'New Problem'}`} <span style={{ color: "#DB1B60", fontSize: "12px" }}>{this.state.careProblems.problem_status === "REQUEST_FOR_CLOSING" ? "Closing Request Pending" : null}{this.state.careProblems.problem_status === 'CLOSED' ? "Cancel Request Pending" : null}</span></p>

                                <MDBRow>
                                  <MDBCol md="2" className="goal-header">
                                    <div className="left-header" style={{ marginTop: "12px", marginLeft: "4px" }}>
                                      <div className="icons color-goal" style={{ height: "24px", width: "24px" }}>
                                        <img src="/images/barrier.svg" className="white-text" style={{ height: "16px", width: "16px", marginTop: "-10px" }} />
                                      </div>
                                      <MDBTypography tag="h3" className="goaltitle">Goal #{inc + 1}</MDBTypography>
                                    </div>
                                  </MDBCol>
                                  <MDBCol md="10" className="goalInformation">
                                    <p className="goalcreator">{moment(gol.evaluation_date).format("MM/DD/YYYY hh:mm:ss")} <span style={{ fontWeight: "600" }}>by Care Manager</span></p>
                                    <p className="goaldescription">{gol.goal_statement}</p>
                                    <p className="goalevaluationdatelabel">Re-evaluation Date <span className="goalevaluationdate">{moment(gol.evaluation_date).format("MMM DD YYYY")}</span> {this.state.careProblems.goal_history.length ? <span className="edited">Edited</span> : ''} <span className="goalevaluationdate"> <MDBIcon icon="pencil-alt" onClick={() => this.changeevaluationDate(inc)} /></span>{this.state.careProblems.goal_history.length ? <span className="goalevaluationdate" onClick={this.evaluationdatehistory.bind(this)}>   SEE HISTORY</span> : ''}</p>
                                  </MDBCol>
                                </MDBRow>

                              </MDBCardBody>
                            </MDBCard>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol className="goals" sm="12" md="12" lg="4">
                            <MDBCard>
                              <MDBCardBody>
                                {
                                  this.state.careProblems.goals && !this.state.careProblems.goals[inc].barriers.length ?
                                    <div className="no-barrier-class">

                                      <div className="left-header text-center">
                                        <div className=" icons barriericoncolor" style={{ height: "24px", width: "24px" }}>

                                          <img src="/images/barrier.svg" className="white-text" style={{ height: "16px", width: "16px", marginTop: "-10px" }} />

                                        </div>
                                        <MDBTypography tag="h3" className="barriertitle">Barrier</MDBTypography>

                                      </div>

                                      <div className="text-center" >
                                        <p className="emptyproblemcontent" style={{ marginTop: "-12px" }}> No Barriers added yet</p>
                                      </div>
                                      <div className="text-center" style={{ marginTop: "-12px", marginBottom: "16px" }}>
                                        <MDBBtn color="primary" className="emptyviewaddbarrier-button" onClick={() => this.addnewbarrier(inc)}>Add Barrier</MDBBtn>
                                      </div>
                                    </div>

                                    :
                                    <div>
                                      {this.state.careProblems.goals && this.state.careProblems.goals[inc].barriers && this.state.careProblems.goals[inc].barriers.map((barer, i) => {
                                        return (
                                          <>

                                            <div className="left-header">
                                              <div className=" icons barriericoncolor" style={{ height: "24px", width: "24px" }}>
                                                <img src="/images/barrier.svg" className="white-text" style={{ height: "16px", width: "16px", marginTop: "-10px" }} />
                                                {/* <MDBIcon far icon="flag" className="white-text" /> */}
                                              </div>
                                              <MDBTypography tag="h3" className="barriertitle">Barrier #{i + 1}</MDBTypography>

                                            </div>

                                            <p style={{ fontSize: "15px", marginTop: "-10px" }} onClick={this.toggleCollapse.bind(this, `barrier${i + 1}`, gol, inc)}>
                                              {moment(gol.evaluation_date).format("MM/DD/YYYY hh:mm:ss")}
                                              <span style={{ fontWeight: "600", color: "#424242", marginLeft: "4px" }}>by Care Manager</span>
                                              <span style={{ float: "right" }}>
                                                <i className={this.state.collapseID === `barrier${i + 1}` ? "fa fa-angle-down rotate-icon" : "fa fa-angle-up "} />
                                              </span> </p>
                                            <hr />
                                            <div id={`Goal${inc + 1} barrier${i + 1}`}>
                                              <MDBCollapse id={`barrier${i + 1}`} isOpen={true} >
                                                {/* <MDBCollapse id={`barrier${i + 1}`} isOpen={this.state.collapseID} > */}
                                                <MDBCardBody style={{ fontSize: "14px", marginTop: "-6px", marginBottom: "6px" }}> {barer.barrier_statement}</MDBCardBody>
                                              </MDBCollapse>
                                            </div>

                                            <div className="note-barrier-header"><div className="barrierNotetitle">Note  </div><div className="collapser collpase-note" onClick={this.toggleCollapse.bind(this, `barrier-note${i + 1}`, gol, inc)}><i className={this.state.collapseID === `barrier-note${i + 1}` ? "fa fa-angle-down rotate-icon" : "fa fa-angle-up "} /></div></div>
                                            <hr />
                                            <div id={`Goal${inc + 1} barrier-note${i + 1}`}>
                                              <MDBCollapse id={`barrier-note${i + 1}`} isOpen={true}>
                                                {/* <MDBCollapse id={`barrier-note${i + 1}`} isOpen={this.state.collapseID}> */}
                                                <div className="notes-barrier-body">
                                                  <div style={{ display: "flex", position: "relative" }}>
                                                    <MDBCardBody style={{ fontSize: "14px" }}> The patient has been non-compliant with both medication and keeping appointments to his providers
                                                      <MDBPopover
                                                        placement="right"
                                                        popover
                                                        clickable
                                                        id="popper2"
                                                        domElement
                                                      ><span className="seemore">SEE MORE</span>
                                                        <div>
                                                          <MDBPopoverHeader>Barrier #{i + 1} Note</MDBPopoverHeader>
                                                          <MDBPopoverBody>
                                                            The patient has been non-compliant with both medication and keeping appointments to his providers</MDBPopoverBody>
                                                        </div>
                                                      </MDBPopover>
                                                    </MDBCardBody>
                                                  </div>
                                                  <MDBChipsInput handleRemove={(value) => this.handleremoveChip(value)} handleAdd={(value) => this.handleChip(value)} chips={['non-compliant', 'appointments']} placeholder='Enter a tag' secondaryPlaceholder='Enter a tag' />
                                                </div>
                                              </MDBCollapse>
                                            </div>


                                          </>
                                        );
                                      })}

                                      <div className="text-center">
                                        <MDBBtn color="primary" className="viewaddbarrier-button" onClick={() => this.addnewbarrier(inc)}>Add Barrier</MDBBtn>
                                      </div>

                                    </div>}

                              </MDBCardBody>
                            </MDBCard>
                          </MDBCol>
                          <MDBCol className="goals" sm="12" md="12" lg="4">
                            <MDBCard>
                              <MDBCardBody>
                                {
                                  this.state.careProblems.goals && !this.state.careProblems.goals[inc].interventions.length ?
                                    <div className="no-interventions-class">

                                      <div className="left-header text-center">
                                        <div className=" icons interventioniconcolor" style={{ height: "24px", width: "24px" }}>

                                          <img src="/images/intervention_02.svg" className="white-text" style={{ height: "16px", width: "16px", marginTop: "-10px" }} />

                                        </div>
                                        <MDBTypography tag="h3" className="interventiontitle">Intervention</MDBTypography>

                                      </div>
                                      <div className="text-center" >
                                        <p className="emptyproblemcontent" style={{ marginTop: "-12px" }}> No interventions added yet</p>
                                      </div>
                                      <div className="text-center" style={{ marginTop: "-12px" }}>
                                        <MDBBtn color="primary" className="emptyviewaddintervention-button" onClick={() => this.addnewintervention(inc)}>Add Intervention</MDBBtn>
                                      </div>
                                    </div>
                                    :

                                    <div>
                                      {this.state.careProblems.goals && this.state.careProblems.goals[inc].interventions && this.state.careProblems.goals[inc].interventions.map((inv, i) => {
                                        return (
                                          <>
                                            <div className="left-header">
                                              <div className=" icons interventioniconcolor" style={{ height: "24px", width: "24px" }}>
                                                <img src="/images/intervention_02.svg" className="white-text" style={{ height: "16px", width: "16px", marginTop: "-10px" }} />

                                              </div>
                                              <MDBTypography tag="h3" className="interventiontitle">Intervention #{i + 1}</MDBTypography>

                                            </div>

                                            <p style={{ fontSize: "15px", marginTop: "-10px" }} onClick={this.toggleCollapse.bind(this, `intervention${i + 1}`, gol, inc)}> {moment(gol.evaluation_date).format("MM/DD/YYYY hh:mm:ss")} <span style={{ fontWeight: "600", color: "#424242" }}>by Care Manager</span>  <span style={{ float: "right" }}>
                                              <i className={this.state.collapseID === `intervention${i + 1}` ? "fa fa-angle-down rotate-icon" : "fa fa-angle-up "} /></span> </p>
                                            <hr />
                                            <div id={`Goal${inc + 1} intervention${i + 1}`}>
                                              <MDBCollapse id={`intervention${i + 1}`} isOpen={true}>
                                                {/* <MDBCollapse id={`intervention${i + 1}`} isOpen={this.state.collapseID}> */}
                                                <MDBCardBody style={{ fontSize: "14px" }}>{inv.intervention_statement}</MDBCardBody>
                                              </MDBCollapse>
                                            </div>



                                          </>
                                        );
                                      })}




                                      <div>
                                        <MDBBtn color="primary" className="viewaddintervention-button" onClick={() => this.addnewintervention(inc)}>Add Intervention</MDBBtn>
                                      </div>
                                    </div>}
                              </MDBCardBody>
                            </MDBCard>
                            <MDBCard>
                              <MDBCardBody>

                                {
                                  this.state.careProblems.goals && !this.state.careProblems.goals[inc].patient_actions.length ?
                                    <div className="no-actions-class">

                                      <div className="left-header text-center">
                                        <div className=" icons interventioniconcolor" style={{ height: "24px", width: "24px" }}>

                                          <img src="/images/patientaction.svg" className="white-text" style={{ height: "16px", width: "16px", marginTop: "-10px" }} />

                                        </div>
                                        <MDBTypography tag="h3" className="patientactiontitle">Patient Action</MDBTypography>

                                      </div>
                                      <div className="text-center" >
                                        <p className="emptyproblemcontent" style={{ marginTop: "-12px" }}> No actions added yet</p>
                                      </div>
                                      <div className="text-center" style={{ marginTop: "-12px" }}>
                                        <MDBBtn color="primary" className="emptyviewpatientaction-button" onClick={() => this.addnewpatientsaction(inc)}>Add Patient's Action</MDBBtn>
                                      </div>
                                    </div>
                                    :
                                    <div>
                                      {this.state.careProblems.goals && this.state.careProblems.goals[inc].patient_actions && this.state.careProblems.goals[inc].patient_actions.map((pact, i) => {
                                        return (
                                          <>
                                            <div className="left-header">
                                              <div className=" icons interventioniconcolor" style={{ height: "24px", width: "24px" }}>
                                                <img src="/images/patientaction.svg" className="white-text" style={{ height: "16px", width: "16px", marginTop: "-10px" }} />
                                              </div>
                                              <MDBTypography tag="h3" className="patientactiontitle">Patient Action #{i + 1}</MDBTypography>

                                            </div>


                                            <p style={{ fontSize: "15px", marginTop: "-10px" }} onClick={this.toggleCollapse.bind(this, `patientaction${i + 1}`, gol, inc)}> {moment(gol.evaluation_date).format("MM/DD/YYYY hh:mm:ss")} <span style={{ fontWeight: "600", color: "#424242" }}>by Care Manager</span>  <span style={{ float: "right" }}><i className={this.state.collapseID === `patientaction${i + 1}` ? "fa fa-angle-down rotate-icon" : "fa fa-angle-up"} /></span> </p>
                                            <hr />
                                            <div id={`Goal${inc + 1} patientaction${i + 1}`}>
                                              <MDBCollapse id={`patientaction${i + 1}`} isOpen={true}>
                                                {/* <MDBCollapse id={`patientaction${i + 1}`} isOpen={this.state.collapseID}> */}
                                                <MDBCardBody style={{ fontSize: "14px" }}>{pact.action_statement}</MDBCardBody>
                                              </MDBCollapse>
                                            </div>

                                          </>
                                        );
                                      })}


                                      <div className="text-center">
                                        <MDBBtn color="primary" className="viewpatientaction-button" onClick={() => this.addnewpatientsaction(inc)}>Add Patient's Action</MDBBtn>
                                      </div>

                                    </div>

                                }


                              </MDBCardBody>
                            </MDBCard>
                          </MDBCol>
                          <MDBCol className="goals" sm="12" md="12" lg="4">
                            <MDBCard>
                              <MDBCardBody>
                                {
                                  this.state.careProblems.goals && !this.state.careProblems.goals[inc].goal_notes.length ?
                                    <div className="no-notes-class">

                                      <div className="left-header text-center">
                                        <div className=" icons color-goal" style={{ height: "24px", width: "24px" }}>

                                          <img src="/images/note-24px.svg" className="white-text" style={{ height: "16px", width: "16px", marginTop: "-10px" }} />

                                        </div>
                                        <MDBTypography tag="h3" className="goaltitle">Note</MDBTypography>

                                      </div>
                                      <div className="text-center" >
                                        <p className="emptyproblemcontent" style={{ marginTop: "-12px" }}> No notes added yet</p>
                                      </div>
                                      <div className="text-center" style={{ marginTop: "-12px" }}>
                                        <MDBBtn color="primary" className="emptyviewaddnote-button" onClick={() => this.addnewnote(inc)}>Add Note</MDBBtn>
                                      </div>
                                    </div>
                                    :
                                    <div>
                                      {this.state.careProblems.goals && this.state.careProblems.goals[inc].goal_notes && this.state.careProblems.goals[inc].goal_notes.map((gnot, i) => {
                                        return (
                                          <>
                                            <div className="left-header">
                                              <div className=" icons color-goal" style={{ height: "24px", width: "24px" }}>

                                                <img src="/images/note-24px.svg" className="white-text" style={{ height: "16px", width: "16px", marginTop: "-10px" }} />

                                              </div>
                                              <MDBTypography tag="h3" className="goaltitle">Note #{i + 1}</MDBTypography>

                                            </div>


                                            <p style={{ fontSize: "15px", marginTop: "-10px" }} onClick={this.toggleCollapse.bind(this, `note${i + 1}`, gol, inc)}> {moment(gnot.note_date).format("MM/DD/YYYY hh:mm:ss")} <span style={{ fontWeight: "600", color: "#424242" }}>by Care Manager</span>  <span style={{ float: "right" }}><i className={this.state.collapseID === `note${i + 1}` ? "fa fa-angle-down rotate-icon" : "fa fa-angle-up "} /></span> </p>
                                            <hr />

                                            <div id={`Goal${inc + 1} note${i + 1}`}>
                                              <MDBCollapse id={`note${i + 1}`} isOpen={true}>
                                                {/* <MDBCollapse id={`note${i + 1}`} isOpen={this.state.collapseID}> */}
                                                <MDBCardBody style={{ fontSize: "14px" }}>{gnot.goal_note}</MDBCardBody>
                                              </MDBCollapse>
                                            </div>



                                          </>
                                        );
                                      })}


                                      <div className="text-center">
                                        <MDBBtn color="primary" className="viewaddnote-button" onClick={() => this.addnewnote(inc)}>Add Note</MDBBtn>
                                      </div>

                                    </div>}






                              </MDBCardBody>
                            </MDBCard>
                          </MDBCol>
                        </MDBRow>
                        {/* {this.state.careProblems &&
                          <MDBRow className="" style={{ }}>
                            {
                              this.state.careProblems && this.state.careProblems.problem_status === "REQUEST_FOR_CLOSING" ? <MDBBtn color="blue-grey" className="problemcancel-button" onClick={this.cancelrequestclosing.bind(this)}>Cancel Request</MDBBtn> : <MDBBtn color="blue-grey" className="problemcancel-button" onClick={this.requestclosing.bind(this)}>Close Problem</MDBBtn>
                            }
                            <MDBBtn color="" className="addnewgoal-button" onClick={this.createnewgoalmodal.bind(this)}>Add new goal</MDBBtn>
                          </MDBRow>
                        } */}
                      </>
                    );
                  })}
                  {this.state.careProblems &&
                    <MDBRow className="" style={{ marginTop: "50px" }}>
                      <MDBCol>
                        {
                          this.state.careProblems && this.state.careProblems.problem_status === "REQUEST_FOR_CLOSING" ? <MDBBtn color="blue-grey" className="problemcancel-button" onClick={this.cancelrequestclosing.bind(this)}>Cancel Request</MDBBtn> : <MDBBtn color="blue-grey" className="problemcancel-button" onClick={this.requestclosing.bind(this)}>Close Problem</MDBBtn>
                        }
                        <MDBBtn color="" className="addnewgoal-button" onClick={this.createnewgoalmodal.bind(this)}>Add new goal</MDBBtn>
                      </MDBCol>
                    </MDBRow>
                  }
                </div>
                :
                <div className="text">
                  <MDBCard>
                    <MDBCardBody>
                      <MDBTypography tag="h3" className="newproblemtitle">{this.state.problemsaved ? this.state.problems[this.state.problemId] : `New Problem`}</MDBTypography>

                      <div className="left-header">
                        <div className="icons color-goal" style={{ height: "24px", width: "24px" }}>
                          <img src="/images/barrier.svg" className="white-text" style={{ height: "16px", width: "16px", marginTop: "-10px" }} />
                        </div>
                        <MDBTypography tag="h3" className="goaltitle">Goal #1</MDBTypography>
                      </div>

                      <MDBRow>
                        <MDBCol md="6">
                          <MDBCard>
                            <MDBCardBody className="goalcardbody">
                              <MDBInput type="textarea" label="Please write the goal" onChange={this.handlegoalchnage} value={this.state.goaldescription}> </MDBInput>
                            </MDBCardBody>
                          </MDBCard>
                        </MDBCol>
                        <MDBCol md="6">
                          <MDBCard>
                            <MDBCardBody className="goalcardbody">
                              <MDBDatePickerV5 className="calender" theme="danger" emptyLabel='Re-Evaluation Date' getValue={(value) => this.handlereevaluationdatechange(value)} />
                            </MDBCardBody>
                          </MDBCard>
                        </MDBCol>
                      </MDBRow>

                      {this.state.barrier.map((row, index) => {
                        return (
                          <>
                            <div className="left-header">
                              <div className="icons barriericoncolor iconmargin" >
                                <img src="/images/barrier.svg" className="white-text" style={{ height: "20px" }} />
                              </div>
                              <MDBTypography tag="h3" className="newproblembarriertitle">Barrrier #{index + 1}</MDBTypography>
                            </div>

                            <MDBRow>
                              <MDBCol md="12">
                                <MDBCard>
                                  <MDBCardBody className="goalcardbody">
                                    <MDBInput
                                      type="textarea"
                                      label="Please write the barrier"
                                      value={this.state.barrier[index]['barrier_statement']}
                                      onChange={(e, i) => this.handleBarrierChange(e, index)}
                                    ></MDBInput>
                                  </MDBCardBody>
                                </MDBCard>
                              </MDBCol>
                            </MDBRow>
                          </>
                        );
                      })}

                      <MDBBtn color="primary" className="addbarrier-button" onClick={this.addBarrier}>Add Barrier</MDBBtn>
                      <br />


                      {this.state.interventions.map((row, index) => {
                        return (
                          <>
                            <div className="left-header">
                              <div className="icons interventioniconcolor iconmargin">
                                <img src="/images/intervention_02.svg" className="white-text" style={{ height: "20px" }} />
                              </div>
                              <MDBTypography tag="h3" className="newprobleminterventiontitle">Intervention #{index + 1}</MDBTypography>
                            </div>

                            <MDBRow>
                              <MDBCol md="6">
                                <MDBCard>
                                  <MDBCardBody className="goalcardbody" style={{ height: "188px" }}>
                                    <MDBInput
                                      type="textarea"
                                      label="Please write the task"
                                      value={this.state.interventions[index]['intervention_statement']}
                                      onChange={(e, i) => this.handleInterventionChange(e, index)}
                                    ></MDBInput>
                                  </MDBCardBody>
                                </MDBCard>
                              </MDBCol>
                              <MDBCol md="6">
                                {/* <MDBCard>
                                  <MDBCardBody> */}
                                <MDBFileupload maxFileSize="1M" />
                                {/* </MDBCardBody>
                                </MDBCard> */}
                              </MDBCol>
                            </MDBRow>
                          </>
                        );
                      })}
                      <MDBBtn color="primary" className="addintervention-button" onClick={this.addInterventions}>Add Intervention</MDBBtn>
                      <br />

                      {this.state.patientAction.map((row, index) => {
                        return (
                          <>
                            <div className="left-header">
                              <div className="icons interventioniconcolor iconmargin" >
                                <img src="/images/patientaction.svg" className="white-text" style={{ height: "20px" }} />

                              </div>
                              <MDBTypography tag="h3" className="newproblempatientactiontitle">Patient Action #{index + 1}</MDBTypography>
                            </div>

                            <MDBRow>
                              <MDBCol md="12">
                                <MDBCard>
                                  <MDBCardBody className="goalcardbody">
                                    <MDBInput
                                      type="textarea"
                                      label="Please write the action"
                                      value={this.state.patientAction[index]['action_statement']}
                                      onChange={(e, i) => this.handlePatientChange(e, index)}
                                    ></MDBInput>
                                  </MDBCardBody>
                                </MDBCard>
                              </MDBCol>
                            </MDBRow>
                          </>
                        );
                      })}
                      <MDBBtn color="primary" className="patientaction-button" onClick={this.addPatientAction}>Add Patient's Action</MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                  <MDBBtn color="primary" className="problemsave-button" onClick={this.handleGoalSave}>save</MDBBtn>
                  <MDBBtn color="blue-grey" className="problemcancel-button">Cancel</MDBBtn>
                </div>
            }
          </>


          {/* add new problem */}
          <MDBModal isOpen={this.state.newproblemmodal} toggle={this.newproblemtoggle} className="newproblemmodal">
            <MDBModalHeader className="modaltitle" toggle={this.newproblemtoggle}>New Problem</MDBModalHeader>
            <MDBModalBody className="newproblemmodalbody">
              <MDBRow style={{ marginRight: "-8px" }}>
                <MDBCol md="12" style={{ marginLeft: "4px" }}>
                  <MDBInput label="Problem Name" size="lg" onChange={this.handleproblemName.bind(this)} />
                </MDBCol>
              </MDBRow>


              <MDBRow style={{ marginRight: "-8px" }}>
                <MDBCol md="12" style={{ marginLeft: "4px" }}>
                  <div className="goalcardbody">
                    <MDBInput type="textarea" label="Please write the goal" onChange={this.handlegoalchnage} value={this.state.goaldescription}> </MDBInput>
                  </div>

                </MDBCol>
              </MDBRow>
              <MDBRow style={{ marginRight: "0px" }}>
                <MDBCol md="12" style={{ marginLeft: "10px" }}>
                  <MDBDatePickerV5 className="calender" theme="danger" emptyLabel='Re-Evaluation Date' getValue={(value) => this.handlereevaluationdatechange(value)} />
                </MDBCol>
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter style={{ marginBottom: "8px" }}>
              <MDBBtn flat className="flatbutton" onClick={this.newproblemtoggle}>Cancel</MDBBtn>
              <MDBBtn flat className="flatbutton" onClick={this.saveProblem}>save</MDBBtn>

            </MDBModalFooter>
          </MDBModal>
          {/* Barrier Modal */}
          <MDBModal isOpen={this.state.newbarriermodal} toggle={this.newbarriertoggle} className="newproblemmodal">
            <MDBModalHeader className="modaltitle" toggle={this.newbarriertoggle}>Add Barrier</MDBModalHeader>
            <MDBModalBody className="newproblemmodalbody">
              <div className="left-header">
                <div className=" icons barriericoncolor">
                  <img src="/images/barrier.svg" className="white-text" style={{ height: "20px" }} />
                </div>
                <MDBTypography tag="h3" className="modalbarriertitle">Barrier #{this.state.careProblems && this.state.careProblems.goals && this.state.careProblems.goals[this.state.modalGoalId].barriers.length + 1}</MDBTypography>
              </div>

              <MDBRow>

                <MDBCol md="12">
                  <div className="goalcardbody barrier-desc">
                    <MDBInput type="textarea" label="Please write the barrier" onChange={(e) => this.handleviewBarrierChange(e, this.state.modalGoalId)}></MDBInput>
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="12">
                  <div className="notesTitle">Notes</div>
                  <MDBBtn className="existing-notes" size="sm" onClick={() => this.addnewbarrierNote(this.state.modalGoalId)}>SELECT FROM EXISTING NOTES</MDBBtn>
                  <div className="notesor">OR</div>
                  <div className="goalcardbody barrier-note">
                    <MDBInput type="textarea" label="Please describe the barrier note" onChange={(e) => this.handleviewBarrierNoteChange(e, this.state.modalGoalId)} value={this.state.selectedBarrierData}></MDBInput>
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="12" className="barrier-chips">
                  <MDBChipsInput handleRemove={(value) => this.handleremoveChip(value)} handleAdd={(value) => this.handleChip(value)} chips={['non-compliant', 'appointments']} placeholder='Enter a tag' secondaryPlaceholder='Enter a tag' />
                </MDBCol>
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn flat className="flatbutton" onClick={this.newbarriertoggle}>Cancel</MDBBtn>
              <MDBBtn flat className="flatbutton" onClick={() => this.saveviewBarrier(this.state.modalGoalId)}>save</MDBBtn>
            </MDBModalFooter>
          </MDBModal>

          {/** New Barrier Note Modal */}
          <MDBModal isOpen={this.state.newBarrierNoteModal} toggle={this.newbarriernotetoggle} className="newbarriernotemodalbody">
            <MDBModalHeader className="modaltitle" toggle={this.newbarriernotetoggle}>Select Existing Notes</MDBModalHeader>
            <MDBModalBody className="newproblemmodalbody">
              <ExistingNotes handleBarrierNotes={this.selectedBarrierNote} />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn flat className="flatbutton" onClick={this.newbarriernotetoggle}>Cancel</MDBBtn>
              <MDBBtn flat className="flatbutton" onClick={this.newbarriernotetoggle}>save</MDBBtn>
            </MDBModalFooter>
          </MDBModal>


          {/* Patients action Modal */}
          <MDBModal isOpen={this.state.newpatientsactionmodal} toggle={this.newpatientsactiontoggle} className="newproblemmodal">
            <MDBModalHeader className="modaltitle" toggle={this.newpatientsactiontoggle}>Add Patient Action</MDBModalHeader>
            <MDBModalBody className="newproblemmodalbody">
              <div className="left-header">
                <div className=" icons interventioniconcolor" style={{ height: "24px", width: "24px" }}>
                  <img src="/images/patientaction.svg" className="white-text" style={{ height: "16px", width: "16px", marginTop: "-13px" }} />
                </div>
                <MDBTypography tag="h3" className="modalinterventiontitle">Patinet Action #{this.state.careProblems && this.state.careProblems.goals && this.state.careProblems.goals[this.state.modalGoalId].patient_actions.length + 1}</MDBTypography>
              </div>

              <MDBRow>
                <MDBCol md="12">
                  <div className="goalcardbody">
                    <MDBInput type="textarea" label="Please write the action" onChange={(e) => this.handleviewActionChange(e, this.state.modalGoalId)}></MDBInput>
                  </div>

                </MDBCol>
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn flat className="flatbutton" onClick={this.newpatientsactiontoggle}>Cancel</MDBBtn>
              <MDBBtn flat className="flatbutton" onClick={() => this.saveviewActions(this.state.modalGoalId)}>save</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
          {/* Note Modal */}
          <MDBModal isOpen={this.state.newnotemodal} toggle={this.newnotetoggle} className="newproblemmodal">
            <MDBModalHeader className="modaltitle" toggle={this.newnotetoggle}>Add Note</MDBModalHeader>
            <MDBModalBody className="newproblemmodalbody">
              <div className="left-header">
                <div className=" icons color-goal" style={{ height: "24px", width: "24px" }}>
                  <img src="/images/note-24px.svg" className="white-text" style={{ height: "16px", width: "16px", marginTop: "-13px" }} />
                </div>
                <MDBTypography tag="h3" className="modalnotetitle">Note #{this.state.careProblems && this.state.careProblems.goals && this.state.careProblems.goals[this.state.modalGoalId].goal_notes.length + 1}</MDBTypography>
              </div>

              <MDBRow>
                <MDBCol md="12">
                  <div className="goalcardbody">
                    <MDBInput type="textarea" label="Please write the action" onChange={(e) => this.handleviewNoteChange(e, this.state.modalGoalId)}></MDBInput>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn flat className="flatbutton" onClick={this.newnotetoggle}>Cancel</MDBBtn>
              <MDBBtn flat className="flatbutton" onClick={() => this.saveviewNotes(this.state.modalGoalId)}>save</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
          {/* Intervention Modal */}
          <MDBModal isOpen={this.state.newinterventionmodal} toggle={this.newinterventiontoggle} className="newproblemmodal">
            <MDBModalHeader className="modaltitle" toggle={this.newinterventiontoggle}>Add Intervention</MDBModalHeader>
            <MDBModalBody className="newproblemmodalbody">
              <div className="left-header">
                <div className=" icons interventioniconcolor" style={{ height: "24px", width: "24px" }}>
                  <img src="/images/intervention_02.svg" className="white-text" style={{ height: "16px", width: "16px", marginTop: "-13px" }} />
                </div>
                <MDBTypography tag="h3" className="modalinterventiontitle">Intervention #{this.state.careProblems && this.state.careProblems.goals && this.state.careProblems.goals[this.state.modalGoalId].interventions.length + 1}</MDBTypography>
              </div>


              <MDBRow>
                <MDBCol md="12">
                  <div className="goalcardbody">
                    <MDBInput type="textarea" label="Please write the task" onChange={(e) => this.handleviewInterventionChange(e, this.state.modalGoalId)}></MDBInput>
                  </div>

                </MDBCol>
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn flat className="flatbutton" onClick={this.newinterventiontoggle}>Cancel</MDBBtn>
              <MDBBtn flat className="flatbutton" onClick={() => this.saveviewIntervention(this.state.modalGoalId)}>save</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
          {/* Re evaluation date Modal */}
          <MDBModal isOpen={this.state.evaluationdatemodal} toggle={this.evaluationdatetoggle} className="newproblemmodal">
            <MDBModalHeader className="modaltitle" toggle={this.evaluationdatetoggle}>Change Re-evaluation Date</MDBModalHeader>
            <MDBModalBody className="newproblemmodalbody">
              <MDBRow>
                <MDBCol md="12">
                  <div className="goalcardbody">
                    <MDBInput type="textarea" label="Please write the Reason" onChange={(e) => this.handlerevaluationreason(e)}></MDBInput>
                  </div>
                  {/* this.state.modalGoalId */}
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="12">
                  <MDBDatePickerV5 theme="danger" valueDefault={null} emptyLabel='Re-Evaluation Date' getValue={(val) => this.handleviewrevaluationdate(val)} />
                </MDBCol>
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn flat className="flatbutton" onClick={this.evaluationdatetoggle}>Cancel</MDBBtn>
              <MDBBtn flat className="flatbutton" onClick={this.changeReevaluationDate.bind(this)}>save</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
          {/* Re evaluation date Confirmation Modal */}
          <MDBModal isOpen={this.state.evaluationdateconfirmationmodal} toggle={this.evaluationdateconfirmationtoggle} className="newproblemmodal">
            <MDBModalHeader className="modaltitle" toggle={this.evaluationdateconfirmationtoggle}>Confirmation</MDBModalHeader>
            <MDBModalBody className="newproblemmodalbody">
              <p className="confirmationmodalmessage">Are you sure you want to change the Re-evaluation date to <span>{moment(this.state.viewRevaluationDate).format("MMM DD YYYY")}</span> ?</p>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn flat className="flatbutton" onClick={this.evaluationdateconfirmationtoggle}>Cancel</MDBBtn>
              <MDBBtn flat className="flatbutton" onClick={this.saveRevaluationDate}>Confirm</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
          {/* Re evaluation date History Modal */}
          <MDBModal isOpen={this.state.evaluationdatehistorymodal} toggle={this.evaluationdatehistorytoggle} className="newproblemmodal">
            <MDBModalHeader className="modaltitle" toggle={this.evaluationdatehistorytoggle}>Confirmation</MDBModalHeader>
            {this.state.careProblems && this.state.careProblems.goal_history && this.state.careProblems.goal_history.map((his, i) => {
              return (
                <MDBModalBody className="newproblemmodalbody">
                  <MDBCard>
                    <MDBCardBody style={{ padding: "1rem 0rem 0rem 1rem" }}>
                      <p className="historydate"> {moment(his.evaluation_date).format("MMM DD YYYY")} </p>
                      <p className="historydescription"> {his.goal_statement} </p>
                    </MDBCardBody>
                  </MDBCard>
                </MDBModalBody>
              )
            })}
            <MDBModalFooter>
              <MDBBtn flat className="flatbutton" onClick={this.evaluationdatehistorytoggle}>Close</MDBBtn>

            </MDBModalFooter>
          </MDBModal>
          {/* Request Closing Modal */}
          <MDBModal isOpen={this.state.requestclosingmodal} toggle={this.requestclosingtoggle} className="newproblemmodal">
            <MDBModalHeader className="modaltitle" toggle={this.requestclosingtoggle}>Close Problem</MDBModalHeader>
            <MDBModalBody className="newproblemmodalbody" style={{ minHeight: "150px" }}>
              <MDBRow>
                <MDBCol md="12">
                  <MDBRow style={{ marginBottom: "12px" }}>
                    <MDBCol md="12">
                      <MDBSelect
                        options={this.state.cancelprobemDropdown}
                        // outline
                        selected={"Please select the reason"}
                        className="month-right-dropdown"
                        getValue={(val) => this.handleCanelProblemChange(val)}
                      />
                    </MDBCol>
                  </MDBRow>

                  {
                    this.state.cancelproblemreasonname == "" ? null : <div className="goalcardbody">
                      <MDBInput type="textarea" label="Note" onChange={(e) => this.handlerequestClosingReason(e)}></MDBInput>
                    </div>
                  }


                </MDBCol>
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn flat className="flatbutton" onClick={this.requestclosingtoggle}>Cancel</MDBBtn>
              <MDBBtn flat className="flatbutton" onClick={this.saverequestClosing.bind(this)}>save</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
          {/* Request closing Confirmation Modal */}
          <MDBModal isOpen={this.state.requestclosingconfirmationmodal} toggle={this.requestclosingconfirmationtoggle} className="newproblemmodal">
            <MDBModalHeader className="modaltitle" toggle={this.requestclosingconfirmationtoggle}>Confirmation</MDBModalHeader>
            <MDBModalBody className="newproblemmodalbody">
              <p className="confirmationmodalmessage">Are you sure you want to close the problem <span>{this.state.careProblems && this.state.careProblems.problem_statement}</span> ?</p>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn flat className="flatbutton" onClick={this.requestclosingconfirmationtoggle}>Cancel</MDBBtn>
              <MDBBtn flat className="flatbutton" onClick={this.confirmRequestClosing}>Confirm</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
          {/* Cancel Request closing Modal */}
          <MDBModal isOpen={this.state.cancelclosingrequestmodal} toggle={this.cancelclosingrequestoggle} className="newproblemmodal">
            <MDBModalHeader className="modaltitle" toggle={this.cancelclosingrequestoggle}>Cancel Close</MDBModalHeader>
            <MDBModalBody className="newproblemmodalbody">
              <MDBRow>
                <MDBCol md="12">
                  <div className="goalcardbody">
                    <MDBInput type="textarea" label="Please write the Reason" onChange={(e) => this.handleviewcancelrequest(e)}></MDBInput>
                  </div>

                </MDBCol>
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn flat className="flatbutton" onClick={this.cancelclosingrequestoggle}>Cancel</MDBBtn>
              <MDBBtn flat className="flatbutton" onClick={this.savecancelrequestclosing.bind(this)}>save</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
          {/* New Goal modal Modal */}
          <MDBModal isOpen={this.state.newgoalmodal} toggle={this.createnewgoaltoggle} className="newproblemmodal">
            <MDBModalHeader className="modaltitle" toggle={this.createnewgoaltoggle}>Goal #2</MDBModalHeader>
            <MDBModalBody className="newproblemmodalbody">
              <MDBTypography tag="h3" className="goaltitle">Goal </MDBTypography>

              <MDBRow>
                <MDBCol md="12">
                  <div className="goalcardbody">
                    <MDBInput type="textarea" label="Please write the goal" onChange={this.handlegoalchnage} value={this.state.goaldescription}> </MDBInput>
                  </div>

                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="12">
                  <MDBDatePickerV5 theme="danger" valueDefault={null} emptyLabel='Re-Evaluation Date' getValue={(value) => this.handlereevaluationdatechange(value)} />
                </MDBCol>
              </MDBRow>

              {this.state.barrier.map((row, index) => {
                return (
                  <>
                    <MDBTypography tag="h3" className="newproblembarriertitle">Barrier #{index + 1}</MDBTypography>
                    <MDBRow>
                      <MDBCol md="12">

                        <div className="goalcardbody">
                          <MDBInput
                            type="textarea"
                            label="Please write the barrier"
                            value={this.state.barrier[index]['barrier_statement']}
                            onChange={(e, i) => this.handleBarrierChange(e, index)}
                          ></MDBInput>
                        </div>

                      </MDBCol>
                    </MDBRow>
                  </>
                );
              })}

              <MDBBtn color="primary" className="addbarrier-button" onClick={this.addBarrier}>Add Barrier</MDBBtn>
              <br />

              {this.state.interventions.map((row, index) => {
                return (
                  <>
                    <MDBTypography tag="h3" style={{ marginTop: "60px" }} className="interventiontitle">Intervention #{index + 1}</MDBTypography>
                    <MDBRow>
                      <MDBCol md="12">
                        <div className="goalcardbody">
                          <MDBInput
                            type="textarea"
                            label="Please write the task"
                            value={this.state.interventions[index]['intervention_statement']}
                            onChange={(e, i) => this.handleInterventionChange(e, index)}
                          ></MDBInput>
                        </div>

                      </MDBCol>
                    </MDBRow>


                  </>
                );
              })}
              <MDBBtn color="primary" className="addintervention-button" onClick={this.addInterventions}>Add Task</MDBBtn>
              <br />

              {this.state.patientAction.map((row, index) => {
                return (
                  <>
                    <MDBTypography tag="h3" style={{ marginTop: "60px" }} className="patientactiontitle">Patient Action #{index + 1}</MDBTypography>
                    <MDBRow>
                      <MDBCol md="12">
                        <div className="goalcardbody">
                          <MDBInput
                            type="textarea"
                            label="Please write the action"
                            value={this.state.patientAction[index]['action_statement']}
                            onChange={(e, i) => this.handlePatientChange(e, index)}
                          ></MDBInput>
                        </div>

                      </MDBCol>
                    </MDBRow>
                  </>
                );
              })}
              <MDBBtn color="primary" className="patientaction-button" onClick={this.addPatientAction}>Add Action</MDBBtn>

            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn flat className="flatbutton" onClick={this.createnewgoaltoggle}>Cancel</MDBBtn>
              <MDBBtn flat className="flatbutton" onClick={this.savenewgoaltoproblem}>save</MDBBtn>
            </MDBModalFooter>
          </MDBModal>

          <MDBModal isOpen={this.state.seemorenotes} toggle={this.barriernotemoretoggle} className="barriermorenotemodal">
            <div className="morenotebarriertitle" toggle={this.barriernotemoretoggle}>Barrier #1 Note</div>
            <MDBModalBody className="newproblemmodalbody">
              The patient has been non-compliant with both medication and keeping appointments to his providers </MDBModalBody>

          </MDBModal>
          {this.state.isLoaded && <Loader />}
          <style jsx>{CarePlanStyle}</style>
          <style jsx>{Health360Style}</style>
        </Layout>
      </React.Fragment>
    );
  }
};

export default CarePlan;

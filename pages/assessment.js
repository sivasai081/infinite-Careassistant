import React, { Component } from "react";
import Head from 'next/head'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Chevron from '../components/Chevron';
import Layout from '../components/layout';
import { MDBTypography, MDBProgress, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBIcon, MDBInput, MDBDatePicker } from "mdbreact";
import AssessmentStyle from '../styles/assessment';
import apptheme from '../constants/theme.json';
import axios from 'axios';
import Loader from '../components/loader';
import moment from 'moment';
import Link from 'next/link';
import _ from 'lodash';
import Router from 'next/router';

class Assessment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assessments: [],
      listID: 0,
      isLoaded: true,
      checkedData: [],
      checkMultiData: [],
      completed: 0,
      sectionCompleted: [],
      isDisabled: true,
      allergiesChip: [],
      allergiesData: [
        { key: 0, title: 'Allergy to bee venom' },
        { key: 1, title: 'Allergy to dairy product' },
        { key: 2, title: 'Allergy to eggs' },
        { key: 3, title: 'Allergy to fish' },
        { key: 4, title: 'Allergy to grass pollen' },
        { key: 5, title: 'Allergy to mould' },
        { key: 6, title: 'Allergy to grass nut' },
        { key: 7, title: 'Allergy to peanuts' },
        { key: 8, title: 'Allergy to soya' },
        { key: 9, title: 'Allergy to tree pollen' },
        { key: 10, title: 'Allergy to wheat' },
        { key: 11, title: 'Dander (animal) allergy' },
        { key: 12, title: 'House dust mite allergy' },
        { key: 13, title: 'Latex allergy' },
        { key: 14, title: 'Shellfish allergy' }
      ],
      selectedAllergy: [],
      newMedicationRow: [{
        name_ui_control: "textbox",
        name_ui_label: "Name",
        name_value: "",
        dose_ui_control: "textbox",
        dose_ui_label: "Dose",
        dose_value: "",
        started_ui_control: "date",
        started_ui_label: "Date Started",
        stated_value: null,
        ended_ui_control: "date",
        ended_ui_label: "Date Ended",
        ended_value: null,
        treating_condition_ui_control: "textbox",
        treating_condition_ui_label: "Condition Treating",
        treating_condition_value: ""
      }],
      addDisable: true,
      patientResponses: [],
      pendingQuestions: [],
      lastResult: null,
      isChanged: false,
      finalData: [],
      hasError: false,
      otherLanguagevalue: ""
    };
  }

  componentDidMount() {
    let patientid = localStorage.getItem('patientId');
    let assessment_id = localStorage.getItem('assessment_id');
    this.setState({ assessment_id: assessment_id, patientid: patientid });
    axios.get(`/api/assessment`, {
      params: {
        id: patientid,
        assessment_id: assessment_id
      }
    })
      .then(res => {
        this.setState({
          assessments: res.data.json.patient_assessment_model.assessment,
          patientResponses: res.data.json.patient_assessment_model.patient_assessments && res.data.json.patient_assessment_model.patient_assessments.patient_responses,
          assessmentcompleteddate: res.data.json.patient_assessment_model.patient_assessments == null ? "" : res.data.json.patient_assessment_model.patient_assessments.completeddate,
          assessmentduedate: res.data.json.patient_assessment_model.patient_assessments == null ? "" : res.data.json.patient_assessment_model.patient_assessments.duedate,
          assessmentstartdate: res.data.json.patient_assessment_model.patient_assessments == null ? "" : res.data.json.patient_assessment_model.patient_assessments.starteddate,
          isLoaded: false
        },
          () => {
            window.scrollTo(0, 0);
            this.responseCheck();
            let assessmentdata = this.state.assessments.section.map(function (el) { return el.fields; });
            let totalassessments = [].concat(...assessmentdata);
            let resP = this.state.patientResponses && this.state.patientResponses.map(function (el) { return el.field_name; });
            let chipData = '';
            let x = totalassessments.map((res) => {
              if (res && resP && resP.includes(res.field_name) && res.field_ui_control === 'allergies') {
                let resData = this.state.patientResponses && this.state.patientResponses.filter((chip) => chip.field_name === res.field_name);
                chipData = resData[0].field_value;
              }
            })
            let PerResponse = this.state.patientResponses;
            let mediData = PerResponse && PerResponse.filter((row) => {
              if (row.field_medication_value) { return row.field_medication_value }
            })

            let newMediData = mediData && mediData[0] && mediData[0].field_medication_value;
            if (newMediData) {
              this.setState({ newMedicationRow: [...newMediData, ...this.state.newMedicationRow] })
            }

            if (chipData) {
              let allergyData = [];
              this.state.allergiesData.map((ch) => {
                if (chipData.includes(ch.title)) {
                  allergyData.push(ch);
                }
              })

              let allergiesData = this.state.allergiesData.filter((elem) => !allergyData.find(({ key }) => elem.key === key));
              this.setState({ selectedAllergy: allergyData, allergiesData })
            }
          });
      }).catch((error) => {
        this.setState({ isLoaded: true })
      })
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }


  responseCheck = () => {
    if (this.state.patientResponses && this.state.patientResponses.length) {
      let assessmentsection = this.state.assessments.section[
        this.state.listID
      ];
      let assessmentdata = this.state.assessments.section.map(function (el) { return el.fields; });
      let totalassessments = [].concat(...assessmentdata);
      let assessmentCount = totalassessments.length;
      let resFields = assessmentsection.fields.map(function (el) { return el.field_name; });
      let pres = this.state.patientResponses.map((res) => {
        if (resFields.includes(res.field_name)) {
          return { ...res, section: this.state.listID }
        } else {
          return res;
        }
      })
      this.setState({ patientResponses: pres }, () => this.handleProgressBar(assessmentCount, assessmentsection.fields.length, ''))
      //}
    }
  }

  formatingData = () => {
    let array = [...this.state.checkedData, ...this.state.checkMultiData];
    let output = [];
    array.forEach(function (item) {
      let existing = output.filter(function (v) {
        return v.field_name == item.field_name;
      });
      if (existing.length) {
        let existingIndex = output.indexOf(existing[0]);
        output[existingIndex].field_value = [...new Set(output[existingIndex].field_value.concat(item.field_value))];
      } else {
        if (typeof item.field_value == 'string')
          item.field_value = [item.field_value];
        output.push(item);
      }
    });

    return output;

  }

  handleProgressBar = (total, sectionLen, type, secData) => {
    let totalData = [], patientResponses = [];
    let fdata = this.formatingData(type);
    patientResponses = this.state.patientResponses && this.state.patientResponses.map(obj => fdata.find(o => o.field_name === obj.field_name) || obj);
    if (patientResponses) {
      totalData = [...this.state.checkedData, ...this.state.checkMultiData, ...patientResponses];
    } else {
      totalData = [...this.state.checkedData, ...this.state.checkMultiData];
      patientResponses = totalData;
    }

    let sectionData = [];
    //el.field_value.length > 0

    sectionData = totalData.filter((el, index, self) =>
      index === self.findIndex((t) => (
        t.field_name === el.field_name && t.section === this.state.listID && (el.field_value.length > 0 || (el.field_medication_value && el.field_medication_value.length > 0))
      ))
    )

    totalData = totalData.filter((el, index, self) =>
      index === self.findIndex((t) => (
        t.field_name === el.field_name && (el.field_value.length > 0 || (el.field_medication_value && el.field_medication_value.length > 0))
      ))
    )


    if (patientResponses && patientResponses.length) patientResponses = totalData;
    let totalLength = totalData.length;
    let sectionLength = sectionData.length;
    if (type === 'medications') {
      totalLength = totalLength + 1;
      sectionLength = sectionLength + 1;
    }

    let completed = Math.ceil((totalLength / total) * 100);

    let isDisabled = true;

    if (sectionLen === sectionLength) {
      let found = this.state.sectionCompleted.some(res => res === this.state.listID);
      if (!found) {
        this.state.sectionCompleted.push(this.state.listID);
      }
      isDisabled = false;
    }

    //let pendingQuestions = secData && secData.fields.filter((elem) => !this.state.patientResponses.find(({ field_name }) => elem.field_name === field_name));

    this.setState({ completed, isDisabled, patientResponses })

  }

  handleSingleSelection = (e, total, sectionLen, label, secData) => {
    if (e.target) {
      const field_name = e.target.name;
      const answer = { field_name, field_ui_label: label, field_value: e.target.value, field_other_value: '', section: this.state.listID };
      let checkedData;
      if (this.state.checkedData.some(answer => answer.field_name === field_name)) {
        checkedData = [...this.state.checkedData.filter(answer => answer.field_name !== field_name), answer];
      } else {
        checkedData = [...this.state.checkedData, answer];
      }
      this.setState({ patientResponses: [...this.state.patientResponses, ...checkedData], checkedData, otherLanguagevalue: "" }, () => {
        this.handleProgressBar(total, sectionLen, "radio", secData)
      });

    }
  }

  handleassessmenttextareachnage = (e, total, sectionLen, label, secData) => {
    this.setState({
      assessmenttextareavalue: e.target.value
    });
  }
  handleOtherLangChange = (e, total, sectionLen, label, secData, fieldname) => {
    this.setState({
      otherLanguagevalue: e.target.value
    });
  }
  handleBlur = (e, total, sectionLen, label, secData, fieldname) => {
    if (e.target) {
      const field_name = fieldname;
      const answer = { field_name, field_ui_label: label, field_value: "Other", field_other_value: e.target.value, section: this.state.listID };
      let checkedData;
      if (this.state.checkedData.some(answer => answer.field_name === field_name)) {
        checkedData = [...this.state.checkedData.filter(answer => answer.field_name !== field_name), answer];
      } else {
        checkedData = [...this.state.checkedData, answer];
      }
      this.setState({ checkedData }, () => { this.handleProgressBar(total, sectionLen, "radio", secData); });

    }
  }
  handleMultiSelection = (e, total, sectionLen, label, secData) => {
    if (e.target) {
      let field_name = e.target.name;
      let answer = { field_name, field_ui_label: label, field_value: e.target.value, section: this.state.listID };
      let checkMultiData;
      let patientResponses = this.state.patientResponses;
      if (this.state.checkMultiData.some((el) => el.field_name === field_name && el.field_value === e.target.value)) {
        checkMultiData = [...this.state.checkMultiData.filter(answer => answer.field_value !== e.target.value)];
      } else {
        checkMultiData = [...this.state.checkMultiData, answer];
      }

      patientResponses = patientResponses && patientResponses.map((res) => {
        if (res.field_name === field_name && res.field_value.includes(e.target.value)) {
          if (typeof res.field_value != 'string') {
            let index = res.field_value.indexOf(e.target.value);
            res.field_value.splice(index, 1);
          }
        } else {
          if (res.field_name === field_name && typeof res.field_value != 'string') {
            res.field_value.push(e.target.value)
          }
        }
        return res;
      })
      if (patientResponses) {
        checkMultiData = [...new Set(checkMultiData.map(obj => patientResponses.find(o => o.field_name === obj.field_name) || obj))];
      }

      this.setState({ checkMultiData, patientResponses }, () => { this.handleProgressBar(total, sectionLen, "checkbox", secData); });

    }
  }

  decreaseCount(listID) {
    window.scrollTo(0, 0);
    let listDsc, isDisabled = true;
    if (listID !== 0) {
      listDsc = listID - 1;
    }
    let found = this.state.sectionCompleted.some(res => res === listDsc);
    if (found) isDisabled = false;
    this.setState({ listID: listDsc, isDisabled, isChanged: true, increament: false, decreament: true });
  }

  increaseCount = async (e, listID, length, assmnt) => {
    window.scrollTo(0, 0);
    let listInc, isDisabled = true;
    if (listID < length - 1) {
      listInc = listID + 1;
    }

    let found = this.state.sectionCompleted.some(res => res === listInc);
    if (found) isDisabled = false;
    this.setState({ listID: listInc, increament: true, decreament: false, isDisabled, lastResult: assmnt[assmnt.length - 1].field_display_order, isChanged: true }, () => {
      this.responseCheck()
    });

    this.state.patientResponses && this.state.patientResponses.forEach(function (v) { delete v.section });
    this.state.patientResponses && this.state.patientResponses.map((item) => {
      let fval = [];
      if (item && item.field_value && item.field_value[0] && item.field_value[0].title) {
        item.field_value.forEach((f) => {
          fval.push(f.title)
        })
        item.field_value = '';
        item.field_value = fval;
      }
      return item;
    })
    this.setState({
      isLoaded: true
    })
    let obj = {
      updatedby: this.state.patientid,
      startedby: this.state.patientid,
      starteddate: this.state.assessmentstartdate == "" ? moment(new Date()) : this.state.assessmentstartdate,
      duedate: this.state.assessmentduedate == "" ? moment(new Date()).add(21, 'd') : this.state.assessmentduedate,
      assessment_id: this.state.assessment_id,
      completedby: this.state.patientid,
      completeddate: moment(new Date()),
      modifiedon: moment(new Date()),
      patient_id: this.state.patientid,
      status: "INPROGRESS",
      progress_percentage: this.state.completed,
      patient_responses: this.state.patientResponses,
    }
    axios({
      method: 'PATCH',
      url: `/api/assessment`,
      data: obj,
    })
      .then((response) => {
        this.setState({
          isLoaded: false
        })
      })
      .catch(function (response) { console.log(response); });

  }

  handleDelete = (chipToDelete) => {
    let found = this.state.allergiesData.some(res => res.key === chipToDelete.key);
    if (!found) {
      this.state.allergiesData.push(chipToDelete);
      this.state.allergiesChip.push(chipToDelete);
    }
    let selectedAllergy = this.state.selectedAllergy.filter((chip) => chip.key !== chipToDelete.key)
    this.setState({ selectedAllergy })
  };

  onAllergySelection = (val, id, label, secLen, totalLen, secData) => {
    let field_name = id;
    let selectedAllergy = this.state.selectedAllergy;
    if (!selectedAllergy.includes(val, 0)) {
      selectedAllergy.push(val);
    }
    const data = { field_name, field_ui_label: label, field_value: selectedAllergy, section: this.state.listID };
    let checkedData = [...this.state.checkedData, data];
    let allergiesChip = this.state.allergiesChip.filter((allergy) => allergy.key !== val.key);
    this.setState({ selectedAllergy, checkedData, allergiesChip }, () => { this.handleProgressBar(totalLen, secLen, "allergies", secData); })
  }

  handleAllergies = (e) => {
    let val = e.target.value;
    if (val) {
      let allergiesChip = this.state.allergiesData.filter((allergy) => allergy.title.indexOf(val) > -1);
      //let allergiesData = this.state.allergiesData.filter((allergy) => allergy.title.indexOf(val) === -1);
      this.setState({ allergiesChip })
    }
  }

  redirectToHome = () => {
    window.location.href = "/hra"
  }

  handleAddMore = () => {
    let newMedicationRow = this.state.newMedicationRow;
    let medi = {
      name_ui_control: "textbox",
      name_ui_label: "Name",
      name_value: "",
      dose_ui_control: "textbox",
      dose_ui_label: "Dose",
      dose_value: "",
      started_ui_control: "date",
      started_ui_label: "Date Started",
      stated_value: null,
      ended_ui_control: "date",
      ended_ui_label: "Date Ended",
      ended_value: null,
      treating_condition_ui_control: "textbox",
      treating_condition_ui_label: "Condition Treating",
      treating_condition_value: ""
    }
    newMedicationRow.push(medi);

    this.setState({

      newMedicationRow
    }, () => {
      this.setState({
        addDisable: true,

      });
    });
  }

  handleDateChange = (date, name, secLen, totalLen, inc, fid) => {

    let newMedicationRow = this.state.newMedicationRow;

    if (newMedicationRow[inc]) {
      newMedicationRow[inc] = { ...newMedicationRow[inc], [name + "_value"]: date, [name + "Touched"]: true }
      let addDisable = this.state.addDisable;
      if (newMedicationRow[inc]['name_value'] && newMedicationRow[inc]['dose_value'] && newMedicationRow[inc]['stated_value'] && newMedicationRow[inc]['ended_value'] && newMedicationRow[inc]['treating_condition_value']) {
        addDisable = false;
      }
      this.setState({ newMedicationRow, addDisable }, () => { this.handleProgressBar(totalLen, secLen, "medications"); this.handleoffMedication('', fid) })
    }

  };

  handleRemove = (inc) => {
    let newMedicationRow = this.state.newMedicationRow.filter((row, index) => {
      return index !== inc
    })
    this.setState({ newMedicationRow, addDisable: false })
  }

  handleMedications = (e, secLen, totalLen, inc) => {

    let newMedicationRow = this.state.newMedicationRow;
    let { name, value } = e.target;

    if (newMedicationRow[inc]) {
      newMedicationRow[inc] = { ...newMedicationRow[inc], [name + "_value"]: value, [name + "Touched"]: true }
      let addDisable = this.state.addDisable;
      if (newMedicationRow[inc]['name_value'] && newMedicationRow[inc]['dose_value'] && newMedicationRow[inc]['stated_value'] && newMedicationRow[inc]['ended_value'] && newMedicationRow[inc]['treating_condition_value']) {
        addDisable = false;
      }
      this.setState({ newMedicationRow, addDisable }, () => { this.handleProgressBar(totalLen, secLen, "medications", ''); })
    }


  }
  handleoffMedication = (e, fid) => {
    let newMedicationRow = this.state.newMedicationRow;
    let patientResponses = this.state.patientResponses;
    newMedicationRow.forEach(function (v) {
      delete v.nameTouched;
      delete v.doseTouched;
      delete v.statedTouched;
      delete v.endedTouched;
      delete v.treating_conditionTouched;
    });
    patientResponses.forEach(function (v) { delete v.section });
    patientResponses.map((item) => {
      let fval = [];
      if (item.field_value[0] && item.field_value[0].title) {
        item.field_value.forEach((f) => {
          fval.push(f.title)
        })
        item.field_value = '';
        item.field_value = fval;
      }
      return item;
    })

    patientResponses.forEach((row) => {
      if (row.field_name === fid) {
        row.field_medication_value = newMedicationRow
      }
    })

    this.setState({ finalData: patientResponses })


  }

  finalsubmitAssessment() {
    this.setState({
      enablefinalscreen: true
    });
  }

  backsubmitAssessment = () => {
    this.setState({
      enablefinalscreen: false, enablesubmitscreen: false
    })
  }
  submitAssessment = () => {
    this.setState({
      isLoaded: true
    })
    let obj = {
      patient_id: this.state.patientid,
      status: "INPROGRESS",
      assessment_id: this.state.assessment_id,
      patient_responses: this.state.finalData ? this.state.finalData : this.state.patientResponses,
      modifiedon: moment(new Date()),
      updatedby: this.state.patientid,
      progress_percentage: this.state.completed,
      completedby: this.state.patientid,
      startedby: this.state.patientid,
      starteddate: this.state.assessmentstartdate == "" ? moment(new Date()) : this.state.assessmentstartdate,
      duedate: this.state.assessmentduedate == "" ? moment(new Date()).add(1, 'M') : this.state.assessmentduedate,
      completeddate: this.state.assessmentcompleteddate == undefined ? moment(new Date()).format("DD MMM YYYY") : this.state.assessmentcompleteddate
    }

    axios({
      method: 'PATCH',
      url: `/api/assessment`,
      data: obj,
    })
      .then((response) => {
        this.setState({
          isLoaded: false, enablesubmitscreen: true
        })


      })
      .catch(function (response) { console.log(response); });
  }

  render() {
    const { patientResponses, assessments, pendingQuestions } = this.state;

    let assessmentLength = assessments && assessments.section && assessments.section.length;
    let assessmentdata = assessments && assessments.section && assessments.section.map(function (el) { return el.fields; });
    let totalassessments = assessmentdata && [].concat(...assessmentdata);
    let assessmentCount = totalassessments && totalassessments.length;
    let sectionsData = assessments && assessments.section;
    let secindex = this.state.listID;
    let assessmentsection = assessments && assessments.section && assessments.section[secindex];

    let assessmentresults = [];
    assessmentresults.push(assessmentsection);
    const { classes } = this.props;
    let dependentFields = [];
    assessmentresults[0] && assessmentresults[0].fields && assessmentresults[0].fields.forEach((items) => {
      if (items.field_dependency) {
        let data = {};
        data.field_dependency = items.field_dependency;
        data.field_visible_only = items.field_visible_only;
        data.field_name = items.field_name;
        dependentFields.push(data);
      }
      return dependentFields

    })

    let questFields = _.get(assessmentresults, '[0].fields', []);
    let newAssessment = _.sortBy(_.filter(questFields, (field) => {
      const isDepFieldToShow = (dependentFieldName) => {
        const dependentField = _.find(patientResponses, r => r.field_name === dependentFieldName);
        return _.get(dependentField, 'field_value', []).includes(_.get(field, 'field_visible_only'));
      }
      const dependentFieldName = _.get(field, 'field_dependency');
      return _.isEmpty(dependentFieldName) || isDepFieldToShow(dependentFieldName);
    }), ['field_display_order']);
    console.log(this.state.finalData, this.state.patientResponses)
    return (
      <React.Fragment>
        <Head>
          <title>Healthlligence</title>
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
        </Head>
        <Layout isLoaded={this.state.isLoaded}>

          {assessmentresults &&
            assessmentresults.map((el, i) => {
              return (
                <MDBTypography tag="h2" variant="h2-responsive" className="assessment-header-title">
                  {el && el.section_name}
                </MDBTypography>


              )
            })}

          <MDBTypography tag="h6" className="your-progress">
            Your Progress
          </MDBTypography>
          <MDBTypography tag="h6" className="progress-text">
            {(this.state.completed)}% Completed
          </MDBTypography>
          <MDBProgress value={this.state.completed} className="assessment-progress-bar" />

          {
            this.state.enablefinalscreen ? <div> <MDBCard>
              <MDBCardBody>
                <div className="text-center Healthriskassessmenttitle">Assessment Complete</div>
                <div className='finalassessmentconfirmation'>
                  <p> Patient <span>{this.state.patientname}</span> has finished and completed the Assessment on </p>
                </div>
                <div className='successfulcompletion'> April 15th, 2021, 13:07:26 PST. </div>

                <div className="text-center buttons-container" style={{ marginTop: "16px", marginBottom: "16px" }}>
                  
                    <MDBBtn color="blue-grey" className="back-button" onClick={this.backsubmitAssessment.bind(this)}>EDIT</MDBBtn>
                  
                  <Link href="/assessmentlist">
                    <MDBBtn className="returntodashboard">RETURN TO DASHBOARD</MDBBtn>
                  </Link>
                </div>

              </MDBCardBody>
            </MDBCard>
            </div> : this.state.enablesubmitscreen ? <div><MDBCard>
              <MDBCardBody>
                <div className='successfulcompletion'>You have successfully completed all the questions within the Assessment for Patient {this.state.patientname}.</div>
                <div className="hradescription">
                  <p> If you wish to make any changes, you may go back now. </p>
                </div>

                <div className="assessmentconfirmation">
                  <p>If you would like to conclude and confirm the information within this Assessment and would like to submit the Assessment as complete; </p>
                </div>
                <div className="agreeterms">
                  <p><span className="hraspanbold">Please click “SUBMIT” as seen below. </span> </p>
                </div>
                <div className="text-center buttons-container" style={{ marginBottom: "16px" }}>
                  <Link href="/assessment">
                    <MDBBtn color="blue-grey" className="back-button" onClick={this.backsubmitAssessment.bind(this)}>BACK</MDBBtn>
                  </Link>
                  <MDBBtn className="next-button" onClick={this.finalsubmitAssessment.bind(this)}>Submit</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>

            </div> : <>{assessmentresults &&
              assessmentresults.map((el) => {
                let assessmentFields = _.sortBy(_.filter(questFields, (field) => {
                  const isDepFieldToShow = (dependentFieldName) => {
                    const dependentField = _.find(patientResponses, r => r.field_name === dependentFieldName);
                    return _.get(dependentField, 'field_value', []).includes(_.get(field, 'field_visible_only'));
                  }
                  const dependentFieldName = _.get(field, 'field_dependency');
                  return _.isEmpty(dependentFieldName) || isDepFieldToShow(dependentFieldName);
                }), ['field_display_order']);

                if (assessmentFields) {
                  if (this.state.listID > 0 && this.state.increament) {

                    let count = this.state.lastResult;
                    for (let i = 0; i < assessmentFields.length; i++) {
                      if (assessmentFields[i]) {
                        assessmentFields[i].field_display_order = count + 1;
                      }
                      count++;
                    }
                  } else if (this.state.listID > 0 && this.state.decreament) {

                  } else {
                    for (let i = assessmentFields[0] && assessmentFields[0].field_display_order; i < assessmentFields.length; i++) {
                      if (assessmentFields[i]) assessmentFields[i].field_display_order = i + 1;
                    }
                  }
                }

                return (
                  <>
                    {assessmentFields && assessmentFields.map((item, index) => {
                      let response = patientResponses && patientResponses.find(r => r.field_name === item.field_name) || this.state.checkedData.find(o => o.field_name === item.field_name) || this.state.checkMultiData.find(o => o.field_name === item.field_name);
                      return (
                        <>
                          <MDBRow>
                            <MDBCol size="12" md="12">
                              <MDBCard>
                                <MDBCardBody>

                                  <div className="d-flex flex-column">
                                    <div className="text-left">
                                      {item.field_display_order}. {item.field_ui_label}
                                      {item.field_ui_control === "checkbox" && (<span className="checkbox-label">(Select all that apply)</span>)}</div>
                                  </div>
                                  <MDBRow className="assessment-row pt-3 pl-1 pr-1">
                                    {
                                      item.field_ui_control === "radio" || item.field_ui_control === "selectlist" ? (
                                        item && item.field_selection && item.field_selection.map((elm, index) => {
                                          let obj = this.state.checkedData.find(o => o.field_name === item.field_name);
                                          return (
                                            <div className={`assessment-option ${(response && response.field_value.includes(elm)) ? 'hasSelected' : ''}`}>
                                              <input
                                                type="radio"
                                                className='custom-control-input optionSelected'
                                                name={item.field_name}
                                                value={elm}
                                                checked={(obj && obj.field_name === item.field_name && obj.field_value === elm) ? true :
                                                  (response && response.field_value.includes(elm)) ? true : false}
                                                id={index + item.field_name}
                                                onClick={(e) => this.handleSingleSelection(e, assessmentCount, assessmentsection.fields.length, item.field_ui_label, assessmentsection)}
                                              />
                                              <label for={index + item.field_name} className={response && response.field_value.includes(elm) ? "label-selected" : "assessment-option-label"}> &nbsp; {(/.*\(.*\).*/.test(elm)) ? elm.substr(0, elm.indexOf('(')) : elm}  &nbsp;
                                                {(/.*\(.*\).*/.test(elm) && elm.match(/\(([^)]+)\)/)[1].length > 1) &&
                                                  <Chevron
                                                    fill={(response && response.field_value.includes(elm)) ? apptheme.themeColor : apptheme.fontPrimaryColor}
                                                    width={20}
                                                    withTooltip
                                                    tooltipPosition="top"
                                                    tooltipText={elm.match(/\(([^)]+)\)/)[1]}
                                                  />

                                                }
                                              </label>
                                            </div>
                                          );
                                        })
                                      ) :

                                        item.field_ui_control === "textarea" ? (

                                          <div style={{ width: "100%" }}>
                                            <MDBCol md="12">
                                              <MDBInput
                                                type="textarea"
                                                label=""
                                                onChange={this.handleassessmenttextareachnage.bind(this)}
                                                value={this.state.assessmenttextareavalue}> </MDBInput>
                                            </MDBCol>

                                          </div>

                                        ) :



                                          item.field_ui_control === "checkbox" ? (

                                            item && item.field_selection && item.field_selection.map((elm, index) => {
                                              let obj = this.state.checkMultiData.find(o => o.field_name === item.field_name && o.field_value === elm);

                                              return (
                                                <>
                                                  <div className={`assessment-option ${(response && response.field_value.includes(elm)) ? 'hasSelected' : ''}`}>
                                                    <input
                                                      type="checkbox"
                                                      className={`custom-control-input assessmentOption`}
                                                      name={item.field_name}
                                                      value={elm}
                                                      id={index + item.field_name}
                                                      checked={(obj && obj.field_value === elm) ? true :
                                                        (response && response.field_value.includes(elm)) ? true : false}
                                                      onClick={(e) => this.handleMultiSelection(e, assessmentCount, assessmentsection.fields.length, item.field_ui_label, assessmentsection)}
                                                    />
                                                    <label for={index + item.field_name} className={response && response.field_value.includes(elm) ? "label-selected" : "assessment-option-label"}> &nbsp; {(/.*\(.*\).*/.test(elm)) ? elm.substr(0, elm.indexOf('(')) : elm}  &nbsp;
                                                      {(/.*\(.*\).*/.test(elm) && elm.match(/\(([^)]+)\)/)[1].length > 1) &&
                                                        <Chevron
                                                          fill={(response && response.field_value.includes(elm)) ? '#DB1962' : '#424242'}
                                                          width={20}
                                                          withTooltip
                                                          tooltipPosition="top"
                                                          tooltipText={elm.match(/\(([^)]+)\)/)[1]}
                                                        />
                                                      }
                                                    </label>
                                                  </div>

                                                </>
                                              );

                                            })

                                          ) :
                                            item.field_ui_control === "allergies" ? (
                                              (() => {
                                                return (
                                                  <>
                                                    <MDBCol md="4">
                                                      <div className="input-group md-form form-sm form-1 pl-0 allergies-control">

                                                        <MDBIcon className="text-black allergy-search-icon" icon="search" />
                                                        <input className="form-control allergies-textbox" type="text" aria-label="Search" onChange={(e) => this.handleAllergies(e)} />
                                                      </div>
                                                    </MDBCol>
                                                    <div className="w-100 pt-4" />
                                                    {this.state.allergiesChip && this.state.allergiesChip.map((algy, index) => {
                                                      return (
                                                        <div className="assessment-option" onClick={() => this.onAllergySelection(algy, item.field_name, item.field_ui_label, assessmentsection.fields.length, assessmentCount, assessmentsection)}>
                                                          <label className="assessment-option-label">{algy.title}</label>
                                                        </div>
                                                      )
                                                    })}

                                                    <div className="divider"></div>
                                                    {this.state.selectedAllergy && this.state.selectedAllergy.map((salgy) => {
                                                      return (
                                                        <div className="assessment-option hasSelected"  >
                                                          <label className="assessment-option-label">{salgy.title} <MDBIcon icon="times" onClick={() => this.handleDelete(salgy)} /></label>
                                                        </div>
                                                      )
                                                    })}
                                                  </>
                                                );
                                              })()
                                            ) :
                                              item.field_ui_control === "medications" ? (
                                                <div className="medication-container">
                                                  <>
                                                    {this.state.newMedicationRow.map((row, inc) =>
                                                      <MDBRow>
                                                        <MDBCol md="2">
                                                          <div className="medication-label">Name</div>
                                                          <MDBInput
                                                            outline size="sm"
                                                            name="name"
                                                            background
                                                            className={(this.state.newMedicationRow[inc]
                                                              && this.state.newMedicationRow[inc]["nameTouched"] &&
                                                              !this.state.newMedicationRow[inc]["name_value"]) ? "medications-input is-invalid" : "medications-input is-valid"}
                                                            onChange={(e) => this.handleMedications(e, 1, assessmentCount, inc, "")}
                                                            value={
                                                              this.state.newMedicationRow[inc]
                                                              && this.state.newMedicationRow[inc]["name_value"]
                                                            }
                                                            onBlur={(e) => this.handleoffMedication(e, item.field_name)}

                                                          >
                                                            {(this.state.newMedicationRow[inc]
                                                              && this.state.newMedicationRow[inc]["nameTouched"] &&
                                                              !this.state.newMedicationRow[inc]["name_value"]
                                                            ) && <div className="invalid-feedback">This field is required.</div>}
                                                          </MDBInput>
                                                        </MDBCol>
                                                        <MDBCol md="2" className="medi-imput">
                                                          <div className="medication-label">Dose</div>
                                                          <MDBInput
                                                            outline size="sm"
                                                            name="dose"
                                                            background
                                                            className={(this.state.newMedicationRow[inc]
                                                              && this.state.newMedicationRow[inc]["doseTouched"] &&
                                                              !this.state.newMedicationRow[inc]["dose_value"]) ? "medications-input is-invalid" : "medications-input is-valid"}
                                                            onChange={(e) => this.handleMedications(e, 1, assessmentCount, inc, "")}
                                                            value={
                                                              this.state.newMedicationRow[inc]
                                                              && this.state.newMedicationRow[inc]["dose_value"]
                                                            }
                                                            onBlur={(e) => this.handleoffMedication(e, item.field_name)}

                                                          >
                                                            {(this.state.newMedicationRow[inc]
                                                              && this.state.newMedicationRow[inc]["doseTouched"] &&
                                                              !this.state.newMedicationRow[inc]["dose_value"]
                                                            ) && <div className="invalid-feedback">This field is required.</div>}
                                                          </MDBInput>
                                                        </MDBCol>
                                                        <MDBCol md="2" className="medi-datepicker">
                                                          <div className="medication-label">Date Started</div>
                                                          <MDBDatePicker
                                                            theme="danger"
                                                            getValue={(date) => this.handleDateChange(
                                                              date,
                                                              "stated",
                                                              1,
                                                              assessmentCount,
                                                              inc,
                                                              item.field_name
                                                            )}
                                                            valueDefault={null}
                                                            name="stated"
                                                            value={this.state.newMedicationRow[inc] && this.state.newMedicationRow[inc]["stated_value"]}
                                                          />

                                                        </MDBCol>
                                                        <MDBCol md="2" className="medi-datepicker">
                                                          <div className="medication-label">Date Ended</div>
                                                          <MDBDatePicker
                                                            theme="danger"
                                                            getValue={(date) => this.handleDateChange(
                                                              date,
                                                              "ended",
                                                              1,
                                                              assessmentCount,
                                                              inc,
                                                              item.field_name
                                                            )}
                                                            disabled={this.state.newMedicationRow[inc] && !this.state.newMedicationRow[inc]["stated_value"]}
                                                            valueDefault={null}
                                                            name="ended"
                                                            value={this.state.newMedicationRow[inc] && this.state.newMedicationRow[inc]["ended_value"]}
                                                            minDate={
                                                              this.state.newMedicationRow[inc]
                                                              && this.state.newMedicationRow[inc]["stated_value"]
                                                            }
                                                          />
                                                        </MDBCol>
                                                        <MDBCol md="2" className="medi-imput">
                                                          <div className="medication-label">Condition Treating</div>
                                                          <MDBInput
                                                            outline size="sm"
                                                            name="treating_condition"
                                                            background
                                                            className={(this.state.newMedicationRow[inc]
                                                              && this.state.newMedicationRow[inc]["treating_conditionTouched"] &&
                                                              !this.state.newMedicationRow[inc]["treating_condition_value"]) ? "medications-input is-invalid" : "medications-input is-valid"}
                                                            onChange={(e) => this.handleMedications(e, 1, assessmentCount, inc, "")}
                                                            value={
                                                              this.state.newMedicationRow[inc]
                                                              && this.state.newMedicationRow[inc]["treating_condition_value"]
                                                            }
                                                            onBlur={(e) => this.handleoffMedication(e, item.field_name)}
                                                          >
                                                            {(this.state.newMedicationRow[inc]
                                                              && this.state.newMedicationRow[inc]["treating_conditionTouched"] &&
                                                              !this.state.newMedicationRow[inc]["treating_condition_value"]
                                                            ) && <div className="invalid-feedback">This field is required.</div>}
                                                          </MDBInput>
                                                        </MDBCol>
                                                        <MDBCol md="1" className="medi-imput">
                                                          <div className="add-icon">
                                                            {inc === 0 ?

                                                              <MDBIcon size="lg" icon="plus-circle" style={{ color: "#DB1962", marginLeft: "24px" }} className={`addButton ${this.state.addDisable && 'disabled'} `} onClick={() => this.handleAddMore("")} /> :
                                                              <MDBBtn flat style={{ color: "#DB1962", fontWeight: "600", marginTop: "-12px" }} onClick={() => this.handleRemove(inc)}>REMOVE </MDBBtn>
                                                            }
                                                          </div>
                                                        </MDBCol>
                                                      </MDBRow>
                                                    )}

                                                  </>

                                                </div>
                                              ) : null
                                    }

                                  </MDBRow>
                                  <div className="">
                                    {item && item.field_selection && item.field_selection.map((elm, index) => {
                                      if (elm === "Other" && (response && response.field_value.includes(elm))) {
                                        return (
                                          //   <div className="otherLangClass" style={{ width: "100%" }}>
                                          //     <MDBCol md="12">
                                          <MDBInput
                                            type="email"
                                            label=""
                                            value={response.field_other_value ? response.field_other_value : this.state.otherLanguagevalue}
                                            onBlur={e => this.handleBlur(e, assessmentCount, assessmentsection.fields.length, item.field_ui_label, assessmentsection, response.field_name)}
                                            onChange={e => this.handleOtherLangChange(e, assessmentCount, assessmentsection.fields.length, item.field_ui_label, assessmentsection, response.field_name)}
                                          // onChange={this.handleOtherLangChange.bind(this)}
                                          >
                                          </MDBInput>
                                          //   </MDBCol>
                                          // </div>
                                        )
                                      }
                                    })
                                    }
                                  </div>
                                </MDBCardBody>
                              </MDBCard>
                            </MDBCol>
                          </MDBRow>
                        </>
                      );

                    })}
                  </>
                );
              })}</>
          }


          {
            this.state.enablefinalscreen || this.state.enablesubmitscreen ? null : <div className="text-center buttons-container" style={{ marginBottom: "96px" }}>
            {secindex === 0 ?
              <MDBBtn className="assessmentback-button" onClick={() => Router.back()}>BACK</MDBBtn> :
              <MDBBtn className="assessmentback-button" onClick={(e) => { this.decreaseCount(secindex) }}>BACK</MDBBtn>
            }
            {secindex !== (assessmentLength - 1) ? (
              <MDBBtn color="primary" className="next-button"
                onClick={(e) => { this.increaseCount(e, secindex, assessmentLength, newAssessment) }}
              >NEXT</MDBBtn>
            ) : (
              <MDBBtn className="next-button" onClick={() => this.submitAssessment()}>SUBMIT</MDBBtn>
            )
            }
          </div>
          }
          
          {this.state.isLoaded && <Loader />}
          {/* <Scroller /> */}

          <style jsx>{AssessmentStyle}</style>
        </Layout>
      </React.Fragment>
    );
  }

}

export default Assessment;
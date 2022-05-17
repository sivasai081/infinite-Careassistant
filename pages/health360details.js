
import React, { Component } from "react";
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBTypography, MDBIcon, MDBDataTable } from "mdbreact";
import Health360Style from '../styles/health360.js';
import * as data from '../data/data';
import Layout from "../components/layout";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import axios from 'axios';
import Loader from '../components/loader';
import moment from 'moment';
import Head from 'next/head';


class Health360Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      health360details: "imaging",
      tab: "",
      perPage: 10,
      page: 1,
      health360data: [],
      riskscorelist: [],
      health360assessments: [],
      isLoaded: true,
      pageFrom: 1,
    }
  }
  componentDidMount() {
    this.setState({
      tab: "first"
    })
    let patientid = localStorage.getItem('patientId');
    let route = localStorage.getItem('health360details');
    this.setState({ health360details: route });
    axios.get(`/api/riskscore`)
      .then(res => {
        // this.setState({ riskscorelist: res.data.json.root }, () => {
        this.setState({ riskscorelist: [] }, () => {
          this.setState({
            riskscorelistcount: this.state.riskscorelist.length
          });

        });
      })

    axios.get(`/api/health360assessment`, {
      params: {
        id: patientid
      }
    })
      .then(res => {
        this.setState({ health360assessments: res.data.json.root }, () => {
          if (this.state.health360assessments != null) {
            this.setState({
              health360assessmentscount: this.state.health360assessments.length
            });
          }


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
                  allergiescount,
                  isLoaded: false
                });
              });
            })
        });
      })

      .catch((error) => {
        this.setState({ isLoaded: true });

      })





    let riskscoredata = data.riskScoreData;
    let encounters = data.encountersData;
    let allergies = data.allergiesData;
    for (let i = 0; i < allergies.rows.length; i++) {
      allergies.rows[i].startdate = moment(data.allergiesData.rows[i].startdate).format("DD MMM YYYY");
    }
    for (let i = 0; i < riskscoredata.rows.length; i++) {
      if (riskscoredata.rows[i].rating === "Moderate")
        riskscoredata.rows[i].rating = <div className="riskscoremoderatecolor">{data.riskScoreData.rows[i].rating} &nbsp; <img src="/images/trending_flat.svg" alt="" /> </div>
      else if (riskscoredata.rows[i].rating === "High Risk")
        riskscoredata.rows[i].rating = <div className="riskscorehighcolor">{data.riskScoreData.rows[i].rating} &nbsp; <img src="/images/trending_up.svg" alt="" /> </div>
      else if (riskscoredata.rows[i].rating === "Low")
        riskscoredata.rows[i].rating = <div className="riskscorelowcolor">{data.riskScoreData.rows[i].rating} &nbsp; <img src="/images/trending_down.svg" alt="" /> </div>
    }


    for (let i = 0; i < encounters.rows.length; i++) {
      if (encounters.rows[i].type === "Inpatient")
        encounters.rows[i].type = <div><img className="encounterimage" src="/images/inpatient_icon.svg" alt="" /><br /> <div>{data.encountersData.rows[i].type}</div></div>
      else if (encounters.rows[i].type === "Emergency")
        encounters.rows[i].type = <div><img className="encounterimage" src="/images/ambulance_icon.svg" alt="" /><br /> <div>{data.encountersData.rows[i].type}</div></div>
      else if (encounters.rows[i].type === "Urgent Care")
        encounters.rows[i].type = <div><img className="encounterimage" src="/images/urgent.svg" alt="" /><br /> <div>{data.encountersData.rows[i].type}</div></div>
      else if (encounters.rows[i].type === "Wellness")
        encounters.rows[i].type = <div><img className="encounterimage" src="/images/wellness.svg" alt="" /><br /> <div>{data.encountersData.rows[i].type}</div></div>
      else if (encounters.rows[i].type === "Outpatient")
        encounters.rows[i].type = <div><img className="encounterimage" src="/images/outpatient_icon.svg" alt="" /><br /> <div>{data.encountersData.rows[i].type}</div></div>
      else if (encounters.rows[i].type === "Ambulatory")
        encounters.rows[i].type = <div><img className="encounterimage" src="/images/ambulatory.svg" alt="" /><br /> <div>{data.encountersData.rows[i].type}</div></div>
    }
  }

  searchImmunCost = (item, code) => {
    let codeCost = item.filter(itm => itm.productOrService.coding[0].code === code);
    if (codeCost) return codeCost[0].net.value;
    else return null;
  }

  searchMedicationReason = (item, _id) => {
    let codeCost = item.filter(itm => itm.reference.split(":")[2] == _id);
    if (codeCost) {
      return codeCost[0].display;
    }
    else return null;
  }


  searchImmunization = (nameKey, myArray) => {
    return myArray.some(itm => itm.valueReference.reference.split(":")[2] === nameKey)
  }
  searchProcedure = (nameKey, myArray) => {
    return myArray.some(itm => itm.procedureReference.reference.split(":")[2] === nameKey)
  }

  searchMedication = (nameKey, myArray) => {
    return myArray.some(itm => itm.reference.split(":")[2] === nameKey)
  }

  searchEncounter = (nameKey, myArray) => {
    return myArray.some(itm => itm.encounter && itm.encounter[0].reference.split(":")[2] === nameKey)
  }

  getEncounterCost = (_id) => {
    return this.state.claims && this.state.claims.map((clm) => {
      if (clm.resource.item) {
        let found = this.searchEncounter(_id, clm.resource.item)
        if (found) {
          let cost = clm.resource && clm.resource.total && clm.resource.total.value
          return "$" + cost;
        } else {
          return null;
        }
      }
    })
  }

  getObservationCost = (value) => {
    if (value) {
      return "$" + value;
    } else {
      return null;
    }
  }

  getImmunizationCost = (_id, _code) => {
    return this.state.claims && this.state.claims.map((clm) => {
      if (clm.resource.supportingInfo) {
        let found = this.searchImmunization(_id, clm.resource.supportingInfo)
        if (found) {
          let cost = this.searchImmunCost(clm.resource.item, _code);
          return "$" + cost;
        } else {
          return null;
        }
      }
    })
  }

  getProcedureCost = (_id, _code) => {
    return this.state.claims && this.state.claims.map((clm) => {
      if (clm.resource.procedure) {
        let found = this.searchProcedure(_id, clm.resource.procedure)
        if (found) {
          let cost = this.searchImmunCost(clm.resource.item, _code);
          return "$" + cost;
        } else {
          return null;
        }
      }
    })
  }

  getMedicationReason = (_id) => {
    return this.state.procedures && this.state.procedures.map((clm) => {
      if (clm.resource.reasonReference) {
        let found = this.searchMedication(_id, clm.resource.reasonReference)
        if (found) {
          let reason = this.searchMedicationReason(clm.resource.reasonReference, _id);
          return reason;
        } else {
          return null;
        }
      }
    })
  }

  getMedicationCost = (_id) => {
    return this.state.claims && this.state.claims.map((clm) => {
      if (clm.resource.prescription && clm.resource.prescription.reference.split(":")[2] == _id) {
        return "$" + clm.resource.total.value;
      } else {
        return null;
      }
    })
  }

  getAllergiesData = (resource, customData, limit) => {
    let allergiesdata = {};
    let lmt = limit - 1;
    let allergiesrow = resource && resource.map((el, index) => {
      customData.rows['startdate'] = moment(el.resource.recordedDate).format("DD MMM YYYY");
      customData.rows['agdescription'] = el.resource.code && el.resource.code.coding[0] && el.resource.code.coding[0].display;
      customData.rows['status'] = "active";
      return Object.assign({}, customData.rows);
    })
    if (limit) {
      allergiesrow = allergiesrow && allergiesrow.filter((im, index) => index <= lmt);
    }
    allergiesdata.columns = customData.columns;
    if (allergiesrow) allergiesdata.rows = allergiesrow;
    return allergiesdata;
  }


  getImmunizationData = (resource, customData, limit) => {
    let immunizatioData = {};
    let lmt = limit - 1;
    let immunizationrow = resource && resource.map((el, index) => {
      customData.rows['dates'] = moment(el.resource.occurrenceDateTime).format("DD MMM YYYY");
      customData.rows['immunization'] = el.resource.vaccineCode.coding[0].display;
      customData.rows['cost'] = this.getImmunizationCost(el.resource.id, el.resource.vaccineCode.coding[0].code);
      return Object.assign({}, customData.rows);
    })
    if (limit) {
      immunizationrow = immunizationrow && immunizationrow.filter((im, index) => index <= lmt);
    }
    immunizatioData.columns = customData.columns;
    if (immunizationrow) immunizatioData.rows = immunizationrow;
    return immunizatioData;
  }

  getObservationData = (resource, customData, limit) => {
    let observationData = {};
    let lmt = limit - 1;
    let observationrow = resource && resource.map((el, index) => {
      customData.rows['dates'] = moment(el.resource.effectiveDateTime).format("DD MMM YYYY");
      customData.rows['cost'] = this.getObservationCost(el.resource.valueQuantity && el.resource.valueQuantity.value);
      customData.rows['description'] = el.resource.code.coding[0].display;
      customData.rows['cptcode'] = el.resource.code.coding[0].code;
      return Object.assign({}, customData.rows);
    })
    if (limit) {
      observationrow = observationrow && observationrow.filter((im, index) => index <= lmt);
    }
    observationData.columns = customData.columns;
    if (observationrow) observationData.rows = observationrow;
    return observationData;
  }

  getConditionsData = (resource, customData, limit) => {
    let conditionData = {};
    let lmt = limit - 1;
    let conditionrow = resource && resource.map((el, index) => {
      customData.rows['dates'] = moment(el.resource.onsetDateTime).format("DD MMM YYYY");
      customData.rows['icdcode'] = el.resource.code.coding[0].code;
      customData.rows['condition'] = el.resource.code.coding[0].display;

      return Object.assign({}, customData.rows);
    })
    if (limit) {
      conditionrow = conditionrow && conditionrow.filter((im, index) => index <= lmt);
    }
    conditionData.columns = customData.columns;
    if (conditionrow) conditionData.rows = conditionrow;
    return conditionData;
  }

  getProceduresData = (resource, customData, limit) => {
    let procedureData = {};
    let lmt = limit - 1;
    let procedurerow = resource && resource.map((el, index) => {
      customData.rows['dates'] = moment(el.resource.performedPeriod.start).format("DD MMM YYYY");
      customData.rows['cptcode'] = el.resource.code.coding[0].code;
      customData.rows['description'] = el.resource.code.coding[0].display;
      customData.rows['cost'] = this.getProcedureCost(el.resource.id, el.resource.code.coding[0].code);

      return Object.assign({}, customData.rows);
    })
    if (limit) {
      procedurerow = procedurerow && procedurerow.filter((im, index) => index <= lmt);
    }
    procedureData.columns = customData.columns;
    if (procedurerow) procedureData.rows = procedurerow;
    return procedureData;
  }

  getEncountersData = (resource, customData, limit) => {
    let encountersdata = {};
    let lmt = limit - 1;
    let encounterrow = resource && resource.map((el, index) => {
      customData.rows['type'] = el.resource.class.code
      customData.rows['startDate'] = moment(el.resource.period.start).format("DD MMM YYYY");
      customData.rows['endDate'] = moment(el.resource.period.end).format("DD MMM YYYY");
      customData.rows['provider'] = el.resource.serviceProvider.display;
      customData.rows['description'] = el.resource && el.resource.type && el.resource.type[0].coding[0].display;
      customData.rows['reason'] = el.resource && el.resource.reasonCode && el.resource.reasonCode[0].coding[0].display;
      customData.rows['insurance'] = 'Kaiser Permanente';
      customData.rows['cost'] = this.getEncounterCost(el.resource.id);




      return Object.assign({}, customData.rows);
    })
    if (limit) {
      encounterrow = encounterrow && encounterrow.filter((im, index) => index <= lmt);
    }
    encountersdata.columns = customData.columns;
    if (encounterrow) encountersdata.rows = encounterrow;
    return encountersdata;
  }

  getMedicationsData = (resource, customData, limit) => {
    let medicationsdata = {};
    let lmt = limit - 1;
    let medicationrow = resource && resource.map((el, index) => {
      customData.rows['dates'] = moment(el.resource.authoredOn).format("DD MMM YYYY");
      customData.rows['medication'] = el.resource.medicationCodeableConcept.coding[0].display;
      customData.rows['reason'] = this.getMedicationReason(el.resource && el.resource.reasonReference && el.resource.reasonReference[0].reference.split(":")[2])
      customData.rows['provider'] = 'Kaiser Permanente',
        customData.rows['cost'] = this.getMedicationCost(el.resource.id);
      return Object.assign({}, customData.rows);
    })
    if (limit) {
      medicationrow = medicationrow && medicationrow.filter((im, index) => index <= lmt);
    }
    medicationsdata.columns = customData.columns;
    if (medicationrow) medicationsdata.rows = medicationrow;
    return medicationsdata;
  }

  getImagingData = (resource, customData, limit) => {
    let imagingdata = {};
    let lmt = limit - 1;
    let imagingrow = resource && resource.map((el, index) => {
      customData.rows['dates'] = moment(el.resource.started).format("DD MMM YYYY");
      // customData.rows['description'] = "";
      // customData.rows['type'] = ""

      return Object.assign({}, customData.rows);
    })
    if (limit) {
      imagingrow = imagingrow && imagingrow.filter((im, index) => index <= lmt);
    }
    imagingdata.columns = customData.columns;
    if (imagingrow) imagingdata.rows = imagingrow;
    return imagingdata;
  }

  getRiskscoreData = (resource, customData, limit) => {
    let riskscoredata = {};
    let lmt = limit - 1;
    let riskscorerow = resource && resource.map((el, index) => {
      customData.rows['date'] = moment(el.rundate).format("DD MMM YYYY");
      customData.rows['type'] = el.riskmethod;
      customData.rows['score'] = el.score;
      if (el.score == 3)
        customData.rows['rating'] = <div className="riskscoremoderatecolor">Moderate &nbsp; <img src="/images/trending_flat.svg" alt="" /> </div>
      else if (el.score > 3)
        customData.rows['rating'] = <div className="riskscorehighcolor">High &nbsp; <img src="/images/trending_up.svg" alt="" /> </div>
      else if (el.score < 3)
        customData.rows['rating'] = <div className="riskscorelowcolor">Low &nbsp; <img src="/images/trending_down.svg" alt="" /> </div>
      return Object.assign({}, customData.rows);
    })



    if (limit) {
      riskscorerow = riskscorerow && riskscorerow.filter((im, index) => index <= lmt);
    }
    riskscoredata.columns = customData.columns;
    if (riskscorerow) riskscoredata.rows = riskscorerow;
    return riskscoredata;
  }

  getAssessmentData = (resource, customData, limit) => {
    let assessmentsdata = {};
    let lmt = limit - 1;
    let assessmentsrow = resource && resource.map((el, index) => {
      customData.rows['completedDate'] = moment(el.completeddate).format("DD MMM YYYY");
      customData.rows['type'] = el.assessments && el.assessments.assessment && el.assessments.assessment.assessment_type;
      customData.rows['status'] = el.status;
      customData.rows['startedBy'] = el.startedby;
      customData.rows['completedBy'] = el.completedby;
      customData.rows['dueDate'] = moment(el.duedate).format("DD MMM YYYY");


      return Object.assign({}, customData.rows);
    })
    if (limit) {
      assessmentsrow = assessmentsrow && assessmentsrow.filter((im, index) => index <= lmt);
    }
    assessmentsdata.columns = customData.columns;
    if (assessmentsrow) assessmentsdata.rows = assessmentsrow;
    return assessmentsdata;
  }


  sortDateClick() {
    this.setState({ tab: "first" })
  };
  sortAlphabeticalClick() {
    this.setState({ tab: "second" })
  };
  sortRiskClick() {
    this.setState({ tab: "third" })
  };

  onHandleSearch(e, search) {
    console.log(e.target.value);
  }

  handlePageChange = (e, val) => {
    this.setState({ pageFrom: ((val * this.state.perPage) - (this.state.perPage - 1)), page: val });
  }



  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Healthlligence</title>
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
        </Head>
        <Layout isLoaded={this.state.isLoaded}>
          <div className="details-table" style={{ maxWidth: "1400px", margin: "0 auto" }}>
            {this.state.health360details == "conditions" ? <MDBRow style={{ marginTop: "-24px" }}>
              <MDBCol md="12">
                <MDBCard style={{ marginBottom: "80px" }}>
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="4" md="8" className="colsizebig">
                        <div className="icons-row color-1">
                          <MDBIcon icon="poll" className="white-text" />
                        </div>
                        &nbsp;
                        <div className="title header-text"> CONDITIONS<span className="caption-data">{this.state.conditionscount == undefined ? "-" : this.state.conditionscount}</span></div>
                        {/* <div className="caption-data">{this.state.conditionscount == undefined ? "-" : this.state.conditionscount}</div> */}
                      </MDBCol>
                      <MDBCol sm="8" md="4" className="healthsortingColoumn">
                        <div className="titleAndSort" >
                          <MDBTypography tag="h2" variant="h2-responsive" className="header-title"></MDBTypography>
                          {/* <div className="controls">
                            <div className={this.state.tab == "first" ? "dataHandling active" : "dataHandling"} onClick={this.sortDateClick.bind(this)}><p >Date</p></div>
                            <div className={this.state.tab == "second" ? "dataHandling active" : "dataHandling"} onClick={this.sortAlphabeticalClick.bind(this)}><p >A to Z</p></div>
                            <div className="searchingdiv">
                              <MDBIcon icon="search" className="searchIconContainer" />
                              <input placeholder="Search" id="searching" className="searchingContainer" type="text" onChange={this.onHandleSearch.bind(this)} />
                            </div>
                          </div> */}
                        </div>
                      </MDBCol>
                    </MDBRow>
                    <div className="thirdColumnTable">
                      <MDBDataTable
                        small
                        hover={true}
                        responsive={true}
                        paging={false}
                        searching={false}
                        data={this.getConditionsData(this.state.conditions, data.conditionData, this.state.conditionscount)}
                      />
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
              : null}
            {this.state.health360details == "riskscore" ? <MDBRow style={{ marginTop: "-24px" }}>
              <MDBCol md="12">
                <MDBCard style={{ marginBottom: "80px" }}>
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol md="8" className="col-riskscore colsizebig">
                        <div className="icons-row icon-center color-3">
                          <MDBIcon icon="exclamation-triangle" className="white-text" />
                        </div>
                        &nbsp;
                        <div className="title header-text"> RISK SCORE<span className="caption-data">
                          {/* {this.state.riskscorelistcount == undefined ? "-" : this.state.riskscorelistcount} */}
                          3
                          </span></div>
                        {/* <div className="caption-data">{this.state.riskscorelistcount == undefined ? "-" : this.state.riskscorelistcount}</div> */}
                      </MDBCol>
                      <MDBCol md="4" className="healthsortingColoumn">
                        <div className="titleAndSort" >
                          <MDBTypography tag="h2" variant="h2-responsive" className="header-title"></MDBTypography>
                          {/* <div className="controls">
                            <div className={this.state.tab == "first" ? "dataHandling active" : "dataHandling"} onClick={this.sortDateClick.bind(this)}><p >Date</p></div>
                            <div className={this.state.tab == "second" ? "dataHandling active" : "dataHandling"} onClick={this.sortAlphabeticalClick.bind(this)}><p >A to Z</p></div>
                            <div className="searchingdiv">
                              <MDBIcon icon="search" className="searchIconContainer" />
                              <input placeholder="Search" id="searching" className="searchingContainer" type="text" onChange={this.onHandleSearch.bind(this)} />
                            </div>
                          </div> */}
                        </div>
                      </MDBCol>
                    </MDBRow>
                    <div className="secondColumnTable">
                      <MDBDataTable
                        small
                        hover={true}
                        responsive={true}
                        paging={false}
                        searching={false}
                        data={data.riskScoreData}
                        // data={this.getRiskscoreData(this.state.riskscorelist, data.riskScoreData)}
                      />
                    </div>
                    {/* <div className="pagination-container">
                    <Pagination count={Math.ceil(this.state.riskscorelistcount/this.state.perPage)} page={this.state.page} color="primary"  onChange={this.handlePageChange} />
                </div> */}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
              : null}
            {this.state.health360details == "medications" ? <MDBRow style={{ marginTop: "-24px" }}>
              <MDBCol md="12">
                <MDBCard style={{ marginBottom: "80px" }}>
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol md="8" className="colsizebig">
                        <div className="icons-row color-4">
                          <MDBIcon icon="prescription-bottle-alt" className="white-text" />
                        </div>
                        &nbsp;
                        <div className="title header-text"> MEDICATIONS<span className="caption-data">{this.state.medicationscount == undefined ? "-" : this.state.medicationscount}</span></div>
                        {/* <div className="caption-data">{this.state.medicationscount == undefined ? "-" : this.state.medicationscount}</div> */}
                      </MDBCol>
                      <MDBCol md="4" className="healthsortingColoumn">
                        <div className="titleAndSort" >
                          <MDBTypography tag="h2" variant="h2-responsive" className="header-title"></MDBTypography>
                          {/* <div className="controls">
                            <div className={this.state.tab == "first" ? "dataHandling active" : "dataHandling"} onClick={this.sortDateClick.bind(this)}><p >Date</p></div>
                            <div className={this.state.tab == "second" ? "dataHandling active" : "dataHandling"} onClick={this.sortAlphabeticalClick.bind(this)}><p >A to Z</p></div>
                            <div className="searchingdiv">
                              <MDBIcon icon="search" className="searchIconContainer" />
                              <input placeholder="Search" id="searching" className="searchingContainer" type="text" onChange={this.onHandleSearch.bind(this)} />
                            </div>
                          </div> */}
                        </div>
                      </MDBCol>
                    </MDBRow>
                    <div className="secondColumnTable">
                      <MDBDataTable
                        small
                        hover={true}
                        responsive={true}
                        paging={false}
                        searching={false}
                        data={this.getMedicationsData(this.state.medications, data.medicationsData)}
                      />
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

            </MDBRow>
              : null}
            {this.state.health360details == "observations" ? <MDBRow style={{ marginTop: "-24px" }}>
              <MDBCol md="12">
                <MDBCard style={{ marginBottom: "80px" }}>
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol md="8" className="colsizebig" >
                        <div className="icons-row color-5">
                          <MDBIcon icon="check" className="white-text" />
                        </div>
                        &nbsp;
                        <div className="title header-text"> OBSERVATIONS<span className="caption-data">{this.state.observationscount == undefined ? "-" : this.state.observationscount}</span></div>
                        {/* <div className="caption-data">{this.state.observationscount == undefined ? "-" : this.state.observationscount}</div> */}
                      </MDBCol>
                      <MDBCol md="4" className="healthsortingColoumn">
                        <div className="titleAndSort" >
                          <MDBTypography tag="h2" variant="h2-responsive" className="header-title"></MDBTypography>
                          {/* <div className="controls">
                            <div className={this.state.tab == "first" ? "dataHandling active" : "dataHandling"} onClick={this.sortDateClick.bind(this)}><p >Date</p></div>
                            <div className={this.state.tab == "second" ? "dataHandling active" : "dataHandling"} onClick={this.sortAlphabeticalClick.bind(this)}><p >A to Z</p></div>
                            <div className="searchingdiv">
                              <MDBIcon icon="search" className="searchIconContainer" />
                              <input placeholder="Search" id="searching" className="searchingContainer" type="text" onChange={this.onHandleSearch.bind(this)} />
                            </div>
                          </div> */}
                        </div>
                      </MDBCol>
                    </MDBRow>
                    <div className="thirdColumnTable">
                      <MDBDataTable
                        maxHeight="200px"
                        small
                        hover={true}
                        responsive={true}
                        paging={false}
                        searching={false}
                        data={this.getObservationData(this.state.observations, data.ObservationsData)}
                      />
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>


            </MDBRow>
              : null}
            {this.state.health360details == "procedures" ? <MDBRow style={{ marginTop: "-24px" }}>
              <MDBCol md="12">
                <MDBCard style={{ marginBottom: "80px" }}>
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol md="8" className="colsizebig">
                        <div className="icons-row icon-center color-10">
                          <MDBIcon icon="hospital" className="white-text" />
                        </div>
                        &nbsp;
                        <div className="title header-text"> PROCEDURES<span className="caption-data">{this.state.Procedurescount == undefined ? "-" : this.state.Procedurescount}</span></div>
                        {/* <div className="caption-data">{this.state.Procedurescount == undefined ? "-" : this.state.Procedurescount}</div> */}
                      </MDBCol>
                      <MDBCol md="4" className="healthsortingColoumn">
                        <div className="titleAndSort" >
                          <MDBTypography tag="h2" variant="h2-responsive" className="header-title"></MDBTypography>
                          {/* <div className="controls">
                            <div className={this.state.tab == "first" ? "dataHandling active" : "dataHandling"} onClick={this.sortDateClick.bind(this)}><p >Date</p></div>
                            <div className={this.state.tab == "second" ? "dataHandling active" : "dataHandling"} onClick={this.sortAlphabeticalClick.bind(this)}><p >A to Z</p></div>
                            <div className="searchingdiv">
                              <MDBIcon icon="search" className="searchIconContainer" />
                              <input placeholder="Search" id="searching" className="searchingContainer" type="text" onChange={this.onHandleSearch.bind(this)} />
                            </div>
                          </div> */}
                        </div>
                      </MDBCol>
                    </MDBRow>
                    <div className="thirdColumnTable">
                      <MDBDataTable
                        small
                        hover={true}
                        responsive={true}
                        paging={false}
                        searching={false}
                        data={this.getProceduresData(this.state.procedures, data.procedureData)}
                      />
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

            </MDBRow>
              : null}
            {this.state.health360details == "encounters" ? <MDBRow style={{ marginTop: "-24px" }}>
              <MDBCol md="12">
                <MDBCard style={{ marginBottom: "80px" }}>
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol md="8" className="colsizebig" >
                        <div className="icons-row color-2">
                          <MDBIcon icon="exchange-alt" className="white-text" />
                        </div>
                        &nbsp;
                        <div className="title header-text"> ENCOUNTERS<span className="caption-data">{this.state.encounterscount == undefined ? "-" : this.state.encounterscount}</span></div>
                        {/* <div className="caption-data">{this.state.encounterscount == undefined ? "-" : this.state.encounterscount}</div> */}
                      </MDBCol>
                      <MDBCol md="4" className="healthsortingColoumn">
                        <div className="titleAndSort" >
                          <MDBTypography tag="h2" variant="h2-responsive" className="header-title"></MDBTypography>
                          {/* <div className="controls">
                            <div className={this.state.tab == "first" ? "dataHandling active" : "dataHandling"} onClick={this.sortDateClick.bind(this)}><p >Date</p></div>
                            <div className={this.state.tab == "second" ? "dataHandling active" : "dataHandling"} onClick={this.sortAlphabeticalClick.bind(this)}><p >A to Z</p></div>
                            <div className="searchingdiv">
                              <MDBIcon icon="search" className="searchIconContainer" />
                              <input placeholder="Search" id="searching" className="searchingContainer" type="text" onChange={this.onHandleSearch.bind(this)} />
                            </div>
                          </div> */}
                        </div>
                      </MDBCol>
                    </MDBRow>

                    <div className="seventhColumnTable">
                      <MDBDataTable
                        small
                        hover={true}
                        responsive={true}
                        paging={false}
                        searching={false}
                        data={this.getEncountersData(this.state.encounters, data.encountersData)}
                      />
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

            </MDBRow>
              : null}
            {this.state.health360details == "assessments" ? <MDBRow style={{ marginTop: "-24px" }}>
              <MDBCol md="12">
                <MDBCard style={{ marginBottom: "80px" }}>
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol md="8" className="colsizebig" >
                        <div className="icons-row color-7">
                          <MDBIcon icon="file-alt" className="white-text" />
                        </div>
                        &nbsp;
                        <div className="title header-text"> ASSESSMENT<span className="caption-data">{this.state.health360assessmentscount == undefined ? "-" : this.state.health360assessmentscount}</span></div>
                        {/* <div className="caption-data">{this.state.health360assessmentscount == undefined ? "-" : this.state.health360assessmentscount}</div> */}
                      </MDBCol>
                      <MDBCol md="4" className="healthsortingColoumn">
                        <div className="titleAndSort" >
                          <MDBTypography tag="h2" variant="h2-responsive" className="header-title"></MDBTypography>
                          {/* <div className="controls">
                            <div className={this.state.tab == "first" ? "dataHandling active" : "dataHandling"} onClick={this.sortDateClick.bind(this)}><p >Date</p></div>
                            <div className={this.state.tab == "second" ? "dataHandling active" : "dataHandling"} onClick={this.sortAlphabeticalClick.bind(this)}><p >A to Z</p></div>
                            <div className="searchingdiv">
                              <MDBIcon icon="search" className="searchIconContainer" />
                              <input placeholder="Search" id="searching" className="searchingContainer" type="text" onChange={this.onHandleSearch.bind(this)} />
                            </div>
                          </div> */}
                        </div>
                      </MDBCol>
                    </MDBRow>
                    <div className="secondColumnTable">
                      <MDBDataTable
                        maxHeight="280px"
                        small
                        hover={true}
                        responsive={true}
                        paging={false}
                        searching={false}
                        // data={data.assessmentData}
                        data={this.getAssessmentData(this.state.health360assessments, data.assessmentData)}
                      />
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

            </MDBRow>
              : null}
            {this.state.health360details == "allergies" ? <MDBRow style={{ marginTop: "-24px" }}>
              <MDBCol md="12">
                <MDBCard style={{ marginBottom: "80px" }}>
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol md="8" className="colsizebig">
                        <div className="icons-row color-8">
                          <MDBIcon icon="ban" className="white-text" />
                        </div>
                        &nbsp;
                        <div className="title header-text"> ALLERGIES<span className="caption-data">{this.state.allergiescount == undefined ? "-" : this.state.allergiescount}</span></div>
                        {/* <div className="caption-data">{this.state.allergiescount == undefined ? "-" : this.state.allergiescount}</div> */}
                      </MDBCol>
                      <MDBCol md="4" className="healthsortingColoumn">
                        <div className="titleAndSort" >
                          <MDBTypography tag="h2" variant="h2-responsive" className="header-title"></MDBTypography>
                          {/* <div className="controls">
                            <div className={this.state.tab == "first" ? "dataHandling active" : "dataHandling"} onClick={this.sortDateClick.bind(this)}><p >Date</p></div>
                            <div className={this.state.tab == "second" ? "dataHandling active" : "dataHandling"} onClick={this.sortAlphabeticalClick.bind(this)}><p >A to Z</p></div>
                            <div className="searchingdiv">
                              <MDBIcon icon="search" className="searchIconContainer" />
                              <input placeholder="Search" id="searching" className="searchingContainer" type="text" onChange={this.onHandleSearch.bind(this)} />
                            </div>
                          </div> */}
                        </div>
                      </MDBCol>
                    </MDBRow>
                    <div className="secondColumnTable">
                      <MDBDataTable
                        small
                        hover={true}
                        responsive={true}
                        paging={false}
                        searching={false}
                        data={this.getAllergiesData(this.state.allergies, data.allergiesData)}

                      />
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

            </MDBRow>
              : null}
            {this.state.health360details == "immunizations" ? <MDBRow style={{ marginTop: "-24px" }}>
              <MDBCol md="12">
                <MDBCard style={{ marginBottom: "80px" }}>
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol md="8" className="colsizebig">
                        <div className="icons-row color-9">
                          <MDBIcon icon="plus-square" className="white-text" />
                        </div>
                        &nbsp;
                        <div className="title header-text"> IMMUNIZATIONS<span className="caption-data">{this.state.Immunizationscount == undefined ? "-" : this.state.Immunizationscount}</span></div>
                        {/* <div className="caption-data">{this.state.Immunizationscount == undefined ? "-" : this.state.Immunizationscount}</div> */}
                      </MDBCol>
                      
                      
                      <MDBCol md="4" className="healthsortingColoumn">
                        <div className="titleAndSort" >
                          <MDBTypography tag="h2" variant="h2-responsive" className="header-title"></MDBTypography>
                          {/* <div className="controls">
                            <div className={this.state.tab == "first" ? "dataHandling active" : "dataHandling"} onClick={this.sortDateClick.bind(this)}><p >Date</p></div>
                            <div className={this.state.tab == "second" ? "dataHandling active" : "dataHandling"} onClick={this.sortAlphabeticalClick.bind(this)}><p >A to Z</p></div>
                            <div className="searchingdiv">
                              <MDBIcon icon="search" className="searchIconContainer" />
                              <input placeholder="Search" id="searching" className="searchingContainer" type="text" onChange={this.onHandleSearch.bind(this)} />
                            </div>
                          </div> */}
                        </div>
                      </MDBCol>
                    </MDBRow>
                    <div className="secondColumnTable">
                      <MDBDataTable
                        small
                        hover={true}
                        responsive={true}
                        paging={false}
                        searching={false}
                        data={this.getImmunizationData(this.state.immunization, data.immunizationData)}
                      />
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

            </MDBRow>
              : null}
            {this.state.health360details == "imaging" ? <MDBRow style={{ marginTop: "-24px" }}>
              <MDBCol md="12">
                <MDBCard style={{ marginBottom: "80px" }}>
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol md="8" className="colsizebig">
                        <div className="icons-row color-6">
                          <MDBIcon icon="image" className="white-text" />
                        </div>
                        &nbsp;
                        <div className="title header-text"> IMAGING<span className="caption-data">{this.state.imagingcount == undefined ? "-" : this.state.imagingcount}</span></div>
                        {/* <div className="caption-data">{this.state.imagingcount == undefined ? "-" : this.state.imagingcount}</div> */}
                      </MDBCol>
                      <MDBCol md="4" className="healthsortingColoumn">
                        <div className="titleAndSort" >
                          <MDBTypography tag="h2" variant="h2-responsive" className="header-title"></MDBTypography>
                          {/* <div className="controls">
                            <div className={this.state.tab == "first" ? "dataHandling active" : "dataHandling"} onClick={this.sortDateClick.bind(this)}><p >Date</p></div>
                            <div className={this.state.tab == "second" ? "dataHandling active" : "dataHandling"} onClick={this.sortAlphabeticalClick.bind(this)}><p >A to Z</p></div>
                            <div className="searchingdiv">
                              <MDBIcon icon="search" className="searchIconContainer" />
                              <input placeholder="Search" id="searching" className="searchingContainer" type="text" onChange={this.onHandleSearch.bind(this)} />
                            </div>
                          </div> */}
                        </div>
                      </MDBCol>
                    </MDBRow>
                    <div className="secondColumnTable">
                      <MDBDataTable
                        small
                        hover={true}
                        responsive={true}
                        paging={false}
                        searching={false}
                        data={this.getImagingData(this.state.imaging, data.imagingData)}
                      />
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

            </MDBRow>
              : null}
          </div>
          {this.state.isLoaded && <Loader />}
          <style jsx>{Health360Style}</style>


        </Layout >
      </React.Fragment>
    );
  }
};

export default Health360Details;

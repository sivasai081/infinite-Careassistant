import React, { Component } from "react";
import { MDBCard, MDBCardBody, MDBRow, MDBSelect, MDBCol, MDBTypography, MDBIcon, MDBBtn, MDBDataTable } from "mdbreact";
import Health360Style from '../styles/health360.js';
import * as data from '../data/data';
import Layout from "../components/layout";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import axios from 'axios';
import Loader from '../components/loader';
import moment from 'moment';
import Head from 'next/head'
import Link from 'next/link';
import dynamic from 'next/dynamic';
import ReactHighcharts from 'react-highcharts';


class Health360 extends Component {
  constructor(props) {
    super(props);
    const now = Date.now();
    this.state = {
      heartrateobservations: [],
      patientdetails: {},
      supervisorDropdown: [{
        text: "All Time",
        value: "5"
      }],
      health360data: [],
      health360details: '',
      riskscorelist: [],
      health360assessments: [],
      isLoaded: true,
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
        this.setState({riskscorelist: [] }, () => {
        // this.setState({riskscorelist: res.data.json.root }, () => { // commented because no API is there
          this.setState({
            riskscorelistcount: this.state.riskscorelist.total
          });

        });
      })

    axios.get(`/api/health360assessment`, {
      params: {
        id: patientid
      }
    })
      .then(res => {
        this.setState({health360assessments: res.data.json.patient_assessments }, () => {
          this.setState({
            health360assessmentscount: this.state.health360assessments.length
          });

        });
      })

      axios({
        method: 'GET',
        url: `/api/patientdetails`,
        params: {
          id: patientid ,
          
        }
       })
        .then(res => {
          this.setState({ patientdetails: res.data.json });
        })
      
        axios({
          method: 'GET',
          url: `/api/patienthealth360`,
          params: {
            id: patientid,
            
          }
         })
          .then(res => {
            this.setState({ patientfhirdetails: res.data.json.entry[0].resource.id }, ()=>{
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
              .catch((error) => {
                this.setState({ isLoaded: true });
              })
            });
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

  getPatientName = (_id) => {
    return this.state.patientdetails && this.state.patientdetails.root && this.state.patientdetails.root[0].firstname + " " + this.state.patientdetails.root[0].lastname
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
      customData.rows['cost'] = this.getEncounterCost(el.resource.id) && this.getEncounterCost(el.resource.id).filter(e => e != null)[0];





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
      customData.rows['description'] = "Digital Radiography";
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
      customData.rows['type'] = el.assessments.assessment_type;
      customData.rows['status'] = el.status;
      customData.rows['patient_id'] = el.assessments.display_name;
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


  detailsbutton(el) {
    this.setState({
      health360details: el
    });
  }

  componentDidUpdate() {
    localStorage.setItem('health360details', this.state.health360details);
    localStorage.setItem('screenName', "Health360");
  }




  render() {
    let heartrateobservations, bloodsugarobservations, systolicbloodpresureobservations, Diastolicbloodpresureobservations, encounterED = [];
    let observations = this.state.observations;
    let encounters = this.state.encounters;
    heartrateobservations = observations && observations.filter((el) => el.resource.code.coding[0].display == "Heart rate");
    systolicbloodpresureobservations = observations && observations.filter((el) => el.resource.component && el.resource.component[1].code.coding[0].display == "Systolic Blood Pressure");
    Diastolicbloodpresureobservations = observations && observations.filter((el) => el.resource.component && el.resource.component[0].code.coding[0].display == "Diastolic Blood Pressure");
    
    
    let heartratecategories = heartrateobservations && heartrateobservations.map((el)=> moment(el.resource.effectiveDateTime).format("DD/MM/YYYY")); 
    let heartratevalues = heartrateobservations && heartrateobservations.map((el)=> el.resource.valueQuantity.value); 
    
    let bloodpressurecategories = systolicbloodpresureobservations && systolicbloodpresureobservations.map((el)=> moment(el.resource.effectiveDateTime).format("DD/MM/YYYY")); 
    let systolicbloodpressurevalues = systolicbloodpresureobservations && systolicbloodpresureobservations.map((el)=> el.resource.component && el.resource.component[1].valueQuantity.value); 
    let diastolicbloodpressurevalues = Diastolicbloodpresureobservations && Diastolicbloodpresureobservations.map((el)=> el.resource.component && el.resource.component[0].valueQuantity.value); 
    
    bloodsugarobservations = observations && observations.filter((el) => el.resource.code.coding[0].display == "Glucose");
    let bloodsugarcategories = bloodsugarobservations && bloodsugarobservations.map((el)=> moment(el.resource.effectiveDateTime).format("DD/MM/YYYY")); 
    let bloodsugarvalues = bloodsugarobservations && bloodsugarobservations.map((el)=> el.resource.valueQuantity.value); 
    
    const bloodpressure = {
      chart: {
        height: 200,
        type: "spline"
      },
      title: {
        text: ""
      },
      credits: {
        enabled: false
      },
      yAxis: {
        title: {
            style: {
                fontSize: '10px'
            }
        }
      },

      xAxis: {
        categories: bloodpressurecategories,
        labels: {
          style: {
              color: '#424242',
              fontSize: "11px"
          }
       },
        crosshair: true
      },
      plotOptions: {
        series: {
          lineWidth: 1,
          borderRadius: 4
        }
      },
      
      colors: ['#2A2D71', '#DB1962'],
      series: [{
        name: 'Systolic',
        data: systolicbloodpressurevalues,
      },
      {
        name: 'Diastolic',
        data: diastolicbloodpressurevalues,
      }]
    };

    const heartrate = {
      chart: {
        height: 200,
        type: "line"
      },
      title: {
        text: ""
      },
      credits: {
        enabled: false
      },
      yAxis: {
        title: {
            style: {
                fontSize: '10px'
            }
        }
      },

      xAxis: {
        categories: heartratecategories,
        crosshair: true
      },
      plotOptions: {
        series: {
          lineWidth: 1,
          borderRadius: 4
        }
      },
      colors: ['#EA9417'],
      series: [{
        name: 'Heart Rate',
        data: heartratevalues,
      }]
    };
   const bloodsugar = {
      chart: {
        height: 200,
        type: "line"
      },
      title: {
        text: ""
      },
      credits: {
        enabled: false
      },
      yAxis: {
        title: {
            style: {
                fontSize: '10px'
            }
        }
      },

      xAxis: {
        categories: bloodsugarcategories,
        crosshair: true
      },
      plotOptions: {
        series: {
          lineWidth: 1,
          borderRadius: 4
        }
      },
      colors: ['#2CD889'],
      series: [{
        name: 'Blood sugar',
        data: bloodsugarvalues,
      }]
    };
    return (
      <React.Fragment>
      <Head>
          <title>Healthlligence</title>
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <Layout isLoaded={this.state.isLoaded}>


        <div className="tengrid-container view">
          <MDBRow className="kpicards-health360">
            <MDBCol>
              <MDBCard>
                <div className="hoverable">
                  <Link href="/health360details">
                    <MDBCardBody onClick={this.detailsbutton.bind(this, "conditions")}>
                        <div className="icons color-1">
                          <MDBIcon icon="poll" className="white-text" />
                        </div>
                        <MDBTypography
                          tag="h6"
                          variant="h6-responsive"
                          className="align-center kpilabel"
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
                    <div className="icons color-2">
                      <MDBIcon icon="exchange-alt" className="white-text" />
                    </div>
                    <MDBTypography
                      tag="h6"
                      variant="h6-responsive"
                      className="align-center kpilabel"
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
                        <div className="icons color-3">
                          <MDBIcon icon="exclamation-triangle" className="white-text" />
                        </div>
                        <MDBTypography
                          tag="h6"
                          variant="h6-responsive"
                          className="align-center kpilabel"
                        >
                        Risk Scores
              </MDBTypography>
                      <MDBTypography
                        tag="h4"
                        variant="h4-responsive"
                        className="align-center counter-text"
                      >
                        {/* {this.state.riskscorelistcount == undefined ? "0" : this.state.riskscorelistcount} */}
                          3
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
                          <div className="icons color-4">
                            <MDBIcon
                              icon="prescription-bottle-alt"
                              className="white-text"
                            />
                          </div>
                          <MDBTypography
                            tag="h6"
                            variant="h6-responsive"
                            className="align-center kpilabel"
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
                          <div className="icons color-5">
                            <MDBIcon icon="check" className="white-text" />
                          </div>
                          <MDBTypography
                            tag="h6"
                            variant="h6-responsive"
                            className="align-center kpilabel"
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
                  <Link href="/health360details">
                    <MDBCardBody onClick={this.detailsbutton.bind(this, "imaging")}>
                        <div className="icons color-6">
                          <MDBIcon icon="image" className="white-text" />
                        </div>
                        <MDBTypography
                          tag="h6"
                          variant="h6-responsive"
                          className="align-center kpilabel"
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
                        <div className="icons color-7">
                          <MDBIcon icon="file-alt" className="white-text" />
                        </div>
                        <MDBTypography
                          tag="h6"
                          variant="h6-responsive"
                          className="align-center kpilabel"
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
                        <div className="icons color-8">
                          <MDBIcon icon="ban" className="white-text" />
                        </div>
                        <MDBTypography
                          tag="h6"
                          variant="h6-responsive"
                          className="align-center kpilabel"
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
                        <div className="icons color-9">
                          <MDBIcon icon="plus-square" className="white-text" />
                        </div>
                        <MDBTypography
                          tag="h6"
                          variant="h6-responsive"
                          className="align-center kpilabel"
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
                        <div className="icons color-10">
                          <MDBIcon icon="hospital" className="white-text" />
                        </div>
                        <MDBTypography
                          tag="h6"
                          variant="h6-responsive"
                          className="align-center kpilabel"
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
        <MDBRow className="grapghs-health360">
          <MDBCol sm="12" md="12" lg="4" style={{marginBottom:"16px"}}>
            <MDBCard style={{ height: "100%" }}>
              <MDBCardBody>
                <div className="graph-header-details">
                  <div className="icon">
                    <img src="/images/health360kpiicons/bloodpressure.svg" />
                  </div>
                  <div className="header">
                    <div className="title graph-text header-text" >Blood Pressure</div>
                  </div>
                  <div className="dropdown-ele">
                    {/* <MDBSelect
                      options={this.state.supervisorDropdown}
                      // outline
                      selected="All Time"
                      className="month-right-dropdown"
                    /> */}
                  </div>
                </div>

                  {
                    systolicbloodpresureobservations && systolicbloodpresureobservations.length ?
                      <MDBRow>
                        <MDBCol md="12">
                          <ReactHighcharts config={bloodpressure}></ReactHighcharts>
                        </MDBCol> </MDBRow> : 
                        <MDBRow>
                        <MDBCol className="d-flex align-items-center justify-content-center" style={{marginTop: "32px"}}>
                          <div className="img-not-found oneColumn">
                            <img src="/images/NoMatchingRecordsFound.svg" className="not-found-img" />
                            <MDBTypography tag="h6" variant="h6-responsive" className="align-center no-found-text">No Matching Records Found </MDBTypography>
                          </div>
                        </MDBCol>
                      </MDBRow>
                  }

                </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol sm="12" md="12" lg="4" style={{marginBottom:"16px"}}>
            <MDBCard style={{ height: "100%" }}>
              <MDBCardBody>
                <div className="graph-header-details">
                  <div className="icon">
                    <img src="/images/health360kpiicons/heartrate.svg" />
                  </div>
                  <div className="header">
                    <div className="title graph-text header-text" >Heart Rate</div>
                  </div>
                  <div className="dropdown-ele">
                    {/* <MDBSelect
                      options={this.state.supervisorDropdown}
                      // outline
                      selected="All Time"
                      className="month-right-dropdown"
                    /> */}
                  </div>
                </div>
                {

                     heartrateobservations && heartrateobservations.length ? <MDBRow>
                     <MDBCol md="12">
                       <ReactHighcharts config={heartrate}></ReactHighcharts>
                     </MDBCol>
                   </MDBRow>:  <MDBRow>
                        <MDBCol className="d-flex align-items-center justify-content-center" style={{marginTop: "32px"}}>
                          <div className="img-not-found oneColumn">
                            <img src="/images/NoMatchingRecordsFound.svg" className="not-found-img" />
                            <MDBTypography tag="h6" variant="h6-responsive" className="align-center no-found-text">No Matching Records Found </MDBTypography>
                          </div>
                        </MDBCol>
                      </MDBRow>
                }
                
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol sm="12" md="12" lg="4" style={{marginBottom:"16px"}}>
            <MDBCard style={{ height: "100%" }}>
              <MDBCardBody>
                <div className="graph-header-details">
                  <div className="icon">
                    <img src="/images/health360kpiicons/bloodsugar.svg" />
                  </div>
                  <div className="header">
                    <div className="title graph-text header-text" >Blood Sugar</div>
                  </div>
                  <div className="dropdown-ele">
                    {/* <MDBSelect
                      options={this.state.supervisorDropdown}
                      // outline
                      selected="All Time"
                      className="month-right-dropdown"
                    /> */}
                  </div>
                </div>
                {
                  bloodsugarobservations && bloodsugarobservations.length ? 
                  <MDBRow>
                  <MDBCol md="12">
                    <ReactHighcharts config={bloodsugar}></ReactHighcharts>
                  </MDBCol>
                </MDBRow>: <MDBRow>
                        <MDBCol className="d-flex align-items-center justify-content-center" style={{marginTop: "32px"}}>
                          <div className="img-not-found oneColumn">
                            <img src="/images/NoMatchingRecordsFound.svg" className="not-found-img" />
                            <MDBTypography tag="h6" variant="h6-responsive" className="align-center no-found-text">No Matching Records Found </MDBTypography>
                          </div>
                        </MDBCol>
                      </MDBRow>
                }
                
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol sm="12" md="12" lg="4" style={{marginBottom:"16px"}}>
            <MDBCard style={{ height: "100%" }}>
              <MDBCardBody>
                <div className="graph-header-details">
                  <div className="header">
                        <div className="icons-row color-1">
                          <MDBIcon icon="poll" className="white-text" />
                        </div>
                    &nbsp;
                    <div className="title header-text"> Conditions<span className="caption-data">{this.state.conditionscount == undefined ? "-" : this.state.conditionscount}</span></div>
                    {/* <div className="caption-data">{this.state.conditionscount == undefined ? "-" : this.state.conditionscount}</div> */}
                  </div>
                </div>

                <div className="secondColumnTable">
                  {this.state.conditions && this.state.conditions.length ?
                  <>
                    <MDBDataTable
                      small
                      hover={true}
                      responsive={true}
                      paging={false}
                      searching={false}
                      data={this.getConditionsData(this.state.conditions, data.conditionData, 3)}
                    />
                    <div className="text-right button-detail">
                        <Link href="/health360details">
                          <MDBBtn color="" size="sm" className="details-btn" onClick={this.detailsbutton.bind(this, "conditions")}> Details</MDBBtn>
                        </Link>
                    </div>
                    </> 
                    :
                    <MDBRow>
                      <MDBCol className="d-flex align-items-center justify-content-center">
                        <div className="img-not-found">
                          <img src="/images/NoMatchingRecordsFound.svg" className="not-found-img" />
                          <MDBTypography tag="h6" variant="h6-responsive" className="align-center no-found-text">No Matching Records Found </MDBTypography>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  }
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol sm="12" md="12" lg="4" style={{marginBottom:"16px"}}>
            <MDBCard style={{ height: "100%" }}>
              <MDBCardBody>
                <div className="graph-header-details">
                  <div className="header">
                        <div className="icons-row icon-center color-3">
                          <MDBIcon icon="exclamation-triangle" className="white-text" />
                        </div>
                    &nbsp;
                    <div className="title header-text"> Risk Scores<span className="caption-data">
                      {/* {this.state.riskscorelistcount == undefined ? "0" : this.state.riskscorelistcount} */}
                      3
                      </span> </div>
                    {/* <div className="caption-data">{this.state.riskscorelistcount == undefined ? "-" : this.state.riskscorelistcount}</div> */}
                  </div>
                </div>
                <div className="secondColumnTable">
                    <MDBDataTable
                      small
                      hover={true}
                      responsive={true}
                      paging={false}
                      searching={false}
                      data={data.riskScoreData}
                    />
                    <div className="text-right button-detail">
                      <Link href="/health360details">
                        <MDBBtn color="" size="sm" className="details-btn" onClick={this.detailsbutton.bind(this, "riskscore")}> Details</MDBBtn>
                      </Link>
                    </div>

                  </div>
                {/* <div className="secondColumnTable">
                  {this.state.riskscorelist && this.state.riskscorelist.length ?
                  <>
                    <MDBDataTable
                      small
                      hover={true}
                      responsive={true}
                      paging={false}
                      searching={false}
                      data={this.getRiskscoreData(this.state.riskscorelist, data.riskScoreData, 3)}
                    /> 
                    <div className="text-right button-detail">
                      <Link href="/health360details">
                        <MDBBtn color="" size="sm" className="details-btn" onClick={this.detailsbutton.bind(this, "riskscore")}> Details</MDBBtn>
                      </Link>
                    </div>
                    </>
                    :
                    <MDBRow>
                      <MDBCol className="d-flex align-items-center justify-content-center">
                        <div className="img-not-found">
                          <img src="/images/NoMatchingRecordsFound.svg" className="not-found-img" />
                          <MDBTypography tag="h6" variant="h6-responsive" className="align-center no-found-text">No Matching Records Found </MDBTypography>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  }
                </div> */}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol sm="12" md="12" lg="4" style={{marginBottom:"16px"}}>
            <MDBCard style={{ height: "100%" }}>
              <MDBCardBody>
                <div className="graph-header-details">
                  <div className="header">
                          <div className="icons-row color-4">
                            <MDBIcon  icon="prescription-bottle-alt"  className="white-text" />
                          </div>
                    &nbsp;
                    <div className="title header-text"> Medications<span className="caption-data">{this.state.medicationscount == undefined ? "-" : this.state.medicationscount}</span></div>
                    {/* <div className="caption-data">{this.state.medicationscount == undefined ? "-" : this.state.medicationscount}</div> */}
                  </div>
                </div>
                <div className="secondColumnTable">
                  {this.state.medications && this.state.medications.length ?
                  <>
                    <MDBDataTable
                      small
                      hover={true}
                      responsive={true}
                      paging={false}
                      searching={false}
                      data={this.getMedicationsData(this.state.medications, data.medicationsData, 2)}
                    />
                    <div className="text-right button-detail">
                      <Link href="/health360details">
                        <MDBBtn color="" size="sm" className="details-btn" onClick={this.detailsbutton.bind(this, "medications")}> Details</MDBBtn>
                      </Link>
                    </div>
                  </>
                    :
                    <MDBRow>
                      <MDBCol className="d-flex align-items-center justify-content-center">
                        <div className="img-not-found">
                          <img src="/images/NoMatchingRecordsFound.svg" className="not-found-img" />
                          <MDBTypography tag="h6" variant="h6-responsive" className="align-center no-found-text">No Matching Records Found </MDBTypography>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  }
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol sm="12" md="12" lg="6" style={{marginBottom:"16px"}}>
            <MDBCard style={{ height: "100%" }}>
              <MDBCardBody>
                <div className="graph-header-details">
                  <div className="header">
                    <div className="icons-row color-5">
                      <MDBIcon icon="check" className="white-text" />
                    </div>
                    &nbsp;
                    <div className="title header-text"> Observations<span className="caption-data">{this.state.observationscount == undefined ? "-" : this.state.observationscount}</span></div>
                    {/* <div className="caption-data">{this.state.observationscount == undefined ? "-" : this.state.observationscount}</div> */}
                  </div>
                </div>
                <div className="thirdColumnTable">
                  {this.state.observations && this.state.observations.length ?
                  <>
                    <MDBDataTable
                      maxHeight="200px"
                      small
                      hover={true}
                      responsive={true}
                      paging={false}
                      searching={false}
                      data={this.getObservationData(this.state.observations, data.ObservationsData, 3)}
                    />
                    <div className="text-right button-detail">
                      <Link href="/health360details">
                        <MDBBtn color="" size="sm" className="details-btn" onClick={this.detailsbutton.bind(this, "observations")}> Details</MDBBtn>
                      </Link>
                    </div>
                    </>
                    :
                    <MDBRow>
                      <MDBCol className="d-flex align-items-center justify-content-center">
                        <div className="img-not-found twoColumns">
                          <img src="/images/NoMatchingRecordsFound.svg" className="not-found-img" />
                          <MDBTypography tag="h6" variant="h6-responsive" className="align-center no-found-text">No Matching Records Found </MDBTypography>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  }
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol sm="12" md="12" lg="6" style={{marginBottom:"16px"}}>
            <MDBCard style={{ height: "100%" }}>
              <MDBCardBody>
                <div className="graph-header-details">
                  <div className="header">
                        <div className="icons-row icon-center color-10">
                          <MDBIcon icon="hospital" className="white-text" />
                        </div>
                    &nbsp;
                    <div className="title header-text"> Procedures<span className="caption-data">{this.state.Procedurescount == undefined ? "-" : this.state.Procedurescount}</span></div>
                    {/* <div className="caption-data">{this.state.Procedurescount == undefined ? "-" : this.state.Procedurescount}</div> */}
                  </div>
                </div>

                {this.state.procedures && this.state.procedures.length ?
                <>
                  <div className="thirdColumnTable">
                    <MDBDataTable
                      small
                      hover={true}
                      responsive={true}
                      paging={false}
                      searching={false}
                      data={this.getProceduresData(this.state.procedures, data.procedureData, 4)}
                    />
                  </div>
                  <div className="text-right button-detail">
                    <Link href="/health360details">
                      <MDBBtn color="" size="sm" className="details-btn" onClick={this.detailsbutton.bind(this, "procedures")}> Details</MDBBtn>
                    </Link>
                  </div>
                </>
                  :
                  <MDBRow>
                    <MDBCol className="d-flex align-items-center justify-content-center">
                      <div className="img-not-found twoColumns">
                        <img src="/images/NoMatchingRecordsFound.svg" className="not-found-img" />
                        <MDBTypography tag="h6" variant="h6-responsive" className="align-center no-found-text">No Matching Records Found </MDBTypography>
                      </div>
                    </MDBCol>
                  </MDBRow>
                }

              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="12" style={{marginBottom:"16px"}}>
            <MDBCard style={{ height: "100%" }}>
              <MDBCardBody>
                <div className="graph-header-details">
                  <div className="header">
                    <div className="icons-row color-2">
                      <MDBIcon icon="exchange-alt" className="white-text" />
                    </div>
                    &nbsp;
                    <div className="title header-text"> Encounters <span className="caption-data">{this.state.encounterscount == undefined ? "-" : this.state.encounterscount}</span></div>
                    {/* <div className="caption-data">{this.state.encounterscount == undefined ? "-" : this.state.encounterscount}</div> */}
                  </div>
                </div>

                <div className="seventhColumnTable">
                  {this.state.encounters && this.state.encounters.length ?
                  <>
                    <MDBDataTable
                      small
                      hover={true}
                      responsive={true}
                      paging={false}
                      searching={false}
                      data={this.getEncountersData(this.state.encounters, data.encountersData, 6)}
                    />
                    <div className="text-right button-detail">
                      <Link href="/health360details">
                        <MDBBtn color="" size="sm" className="details-btn" onClick={this.detailsbutton.bind(this, "encounters")}> Details</MDBBtn>
                      </Link>
                    </div>
                  </>
                    :
                    <MDBRow>
                      <MDBCol className="d-flex align-items-center justify-content-center">
                        <div className="img-not-found oneColumn">
                          <img src="/images/NoMatchingRecordsFound.svg" className="not-found-img" />
                          <MDBTypography tag="h6" variant="h6-responsive" className="align-center no-found-text">No Matching Records Found </MDBTypography>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  }
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="12" style={{marginBottom:"16px"}}>
            <MDBCard style={{ height: "100%" }}>
              <MDBCardBody>
                <div className="graph-header-details">
                  <div className="header">
                        <div className="icons-row color-7">
                          <MDBIcon icon="file-alt" className="white-text" />
                        </div>
                    &nbsp;
                    <div className="title header-text"> Assessments <span className="caption-data">{this.state.health360assessmentscount == undefined ? "-" : this.state.health360assessmentscount}</span></div>
                    {/* <div className="caption-data">{this.state.health360assessmentscount == undefined ? "-" : this.state.health360assessmentscount}</div> */}
                  </div>
                </div>
                <div className="secondColumnTable">
                  {this.state.health360assessments && this.state.health360assessments.length ?
                  <>
                    <MDBDataTable
                      maxHeight="280px"
                      small
                      hover={true}
                      responsive={true}
                      paging={false}
                      searching={false}
                      data={this.getAssessmentData(this.state.health360assessments, data.assessmentData, 5)}
                    />
                    <div className="text-right button-detail">
                      <Link href="/health360details">
                        <MDBBtn color="" size="sm" className="details-btn" onClick={this.detailsbutton.bind(this, "assessments")}> Details</MDBBtn>
                      </Link>
                    </div>
                  </>
                    :
                    <MDBRow>
                      <MDBCol className="d-flex align-items-center justify-content-center">
                        <div className="img-not-found oneColumn">
                          <img src="/images/NoMatchingRecordsFound.svg" className="not-found-img" />
                          <MDBTypography tag="h6" variant="h6-responsive" className="align-center no-found-text">No Matching Records Found </MDBTypography>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  }
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol sm="12" md="12" lg="4" style={{marginBottom:"16px"}}>
            <MDBCard style={{ height: "100%" }}>
              <MDBCardBody>
                <div className="graph-header-details">
                  <div className="header">
                    <div className="icons-row color-8">
                      <MDBIcon icon="ban" className="white-text" />
                    </div>
                    &nbsp;
                    <div className="title header-text"> Allergies <span className="caption-data">{this.state.allergiescount == undefined ? "-" : this.state.allergiescount}</span></div>
                    {/* <div className="caption-data">{this.state.allergiescount == undefined ? "-" : this.state.allergiescount}</div> */}
                  </div>
                </div>
                <div className="secondColumnTable">
                  {this.state.allergies && this.state.allergies.length ?
                  <>
                    <MDBDataTable
                      small
                      hover={true}
                      responsive={true}
                      paging={false}
                      searching={false}
                      data={this.getAllergiesData(this.state.allergies, data.allergiesData, 4)}

                    />
                    <div className="text-right button-detail">
                      <Link href="/health360details">
                        <MDBBtn color="" size="sm" className="details-btn" onClick={this.detailsbutton.bind(this, "allergies")}> Details</MDBBtn>
                      </Link>
                    </div>
                  </>
                    :
                    <MDBRow>
                      <MDBCol className="d-flex align-items-center justify-content-center">
                        <div className="img-not-found threeColumn">
                          <img src="/images/NoMatchingRecordsFound.svg" className="not-found-img" />
                          <MDBTypography tag="h6" variant="h6-responsive" className="align-center no-found-text">No Matching Records Found </MDBTypography>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  }
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol sm="12" md="12" lg="4" style={{marginBottom:"16px"}}>
            <MDBCard style={{ height: "100%" }}>
              <MDBCardBody>
                <div className="graph-header-details">
                  <div className="header">
                        <div className="icons-row color-9">
                          <MDBIcon icon="plus-square" className="white-text" />
                        </div>
                    &nbsp;
                    <div className="title header-text"> Immunizations<span className="caption-data">{this.state.Immunizationscount == undefined ? "-" : this.state.Immunizationscount}</span></div>
                    {/* <div className="caption-data">{this.state.Immunizationscount == undefined ? "-" : this.state.Immunizationscount}</div> */}
                  </div>
                </div>
                <div className="secondColumnTable">
                  {this.state.immunization && this.state.immunization.length ?
                  <>
                    <MDBDataTable
                      small
                      hover={true}
                      responsive={true}
                      paging={false}
                      searching={false}
                      data={this.getImmunizationData(this.state.immunization, data.immunizationData, 3)}
                    />
                    <div className="text-right button-detail">
                      <Link href="/health360details">
                        <MDBBtn color="" size="sm" className="details-btn" onClick={this.detailsbutton.bind(this, "immunizations")}> Details</MDBBtn>
                      </Link>
                    </div>
                  </>
                    :
                    <MDBRow>
                      <MDBCol className="d-flex align-items-center justify-content-center">
                        <div className="img-not-found threeColumn">
                          <img src="/images/NoMatchingRecordsFound.svg" className="not-found-img" />
                          <MDBTypography tag="h6" variant="h6-responsive" className="align-center no-found-text">No Matching Records Found </MDBTypography>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  }
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol sm="12" md="12" lg="4" style={{marginBottom:"16px"}}>
            <MDBCard style={{ height: "100%" }}>
              <MDBCardBody>
                <div className="graph-header-details">
                  <div  className="header">
                    <div className="icons-row color-6">
                      <MDBIcon icon="image" className="white-text" />
                    </div>
                    &nbsp;
                    <div className="title header-text"> Imaging <span className="caption-data">{this.state.imagingcount == undefined ? "-" : this.state.imagingcount}</span></div>
                    {/* <div className="caption-data">{this.state.imagingcount == undefined ? "-" : this.state.imagingcount}</div> */}
                  </div>
                </div>
                <div className="secondColumnTable">
                  {this.state.imaging && this.state.imaging.length ?
                  <>
                    <MDBDataTable
                      small
                      hover={true}
                      responsive={true}
                      paging={false}
                      searching={false}
                      data={data.imagingData}
                      data={this.getImagingData(this.state.imaging, data.imagingData, this.state.imagingcount)}
                    />
                    <div className="text-right button-detail">
                      <Link href="/health360details">
                        <MDBBtn color="" size="sm" className="details-btn" onClick={this.detailsbutton.bind(this, "imaging")}> Details</MDBBtn>
                      </Link>
                    </div>
                  </>
                    :
                    <MDBRow>
                      <MDBCol className="d-flex align-items-center justify-content-center">
                        <div className="img-not-found threeColumn">
                          <img src="/images/NoMatchingRecordsFound.svg" className="not-found-img" />
                          <MDBTypography tag="h6" variant="h6-responsive" className="align-center no-found-text">No Matching Records Found </MDBTypography>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  }
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        {this.state.isLoaded && <Loader />}
        <style jsx>{Health360Style}</style>
      </Layout>
      </React.Fragment>
    );
  }
};

export default Health360;

import React, { Component } from "react";
import { MDBBtn, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBTypography, MDBIcon, MDBTimeline, MDBTimelineStep, MDBInput, MDBNav, MDBNavItem, MDBNavLink, MDBTabContent, MDBTabPane } from "mdbreact";
import TimelineStyle from '../styles/timelinestyle.js';
import Layout from "../components/layout";
import Loader from '../components/loader';
import Head from 'next/head'
import {
  StaticRouter,
} from "react-router-dom";
import dynamic from 'next/dynamic'
import MDBFullCalendar from 'mdb-full-calendar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import FullCalendar from '../components/FullCalendar';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';
const ChartWithNoSSR = dynamic(
  () => import('../components/chart'),
  { ssr: false }
)

// const history = createMemoryHistory();

class TimeLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timelinedata: [],
      timelinedatapagination: [],
      graphData: [],
      health360data: [],
      riskscorelist: [],
      health360assessments: [],
      isLoaded: true,
      tasks: [
        {
          id: 'task1',
          title: 'Today',
          startDate: new Date().setHours(0, 0, 0),
          endDate: new Date().setHours(23, 59, 59),
          color: 'danger',
          dark: true,
          link: true,
          to: 'test',
        },
        {
          id: 'task2',
          title: 'Today',
          startDate: new Date().setDate(2),
          endDate: new Date().setDate(15),
          color: 'info',
          link: true,
          to: 'test1',
        },
        {
          id: 'task3',
          title: 'Task name',
          startDate: new Date().setDate(2),
          endDate: new Date().setDate(15),
          color: 'warning',
          dark: true,
          link: true,
          to: 'test2',
        }
      ],
      totalCountofrecords: 100,
      pageFrom: 1,
      perPage: 10,
      page: 1,
      searchedText: '',
      activeItemJustified: "1"
    }
  }


  handleMonths = val => {

  }

  handlePageChange = (e, val) => {
    this.setState({
      pageFrom: ((val * this.state.perPage) - (this.state.perPage - 1)),
      page: val
    }, () => {
      let timelinedatapagination = this.paginate(this.state.timelinedata, this.state.perPage, this.state.page)
      this.setState({ timelinedatapagination })
    });
  }

  toggleJustified = tab => e => {
    if (this.state.activeItemJustified !== tab) {
      this.setState({
        activeItemJustified: tab
      });
    }
  };

  componentDidMount() {
    let patientid = localStorage.getItem('patientId');
    let caremnagerId = localStorage.getItem('caremanagerId');
    axios({
      method: 'GET',
      url: `/api/appointments`,
      params: {
        id: caremnagerId,
        role: "CAREMANAGER"
      }
    })
      .then(res => {
        this.setState({ allappointments: res.data.json.details});
      })


    axios.get(`/api/riskscore`, {
      params: {
        id: patientid
      }
    })
      .then(res => {
        this.setState({ riskscorelist: [] }, () => {
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
                  timelinecomponentdata: [...encounters, ...immunization, ...observations, ...conditions, ...imaging, ...allergies, ...procedures, ...medications],
                  timelinedata: [...encounters, ...immunization, ...observations, ...conditions, ...imaging, ...allergies, ...procedures, ...medications],
                  timelinedatapagination: [...encounters, ...immunization, ...observations, ...conditions, ...imaging, ...allergies, ...procedures, ...medications],
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
                }, () => {
                  let timelinedatapagination = this.paginate(this.state.timelinedata, this.state.perPage, this.state.page)
                  this.setState({
                    totalCountofrecords: this.state.timelinedata.length,
                    timelinedatapagination,
                    isLoaded: false
                  });
                });
              });
            });
        });
      })
      .catch((error) => {
        this.setState({ isLoaded: true });

      })
  }

  handleSearch = _e => {
    this.setState({ searchedText: _e.target.value }, () => {
      const filteredData = this.state.timelinecomponentdata.filter(value => {
        const searchStr = this.state.searchedText.toLowerCase();
        const nameMatches = value.resource.resourceType.toLowerCase().includes(searchStr);
        const typeMatches = value.resource && value.resource.type && value.resource.type[0] && value.resource.type[0].coding && value.resource.type[0].coding[0].display.toLowerCase().includes(searchStr);
        const disaplayMatches = value.resource && value.resource.serviceProvider && value.resource.serviceProvider.display.toLowerCase().includes(searchStr);
        const reasonCodeMatches = value.resource && value.resource.reasonCode && value.resource.reasonCode[0] && value.resource.reasonCode[0].coding[0] && value.resource.reasonCode[0].coding[0].display.toLowerCase().includes(searchStr);
        const observationdisplayMatches = value.resource && value.resource.code && value.resource.code.coding && value.resource.code.coding[0].display.toLowerCase().includes(searchStr);

        return nameMatches || typeMatches || disaplayMatches || reasonCodeMatches || observationdisplayMatches;
      });
      this.setState({ timelinedata: filteredData }, () => {
        let timelinedatapagination = this.paginate(this.state.timelinedata, this.state.perPage, this.state.page)
        this.setState({
          totalCountofrecords: this.state.timelinedata.length,
          timelinedatapagination
        });
      });

    })
  }



  paginate = (array, page_size, page_number) => {
    array && array.forEach((el) => {
      if (el.resource.resourceType == "Encounter") {
        el.resource.date = moment(el.resource.period.start).format("MM/DD/YYYY hh:mm")
        el.resource.count = this.state.encounterscount
      }
      if (el.resource.resourceType == "Immunization") {
        el.resource.date = moment(el.resource.occurrenceDateTime).format("MM/DD/YYYY hh:mm")
        el.resource.count = this.state.Immunizationscount
      }
      if (el.resource.resourceType == "Observation") {
        el.resource.date = moment(el.resource.effectiveDateTime).format("MM/DD/YYYY hh:mm")
        el.resource.count = this.state.observationscount
      }
      if (el.resource.resourceType == "Procedure") {
        el.resource.date = moment(el.resource.performedPeriod.start).format("MM/DD/YYYY hh:mm")
        el.resource.count = this.state.Procedurescount
      }
      if (el.resource.resourceType == "Condition") {
        el.resource.date = moment(el.resource.onsetDateTime).format("MM/DD/YYYY hh:mm")
        el.resource.count = this.state.conditionscount
      }
      if (el.resource.resourceType == "MedicationRequest") {
        el.resource.date = moment(el.resource.authoredOn).format("MM/DD/YYYY hh:mm")
        el.resource.count = this.state.medicationscount
      }
      if (el.resource.resourceType == "ImagingStudy") {
        el.resource.date = moment(el.resource.started).format("MM/DD/YYYY hh:mm")
        el.resource.count = this.state.imagingcount
      }
      if (el.resource.resourceType == "AllergyIntolerance") {
        el.resource.date = moment(el.resource.recordedDate).format("MM/DD/YYYY hh:mm")
        el.resource.count = this.state.allergiescount
      }
    })

    array.sort(function (a, b) {
      return new Date(b.resource.date) - new Date(a.resource.date);
    })
    this.setState({
      graphData: array
    })
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }
  searchMedicationReason = (item, _id) => {
    let codeCost = item.filter(itm => itm.reference.split(":")[2] == _id);
    if (codeCost) {
      return codeCost[0].display;
    }
    else return null;
  }
  searchMedication = (nameKey, myArray) => {
    return myArray.some(itm => itm.reference.split(":")[2] === nameKey)
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
      return value + "cm";
    } else {
      return null;
    }
  }

  detailsbutton(el) {
    this.setState({
      health360details: el
    });
  }

  componentDidUpdate() {
    localStorage.setItem('health360details', this.state.health360details);
    localStorage.setItem('screenName', "Timeline");
  }

  render() {
    let appointments = this.state.allappointments;
    let appointmenttasks = appointments && appointments.map((el) => {
      return {
        id: el.id,
        title: moment(el.start_date).format('LT') + " " + el.title,
        start: el.start_date,
        end: el.end_date,
        color: el.appointment_type == "Doctor Appointment" ? "#DB1962" : el.appointment_type == "ICT" ? "#7cb342" : "#536dfe"
      }

    });

    const arrOfObjects = [
      { color: 'elegant-color', title: 'Test', dark: true },
      { color: 'danger-color', title: 'Test1', dark: false },
      { color: 'warning-color', title: 'Meeting', dark: false },
      { color: 'success-color', title: 'Home', dark: false },
      { color: 'info-color', title: 'Lunch', dark: false },
      { color: 'default-color', title: 'Something', dark: false },
      { color: 'primary-color', title: 'Pool', dark: false },
      { color: 'secondary-color', title: 'Footbal', dark: true },
    ];
    const chartdetails = {
      chart: {
        type: 'column',
        zoomType: 'x',
        style: {
          fontFamily: 'Open Sans',
          fontSize: "14px"
        }
      },
      credits: {
        enabled: false
      },
      title: {
        text: ''
      },
      yAxis: {
        title: {
          text: 'Count'
        }
      },
      plotOptions: {
        column: {
          stacking: 'normal'
        }
      },
      colors: ['#6C6C6C', '#000', '#DB1962', '#B018D9', '#FFC400', '#2A712D'],
      xAxis: {
        categories: ["2020-09-01", "2020-09-02", "2020-09-03", "2020-09-04", "2020-09-05", "2020-09-06", "2020-09-07", "2020-09-08", "2020-09-09", "2020-09-10"]
      },
      series: [{
        name: 'Allergy',
        data: [10, 20, 10, 15, 10, 30, 5, 10, 28, 10]
      }, {
        name: 'Medications',
        data: [20, 30, 20, 15, 10, 40, 5, 20, 38, 20]
      },
      {
        name: 'Conditions',
        data: [10, 20, 10, 15, 10, 30, 5, 10, 28, 10]
      }, {
        name: 'Observations',
        data: [20, 30, 20, 15, 10, 40, 5, 20, 38, 20]
      }, {
        name: 'Immunizations',
        data: [10, 20, 10, 15, 10, 30, 5, 10, 28, 10]
      }, {
        name: 'Encounters',
        data: [20, 30, 20, 15, 10, 40, 5, 20, 38, 20]
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
                    <Link href="/health360details" >
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
          {/* Version 10 */}
          <StaticRouter>
            <MDBRow className='timeline-graph'>
              <MDBCol md="12">
                <MDBCard>
                  <MDBCardBody>

                    <MDBNav tabs className="nav-justified">
                      <MDBNavItem>
                        <MDBNavLink link to="#" className={this.state.activeItemJustified === "1" ? "tabchartcss" : ""} active={this.state.activeItemJustified === "1"} onClick={this.toggleJustified("1")} role="tab" >
                          Chart
                        </MDBNavLink>
                      </MDBNavItem>
                      <MDBNavItem>
                        <MDBNavLink link to="#" className={this.state.activeItemJustified === "2" ? "tabcalendarcss" : ""} active={this.state.activeItemJustified === "2"} onClick={this.toggleJustified("2")} role="tab" >
                          Calendar
                        </MDBNavLink>
                      </MDBNavItem>

                    </MDBNav>
                    <MDBTabContent

                      activeItem={this.state.activeItemJustified}
                    >
                      <MDBTabPane tabId="1" role="tabpanel">

                        <ChartWithNoSSR data={this.state.graphData} isHighChart={true} />
                       

                      </MDBTabPane>
                      <MDBTabPane tabId="2" role="tabpanel">
                        <FullCalendar
                          defaultView="dayGridMonth"
                          timeZone='UTC'
                          headerToolbar={{
                            left: 'prev,next,today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                          }}
                          events={appointmenttasks}
                        />
                      </MDBTabPane>

                    </MDBTabContent>

                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

            </MDBRow>
          </StaticRouter>
          <MDBRow className='mt-2' style={{ marginBottom: "-16px" }}>

            <MDBCol md="4" className="mt-4">

              <MDBTypography tag="h4" variant="h4-responsive" className="timeline-header-month">August 2020</MDBTypography>
            </MDBCol>
            <MDBCol md="4" className="mt-2">
            </MDBCol>
            <MDBCol md="4" className="search-timeline">



              <div class="custom_search_container" style={{ marginTop: "25px" }}>
                <MDBIcon icon="search" className="custom_search_icon" style={{ color: "#424242" }} />
                <input placeholder="Search" id="searching" className="custom_search_bar" type="text" value={this.state.searchedText} onChange={this.handleSearch.bind(this)}></input>
              </div>

              
            </MDBCol>

            


          </MDBRow>



          <MDBRow className="timeline-container" style={{ marginTop: "-32px" }}>
            <MDBCol md="12">
              <MDBTimeline>
                {
                  this.state.timelinedatapagination && this.state.timelinedatapagination.map((el) => {
                    if (el.resource.resourceType == "Encounter") {
                      return (
                        <MDBTimelineStep inverted color="indigo accent-2" icon="exchange-alt">
                          <p className="w-responsive">{moment(el.resource.period.start).format("MM/DD/YYYY")} - {moment(el.resource.period.end).format("MM/DD/YYYY hh:mm A")} <span className="timelineencounterviewmore">
                            {/* <MDBBtn color="" size="sm" className="viewmore-btn"> view more</MDBBtn> */}
                          </span></p>
                          <h6 variant="h6-responsive" style={{ color: "#536dfe" }}>{el.resource.resourceType}</h6>
                          <h5 variant="h5-responsive">{el.resource && el.resource.type && el.resource.type[0].coding[0].display} - {el.resource.serviceProvider.display}</h5>
                          <span className="w-responsive" style={{ fontSize: "14px" }}>{el.resource && el.resource.reasonCode && el.resource.reasonCode[0].coding[0].display ? el.resource.reasonCode[0].coding[0].display : "N/A"} </span>
                          <span className="timelineencountercoststyle" style={{ fontSize: "14px" }}> {this.getEncounterCost(el.resource.id) && this.getEncounterCost(el.resource.id).filter(e => e != null)[0]}</span>
                        </MDBTimelineStep>
                      )
                    }
                    if (el.resource.resourceType == "Immunization") {
                      return (
                        <MDBTimelineStep inverted color="light-green darken-1" icon="plus-square">
                          <p className="w-responsive">{moment(el.resource.occurrenceDateTime).format("MM/DD/YYYY hh:mm A")}</p>
                          <h6 variant="h6-responsive" style={{ color: "#7CB342" }}>{el.resource.resourceType}</h6>
                          <h5 variant="h5-responsive">{el.resource.vaccineCode.coding[0].display}</h5>

                        </MDBTimelineStep>
                      )
                    }
                    if (el.resource.resourceType == "Observation") {
                      return (
                        <MDBTimelineStep inverted color="teal darken-1" icon="check">
                          <p className="w-responsive">{moment(el.resource.effectiveDateTime).format("MM/DD/YYYY hh:mm A")}</p>
                          <h6 variant="h6-responsive" style={{ color: "#00897b" }}>{el.resource.resourceType}</h6>
                          <h5 variant="h5-responsive">{el.resource.code.coding[0].display}</h5>
                          <span style={{ marginTop: "12px", fontSize: "14px" }}>  {this.getObservationCost(el.resource.valueQuantity && el.resource.valueQuantity.value)}</span>
                        </MDBTimelineStep>
                      )
                    }
                    if (el.resource.resourceType == "Procedure") {
                      return (
                        <MDBTimelineStep inverted color="light-blue lighten-1" icon="hospital">
                          <p className="w-responsive">{moment(el.resource.performedPeriod.start).format("MMM\/DD/YYYY hh:mm A")}</p>
                          <h6 variant="h6-responsive" style={{ color: "#29B6F6" }}>{el.resource.resourceType}</h6>
                          <h5 variant="h5-responsive">{el.resource.code.coding[0].display}</h5>

                        </MDBTimelineStep>
                      )
                    }
                    if (el.resource.resourceType == "Condition") {
                      return (
                        <MDBTimelineStep inverted color="red accent-1" icon="poll">
                          <p className="w-responsive" >{moment(el.resource.onsetDateTime).format("MM/DD/YYYY hh:mm A")}</p>
                          <h6 variant="h6-responsive" style={{ color: "#FF8A80" }}>{el.resource.resourceType}</h6>
                          <h5 variant="h5-responsive">{el.resource.code.coding[0].display}</h5>

                        </MDBTimelineStep>
                      )
                    }
                    if (el.resource.resourceType == "MedicationRequest") {
                      return (
                        <MDBTimelineStep inverted color="green darken-2" icon="prescription-bottle-alt">
                          <p className="w-responsive">{moment(el.resource.authoredOn).format("MM/DD/YYYY hh:mm A")}</p>
                          <h6 variant="h6-responsive" style={{ color: "#388E3C" }}>{el.resource.resourceType}</h6>
                          <h5 variant="h5-responsive">{el.resource.medicationCodeableConcept.coding[0].display}</h5>
                          <span className="w-responsive"> {el.resource && el.resource.reasonReference ? this.getMedicationReason(el.resource && el.resource.reasonReference && el.resource.reasonReference[0].reference.split(":")[2]) : "N/A"} </span>
                        </MDBTimelineStep>
                      )
                    }
                    if (el.resource.resourceType == "ImagingStudy") {
                      return (
                        <MDBTimelineStep inverted color="light-blue darken-2" icon="image">
                          <p className="w-responsive">{moment(el.resource.started).format("MM/DD/YYYY hh:mm A")}</p>
                          <h6 variant="h6-responsive" style={{ color: "#0288D1" }}>{el.resource.resourceType}</h6>
                        </MDBTimelineStep>
                      )
                    }

                    if (el.resource.resourceType == "AllergyIntolerance") {
                      return (
                        <MDBTimelineStep inverted color="grey" icon="ban">
                          <p className="w-responsive" >{moment(el.resource.recordedDate).format("MM/DD/YYYY hh:mm A")}</p>
                          <h6 variant="h6-responsive" style={{ color: "#9E9E9E" }}>Allergy</h6>
                          <h5 variant="h5-responsive">{el.resource.code && el.resource.code.coding[0] && el.resource.code.coding[0].display}</h5>
                        </MDBTimelineStep>
                      )
                    }
                  })
                }

              </MDBTimeline>
            </MDBCol>
          </MDBRow>

          <div className="pagination-container" style={{ marginLeft: "60px" }}>
            <Pagination count={Math.ceil(this.state.totalCountofrecords / this.state.perPage)} page={this.state.page} color="primary" onChange={this.handlePageChange} />
          </div>
          {this.state.isLoaded && <Loader />}
          <style jsx>{TimelineStyle}</style>
        </Layout>
      </React.Fragment>
    );
  }
};

export default TimeLine;

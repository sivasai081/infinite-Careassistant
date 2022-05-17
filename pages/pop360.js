
import React, { Component } from "react";
import Layout from "../components/layout";
import pop360Style from '../styles/pop360Style'
import dynamic from 'next/dynamic'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import * as data from '../data/data';
import ReactHighcharts from 'react-highcharts';
import Link from 'next/link';
import axios from 'axios';
import moment from 'moment';
import Loader from '../components/loader';
import Head from 'next/head'
import SolidGauge from '../components/solid';
import { MDBRow, MDBCol, MDBTypography, MDBCard, MDBCardBody, MDBContainer, MDBSelect, MDBDatePicker, MDBIcon, MDBBtn, MDBDataTable, MDBTable, MDBProgress } from "mdbreact";
const Plot = dynamic(
  () => import('react-plotly.js'),
  { ssr: false }
)

class Pop360 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: true,
      measuresDropdown: [
        { text: "Lung Cancer", value: "1" },
        { text: "Breast Cancer", value: "2" }
      ],
      supervisorDropdown: [{
        text: "Supervisor",
        value: "Supervisor",
        checked: true
      },
      {
        text: "Care Manager",
        value: "CareManager"
      },
      {
        text: "Care Coordinator",
        value: "Care Coordinator"
      }],
      caremanagerDropdown: [{
        text: "Care Manager",
        checked: true,
        value: "CareManager"
      }, {
        disabled: true,
        text: "Supervisor"
      },
      {
        text: "Care Coordinator",
        value: "Care Coordinator"
      }],
      carecoordinatorDropdown: [{
        checked: true,
        text: "Care Coordinator",
        value: "Care Coordinator"
      }, {
        disabled: true,
        text: "Supervisor"
      }, {
        disabled: true,
        text: "Care Manager"
      }],

      alldayDropdown: [{
        text: "Last Day",
        value: "1"
      }, {
        text: "Last Week",
        value: "1"
      }, {
        text: "Last Month",
        value: "1"
      }, {
        text: "Last 3 Months",
        value: "1"
      }, {
        text: "Last 6 Months",
        value: "1"
      }, {
        text: "Last Year",
        value: "1"
      }, {
        text: "All Time",
        value: "1"
      }],
      layout: { barmode: 'group' },
      teamData: {
        columns: [
          {
            label: 'Type',
            field: 'cmt',
            sort: 'asc',

          },
          {
            label: 'Status',
            field: 'nochange',
            sort: 'asc',
          },
          {
            label: 'Patient Amount',
            field: 'type',
            sort: 'asc',
          },
        ],
        rows: [
          {
            cmt: 'High Priority Patients',
            nochange: '-20',
            type: '200',
          },
          {
            cmt: 'Automated Careplans',
            nochange: '+20',
            type: '75',
          },
          {
            cmt: 'Unassigned Patient',
            nochange: '+20',
            type: '140',
          },
          {
            cmt: 'Pending Actions',
            nochange: 'No Change',
            type: '200',
          },
        ]
      },
      lungcancerData: data.lungcancerData
    }
  }
  componentDidMount() {
    let rolename = localStorage.getItem("role");
    this.setState({
      rolename: rolename
    })
    let patientIds = []; let encounterED = []; let totaledcategories = []; let totaljanclaimcategories = []; let totalfebclaimcategories = []; let totalmarclaimcategories = [];
    let totalaprclaimcategories = []; let totalmayclaimcategories = []; let totaljunclaimcategories = []; let totaljulclaimcategories = []; let totalaugclaimcategories = []; let totalsepclaimcategories = []; let totaloctclaimcategories = []; let totalnovclaimcategories = []; let totaldecclaimcategories = [];
    let totalencounteradmission = [];
    let caremnagerId = localStorage.getItem('caremanagerId');
    axios({
      method: 'GET',
      url: `/api/telemedicine`,
      params: {
        id: caremnagerId
      }
    })
      .then((response) => {
        let patientdetailsresponse = response && response.data && response.data.json;
        patientdetailsresponse.members.map((el) => {
          patientIds.push(el.patient_id);
          axios.get(`/api/patienthealth360`, {
            params: {
              id: el.patient_id
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
                  .then((res) => {
                    this.setState({
                      health360data: res.data.json.entry
                    }, () => {
                      let encounters = this.state.health360data.filter(el => el.resource.resourceType == "Encounter");
                      let claims = this.state.health360data.filter(el => el.resource.resourceType == "Claim");
                      //ED Overview Encounter 
                      encounterED = encounters && encounters.filter((el) => el.resource.type && el.resource.type[0].coding[0].display == "Emergency room admission (procedure)");
                      let edcategories = encounterED && encounterED.map((el) => moment(el.resource.period.start).format("MMM"));
                      totaledcategories.push(...edcategories);
                      let janedcategories = totaledcategories && totaledcategories.filter(function (value) { return value === "Jan" }).length;
                      let febedcategories = totaledcategories && totaledcategories.filter(function (value) { return value === "Feb" }).length;
                      let maredcategories = totaledcategories && totaledcategories.filter(function (value) { return value === "Mar" }).length;
                      let apredcategories = totaledcategories && totaledcategories.filter(function (value) { return value === "Apr" }).length;
                      let mayedcategories = totaledcategories && totaledcategories.filter(function (value) { return value === "May" }).length;
                      let junedcategories = totaledcategories && totaledcategories.filter(function (value) { return value === "Jun" }).length;
                      let juledcategories = totaledcategories && totaledcategories.filter(function (value) { return value === "Jul" }).length;
                      let augedcategories = totaledcategories && totaledcategories.filter(function (value) { return value === "Aug" }).length;
                      let sepedcategories = totaledcategories && totaledcategories.filter(function (value) { return value === "Sep" }).length;
                      let octedcategories = totaledcategories && totaledcategories.filter(function (value) { return value === "Oct" }).length;
                      let novedcategories = totaledcategories && totaledcategories.filter(function (value) { return value === "Nov" }).length;
                      let decedcategories = totaledcategories && totaledcategories.filter(function (value) { return value === "Dec" }).length;
                      let totalcategories = [janedcategories, febedcategories, maredcategories, apredcategories, mayedcategories, junedcategories, juledcategories, augedcategories, sepedcategories, octedcategories, novedcategories, decedcategories];
                      // End of ED Overview Encounter

                      //Avergae Cost Claim start
                      let janclaimcategories = claims && claims.filter((el) => moment(el.resource.created).format("MMM") == "Jan");
                      totaljanclaimcategories.push(...janclaimcategories);
                      let janclaimtotalvalue = totaljanclaimcategories && totaljanclaimcategories.map((el) => el.resource.total.value);
                      let janclaimlength = janclaimtotalvalue && janclaimtotalvalue.length;
                      let janaverageclaimcost = janclaimtotalvalue && janclaimtotalvalue.reduce((a, b) => a + b, 0) == 0 ? 0 : (janclaimtotalvalue && janclaimtotalvalue.reduce((a, b) => a + b, 0)) / (janclaimlength);

                      let febclaimcategories = claims && claims.filter((el) => moment(el.resource.created).format("MMM") == "Feb");
                      totalfebclaimcategories.push(...febclaimcategories);
                      let febclaimtotalvalue = totalfebclaimcategories && totalfebclaimcategories.map((el) => el.resource.total.value);
                      let febclaimlength = febclaimtotalvalue && febclaimtotalvalue.length;
                      let febaverageclaimcost = febclaimtotalvalue && febclaimtotalvalue.reduce((a, b) => a + b, 0) == 0 ? 0 : (febclaimtotalvalue && febclaimtotalvalue.reduce((a, b) => a + b, 0)) / (febclaimlength);

                      let marclaimcategories = claims && claims.filter((el) => moment(el.resource.created).format("MMM") == "Mar");
                      totalmarclaimcategories.push(...marclaimcategories);
                      let marclaimtotalvalue = totalmarclaimcategories && totalmarclaimcategories.map((el) => el.resource.total.value);
                      let marclaimlength = marclaimtotalvalue && marclaimtotalvalue.length;
                      let maraverageclaimcost = marclaimtotalvalue && marclaimtotalvalue.reduce((a, b) => a + b, 0) == 0 ? 0 : (marclaimtotalvalue && marclaimtotalvalue.reduce((a, b) => a + b, 0)) / (marclaimlength);

                      let aprclaimcategories = claims && claims.filter((el) => moment(el.resource.created).format("MMM") == "Apr");
                      totalaprclaimcategories.push(...aprclaimcategories);
                      let aprclaimtotalvalue = totalaprclaimcategories && totalaprclaimcategories.map((el) => el.resource.total.value);
                      let aprclaimlength = aprclaimtotalvalue && aprclaimtotalvalue.length;
                      let apraverageclaimcost = aprclaimtotalvalue && aprclaimtotalvalue.reduce((a, b) => a + b, 0) == 0 ? 0 : (aprclaimtotalvalue && aprclaimtotalvalue.reduce((a, b) => a + b, 0)) / (aprclaimlength);

                      let mayclaimcategories = claims && claims.filter((el) => moment(el.resource.created).format("MMM") == "May");
                      totalmayclaimcategories.push(...mayclaimcategories);
                      let mayclaimtotalvalue = totalmayclaimcategories && totalmayclaimcategories.map((el) => el.resource.total.value);
                      let mayclaimlength = mayclaimtotalvalue && mayclaimtotalvalue.length;
                      let mayaverageclaimcost = mayclaimtotalvalue && mayclaimtotalvalue.reduce((a, b) => a + b, 0) == 0 ? 0 : (mayclaimtotalvalue && mayclaimtotalvalue.reduce((a, b) => a + b, 0)) / (mayclaimlength);

                      let junclaimcategories = claims && claims.filter((el) => moment(el.resource.created).format("MMM") == "Jun");
                      totaljunclaimcategories.push(...junclaimcategories);
                      let junclaimtotalvalue = totaljunclaimcategories && totaljunclaimcategories.map((el) => el.resource.total.value);
                      let junclaimlength = junclaimtotalvalue && junclaimtotalvalue.length;
                      let junaverageclaimcost = junclaimtotalvalue && junclaimtotalvalue.reduce((a, b) => a + b, 0) == 0 ? 0 : (junclaimtotalvalue && junclaimtotalvalue.reduce((a, b) => a + b, 0)) / (junclaimlength);

                      let julclaimcategories = claims && claims.filter((el) => moment(el.resource.created).format("MMM") == "Jul");
                      totaljulclaimcategories.push(...julclaimcategories);
                      let julclaimtotalvalue = totaljulclaimcategories && totaljulclaimcategories.map((el) => el.resource.total.value);
                      let julclaimlength = julclaimtotalvalue && julclaimtotalvalue.length;
                      let julaverageclaimcost = julclaimtotalvalue && julclaimtotalvalue.reduce((a, b) => a + b, 0) == 0 ? 0 : (julclaimtotalvalue && julclaimtotalvalue.reduce((a, b) => a + b, 0)) / (julclaimlength);

                      let augclaimcategories = claims && claims.filter((el) => moment(el.resource.created).format("MMM") == "Aug");
                      totalaugclaimcategories.push(...augclaimcategories);
                      let augclaimtotalvalue = totalaugclaimcategories && totalaugclaimcategories.map((el) => el.resource.total.value);
                      let augclaimlength = augclaimtotalvalue && augclaimtotalvalue.length;
                      let augaverageclaimcost = augclaimtotalvalue && augclaimtotalvalue.reduce((a, b) => a + b, 0) == 0 ? 0 : (augclaimtotalvalue && augclaimtotalvalue.reduce((a, b) => a + b, 0)) / (augclaimlength);

                      let sepclaimcategories = claims && claims.filter((el) => moment(el.resource.created).format("MMM") == "Sep");
                      totalsepclaimcategories.push(...sepclaimcategories);
                      let sepclaimtotalvalue = totalsepclaimcategories && totalsepclaimcategories.map((el) => el.resource.total.value);
                      let sepclaimlength = sepclaimtotalvalue && sepclaimtotalvalue.length;
                      let sepaverageclaimcost = sepclaimtotalvalue && sepclaimtotalvalue.reduce((a, b) => a + b, 0) == 0 ? 0 : (sepclaimtotalvalue && sepclaimtotalvalue.reduce((a, b) => a + b, 0)) / (sepclaimlength);

                      let octclaimcategories = claims && claims.filter((el) => moment(el.resource.created).format("MMM") == "Oct");
                      totaloctclaimcategories.push(...octclaimcategories);
                      let octclaimtotalvalue = totaloctclaimcategories && totaloctclaimcategories.map((el) => el.resource.total.value);
                      let octclaimlength = octclaimtotalvalue && octclaimtotalvalue.length;
                      let octaverageclaimcost = octclaimtotalvalue && octclaimtotalvalue.reduce((a, b) => a + b, 0) == 0 ? 0 : (octclaimtotalvalue && octclaimtotalvalue.reduce((a, b) => a + b, 0)) / (octclaimlength);

                      let novclaimcategories = claims && claims.filter((el) => moment(el.resource.created).format("MMM") == "Nov");
                      totalnovclaimcategories.push(...novclaimcategories);
                      let novclaimtotalvalue = totalnovclaimcategories && totalnovclaimcategories.map((el) => el.resource.total.value);
                      let novclaimlength = novclaimtotalvalue && novclaimtotalvalue.length;
                      let novaverageclaimcost = novclaimtotalvalue && novclaimtotalvalue.reduce((a, b) => a + b, 0) == 0 ? 0 : (novclaimtotalvalue && novclaimtotalvalue.reduce((a, b) => a + b, 0)) / (novclaimlength);

                      let decclaimcategories = claims && claims.filter((el) => moment(el.resource.created).format("MMM") == "Dec");
                      totaldecclaimcategories.push(...decclaimcategories);
                      let decclaimtotalvalue = totaldecclaimcategories && totaldecclaimcategories.map((el) => el.resource.total.value);
                      let decclaimlength = decclaimtotalvalue && decclaimtotalvalue.length;
                      let decaverageclaimcost = decclaimtotalvalue && decclaimtotalvalue.reduce((a, b) => a + b, 0) == 0 ? 0 : (decclaimtotalvalue && decclaimtotalvalue.reduce((a, b) => a + b, 0)) / (decclaimlength);
                      let totalaverageclaimcost = [Math.round(janaverageclaimcost), Math.round(febaverageclaimcost), Math.round(maraverageclaimcost), Math.round(apraverageclaimcost), Math.round(mayaverageclaimcost), Math.round(junaverageclaimcost), Math.round(julaverageclaimcost), Math.round(augaverageclaimcost), Math.round(sepaverageclaimcost), Math.round(octaverageclaimcost), Math.round(novaverageclaimcost), Math.round(decaverageclaimcost)]
                      // End of Avergae Cost Claim

                      // Admission Overview Start
                      let encounteradmission = encounters && encounters.filter((el) => el.resource.type && el.resource.type[0].coding[0].display.startsWith("Admission to"));
                      totalencounteradmission.push(...encounteradmission);
                      let admissionoverviewcategories = totalencounteradmission && totalencounteradmission.map((el) => moment(el.resource.period.start).format("MMM"));

                      let janadmissioncount = admissionoverviewcategories && admissionoverviewcategories.filter(function (value) {
                        return value === "Jan";
                      }).length;
                      let febadmissioncount = admissionoverviewcategories && admissionoverviewcategories.filter(function (value) {
                        return value === "Feb";
                      }).length;
                      let maradmissioncount = admissionoverviewcategories && admissionoverviewcategories.filter(function (value) {
                        return value === "Mar";
                      }).length;
                      let apradmissioncount = admissionoverviewcategories && admissionoverviewcategories.filter(function (value) {
                        return value === "Apr";
                      }).length;
                      let mayadmissioncount = admissionoverviewcategories && admissionoverviewcategories.filter(function (value) {
                        return value === "May";
                      }).length;
                      let junadmissioncount = admissionoverviewcategories && admissionoverviewcategories.filter(function (value) {
                        return value === "Jun";
                      }).length;
                      let juladmissioncount = admissionoverviewcategories && admissionoverviewcategories.filter(function (value) {
                        return value === "Jul";
                      }).length;
                      let augadmissioncount = admissionoverviewcategories && admissionoverviewcategories.filter(function (value) {
                        return value === "Aug";
                      }).length;
                      let sepadmissioncount = admissionoverviewcategories && admissionoverviewcategories.filter(function (value) {
                        return value === "Sep";
                      }).length;
                      let octadmissioncount = admissionoverviewcategories && admissionoverviewcategories.filter(function (value) {
                        return value === "Oct";
                      }).length;
                      let novadmissioncount = admissionoverviewcategories && admissionoverviewcategories.filter(function (value) {
                        return value === "Nov";
                      }).length;
                      let decadmissioncount = admissionoverviewcategories && admissionoverviewcategories.filter(function (value) {
                        return value === "Dec";
                      }).length;
                      let totaladmissioncount = [janadmissioncount, febadmissioncount, maradmissioncount, apradmissioncount, mayadmissioncount, junadmissioncount, juladmissioncount, augadmissioncount, sepadmissioncount, octadmissioncount, novadmissioncount, decadmissioncount]
                      // Admission Overview End
                      let admissionoverviewpatientscount = totaladmissioncount.reduce((a, b) => a + b, 0);
                      let edovierviewpatientscount = totalcategories.reduce((a, b) => a + b, 0);
                      let averagecostcarecount = (totalaverageclaimcost.reduce((a, b) => a + b, 0)) / 12;
                      this.setState({
                        totalcategories: totalcategories,
                        totalaverageclaimcost: totalaverageclaimcost,
                        totaladmissioncount: totaladmissioncount,
                        admissionoverviewpatientscount, edovierviewpatientscount,
                        averagecostcarecount: averagecostcarecount,
                        isLoaded: false
                      });
                    })
                  })
              });
            })
            .catch((error) => {
              this.setState({ isLoaded: true });
            })
        })
      });

    let lungcancerData = this.state.lungcancerData;
    for (let i = 0; i < lungcancerData.rows.length; i++) {
      if (lungcancerData.rows[i].performance < 40) {
        lungcancerData.rows[i].performance = <div><span style={{ float: "right" }}>{lungcancerData.rows[i].performance + "%"}</span><MDBProgress material value={lungcancerData.rows[i].performance} className="my-2" color="danger"></MDBProgress></div>
      }
      if (lungcancerData.rows[i].performance > 40 && lungcancerData.rows[i].performance < 50) {
        lungcancerData.rows[i].performance = <div><span style={{ float: "right" }}>{lungcancerData.rows[i].performance + "%"}</span><MDBProgress material value={lungcancerData.rows[i].performance} className="my-2" color="warning"></MDBProgress></div>
      }
      if (lungcancerData.rows[i].performance > 50) {
        lungcancerData.rows[i].performance = <div><span style={{ float: "right" }}>{lungcancerData.rows[i].performance + "%"}</span><MDBProgress material value={lungcancerData.rows[i].performance} className="my-2" color="info"></MDBProgress></div>
      }
    }
    let teamData = this.state.teamData;
    for (let i = 0; i < teamData.rows.length; i++) {
      if (teamData.rows[i].nochange.startsWith("+")) {
        teamData.rows[i].nochange = <div className="no-change-down">{teamData.rows[i].nochange}<img src="/images/trending_up.svg" style={{ marginLeft: "8px" }} alt="" /></div>
      } else if (teamData.rows[i].nochange.startsWith("-")) {
        teamData.rows[i].nochange = <div className="no-change-up">{teamData.rows[i].nochange}<img src="/images/trending_down.svg" style={{ marginLeft: "8px" }} alt="" /></div>
      } else {
        teamData.rows[i].nochange = <div className="no-change">{teamData.rows[i].nochange}<img src="/images/trending_flat.svg" style={{ marginLeft: "8px" }} alt="" /></div>
      }
    }
    this.setState({ lungcancerData, teamData })


    let obj = {
      size: 5000,
      sort: [{ run_date: { order: "asc" } }

      ],
      query: {
        bool: {
          filter: {
            range: {
              run_date: {
                gte: "2020-07-04T18:16:00",
                lte: "2020-12-18T20:00:00"

              }
            }
          }
        }
      }
    }


    axios({
      method: 'POST',
      url: `/api/dashboard`,
      data: obj,
    })
      .then((response) => {
        this.setState({
          isLoaded: true,
          dashboardchartdetails: response.data.json.hits.hits
        }, () => {
          let totalusers = this.state.dashboardchartdetails.length;
          let activeusers = this.state.dashboardchartdetails.filter(el => el._source.Active_User).length;
          let downloadedusers = this.state.dashboardchartdetails.filter(el => el._source.Active_User).length;
          let tier1patients = this.state.dashboardchartdetails.filter(el => el._source.Tier == 1).length;
          let tier2patients = this.state.dashboardchartdetails.filter(el => el._source.Tier == 2).length;
          let tier3patients = this.state.dashboardchartdetails.filter(el => el._source.Tier == 3).length;
          let tier1diabetescount = this.state.dashboardchartdetails.filter(el => el._source.Tier == 1 && el._source.Registry == "Diabeties").length;
          let tier1lungcancercount = this.state.dashboardchartdetails.filter(el => el._source.Tier == 1 && el._source.Registry == "Lung cancer").length;
          let tier1hypertentioncount = this.state.dashboardchartdetails.filter(el => el._source.Tier == 1 && el._source.Registry == "Hyper tension").length;
          let tier2diabetescount = this.state.dashboardchartdetails.filter(el => el._source.Tier == 2 && el._source.Registry == "Diabeties").length;
          let tier2lungcancercount = this.state.dashboardchartdetails.filter(el => el._source.Tier == 2 && el._source.Registry == "Lung cancer").length;
          let tier2hypertentioncount = this.state.dashboardchartdetails.filter(el => el._source.Tier == 2 && el._source.Registry == "Hyper tension").length;
          let tier3diabetescount = this.state.dashboardchartdetails.filter(el => el._source.Tier == 3 && el._source.Registry == "Diabeties").length;
          let tier3lungcancercount = this.state.dashboardchartdetails.filter(el => el._source.Tier == 3 && el._source.Registry == "Lung cancer").length;
          let tier3hypertentioncount = this.state.dashboardchartdetails.filter(el => el._source.Tier == 3 && el._source.Registry == "Hyper tension").length;
          let hrataken = this.state.dashboardchartdetails.filter(el => el._source.HRA == "TAKEN").length;
          let hrapending = this.state.dashboardchartdetails.filter(el => el._source.HRA == "PENDING").length;
          let diabetestaken = this.state.dashboardchartdetails.filter(el => el._source.DIA == "TAKEN").length;
          let diabetespending = this.state.dashboardchartdetails.filter(el => el._source.DIA == "PENDING").length;
          let postdischargetaken = this.state.dashboardchartdetails.filter(el => el._source.PostDischarge == "TAKEN").length;
          let postdischargepending = this.state.dashboardchartdetails.filter(el => el._source.PostDischarge == "PENDING").length;
          let sbvihighrange = this.state.dashboardchartdetails.filter(el => el._source.SBVI_range == "HIGH").length;
          let sbvilowrange = this.state.dashboardchartdetails.filter(el => el._source.SBVI_range == "LOW").length;
          let sbvimediumrange = this.state.dashboardchartdetails.filter(el => el._source.SBVI_range == "MEDIUM").length;
          let lacehighrange = this.state.dashboardchartdetails.filter(el => el._source.LACE_range == "HIGH").length;
          let lacelowrange = this.state.dashboardchartdetails.filter(el => el._source.LACE_range == "LOW").length;
          let lacemediumrange = this.state.dashboardchartdetails.filter(el => el._source.LACE_range == "MEDIUM").length;
          let CCChighrange = this.state.dashboardchartdetails.filter(el => el._source.CCC_range == "HIGH").length;
          let CCClowrange = this.state.dashboardchartdetails.filter(el => el._source.CCC_range == "LOW").length;
          let CCCmediumrange = this.state.dashboardchartdetails.filter(el => el._source.CCC_range == "MEDIUM").length;
          let CCIhighrange = this.state.dashboardchartdetails.filter(el => el._source.CCI_range == "HIGH").length;
          let CCIlowrange = this.state.dashboardchartdetails.filter(el => el._source.CCI_range == "LOW").length;
          let CCImediumrange = this.state.dashboardchartdetails.filter(el => el._source.CCI_range == "MEDIUM").length;
          let populationtiercategories = this.state.dashboardchartdetails.map(el => moment(el._source.run_date).format("YYYY-MM-DD"));
          let uniquepopulationtiercategories = [...new Set(populationtiercategories)];
          this.setState({
            totalusers, activeusers, downloadedusers,
            notdownloadedusers: totalusers - downloadedusers,
            moderateusers: totalusers - activeusers,
            tier1lungcancercount, tier1diabetescount, tier1hypertentioncount,
            tier2diabetescount, tier2lungcancercount, tier1patients, tier2patients, tier3patients,
            tier2hypertentioncount, tier3diabetescount, tier3lungcancercount, tier3hypertentioncount,
            hrataken, hrapending, diabetestaken, diabetespending, postdischargetaken,
            postdischargepending, sbvihighrange, sbvilowrange, sbvimediumrange, lacehighrange, lacelowrange, lacemediumrange,
            CCChighrange, CCClowrange, CCCmediumrange, CCIhighrange, CCIlowrange, CCImediumrange,
            uniquepopulationtiercategories
          });

        });
      })
      .catch(function (response) { console.log(response); });


  }
  componentDidUpdate() {
    localStorage.setItem('pop360teams', 'pop360teams');

  }

  render() {
    let role = this.state.rolename;
    const populationtier = {
      chart: {
        height: 190,
        type: 'column',
        style: {
          fontFamily: 'Open Sans',
          fontSize: "10px"
        }
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: ['Tier 1', 'Tier 2', 'Tier 3'],
        title: {
          text: 'STATUS',
        },

      },
      yAxis: {
        min: 0,
        title: {
          text: 'PATIENT COUNT',

        },
      },
      plotOptions: {
        series: {
          pointWidth: 8,
          dataLabels: {
            enabled: true,
          }
        }
      },
      credits: {
        enabled: false
      },
      colors: ['#00897b', '#32a095', '#66b8af'],
      series: [{
        name: 'Count',
        showInLegend: false,
        colorByPoint: true,
        data: [this.state.tier1patients, this.state.tier2patients, this.state.tier3patients]
      }]
    };

    const Registireschart = {
      chart: {
        height: 190,
        type: "column",
        style: {
          fontFamily: 'Open Sans',
          fontSize: "10px"
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
          text: 'PATIENT COUNT'
        }
      },
      plotOptions: {
        series: {
          pointWidth: 8,
          animation: {
            duration: 3000
          }
        }
      },

      xAxis: {
        categories: ["Lung Cancer", "Diabetes", "Hypertension"],
        crosshair: true
      },
      colors: ['#ff7367', '#ff8f85', '#ffaba3'],
      series: [{
        name: 'Tier 1',
        data: [this.state.tier1lungcancercount, this.state.tier1diabetescount, this.state.tier1hypertentioncount]
      }, {
        name: 'Tier 2',
        data: [this.state.tier2lungcancercount, this.state.tier2diabetescount, this.state.tier2hypertentioncount]
      }, {
        name: 'Tier 3',
        data: [this.state.tier3lungcancercount, this.state.tier3diabetescount, this.state.tier3hypertentioncount]
      }]
    };
    const riskscorechart = {
      chart: {
        height: 190,
        type: 'bar',
        style: {
          fontFamily: 'Open Sans',
          fontSize: "10px"
        }
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: ['SBVI', 'CCI', 'CCC', 'LACE']
      },
      colors: ['#B71C1C', '#F7B000', '#378C3B'],
      yAxis: {
        title: {
          text: 'POPULATION COUNT'
        }
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        series: {
          pointWidth: 8,
          stacking: 'normal',

        },

      },

      series: [{
        name: 'High',
        data: [this.state.sbvihighrange, this.state.CCIhighrange, this.state.CCChighrange, this.state.lacehighrange]
      }, {
        name: 'Medium',
        data: [this.state.sbvimediumrange, this.state.CCImediumrange, this.state.CCCmediumrange, this.state.lacemediumrange]
      }, {
        name: 'Low',
        data: [this.state.sbvilowrange, this.state.CCIlowrange, this.state.CCClowrange, this.state.lacelowrange]
      }]
    };
    const patientengaagement = {
      chart: {
        height: 190,

        type: 'column',
        style: {
          fontFamily: 'Open Sans',
          fontSize: "10px"
        }
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: ['Total Users', 'Active Users', 'Moderate Users', 'Downloaded', 'Not Downloaded']

      },
      yAxis: {
        min: 0,
        title: {
          text: 'USERS COUNT',

        },
      },
      plotOptions: {
        series: {
          pointWidth: 8,
          animation: {
            duration: 3000
          }
        }
      },

      credits: {
        enabled: false
      },
      colors: ['#00897B', '#29B6F6', '#7CB342', '#FF8A80', '#D32F2F'],
      series: [{
        name: 'Count',
        colorByPoint: true,
        showInLegend: false,
        data: [this.state.totalusers, this.state.activeusers, this.state.moderateusers, this.state.downloadedusers, this.state.notdownloadedusers]
      }]
    };
    const assessmentschart = {
      chart: {
        height: 190,

        type: "column",
        style: {
          fontFamily: 'Open Sans',
          fontSize: "10px"
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
          text: 'PATIENT COUNT'
        }
      },
      plotOptions: {
        series: {
          pointWidth: 8
        }
      },

      colors: ['#1265f0', '#70a2f6'],
      xAxis: {
        categories: ["HRA", "Diabetes", "Post Discharge"],
        crosshair: true
      },
      series: [{
        name: 'Taken',
        data: [this.state.hrataken, this.state.diabetestaken, this.state.postdischargetaken]
      }, {
        name: 'Pending',
        data: [this.state.hrapending, this.state.diabetespending, this.state.postdischargepending],
      }]
    };


    const admissionsoverview = {
      chart: {
        height: 190,
        type: 'area',
        style: {
          fontFamily: 'Open Sans',
          fontSize: "10px"
        }
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        title: {
          text: 'Months'
        }
      },
      yAxis: {
        title: {
          text: 'PATIENT COUNT'
        }
      },

      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
          },
          fillColor: {
            linearGradient: [0, 0, 0, 250],
            stops: [
              [0, '#00897b'],
              [1, '#FFFFFF']
            ]
          }
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Count',
        showInLegend: false,
        data: this.state.totaladmissioncount,
        color: '#00897b'

      }]
    }
    const edoverview = {
      chart: {
        height: 190,
        type: 'area',
        style: {
          fontFamily: 'Open Sans',
          fontSize: "10px"
        }
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        title: {
          text: 'Months'
        }
      },
      yAxis: {
        title: {
          text: 'PATIENT COUNT'
        }
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
          },
          fillColor: {
            linearGradient: [0, 0, 0, 250],
            stops: [
              [0, '#df2f2f'],
              [1, '#FFFFFF']
            ]
          }
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Count',
        showInLegend: false,
        data: this.state.totalcategories,
        color: '#df2f2f'
        // data: [1, 1, 42, 62, 50, 55, 64, 50, 44]
      }]
    }
    const costcare = {
      chart: {
        type: 'area',
        style: {
          fontFamily: 'Open Sans',
          fontSize: "14px"
        }
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        title: {
          text: 'Months'
        }
      },
      yAxis: {
        title: {
          text: 'PATIENT COUNT'
        }
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
          },
          fillColor: {
            linearGradient: [0, 0, 0, 250],
            stops: [
              [0, '#33b5e5'],
              [1, '#FFFFFF']
            ]
          }
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Count',
        showInLegend: false,
        data: this.state.totalaverageclaimcost
        // data: [40, 80, 42, 62, 50, 55, 64, 50, 44]
      }]
    }
    const performance = {
      chart: {
        height: 200,
        type: 'pie',
        style: {
          fontFamily: 'Open Sans',
          fontSize: "14px"
        }
      },
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          innerSize: 100,
          depth: 15
        }
      },
      tooltip: {
        valueSuffix: '%'
      },
      colors: ['#A3A0FB', '#FFDA83', '#55D8FE', '#FF8373'],
      series: [{
        name: 'Count',
        data: [
          ['Appointments', 25],
          ['Calls', 25],
          ['Education', 25],
          ['Quality Gaps', 25],

        ]
      }]
    }
    const patientsurvey = {
      chart: {
        type: 'solidgauge'
      },

      title: null,

      pane: {
        center: ['50%', '85%'],
        size: '140%',
        startAngle: -90,
        endAngle: 90,
        background: {
          innerRadius: '60%',
          outerRadius: '100%',
          shape: 'arc'
        }
      },

      exporting: {
        enabled: false
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: 5,
            borderWidth: 0,
            useHTML: true
          }
        }
      },
      yAxis: {
        min: 0,
        max: 100,
        title: {
          text: 'Speed'
        }
      },

      credits: {
        enabled: false
      },

      series: [{
        name: 'Speed',
        data: [80],
        dataLabels: {
          format:
            '<div style="text-align:center">' +
            '<span style="font-size:25px">{y}</span><br/>' +
            '<span style="font-size:12px;opacity:0.4">km/h</span>' +
            '</div>'
        },
        tooltip: {
          valueSuffix: ' km/h'
        }
      }]
    }






    return (
      <React.Fragment>
        <Head>
          <title>Healthlligence</title>
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
        </Head>
        <Layout>
          <MDBRow className="filter-container">
            {
              role == "Care Manager" ? <MDBCol sm="12" md="3">
                <MDBSelect
                  options={this.state.caremanagerDropdown}

                  selected="Choose Role"

                />
              </MDBCol>
                : null
            }
            {
              role == "Supervisor" ? <MDBCol sm="12" md="3">
                <MDBSelect
                  options={this.state.supervisorDropdown}
                  selected="Choose Role"

                />
              </MDBCol> : null
            }
            {
              role == "Coordinator" ? <MDBCol sm="12" md="3">
                <MDBSelect
                  options={this.state.carecoordinatorDropdown}

                  selected="Choose Role"

                />
              </MDBCol >
                : null
            }





          </MDBRow>

          <MDBRow className="population-tier-graph" style={{ marginTop: "-24px" }}>
            <MDBCol sm="12" md="12" lg="4" style={{ marginBottom: "16px" }}>
              <MDBCard style={{ height: "100%" }}>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol md="12">
                      <MDBTypography tag="h5" className="card-title"> Population Tier</MDBTypography>
                    </MDBCol>
                  </MDBRow>
                  <br />
                  <MDBRow>
                    <MDBCol md="12">
                      <ReactHighcharts config={populationtier}></ReactHighcharts>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol sm="12" md="12" lg="4" style={{ marginBottom: "16px" }}>
              <MDBCard style={{ height: "100%" }}>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol md="12"><MDBTypography tag="h5" className="card-title"> Registries</MDBTypography></MDBCol>
                  </MDBRow>

                  <br />
                  <MDBRow>
                    <MDBCol md="12">
                      <ReactHighcharts config={Registireschart}></ReactHighcharts>
                    </MDBCol>
                  </MDBRow>


                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol sm="12" md="12" lg="4" style={{ marginBottom: "16px" }}>
              <MDBCard style={{ height: "100%" }}>
                <MDBCardBody className="pop-risk-score">
                  <MDBRow>
                    <MDBCol md="12"><MDBTypography tag="h5" className="card-title"> Population by Risk Score</MDBTypography></MDBCol>
                  </MDBRow>
                  <br />
                  <MDBRow>
                    <MDBCol md="12">
                      <ReactHighcharts config={riskscorechart}></ReactHighcharts>
                    </MDBCol>


                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

          </MDBRow>

          <MDBRow className="patient-engagement-graph">
            <MDBCol sm="12" md="12" lg="4" style={{ marginBottom: "16px" }}>
              <MDBCard style={{ height: "100%" }}>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol md="12">
                      <MDBTypography tag="h5" className="card-title"> Patient Engagement</MDBTypography>
                    </MDBCol>

                  </MDBRow>
                  <br />
                  <MDBRow>
                    <MDBCol md="12">
                      <ReactHighcharts config={patientengaagement}></ReactHighcharts>
                    </MDBCol>
                  </MDBRow>

                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol sm="12" md="12" lg="4" style={{ marginBottom: "16px" }}>
              <MDBCard style={{ height: "100%" }}>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol md="12" className="assessmt-title"><MDBTypography tag="h5" className="card-title">Assessments</MDBTypography></MDBCol>
                  </MDBRow>
                  <br />
                  <MDBRow>

                    <MDBCol md="12">
                      <ReactHighcharts config={assessmentschart}></ReactHighcharts>
                    </MDBCol>
                  </MDBRow>


                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol sm="12" md="12" lg="4" style={{ marginBottom: "16px" }}>
              <Link href="/pop360teams">
                <MDBCard style={{ height: "100%" }}>
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol md="12"><MDBTypography tag="h5" className="card-title">Patient Changes</MDBTypography></MDBCol>
                    </MDBRow>

                    <MDBDataTable
                      small
                      hover={true}
                      style={{ marginTop: "18px" }}
                      responsive={true}
                      paging={false}
                      sortable={false}
                      searching={false}
                      data={this.state.teamData}
                    />
                    <MDBRow>
                      <MDBCol md="12">
                        <div className="text-center">
                          <MDBBtn color="" size="sm" className="caremanagement-btn">SEE CARE MANAGEMENT TEAM</MDBBtn>
                        </div>
                      </MDBCol>
                    </MDBRow>

                  </MDBCardBody>
                </MDBCard>
              </Link>
            </MDBCol>

          </MDBRow>
          <MDBRow className="admission-overview-graph">
            <MDBCol sm="12" md="12" lg="6" style={{ marginBottom: "16px" }}>
              <MDBCard style={{ height: "100%" }}>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol md="12"><MDBTypography tag="h5" className="card-title"> Admissions Overview</MDBTypography></MDBCol>
                  </MDBRow>
                  <MDBRow className="sub-container" style={{ marginTop: "-12px" }}>
                    <div className="sub-data">{this.state.admissionoverviewpatientscount}</div>&nbsp;<span className="sub-data-content">Admissions on Average</span>
                  </MDBRow>
                  <br />
                  <MDBRow>
                    <MDBCol md="12">
                      <ReactHighcharts config={admissionsoverview}></ReactHighcharts>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol sm="12" md="12" lg="6" style={{ marginBottom: "16px" }}>
              <MDBCard style={{ height: "100%" }}>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol md="12"><MDBTypography tag="h5" className="card-title"> ED Overview</MDBTypography></MDBCol>
                  </MDBRow>
                  <MDBRow className="sub-container" style={{ marginTop: "-12px" }}>
                    <div className="sub-data">{this.state.edovierviewpatientscount}</div>&nbsp;<span className="sub-data-content">ED Patients on Average</span>
                  </MDBRow>
                  {/* <MDBRow>
                  <Plot
                    data={[this.state.trace11]}
                    useResizeHandler
                    style={{ width: '100%', height: '100%' }}
                  />
                </MDBRow> */}
                  <br />
                  <MDBRow>
                    <MDBCol md="12">
                      <ReactHighcharts config={edoverview}></ReactHighcharts>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol sm="12" md="12" lg="6">
              <MDBCard>
                <MDBCardBody className="patient-survey-conatiner">
                  <MDBRow>
                    <MDBCol md="12" className="header-col">
                      <MDBTypography tag="h5" className="card-title"> Patient Satisfaction Survey</MDBTypography>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol sm="6" md="6" lg="8">
                      <SolidGauge />
                    </MDBCol>
                    <MDBCol sm="6" md="6" lg="4" className="cmp-table">
                      <MDBTable borderless className="graph-table">
                        <tr>
                          <td className="graph-td-text">Tier1</td>
                          <td className="graph-td-val">82.1%</td>
                        </tr>
                        <tr>
                          <td className="graph-td-text">Tier2</td>
                          <td className="graph-td-val">94.3%</td>
                        </tr>
                        <tr>
                          <td className="graph-td-text">Tier3</td>
                          <td className="graph-td-val">79.2%</td>
                        </tr>
                        <tr>
                          <td className="graph-td-text">Average Review</td>
                          <td className="graph-td-val">84.3%</td>
                        </tr>
                      </MDBTable>
                      <div className="view-reviews-button">
                        <MDBBtn color="" size="sm" className="caremanagement-btn">View Reviews</MDBBtn>
                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol sm="12" md="12" lg="6">
              <MDBCard>
                <MDBCardBody className="cmp-container">
                  <MDBRow>
                    <MDBCol md="12" className="header-col"><MDBTypography tag="h5" className="card-title"> Care Manager Performance</MDBTypography></MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol sm="6" md="6" lg="8">
                      <ReactHighcharts config={performance}></ReactHighcharts>
                    </MDBCol>
                    <MDBCol sm="6" md="6" lg="4" className="cmp-table">
                      <MDBTable borderless className="graph-table">
                        <tr>
                          <td className="graph-td-text">Appointments</td>
                          <td className="graph-td-val">25%</td>
                        </tr>
                        <tr>
                          <td className="graph-td-text">Calls</td>
                          <td className="graph-td-val">25%</td>
                        </tr>
                        <tr>
                          <td className="graph-td-text">Education</td>
                          <td className="graph-td-val">25%</td>
                        </tr>
                        <tr>
                          <td className="graph-td-text">Quality Gaps</td>
                          <td className="graph-td-val">25%</td>
                        </tr>
                      </MDBTable>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol sm="12" md="12" lg="6" style={{ marginBottom: "16px" }}>
              <MDBCard style={{ height: "100%" }}>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol md="12"><MDBTypography tag="h5" className="card-title"> Average Cost of Care</MDBTypography></MDBCol>
                  </MDBRow>
                  <MDBRow className="sub-container" style={{ marginTop: "-12px" }}>
                    <div className="sub-data">{"$" + Math.round(this.state.averagecostcarecount)}</div>&nbsp;<span className="sub-data-content">Average Cost of Care Per Patient</span>
                  </MDBRow>
                  <br />
                  <MDBRow>
                    <MDBCol md="12">
                      <ReactHighcharts config={costcare}></ReactHighcharts>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol sm="12" md="12" lg="6" style={{ marginBottom: "16px" }}>
              <MDBCard style={{ height: "100%" }}>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol md="8" className="header-col">
                      <MDBTypography tag="h5" className="card-title"> Measures</MDBTypography>
                      <MDBRow className="sub-container" style={{ marginTop: "-12px", marginLeft: "-11px" }}>
                        <div className="sub-data">10</div>&nbsp;<span className="sub-data-content">Lung Cancer</span>
                      </MDBRow>
                    </MDBCol>
                    <MDBCol md="4" className="measuresdropdown" style={{ marginTop: "-8px" }}>
                      <MDBSelect
                        options={this.state.measuresDropdown}
                        selected="Cancer Type"

                      />
                    </MDBCol>
                  </MDBRow>


                  <MDBDataTable
                    className="measures-tables"
                    small
                    hover={true}
                    responsive={true}
                    paging={false}
                    searching={false}
                    data={this.state.lungcancerData}
                  />

                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>



          {/* {this.state.isLoaded && <Loader />} */}
          <style jsx>{pop360Style}</style>
        </Layout>
      </React.Fragment>
    );
  }
};

export default Pop360;

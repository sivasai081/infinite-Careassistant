import React from 'react';
import { MDBTypography, MDBCard, MDBCardBody, MDBDataTableV5, MDBIcon, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBBtn, MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow, MDBNav, MDBNavItem, MDBNavLink} from 'mdbreact';
import { patientsColumns } from '../data/patientlistdata.js'
import Layout from '../components/layout';
import axios from 'axios';
import moment from 'moment';
import PatientListStyle from '../styles/patientliststyles.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Pagination from '@material-ui/lab/Pagination';
import Link from 'next/link';
import Loader from '../components/loader';
import Head from 'next/head'

class PatientCards extends React.Component {
  constructor() {
    super()
    this.state = {
      data: null,
      patientslist: [],
      finaldata: [],
      tab: "",
      totalCountofpatients: 1,
      pageFrom: 0,
      perPage: 10,
      page: 1,
      isLoaded: true,
      activeItemClassicTabs2: "1",
      showactivatemodal: false
    }
  };  
  componentDidMount() {
    let route = localStorage.getItem('dashboarddetails');
    this.setState({ tab : "first" });
    let patientIds = [];
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
      })
      this.setState({
        patient_ids: patientIds
      });
      let obj = {
        "query" : {"bool" : {"filter" : {"terms" : {"patient_id.keyword" : patientIds}}}}}
      axios({
        method: 'POST',
        url: `/api/patientslist`,
        data: obj
      })
      .then(res => {
        this.setState({patientslist: res.data.json.hits.hits, totalCountofpatients: res.data.json.hits.total.value}, () => {
          let columns = patientsColumns;
          let rows = this.state.patientslist && this.state.patientslist.map && this.state.patientslist.map((el) => {
            return (
              el._source
            )
          })
          let statusactive = [...rows.filter(el=>el.status == "ACTIVE"), ...rows.filter(el=>el.status != "ACTIVE") ]
          let statusinactive = [...rows.filter(el=>el.status == "INACTIVE"), ...rows.filter(el=>el.status != "INACTIVE") ]
          console.log("statusactive", statusactive)
          let route = localStorage.getItem('dashboarddetails');
          this.setState({
            patientsdata: {
              columns: columns,
              rows: route == "activepatients" ?  statusactive : route == "newpatients" ?  statusinactive : rows
            }
          }, ()=>{
              let patient = this.state.patientsdata;
              for (let i = 0; i < patient.rows.length; i++) {
                if (patient.rows[i].risklevel === "High")
                  patient.rows[i].firstname = <Link href="/health360"><div className="first-col" style={{cursor:"pointer"}} onClick={this.handleactivateClick.bind(this, this.state.patientsdata.rows[i])}>{this.state.patientsdata.rows[i].firstname + " " + this.state.patientsdata.rows[i].lastname}<img src="/images/trending_up.svg" alt="" /><br /><span >{this.state.patientsdata.rows[i].driverslicense == "" || this.state.patientsdata.rows[i].driverslicense == undefined ? "N/A" : this.state.patientsdata.rows[i].driverslicense},</span> <span> {moment(this.state.patientsdata.rows[i].dateofbirth).format("DD/MM/YYYY")}, </span> <span>{this.state.patientsdata.rows[i].gender.charAt(0).toUpperCase()}</span> </div></Link>
                else if (patient.rows[i].risklevel === "Low")
                  patient.rows[i].firstname = <Link href="/health360"><div className="first-col" style={{cursor:"pointer"}} onClick={this.handleactivateClick.bind(this, this.state.patientsdata.rows[i])}>{this.state.patientsdata.rows[i].firstname + " " + this.state.patientsdata.rows[i].lastname}<img src="/images/trending_down.svg" alt="" /><br /><span >{this.state.patientsdata.rows[i].driverslicense== "" || this.state.patientsdata.rows[i].driverslicense == undefined ? "N/A" : this.state.patientsdata.rows[i].driverslicense},</span> <span> {moment(this.state.patientsdata.rows[i].dateofbirth).format("DD/MM/YYYY")}, </span> <span>{this.state.patientsdata.rows[i].gender.charAt(0).toUpperCase()}</span> </div></Link>
                else if (patient.rows[i].risklevel === "Moderate")
                  patient.rows[i].firstname = <Link href="/health360"><div className="first-col" style={{cursor:"pointer"}} onClick={this.handleactivateClick.bind(this, this.state.patientsdata.rows[i])}>{this.state.patientsdata.rows[i].firstname + " " + this.state.patientsdata.rows[i].lastname}<img src="/images/trending_flat.svg" alt="" /><br /><span >{this.state.patientsdata.rows[i].driverslicense == "" || this.state.patientsdata.rows[i].driverslicense == undefined ? "N/A" : this.state.patientsdata.rows[i].driverslicense},</span> <span> {moment(this.state.patientsdata.rows[i].dateofbirth).format("DD/MM/YYYY")}, </span> <span>{this.state.patientsdata.rows[i].gender.charAt(0).toUpperCase()}</span> </div></Link>
                patient.rows[i].action = <button className="activate-btn" onClick={this.handleactivateClick.bind(this, this.state.patientsdata.rows[i])}>Activate</button>
                patient.rows[i].status = <div>{this.state.patientsdata.rows[i].status == "ACTIVE" ? "Active" : "Inactive"}</div>
                patient.rows[i].datereceived = <div>{moment(this.state.patientsdata.rows[i].datereceived).format("DD/MM/YYYY")}</div>
              }
              this.setState({ finaldata: patient, isLoaded: false })
          });
        });
      })
    })
  }

  handleactivateClick(el){
    this.setState({
      patientName : el.firstname.props.children.props.children[0],
      patientId: el.patient_id,
      // showactivatemodal: true
    }, () => {
        localStorage.setItem('patientName', this.state.patientName);
        localStorage.setItem('patientId', this.state.patientId);
    });
  }

  sortDateClick() {
    this.setState({ tab: "first", isLoaded: true }, () => {
      let obj = {
        sort: [
          {
            "datereceived": { 
              "order": "desc" 
            }
          }
        ],
        "query" : {"bool" : {"filter" : {"terms" : {"patient_id.keyword" : this.state.patient_ids}}}},
        size: this.state.perPage,
        from: this.state.pageFrom

      }
      axios({
        method: 'POST',
        url: `/api/patientslist`,
        data: obj,
      })
        .then((response) => {
          this.setState({ patientslist: response.data.json.hits.hits, totalCountofpatients: response.data.json.hits.total.value }, () => {
            let columns = patientsColumns;
            let rows = this.state.patientslist && this.state.patientslist.map && this.state.patientslist.map((el) => {
              return (
                el._source
              )
            })
            this.setState({
              patientsdata: {
                columns: columns,
                rows: rows
              }
            }, ()=>{
              let patient = this.state.patientsdata;
              for (let i = 0; i < patient.rows.length; i++) {
                if (patient.rows[i].risklevel === "High")
                  patient.rows[i].firstname = <Link href="/health360"><div className="first-col" style={{cursor:"pointer"}} onClick={this.handleactivateClick.bind(this, this.state.patientsdata.rows[i])}>{this.state.patientsdata.rows[i].firstname + " " + this.state.patientsdata.rows[i].lastname}<img src="/images/trending_up.svg" alt="" /><br /><span >{this.state.patientsdata.rows[i].driverslicense},</span> <span> {moment(this.state.patientsdata.rows[i].dateofbirth).format("DD/MM/YYYY")}, </span> <span>{this.state.patientsdata.rows[i].gender.charAt(0).toUpperCase()}</span> </div></Link>
                else if (patient.rows[i].risklevel === "Low")
                  patient.rows[i].firstname = <Link href="/health360"><div className="first-col" style={{cursor:"pointer"}} onClick={this.handleactivateClick.bind(this, this.state.patientsdata.rows[i])}>{this.state.patientsdata.rows[i].firstname + " " + this.state.patientsdata.rows[i].lastname}<img src="/images/trending_down.svg" alt="" /><br /><span >{this.state.patientsdata.rows[i].driverslicense},</span> <span> {moment(this.state.patientsdata.rows[i].dateofbirth).format("DD/MM/YYYY")}, </span> <span>{this.state.patientsdata.rows[i].gender.charAt(0).toUpperCase()}</span> </div></Link>
                else if (patient.rows[i].risklevel === "Moderate")
                  patient.rows[i].firstname = <Link href="/health360"><div className="first-col" style={{cursor:"pointer"}} onClick={this.handleactivateClick.bind(this, this.state.patientsdata.rows[i])}>{this.state.patientsdata.rows[i].firstname + " " + this.state.patientsdata.rows[i].lastname}<img src="/images/trending_flat.svg" alt="" /><br /><span >{this.state.patientsdata.rows[i].driverslicense},</span> <span> {moment(this.state.patientsdata.rows[i].dateofbirth).format("DD/MM/YYYY")}, </span> <span>{this.state.patientsdata.rows[i].gender.charAt(0).toUpperCase()}</span> </div></Link>
                patient.rows[i].action = <button className="activate-btn" onClick={this.handleactivateClick.bind(this, this.state.patientsdata.rows[i])}>Activate</button>
                // patient.rows[i].status = <div>{this.state.patientsdata.rows[i].status == "ACTIVE" ? "Active" : "Inactive"}</div>
                patient.rows[i].datereceived = <div>{moment(this.state.patientsdata.rows[i].datereceived).format("DD/MM/YYYY")}</div>
              }
              this.setState({ finaldata: patient, isLoaded: false })
            });
          });
        })
        .catch(function (response) { console.log(response); });
    })
  };
  sortAlphabeticalClick() {
    this.setState({ tab: "second", isLoaded: true }, () => {
      let obj = {
        sort: [
          {
            "firstname.keyword": { "order": "asc" }
          }
        ],
        "query" : {"bool" : {"filter" : {"terms" : {"patient_id.keyword" : this.state.patient_ids}}}},
        size: this.state.perPage,
        from: this.state.pageFrom

      }
      axios({
        method: 'POST',
        url: `/api/patientslist`,
        data: obj,
      })
        .then((response) => {
          this.setState({patientslist: response.data.json.hits.hits, totalCountofpatients: response.data.json.hits.total.value }, () => {
            let columns = patientsColumns;
            let rows = this.state.patientslist && this.state.patientslist.map && this.state.patientslist.map((el) => {
              return (
                el._source
              )
            })
            this.setState({
              patientsdata: {
                columns: columns,
                rows: rows
              }
            }, ()=>{
              let patient = this.state.patientsdata;
              for (let i = 0; i < patient.rows.length; i++) {
                if (patient.rows[i].risklevel === "High")
                  patient.rows[i].firstname = <Link href="/health360"><div className="first-col" style={{cursor:"pointer"}} onClick={this.handleactivateClick.bind(this, this.state.patientsdata.rows[i])}>{this.state.patientsdata.rows[i].firstname + " " + this.state.patientsdata.rows[i].lastname}<img src="/images/trending_up.svg" alt="" /><br /><span >{this.state.patientsdata.rows[i].driverslicense},</span> <span> {moment(this.state.patientsdata.rows[i].dateofbirth).format("DD/MM/YYYY")}, </span> <span>{this.state.patientsdata.rows[i].gender.charAt(0).toUpperCase()}</span> </div></Link>
                else if (patient.rows[i].risklevel === "Low")
                  patient.rows[i].firstname = <Link href="/health360"><div className="first-col" style={{cursor:"pointer"}} onClick={this.handleactivateClick.bind(this, this.state.patientsdata.rows[i])}>{this.state.patientsdata.rows[i].firstname + " " + this.state.patientsdata.rows[i].lastname}<img src="/images/trending_down.svg" alt="" /><br /><span >{this.state.patientsdata.rows[i].driverslicense},</span> <span> {moment(this.state.patientsdata.rows[i].dateofbirth).format("DD/MM/YYYY")}, </span> <span>{this.state.patientsdata.rows[i].gender.charAt(0).toUpperCase()}</span> </div></Link>
                else if (patient.rows[i].risklevel === "Moderate")
                  patient.rows[i].firstname = <Link href="/health360"><div className="first-col" style={{cursor:"pointer"}} onClick={this.handleactivateClick.bind(this, this.state.patientsdata.rows[i])}>{this.state.patientsdata.rows[i].firstname + " " + this.state.patientsdata.rows[i].lastname}<img src="/images/trending_flat.svg" alt="" /><br /><span >{this.state.patientsdata.rows[i].driverslicense},</span> <span> {moment(this.state.patientsdata.rows[i].dateofbirth).format("DD/MM/YYYY")}, </span> <span>{this.state.patientsdata.rows[i].gender.charAt(0).toUpperCase()}</span> </div></Link>
                patient.rows[i].action = <button className="activate-btn" onClick={this.handleactivateClick.bind(this, this.state.patientsdata.rows[i])}>Activate</button>
                // patient.rows[i].status = <div>{this.state.patientsdata.rows[i].status == "ACTIVE" ? "Active" : "Inactive"}</div>
                patient.rows[i].datereceived = <div>{moment(this.state.patientsdata.rows[i].datereceived).format("DD/MM/YYYY")}</div>
              }
              this.setState({ finaldata: patient, isLoaded: false })
            });
          });
        })
        .catch(function (response) { console.log(response); });
    })
  };
  sortRiskClick() {
    this.setState({ tab: "third", isLoaded: true }, () => {
      let obj = {
        sort: [
          {
            "riskscore": { "order": "desc" }
          }
        ],
        "query" : {"bool" : {"filter" : {"terms" : {"patient_id.keyword" : this.state.patient_ids}}}},
        size: this.state.perPage,
        from: this.state.pageFrom

      }
      axios({
        method: 'POST',
        url: `/api/patientslist`,
        data: obj,
      })
        .then((response) => {
          this.setState({patientslist: response.data.json.hits.hits,totalCountofpatients: response.data.json.hits.total.value }, () => {
            let columns = patientsColumns;
            let rows = this.state.patientslist && this.state.patientslist.map && this.state.patientslist.map((el) => {
              return (
                el._source
              )
            })
            this.setState({
              patientsdata: {
                columns: columns,
                rows: rows
              }
            }, ()=>{
              let patient = this.state.patientsdata;
              for (let i = 0; i < patient.rows.length; i++) {
                if (patient.rows[i].risklevel === "High")
                  patient.rows[i].firstname = <Link href="/health360"><div className="first-col" style={{cursor:"pointer"}} onClick={this.handleactivateClick.bind(this, this.state.patientsdata.rows[i])}>{this.state.patientsdata.rows[i].firstname + " " + this.state.patientsdata.rows[i].lastname}<img src="/images/trending_up.svg" alt="" /><br /><span >{this.state.patientsdata.rows[i].driverslicense},</span> <span> {moment(this.state.patientsdata.rows[i].dateofbirth).format("DD/MM/YYYY")}, </span> <span>{this.state.patientsdata.rows[i].gender.charAt(0).toUpperCase()}</span> </div></Link>
                else if (patient.rows[i].risklevel === "Low")
                  patient.rows[i].firstname = <Link href="/health360"><div className="first-col" style={{cursor:"pointer"}} onClick={this.handleactivateClick.bind(this, this.state.patientsdata.rows[i])}>{this.state.patientsdata.rows[i].firstname + " " + this.state.patientsdata.rows[i].lastname}<img src="/images/trending_down.svg" alt="" /><br /><span >{this.state.patientsdata.rows[i].driverslicense},</span> <span> {moment(this.state.patientsdata.rows[i].dateofbirth).format("DD/MM/YYYY")}, </span> <span>{this.state.patientsdata.rows[i].gender.charAt(0).toUpperCase()}</span> </div></Link>
                else if (patient.rows[i].risklevel === "Moderate")
                  patient.rows[i].firstname = <Link href="/health360"><div className="first-col" style={{cursor:"pointer"}} onClick={this.handleactivateClick.bind(this, this.state.patientsdata.rows[i])}>{this.state.patientsdata.rows[i].firstname + " " + this.state.patientsdata.rows[i].lastname}<img src="/images/trending_flat.svg" alt="" /><br /><span >{this.state.patientsdata.rows[i].driverslicense},</span> <span> {moment(this.state.patientsdata.rows[i].dateofbirth).format("DD/MM/YYYY")}, </span> <span>{this.state.patientsdata.rows[i].gender.charAt(0).toUpperCase()}</span> </div></Link>
                patient.rows[i].action = <button className="activate-btn" onClick={this.handleactivateClick.bind(this, this.state.patientsdata.rows[i])}>Activate</button>
                // patient.rows[i].status = <div>{this.state.patientsdata.rows[i].status == "ACTIVE" ? "Active" : "Inactive"}</div>
                patient.rows[i].datereceived = <div>{moment(this.state.patientsdata.rows[i].datereceived).format("DD/MM/YYYY")}</div>
              }
              this.setState({ finaldata: patient, isLoaded: false })
            });
          });
        })
        .catch(function (response) { console.log(response); });
    })
  };

  onHandleSearch(e, search) {
    if (e && e.target && e.target.value == "") {
      let searchText = '';
      if (e && e.target) searchText = e.target.value;
      else searchText = search;
      let obj = {
        "query" : {"bool" : {"filter" : {"terms" : {"patient_id.keyword" : this.state.patient_ids}}}},
        size: this.state.perPage,
        from: this.state.pageFrom
      }
      this.setState({isLoaded: true});
      
      axios({
        method: 'POST',
        url: `/api/patientslist`,
        data: obj,
      })
        .then((response) => {
          this.setState({ patientslist: response.data.json.hits.hits, tab: 'search',totalCountofpatients: response.data.json.hits.total.value }, () => {
            let columns = patientsColumns;
            let rows = this.state.patientslist && this.state.patientslist.map && this.state.patientslist.map((el) => {
              return (
                el._source
              )
            })
            this.setState({
              patientsdata: {
                columns: columns,
                rows: rows
              }
            }, ()=>{
              let patient = this.state.patientsdata;
              for (let i = 0; i < patient.rows.length; i++) {
                if (patient.rows[i].risklevel === "High")
                  patient.rows[i].firstname = <Link href="/health360"><div className="first-col" style={{cursor:"pointer"}} onClick={this.handleactivateClick.bind(this, this.state.patientsdata.rows[i])}>{this.state.patientsdata.rows[i].firstname + " " + this.state.patientsdata.rows[i].lastname}<img src="/images/trending_up.svg" alt="" /><br /><span >{this.state.patientsdata.rows[i].driverslicense},</span> <span> {moment(this.state.patientsdata.rows[i].dateofbirth).format("DD/MM/YYYY")}, </span> <span>{this.state.patientsdata.rows[i].gender.charAt(0).toUpperCase()}</span> </div></Link>
                else if (patient.rows[i].risklevel === "Low")
                  patient.rows[i].firstname = <Link href="/health360"><div className="first-col" style={{cursor:"pointer"}} onClick={this.handleactivateClick.bind(this, this.state.patientsdata.rows[i])}>{this.state.patientsdata.rows[i].firstname + " " + this.state.patientsdata.rows[i].lastname}<img src="/images/trending_down.svg" alt="" /><br /><span >{this.state.patientsdata.rows[i].driverslicense},</span> <span> {moment(this.state.patientsdata.rows[i].dateofbirth).format("DD/MM/YYYY")}, </span> <span>{this.state.patientsdata.rows[i].gender.charAt(0).toUpperCase()}</span> </div></Link>
                else if (patient.rows[i].risklevel === "Moderate")
                  patient.rows[i].firstname = <Link href="/health360"><div className="first-col" style={{cursor:"pointer"}} onClick={this.handleactivateClick.bind(this, this.state.patientsdata.rows[i])}>{this.state.patientsdata.rows[i].firstname + " " + this.state.patientsdata.rows[i].lastname}<img src="/images/trending_flat.svg" alt="" /><br /><span >{this.state.patientsdata.rows[i].driverslicense},</span> <span> {moment(this.state.patientsdata.rows[i].dateofbirth).format("DD/MM/YYYY")}, </span> <span>{this.state.patientsdata.rows[i].gender.charAt(0).toUpperCase()}</span> </div></Link>
                patient.rows[i].action = <button className="activate-btn" onClick={this.handleactivateClick.bind(this, this.state.patientsdata.rows[i])}>Activate</button>
                // patient.rows[i].status = <div>{this.state.patientsdata.rows[i].status == "ACTIVE" ? "Active" : "Inactive"}</div>
                patient.rows[i].datereceived = <div>{moment(this.state.patientsdata.rows[i].datereceived).format("DD/MM/YYYY")}</div>
              }
              this.setState({ finaldata: patient, isLoaded: false })
            });
          });
        })
        .catch(function (response) { console.log(response); });
    } else {
      let searchText = '';
      if (e && e.target) searchText = e.target.value;
      else searchText = search;
      let obj = {
        "query": {
          "bool": {
            "must": { "query_string": { "query": '*' + searchText + '*' } },
            "filter": {
              "terms": {
                "patient_id.keyword":this.state.patient_ids }
            }
          }
        }
      }
      
      this.setState({isLoaded: true});
      axios({
        method: 'POST',
        url: `/api/patientslist`,
        data: obj,
      })
        .then((response) => {
          this.setState({patientslist: response.data.json.hits.hits, tab: 'search', totalCountofpatients: response.data.json.hits.total.value }, () => {
            let columns = patientsColumns;
            let rows = this.state.patientslist && this.state.patientslist.map && this.state.patientslist.map((el) => {
              return (
                el._source
              )
            })
            this.setState({
              patientsdata: {
                columns: columns,
                rows: rows
              }
            }, ()=>{
              let patient = this.state.patientsdata;
              for (let i = 0; i < patient.rows.length; i++) {
                if (patient.rows[i].risklevel === "High")
                  patient.rows[i].firstname = <Link href="/health360"><div className="first-col" style={{cursor:"pointer"}} onClick={this.handleactivateClick.bind(this, this.state.patientsdata.rows[i])}>{this.state.patientsdata.rows[i].firstname + " " + this.state.patientsdata.rows[i].lastname}<img src="/images/trending_up.svg" alt="" /><br /><span >{this.state.patientsdata.rows[i].driverslicense},</span> <span> {moment(this.state.patientsdata.rows[i].dateofbirth).format("DD/MM/YYYY")}, </span> <span>{this.state.patientsdata.rows[i].gender.charAt(0).toUpperCase()}</span> </div></Link>
                else if (patient.rows[i].risklevel === "Low")
                  patient.rows[i].firstname = <Link href="/health360"><div className="first-col" style={{cursor:"pointer"}} onClick={this.handleactivateClick.bind(this, this.state.patientsdata.rows[i])}>{this.state.patientsdata.rows[i].firstname + " " + this.state.patientsdata.rows[i].lastname}<img src="/images/trending_down.svg" alt="" /><br /><span >{this.state.patientsdata.rows[i].driverslicense},</span> <span> {moment(this.state.patientsdata.rows[i].dateofbirth).format("DD/MM/YYYY")}, </span> <span>{this.state.patientsdata.rows[i].gender.charAt(0).toUpperCase()}</span> </div></Link>
                else if (patient.rows[i].risklevel === "Moderate")
                  patient.rows[i].firstname = <Link href="/health360"><div className="first-col" style={{cursor:"pointer"}} onClick={this.handleactivateClick.bind(this, this.state.patientsdata.rows[i])}>{this.state.patientsdata.rows[i].firstname + " " + this.state.patientsdata.rows[i].lastname}<img src="/images/trending_flat.svg" alt="" /><br /><span >{this.state.patientsdata.rows[i].driverslicense},</span> <span> {moment(this.state.patientsdata.rows[i].dateofbirth).format("DD/MM/YYYY")}, </span> <span>{this.state.patientsdata.rows[i].gender.charAt(0).toUpperCase()}</span> </div></Link>
                patient.rows[i].action = <button className="activate-btn" onClick={this.handleactivateClick.bind(this, this.state.patientsdata.rows[i])}>Activate</button>
                // patient.rows[i].status = <div>{this.state.patientsdata.rows[i].status == "ACTIVE" ? "Active" : "Inactive"}</div>
                patient.rows[i].datereceived = <div>{moment(this.state.patientsdata.rows[i].datereceived).format("DD/MM/YYYY")}</div>
              }
              this.setState({ finaldata: patient, isLoaded: false })
            });
          });
        })
        .catch(function (response) { console.log(response); });
    }
}

handlePageChange = (e, val) => {
  this.setState({ pageFrom: ((val * this.state.perPage) - (this.state.perPage - 1)), page: val }, () => {
      switch (this.state.tab) {
          case "first":
              this.sortDateClick()
              break;
          case "second":
              this.sortAlphabeticalClick()
              break;
          case "third":
              this.sortRiskClick()
              break;
          case "search":
              let query = document.getElementById("searching").value;
              this.onHandleSearch('', query)
              break;

          default:
              this.handleMoreSearch()
              break;
      }
  })

}

handleMoreSearch = () => {
  this.setState({isLoaded: true});
  let obj = {
      size: this.state.perPage,
      from: this.state.pageFrom
  }
  axios({
      method: 'POST',
      url: `/api/patientslist`,
      data: obj,
  })
  .then((response) => {
          this.setState({patientslist: response.data.json.hits.hits,totalCountofpatients: response.data.json.hits.total.value }, ()=>{
            let columns = patientsColumns;
            let rows = this.state.patientslist && this.state.patientslist.map && this.state.patientslist.map((el) => {
              return (
                el._source
              )
            })
            this.setState({
              patientsdata: {
                columns: columns,
                rows: rows
              }
            }, ()=>{
              let patient = this.state.patientsdata;
              for (let i = 0; i < patient.rows.length; i++) {
                if (patient.rows[i].risklevel === "High")
                  patient.rows[i].firstname = <Link href="/health360"><div className="first-col" style={{cursor:"pointer"}} onClick={this.handleactivateClick.bind(this, this.state.patientsdata.rows[i])}>{this.state.patientsdata.rows[i].firstname + " " + this.state.patientsdata.rows[i].lastname}<img src="/images/trending_up.svg" alt="" /><br /><span >{this.state.patientsdata.rows[i].driverslicense},</span> <span> {moment(this.state.patientsdata.rows[i].dateofbirth).format("DD/MM/YYYY")}, </span> <span>{this.state.patientsdata.rows[i].gender.charAt(0).toUpperCase()}</span> </div></Link>
                else if (patient.rows[i].risklevel === "Low")
                  patient.rows[i].firstname = <Link href="/health360"><div className="first-col" style={{cursor:"pointer"}} onClick={this.handleactivateClick.bind(this, this.state.patientsdata.rows[i])}>{this.state.patientsdata.rows[i].firstname + " " + this.state.patientsdata.rows[i].lastname}<img src="/images/trending_down.svg" alt="" /><br /><span >{this.state.patientsdata.rows[i].driverslicense},</span> <span> {moment(this.state.patientsdata.rows[i].dateofbirth).format("DD/MM/YYYY")}, </span> <span>{this.state.patientsdata.rows[i].gender.charAt(0).toUpperCase()}</span> </div></Link>
                else if (patient.rows[i].risklevel === "Moderate")
                  patient.rows[i].firstname = <Link href="/health360"><div className="first-col" style={{cursor:"pointer"}} onClick={this.handleactivateClick.bind(this, this.state.patientsdata.rows[i])}>{this.state.patientsdata.rows[i].firstname + " " + this.state.patientsdata.rows[i].lastname}<img src="/images/trending_flat.svg" alt="" /><br /><span >{this.state.patientsdata.rows[i].driverslicense},</span> <span> {moment(this.state.patientsdata.rows[i].dateofbirth).format("DD/MM/YYYY")}, </span> <span>{this.state.patientsdata.rows[i].gender.charAt(0).toUpperCase()}</span> </div></Link>
                patient.rows[i].action = <button className="activate-btn" onClick={this.handleactivateClick.bind(this, this.state.patientsdata.rows[i])}>Activate</button>
                // patient.rows[i].status = <div>{this.state.patientsdata.rows[i].status == "ACTIVE" ? "Active" : "Inactive"}</div>
                patient.rows[i].datereceived = <div>{moment(this.state.patientsdata.rows[i].datereceived).format("DD/MM/YYYY")}</div>
              }
              this.setState({ finaldata: patient, isLoaded: false })
            });
          });
  })
  .catch(function (response) { console.log(response); });
}


toggleClassicTabs2 = tab => () => {
  if (this.state.activeItemClassicTabs2 !== tab) {
  this.setState({
    activeItemClassicTabs2: tab
  });
  }
}
activatetoggle(){
  this.setState({
    showactivatemodal: false
  })
}
saveActivate(){
  this.setState({
    showactivatemodal: false
  })
}
componentDidUpdate() {
  // localStorage.setItem('patientName', this.state.patientName)
}

  render() {
    if (this.state.finaldata !== null)
      return (
        <React.Fragment>
        <Head>
            <title>Healthlligence</title>
            <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
        </Head>
        <Layout isLoaded={this.state.isLoaded}>
          <div className="patient-list" style={{maxWidth:"1400px", margin:"0 auto"}}>
            <div className='patients-table'>
              <div className="titleAndSort" >
              <MDBTypography tag="h2"  variant="h2-responsive" className="header-title"></MDBTypography>
                <div className="controls">
                  <div className={this.state.tab == "first" ? "dataHandling active" : "dataHandling"} onClick={this.sortDateClick.bind(this)}><p >Date</p></div>
                  <div className={this.state.tab == "second" ? "dataHandling active" : "dataHandling"} onClick={this.sortAlphabeticalClick.bind(this)}><p >A to Z</p></div>
                  <div className={this.state.tab == "third" ? "dataHandling active" : "dataHandling"} onClick={this.sortRiskClick.bind(this)}><p >risk</p></div>
                  <div className="searchingdiv">
                    <MDBIcon icon="search" className="searchIcon" />
                    <input placeholder="Search" id="searching"  className="searching" type="text" onChange={this.onHandleSearch.bind(this)} />
                  </div>
                </div>
              </div>
              <MDBCard narrow>
                <MDBCardBody cascade style={{marginBottom: "16px"}}>
                  <MDBDataTableV5
                    hover
                    responsive
                    data={this.state.finaldata}
                    paging={false}
                    searchBottom={false}
                  />
                 
                </MDBCardBody>
              </MDBCard>

              <div className="pagination-container" style={{marginBottom: "80px", marginLeft:"60px"}}>
                  <Pagination count={Math.ceil(this.state.totalCountofpatients/this.state.perPage)} page={this.state.page} color="primary"  onChange={this.handlePageChange} />
              </div>
            </div>
          </div>

          {this.state.isLoaded && <Loader /> }
          <style jsx>{PatientListStyle}</style>
        </Layout>
        </React.Fragment>
      )
    else {
      return (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )
    }
  }
}


export default PatientCards;

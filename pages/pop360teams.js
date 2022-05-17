
import React, { Component } from "react";
import Layout from "../components/layout";
import pop360teamStyle from '../styles/pop360teamStyle'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Pagination from '@material-ui/lab/Pagination';
import * as data from '../data/data'
import Head from 'next/head'
import { MDBRow, MDBCol, MDBTypography, MDBCard, MDBCardBody, MDBSelect, MDBIcon, MDBBtn, MDBDataTable, MDBTable, MDBProgress } from "mdbreact";


class Pop360TeamDashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            facilityDropdown: [{
                text: "City of Hope",
                value: "1"
            },{
                text: "Kaiser Permanente",
                value: "1"
            },{
                text: "Blue Shield",
                value: "1"
            },{
                text: "Humana",
                value: "1"
            }],
            supervisorDropdown: [{
                text: "David Jame",
                value: "1"
            },{
                text: "Tony Stark",
                value: "1"
            }],
            caremanagerDropdown: [{
                text: "Andre Glutzgiv",
                value: "1"
            },{
                text: "James Gibbons",
                value: "1"
            },{
                text: "Aaron Mercer",
                value: "1"
            },{
                text: "John Joe",
                value: "1"
            }],
            carecoordinatorDropdown: [{
                text: "Katie Wu",
                value: "1"
            },{
                text: "Travis Young",
                value: "1"
            },{
                text: "Johnny Newman",
                value: "1"
            },{
                text: "Phil Bargatas",
                value: "1"
            }],
            alldayDropdown: [{
                text: "North West",
                value: "North West"
            },{
                text: "North East",
                value: "North East"
            },{
                text: "South West",
                value: "South West"
            },{
                text: "South East",
                value: "South East"
            }],
              careManagersData: data.careManagersData,
              tab: "",
              totalCountofpatients: 100,
              pageFrom: 1,
              perPage: 10,
              page: 1,

        }
    }
    componentDidMount() {
        this.setState({ tab: "first"})
        let pop360teams = localStorage.getItem('pop360teams');
      let careManagersData = this.state.careManagersData;
      for (let i = 0; i < careManagersData.rows.length; i++) {
        if (careManagersData.rows[i].cpatients >= 80){
            careManagersData.rows[i].cpatients = <MDBProgress material value={careManagersData.rows[i].cpatients} height="4px" color="danger"></MDBProgress>
                if(careManagersData.rows[i].pic === ''){
                    careManagersData.rows[i].pic = <div className="circleClass" style={{background:"#ff3547"}}>
                                                    <span className="circletext">
                                                            {careManagersData.rows[i].name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                }
        }
        if (careManagersData.rows[i].cpatients < 80 && careManagersData.rows[i].cpatients >= 50){
          careManagersData.rows[i].cpatients = <MDBProgress material value={careManagersData.rows[i].cpatients} height="4px" color="warning"></MDBProgress>
          if(careManagersData.rows[i].pic === ''){
                careManagersData.rows[i].pic = <div className="circleClass" style={{background:"#ffbb33"}}>
                                            <span className="circletext">
                                                    {careManagersData.rows[i].name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
            }
        }
        if (careManagersData.rows[i].cpatients < 50){
           careManagersData.rows[i].cpatients = <MDBProgress material value={careManagersData.rows[i].cpatients} height="4px" color="success"></MDBProgress>
           if(careManagersData.rows[i].pic === ''){
                careManagersData.rows[i].pic = <div className="circleClass" style={{background:"#00c851"}}>
                                            <span className="circletext">
                                                    {careManagersData.rows[i].name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
            }
        }
      }
    
      this.setState({ careManagersData })
    }
    sortDateClick = () => {
        this.setState({ tab: "first"})
    }
    sortAlphabeticalClick = () => {
      this.setState({ tab: "second"})
    }
    sortRiskClick = () => {
      this.setState({ tab: "third"})
    }
    handlePageChange = (e, val) => {
      this.setState({ pageFrom: ((val * this.state.perPage) - (this.state.perPage - 1)), page: val })
    }
    onHandleSearch = (e) => {
    }
    render() {
        return (
            <React.Fragment>
            <Head>
                <title>Healthlligence</title>
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
            </Head>
            <Layout>
                <div style={{maxWidth:"1400px", margin:"0 auto"}}>
                        <MDBRow className="filter-container">
                        <MDBCol sm="12" md="2" className="last-dropdown">
                                <MDBSelect
                                    options={this.state.alldayDropdown}
                                    outline
                                    selected="Region"
                                //getValue={(val) => this.handleMonths(val)}
                                />
                            </MDBCol>
                            <MDBCol sm="12" md="2">
                                <MDBSelect
                                    options={this.state.facilityDropdown}
                                    outline
                                    selected="Facility"
                                //getValue={(val) => this.handleMonths(val)}
                                />
                            </MDBCol>
                            <MDBCol sm="12" md="2">
                                <MDBSelect
                                    options={this.state.supervisorDropdown}
                                    outline
                                    selected="Supervisor"
                                //getValue={(val) => this.handleMonths(val)}
                                />
                            </MDBCol>
                            <MDBCol sm="12" md="2">
                                <MDBSelect
                                    options={this.state.caremanagerDropdown}
                                    outline
                                    selected="Care Manager"
                                //getValue={(val) => this.handleMonths(val)}
                                />
                            </MDBCol>
                            <MDBCol sm="12" md="2">
                                <MDBSelect
                                    options={this.state.carecoordinatorDropdown}
                                    outline
                                    selected="Care Coordinator"
                                //getValue={(val) => this.handleMonths(val)}
                                />
                            </MDBCol>
                            {/* <MDBCol sm="12" md="2">
                              <div className="searchingdiv" style={{marginTop: "24px"}}>
                                        <MDBIcon icon="search" className="searchIcon" />
                                        <input placeholder="Search" id="searching"  className="searching" type="text" onChange={this.onHandleSearch.bind(this)} />
                                    </div>
                            </MDBCol> */}
                            
                        </MDBRow>
                   
                <MDBRow style={{marginBottom: "96px", marginTop:"10px"}}>
                    <MDBCol md="12">
                        <MDBCard>
                        <MDBCardBody>
                            <div className="titleAndSort" >
                                <MDBTypography tag="h2"  variant="h2-responsive" className="header-title"></MDBTypography>
                                <div className="controls">
                                    <div className="searchingdiv">
                                        <MDBIcon icon="search" className="searchIcon" />
                                        <input placeholder="Search" id="searching"  className="searching" type="text" onChange={this.onHandleSearch.bind(this)} />
                                    </div>
                                </div>
                            </div>
                            <div style={{marginTop: "24px"}}>

                            <MDBDataTable
                              small
                              hover={true}
                              responsive={true}
                              paging={false}
                              searching={false}
                              sortable={false}
                              data={this.state.careManagersData}
                            />
                            </div>
                            </MDBCardBody>
                        </MDBCard>
                        <div className="pagination-container">
                            <Pagination count={Math.ceil(this.state.totalCountofpatients/this.state.perPage)} page={this.state.page} color="primary"  onChange={this.handlePageChange} />
                        </div>
                    </MDBCol>

                </MDBRow>
                <style jsx>{pop360teamStyle}</style>
                </div>
            </Layout>
            </React.Fragment>
        );
    }
};

export default Pop360TeamDashBoard;


import React, { Component } from "react";
import { MDBRow, MDBCol, MDBTypography, MDBSelect, MDBTimeline, MDBTimelineStep, MDBInput, MDBCollapse,MDBCard, MDBCardBody, MDBChipsInput, MDBChip } from "mdbreact";
import NotesStyle from '../styles/notesStyle';

import Layout from "../components/layout";
import Loader from '../components/loader';
import * as data from '../data/data';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Pagination from '@material-ui/lab/Pagination';



class ExistingNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            maxLength: 350,
            searchFrom: [
                { text: "All", value: "1" },
                { text: "Call Note", value: "2" },
                { text: "Care Plan", value: "3" },
                { text: "EMR", value: "4" },
                { text: "ICT Note", value: "5" },
                { text: "Barrier Note", value: "6" },
                { text: "General Note", value: "7" },
            ],
           
            fromTo: [
                { text: "All Time", value: "1" },

            ],
            clickedIndex:'',
            searchedText: '',
            searchedNotes: '',
            notesData: data.notesData.data,
           
        }
    }
    handleSearch = _e => {
        //console.log("serach=", _e.target.value)
        this.setState({ searchedText: _e.target.value })
    }

    handleSearchNote = val => {
        let notes = '';
        if (val[0] === '1') {
            notes = data.notesData.data.slice(0, 18)
        } else {
            notes = data.notesData.data.filter((el) => el.id === val[0])
        }

        this.setState({ notesData: notes })
    }

    handleMonths = val => {
        console.log("months=", val)
    }


    componentDidMount() {

    }
    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
 
   
   handleDescription = (i, desc) => {
       this.setState({ clickedIndex: i },()=>{
           if(this.props.handleBarrierNotes){
               this.props.handleBarrierNotes(i, desc) 
           }
       })
   }

    render() {

        return (
           <>
          
                <MDBRow className="existing-row-1">

                    <MDBCol md="6" className="notes-dropdown">
                        <MDBSelect
                            options={this.state.searchFrom}
                            outline
                            selected="All"
                            getValue={(val) => this.handleSearchNote(val)}
                        />
                    </MDBCol>
                    <MDBCol md="6" className="search-notes">
                        <MDBInput
                            type='text'
                            label='Search'
                            name='search'
                            value={this.state.searchedText}
                            className={`iconcolor`}
                            onChange={this.handleSearch}
                            icon='search'
                            outline
                        />
                    </MDBCol>
                    </MDBRow>

                    <MDBRow className="existing-row-2">
                    <MDBCol md="12" className="notes-dropdown">
                        <MDBTypography tag="h6" variant="h6-responsive" className="note-from-month">From</MDBTypography>
                        <MDBSelect
                            options={this.state.fromTo}
                            outline
                            selected="All Time"
                            getValue={(val) => this.handleMonths(val)}
                        />
                        <MDBTypography tag="h6" variant="h6-responsive" className="note-to-month">To</MDBTypography>
                        <MDBSelect
                            options={this.state.fromTo}
                            outline
                            selected="All Time"

                        />
                    </MDBCol>
                  </MDBRow>



                <MDBRow className="existing-notes-container">
                    <MDBCol md="12">
                       

                            {this.state.notesData && this.state.notesData.map((row, index) => {
                                if (row.noteType === 'Care Plan') {
                                    return (
                                        <div className="hoverable">
                                        <MDBCard>
                                            <MDBCardBody onClick={()=>this.handleDescription(index,row.description)} className={this.state.clickedIndex === index ? 'barrier-selected':''}>
                                            <p>{row.dates}</p>
                                            <div className="notes-type notes-color1">{row.noteType}</div>
                                            <h5 className="note-title">{row.noteTitle} <span className="collapser" onClick={this.toggleCollapse('note0')}><i className={this.state.collapseID === 'note0' ? "fa fa-angle-up rotate-icon" : "fa fa-angle-down "} /></span></h5>
                                              <MDBCollapse id="note0" isOpen={this.state.collapseID}>
                                                <div className="notes-description">{row.description} </div>
                                                <div className="sub-note">{row.provider}</div>
                                            </MDBCollapse> 
                                            
                                            </MDBCardBody>
                                        </MDBCard>
                                        </div>
                                    );
                                }
                                if (row.noteType === 'EMR') {
                                    return (
                                        <div className="hoverable">
                                        <MDBCard>
                                            <MDBCardBody onClick={()=>this.handleDescription(index,row.description)} className={this.state.clickedIndex === index ? 'barrier-selected':''}>
                                            <p>{row.dates}</p>
                                            <div className="notes-type notes-color2">{row.noteType}</div>
                                            <h5 className="note-title">{row.noteTitle} <span className="collapser" onClick={this.toggleCollapse('note1')}><i className={this.state.collapseID === 'note1' ? "fa fa-angle-up rotate-icon" : "fa fa-angle-down "} /></span></h5>
                                              <MDBCollapse id="note1" isOpen={this.state.collapseID}>
                                                <div className="notes-description">{row.description} </div>
                                                <div className="sub-note">{row.provider}</div>
                                            </MDBCollapse> 
                                            
                                            </MDBCardBody>
                                        </MDBCard>
                                        </div>
                                    );
                                }
                                if (row.noteType === 'Call Note') {
                                    return (
                                        <div className="hoverable">
                                        <MDBCard>
                                            <MDBCardBody onClick={()=>this.handleDescription(index,row.description)} className={this.state.clickedIndex === index ? 'barrier-selected':''}>
                                            <p>{row.dates}</p>
                                            <div className="notes-type notes-color3">{row.noteType}</div>
                                            <h5 className="note-title">{row.noteTitle} <span className="collapser" onClick={this.toggleCollapse('note2')}><i className={this.state.collapseID === 'note2' ? "fa fa-angle-up rotate-icon" : "fa fa-angle-down "} /></span></h5>
                                              <MDBCollapse id="note2" isOpen={this.state.collapseID}>
                                                <div className="notes-description">{row.description} </div>
                                                <div className="sub-note">{row.provider}</div>
                                            </MDBCollapse> 
                                            
                                            </MDBCardBody>
                                        </MDBCard>
                                        </div>
                                    );
                                }
                                if (row.noteType === 'ICT Note') {
                                    return (
                                        <div className="hoverable">
                                        <MDBCard>
                                            <MDBCardBody onClick={()=>this.handleDescription(index,row.description)} className={this.state.clickedIndex === index ? 'barrier-selected':''}>
                                            <p>{row.dates}</p>
                                            <div className="notes-type notes-color4">{row.noteType}</div>
                                            <h5 className="note-title">{row.noteTitle} <span className="collapser" onClick={this.toggleCollapse('note3')}><i className={this.state.collapseID === 'note3' ? "fa fa-angle-up rotate-icon" : "fa fa-angle-down "} /></span></h5>
                                              <MDBCollapse id="note3" isOpen={this.state.collapseID}>
                                                <div className="notes-description">{row.description} </div>
                                                <div className="sub-note">{row.provider}</div>
                                            </MDBCollapse> 
                                             </MDBCardBody>
                                        </MDBCard>
                                        </div>
                                    );
                                }

                                if (row.noteType === 'Barrier Note') {
                                    return (
                                        <div className="hoverable">
                                        <MDBCard>
                                            <MDBCardBody onClick={()=>this.handleDescription(index,row.description)} className={this.state.clickedIndex === index ? 'barrier-selected':''}>
                                            <p>{row.dates}</p>
                                            <div className="notes-type notes-color5">{row.noteType}</div>
                                            <h5 className="note-title">{row.noteTitle} <span className="collapser" onClick={this.toggleCollapse('note4')}><i className={this.state.collapseID === 'note4' ? "fa fa-angle-up rotate-icon" : "fa fa-angle-down "} /></span></h5>
                                              <MDBCollapse id="note4" isOpen={this.state.collapseID}>
                                                <div className="notes-description">{row.description} </div>
                                                <div className="sub-note">{row.provider}</div>
                                            </MDBCollapse> 
                                             </MDBCardBody>
                                        </MDBCard>
                                        </div>
                                    );
                                }
                                if (row.noteType === 'General Note') {
                                    return (
                                        <div className="hoverable">
                                        <MDBCard>
                                            <MDBCardBody onClick={()=>this.handleDescription(index,row.description)} className={this.state.clickedIndex === index ? 'barrier-selected':''}>
                                            <p>{row.dates}</p>
                                            <div className="notes-type notes-color6">{row.noteType}</div>
                                            <h5 className="note-title">{row.noteTitle} <span className="collapser" onClick={this.toggleCollapse('note5')}><i className={this.state.collapseID === 'note5' ? "fa fa-angle-up rotate-icon" : "fa fa-angle-down "} /></span></h5>
                                              <MDBCollapse id="note5" isOpen={this.state.collapseID}>
                                                <div className="notes-description">{row.description} </div>
                                                <div className="sub-note">{row.provider}</div>
                                            </MDBCollapse> 
                                             </MDBCardBody>
                                        </MDBCard>
                                        </div>
                                    );
                                }


                            })}



                        
                    </MDBCol>
                </MDBRow>

               
              
                {!this.state.isLoaded && <Loader />}
                <style jsx>{NotesStyle}</style>
            </>
        );
    }
};

export default ExistingNotes;

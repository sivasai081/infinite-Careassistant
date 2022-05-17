
import React, { Component } from "react";
import {
    MDBRow, MDBCol, MDBTypography, MDBSelect,MDBDatePickerV5, MDBTimeline, MDBTimelineStep, MDBInput, MDBCollapse, MDBBtn, MDBModal,
    MDBModalHeader, MDBModalBody, MDBModalFooter, MDBChipsInput, MDBSelectInput, MDBSelectOptions, MDBSelectOption, MDBIcon
} from "mdbreact";
import NotesStyle from '../styles/notesStyle';
import Head from 'next/head'
import axios from 'axios';
import Layout from "../components/layout";
import Loader from '../components/loader';
import Pagination from '@material-ui/lab/Pagination';
import * as data from '../data/data';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import moment from 'moment';
// import Pagination from '@material-ui/lab/Pagination';



class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // isLoaded: true,
            maxLength: 350,
            searchFrom: [
                { text: "All", value: "1" },
                { text: "Call Note", value: "CALL" },
                { text: "Care Plan", value: "CAREPLAN" },
                { text: "EMR", value: "EMR" },
                { text: "ICT Note", value: "ICT" },
                { text: "Barrier Note", value: "BARRIER" },
                { text: "General Note", value: "GENERAL" },
                { text: "Action Note", value: "ACTION" }
            ],
            notesDropdown: [
                { text: "Call Note", value: "CALL" },
                { text: "Care Plan", value: "CAREPLAN" },
                { text: "EMR", value: "EMR" },
                { text: "ICT Note", value: "ICT" },
                { text: "Barrier Note", value: "BARRIER" },
                { text: "General Note", value: "GENERAL" },
                { text: "Action Note", value: "ACTION" }
            ],
            fromTo: [
                { text: "All Time", value: "1" },

            ],
            getallnotes: [],
            totalCountofrecords: 12,
            pageFrom: 1,
            perPage: 5,
            page: 1,
            searchedText: '',
            notesData: data.notesData.data,
            notesfilterdata: data.notesData.data,
            newcallnotemodal: false,
            newictnotemodal: false,
            chipConfirmmodal: false,
            patientid: '',
            notesdescription: '',
            notestitle: '',
            filterationallnotes: [],
        }
    }

    componentDidMount() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        let patientid = localStorage.getItem('patientId');
        let caremanagerId = localStorage.getItem('caremanagerId');
        let careManagerFirstname = localStorage.getItem('careManagerFirstname');
        let role = localStorage.getItem('role');
        let careManagerLastname = localStorage.getItem('careManagerLastname');
        this.setState({ patientid: patientid, caremanagerId: caremanagerId, careManagerFirstname,careManagerLastname,role });
        axios.get(`/api/getallnotes`, {
            params: {
                id: patientid
            }
        })
            .then(res => {
                this.setState({ filterationallnotes:res.data.json.result,  getallnotes: res.data.json.result });
            })
    }

    handleSearch = _e => {
        this.setState({ searchedText: _e.target.value }, () => {
            const filteredData = this.state.filterationallnotes.filter(value => {
                const searchStr = this.state.searchedText.toLowerCase();
                const noteTypeMatches = value.note_type.toLowerCase().includes(searchStr);
                const noteTitleMatches = value.title.toLowerCase().includes(searchStr);
                const descriptionMatches = value.notes.toLowerCase().includes(searchStr);
                return noteTypeMatches || noteTitleMatches || descriptionMatches;
            });
            this.setState({ getallnotes: filteredData });

        })
    }

    handleSearchNote = val => {
        let filterationallnotes = this.state.filterationallnotes;
        let notes = [];
        if (val[0] === "1") {
            notes = filterationallnotes
        } else {
            notes = filterationallnotes.filter((el) => el.note_type === val[0])
        }
        this.setState({ getallnotes: notes })
    }

    handleMonths = val => {
        console.log("months=", val)
    }

    handlePageChange = (e, val) => {
        this.setState({
            pageFrom: ((val * this.state.perPage) - (this.state.perPage - 1)),page: val
        });
    }
    paginate(array, page_size, page_number) {
        return array.slice((page_number - 1) * page_size, page_number * page_size);
    }

    addnewcallnote = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.setState({
            newcallnotemodal: true
        });
    }
    newcallnotetoggle = () => {
        this.setState({
            newcallnotemodal: !this.state.newcallnotemodal
        });
    }
    addnewictnote = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.setState({
            newictnotemodal: true
        });
    }
    newictnotetoggle = () => {
        this.setState({
            newictnotemodal: !this.state.newictnotemodal
        });
    }



    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));

    showDescription = (row, noteId) => {
        if (row.notes.length < this.state.maxLength) {
            return (
                <>
                    <div className="notes-description">{row.notes} </div>
                </>
            )
        } else {
            return (
                <>
                    <div className="notes-description">{row.notes.substring(0, this.state.maxLength)} {<span onClick={this.toggleCollapse(noteId)}><i className={this.state.collapseID === noteId ? "" : "fa fa-angle-down "} /></span>}
                        <MDBCollapse id={noteId} isOpen={this.state.collapseID}>
                            <div className="notes-description1">{row.notes.substring(this.state.maxLength, row.description.length - 1)} <span onClick={this.toggleCollapse(noteId)}><i className={this.state.collapseID === noteId ? "fa fa-angle-up rotate-icon" : "fa fa-angle-down "} /></span></div>

                        </MDBCollapse>
                    </div>

                </>
            )
        }

    }

    handleChip = (val) => {
        this.setState({ chipConfirmmodal: true })
    }

    handleremoveChip = (val) => {
        this.setState({ chipConfirmmodal: true })
    }



    newchipconfirmtoggle = () => {
        this.setState({
            chipConfirmmodal: !this.state.chipConfirmmodal
        });
    }

    handlenoteChange = (e) => {
        this.setState({ noteType: e[0] })
    }

    notesTitle = (e) => {
        this.setState({ notestitle: e.target.value })
    }

    notesDescription = (e) => {
        this.setState({ notesdescription: e.target.value })
    }

    handleActionDueDatechange = (value) => {
        this.setState({
          actionduedate: value
        });
      }


    savenotes = () => {
        let data = {
            patient_id: this.state.patientid,
            notes: this.state.notesdescription,
            title: this.state.notestitle,
            status: "NEW",
            tags: [],
            note_type: this.state.noteType,
            modified_on: new Date(),
            updated_by: this.state.caremanagerId,
            created_by: this.state.careManagerFirstname + " " + this.state.careManagerLastname,
            created_by_role: this.state.role,
            due_date: this.state.noteType == "ACTION" ?  moment(this.state.actionduedate).format("YYYY-MM-DDTHH:mm:ss") : undefined
       }
        axios({
            method: 'POST',
            url: `/api/createnotes`,
            data: data,
        })
            .then((response) => {
                this.setState({
                    createnotesrespomse: response.data.json, newcallnotemodal: false
                }, ()=>{
                    axios.get(`/api/getallnotes`, {
                        params: {
                            id: this.state.patientid
                        }
                    })
                    .then(res => {
                        this.setState({ getallnotes: res.data.json.result, newcallnotemodal: false });
                    })
                });
                

            })
            .catch(function (response) { console.log(response); });
    }

    render() {
        let getallnotes = this.state.getallnotes;
        let rowslength = this.state.getallnotes.length;
        return (
            <React.Fragment>
                <Head>
                    <title>Healthlligence</title>
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
                </Head>
                <Layout>
                    <MDBRow className='search-container' style={{ marginBottom: "1rem" }}>
                        <MDBCol md="5" className="notes-dropdown">
                            <MDBSelect
                                style={{ width: "30%" }}
                                options={this.state.searchFrom}
                                selected="All"
                                getValue={(val) => this.handleSearchNote(val)}
                            />
                        </MDBCol>

                        <MDBCol md="7">

                            <div class="recent_activity_search_container">
                                <MDBIcon icon="search" className="recent_activity_search_icon" style={{ color: "#424242" }} />
                                <input placeholder="Search" id="searching" className="recent_activity_search_bar" type="text" value={this.state.searchedText} onChange={this.handleSearch.bind(this)}></input>
                                <MDBBtn color="" className="primarybutton" style={{ width: "130px;" }} onClick={this.addnewcallnote}>Add Note</MDBBtn>
                            </div>
                        </MDBCol>


                    </MDBRow>



                    <MDBRow className="notes-container" style={{ marginTop: "-40px", marginBottom: "-40px" }}>
                        <MDBCol md="12">
                            <MDBTimeline>

                                { this.paginate(getallnotes, this.state.perPage, this.state.page).map((el)=>{
                                    return(
                                        <MDBTimelineStep inverted color={el.note_type == "ICT" ? "success-color" : el.note_type == "CALL" ? "info-color-dark" : el.note_type == "CAREPLAN" ? "danger-color-dark" : el.note_type == "EMR" ? "default-color-dark" : el.note_type == "BARRIER" ? "red accent-1" : el.note_type == "GENERAL" ? "pink" : el.note_type == "ACTION" ? "light-blue lighten-1" : null } icon={el.note_type == "ICT" ? "exchange-alt" : el.note_type == "CALL" ? "file-alt" : el.note_type == "CAREPLAN" ? "clinic-medical" : el.note_type == "EMR" ? "desktop" : el.note_type == "BARRIER" ? "box-open" : el.note_type == "GENERAL" ? "sticky-note" : el.note_type == "ACTION" ? "check-double" : null }>
                                            <p>{moment(el.modified_on).format("MM/DD/YYYY HH:mm:ss")}</p>
                                            <div style={{marginTop: "8px"}} className={el.note_type == "ICT" ? "notes-type notes-color4" : el.note_type == "CALL" ? "notes-type notes-color3" : el.note_type == "CAREPLAN" ? "notes-type notes-color1" : el.note_type == "EMR" ? "notes-type notes-color2" : el.note_type == "BARRIER" ? "notes-type notes-color5" : el.note_type == "GENERAL" ? "notes-type notes-color6" : el.note_type == "ACTION" ? "notes-type notes-color7" : null }>
                                                {el.note_type == "ICT" ? "ICT Note" : el.note_type == "BARRIER" ? "Barrier Note" : el.note_type == "ICT" ? "ICT Note" : el.note_type == "GENERAL" ? "General Note" : el.note_type == "CAREPLAN" ? "Care Plan" : el.note_type == "CALL" ? "Call Note" : el.note_type == "EMR" ? "EMR" : el.note_type == "ACTION" ? "Action Note" : null }
                                            </div>
                                            <MDBRow>
                                                <MDBCol md="12">
                                                    <h5 className="note-title">{el.title}</h5>
                                                </MDBCol>
                                                {/* <MDBCol md="5" className="notes-chip">
                                                    <MDBChipsInput handleRemove={(value)=>this.handleremoveChip(value)}  handleAdd={(value)=>this.handleChip(value)} chips={row.tags} placeholder='Enter a tag' secondaryPlaceholder='Enter a tag' />
                                                </MDBCol> */}
                                            </MDBRow>
                                            {this.showDescription(el, "note3")}
                                            <div className="sub-note1">{el.created_by + ", " + el.created_by_role}</div>
                                        </MDBTimelineStep>
                                    )
                                })

                                }



                            </MDBTimeline>
                        </MDBCol>
                    </MDBRow>

                    <MDBModal isOpen={this.state.newcallnotemodal} toggle={this.newcallnotetoggle} className="newnotesmodal">
                        <MDBModalHeader className="modaltitle" toggle={this.newcallnotetoggle}>Add Note</MDBModalHeader>
                        <MDBModalBody className="newnotesmodalbody">
                            <MDBRow>
                                <MDBCol className="note-col">
                                    <MDBSelect
                                        options={this.state.notesDropdown}
                                        selected="choose a Type"
                                        className="month-right-dropdown-careplan"
                                        getValue={(val) => this.handlenoteChange(val)}
                                    />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="12" className="addnotetitle">
                                    <MDBInput type="text" label="Title" onChange={this.notesTitle} className="marginfortitle" style={{ marginTop: "-30px" }}></MDBInput>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="12">
                                    <div className="notescardbody">
                                        <MDBInput type="textarea" onChange={this.notesDescription} className="addnotetextarea" label="Please write the note"></MDBInput>
                                    </div>
                                </MDBCol>
                            </MDBRow>

                            {
                                this.state.noteType == "ACTION" ?
                                    <MDBRow style={{ marginRight: "0px" }}>
                                        <MDBCol md="12" style={{ marginLeft: "10px" }}>
                                            <MDBDatePickerV5 className="calender" theme="danger" emptyLabel='Action Due Date' getValue={(value) => this.handleActionDueDatechange(value)} />
                                        </MDBCol>
                                    </MDBRow> : null
                            }

                            

                            
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn flat className="flatbutton" onClick={this.newcallnotetoggle}>Cancel</MDBBtn>
                            <MDBBtn flat className="flatbutton" onClick={this.savenotes}>save</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>


                    <MDBModal isOpen={this.state.chipConfirmmodal} toggle={this.newchipconfirmtoggle} className="newnotesmodal">
                        <MDBModalHeader className="modaltitle" toggle={this.newchipconfirmtoggle}>Warning</MDBModalHeader>
                        <MDBModalBody className="newnotesmodalbody">
                            <MDBRow className="chip-warning">
                                <MDBCol>
                                    <MDBTypography tag="h6">Adding and Removing tags will impact NLP, please
                                        add/remove the tag carefully.</MDBTypography>
                                    <MDBInput label="Don't show this message again" type="checkbox" id="dotnotshow" className="dontshow" />
                                </MDBCol>
                            </MDBRow>


                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn flat className="flatbutton" onClick={this.newchipconfirmtoggle}>Cancel</MDBBtn>
                            <MDBBtn flat className="flatbutton" onClick={this.newchipconfirmtoggle} >Okay</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>

                    <MDBRow className="notes-pagination">
                        <MDBCol>
                            <Pagination count={Math.ceil(rowslength / this.state.perPage)} page={this.state.page} color="primary" onChange={this.handlePageChange} />
                        </MDBCol>
                    </MDBRow>
                    {/* {!this.state.isLoaded && <Loader />} */}
                    <style jsx>{NotesStyle}</style>
                </Layout>
            </React.Fragment>
        );
    }
};

export default Notes;

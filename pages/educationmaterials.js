import React, { Component } from "react";
import Head from 'next/head'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Layout from '../components/layout';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { MDBTypography, MDBFormInline, MDBSelect, MDBPopover, MDBTooltip, MDBContainer, MDBChipsInput, MDBPopoverBody, MDBPopoverHeader, MDBProgress, MDBAvatar, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBDataTableV5, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBIcon, MDBInput, MDBDatePicker } from "mdbreact";
import moment from 'moment';
import Loader from '../components/loader';
import educationMaterialstyles from '../styles/educationmaterials';
import Dropzone from "react-dropzone";
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import Pagination from '@material-ui/lab/Pagination';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
} from 'mdb-react-ui-kit';

import { Upload } from "@progress/kendo-react-upload";
import '@progress/kendo-theme-default/dist/all.css';


class EducationMaterial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            filePreviews: {},
            perPage: 10,
            page: 1,
            createeducationalmaterial: false,
            acceptedFiles: [],
            acceptedFileNames: [],
            setImageModal: false,
            basicActive: "tab1",
            items: [
                {
                    id: 0,
                    name: 'Melissa Howard'
                },
                {
                    id: 1,
                    name: 'Denny Jackson'
                },
                {
                    id: 2,
                    name: 'John Kumar'
                }],
            problemitems: [
                {
                    id: 0,
                    name: 'Hypertension'
                },
                {
                    id: 1,
                    name: 'Colon Cancer'
                },
                {
                    id: 2,
                    name: 'Diabetes'
                }],
            patients: [{
                text: "Melissa Howard",
                value: "Melissa Howard"
            },
            {
                text: "Denny Jackson",
                value: "Denny Jackson"
            },
            {
                text: "John Kumar",
                value: "John Kumar"
            }],
            languages: [{
                text: "English",
                value: "English"
            },
            {
                text: "Spanish",
                value: "Spanish"
            },
            {
                text: "Vietnamese",
                value: "Vietnamese"
            },
            {
                text: "Korean",
                value: "Korean"
            }],
            educationMaterials: {
                columns: [
                    {
                        label: 'Date',
                        field: 'date',


                    },
                    {
                        label: 'Patient',
                        field: 'patient',


                    },
                    {
                        label: 'Title',
                        field: 'title',


                    }, {
                        label: 'Language',
                        field: 'language',


                    },
                    {
                        label: 'Method',
                        field: 'method',


                    },
                    {
                        label: 'Format',
                        field: 'format',


                    }, {
                        label: 'Action',
                        field: 'action',


                    }],
                rows: [
                    {
                        date: "May 04 2020",
                        patient: "Melissa Howard",
                        title: "Cancer Care Guide book",
                        language: "English",
                        method: "Push, Email"
                    },
                    {
                        date: "May 02 2020",
                        patient: "Denny Jackson",
                        title: "HEDIS Information",
                        language: "Vietnamese",
                        method: "Push, Email, Hard Copy"
                    },
                    {
                        date: "Apr 22 2020",
                        patient: "Melissa Howard",
                        title: "Insurance Guide",
                        language: "English",
                        method: "Email"
                    },
                    {
                        date: "Apr 10 2020",
                        patient: "John Kumar",
                        title: "Wellbeing life Article",
                        language: "English",
                        method: "Email, Hard Copy"
                    },
                    {
                        date: "May 04 2020",
                        patient: "Melissa Howard",
                        title: "Cancer Care Guide book",
                        language: "English",
                        method: "Push, Email"
                    }

                ]
            }
        };
    }

    componentDidMount() {
        let education = this.state.educationMaterials;
        for (let i = 0; i < education.rows.length; i++) {
            education.rows[i].action = <div><MDBIcon icon="eye" className="iconcolor" /> <MDBIcon icon="edit" style={{ marginLeft: "12px" }} className="iconcolor" />   </div>
            education.rows[i].format = <div><MDBIcon icon="download" className="iconcolor" /> 
            {/* <a href="#"> */}
                {/* <img style={{ marginLeft: "12px", height: "24px", width: "24px" }} src="images/link.svg"  className="logo" />  */}
                {/* <img style={{ marginLeft: "12px", height: "24px", width: "24px" }} src="images/link_hover.svg"  className="logo-hover" />  */}
            {/* </a> */}
            
            <MDBIcon icon="paperclip" className="iconcolor" style={{ marginLeft: "24px" }}/> 
            {/* <img style={{ marginLeft: "12px", height: "24px", width: "24px" }} src="images/link.svg"  className="iconcolor" />  */}
            {/* <MDBIcon src="images/link.svg" style={{ marginLeft: "12px" }} className="iconcolor" />  */}
            {/* <MDBIcon icon="link" style={{ marginLeft: "12px", transform: "rotate(45deg)" }} className="iconcolor" />  */}
            </div>
            {/* <img style={{ marginLeft: "12px", height: "24px", width: "24px" }} className="linkcolor" src="/images/link.svg" />
             */}
            
        }
        this.setState({ educationMaterials: education })

    }

    createeducationalmaterialtoggle = () => {
        this.setState({
            createeducationalmaterial: !this.state.createeducationalmaterial
        });
    }

    educationalmaterialtoggle = () => {

    }

    handlePageChange = (e, val) => {
        this.setState({ pageFrom: ((val * this.state.perPage) - (this.state.perPage - 1)), page: val });
    }

    setImagemodaltoggle = () => {
        this.setState({
            setImageModal: !this.state.setImageModal
        });
    }

    addnewEducationalMaterial = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.setState({
            createeducationalmaterial: true,
        });
    }

    medialibrarymodal = () => {
        this.setState({
            setImageModal: true,
        });
    }

    handleBasicClick = (value) => {
        this.setState({
            basicActive: value
        });


    }

    // handleDrop = (acceptedFiles) => {
    //     this.setState({
    //         acceptedFiles: acceptedFiles,
    //         acceptedFileNames: acceptedFiles.map((files) => files.name),
    //         setImageModal: false
    //     });

    // };

    // closemediaimage = (value) => {
    //     let removeddata = this.state.acceptedFileNames.filter(item => item !== value)
    //     this.setState({
    //         acceptedFileNames: removeddata
    //     })
    // }


    handleOnSearch = (string, results) => {
        console.log(string, results)
    }

    handleOnHover = (result) => {
        console.log(result)
    }

    handleOnSelect = (item) => {
        console.log(item)
    }

    handleOnFocus = () => {
        console.log('Focused')
    }

    onAdd = (event) => {
        const afterStateChange = () => {
            event.affectedFiles
                .filter((file) => !file.validationErrors)
                .forEach((file) => {
                    const reader = new FileReader();

                    reader.onloadend = (ev) => {
                        this.setState({
                            filePreviews: {
                                ...this.state.filePreviews,
                                [file.uid]: ev.target.result,
                            },
                        });
                    };

                    reader.readAsDataURL(file.getRawFile());
                });
        };

        this.setState(
            {
                files: event.newState,
                
            },
            afterStateChange
        );
    };

    onRemove = (event) => {
        const filePreviews = {
            ...this.state.filePreviews,
        };

        event.affectedFiles.forEach((file) => {
            delete filePreviews[file.uid];
        });

        this.setState({
            files: event.newState,
            filePreviews: filePreviews,
        });
    };

    onProgress = (event) => {
        this.setState({
            files: event.newState,
            
        });
    };

    onStatusChange = (event) => {
        this.setState({
            files: event.newState,
        });
    };

    render() {
        let basicActive = this.state.basicActive;
        return (
            <React.Fragment>
                <Head>
                    <title>Healthlligence</title>
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
                </Head>

                <Layout>
                    <MDBTypography tag="h5" className="personalusers-info">Educational Materials</MDBTypography>
                    <MDBTypography tag="h6" className="basic-info"> You can check and upload all Educational Materials </MDBTypography>
                    <div style={{ maxWidth: "1400px", margin: "16px auto 0px auto" }}>
                        <MDBRow className="justify-content-center align-items-center">
                            <MDBCol sm="3" md="3" lg="3">
                                <div style={{ marginLeft: "4px" }}>
                                    <MDBSelect
                                        options={this.state.patients}
                                        selected="Select Patient"
                                    />
                                </div>
                            </MDBCol>
                            <MDBCol sm="6" md="6" lg="6">


                            </MDBCol>
                            <MDBCol sm="3" md="3" lg="3">
                            <div class="custom_search_container" style={{marginTop:"10px"}}>
                                            <MDBIcon icon="search" className="custom_search_icon" style={{ color: "#424242" }} />
                                            <input placeholder="Search" id="searching" className="custom_search_bar" type="text" ></input>
                                        </div>
                                {/* <div className="" style={{ float: "right" }}>
                                    <MDBIcon icon="search" className="searchIcon" />
                                    <input placeholder="Search" id="searching" className="searching" type="text" />
                                </div> */}
                            </MDBCol>
                        </MDBRow>
                        <MDBCard narrow style={{ marginTop: "-8px" }}>
                            <MDBCardBody cascade style={{ marginBottom: "16px" }}>

                                <MDBDataTableV5
                                    hover
                                    responsive
                                    data={this.state.educationMaterials}
                                    paging={false}
                                    searchBottom={false}
                                />


                            </MDBCardBody>
                        </MDBCard>

                        <div style={{ marginTop: "16px" }}>
                            <MDBBtn color="primary" style={{ margin: "0" }} className="createeducationmaterial" onClick={() => this.addnewEducationalMaterial()}>Create Educational Material</MDBBtn>
                        </div>

                        <div className="pagination-container" style={{ marginTop: "64px", marginBottom: "80px", marginLeft: "40px" }}>
                            <Pagination count={Math.ceil(10 / this.state.perPage)} page={this.state.page} color="primary" onChange={this.handlePageChange} />
                        </div>

                        <MDBModal isOpen={this.state.createeducationalmaterial} toggle={this.educationalmaterialtoggle} className="educationalmodal">
                            <MDBModalHeader className="modaltitle" toggle={this.educationalmaterialtoggle}>Create Educational Material</MDBModalHeader>
                            <MDBModalBody className="newproblemmodalbody" style={{ overflowY: "scroll", maxHeight: "400px" }}>
                                <MDBRow>
                                    <MDBCol sm="12" md="12" className="autosearch">
                                        <ReactSearchAutocomplete
                                            items={this.state.items}
                                            onSearch={this.handleOnSearch}
                                            onHover={this.handleOnHover}
                                            onSelect={this.handleOnSelect}
                                            onFocus={this.handleOnFocus}
                                            autoFocus
                                            placeholder="Patient"
                                            styling={{ zIndex: 999 }}
                                        />
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow>
                                    <MDBCol sm="12" md="12" className="autoprobelmsearch">
                                        <ReactSearchAutocomplete
                                            items={this.state.problemitems}
                                            onSearch={this.handleOnSearch}
                                            onHover={this.handleOnHover}
                                            onSelect={this.handleOnSelect}
                                            onFocus={this.handleOnFocus}
                                            autoFocus
                                            placeholder="Search Problem"
                                            styling={{ zIndex: 999 }}
                                        />
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow className="languagedropdown">
                                    <MDBCol sm="12" md="12">
                                        <MDBSelect
                                            options={this.state.languages}
                                            outline
                                            selected="Language"

                                        />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <span className="materials"> Materials</span>
                                </MDBRow>
                                <MDBRow className="createmedialibrary">
                                    <MDBBtn color="primary" className="medialibrary" onClick={() => this.medialibrarymodal()}>MEDIA LIBRARY</MDBBtn>

                                </MDBRow>
                                

                                <MDBRow>
                                    <MDBCol md="12">
                                        <div className="goalcardbody createedumodal">
                                            <MDBInput type="textarea" label="Please enter the hyper link"></MDBInput>
                                        </div>

                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className="educationalchips">
                                    <MDBChipsInput chips={['non-compliant', 'appointments']} placeholder='Enter a tag' secondaryPlaceholder='Enter a tag' />
                                </MDBRow>
                                <MDBRow style={{ marginTop: "-8px" }}>
                                    <span className="materials"> Method</span>
                                </MDBRow>
                                <div style={{ marginTop: "8px", display: "flex" }}>
                                    <MDBInput
                                        label='Push'
                                        type='checkbox'
                                        id='checkbox1'
                                        containerClass='mr-4'
                                    />
                                    <MDBInput
                                        label='Email'
                                        type='checkbox'
                                        id='checkbox2'
                                        containerClass='mr-4'
                                    />
                                    <MDBInput
                                        label='Hard Copy'
                                        type='checkbox'
                                        id='checkbox3'
                                        containerClass='mr-4'
                                    />


                                </div>



                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn flat className="flatbutton" onClick={this.createeducationalmaterialtoggle}>Cancel</MDBBtn>
                                <MDBBtn flat className="flatbutton">Send</MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>
                        <MDBModal isOpen={this.state.setImageModal} size="lg" toggle={this.setImagemodaltoggle} className="setImagemodal">
                            <MDBModalHeader className="modaltitle" toggle={this.setImagemodaltoggle}>Set Image</MDBModalHeader>
                            <MDBModalBody className="" style={{ overflowY: "scroll", minHeight: "450px", marginTop: "-24px" }}>
                                <MDBRow className="setimagetabs">
                                    <MDBTabs className='mb-3'>
                                        <MDBTabsItem>
                                            <MDBTabsLink onClick={() => this.handleBasicClick('tab1')} active={basicActive === 'tab1'}>
                                                Upload files
                                            </MDBTabsLink>
                                        </MDBTabsItem>
                                        <MDBTabsItem>
                                            <MDBTabsLink onClick={() => this.handleBasicClick('tab2')} active={basicActive === 'tab2'}>
                                                Media Library
                                        </MDBTabsLink>
                                        </MDBTabsItem>

                                    </MDBTabs>

                                    <MDBTabsContent className="setImagetabcontent">
                                        <MDBTabsPane show={basicActive === 'tab1'}>
                                           

                                            <div style={{ marginLeft: "-16px" }}>
                                                <Upload
                                                    batch={false}
                                                    multiple={true}
                                                    files={this.state.files}
                                                    onAdd={this.onAdd}
                                                    onRemove={this.onRemove}
                                                    onProgress={this.onProgress}
                                                    onStatusChange={this.onStatusChange}
                                                    withCredentials={false}
                                                    saveUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/save'}
                                                    removeUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/remove'}
                                                />


                                            </div>

                                        </MDBTabsPane>
                                        <MDBTabsPane show={basicActive === 'tab2'}>
                                            <div className="mediaimagediv">
                                                {this.state.files.length ? (
                                                    <div className={""}>
                                                        {Object.keys(this.state.filePreviews).map((fileKey, index) => (
                                                            <img
                                                                src={this.state.filePreviews[fileKey]}
                                                                alt={"image preview"}
                                                                className="mediaimage"
                                                                key={index}
                                                            />
                                                        ))}
                                                    </div>
                                                ) : undefined}
                                            </div>

                                        </MDBTabsPane>

                                    </MDBTabsContent>
                                </MDBRow>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn flat className="flatbutton" onClick={this.setImagemodaltoggle}>Cancel</MDBBtn>
                                <MDBBtn flat className="flatbutton">Save</MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>

                    </div>
                    <style jsx>{educationMaterialstyles}</style>


                </Layout>
            </React.Fragment>
        );
    }

}

export default EducationMaterial;
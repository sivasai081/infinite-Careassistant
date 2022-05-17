
import React, { Component } from "react";
import telemedicineStyle from '../styles/telemedicineStyles'
import { MDBSelect, MDBInput, MDBDatePickerV5, MDBCard, MDBCardBody, MDBSelectInput, MDBSelectOptions, MDBSelectOption, MDBCollapse, MDBRow, MDBCol, MDBTypography, MDBIcon, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBChipsInput, MDBPopover, MDBPopoverHeader, MDBPopoverBody } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Loader from '../components/loader';
import axios from 'axios';
import Video from 'twilio-video';
import moment from 'moment';


class VideoComponent extends Component {
    constructor(props) {
        super(props);
        this.remoteMedia = React.createRef();
        this.localMedia = React.createRef();
        this.state = {
            identity: null,
            token: null,
            roomName: '',
            previewTracks: null,
            localMediaAvailable: false,
            hasJoinedRoom: false,
            activeRoom: null,
            muteAudio:false,
            muteVideo:false,
            caremanagerEmail: '',
            timestamp: new Date(),
            participant: '',
            localParticipantJoined: false,
            isLoaded: true,
            showCopyUrlModel: false,
            textCopied: false
        }
    }

    start = () => {
        // let caremanagerEmail = localStorage.getItem('twilioidentity');
        // let uniqueName;
        // let uniqueNameArray = this.props.invitedmemberEmailForVideo.concat(caremanagerEmail.toString());
        // console.log(uniqueNameArray,"uniqueNameArray")
        // uniqueName = uniqueNameArray.sort().join("_");
        let options = {
            name: this.props.unique_name
        };
        let obj = {
            // roomName: uniqueName,
            roomName :this.props.unique_name,	
            identity: localStorage.getItem('twilioidentity')
        }
            axios({	
                method: 'POST',	
                url: `/api/twiliovideo`,	
                data: obj	
            })
            .then(response => {
                this.setState({ token: response.data.json.token, videoEnabled: true }, () => {
                    if (this.state.previewTracks) {
                        connectOptions.tracks = this.state.previewTracks;
                    }
                    console.log(this.state.token,options.name,"this.state.identity")
                    if(this.props.isvideoEnabled) this.props.isvideoEnabled(true)
                    Video.connect(this.state.token, options)
                        .then(this.connected, error => {
                            console.error(error.message);
                        });

                })
            })
               
    };

    // Add your video track
    addTracks = (tracks, container) => {
        tracks.forEach(tracker => {
            let track = tracker.track;
            console.log(track,"tracker")
            if (track) {
                container.appendChild(track.attach());
            }

        });
    }


    // Add participant video track
    addParticipantTracks = (participant, container) => {
        if(participant.identity){
            this.setState({
                isLoaded: false
            }) 
        }else{
            this.setState({
                isLoaded: true
            }) 
        }
        console.log(participant.identity,"participant")
        let tracks = Array.from(participant.tracks.values());
        console.log(tracks,"tracks")
        this.addTracks(tracks, container);
    }


    // After connection is success
    connected = (room) => {
        console.log(room.name,room.sid,"room")
        this.setState({
            activeRoom: room,
            localMediaAvailable: true,
            hasJoinedRoom: true
        });
        var previewContainer = this.localMedia.current;
        console.log(previewContainer,"previewContainer")
            this.addParticipantTracks(room.localParticipant, previewContainer);
        room.participants.forEach(remoteParticipant => {
          })
    //      setTimeout(() => {
    //          console.log(room.participants, room.participants, room.participants.size,"par")
    //             if(room.participants.size === 0){
    //                 room.disconnect(); 
    //                 this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
    //             }
    //    }, 45000);
        room.on('participantConnected', participant => {
            // do something
            console.log(`Participant "${participant.identity}" ,connected`,participant.tracks[0],"par");
            this.setState({
                participant : participant.identity
            })
            let previewContainer = this.remoteMedia.current;
            participant.tracks.forEach(publication => {
                if (publication.isSubscribed) {
                    const track = publication.track;
                    // previewContainer.appendChild(track.attach());
                    trackSubscribed(previewContainer, publication.track);
                }
            });
            // participant.on('trackSubscribed', track => {
            //     previewContainer.appendChild(track.attach());
            // });
            participant.on('trackSubscribed', track => this.trackSubscribed(previewContainer, track));
            participant.on('trackUnsubscribed', track =>  this.trackUnsubscribed(track));
        })
        room.on('trackRemoved', (track, participant) => {
            this.log(participant.identity + ' removed track: ' + track.kind);
            this.removeTracks([track]);
        });
        room.on('participantDisconnected', participant => {
            this.removeParticipantTracks(participant);
        });
        room.on('disconnected', () => {
            if (this.state.previewTracks) {
                this.state.previewTracks.forEach(track => {
                    track.stop();
                });
            }
            this.removeParticipantTracks(room.localParticipant);

            room.participants.forEach(this.removeParticipantTracks);
            this.state.activeRoom = null;
            this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
        });
    };
    trackSubscribed = (previewContainer, track) => {
        previewContainer.appendChild(track.attach());
    }
    trackUnsubscribed = (track) => {
        track.detach().forEach(element => element.remove());
    }

    // Function called when user click end button
    end = () => {
        this.state.activeRoom.disconnect();
        console.log(this.state.activeRoom,"this.state.activeRoom")
        this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
        //localStorage.setItem("videocalldata",JSON.stringify({videoEnabled:false, roomName:this.state.roomName, username: this.props.username }))
    };


    // Removing local track
    removeTracks = (tracks) => {
        tracks.forEach(track => {
            if (track.track) {
                track.track.detach().forEach(detachedElement => {
                    detachedElement.remove();
                });
            }
        });

    };


    // Removing participant's track
    removeParticipantTracks = (participant) => {
        var tracks = Array.from(participant.tracks.values());
        this.removeTracks(tracks);

    };

    muteOrUnmuteYourMedia = (room, kind, action) => {
        const publications = kind === 'audio'
            ? room.localParticipant.audioTracks
            : room.localParticipant.videoTracks;

        publications.forEach(function (publication) {
            if (action === 'mute') {
                publication.track.disable();
                
            } else {
                publication.track.enable();
            }
        });
    };


    muteYourAudio = (room) => {
        this.setState({ muteAudio : true },()=> this.muteOrUnmuteYourMedia(room, 'audio', 'mute'))
    };


    muteYourVideo = (room) => {
        this.setState({ muteVideo : true },()=> this.muteOrUnmuteYourMedia(room, 'video', 'mute'))
     };

    unmuteYourAudio = (room) => {
        this.setState({ muteAudio : false },()=>this.muteOrUnmuteYourMedia(room, 'audio', 'unmute'))
    };


    unmuteYourVideo = (room) => {
        this.setState({ muteVideo : false },()=> this.muteOrUnmuteYourMedia(room, 'video', 'unmute'))
    };
    muteAudio = (e) => {

        const mute = !e.target.classList.contains('muted');
        if (mute) {
            this.muteYourAudio(this.state.activeRoom);
            e.target.classList.add('muted');
        } else {
            this.unmuteYourAudio(this.state.activeRoom);
            e.target.classList.remove('muted');
        }
    }

    muteVideo = e => {
        const mute = !e.target.classList.contains('muted');
        if (mute) {
            this.muteYourVideo(this.state.activeRoom);
            e.target.classList.add('muted');
        } else {
            this.unmuteYourVideo(this.state.activeRoom);
            e.target.classList.remove('muted');
        }
    }
     shareScreenHandler = (event) =>{
        // event.preventDefault();
        event.persist();
        let screenTrack;
        const shareScreen = this.localMedia.current;
        if (!screenTrack) {
            console.log("navigator==",navigator.mediaDevices)
            navigator.mediaDevices.getDisplayMedia().then(stream => {
                screenTrack = new Video.LocalVideoTrack(stream.getTracks()[0]);
                console.log("twilio==",screenTrack,"room==",this.state.activeRoom)
                this.state.activeRoom.localParticipant.publishTrack(screenTrack);
                //shareScreen.innerHTML = 'Stop sharing';
                screenTrack.mediaStreamTrack.onended = () => { this.shareScreenHandler(event) };
            }).catch(() => {
                alert('Could not share the screen.');
            });
        }
        else {
            this.state.activeRoom.localParticipant.unpublishTrack(screenTrack);
            screenTrack.stop();
            screenTrack = null;
            shareScreen.innerHTML = 'Share screen';
        }
    };
    copyMeetingUrl = () => {
        this.setState({
            showCopyUrlModel: !this.state.showCopyUrlModel
        })
    }
    toggleshowCopyUrlModel = () => {
        this.setState({
            showCopyUrlModel: !this.state.showCopyUrlModel
        })
    }
    closeCopyCallLink = () => {
        this.setState({
            showCopyUrlModel: !this.state.showCopyUrlModel,
            textCopied: false
        })
    }
    copyCallLink(){
        var textBox = document.getElementById("TextboxValue");
        textBox.select();
        document.execCommand("copy");
        this.setState({
            textCopied: true
        })
    }
    render() {
        return (
            <>
               <div className="maincontainer">
                    <div className="local-media" ref={this.localMedia} id="local-media">
                    {this.state.isLoaded ? <Loader /> : ""}
                        {this.state.hasJoinedRoom &&
                            (
                                <div className="video-icons">
                                    {/* <time class="k-message-time1" >{moment(this.state.timestamp, 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm A')}</time> */}
                                    {this.state.muteAudio ? 
                                    <img src="/images/muteAudio.svg" className="" onClick={(e) => this.muteAudio(e)} /> :
                                    <img src="/images/callmic.png" className="" onClick={(e) => this.muteAudio(e)} />
                                     }
                                    <img src="/images/callend.png" onClick={this.end} />
                                    {this.state.muteVideo ?
                                    <img src="/images/muteVideo.svg" className="" onClick={(e) => this.muteVideo(e)} />:
                                    <img src="/images/callvideo.png" className="" onClick={(e) => this.muteVideo(e)} />
                                     }
                                     <img src="/images/sharescreen.svg" onClick={(e) => this.shareScreenHandler(e)} />
                                     {/* <span className="copylinkClass"><MDBIcon icon="link" size="sm" className="linkIcon" onClick={() => this.copyMeetingUrl(this)} /></span> */}
                                    {/* <time class="k-message-time1" >{moment(this.state.timestamp, 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm A')}</time> */}
                                </div>)}
                    </div>
                    <div className="remote-media" ref={this.remoteMedia} id="remote-media" />
                </div> 
                <style jsx>{telemedicineStyle}</style>
            </>
        );
    }
}

export default VideoComponent;
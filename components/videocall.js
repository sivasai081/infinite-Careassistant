
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


class VideoCall extends Component {
    constructor(props) {
        super(props);
        this.remoteMedia = React.createRef();
        this.localMedia = React.createRef();
        this.state = {
            identity: null,
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
        // console.log(this.props.groupName,"groupname")
        let caremanagerEmail = localStorage.getItem('twilioidentity');
        let uniqueName;
        if(this.props.invitedmemberEmailForVideo.length > 1){
        let uniqueNameArray = this.props.invitedmemberEmailForVideo.concat(caremanagerEmail.toString());
        console.log(uniqueNameArray,"uniqueNameArray")
        uniqueName = uniqueNameArray.sort().join("_");
        }else{
        let uniqueNameArray = [this.props.invitedmemberEmailForVideo[0],caremanagerEmail].sort();
        console.log(uniqueNameArray,"uniqueNameArray")
        uniqueName = uniqueNameArray.join("_");
        }
        // let uniqueNameArray = [this.props.invitedmemberEmailForVideo[0].toString(),caremanagerEmail.toString()].sort();
        // debugger
        // let uniqueName;
        //   if(uniqueNameArray.length > 2){
      
        //   }else{
        //     uniqueName = uniqueNameArray.join("_");
        //   }
        let options = {
            // name: this.state.roomName
            name: uniqueName
        };
        let obj = {	
            // roomName: this.state.roomName,
            roomName: uniqueName,	
            identity: localStorage.getItem('twilioidentity')
	
        }
            axios({	
                method: 'POST',	
                url: `/api/twiliovideo`,	
                data: obj	
            })
            .then(response => {
                this.setState({ identity: response.data.json.token, token: this.state.roomName, videoEnabled: true }, () => {
                    if (this.state.previewTracks) {
                        connectOptions.tracks = this.state.previewTracks;
                    }
                    console.log(this.state.identity,options.name,"this.state.identity")
                    //localStorage.setItem("videocalldata",JSON.stringify({videoEnabled:true, roomName:this.state.roomName, username: this.props.username }))
                    if(this.props.isvideoEnabled) this.props.isvideoEnabled(true)
                    // To initialize connection to twilio
                    Video.connect(this.state.identity, options)
                        .then(this.connected, error => {
                            console.error(error.message);
                        });

                })
            })
            // var x = new Date()
            // var UTCseconds = (x.getTime() + x.getTimezoneOffset()*60*1000)/1000;
            let dataforVideoCall;
            if(this.props.groupName !== ""){
                dataforVideoCall =  {
                    type: "video",
                    timestamp: Date.parse(new Date()),
                    currentTime: new Date(),
                    UTCTime: (new Date().getTime() + new Date().getTimezoneOffset()*60*1000)/1000,
                    roomname : uniqueName,
                    message: "Caremanager is calling...",
                    from_user: this.props.groupName,
                    category: "MEETING_INVITATION",
                    title: "Caremanager is calling...",
                    body: this.props.groupName

                }
            }else{
                dataforVideoCall =  {
                    type: "video",
                    timestamp: Date.parse(new Date()),
                    currentTime: new Date(),
                    UTCTime: (new Date().getTime() + new Date().getTimezoneOffset()*60*1000)/1000,
                    roomname : uniqueName,
                    message: "Caremanager is calling...",
                    from_user: caremanagerEmail,
                    category: "MEETING_INVITATION",
                    title: "Caremanager is calling...",
                    body: caremanagerEmail
                }
            }
                let objPushData = {
                    user_id_list: this.props.patientId,
                    // user_id_list: this.props.invitedmemberEmailForVideo,
                    data: dataforVideoCall
                }
                axios({
                    method: 'POST',
                    url: `/api/sendPushDataMessage`,
                    data: objPushData
                })
                .then((response) => {
                    // console.log(response,"response")
                    // console.log(response,"res", Date.parse(new Date()), "response")
                    // return this.channel.join().catch(() => {
                    //   return;
                    // });
                })
                // .then(() => {
                //     setTimeout(() => {
                //         this.state.activeRoom.disconnect();
                //         // this.setState({hasJoinedRoom: false})
                //     }, 45000);
                // })
                .catch(err => {
                    console.log(err,"err");
                })
            .catch((err) => console.log(err))


    };

    // Add your video track
    addTracks = (tracks, container) => {
        // console.log("container==",container)
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
        // let connectedTime = moment(new Date(), 'ddd DD-MMM-YYYY, hh:mm:ss A').format('hh:mm:ss A');
        // console.log(connectedTime,"connectedTime")
        var previewContainer = this.localMedia.current;
        console.log(previewContainer,"previewContainer")
        // Note: Twilio reasponse will give video object
        // if (!previewContainer.querySelector('video')) {

            this.addParticipantTracks(room.localParticipant, previewContainer);
        // }
        // Following functions are called based on the actions
        // room.participants.forEach(participant => {
        //     var previewContainer = this.remoteMedia.current;
        //      this.addParticipantTracks(participant, previewContainer);
        // });
        // console.log(this.state.activeRoom,"this.state.activeRoom")
        room.participants.forEach(remoteParticipant => {
            // remoteParticipant.disconnect()
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
            // participant.on('trackSubscribed', track => {
            //         var item = document.getElementById("remote-media").childNodes;
            //         // console.log(item,"item")
            //         // if(item.length === 0){
            //         //     console.log(item.length,"item")
            //         //     previewContainer.appendChild(track.attach());
            //         // }else{
            //         //     var list = document.getElementById("remote-media");
            //         //     console.log(list,"list")   // Get the <ul> element with id="myList"
            //         //     list.removeChild(list.childNodes[0]);
            //         //     previewContainer.appendChild(track.attach());
            //         // }
            //         if(track){
            //             console.log(track,"track")
            //             previewContainer.appendChild(track.attach()).className = "firstVideo"
            //         }
            //         // console.log(previewContainer,"before")
            //         // previewContainer.appendChild(track.attach());
            //         console.log(previewContainer,"after")
            //         // previewContainer.replaceChild(track.attach(), item.childNodes[0]);
            // });

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
        let caremanagerEmail = localStorage.getItem('twilioidentity');
        let uniqueName;
        if(this.props.invitedmemberEmailForVideo.length > 1){
        let uniqueNameArray = this.props.invitedmemberEmailForVideo.concat(caremanagerEmail.toString());
        uniqueName = uniqueNameArray.sort().join("_");
        }else{
        let uniqueNameArray = [this.props.invitedmemberEmailForVideo[0].toString(),caremanagerEmail.toString()].sort();
        uniqueName = uniqueNameArray.join("_");
        }
        let modalClassName = this.state.showCopyUrlModel ? "show" : "hide";
        // console.log(this.state.roomName.activeRoom,"this.state.roomName.activeRoom.name")
        // console.log(moment(this.state.timestamp, 'ddd DD-MMM-YYYY, hh:mm:ss A').format('hh:mm:ss A'),"")
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
                                    <img src="/images/telemedicine/mute.svg" className="offstatus" onClick={(e) => this.muteAudio(e)} /> :
                                    <img src="/images/telemedicine/mic_424242.svg" className="" onClick={(e) => this.muteAudio(e)} />
                                     }
                                    <img src="/images/telemedicine/call_end_db1962.svg" onClick={this.end} />
                                    {this.state.muteVideo ?
                                    <img src="/images/telemedicine/videooff.svg" className="offstatus" onClick={(e) => this.muteVideo(e)} />:
                                    <img src="/images/telemedicine/videocam_424242.svg" className="" onClick={(e) => this.muteVideo(e)} />
                                     }
                                     <img src="/images/telemedicine/telemedicine_grey.svg" onClick={(e) => this.shareScreenHandler(e)} />
                                     <img src="/images/telemedicine/link_hover.svg" onClick={() => this.copyMeetingUrl(this)} />
                                     {/* <span className="copylinkClass"><MDBIcon icon="link" size="sm" className="linkIcon" onClick={() => this.copyMeetingUrl(this)} /></span> */}
                                    {/* <time class="k-message-time1" >{moment(this.state.timestamp, 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm A')}</time> */}
                                </div>)}
                    </div>
                    <div className="remote-media" ref={this.remoteMedia} id="remote-media" />
                    <div className={"copyUrlModal "+modalClassName}>
                        <div className="copyUrlheader">
                            <span style={{fontSize:"20px", fontWeight:"600"}}>Copy Call Link</span>
                        </div>
                        <div className="form-group inputClass">
                            <input
                                type="text"
                                className="form-control inputClassBox"
                                id="TextboxValue"
                                value={uniqueName}
                            />
                        </div>
                        <div class="btn-group">
                           {!this.state.textCopied ? <button type="button" className="btn btn-primary copyButton" onClick={this.copyCallLink.bind(this)}>Copy</button> :
                            <button type="button" className="btn btn-primary copiedlButton" onClick={this.copyCallLink.bind(this)}>Copied</button> }
                            <button type="button" className="btn btn-primary cancelButton" onClick={() => this.closeCopyCallLink(this)}>Cancel</button>
                        </div>
                    </div>
                </div> 
                <style jsx>{telemedicineStyle}</style>
            </>
        );
    }
}

export default VideoCall;
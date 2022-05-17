
import React, { Component } from "react";
import Layout from "../components/layout";
import telemedicineStyle from '../styles/telemedicineStyles'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import moment from 'moment';
import _ from 'lodash'
import { StaticRouter } from "react-router-dom";
import {
  MDBTypography, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBSelect, MDBInput, MDBBtn, MDBListGroup,
  MDBIcon, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBChipsInput, MDBChip
} from "mdbreact";
import axios from 'axios';
import Loader from '../components/loader';
import FriendList from '../components/FriendList';
import ContactList from '../components/ContactList'
import ChatApp from '../components/ChatApp'
// import MDBFullCalendar from 'mdb-full-calendar';
import VideoCall from '../components/videocall';
import StartDatetimepicker from '../components/DatetimePicker';
import EndDatetimepicker from '../components/DatetimePicker1';
import FullCalendar from '../components/FullCalendar'
import Chat from 'twilio-chat';
import Head from 'next/head'
// import { th } from "date-fns/locale";
// import { Window } from "@progress/kendo-react-dialogs";
// import MyWindowPortal from '../components/MyWindowPortal';

class Telemedicine extends Component {
  constructor(props) {
    super(props);
    this.remoteMedia = React.createRef();
    this.localMedia = React.createRef();
    this.video = React.createRef();
    this.state = {
      activeItemClassicTabs1: "1",
      selectedevent: "chat",
      opencreateAppointment: false,
      typeOfOperation: "",
      selectedAppointment: "",
      appointmentTypes: [
        { text: "ICT", value: 0 },
        { text: "Doctor Appointment", value: 1 }
      ],
      startdateValue: "",
      guestUserSelected: false,
      caremnagerId: "",
      enddateValue: "",
      title: "",
      editedId: "",
      description: "",
      guestUserMaildIds: [],
      patientdetailsresponse: {},
      telemedicinecalender: false,
      allappointments: [],
      search: '',
      members: ['Group1', 'Group2', 'Test Member'],
      memId: null,
      memData: {},
      roomName: "Healthalligence",
      isInvited: false,
      username: 'Keegan Sara',
      videoEnabled: false,
      avatar: 'images/member1.png',
      memfound: false,
      slectedMember: '',
      friends: [],
      contactList: [],
      chatList: [],
      chatopened: false,
      videochatopened: false,
      isgroupopened: false,
      groupmemIds: [],
      showinfo: false,
      infoTop: 0,
      contactListSearch: [],
      chatListSearch: [],
      addtoContact: false,
      createGroup: false,
      groupname: '',
      groupMemList: [],
      groupmembers: [],
      groupmemData: [],
      groupmemDataPatietId: [],
      groupmemEmailIds: [],
      searchgroup: false,
      createGroupSubmitted: false,
      finalGroupData: [],
      showGroupMem: false,
      showgroupinfo: false,
      groupinfoTop: 0,
      groupselected: '',
      invitedmember: [],
      invitedmemberEmail: [],
      invitedmemberEmailForVideo: [],
      patientId: [],
      searchStarts: false,
      groupchatopened: false,
      groupVideoCall: false,
      existingChannels: [],
      isvalidGroupName: true,
      careManagerEmail: '',
      groupName: '',
      showAudioCallMessageModal: false,
      isLoaded: true,
      token: '',
      messagesFromTwilio: [],
      caremanagerfirstname: '',
      windowStage: "FULLSCREEN",
      showWindowPortal: false,
    }
    this.toggleWindowPortal = this.toggleWindowPortal.bind(this);
    this.closeWindowPortal = this.closeWindowPortal.bind(this);
    // this.setupChatClient = this.setupChatClient.bind(this);
  }
  componentDidMount() {
    window.addEventListener("beforeunload", () => {
      this.closeWindowPortal();
    });
    let caremnagerId = localStorage.getItem('caremanagerId');
    let caremnagerEmail = localStorage.getItem('twilioidentity');
    let caremanagerfirstname = localStorage.getItem('careManagerFirstname');
    let patientId = localStorage.getItem('patientId');
    this.setState({
      careManagerEmail: caremnagerEmail,
      caremanagerfirstname: caremanagerfirstname,
      caremnagerId: caremnagerId
    })
    let patientObj;
    let members = [];
    let finalGroupData = [];
    let patientAppointments = [];
    axios({
      method: 'GET',
      url: `/api/appointments`,
      params: {
        id: caremnagerId,
        role: "CAREMANAGER"
      }
    })
      .then(res => {
        res.data.json.details.map((item) => {
          if (item.patient_id === patientId) {
            patientAppointments.push(item);
          }
        })
        this.setState({ allappointments: patientAppointments });
      })
    axios({
      method: 'GET',
      url: `/api/telemedicine`,
      params: {
        id: caremnagerId
      }
    })
      .then((res) => {
        this.setState({isLoaded: false})
        res.data.json.members.map((pat) => {
          if (pat.patient_id === patientId) {
            patientObj = {
              "personid": pat.patient_id,
              "prefix": pat.prefix,
              "email_id": pat.email,
              "firstname": pat.firstname,
              "lastname": pat.lastname,
              "profile_image_url": "",
              "role": "patient",
              "specialization": "patient",
              "suffix": pat.suffix,
              "twilio_details": pat.twilio_details
            }
            members.push(patientObj)
          }
        })
      })
      .then(() => {
        axios({
          method: 'GET',
          url: `/api/getCareTeamDetails`,
          params: {
            id: patientId
          }
        })
          .then((response) => {
            response.data.json.members.map((el) => {
              if (el.email_id !== caremnagerEmail) {
                members.push(el);
              }
            })
            this.setState({
               chatList: members,
              friends: members,
              contactList: members,
              contactListSearch: members,
              chatListSearch: members,
              groupMemList: members,
              groupListSearch: members
            }, () => {
              let groupName = ""; let grouedItem = {};
              //  this.setState({isLoaded: false})
              axios({
                method: 'POST',
                url: `/api/fetchGroupName`,
                params: {
                  id: patientId
                }
              })
                .then((response) => {
                  response.data.json.details && response.data.json.details.forEach((el, index) => {
                    if (el.unique_name) {
                      let groupDataObj = { groupName: el.group_name, groupData: [], uniquename: el.unique_name, color: [] };
                      response.data.json.details[index].member_list.forEach((id, i) => {
                        members.forEach((chat, ind) => {
                          if (chat.email_id === id) {
                            groupDataObj.groupData.push(chat);
                            let color;
                            if (chat.role.toLowerCase() === "socialworker") {
                              color = "#28b6f6";
                            } else if (chat.role.toLowerCase() === "doctor" || chat.role.toLowerCase().includes("doctor")) {
                              color = "#0288d1";
                            } else if (chat.role.toLowerCase() === "caremanager") {
                              color = "#db1962";
                            } else if (chat.role.toLowerCase() === "super admin") {
                              color = "#9e9e9e";
                            } else if (chat.role.toLowerCase() === "supervisor") {
                              color = "#db1962";
                            } else if (chat.role.toLowerCase() === "nurse") {
                              color = "#ff7367";
                            } else if (chat.role.toLowerCase() === "coordinator") {
                              color = "#00897b";
                            } else if (chat.role.toLowerCase() === "md") {
                              color = "#536dfe";
                            } else if (chat.role.toLowerCase() === "caregiver") {
                              color = "#7cb342";
                            } else if (chat.role.toLowerCase() === "patient") {
                              color = "#ff8a00";
                            }
                            groupDataObj.color.push(color);
                          }
                        })
                      })
                      finalGroupData.push(groupDataObj);
                    }
                  })
                })
              // .then(() => {
              axios({
                method: 'POST',
                url: `/api/fetchGroupName`,
                params: {
                  id: caremnagerId
                }
              })
                .then((response) => {
                  response.data.json.details && response.data.json.details.forEach((patient, index) => {
                    if (patient.unique_name) {
                      let groupDataObj = { groupName: patient.group_name, groupData: [], uniquename: patient.unique_name, color: [] };
                      response.data.json.details[index].member_list.forEach((id, i) => {
                        members.forEach((chat, ind) => {
                          if (chat.email_id === id) {
                            groupDataObj.groupData.push(chat);
                            let color;
                            if (chat.role.toLowerCase() === "socialworker") {
                              color = "#28b6f6";
                            } else if (chat.role.toLowerCase() === "doctor" || chat.role.toLowerCase().includes("doctor")) {
                              color = "#0288d1";
                            } else if (chat.role.toLowerCase() === "caremanager") {
                              color = "#db1962";
                            } else if (chat.role.toLowerCase() === "super admin") {
                              color = "#9e9e9e";
                            } else if (chat.role.toLowerCase() === "supervisor") {
                              color = "#db1962";
                            } else if (chat.role.toLowerCase() === "nurse") {
                              color = "#ff7367";
                            } else if (chat.role.toLowerCase() === "coordinator") {
                              color = "#00897b";
                            } else if (chat.role.toLowerCase() === "md") {
                              color = "#536dfe";
                            } else if (chat.role.toLowerCase() === "caregiver") {
                              color = "#7cb342";
                            } else if (chat.role.toLowerCase() === "patient") {
                              color = "#ff8a00";
                            }
                            groupDataObj.color.push(color)
                          }
                        })
                      })
                      if (groupDataObj.groupData.length !== 0) {
                        finalGroupData.push(groupDataObj);
                      }
                    }
                  })
                })
                .catch((response) => {
                  this.setState({ invalidMsg: true, isLoaded: true })
                });
              this.setState({
                finalGroupData: finalGroupData
              })
              // })
              let obj = {
                identity: caremnagerEmail
              }
              axios({
                method: 'POST',
                url: `/api/twiliochat`,
                data: obj,
              })
                .then(res => {
                  this.setState({ token: res.data.json.token }, this.initChat(members, res.data.json.token, finalGroupData));
                  this.setState({
                    isLoaded: false
                  })
                  // this.video.current.start()
                })
            });
          })
          .catch((response) => {
            this.setState({ invalidMsg: true, isLoaded: true })
          });
      })

  }
  handlevideoEnabled = (val) => {
    this.setState({ videoEnabled: val })
  }
  toggleWindowPortal() {
    this.setState({
      showWindowPortal: !this.state.showWindowPortal
    });
  }
  closeWindowPortal() {
    this.setState({ showWindowPortal: false });
  }
  initChat = (chatList, token, finalGroupData) => {
    this.chatClient = new Chat(token);
    // this.chatClient.initialize().then(this.setupChatClient.bind(this));
    this.chatClient.getSubscribedChannels()
      .then((paginator) => {
        this.paginator = paginator;
        if (this.paginator.items.length > 0) {
          for (let i = 0; i < paginator.items.length; i++) {
            const channel = paginator.items[i];
            channel.getMessages().then((res) => {
              this.messagesLoaded(res, channel, chatList, finalGroupData)
            });
          }
        } else {
          console.log("no channels")
        }
      })
      .catch((err) => {
        console.log("no channels")
      })
  };
  setupChatClient = () => {
    let guestUserEmail = localStorage.getItem('guestUserEmail');
    let uniqueNameArray = [guestUserEmail.toString(), localStorage.getItem('twilioidentity').toString()].sort();
    let uniqueName = uniqueNameArray.join("_");
    let chatData = { uniqueName: uniqueName, isPrivate: true };
    this.chatClient.createChannel(chatData)
      .then((channel) => {
        this.channel = channel;
        return this.channel.join();
      })
      .then((channel) => {
        this.setState({ isLoading: true });
        this.channel = channel;
        let obj = this.props.invitedmemberEmail.length > 1 ? this.props.invitedmemberEmail : [this.props.invitedmemberEmail[0].toString()];
        let channel_id = this.channel.sid;
        axios({
          method: 'POST',
          url: `/api/createMemberResource`,
          data: {
            id: channel_id,
            details: obj
          }
        })
          .then((response) => {
            console.log(response, "this.channel")
          }).catch(err => {
            console.log(err, "err");
          })
      })
      .then(() => {
        this.setState({ isLoading: false });
        this.channel.getMessages().then(this.messagesLoaded);
        this.channel.on('messageAdded', this.messageAdded);
      })
  }
  checkingMediaresponse = async (message) => {
    return await message.media.getContentTemporaryUrl().then(url => url);
  }
  messagesLoaded = (messagePage, channel, chatList, finalGroupData) => {
    let caremnagerEmail = localStorage.getItem('twilioidentity');
    let item = [];
    let newchatList; let newgroupList;
    // messagePage.items.map(function(message,i){
    if (messagePage.items.length > 0) {
      // item.push({
      //   text: messagePage.items[messagePage.items.length - 1].body === null ? "image" : messagePage.items[messagePage.items.length - 1].body ,
      //   name: messagePage.items[messagePage.items.length - 1].channel.channelState.uniqueName,
      //   author: messagePage.items[messagePage.items.length - 1].author
      // })
      // console.log(messagePage.items,channel.channelState.uniqueName,channel.channelState.friendlyName,"chat")
      if (channel.channelState.uniqueName.split("_").length === 2) {
        chatList.map((chat, i) => {
          if (channel.channelState.uniqueName.split("_").indexOf(chat.email_id) !== -1) {
            newchatList = chatList;
            newchatList[i].recentMessage = messagePage.items[messagePage.items.length - 1].body === null ? "image" : messagePage.items[messagePage.items.length - 1].body;
            newchatList[i].recentMessageSender = messagePage.items[messagePage.items.length - 1].author === caremnagerEmail ? "CareManager" : "You";
          }
        })
      } else if (channel.channelState.uniqueName.split("_").length > 2) {
        finalGroupData.map((group, ind) => {
          if (group.uniquename === channel.channelState.uniqueName) {
            let recentMessageSender;
            newgroupList = finalGroupData;
            newgroupList[ind].recentMessage = messagePage.items[messagePage.items.length - 1].body === null ? "image" : messagePage.items[messagePage.items.length - 1].body;
            group.groupData.map((el) => {
              if (el.email_id === messagePage.items[messagePage.items.length - 1].author) {
                recentMessageSender = el.firstname
              } else {
                recentMessageSender = "Caremanager";
              }
            })
            newgroupList[ind].recentMessageSender = recentMessageSender;
            // newgroupList[ind].recentMessageSender =messagePage.items[messagePage.items.length - 1].author === caremnagerEmail ? "CareManager" : messagePage.items[messagePage.items.length - 1].author; 
          }
        })
      }
    } else {
      item.push({
        text: "No Converstaion",
        name: null,
        author: null
      })
    }
    if (newchatList) {
      this.setState({
        chatList: newchatList,
      })
    }
    if (newgroupList) {
      this.setState({
        finalGroupData: newgroupList,
      })
    }
    // this.setState({
    //   chatList: newchatList
    // })
    // console.log(item,"item")
    //     if (message.type === 'media') {
    //       let contenturl = this.checkingMediaresponse(message);
    //       contenturl.then(function(url) {
    //        item.push({
    //           author: { id: message.author, name: message.author },
    //           text: message.body,
    //           attachments: [{
    //               content: url,
    //           }],
    //           timestamp:  message.dateCreated 
    //       })
    //       });
    //     }else{
    //       // console.log(message.channel.channelState.uniqueName,"uniquenme")
    //       if(message.channel.channelState.uniqueName.split("_").length === 2){
    //         this.state.chatList.map((chat) => {
    //           message.channel.channelState.uniqueName.split("_").map((ch) => {
    //             if(ch === chat.email.toString()){
    //               return item.push({
    //                  text: message.body,
    //                  author: { id: message.author, name: message.author },
    //                  timestamp:  message.dateCreated,
    //                  firstname: chat.firstname,
    //                  patient_id: chat.patient_id
    //                })
    //             }
    //           })
    //         })
    //       }
    //     }
    // },(this))
    // setTimeout(()=>{
    //   this.setState({
    //     messagesFromTwilio: [...this.state.messagesFromTwilio, ...item]
    //   }, () => console.log(this.state.messagesFromTwilio,"messagesFromTwilio"))
    // },3500)
  }
  inviteMember = (memdata) => {
    let memData = memdata;
    memData = memData.map((inv) => inv.invited = true)
    this.setState({ isInvited: true, memData })
  }

  toggleClassicTabs1 = tab => {
    if (this.state.activeItemClassicTabs1 !== tab) {
      this.setState({
        activeItemClassicTabs1: tab,
      });
    }
  };
  handleSearch = (e) => {
    // if (this.state.activeItemClassicTabs1 === '2') {
    let friends = this.state.chatListSearch.length ? this.state.chatListSearch : this.state.friends;
    friends = friends.filter((f) => {
      // let frnd = f.name.toLowerCase().split(' ');
      if (f.firstname.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
        return f;
      }
    })
    if (friends.length) {
      this.setState({ friends })
    } else {
      this.setState({ friends: this.state.chatListSearch });
    }
    
    this.setState({ search: e.target.value })
  }
  searching = () => {
    this.setState({ searchStarts: true })
  }
  nosearching = () => {
    this.setState({ searchStarts: false })
  }

  chooseMembers = val => { }

  // displayUserInfo = id => {
  //   let memData = this.state.friends;
  //   memData = memData.filter((el) => el.personid === id);

  //   this.setState({ memId: personid, memData })
  // }

  // handleMemberSelected = id => {
  //   let slectedMember = this.state.friends;
  //   slectedMember = slectedMember.filter((el) => el.personid === id);
  //   let membersList = this.state.membersList;
  //   membersList = membersList.map((mem) => {
  //     if (mem.id === id) {
  //       mem.active = true;
  //     } else {
  //       mem.active = false;
  //     }
  //     return mem;
  //   })

  //   let memData = this.state.friends;
  //   memData = memData.filter((el) => el.personid === id);
  //   this.setState({ memId: id, memData, slectedMember: slectedMember[0], avatar: slectedMember[0].avatar, memfound: true, membersList, chatopened: false })
  // }

  invitationtoggle = () => {
    this.setState({
      isInvited: !this.state.isInvited,

    });
  }


  handleInvitation = () => {
    // let membersList = this.state.membersList;
    // membersList = [...membersList, ...this.state.memData]
    this.setState({ memfound: false, isInvited: false, chatopened: true })
  }

  handletelemedicinecalenderClick() {
    this.setState({
      telemedicinecalender: true, selectedevent: "calendar"
    });
  }
  handletelemedicinechatClick() {
    this.setState({
      telemedicinecalender: false, selectedevent: "chat"
    });
  }
  addNewMemberToGroup() {
    document.body.classList.add("create-group-modal");
    this.setState({
       createGroup: !this.state.createGroup, searchgroup: false, groupmembers: [], groupmemData: [], groupmemDataPatietId: [], groupmemEmailIds: [], guestUserMaildIds: []
    })
  }
  addgroup = () => {
    this.setState({ isgroupopened: true })
  }

  // handlegroupmembers = id => {
  //     let groupmemIds = this.state.groupmemIds;
  //     let found = groupmemIds && groupmemIds.some((g) => g === id);
  //     if (!found) {
  //       groupmemIds.push(id)
  //     } else {
  //       groupmemIds = groupmemIds.filter((itm) => itm !== id)
  //     }
  //     this.setState({ groupmemIds })
  // }

  handleuserdetails = (e, email) => {
    let memData = this.state.contactList;
    memData = memData.filter((el) => el.email_id === email);
    this.setState({ memId: email, memData, color: color, showinfo: true, addtoContact: false, infoTop: (e.target.getBoundingClientRect().top) + "px" })
  }
  handleuserdetailsOnClick = (details) => {
    let memData = this.state.contactList;
    memData = memData.filter((el) => el.email_id === details.email_id);
    let invitedmember = this.state.invitedmember;
    let invitedmemberEmail = this.state.invitedmemberEmail;
    if (invitedmember.length) {
      invitedmember = [];
      invitedmemberEmail = [];
      invitedmember.push(details.firstname)
      invitedmemberEmail.push(details.twilio_details.identity)
    } else {
      invitedmember.push(details.firstname)
      invitedmemberEmail.push(details.twilio_details.identity)
    }
    this.setState({ memId: details.email_id, memData, invitedmember, invitedmemberEmail, chatopened: true, videochatopened: false, groupVideoCall: false, groupchatopened: false, groupName: '' })
  }
  handleuserdetailschat = (e, emailId, detials, colorValue) => {
    let memData = this.state.chatList;
    memData = memData.filter((el) => el.email_id === emailId);
    // console.log(memData,"memData")
    this.setState({ memId: emailId, memData, color: colorValue, showinfo: true, addtoContact: false, showgroupinfo: false, infoTop: (e.target.getBoundingClientRect().top) + "px" })
  }

  handleusersearchdetails = (e, email) => {
    let memData = this.state.friends;
    memData = memData.filter((el) => el.email_id === email);
    this.setState({ memId: email, memData, showinfo: true, addtoContact: true, infoTop: (e.target.getBoundingClientRect().top) + "px" })
  }

  onleaveinfo = (e, id) => {
    this.setState({ showinfo: false })
  }
  handleuserdetailsenter = () => {
    this.setState({ showinfo: true })
  }
  sendMessage = (detaisl, name) => {
    let invitedmember = this.state.invitedmember;
    let invitedmemberEmail = this.state.invitedmemberEmail;
    if (invitedmember.length) {
      invitedmember = [];
      invitedmemberEmail = [];
      invitedmember.push(name)
      invitedmemberEmail.push(detaisl.twilio_details.identity)
    } else {
      invitedmember.push(name)
      invitedmemberEmail.push(detaisl.twilio_details.identity)
    }
    this.setState({ invitedmember, invitedmemberEmail, chatopened: true, videochatopened: false, groupVideoCall: false, groupchatopened: false, groupName: '' })
  }
  callvideo = (detaisl, name, Id) => {
    let invitedmember = this.state.invitedmember;
    let invitedmemberEmailForVideo = this.state.invitedmemberEmailForVideo;
    let patientId = this.state.patientId;
    if (invitedmember.length) {
      invitedmember = [];
      invitedmemberEmailForVideo = [];
      patientId = [];
      invitedmember.push(name)
      invitedmemberEmailForVideo.push(detaisl.twilio_details.identity)
      patientId.push(Id)
    } else {
      invitedmember.push(name);
      invitedmemberEmailForVideo.push(detaisl.twilio_details.identity)
      patientId.push(Id)
    }
    this.setState({ invitedmember, invitedmemberEmailForVideo, chatopened: false, videochatopened: true, patientId, groupName: '' }, () => {
      this.video.current.start()
    })
    
  }
  callAudio = () => {
    this.setState({
      showAudioCallMessageModal: !this.state.showAudioCallMessageModal
    })
  }
  toggleAudioCallModal = () => {
    this.setState({
      showAudioCallMessageModal: !this.state.showAudioCallMessageModal
    })
  }
  addtoContact = data => {
    let contactList = this.state.contactList;
    let found = contactList.some((s) => s.id === data.id)
    if (!found) {
      contactList.push(data)
      this.setState({ contactList })
    }
  }

  opencreateGroup = () => {
    this.setState({ createGroup: true, searchgroup: false, groupmembers: [], groupmemData: [], groupmemDataPatietId: [], groupmemEmailIds: [], guestUserMaildIds: [] })
  }
  toggleaddGroup = () => {
    this.setState({
      createGroup: !this.state.createGroup,
    });
    document.body.classList.remove("create-group-modal");
  }
  hideContactList = () => {
    if (!this.state.createGroup) {
      this.setState({ searchStarts: false })
    }
  }
  toggleGroupcreated = () => {
    this.setState({
      showGroupMem: !this.state.showGroupMem,
    });
  }

  handlegroupname = e => {
    this.setState({ groupname: e.target.value })
  }

  getgroupName = e => {
    let groupMemList = this.state.groupListSearch.length ? this.state.groupListSearch : this.state.groupMemList;
    groupMemList = groupMemList.filter((f) => {
      //let frnd = f.name.toLowerCase().split(' ');
      if (f.firstname.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
        return f;
      }
    })
    if (groupMemList.length) {
      this.setState({ groupMemList, searchgroup: true })
    } else {
      this.setState({ groupMemList: this.state.groupListSearch, searchgroup: true });
    }
  }

  addgroupChip = row => {
    let groupmembers = this.state.groupmembers;
    groupmembers.push(row.firstname)
    let groupmemDataPatietId = this.state.groupmemDataPatietId;
    let groupmemEmailIds = this.state.groupmemEmailIds;
    let guestUserMaildIds = this.state.guestUserMaildIds;
    let foundId = groupmemDataPatietId.some((m) => m.personid === row.personid);
    let foundEmaiId = groupmemEmailIds.some((m) => m.email_id === row.email_id);
    let foundGuestEmaiId = guestUserMaildIds.some((m) => m.role_type === "GUEST");
    if (row.personid) {
      if (!foundId) {
        groupmemDataPatietId.push(row.personid.toString());
      }
    }
    if (row.role.includes('guest')) {
      if (!foundGuestEmaiId) {
        guestUserMaildIds.push(row.email_id.toString());
      }
    }
    if (row.email_id) {
      if (!foundEmaiId) {
        groupmemEmailIds.push(row.email_id.toString());
      }
    }
    let groupmemData = this.state.groupmemData;
    let found = groupmemData.some((m) => m.personid === row.personid);
    if (!found) {
      groupmemData.push(row)
    }
    this.setState({ chipUpdated: false, groupmembers: groupmembers, groupmemData: groupmemData, groupmemDataPatietId, groupmemEmailIds, guestUserMaildIds, searchgroup: false, guestUserSelected: row.role.includes('guest') ? true : false })
  }
  handlememRemove = (mem) => {
    let groupmemData = []; let groupmemDataPatietId = []; let groupmemEmailIds = []; let guestUserMaildIds = [];
    let groupmembers = this.state.groupmembers;
    this.state.groupmemData.map((item, index) => {
      if (item.firstname !== mem.value) {
        groupmemData.push(item);
        groupmemDataPatietId.push(item.personid);
        groupmemEmailIds.push(item.email_id);
      }
    })
    groupmembers = groupmembers.filter((g) => g !== mem)
    this.setState({ groupmembers: groupmembers, groupmemData: groupmemData, groupmemDataPatietId: groupmemDataPatietId, groupmemEmailIds: groupmemEmailIds },
      () => console.log(this.state.groupmemData, this.state.groupmemEmailIds, this.state.groupmemDataPatietId, "groupmemData"));
  }
  handleRemove = chip => {
    let groupmemData = []; let groupmemDataPatietId = []; let groupmemEmailIds = [];
    // let chipsArr = this.state.chips;
    let groupmembers = this.state.groupmembers;
    // console.log('Removed:', `"${chip}"`, 'ID:', chipsArr.indexOf(chip));
    // chipsArr = chipsArr.filter(element => element !== chip);
    groupmembers = groupmembers.filter(element => element !== chip);
    this.state.groupmemData.map((item, index) => {
      if (item.firstname !== chip) {
        groupmemData.push(item);
        groupmemDataPatietId.push(item.personid);
        groupmemEmailIds.push(item.email_id);
      }
    })
    this.setState({ groupmembers: groupmembers, groupmemData: groupmemData, groupmemDataPatietId: groupmemDataPatietId, groupmemEmailIds: groupmemEmailIds }, () => {
      // console.log('My chips:', this.state.chips);
    });
  };
  addCreateGroup = () => {
    this.setState({
      createGroup: false
    })
    let groupmemDataPatietId = []; let groupmemData = []; let groupmemEmailIds = []; let guestUserMaildIds = [];
    if (this.state.chatopened || this.state.groupchatopened) {
      this.state.friends.map((item) => {
        this.state.groupmembers.map((mem) => {
          if (mem === item.firstname) {
            // groupmemDataPatietId.push(item.personid.toString());
            groupmemEmailIds.push(item.email_id.toString());
            groupmemData.push(item);
            this.setState({
              groupmemData: groupmemData
            })
            if (item.role_type === "GUEST") {
              guestUserMaildIds.push(item.email_id.toString());
            }
          }
        })
      })
    } else {
      // groupmemDataPatietId = this.state.groupmemDataPatietId;
      groupmemEmailIds = this.state.groupmemEmailIds;
      guestUserMaildIds = this.state.guestUserMaildIds;
    }
    document.body.classList.remove("create-group-modal");
    // console.log(groupmemEmailIds, guestUserMaildIds, "groupmemEmailIds" )
    // let groupmemData = this.state.groupmemData;
    // let groupmemDataPatietId = this.state.groupmemDataPatietId;
    let groupname = this.state.groupname;
    let uniquenmeArray = groupmemEmailIds.concat(localStorage.getItem('twilioidentity').toString());
    let uniqueName = uniquenmeArray.sort().join("_");
    let patientId = localStorage.getItem('patientId');
    let caremnagerId = localStorage.getItem('caremanagerId');
    let finalGroupData = []; let groupName = ""; let grouedItem = {};
    this.setState({ isLoaded: true })
    let bodyContent = {
      member_list: groupmemEmailIds.concat(localStorage.getItem('caremanagerId')),
      meeting_details: {
        start_date: this.state.startdateValue + ":00",
        end_date: this.state.enddateValue + ":00",
        meeting_description: this.state.description,
        guest_members: guestUserMaildIds.concat("schandbasha32@gmail.com")
      }
    }
    axios({
      method: 'POST',
      url: `/api/saveGroupName`,
      params: {
        group_name: groupname,
        user_id: localStorage.getItem('caremanagerId'),
        created_by_role: "CAREMANAGER",
        unique_name: uniqueName,
      },
      data: bodyContent
    })
      .then((response) => {
        //  console.log(response,"response")
        axios({
          method: 'POST',
          url: `/api/fetchGroupName`,
          params: {
            id: patientId
          }
        })
          .then((response) => {
            response.data.json.details && response.data.json.details.forEach((el, index) => {
              let groupDataObj = { groupName: el.group_name, groupData: [], uniquename: el.unique_name, color:[] };
              response.data.json.details[index].member_list.forEach((id, i) => {
                this.state.chatList.forEach((chat, ind) => {
                  if (chat.email_id === id) {
                    groupDataObj.groupData.push(chat);
                    let color;
                            if (chat.role.toLowerCase() === "socialworker") {
                              color = "#28b6f6";
                            } else if (chat.role.toLowerCase() === "doctor" || chat.role.toLowerCase().includes("doctor")) {
                              color = "#0288d1";
                            } else if (chat.role.toLowerCase() === "caremanager") {
                              color = "#db1962";
                            } else if (chat.role.toLowerCase() === "super admin") {
                              color = "#9e9e9e";
                            } else if (chat.role.toLowerCase() === "supervisor") {
                              color = "#db1962";
                            } else if (chat.role.toLowerCase() === "nurse") {
                              color = "#ff7367";
                            } else if (chat.role.toLowerCase() === "coordinator") {
                              color = "#00897b";
                            } else if (chat.role.toLowerCase() === "md") {
                              color = "#536dfe";
                            } else if (chat.role.toLowerCase() === "caregiver") {
                              color = "#7cb342";
                            } else if (chat.role.toLowerCase() === "patient") {
                              color = "#ff8a00";
                            }
                            groupDataObj.color.push(color);
                  }
                })
              })
              finalGroupData.push(groupDataObj);
              this.setState({
                finalGroupData: finalGroupData
              })
            })
          })
        axios({
          method: 'POST',
          url: `/api/fetchGroupName`,
          params: {
            id: caremnagerId
          }
        })
          .then((res) => {
            res.data.json.details && res.data.json.details.forEach((patient, index) => {
              let groupDataObj = { groupName: patient.group_name, groupData: [], uniquename: patient.unique_name, color: [] };
              res.data.json.details[index].member_list.forEach((id, i) => {
                this.state.chatList.forEach((chat, ind) => {
                  if (chat.email_id === id) {
                    groupDataObj.groupData.push(chat);
                    let color;
                            if (chat.role.toLowerCase() === "socialworker") {
                              color = "#28b6f6";
                            } else if (chat.role.toLowerCase() === "doctor" || chat.role.toLowerCase().includes("doctor")) {
                              color = "#0288d1";
                            } else if (chat.role.toLowerCase() === "caremanager") {
                              color = "#db1962";
                            } else if (chat.role.toLowerCase() === "super admin") {
                              color = "#9e9e9e";
                            } else if (chat.role.toLowerCase() === "supervisor") {
                              color = "#db1962";
                            } else if (chat.role.toLowerCase() === "nurse") {
                              color = "#ff7367";
                            } else if (chat.role.toLowerCase() === "coordinator") {
                              color = "#00897b";
                            } else if (chat.role.toLowerCase() === "md") {
                              color = "#536dfe";
                            } else if (chat.role.toLowerCase() === "caregiver") {
                              color = "#7cb342";
                            } else if (chat.role.toLowerCase() === "patient") {
                              color = "#ff8a00";
                            }
                            groupDataObj.color.push(color);
                  }
                })
              })
              finalGroupData.push(groupDataObj);
              finalGroupData.map((item) => {
                // console.log(this.state.finalGroupData,groupname,item.groupName, "item")
                if (item.groupName === groupname) {
                  //   debugger
                  // data = item;
                  let data = item;
                  // console.log(data,"data")
                  let invitedmember = this.state.invitedmember;
                  let invitedmemberEmail = this.state.invitedmemberEmail;
                  let groupName = data.groupName;
                  let newData = data.groupData && data.groupData.map((g) => g.firstname)
                  let newDataEmail = data.groupData && data.groupData.map((g) => g.email_id)
                  if (invitedmember.length) {
                    invitedmember = [];
                    invitedmemberEmail = [];
                    invitedmember = newData.join(", ");
                    invitedmemberEmail = newDataEmail;
                  } else {
                    invitedmember = newData.join(", ");
                    invitedmemberEmail = newDataEmail;
                  }
                  this.setState({ groupName: groupName, invitedmember, invitedmemberEmail, chatopened: true, videochatopened: false, groupVideoCall: false, groupchatopened: true },
                    () => {
                      this.initChat(this.state.chatList, this.state.token, finalGroupData)
                    })
                  this.setState({ isLoaded: false })
                }
              })
              this.setState({
                finalGroupData: finalGroupData
              })
            })
          })
      })
      .catch(error => {
        this.setState({ invalidMsg: true, isLoaded: false })
      });
    this.setState({ createGroupSubmitted: true })
    // if (groupname && groupmemData.length && this.state.isvalidGroupName) {
    if (groupname && groupmemDataPatietId.length && this.state.isvalidGroupName) {
      // finalGroupData.push(obj)
      // console.log(finalGroupData,this.state.finalGroupData, groupname, "finalGroupData")
      this.setState({ finalGroupData, showGroupMem: true, createGroup: false }, () => {
        this.setState({ createGroupSubmitted: false })
      })
    }
    // setTimeout(() => {

    // }, 10000)
  }
  handleGroupCreateok = () => {
    this.setState({ showGroupMem: false, groupname: '', groupmemData: [], groupmemDataPatietId: [], search: '', groupmembers: [] })
  }
  handlegroupuserinfo = (e, data) => {
    this.setState({ groupselected: data, showgroupinfo: true, addtoContact: false, groupinfoTop: (e.target.getBoundingClientRect().top) + "px" })
  }
  handlegroupuserinfoOnClick = (e, groupdata) => {
    let data = groupdata;
    let invitedmember = this.state.invitedmember;
    let invitedmemberEmail = this.state.invitedmemberEmail;
    let groupName = data.groupName;
    let newData = data.groupData && data.groupData.map((g) => g.firstname)
    let newDataEmail = data.groupData && data.groupData.map((g) => g.email_id)
    if (invitedmember.length) {
      invitedmember = [];
      invitedmemberEmail = [];
      invitedmember = newData.join(", ");
      invitedmemberEmail = newDataEmail;
    } else {
      invitedmember = newData.join(", ");
      invitedmemberEmail = newDataEmail;
    }
    this.setState({ invitedmember, invitedmemberEmail, chatopened: true, groupVideoCall: false, groupchatopened: true, videochatopened: false, groupName: groupName })
  }
  handleusergroupenter = () => {
    this.setState({ showgroupinfo: true })
  }
  onleaveginfo = () => {
    this.setState({ showgroupinfo: false })
  }

  sendGroupMessage = () => {
    let data = this.state.groupselected;
    let invitedmember = this.state.invitedmember;
    let invitedmemberEmail = this.state.invitedmemberEmail;
    let groupName = data.groupName;
    let newData = data.groupData && data.groupData.map((g) => g.firstname)
    let newDataEmail = data.groupData && data.groupData.map((g) => g.email_id)
    if (invitedmember.length) {
      invitedmember = [];
      invitedmemberEmail = [];
      invitedmember = newData.join(", ");
      invitedmemberEmail = newDataEmail;
    } else {
      invitedmember = newData.join(", ");
      invitedmemberEmail = newDataEmail;
    }
    this.setState({ invitedmember, invitedmemberEmail, chatopened: true, groupVideoCall: false, groupchatopened: true, videochatopened: false, groupName: groupName })
  }
  callgroupvideo = () => {
    let data = this.state.groupselected;
    let invitedmember = this.state.invitedmember;
    let invitedmemberEmailForVideo = this.state.invitedmemberEmailForVideo;
    // let patientId = this.state.patientId;
    let groupName = data.groupName;
    let newData = data.groupData && data.groupData.map((g) => g.firstname)
    let newDataEmail = data.groupData && data.groupData.map((g) => g.email_id)
    let patientId = data.groupData && data.groupData.map((g) => g.personid);
    if (invitedmember.length) {
      invitedmember = [];
      invitedmemberEmailForVideo = [];
      invitedmember = newData.join(", ");;
      invitedmemberEmailForVideo = newDataEmail;
    } else {
      invitedmember = newData.join(", ");
      invitedmemberEmailForVideo = newDataEmail;
    }
    // console.log(this.state.patientId,"invitedmemberEmailForVideo")
    this.setState({ invitedmember, invitedmemberEmailForVideo, chatopened: false, groupchatopened: false, videochatopened: true, groupVideoCall: true, groupName: groupName, patientId }, () => {
      this.video.current.start()
    })
  }
  checkGroupName = () => {
    let groupname = this.state.groupname;
    let existingChannels = this.state.existingChannels;
    if (existingChannels.includes(groupname)) {
      this.setState({ isvalidGroupName: false })
    }
  }
  setMinimize = () => {
    this.setState({
      windowStage: "MINIMIZED"
    });
  }
  setFullscreen = () => {
    this.setState({
      windowStage: "FULLSCREEN"
    });
  }
  setDefault = () => {
    this.setState({
      windowStage: "DEFAULT"
    });
  }
  handleStageChange = (e) => {
    this.setState({
      windowStage: e.state
    });
  }
  handleDateClick = e => {
    document.body.classList.add("create-group-modal");
    this.setState({
      opencreateAppointment: !this.state.opencreateAppointment,
      typeOfOperation: "CREATE",
      title: "",
      description: "",
      startdateValue: "",
      enddateValue: "",
      selectedAppointment: "",
    })
    // let top = `${window.scrollY}px`;
    // document.getElementById('createappointment-modal').style.top = top;
  }
  handleEventClick = (clickInfo) => {
    document.body.classList.add("create-group-modal");
    let selctedIndex;
    this.setState({
      opencreateAppointment: !this.state.opencreateAppointment,
      typeOfOperation: "EDIT",
      title: "",
      description: "",
      startdateValue: "",
      enddateValue: "",
      selectedAppointment: "",
      editedId: clickInfo.event.id
    })
    // let top = `${window.scrollY}px`;
    // document.getElementById('createappointment-modal').style.top = top;
    let appointments = this.state.allappointments;
    appointments && appointments.map((el) => {
      if (clickInfo.event.id === el._id) {
        this.state.appointmentTypes.map((item, index) => {
          if (item.text === el.appointment_type) {
            selctedIndex = index;

          }
        })
        this.setState({
          title: el.title,
          description: el.description,
          startdateValue: moment(el.start_date).format("YYYY-MM-DDTHH:mm"),
          enddateValue: moment(el.end_date).format("YYYY-MM-DDTHH:mm"),
          selectedAppointment: this.state.appointmentTypes[selctedIndex].text
        })
      }
    });
  }

  updateAppointmenttoggle = () => {
    let patientId = localStorage.getItem('patientId');
    if (patientId === null) {
      this.setState({
        opencreateAppointment: false,
        snackbaropen: true,
        snackBarMessage: 'Patient is not selected for updating an appointment !!'
      })
    } else {
      if (this.state.startdateValue < moment(new Date()).format("YYYY-MM-DDTHH:mm:ss")) {
        this.setState({
          opencreateAppointment: false,
          snackbaropen: true,
          snackBarMessage: 'You cannot update old Appointments!!'
        })
      } else {
        let color;
        if (this.state.title === "Doctor Appointment") {
          color = "pink accent-3";
        } else if (this.state.title === "ICT Meeting") {
          color = "indigo accent-2";
        } else if (this.state.title === "Remote visit") {
          color = "teal darken-1";
        }
        else {
          color = "red darken-2";
        }
        this.setState({ opencreateAppointment: !this.state.opencreateAppointment, isLoaded: true });
        // window.scrollTo({ top: `${window.scrollY-400}`, behavior: 'smooth' });
        axios({
          method: 'POST',
          url: `/api/editAppointment`,
          params: {
            appointment_id: this.state.editedId,
            patient_id: patientId,
            caremanager_id: this.state.caremnagerId,
            title: this.state.title,
            start_date: moment(this.state.startdateValue).format("YYYY-MM-DDTHH:mm:ss"),
            end_date: moment(this.state.enddateValue).format("YYYY-MM-DDTHH:mm:ss"),
            color: color,
            description: this.state.description,
            appointment_type: this.state.selectedAppointment
          }
        })
          .then((response) => {
            this.setState({
              createappointmentresponse: response.data.json
            });
            let patientAppointments = [];
            axios({
              method: 'GET',
              url: `/api/appointments`,
              params: {
                id: this.state.caremnagerId,
                role: "CAREMANAGER"
              }
            })
              .then(res => {
                res.data.json.details.map((item) => {
                  if (item.patient_id === patientId) {
                    patientAppointments.push(item);
                  }
                })
                this.setState({ allappointments: patientAppointments, isLoaded: false });
              })
          })
          .catch((error) => {
            console.log(error);
          });
      }

    }
  }
  deleteAppointmenttoggle = () => {
    let patientId = localStorage.getItem('patientId');
    if (patientId === null) {
      this.setState({
        opencreateAppointment: false,
        snackbaropen: true,
        snackBarMessage: 'Patient is not selected for deleting an appointment !!'
      })
    } else {
      this.setState({ opencreateAppointment: !this.state.opencreateAppointment, isLoaded: true });
      document.body.classList.remove("create-group-modal");
      // window.scrollTo({ top: `${window.scrollY-400}`, behavior: 'smooth' });
      axios({
        method: 'POST',
        url: `/api/deleteappointment`,
        params: {
          id: this.state.editedId,
          role: "CAREMANAGER"
        }
      })
        .then(res => {
          let patientAppointments = [];
          axios({
            method: 'GET',
            url: `/api/appointments`,
            params: {
              id: this.state.caremnagerId,
              role: "CAREMANAGER"
            }
          })
            .then(res => {
              res.data.json.details.map((item) => {
                if (item.patient_id === patientId) {
                  patientAppointments.push(item);
                }
              })
              this.setState({ allappointments: patientAppointments, isLoaded: false });
            })
        })
    }
  }
  createAppointmenttoggle = () => {
    let patientId = localStorage.getItem('patientId');
    if (patientId === null) {
      this.setState({
        opencreateAppointment: false,
        snackbaropen: true,
        snackBarMessage: 'Patient is not selected for creating an appointment !!'
      })
    } else {
      // console.log(this.state.startdateValue,new Date(),"dates" )
      if (this.state.startdateValue < moment(new Date()).format("YYYY-MM-DDTHH:mm:ss")) {
        this.setState({
          opencreateAppointment: false,
          snackbaropen: true,
          snackBarMessage: 'You cannot create Appointments on old date !!'
        })
      } else {
        let color;
        if (this.state.title === "Doctor Appointment") {
          color = "pink accent-3";
        } else if (this.state.title === "ICT Meeting") {
          color = "indigo accent-2";
        } else if (this.state.title === "Remote visit") {
          color = "teal darken-1";
        }
        else {
          color = "red darken-2";
        }
        let data = {
          patient_id: patientId,
          caremanager_id: this.state.caremnagerId,
          title: this.state.title,
          start_date: moment(this.state.startdateValue).format("YYYY-MM-DDTHH:mm:ss"),
          end_date: moment(this.state.enddateValue).format("YYYY-MM-DDTHH:mm:ss"),
          color: color,
          description: this.state.description,
          appointment_type: this.state.selectedAppointment
        }
        this.setState({ opencreateAppointment: !this.state.opencreateAppointment, isLoaded: true });
        document.body.classList.remove("create-group-modal");
        // window.scrollTo({ top: `${window.scrollY-400}`, behavior: 'smooth' });
        axios({
          method: 'POST',
          url: `/api/createAppointment`,
          params: {
            patient_id: patientId,
            caremanager_id: this.state.caremnagerId,
            title: this.state.title,
            start_date: moment(this.state.startdateValue).format("YYYY-MM-DDTHH:mm:ss"),
            end_date: moment(this.state.enddateValue).format("YYYY-MM-DDTHH:mm:ss"),
            color: color,
            description: this.state.description,
            appointment_type: this.state.selectedAppointment
          },
          data: data,
        })
          .then((response) => {
            this.setState({
              createappointmentresponse: response.data.json
            });
            let patientAppointments = [];
            axios({
              method: 'GET',
              url: `/api/appointments`,
              params: {
                id: this.state.caremnagerId,
                role: "CAREMANAGER"
              }
            })
              .then(res => {
                res.data.json.details.map((item) => {
                  if (item.patient_id === patientId) {
                    patientAppointments.push(item);
                  }
                })
                this.setState({ allappointments: patientAppointments, isLoaded: false, selectedAppointment: "" });
              })
          })
          .catch((error) => {
            console.log(error);
          });
      }

    }
  }
  cancelAppointmenttoggle = e => {
    this.setState({
      opencreateAppointment: !this.state.opencreateAppointment
    })
    document.body.classList.remove("create-group-modal");
  }
  appointmentTypesChange = e => {
    this.setState({
      selectedAppointment: this.state.appointmentTypes[e[0]].text
    })
  }
  startDate = startdate => {
    this.setState({ startdateValue: startdate + ":00" });
  }
  endDate = enddate => {
    this.setState({ enddateValue: enddate + ":00" });
  }
  titlehandler = e => {
    this.setState({
      title: e.target.value
    })
  }
  descriptionChange = e => {
    this.setState({
      description: e.target.value
    })
  }
  roleColorCode = (role) => {
    // console.log(role, "role")
    let color;
    if (role.toLowerCase() === "socialworker") {
      color = "#28b6f6";
    } else if (role.toLowerCase() === "doctor" || role.toLowerCase().includes("doctor")) {
      color = "#0288d1";
    } else if (role.toLowerCase() === "caremanager") {
      color = "#db1962";
    } else if (role.toLowerCase() === "super admin") {
      color = "#9e9e9e";
    } else if (role.toLowerCase() === "supervisor") {
      color = "#db1962";
    } else if (role.toLowerCase() === "nurse") {
      color = "#ff7367";
    } else if (role.toLowerCase() === "coordinator") {
      color = "#00897b";
    } else if (role.toLowerCase() === "md") {
      color = "#536dfe";
    } else if (role.toLowerCase() === "caregiver") {
      color = "#7cb342";
    } else if (role.toLowerCase() === "patient") {
      color = "#ff8a00";
    }
    return color;
  }

  handleclosecontactlist = () => {
    this.setState({searchStarts: false})
  }
  render() {
    let groupMembers;
    if (this.state.invitedmember.length && this.state.groupchatopened) {
      groupMembers = this.state.caremanagerfirstname + ", " + this.state.invitedmember.toString();
    } else if (this.state.invitedmember.length && this.state.groupVideoCall) {
      groupMembers = this.state.caremanagerfirstname + ", " + this.state.invitedmember.toString();
    } else {
      groupMembers = this.state.invitedmember.toString();
    }
    let appointments = this.state.allappointments;
    let appointmenttasks = appointments && appointments.map((el) => {
      return {
        id: el._id,
        title: el.title,
        start: el.start_date,
        end: el.end_date,
        color: el.color,
        dark: true,
        link: true,
      }

    });
    this.state.groupmembers.map((item) => {
      // console.log(item,"item")
    })
    let videoCallClass = !this.state.chatopened ? "videoCall" : "";
    let groupChatClass = this.state.groupName !== "" ? "group" : "";
     return (
      <React.Fragment>
        <Head>
          <title>Healthlligence</title>
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
        </Head>
        <Layout isLoaded={this.state.isLoaded}>
          <MDBRow style={{ marginTop: "-16px", marginBottom: "96px" }}>
            <MDBCol sm="12" md="12" lg="3" className="teli-tab-col" style={{ marginBottom: "16px" }}>
              <MDBCard style={{height: "100%"}} className="teli-tabs-card">
                <MDBCardBody className="teli-tabs-container">
                  <MDBRow className="tabs-row">
                    <MDBCol md="12" className="chats-tabs">
                      <StaticRouter>
                        {/* <MDBTypography tag="h5" variant="h5-responsive" className="chat-header">Chat</MDBTypography> */}
                        {/* <MDBNav classicTabs >
                                                <MDBNavItem className="tab1">
                                                    <MDBNavLink link to="#" active={this.state.activeItemClassicTabs1 === "1"} onClick={()=>this.toggleClassicTabs1("1")} >
                                                      Contact
                                                    </MDBNavLink>
                                                </MDBNavItem>
                                                <MDBNavItem className="tab2">
                                                    <MDBNavLink link to="#" active={this.state.activeItemClassicTabs1 === "2"} onClick={()=>this.toggleClassicTabs1("2")}  >
                                                       Chat
                                                    </MDBNavLink>
                                                </MDBNavItem>
                                              
                                               
                                            </MDBNav> */}
                        {/* <MDBTabContent
                                                className="card mb-2"
                                                activeItem={this.state.activeItemClassicTabs1}
                                            > */}
                        <MDBRow className="search-form">
                          <MDBCol md="12">

                          <div class="telemedicine_search_container" style={{marginTop:"10px"}}>
                                            <MDBIcon icon="search" className="telemedicine_search_icon" style={{ color: "#424242" }} />
                                            <input placeholder="Search" id="searching" className="telemedicine_search_bar" type="text"  autoComplete="off" onFocus={this.searching} value={this.state.searchedText} onChange={this.handleSearch.bind(this)}></input>
                                        </div>

                         


                            <div className={this.state.searchStarts ? 'contact-list' : 'contact-list hide'}>
                              <div className="group-conversation" onClick={this.opencreateGroup}>Start group conversation</div>
                              <div style={{marginTop: "16px"}}>
                              {this.state.friends.length && this.state.friends.map(member => (
                               <ContactList key={member.email_id} friend={member} color={this.roleColorCode(member.role)} chatsearch={true} handleuserdetails={this.handleusersearchdetails} handleuserdetailsleave={this.onleaveinfo} />
                              ))}
                              </div>
                              <MDBBtn flat className="flatbutton" style={{float: "right", margin: "24px 16px 16px 0px"}} onClick={this.handleclosecontactlist}>Close</MDBBtn>
                            </div>

                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol className="col-md-12 chat-header-text" style={{ marginTop: "20px", marginLeft: "32px", fontSize: "14px", fontWeight: "700", color: "#424242" }}>
                            CHAT
                          </MDBCol>
                        </MDBRow>
                        <div className="white chat-container-1">
                          <MDBListGroup className="friend-list">
                            {this.state.chatList && this.state.chatList.length ?
                              this.state.chatList.length && this.state.chatList.map((member) => {
                                return (
                                  <FriendList key={member.email_id} friend={member} color={this.roleColorCode(member.role)} messageDetails={this.state.messagesFromTwilio} groupMembers={this.state.finalGroupData} handleuserdetails={this.handleuserdetailschat} handleuserdetailsOnClick={this.handleuserdetailsOnClick.bind(this, member)} handleuserdetailsleave={this.onleaveinfo} invitedmember={this.state.invitedmember} invitedmemberEmail={this.state.invitedmemberEmail} />
                                )
                              }) :
                              <span style={{ padding: "10px" }}>Loading Contacts...</span>
                            }
                            <div style={{borderBottom: "1px solid #ebebeb", marginTop: "4px"}}></div>
                            <MDBRow>
                              <MDBCol className="col-md-12 " style={{ marginLeft: "32px", marginTop: "20px", fontSize: "14px", fontWeight: "700", color: "#424242" }}>
                                GROUPS
                              </MDBCol>
                            </MDBRow>
                            {this.state.finalGroupData && this.state.finalGroupData.map((mem) => {
                              let classNameSelected;
                              if (mem.groupName === this.state.groupName) {
                                classNameSelected = "active"
                              } else {
                                classNameSelected = ""
                              }
                              let len = mem.groupData.length;
                              let width = "15px", height = "15px", align = '';

                              return (
                                <>
                                  <MDBRow className={"groupmem-chip-row " + classNameSelected}
                                    onMouseEnter={(e) => this.handlegroupuserinfo(e, mem)}
                                    onMouseLeave={this.onleavegroupinfo}
                                    onClick={(e) => this.handlegroupuserinfoOnClick(e, mem)}
                                  >
                                    <div  className={"group-avatar-container " + classNameSelected}>

                                      {mem.groupData && mem.groupData.map((m, i) => {

                                        if (len === 1) { width = "30px"; height = "30px"; align = 0 }
                                        if (len === 1 && (i + 1) === 1) { width = "30px"; height = "30px"; align = 0 }
                                        if (len === 1 && m.firstname.charAt(0).toUpperCase() === "J") { width = "30px"; height = "30px"; align = 5 }
                                        if (len === 3 && (i + 1) === 3) { width = "30px"; height = "15px";; align = 3 }
                                        if (len === 2) { width = "15px"; height = "30px"; align = 2 }
                                        if (len === 4 && (i + 1) === 4) { width = "15px"; height = "15px" }
                                        // return( <img src={m.avatar} className="group-mem-avatar" /> );
                                        return (<div id={`q${i}`} className="quarter" style={{ width: width, height: height, backgroundColor: mem.color[i]}}>
                                          <span className={m.firstname.charAt(0).toUpperCase() === "J" ? `gname align${align}` : `gname align${align}`} > {m.firstname.charAt(0).toUpperCase()}</span>
                                        </div>)
                                      })}

                                    </div>
                                    <MDBCol md="9" className="groupColumn">
                                      <div className="groupmem-user-name">{mem.groupName}</div>
                                      <div className="recentmessagedetails text-muted" style={{ fontSize: "12px" }}>
                                        <span>{mem.recentMessageSender !== undefined ? mem.recentMessageSender + ": " : ""}</span>
                                        <span>{mem.recentMessage}</span>
                                      </div>
                                    </MDBCol>
                                  </MDBRow>
                                </>
                              )
                            })}
                          </MDBListGroup>
                          
                        </div>
                        {/* </MDBScrollbar> */}
                      </StaticRouter>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <div className={this.state.showinfo ? 'show-user-info' : 'show-user-info hide'}
              style={{ top: this.state.infoTop }}
              onMouseEnter={this.handleuserdetailsenter}
              onMouseLeave={this.onleaveinfo}>
              <MDBRow>
                <MDBCol md="2">
                  <div className={this.state.memData[0] && this.state.memData[0].role_type === "GUEST" ? "guest-user-hover" : "circleClass"} style={{backgroundColor: this.state.color}}>
                    <span className="circletext">
                      {this.state.memData[0] && this.state.memData[0].firstname.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </MDBCol>
                <MDBCol md="10">
                  <div className="user-name">{this.state.memData[0] && this.state.memData[0].firstname}</div>
                  <div className="user-specilization">{this.state.memData[0] && this.state.memData[0].specialization}</div>
                </MDBCol>

              </MDBRow> <hr className="divideinfo" />
              <MDBRow>
                <MDBCol md="9">

                  <MDBBtn size="sm" style={{ color: "#FFFFFF" }} className="message-button" onClick={() => this.sendMessage(this.state.memData[0], this.state.memData[0] && this.state.memData[0].firstname)}>Send Message</MDBBtn>

                </MDBCol>
                <MDBCol md="3">
                {/* onClick={this.toggleWindowPortal} */}
                  <MDBIcon icon="video" size="sm" className="callicons"  onClick={() => this.callvideo(this.state.memData[0], this.state.memData[0] && this.state.memData[0].firstname, this.state.memData[0].personid)} />
                  {/* <MDBIcon icon="phone-alt" size="sm" className="callicons" onClick={() => this.callAudio(this)} /> */}
                </MDBCol>
              </MDBRow>
            </div>
            <div className={this.state.showgroupinfo ? 'show-group-info' : 'show-group-info hide'}
              style={{ top: this.state.groupinfoTop }}
              onMouseEnter={this.handleusergroupenter}
              onMouseLeave={this.onleaveginfo}
            >
              <MDBRow className="group-data-row">
                <div className="group-avatar-container g-column">
                  {this.state.groupselected.groupData && this.state.groupselected.groupData.map((m, i) => {
                    let len = this.state.groupselected.groupData.length;
                    let width = "15px", height = "15px", align = '';
                    if (len === 1 && (i + 1) === 1) { width = "30px"; height = "30px"; align = 0 }
                    if (len === 1 && m.firstname.charAt(0).toUpperCase() === "J") { width = "30px"; height = "30px"; align = 5 }
                    if (len === 3 && (i + 1) === 3) { width = "30px"; height = "15px";; align = 3 }
                    if (len === 2) { width = "15px"; height = "30px"; align = 2 }
                    if (len === 4 && (i + 1) === 4) { width = "15px"; height = "15px" }
                    // return( <img src={m.avatar} className="user-group-img" /> );
                    return (<div id={`q${i}`} className="quarter" style={{ width: width, height: height, backgroundColor: this.state.groupselected.color[i]}}>
                      <span className={`gname align${align}`}> {m.firstname.charAt(0).toUpperCase()}</span>
                     
                    </div>)
                  })}
                </div>
                <MDBCol md="10">
                  <div className="user-name">{this.state.groupselected.groupName}</div>
                  {/* <div className="user-specilization">{this.state.memData[0] && this.state.memData[0].specilization}</div> */}
                </MDBCol>

              </MDBRow> <hr className="divideinfo" />
              <MDBRow>
                <MDBCol md="9">
                  <MDBBtn size="md" style={{ color: "#FFFFFF" }} className="message-button" onClick={() => this.sendGroupMessage()}>Send Message</MDBBtn>
                </MDBCol>
                <MDBCol md="3">
                  <MDBIcon icon="video" size="sm" className="callicons" onClick={() => this.callgroupvideo()} />
                  {/* <MDBIcon icon="phone-alt" size="sm" className="callicons" /> */}
                </MDBCol>
              </MDBRow>
            </div>
            <MDBCol sm="12" md="12" lg="9" className="video-col" style={{ marginBottom: "16px" }}>
              {
                this.state.telemedicinecalender ?
                  <StaticRouter>
                    <MDBRow className="calander-icons-sec" style={{ float: "right" }}>
                      {
                        this.state.selectedevent == "chat" ?  <MDBIcon icon="comment-alt" onClick={this.handletelemedicinechatClick.bind(this)} className="menuaddgroupicon"/> : <MDBIcon icon="comment-alt" onClick={this.handletelemedicinechatClick.bind(this)} style={{ width: "16px", height: "16px", float: "right", cursor: "pointer" }}/>
                      }
                      
                      {
                        this.state.selectedevent == "calendar" ?  <MDBIcon icon="calendar" onClick={this.handletelemedicinecalenderClick.bind(this)} className="menuchaticon"/> : <MDBIcon icon="calendar" onClick={this.handletelemedicinecalenderClick.bind(this)} style={{ float: "right", marginLeft: "16px", marginRight: "16px", cursor: "pointer" }}/>
                      }
                      
                            
                    </MDBRow>
                    <MDBRow className="calneder-row calendar-view">
                      <FullCalendar
                        defaultView="dayGridMonth"
                        headerToolbar={{
                          left: 'prev,next,today',
                          center: 'title',
                          right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        selectable={true}
                        editable={true}
                        events={appointmenttasks}
                        select={this.handleDateClick.bind(this)}
                        eventClick={this.handleEventClick.bind(this)}
                      />
                    </MDBRow>
                  </StaticRouter> :
                  <MDBCard style={{height: "100%"}} className={"video-card " + videoCallClass} onClick={this.hideContactList}>
                    <MDBCardBody className="v-container">
                        <div>
                        <MDBRow className={"member-search " + groupChatClass}>
                          <MDBCol md="8">
                            <div className="chatuser">
                              {this.state.groupName !== "" ? <div className="groupNameClass">{this.state.groupName}</div> : ""}
                              <span className="groupMemberClass">{groupMembers}</span>
                            </div>
                          </MDBCol>
                          <MDBCol md="4" className="calander-icons-sec1">
                          {  this.state.selectedevent == "calendar" ? <MDBIcon icon="calendar" onClick={this.handletelemedicinecalenderClick.bind(this)} className="menucalendericon"/>: <MDBIcon icon="calendar" onClick={this.handletelemedicinecalenderClick.bind(this)} style={{ width: "16px", height: "16px", float: "right", cursor: "pointer" }}/> }
                          {  this.state.selectedevent == "chat" ? <MDBIcon icon="comment-alt" onClick={this.handletelemedicinechatClick.bind(this)} className="menuchaticon"/> : <MDBIcon icon="comment-alt" onClick={this.handletelemedicinechatClick.bind(this)} style={{ marginLeft: "16px", width: "16px", height: "16px", cursor: "pointer", float: "right", marginRight: "16px" }}/>}
                          {  this.state.selectedevent == "newgroup" ? <MDBIcon icon="user-plus" onClick={this.addNewMemberToGroup.bind(this)} className="menuaddgroupicon"  /> : <MDBIcon icon="user-plus" onClick={this.addNewMemberToGroup.bind(this)} style={{ width: "16px", height: "16px", float: "right", cursor: "pointer" }}   />}
                            
                            {this.state.slectedMember &&
                              <>
                                <MDBIcon icon="phone" className="chat-v-icons" style={{ float: "right" }} />
                                <MDBIcon far icon="comment-alt" className="chat-v-icons" style={{ float: "right" }} />
                                <MDBIcon icon="video" className="chat-v-icons" style={{ float: "right" }} onClick={() => this.video.current.start()} />
                              </>
                            }
                          </MDBCol>
                        </MDBRow>
                        {!this.state.chatopened && !this.state.videochatopened ?
                          <MDBRow className="justify-content-center align-items-center empty-container">
                            <MDBCol className="col-md-6 col-lg-6 col-xl-8">
                              <img src="/images/chat_video_fn.svg" alt="Telemedicin-Icon" className="img-fluid telemedicine-icon-class"></img>
                              <div className="welcome-text">Welcome to Telemedicine</div>
                            </MDBCol>
                          </MDBRow> :
                          <MDBRow className="video-chat-container" >
                            {this.state.videochatopened && !this.state.chatopened &&
                              <VideoCall className="video-container" groupName={this.state.groupName} ref={this.video} roomName={this.state.groupselected.length ? this.state.groupselected.groupName : this.state.invitedmember.toString()} invitedmember={this.state.invitedmember} invitedmemberEmailForVideo={this.state.invitedmemberEmailForVideo} patientId={this.state.patientId} isvideoEnabled={this.handlevideoEnabled} videoEnabled={this.state.videoEnabled}/>
                            }
                            {this.state.chatopened && !this.state.videochatopened &&
                              <ChatApp groupName={this.state.groupName} token={this.state.token} invitedmember={this.state.invitedmember} invitedmemberEmail={this.state.invitedmemberEmail} groupchatopened={this.state.groupchatopened} avatar={this.state.avatar} />

                            }
                            {!this.state.chatopened && !this.state.videochatopened &&
                              <div className="send-messages">
                                <MDBRow className="mesgsend-row">
                                  <MDBCol md="11" className="message-general">
                                    <MDBInput label="Type Something" className="message-input" />
                                  </MDBCol>
                                  <div className="msg-general-icons">
                                    <MDBIcon far icon="folder" className="chat-c-icon" />
                                    <MDBIcon far icon="user-circle" className="chat-c-icon" />
                                    <MDBIcon far icon="file-alt" className="chat-c-icon" />
                                  </div>
                                  <MDBCol md="1">
                                    <img src="images/send.png" className="send-general-icon" />
                                  </MDBCol>
                                </MDBRow>
                              </div>
                            }
                          </MDBRow>
                        }

                      </div>
                    </MDBCardBody>
                  </MDBCard>
              }

            </MDBCol>

            <MDBModal isOpen={this.state.isInvited} toggle={this.invitationtoggle} className="invitationModal">
              <MDBModalBody className="invitationModalbody">

                <MDBTypography tag="h4" variant="h4-responsive" className="inv-sent">Invitation Sent</MDBTypography>
              </MDBModalBody>
              <MDBModalFooter>
                {/* <MDBBtn flat className="flatbutton"  onClick={this.invitationtoggle}>Cancel</MDBBtn> */}
                <MDBBtn flat className="flatbutton" onClick={this.handleInvitation}>Ok</MDBBtn>
              </MDBModalFooter>
            </MDBModal>

            <MDBModal isOpen={this.state.createGroup} toggle={this.toggleaddGroup} className="creategroupModal">
              <MDBModalBody className="creategroupModalbody">
                <MDBModalHeader style={{marginLeft: "-1rem"}} className="group-modaltitle" toggle={this.toggleaddGroup}>Create a New Group</MDBModalHeader>
                <MDBInput type='text' label='Group name' name='groupname' value={this.state.groupname}
                  className={(!this.state.groupname && this.state.createGroupSubmitted) ? 'is-invalid group-name' : 'group-name'}
                  autoComplete="off"
                  onChange={this.handlegroupname}
                  onBlur={this.checkGroupName}
                >
                  {(!this.state.groupname && this.state.createGroupSubmitted) &&
                    <div className="invalid-feedback">
                      Group Name is required.
                    </div>}

                  {(this.state.groupname && !this.state.isvalidGroupName) &&
                    <div className="invalid-feedback" style={{ display: "inline-block" }}>
                      Group Name already exists.
                    </div>}

                </MDBInput>
                {/* <div>
                  {this.state.groupmembers.map((item) => {
                    return(
                      <div className="chipname">
                        <span>{item}<span className="closeIcon" onClick={this.handlememRemove.bind(this,item)}>x</span></span>
                      </div>
                    )
                  })}
              </div>   */}
                <MDBChipsInput
                  chips={this.state.groupmembers}
                  className={(!this.state.groupmembers.length && this.state.createGroupSubmitted) ? 'is-invalid' : ''}
                  onChange={(e) => this.getgroupName(e)}
                  onFocus={(e) => this.getgroupName(e)}
                  // handleClose={this.handleRemove}
                  handleRemove={(val) => this.handlememRemove(val)}
                  placeholder="Please enter the name of user you would like to chat with."
                />
                {this.state.guestUserSelected ?
                  <MDBRow>
                    <MDBCol size="6">
                      <StartDatetimepicker startDate={this.startDate} startdateValue={this.state.startdateValue} />
                    </MDBCol>
                    <MDBCol size="6">
                      <EndDatetimepicker endDate={this.endDate} enddateValue={this.state.enddateValue} />
                    </MDBCol>
                  </MDBRow> : ""}
                {this.state.guestUserSelected ?
                  <MDBInput
                    type="textarea"
                    label="Description"
                    value={this.state.description}
                    onChange={(e) => this.descriptionChange(e)}
                  /> : ""}
                {(!this.state.groupmembers.length && this.state.createGroupSubmitted) &&
                  <div className="invalid-feedback">
                    This field is required.
                  </div>}

                {this.state.searchgroup &&
                  <div className="groupmember-container">
                    {this.state.groupMemList && this.state.groupMemList.map((row) => {
                      return (
                        <MDBRow className="group-chip-row" onClick={() => this.addgroupChip(row)}>
                          <MDBCol md="2">
                            {/* <img src={"images/member1.png"} className="group-avatar" /> */}
                            <div className={row.role_type === "GUEST" ? "guest-user" : "friendscircleClass"}>
                              <span className="friendscircletext">
                                {row.firstname.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </MDBCol>
                          <MDBCol md="10">
                            <div className="group-user-name">{row.firstname}</div>
                            <div className="group-user-specilization">{row.specialization}</div>
                          </MDBCol>
                        </MDBRow>
                      );
                    })}
                  </div>
                }
              </MDBModalBody>
              <MDBModalFooter className="group-footer">
                <MDBBtn flat className="flatbutton" onClick={this.toggleaddGroup}>Cancel</MDBBtn>
                <MDBBtn flat className="flatbutton" onClick={this.addCreateGroup}>Create</MDBBtn>
              </MDBModalFooter>
            </MDBModal>


            <MDBModal isOpen={this.state.showAudioCallMessageModal} toggle={this.toggleAudioCallModal} className="invitationModal">
              <MDBModalBody className="invitationModalbody">
                <MDBTypography tag="h4" variant="h4-responsive" className="inv-sent">Coming Soon!</MDBTypography>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn size="sm" className="message-button" onClick={this.toggleAudioCallModal}>OK</MDBBtn>
              </MDBModalFooter>
            </MDBModal>

            <MDBModal isOpen={this.state.showGroupMem} toggle={this.toggleGroupcreated} className="creategroupModal">
              <MDBModalBody className="creategroupModalbody">
                <MDBModalHeader className="group-modaltitle" toggle={this.toggleGroupcreated}>New Group Created</MDBModalHeader>
                <MDBInput
                  type='text'
                  value={this.state.groupname}
                  autoComplete="off"
                  disabled
                />
                {this.state.groupmemData && this.state.groupmemData.map((ch) => {
                  return (
                    <MDBChip src={"images/member1.png"} alt="Group" waves>
                      {ch.firstname}
                    </MDBChip>
                  );
                })}
              </MDBModalBody>
              <MDBModalFooter className="group-footer">
                <MDBBtn flat className="flatbutton" onClick={this.handleGroupCreateok}>OK</MDBBtn>
              </MDBModalFooter>
            </MDBModal>
            <MDBModal isOpen={this.state.opencreateAppointment} toggle={this.cancelAppointmenttoggle} className="createappointment" id="createappointment-modal">
              <MDBModalHeader className="modaltitle">{this.state.typeOfOperation === "EDIT" ? "Edit Appointment" : "Create An Appointment"}</MDBModalHeader>
              <MDBModalBody className="md-form-margin">
                <MDBInput label="Title" className="appointment-title" icon="" value={this.state.title} onChange={this.titlehandler} />
                <MDBInput
                  type="textarea"
                  label="Description"
                  value={this.state.description}
                  onChange={(e) => this.descriptionChange(e)}
                ></MDBInput>
                <MDBRow>
                  <MDBCol size="6">
                    <StartDatetimepicker startDate={this.startDate} startdateValue={this.state.startdateValue} />
                  </MDBCol>
                  <MDBCol size="6">
                    <EndDatetimepicker endDate={this.endDate} enddateValue={this.state.enddateValue} />
                  </MDBCol>
                </MDBRow>
                <MDBSelect
                  options={this.state.appointmentTypes}
                  outline
                  // label={"Please Select appointment type"}
                  className="appointment-dropdown"
                  selected={this.state.selectedAppointment ? this.state.selectedAppointment : "Please Select appointment type"}
                  getValue={(val) => this.appointmentTypesChange(val)}
                />
                {/* <MDBDatePicker value={this.state.startDate} onChange={this.handleStartDateChange} /> */}
                <div className="text-right">
                  {this.state.typeOfOperation === "EDIT" ? <MDBBtn flat className="flatbutton" onClick={this.deleteAppointmenttoggle}>DELETE</MDBBtn> : <MDBBtn flat className="flatbutton" onClick={this.cancelAppointmenttoggle}>CANCEL</MDBBtn>}
                  {this.state.typeOfOperation === "EDIT" ? <MDBBtn flat className="flatbutton" onClick={this.updateAppointmenttoggle}>UPDATE</MDBBtn> : <MDBBtn flat className="flatbutton" onClick={this.createAppointmenttoggle}>CREATE</MDBBtn>}
                </div>
              </MDBModalBody>
            </MDBModal>
          </MDBRow>
          {this.state.isLoaded ? <Loader /> : ""}
          <style jsx>{telemedicineStyle}</style>
        </Layout>
      </React.Fragment>
    );
  }
};

export default Telemedicine;

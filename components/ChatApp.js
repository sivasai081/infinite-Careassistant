import React, { Component } from 'react';
import  Chat  from 'twilio-chat';
import { Chat as ChatUI } from '@progress/kendo-react-conversational-ui';
import '@progress/kendo-theme-material/dist/all.css';
import { MDBScrollbar, MDBListGroup, MDBIcon } from "mdbreact";
import ChatMessage from './chatMessage'
import moment from 'moment';
import { Divider } from '@material-ui/core';
import axios from 'axios';

const AttachmentTemplate = (props) => {
  // console.log(props.item,"props.item")
  let attachment = props.item ;

  return (
      <div className="k-card k-card-type-rich">
          <div className="k-card-body quoteCard">
          {attachment.contentType !== 'doc' ?
              <img style={{ maxHeight: '120px' }} src={attachment.content} draggable={false} />
          :
          <a href={attachment.content} target="_blank" draggable={false} tabIndex={-1}>
             <MDBIcon far icon="file-word" />
          </a>
            
          }
          </div>
      </div>
  )
};

const MessageTemplate = (props) =>{
  // console.log(props.item.timestamp,"props.item.timestamp")
  let storageidentity = localStorage.getItem('twilioidentity');
  let styleclass;
  if(storageidentity === props.item.author.name){
    styleclass = "caremanagerClass";
  }else{
    styleclass = "otherClass";
  }
  // console.log(styleclass,"styleclass")
  return (
      <div className={styleclass}>
        <div className="k-author1">
          {styleclass === "caremanagerClass" ? <img data-test="avatar" style={{ width: "30px", height: "30px" }} src="images/member1.png" alt="avatar" class="avatar rounded-circle mr-2 z-depth-1 chat-avatar" /> : 
            <span className="dot">
              <span className="dottext">{props.item.author.name.charAt(0).toUpperCase()}</span>
            </span>
          }
          {props.item.author.name}
          <time className="k-message-time1" >{props.item.timestamp !== undefined ? moment(props.item.timestamp, 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm A') : new Date()}</time>
        </div>
        <div className="k-only k-message">
          <div className="k-bubble">{props.item.text}</div>
        </div>
      </div>
    
  );
}
class ChatApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: true,
      messages: [],
      caremanagerEmail: '',
      token: '',
      imageurl: ''
    };

    this.user = {
      id: props.username,
      name: props.username,
      avatarUrl: ""
    };

    this.setupChatClient = this.setupChatClient.bind(this);
    this.messagesLoaded = this.messagesLoaded.bind(this);
    this.messageAdded = this.messageAdded.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleError = this.handleError.bind(this);

  }

componentDidMount() {
    let storageidentity = localStorage.getItem('twilioidentity');
    this.setState({
      caremanagerEmail: storageidentity
    })
    let obj = {
      identity: storageidentity
    }
    axios({
      method: 'POST',
      url: `/api/twiliochat`,
      data: obj,
    })
      .then(res => {
        this.setState({ token: res.data.json.token }, this.initChat);
      })
      // .then(this.setupChatClient)
      // .catch(this.handleError);
}
initChat = () => {
    this.chatClient = new Chat(this.state.token);
    this.chatClient.initialize().then(this.setupChatClient.bind(this));
};
componentDidUpdate(prevProps, prevState){
  if (this.props.invitedmemberEmail.toString() !== prevProps.invitedmemberEmail.toString()) {
    // let storageidentity = localStorage.getItem('twilioidentity');
    // let obj = {
    //   identity: storageidentity
    // }
    //   axios({
    //     method: 'POST',
    //     url: `/api/twiliochat`,
    //     data: obj,
    //   })
    //   .then(res => {
    //     this.setState({ token: res.data.json.token }, this.initChat);
    //   })
        // .then(this.setupChatClient)
        // .catch(this.handleError);
        this.initChat();
  }
}
handleError(error) {
    // console.log("Error==",error);
    this.setState({
      error: 'Could not load chat.'
    });
}

setupChatClient = () => {
  // console.log(this.props.invitedmemberEmail,"this.props.invitedmemberEmail")
   let uniqueName; let chatData;
    if(this.props.invitedmemberEmail.length > 1){
      let uniqueNameArray = this.props.invitedmemberEmail.concat(this.state.caremanagerEmail.toString());
      uniqueName = uniqueNameArray.sort().join("_");
      chatData = { uniqueName: uniqueName, isPrivate: true, friendlyName: this.props.groupName}
    }else{
      let uniqueNameArray = [this.props.invitedmemberEmail[0].toString(),this.state.caremanagerEmail.toString()].sort();
      uniqueName = uniqueNameArray.join("_");
      chatData = { uniqueName: uniqueName, isPrivate: true}
    }
    // this.chatClient = chatClient;
    // this.chatClient.getSubscribedChannels()
    // .then((paginator) => {
    //   for (let i = 0; i < paginator.items.length; i++) {
    //     const channel = paginator.items[i];
    //     console.log('Channel: ' + channel.uniqueName);
    //   }
    // });
    // console.log(uniqueName,this.props.invitedmemberEmail, "client")
    this.chatClient.getChannelByUniqueName(uniqueName)
      .then(channel => {
        this.setState({ isLoading: true });
        if (channel) {
          this.channel = channel;
          // console.log(this.channel.sid,this.channel,"this.channel")
          window.channel = channel;
          return this.channel.join().catch(() => {
            return;
          });
        }
      })
      .then(() => {
        console.log(this.channel.uniquename,"this.channel")
        this.setState({ isLoading: false });
        this.channel.getMessages().then(this.messagesLoaded);
        this.channel.on('messageAdded', this.messageAdded);
      })
      // let obj = ["Norbert530.Purdy2@gmail.com"];
      // let channel_id = "CH7faf6fcb8fa64c57833585b7b459ba39";
      // axios({
      //     method: 'POST',
      //     url: `/api/createMemberResource`,
      //     data: {
      //       id: channel_id,
      //       details: obj
      //     }
      //   })
      //   .then((response) => {
      //     console.log(response,"this.channel")
      //   }).catch(err => {
      //     console.log(err,"err");
      //   })
      .catch(error => {
        if (error.body.code === 50300) {
          this.chatClient.createChannel(chatData)
          .then((channel) => {
            this.channel = channel;
            return this.channel.join();
          })
          .then((channel) => {
            this.setState({ isLoading: true });
            this.channel = channel;
            // console.log(this.channel,"created")
            let obj = this.props.invitedmemberEmail.length > 1 ? this.props.invitedmemberEmail  : [this.props.invitedmemberEmail[0].toString()] ;
            // let obj = [this.props.invitedmemberEmail[0].toString()];
            let channel_id = this.channel.sid;
            // console.log(obj,"channel_id")
            axios({
                method: 'POST',
                url: `/api/createMemberResource`,
                data: {
                  id: channel_id,
                  details: obj
                }
            })
            .then((response) => {
                console.log(response,"this.channel")
                // return this.channel.join().catch(() => {
                //   return;
                // });
            }).catch(err => {
                console.log(err,"err");
            })
            // channel.invite(this.props.invitedmemberEmail[0].toString()).then(function() {
                // console.log('Your friend has been invited!', this.props.invitedmemberEmail[0].toString());
            // });
          })
          .then(() => {
            // console.log(this.channel,"this.channel")
            this.setState({ isLoading: false });
            this.channel.getMessages().then(this.messagesLoaded);
            this.channel.on('messageAdded', this.messageAdded);
          })
          // .then((channel) => {
          //   this.channel = channel;
          //   // this.channel.join();
          //   var identity = this.props.invitedmemberEmail[0].toString();
          //   this.channel.invite(identity).then(function() {
          //     console.log('Your friend has been invited!');
          //   })
          //   .catch(err => {
          //     console.log("Member Already Existed!!")
          //   })
          // })
        }else {
          this.handleError(error);
        }
      })
      // this.channel.join().catch(function(err) {
      //   console.error(
      //     "Couldn't join channel " + channel.friendlyName + ' because ' + err
      //   );
      // })
      // .then(channel => {
      //   this.channel = channel;
      //   this.channel.join();
      //   this.channel.invite(this.props.invitedmemberEmail[0].toString()).then(function() {
      //     console.log('Your friend has been invited!');
      //   })
      //   .catch(err => {
      //     console.log("Member Already Existed!!")
      //   })
      // })
      // .then(channel => {
      //   this.channel = channel;
      //   // console.log(this.channel.sid,this.channel,"this.channel")
      //   window.channel = channel;
      //   return this.channel.join().catch(() => {
      //     return;
      //   });
      // })
      // .then(() => {
      //   console.log(this.channel,"this.channel")
      //   this.setState({ isLoading: false });
      //   this.channel.getMessages().then(this.messagesLoaded);
      //   this.channel.on('messageAdded', this.messageAdded);
      // })
      .catch(this.handleError);
}
checkingMediaresponse = async(message) =>{
       return await message.media.getContentTemporaryUrl().then(url =>   url  );   
}
twilioMessageToKendoMessage(message) {
}
messagesLoaded(messagePage) {
  let item=[]; let sortedArray = [];
    messagePage.items.map(function(message,i){
      // console.log("msggg===",message.dateCreated)
      if (message.type === 'media') {
        let contenturl = this.checkingMediaresponse(message);
        contenturl.then(function(url) {
         item.push({
            author: { id: message.author, name: message.author },
            text: message.body,
            attachments: [{
                content: url,
            }],
            timestamp:  message.dateCreated 
        })
        // if(item[i]){
        //         item[i].attachments = [{
        //           content: url,
        //       }]
        // }
       // console.log("ITEMBefore==",item[i])
        });
      }else{
        item.push({
          text: message.body,
          author: { id: message.author, name: message.author },
          timestamp:  message.dateCreated 
        })
      }
     
    },(this))
    // console.log(this.state.imageurl,"state")
    console.log("ITEMDone==",item)
    setTimeout(()=>{
      sortedArray = item.sort(function(x, y){
        return x.timestamp - y.timestamp;
    })
      this.setState({
        messages: sortedArray
      })
    },3500)
    // this.setState({
    //   messages: messagePage.items.map(this.twilioMessageToKendoMessage)
    // },()=> console.log("sttt==",this.state.messages));
}
messageAdded(message) {
  if (message.type === 'media') {
    var imageUrl = ""; var obj ={}; var myVar;
    let contenturl = this.checkingMediaresponse(message);
      contenturl.then(function(url) {
        imageUrl = url;
      })
      myVar = setTimeout(() => {
        obj = {
          attachments: [{
            content: imageUrl
        }],
          text: message.body,
          author: { id: message.author, name: message.author },
          timestamp: (message && message.dateCreated ) ? message.dateCreated  : new Date()
          }
            this.setState(prevState => ({
              messages: [...prevState.messages, obj]
            }));
      }, 0);
  }else{
  var obj = {}
  obj = {
    text: message.body,
    author: { id: message.author, name: message.author },
    timestamp: (message && message.dateCreated ) ? message.dateCreated  : new Date()
  }
  setTimeout(()=>{
    this.setState(prevState => ({
      messages: [...prevState.messages, obj]
    }));
  }, 0)
}
    // this.setState(prevState => ({
    //   messages: [
    //     ...prevState.messages,
        // this.twilioMessageToKendoMessage(message)
    //   ]
    // }));
    // if (message.type === 'media') {
    //    this.channel.getMessages().then(this.messagesLoaded);
    // }
}
sendMessage(event) {
    // console.log(this.channel.channelSid, this.channel.uniqueName,"123")
    this.channel.sendMessage(event.message.text);
}
handleInputChange = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    let fType = file.name.split('.').pop();
    reader.onloadend = (event) => {
        let message = {
            author: {
              id: this.state.caremanagerEmail.toString(),
              name: this.state.caremanagerEmail.toString(),
              // avatarUrl: this.props.avatar
            },
            text: '',
            attachments: [{
                content: event.target.result,
                contentType: fType 
            }],
            timestamp: new Date()
        }
        console.log("upload msg==",message)
        // this.setState((prevState) => ({
        //     messages: [
        //         ...prevState.messages,
        //         message
        //     ],
        // }));
    };
    reader.readAsDataURL(file);
    const formData = new FormData();
    formData.append('file', file);
    let channelSid = this.channel.sid;
    this.chatClient.getChannelBySid(channelSid).then(function(channel) {
      channel.sendMessage(formData);
    });
}
uploadButton = (props) => {
    return (
        <React.Fragment>
            <input type='file' onChange={this.handleInputChange} style={{display: 'none'}} ref={el => this.fileUpload = el}/>
            <button className={'k-button k-flat k-button-icon'}  onClick={() => this.fileUpload.click()}>
                <span className={'k-icon ' + props.icon} style={{fontSize: '20px'}}/>
            </button>
        </React.Fragment>
    )
}

customIcons = () => {
  return <React.Fragment>
    <div className="chat-custom-icons">
    {/* <MDBIcon far icon="folder"  className="chat-c-icon"/> */}
    {this.uploadButton({icon: 'k-i-folder'})} 
    <MDBIcon far icon="user-circle" className="chat-c-icon" />
    <MDBIcon far icon="file-alt" className="chat-c-icon" />
    </div>
  </React.Fragment>
}

customMessage = (props) => {
    return <React.Fragment>
              {props.messageInput}
              {this.customIcons()}
              {props.sendButton}
          </React.Fragment>;
}

  componentWillUnmount() {
    if(this.chatClient) this.chatClient.shutdown();
  }

  render() {
    if (this.state.error) {
      return <p>{this.state.error}</p>;
    } else if (this.state.isLoading) {
      return (
        <div className="chatloading-class">
          <img src="/images/loading_telemedicine.gif" alt="Telemedicin-Icon" className="img-fluid"></img>
          <div className="chat-loading">Loading messages... Please wait</div> 
        </div>
      )
    }
    return (
      <>
      <ChatUI
        user={{
          id: this.props.username,
          name: this.props.username,
          avatarUrl: "images/member1.png"
        }}
        messages={this.state.messages}
        onMessageSend={this.sendMessage}
        placeholder={'Type Something'}
        width="75%"
        messageBox={this.customMessage}
        messageTemplate={MessageTemplate}
        attachmentTemplate={AttachmentTemplate}
      />
     

          </>
    );
  }
}

export default ChatApp;

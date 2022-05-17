import css from 'styled-jsx/css'
export default css.global`



.telemedicine_search_container {
    position: relative;
    display: flex;
    width: 100% !important;
    margin-left:0px;
 }

.telemedicine_search_icon {
    position: absolute;
    margin-top: 0.55rem;
    cursor: pointer;
    right: 20px !important;
  }

.telemedicine_search_bar {
    background-color: white;
    border: none;
    width: 100% !important;
    outline: none;
    border-radius: 0.4rem;
    color: #000;
    height: 1.5rem;
    padding: 1rem;
    padding-left: 0.5rem;
    font-size: 0.9rem;
    box-shadow: none !important;
    border: 1px solid #dbdbdb;
  }

.searchIconTelemedicine {
    position: absolute;
    margin-top: 0.55rem;
    margin-left: 13.5rem;
    cursor: pointer;
}
.searching {
    background-color: white;
    border: none;
    width: 100%;
    outline: none;
    border-radius: 0.4rem;
    color: #000;
    margin-left: 0.5rem;
    height: 1.5rem;
    padding: 1rem;
    padding-left: 0.5rem;
    font-size: 0.9rem;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
}

.chat-header-text{
    margin-bottom: 5px !important;
}

body.overflow-y-scroll{
    overflow: hidden !important;
    position: fixed;
}
.profileBar {
    z-index: 999 !important;
}
.fa{
    color: #424242 !important;
    cursor: pointer;
}
.fa:hover{
    color: #db1962 !important;
    cursor: pointer;
}
.sub-title{
    color: #727272;
    padding-top:10px;
}
.createappointment .modal-content{
    margin-top: 150px !important;
    margin-bottom: -30px !important;
    border-radius: 8px !important;
}
  .modal-backdrop.show{
    height: 100% !important;
  }
  .appointment-title{
    margin-top: -20px !important;
  }
  .md-form-margin .md-form{
  }
  .appointment-dropdown{
    margin: 30px 0px !important;
  }
  .createappointment .modaltitle{
    margin-bottom: -20px !important;
  }
  .oldDate-modal .modal-content{
    margin-top: 100px !important;
    margin-bottom: -30px !important;
    border-radius: 8px !important;
  }
  .fc-toolbar-title{
    font-size: 21px !important;
    color: #424242 !important;
    font-weight: 600 !important;
  }
  .fc .fc-button-group > .fc-button.fc-button-active{
    box-shadow: 0px 3px 6px #00000029 !important;
    border: none !important;
    background-color: #1265F0 !important;
    color: #FFFFFF !important;
    margin: 0rem !important;
    font-weight: 400 !important;
    font-size: 12px !important;
    max-width: 200px !important;
    height: 24px !important;
    padding: 0rem 1rem !important;
    text-transform: uppercase !important;
  }
  .fc .fc-button-primary{
    box-shadow: 0px 3px 6px #00000029 !important;
    border: none !important;
    color: #000 !important;
    text-transform: none !important;
    background: #FFF !important;
    margin: 0rem !important;
    font-weight: 400 !important;
    font-size: 12px !important;
    max-width: 200px !important;
    height: 24px !important;
    padding: 0rem 1rem !important;
    text-transform: uppercase !important;
  }
  
  .dropdown-content.fadeIn{
    display: unset !important;
  }
  
  .fc {
    direction: ltr;
    text-align: left;
    width: 100% !important;
  }
  .fc .fc-scrollgrid-section table{
    width: 100% !important;
  }
  .calneder-row div{
  }
  .fc .fc-view-harness{
    width: 100% !important;
    flex-grow: 1;
      position: relative;
  }
  .fc-toolbar-chunk{
  }
  .fc .fc-toolbar{
    display: flex;
      justify-content: space-between !important;
      align-items: center;
  }
  .fc .fc-view-harness-active > .fc-view{
    width: 100% !important;
    margin-bottom: 30px;
  }
  .fc .fc-scrollgrid-liquid{
    height: 100%;
    width: 100% !important;
  }
  .fc .fc-scroller-harness{
    width: 100% !important;
  }
.recentmessagedetails .last-message{
    width: 50px !important; 
    overflow: hidden !important;
    text-overflow: ellipsis !important;
}

.recentmessagedetails{
    font-size:12px; 
    margin-top:5px; 
    color:#424242 !important;
}
.sub-title-next{
    color: #DB1962;
    font-weight: 600;
}
.groupmem-chip-row{
    align-item: center;
    cursor:pointer;
    padding: 0.6rem 0rem !important;
}
.groupmem-chip-row.active{
    align-item: center;
    cursor:pointer;
    padding: 1rem 0rem !important;
    background: #eeeeee;
}
.gname.align2 {
    font-size: 12px;
}
.groupmem-chip-row .groupmem-user-name{
    opacity: 1;
    color: #181818;
    font-family: Open Sans;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0px;
    line-height: 22px;
}
.groupmem-chip-row .groupmem-message{
    color: #848484 !important;
    font-family: Open Sans;
    font-size: 14px;
    letter-spacing: 0px;
    line-height: 22px;
}
.md-form .chatuser{	
    margin-bottom: 0px !important;	
}
.group-modaltitle .modal-title{
    margin-left: 0px !important;
}
.card.video-card{
    min-height: 100% !important;
}
.teli-tabs-card{
    min-height: 100% !important;
}
.chatusermessage{	
    color: #424242 !important;	
    font-family: Open Sans;	
    font-size: 14px;	
    letter-spacing: 1px;	
    line-height: 18px;	
}	
.chatusername{	
    color: #424242;	
    font-family: Open Sans;	
    font-size: 14px;	
    font-weight: 700;	
    letter-spacing: 0px;	
    line-height: 22px;	
}
.chatusername.nottorespond{
    opacity:1;
}
.chatuser{
  color: #424242;
  font-family: "Open Sans";
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
 
}
.group .chatuser{
    color: #424242;
    font-family: "Open Sans";
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
   
}
.group .groupNameClass{
    font-size: 18px !important;
    margin-bottom: 0.2rem;
}
.chat-header{
    color: #424242 !important;
    font-family: "Open Sans";
    font-weight: 600 !important;
    padding-left: 20px !important;
}
.chat-title{
  color: #2A2D71;
  font-family: "Open Sans";
  font-size: 19px;
  font-weight: 700;
  line-height: 25px;
}
.img-create, .img-group{
    padding-right: 10px;
}
.img-group{
    height: 24px;
    cursor: pointer;
}
.img-create, .img-videocall{
    height: 15px;
    cursor: pointer;
}
.chats-tabs{
    
}
.chats-tabs .tab-content.card{
    box-shadow: none !important;
    min-height: 355px;
    max-height: 355px;
    overflow-y: auto;
}
.chats-tabs .scrollbar-container{
    height: unset !important;
    max-height: 285px;
    overflow-y: hidden !important;
    overflow-x: hidden !important;
}
.chats-tabs .tab-content{
    padding-top: 0.5rem !important;
}
.chats-tabs .nav-link{
  color: #797979;
  font-family: "Open Sans";
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  text-align: center;
}
.flatbutton{
    color: #DB1B60 !important;
    font-family: "Open Sans";
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 1px;
    font-weight: 600 !important;
    padding: 0px !important;
  }
.chats-tabs .video-img{
    text-align: center;
    padding-top: 40%;
}
.chats-tabs .nav{
    
}
.chats-tabs .nav-link.active{
    border-bottom: 2px solid #DD266B;
    color: #DD266B;
}
.chats-tabs .nav-item.tab1, .chats-tabs .nav-item.tab2{
    width: 45%;
}
.chats-tabs .nav-item.tab3{
    width: 40%; 
}
.tabs-row .col-md-12{
padding: 0px 0px 0px 1px !important;
}
.search-form .md-form .fa-search.prefix{
    font-size: 1rem !important;
    padding-left: 0.5rem !important;
    padding-top: 0.2rem !important;
    color: #424242;
    cursor: pointer;
}
.search-form .md-form .fa-search.prefix:hover{
    color: #db1962;
    cursor: pointer;
}
.md-form.md-outline .prefix{
    position: absolute !important;
    top: .6rem !important;
}
.search-form .md-form .prefix ~ input{
    margin-top: -5px !important;
    margin-left: 0 !important;
    width: 100% !important;
    padding-left: 2.5rem !important;
    border-radius: 8px !important;
    background-color: #FFF !important;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16) !important;
}
.search-form .md-form .prefix ~ label{
    margin-left: 2.5rem !important;
}
.expanderIcons{
    margin-top: -2rem;
}
.member-search{
    border-bottom: 1px solid rgb(235, 235, 235) !important;
    height: 50px !important;
    padding: 1rem !important;
    margin: 0 !important;
}
.member-search.group{
    border-bottom: 1px solid rgb(235, 235, 235) !important;
    height: 65px !important;
    padding: 0.7rem !important;
    margin: 0 !important;
}
.card-body.v-container{
    padding: 0 !important;
}
.member-search .col-md-1{
    padding-bottom: 10px;
}
.member-search .md-form{
    margin-top: 0 !important;
	margin-bottom: 0px !important;
}
.video-chat-container{
    width: 100%;
    margin: 0;
}
.video-container{
    min-height: 355px;
}
.send-messages{
    position: absolute;
    bottom: 24px;
    width: 75%;
    left: 15%;
}
.attach-img{
    padding: 15px;
}
.message-general .md-form{
    margin: 0 !important;
}
.chat-c-icon{
    color: #424242 !important;
}
.chat-c-icon:hover{
    color: #DD266B !important;
}
.k-chat .k-message-box .k-button{
    color: #424242 !important;
}
.k-chat .k-message-box .k-button:hover{
    color: #DD266B !important;
}
.message-general .md-form .form-control.message-input, .message-general .md-form .form-control.message-input:focus{
 border-bottom: none !important;
 box-shadow: none !important;
}
.member-pic{
    height: 55%;
    cursor: pointer;
}
.msg-text{
    color: #848484;
    font-family: "Open Sans";
    line-height: 22px;
}
.msg-name{
    color: #181818;
    font-weight: 600;
    font-family: "Open Sans";
    line-height: 22px;
    cursor: pointer;
}
.msg-date{
    color: #181818;
    font-family: "Open Sans";
    line-height: 22px;
}
.message-row{
    padding-bottom: 15px;
}
.message-row:hover{
   background-color:rgba(0,67,172,0.1);
   border-radius: 3px;
}
.new-badge{
    display: inline-block;
    float: right;
}
.newBadgetext{
    background-color: #8F96A1 !important;
}
.mem-img{
    padding-left: 30%;
}
.mem-icon{
    border-radius: 50%;
}
.mem-name{
    font-weight: 600;
    width: 100%;
    padding-top: 10px;
    padding-left: 10px;
}
.mem-sub1{
    padding-bottom: 15px;  
}
.mem-sub, .mem-sub1{
  width: 100%;
  padding-left: 10px;
  color: #5F6164;
  font-family: "Open Sans";
  font-size: 14px;
}
.mem-text{
    padding-left: 10px;
    font-size: 14px;
    padding-bottom: 15px;
}
.mem-cardbody{
    min-height: 500px;
}
.loacl{
    
}
.empty-container{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center !important;
}
.empty-container img{
    width: 410px !important;
}
.welcome-text{
    color: #424242;
    font-size: 20px;
    font-weight: 700;
    margin-top: 25px;
}
.chipname{
    display: inline-block;
    height: 32px;
    padding: 0 12px;
    margin-right: 1rem;
    margin-bottom: 1rem;
    font-size: 13px;
    font-weight: 500;
    line-height: 32px;
    color: rgba(0,0,0,0.6);
    cursor: pointer;
    background-color: #eceff1;
    border-radius: 16px;
    transition: all 0.3s linear;
}
.closeIcon{
    padding-left: 8px;
    font-size: 14px;
    font-weight: 700;
}
.video-icons{
  position: absolute;
  z-index: 1;
  left: 35%;
  bottom: 2rem;
}
.video-icons img{
    padding: 5px;
    cursor: pointer;
    background-color: white;
    border-radius: 50%;
    height: 2rem;
    margin-left: 12px;
}

.video-icons .offstatus{
    padding: 5px;
    cursor: pointer;
    background-color: #424242;
    border-radius: 50%;
    height: 2rem;
    margin-left: 12px;
}
.maincontainer{
    width: 100%;
}
.video-container{
    width: 75%;
    margin-left: 100px;
    margin-right: 100px;
}
#remote-media{
    width: 25%;
    position: absolute;
    top: 5rem;
    right: 0;
}
#remote-media video{
    border-radius:8px;
}
.btn-default.invite-button{
    border-radius: 8px !important;
    background-color:#DD266B !important;
    font-weight: 600;
}
.btn-default.invite-button:active{
  background-color:#DD266B !important;   
}
.btn-default:not([disabled]):not(.disabled):active, .btn-default:not([disabled]):not(.disabled).active, .show>.btn-default.dropdown-toggle{
    background-color:#DD266B !important;  
}
.btn-default.invite-button.sent.btn.btn-sm{
    padding: 0.5rem 0.9rem !important;  
}
.btn-default.invite-button.btn.btn-sm{
    padding: 0.5rem 2.5rem !important;  
}
.btn-secondary.dropdown-toggle{
    border-radius: 8px !important;
    background-color:#DD266B !important;  
}

.btn-secondary:not([disabled]):not(.disabled):active, 
.btn-secondary:not([disabled]):not(.disabled).active, 
.show>.btn-secondary.dropdown-toggle, .btn-secondary.dropdown-toggle:hover, 
.btn-secondary.dropdown-toggle:focus{
    background-color:#DD266B !important;   
  }
.btn-secondary.dropdown-toggle.btn.btn-sm{
    padding: 0.5rem 1rem !important;
}
.btn-secondary.dropdown-toggle.btn{
    margin: 0.285rem !important;
}
.invite-row{
    margin-bottom: 15px;
}
.tab-content.card{
    margin-top: 0 !important;
}
.show-user-info{
 position:absolute;
 left: 11%;
top: 65%;
z-index: 9;
border: 1px solid rgb(235, 235, 235);
width: 315px;
min-height: 100px;
background-color: #fff;
border-radius: 8px;
box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16);
}

.k-chat .k-bubble{
    box-shadow: none !important;
    border: none !important;
    margin-left: 34px !important;
}

.list-group.friend-list a:hover{
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16) !important;
}
.friend-list .list-group-item{
    border: none !important;
    padding: 0.6rem 0.4rem !important;
}

.list-group-item:hover{
    background-color: #f7f8f9 !important;
}

.groupmem-chip-row:hover{
    background-color: #f7f8f9 !important;
}
.friend-list .list-group-item.active{
   background: #eeeeee !important;
   padding: 1rem .4rem !important;
}

.chat-container-1.friend-list.list-group-item {
    padding: .4rem !important;
}
..chat-container-1.friend-list.list-group-item.active{
   padding: .4rem !important;
}

.chat-avatar{
    height: 32px;
    width: 32px;
    margin-left: 7px;
    margin-top: 4px;
}
.chat-container{
 max-height: 400px;
 overflow-y: scroll;
}
.k-chat{
    border-color: none !important;
    background-color: #fff !important;
    border: none !important;
    width: 100%;
    max-width: 100% !important;
}
.dot{
    margin-left: 7px;
    margin-bottom: -.5rem !important;
    margin-right: .5rem !important;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    display: inline-block;
    background: #FF8800;
    color: #FFFFFF;
    position: relative;
}
.dottext{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.quarter {
    float: left;
    margin: 0;
    padding: 0;
    
  }
.caremanagerClass .k-author1 .k-message{
    font-family: "Open Sans" !important;
}
.k-author{
display: none;
}
.k-author1{
    font-weight: 700 !important;
    font-size: 14px;
}
.k-author1 .k-message-time1{
    font-size: 12px !important;
    color: #727272 !important;
    padding-left: 10px;
    font-weight: 500;
}
.k-message-list{
    max-height: 530px;
    overflow-y: scroll ;
}
.k-message-box{
    border-top: 0 !important;
}
.k-message-box .k-button-send, .k-message-box .k-button-send:active{
    
    color: #DD266B;
  
}
.chat-loading{
    margin-top: -70px;
    font-size: 16px;
}
.chatloading-class{
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

.chat-v-icons{
    color: #DD266B !important;
    padding-left: 0.5rem;
}
.modal-backdrop.fade.show{
    height: 100% !important;
}
.modal-dialog.invitationModal{
    
    top: 20em !important;
    width: 25%;
}
.modal-footer{
    justify-content: center;
    border-top:0 !important;
}
.modal-footer .btn{
 padding: padding: 0 0 0 0.7rem !important; 
}
.btn.btn-flat{
    color: #DD266B !important;
}
.inv-sent{
  color: #424242;
  font-family: "Open Sans";
  font-weight: 700;
  line-height: 32px;
  text-align: center;
}


.calendar-controls .btn-outline-info, .btn-outline-success{
    border: none !important;
  }
  
  .full-calendar-plugin h2{
    font-family: Open Sans !important;
    font-weight: 600 !important;
    font-size: 24px !important;
    color: #424242;
  }
  .full-calendar-plugin .btn-group .btn{
    margin: 0rem !important;
  }
  .timeline-graph .btn-info.btn-outline-info, .timeline-graph .btn-outline-danger, .timeline-graph .btn-success.btn-outline-success{
    background: #FFFFFF 0% 0% no-repeat padding-box !important;
    box-shadow: 0px 3px 6px #00000029 !important;
    border: none !important;
    color: #424242 !important;
  }

  .timeline-graph .btn-info, .timeline-graph .btn-success{
    background: #1265EF 0% 0% no-repeat padding-box !important;
    box-shadow: 0px 3px 6px #00000029 !important;
    color: #fff !important;
  }

  .timeline-months .select-wrapper.md-form.md-outline input.select-dropdown,
.timeline-graph .select-wrapper.md-form.md-outline input.select-dropdown
{
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
}
.timeline-months .select-wrapper span.caret, .timeline-graph .select-wrapper span.caret{
  z-index: 3;
}
.timeline-from-month, .timeline-to-month{
  padding: 2.2rem 0.5rem;
}
.btn-outline-success, .btn-outline-info , .btn-outline-success:hover, .btn-outline-info:hover{
    color: #424242 !important;
  }

  .search-form .md-form input:not([type]):focus:not([readonly]), 
  .search-form .md-form input[type="text"]:not(.browser-default):focus:not([readonly]), 
  .search-form .md-form textarea.md-textarea:focus:not([readonly]){
      border-bottom: 1px solid rgb(235, 235, 235) !important;
      box-shadow: 0px 1px 0px 0px #ced4da !important;
  }

  .search-form .md-form input:not([type]):focus:not([readonly])+label, 
  .search-form .md-form input[type="text"]:not(.browser-default):focus:not([readonly])+label, 
  .search-form .md-form textarea.md-textarea:focus:not([readonly])+label{
      color: #424242 !important;
  }
  .search-form .md-outline input[type="text"]:focus:not([readonly]), 
  .search-form .md-outline textarea.md-textarea:focus:not([readonly]){
      border-color: #ced4da !important;
  }
  
 .contact-list{
    border-radius: 8px;
    border: 1px solid #ced4da;
    box-shadow: 0px 2px 4px #00000029;
    min-height: 100px;
    position: absolute;
    background-color: #fff;
    width: 100% !important;
    margin-top: 0rem !important;
    z-index: 1;
    max-height: 300px;
    overflow-y: auto;
 }
 .contact-list.hide{
     display: none;
 }
 .chats-tabs .nav{
    justify-content: center;
 }
 .avatar.contact{
     height: 32px;
     width: 32px;
     margin-left: 10px;
 }
 .contact-user{
    font-size: 16px;
    margin-left: 10px;
    margin-top: -5px;
 }

 .contact-user p{
     margin-bottom: 0.5rem !important;
 }
 .userspecilization{
     color: #727272 !important;
     font-size: 14px;
 }
 .contact-list-group:hover{
     background-color: #eeeeee !important;
 }
 .show-user-info.hide{
     display: none;
 }
  .md-form .prefix.active{
    color: #424242 !important;
  }
.group-col{
    margin-top: -15px;
    cursor: pointer;
    padding: 0 !important;
}  
.addgroup{
    display: flex;
    background-color: #BDBDBD;
    padding: 10px;
    color: #fff;
    width: 100%;
    margin-top: -15px;
    cursor: pointer;
}
.addgroup.opened{
    display: none;
}
.group-text{
    padding-top: 1.2em;
    padding-left: 1em;
}
.group-list{
    display: flex;
    padding-bottom: 10px;
}
.group-user{
    font-size: 0.95rem;
    padding: 15px 0 0 10px;
}
.g-check{
    padding-top: 15px;
}
.group-rows .chat-title{
    display: block;
    margin-top: -15px;
    margin-bottom: 15px;
}
.user-details-img{
    padding: 10px;
    border-radius: 50%;
}
.user-specilization{
    padding: 0 10px;
    color: #848484 !important;
    margin-top: -5px;
    margin-bottom: 5px;
}
.user-name{
    padding: 10px 10px 0 10px;
    color: #424242;
    font-family: "Open Sans";
    font-size: 16px;
    font-weight: 600;
}
.btn.btn-default.message-button{
    background-color: #DD266B !important;
    border-radius: 8px;
    color: #FFF !important;
    margin: 15px;
    font-size: 14px !important;
    max-width: 200px !important;
    height: 36px !important;
    font-weight: 400 !important;
    cursor:pointer;
    padding: 0.2rem 1.2rem !important;
}
.divideinfo{
    margin: 0 !important;
}
.calander-icons-sec{
    margin-top: 16px;
}
.callicons{
    margin-top: 25px;
    padding-left: 15px;
    color: #424242;
    cursor:pointer;
}
.callicons:hover{
    margin-top: 25px;
    padding-left: 15px;
    color: #db1962;
    cursor:pointer;
}
.guest-list{
    padding: .5rem;
    margin-left:0px;
}
.friendscircleClass{
    height: 30px;
    width: 30px;
    border-radius: 50%;
    display: inline-block;
    background: #FF8800;
    color: #FFFFFF;
    position: relative;
    margin-left:12px;
}
.guest-user{
    height: 30px;
    width: 30px;
    border-radius: 50%;
    display: inline-block;
    background: #db1962;
    color: #FFFFFF;
    position: relative;
    margin-left:12px;
}
.guest-friendscircleClass{
    height: 30px;
    width: 30px;
    border-radius: 50%;
    display: inline-block;
    background: #FF8800;
    color: #FFFFFF;
    position: relative;
    margin-left:12px;
}
.guest-friendscircletext{
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
}
.friendscircletext{
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
}
.show-user-info .circleClass{
    height: 30px;
    width: 30px;
    border-radius: 50%;
    display: inline-block;
    background: #FF8800;
    color: #FFFFFF;
    position: relative;
    margin-left:15px;
    margin-top:15px;
}
.group-chip-row .col-md-10{
    margin-left: -25px !important;
}
.group-chip-row .friendscircleClass{
    height: 30px;
    width: 30px;
    border-radius: 50%;
    display: inline-block;
    background: #FF8800;
    color: #FFFFFF;
    position: relative;
    margin-left: 0px !important;
}
.group-chip-row .guest-user{
    height: 30px;
    width: 30px;
    border-radius: 50%;
    display: inline-block;
    background: #db1962;
    color: #FFFFFF;
    position: relative;
    margin-left: 0px !important;
}
.show-user-info .guest-user-hover{
    height: 30px;
    width: 30px;
    border-radius: 50%;
    display: inline-block;
    background: #db1962;
    color: #FFFFFF;
    position: relative;
    margin-left:15px;
    margin-top:15px;
}
.show-user-info .col-md-10{
    margin-left:-10px !important;
}
.show-user-info .circletext{
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
}
.contact-info .circleClass{
    height: 30px;
    width: 30px;
    border-radius: 50%;
    display: inline-block;
    background: #FF8800;
    color: #FFFFFF;
    position: relative;
    margin-left:8px;
}
.contact-info .circletext{
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
}
.list-group-item.chat-list:hover{
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16) !important;
}
.friend-list .list-group-item.chat-list{
    display: -webkit-box !important;
}
.contact-list-group.list-group-item{
    border: none !important;
}
.room-title{
    color: #424242 !important;
    padding: 10px;
    font-weight: 600 !important;
}
.group-conversation{
    background-color: #EEEEEE;
    padding:10px;
    cursor: pointer;
    width: 100%;
}
.contact-list-group.chatsearch{
    padding-left: 20px !important;
}
.modal-dialog.creategroupModal{
    top: 9em !important;
}
.creategroupModal .modal-content{
    border-radius: 8px !important;
}
.invitationModal .modal-content{
    border-radius: 8px !important;
}
.modal-header.group-modaltitle{
    padding: 0 !important;
    border-bottom: none !important;
}
.group-modaltitle .modal-title{
    font-weight: 700 !important;
}
.modal-footer.group-footer{
    justify-content: flex-end !important;
}
.group-name{
    
}
.md-form input.form-control:focus:not([readonly])+label{
    color: #DB1B60 !important;
}
.md-form input.form-control:focus:not([readonly]){
    border-bottom: 1px solid #DB1B60 !important;
    box-shadow: 0 1px 0 0 #DB1B60 !important;
}
.creategroupModalbody .chips.focus{
    border-bottom: 1px solid #DB1B60 !important;
    box-shadow: 0 1px 0 0 #DB1B60 !important;

}
input:focus::-webkit-input-placeholder {
    color: #DB1B60 !important;
}
.creategroupModalbody .md-form input:not([type]):focus:not([readonly])+label{
    
}
#local-media{
    position:relative;
}
.group-avatar{
    border-radius: 50%;
    height: 32px;
    width: 32px;
}
.group-user-name{
    font-size: 16px;
    font-weight: 600;
    color: #424242;
    margin-top: -5px;
}
.group-user-specilization{
    font-size: 14px;
    color: #727272;
}
.group-chip-row{
    background-color: #E9E9E9;
    border-radius: 8px;
    margin-bottom: 10px;
    margin-left: 0px;
    padding: 10px 0;
    width: 100%;
    cursor: pointer;
}
.chips .input{
    width: 100% !important;
}
.md-form .form-control.is-invalid{
    border-color: #f44336 !important;
}
.chips.is-invalid{
    border-color: #f44336 !important;  
}
.creategroupModalbody .chips{
    margin-bottom: 5px !important;
    padding-bottom: 0 !important;
}
.group-mem-avatar{
    border-radius: 50%;
    height: 20px;
}
.groupmem-user-name{
    color: #424242 !important;;
    font-weight: 600 !important;
}
.groupmem-message{
    color: #848484 !important;
    font-size: 14px;
}
.groupmem-column{
   
}
.inputClass .inputClassBox{
    border-radius: 2rem !important;
    margin-top: 1rem !important;
    font-size: 13px !important;
}
.copyButton{
    border: none !important;
    background: #DD266B !important;
    height: 40px !important;
    width: 90px !important;
    border-radius: 20px !important;
    margin: 5px !important;
    padding: 0px !important;
}
.copiedlButton{
    border: none !important;
    background: rgb(66,66,66) !important;
    height: 40px !important;
    width: 90px !important;
    border-radius: 20px !important;
    margin: 5px !important;
    padding: 0px !important;
}
.cancelButton{
    border: none !important;
    background: rgb(66,66,66) !important;
    height: 40px !important;
    width: 90px !important;
    border-radius: 20px !important;
    margin: 5px !important;
    padding: 0px !important;
}
.copyUrlModal.show{
    display: block;
    background: #FFF;
    width: 420px;
    height: 180px;
    position: absolute;
    top: 125px;
    left: 250px;
    border-radius: 10px;
    padding: 16px;
    text-align: center;
}
.copyUrlModal.hide{
    display: none;
}
.z-depth-1{
    box-shadow: unset !important;
}
.chat-container-1{
    min-height: 285px;
    overflow-y: auto;
    overflow-x: hidden;
    box-shadow: unset !important;
}
.k-message-box .k-input{
    background-color: #eee;
    border-radius: 16px 0 0 16px;
    padding-left: 15px !important;
    height: 40px;
    margin-bottom: 10px;
}
.k-chat .k-message-time{
display: none;
}

.k-chat .k-alt .k-bubble{
    border-color: #fff !important;
    color: #424242 !important;
    background-color:#fff !important;
}
.k-button.k-flat.k-button-icon.k-button-send{
    margin-top:-10px;
}
.k-chat .k-message-group.k-alt{
    align-self: flex-start !important;
    align-items: flex-start !important;
    text-align: left !important;
}
.chat-custom-icons{
    display: flex;
    float: right;
    right: 22%;
    margin-top: -10px;
    background-color: #eee;
    border-radius: 0 16px 16px 0;
    height: 40px;
}
.chat-c-icon{
    padding:10px;
    font-size: 16px;
}
.show-group-info{
  position:absolute;
  left: 11%;
  top: 65%;
  z-index: 9;
  border: 1px solid rgb(235, 235, 235);
  width: 315px;
  min-height: 100px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16);
}
.show-group-info.hide{
    display: none;
}  
.user-group-img{
    border-radius: 50%;
    height: 20px;
} 
.group-data-row{
    margin-bottom: 15px;
}
.group-data-row .col-md-10{
    margin-top: 7px;
    margin-left: -10px;
}
.group-avatar-container.g-column{
    margin-top: 15px;
}
.chats-tabs .tab-content{
    padding: 0 !important;
}
.teli-tabs-container{
    padding: 0.9rem !important;
}
.search-form{
    margin-left: 10px !important;
    margin-right: 10px !important;
}
.chat-list .badge-danger{
    background-color: #DB1962 !important;
    border-radius: 50%;
}
.message-general{
    background-color: #eee;
    height: 40px;
    border-radius: 16px;
}
.mesgsend-row{
    margin:0 !important;
}
.message-general .md-form label{
    margin-top: -5px;
    padding-left: 10px;
}
.msg-general-icons{
    position: absolute;
    float: right;
    right: 10%;
}
.send-general-icon{
    margin-top: 10px;
}
.otherClass .k-author1{
    color: #DB1B60;
}
.caremanagerClass .k-author1{
    color: #378C3B;
}
.creategroupModalbody .chips .input, .creategroupModalbody .md-form label{
    font-size: 14px !important;
}

.creategroupModalbody .chips .input{
    margin-left: 10px !important;
}
.groupmem-chip-row .group-avatar-container{
    display: block;
    padding: 0;
    width: 30px;
    height: 30px;
    border: 1px;
    border-radius: 50%;
    overflow: hidden;
    margin-left: 35px;
}
.group-avatar-container{
    display: block;
    padding: 0;
    width: 30px;
    height: 30px;
    border: 1px;
    border-radius: 50%;
    overflow: hidden;
    margin-left: 25px;
}
.copylinkClass{
    position: absolute;
    cursor: pointer;
    z-index: 1;
    left: 103%;
    bottom: 0.4rem;
    height: 38px;
    width: 38px;
    background: white;
    border-radius: 50%;
    display: inline-block;
}
.linkIcon{
    position: absolute;
    top: 13px;
    left: 11px;
    color: #DD266B !important;
}
.quarter {
    display: inline-block;
    float: left;
    margin: 0;
    padding: 0;
    
}
#q0 .gname.align5{
    font-size: 14px;
    margin-left: 14px !important;
    margin-top: 4px !important;
}
#q0 .gname.align0{
    font-size: 14px;
    margin-left: 9px !important;
    margin-top: 4px !important;
}

#q0 .gname .align2{
    margin-left: 5px;
    margin-top: 7px;
    font-size: 12px;
}
#q1 .gname .align2{
    margin-left: 5px;
    margin-top: 7px;
    font-size: 12px;
}
#q0 {
    width: 30px;
    height: 30px;
    background-color: #0099CC; 
}
  .groupColumn{
      margin-left: -8px !important;
  }
  #q1 {
    background-color: #FF8800;
  }
  
  #q2 {
    background-color: #007E33;
  }
  
  #q3 {
    background-color: #CC0000;
  }
  .gname{
    display: flex;
    font-size: 8px;
    color: #fff;
  }
  .gnamej{
    display: flex;
    font-size: 8px;
    color: #fff;
  }

#q0 .gname.align1{
    font-size: 14px;
    margin-left: 12px !important;
    margin-top: 2px !important;
}
#q0 .gnamej.align1 {
    font-size: 12px;
    margin-left: 7px;
    margin-top: 6px;
}

#q0 .gnamej.align2 {
    font-size: 12px;
    margin-left: 7px;
    margin-top: 6px;
}

#q0 .gnamej.align{
    font-size: 8px;
    margin-left: 7px;
    margin-top: 2px;
}

#q1 .gnamej.align{
    font-size: 8px;
    margin-left: 7px;
    margin-top: 2px;
}
#q1 .gnamej.align1{
    font-size: 8px;
    margin-left: 7px;
    margin-top: 2px;
}
#q1 .gnamej.align2{
    font-size: 8px;
    margin-left: 7px;
    margin-top: 2px;
}

#q2 .gnamej.align0{
    font-size: 8px;
    margin-left: 12px;
}
#q2 .gnamej.align1{
    font-size: 8px;
    margin-left: 12px;
}
#q2 .gnamej.align2{
    font-size: 8px;
    margin-left: 12px;
}

#q2 .gnamej.align3{
    font-size: 8px;
    margin-left: 12px;
}

#q0 .gname.align2{
    font-size: 12px;
    margin-left: 4px;
    margin-top: 7px;
}
#q1 .gname.align2{
    font-size: 12px;
    margin-left: 2px;
    margin-top: 7px;
}
#q0 .gname.align{
    font-size: 8px;
    margin-left: 6px !important;
    margin-top: 4px !important;
}



#q1 .gname.align{
    font-size: 8px;
    margin-left: 4px;
    margin-top: 2px;
}
#q2 .gname.align3{
    font-size: 8px;
    margin-left: 12px;
}
#q2 .gname.align{
    font-size: 8px;
    margin-left: 6px;
    margin-top: 0px;
}
#q3 .gname.align{
    font-size: 8px;
    margin-left: 2px;
    margin-top: 0px;
}
@media only screen and  (max-width: 768px ){
    .expanderIcons{
        margin-top: 1rem !important;
    }
}

.ps__rail-y{
    display: none !important;
}
@media (max-width: 575.98px) {
    .teli-tabs-card{
    }
    .card.video-card.videoCall{
        height: 500px !important;
    }
    .fc .fc-view-harness{
        height: 500px !important;
    }
    .calendar-view{
        height: 500px !important;
    }
    .chat-loading {
        margin-top: -50px;
    }
    .k-chat{
        height: 535px;
        width: 88% !important;
    }
    .card.video-card{
        margin-bottom: 70px;
        height: 500px !important;
    }
    .video-col{
        margin-top: 20px;
    }
    .card.video-card{
        margin-bottom: 60px;
        margin-top: 60px;
    }
    .send-general-icon{
        position: absolute;
        top: -40px;
        left: 328px;
    }
    .send-messages{
        position: absolute;
        bottom: 60px;
        width: 75%;
        left: 15%;
    }
    .chatusername{
        font-size: 14px;
    }
    .groupmem-user-name{
        font-size: 14px !important;
    }
    .chatusermessage{
        font-size: 12px;
        line-height: 18px;
    }
    .groupmem-chip-row .groupmem-message{
        font-size: 12px;
        line-height: 18px;
    }
    .groupColumn{
        flex: 0 0 69%;
        max-width: 69%;
    }
}

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) and (max-width: 598.98px) {
    .teli-tabs-card{
        min-height:100% !important;
    }
    .chat-loading {
        margin-top: -50px;
    }
    .calander-icons-sec1{
        margin-top: -20px !important;
    }
    .k-chat{
        height: 535px;
        width: 80% !important;
    }
    .chat-container-1{
        min-height: 380x;
        overflow-y: auto;
    }
    .copyUrlModal.show{
        display: block;
        background: #FFF;
        width: 420px;
        height: 180px;
        position: absolute;
        top: 335px;
        left: 70px;
        border-radius: 10px;
        padding: 16px;
        text-align: center;
    }
    .maincontainer .local-media video{
        width:100% !important;
        border-bottom-right-radius: 10px !important;
        border-bottom-left-radius: 10px !important;
        height: 630px !important;
        object-fit: cover !important;
    }
    .empty-container{
        height:797px;
    }
    .welcome-text{
    }
    .card.video-card.videoCall{
        height: 500px !important;
    }
    .fc .fc-view-harness{
        height: 500px !important;
    }
    .calendar-view{
        height: 500px !important;
        margin-top: 58px !important;
        padding: 16px;
    }
    .calander-icons-sec{
        margin-top: 40px;
    }
    .card.video-card{
        margin-bottom: 70px;
        height: 500px !important;
    }
    .video-col{
        margin-top: 20px;
    }
    .send-general-icon{
        position: absolute;
        top: -40px;
        left: 510px;
    }
    .send-messages{
        position: absolute;
        bottom: 20px;
        width: 74%;
        left: 2%;
    }
    .chatusername{
        font-size: 14px;
    }
    .groupmem-user-name{
        font-size: 14px !important;
    }
    .chatusermessage{
        font-size: 12px;
        line-height: 18px;
    }
    .groupmem-chip-row .groupmem-message{
        font-size: 12px;
        line-height: 18px;
    }
    .groupColumn{
        flex: 0 0 69%;
        max-width: 69%;
    }
 }
 @media (min-width: 599px) and (max-width: 767.98px) {
    .teli-tabs-card{
        min-height:100% !important;
    }
    .chat-loading {
        margin-top: -50px;
    }
    .calander-icons-sec1{
        margin-top: -20px !important;
    }
    .k-chat{
        height: 535px;
        width: 80% !important;
    }
    .chat-container-1{
        max-height: 380x;
        overflow-y: auto;
    }
    .copyUrlModal.show{
        display: block;
        background: #FFF;
        width: 420px;
        height: 180px;
        position: absolute;
        top: 335px;
        left: 80px;
        border-radius: 10px;
        padding: 16px;
        text-align: center;
    }
    .maincontainer .local-media video{
        width:100% !important;
        border-bottom-right-radius: 10px !important;
        border-bottom-left-radius: 10px !important;
        height: 694px !important;
        object-fit: cover !important;
    }
    .empty-container{
        height:797px;
    }
    .welcome-text{
    }
    .card.video-card.videoCall{
        height: 650px !important;
    }
    .fc .fc-view-harness{
        height: 500px !important;
    }
    .calendar-view{
        height: 500px !important;
        margin-top: 58px !important;
        padding: 16px;
    }
    .calander-icons-sec{
        margin-top: 40px;
    }
    .card.video-card{
        margin-bottom: 70px;
        height: 500px !important;
    }
    .video-col{
        margin-top: 20px;
    }
    .send-general-icon{
        position: absolute;
        top: -40px;
        left: 510px;
    }
    .send-messages{
        position: absolute;
        bottom: 20px;
        width: 74%;
        left: 2%;
    }
    .chatusername{
        font-size: 14px;
    }
    .groupmem-user-name{
        font-size: 14px !important;
    }
    .chatusermessage{
        font-size: 12px;
        line-height: 18px;
    }
    .groupmem-chip-row .groupmem-message{
        font-size: 12px;
        line-height: 18px;
    }
    .groupColumn{
        flex: 0 0 69%;
        max-width: 69%;
    }
 }
@media (min-width: 768px) and (max-width: 991px) {
    .teli-tabs-card{
        min-height:100% !important;
    }
    .chat-loading {
        margin-top: -50px;
    }
    .tabs-row .col-md-12 {
        padding-right: 12px !important;
        padding-left: 12px !important;
    }
    .k-chat{
        height: 535px;
        width: 80% !important;
    }
    .chat-container-1{
        max-height: 380x;
        overflow-y: auto;
    }
    .copyUrlModal.show{
        display: block;
        background: #FFF;
        width: 420px;
        height: 180px;
        position: absolute;
        top: 335px;
        left: 150px;
        border-radius: 10px;
        padding: 16px;
        text-align: center;
    }
    .maincontainer .local-media video{
        width:100% !important;
        border-bottom-right-radius: 10px !important;
        border-bottom-left-radius: 10px !important;
        height: 694px !important;
        object-fit: cover !important;
    }
    .empty-container{
        height:797px;
    }
    .welcome-text{
    }
    .card.video-card.videoCall{
        height: 650px !important;
    }
    .fc .fc-view-harness{
        height: 500px !important;
    }
    .calendar-view{
        height: 500px !important;
        margin-top: 58px !important;
        padding: 16px;
    }
    .calander-icons-sec{
        margin-top: 40px;
    }
    .card.video-card{
        margin-bottom: 70px;
        height: 500px !important;
    }
    .video-col{
        margin-top: 20px;
    }
    .send-general-icon{
        position: absolute;
        top: -40px;
        left: 510px;
    }
    .send-messages{
        position: absolute;
        bottom: 20px;
        width: 74%;
        left: 2%;
    }
    .chatusername{
        font-size: 14px;
    }
    .groupmem-user-name{
        font-size: 14px !important;
    }
    .chatusermessage{
        font-size: 12px;
        line-height: 18px;
    }
    .groupmem-chip-row .groupmem-message{
        font-size: 12px;
        line-height: 18px;
    }
    .groupColumn{
        flex: 0 0 69%;
        max-width: 69%;
    }
}
@media (min-width: 992px) and (max-width: 1023px){
    .teli-tabs-card{
        min-height:100% !important;
    }
    .k-chat{
        height: 608px !important;
    }
    .k-message-list{
        max-height: 750px !important;
        overflow-y: auto !important;
    }
    .teli-tab-col{
        padding-left:12px !important;
        padding-right:6px !important;
        height: 680px !important;
    }
    .video-col{
        padding-left:6px !important;
        padding-right:12px !important;
    }
    .chats-tabs .scrollbar-container {
        overflow-y: hidden !important;
        max-height: 700px !important;
    }
    .chat-container-1{
        max-height: 568px;
        overflow-y: auto;
    }
    .chatusername{
        font-size: 14px;
    }
    .groupmem-user-name{
        font-size: 14px !important;
    }
    .user-info-bar{
        display: none !important;
    }
    .chatusermessage{
        font-size: 12px;
        line-height: 18px;
    }
    .groupmem-chip-row .groupmem-message{
        font-size: 12px;
        line-height: 18px;
    }
    .maincontainer .local-media video{
        width:100% !important;
        border-bottom-right-radius: 10px !important;
        border-bottom-left-radius: 10px !important;
        height: 630px !important;
        object-fit: cover !important;
    }
    .empty-container{
        height:797px;
    }
    .welcome-text{
        color: #424242;
        font-size: 15px;
        font-weight: 800;
        margin-top: 15px;
    }
    .card.video-card{
        min-height: 100% !important;
    }
    .card.video-card.videoCall{
        height: 650px !important;
    }
    .fc .fc-view-harness{
        height: 785px !important;
    }
    .calendar-view{
        height: 785px !important;
        margin-top: 48px;
        padding: 0px 12px 0px 12px;
    }
    .copyUrlModal.show{
        display: block;
        background: #FFF;
        width: 420px;
        height: 180px;
        position: absolute;
        top: 570px;
        left: 165px;
        border-radius: 10px;
        padding: 16px;
        text-align: center;
    }
}
@media (min-width: 1024px) and (max-width: 1199px){
    .teli-tabs-card{
        min-height: 100% !important;
    }
    .chatusername{
        font-size: 14px;
    }
    .k-chat{
        height: 608px !important;
    }
    .k-message-list{
        max-height: 750px !important;
        overflow-y: auto !important;
    }
    .groupmem-user-name{
        font-size: 14px !important;
    }
    .chatusermessage{
        font-size: 12px;
        line-height: 18px;
    }
    .groupmem-chip-row .groupmem-message{
        font-size: 12px;
        line-height: 18px;
    }
    .teli-tab-col{
        padding-left:12px !important;
        padding-right:7px !important;
        height: 680px !important;
    }
    .video-col{
        padding-left:7px !important;
        padding-right:12px !important;
    }
    .chats-tabs .scrollbar-container {
        overflow-y: hidden !important;
        max-height: 700px !important;
    }
    .chat-container-1{
        max-height: 568px;
        overflow-y: auto;
    }
    .maincontainer .local-media video{
        width:100% !important;
        border-bottom-right-radius: 10px !important;
        border-bottom-left-radius: 10px !important;
        height: 630px !important;
        object-fit: cover !important;
    }
    .empty-container{
        height:797px;
    }
    .welcome-text{
        color: #424242;
        font-size: 15px;
        font-weight: 800;
        margin-top: 15px;
    }
    .card.video-card{
        min-height: 100% !important;
    }
    .card.video-card.videoCall{
        height: 650px !important;
    }
    .fc .fc-view-harness{
        height: 785px !important;
    }
    .calendar-view{
        height: 785px !important;
        margin-top: 48px;
        padding: 0px 12px 0px 12px;
    }
    .copyUrlModal.show{
        display: block;
        background: #FFF;
        width: 420px;
        height: 180px;
        position: absolute;
        top: 570px;
        left: 175px;
        border-radius: 10px;
        padding: 16px;
        text-align: center;
    }
}
@media (min-width: 1200px) and (max-width: 1350px){
    .teli-tabs-card{
        min-height: 100% !important;
    }
    .teli-tab-col{
        padding-left:12px !important;
        padding-right:15px !important;
        height: 680px !important;
    }
    .video-col{
        padding-left:15px !important;
        padding-right:12px !important;
    }
    .chats-tabs .scrollbar-container {
        max-height: 700px !important;
        overflow-y: hidden !important;
    }
    .chat-container-1{
        max-height: 568px;
        overflow-y: auto;
    }
    .k-chat{
        height: 608px !important;
    }
    .k-message-list{
        max-height: 750px !important;
        overflow-y: auto !important;
    }
    .maincontainer .local-media video{
        width:100% !important;
        border-bottom-right-radius: 10px !important;
        border-bottom-left-radius: 10px !important;
        height: 630px !important;
        object-fit: cover !important;
    }
    .card.video-card{
        min-height: 100% !important;
    }
    .card.video-card.videoCall{
        height: 650px !important;
    }
    .fc .fc-view-harness{
        height: 785px !important;
    }
    .calendar-view{
        height: 785px !important;
        margin-top: 48px;
        padding: 0px 12px 0px 12px;
    }
    .empty-container{
        height:797px;
    }
    .welcome-text{
    }
    .copyUrlModal.show{
        display: block;
        background: #FFF;
        width: 420px;
        height: 180px;
        position: absolute;
        top: 570px;
        left: 190px;
        border-radius: 10px;
        padding: 16px;
        text-align: center;
    }
}
@media (min-width: 1700px) and (max-width: 2800px){
    .maincontainer .remote-media video{
        width: 95% !important;
        border-bottom-right-radius: 10px !important;
        border-bottom-left-radius: 10px !important;
        height: 240px !important;
        object-fit: cover !important;
    }
}
@media (min-width: 1351px) and (max-width: 1699px){
    .teli-tabs-card{
        min-height: 100% !important;
    }
    .teli-tab-col{
        padding-left:12px !important;
        padding-right:15px !important;
        height: 680px !important;
    }
    .k-chat{
        max-height: 600px !important;
    }
    .k-message-list{
        max-height: 600px !important;
        overflow-y: auto !important;
    }
    .maincontainer .local-media video{
        width:100% !important;
        border-bottom-right-radius: 10px !important;
        border-bottom-left-radius: 10px !important;
        height: 630px !important;
        object-fit: cover !important;
    }
    .maincontainer .remote-media video{
        width: 95% !important;
        border-bottom-right-radius: 10px !important;
        border-bottom-left-radius: 10px !important;
        height: 150px !important;
        object-fit: cover !important;
    }
    .card.video-card.videoCall{
        height: 650px !important;
    }
    .fc .fc-view-harness{
        height: 650px !important;
    }
    .calendar-view{
        height: 368px !important;
        margin-top: 48px;
        padding: 0px 12px 0px 12px;
    }
    .empty-container{
        height:381px;
    }
    .welcome-text{
    }
    .copyUrlModal.show{
        display: block;
        background: #FFF;
        width: 420px;
        height: 180px;
        position: absolute;
        top: 160px;
        left: 230px;
        border-radius: 10px;
        padding: 16px;
        text-align: center;
    }
}
@media (min-width: 1700px) and (max-width: 1919px){
    .teli-tabs-card{
        min-height: 100% !important;
    }
    .teli-tab-col{
        padding-left:12px !important;
        padding-right:15px !important;
        height: 680px !important;
    }
    .video-col{
        padding-left:15px !important;
        padding-right:12px !important;
    }
    .chats-tabs .scrollbar-container {
        max-height: 700px !important;
        overflow-y: hidden !important;
    }
    .chat-container-1{
        max-height: 568px;
    }
    .k-chat{
        height: 600px !important;
    }
    .k-message-list{
        max-height: 750px !important;
        overflow-y: auto !important;
    }
    .maincontainer .local-media video{
        width:100% !important;
        border-bottom-right-radius: 10px !important;
        border-bottom-left-radius: 10px !important;
        height: 630px !important;
        object-fit: cover !important;
    }
    .card.video-card{
        min-height: 100% !important;
    }
    .card.video-card.videoCall{
        height: 650px !important;
    }
    .fc .fc-view-harness{
        height: 720px !important;
    }
    .calendar-view{
        height: 720px !important;
        margin-top: 48px;
        padding: 0px 12px 0px 12px;
    }
    .empty-container{
        height:797px;
    }
    .empty-container img {
        width: 480px !important;
    }
    .welcome-text{
    }
    .copyUrlModal.show{
        display: block;
        background: #FFF;
        width: 420px;
        height: 180px;
        position: absolute;
        top: 510px;
        left: 320px;
        border-radius: 10px;
        padding: 16px;
        text-align: center;
    }
}
@media (min-width: 1920px) and (max-width: 2559px){
    .teli-tabs-card{
        min-height: 100% !important;
    }
    .teli-tab-col{
        padding-left:12px !important;
        padding-right:15px !important;
        max-height: 705px !important;
    }
    .video-col{
        padding-left:15px !important;
        padding-right:12px !important;
    }
    .chats-tabs .scrollbar-container {
        max-height: 585px !important;
        overflow-y: hidden !important;
    }
    .k-chat{
        height: 610px !important;
    }
    .k-message-list{
        max-height: 610px !important;
        overflow-y: auto !important;
    }
    .chat-container-1{
        max-height: 568px;
    }
    .maincontainer .local-media video{
        width:100% !important;
        border-bottom-right-radius: 10px !important;
        border-bottom-left-radius: 10px !important;
        height: 625px !important;
        object-fit: cover !important;
    }
    .card.video-card{
        min-height: 100% !important;
    }
    .card.video-card.videoCall{
        height: 650px !important;
    }
    .fc .fc-view-harness{
        height: 670px !important;
    }
    .calendar-view{
        height: 670px !important;
        margin-top: 48px;
        padding: 0px 12px 0px 12px;
    }
    .empty-container{
        height:685px;
    }
    .empty-container img {
        width: 480px !important;
    }
    .welcome-text{
    }
    .copyUrlModal.show{
        display: block;
        background: #FFF;
        width: 420px;
        height: 180px;
        position: absolute;
        top: 450px;
        left: 370px;
        border-radius: 10px;
        padding: 16px;
        text-align: center;
    }
}
@media (min-width: 2560px) and (max-width: 2700px){
    .teli-tabs-card{
        min-height: 100% !important;
    }
    .teli-tab-col{
        padding-left:12px !important;
        padding-right:15px !important;
        max-height: 705px !important;
    }
    .video-col{
        padding-left:15px !important;
        padding-right:12px !important;
    }
    .chats-tabs .scrollbar-container {
        max-height: 585px !important;
        overflow-y: hidden !important;
    }
    .k-chat{
        height: 610px !important;
    }
    .k-message-list{
        max-height: 610px !important;
        overflow-y: auto !important;
    }
    .chat-container-1{
        max-height: 600px;
    }
    .maincontainer .local-media video{
        width:100% !important;
        border-bottom-right-radius: 10px !important;
        border-bottom-left-radius: 10px !important;
        height: 630px !important;
        object-fit: cover !important;
    }
    .card.video-card{
        // min-height: 100% !important;
    }
    .card.video-card.videoCall{
        height: 650px !important;
    }
    .fc .fc-view-harness{
        height: 670px !important;
    }
    .calendar-view{
        height: 670px !important;
        margin-top: 48px;
        padding: 0px 12px 0px 12px;
    }
    .empty-container{
        height:682px;
    }
    .empty-container img {
        width: 480px !important;
    }
    .welcome-text{
    }
    .copyUrlModal.show{
        display: block;
        background: #FFF;
        width: 420px;
        height: 180px;
        position: absolute;
        top: 450px;
        left: 540px;
        border-radius: 10px;
        padding: 16px;
        text-align: center;
    }
}

.menucalendaricon{
    width: 16px;
    height: 16px;
    float: right;
    cursor: pointer;
    color: #DB1962 !important;
}
.menuchaticon{
    margin-left: 16px;
    margin-right: 16px; 
    width: 16px;
    height: 16px;
    float: right;
    cursor: pointer;
    color: #DB1962 !important;
}
.menuaddgroupicon{
    width: 16px;
    height: 16px;
    float: right;
    cursor: pointer;
    color: #DB1962 !important;
}

`
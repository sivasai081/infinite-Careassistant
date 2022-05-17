import css from 'styled-jsx/css'
export default css.global`
body{
}
@font-face {
    font-family: minimo;
    src: url("/fonts/Minimo.otf") format("opentype");
  }
  @font-face {
    font-family: minimo-bold;
    font-weight: bold;
    src: url("/fonts/Minimo Bold.otf") format("opentype");
  }
.header-title{
    font-family: minimo !important;
    color: #FFF;
    letter-spacing: 1px;
}
.responsivelogo{
    margin-bottom: 0px;
    margin-left: 72px;
}
.guestUser-header{
    font-family: minimo;	
    color: #FFF;
    letter-spacing: 1px;
    margin-bottom: 0px;
    margin-left: 72px;
}
.guest-telemedicine .card.video-card{
    font-family: Open Sans !important;
    min-height: unset !important;
}
.guest-telemedicine .card.video-card.videoCall{
    height: 480px !important;
    min-height: unset !important;
    border-radius: .7rem !important;
}
.card-body.v-container{
    padding: 0 !important;
}
.guest-telemedicine .member-search{
    border-bottom: 1px solid #ced4da;
    height: 60px !important;
    padding: 1rem;
    margin: 0;
}
.member-search.group{
    border-bottom: 1px solid #ced4da;
    height: 65px;
    padding: 0.7rem !important;
    margin: 0;
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
.md-form .chatuser{	
    margin-bottom: 0px !important;	
}
.chatuser{
    color: #424242;
    font-family: "Open Sans";
    font-weight: 600;
    font-size: 18px;
    line-height: 18px !important;
   
}
.group .chatuser{
    color: #424242;
    font-family: "Open Sans";
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
}
.group .groupNameClass{
    font-size: 18px !important;
    margin-bottom: 0.2rem;
}
.chat-v-icons{
    color: #DD266B !important;
    padding-left: 0.5rem;
}
.guest-telemedicine .empty-container{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center !important;
}
.guest-telemedicine .empty-container img{
    width: 410px !important;
}
.welcome-text{
    color: #424242;
    font-size: 20px;
    font-weight: 800;
    margin-top: 15px;
}
.video-chat-container{
    width: 100%;
    margin: 0;
}
.video-container{
    min-height: 355px;
    width: 75%;
    margin-left: 100px;
    margin-right: 100px;
}
.send-messages{
    position: absolute;
    bottom: 24px;
    width: 75%;
    left: 15%;
}
.mesgsend-row{
    margin:0 !important;
}
.message-general{
    background-color: #eee;
    height: 40px;
    border-radius: 16px;
}
.message-general .md-form label{
    margin-top: -5px;
    padding-left: 10px;
}
.message-general .md-form{
    margin: 0 !important;
}
.message-general .md-form .form-control.message-input, .message-general .md-form .form-control.message-input:focus{
 border-bottom: none !important;
 box-shadow: none !important;
}
.message-general .md-form .form-control.message-input, .message-general .md-form .form-control.message-input:focus{
    border-bottom: none !important;
    box-shadow: none !important;
}
.msg-general-icons{
    position: absolute;
    float: right;
    right: 10%;
}
.chat-c-icon{
    padding:10px;
    font-size: 16px;
}
.send-general-icon{
    margin-top: 10px;
}
.guest-telemedicine .video-icons{
    position: absolute;
    z-index: 1;
    left: 50%;
    bottom: 2rem;
    transform: translate(-50%, -50%);
}
.guest-telemedicine .maincontainer .local-media video {
    width: 100% !important;
    border-bottom-right-radius: 10px !important;
    border-bottom-left-radius: 10px !important;
    height: 420px !important;
    object-fit: cover !important;
}

`
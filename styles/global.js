import css from 'styled-jsx/css'
export default css.global`


.custom-file-upload {
    border-radius: 50%;
    display: inline-block;
    position: relative;
    padding: 0px;
    cursor: pointer;
    background: linear-gradient(270deg,#DB1962,#DB1962);
    margin-bottom: 25px;
  }

.personal-custom-file-upload {
    border-radius: 50%;
    display: inline-block;
    position: relative;
    padding: 0px;
    cursor: pointer;
    background: linear-gradient(270deg,#DB1962,#DB1962);
  }
  
  
  
  .img-wrap{
    position: relative;
    width: 180px;
    height: 180px;
    overflow: hidden;
    border-radius: 50%;
  }
  
  .img-navbarwrap{
    position: relative;
    width: 32px;
    height: 32px;
    overflow: hidden;
    border-radius: 50%;
  }

  .personal-img-wrap{
    position: relative;
    width: 120px;
    height: 120px;
    overflow: hidden;
    border-radius: 50%;
  }

  .filetypeicon input[type="file"] {
    display: none;
  }
  
  
  .img-upload:before{
    content: "\f093";
    font-size: 90px;
    position: absolute;
    padding-top: 80px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #63d3a6;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    opacity: 0;
    transition: .5s ease;
    background-color: #fff;
  }
  .img-upload:hover:before{
   opacity: 1;
  }
  .profileimage img {
    width: 100%;
    height: 100%;
  }

  


  

.fc-day:hover{
    background: rgba(66,66,66,0.1);
    cursor: pointer;
}

.fa-search: hover {
    color: #db1962 !important;
}


.select-wrapper span.caret{
    margin-right: 16px !important;
    font-size: 12px !important;
}

.table-hover tbody tr:hover{
    background-color: rgba(0, 0, 0, 0.075)  !important;
}
.custom_search_container {
    position: relative;
    display: flex;
    width: 100% !important;
}

.custom_search_icon {
    position: absolute;
    margin-top: 0.55rem;
    cursor: pointer;
    right: 20px !important;
    color: #424242 !important;
  }

  .custom_search_icon:hover {
    position: absolute;
    margin-top: 0.55rem;
    cursor: pointer;
    right: 20px !important;
    color: #db1962 !important;
  }

.custom_search_bar {
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

.tooltip,.px-2 {
    color: #fffff !important;
    background-color: #424242 !important;
    border-color: #424242 !important;
  }

  .tooltip[x-placement^="bottom"] .popover_arrow::before {
    border-color: transparent transparent #424242 transparent !important;
  }
  .select-wrapper input.select-dropdown {
    z-index: 0 !important;
  }
.select-wrapper .select-dropdown {
    color: #727272 !important;
  }

  .select-wrapper .fadeElement {
    top: 2.6rem !important;
  }

  .select-wrapper .fadeElement {
    top: 2.6rem !important;
  }


  .select-wrapper .disabled > .filtrable {
    color: #424242 !important;
    font-size:14px;
    padding:5px;
    line-height:18px;
    top: 2.6rem !important;
    opacity: 0.5 !important;
  }

  .select-wrapper .filtrable {
    color: #424242 !important;
    font-size:14px;
    padding:5px;
    line-height:18px;
    top: 2.6rem !important;
  
  }
  
  .select-wrapper .active > .filtrable {
    color: #db1962 !important;
    font-size:14px;
    padding:5px;
    line-height:18px;
    top: 2.6rem !important;
  }

.disableaction{
    cursor: not-allowed !important;
}
.ps{
    overflow: unset !important;
}
.card-title{
    letter-spacing: 0px !important;
}
.profile-circle{
    display: flex;
    justify-content: center;
    align-items: center;
    background: #db1962;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    text-align: cemter;
    margin: 0 auto;
    margin-bottom: 10px;
}
.profile-circle span{
    font-size: 34px;
    color: #FFFFFF;
}
.camera{
    box-shadow: 0 0 1px 1px lightgrey;
    left: 58%;
    top: 24%;
    position: absolute;
    background-color: rgb(255, 255, 255);
    width: 32px;
    height: 32px;
    border-radius: 50%;
}
.camera1{
    box-shadow: 0 0 1px 1px lightgrey;
    left: 56%;
    top: 28%;
    position: absolute;
    background-color: rgb(255, 255, 255);
    width: 32px;
    height: 32px;
    border-radius: 50%;
}
.fa-camera{
    margin-top: 8px;
    width: 24px;
    height: 24px;
    margin-left: 8px;
    color: #424242;
    cursor: pointer;
}
.fa-camera:hover{
    color: #db1962;
    cursor: pointer;
}
input:focus{ 
    border: none !important; 
}
.responsivelogo{
    margin-bottom: 0px;
    margin-left: 0px;
}
.side-nav.wide, .side-nav.wide.slim.closed.newsideNavClass.hovered{
    top: 3.5rem !important;
    width: 16rem !important;
}
.side-nav.wide, .side-nav.wide.slim.closed.hovered{
    top: 7rem !important;
    width: 16rem !important;
}
.col-md-2, .col-md-3, .col-md-4, .col-md-6, .col-md-8, .col-md-10, .col-md-12{
    padding-right: 12px !important;
    padding-left: 12px !important;
}

.md-form input:not([type]):focus:not([readonly]), .md-form input[type="text"]:not(.browser-default):focus:not([readonly]), .md-form input[type="password"]:not(.browser-default):focus:not([readonly]), .md-form input[type="email"]:not(.browser-default):focus:not([readonly]), .md-form input[type="url"]:not(.browser-default):focus:not([readonly]), .md-form input[type="time"]:not(.browser-default):focus:not([readonly]), .md-form input[type="date"]:not(.browser-default):focus:not([readonly]), .md-form input[type="datetime"]:not(.browser-default):focus:not([readonly]), .md-form input[type="datetime-local"]:not(.browser-default):focus:not([readonly]), .md-form input[type="tel"]:not(.browser-default):focus:not([readonly]), .md-form input[type="number"]:not(.browser-default):focus:not([readonly]), .md-form input[type="search"]:not(.browser-default):focus:not([readonly]), .md-form input[type="phone"]:not(.browser-default):focus:not([readonly]), .md-form input[type="search-md"]:focus:not([readonly]), .md-form textarea.md-textarea:focus:not([readonly]){
    border-bottom: 1px solid #DB1962 !important;
    box-shadow: 0 1px 0 0 #DB1962 !important;
    border-radius: 0px !important;
}

.md-form input:not([type]):focus:not([readonly])+label, .md-form input[type="text"]:not(.browser-default):focus:not([readonly])+label, .md-form input[type="password"]:not(.browser-default):focus:not([readonly])+label, .md-form input[type="email"]:not(.browser-default):focus:not([readonly])+label, .md-form input[type="url"]:not(.browser-default):focus:not([readonly])+label, .md-form input[type="time"]:not(.browser-default):focus:not([readonly])+label, .md-form input[type="date"]:not(.browser-default):focus:not([readonly])+label, .md-form input[type="datetime"]:not(.browser-default):focus:not([readonly])+label, .md-form input[type="datetime-local"]:not(.browser-default):focus:not([readonly])+label, .md-form input[type="tel"]:not(.browser-default):focus:not([readonly])+label, .md-form input[type="number"]:not(.browser-default):focus:not([readonly])+label, .md-form input[type="search"]:not(.browser-default):focus:not([readonly])+label, .md-form input[type="phone"]:not(.browser-default):focus:not([readonly])+label, .md-form input[type="search-md"]:focus:not([readonly])+label, .md-form textarea.md-textarea:focus:not([readonly])+label{
    color: #DB1962 !important;
}

.full-calendar-plugin .modal{
    margin-top: 100px;
}

.calender-button{
    font-size: 16px !important;
    font-weight: 100 !important;
    letter-spacing: 1px !important;
    padding: 0.5rem 2.5rem !important;
    background-color: #DB1962 !important;
    border-radius: 8px;  
    color: #fff !important;
    border: none !important;

}

.alertnotificationheading{
    color: #C00;
    font-family: Open Sans;
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
}

.readalertnotificationsubheading{
    color: #727272;
    font-family: Open Sans;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.11px;
    text-decoration: underline;
    cursor: pointer;
    line-height: 19px;
}

.alertnotificationsubheading{
    color: #1265F0;
    font-family: Open Sans;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.11px;
    text-decoration: underline;
    cursor: pointer;
    line-height: 19px;
}

.alertnotificationdescription{
    color: #727272;
    font-family: "Open Sans";
    font-size: 14px;
    line-height: 19px;
}
.alertnotificationdate{
    color: #212529;
    font-family: "Open Sans";
    font-size: 14px;
    line-height: 19px;

}

.notificationbadge { 
    position: relative;
    top: -8px;
    left: -16px;
    border: 1px solid #C00;
    border-radius: 50%;
    height: 24px;
    width: 24px;
    color: #FFF;
    text-align: center;
    background-color: #C00;
    font-size: 14px !important;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.5);
}

.alerts p{
    margin-bottom: 2px !important;
}

.alerts hr{
    margin-bottom: 8px !important;
    margin-top: 8px !important;
}



.list-group-item{
  border: none !important;
}

.btn.btn-flat {
  color: #DB1962 !important;
}



.flatbutton {
    color: #DB1B60 !important;
    font-family: "Open Sans";
    font-size: 16px;
    line-height: 22px;
    -webkit-letter-spacing: 1px;
    -moz-letter-spacing: 1px;
    -ms-letter-spacing: 1px;
    letter-spacing: 1px;
    font-weight: 600 !important;
    padding: 0px !important;
}

.alertflatbutton{
    color: #DB1B60 !important;
    font-family: "Open Sans";
    font-size: 16px;
    line-height: 22px;
    -webkit-letter-spacing: 1px;
    -moz-letter-spacing: 1px;
    -ms-letter-spacing: 1px;
    letter-spacing: 1px;
    font-weight: 600 !important;
    padding: 0px !important;
}

.modal-header{
    border-bottom: none !important;
}
.careteamname{
    color: #424242;
    font-family: Open Sans;
    font-size: 16px;
    font-weight: 700;
    line-height: 19px;
}
.careteamspecialization{
    color: #727272;
     font-family: Open Sans;
     font-size: 14px;
    line-height: 17px;

}

.side-nav .collapsible{
    margin-top: 0rem !important;
}
.md-form-margin .md-form{
  }
.md-form .prefix {
    top: 0.75rem !important;
    font-size: 1.25rem !important;
    color: #424242 !important;
    margin-left: 8px !important;
}


.careteamchat-avatar{
    height: 32px;
    width: 32px;
    margin-left: 7px;
    margin-top: 8px;
}

.hoverable{
    cursor: pointer !important;
}
.side-nav{
  z-index: 999 !important;
  padding-bottom: 0rem !important;
}

.alertsmodal{
    margin-top: 40px !important;
    margin-right: 48px !important;
}
.alertsmodal .modal-content{
    border-top-left-radius: 0px !important;
    border-top-right-radius: 0px !important;
    border-bottom-left-radius: 8px !important;
    border-bottom-right-radius: 8px !important;
    margin-top: 16px;
}
.modal-footer{
    border-top: 0px !important;
}

.alertsheading{
    color: #C00;
    font-family: "Open Sans";
    font-size: 24px;
    font-weight: 600;
    line-height: 33px;
    
}
.alertsheading .badge{
    box-shadow: none !important;
}
.userprofilemodal{
    margin-top: 48px !important;
    width: 300px !important;
}
.userprofilemodal .modal-content{
    margin-top: -2px !important;
    border-top-left-radius: 0px !important;
    border-top-right-radius: 0px !important;
    border-bottom-left-radius: 8px !important;
    border-bottom-right-radius: 8px !important;
}
.userprofilename{
    color: #424242;
    font-family: Open Sans;
    font-size: 20px;
    line-height: 27px;
    font-weight: 600;
    text-align: center;
}

.userprofiledesignation{
    color: #424242;
    font-family: Open Sans;
    font-size: 14px;
    text-align: center;
    line-height: 19px;
}

.userprofileemail{
    color: #424242;
    font-family: Open Sans;
    font-size: 14px;
    text-align: center;
    line-height: 17px;
    font-weight: 600;
}

.privacy-policy{
    opacity: 0.65;
    color: #000;
    font-family: Open Sans;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    margin-top: 24px;
  }

  .btn-default.manage-account{
    border-radius: 8px;
    background-color: #DB1B60 !important;
    border: 1px solid #DB1B60;
    color: #FFF;
    font-family: Open Sans;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    padding: 8px !important;
    width: 240px !important;
  }

  .btn-default.manage-account:hover, btn-default.manage-account:not([disabled]):not(.disabled):active, .btn-default.manage-account:not([disabled]):not(.disabled).active, .show>.btn-default.manage-account.dropdown-toggle{
    background-color: #DB1B60 !important;
    border: 1px solid #DB1B60;
    color: #FFF;

  }
  .btn-default.sign-out:hover, btn-default.sign-out:not([disabled]):not(.disabled):active, .btn-default.sign-out:not([disabled]):not(.disabled).active, .show>.btn-default.sign-out.dropdown-toggle{
    background-color: #FFF !important;
    border: 1px solid #BDBDBD !important;
    color: #424242;
  }


  .btn-default.sign-out{
    border-radius: 8px;
    border: 1px solid #BDBDBD !important;
    background-color: #FFF !important;
    color: #424242;
    font-family: Open Sans;
    font-size: 16px;
    text-align: center;
    line-height: 22px;
    padding: 8px !important;
    width: 240px !important;
  }


::-webkit-scrollbar {
    width: 5px;
    height: 5px;  
  }
  
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 2px grey; 
    border-radius: 4px;
  }
   
  
  ::-webkit-scrollbar-thumb {
    background: grey; 
    border-radius: 4px;
  }
  

@font-face {
    font-family: minimo;
    src: url("fonts/Minimo.otf") format("opentype");
}
@font-face {
    font-family: minimo-bold;
    font-weight: bold;
    src: url("fonts/Minimo Bold.otf") format("opentype");
}

@font-face {
    font-family: "Montserrat Medium";
    src: url("fonts/Montserrat-SemiBold.ttf") format("opentype");
}

  

html,body{
    width: 100%;
    height: 100%;
}
body{
    margin: 0;
    height: 100%;
    font-family: Open Sans !important;
    
}
.main-container{
    padding: 144px 32px 0px 96px !important; 
    background: #FFF;
    min-height: 100%;
    position: absolute;
    width: 100% !important;
    overflow: hidden !important;
}
.main-container.nav-expanded{
}
.main-container.withoutPatientCard{
    padding: 64px 32px 0px 96px !important; 
    overflow: hidden !important;
}
	.navbaricons{		
    display: flex;		
    flex-direction: row !important;		
}		
.composecolor{		
    color: #2A2D71;		
    font-weight: 600;		
}


.title{
    color: #2A2D71;
    font-weight: bold;
}

.header-title{
    font-family: minimo !important;
    color: #FFF;
    letter-spacing: 1px;
}

.table-header{
    color: #424242;
    font-weight: bold; 
}
.align-center{
    text-align: center;
}
.counter-text{
    color: #DB1962;
    font-size: 28px !important;
    font-weight: 600 !important;
} 

.counter-texticon{
    color: #DB1962;
    font-size: 16px;
    font-weight: 600 !important;
}
.icon-center{
    padding-top: 3px !important;
} 
.health360-title{
  }
  .card-row{
      display: flex;
  }
  .button-detail{
  }

  .icons-row{
    width: 2rem;
    height: 2rem;
    text-align: center;
    border-radius: 50%;
    position: relative;
    padding-top: 4px;
    display: inline-block;
  }
  .tengrid-container .card-body{
      padding: 0.5rem 0 !important;
      min-width: 100px; 
      
  }

  .card-body{
    border-radius: 8px;
    padding-bottom: 0px !important;
    background: transparent linear-gradient(230deg, #FDFDFD 0%, #FCFCFC 15%, #FFFFFF 30%, #FFFFFF 64%, #FFFFFF 100%) 0% 0% no-repeat padding-box;
  }
.tengrid-container.view{
    overflow: visible !important;
}

.card{
    border-radius: 8px !important;
    margin-top: 24px;
}

.color-assessment{
    background-color: #ff8a80;
}
.color-newpatients{
    background-color:#DB1962;
} 

.color-activepatients{
    background-color:#32a095;
} 


 .color-1{
     background-color:#d32f2f;
 } 
 .color-2{
     background-color: #536DFE;
 } 
 .color-3{
     background-color: #B71C1C;
 }
 .color-4{
    background-color: #388E3C;
 }
 .color-5{
    background-color: #00897B;
 }
 .color-6{
    background-color: #0288D1;
 }
 .color-7{
    background-color: #F57C00;
 }
 .color-8{
    background-color: #9E9E9E;
 }
 .color-9{
    background-color: #7CB342;
 }
 .color-10{
    background-color: #29B6F6;
 }
 .color-11{
    background-color: #7B1FA2;
 }
 .color-12{
    background-color: #689F38;
 }
 .color-13{
    background-color: #021172;
 }
 .color-14{
    background-color: #D32F2F;
 }
 .color-15{
    background-color: #F57C00;
 }
 .color-16{
    background-color: #5D4037;
 }
 
 .row-3{
    min-height: 450px;
}
 .row-4{
     min-height: 400px;
 }
 .row-5{
    min-height: 500px;
  }
  .row-6{
      min-height:550px;
  }
 .menu-icon{
     background-color: #FFFFFF;
     float: left;
 }
 .menu-img{
    width: 24px;
    height: 24px;
    margin-right: 8px;
    margin-top: 5px;
    margin-left: -16px;
 }

 .userprofileicons{
    width: 32px;
    height: 32px;
    text-align: center;
    border-radius: 50%;
    margin: 0 auto;
    position: relative;
    padding-top: 4px;
 }

 .icons{
    width: 32px;
    height: 32px;
    text-align: center;
    border-radius: 50%;
    position: relative;
    padding-top: 4px;
  }
 tbody + thead{
    display: none;
  }
  table.table thead th {
    color: #424242;
    font-weight: bold;
  }
  .thirdColumnTable table.table tbody tr td:nth-child(3){
    color: #2A2D71;
    font-weight: bold;
  }
  .secondColumnTable table.table tbody tr td:nth-child(2){
    color: #2A2D71;
    font-weight: bold;  
  }
  .seventhColumnTable table.table tbody tr td:nth-child(7){
    color: #2A2D71;
    font-weight: bold;  
  }


table.dataTable thead .sorting:before, table.dataTable thead .sorting:after, table.dataTable thead .sorting_asc:before, table.dataTable thead .sorting_asc:after, table.dataTable thead .sorting_desc:before, table.dataTable thead .sorting_desc:after, table.dataTable thead .sorting_asc_disabled:before, table.dataTable thead .sorting_asc_disabled:after, table.dataTable thead .sorting_desc_disabled:before, table.dataTable thead .sorting_desc_disabled:after{
    bottom : 0.5em !important;
}

.scroll-top-container{
    text-align: center !important;
    cursor: pointer;
    margin-bottom: 70px;
    margin-top: 50px;
}
.scroll-top-icon{
    color: #DB1962 !important;
    opacity: 0.7;
}
.scroll-top-icon:hover{
    opacity: 1;
}
.fa-calendar.prefix{
    float: right;
    right: 8px;
}
.side-nav.wide, .side-nav.wide.slim{
    top:7.5rem;
    clip-path: inset(1px -5px -5px -5px);
    transition-duration: 0ms !important;
    transition-timing-function: linear !important; 
}
.side-nav.wide, .side-nav.wide.slim.closed{
    top:7rem !important;
    margin-left: 0px !important;
}
.side-nav.wide, .side-nav.wide.slim.opened{
    top:3.5rem !important;
    width: 16rem !important;
}
.side-nav.wide, .side-nav.wide.slim.closed.newsideNavClass{
}
.side-menu-bar .rgba-blue-strong, .rgba-blue-strong:after{
    background-color: #FFFFFF !important;
}
.scrollbar-container{
    background-color: #FFFFFF !important;
    color: #424242;
    height: 100vh !important;
}
.side-nav .collapsible button{
    color: #424242 !important;
}
.side-nav.wide.opened{
    width: 15rem !important;
}
.side-nav.wide .collapsible button {
   display: none !important;
}
.show-text{
    display: block;
}
.hide-text{
    display: none;
}
.menu-selected{
    color: #DB1962 !important;
    font-weight: 600 !important;
    padding-left: 20px !important;
}
.menu-selected .v-slim-icon{
    color: #DB1962;
    background-color: #F8E3EB;
    border-radius: 50%;
    margin: 0 auto;
    position: relative;
    padding: 7px;
}
footer.page-footer {
    color: #9E9E9E !important;
    height: 50px;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    margin-left: 40px !important;
    text-align: center !important;
}
.chart-caption{
    padding: 5px 0 0 10px !important;
}
.col-sizebig{
    flex: 0 0 60% !important;
    max-width: 60% !important;
}
.col-sizesmall{
    flex: 0 0 40% !important;
    max-width: 40% !important;
}
.col-sizebig1{
    flex: 0 0 65% !important;
    max-width: 65% !important;
}
.col-sizesmall1{
    flex: 0 0 35% !important;
    max-width: 35% !important;
}
.menu-bar{
    padding-left: 10px;
}
.nav-container{
    padding-top: 0px;
    padding-bottom: 120px;
}
.nav-container.newsideNavClass{
    padding-top: 60px !important;
    padding-bottom: 120px;
}
.nav-container.newsideNavClass.whiteIconClass{
    padding-top: 20px !important;
    padding-bottom: 20px;
}
.nav-sub-container{
    padding-left: 10px;
    display: flex;
    height: 40px;
    justify-content: stretch;
    cursor: pointer;
    margin-bottom: 7px;
}
.nav-sub-container:hover{
    background: #EEEEEE 0% 0% no-repeat padding-box;
    border-radius: 0 24px 24px 0;
    margin-right: 10px;
}
.nav-sub-container:hover .compose-msg{
    background: none;
    border-radius: 0;
    box-shadow: none;
}
.navicon{
    width: 40px;
    height: 40px;
}
.navicon.compose-msg{
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;   
    border-radius: 50%;
}
.navicon.active{
    background-color: #F8E3EB;
    border-radius: 50%;
}
.navicon.active img{
    filter: invert(43%) sepia(94%) saturate(6364%) hue-rotate(322deg) brightness(85%) contrast(102%);   
}
.nav-sub-container.selected .nav-text{
    color: #DB1962;
    font-weight: bold;
}
.side-nav.opened .nav-sub-container.selected{
    background-color: #F8E3EB;
    border-radius: 0 24px 24px 0;
    margin-right: 10px;
}
.nav-sub-container.selected:hover{
    background-color: #F8E3EB;
    border-radius: 0 24px 24px 0;
    margin-right: 10px;
}
.side-nav.opened .navicon{
    padding: 5px 8px 5px 8px;
}
.side-nav.closed .navicon{
    padding: 5px 8px 5px 8px;
}
.nav-text{
  padding: 10px 0 0 12px;
  font-size: 14px;
}
.nav-img{
    width: 24px;
    height: 24px;
}

.menu-button-container{
    padding-top: 75px;
    display: inline-block;
    padding-left: 20px;
    z-index: 1;
    position: fixed;
    background: #fff no-repeat;
    width: 61px;
    height: 210px;
    clip-path: inset(-5px 1px -5px -5px);
    box-shadow: none !important;
}
.menu-button-container.newClass{
    z-index: 1005 !important;
    width: 61px !important;
    height: 115px !important;
}
.menu-button-container.newClass.whiteIcon{
    box-shadow: none !important;
    padding-top: 45px;
    display: inline-block;
    padding-left: 9px;
    background: none;
}
.menu-button-container.whiteIcon{
    box-shadow: none !important;
    padding-top: 45px;
    display: inline-block;
    padding-left: 9px;
    background: none;
}
.menu-button-container.newClass.hovered{
    z-index: 1005 !important;
    width: 16rem !important;
    height: 114px !important;
}
.menu-button-container.opened.newClass{
    z-index: 1005 !important;
    height: 115px !important;
}
.side-nav.wide.slim.userinfo-expanded{
    top:12rem !important;
}

@media only screen and (min-width: 200px) and (max-width: 1053px) {
    .responsivelogo{
        margin-bottom: 0px;
        margin-left: 48px;
    }
}

@media only screen and (min-width: 420px) and (max-width: 575px) {
    .main-container {
        padding: 128px 16px 0px 16px !important;
    }
    .main-container.withoutPatientCard {
        padding: 64px 16px 0px 16px !important;
    }
}

@media only screen and (min-width: 576px) and (max-width: 598px) {
    .main-container {
        padding: 128px 16px 0px 16px !important;
    }
    .main-container.nav-expanded {
        padding: 128px 16px 0px 16px !important;
        width: 100% !important;
    }
    .main-container.withoutPatientCard {
        padding: 64px 32px 0px 32px !important;
    }
    .side-nav.wide, .side-nav.wide.slim.opened{
        margin-left: 16rem !important;
        top: 3rem !important;
        display: inline-block !important;
    }
    .userprofileicons {
        width: 24px;
        height: 24px;
        text-align: center;
        border-radius: 50%;
        margin: 0 auto;
        position: relative;
        padding-top: 4px;
        font-size: 12px;
    }
    .menu-img {
        width: 24px;
        height: 24px;
        margin-right: 0px !important;
        margin-top: 0px;
        margin-left: -16px;
    }
    .side-nav.wide, .side-nav.wide.slim.closed {
        display: none !important;
    }
    .navbar-brand{
        font-size: 0.9rem;
    }
    .menu-button-container{
        width: 61px !important;
        height: 114px !important;
    }
    menu-button-container.whiteIcon{
        
        box-shadow: none !important;
        padding-top: 45px;
        display: inline-block;
        padding-left: 9px;
        background: none;
    }
}
   @media only screen and (min-width: 599px) and (max-width: 767px) {
    .main-container {
        padding: 128px 16px 0px 16px !important;
    }
    .main-container.nav-expanded {
        padding: 128px 16px 0px 16px !important;
        width: 100% !important;
    }
    .main-container.withoutPatientCard {
        padding: 64px 16px 0px 16px !important;
    }
    .userprofileicons {
        width: 24px;
        height: 24px;
        text-align: center;
        border-radius: 50%;
        margin: 0 auto;
        position: relative;
        padding-top: 4px;
        font-size: 12px;
    }
    .menu-img {
        width: 24px;
        height: 24px;
        margin-right: 0px !important;
        margin-top: 0px;
        margin-left: -16px;
    }
    .side-nav.wide, .side-nav.wide.slim.closed {
        display: none !important;
    }
    .side-nav.wide, .side-nav.wide.slim.opened {
        margin-left: 16rem !important;
        top: 3.5rem !important;
        width: 16rem !important;
        display: inline-block !important;
    }
    .navbar-brand{
        font-size: 0.9rem;
    }
    .user-info-bar{
        margin-top: -20px;
    }
    .col-sizebig{
        flex: 0 0 50% !important;
        max-width: 50% !important;
    }
    .col-sizesmall{
        flex: 0 0 50% !important;
        max-width: 50% !important;
    }
    .col-sizebig1{
        flex: 0 0 50% !important;
        max-width: 50% !important;
    }
    .col-sizesmall1{
        flex: 0 0 50% !important;
        max-width: 50% !important;
    }
    .menu-button-container{
        width: 61px !important;
        height: 114px !important;
    }
    menu-button-container.whiteIcon{
        
        box-shadow: none !important;
        padding-top: 45px;
        display: inline-block;
        padding-left: 9px;
        background: none;
    }
   }
   @media only screen and (min-width: 768px) and (max-width: 991px) {
    .main-container {
        padding: 128px 32px 0px 32px !important;
    }
    .main-container.nav-expanded {
        padding: 128px 32px 0px 32px !important;
        width: 100% !important;
    }
    .main-container.withoutPatientCard {
        padding: 64px 32px 0px 32px !important;
    }
    .navbaricons{
        margin-left: auto!important;
    }
    .userprofileicons {
        width: 24px;
        height: 24px;
        text-align: center;
        border-radius: 50%;
        margin: 0 auto;
        position: relative;
        padding-top: 4px;
        font-size: 12px;
    }
    .menu-img {
        width: 24px;
        height: 24px;
        margin-top: 0px;
        margin-right: 0px !important;
        margin-left: -16px;
    }
    .col-sizebig{
        flex: 0 0 75% !important;
        max-width: 75% !important;
    }
    .col-sizesmall{
        flex: 0 0 45% !important;
        max-width: 45% !important;
    }
    .col-sizebig1{
        flex: 0 0 55% !important;
        max-width: 55% !important;
    }
    .col-sizesmall1{
        flex: 0 0 46% !important;
        max-width: 46% !important;
    }
    .side-nav.wide, .side-nav.wide.slim.opened {
        margin-left: 16rem !important;
        top: 3.5rem !important;
        width: 16rem !important;
        display: inline-block !important;
    }
    .side-nav.wide, .side-nav.wide.slim.closed {
        display: none !important;
    }
    
    .menu-button-container.opened.newClass {
        z-index: 1005 !important;
    }
    .menu-button-container.newClass{
        box-shadow: none !important;
    }
    .menu-button-container.whiteIcon{
        width: 61px !important;
        height: 115px !important;
        box-shadow: none !important;
        padding-top: 45px;
        display: inline-block;
        padding-left: 9px;
        background: none;
    }
   }
@media only screen and (min-width: 992px) and (max-width: 1053px) {
    .side-nav.wide.slim.userinfo-expanded{
        top:12rem !important;
    }
    .nav-container.newsideNavClass {
        padding-top: 4px !important;
    }
    .col-sizebig{
        flex: 0 0 65% !important;
        max-width: 65% !important;
    }
    .button-detail{
    }
    .side-nav.wide, .side-nav.wide.slim.opened {
        margin-left: 16rem !important;
        top: 3.5rem !important;
        width: 16rem !important;
        display: inline-block !important;
    }
    .side-nav.wide, .side-nav.wide.slim.closed {
        display: none !important;
    }
    .main-container {
        padding: 128px 32px 0px 32px !important;
    }
    .main-container.nav-expanded {
        padding: 128px 32px 0px 32px !important;
        width: 100% !important;
    }
    .main-container.withoutPatientCard {
        padding: 64px 32px 0px 32px !important;
    }
    .col-sizebig1{
        flex: 0 0 70% !important;
        max-width: 70% !important;
    }
    .menu-button-container.whiteIcon{
        width: 61px !important;
        height: 115px !important;
        box-shadow: none !important;
        padding-top: 45px;
        display: inline-block;
        padding-left: 9px;
        background: none;
    }
}
@media only screen and (min-width: 1054px) and (max-width: 1199px) {
    .side-nav.wide, .side-nav.wide.slim.opened {
        top: 7rem !important;
        margin-left: 16rem !important;
        width: 16rem !important;
    }
    .side-nav.wide, .side-nav.wide.slim.closed {
        top: 7rem !important;
        margin-left: 3.75rem !important;
    }
    .side-nav.wide, .side-nav.wide.slim.closed.userinfo-expanded {
        top: 7rem !important;
    }
    .nav-container.newsideNavClass {
        padding-top: 60px !important;
    }
    .side-nav.wide, .side-nav.wide.slim.opened.userinfo-expanded {
        top: 12rem !important;
        width: 16rem;
        margin-left: 0rem;
    }
    .side-nav.wide, .side-nav.wide.slim.closed.newsideNavClass{
        top: 3.5rem !important;
        margin-left: 3.75rem !important;
    }
    .side-nav.wide, .side-nav.wide.slim.opened.newsideNavClass{
        top: 3.5rem !important;
        margin-left: 16rem !important;
        width: 16rem !important;
    }
    .menu-button-container.opened.newClass {
        z-index: 1005 !important;
        width: 16rem !important;
        height: 115px !important;
    }
}
@media only screen and (min-width: 1200px) and (max-width: 1300px) {
    .side-nav.wide, .side-nav.wide.slim.opened {
        top: 7rem !important;
        margin-left: 16rem !important;
        width: 16rem !important;
    }
    .side-nav.wide, .side-nav.wide.slim.closed {
        top: 7rem !important;
        margin-left: 3.75rem !important;
    }
    .side-nav.wide, .side-nav.wide.slim.closed.userinfo-expanded {
        top: 7rem !important;
    }
    .side-nav.wide, .side-nav.wide.slim.opened.userinfo-expanded {
        top: 12rem !important;
        width: 16rem;
        margin-left: 0rem;
    }
    .side-nav.wide, .side-nav.wide.slim.closed.newsideNavClass{
        top: 3.5rem !important;
        margin-left: 3.75rem !important;
    }
    .side-nav.wide, .side-nav.wide.slim.opened.newsideNavClass{
        top: 3.5rem !important;
        margin-left: 16rem !important;
        width: 16rem !important;
    }
    .menu-button-container.opened.newClass {
        z-index: 1005 !important;
        width: 16rem !important;
        height: 115px !important;
    }
    .nav-container.newsideNavClass {
        padding-top: 60px !important;
    }
}



  @media only screen and (min-width: 1301px) and (max-width: 1355px) {
    .side-nav.wide, .side-nav.wide.slim.opened {
        top: 7rem !important;
        margin-left: 0rem !important;
        width: 16rem !important;
    }
    .side-nav.wide, .side-nav.wide.slim.closed {
        top: 7rem !important;
        margin-left: 0rem !important;
    }
    .side-nav.wide, .side-nav.wide.slim.closed.userinfo-expanded {
        top: 7rem !important;
    }
    .side-nav.wide, .side-nav.wide.slim.opened.userinfo-expanded {
        top: 12rem !important;
        width: 16rem;
        margin-left: 0rem;
    }
    .side-nav.wide, .side-nav.wide.slim.closed.newsideNavClass{
        top: 3.5rem !important;
        margin-left: 0rem !important;
    }
    .side-nav.wide, .side-nav.wide.slim.opened.newsideNavClass{
        top: 3.5rem !important;
        margin-left: 0rem !important;
        width: 16rem !important;
    }
    .nav-container.newsideNavClass {
        padding-top: 60px !important;
    }
    .menu-button-container.opened.newClass {
        z-index: 1005 !important;
        width: 16rem !important;
        height: 115px !important;
    }
}
   @media only screen and (min-width: 1356px) and (max-width: 1368px) {
    .side-nav.wide, .side-nav.wide.slim.opened {
        top: 7rem !important;
        margin-left: 0rem;
        width: 16rem !important;
    }
    .side-nav.wide, .side-nav.wide.slim.closed {
        top: 7rem !important;
        margin-left: 0rem;
    }
    .side-nav.wide, .side-nav.wide.slim.closed.userinfo-expanded {
        top: 7rem !important;
    }
    .side-nav.wide, .side-nav.wide.slim.opened.userinfo-expanded {
        top: 12rem !important;
        width: 16rem;
        margin-left: 0rem;
    }
    .side-nav.wide, .side-nav.wide.slim.opened.newsideNavClass{
        top: 3.5rem !important;
        margin-left: 0rem;
        width: 16rem !important;
    }
    .side-nav.wide, .side-nav.wide.slim.closed.newsideNavClass{
        top: 3.5rem !important;
        margin-left: 0rem;
    }
    .menu-button-container.opened.newClass {
        z-index: 1005 !important;
        width: 16rem !important;
        height: 115px !important;
    }
   }
   @media only screen and (min-width: 1369px) and (max-width: 1699px) {
    .side-nav.wide, .side-nav.wide.slim.closed.userinfo-expanded {
        top: 7rem !important;
    }
    .side-nav.wide, .side-nav.wide.slim.opened.userinfo-expanded {
        top: 12.3rem !important;
        width: 14.8rem;
    }
    .side-nav.wide, .side-nav.wide.slim.opened {
        top: 7rem !important;
        margin-left: 0rem;
        width: 16rem !important;
    }
    .side-nav.wide, .side-nav.wide.slim.closed {
        top: 7rem !important;
        margin-left: 0rem;
    }
    .side-nav.wide, .side-nav.wide.slim.closed.newsideNavClass{
        top: 3.5rem !important;
        margin-left: 0rem;
    }
    .side-nav.wide, .side-nav.wide.slim.opened.newsideNavClass{
        top: 3.5rem !important;
        margin-left: 0rem;
        width: 16rem !important;
    }
    .menu-button-container.opened.newClass {
        z-index: 1005 !important;
        width: 16rem !important;
        height: 115px !important;
    }
   }
   @media only screen and (min-width: 1700px) and (max-width: 1919px) {
    .side-nav.wide, .side-nav.wide.slim.closed {
        top: 7rem !important;
    }
    .side-nav.wide.slim.userinfo-expanded {
        top: 12.5rem !important;
    }
    .side-nav.wide, .side-nav.wide.slim.opened {
        top: 7rem !important;
        width: 16rem !important;
    }
    .side-nav.wide, .side-nav.wide.slim.closed.newsideNavClass{
        top: 3.5rem !important;
    }
    .side-nav.wide, .side-nav.wide.slim.opened.newsideNavClass{
        top: 3.5rem !important;
        width: 16rem !important;
    }
    .menu-button-container.opened.newClass {
        z-index: 1005 !important;
        width: 16rem !important;
        height: 115px !important;
    }
    .nav-container.newsideNavClass {
        padding-top: 60px !important;
    }
   }
   @media only screen and (min-width: 1920px) and (max-width: 2559px) {
    .side-nav.wide.slim.userinfo-expanded {
        top: 11.2rem !important;
    }
    .side-nav.wide, .side-nav.wide.slim.opened.userinfo-expanded{
        top: 11.2rem !important;
    }
    .nav-container.newsideNavClass {
        padding-top: 60px !important;
    }
    .side-nav.wide, .side-nav.wide.slim.opened {
        top: 7rem !important;
        width: 16rem !important;
    }
    .side-nav.wide, .side-nav.wide.slim.closed {
        top: 7rem !important;
    }
    .side-nav.wide, .side-nav.wide.slim.closed.newsideNavClass{
        top: 3.5rem !important;
    }
    .side-nav.wide, .side-nav.wide.slim.opened.newsideNavClass{
        top: 3.5rem !important;
        width: 16rem !important;
    }
    .menu-button-container.opened.newClass {
        z-index: 1005 !important;
        width: 16rem !important;
        height: 115px !important;
    }
   }
   @media only screen and (min-width: 1059px) and (max-width: 1299px) {
    .side-nav.wide, .side-nav.wide.slim.closed.newsideNavClass.hovered{
        top: 3.5rem !important;
         width: 4rem !important;
    }
    .menu-button-container.newClass.hovered{
        width: 65px !important;
    }
   }

   
   @media only screen and (min-width: 2560px) and (max-width: 2700px) {
    .side-nav.wide, .side-nav.wide.slim.closed {
        top: 7rem !important;
    }
    .side-nav.wide, .side-nav.wide.slim.opened {
        top: 7rem !important;
        width: 16rem !important;
    }
    .side-nav.wide, .side-nav.wide.slim.closed.newsideNavClass{
        top: 3.5rem !important;
    }
    .side-nav.wide, .side-nav.wide.slim.opened.newsideNavClass{
        top: 3.5rem !important;
        width: 16rem !important;
    }
    .menu-button-container.opened.newClass {
        z-index: 1005 !important;
        width: 16rem !important;
        height: 115px !important;
    }
    .nav-container.newsideNavClass {
        padding-top: 60px !important;
    }
   }

   .whitecolor{
       color: #FFF !important;
   }

  `
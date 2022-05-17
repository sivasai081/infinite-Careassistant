import css from 'styled-jsx/css'
import theme from '../constants/theme.json';
export default css.global`

.md-form input:not([type]), .md-form input[type="text"]:not(.browser-default), .md-form input[type="password"]:not(.browser-default), .md-form input[type="email"]:not(.browser-default), .md-form input[type="url"]:not(.browser-default), .md-form input[type="time"]:not(.browser-default), .md-form input[type="date"]:not(.browser-default), .md-form input[type="datetime"]:not(.browser-default), .md-form input[type="datetime-local"]:not(.browser-default), .md-form input[type="tel"]:not(.browser-default), .md-form input[type="number"]:not(.browser-default), .md-form input[type="search"]:not(.browser-default), .md-form input[type="phone"]:not(.browser-default), .md-form input[type="search-md"], .md-form textarea.md-textarea{
  margin-left: 0px !important;
}

.whitecolor{
  color: #FFF !important;
}

.stepper.timeline li a .circle {
  width: 40px !important;
  height: 40px !important;
  line-height: 40px !important;
  font-size: 1.2em !important;
  text-align: center;
  position: absolute;
  top: 20px !important;
  margin-left: -45px;
  background-color: #fff;
  z-index: 2;
  box-shadow: none !important;
}

.hoverable:hover{
  box-shadow: none !important;
}

.md-form>label{
  margin-left: 0px !important;
}
.select-wrapper input.select-dropdown{
  padding-left: 8px !important;
  width:98% !important;
}

.registries-dropdown  input.select-dropdown{
  padding-left: 8px !important;
  width:96% !important;
}

.view_all_button{
  width:20%;
}

.recent_activity_search_container {
  position: relative;
  display: flex;
  width: 100% !important;
}

.recent_activity_search_icon {
  position: absolute;
  margin-top: 0.55rem;
  cursor: pointer;
  left: 72%;
  color: #424242 !important;
}

.recent_activity_search_icon:hover {
  position: absolute;
  margin-top: 0.55rem;
  cursor: pointer;
  right: 20px !important;
  color: #db1962 !important;
}


.recent_activity_search_bar {
  height:36px  !important;
  background-color: white;
  border: none;
  width: 80% !important;
  outline: none;
  border-radius: 0.4rem;
  color: #000;
  padding-left: 0.5rem;
  font-size: 0.9rem;
  box-shadow: none !important;
  border: 1px solid #dbdbdb;
  margin-right:16px !important;
}

.caremanagerlistsearching {
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

.caremanagerlistsearchIcon {
  position: absolute;
  margin-top: 0.55rem;
  margin-left: 0rem;
  cursor: pointer;
}

.stepper-vertical li .step-content p{
  font-weight: 600 !important;
  color: #424242 !important;
  font-size: 18px !important;
  line-height: 24px !important;
  letter-spacing: 0px !important;
}

body.modal-open{
}
body.create-group-modal{
  overflow: hidden !important;
  position: fixed;
}
body.overflow-y-scroll{
  overflow: auto !important;
}
.fc .fc-button-group>.fc-button.fc-button-active{
  z-index: 0 !important;
}
.col-md-12{
  padding-right: 8px !important;
  padding-left: 8px !important;
}
.col-sm-12.col-md-12.col-lg-4{
  padding-right: 8px !important;
  padding-left: 8px !important;
}
.col-sm-3.col-md-3.col-lg-2{
  padding-right: 8px !important;
  padding-left: 8px !important;
}
.modal-header .close {
  padding: 1rem 1rem;
  color: #000 !important;
  margin: -1.5rem -1rem -1rem auto !important;
}
.modal-header .close:hover {
  padding: 1rem 1rem;
  color: #db1962 !important;
  margin: -1.5rem -1rem -1rem auto !important;
}
.table{
  border: 1px solid rgba(0,0,0,0.1) !important;
  color: #424242 !important;
  font-size: 14px !important;
}
.table-header{
  color: #424242;
  font-weight: bold; 
}
.table.table thead th {
  color: #424242;
  font-weight: bold;
  font-size: 14px !important;
  background-color: #f7f8f9 !important;
  height: 40px !important;
  border-bottom: none !important;
}
.table.table tr:nth-child(even) {
  background: #f7f8f9;
}
.table tr td{
  border: none !important;
  color: #424242 !important;
  font-size: 14px !important;
  padding: .35rem .6rem !important;
  height: 40px !important;
  vertical-align: inherit !important;
}
#createappointment-modal{
}
.modal-backdrop.show{
  height: 100% !important;
}
.appointment-title{
  margin-top: -20px !important;
}
.createappointment .md-form{
  position: relative !important;
  margin-top: 1.5rem !important;
  margin-bottom: 1.5rem !important;
  margin-left: 2px !important;
}
.appointment-dropdown{
  margin: 30px 0px !important;
}
.createappointment .modal-content{
  margin-top: 100px !important;
  margin-bottom: -30px !important;
  border-radius: 8px !important;
}
.createappointment .modal-title{
  margin-bottom: -20px !important;
  margin-left: 4px !important;
  font-weight: 700 !important;
    font-size: 24px !important;
    color: #424242 !important;
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


.name{
  color: #424242;
  font-family: "Open Sans";
  font-size: 14px;
  font-weight: 600;
}
.date{
  color: #424242;
  font-family: "Open Sans";
  font-size: 14px;
  font-weight: 400;
}
.header{
  color: #ca2128;
  font-family: "Open Sans";
  font-size: 12px;
  font-weight: 700;
}
.desc{
  color: #424242;
  font-family: "Open Sans";
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
}
.owl-carousel .owl-item .active {
  transform: translateY(-20px);
}
.owl-theme .owl-dots{
  margin-top: -10px !important;
}
.owl-theme .owl-nav .owl-next [class*='owl-']:hover{
  font-size: 20px !important;
  font-weight: 700 !important;
  color: #db1962 !important;
  position: absolute !important;
  top: 40px !important;
  right: -15px !important;
  background: none !important;
}
.owl-theme .owl-nav .owl-prev [class*='owl-']:hover{
  font-size: 20px !important;
  font-weight: 700 !important;
  color: #db1962  !important;
  position: absolute !important;
  top: 40px !important;
  left: -15px !important;
  background: none !important;
}
.owl-theme .owl-dots .owl-dot.active span{
  background: #1265f0 !important;
  opacity: 1;
  width: 6px !important;
  height: 6px !important;
  margin: 3px 3px !important;
}
.owl-theme .owl-dots .owl-dot span{
  background: #424242 !important;
  opacity:.5;
  width: 6px !important;
  height: 6px !important;
  margin: 3px 3px !important;
}
.owl-prev{
  font-size: 20px !important;
  font-weight: 700 !important;
  color: #424242  !important;
  position: absolute !important;
  top: 40px !important;
  left: -15px !important;
  background: none !important;
}
.owl-prev:hover{
  font-size: 20px !important;
  font-weight: 700 !important;
  color: #DB1962  !important;
  position: absolute !important;
  top: 40px !important;
  left: -15px !important;
  background: none !important;
}
.owl-next{
  font-size: 20px !important;
  font-weight: 700 !important;
  color: #424242 !important;
  position: absolute !important;
  top: 40px !important;
  right: -15px !important;
  background: none !important;
}
.owl-next:hover{
  font-size: 20px !important;
  font-weight: 700 !important;
  color: #DB1962 !important;
  position: absolute !important;
  top: 40px !important;
  right: -15px !important;
  background: none !important;
}
.ignore-button{
  border: 0 !important;
  margin .3rem;
  font-size: 12px !important;
  height: 24px !important;
  width: 110px !important;
  border-radius: 8px !important;
  color: #FFF !important;
  padding: .2rem .3rem !important;
  background-color: #727272 !important;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2) !important;
}
.see-more-button{
  border: 0 !important;
  margin .3rem;
  font-size: 12px !important;
  height: 24px !important;
  width: 110px !important;
  border-radius: 8px !important;
  padding: .2rem .3rem !important;
  background-color: #1265f0 !important;
  color: #FFF !important;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2) !important;
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
  height: 540.444px;
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
.search-timeline .md-form.md-outline .prefix ~ input, .md-form.md-outline .prefix ~ textarea{
  width: calc(100% - -2rem);
}
.search-timeline .md-form.md-outline .prefix ~ label{
  margin-left: 2.3rem !important;
}
.MuiSnackbar-anchorOriginTopCenter{
  top: 60px !important;
}
.full-calendar-plugin .modal-content{
  border-radius: 8px !important;
}
.highcharts-container{
  margin-top: 20px !important;
}
.full-calendar-plugin .modal-content .modal-title{
  color: #424242 !important;
  font-weight: 700 !important;
  font-family: "Open Sans" !important;
}
.full-calendar-plugin .modal-content h4{
  color: #424242 !important;
  font-weight: 600 !important;
  font-family: "Open Sans" !important;
}
.calneder-row .full-calendar-plugin .btn-group .btn{
  margin: 0rem !important;
}
.calneder-row .full-calendar-plugin .btn-group{
  margin: 0rem .375rem 0rem .375rem !important;
}
.full-calendar-plugin .modal-content .btn-primary{
  color: #DB1962 !important;
  cursor: pointer !important;
  background-color: transparent !important;
  box-shadow: none !important;
  font-family: "Open Sans" !important;
  font-size: 16px !important;
  line-height: 22px !important;
  letter-spacing: 1px !important;
  font-weight: 600 !important;
  padding: 0px !important;
  margin: .375rem !important;
  border: none !important;
}
.full-calendar-plugin .modal-content .btn-danger{
  color: #DB1962 !important;
  cursor: pointer !important;
  background-color: transparent !important;
  box-shadow: none !important;
  font-family: "Open Sans" !important;
  font-size: 16px !important;
  line-height: 22px !important;
  letter-spacing: 1px !important;
  font-weight: 600 !important;
  padding: 0px !important;
  margin: .375rem !important;
  border: none !important;
}
.full-calendar-plugin .modal-content .btn-success{
  color: #DB1962 !important;
  cursor: pointer !important;
  background-color: transparent !important;
  box-shadow: none !important;
  font-family: "Open Sans" !important;
  font-size: 16px !important;
  line-height: 22px !important;
  letter-spacing: 1px !important;
  font-weight: 600 !important;
  padding: 0px !important;
  margin: .375rem !important;
  border: none !important;
}
.MuiSnackbarContent-root{
  background: #DB1962 !important;
  color: #FFF !important;
}

.timeline-graph .btn-info, .timeline-graph .btn-success{
  background: #1265F0  0% 0% no-repeat padding-box !important;
  box-shadow: 0px 3px 6px #00000029 !important;
  color: #fff !important;
}

.timeline-graph .btn-info.btn-outline-info, .timeline-graph .btn-outline-danger, .timeline-graph .btn-success.btn-outline-success{
  background: #FFFFFF 0% 0% no-repeat padding-box !important;
  box-shadow: 0px 3px 6px #00000029 !important;
  border: none !important;
  color: #424242 !important;
}

.calendar-controls .btn-outline-info, .btn-outline-success{
  border: none !important;
}

.btn-outline-success, .btn-outline-info , .btn-outline-success:hover, .btn-outline-info:hover{
  color: #424242 !important;
}

.oneColumn{
  text-align: center;
}
.not-found-img{
  padding-bottom: 20px;
  opacity: 0.5;
  padding-top:20px
}
.no-found-text{
  color: #d3d3d3 !important;
  padding-bottom: 30px;
}
.card{
  margin-top: 16px !important;
}
.nobadgesbackground .card-body{
    background: #FFF !important;
    padding: .5rem 1.25rem .4rem 1.25rem !important;
}
.nobadgesbackground{
    box-shadow: 0 6px 10px 0 rgba(0,0,0,0.17) !important;
    background: #FFF !important;
}
.hoverable{
    cursor: pointer !important;
}
.hoverable .card-body{
    padding: 1.5rem !important;
}


.search-timeline .md-form{
    margin-top: 0rem !important;
}
.search-timeline .md-form.md-outline .prefix ~ input{
    margin-left: 0rem !important;
    margin-right: 0rem !important;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
}
.search-timeline .md-form.md-outline{
    margin-left:1.5rem;
}
.search-timeline .md-form.md-outline .prefix{
    cursor: pointer;
    padding-left:.75rem;
    color: #424242 !important;
}
.fc-icon-chevron-right:hover{
  color: #db1962 !important;
}
.fc-icon-chevron-left:hover{
  color: #db1962 !important;
}
.search-timeline .md-form.md-outline .prefix:hover{
  color: #db1962 !important;
}
.search-timeline .md-form.md-outline .form-control {
    padding: .45rem 2.5rem;
}
.hoverable .counter-text{
    margin-bottom: 25px;
}
.hoverable .h6-responsive{
    margin-top: 15px !important;
}
.dashboardbadges{
    float: right !important;;
    border-radius: 50% !important;;
    padding: 4px 0px 0px 0px !important;
    height: 40px!important; ;
    width: 40px !important;
    background-color: #D50000 !important;;
    color: #FFF !important;
    font-family: Open Sans;
    font-size: 24px !important;;
    font-weight: 700 !important;;
    letter-spacing: 1px !important;;
    line-height: 32px !important;
    position: absolute;
    right: -10px;
    margin-top: -35px;
    text-align: center;
}


.js-plotly-plot .plotly .main-svg .draglayer .nsewdrag{
	fill: #F5F5F5 !important;
}
.kpilabel{
    margin-top: 8px !important;
}

.dashboardkpiicons{
    width: 40px;
    height: 40px;
    text-align: center;
    border-radius: 50%;
    margin: 0 auto;
    position: relative;
    padding-top: 7px;
}
.timeline-container{
    margin-left: 8px;
    margin-right: 8px;
}
.timeline-container .stepper.timeline li.timeline-inverted{
    align-items: flex-start;
    margin-left: 16px !important;
 }


 .timeline-container ul.stepper{
  margin-top: 0;
  
}

.stepper.timeline.stepper-vertical li:not(:last-child):after{
  width: 1px !important;
  background-color: #dbdbdb !important;
 }
 
 .timeline-container .stepper.timeline.stepper-vertical li:not(:last-child):after{
     left: 2.2rem !important;
     top: 65px;
 }
 .timeline-container .stepper.timeline li a{
     left: 3% !important;
 }
 .timeline-container .stepper-vertical li .step-content{
     margin-left: 5.13rem !important;
 }
 
 .stepper.timeline li.timeline-inverted .step-content{	
    padding: 8px 8px 8px 8px !important;
    border-radius : 8px !important;	
  }	

 .stepper-vertical li .step-content p{	
    margin-top: 4px !important;	
    margin-bottom: 0px !important;	
    margin-left: 8px;
    color: #4D4F5C;
    font-size: 16px;
    letter-spacing: 1px;
    line-height: 21px;
  }
 .stepper-vertical li .step-content h6{	
    margin-left: 8px;
    color: #727272;
    font-size: 14px;
    letter-spacing: 1px;
    line-height: 22px;
 }

 .stepper-vertical li .step-content span{	
    color: #4D4F5C;
    font-size: 16px;
    letter-spacing: 1px;
    line-height: 21px;
    font-weight: 600;
 }


    .sub-title{
        color: #727272;
        padding-top:10px;
    }

    .sub-title-next{
        color: #DB1962;
        font-weight: 600;
    }

    .next-appointment span{
        color: ${theme.themeColor};
        font-weight: 600 !important;
        font-size: 24px;
        letter-spacing: 1px;
        line-height: 32px;
        text-align: right;
    }

    .next-appointment{
        color: ${theme.fontPrimaryColor};
        font-weight: 600 !important;
        font-size: 24px;
        letter-spacing: 1px;
        line-height: 32px;
        
    }

    .appointment-time-user{
        color: ${theme.fontSecondaryColor};
        font-size: 18px;
        font-weight: 600;
        letter-spacing: 1px;
        line-height: 24px;
        
    }

    .first-row-card{
        max-height: 850px;
        min-height: 850px;
        
    }

    .second-row-card{
        max-height: 840px;
        min-height: 840px;
        
    }

    .primarybutton{
        border-radius: 8px !important;
        font-weight: 400 !important;
        font-size: 14px !important;
        height: 36px !important;
        margin: 0 !important;
        letter-spacing: 1px;
        padding: 0.4rem 1rem !important;
        float: right;
        background-color: #1265F0  !important;
        color: #FFFFFF !important;
        border: 1px solid #1265F0  !important;
      }

      .customizebutton{
        border-radius: 8px !important;
        font-weight: 100;
        margin: 0 !important;
        font-size: 16px !important;
        letter-spacing: 1px;
        padding: 0.4rem 1rem !important;
        float: right;
        background-color: #1265F0  !important;
        color: #FFFFFF !important;
        border: 1px solid #1265F0  !important;
        
      }

      .continuepagebutton{
        border-radius: 8px !important;
        font-weight: 400 !important;
        font-size: 14px !important;
        max-width: 200px !important;
        height: 36px !important;
        margin-bottom: 12px !important;
        letter-spacing: 1px;
        padding: 0.4rem 1rem !important;
        background-color: #1265F0  !important;
        color: #FFFFFF !important;
        border: 1px solid #1265F0  !important;
      }

      .tablebutton{
        padding: 0rem !important;
        border: none !important;
        font-weight: 600 !important;
        text-decoration: underline !important;
        font-size: 16px !important;
        letter-spacing: 1px;
        margin-top: 0px !important;
        background-color: unset !important;
        color: #db1962 !important;
        box-shadow: unset !important;
      }

      .immediate-action-required {
        color: #D50000;
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 1px;
        line-height: 32px;
        margin-bottom: 2px;
      }

      .action-info{
        margin-bottom: 6px;
        color: ${theme.fontPrimaryColor};
        font-size: 14px;
        letter-spacing: 1px;
        line-height: 24px;
        
      }

    .alertscard{
        background-color: #FFF;
        box-shadow: 0 6px 10px 0 rgba(0,0,0,0.17) !important;
        min-height: 220px !important;
    }

    .alertscard:hover, .taskscard:hover, assessmentscard:hover, eventscard:hover{ 
        background-color: #E9E9E9 !important;
        box-shadow: 0 6px 10px 0 rgba(0,0,0,0.17);
    }

    .taskscard{
         background-color: #FFF;
      box-shadow: 0 6px 10px 0 rgba(0,0,0,0.17) !important;
      min-height: 220px !important;
    }

    .assessmentscard{
        background-color: #FFF;
        box-shadow: 0 6px 10px 0 rgba(0,0,0,0.17) !important;
        min-height: 220px !important;
    }

    .eventscard{
        background-color: #FFF;
        box-shadow: 0 6px 10px 0 rgba(0,0,0,0.17) !important;
        min-height: 220px !important;
    }

      

    .alertscard p{
        color: #B71C1C;;
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 1px;
        line-height: 27px;
    }

    .taskscard p{
        color: #4A148C;
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 1px;
        line-height: 27px;
    }
    .assessmentscard p{
        color: #0D47A1;
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 1px;
        line-height: 27px;
    }
    .eventscard p{
        color: #1B5E20;
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 1px;
        line-height: 27px;
    }

    .alertscard span{
        color: #424242;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 1px;
        line-height: 20px;
    }

    .taskscard span{
        color: #424242;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 1px;
        line-height: 20px;

    }
    .assessmentscard span{
        color: #424242;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 1px;
        line-height: 20px;
    }
    .eventscard span{
        color: #424242;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 1px;
        line-height: 20px;
    }

    .card-title{
        color: ${theme.fontPrimaryColor};
        font-weight: 700 !important;
        font-weight: 700;
        line-height: 32px;
    }
    .select-wrapper.md-form.md-outline span.caret {
      margin-top: -.25rem;
      padding-right: .75rem;
      padding-left: .75rem;
  }
    .card-sub-title{
        color: #727272;
        font-size: 16px;
        font-weight: 400 !important;
        letter-spacing: 0px;
        line-height: 27px;
        margin-top: -16px !important;
    }
    .count{
      color: #db1962;
      font-size: 16px;
      font-weight: 700 !important;
      letter-spacing: 1px;
      margin-top: -16px !important;
    }
    .card-right{
        display: flex;
        padding-right: 0;
    }

    .card-selection{
        color: #748AA1;
    }

    .month-right-dropdown{
        margin: -7px 0 !important;
        max-width: 200px !important;
    }
  // .month-right-dropdown .select-dropdown{
  //     font-size: 12px !important;
  // }
  .select-wrapper.md-form.md-outline input.select-dropdown{
    height: 36px !important;
  }
.attempt-dropdown{
    margin: -7px 0 !important;
}
.attempt {
  border-radius: 8px !important;
  border: 1px solid #dadce0 !important;
  box-shadow: 0 3px 6px 0 rgba(0,0,0,0.16) !important;
}
   @media only screen and (max-width: 1025px ){
     .stepper.timeline li .step-content{
         left: 0rem !important;
         margin-bottom: 0rem !important;
         
     }
   }
   @media only screen and (min-width: 1024px ) and (max-width: 1359px ) {
    .recent_activity_search_icon {
      left: 67%;
    }
    .timeline-container .stepper.timeline li .step-content {
        width: 93%;
        float: left !important;
     }
   }

   @media only screen and (min-width: 1360px ) and (max-width: 1650px ) {
    .recent_activity_search_icon {
      left: 73%;
    }
    .timeline-container .stepper.timeline li .step-content {
        width: 95%;
        float: left !important;
     }
   }

   @media only screen and (min-width: 1651px ) {
    .recent_activity_search_icon {
      left: 73%;
    }
    .timeline-container .stepper.timeline li .step-content {
        width: 96%;
        float: left !important;
     }
   }
   @media (min-width: 2560px ) and (max-width: 2700px ) {
    .hoverable .counter-text {
      margin-bottom: 0px;
    }
    .owl-carousel{
      margin-top: 14px !important;
      margin-bottom: 14px !important;
    }
    .hoverable .card-body{
      padding: 1.6rem !important;
    }
   }
   @media (min-width: 1920px ) and (max-width: 2559px ) {
    .recent_activity_search_icon {
      left: 76%;
    }
    .hoverable .counter-text {
      margin-bottom: 0px;
    }
    .owl-carousel{
      margin-top: 14px !important;
      margin-bottom: 14px !important;
    }
    .hoverable .card-body{
      padding: 1.6rem !important;
    }
   }
   @media (min-width: 1700px ) and (max-width: 1919px ) {
    .recent_activity_search_icon {
      left: 76%;
    }
    .hoverable .counter-text {
      margin-bottom: 0px;
    }
    .hoverable .card-body{
      padding: 1.2rem !important;
    }
    .owl-carousel{
      margin-top: 4px !important;
      margin-bottom: 4px !important;
    }
    .owl-theme .owl-dots {
      margin-top: -2px !important;
    }
   }
   @media (min-width: 1368px ) and (max-width: 1699px ) {
    .next-appointment span{
        font-size: 24px !important;
    }
    .hoverable .card-body{
      padding: 1.3rem !important;
    }
    .next-appointment{
        font-size: 24px !important;
    }
    .hoverable .counter-text {
      margin-bottom: 0px;
    }
    .card-title{
      font-size: 24px !important;
    }
   }
   @media (min-width: 1200px ) and (max-width: 1365px ) {
    .next-appointment span{
        font-size: 20px !important;
    }
    .hoverable .card-body{
      padding: 1.6rem !important;
    }
    .next-appointment{
        font-size: 20px !important;
    }
    .hoverable .counter-text {
      margin-bottom: 0px;
    }
    .card-title{
        font-size: 20px !important;
    }
    .owl-carousel{
      margin-top: 3px !important;
      margin-bottom: 3px !important;
    }
    .search-timeline .md-form.md-outline .prefix{
      padding-left: .75rem;
    }
    .search-timeline .md-form.md-outline .prefix~label {
      margin-left: 2.3rem !important;
    }
   }
   @media (min-width: 1024px ) and (max-width: 1199px ) {
    .next-appointment span{
        font-size: 20px !important;
    }
    .hoverable .card-body{
      padding: 1.5rem 0rem !important;
    }
    .next-appointment{
        font-size: 20px !important;
    }
    .kpilabel{
      font-size: 12px !important;
    }
    .search-timeline .md-form.md-outline .prefix{
      padding-left: .75rem;
    }
    .search-timeline .md-form.md-outline .prefix~label {
      margin-left: 2.3rem !important;
    }
    .card-title{
        font-size: 20px !important;
    }
    .hoverable .counter-text {
      margin-bottom: 0px;
    }
   }
  @media (min-width: 992px) and (max-width: 1023px) {
    .next-appointment span{
        font-size: 20px !important;
    }
    .next-appointment{
        font-size: 20px !important;
    }
    .kpilabel{
      font-size: 12px !important;
    }
    .search-timeline .md-form.md-outline .prefix{
      padding-left: .75rem;
    }
    .search-timeline .md-form.md-outline .prefix~label {
      margin-left: 2.3rem !important;
    }
    .card-title{
        font-size: 20px !important;
    }
    .ignore-button{
      width: 110px !important;
    }
    .see-more-button{
      width: 110px !important;
    }
    .hoverable .counter-text {
      margin-bottom: 0px;
    }
    .hoverable .card-body {
      padding: 1.5rem 0rem !important;
    }
  }
@media (min-width: 768px ) and (max-width: 991px ) {
  .recent_activity_search_icon {
    left: 55%;
  }
    .next-appointment span{
      font-size: 20px !important;
    }
    .next-appointment{
      font-size: 20px !important;
    }
    .kpilabel{
      font-size: 14px !important;
      margin-left: 0px;
      margin-right: 0px;
    }
    .card-title{
      font-size: 20px !important;
    }
    .col-md-12 {
    }
    .hoverable .counter-text {
      margin-bottom: 0px;
    }
    .md-form.md-outline {
      margin-left: 125px !important;
    }
    .search-timeline .md-form.md-outline{
      margin-left: -7.5rem !important;
      margin-right: 6rem !important;
    }
    .search-timeline .md-form.md-outline .prefix{
      padding-left: .75rem;
    }
    .search-timeline .md-form.md-outline .prefix~label {
      margin-left: 2.3rem !important;
    }
    .primarybutton-classname{
      margin-left: 570px;
      margin-top: -60px;
    }
    .primarybutton{
      padding: .4rem .6rem !important;
    }
}
@media (min-width: 599px ) and (max-width: 767px ) {
    .next-appointment span{
      font-size: 16px !important;
    }
    .next-appointment{
      font-size: 16px !important;
    }
    .kpilabel{
      font-size: 10px !important;
      margin-left: 0px;
      margin-right: 0px;
    }
    .card-title{
        font-size: 18px !important;
    }
    .dashboardbadges{
      padding: 0px 0px 0px 0px !important;
      height: 32px!important;
      width: 32px !important;
      font-size: 16px !important;
      right: -12px;
      margin-top: -28px;
    }
    .hoverable .counter-text {
      margin-bottom: 0px;
    }
    .dropdown-col{
      margin-top: -35px !important;
      margin-left: 300px !important;
    }
    .search-timeline{
      margin-Left: 0rem !important;
      width: 500px !important;
    }
    .search-timeline .md-form.md-outline .prefix{
      padding-left: .75rem !important;
    }
    .search-timeline .md-form.md-outline .prefix~label {
      margin-left: 2.3rem !important;
    }
    .primarybutton-classname{
      margin-top: -60px;
    }
    .search-timeline .md-form.md-outline{
      margin-Left: 0rem !important;
    }
    .search-timeline .md-form.md-outline .prefix~input{
      width: calc(100% - 10rem);
    }
}
@media (min-width: 576px ) and (max-width: 598px ) {
    .next-appointment span{
      font-size: 16px !important;
    }
    .kpilabel{
      font-size: 10px !important;
      margin-left: 0px;
      margin-right: 0px;
    }
    .dropdown-col{
      margin-top: -35px !important;
      margin-left: 300px !important;
    }
    .next-appointment{
      font-size: 16px !important;
    }
    .card-title{
        font-size: 18px !important;
    }
    .dashboardbadges{
      padding: 0px 0px 0px 0px !important;
      height: 32px!important;
      width: 32px !important;
      font-size: 16px !important;
      right: -12px;
      margin-top: -28px;
    }
    .hoverable .counter-text {
      margin-bottom: 0px;
    }
    .search-timeline{
      margin-Left: 0rem !important;
      width: 500px !important;
    }
    .search-timeline .md-form.md-outline .prefix{
      padding-left: .75rem;
    }
    .search-timeline .md-form.md-outline .prefix~label {
      margin-left: 2.3rem !important;
    }
    .primarybutton-classname{
      margin-top: -60px;
    }
    .search-timeline .md-form.md-outline{
      margin-Left: 0rem !important;
    }
    .search-timeline .md-form.md-outline .prefix~input{
      width: calc(100% - 10rem);
    }
}
  @media (min-width: 420px ) and (max-width: 575px ) {
    .next-appointment span{
      font-size: 16px !important;
    }
    .next-appointment{
      font-size: 16px !important;
    }
    .card-title{
        font-size: 18px !important;
    }
    .dashboardbadges{
      padding: 0px 0px 0px 0px !important;
      height: 32px!important;
      width: 32px !important;
      font-size: 16px !important;
      right: -12px;
      margin-top: -28px;
    }
    .hoverable .counter-text {
          margin-bottom: 0px;
    }
  }
   @media only screen and (min-width: 2261px ) and (max-width: 2560px ) {
    
    .stepper.timeline li a .circle{
      float: left;
      left: -0.5rem !important;
    }
    .month-right-dropdown{
      margin-left: 160px !important;
    }
    .createappointment .modal-content{
      margin-top: 400px !important;
      margin-bottom: -30px !important;
      border-radius: 8px !important;
    }
  }
  @media only screen and (min-width: 2021px ) and (max-width: 2260px ) {
    .stepper.timeline li a .circle{
      float: left;
      left: 0.3rem !important;
    }
  }
  @media only screen and (min-width: 1920px ) and (max-width: 2021px ) {
    .stepper.timeline li a .circle{
      float: left;
      left: 0.4rem !important;
    }
  }

  
   @media only screen and (min-width: 1920px ) and (max-width: 2260px ) {
   
   
    
    .month-right-dropdown{
      margin-left: 65px !important;
    }
    .createappointment .modal-content{
      margin-top: 300px !important;
      margin-bottom: -30px !important;
      border-radius: 8px !important;
    }
    .search-timeline .md-form.md-outline .prefix ~ input, .md-form.md-outline .prefix ~ textarea{
      width: calc(100% - -8rem);
    }
  }
   @media only screen and (min-width: 1750px ) and (max-width: 1919px ) {
   
  
    .stepper.timeline li a .circle{
      float: left;
      left: 0.7rem;
    }
    .search-timeline .md-form.md-outline .prefix ~ input, .md-form.md-outline .prefix ~ textarea{
      width: calc(100% - -6rem);
    }
  }
  @media only screen and (min-width: 1600px ) and (max-width: 1749px ) {
    .stepper.timeline li a .circle{
      float: left;
      left: 0.9rem;
    }
    .search-timeline .md-form.md-outline .prefix ~ input, .md-form.md-outline .prefix ~ textarea{
      width: calc(100% - -4rem);
    }
  }
  @media only screen and (min-width: 1450px ) and (max-width: 1599px ) {
    .stepper.timeline li a .circle{
      float: left;
      left: 1.3rem;
    }
    .search-timeline .md-form.md-outline .prefix ~ input, .md-form.md-outline .prefix ~ textarea{
      width: calc(100% - -4rem);
    }
  }
  @media only screen and (min-width: 1300px ) and (max-width: 1449px ) {
    .stepper.timeline li a .circle{
      float: left;
      left: 1.6rem;
    }
  }
  @media only screen and (min-width: 1120px ) and (max-width: 1299px ) {
    .stepper.timeline li a .circle{
      float: left;
      left: 1.8rem;
    }
  }
  @media only screen and (min-width: 960px ) and (max-width: 1119px ) {
    .stepper.timeline li a .circle{
      float: left;
      left: 2.3rem;
    }
  }
  @media only screen and (min-width: 800px ) and (max-width: 959px ) {
    .stepper.timeline li a .circle{
      float: left;
      left: 2.6rem;
    }
  }
  @media only screen and (min-width: 600px ) and (max-width: 799px ) {
    .stepper.timeline li a .circle{
      float: left;
      left: 2.9rem;
    }
  }
  @media only screen and (min-width: 400px ) and (max-width: 599px ) {
    .stepper.timeline li a .circle{
      float: left;
      left: 3.1rem;
    }
  }
  @media only screen  and (max-width: 400px ) {
    .stepper.timeline li a .circle{
      float: left;
      left: 3.1rem;
    }
  } 
  
  

`
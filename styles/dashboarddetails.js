import css from 'styled-jsx/css'
import theme from '../constants/theme.json';
export default css.global`

.search-container .select-wrapper input.select-dropdown{
  margin: 0rem !important;
}

.search-container .md-form{
  margin-bottom: 0rem !important;
}


.alert_search_container {
  position: relative;
  display: flex;
  width: 94% !important;
}

.alert_search_icon {
  position: absolute;
  margin-top: 0.55rem;
  cursor: pointer;
  right: 20px !important;
  color: #424242 !important;
}

.alert_search_icon:hover {
  position: absolute;
  margin-top: 0.55rem;
  cursor: pointer;
  right: 20px !important;
  color: #db1962 !important;
}

.alert_search_bar {
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

.select-wrapper input.select-dropdown{
  padding-left: 8px !important;
  width:96% !important;
}

.md-form.md-outline input[type="text"], .md-form.md-outline input[type="password"], .md-form.md-outline input[type="email"], .md-form.md-outline input[type="url"], .md-form.md-outline input[type="time"], .md-form.md-outline input[type="date"], .md-form.md-outline input[type="datetime-local"], .md-form.md-outline input[type="tel"], .md-form.md-outline input[type="number"], .md-form.md-outline input[type="search-md"], .md-form.md-outline input[type="search"], .md-form.md-outline textarea.md-textarea{
  border: none !important;
  border-bottom: 1px solid #ced4da !important;
  border-radius: 0px !important;
}

ul.stepper{
  padding: 0.5rem !important;
}

.sub-title{
    color: #727272;
    padding-top:10px;
}

.sub-title-next{
    color: #DB1962;
    font-weight: 600;
}

.fc-theme-standard{
  margin-top: 32px !important;
}
.notes-dropdown{
  display: flex;
}

.notes-dropdown .select-wrapper span.caret, .timeline-graph .select-wrapper span.caret{
}
.note-from-month, .note-to-month{
  padding: 2.2rem 0.5rem;
}
.search-notes, .notes-dropdown{
}
.notes-dropdown .dropdown-content li>a, .notes-dropdown .dropdown-content li>span{
  color: #727272 !important;
}
.notes-dropdown .select-dropdown li.disabled{
  opacity: 0.6;
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
  background: #e0e0e0 !important;
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

.stepper.timeline li a .circle{
  width: 40px !important;
  height: 40px !important;
  line-height: 40px !important;
  font-size: 1.2em !important;
  text-align: center;
  position: absolute;
  top: 20px !important;
  box-shadow: none !important;
}
.notes-dropdown .MuiInput-underline:before{
  border-bottom: none !important;
}
.notes-dropdown .MuiInputBase-root{
  color: #727272 !important;
  font-size: 16px;
}
.search-notes .md-form.md-outline .prefix ~ input{
  margin-left: 0rem !important;
  margin-right: 0rem !important;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}
.search-notes .md-form.md-outline{
}
.search-notes .md-form.md-outline .prefix{
  padding-left:.75rem;
  color: #424242 !important;
}
.notes-pagination .MuiPaginationItem-textPrimary.Mui-selected{
  box-shadow: none;
  color: #DB1962 !important;
  background-color: #FFFF !important;
  font-weight: 700 !important;
}
.note-from-month, .note-to-month{
  padding: 2.2rem 0.5rem;
}
.notes-pagination .MuiPagination-root{
  display: flex;
  justify-content: center;  
  margin-bottom: 60px !important;
  margin-top: 30px;
}
.search-notes .md-form.md-outline .form-control {
  padding: .45em 2.5rem;
}
.notes-container ul.stepper{
  margin-top: 0;
}
.notes-container .stepper.timeline li .step-content {
  width: 93%;
  float: left !important;
}
.stepper.timeline.stepper-vertical li:not(:last-child):after{
  width: 1px !important;
  background-color: #dbdbdb !important;
 }
.notes-dropdown .MuiInput-underline:after{
  border-bottom: 2px solid #DB1962 !important;
}  
.viewmore-btn{
    border-radius: 8px !important;
    font-weight: 100;
    margin: 0 !important;
    font-size: 16px !important;
    letter-spacing: 1px;
    padding: 0.4rem 0.6rem !important;
}
.notes-container .stepper-vertical li .step-content {
  margin-left: 4.7rem !important;
}
.notes-container .stepper.timeline li.timeline-inverted{
  align-items: flex-start;
}
.notes-container .stepper.timeline.stepper-vertical li:not(:last-child):after{
   left: 2.3rem !important;
}
.notes-container .stepper.timeline li a{
   left: 3% !important;
}
.notes-container .stepper.timeline.stepper-vertical li:not(:last-child):after{
top: 65px;
}
.timelineencounterviewmore{
   float : right;
   margin-right: 16px;

}
.notes-type{
  font-family: "Open Sans";
  font-weight: 600;
  font-size: 13px;
  padding-left: 8px;
}

.notes-type.notes-color1{
  color: #DB1962;
}
.notes-type.oldnotes-color1{
  color: #424242;
}

.notes-type.notes-color8{
color: #29B6F6;
}
.notes-type.notes-color2{
  color: #00897B;
}
.notes-type.notes-color3{
  color: #536DFE;
}
.notes-type.notes-color4{
  color: #7CB342;
}
.notes-type.notes-color5{
color: #FF8A80;
}
.notes-type.notes-color6{
color: #DB1B60;
}
.notes-container .stepper.timeline li .step-content {
  width: 90%;
  float: left !important;
}
.notes-type{
  font-family: "Open Sans";
  font-weight: 600;
  font-size: 13px;
  padding-left: 8px;
  margin-top: 8px;
}
.note-title{
  color: #1265F0;
  text-decoration: underline;
  cursor: pointer;
  letter-spacing: 0.15px !important;
  font-weight: 600 !important;
}

.note-title-read{
  color: #727272;
  text-decoration: underline;
  cursor: pointer;
  letter-spacing: 0.15px !important;
  font-weight: 600 !important;
  font-size: 20px !important;
}

.sub-note{
color: #424242;
font-family: "Open Sans";
font-weight: 600;
font-size: 16px;
padding-left: 8px;
padding-bottom: 12px;
margin-top: 10px;
}
.notes-description{
  color: #424242;
  margin-bottom: 10px;
  font-family: "Open Sans";
  font-size: 14px;
  padding-left: 8px;
  font-weight: 600;
  margin-top: -10px;
}
.viewmore-btn {
  float: right !important;
  padding: 0.4rem 0rem !important;
  border: none !important;
  font-weight: 600 !important;
  text-decoration: underline !important;
  font-size: 16px !important;
  letter-spacing: 1px;
  margin-bottom: 12px !important;
  background-color: unset !important;
  color: #db1962 !important;
  box-shadow: unset !important;
}
.sub-note1{
color: #424242;
font-family: "Open Sans";
font-weight: 600;
font-size: 16px;
padding-bottom: 12px;
padding-left: 8px;
margin-top:10px;
}
.stepper-vertical li .step-content p{	
  margin-top: 8px !important;	
  margin-bottom: 0px !important;	
  margin-left: 8px;
  color: #424242 !important;
}	
.stepper-vertical li .step-content span{	
 margin-top: 4px !important;
 margin-left: 8px;	
}	
.stepper-vertical li .step-content h5{	
 margin-top: 0px !important;	
 margin-left: 8px;
 margin-bottom: 17px;
}	
.stepper-vertical li .step-content h6{	
 margin-bottom: 0px !important;	
 margin-top: 0px !important;
 margin-left: 8px;
}
.stepper.timeline li.timeline-inverted .step-content{	
  padding: 8px 8px 8px 8px !important;
  border-radius : 8px !important;	
}
@media only screen and (min-width: 2560px) and (max-width: 2700px) {
  .stepper.timeline li a .circle{
    float: left;
    left: 1.4rem !important;
  }
  .search-container{
    margin-left: 2.2rem !important;
    margin-right: 2.2rem !important;
 }
 .col-md-5.notes-dropdown{
    flex: 0 0 39.666%;
    max-width: 39.666%;
  }
  .stepper.timeline li a .circle {
    float: left;
    left: -0.6rem !important;
  }
  .notes-container .stepper.timeline li .step-content {
    width: 94%;
    float: left !important;
  }
}
@media only screen and (min-width: 1920px) and (max-width: 2459px) {
    .stepper.timeline li a .circle{
      float: left;
      left: 0.7rem !important;
    }
    .search-container{
      margin-left: 2.2rem !important;
      margin-right: 2.2rem !important;
    }
   .col-md-5.notes-dropdown{
    flex: 0 0 39.666%;
    max-width: 39.666%;
    }

  }
  @media only screen and (min-width: 1700px) and (max-width: 1919px) {
    .stepper.timeline li a .circle{
      float: left;
      left: 1rem !important;
    }
    .search-container{
      margin-left: 2.2rem !important;
      margin-right: 2.2rem !important;
    }
    .col-md-5.notes-dropdown{
      flex: 0 0 39.666%;
      max-width: 39.666%;
    }
  }
  @media only screen and (min-width: 1351px) and (max-width: 1699px) {
    .stepper.timeline li a .circle{
      float: left;
      left: 1.7rem !important;
    }
    .search-container{
      margin-left: 2.2rem !important;
      margin-right: 2.2rem !important;
    }
  }
  @media only screen and (min-width: 1200px) and (max-width: 1350px) {
    .stepper.timeline li a .circle{
      float: left;
      left: 2rem !important;
    }
    .search-container{
      margin-left: 2.2rem !important;
      margin-right: 2.2rem !important;
    }
     .notes-container .stepper.timeline li .step-content {
      width: 90%;
      float: left !important;
    }
  }
  @media only screen and (min-width: 1024px) and (max-width: 1199px) {
    .stepper.timeline li a .circle{
      float: left;
      left: 2.2rem !important;
    }
    .search-container{
      margin-left: 2.2rem !important;
      margin-right: 2.2rem !important;
    }
    .notes-container .stepper.timeline li .step-content {
      width: 85%;
      float: left !important;
    }
    .stepper.timeline li .step-content{
      left: 0rem !important;
      margin-bottom: 0rem !important;
    }
  }
  @media only screen and (min-width: 992px) and (max-width: 1023px) {
    .stepper.timeline li a .circle{
      float: left;
      left: 2.3rem !important;
    }
    .notes-container .stepper.timeline li .step-content {
      width: 86% !important;
      float: left !important;
    }
    .stepper.timeline li .step-content{
      left: 0rem !important;
      margin-bottom: 0rem !important;
    }
    .search-container{
      margin-left: 2rem !important;
      margin-right: 2rem !important;
   }
   .col-md-2.notes-dropdown{
    flex: 0 0 20.666667% !important;
    max-width: 20.666667% !important;
    }
    .col-md-5.notes-dropdown{
      flex: 0 0 48.666667% !important;
      max-width: 48.666667% !important;
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 991px) {
    .stepper.timeline li a .circle{
      float: left;
      left: -.5rem !important;
      margin-left: 0px !important;
    }
    .search-container{
      margin-left: 2.2rem !important;
      margin-right: 2.2rem !important;
   }
   .notes-container .stepper.timeline li .step-content {
      width: 85%;
      float: left !important;
      margin-left: 1.7rem !important;
      margin-bottom: 0rem !important;
    }
    .col-md-2.notes-dropdown{
      flex: 0 0 20.666667% !important;
      max-width: 20.666667% !important;
    }
    .col-md-5.notes-dropdown{
      flex: 0 0 49.666667% !important;
      max-width: 49.666667% !important;
    }
  }
@media only screen and (min-width: 599px) and (max-width: 767px) {
  .stepper.timeline li a .circle{
    float: left;
    left: 0rem !important;
    margin-left: 0px !important;
  }
  .md-form.md-outline .prefix ~ input, .md-form.md-outline .prefix ~ textarea {
    width: calc(100% - .8rem);
    margin-left: 2rem;
  }
 .notes-container .stepper.timeline li .step-content {
    width: 85%;
    float: left !important;
    margin-left: 1.7rem !important;
    margin-bottom: 0rem !important;
  }
  .notes-dropdown{
    margin-bottom: -20px;
  }
  .col-md-2.notes-dropdown{
    flex: 0 0 30.666667% !important;
    max-width: 30.666667% !important;
  }
  .col-md-3.search-notes{
    flex: 0 0 68.666667% !important;
    max-width: 68.666667% !important;
  }
  .col-md-5.notes-dropdown{
    flex: 0 0 99.666667% !important;
    max-width: 99.666667% !important;
    margin-top: -30px;
    margin-left: -10px;
  }
}
@media only screen and (min-width: 576px) and (max-width: 598px) {
  .stepper.timeline li a .circle{
    float: left;
    left: 0rem !important;
    margin-left: 0px !important;
  }
 .notes-container .stepper.timeline li .step-content {
    width: 85%;
    float: left !important;
    margin-left: 1.7rem !important;
    margin-bottom: 0rem !important;
  }
  .notes-dropdown{
    margin-bottom: -20px;
  }
  .notes-dropdown .md-outline{
    width:448px !important;
  }
  .col-md-2.notes-dropdown{
    flex: 0 0 30.666667% !important;
    max-width: 30.666667% !important;
  }
  .col-md-3.search-notes{
    flex: 0 0 68.666667% !important;
    max-width: 68.666667% !important;
  }
  .col-md-5.notes-dropdown{
    flex: 0 0 99.666667% !important;
    max-width: 99.666667% !important;
    margin-top: -30px;
    margin-left: -10px;
  }
  .md-form.md-outline .prefix ~ input, .md-form.md-outline .prefix ~ textarea {
    width: calc(100% - .8rem);
    margin-left: 2rem;
}
}
  @media only screen  and (max-width: 575px) {
    .stepper.timeline li a .circle{
      float: left;
      left: 1.5rem !important;
    }
  }

`
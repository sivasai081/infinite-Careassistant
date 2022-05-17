import css from 'styled-jsx/css'
export default css.global`

.timeline_activity_search_container {
  position: relative;
  display: flex;
  width: 100% !important;
}

.timeline_activity_search_icon {
  position: absolute;
  margin-top: 0.55rem;
  cursor: pointer;
  left: 72%;
  color: #424242 !important;
}

.timeline_activity_search_icon:hover {
  position: absolute;
  margin-top: 0.55rem;
  cursor: pointer;
  right: 20px !important;
  color: #db1962 !important;
}

.timeline_activity_search_bar {
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

.btn-outline-success, .btn-outline-info , .btn-outline-success:hover, .btn-outline-info:hover{
  color: #424242 !important;
}
.stepper.timeline li.timeline-inverted .step-content{
  padding: 8px 8px 8px 8px !important;
    border-radius: 8px !important;
}
.stepper-vertical li .step-content p{
    margin-top: 16px !important;
    margin-bottom: 0px !important;
    margin-left: 8px;
    color: #424242 !important;
}
.MuiPagination-ul{	
  margin-left: -70px !important;	
}
.kpicards-health360 .col{
  padding-left: 8px !important;
  padding-right: 8px !important;
}
.tengrid-container{
  padding: 0px !important;
}
.tengrid-container .card{
  margin-top: 16px !important;
}
.card{
  margin-top: 16px !important;
}
.col-md-12{
  padding-left: 8px !important;
  padding-right: 8px !important;
}
.tengrid-container .card-body{
    padding: 0.5rem 0 !important;
    min-width: 100px; 
    background: transparent linear-gradient(230deg, #FDFDFD 0%, #FCFCFC 15%, #FFFFFF 30%, #FFFFFF 64%, #FFFFFF 100%) 0% 0% no-repeat padding-box;
}
.tengrid-container.view{
  overflow: visible !important;
}
.search-timeline .md-form.md-outline .prefix ~ label{
  margin-left: 4.5rem !important;
}
.health360-title{
    padding: 10px 0 0 0;
  }
  .card-row{
      display: flex;
  }
.hoverable .icons{
  margin-top:10px !important;  
}
.pagination .navigation{

}
.kpilabel{	
    margin-top: 8px !important;	
    margin-left: 6px;	
    margin-right: 6px;
    font-weight: 600 !important;
    color: #424242 !important;
    font-size: 14px;	
}
.counter-text{
  color: #DB1962;
  font-size: 18px;
  font-weight: 600 !important;
}  
  .icons{
    width: 2rem;
    height: 2rem;
    text-align: center;
    border-radius: 50%;
    margin: 0 auto;
    position: relative;
    padding-top: 4px;
  }
  .icons-row{
    width: 2rem;
    height: 2rem;
    text-align: center;
    border-radius: 50%;
    position: relative;
    padding-top: 5px;
    margin-top: 6px;
  }
  .tengrid-container .card-body{
    padding: 1rem 0 !important;
    min-width: 100px; 
    background: transparent linear-gradient(230deg, #FDFDFD 0%, #FCFCFC 15%, #FFFFFF 30%, #FFFFFF 64%, #FFFFFF 100%) 0% 0% no-repeat padding-box;
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
.tengrid-container.view{
  overflow: visible !important;
}
  .color-1{
    background-color:#FF8A80;
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
 .member-activity{
     color: #DB1962;
     font-weight: 600;
 }
 .p-histrory{
     color: #727272;
     padding-top:10px;
 }
 .timeline-header-month{
    font: Bold 24px/33px Open Sans;
    letter-spacing: 0px;
    color: #424242;
    margin-left: 64px;
    margin-top: 0.4rem;
 }

.timeline-text{
  margin-left: 20px;
  margin-top: 25px;
}
.timeline-months{
  display: flex;
  float: right;
  position: absolute;
  right: 2rem;
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
  color: #424242 !important;
  padding: 2.2rem 0.5rem;
}
.search-timeline, .timeline-months{
  padding: 0
}
.w-responsive{
  color: #424242 !important;
}
.h6-responsive{
  color: #424242 !important;
}
 .search-timeline .md-form.md-outline .prefix ~ input{
  margin-left: 0rem !important;
  margin-right: 0rem !important;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border: 1px solid #dfdfdf !important;
}
.search-timeline .md-form.md-outline{
  margin-left:1.5rem;
}
.search-timeline .md-form.md-outline .prefix{
  padding-left: 2.75rem;
  color: #424242 !important;
  cursor: pointer;
}
.search-timeline .md-form.md-outline .prefix:hover{
  color: #db1962 !important;
  cursor: pointer;
}
.timeline-pagination .MuiPaginationItem-textPrimary.Mui-selected{
  font-weight: bold;
  color: #DB1962 !important;
  background-color: #FFFF !important;
  font-weight: 700 !important;
}
.timeline-pagination .MuiPagination-root{
  display: flex;
  justify-content: center; 
  margin-top: 30px !important;
}
.search-timeline .md-form.md-outline .form-control {
  padding: .45rem 2.5rem;
}
.timeline-container ul.stepper{
  margin: 1em 0 -1.5em -1em !important;
  
}

.timeline-graph .md-tabs{
  width: fit-content;
    float: right;
    padding: 0 0 0 10px;
    box-shadow: none;
    border: none;
    z-index: unset;
    background-color: #fff;
    
}
.timeline-graph .md-tabs .nav-link{
  color: #000 !important;
  text-transform: none !important;
  background: #FFF !important;
  margin: 0rem !important;
  font-weight: 400 !important;
  font-size: 12px !important;
  max-width: 200px !important;
  height: 24px !important;
  padding: 0.2rem 1rem !important;
}
.timeline-graph .tab-pane{
  margin-top:20px;
}
.timeline-graph .md-tabs .nav-item{
  box-shadow: 0px 3px 6px #00000029;
}
.chartSelected{
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
}
.calenderSelected{
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
}
.font-weight-bold{
  color: #424242;
}
.timeline-graph .md-tabs .nav-link.active, .timeline-graph .md-tabs .nav-item.open .nav-link{
  box-shadow: 0px 3px 6px #00000029;
  background-color: #1265F0 !important;
  color: #FFFFFF !important;
  margin: 0rem !important;
  font-weight: 400 !important;
  font-size: 12px !important;
  max-width: 200px !important;
  height: 24px !important;
  padding: 0.2rem 1rem !important;
}
.timeline-graph .btn-info.btn-outline-info, .timeline-graph .btn-outline-danger, .timeline-graph .btn-success.btn-outline-success{
  background: #FFFFFF 0% 0% no-repeat padding-box !important;
  box-shadow: 0px 3px 6px #00000029 !important;
  border: none !important;
  color: #424242 !important;
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
.highcharts-container{
  margin-top: 20px !important;
}
.calendar-controls .btn-outline-info, .btn-outline-success{
  border: none !important;
}
.calendar-controls .btn{
  margin: 0rem !important;
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
.tabchartcss{
  font-weight: 400 !important;
  font-size: 14px !important;
  max-width: 200px !important;
  height: 36px !important;
  border-top-right-radius: 0rem !important;
  border-bottom-right-radius: 0rem !important;
  border-top-left-radius: 0.2rem !important;
  border-bottom-left-radius: 0.2rem !important;
}
.tabcalendarcss{
  font-weight: 400 !important;
  font-size: 14px !important;
  max-width: 200px !important;
  height: 36px !important;
  border-top-right-radius: .2rem !important;
  border-bottom-right-radius: .2rem !important;
  border-top-left-radius: 0rem !important;
  border-bottom-left-radius: 0rem !important;
}
.timeline-graph .btn-info, .timeline-graph .btn-success{
  background: #1265EF 0% 0% no-repeat padding-box !important;
  box-shadow: 0px 3px 6px #00000029 !important;
  color: #fff !important;
}
 .timeline-container .stepper.timeline li.timeline-inverted{
    align-items: flex-start;
 }

 .stepper.timeline.stepper-vertical li:not(:last-child):after{
  width: 1px !important;
  background-color: #dbdbdb !important;
 }
 
 .timeline-container .stepper.timeline.stepper-vertical li:not(:last-child):after{
     left: 2.3rem !important;
 }
 .timeline-container .stepper.timeline li a{
     left: 3% !important;
 }
 .timeline-container .stepper-vertical li .step-content{
     margin-left: 5.13rem !important;
 }
 .timeline-container .stepper.timeline.stepper-vertical li:not(:last-child):after{
  top: 65px;
 }
 .stepper.timeline li.timeline-inverted .step-content{	
   padding: 8px 8px 16px 8px !important;
   border-radius : 8px !important;	
   min-height: 6.7rem;
 }	
 .stepper-vertical li .step-content p{	
   margin-top: 16px !important;	
   margin-bottom: 0px !important;	
   margin-left: 8px;
   font-size: 14px !important;
   color: #424242 !important;
 }	
 .stepper-vertical li .step-content span{	
  margin-top: 4px !important;
  margin-left: 8px;	
}	
.stepper-vertical li .step-content h5{	
  margin-bottom: 8px !important;	
  margin-top: 0px !important;
  margin-left: 8px;
  color: #424242 !important;
  font-weight: 700 !important;
  font-size: 20px !important;
}	
.stepper-vertical li .step-content h6{	
  margin-bottom: 0px !important;	
  margin-top: 8px !important;
  margin-left: 8px;
  color: #424242;
  font-weight: 600 !important;
  font-size: 14px !important;
}

.z-depth-1-half{

  box-shadow: none !important;
}


.viewmore-btn{
    padding: 0rem !important;
    border: none !important;
    font-weight: 600 !important;
    text-decoration: underline !important;
    font-size: 16px !important;
    letter-spacing: 1px;
    margin-top: -5px !important;
    background-color: unset !important;
    color: #db1962 !important;
    box-shadow: unset !important;
}

.timelineencountercoststyle{
  margin-right: 32px;
  color: #424242 !important;
}

.timelineencounterviewmore{
  float : right;
  position: absolute;
  right:0;
  top:40px;
  margin-right: 16px;
}
.chart-filter{
  margin-top: -75px;
}
.timeline-months .select-wrapper.md-form.md-outline .dropdown-content{
  float: right;
  right: 0;
}
@media only screen and (max-width: 575px){
  .stepper.timeline li a .circle{
    float: left;
    left: 2.7rem;
  }
  .search-timeline{
    margin-left:3.5rem;
  }
  .timeline-months{
   float: left !important;
   position: relative !important;
   padding-left: 4rem !important;
   padding-right: 2rem !important;
  }
}
@media (min-width: 576px) and (max-width: 598px){
  .stepper.timeline li a .circle{
    float: left;
    left: 2.7rem;
  }
  .search-timeline .md-form.md-outline .prefix~label {
    margin-left: 1.5rem !important;
  }
  .search-timeline .md-form.md-outline .prefix {
    padding-left: 0rem;
    color: #424242 !important;
  }
  .timeline-container .stepper.timeline li .step-content {
    width: 90%;
    float: left !important;
    margin-bottom: 0rem !important;
    left: 4.7rem !important;
    margin-left: 0rem !important;
  }
  .md-form.md-outline .prefix ~ input, .md-form.md-outline .prefix ~ textarea {
    width: calc(100% - -1.5rem);
    margin-left: 2rem;
  }
  .timeline-container .stepper-vertical li .step-content {
    margin-left: 4.7rem !important;
  }
  .search-timeline{
    margin-left:3.5rem;
  }
  .timeline-months{
   float: left !important;
   position: relative !important;
   padding-left: 4rem !important;
   padding-right: 2rem !important;
  }
}
@media (min-width: 599px) and (max-width: 767px) {
  .stepper.timeline li a .circle{
    float: left;
    left: 2.7rem;
  }
  .timeline-container .stepper.timeline li .step-content {
    width: 90.5%;
    float: left !important;
    margin-bottom: 0rem !important;
    left: 4.7rem !important;
    margin-left: 0rem !important;
  }
  .md-form.md-outline .prefix ~ input, .md-form.md-outline .prefix ~ textarea {
    width: calc(100% - 2rem);
    margin-left: 2rem;
  }
  .timeline-container .stepper-vertical li .step-content {
    margin-left: 4.7rem !important;
  }
}
@media (min-width: 768px) and (max-width: 991px){
  .stepper.timeline li a .circle{
    float: left;
    left: 2.5rem;
  }
  .full-calendar-plugin .calendar-controls {
    flex-direction: unset !important;
  }
  .timeline-container .stepper.timeline li .step-content {
    width: 92.5%;
    float: left !important;
    margin-bottom: 0rem !important;
    left: 4.7rem !important;
    margin-left: 0rem !important;
  }
  .timeline-container .stepper-vertical li .step-content {
    margin-left: 4.7rem !important;
  }
}
@media (min-width: 992px) and (max-width: 1023px){
  .stepper.timeline li a .circle{
    float: left;
    left: 2.1rem;
  }
  .full-calendar-plugin .calendar-controls {
    flex-direction: unset !important;
  }
  .timeline-container .stepper.timeline li .step-content {
    width: 94%;
    float: left !important;
    margin-bottom: 0rem !important;
    left: 4.7rem !important;
    margin-left: 0rem !important;
  }
  .timeline-container .stepper-vertical li .step-content {
    margin-left: 4.7rem !important;
  }
  .tengrid-container .col{
    flex: 0 0 19.666667%;
    max-width: 19.666667%;
  }
  .tengrid-container{
    margin-top: 0px;
  }
  .tengrid-container .card{
    margin-top: 16px !important;
  }
}
@media (min-width: 1024px) and (max-width: 1199px){
  .stepper.timeline li a .circle{
    float: left;
    left: 2.1rem;
  }
  .tengrid-container .col{
    flex: 0 0 19.666667%;
    max-width: 19.666667%;
  }
  .tengrid-container{
    margin-top: 0px;
  }
  .tengrid-container .card{
    margin-top: 16px !important;
  }
  .timeline-container .stepper.timeline li .step-content {
    width: 94.5%;
    float: left !important;
    margin-bottom: 0rem !important;
    margin-left: 1.7rem !important;
  }
  .timeline-container .stepper-vertical li .step-content {
    margin-left: 4.7rem !important;
  }
  .full-calendar-plugin .calendar-controls {
    flex-direction: unset !important;
  }
}
@media (min-width: 1200px) and (max-width: 1350px){
  .stepper.timeline li a .circle{
    float: left;
    left: 1.8rem;
  }
  .tengrid-container .col{
    flex: 0 0 19.666667%;
    max-width: 19.666667%;
  }
  .tengrid-container{
    margin-top: 0px;
  }
  .tengrid-container .card{
    margin-top: 16px !important;
  }
  .timeline-container .stepper.timeline li .step-content {
    width: 95%;
    float: left !important;
  }
  .timeline-container .stepper-vertical li .step-content {
    margin-left: 4.7rem !important;
  }
}
@media (min-width: 1351px) and (max-width: 1699px){
  .stepper.timeline li a .circle{
    float: left;
    left: 1.5rem;
  }
  .timeline-container .stepper.timeline li .step-content {
    width: 95.5%;
    float: left !important;
  }
  .timeline-container .stepper-vertical li .step-content {
    margin-left: 4.7rem !important;
  }
}
@media (min-width: 1700px) and (max-width: 1919px){
  .stepper.timeline li a .circle{
    float: left;
    left: 0.8rem;
  }
  .timeline-container .stepper.timeline li .step-content {
    width: 96.5%;
    float: left !important;
  }
  .timeline-container .stepper-vertical li .step-content {
    margin-left: 4.7rem !important;
  }
}
@media (min-width: 1920px) and (max-width: 2459px){
  .stepper.timeline li a .circle{
    float: left;
    left: 0.4rem;
  }
  .timeline-container .stepper.timeline li .step-content {
    width: 97%;
    float: left !important;
  }
  .timeline-container .stepper-vertical li .step-content {
    margin-left: 4.7rem !important;
  }
}
@media (min-width: 2560px) and (max-width: 2700px){
  .stepper.timeline li a .circle{
    float: left;
    left: -0.6rem;
  }
  .timeline-container .stepper-vertical li .step-content {
    margin-left: 4.9rem !important;
  }
  .timeline-container .stepper.timeline li .step-content {
    width: 97.5%;
    float: left !important;
  }
}
`
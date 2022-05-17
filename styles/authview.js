import css from 'styled-jsx/css'
export default css.global`


.historymodal .modal-content{	
  width: 650px;	
  margin-left: -5%;	
  border-radius: 8px !important;
}
.modal-dialog.historymodal{
  margin: 9rem auto !important;
}

.mailmodal .modal-content{	
  width: 560px;	
  border-radius: 8px !important;
}
.modal-dialog.mailmodal{
  margin: 8rem auto !important;
}
.contact-list{
    display:block;
    margin-top: 0px !important;
    border-radius: 8px;
    overflow-y: auto !important;
    max-height: 200px !important;
    overflow-x: hidden !important;
}
// .fadeElement.fadeIn{
//   top: 2.6rem !important;
// }
// .dropdown-content li>span{
//   color: #424242 !important;
// }
// .select-dropdown li.disabled>span{
//   color: #424242 !important;
//   opacity: 0.5 !important;
// }
// .dropdown-content li.active>span {
//   background-color: #db1962 !important;
//   color: #FFFFFF !important;
// }
.contact-list .hide{
    display:none;
}
.card-body .patients-items-row:nth-child(even) {
  background: #f7f8f9;
}
.patients-items-row{
  cursor: pointer;
  border-bottom: 1px solid #dee2e6;
}
.patients-items-row:hover{
}
.details{
  display: flex;
  padding: 4px 0px;
}
.users .details{
  display: flex;
  padding: 0px !important;
}
.circleClass{
  height: 24px;
    width: 24px;
    border-radius: 50%;
    display: inline-block;
    background: #db1962;
    color: #FFFFFF;
    position: relative;
    margin-left:0px;
    margin-top: -5px;
}
.circletext{
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%,-50%);
  -ms-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  font-size: 12px !important;
}
.oral-notification-table{
  width: 100% !important;
  border: 1px solid rgba(0,0,0,0.1) !important;
  color: #424242 !important;
  font-size: 14px !important;
  border-collapse: collapse !important;
}
table{
  width: 100% !important;
  border: 1px solid rgba(0,0,0,0.1) !important;
  color: #424242 !important;
  font-size: 14px !important;
  border-collapse: collapse !important;
}
.oral-notification-table thead th {
  color: #424242 !important;
  font-weight: bold !important;
  font-size: 14px !important;
  background-color: #f7f8f9 !important;
  cursor: pointer !important;
  letter-spacing: 0px !important;
  padding: 0rem 0.5rem 0rem 0.5rem !important;
  height: 40px;
  vertical-align: inherit !important;
}
table thead th {
  color: #424242 !important;
  font-weight: bold !important;
  font-size: 14px !important;
  background-color: #f7f8f9 !important;
  cursor: pointer !important;
  letter-spacing: 0px !important;
  padding: 0rem 0.5rem 0rem 0.5rem !important;
  height: 40px;
  vertical-align: inherit !important;
}
.oral-notification-table tbody tr {
  font: 18px/23px Open Sans;
  color: #424242;
}
table tbody tr {
  font: 18px/23px Open Sans;
  color: #424242;
}
.oral-notification-table tr:nth-child(even){
  background-color: #f7f8f9 !important;
}
table tr:nth-child(even){
  background-color: #f7f8f9 !important;
}
.table.table tr:nth-child(even) {
  background: #f7f8f9 !important;;
}
.oral-notification-table tbody tr:hover{
  background-color: #FFF !important;
} 
table tbody tr:hover{
  background-color: #FFF !important;
} 
.tbody tr:hover{
  background-color: #f7f8f9 !important;
}
.oral-notification-table td {
  text-align: left !important;
  vertical-align: middle !important;
  opacity: 1;
  letter-spacing: 0px !important;
  border: none !important;
  font-size: 14px !important;
  padding: .5rem .6rem !important;
  cursor: pointer;
  height: 40px;
  vertical-align: inherit;
}
table td {
  text-align: left !important;
  vertical-align: middle !important;
  opacity: 1;
  letter-spacing: 0px !important;
  border: none !important;
  font-size: 14px !important;
  padding: .5rem .6rem !important;
  cursor: pointer;
  height: 40px;
  vertical-align: inherit;
}
.icons-class {
  margin-right:8px !important;
  cursor: pointer;
  position: relative;
}

.confirmationmodalmessage{
  margin-left: 8px;
    margin-right: 8px;
    margin-top: 0px;
    margin-bottom: 0px;
    font-size: 16px;
    font-weight: 600;
    color: #424242;

}

.users{
  display: flex;
  border-radius: 24px;
  background-color: #FFF;
  height: 36px;
  margin: 24px 5px 5px 16px;
  align-items: center;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.25);
}


.contact-list{
  display:block;
  margin-top: 0px !important;
  border-radius: 8px;
  overflow-y: auto !important;
  max-height: 200px !important;
  overflow-x: hidden !important;
}
.contact-list .hide{
  display:none;
}

.historycontent p{
  margin-bottom: 0.2rem;
}

.historysearching {
  background-color: white;
  border: none;
  width: 100% !important;
  outline: none;
  border-radius: 0.4rem;
  color: #000;
  height: 1.5rem;
  padding: 1rem;
  padding-left: 0.5rem;
  font-size: 14px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.25px;
  line-height: 19px;
}

.historysearchIcon {
  position: absolute;
  margin-top: 0.55rem;
  margin-left: 36rem;
  cursor: pointer;
}

.reassignsearchIcon {
  position: absolute;
  margin-top: 0.55rem;
  margin-left: 27rem;
  cursor: pointer;
}

.modal-dialog.newauthviewmodal{
  margin: 9rem auto !important;
}

.md-form input:not([type]), .md-form input[type="text"]:not(.browser-default), .md-form input[type="password"]:not(.browser-default), .md-form input[type="email"]:not(.browser-default), .md-form input[type="url"]:not(.browser-default), .md-form input[type="time"]:not(.browser-default), .md-form input[type="date"]:not(.browser-default), .md-form input[type="datetime"]:not(.browser-default), .md-form input[type="datetime-local"]:not(.browser-default), .md-form input[type="tel"]:not(.browser-default), .md-form input[type="number"]:not(.browser-default), .md-form input[type="search"]:not(.browser-default), .md-form input[type="phone"]:not(.browser-default), .md-form input[type="search-md"], .md-form textarea.md-textarea{
  
}

.notetypedropdown{
  margin: 8px !important;
}

.newauthviewmodalbody{
  padding: 0rem 1rem !important;
}

.authviewcardbody .md-form textarea.md-textarea{
  min-height: 4rem !important;
  overflow-y: auto !important;
}

.authviewcardbody .md-form textarea.md-textarea+label{
  font-weight: 400 !important;
}

.authviewcardbody{
  border: 1px solid #dbdbdb !important;
  border-radius: 8px !important;
  margin-top: 20px;
}

.authviewcardbody .md-form{
  margin: 1.5rem !important;
}

.addnote{
  font-size: 14px !important;
  font-weight: 400 !important;
  max-width: 200px !important;
  height: 36px !important;
  letter-spacing: 1px !important;
  padding: .375rem 2rem !important;
  background-color: #DB1962 !important;
  border-radius: 8px;  
  color: #fff !important;
  border: none !important;
  outline: none !important;
  margin-bottom: 24px !important;
}

.usericons{
  width: 24px;
    height: 24px;
    text-align: center;
    border-radius: 50%;
    margin: 0px auto;
    position: relative;
    padding-top: 4px;
    padding-left: 8px;
}
.modal-content{
  margin-top: 100px;
  border-radius:  8px !important;
}
.modal-header .close{
  display: none !important;
}
.modal-title{
  font-weight: 700 !important;
  font-size: 24px !important;
  color: #424242 !important;
  margin-left: 4px !important;
}
.MuiInputBase-root {
  padding: 5px;
  margin-top: 0px !important;
  border: none !important;
  outline: nonr !important;
}
.MuiIconButton-root{
  padding: unset !important;
}
.MuiInputAdornment-positionEnd {
  margin-left: 0px;
}
.MuiTextField-root{
  width: 100% !important;
}
.date-picker__table .btn-primary{
  background-color: #db1962 !important;
}
.MuiPickersDay-isSelected{
  color: #fff !important;
  font-weight: 500 !important;
  background-color: #db1962 !important;
}
.MuiPickersDay-isSelected .MuiIconButton-label{
  color: #fff !important;
}
.MuiTypography-colorPrimary{
  color: #db1962 !important;
}
.MuiTypography-alignCenter{
  color: #424242 !important;
}
.MuiPickersCalendarHeader-iconButton{
  color: #424242 !important;
}
.MuiPickersDay-day .MuiIconButton-label{
  color: #424242;
}
.mdb-dataTables_paginate{
  display: none !important;
}
.mdb-datatable-info{
  display: none !important;
}
.MuiFormControl-marginNormal{
  width: 100% !important;
}
.MuiInput-underline:before{
  border-bottom: none !important;
}
.MuiInputBase-input {
  color: #727272 !important;
  margin-top: 5px !important;
}
.main-datepicker.MuiInputBase-root.Mui-focused{
  border-bottom: 2px solid #db1962 !important;
}
.main-datepicker.md-form input[type="text"]:not(.browser-default):focus:not([readonly]){
  border-bottom: none !important;
  box-shadow: none !important;
}
.md-form{
  margin-bottom: 0rem;
}
.MuiSvgIcon-root{
  margin-left: -35px !important;
}
.MuiSvgIcon-root:hover{
  color: #db1962 !important;
  
}
.MuiIconButton-root:hover{
}
.MuiPickersToolbar-toolbar {
  background-color: #db1962 !important;
}
.MuiButton-label{
  color: #db1962 !important;
}
.MuiPickersClock-pin {
  background-color: #db1962 !important;
}
.MuiPickersClockPointer-pointer{
  background-color: #db1962 !important;
}
.MuiPickersClockPointer-thumb{
  background-color: #db1962 !important;
  border: 14px solid #db1962 !important;
}
.MuiInput-underline:after{
  border: none !important;
}
.MuiInput-underline.Mui-focused:before {
  border-bottom: #db1962 1px solid !important;
}
.MuiFormLabel-root.Mui-focused{
  color: #db1962 !important;
}

.caremanagerlistsearchIcon {
  position: absolute;
  margin-top: 0.55rem;
  margin-left: 38rem;
  cursor: pointer;
}
.caremanager-search .searching1{
  border: none;
  background: unset !important;
  width: 768px !important;
  outline: none;
  border-radius: 0.4rem;
  color: #000;
  height: 40px !important;
  padding: 1rem;
  padding-left: 0.5rem;
  font-size: 0.9rem;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
}
.caremanagerlistsearching {
  background-color: white;
  border: none;
  width: 40rem !important;
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
.contact-list{
  display:block;
  width: 29.3rem !important;
  margin-top: 0px !important;
  border-radius: 4px;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  max-height: 100px !important;
}

.circletext{
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%,-50%);
  -ms-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  font-size: 12px !important;
}

.ellipse{
  height: 24px;
    width: 24px;
    border-radius: 50%;
    display: inline-block;
    background-color: #CA2128;
    color: #FFFFFF;
    position: relative;
    margin-top: 3px;
}

.name-details{
  margin-left:6px;
}
.users .name-details{
  margin-left:6px;
}


.contact-list .hide{
  display:none;
}
.patient-details{
  font-family: Open Sans;
  font-size: 14px;
  color: #424242;
}
.patient-details .header{
  font-family: Open Sans;
  font-size: 12px;
  color: #424242;
  font-weight: 600;
}
.patient-details .value{
  font-family: Open Sans;
  font-size: 14px;
  color: #424242;
}











.unasssignedusername{
  color: #424242;
  font-family: Open Sans;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;

}
.unasssigneduserrole{
  color: #727272;
  font-family: "Open Sans";
  font-size: 14px;
  margin-left: 12px;
  line-height: 19px;
}

.menuicon{
  background-color: #DB1962 !important;
  float: left;
}

.menuicon1{
  background-color: #00897B !important;
  float: left;
}
.menuicon2{
  background-color: #536DFE !important;
  float: left;
}

.countertexticon{
  color: #FFF !important;
  font-size: 12px;
  font-weight: 600 !important;
}

table.dataTable thead .sorting:before{
    display: none !important;
}
table.dataTable thead th{
  letter-spacing: 0px !important;
}
table.dataTable thead .sorting:after{
  display: none !important;
}
.addnote{
  font-size: 14px !important;
  font-weight: 400 !important;
  max-width: 200px !important;
  height: 36px !important;
  letter-spacing: 1px !important;
  padding: 0.5rem 2.5rem !important;
  background-color: #DB1962 !important;
  border-radius: 8px;  
  color: #fff !important;
  border: none !important;
  margin-bottom: 20px;
  margin-right: 0px;
  box-shadow: none !important;
}
.myassignmenttables{
  margin-left: 8px !important;
}

.oraltables{
    margin-top: 8px !important;
    margin-left: 8px !important;
}
.myassignmentcount{
    color: #DB1962;
    font-size: 18px;
    margin-left: 12px;
    font-weight: 700;
}

.myassignmentcount span{
    color: #727272;
    font-family: "Open Sans";
    font-size: 14px;
    line-height: 19px;
    font-weight: 300;
    margin-left: 6px;
}
.card{
  margin-top: 16px !important;
}
.card-title{
    color: #424242 !important;
    font-family: Open Sans !important;
    font-size: 20px !important;
    font-weight: 700 !important;
    margin-top: 10px;
    margin-left: 8px;
  }
.card-title-tab2{
  color: #424242 !important;
    font-family: Open Sans !important;
    font-size: 20px !important;
    font-weight: 700 !important;
    margin-top: 10px;
    margin-left: 16px;
}
  .card-sub-title{
    color: #424242 !important;
    font-family: Open Sans !important;
    font-size: 15px !important;
    font-weight: 700 !important;
    margin-left: 12px;
    margin-top: 10px;
  }

  .umtabs .nav-tabs{
    border-bottom: none !important;
  }
.buttons-container{
    padding-top: 30px;
    padding-bottom: 20px;
}
.buttons-container .cancel-button{
    background-color: #727272 !important;
    color: #FFF !important;
    border-radius: 8px;
    width: 160px;
}
.buttons-container .next-button{
  background-color: #DB1962 !important;
  border-radius: 8px;
  color: #fff !important;	
  font-size: 16px !important;
  width: 160px;
  padding: 0.5rem 2.5rem !important;
}
.invalid-feedback{
  display: block !important;
}
.buttons-container .next-button:active{
  background-color: #DB1962 !important;
  font-size: 16px !important;
  border-radius: 8px;
  color: #fff !important;	
}
  .umtabs .nav-link.active{
    font-weight: 600;
    border-color: none !important;
    border: none !important;
    border-bottom: 2px solid #DB1962 !important;
    color: #DB1962;
    font-family: Open Sans;
    font-size: 14px;
    line-height: 19px;
  }

  .umtabs .nav-link{
    border-color: none !important;
    border: none !important;
    color: #424242;
    font-family: Open Sans;
    font-size: 14px;
    line-height: 19px;
  }
  
  .umtabs{
    margin: 0 !important;
  }
  
  .umtabcontent{
    padding: 0rem !important;
    width: 100%;
    margin-top: -12px;
  }

  .Unassignedqueuecollapse .card-header{
    background-color: #FFF !important;
    border-radius: 8px !important;
  }
  .UnassignedQueues{
    margin: 0 !important;
    color: #424242;
    font-family: "Open Sans";
    font-size: 20px;
    font-weight: 700;
    line-height: 27px;
    cursor: pointer;
  }

  .assignmentsearchIcon {
    position: absolute;
    margin-top: 0.55rem;
    margin-left: 14rem;
    cursor: pointer;
    color: #424242 !important;
}

.assignmentsearching {
    background-color: white;
    border: none;
    width: 250px !important;
    outline: none;
    border-radius: 0.4rem;
    color: #000;
    height: 32px !important;
    padding: 1rem;
    padding-left: 0.5rem;
    font-size: 0.9rem;
    box-shadow: none !important;
    border: 1px solid #dbdbdb;
  }

`
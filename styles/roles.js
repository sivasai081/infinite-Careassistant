import css from 'styled-jsx/css'
import theme from '../constants/theme.json';
export default css.global`

.md-form input:not([type]):focus:not([readonly]), .md-form input[type="text"]:not(.browser-default):focus:not([readonly]), .md-form input[type="password"]:not(.browser-default):focus:not([readonly]), .md-form input[type="email"]:not(.browser-default):focus:not([readonly]), .md-form input[type="url"]:not(.browser-default):focus:not([readonly]), .md-form input[type="time"]:not(.browser-default):focus:not([readonly]), .md-form input[type="date"]:not(.browser-default):focus:not([readonly]), .md-form input[type="datetime"]:not(.browser-default):focus:not([readonly]), .md-form input[type="datetime-local"]:not(.browser-default):focus:not([readonly]), .md-form input[type="tel"]:not(.browser-default):focus:not([readonly]), .md-form input[type="number"]:not(.browser-default):focus:not([readonly]), .md-form input[type="search"]:not(.browser-default):focus:not([readonly]), .md-form input[type="phone"]:not(.browser-default):focus:not([readonly]), .md-form input[type="search-md"]:focus:not([readonly]), .md-form textarea.md-textarea:focus:not([readonly]){
  border-bottom: 1px solid #DB1B60 !important;
  box-shadow: 0 1px 0 0 #DB1B60 !important;
}

.md-form input:not([type]):focus:not([readonly])+label, .md-form input[type="text"]:not(.browser-default):focus:not([readonly])+label, .md-form textarea.md-textarea:focus:not([readonly])+label{
  color: #DB1B60 !important;
}
.roles-option-label{
  padding: 2px 2px 2px 2px !important;
  padding-right: 5px !important;
}
.assessment-option {
  border-radius: 24px;
  background-color: #FFFFFF;
  box-shadow:  0px 3px 6px #00000029;
  color: #424242;
  font-size: 14px;
  text-align: center;
  padding-top: 5px;
  margin: 0 0 15px 10px;
}
.checkbox-container{
  max-height: 250px !important;
  overflow-y: auto !important;
}
.form-check-input[type="checkbox"]+label, label.btn input[type="checkbox"]+label{
  posittion: absoulute !important;
}
.buttons-container .edit-button{
    background-color : #DB1962 !important;
    border-radius: 8px;
    color: #fff !important;	
  }
  .edit-button{
    font-size: 16px !important;
    font-weight: 100 !important;
    letter-spacing: 1px !important;
    padding: 0.5rem 2.5rem !important;
    background-color: #DB1962 !important;
    border-radius: 8px;  
    color: #fff !important;
    border: none !important;
  
  }

  .basic-info {
    color: #424242;
    font-family: "Open Sans";
    font-size: 14px;
    line-height: 19px;
    text-align: center;
    
}
.personalusers-info {
    color: #424242;
    font-family: "Open Sans";
    font-size: 24px;
    font-weight: 700;
    line-height: 33px;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 0px;
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
  font-size: 12px !important;
  background-color: #f7f8f9 !important;
}
.table.table tr:nth-child(even) {
  background: #f7f8f9;
}
.table thead th {
  border-bottom: none !important;
}
.table.table td{
  border: none !important;
  color: #424242 !important;
  font-size: 14px !important;
  padding: .7rem .6rem !important;
}
.mdb-dataTables_paginate{
    display: none !important;
  }
  
  .mdb-datatable-info{
    display: none !important;
  }

.modal-dialog.newproblemmodal{
    margin: 9rem auto !important;
}
.newproblemmodal .modal-content{
  margin-top: 100px !important;
  border-radius: 8px !important;
}
.newproblemmodal .modal-footer{
  padding: 1.2rem !important;
}
.newproblemmodal .modal-header{
  text-align:left !important;
  font-size: 28px !important;
  padding: 0 !important;
  margin: 10px 40px 10px 40px !important;
}
.newproblemmodal .newproblemmodalbody{
  padding: 0rem 2.6rem !important;
}

.newproblemmodal .newproblemmodalbody .form-check{
  padding: 0rem !important;
}
.newproblemmodal .newproblemmodalbody .form-check hr{
  margin-top: .75rem !important;
  margin-bottom: .75rem !important;
}
.modal-header .close{
  display: none;
}
.newproblemmodal .modal-footer{
  padding: 1.5625rem 2rem !important;
}
.newproblemmodal .modal-content::-webkit-scrollbar {
  width: 5px !important;
  height: 5px !important;
}
.newproblemmodal .modal-content::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px white !important; 
  border-radius: 4px !important;
}
.newproblemmodal .modal-content::-webkit-scrollbar-thumb {
  background: #424242 !important ; 
  border-radius: 4px !important;
}
table th{
  font-size: .8rem !important;
}
table thead.mdb-dataTable-head .sorting:before{
  bottom: .7rem !important;
  left: -.2rem !important;
}
.modal-footer{
  border-top: none !important;
  }

  .modal-dialog .modal-content .modal-header{
    border: none !important;
}

.modal-title{
  font-weight: 700 !important;
  font-size: 24px !important;
  color: #424242;
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

`
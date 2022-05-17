import css from 'styled-jsx/css'
export default css.global`

.md-form input:not([type]):focus:not([readonly]), .md-form input[type="text"]:not(.browser-default):focus:not([readonly]), .md-form input[type="password"]:not(.browser-default):focus:not([readonly]), .md-form input[type="email"]:not(.browser-default):focus:not([readonly]), .md-form input[type="url"]:not(.browser-default):focus:not([readonly]), .md-form input[type="time"]:not(.browser-default):focus:not([readonly]), .md-form input[type="date"]:not(.browser-default):focus:not([readonly]), .md-form input[type="datetime"]:not(.browser-default):focus:not([readonly]), .md-form input[type="datetime-local"]:not(.browser-default):focus:not([readonly]), .md-form input[type="tel"]:not(.browser-default):focus:not([readonly]), .md-form input[type="number"]:not(.browser-default):focus:not([readonly]), .md-form input[type="search"]:not(.browser-default):focus:not([readonly]), .md-form input[type="phone"]:not(.browser-default):focus:not([readonly]), .md-form input[type="search-md"]:focus:not([readonly]), .md-form textarea.md-textarea:focus:not([readonly]){
    border-bottom: 1px solid #DB1B60 !important;
    box-shadow: 0 1px 0 0 #DB1B60 !important;
}

.md-form textarea.md-textarea:focus:not([readonly]){
    border-bottom: 1px solid #DB1B60 !important;
    box-shadow: 0 1px 0 0 #DB1B60 !important;
  }

.assessment-header-title{
    font-family: minimo-bold;
    color: #2A2D71;
    letter-spacing: 1px;
    font-size: 30px !important;
}
.completionassessmentheader-title{
    font-family: minimo-bold;
    color: #2A2D71;
    letter-spacing: 1px;
}

.Healthriskassessmenttitle{
    opacity: 0.85;
    color: #22252B;
    font-family: Open Sans;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0.23px;
    line-height: 33px;
    text-align: center;
}

.you-will-have-10-day {
    opacity: 0.85;
    margin-left: 15%;	
    margin-right: 15%;
    color: #22252B;
    font-family: Open Sans;
    font-size: 18px;
    letter-spacing: 0.17px;
    line-height: 25px;
    text-align: left;
    margin-top: 24px;
  }

.completeform{	
    margin-left: 25%;	
    margin-right: 25%;	
    text-align: center;	
    font-weight: 600;	
    font-size: 16px;	
    font-family: Open Sans;	
    letter-spacing: 0px;	
    color: #424242;	
    margin-top: 16px;	
}	
.successfulcompletion{	
    text-align: center;	
    font-weight: 600;	
    font-size: 16px;	
    font-family: Open Sans;	
    letter-spacing: 0px;	
    color: #424242;	
    margin-top: 16px;
    margin-bottom: 24px;	
}	
.successfulcompletioncontinue{	
    text-align: center;	
    font-size: 16px;	
    font-family: Open Sans;	
    letter-spacing: 0px;	
    color: #424242;	
    margin-top: 16px;	
}	
.hraspanbold{	
    font-weight: 600;	
    font-size: 16px;	
}	
.assessmentconfirmation{	
    margin-left: 27%;	
    margin-right: 27%;	
    text-align: center;	
    font-size: 16px;	
    font-family: Open Sans;	
    letter-spacing: 0px;	
    color: #424242;	
    margin-top: 16px;	
}	
.finalassessmentconfirmation{	
    margin-left: 32%;	
    margin-right: 32%;	
    text-align: center;	
    font-size: 16px;	
    font-family: Open Sans;	
    letter-spacing: 0px;	
    color: #424242;	
    margin-top: 16px;	
}	
.finalassessmentconfirmation span{
    font-size: 16px;	
    font-family: Open Sans;	
    font-weight: 600;ss
}
.hradescription{	
    margin-left: 12%;	
    margin-right: 12%;	
    text-align: center;	
    font-size: 16px;	
    font-family: Open Sans;	
    letter-spacing: 0px;	
    color: #424242;	
    margin-top: 16px;	
}	
.hratimerequired{	
    margin-left: 15%;	
    margin-right: 15%;
    text-align: center;	
    font-size: 16px;	
    font-family: Open Sans;	
    letter-spacing: 0px;	
    color: #424242;	
    margin-top: 16px;	
}	
.hratimespan{	
    text-align: center;	
    font-size: 16px;	
    font-family: Open Sans;	
    letter-spacing: 0px;	
    color: #424242;	
    margin-top: 16px;	
}	
.agreeterms{	
    text-align: center;	
    font-size: 16px;	
    font-family: Open Sans;	
    letter-spacing: 0px;	
    color: #424242;	
    margin-top: 16px;	
}

.card-body{
 padding: 16px 16px 8px 16px !important;
}

.your-progress{
    color: #727272;
    font-size: 14px;
  }
  .progress-text{
    color: #DB1962;
    font-weight: 600 !important;
  }
  .assessment-progress-bar{
      height: 6px !important;
  }
  .progress-bar{
      background-color: #DB1962;
  }
  .assessment-option {
    border-radius: 24px;
    background-color: #F5F5F5;
    box-shadow:  0px 3px 6px #00000029;
    color: #424242;
    font-size: 14px;
    text-align: center;
    padding-top: 5px;
    margin: 0 0 15px 10px;
}
.assessment-option .label-selected{
    padding: 2px 12px 0 12px;
}
.assessment-option:hover{
    background-color: #E0E0E0;  
}
.md-form{
    margin-top: 0.3rem !important
}
.assessment-option.hasSelected{
    color:  #DB1962;
    background-color: #F8E3EB;
    min-width: 40px;
    border-radius: 18px;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    box-shadow: none !important;
  
}
.assessment-option-label{
    padding: 2px 12px 0 12px;
}
  .assessment-option input[type="radio"],input[type="checkbox"] {
    display: none;   
}
.checkbox-label{
    color: #727272;
    padding-left: 10px;
    font-size: 14px;
}
.buttons-container{
    padding-top: 30px;
    padding-bottom: 20px;
    
}
.buttons-container .btn-outline-default{
    border: 1px solid #727272 !important;
    color: #424242 !important;
    border-radius: 8px;
}

.buttons-container .btn-outline-default:active{
    border: 1px solid #727272 !important;
    color: #424242 !important;
    border-radius: 8px;
}



.allergies-search{
    background: #F5F5F5 0% 0% no-repeat padding-box !important;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 24px;
    border: none;
}



.buttons-container .next-button{
    background-color : #DB1962 !important;
    border-radius: 8px;
	color: #fff !important;	
}

.next-button:not([disabled]):not(.disabled):active, 
.next-button:not([disabled]):not(.disabled).active, 
.show>.next-button.dropdown-toggle{
    background-color : #DB1962!important;
    border-radius: 8px;  
}

.next-button{
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
}

.returntodashboard{
    font-size: 14px !important;
    font-weight: 400 !important;
    max-width: 200px !important;
    height: 36px !important;
    letter-spacing: 1px !important;
    padding: 0.5rem 0.5rem !important;
    background-color: #DB1962 !important;
    border-radius: 8px;  
    color: #fff !important;
    border: none !important;
}

.back-button{
    font-size: 14px !important;
    font-weight: 400 !important;
    max-width: 200px !important;
    height: 36px !important;
    letter-spacing: 1px !important;
    padding: 0.5rem 2.5rem !important;
    border-radius: 8px;
    color: #fff !important;
    border: none !important;

}

.assessmentback-button{
    font-size: 14px !important;
    font-weight: 400 !important;
    max-width: 200px !important;
    height: 36px !important;
    letter-spacing: 1px !important;
    padding: 0.5rem 2.5rem !important;
    border-radius: 8px;
    color: #424242 !important;
    border: 1px solid #BDBDBD !important;
    background: #fff !important;
    outline: none !important;
}


.label-selected{
  padding: 0 10px 0 10px; 
  display: flex; 
}
.divider{
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid #424242;
}
.medication-container{
    width: 100%;
    padding-left: 12px;
}

.medi-input .md-form.md-bg .form-control{
    padding: .5rem !important;
    height: 40px !important;
    font-size: 16px;
}
.medi-datepicker .MuiFormControl-root.MuiTextField-root{
    width: 100%;
}
.medi-datepicker .MuiInput-underline.Mui-disabled:before {
    border-bottom-style: none;
}
.medications-input, .medi-datepicker .MuiInput-underline{
    height: 40px !important;
    border-radius: 0px !important;
    border-bottom: 1px solid #424242 !important;
    background: none !important;
}
.md-form.md-outline.form-sm .form-control.form-control-sm{
    padding: .25rem .625rem !important;
}
.form-control-sm .medications-input{
    font-size: .975rem !important;
}
.md-form .form-control.is-valid:focus{
    border: none !important;
    box-shadow: none !important;
  }

.medi-datepicker .MuiInput-underline{
    background-color: #f5f5f5;
    height: 40px;
    padding-left: .5rem;
    border-radius: 5px;
    margin-top: -15px;
    font-size: 16px;
}
.medi-datepicker .MuiInput-underline:hover:not(.Mui-disabled):before{
    border: none !important;
}
.medi-datepicker input{
  border: none !important;
}
.MuiPickersToolbar-toolbar, .MuiPickersDay-isSelected, .MuiButton-textPrimary, .MuiTypography-colorPrimary{
    background-color: #DB1967 !important;
    color:#FFFFFF !important;
  }
.medi-datepicker .MuiInput-underline:before,
 .medi-datepicker .MuiInput-underline:after,
 .medi-datepicker .MuiInput-underline:hover{
 border-bottom: none;
}

.addicon-text{
    color: #DB1962 !important;
}
.add-icon{
    text-align: center;
    padding: 35px 0 0;
}
.medication-container .md-form.md-outline{
    margin-top: 0.5rem !important;
}
.medication-label{
    color: #424242;
    padding-left: 10px;
}

.allergies-control i { 
    position: absolute; 
    z-index: 999;
} 
  
.allergies-control { 
    width: 100%; 
    margin-bottom: 10px; 
} 
  
.allergy-search-icon { 
    padding: 10px; 
    min-width: 40px; 
} 
  
.allergies-textbox { 
    width: 100%; 
    padding: 5px 0 10px 33px !important; 
    box-shadow: 0px 3px 6px #00000029 !important;
    border-radius: 24px !important;
    background-color: #f5f5f5 !important;
}
@media (min-width: 420px ) and (max-width: 575px ) {
    .your-progress{
        font-size: 14px !important;
    }
    .progress-text{
        font-size: 14px !important;
    }
    .assessment-option{
        font-size: 14px !important;
    }
    .assessment-option.hasSelected{
        font-size: 14px !important;
    }
    .assessment-progress-bar{
        height: 4px !important;
    }
    .card{
        border-radius: 8px !important;
        margin-top: 16px !important;
    }
}
@media (min-width: 576px ) and (max-width: 598px ) {
    .your-progress{
        font-size: 14px !important;
    }
    .progress-text{
        font-size: 14px !important;
    }
    .assessment-option{
        font-size: 14px !important;
    }
    .assessment-option.hasSelected{
        font-size: 14px !important;
    }
    .assessment-progress-bar{
        height: 4px !important;
    }
    .card{
        border-radius: 8px !important;
        margin-top: 16px !important;
    }
}
@media (min-width: 599px ) and (max-width: 767px ) {
    .your-progress{
        font-size: 14px !important;
    }
    .progress-text{
        font-size: 14px !important;
    }
    .assessment-option{
        font-size: 14px !important;
    }
    .assessment-option.hasSelected{
        font-size: 14px !important;
    }
    .assessment-progress-bar{
        height: 4px !important;
    }
    .card{
        border-radius: 8px !important;
        margin-top: 16px !important;
    }
}
@media (min-width: 768px ) and (max-width: 991px ) {
    .your-progress{
        font-size: 14px !important;
    }
    .progress-text{
        font-size: 14px !important;
    }
    .assessment-option{
        font-size: 14px !important;
    }
    .assessment-option.hasSelected{
        font-size: 14px !important;
    }
    .assessment-progress-bar{
        height: 4px !important;
    }
}
@media (min-width: 992px ) and (max-width: 1023px ) {
    .your-progress{
        font-size: 14px !important;
    }
    .progress-text{
        font-size: 14px !important;
    }
    .assessment-option{
        font-size: 14px !important;
    }
    .assessment-option.hasSelected{
        font-size: 14px !important;
    }
    .assessment-progress-bar{
        height: 4px !important;
    }
}
@media (min-width: 1024px ) and (max-width: 1199px ) {
    .your-progress{
        font-size: 14px !important;
    }
    .progress-text{
        font-size: 14px !important;
    }
    .assessment-option{
        font-size: 14px !important;
    }
    .assessment-option.hasSelected{
        font-size: 14px !important;
    }
    .assessment-progress-bar{
        height: 4px !important;
    }
}
@media (min-width: 1200px ) and (max-width: 1350px ) {
    .your-progress{
        font-size: 14px !important;
    }
    .progress-text{
        font-size: 14px !important;
    }
    .assessment-option{
        font-size: 14px !important;
    }
    .assessment-option.hasSelected{
        font-size: 14px !important;
    }
    .assessment-progress-bar{
        height: 4px !important;
    }
}
@media (min-width: 1351px ) and (max-width: 1699px ) {
    .your-progress{
        font-size: 14px !important;
    }
    .progress-text{
        font-size: 14px !important;
    }
    .assessment-option{
        font-size: 14px !important;
    }
    .assessment-option.hasSelected{
        font-size: 14px !important;
    }
    .assessment-progress-bar{
        height: 4px !important;
    }
}
@media (min-width: 1700px ) and (max-width: 1919px ) {
}
@media (min-width: 1920px ) and (max-width: 2459px ) {
}
@media (min-width: 2560px ) and (max-width: 2700px ) {
}
`
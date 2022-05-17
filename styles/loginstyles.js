import css from 'styled-jsx/css'
export default css.global`
body{
    font-family: Open Sans !important;
}

.login-card .md-form .prefix{
    font-size: 1.2rem !important;
    margin-top: 12px;
    margin-left: 8px;
}

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active{
    -webkit-box-shadow: 0 0 0 90px white inset !important;
    -webkit-text-fill-color: #424242 !important;
}

.login-container{
    background: transparent linear-gradient(180deg, #FFFFFFE5 0%, #FFFFFF98 58%, #FFFFFF00 100%) 0% 0% no-repeat padding-box;
    background-image: url("/images/careassistant-bg.png");
    background-position: center;
    background-repeat: no-repeat; 
    background-size: cover;
}

.versionClass{
    font-family: "Open Sans"
    font-size: 14px !important;
    font-weight: 500px !important;
}


.md-form .form-control.is-invalid {
    border-color: #f44336 !important;
}
.login-logo{
    padding: 0 65px 0 65px;
}

.iconcolor{
    color: #424242 !important
}

.btn.btn-sm{
    font-size: 16px;
    border-radius: 8px;
    padding: .5rem 9.5rem !important;
}

.btn.btn-lg{
    font-size: 16px;
    border-radius: 8px;
    padding: .5rem 4.5rem !important;
}


.login-card{
    top: 8rem;
    box-shadow: 0px 10px 35px #00000065;
    border-radius: 24px;
}
.signin-btn{
    background: transparent linear-gradient(180deg, #FF0060 0%, #950037 100%) 0% 0% no-repeat padding-box;
    min-width: 8rem;
    color: #fff !important;
    min-height: 2rem;
}
.login-card .md-form.md-outline .prefix ~ input{
    margin-left: 0rem !important;
    margin-right: 0rem !important;
}
.login-card .md-form.md-outline{
    margin-left:1.5rem;
    margin-top: 2rem !important;
}
.login-card .md-form.md-outline .prefix{
    padding-left:.75rem;
    color: #424242 !important;
}

.login-card .md-form.md-outline .form-control {
    padding: .375rem 2.5rem;
}

.md-form>input[type]:-webkit-autofill:not(.browser-default):not([type="search"])+label, .md-form>input[type="time"]:not(.browser-default)+label{
    margin-bottom: 0rem !important;
    margin-top: 12px !important;
}
.forgot-text{
  color: #A3A3A3;
  padding-top: 10px;
  cursor: pointer;
}
.password-icon{
    margin-top: -2.2rem;
    position: absolute;
    float: right;
    right: 1rem;
}
.invalid-msg{
    color: #424242;
    font-weight: 600;
    font-size: 15px;
    text-align: center;
}

.password-validation-style{
    color: #424242;
    text-align: center;
    font-size: 14px;
    margin-left: 5%;
    margin-right: 6%;
}

.passwordchanged{
    color: #DB1962;
    text-align: center;
    margin-top: 64px;
}

.proceedtologin{
    margin-top: 64px;
    margin-bottom: 64px;
}
.valid-msg{
    color: #424242;
    text-align: center;
}

.login-card .md-form .form-control.is-invalid{
    background-position: 98% 0.5rem !important;
}
.password-icon.invalid{
    margin-top: -2.2rem;
    position: absolute;
    float: right;
    right: 3.8rem;
}

`
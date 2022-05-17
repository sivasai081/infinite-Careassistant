import css from 'styled-jsx/css'
export default css.global`


.basic-info {
    color: #424242;
    font-family: "Open Sans";
    font-size: 14px;
    line-height: 19px;
    text-align: center;
    
}

.modal-header .close{
  display: none !important;
}

.confirmationmodalmessage{
  font-size: 16px;
    font-weight: 600;
    color: #424242;
}
.disabledfield .md-form label.active{
  color: #DB1962 !important;
}

.btn-primary:not([disabled]):not(.disabled):active, .btn-primary:not([disabled]):not(.disabled).active, .show>.btn-primary.dropdown-toggle{
  background-color: #DB1962 !important;
}

.changepasswordbutton{
    font-size: 14px !important;
    font-weight: 100 !important;
    padding: 0.4rem 0.5rem !important;
    float: right;
    background-color: #DB1962 !important;
    border-radius: 8px;
    color: #fff !important;
    border: none !important;


}

.educationalmodal{
  margin-top: 9rem !important;
}

.educationalmodal h4{
  font-weight: 700 !important;
  font-size: 24px;
  margin-left: 6px !important;
  color: #424242;
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
  position: relative;
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
.camera-section{
  box-shadow: 0 0 1px 1px lightgrey;
  top: 68%;
  position: absolute;
  background-color: #FFF;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  left: 70%;
}
.fa-camera{
  margin-top: 8px;
  width: 24px;
  height: 24px;
  margin-left: 8px;
}
.MuiPagination-ul{
  margin-left: -70px !important;
}

table.table th, table.table td{
  color: #424242 !important;
}
hr{
    margin-bottom : 0px !important;
    margin-top : 0px !important;
}
.personal-info {
    color: #424242;
    font-family: "Open Sans";
    font-size: 24px;
    font-weight: 700;
    line-height: 33px;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 0px;
  }
.manageuserdeatilslabel{
  color: #424242;
  font-family: "Open Sans";
  font-size: 16px;
  margin-top: 12px;
  line-height: 22px;
}

.manageuserdeatilsvalue{
  color: #424242;
  font-family: Open Sans;
  font-weight: 600;
  margin-top: 12px;
  font-size: 16px;
  line-height: 22px;
}

`
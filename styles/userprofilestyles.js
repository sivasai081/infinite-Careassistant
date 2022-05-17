import css from 'styled-jsx/css'
export default css.global`
body.create-group-modal .fixed-top{
  z-index: -999 !important;
}
body.create-group-modal .menu-button-container{
  z-index: -999 !important;
}

.menu-button-container.opened{
  box-shadow:none !important;
  width: 16rem !important;
}
body.create-group-modal .side-nav{
  z-index: -999 !important;
}
body.create-group-modal .teli-tab-col{
  opacity: .4;
}
.caretemamembermodal{
  margin-top: 100px !important;
  width: 300px !important;
}
.mobile-patientcard{
  width:100%;
}

.caretemamembermodal .modal-content{
  margin-top: 4px !important;
  margin-left: 10px !important;
}

.teammembermenu-icon{
  background-color: #DB1B60;
}
.teammembericons{
  width: 3rem;
  height: 3rem;
  text-align: center;
  font-family: Open Sans;
  border-radius: 50%;
  margin: 0 auto;
  position: relative;
  padding-top: 12px;
  margin-top: 16px;
}

.teammembercounter-text{
  color: #FFF;
  font-weight: 600 !important;
} 

.send-message{
  border-radius: 8px;
  background-color: #DB1B60 !important;
  border: 1px solid #DB1B60 !important;
  color: #FFF;
  font-family: Open Sans;
  font-size: 16px;
  line-height: 22px;
  padding: 0.6rem 4rem !important;

}

.btn-default.send-message:hover, btn-default.send-message:not([disabled]):not(.disabled):active, .btn-default.send-message:not([disabled]):not(.disabled).active, .show>.btn-default.send-message.dropdown-toggle{
  background-color: #DB1B60 !important;
  border: 1px solid #DB1B60 !important;
  color: #FFF !important;
}
.btn-default.close-modal:hover, btn-default.close-modal:not([disabled]):not(.disabled):active, .btn-default.close-modal:not([disabled]):not(.disabled).active, .show>.btn-default.close-modal.dropdown-toggle{
  border: 1px solid #BDBDBD !important;
  background-color: #FFF !important;
  color: #424242 !important;
}


.close-modal{
  border-radius: 8px;
  border: 1px solid #BDBDBD !important;
  background-color: #FFF !important;
  color: #424242;
  font-family: Open Sans;
  font-size: 16px;
  line-height: 20px;
  padding: 0.6rem 6rem !important;
}

.teammembername{
  color: #424242;
  font-family: Open Sans;
  font-size: 21px;
  font-weight: 600;
  line-height: 29px;
  text-align: center;
  margin-top: 16px;
}

.teammemberid{
  color: #424242;
  font-family: "Open Sans";
  font-size: 16px;
  text-align: center;
  line-height: 22px;
}

.teammemberspecialization{
  color: #424242;
  font-family: Open Sans;
  font-size: 14px;
  text-align: center;
  line-height: 17px;
  margin-top: -4px;
}
.profileBar{
  width:100%;
  margin-left: 0rem !important;
}
.profileBar {
    opacity: 1;
    padding: 0rem 0.5rem !important;
    width: 100%;
    display: flex !important;
    margin-top: 50px;
    min-height: 64px;
    justify-content: space-between !important;
    z-index: 999 !important;
    background-color: #FFFFFF;
    max-height: 100px;
    margin-left: 3.8rem;
    transform : translateX(0px);
    clip-path: inset(-5px -5px -5px 1px);
  }
  .profileBar.userexpanded{
    min-height: 150px;
    max-height: 200px;
    margin-top: 53px;
    overflow-x: unset;
  }
  .profileBar.userexpanded .user-data{
     margin-top: 0px;
  }
  
  .profile-expanded.profileBar{
    transform : translateX(180px) !important;
    width : 100% !important;
    margin-left: 3.7rem;
  }
  .user-data .profile-pic {
    height: 50px;
    padding: 14px 15px 0px 0px;
  }
  .left-side {
    display: flex !important;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 10px;	
    margin-left: 8px;
    
  }
  .menu-toggler{
    padding: 20px 42px 0 10px;
    cursor:pointer;
  }
  .user-data .name {
    text-align: left;
    font-size: 18px;
    font-weight: 600;
    font-family: 'Open Sans';
    letter-spacing: 0px;
    margin: 16px 0px 0px 0px;
    color: #424242;
    opacity: 1;
    margin-right: 0.5rem;
    white-space: nowrap;
    width: 210px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .details {
    text-align: left;
    font: 14px Open Sans;
    font-weight: 600;
    text-transform: uppercase;
    margin: auto 0.4rem;
    letter-spacing: 0px;
    color: #424242;
    padding: 0.25rem 0;
    opacity: 1;
  }
  .details span {
    font-weight: 400;
    text-transform: capitalize;
  }

  .navbar-brand{
      margin-right: 0.1rem !important;
      
  }

  .navbar{
    overflow-x: hidden !important;
  }

  .right-side .navbar-brand {
    display: flex !important;
    flex-direction: row;
    justify-content: space-between;
  }
  .profile-expanded .navbar-brand {		
    		
  }		
  .profile-expanded .navbar-brand .profileIcons{		
    margin-left: 19px;		
    margin-right: 1px;		
  }	
  
  .profileIcons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 32px;
    height: 32px;
    cursor: pointer;
    margin: 7px 0 0 20px;
    font-weight: 500;
    background-color: #db1962;
    border-radius: 50%;
    color: white;
  }
  .patientcard-closeIcon {
    width: 24px;
    height: 24px;
    cursor: pointer;
    color: #424242 !important;
    margin: 12px 0 0 15px;
  }
  .profileIcons p {
    margin: auto;
    text-align: center;
    font-size: 16px !important;
  }
  .user-data{
    display: flex;
    min-width: max-content;
	  margin-left: 5px;
  }
  .user-info-bar{
    padding: 0px 0px 0px 15px !important;
    width: 100%;
  }
  .user-info-bar .col-md-3{
    flex: 0 0 20% !important;
    max-width: 20% !important;
  }
  .user-right{
    display: flex;
    position: absolute;
    float: right;
    right: 1.2rem;
    top: 0.5rem;
  }
  .userexpanded .user-right{
    top: 1.7rem;
  }
  .expandicon{
    cursor: pointer;
  }
  .expand-collapse{
    margin-top: 10px;
  }
  .expanded-container{
  
  }
  .caregiver{
    
  }
  .tobebreak::before {
    content: "\A";
    white-space: pre;
  }
  .usercard .mobileview-details{
    display: none;
  }
  .mobileview-details{
   padding-top: 1.2rem;
  }
.userbrand{
  display: none
}
@media only screen and (min-width: 2560px) and (max-width: 2700px) {
  .profileBar{
    width: 98% !important;
    margin-left: 3.3rem !important;
  }
  .profile-expanded.profileBar{
    width: 92% !important;
  }
  .mobile-patientcard{
    display: none !important;
  }
  .profileBar.userexpanded{
    min-height: 74px;
    max-height: 200px;
    margin-top: 40px;
    overflow-x: unset;
  }
  .userexpanded .user-info-bar .col-md-3{
    margin-top: 1rem;
  }
  .userexpanded .expand-collapse{
    margin-top: 1.7rem;
  }
  .userexpanded .user-right{
    top: 1rem;
  }
  .profile-expanded .user-right{
    right: 2.2rem;
  }
}
@media only screen and (min-width: 1920px) and (max-width: 2459px) {
    .profile-expanded.profileBar{
      width: 90% !important;
     }
     .profileBar{
      width: 97% !important;
      margin-left: 3.4rem !important;
    }
     .mobile-patientcard{
      display: none !important;
    }
    .profileBar.userexpanded {
      min-height: 150px;
      max-height: 200px;
      margin-top: 30px;
      overflow-x: unset;
    }
    .profile-expanded .user-right{
      right: 3.2rem;
    }
}
@media only screen and (min-width: 1700px) and (max-width: 1919px) {
    .profile-expanded.profileBar{
      width: 89% !important;
     }
     .mobile-patientcard{
      display: none !important;
    }
    .profileBar{
      width: 97% !important;
      margin-left: 3.5rem !important;
    }
    .profile-expanded .user-right{
      right: 3.2rem;
    }
}
@media only screen and (min-width: 1369px) and (max-width: 1699px) {
    .profile-expanded.profileBar{
      width: 84% !important;
     }
     .mobile-patientcard{
      display: none !important;
    }
    .profileBar{
      width: 96% !important;
      margin-left: 3.6rem !important;
    }
}
@media only screen and (min-width: 1351px) and (max-width: 1368px) {
  .profileBar{
    width: 96% !important;
    margin-left: 3.7rem !important;
  }
  .profile-expanded.profileBar{
    width: 83% !important;
   }
   .mobile-patientcard{
    display: none !important;
  }
  .profileBar.userexpanded{
    margin-top: 44px !important;
  }
  .userexpanded .user-right{
    top: 0.9rem;
  }
  .user-data .name {
    text-align: left;
    font-size: 18px;
    font-weight: 600;
    font-family: 'Open Sans';
    letter-spacing: 0px;
    margin: 16px 0px 0px 0px;
    color: #424242;
    opacity: 1;
    margin-right: 0.5rem;
    white-space: nowrap;
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
@media only screen and (min-width: 1369px) and (max-width: 1600px) {
  .user-data .name {
    text-align: left;
    font-size: 18px;
    font-weight: 600;
    font-family: 'Open Sans';
    letter-spacing: 0px;
    margin: 16px 0px 0px 0px;
    color: #424242;
    opacity: 1;
    margin-right: 0.5rem;
    white-space: nowrap;
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .left-side{
    margin-left: 60px !important;
  }
}
@media only screen and (min-width: 1200px) and (max-width: 1350px) {
  .profile-expanded.profileBar{
    width: 81% !important;
   }
   .profileBar{
    width:95% !important;
    margin-left: 3.6rem !important;
  }
   .details.first-expanded, .user-info-bar .user-right, .expandicon{
    display: none !important;
  }
  .left-side {
    margin-left: 25px;
  }
  .user-data .name {
    text-align: left;
    font-size: 18px;
    font-weight: 600;
    font-family: 'Open Sans';
    letter-spacing: 0px;
    margin: 16px 0px 0px 0px;
    color: #424242;
    opacity: 1;
    margin-right: 0.5rem;
    white-space: nowrap;
    width: 210px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .usercard{
    margin-left: 25px;
  }
  .left-mobile, .right-mobile{
    width: 100%;
    margin-top: -15px;
  }
  .user-info-bar{
    display: none !important;
  }
  .user-data{
    margin-left: 5px !important;
  }
  .userexpanded .usercard .mobileview-details{
    display: flex;
  }
  .usercard .mobileview-details{
    display: flex;
  }
  .userbrand{
    display: flex;
    position: absolute;
    float:right;
    right: 1.2rem;
    top: 0.5rem;
  }
  .userexpanded .userbrand{
    top: 0.3rem;
  }
  .usercard{
    display: flex;
    flex-direction: row;
    width: 100%;
    padding-top: 15px;
  }
  .usercard .user-data{
    width: 80%;
    padding-top: 5px;
  }
  .menu-button-container{
    width: 61px !important;
  }
  .menu-button-container.opened{
    box-shadow:none !important;
    width: 16rem !important;
  }
}
@media only screen and (min-width: 1054px) and (max-width: 1199px) {
    .profile-expanded.profileBar{
      width: 81% !important;
     }
     .profileBar{
      width:95% !important;
      margin-left: 3.6rem !important;
    }
     .details.first-expanded, .user-info-bar .user-right, .expandicon{
      display: none !important;
    }
    .left-side {
      margin-left: 25px;
    }
    .user-data .name {
      text-align: left;
      font-size: 18px;
      font-weight: 600;
      font-family: 'Open Sans';
      letter-spacing: 0px;
      margin: 16px 0px 0px 0px;
      color: #424242;
      opacity: 1;
      margin-right: 0.5rem;
      white-space: nowrap;
      width: 210px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .usercard{
      margin-left: 25px;
    }
    .left-mobile, .right-mobile{
      width: 100%;
      margin-top: -15px;
    }
    .user-info-bar{
      display: none !important;
    }
    .user-data{
      margin-left: 5px !important;
    }
    .userexpanded .usercard .mobileview-details{
      display: flex;
    }
    .usercard .mobileview-details{
      display: flex;
    }
    .userbrand{
      display: flex;
      position: absolute;
      float:right;
      right: 1.2rem;
      top: 0.5rem;
    }
    .userexpanded .userbrand{
      top: 0.3rem;
    }
    .usercard{
      display: flex;
      flex-direction: row;
      width: 100%;
      padding-top: 15px;
    }
    .usercard .user-data{
      width: 80%;
      padding-top: 5px;
    }
    .menu-button-container{
      width: 61px !important;
    }
    .menu-button-container.opened{
      box-shadow:none !important;
      width: 16rem !important;
    }
}
@media only screen and (min-width: 992px) and (max-width: 1053px) {
      .profileBar{
        width:100% !important;
      }
      .profile-expanded.profileBar{
        transform : translateX(0px) !important;
      }
       .user-data .name {
        text-align: left;
        font-size: 18px;
        font-weight: 600;
        font-family: 'Open Sans';
        letter-spacing: 0px;
        margin: 16px 0px 0px 0px;
        color: #424242;
        opacity: 1;
        margin-right: 0.5rem;
      }
       .details.first-expanded, .user-info-bar .user-right, .expandicon{
        display: none !important;
      }
      .left-side {
        margin-left: 25px;
      }
      .usercard{
        margin-left: 25px;
      }
      .left-mobile, .right-mobile{
        width: 100%;
        margin-top: -15px;
      }
      .user-info-bar{
        display: none !important;
      }
      .user-data{
        margin-left: 5px !important;
      }
      .userexpanded .usercard .mobileview-details{
        display: flex;
      }
      .usercard .mobileview-details{
        display: flex;
      }
      .userbrand{
        display: flex;
        position: absolute;
        float:right;
        right: 1.2rem;
        top: 0.5rem;
      }
      .userexpanded .userbrand{
        top: 0.3rem;
      }
      .usercard{
        display: flex;
        flex-direction: row;
        width: 100%;
        padding-top: 15px;
      }
      .usercard .user-data{
        width: 80%;
        padding-top: 5px;
      }
      .menu-button-container{
        width: 61px !important;
      }
      .menu-button-container.opened{
        box-shadow:none !important;
        width: 16rem !important;
      }
}
@media only screen and (min-width: 768px) and (max-width: 991px) {
        .profile-expanded.profileBar{
          transform : translateX(0px) !important;
         }
         .profileBar{
          width:100% !important;
        }
        .userbrand{
          right: 1rem !important;
        }
         .user-data .name {
          text-align: left;
          font-size: 18px;
          font-weight: 600;
          font-family: 'Open Sans';
          letter-spacing: 0px;
          margin: 16px 0px 0px 0px;
          color: #424242;
          opacity: 1;
          margin-right: 0.5rem;
        }
         .details.first-expanded, .user-info-bar .user-right, .expandicon{
          display: none !important;
        }
        .left-side {
          margin-left: 25px;
        }
        .usercard{
          margin-left: 25px;
        }
        .left-mobile, .right-mobile{
          width: 100%;
          margin-top: -15px;
        }
        .user-info-bar{
          display: none !important;
        }
        .user-data{
          margin-left: 5px !important;
        }
        .userexpanded .usercard .mobileview-details{
          display: flex;
        }
        .usercard .mobileview-details{
          display: flex;
        }
        .userbrand{
          display: flex;
          position: absolute;
          float:right;
          right: 1.2rem;
          top: 0.5rem;
        }
        .userexpanded .userbrand{
          top: 0.3rem;
        }
        .usercard{
          display: flex;
          flex-direction: row;
           width: 100%;
           padding-top: 15px;
        }
        .usercard .col-md-8{
            flex: 0 0 60.666667% !important;
            max-width: 60.666667% !important;
        }
        .usercard .user-data{
          width: 80%;
          padding-top: 5px;
        }
        .menu-button-container{
          width: 61px !important;
          box-shadow: 0 2px 5px -1px rgba(0,0,0,0.16), 0 2px 10px -1px rgba(0,0,0,0.12) !important;
        }
}
@media only screen and (min-width: 599px) and (max-width: 767px) {
  .profile-expanded.profileBar{
    transform : translateX(0px) !important;
   }
   .profileBar{
    width:100% !important;
    margin-top: 40px;
    padding-left: 1.5rem !important;
    margin-left: 0rem;
  }
  .profile-expanded .userbrand{
  }
  .user-data .name {
    text-align: left;
    font-size: 18px;
    font-weight: 600;
    font-family: 'Open Sans';
    letter-spacing: 0px;
    margin: 16px 0px 0px 0px;
    color: #424242;
    opacity: 1;
    margin-right: 0.5rem;
    white-space: nowrap;
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
   .details.first-expanded, .user-info-bar .user-right, .expandicon{
    display: none !important;
  }
  .left-side {
    margin-left: 25px;
    
  }
  .usercard{
    margin-left: 0px;
  }
  .left-mobile, .right-mobile{
    width: 100%;
    margin-top: -15px;
  }
  .user-info-bar{
    display: none !important;
  }
 
  .user-data{
    margin-left: 5px !important;
  }
  .userexpanded .usercard .mobileview-details{
    display: flex;
  }
  .profile-expanded .usercard .mobileview-details{
    display: flex;
    margin-left: -9rem;
  }
  .usercard .mobileview-details{
    display: flex;
  }
  .userbrand{
    display: flex;
    position: absolute;
    float:right;
    right: 1.2rem;
    top: 0.5rem;
  }
  .userexpanded .userbrand{
    top: 0.3rem;
  }
  .usercard{
    display: flex;
    flex-direction: row;
     width: 100%;
     padding-top: 15px;
  }
  .usercard .user-data{
    width: 80%;
    padding-top: 5px;
  }
  .menu-button-container{
    width: 61px !important;
    box-shadow: 0 2px 5px -1px rgba(0,0,0,0.16), 0 2px 10px -1px rgba(0,0,0,0.12) !important;
  }
}
@media only screen and (min-width: 576px) and (max-width: 598px) {
  .profile-expanded.profileBar{
    transform : translateX(0px) !important;
   }
   .user-right{
    right: 2.2rem;
   }
   .profileBar{
    width:100% !important;
    margin-top: 40px;
    margin-left: 0rem;
  }
  .profile-expanded .userbrand{
  }
  .user-data .name {
    text-align: left;
    font-size: 18px;
    font-weight: 600;
    font-family: 'Open Sans';
    letter-spacing: 0px;
    margin: 16px 0px 0px 0px;
    color: #424242;
    opacity: 1;
    margin-right: 0.5rem;
    white-space: nowrap;
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
   .details.first-expanded, .user-info-bar .user-right, .expandicon{
    display: none !important;
  }
  .left-side {
    margin-left: 25px;
    
  }
  .usercard{
    margin-left: 25px;
  }
  .left-mobile, .right-mobile{
    width: 100%;
    margin-top: -15px;
  }
  .user-info-bar{
    display: none !important;
  }
 
  .user-data{
    margin-left: 5px !important;
  }
  .userexpanded .usercard .mobileview-details{
    display: flex;
  }
  .usercard .mobileview-details{
    display: flex;
  }
  .userbrand{
    display: flex;
    position: absolute;
    float:right;
    right: 1.2rem;
    top: 0.5rem;
  }
  .userexpanded .userbrand{
    top: 0.3rem;
  }
  .usercard{
    display: flex;
    flex-direction: row;
     width: 100%;
     padding-top: 15px;
  }
  .usercard .user-data{
    width: 80%;
    padding-top: 5px;
  }
  .menu-button-container{
    width: 61px !important;
    box-shadow: 0 2px 5px -1px rgba(0,0,0,0.16), 0 2px 10px -1px rgba(0,0,0,0.12) !important;
  }
}
`
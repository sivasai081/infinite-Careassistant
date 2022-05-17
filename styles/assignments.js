import css from 'styled-jsx/css'
export default css.global`

.iconhover:hover{
    color: #db1962 !important;
    cursor: pointer;
}
.assignments_search_container {
    position: relative;
    display: flex;
    width: 100% !important;
}

.assignments_search_icon {
    position: absolute;
    margin-top: 0.55rem;
    cursor: pointer;
    right: 50px !important;
  }

.assignments_search_bar {
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

.historymodal .modal-content{	
    width: 650px;	
    margin-left: -5%;	
    border-radius: 8px !important;
}

.modaltitle{
    margin: 0px !important; 
    line-height: 33px;
}
.fa{
    color: #424242 !important;
}
.fa:hover{
    color: #db1962 !important;
}
.basic-info {
    color: #424242;
    font-family: Open Sans;
    font-size: 14px;
    line-height: 19px;
    text-align: center;
}
.card-body .patients-items-row:nth-child(even) {
    background: #f7f8f9;
  }
.manage-patients-list{
    max-width: 1200px;
    margin: 0 auto;
}
.modalbody{
    padding: 0.5rem 1.8rem !important;
    margin-top: -12px;
}
.restore{
    border-radius: 8px !important;
    font-size: 14px !important;
    letter-spacing: 1px;
    padding: 0.4rem 1rem !important;
    background-color: #2a2d71 !important;
    border: 1px solid #2a2d71 !important;
    color: #FFFFFF !important;
  }
.personalusers-info {
    color: #424242;
    font-family: Open Sans;
    font-size: 24px;
    font-weight: 700;
    line-height: 33px;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 0px;
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
.details{
    display: flex;
    padding: 4px 0px;
}
.users .details{
    display: flex;
    padding: 0px !important;
}
.icons-class {
    margin-right:5px !important;
    cursor: pointer;
    position: relative;
}
.tooltip-content{
    position: absolute;
    background: #000;
    top: 230px;
    left:400px;
}
.patients .MuiButton-root:hover {
    text-decoration: none !important;
    background-color: none !important;
}
.MuiTooltip-tooltip{
    background-color: #000 !important;
}
.MuiTooltip-tooltipArrow{
    background-color: #000 !important;
}
.MuiButton-root{
    width: 16px;
    height: 16px;
    padding: 0px !important;
    min-width: 0px !important;
}
.MuiButton-root:hover{
    text-decoration: none !important;
    background-color: none !important;
}
.count-details{
    text-align: right;
}
.count .total{
    color: #DB1962;
    font-family: Open Sans SemiBold;
    font-size: 21px;
    line-height: 29px;
    text-align: center;
    margin-left: 25px;
}
.count .high{
    color: #D32F2F;
    font-family: Open Sans;
    font-size: 14px;
    line-height: 19px;
    text-align: center;
    margin-left: 15px;
}
.count .medium{
    color: #F89E1B;
    font-family: Open Sans;
    font-size: 14px;
    line-height: 19px;
    text-align: center;
    margin-left: 15px;
}
.count .low{
    color: #4CAF50;
    font-family: Open Sans;
    font-size: 14px;
    line-height: 19px;
    text-align: center;
    margin-left: 15px;
}
.patients-items-row{
    cursor: pointer;
    border-bottom: 1px solid #dee2e6;
}
.patients-items-row:hover{
    background-color: rgba(0, 0, 0, 0.075)  !important;
}
.patients-items .card-body {
    padding: 0rem 1rem 1rem 1rem !important;
}
.patients .droppable{
    cursor: pointer;
    border-bottom: 1px solid #dee2e6;
}
.selected-list{
    display: block;
    border-radius: 8px;
    width: 776px !important;
    background-color: #DEDEDE;
    margin-top: 10px;
}
.risk {
    text-transform: uppercase;
    margin: auto;
    height: 90%;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    text-align: left;
    font-family: Open Sans;
    font-size: 12px;
    letter-spacing: 0px;
    color: #9e9e9e;
    opacity: 1;
  }
  .risk p {
    text-align: center;
  }
.active {
    color: #db1b60 !important;
    font-weight: 700;
}
.selected-list .patients-items-row{
    border-bottom: none;
}
.selected-list .closeIcon img{
    width: 24px;
    height:24px;
}
.selected-careteam-patients{
    width: 775px !important;
    margin-left: 0rem !important;
}
.selected-careteam-patients .patients{
    margin-top: 0px;
}
.selected-list .closeIcon{
    margin-left:90px;
}
.selected-list .hide{
    display: none;
}
.name-details{
    margin-left:20px;
}
.users .name-details{
    margin-left:6px;
}
.caremanager-search .searchIcon1{
    position: absolute;
    margin-top: 10px;
    margin-left: 730px;
    cursor: pointer;
    color: #424242 !important;
}
.caremanager-search .searchIcon1:hover{
    position: absolute;
    margin-top: 10px;
    margin-left: 730px;
    cursor: pointer;
    color: #db1962 !important;
}
.caremanager-search{
}
.search-data{
    max-height: 300px;
    overflow-y: auto;
}
.caremanagerlistsearchIcon {
    position: absolute;
    margin-top: 0.55rem;
    margin-left: 18rem;
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
    width: 20rem !important;
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

.historysearchIcon {
    position: absolute;
    margin-top: 0.55rem;
    margin-left: 36rem;
    cursor: pointer;
    color: #424242 !important;
}
.historysearchIcon:hover {
    position: absolute;
    margin-top: 0.55rem;
    margin-left: 36rem;
    cursor: pointer;
    color: #db1962 !important;
}
.historycontent p{
    margin-bottom: 0.2rem;
}

.modal-dialog.historymodal{
    margin: 9rem auto !important;
}

.reassignmodal .row{
    margin-right: 0px !important; 
    margin-left: 0px !important;
}
.modal-dialog.reassignmodal{
    margin: 9rem auto !important;
}
.reassignmodal .modal-content{
    border-radius: 8px !important;
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

.cardheader{
  color: #424242;
  font-family: Open Sans;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
}

.searchingdiv{
  margin-top: 16px;
}

.careteamchat-avatar{
    height: 32px;
    width: 32px;
    margin-left: 7px;
    margin-top: 12px;
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

.text-right1 .flatbutton{
    color: #DB1B60 !important;
    font-family: "Open Sans";
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 1px;
    font-weight: 600 !important;
    padding: 0px !important;
  }

.iconcolor{
    color: #DB1962 !important;
    
  }
.reassign-header{
    margin-right: 1.5rem;
}
.care-header{
    margin-top: 4.5rem;
}
.care-header h4{
    font-size: 18px !important;
    font-family: Open Sans !important;
    font-weight: 600;

}
.reassign-header h4{
  color: #424242;
  font-family: Open Sans;
  font-size: 24px;
  font-weight: 700;
    margin-top: 25px;
}
.patients{
    display: flex;
    margin-top: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    max-height: 260px;
    overflow-y: auto;
}
.patients .droppable{
    display: flex;
    margin-top: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    max-height: 220px;
    overflow-y: auto;
}
.patient-s-selected {
    margin-bottom: 10px;
    color: #727272;
    font-family: Open Sans;
    font-size: 12px !important;
    margin-top: 10px;
}
.reassignmodal{
    max-width: 1200px !important;
    overflow-x: auto;
    margin: 0 auto;
}
.reassignmodal .modal-body{
    padding: 0rem !important;
    margin-top: 0px !important;
}
.filter-text{
    display: flex;
    margin-top:15px;
}
.a-t-z{
    flex-grow: 8;
    color: #424242;
    font-family: Open Sans;
    font-size: 12px;
    cursor: pointer;
}
.select-all{
    cursor: pointer;
    color: #424242;
    font-family: Open Sans;
    font-size: 12px;
}
.titleAndSort {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.controls {
    display: flex;
    flex-wrap: wrap;
}
.dataHandling {
    text-transform: uppercase;
    padding: 7px 1.5rem 0 0rem;
    margin: auto;
    height: 90%;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    font: Semibold 18px/24px Open Sans;
    letter-spacing: 0px;
    color: #9e9e9e;
    opacity: 1;
  }
  .dataHandling p {
    text-align: center;
  }
.fullcontainer{
    height:680px;
}
.modal-backdrop{
    height: 100%;
}
.text-right1{
    right: 30px;
    position: absolute;
    top: 600px;
}
.left-section{
    background: #FFF;
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
    padding-left: 20px !important;
}
.contact-list{
    display:block;
    // width: 778px !important;
    margin-top: 0px !important;
    border-radius: 8px;
    overflow-y: auto !important;
    max-height: 200px !important;
    overflow-x: hidden !important;
}
.contact-list .hide{
    display:none;
}
.right-section{
    position: relative;
    padding-left: 18px;
    border-bottom-right-radius: 8px !important;
    border-top-right-radius: 8px !important;
    background-color: #F7F8F9;
}
.user-1{
    display: flex;
    border-radius: 8px;
    background-color: #FFE6EE;
    align-items: center;
    padding: 10px 0px;
}
.users{
    display: flex;
    border-radius: 24px;
    background-color: #FFF;
    height: 36px;
    margin: 5px 5px 5px 0px;
    align-items: center;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.25);
}
.Norecords{
    opacity: 0.5;
    color: #727272;
    font-family: Open Sans;
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    text-align: center;
}

.Norecordsimage{
    color: #727272;
    opacity: 0.5;
    text-align: center;
}
.users-left-sec{
}
@media (min-width: 576px ) and (max-width: 598px ) {
    .reassignmodal .modal-content{
        margin: 0 auto;
        width:95%;
    }
    .left-section{
        padding-right: 20px !important;
        height: 350px !important;
        border-bottom-right-radius: 8px;
        border-top-right-radius: 8px;
    }
    .right-section{
        height: 350px !important;
        border-bottom-left-radius: 8px !important;
        border-top-left-radius: 0px !important;
        border-bottom-right-radius: 8px !important;
        border-top-right-radius: 0px !important;
        padding-left: 20px !important;
        padding-right: 20px !important;
    }
    .selected-list .closeIcon {
        margin-left: 68px;
    }
    .fullcontainer{
        height: unset !important;
    }
    .circleClass{
        padding-right: 24px !important
    }
    .care-header{
        margin-top: 1rem;
    }
    .selected-list {
        width: 500px !important;
    }
    .caremanager-search .searching1{
        width: 500px !important;
    }
    .contact-list{
        width: 92% !important;
    }
    .caremanager-search .searchIcon1{
        margin-left: 460px;
    }
    .user-1{
        padding: 10px !important;
    }
}
@media (min-width: 599px ) and (max-width: 767px ) {
    .reassignmodal .modal-content{
        margin: 0 auto;
        width:95%;
    }
    .left-section{
        padding-right: 20px !important;
        height: 350px !important;
        border-bottom-right-radius: 8px;
        border-top-right-radius: 8px;
    }
    .right-section{
        height: 350px !important;
        border-bottom-left-radius: 8px !important;
        border-top-left-radius: 0px !important;
        border-bottom-right-radius: 8px !important;
        border-top-right-radius: 0px !important;
        padding-left: 20px !important;
        padding-right: 20px !important;
    }
    .selected-list .closeIcon {
        margin-left: 70px;
    }
    .fullcontainer{
        height: unset !important;
    }
    .circleClass{
        padding-right: 24px !important
    }
    .care-header{
        margin-top: 1rem;
    }
    .selected-list {
        width: 520px !important;
    }
    .caremanager-search .searching1{
        width: 520px !important;
    }
    .contact-list{
        width: 92% !important;
    }
    .caremanager-search .searchIcon1{
        margin-left: 480px;
    }
    .user-1{
        padding: 10px !important;
    }
}
@media (min-width: 768px ) and (max-width: 991px ) {
    .reassignmodal .modal-content{
        margin: 0 auto;
        width:95%;
    }
    .circleClass{
        padding-right: 24px;
    }
    .reassign-header h4{
        font-size: 20px !important;
    }
    .caremanager-search .searching1 {
        width: 450px !important;
    }
    .caremanager-search .searchIcon1 {
        margin-left: 410px !important;
    }
    .selected-list{
        width: 452px !important;
    }
    .contact-list{
        width: 93%;
    }
    .selected-list .closeIcon {
        margin-left: 60px;
    }
}
@media (min-width: 992px ) and (max-width: 1023px ) {
    .reassignmodal .modal-content{
        margin: 0 auto;
        width:90%;
    }
    .caremanager-search .searchIcon1 {
        margin-left: 520px !important;
    }
    .caremanager-search .searching1{
        width: 560px !important;
    }
    .selected-list {
        width: 565px !important;
    }
    .selected-list .closeIcon {
        margin-left: 75px;
    }
}
@media (min-width: 1024px ) and (max-width: 1199px ) {
    .reassignmodal .modal-content{
        margin: 0 auto;
        width:90% !important;
    }
    .caremanager-search .searchIcon1 {
        position: absolute;
        margin-top: 10px;
        margin-left: 540px !important;
        cursor: pointer;
    }
    .caremanager-search .searching1{
        width: 580px !important;
    }
    .contact-list{
        width: 94%;
    }
    .selected-list {
        width: 580px !important;
    }
    .selected-careteam-patients{
        width: 770px !important;
    }
    .selected-list .closeIcon {
        margin-left: 80px;
    }
}
@media (min-width: 1200px ) and (max-width: 1350px ) {
    .reassignmodal .modal-content{
        margin: 0 auto;
        width:85%;
    }
    .caremanager-search .searchIcon1 {
        position: absolute;
        margin-top: 10px;
        margin-left: 600px !important;
        cursor: pointer;
    }
    .caremanager-search .searching1{
        width: 640px !important;
    }
    .contact-list{
        width: 94%;
    }
    .selected-list {
        width: 640px !important;
    }
    .selected-careteam-patients{
        width: 770px !important;
    }
    .selected-list .closeIcon {
        margin-left: 90px;
    }
}
@media (min-width: 1351px ) and (max-width: 1699px ) {
    .contact-list{
        width: 94%;
    }
    .selected-list {
        width: 770px !important;
    }
    .selected-careteam-patients{
        width: 770px !important;
    }
    .selected-list .closeIcon {
        margin-left: 110px;
    }
}
@media (min-width: 1700px ) and (max-width: 1919px ) {
    .contact-list{
        width: 94%;
    }
    .selected-list {
        width: 770px !important;
    }
    .selected-careteam-patients{
        width: 770px !important;
    }
    .selected-list .closeIcon {
        margin-left: 110px;
    }
}
@media (min-width: 1920px ) and (max-width: 2559px ) {
    .contact-list{
        width: 94%;
    }
    .selected-list {
        width: 770px !important;
    }
    .selected-careteam-patients{
        width: 770px !important;
    }
    .selected-list .closeIcon {
        margin-left: 110px;
    }
}
@media (min-width: 2560px ) and (max-width: 2700px ) {
    .contact-list{
        width: 94%;
    }
    .selected-list {
        width: 770px !important;
    }
    .selected-careteam-patients{
        width: 770px !important;
    }
    .selected-list .closeIcon {
        margin-left: 110px;
    }
}
`
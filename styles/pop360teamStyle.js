import css from 'styled-jsx/css'
export default css.global`
.card-body.filter-container-body{
    border-radius: 24px !important;
}
.sub-title{
    color: #727272;
    padding-top:10px;
}

.sub-title-next{
    color: #DB1962;
    font-weight: 600;
}
.underline{
    color: #1458E8;  
}
.advanced-link{
  color: #1458E8;
  font-family: "Open Sans";
  font-size: 16px;
  padding-top: 30px;
}
.col{
    padding-top: 0 !important;
}
.col.filter-button{
    padding: 1rem 0 0 0.2rem !important;
}
.md-progress{
  margin-top: 8px !important;
}

.titleAndSort {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: .5rem !important;
  margin-bottom: .5rem !important;
}
.dataHandling {
  text-transform: uppercase;
  padding: 7px 1.5rem 0 0rem !important;
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
  font-size: 14px !important;
}
.circleClass{
  height: 30px;
    width: 30px;
    border-radius: 50%;
    display: inline-block;
    background: #FF8800;
    color: #FFFFFF;
    position: relative;
    margin-left:8px;
    margin-top: -5px;
}
.circletext{
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%,-50%);
  -ms-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
}
.customize-button{
    font-size: 16px !important;
    border-radius: 8px;
    z-index: 9;
    margin-top: 24px;
    margin-left: 45px;
    background-color: #2a2d71 !important;
    color: #FFFFFF !important;
    border: 1px solid #2a2d71 !important;
}
.card-title{
  color: #424242;
  font-family: "Open Sans";
  font-weight: 700 !important;
}
.filter-container .select-dropdown{
  border-radius: 8px !important;
  box-shadow: 0 3px 6px 0 rgba(0,0,0,0.16) !important;
}
.filter-container .caret{
}

.filter-container .col{
    padding-top: 0px !important;
}
.sub-data{
    color: #DB1962;
    font-family: "Open Sans";
    font-size: 18px;
    font-weight: 600;
    padding-left: 15px;
}
.eng-row{
    padding-top: 10px;
}
.eng-data{
    color: #31394D;
    font-family: "Open Sans";
    font-size: 16px;
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

.header-col{
    z-index: 1;
}

.controls{
  display: flex;
  flex-wrap: wrap;
}
  .active {
    color: #db1b60 !important;
    font-weight: 700;
  }
  .searchIcon {
    position: absolute;
    margin-top: 0.55rem;
    margin-left: 13rem;
    cursor: pointer;
  }
  .searching {
    background-color: white;
    border: none;
    width: 15rem !important;
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
  .MuiPaginationItem-textPrimary.Mui-selected{
    color: #DB1962 !important;
    background-color: #FFFF !important;
    font-weight: 700 !important;
  }
  .MuiPagination-ul{
    margin-left: -70px !important;
  }
  .pagination-container{
    display: flex;
    justify-content: center;
    margin-top: 30px !important;
    margin-bottom: -20px;
  }
  @media only screen and  (min-width: 575px) {
    .customize-button{
      margin-left: 55px;
    }

}
  @media only screen and (min-width: 576px ) and (max-width: 598px ){
    .customize-button{
      margin-left: 55px;
    }
    .filter-container .col-sm-12{
      margin-bottom: -32px;
    }
  }
  @media only screen and (min-width: 599px ) and (max-width: 767px ){
    .customize-button{
      margin-left: 55px;
    }
    .filter-container .col-sm-12{
      margin-bottom: -32px;
    }
  }
  @media only screen and (min-width: 768px ) and (max-width: 991px ){
    .customize-button{
      margin-left: 55px;
    }
  }
  @media only screen and (min-width: 992px ) and (max-width: 1023px ){
    .customize-button{
      margin-left: 55px;
    }
  }
  @media only screen and (min-width: 1024px ) and (max-width: 1199px ){
    .customize-button{
      margin-left: 55px;
    }
  }
  @media only screen and (min-width: 1200px ) and (max-width: 1349px ){
    .customize-button{
      margin-left: 55px;
    }
  }
  @media only screen and (min-width: 1351px ) and (max-width: 1699px ){
    .customize-button{
      margin-left: 55px;
    }
  }
  @media only screen and (min-width: 1700px ) and (max-width: 1919px ){
    .customize-button{
      margin-left: 105px;
    }
  }
  @media only screen and (min-width: 1920px ) and (max-width: 2199px ){
    .customize-button{
      margin-left: 140px;
    }
  }
  @media only screen and (min-width: 2560px ) and (max-width: 2700px ){
    .customize-button{
      margin-left: 140px;
    }
  }
`
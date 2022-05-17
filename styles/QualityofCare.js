import css from 'styled-jsx/css'
export default css.global`

.select-wrapper input.select-dropdown{
    padding-left: 8px !important;
    width:95% !important;
  }

.table{
    border: 1px solid rgba(0,0,0,0.1) !important;
    color: #424242 !important;
    font-size: 14px !important;
}
table.dataTable thead .sorting:before{
    display: none !important;
}
.col-sm-12.col-md-12.col-lg-12{
    padding-left: 8px !important;
    padding-right: 8px !important;
}
table.dataTable thead .sorting:after{
    display: none !important;
}
table.dataTable thead .sorting_desc:before{
    display: none !important;
}
table.dataTable thead .sorting_desc:after{
    display: none !important;
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
.populationTable tr:nth-child(1) td:nth-child(n+2){
    color: #DB1962 !important;
    font-weight: 600 !important;
}
.populationTable tr:nth-child(2) td:nth-child(n+2){
    color: #66B8AF !important;
    font-weight: 600 !important;
}
.populationTable tr:nth-child(3) td:nth-child(n+2){
    color: #00897B !important;
    font-weight: 600 !important;
}
.populationTable tr:nth-child(4) td:nth-child(n+2){
    color: #424242 !important;
    font-weight: 600 !important;
}
.populationTable tr:nth-child(5) td:nth-child(n+2){
    color: #424242 !important;
    font-weight: 600 !important;
}
.speciality-graph tr td:nth-child(2){
    color: #DF2F2F !important;
    font-weight: 600 !important;
}
.speciality-graph tr td:nth-child(3){
    color: #536DFE !important;
    font-weight: 600 !important;
}
.speciality-graph tr td:nth-child(4){
    color: #7CB342 !important;
    font-weight: 600 !important;
}
.speciality-graph tr td:nth-child(5){
    color: #F89E1B !important;
    font-weight: 600 !important;
}
.speciality-graph tr td:nth-child(6){
    color: #29B6F6 !important;
    font-weight: 600 !important;
}
.speciality-graph tr td:nth-child(7){
    color: #FF8A80 !important;
    font-weight: 600 !important;
}
.speciality-graph tr td:nth-child(8){
    color: #9E9E9E !important;
    font-weight: 600 !important;
}
.speciality-graph tr td:nth-child(9){
    color: #388E3C !important;
    font-weight: 600 !important;
}
.speciality-graph tr td:nth-child(10){
    color: #3A4DB9 !important;
    font-weight: 600 !important;
}
.speciality-graph tr td:nth-child(11){
    color: #00897B !important;
    font-weight: 600 !important;
}

.satisfaction-graph tr td:nth-child(2){
    color: #DF2F2F !important;
    font-weight: 600 !important;
}
.satisfaction-graph tr td:nth-child(3){
    color: #536DFE !important;
    font-weight: 600 !important;
}
.satisfaction-graph tr td:nth-child(4){
    color: #7CB342 !important;
    font-weight: 600 !important;
}
.satisfaction-graph tr td:nth-child(5){
    color: #F89E1B !important;
    font-weight: 600 !important;
}
.satisfaction-graph tr td:nth-child(6){
    color: #29B6F6 !important;
    font-weight: 600 !important;
}
.satisfaction-graph tr td:nth-child(7){
    color: #FF8A80 !important;
    font-weight: 600 !important;
}
.satisfaction-graph tr td:nth-child(8){
    color: #9E9E9E !important;
    font-weight: 600 !important;
}
.satisfaction-graph tr td:nth-child(9){
    color: #388E3C !important;
    font-weight: 600 !important;
}
.satisfaction-graph tr td:nth-child(10){
    color: #3A4DB9 !important;
    font-weight: 600 !important;
}
.satisfaction-graph tr td:nth-child(11){
    color: #00897B !important;
    font-weight: 600 !important;
}
// .month-right-dropdown1 .select-dropdown {
//     font-size: 12px !important;
// }
// .select-wrapper.md-form input.select-dropdown {
//     height: 36px !important;
//     max-width: 200px !important;
// }
.population-graph .card-title{
    color: #424242 !important;
    font-family: Open Sans !important;
    font-size: 20px !important;
    font-weight: 700 !important;
    margin-left: 16px;
    margin-top: 10px;
}
.population-graph .value{
    color: #db1962 !important;
    font-family: Open Sans !important;
    font-size: 18px !important;
    font-weight: 700 !important;
    margin-left: 20px;
    margin-top: -10px;
}
.speciality-graph .card-title{
    color: #424242 !important;
    font-family: Open Sans !important;
    font-size: 20px !important;
    font-weight: 700 !important;
    margin-left: 16px;
    margin-top: 10px;
}
.speciality-graph .value{
    color: #db1962 !important;
    font-family: Open Sans !important;
    font-size: 18px !important;
    font-weight: 700 !important;
    margin-left: 20px;
    margin-top: -10px;
}
.satisfaction-graph .card-title{
    color: #424242 !important;
    font-family: Open Sans !important;
    font-size: 20px !important;
    font-weight: 700 !important;
    margin-left: 16px;
    margin-top: 10px;
}
.satisfaction-graph .value{
    color: #db1962 !important;
    font-family: Open Sans !important;
    font-size: 18px !important;
    font-weight: 700 !important;
    margin-left: 20px;
    margin-top: -10px;
}
.services-graph .value{
    color: #db1962 !important;
    font-family: Open Sans !important;
    font-size: 18px !important;
    font-weight: 700 !important;
    margin-left: 20px;
    margin-top: -10px;
}
.month-right-dropdown1{
    margin-top: .5rem !important;
}
.highcharts-credits{
    display: none !important;
}
.highcharts-title{
    display: none !important;
}
@media (min-width:576px) and (max-width:598px){
 
}
@media (min-width:599px) and (max-width:767px){
 
}
@media (min-width:768px) and (max-width:991px){
  
}
@media (min-width:992px) and (max-width:1023px){
  
}
@media (min-width:1024px) and (max-width:1199px){
 
}
@media (min-width:1200px) and (max-width:1350px){
  
}
@media (min-width: 1351px) and (max-width:1699px){
  
}
@media (min-width: 1700px) and  (max-width:1919px){
  
}
@media (min-width: 1920px) and  (max-width:2559px){
  
}   
@media (min-width: 2560px) and  (max-width:2700px){
  
} 
   

`
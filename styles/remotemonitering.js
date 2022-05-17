import css from 'styled-jsx/css'
import theme from '../constants/theme.json';
export default css.global`

.CGMTable .table{
    margin-bottom: 0rem !important;
}

.CGMTable .table-responsive{
    overflow-y: scroll;
    max-height: 300px !important;
}
    
.select-wrapper input.select-dropdown{
    padding-left: 8px !important;
    width:95% !important;
}

.table.dataTable thead .sorting:before{
    display: none !important;
}

.card{
    margin-top: 16px !important;
}
.col-sm-12.col-md-12.col-lg-4{
    padding-left: 8px !important;
    padding-right: 8px !important;
}
.col-sm-12.col-md-12.col-lg-6{
    padding-left: 8px !important;
    padding-right: 8px !important;
}
.col-md-12.col-lg-12{
    padding-left: 8px !important;
    padding-right: 8px !important;
}
.table.dataTable thead .sorting:after{
    display: none !important;
}
.table-hover tbody tr:hover{
    background-color: rgba(0, 0, 0, 0.075)  !important;
}

.bloodpressuretablestyle tr td:nth-child(2) {
    color: #DB1962 !important;
    font-weight: 600 !important;
}
.bloodpressuretablestyle tr td:nth-child(3) {
    color: #2A2D71 !important;
    font-weight: 600 !important;
}
.glucosemoniteringtablestyle tr td:nth-child(2) {
    color: #db1962 !important;
    font-weight: 600 !important;
}
.heartratemonitertablestyle tr td:nth-child(2) {
    color: #2A2D71 !important;
    font-weight: 600 !important;
}
.heartratemonitertablestyle tr td:nth-child(3) {
    color: #D60000 !important;
    font-weight: 600 !important;
}

.dailyoximetrytablestyle tr td:nth-child(2) {
    color: #2A2D71 !important;
    font-weight: 600 !important;
}
.dailyoximetrytablestyle tr td:nth-child(3) {
    color: #FFCE00 !important;
    font-weight: 600 !important;
}
.dailyoximetrytablestyle tr td:nth-child(4) {
    color: #DB1962 !important;
    font-weight: 600 !important;
}

.ekgreadingtablestyle  tr td:nth-child(2) {
    color: #2A2D71 !important;
    font-weight: 600 !important;
}
.ekgreadingtablestyle  tr td:nth-child(3) {
    color: #FF9D00 !important;
    font-weight: 600 !important;
}
.ekgreadingtablestyle  tr td:nth-child(4) {
    color: #2A2D71 !important;
    font-weight: 600 !important;
}
.ekgreadingtablestyle  tr td:nth-child(5) {
    color: #2A2D71 !important;
    font-weight: 600 !important;
}
.ekgreadingtablestyle  tr td:nth-child(6) {
    color: #2A2D71 !important;
    font-weight: 600 !important;
}
.ekgreadingtablestyle  tr td:nth-child(7) {
    color: #DB1962 !important;
    font-weight: 600 !important;
}

.sleepstagestablestyle tr td:nth-child(2) {
    color: #6C6C6C !important;
    font-weight: 600 !important;
}
.sleepstagestablestyle tr td:nth-child(3) {
    color: #000 !important;
    font-weight: 600 !important;
}
.sleepstagestablestyle tr td:nth-child(4) {
    color: #DB1962 !important;
    font-weight: 600 !important;
}
.sleepstagestablestyle tr td:nth-child(5) {
    color: #B018D9 !important;
    font-weight: 600 !important;
}
.sleepstagestablestyle tr td:nth-child(6) {
    color: #FFC400 !important;
    font-weight: 600 !important;
}
.sleepstagestablestyle tr td:nth-child(7) {
    color: #2A712D !important;
    font-weight: 600 !important;
}
.sleepstagestablestyle tr td:nth-child(8) {
    color: #2A2D71 !important;
    font-weight: 600 !important;
}
.sleepstagestablestyle tr td:nth-child(9) {
    color: #DB1962 !important;
    font-weight: 600 !important;
}

.datatablestyle tr td:nth-child(2) {
    color: #6C6C6C !important;
    font-weight: 600 !important;
}
.datatablestyle tr td:nth-child(3) {
    color: #000 !important;
    font-weight: 600 !important;
}
.datatablestyle tr td:nth-child(4) {
    color: #DB1962 !important;
    font-weight: 600 !important;
}
.datatablestyle tr td:nth-child(5) {
    color: #B018D9 !important;
    font-weight: 600 !important;
}

.Underweightbmi tr td:nth-child(2) {
    color: #2A2D71 !important;
    font-weight: 600 !important;
}

.Underweightbmi tr td:nth-child(3) {
    color: #FF9300 !important;
    font-weight: 600 !important;
}

.Underweightbmi tr td:nth-child(4) {
    color: #DB1962 !important;
    font-weight: 600 !important;
}

.Glomerulartablestyle tr td:nth-child(2) {
    color: #2A2D71 !important;
    font-weight: 600 !important;
}

.Glomerulartablestyle tr td:nth-child(3) {
    color: #FF9D00 !important;
    font-weight: 600 !important;
}

.Glomerulartablestyle tr td:nth-child(4) {
    color: #2A2D71 !important;
    font-weight: 600 !important;
}

.Glomerulartablestyle tr td:nth-child(5) {
    color: #2A2D71 !important;
    font-weight: 600 !important;
}


.Glomerulartablestyle tr td:nth-child(6) {
    color: #2A2D71 !important;
    font-weight: 600 !important;
}

.Glomerulartablestyle tr td:nth-child(7) {
    color: #DB1962 !important;
    font-weight: 600 !important;
}

.Glomerulartablestyle tr td:nth-child(8) {
    color: #FF72A7 !important;
    font-weight: 600 !important;
}

.Glomerulartablestyle tr td:nth-child(9) {
    color: #F00 !important;
    font-weight: 600 !important;
}


.table{
    border: 1px solid rgba(0,0,0,0.1) !important;
    color: #424242 !important;
    font-size: 14px !important;
	width: 100%;
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
.customClass{
    color: #000 !important;
    text-transform: none !important;
    background: #FFF !important;
    margin: 0rem !important;
    font-weight: 400 !important;
    font-size: 12px !important;
    max-width: 200px !important;
    height: 24px !important;
    padding: 0rem 2.14rem !important;
}

  .cgm-buttons .btn{
    padding: 0.2rem 1rem !important;
    margin: 0rem !important;
  }
  .customClass.activeClass{
    background-color: #1265F0 !important;
    color: #FFFFFF !important;
    margin: 0rem !important;
    font-weight: 400 !important;
    font-size: 12px !important;
    max-width: 200px !important;
    height: 24px !important;
    padding: 0rem 1rem !important;
  }
    .sub-title{
        color: #727272;
        padding-top:10px;
    }

    .sub-title-next{
        color: #DB1962;
        font-weight: 600;
    }

    .details-btn{
        float:right !important;
        padding: 0.4rem 0rem !important;
        border: none !important;
        font-weight: 600 !important;
        text-decoration: underline !important;
        font-size: 16px !important;
        letter-spacing: 1px;
        margin-bottom: 12px !important;
        background-color: unset !important;
        color: #db1962 !important;
        box-shadow: unset !important;
        margin-right: 0%;
    }

    .card-title{
        color: ${theme.fontPrimaryColor};
        font-weight: 700 !important;
        font-size: 20px;
        font-weight: 700;
        line-height: 32px;
        margin-left: 16px;
    }
    .card-right{
        display: flex;
        padding-right: 0;
    }

    .month-right-dropdown1{
        margin-left: 65px !important;
        margin-top: 0rem !important; 
        margin-bottom: 0rem !important;

    }
    // .month-right-dropdown1 .select-dropdown{
    //     font-size: 12px !important;
    // }
    .select-wrapper.md-form input.select-dropdown{
        max-width: 200px !important;
    }

    .month-right-dropdown{
        margin: 0px 0px !important;
        margin-top: 0rem !important; 
        margin-bottom: 0rem !important;
    }
    .month-right-dropdown .select-dropdown{
        font-size: 12px !important;
    }

    .select-wrapper.md-form.md-outline span.caret {
        margin-top: -.25rem;
        padding-right: .75rem;
        padding-left: .75rem;
    }

    .flatbutton{
        color: ${theme.fontSecondaryColor};
        font-size: 18px;
        font-weight: 600;
        letter-spacing: 1px;
        line-height: 24px;
    }
    .highcharts-container{
        margin-top: 20px !important;
    }
    .sorting {
        font-size: 14px !important;
    }
    @media (max-width: 575.98px){
        .table{
            width:100%;
            margin-left: 0%;
        }
    }
    @media (min-width: 576px) and (max-width: 598px){
        .card-title{
            font-size: 20px !important;
        }
        .heart-rate .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 50px;
        }
        .heart-rate .select-wrapper.md-form.md-outline .dropdown-content{
            margin-left: 50px;
            max-width: 200px;
        }
        .oximetry-readings .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 50px;
        }
        .oximetry-readings .select-wrapper.md-form.md-outline .dropdown-content{
            margin-left: 50px;
            max-width: 200px;
        }
        .ekg-readings .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 50px;
        }
        .ekg-readings .select-wrapper.md-form.md-outline .dropdown-content{
            margin-left: 50px;
            max-width: 200px;
        }
        .ekg-readings .select-wrapper.md-form.md-outline .dropdown-content{
            margin-left: 50px;
            max-width: 200px;
        }
        .stage-of-sleep .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 50px;
        }
        .stage-of-sleep .select-wrapper.md-form.md-outline .dropdown-content{
            margin-left: 50px;
            max-width: 200px;
        }
        .total-cholesterol .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 50px;
        }
        .total-cholesterol .select-wrapper.md-form.md-outline .dropdown-content{
            margin-left: 50px;
            max-width: 200px;
        }
        .under-weight .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 50px;
        }
        .under-weight .select-wrapper.md-form.md-outline .dropdown-content{
            margin-left: 50px;
            max-width: 200px;
        }
        .under-weight .select-wrapper span.caret{
            right: -40px;
        }
        .over-weight .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 50px;
        }
        .over-weight .select-wrapper.md-form.md-outline .dropdown-content{
            margin-left: 50px;
            max-width: 200px;
        }
        .over-weight .select-wrapper span.caret{
            right: -40px;
        }
        .glomerular .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 50px;
        }
        .glomerular .select-wrapper.md-form.md-outline .dropdown-content{
            margin-left: 50px;
            max-width: 200px;
        }
        .glomerular .select-wrapper span.caret{
            right: -40px;
        }
        .blood-pressure-graph{
            margin-bottom: 0px !important;
        }
        .dialy-heart-rate-graph{
            margin-bottom: 0px !important;
        }
        .under-weight-graph{
            margin-bottom: 0px !important;
        }
    }
    @media (min-width: 599px) and (max-width: 767px){
        .blood-pressure-graph{
            margin-bottom: 0px !important;
        }
        .dialy-heart-rate-graph{
            margin-bottom: 0px !important;
        }
        .under-weight-graph{
            margin-bottom: 0px !important;
        }
        .card-title{
            font-size: 20px !important;
        }
        .heart-rate .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 60px;
        }
        .heart-rate .select-wrapper.md-form.md-outline .dropdown-content{
            margin-left: 60px;
            max-width: 200px;
        }
        .oximetry-readings .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 60px;
        }
        .oximetry-readings .select-wrapper.md-form.md-outline .dropdown-content{
            margin-left: 60px;
            max-width: 200px;
        }
        .ekg-readings .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 60px;
        }
        .ekg-readings .select-wrapper.md-form.md-outline .dropdown-content{
            margin-left: 60px;
            max-width: 200px;
        }
        .stage-of-sleep .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 60px;
        }
        .stage-of-sleep .select-wrapper.md-form.md-outline .dropdown-content{
            margin-left: 60px;
            max-width: 200px;
        }
        .total-cholesterol .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 60px;
        }
        .total-cholesterol .select-wrapper.md-form.md-outline .dropdown-content{
            margin-left: 60px;
            max-width: 200px;
        }
        .under-weight .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 60px;
        }
        .under-weight .select-wrapper.md-form.md-outline .dropdown-content{
            margin-left: 60px;
            max-width: 200px;
        }
        .under-weight .select-wrapper span.caret{
            right:-40px;
        }
        .over-weight .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 60px;
        }
        .over-weight .select-wrapper.md-form.md-outline .dropdown-content{
            margin-left: 60px;
            max-width: 200px;
        }
        .over-weight .select-wrapper span.caret{
            right: -40px;
        }
        .glomerular .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 60px;
        }
        .glomerular .select-wrapper.md-form.md-outline .dropdown-content{
            margin-left: 60px;
            max-width: 200px;
        }
        .glomerular .select-wrapper span.caret{
            right: -40px;
        }
    }
    @media (min-width: 768px) and (max-width: 991.98px){
        .card-title{
            font-size: 20px !important;
        }
        .blood-pressure-graph{
            margin-bottom: 0px !important;
        }
        .dialy-heart-rate-graph{
            margin-bottom: 0px !important;
        }
        .under-weight-graph{
            margin-bottom: 0px !important;
        }
        .heart-rate .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 10px;
        }
        .heart-rate .select-wrapper.md-form.md-outline .dropdown-content{
            margin-left: 10px;
            max-width: 200px;
        }
        .oximetry-readings .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 10px;
        }
        .oximetry-readings .select-wrapper.md-form.md-outline .dropdown-content{
            margin-left: 10px;
            max-width: 200px;
        }
        .ekg-readings .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 10px;
        }
        .ekg-readings .select-wrapper.md-form.md-outline .dropdown-content{
            margin-left: 10px;
            max-width: 200px;
        }
        .stage-of-sleep .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 10px;
        }
        .stage-of-sleep .select-wrapper.md-form.md-outline .dropdown-content{
            margin-left: 10px;
            max-width: 200px;
        }
        .total-cholesterol .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 10px;
        }
        .total-cholesterol .select-wrapper.md-form.md-outline .dropdown-content{
            margin-left: 10px;
            max-width: 200px;
        }
        .under-weight .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 25px;
        }
        .under-weight .select-wrapper span.caret{
            right: -25px;
        }
        .under-weight .select-wrapper.md-form.md-outline .dropdown-content{
            margin-left: 25px;
            max-width: 200px;
        }
        .over-weight .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 25px;
        }
        .over-weight .select-wrapper span.caret{
            right: -25px;
        }
        .over-weight .select-wrapper.md-form.md-outline .dropdown-content{
            margin-left: 25px;
            max-width: 200px;
        }
        .glomerular .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 25px;
        }
        .glomerular .select-wrapper span.caret{
            right: -25px;
        }
        .glomerular .select-wrapper.md-form.md-outline .dropdown-content{
            margin-left: 25px;
            max-width: 200px;
        }
    }
    @media (min-width: 992px) and (max-width: 1199.98px){
        .card-title{
            font-size: 20px !important;
        }
    }
    @media (min-width: 1200px) and (max-width:1350.98px){
    }
    @media (min-width: 1351px) and (max-width:1699.98px){
        .month-right-dropdown{
            margin-left: 75px !important;
        }
        .month-right-dropdown1{
            margin-left: 120px !important;
        }
    }
    @media (min-width: 1700px) and (max-width:1919.98px){
        .month-right-dropdown{
            margin-left: 75px !important;
        }
        .month-right-dropdown1{
            margin-left: 150px !important;
        }
        .under-weight-graph{
            margin-top: 16px !important;
        }
        .over-weight-graph{
            margin-top: 16px !important;
        }
    }
    @media (min-width: 1920px) and (max-width:2459px){
        .month-right-dropdown{
            margin-left: 125px !important;
        }
        .month-right-dropdown1{
            margin-left: 175px !important;
        }
    }

    @media (min-width: 2560px) and (max-width:2700px){
        .month-right-dropdown1{
             margin-left: 330px !important;
        }
        .heart-rate .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 180px;
        }
        .heart-rate .month-right-dropdown .select-dropdown{
            margin-left: 180px;
            max-width: 200px;
        }
        .oximetry-readings .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 180px;
        }
        .oximetry-readings .month-right-dropdown .select-dropdown{
            margin-left: 180px;
            max-width: 200px;
        }
        .ekg-readings .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 180px;
        }
        .ekg-readings .month-right-dropdown .select-dropdown{
            margin-left: 180px;
            max-width: 200px;
        }
        .stage-of-sleep .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 180px;
        }
        .stage-of-sleep .month-right-dropdown .select-dropdown{
            margin-left: 180px;
            max-width: 200px;
        }
        .total-cholesterol .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 180px;
        }
        .total-cholesterol .month-right-dropdown .select-dropdown{
            margin-left: 180px;
            max-width: 200px;
        }
        .under-weight .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 180px;
        }
        .under-weight .month-right-dropdown .select-dropdown{
            margin-left: 180px;
            max-width: 200px;
        }
        .over-weight .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 180px;
        }
        .over-weight .month-right-dropdown .select-dropdown{
            margin-left: 180px;
            max-width: 200px;
        }
        .glomerular .select-wrapper.md-form.md-outline input.select-dropdown{
            margin-left: 180px;
        }
        .glomerular .month-right-dropdown .select-dropdown{
            margin-left: 180px;
            max-width: 200px;
        }
        .under-weight .select-wrapper span.caret{
            right:-40px;
        }
        .over-weight .select-wrapper span.caret{
            right: -40px;
        }
        .glomerular .select-wrapper span.caret{
            right: -40px;
        }
    }
`
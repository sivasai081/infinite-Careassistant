import css from 'styled-jsx/css'
export default css.global`
body{
    font-family: Open Sans !important;
}
.invited-container{
    background: transparent linear-gradient(180deg, #FFFFFFE5 0%, #FFFFFF98 58%, #FFFFFF00 100%) 0% 0% no-repeat padding-box;
    background-image: url("/images/careassistant-bg.png");
    background-position: center;
    background-repeat: no-repeat; 
    background-size: cover;
    position: relative;
}
.invitedScreen-card{
    position:absolute;
    top: 50%;
    left:50%;
    text-align: center;
    transform:translate(-50%, -50%);
    box-shadow: 0px 10px 35px #00000065;
    border-radius: 10px;
}
.accept-button{
    padding: 10px 100px !important;
    border-radius: .5rem !important;
    background-color: #DB1962 !important;
}
.accept-header{
    font-size:18px !important;
    font-weight: 800 !important;
    color: #424242 !important;
}
`
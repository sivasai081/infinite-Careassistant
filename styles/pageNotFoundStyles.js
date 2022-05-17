import css from 'styled-jsx/css'
export default css.global`

@font-face {
    font-family: minimo;
    src: url("fonts/Minimo.otf") format("opentype");
  }
  @font-face {
    font-family: minimo-bold;
    font-weight: bold;
    src: url("fonts/Minimo Bold.otf") format("opentype");
  }

  @font-face {
    font-family: "Montserrat Medium";
    src: url("fonts/Montserrat-SemiBold.ttf") format("opentype");
  }


.navbar-dark{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;
}
.navbar-dark .navbar-brand{
    color: #fff;
    display: inline-block;
    padding-top: .3125rem;
    padding-bottom: .3125rem;
    margin-right: 1rem;
    font-size: 1.25rem !important;
    line-height: inherit;
    white-space: nowrap;
}
.responsivelogo {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 72px;
}
.h5-responsive {
    font-size: 125%;
}
.header-title {
    font-family: minimo;
    color: #FFF;
    font-weight: normal !important;
    letter-spacing: 1px;
}
.not-text{
  color: #DB1962;
  font-family: Open Sans;
  font-size: 75px;
  font-weight: 700;
  line-height: 102px;
}
.error-section{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.error-text{
  color: #424242;
  font-family: Open Sans;
  font-weight: 600;
  font-size: 28px;
  letter-spacing: 1px;
  line-height: 38px;
  margin-bottom: 1rem;
}
.divider{
  height: 1px;
  width: 250px;
  background-color: #727272;
}
.page-not-found{
  margin-top: 1rem;
  color: #727272;
  font-family: Open Sans;
  font-size: 20px;
  line-height: 27px;
}
`
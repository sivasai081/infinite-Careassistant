import React, { useState, useEffect } from "react";
import { MDBContainer } from 'mdbreact';
import NavBar from './NavBar.js';
import dynamic from 'next/dynamic'
import PatientProfileDetails from './patientProfile.js';
import GlobalStyle from '../styles/global'
import UserProfileStyles from '../styles/userprofilestyles.js'
import Footer from '../components/Footer';
import Scroller from '../components/scrollTop';
import MenuBar from '../components/sideBar'
import WhiteSideBar from '../components/whiteSideBar';
import Router from 'next/router'
import Head from 'next/head';
const SideNavWithNoSSR = dynamic(
  () => import('../components/sideNav'),
  { ssr: false }
)

function Layout(props) {
  let myWidth;
  if (typeof window !== 'undefined') {
    myWidth = window.screen.width;
  }
  const[page,setPage] = useState('');
  const[patientId,setpatientId] = useState(false);
  const [menubar, setMenubar] = useState(false);
  const [userinfo, setUserInfo] = useState(false);
  const [sidenavHover, setsidenavHover] = useState(false);
  const [width, setWidth] = useState();
  const handleNav = (sideNavLeft) => {
    setMenubar(sideNavLeft);
    const move = document.querySelector('.main-container');
    move.style.transform = `translateX(0px)`;
    move.style.width = `100%`;
  }
  const handlehoverEvent = (handlehover) => {
    setsidenavHover(handlehover)
  }
  const handleUserInfo = (info) => {
    setUserInfo(info);
  }
 const updateList = (data) => {
   setpatientId(data)
  }
  useEffect(() => {
    let myWidth;
    if (typeof window !== 'undefined') {
      myWidth = window.screen.width;
    }
    setWidth(myWidth);
    let patientName = localStorage.getItem('patientName');
    let patientId = localStorage.getItem('patientId');
    console.log(patientName,patientId,"local")
    if(localStorage.getItem('patientId') === null && localStorage.getItem('patientName') === null){
      setpatientId(false)
    }else{
      setpatientId(true)
    }
    const { pathname } = Router;
    setPage(pathname);
    setMenubar(false);
    window.addEventListener('resize', () => {
      const myWidth  = window.innerWidth;
      setWidth(myWidth);
    })
    }, []);
 const classWithoutCard =  (page === "/dashboard")  || (page === "/dashboarddetails") || (page === "/educationmaterials")|| (page === "/patientlist") || (page === "/pop360") || (page === "/pop360teams") || (page === "/manageaccount") || (page === "/users") || (page === "/adduser") || (page === "/roles") || (page === "/messages") || (page === "/assignments") || (page === "/utilization") || (page === "/outpatient") || (page === "/inpatient") || (page === "/umnotes") || (page === "/authview") || (page === "/inpatientauthview") || (page === "/inpatientnote") || (page === "/utilization") || (page === "/longitudinalanalysis") || (page === "/qualityofcare") || (page === "/patientengagement")
 ? "withoutPatientCard" :
  "";
  return (
    <>
      <Head>
        <title>Healthlligence</title>

        <link rel="stylesheet" type="text/css" href="https://fonts.cdnfonts.com/css/minimo" />
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
        <script
          src="https://code.jquery.com/jquery-3.3.1.js"
          integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
          crossorigin="anonymous"></script>
        <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
        <script crossorigin src="https://cdn.plot.ly/plotly-latest.min.js"></script>
        <script crossorigin src="https://unpkg.com/react-plotly.js@1.0.2/dist/create-plotly-component.js"></script>
        
      </Head>
      {!props.isLoaded ? <NavBar screenwidth={width} handleSideNav={handleNav} userExpanded={userinfo} pageInfo = {page} sidenavHover ={sidenavHover}/> : "" }
      {(page === "/dashboard")  || (page === "/dashboarddetails") || (page === "/patientlist") || (page === "/educationmaterials") || (page === "/pop360") || (page === "/pop360teams") || (page === "/manageaccount") ||  (page === "/users") || (page === "/adduser") || (page === "/roles") || (page === "/messages") || (page === "/assignments") || (page === "/utilization") || (page === "/longitudinalanalysis") || (page === "/qualityofcare") || (page === "/patientengagement")|| (page === "/outpatient") || (page === "/inpatient") || (page === "/umnotes") || (page === "/authview") || (page === "/inpatientauthview") || (page === "/inpatientnote")  
      ? "" : 
      <>{!props.isLoaded ? <PatientProfileDetails menuexpanded={menubar} userInfoExpanded={handleUserInfo} updateList = {updateList} patientId={patientId} /> :""}</>}
      {!props.isLoaded ? <>{width > 1053 ?  <MenuBar handleSideNav={handleNav} userExpanded={userinfo} patientId={patientId} pageInfo = {page} sidenavHover ={sidenavHover}/> :""} </> : "" }
      {!props.isLoaded ? <SideNavWithNoSSR menuexpanded={menubar} patientId={patientId} userInfoNav={userinfo} pageInfo = {page} handlehover ={handlehoverEvent} screenwidth={width} /> : "" }
        <MDBContainer fluid className={`main-container ${menubar && 'nav-expanded'} ` + classWithoutCard} >
            <div className="test">{props.children}</div>
            <Scroller />
            {/* <Footer /> */}
        </MDBContainer>

      <style jsx>{GlobalStyle}</style>
      <style jsx>{UserProfileStyles}</style>
      

    </>
  );
}

export default Layout;

import React from "react";
import LoaderStyle from '../styles/loaderStyle'

const Loader = () => {
    return (
      <>  
      <div className="loader-container">
          <img src="/images/loader_v1.gif" alt="Telemedicin-Icon" style={{width:"100px", height:"100px"}} className="img-fluid"></img>
      </div>
      <style jsx>{LoaderStyle}</style>
      </>
    );
  }
  
  export default Loader;
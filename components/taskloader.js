import React from "react";
import LoaderStyle from '../styles/loaderStyle'

const Loader = () => {
    return (
      <>  
      <div className="">
          <img src="/images/loader_v1.gif" alt="Telemedicin-Icon" style={{width:"20px", height:"20px"}} className="img-fluid"></img>
      </div>
      <style jsx>{LoaderStyle}</style>
      </>
    );
  }
  
  export default Loader;
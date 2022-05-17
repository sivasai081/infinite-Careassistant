import React, { useState, useEffect} from "react";
import window from 'global'
import { MDBIcon } from "mdbreact";

const ScrollTop = ()=> {
const [showScroll, setShowScroll] = useState(false);



 
const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

useEffect(() => {
  const myScrollFunc = () => {
    var y = window.scrollY;
    if (y >= 600) {
        setShowScroll(true)
    } else {
        setShowScroll(false)
    }
  };
    window.addEventListener('scroll', myScrollFunc);
    
    return () => {
          window.removeEventListener('scroll', myScrollFunc);
    };
});    

  return (
    <div className="scroll-top-container">
      {showScroll && 
      <MDBIcon icon="chevron-up" size="2x" className="scroll-top-icon" style={{marginTop: "24px", height: "40px", width:"40px"}} onClick={scrollToTop}
      /> }
    </div>
  );
}

export default ScrollTop;

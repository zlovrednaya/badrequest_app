import React, { Component } from "react";
import { FaArrowCircleDown } from "react-icons/fa";
import Header from "./Header.tsx";  
export default function Introduction({ id }: { id: string }) {
  const setScroll = () => {
    const el = document.getElementById('page2');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="introduction-container" id={id}>
      <section className="page-block">
        <Header />
        <div className="introduction-content" style={styles.introductionContent}>
          <div style={styles.hello}>Hello!</div>
          <div style={styles.introtext}>I’m Daria Hostieva, a full-stack software engineer. Welcome to my personal website. </div>
          <div>Welcome to my personal website!</div>
        </div>
          
          <div style={styles.learnMore} onClick={() => setScroll()}>
              <span> Learn more </span>
              <FaArrowCircleDown />
          </div>
      </section>
    </div>  
  );
}

const styles: Record<string, React.CSSProperties> = {
  hello: {
    paddingTop: "30px",
    fontSize: "100px",
    fontWeight: "bold",
    //fontFamily: "Playwrite US Trad Guides",
  },
  introductionContent: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  introtext: {
   // display: "none",
   
  },
  learnMore: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    gap: "10px",
    fontSize: "20px",
    cursor: "pointer",
    marginBottom: "20px",
  },
};
import React, { Component, useRef, useEffect } from "react";
import { FaArrowCircleDown } from "react-icons/fa";
import { IoArrowDown } from "react-icons/io5";

import Header from "../Header.tsx";  
import "../../Landing.css";
import FactoryAnimation from "../animation/FactoryAnimation.tsx";

type IntroductionProps = {
  id: string,
  onOpenContactForm: () => void,
};

export default function Introduction({ id, onOpenContactForm }: IntroductionProps) {

  const baseLogoUrl:string = window.location.origin + "/storage/";

  const setScroll = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const refHello = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(!refHello.current) return;
    // typewriter effect
    const text = refHello.current.textContent || '';
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        refHello.current!.textContent = text.slice(0, index + 1);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
  }, []);

  return (
    <div className="introduction-container" id={id}>
      <section className="page-block">
        <Header onOpenContactForm={()=>onOpenContactForm()}/>
        <div className="introduction-content-container">
          <div className="introduction-content side-component" style={styles.introductionContent}>
            <div style={styles.welcomeText}>Hello, I'm</div>
            <div style={styles.name} ref={refHello}>
               Daria Hostieva
            </div>
            <div style={styles.role}><span>Full-stack Software Developer</span> </div>
            <div style={styles.contact} className="component-button" onClick={onOpenContactForm}>Get in touch</div>
          </div>
          <div className="side-component">
            <img className="portfolio-image" src={`${baseLogoUrl}portfolio_sk.jpg`} />
          </div>         
        </div> 
          <div className="learn-more hover-effect" style={styles.learnMore} onClick={() => setScroll()}>
              <span> Learn more </span>
              <IoArrowDown />
          </div>
      </section>
    </div>  
  );
}

const styles: Record<string, React.CSSProperties> = {
  welcomeText: {
    display: "flex",
  },
  name: {
    fontSize: "75px",
    fontWeight: "bold",
    lineHeight:"70px",
    //fontFamily: "Playwrite US Trad Guides",
  },
  introductionContent: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  role: {
    paddingTop: "20px",
    fontSize: "50px",
    lineHeight:"50px",
    color:"var(--highlight-color)",
  },
  learnMore: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    gap: "10px",
    fontSize: "20px",
    cursor: "pointer",
    marginBottom: "40px",
  },
  contact: {
    display: "flex",
    alignItems: "center",
    marginTop: "20px",
    backgroundColor:"var(--complimentary-color-2)",
    color: "#000",
  }
};
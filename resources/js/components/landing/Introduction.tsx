import React, { Component, useRef, useEffect } from "react";
import { FaArrowCircleDown } from "react-icons/fa";
import Header from "../Header.tsx";  
import "../../Landing.css";
export default function Introduction({ id }: { id: string }) {
  const setScroll = () => {
    const el = document.getElementById('widget-list');
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
        <Header />
        <div className="introduction-content" style={styles.introductionContent}>
          <div style={styles.hello} ref={refHello}>
            Hello!
          </div>
          <div style={styles.introtext}>I’m Daria Hostieva, a full-stack software engineer </div>
          <div>Welcome to my personal website!</div>
        </div>
          
          <div className="learn-more" style={styles.learnMore} onClick={() => setScroll()}>
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
    transform: "translateY(-20%)",
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
    marginBottom: "40px",
  },
};
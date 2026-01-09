import React, { Component } from "react";
export default function () {
    return (
      <div>
        <div style = {styles.block}>
            <div style = {styles.hello}>Hello!</div>
            <div style = {styles.introtext}>I’m Daria Hostieva, a full-stack software engineer. Welcome to my personal website. </div>
        </div>
      </div>  
    )
}

const styles = {
  block: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },  
  hello: {
    paddingTop: "30px",
    fontSize: "100px",
    fontWeight: "bold",
    //fontFamily: "Playwrite US Trad Guides",
  },
  introtext: {
   // display: "none",
  },
};
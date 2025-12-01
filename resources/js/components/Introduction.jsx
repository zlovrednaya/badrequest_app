import React, { Component } from "react";
export default function () {
    return (
        <div style={styles.block}>
            <div style={styles.hello}>Hello!</div>
            <div>I'm Daria Hostieva. I'm fullstack sotftware engineer. And this is my introduction web site </div>
        </div>
    )
}

const styles = {
  block: {
    display: "flex",
    justifyContent: "center",
  },  
  hello: {
    fontSize: "100px",
    fontWeight: "bold",
    //fontFamily: "Playwrite US Trad Guides",
  },
};
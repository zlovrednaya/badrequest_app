import React, { Component } from "react";
import PDFButton from "./elements/PDFButton";


export default function Header() {
  return (
    <header style = {styles.header}>
      <div style = {styles.logo}>Daria's Widget Factory</div>
      <nav style = {styles.nav}>
         <a class = "py-2" style = {styles.link} href="#about">About</a>
         <a class = "py-2" style = {styles.link} href="#contact">Contact</a>
        <PDFButton 
          pdfUrl = "http://127.0.0.1:8000/storage/CV_Daria_Hostieva_FullStack_Engineer.pdf"
          label = "CV"
        />
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    color: "#000",
    padding: "0 0 10px",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  nav: {
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "#000",
    textDecoration: "none",
    fontSize: "16px",
  },
};
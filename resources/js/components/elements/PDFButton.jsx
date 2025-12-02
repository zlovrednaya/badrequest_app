import React, { Component } from "react";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

function PDFButton({ pdfUrl, label = "CV" }) {
  const handleClick = () => {
    window.open(pdfUrl, "_blank"); // open PDF in new tab
  };

  return (
    <div
      onClick={handleClick}
      className="px-4 py-2 bg-black text-white hover:bg-neutral-700 cursor-pointer"
    >
      {label}
    </div>
  );
}

export default PDFButton;
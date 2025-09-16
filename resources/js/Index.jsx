import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from 'react';
import Main from "./Main";
import axios from 'axios';
import '../css/app.css'; 

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <StrictMode>
      <Main />
    </StrictMode>
);
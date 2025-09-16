import React, { Component } from "react";
import * as Forms from "../forms"; 

function WidgetForm({ widget, onClose }) {
  const FormComponent = Forms[widget.id]; 
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${widget.name} settings saved!`);
    onClose();
  };

  return (
    <FormComponent onClose={onClose} />
  );
}

export default WidgetForm;
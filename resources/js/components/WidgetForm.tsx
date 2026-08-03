import React, { Component } from "react";
import * as Forms from "../forms";
import type { Widget } from "./WidgetList";

type BaseWidgetFormProps = {
  widget: Widget,
  onClose: () => void,
  id?: string
};

function WidgetForm({ widget, onClose, id }: BaseWidgetFormProps) {
  const FormComponent = Forms[widget.id as keyof typeof Forms];
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`${widget.name} settings saved!`);
    onClose();
  };

  return (
    <FormComponent widget={widget} onClose={onClose} />
  );
}

export default WidgetForm;
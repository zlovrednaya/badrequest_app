import React, { Component } from "react";
import WidgetList from "./components/WidgetList";
import WidgetForm from "./components/WidgetForm";
import Header from "./components/Header";
import Introduction from "./components/Introduction";
import { useState } from "react";

function Main() {
  const [selectedWidget, setSelectedWidget] = useState(null);

  const widgets = [
    { id: "AviationStack", name: "AviationStack", description: "Subscribe to your flight" },
    { id: "BaseWidget", name: "BaseWidget", description: "Default widget form" },
    { id: "AbstractAnimationWidget", name: "AbstractAnimationWidget", description: "animation patterns" },
  ];

  return (
    <div className = "p-6">
      <Header/>
      <Introduction/>
      <WidgetList
        widgets = {widgets}
        onSelect = {setSelectedWidget}
      />

      {selectedWidget && (
        <WidgetForm
          widget = {selectedWidget}
          onClose = {() => setSelectedWidget(null)}
        />
      )}
    </div>
  );
}

export default Main;
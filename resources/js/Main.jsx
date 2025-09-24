import React, { Component } from "react";
import WidgetList from "./components/WidgetList";
import WidgetForm from "./components/WidgetForm";
import { useState } from "react";

function Main() {
  const [selectedWidget, setSelectedWidget] = useState(null);

  const widgets = [
    { id: "AviationStack", name: "AviationStack", description: "Subscribe to your flight" },
    { id: "BaseWidget", name: "BaseWidget", description: "Default widget form" },
  ];

  return (
    <div className = "p-6">
      <h1 className = "text-2xl font-bold mb-4">Widgets</h1>

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
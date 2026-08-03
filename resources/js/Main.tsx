import React, { Component } from "react";
import WidgetList from "./components/WidgetList.tsx";
import WidgetForm from "./components/WidgetForm.tsx";
import WorkList from "./components/WorkList.tsx";
import Header from "./components/Header.tsx";
import Introduction from "./components/Introduction.tsx";
import About from "./components/About.tsx";
import { useState } from "react";


function Main() {
  const widgets = [
    { id: "AviationStack", name: "AviationStack", description: "Flight subscription allows you to receive a message when the plane is near the airport", logo:"aviation.jpg" },
    { id: "ChoresTracker", name: "ChoresTracker", description: "An app that helps you organize your life, earn rewards, and track your daily tasks.", logo: "chores_logo.svg" },
    { id: "BaseWidget", name: "BaseWidget", description: "Default widget form" },
    { id: "AbstractAnimationWidget", name: "AbstractAnimationWidget", description: "animation patterns" },
  ];

  type Widget = (typeof widgets)[number];
  const [selectedWidget, setSelectedWidget] = useState<Widget | null>(null);

  return (
    <div className="main-container">
      <Introduction id="page1"/>
      <WidgetList
        widgets = {widgets}
        onSelect = {setSelectedWidget}
      />
      {selectedWidget && (
        <WidgetForm
          widget = {selectedWidget as any}
          onClose = {() => setSelectedWidget(null)}
          id="page3"
        />
      )}
      <WorkList id="page4"/>
      <About id="page5"/>
    </div>
  );
}

export default Main;
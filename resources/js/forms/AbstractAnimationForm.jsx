import React, { Component } from "react";
import { animate, splitText, stagger } from 'animejs';
import { useEffect, useRef, useState } from 'react';
import WidgetList from "../components/WidgetList";


function AbstractAnimationForm({ widget, onClose }) {

  const [selectedWidget, setSelectedWidget] = useState(null);
  const handleSubmit = (e) => {
      e.preventDefault();
      alert(`${widget.name} settings saved!`);
      onClose();
  };
  const widgets = [
    { id: "CatchTheBall", name: "", description: "Pattern #1" },
    { id: "BaseWidget", name: "", description: "Pattern #2" },
  ];

  useEffect(() => {
    const $selector = document.querySelectorAll('#animatedHeader');
   
    const { chars } = splitText($selector, {
      words: false,
      chars: true,
    });

    animate(chars, {
      y: [
        { to: '-0.75rem', ease: 'outExpo', duration: 500 },
        { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
      ],
      delay: stagger(50),
      ease: 'inOutCirc',
      loopDelay: 1000,
    });
 
  }, []);
    
  return (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40">
    <div className="bg-white p-6 rounded-xl shadow-lg w-2xl min-h-120 relative">
      <h2 className="text-xl font-bold mb-4" id="animatedHeader">
        {widget.name}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <WidgetList
          widgets = {widgets}
          onSelect = {setSelectedWidget}
        />
        <div className="small row"></div>
      </form>
      <div className="gap-2 close-btn-container rounded-xl absolute">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded cursor-pointer close-btn"
          >
          </button>
        </div>
    </div>
  </div>
);

}
export default AbstractAnimationForm;
import React, { Component } from "react";
import { animate, splitText, stagger } from 'animejs';
import { useEffect, useRef, useState } from 'react';


function AbstractAnimationForm({ widget, onClose }) {

  const handleSubmit = (e) => {
      e.preventDefault();
      alert(`${widget.name} settings saved!`);
      onClose();
  };

  useEffect(() => {
    const $demo = document.querySelectorAll('#animatedHeader');
   
    const { chars } = splitText($demo, {
      chars: { wrap: 'clip' },
    });

    animate(chars, {
      y: ['85%', '0%'],
      duration: 750,
      ease: 'out(3)',
    });
 
  }, []);
  

  

  return (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40">
    <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
      <h2 className="text-xl font-bold mb-4" id="animatedHeader">
        {widget.name} Settings
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="large centered row">
          <p className="text-xl">Split text by chars.文字ごとに分割します。</p>
        </div>
        <div className="small row"></div>
        
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  </div>
);

}
export default AbstractAnimationForm;
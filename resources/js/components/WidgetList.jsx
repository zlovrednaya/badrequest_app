import React, { Component } from "react";

function WidgetList({ widgets, onSelect }) {
  const baseLogoUrl = window.location.origin + "/storage/";
  return (
    <div>
      <div className="widget-title">Widgets</div>
      <div className="grid grid-cols-3 gap-4 widget-list">
        {widgets.map((widget) => (
          <div
            id={widget.id}
            key={widget.id}
            onClick={() => onSelect(widget)}
            className="p-4 w-60 h-70 border rounded-md shadow cursor-pointer hover:bg-gray-50"
          >
            <h2 className="font-semibold">{widget.name}</h2>
            <p className="text-sm text-gray-400">{widget.description}</p>
            { widget.logo && (
              <div className="widget-list-form-with-logo">
                <hr />
                <div className="widget-list-logo-container">
                  <img src={`${baseLogoUrl + widget.logo}`}/>
                </div>
              </div>)  
            }
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default WidgetList;
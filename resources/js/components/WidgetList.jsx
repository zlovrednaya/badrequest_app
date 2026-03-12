import React, { Component } from "react";

function WidgetList({ widgets, onSelect }) {
  return (
    <div>
      <div className="title-widget">Widgets</div>
      <div className="grid grid-cols-3 gap-4">
        {widgets.map((widget) => (
          <div
            id={widget.id}
            key={widget.id}
            onClick={() => onSelect(widget)}
            className="p-4 w-60 h-70 border rounded-md shadow cursor-pointer hover:bg-gray-50"
          >
            <h2 className="font-semibold">{widget.name}</h2>
            <p className="text-sm text-gray-400">{widget.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WidgetList;
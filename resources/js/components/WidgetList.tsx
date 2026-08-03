import React, { Component } from "react";

export type Widget = {
  id: string,
  name: string,
  description: string,
  logo?: string
}
export type WidgetListProps = {
  widgets: Widget[],
  onSelect: (widget: Widget) => void
};
function WidgetList({ widgets, onSelect }: WidgetListProps) {
  const baseLogoUrl = window.location.origin + "/storage/";
  return (
    <div className="page-block widgets-tab" id="page2">
      <div className="widget-title">Projects</div>
      <div className="grid grid-cols-3 gap-4 widget-list">
        {widgets.map((widget) => (
          <div
            id={widget.id}
            key={widget.id}
            onClick={() => onSelect(widget)}
            className="widget-item p-4 w-60 h-60 rounded-md shadow cursor-pointer hover:bg-gray-50"
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
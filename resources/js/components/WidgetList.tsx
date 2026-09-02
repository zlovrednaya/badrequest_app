import React, { Component } from "react";
import { FaReact } from "react-icons/fa";
import { FaPhp } from "react-icons/fa";
import { FaLaravel } from "react-icons/fa";
import { SiPostgresql } from "react-icons/si";
import { SiTypescript } from "react-icons/si";
export type Widget = {
  id: string,
  name: string,
  description: string,
  logo?: string,
  technologies?: string[],
}
export type WidgetListProps = {
  id: string,
  widgets: Widget[],
  onSelect: (widget: Widget) => void
};

const TECHNOLOGIES: Record<string, React.ComponentType> = {
  "ReactJS": FaReact ,
  "TypeScript": SiTypescript,
  "Laravel": FaLaravel,
  "PostgreSQL": SiPostgresql,
};
function WidgetList({ id, widgets, onSelect }: WidgetListProps) {
  const baseLogoUrl = window.location.origin + "/storage/";
  return (
    <div className="page-block widgets-tab" id={id}>
      <div className="widget-title">Projects</div>
      <div className="grid grid-cols-3 gap-4 widget-list">
        {widgets.map((widget) => (
          <div
            id={widget.id}
            key={widget.id}
            onClick={() => onSelect(widget)}
            className="widget-item p-4 rounded-md shadow cursor-pointer hover:bg-gray-50"
          >
            <h2 className="font-semibold">{widget.name}</h2>
            <p className="widget-item-description text-sm text-gray-400">{widget.description}</p>
            { widget.logo && (
              <div className="widget-list-form-with-logo">
                <hr />
                <div className="widget-list-logo-container">
                  <img src={`${baseLogoUrl + widget.logo}`}/>
                </div>     
              </div>)  
            }

            {widget.technologies && widget.technologies.length > 0 && (
              <div className="widget-technologies">
                <div className="widget-technologies-list">
                  {widget.technologies.map((techName, index) => {
                    const Icon = TECHNOLOGIES[techName];
                    return Icon ? <span key={index} className="technology-icon"><Icon /></span> : null;
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WidgetList;
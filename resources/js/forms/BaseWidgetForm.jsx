// component consists of a simple integration form, including an API key button and a URL
import React, { Component } from "react";

function BaseWidgetForm({ widget, onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${widget.name} settings saved!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {widget.name} Settings
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">API Key</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              placeholder="Enter API Key"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Endpoint</label>
            <input
              type="url"
              className="w-full border p-2 rounded"
              placeholder="https://api.example.com"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BaseWidgetForm;
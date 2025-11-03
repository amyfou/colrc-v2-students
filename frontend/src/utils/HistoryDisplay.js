import React from "react";
import { Card, Label, Header } from "semantic-ui-react";


// Function to render a single history entry
function HistoryEntry(entry, index, fields) {


}

// Main component
function HistoryDisplay({ historyData, fields, title, loading, error }) {
  // Show loading message
  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>{title || "History"}</h2>
        <div>Loading history...</div>
      </div>
    );
  }

  // Show error message
  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>{title || "History"}</h2>
        <div style={{ color: "red" }}>
          Something went wrong: {error.message || "Unknown error"}
        </div>
      </div>
    );
  }

  // Show message if no history
  if (!historyData || historyData.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>{title || "History"}</h2>
        <p>No history found.</p>
      </div>
    );
  }

  // Render all history entries
  return (
    <div style={{ padding: "20px" }}>
      <h2>{title || "History"}</h2>
      {historyData.map((entry, index) => {
        return HistoryEntry(entry, index, fields);
      })}
    </div>
  );
}

export default HistoryDisplay;

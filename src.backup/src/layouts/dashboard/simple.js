import React from "react";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is the fire incident management dashboard.</p>
      
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        <div style={{ flex: "1 1 200px", padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "8px" }}>
          <h3>Active Incidents</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>12</p>
          <p>-12% than last month</p>
        </div>
        
        <div style={{ flex: "1 1 200px", padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "8px" }}>
          <h3>High Priority</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>5</p>
          <p>+3% than last month</p>
        </div>
        
        <div style={{ flex: "1 1 200px", padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "8px" }}>
          <h3>Sensors Triggered</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>24</p>
          <p>-1% than yesterday</p>
        </div>
        
        <div style={{ flex: "1 1 200px", padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "8px" }}>
          <h3>Avg Response Time</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>8 min</p>
          <p>-10% than last week</p>
        </div>
      </div>
      
      <div style={{ marginTop: "30px" }}>
        <h2>Recent High Priority Incidents</h2>
        <ul>
          <li>123 Main St - Building fire on 3rd floor</li>
          <li>456 Oak Ave - Gas leak reported</li>
          <li>789 Pine Rd - Smoke detected in basement</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard; 
import React from "react";

function Trending() {
  return (
    <div>
      <h1>Trending Data</h1>
      <p>Analyze fire incident trends and patterns.</p>
      
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        <div style={{ flex: "1 1 400px", padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "8px" }}>
          <h3>Incidents by Month</h3>
          <div style={{ height: "200px", display: "flex", alignItems: "flex-end", gap: "10px", marginTop: "20px" }}>
            {[50, 40, 60, 70, 55, 75, 65].map((value, index) => (
              <div key={index} style={{ 
                flex: 1, 
                height: `${value * 2}px`, 
                backgroundColor: "#1976d2", 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "flex-end", 
                alignItems: "center",
                borderRadius: "4px 4px 0 0"
              }}>
                <div style={{ color: "white", fontWeight: "bold" }}>{value}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
          </div>
        </div>
        
        <div style={{ flex: "1 1 400px", padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "8px" }}>
          <h3>Response Time (Minutes)</h3>
          <div style={{ height: "200px", display: "flex", alignItems: "flex-end", gap: "10px", marginTop: "20px" }}>
            {[15, 20, 12, 10, 18, 8, 5].map((value, index) => (
              <div key={index} style={{ 
                flex: 1, 
                height: `${value * 8}px`, 
                backgroundColor: "#4caf50", 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "flex-end", 
                alignItems: "center",
                borderRadius: "4px 4px 0 0"
              }}>
                <div style={{ color: "white", fontWeight: "bold" }}>{value}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trending; 
import React from "react";

function Cameras() {
  const cameras = [
    {
      id: "CAM-001",
      location: "Main Entrance",
      status: "Online",
      lastChecked: "2023-06-15",
    },
    {
      id: "CAM-002",
      location: "Parking Lot",
      status: "Online",
      lastChecked: "2023-06-14",
    },
    {
      id: "CAM-003",
      location: "Warehouse",
      status: "Offline",
      lastChecked: "2023-06-10",
    },
    {
      id: "CAM-004",
      location: "Office Building",
      status: "Online",
      lastChecked: "2023-06-15",
    },
    {
      id: "CAM-005",
      location: "Loading Dock",
      status: "Maintenance",
      lastChecked: "2023-06-12",
    },
  ];

  return (
    <div>
      <h1>Security Cameras</h1>
      <p>Monitor and manage security cameras for fire detection.</p>

      <div style={{ marginTop: "20px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {cameras.map((camera) => (
            <div
              key={camera.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "180px",
                  backgroundColor: "#e0e0e0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {camera.status === "Online" ? (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "48px", color: "#757575" }}>📹</div>
                    <div style={{ color: "#4caf50", fontWeight: "bold" }}>
                      LIVE
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "48px", color: "#757575" }}>📹</div>
                    <div style={{ color: "#f44336", fontWeight: "bold" }}>
                      {camera.status.toUpperCase()}
                    </div>
                  </div>
                )}
              </div>
              <div style={{ padding: "15px" }}>
                <h3 style={{ margin: "0 0 10px 0" }}>{camera.location}</h3>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>{camera.id}</span>
                  <span
                    style={{
                      padding: "3px 8px",
                      borderRadius: "4px",
                      backgroundColor:
                        camera.status === "Online"
                          ? "#e8f5e9"
                          : camera.status === "Offline"
                          ? "#ffebee"
                          : "#fff8e1",
                      color:
                        camera.status === "Online"
                          ? "#2e7d32"
                          : camera.status === "Offline"
                          ? "#c62828"
                          : "#ff8f00",
                    }}
                  >
                    {camera.status}
                  </span>
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "14px",
                    color: "#757575",
                  }}
                >
                  Last checked: {camera.lastChecked}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cameras;

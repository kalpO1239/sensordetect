import React from "react";

function Incidents() {
  const incidents = [
    {
      id: "INC-001",
      location: "123 Main St",
      description: "Building fire on 3rd floor",
      status: "Active",
      priority: "High",
    },
    {
      id: "INC-002",
      location: "456 Oak Ave",
      description: "Gas leak reported",
      status: "Active",
      priority: "High",
    },
    {
      id: "INC-003",
      location: "789 Pine Rd",
      description: "Smoke detected in basement",
      status: "Active",
      priority: "Medium",
    },
    {
      id: "INC-004",
      location: "101 Elm St",
      description: "Fire alarm triggered",
      status: "Resolved",
      priority: "Low",
    },
    {
      id: "INC-005",
      location: "202 Maple Dr",
      description: "Electrical fire in kitchen",
      status: "Active",
      priority: "Medium",
    },
  ];

  return (
    <div>
      <h1>Fire Incidents</h1>
      <p>Manage and track all fire incidents in the system.</p>

      <div style={{ marginTop: "20px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  border: "1px solid #ddd",
                }}
              >
                ID
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  border: "1px solid #ddd",
                }}
              >
                Location
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  border: "1px solid #ddd",
                }}
              >
                Description
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  border: "1px solid #ddd",
                }}
              >
                Status
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  border: "1px solid #ddd",
                }}
              >
                Priority
              </th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => (
              <tr key={incident.id}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {incident.id}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {incident.location}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {incident.description}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  <span
                    style={{
                      padding: "5px 10px",
                      borderRadius: "4px",
                      backgroundColor:
                        incident.status === "Active" ? "#ffecb3" : "#e8f5e9",
                      color:
                        incident.status === "Active" ? "#ff8f00" : "#2e7d32",
                    }}
                  >
                    {incident.status}
                  </span>
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  <span
                    style={{
                      padding: "5px 10px",
                      borderRadius: "4px",
                      backgroundColor:
                        incident.priority === "High"
                          ? "#ffebee"
                          : incident.priority === "Medium"
                          ? "#fff8e1"
                          : "#e8f5e9",
                      color:
                        incident.priority === "High"
                          ? "#c62828"
                          : incident.priority === "Medium"
                          ? "#ff8f00"
                          : "#2e7d32",
                    }}
                  >
                    {incident.priority}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Incidents;

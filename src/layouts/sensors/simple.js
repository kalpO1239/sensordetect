import React from "react";

function Sensors() {
  const sensors = [
    {
      id: "SEN-001",
      location: "123 Main St, Floor 1",
      type: "Smoke",
      status: "Active",
      lastChecked: "2023-06-15",
    },
    {
      id: "SEN-002",
      location: "123 Main St, Floor 2",
      type: "Heat",
      status: "Active",
      lastChecked: "2023-06-10",
    },
    {
      id: "SEN-003",
      location: "456 Oak Ave, Basement",
      type: "Gas",
      status: "Maintenance",
      lastChecked: "2023-05-20",
    },
    {
      id: "SEN-004",
      location: "789 Pine Rd, Kitchen",
      type: "Smoke",
      status: "Active",
      lastChecked: "2023-06-12",
    },
    {
      id: "SEN-005",
      location: "101 Elm St, Garage",
      type: "Carbon Monoxide",
      status: "Active",
      lastChecked: "2023-06-01",
    },
  ];

  return (
    <div>
      <h1>Fire Sensors</h1>
      <p>Monitor and manage all fire detection sensors.</p>

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
                Type
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
                Last Checked
              </th>
            </tr>
          </thead>
          <tbody>
            {sensors.map((sensor) => (
              <tr key={sensor.id}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {sensor.id}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {sensor.location}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {sensor.type}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  <span
                    style={{
                      padding: "5px 10px",
                      borderRadius: "4px",
                      backgroundColor:
                        sensor.status === "Active" ? "#e8f5e9" : "#ffecb3",
                      color: sensor.status === "Active" ? "#2e7d32" : "#ff8f00",
                    }}
                  >
                    {sensor.status}
                  </span>
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {sensor.lastChecked}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Sensors;

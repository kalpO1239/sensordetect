import React, { useState } from "react";

function PhoneCalls() {
  const [filter, setFilter] = useState("all");

  const calls = [
    {
      id: "CALL-001",
      caller: "John Smith",
      phone: "555-123-4567",
      timestamp: "2023-06-15 14:30",
      location: "123 Main St, Apartment 4B",
      description: "Reported smoke coming from neighbor's apartment",
      status: "Active",
      priority: "High",
    },
    {
      id: "CALL-002",
      caller: "Jane Doe",
      phone: "555-987-6543",
      timestamp: "2023-06-15 14:35",
      location: "456 Oak Ave",
      description: "Fire alarm going off in building",
      status: "Dispatched",
      priority: "Medium",
    },
    {
      id: "CALL-003",
      caller: "Bob Johnson",
      phone: "555-456-7890",
      timestamp: "2023-06-15 14:40",
      location: "789 Pine Rd",
      description: "Smell of gas in basement",
      status: "Active",
      priority: "High",
    },
    {
      id: "CALL-004",
      caller: "Sarah Williams",
      phone: "555-789-0123",
      timestamp: "2023-06-15 14:45",
      location: "101 Elm St",
      description: "Small kitchen fire, contained",
      status: "Resolved",
      priority: "Low",
    },
    {
      id: "CALL-005",
      caller: "Michael Brown",
      phone: "555-234-5678",
      timestamp: "2023-06-15 14:50",
      location: "202 Maple Dr",
      description: "Electrical fire in garage",
      status: "Dispatched",
      priority: "Medium",
    },
  ];

  const filteredCalls =
    filter === "all"
      ? calls
      : calls.filter(
          (call) => call.status.toLowerCase() === filter.toLowerCase(),
        );

  return (
    <div>
      <h1>Emergency Phone Calls</h1>
      <p>Track and manage emergency calls related to fire incidents.</p>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => setFilter("all")}
            style={{
              padding: "8px 16px",
              backgroundColor: filter === "all" ? "#1976d2" : "#f0f0f0",
              color: filter === "all" ? "white" : "black",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            All Calls
          </button>
          <button
            onClick={() => setFilter("active")}
            style={{
              padding: "8px 16px",
              backgroundColor: filter === "active" ? "#1976d2" : "#f0f0f0",
              color: filter === "active" ? "white" : "black",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("dispatched")}
            style={{
              padding: "8px 16px",
              backgroundColor: filter === "dispatched" ? "#1976d2" : "#f0f0f0",
              color: filter === "dispatched" ? "white" : "black",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Dispatched
          </button>
          <button
            onClick={() => setFilter("resolved")}
            style={{
              padding: "8px 16px",
              backgroundColor: filter === "resolved" ? "#1976d2" : "#f0f0f0",
              color: filter === "resolved" ? "white" : "black",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Resolved
          </button>
        </div>
      </div>

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
                Caller
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  border: "1px solid #ddd",
                }}
              >
                Time
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
            {filteredCalls.map((call) => (
              <tr key={call.id}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {call.id}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  <div>{call.caller}</div>
                  <div style={{ fontSize: "14px", color: "#757575" }}>
                    {call.phone}
                  </div>
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {call.timestamp}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {call.location}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {call.description}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  <span
                    style={{
                      padding: "5px 10px",
                      borderRadius: "4px",
                      backgroundColor:
                        call.status === "Active"
                          ? "#ffecb3"
                          : call.status === "Dispatched"
                          ? "#e3f2fd"
                          : "#e8f5e9",
                      color:
                        call.status === "Active"
                          ? "#ff8f00"
                          : call.status === "Dispatched"
                          ? "#1565c0"
                          : "#2e7d32",
                    }}
                  >
                    {call.status}
                  </span>
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  <span
                    style={{
                      padding: "5px 10px",
                      borderRadius: "4px",
                      backgroundColor:
                        call.priority === "High"
                          ? "#ffebee"
                          : call.priority === "Medium"
                          ? "#fff8e1"
                          : "#e8f5e9",
                      color:
                        call.priority === "High"
                          ? "#c62828"
                          : call.priority === "Medium"
                          ? "#ff8f00"
                          : "#2e7d32",
                    }}
                  >
                    {call.priority}
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

export default PhoneCalls;

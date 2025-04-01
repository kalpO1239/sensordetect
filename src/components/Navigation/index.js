import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav
      style={{
        background: "#333",
        padding: "10px",
        marginBottom: "20px",
      }}
    >
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          gap: "20px",
          margin: 0,
          padding: 0,
        }}
      >
        <li>
          <Link
            to="/dashboard"
            style={{ color: "white", textDecoration: "none" }}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/incidents"
            style={{ color: "white", textDecoration: "none" }}
          >
            Incidents
          </Link>
        </li>
        <li>
          <Link
            to="/sensors"
            style={{ color: "white", textDecoration: "none" }}
          >
            Sensors
          </Link>
        </li>
        <li>
          <Link to="/test" style={{ color: "white", textDecoration: "none" }}>
            Test
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;

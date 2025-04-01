import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Create the context
const IncidentContext = createContext();

// Create a provider component
export function IncidentProvider({ children }) {
  const [incidents, setIncidents] = useState([]);

  // Log incidents whenever they change (for debugging)
  useEffect(() => {
    console.log("Incidents in context:", incidents);
  }, [incidents]);

  // Add a new incident
  const addIncident = (incident) => {
    console.log("Adding incident:", incident);
    // Ensure we don't add duplicates
    setIncidents((prevIncidents) => {
      // Check if incident with same ID already exists
      const exists = prevIncidents.some((inc) => inc.id === incident.id);
      if (exists) {
        console.log("Incident already exists, not adding duplicate");
        return prevIncidents;
      }

      // Add new incident at the beginning of the array
      console.log("Adding new incident to context");
      return [incident, ...prevIncidents];
    });
  };

  // Clear all incidents
  const clearIncidents = () => {
    setIncidents([]);
  };

  return (
    <IncidentContext.Provider
      value={{ incidents, addIncident, clearIncidents }}
    >
      {children}
    </IncidentContext.Provider>
  );
}

// Add PropTypes validation
IncidentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use the incident context
export function useIncidents() {
  const context = useContext(IncidentContext);
  if (!context) {
    throw new Error("useIncidents must be used within an IncidentProvider");
  }
  return context;
}

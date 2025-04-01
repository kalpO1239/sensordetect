import { useState } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import { Grid } from "@mui/material";

export default function SimulatorComponent() {
  const [selectedOptions, setSelectedOptions] = useState({
    n5Sensor: false,
    warning: false,
    maintenance: false,
    cameraDetection: false,
    phoneCall: false,
  });

  const [dashboardData, setDashboardData] = useState(null);
  const [saveStatus, setSaveStatus] = useState({ status: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    const updatedOptions = {
      ...selectedOptions,
      [name]: checked,
    };

    setSelectedOptions(updatedOptions);

    // Generate JSON data for the dashboard
    if (checked) {
      const timestamp = new Date().toISOString();
      let newDashboardData;

      switch (name) {
        case "n5Sensor":
          newDashboardData = {
            eventId: `FA-${Date.now()}`,
            eventType: "FIRE_ALARM",
            source: "N5_SENSOR",
            severity: "HIGH",
            location: "Building A, Floor 3",
            timestamp,
            details: "Fire alarm triggered by N5 smoke detection sensor",
            actionRequired: "Immediate evacuation",
          };
          break;
        case "warning":
          newDashboardData = {
            eventId: `WARN-${Date.now()}`,
            eventType: "WARNING",
            source: "MONITORING_SYSTEM",
            severity: "MEDIUM",
            location: "Building B, Floor 2",
            timestamp,
            details: "Elevated temperature detected in server room",
            actionRequired: "Investigate immediately",
          };
          break;
        case "maintenance":
          newDashboardData = {
            eventId: `MAINT-${Date.now()}`,
            eventType: "MAINTENANCE",
            source: "SYSTEM_STATUS",
            severity: "LOW",
            location: "All Buildings",
            timestamp,
            details: "System under scheduled maintenance",
            actionRequired: "No action required until 18:00",
          };
          break;
        case "cameraDetection":
          newDashboardData = {
            eventId: `CAM-${Date.now()}`,
            eventType: "FIRE_INCIDENT",
            source: "SECURITY_CAMERA",
            severity: "CRITICAL",
            location: "Parking Garage, Level P2",
            timestamp,
            details: "Camera AI detected smoke and flames",
            actionRequired: "Emergency response dispatched",
          };
          break;
        case "phoneCall":
          newDashboardData = {
            eventId: `CALL-${Date.now()}`,
            eventType: "FIRE_INCIDENT",
            source: "MANUAL_REPORT",
            severity: "CRITICAL",
            location: "Cafeteria, Ground Floor",
            timestamp,
            details: "Phone call received reporting fire in kitchen area",
            actionRequired:
              "Emergency services contacted, evacuation in progress",
          };
          break;
        default:
          newDashboardData = null;
      }

      setDashboardData(newDashboardData);
      setSaveStatus({ status: "", message: "" });
    } else {
      // If unchecked, clear the dashboard data
      setDashboardData(null);
    }
  };

  // Helper function to get severity class
  const getSeverityClass = (severity) => {
    switch (severity) {
      case "LOW":
        return "bg-blue-100 text-blue-800";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800";
      case "HIGH":
        return "bg-orange-100 text-orange-800";
      case "CRITICAL":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Reset all selections
  const resetSimulator = () => {
    setSelectedOptions({
      n5Sensor: false,
      warning: false,
      maintenance: false,
      cameraDetection: false,
      phoneCall: false,
    });
    setDashboardData(null);
    setSaveStatus({ status: "", message: "" });
  };

  // Save to DynamoDB
  const saveToDynamoDB = async () => {
    if (!dashboardData) return;

    setIsLoading(true);
    setSaveStatus({ status: "loading", message: "Saving to DynamoDB..." });

    try {
      // In a real implementation, you would use AWS SDK for JavaScript
      // Here we're simulating an API call to a backend service
      // that would handle the DynamoDB operations

      // Simulated API call
      await fetch("/api/save-to-dynamodb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tableName: "FireAlarmEvents",
          item: dashboardData,
        }),
      });
      // Simulate successful API response
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate successful DB insertion
      setSaveStatus({
        status: "success",
        message:
          "Event ${dashboardData.eventId} successfully saved to DynamoDB.",
      });

      // In a real implementation, you would check the response and handle errors
      // if (!response.ok) {
      //   throw new Error('Failed to save to DynamoDB');
      // }
    } catch (error) {
      console.error("Error saving to DynamoDB:", error);
      setSaveStatus({
        status: "error",
        message: `Failed to save to DynamoDB: ${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MDBox>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={8}>
          <div>
            {/* Simulator Panel */}
            <div>
              <MDBox display="flex" alignItems="center">
                Simulator
              </MDBox>
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="n5Sensor"
                    name="n5Sensor"
                    checked={selectedOptions.n5Sensor}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="n5Sensor" className="ml-2 text-gray-700">
                    Fire Alarm from N5 Sensor
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="warning"
                    name="warning"
                    checked={selectedOptions.warning}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="warning" className="ml-2 text-gray-700">
                    Warning
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="maintenance"
                    name="maintenance"
                    checked={selectedOptions.maintenance}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="maintenance" className="ml-2 text-gray-700">
                    Under Maintenance
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="cameraDetection"
                    name="cameraDetection"
                    checked={selectedOptions.cameraDetection}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="cameraDetection"
                    className="ml-2 text-gray-700"
                  >
                    Camera detected Fire Incident
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="phoneCall"
                    name="phoneCall"
                    checked={selectedOptions.phoneCall}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="phoneCall" className="ml-2 text-gray-700">
                    Phone call received with Fire Incident
                  </label>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={resetSimulator}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  Reset
                </button>

                <button
                  onClick={saveToDynamoDB}
                  disabled={!dashboardData || isLoading}
                  className={`px-4 py-2 rounded transition-colors ${
                    !dashboardData || isLoading
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {isLoading ? "Saving..." : "Save to DynamoDB"}
                </button>
              </div>

              {saveStatus.message && (
                <div
                  className={`mt-4 p-3 rounded ${
                    saveStatus.status === "success"
                      ? "bg-green-100 text-green-800"
                      : saveStatus.status === "error"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {saveStatus.message}
                </div>
              )}
            </div>
            <br></br>
            <br></br>

            {/* Dashboard Display */}
            <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Dashboard
              </h2>

              {dashboardData ? (
                <div>
                  <div className="flex justify-between mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityClass(
                        dashboardData.severity,
                      )}`}
                    >
                      {dashboardData.severity}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {new Date(dashboardData.timestamp).toLocaleString()}
                    </span>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-medium text-gray-800">
                        {dashboardData.eventType}
                      </h3>
                      <span className="text-xs font-mono text-gray-500">
                        {dashboardData.eventId}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Source</p>
                        <p className="font-medium">{dashboardData.source}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium">{dashboardData.location}</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Details</p>
                      <p className="font-medium">{dashboardData.details}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Action Required</p>
                      <p className="font-medium">
                        {dashboardData.actionRequired}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg overflow-auto">
                    <h3 className="text-sm font-mono mb-2 text-gray-700">
                      JSON Output:
                    </h3>
                    <pre className="text-xs font-mono">
                      {JSON.stringify(dashboardData, null, 2)}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <p>Select an option from the simulator to view data</p>
                </div>
              )}
            </div>
          </div>
          <br></br>
          <br></br>
        </Grid>
      </Grid>
    </MDBox>
  );
}

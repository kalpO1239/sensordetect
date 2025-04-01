import { useState } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

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

  const [scenario, setScenario] = useState("");
  const [location, setLocation] = useState("");
  const [intensity, setIntensity] = useState("");
  const [spreadRate, setSpreadRate] = useState("");
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [affectedSensors, setAffectedSensors] = useState([]);
  const [simulationLogs, setSimulationLogs] = useState([]);

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

  // Save to local storage
  const saveToDatabase = async () => {
    if (!dashboardData) return;

    setIsLoading(true);
    setSaveStatus({ status: "loading", message: "Saving to local storage..." });

    try {
      // Get existing data
      const existingData = JSON.parse(localStorage.getItem("fireIncidents") || "[]");
      
      // Add new data with timestamp
      const dataToSave = {
        id: `incident-${Date.now()}`,
        eventId: dashboardData.eventId,
        eventType: dashboardData.eventType,
        severity: dashboardData.severity,
        location: location || "Building A",
        details: dashboardData.message || "Fire incident detected",
        source: dashboardData.source,
        createdAt: new Date().toISOString(),
        timestamp: new Date().toISOString(),
        simulationParams: {
          scenario,
          location,
          intensity,
          spreadRate
        },
        affectedSensors
      };
      
      // Save updated data
      localStorage.setItem("fireIncidents", JSON.stringify([dataToSave, ...existingData]));
      
      setSaveStatus({
        status: "success",
        message: `Event ${dashboardData.eventId} successfully saved to local storage`
      });
    } catch (error) {
      console.error("Error saving to local storage:", error);
      setSaveStatus({
        status: "error",
        message: `Failed to save: ${error.message}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleScenarioChange = (event) => {
    setScenario(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleIntensityChange = (event) => {
    setIntensity(event.target.value);
  };

  const handleSpreadRateChange = (event) => {
    setSpreadRate(event.target.value);
  };

  const handleStartSimulation = () => {
    setIsSimulationRunning(true);
    
    // Generate mock affected sensors based on the scenario
    const mockSensors = [
      {
        id: "SNS-001",
        type: "Smoke Detector",
        location: location || "Building A",
        reading: "High smoke concentration"
      },
      {
        id: "SNS-002",
        type: "Heat Sensor",
        location: location || "Building A",
        reading: "Temperature: 180°F"
      },
      {
        id: "SNS-003",
        type: "CO Detector",
        location: location || "Building A",
        reading: "CO Level: 150 ppm"
      }
    ];
    
    setAffectedSensors(mockSensors);
    
    // Generate mock simulation logs
    const currentTime = new Date();
    const mockLogs = [
      {
        type: 'info',
        timestamp: new Date(currentTime.getTime() - 5000).toLocaleTimeString(),
        message: `Simulation started: ${scenario || 'Default'} scenario at ${location || 'Building A'}`
      },
      {
        type: 'alert',
        timestamp: new Date(currentTime.getTime() - 3000).toLocaleTimeString(),
        message: `Smoke detector SNS-001 triggered at ${location || 'Building A'}`
      },
      {
        type: 'alert',
        timestamp: new Date(currentTime.getTime() - 1000).toLocaleTimeString(),
        message: `Heat sensor SNS-002 reporting dangerous temperature levels`
      },
      {
        type: 'info',
        timestamp: currentTime.toLocaleTimeString(),
        message: `Alerting emergency response teams to ${location || 'Building A'}`
      }
    ];
    
    setSimulationLogs(mockLogs);
  };

  const handleStopSimulation = () => {
    setIsSimulationRunning(false);
    
    // Add a stop message to the logs
    const currentTime = new Date().toLocaleTimeString();
    setSimulationLogs([
      ...simulationLogs,
      {
        type: 'info',
        timestamp: currentTime,
        message: 'Simulation stopped by user'
      }
    ]);
  };

  return (
    <Card>
      <MDBox
        mx={2}
        mt={-3}
        py={3}
        px={2}
        variant="gradient"
        bgColor="error"
        borderRadius="lg"
        coloredShadow="error"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <MDTypography variant="h6" color="white">
          Fire Detection Simulator
        </MDTypography>
        <MDButton variant="gradient" color="dark" size="small" onClick={resetSimulator}>
          <Icon>refresh</Icon>&nbsp;Reset
        </MDButton>
      </MDBox>
      <MDBox p={3}>
      <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <MDBox p={2}>
                <MDTypography variant="h6" gutterBottom color="error">
                  Simulation Controls
                </MDTypography>
                <Divider sx={{ mb: 2, borderColor: 'rgba(0,0,0,0.1)' }} />
                <MDBox mb={2}>
                  <MDTypography variant="button" fontWeight="regular" color="text">
                    Select a scenario to simulate fire detection events
                  </MDTypography>
              </MDBox>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="scenario-select-label">Scenario</InputLabel>
                      <Select
                        labelId="scenario-select-label"
                        id="scenario-select"
                        value={scenario}
                        label="Scenario"
                        onChange={handleScenarioChange}
                        sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0,0,0,0.2)' } }}
                      >
                        <MenuItem value="kitchen">Kitchen Fire</MenuItem>
                        <MenuItem value="electrical">Electrical Fire</MenuItem>
                        <MenuItem value="chemical">Chemical Fire</MenuItem>
                        <MenuItem value="wildfire">Wildfire Approaching</MenuItem>
                        <MenuItem value="custom">Custom Scenario</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="location-select-label">Location</InputLabel>
                      <Select
                        labelId="location-select-label"
                        id="location-select"
                        value={location}
                        label="Location"
                        onChange={handleLocationChange}
                        sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0,0,0,0.2)' } }}
                      >
                        <MenuItem value="building-a">Building A</MenuItem>
                        <MenuItem value="building-b">Building B</MenuItem>
                        <MenuItem value="warehouse">Warehouse</MenuItem>
                        <MenuItem value="server-room">Server Room</MenuItem>
                        <MenuItem value="cafeteria">Cafeteria</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="intensity-select-label">Fire Intensity</InputLabel>
                      <Select
                        labelId="intensity-select-label"
                        id="intensity-select"
                        value={intensity}
                        label="Fire Intensity"
                        onChange={handleIntensityChange}
                        sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0,0,0,0.2)' } }}
                      >
                        <MenuItem value="low">Low</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                        <MenuItem value="critical">Critical</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="spread-select-label">Spread Rate</InputLabel>
                      <Select
                        labelId="spread-select-label"
                        id="spread-select"
                        value={spreadRate}
                        label="Spread Rate"
                        onChange={handleSpreadRateChange}
                        sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0,0,0,0.2)' } }}
                      >
                        <MenuItem value="slow">Slow</MenuItem>
                        <MenuItem value="moderate">Moderate</MenuItem>
                        <MenuItem value="fast">Fast</MenuItem>
                        <MenuItem value="explosive">Explosive</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                
                <MDBox mt={3}>
                  <MDTypography variant="button" fontWeight="medium" color="text" mb={1} display="block">
                    Event Types:
                  </MDTypography>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                    checked={selectedOptions.n5Sensor}
                    onChange={handleCheckboxChange}
                            name="n5Sensor"
                            sx={{ color: 'error.main', '&.Mui-checked': { color: 'error.main' } }}
                          />
                        }
                        label="N5 Sensor Alert"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                    checked={selectedOptions.warning}
                    onChange={handleCheckboxChange}
                            name="warning"
                            sx={{ color: 'warning.main', '&.Mui-checked': { color: 'warning.main' } }}
                          />
                        }
                        label="Warning Event"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                    checked={selectedOptions.cameraDetection}
                    onChange={handleCheckboxChange}
                            name="cameraDetection"
                            sx={{ color: 'error.main', '&.Mui-checked': { color: 'error.main' } }}
                          />
                        }
                        label="Camera Detection"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                    checked={selectedOptions.phoneCall}
                    onChange={handleCheckboxChange}
                            name="phoneCall"
                            sx={{ color: 'error.main', '&.Mui-checked': { color: 'error.main' } }}
                          />
                        }
                        label="Phone Call Report"
                      />
                    </Grid>
                  </Grid>
                </MDBox>
                
                <Divider sx={{ my: 2, borderColor: 'rgba(0,0,0,0.1)' }} />
                
                <MDBox display="flex" justifyContent="space-between">
                  <MDButton 
                    variant="gradient" 
                    color="error" 
                    onClick={handleStartSimulation}
                    disabled={isSimulationRunning}
                  >
                    <Icon>play_arrow</Icon>&nbsp;
                    Start Simulation
                  </MDButton>
                  <MDButton 
                    variant="outlined" 
                    color="dark" 
                    onClick={handleStopSimulation}
                    disabled={!isSimulationRunning}
                  >
                    <Icon>stop</Icon>&nbsp;
                    Stop Simulation
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <MDBox p={2}>
                <MDTypography variant="h6" gutterBottom color="error">
                  Simulation Status
                </MDTypography>
                <Divider sx={{ mb: 2, borderColor: 'rgba(0,0,0,0.1)' }} />
                <MDBox 
                  bgcolor={isSimulationRunning ? "error.light" : "background.paper"}
                  p={2}
                  borderRadius="lg"
                  mb={2}
                  sx={{ 
                    transition: 'background-color 0.3s ease',
                    border: '1px solid',
                    borderColor: isSimulationRunning ? 'error.main' : 'divider'
                  }}
                >
                  <MDTypography variant="button" fontWeight="bold" color={isSimulationRunning ? "error" : "text"}>
                    Status: {isSimulationRunning ? "SIMULATION ACTIVE" : "Idle"}
                  </MDTypography>
                  {isSimulationRunning && (
                    <MDBox mt={1}>
                      <MDTypography variant="caption" color="text">
                        Simulating {scenario || 'default'} scenario at {location || 'default location'} with {intensity || 'medium'} intensity
                      </MDTypography>
                    </MDBox>
                  )}
                </MDBox>
                
                {dashboardData && (
                  <MDBox 
                    bgcolor="grey.100" 
                    p={2} 
                    borderRadius="lg" 
                    mb={2}
                    border="1px solid"
                    borderColor="divider"
                  >
                    <MDTypography variant="button" fontWeight="bold" color="text" mb={1} display="block">
                      Event Data:
                    </MDTypography>
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        <MDTypography variant="caption" color="text" fontWeight="medium">
                          ID:
                        </MDTypography>
                      </Grid>
                      <Grid item xs={8}>
                        <MDTypography variant="caption" color="text">
                          {dashboardData.eventId}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={4}>
                        <MDTypography variant="caption" color="text" fontWeight="medium">
                          Type:
                        </MDTypography>
                      </Grid>
                      <Grid item xs={8}>
                        <MDTypography variant="caption" color="text">
                          {dashboardData.eventType}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={4}>
                        <MDTypography variant="caption" color="text" fontWeight="medium">
                          Severity:
                        </MDTypography>
                      </Grid>
                      <Grid item xs={8}>
                        <MDBox 
                          component="span" 
                          px={1} 
                          py={0.5} 
                          borderRadius="sm" 
                          bgcolor={
                            dashboardData.severity === "CRITICAL" ? "error.main" :
                            dashboardData.severity === "HIGH" ? "error.light" :
                            dashboardData.severity === "MEDIUM" ? "warning.main" : "info.main"
                          }
                          color="white"
                          fontSize="0.65rem"
                          fontWeight="medium"
                        >
                          {dashboardData.severity}
                        </MDBox>
                      </Grid>
                    </Grid>
                    <MDButton 
                      variant="text" 
                      color="info" 
                      size="small" 
                      onClick={saveToDatabase}
                      disabled={isLoading}
                      sx={{ mt: 1 }}
                    >
                      <Icon fontSize="small">save</Icon>&nbsp;
                      {isLoading ? "Saving..." : "Save to Local Storage"}
                    </MDButton>
                    {saveStatus.message && (
                      <MDTypography 
                        variant="caption" 
                        color={saveStatus.status === "success" ? "success" : "error"}
                        mt={1}
                        display="block"
                      >
                        {saveStatus.message}
                      </MDTypography>
                    )}
                  </MDBox>
                )}
                
                <MDBox>
                  <MDTypography variant="button" fontWeight="medium" color="text" mb={1} display="block">
                    Affected Sensors:
                  </MDTypography>
                  <List 
                    sx={{ 
                      bgcolor: 'background.paper', 
                      border: '1px solid', 
                      borderColor: 'divider',
                      borderRadius: 1,
                      maxHeight: '200px',
                      overflow: 'auto'
                    }}
                  >
                    {affectedSensors.map((sensor) => (
                      <ListItem key={sensor.id} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <Icon color="error" fontSize="small">warning</Icon>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <MDTypography variant="button" fontWeight="medium">
                              {sensor.id} - {sensor.type}
                            </MDTypography>
                          }
                          secondary={
                            <MDTypography variant="caption" color="text">
                              Location: {sensor.location} | Reading: {sensor.reading}
                            </MDTypography>
                          }
                        />
                      </ListItem>
                    ))}
                    {!affectedSensors.length && !isSimulationRunning && (
                      <ListItem>
                        <ListItemText
                          primary={
                            <MDTypography variant="button" fontWeight="regular">
                              No sensors affected
                            </MDTypography>
                          }
                          secondary={
                            <MDTypography variant="caption" color="text">
                              Start a simulation to see affected sensors
                            </MDTypography>
                          }
                        />
                      </ListItem>
                    )}
                  </List>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <MDBox p={2}>
                <MDTypography variant="h6" gutterBottom color="error">
                  Simulation Log
                </MDTypography>
                <Divider sx={{ mb: 2, borderColor: 'rgba(0,0,0,0.1)' }} />
                <MDBox
                  sx={{
                    maxHeight: '200px',
                    overflowY: 'auto',
                    bgcolor: 'grey.100',
                    p: 2,
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  {simulationLogs.length > 0 ? (
                    simulationLogs.map((log, index) => (
                      <MDBox key={index} mb={1} display="flex" alignItems="flex-start">
                        <MDBox
                          component="span"
                          bgColor={log.type === 'alert' ? 'error.main' : 'info.main'}
                          color="white"
                          px={1}
                          borderRadius="sm"
                          fontSize="0.75rem"
                          mr={1}
                        >
                          {log.type.toUpperCase()}
                        </MDBox>
                        <MDTypography variant="caption" fontWeight="medium">
                          {log.timestamp}:
                        </MDTypography>
                        <MDTypography variant="caption" ml={1}>
                          {log.message}
                        </MDTypography>
                      </MDBox>
                    ))
                  ) : (
                    <MDTypography variant="body2" color="text">
                      No simulation logs available. Start a simulation to see logs.
                    </MDTypography>
                  )}
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
      </Grid>
    </MDBox>
    </Card>
  );
}

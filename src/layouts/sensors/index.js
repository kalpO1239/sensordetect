import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Custom components
import SensorDetail from "components/SensorDetail";

// Data
import { generateMockSensors } from "utils/mockData";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

function Sensors() {
  const [tabValue, setTabValue] = useState(0);
  const [sensors, setSensors] = useState([]);
  const [filteredSensors, setFilteredSensors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    // Generate mock sensors
    const mockSensors = generateMockSensors(15);
    setSensors(mockSensors);
    setFilteredSensors(mockSensors);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = sensors;

    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(
        (sensor) =>
          sensor.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sensor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sensor.type.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Apply type filter
    if (typeFilter !== "All") {
      filtered = filtered.filter((sensor) => sensor.type === typeFilter);
    }

    // Apply status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter((sensor) => sensor.status === statusFilter);
    }

    setFilteredSensors(filtered);
  }, [sensors, searchTerm, typeFilter, statusFilter]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Fire Detection Sensors & Cameras
                </MDTypography>
              </MDBox>
              <MDBox>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  textColor="primary"
                  indicatorColor="primary"
                  sx={{ borderBottom: 1, borderColor: "divider" }}
                >
                  <Tab label="Sensors" />
                  <Tab label="Live Cameras" />
                </Tabs>

                <TabPanel value={tabValue} index={0}>
                  <Grid container spacing={3} mb={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Search sensors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <FormControl fullWidth>
                        <InputLabel id="type-filter-label">
                          Sensor Type
                        </InputLabel>
                        <Select
                          labelId="type-filter-label"
                          value={typeFilter}
                          label="Sensor Type"
                          onChange={(e) => setTypeFilter(e.target.value)}
                        >
                          <MenuItem value="All">All Types</MenuItem>
                          <MenuItem value="Smoke">Smoke</MenuItem>
                          <MenuItem value="Heat">Heat</MenuItem>
                          <MenuItem value="CO">CO</MenuItem>
                          <MenuItem value="Flame">Flame</MenuItem>
                          <MenuItem value="Gas">Gas</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <FormControl fullWidth>
                        <InputLabel id="status-filter-label">Status</InputLabel>
                        <Select
                          labelId="status-filter-label"
                          value={statusFilter}
                          label="Status"
                          onChange={(e) => setStatusFilter(e.target.value)}
                        >
                          <MenuItem value="All">All Statuses</MenuItem>
                          <MenuItem value="Online">Online</MenuItem>
                          <MenuItem value="Offline">Offline</MenuItem>
                          <MenuItem value="Alert">Alert</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    {filteredSensors.map((sensor) => (
                      <Grid item xs={12} md={6} lg={4} key={sensor.id}>
                        <SensorDetail
                          sensorId={sensor.id}
                          sensorType={sensor.type}
                          location={sensor.location}
                          status={sensor.status}
                          batteryLevel={sensor.batteryLevel}
                          lastChecked={sensor.lastChecked}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <MDBox mb={3}>
                    <MDTypography variant="h6" color="text">
                      Live Camera Feed from AlertWest.live
                    </MDTypography>
                    <MDTypography variant="body2" color="text">
                      This camera provides real-time monitoring for fire
                      detection and response.
                    </MDTypography>
                  </MDBox>

                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Card>
                        <MDBox p={2}>
                          <MDTypography variant="h6" gutterBottom>
                            AlertWest Live Monitoring
                          </MDTypography>
                          <iframe
                            src="https://alertwest.live"
                            width="100%"
                            height="700"
                            frameBorder="0"
                            title="AlertWest Live Camera Feed"
                            allowFullScreen
                          />
                        </MDBox>
                      </Card>
                    </Grid>
                  </Grid>
                </TabPanel>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Sensors;

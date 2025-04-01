import { useState } from "react";
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
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
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import PieChart from "examples/Charts/PieChart";
import HeatMap from "components/HeatMap";

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

function Trending() {
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState("month");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Mock data for charts
  const incidentsByLocationData = {
    labels: [
      "Office Tower",
      "Shopping Mall",
      "Warehouse",
      "Residential",
      "Restaurant",
      "Hotel",
    ],
    datasets: { label: "Incidents", data: [15, 20, 12, 25, 10, 18] },
  };

  const incidentsByTypeData = {
    labels: ["Electrical", "Kitchen", "HVAC", "Chemical", "Trash", "Other"],
    datasets: { label: "Incidents", data: [30, 25, 15, 10, 12, 8] },
  };

  const responseTimeData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: {
      label: "Minutes",
      data: [12, 15, 10, 8, 9, 7, 6, 8, 10, 9, 8, 7],
    },
  };

  const incidentsByPriorityData = {
    labels: ["High", "Medium", "Low"],
    datasets: {
      label: "Incidents",
      backgroundColors: ["#f44336", "#fb8c00", "#2196f3"],
      data: [35, 45, 20],
    },
  };

  // Mock data for heat map
  const heatMapData = [
    { lat: 34.052235, lng: -118.243683, weight: 10 }, // Los Angeles
    { lat: 34.053235, lng: -118.243683, weight: 15 },
    { lat: 34.054235, lng: -118.243683, weight: 8 },
    { lat: 34.052235, lng: -118.244683, weight: 12 },
    { lat: 34.052235, lng: -118.242683, weight: 20 },
    { lat: 34.051235, lng: -118.243683, weight: 5 },
    { lat: 34.053235, lng: -118.242683, weight: 18 },
    { lat: 34.054235, lng: -118.244683, weight: 9 },
    { lat: 34.051235, lng: -118.244683, weight: 14 },
    { lat: 34.051235, lng: -118.242683, weight: 7 },
  ];

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
                bgColor="success"
                borderRadius="lg"
                coloredShadow="success"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Fire Incident Trends & Analytics
                </MDTypography>
                <FormControl sx={{ minWidth: 150, color: "white" }}>
                  <InputLabel id="time-range-label" sx={{ color: "white" }}>
                    Time Range
                  </InputLabel>
                  <Select
                    labelId="time-range-label"
                    value={timeRange}
                    label="Time Range"
                    onChange={(e) => setTimeRange(e.target.value)}
                    sx={{
                      color: "white",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                    }}
                  >
                    <MenuItem value="week">Last Week</MenuItem>
                    <MenuItem value="month">Last Month</MenuItem>
                    <MenuItem value="quarter">Last Quarter</MenuItem>
                    <MenuItem value="year">Last Year</MenuItem>
                  </Select>
                </FormControl>
              </MDBox>
              <MDBox>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  textColor="primary"
                  indicatorColor="primary"
                  sx={{ borderBottom: 1, borderColor: "divider" }}
                >
                  <Tab label="Charts" />
                  <Tab label="Heat Map" />
                </Tabs>

                <TabPanel value={tabValue} index={0}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <MDBox mb={3}>
                        <ReportsBarChart
                          color="info"
                          title="Incidents by Location"
                          description="Number of fire incidents by location"
                          date={`last updated: ${new Date().toLocaleDateString()}`}
                          chart={incidentsByLocationData}
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MDBox mb={3}>
                        <ReportsBarChart
                          color="warning"
                          title="Incidents by Type"
                          description="Number of fire incidents by type"
                          date={`last updated: ${new Date().toLocaleDateString()}`}
                          chart={incidentsByTypeData}
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MDBox mb={3}>
                        <ReportsLineChart
                          color="success"
                          title="Average Response Time"
                          description="Average response time in minutes"
                          date={`last updated: ${new Date().toLocaleDateString()}`}
                          chart={responseTimeData}
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MDBox mb={3}>
                        <Card>
                          <MDBox p={2}>
                            <MDTypography
                              variant="h6"
                              textTransform="capitalize"
                            >
                              Incidents by Priority
                            </MDTypography>
                            <MDBox height="22.5rem">
                              <PieChart
                                icon={{
                                  color: "info",
                                  component: "leaderboard",
                                }}
                                title="Incidents"
                                description="Distribution by priority level"
                                chart={incidentsByPriorityData}
                              />
                            </MDBox>
                          </MDBox>
                        </Card>
                      </MDBox>
                    </Grid>
                  </Grid>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <MDBox mb={3}>
                    <MDTypography variant="h6" color="text">
                      Fire Incident Heat Map
                    </MDTypography>
                    <MDTypography variant="body2" color="text" mb={2}>
                      This heat map shows the concentration of fire incidents
                      across the region. Areas with higher incident rates appear
                      in red.
                    </MDTypography>
                    <Card>
                      <MDBox height="600px" width="100%">
                        <HeatMap data={heatMapData} />
                      </MDBox>
                    </Card>
                  </MDBox>
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

export default Trending;

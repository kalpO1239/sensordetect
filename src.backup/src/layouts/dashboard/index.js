import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import { generateMockIncidents } from "utils/mockData";

function Dashboard() {
  const [incidents, setIncidents] = useState([]);
  const [stats, setStats] = useState({
    activeIncidents: 0,
    highPriority: 0,
    sensorsTriggered: 0,
    responseTime: 0,
  });
  
  const [chartData, setChartData] = useState({
    incidents: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: { label: "Incidents", data: [50, 40, 60, 70, 55, 75, 65] },
    },
    responseTime: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: { label: "Minutes", data: [15, 20, 12, 10, 18, 8, 5] },
    },
    sensorAlerts: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: { label: "Alerts", data: [100, 120, 90, 150, 140, 160, 130] },
    },
  });

  useEffect(() => {
    // Generate mock incidents
    const mockIncidents = generateMockIncidents(20);
    setIncidents(mockIncidents);
    
    // Calculate stats
    const active = mockIncidents.filter(inc => inc.status !== "Resolved").length;
    const highPriority = mockIncidents.filter(inc => inc.priority === "High").length;
    const sensorsCount = [...new Set(mockIncidents.flatMap(inc => inc.sensors))].length;
    
    // Calculate average response time (mock data)
    const avgResponseTime = Math.round(mockIncidents.reduce((sum, inc) => sum + inc.responseTime, 0) / mockIncidents.length);
    
    setStats({
      activeIncidents: active,
      highPriority: highPriority,
      sensorsTriggered: sensorsCount,
      responseTime: avgResponseTime,
    });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="warning"
                title="Active Incidents"
                count={stats.activeIncidents}
                percentage={{
                  color: "success",
                  amount: "-12%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="High Priority"
                count={stats.highPriority}
                percentage={{
                  color: "error",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="sensors"
                title="Sensors Triggered"
                count={stats.sensorsTriggered}
                percentage={{
                  color: "success",
                  amount: "-1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="timer"
                title="Avg Response Time"
                count={`${stats.responseTime} min`}
                percentage={{
                  color: "success",
                  amount: "-10%",
                  label: "than last week",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Incidents by Month"
                  description="Number of fire incidents reported"
                  date="updated 1 hour ago"
                  chart={chartData.incidents}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Response Time"
                  description="Average response time in minutes"
                  date="updated 4 min ago"
                  chart={chartData.responseTime}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Sensor Alerts"
                  description="Number of alerts from fire sensors"
                  date="updated just now"
                  chart={chartData.sensorAlerts}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
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
                    Fire Incident Management System
                  </MDTypography>
                </MDBox>
                <MDBox pt={3} pb={3} px={3}>
                  <MDTypography variant="body2" color="text">
                    Welcome to the Fire Incident Management System. This dashboard provides an overview of current fire incidents, 
                    sensor statuses, and response metrics. Use the navigation menu to access detailed information about incidents, 
                    sensors, trends, cameras, social media reports, and phone calls.
                  </MDTypography>
                  <MDBox mt={3}>
                    <MDTypography variant="h6" color="text">
                      Recent High Priority Incidents
                    </MDTypography>
                    {incidents
                      .filter(inc => inc.priority === "High")
                      .slice(0, 3)
                      .map((incident, index) => (
                        <MDBox key={index} mt={2} display="flex" alignItems="center">
                          <MDBox
                            width="1.5rem"
                            height="1.5rem"
                            bgColor="error"
                            variant="gradient"
                            borderRadius="lg"
                            mr={2}
                          />
                          <MDTypography variant="button" fontWeight="medium">
                            {incident.location} - {incident.description}
                          </MDTypography>
                        </MDBox>
                      ))}
                  </MDBox>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard; 
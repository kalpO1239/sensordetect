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

function SensorIQDashboard() {
  const [sensorData, setSensorData] = useState({
    temperature: {
      labels: ["M", "T", "W", "T", "F", "S", "S"],
      datasets: { label: "Temperature", data: [22, 23, 21, 24, 25, 23, 22] },
    },
    humidity: {
      labels: ["M", "T", "W", "T", "F", "S", "S"],
      datasets: { label: "Humidity", data: [50, 55, 60, 58, 52, 54, 56] },
    },
    pressure: {
      labels: ["M", "T", "W", "T", "F", "S", "S"],
      datasets: { label: "Pressure", data: [1013, 1014, 1012, 1015, 1016, 1014, 1013] },
    },
  });

  // Simulate fetching sensor data
  useEffect(() => {
    // In a real app, you would fetch data from an API here
    const interval = setInterval(() => {
      setSensorData(prevData => ({
        temperature: {
          ...prevData.temperature,
          datasets: {
            ...prevData.temperature.datasets,
            data: prevData.temperature.datasets.data.map(val => val + (Math.random() * 2 - 1))
          }
        },
        humidity: {
          ...prevData.humidity,
          datasets: {
            ...prevData.humidity.datasets,
            data: prevData.humidity.datasets.data.map(val => Math.max(0, Math.min(100, val + (Math.random() * 5 - 2.5))))
          }
        },
        pressure: {
          ...prevData.pressure,
          datasets: {
            ...prevData.pressure.datasets,
            data: prevData.pressure.datasets.data.map(val => val + (Math.random() * 4 - 2))
          }
        },
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Temperature"
                  description="Average temperature in °C"
                  date="updated just now"
                  chart={sensorData.temperature}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Humidity"
                  description="Relative humidity in %"
                  date="updated just now"
                  chart={sensorData.humidity}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Pressure"
                  description="Atmospheric pressure in hPa"
                  date="updated just now"
                  chart={sensorData.pressure}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
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
                    SensorIQ Analytics
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <MDBox p={2}>
                    <MDTypography variant="body2" color="text">
                      SensorIQ provides real-time monitoring of environmental conditions through a network
                      of IoT sensors. The data displayed above represents the latest readings from our
                      sensor network. Use this dashboard to monitor temperature, humidity, and pressure
                      trends over time.
                    </MDTypography>
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

export default SensorIQDashboard; 
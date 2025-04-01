import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import TimelineItem from "examples/Timeline/TimelineItem";

function SensorDetail({ sensorId, sensorType, location }) {
  const [menu, setMenu] = useState(null);
  const [sensorHistory, setSensorHistory] = useState([]);
  const [sensorStatus, setSensorStatus] = useState("online");

  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  useEffect(() => {
    // Simulate fetching sensor history
    const mockHistory = [
      {
        color: "success",
        icon: "notifications",
        title: "Sensor online",
        dateTime: "22 DEC 7:20 PM",
      },
      {
        color: "error",
        icon: "inventory_2",
        title: "Battery level low",
        dateTime: "21 DEC 11:00 AM",
      },
      {
        color: "info",
        icon: "shopping_cart",
        title: "Maintenance performed",
        dateTime: "20 DEC 9:34 PM",
      },
      {
        color: "warning",
        icon: "payment",
        title: "Abnormal reading detected",
        dateTime: "18 DEC 2:20 AM",
      },
    ];

    setSensorHistory(mockHistory);

    // Simulate random status changes
    const interval = setInterval(() => {
      const statuses = ["online", "offline", "warning", "error"];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setSensorStatus(randomStatus);
    }, 30000);

    return () => clearInterval(interval);
  }, [sensorId]);

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "success";
      case "offline":
        return "error";
      case "warning":
        return "warning";
      case "error":
        return "error";
      default:
        return "info";
    }
  };

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          <MDBox>
            <MDTypography variant="h6" fontWeight="medium">
              Sensor {sensorId}
            </MDTypography>
            <MDBox display="flex" alignItems="center">
              <MDTypography variant="button" color="text" fontWeight="regular">
                Type: {sensorType}
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox color="text" px={2}>
            <Icon
              sx={{ cursor: "pointer", fontWeight: "bold" }}
              fontSize="small"
              onClick={openMenu}
            >
              more_vert
            </Icon>
          </MDBox>
          <Menu
            anchorEl={menu}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(menu)}
            onClose={closeMenu}
          >
            <MenuItem onClick={closeMenu}>View Details</MenuItem>
            <MenuItem onClick={closeMenu}>Calibrate</MenuItem>
            <MenuItem onClick={closeMenu}>Reset</MenuItem>
          </Menu>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        <MDBox display="flex" alignItems="center" mb={2}>
          <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
            Location: {location}
          </MDTypography>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={2}>
          <MDBox mr={1}>
            <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
              Status:
            </MDTypography>
          </MDBox>
          <MDTypography variant="button" fontWeight="regular" color={getStatusColor(sensorStatus)}>
            {sensorStatus}
          </MDTypography>
        </MDBox>
        <MDBox>
          <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
            Recent Activity
          </MDTypography>
          <MDBox mt={2}>
            {sensorHistory.map((item, index) => (
              <TimelineItem
                key={index}
                color={item.color}
                icon={item.icon}
                title={item.title}
                dateTime={item.dateTime}
              />
            ))}
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Typechecking props for the SensorDetail
SensorDetail.propTypes = {
  sensorId: PropTypes.string.isRequired,
  sensorType: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

export default SensorDetail; 
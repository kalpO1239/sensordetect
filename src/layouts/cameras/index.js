import { useState } from "react";
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

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

function Cameras() {
  const [tabValue, setTabValue] = useState(0);
  const [viewMode, setViewMode] = useState("grid");
  const [menu, setMenu] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  // Mock camera data
  const cameras = [
    {
      id: "CAM001",
      name: "Main Entrance",
      location: "Building A",
      status: "Online",
    },
    {
      id: "CAM002",
      name: "Server Room",
      location: "IT Department",
      status: "Online",
    },
    {
      id: "CAM003",
      name: "Warehouse",
      location: "Building B",
      status: "Online",
    },
    {
      id: "CAM004",
      name: "Kitchen Area",
      location: "Cafeteria",
      status: "Online",
    },
    {
      id: "CAM005",
      name: "Parking Lot",
      location: "North Side",
      status: "Offline",
    },
    {
      id: "CAM006",
      name: "Loading Dock",
      location: "Warehouse",
      status: "Online",
    },
    {
      id: "CAM007",
      name: "Office Space",
      location: "3rd Floor",
      status: "Online",
    },
    {
      id: "CAM008",
      name: "Conference Room",
      location: "2nd Floor",
      status: "Online",
    },
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
                bgColor="dark"
                borderRadius="lg"
                coloredShadow="dark"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Fire Monitoring Cameras
                </MDTypography>
                <Box display="flex" alignItems="center">
                  <Button
                    variant="contained"
                    color={viewMode === "grid" ? "primary" : "inherit"}
                    onClick={() => setViewMode("grid")}
                    sx={{ minWidth: "auto", p: 1, mr: 1 }}
                  >
                    <Icon>grid_view</Icon>
                  </Button>
                  <Button
                    variant="contained"
                    color={viewMode === "list" ? "primary" : "inherit"}
                    onClick={() => setViewMode("list")}
                    sx={{ minWidth: "auto", p: 1 }}
                  >
                    <Icon>view_list</Icon>
                  </Button>
                  <MDButton
                    variant="gradient"
                    color="info"
                    sx={{ ml: 2 }}
                    onClick={openMenu}
                  >
                    <Icon>more_vert</Icon>
                  </MDButton>
                  <Menu
                    anchorEl={menu}
                    open={Boolean(menu)}
                    onClose={closeMenu}
                  >
                    <MenuItem onClick={closeMenu}>Add Camera</MenuItem>
                    <MenuItem onClick={closeMenu}>Refresh All</MenuItem>
                    <MenuItem onClick={closeMenu}>Settings</MenuItem>
                  </Menu>
                </Box>
              </MDBox>
              <MDBox>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  textColor="primary"
                  indicatorColor="primary"
                  sx={{ borderBottom: 1, borderColor: "divider" }}
                >
                  <Tab label="Live View" />
                  <Tab label="Recordings" />
                  <Tab label="Analytics" />
                </Tabs>

                <TabPanel value={tabValue} index={0}>
                  <MDBox mb={3}>
                    <MDTypography variant="h6" color="text">
                      AlertWest.live Monitoring System
                    </MDTypography>
                    <MDTypography variant="body2" color="text">
                      Comprehensive fire detection camera system with real-time monitoring capabilities.
                    </MDTypography>
                  </MDBox>
                  
                  <Card>
                    <MDBox p={2}>
                      <MDBox 
                        display="flex" 
                        justifyContent="space-between" 
                        alignItems="center" 
                        mb={2}
                        bgcolor="error.light"
                        p={2}
                        borderRadius="lg"
                      >
                        <MDBox>
                          <MDTypography variant="h6" fontWeight="medium" color="error.dark">
                            AlertWest Live Feed
                          </MDTypography>
                          <MDTypography variant="caption" color="text">
                            Integrated fire monitoring system
                          </MDTypography>
                        </MDBox>
                        <MDBox display="flex" alignItems="center">
                          <MDBox
                            width="12px"
                            height="12px"
                            borderRadius="50%"
                            backgroundColor="success.main"
                            mr={1}
                          />
                          <MDTypography variant="caption" color="text">
                            Live
                          </MDTypography>
                        </MDBox>
                      </MDBox>
                      
                      <iframe 
                        src="https://alertwest.live" 
                        width="100%" 
                        height="700" 
                        frameBorder="0" 
                        title="AlertWest Live Camera Feed"
                        allowFullScreen
                      />
                      
                      <MDBox
                        display="flex"
                        justifyContent="space-between"
                        mt={2}
                      >
                        <MDButton
                          variant="outlined"
                          color="error"
                          size="small"
                        >
                          <Icon>fullscreen</Icon>&nbsp;Expand
                        </MDButton>
                        <MDButton
                          variant="outlined"
                          color="dark"
                          size="small"
                        >
                          <Icon>settings</Icon>&nbsp;Settings
                        </MDButton>
                      </MDBox>
                    </MDBox>
                  </Card>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <MDBox mb={3}>
                    <MDTypography variant="h6" color="text">
                      Camera Recordings
                    </MDTypography>
                    <MDTypography variant="body2" color="text">
                      Access archived footage from fire monitoring cameras.
                    </MDTypography>
                  </MDBox>
                  <MDBox textAlign="center" py={5}>
                    <Icon color="text" sx={{ fontSize: 60, opacity: 0.5 }}>
                      video_library
                    </Icon>
                    <MDTypography variant="h5" color="text" mt={2}>
                      Recordings will be available here
                    </MDTypography>
                    <MDTypography variant="body2" color="text">
                      This feature is currently under development.
                    </MDTypography>
                  </MDBox>
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                  <MDBox mb={3}>
                    <MDTypography variant="h6" color="text">
                      Camera Analytics
                    </MDTypography>
                    <MDTypography variant="body2" color="text">
                      AI-powered fire detection and analytics.
                    </MDTypography>
                  </MDBox>
                  <MDBox textAlign="center" py={5}>
                    <Icon color="text" sx={{ fontSize: 60, opacity: 0.5 }}>
                      analytics
                    </Icon>
                    <MDTypography variant="h5" color="text" mt={2}>
                      Analytics will be available here
                    </MDTypography>
                    <MDTypography variant="body2" color="text">
                      This feature is currently under development.
                    </MDTypography>
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

export default Cameras;

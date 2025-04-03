import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import ButtonGroup from "@mui/material/ButtonGroup";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function PhoneCalls() {
  const [filter, setFilter] = useState("all");

  const calls = [
    {
      id: "CALL-001",
      caller: "John Smith",
      phone: "555-123-4567",
      timestamp: "2023-06-15 14:30",
      location: "123 Main St, Apartment 4B",
      description: "Reported smoke coming from neighbor's apartment",
      status: "Active",
      priority: "High",
    },
    {
      id: "CALL-002",
      caller: "Jane Doe",
      phone: "555-987-6543",
      timestamp: "2023-06-15 14:35",
      location: "456 Oak Ave",
      description: "Fire alarm going off in building",
      status: "Dispatched",
      priority: "Medium",
    },
    {
      id: "CALL-003",
      caller: "Bob Johnson",
      phone: "555-456-7890",
      timestamp: "2023-06-15 14:40",
      location: "789 Pine Rd",
      description: "Smell of gas in basement",
      status: "Active",
      priority: "High",
    },
    {
      id: "CALL-004",
      caller: "Sarah Williams",
      phone: "555-789-0123",
      timestamp: "2023-06-15 14:45",
      location: "101 Elm St",
      description: "Small kitchen fire, contained",
      status: "Resolved",
      priority: "Low",
    },
    {
      id: "CALL-005",
      caller: "Michael Brown",
      phone: "555-234-5678",
      timestamp: "2023-06-15 14:50",
      location: "202 Maple Dr",
      description: "Electrical fire in garage",
      status: "Dispatched",
      priority: "Medium",
    },
  ];

  const filteredCalls =
    filter === "all"
      ? calls
      : calls.filter(
          (call) => call.status.toLowerCase() === filter.toLowerCase()
        );

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "warning";
      case "Dispatched":
        return "info";
      case "Resolved":
        return "success";
      default:
        return "dark";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "error";
      case "Medium":
        return "warning";
      case "Low":
        return "info";
      default:
        return "dark";
    }
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
                bgColor="error"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Emergency Phone Calls
                </MDTypography>
                <MDButton
                  variant="gradient"
                  color="dark"
                  startIcon={<Icon>add</Icon>}
                >
                  New Call
                </MDButton>
              </MDBox>
              <MDBox p={3}>
                <MDBox mb={3}>
                  <MDTypography variant="body2" color="text">
                    Track and manage emergency calls related to fire incidents.
                  </MDTypography>
                </MDBox>
                
                <MDBox mb={3}>
                  <ButtonGroup variant="outlined">
                    <MDButton
                      color={filter === "all" ? "info" : "text"}
                      onClick={() => setFilter("all")}
                    >
                      All Calls
                    </MDButton>
                    <MDButton
                      color={filter === "active" ? "warning" : "text"}
                      onClick={() => setFilter("active")}
                    >
                      Active
                    </MDButton>
                    <MDButton
                      color={filter === "dispatched" ? "info" : "text"}
                      onClick={() => setFilter("dispatched")}
                    >
                      Dispatched
                    </MDButton>
                    <MDButton
                      color={filter === "resolved" ? "success" : "text"}
                      onClick={() => setFilter("resolved")}
                    >
                      Resolved
                    </MDButton>
                  </ButtonGroup>
                </MDBox>
                
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Caller</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Priority</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredCalls.map((call) => (
                        <TableRow key={call.id}>
                          <TableCell>
                            <MDTypography variant="caption" fontWeight="medium">
                              {call.id}
                            </MDTypography>
                          </TableCell>
                          <TableCell>
                            <MDTypography variant="caption" fontWeight="medium">
                              {call.caller}
                            </MDTypography>
                            <MDTypography variant="caption" color="text">
                              <br />{call.phone}
                            </MDTypography>
                          </TableCell>
                          <TableCell>
                            <MDTypography variant="caption">
                              {call.timestamp}
                            </MDTypography>
                          </TableCell>
                          <TableCell>
                            <MDTypography variant="caption">
                              {call.location}
                            </MDTypography>
                          </TableCell>
                          <TableCell>
                            <MDTypography variant="caption">
                              {call.description}
                            </MDTypography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={call.status}
                              color={getStatusColor(call.status)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={call.priority}
                              color={getPriorityColor(call.priority)}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default PhoneCalls;

import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Data
import { generateMockIncidents } from "utils/mockData";

function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [filteredIncidents, setFilteredIncidents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [menu, setMenu] = useState(null);

  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  useEffect(() => {
    // Generate mock incidents
    const mockIncidents = generateMockIncidents(30);
    setIncidents(mockIncidents);
    setFilteredIncidents(mockIncidents);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = incidents;
    
    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(
        (incident) =>
          incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          incident.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          incident.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply priority filter
    if (priorityFilter !== "All") {
      filtered = filtered.filter((incident) => incident.priority === priorityFilter);
    }
    
    // Apply status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter((incident) => incident.status === statusFilter);
    }
    
    setFilteredIncidents(filtered);
  }, [incidents, searchTerm, priorityFilter, statusFilter]);

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

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "error";
      case "In Progress":
        return "warning";
      case "Contained":
        return "info";
      case "Resolved":
        return "success";
      default:
        return "dark";
    }
  };

  const columns = [
    { Header: "ID", accessor: "id", width: "10%" },
    { Header: "Location", accessor: "location", width: "20%" },
    { Header: "Description", accessor: "description", width: "25%" },
    {
      Header: "Priority",
      accessor: "priority",
      width: "10%",
      Cell: ({ value }) => (
        <Chip
          label={value}
          color={getPriorityColor(value)}
          size="small"
          sx={{ fontWeight: "bold" }}
        />
      ),
    },
    {
      Header: "Status",
      accessor: "status",
      width: "10%",
      Cell: ({ value }) => (
        <Chip
          label={value}
          color={getStatusColor(value)}
          size="small"
          sx={{ fontWeight: "bold" }}
        />
      ),
    },
    {
      Header: "Date",
      accessor: "date",
      width: "15%",
      Cell: ({ value }) => value.toLocaleString(),
    },
    {
      Header: "Actions",
      accessor: "actions",
      width: "10%",
      Cell: () => (
        <MDBox display="flex" alignItems="center">
          <MDTypography
            variant="body1"
            color="text"
            sx={{ cursor: "pointer", lineHeight: 0 }}
          >
            <Icon fontSize="small">visibility</Icon>
          </MDTypography>
          <MDBox mx={2}>
            <MDTypography
              variant="body1"
              color="text"
              sx={{ cursor: "pointer", lineHeight: 0 }}
            >
              <Icon fontSize="small">edit</Icon>
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
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
                bgColor="error"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Fire Incidents
                </MDTypography>
                <MDButton
                  variant="gradient"
                  color="dark"
                  startIcon={<Icon>add</Icon>}
                >
                  New Incident
                </MDButton>
              </MDBox>
              <MDBox p={3}>
                <Grid container spacing={3} mb={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Search incidents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel id="priority-filter-label">Priority</InputLabel>
                      <Select
                        labelId="priority-filter-label"
                        value={priorityFilter}
                        label="Priority"
                        onChange={(e) => setPriorityFilter(e.target.value)}
                      >
                        <MenuItem value="All">All Priorities</MenuItem>
                        <MenuItem value="High">High</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
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
                        <MenuItem value="New">New</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Contained">Contained</MenuItem>
                        <MenuItem value="Resolved">Resolved</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <DataTable
                  table={{ columns, rows: filteredIncidents }}
                  isSorted={true}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Incidents; 
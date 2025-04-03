import { useState, useEffect } from "react";
// Remove Firebase imports
// import { db } from "../../firebase";
// import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

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
  const [loading, setLoading] = useState(true);

  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  useEffect(() => {
    const fetchIncidents = () => {
      try {
        // Get data from localStorage
        const storedIncidents = JSON.parse(
          localStorage.getItem("fireIncidents") || "[]",
        );

        if (storedIncidents.length > 0) {
          // Format the data
          const formattedIncidents = storedIncidents.map((incident) => {
            // Map severity to priority
            let priority;
            switch (incident.severity) {
              case "CRITICAL":
                priority = "Critical";
                break;
              case "HIGH":
                priority = "High";
                break;
              case "MEDIUM":
                priority = "Medium";
                break;
              default:
                priority = "Low";
            }

            return {
              id: incident.eventId || incident.id,
              location: incident.location || "Unknown",
              description: incident.details || "No description",
              priority,
              status: "New",
              date: new Date(
                incident.createdAt || incident.timestamp || Date.now(),
              ),
            };
          });

          setIncidents(formattedIncidents);
          setFilteredIncidents(formattedIncidents);
        } else {
          // Fallback to mock data if no incidents in localStorage
          const mockIncidents = generateMockIncidents(5);
          setIncidents(mockIncidents);
          setFilteredIncidents(mockIncidents);
        }
      } catch (error) {
        console.error("Error fetching incidents from localStorage:", error);
        // Fallback to mock data if localStorage fails
        const mockIncidents = generateMockIncidents(5);
        setIncidents(mockIncidents);
        setFilteredIncidents(mockIncidents);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  useEffect(() => {
    let filtered = [...incidents];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (incident) =>
          incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          incident.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          incident.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Apply priority filter
    if (priorityFilter !== "All") {
      filtered = filtered.filter(
        (incident) => incident.priority === priorityFilter,
      );
    }

    // Apply status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter(
        (incident) => incident.status === statusFilter,
      );
    }

    // Add a hidden sort value for priority that the table can use for sorting
    filtered = filtered.map((incident) => ({
      ...incident,
      prioritySortValue: 
        { Critical: 1, High: 2, Medium: 3, Low: 4 }[incident.priority] || 999,
    }));

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

  // First, let's keep the custom sort function for priority
  const sortByPriority = (a, b) => {
    const priorityOrder = { Critical: 1, High: 2, Medium: 3, Low: 4 };
    return priorityOrder[a] - priorityOrder[b];
  };

  // Update the columns definition to use the custom sort function
  const columns = [
    { Header: "ID", accessor: "id", width: "10%" },
    { Header: "Location", accessor: "location", width: "15%" },
    { Header: "Description", accessor: "description", width: "30%" },
    { 
      Header: "Priority", 
      accessor: "priority",
      sortDescFirst: false, // Sort ascending first (Critical -> Low)
      sortType: (rowA, rowB) => (
        rowA.original.prioritySortValue - rowB.original.prioritySortValue
      ),
      Cell: ({ value }) => (
        <Chip
          label={value}
          color={
            value === "Critical"
              ? "error"
              : value === "High"
                ? "warning"
                : value === "Medium"
                  ? "info"
                  : "default"
          }
          size="small"
        />
      ),
    },
    { Header: "Status", accessor: "status", width: "15%" },
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
                      <InputLabel id="priority-filter-label">
                        Priority
                      </InputLabel>
                      <Select
                        labelId="priority-filter-label"
                        value={priorityFilter}
                        label="Priority"
                        onChange={(e) => setPriorityFilter(e.target.value)}
                      >
                        <MenuItem value="All">All Priorities</MenuItem>
                        <MenuItem value="Critical">Critical</MenuItem>
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
                  table={{ 
                    columns, 
                    rows: filteredIncidents 
                  }}
                  isSorted={true}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  noEndBorder
                  canSearch={false}
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

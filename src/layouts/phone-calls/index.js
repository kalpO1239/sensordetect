import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function PhoneCalls() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [calls, setCalls] = useState([]);
  const [filteredCalls, setFilteredCalls] = useState([]);

  // Mock phone call data
  const mockCalls = [
    {
      id: "CALL-0001",
      caller: "John Smith",
      phone: "555-123-4567",
      location: "123 Main St, Apartment 4B",
      description: "Smoke coming from neighbor's apartment",
      status: "New",
      priority: "High",
      timestamp: "2023-05-15T14:30:00",
      duration: "2:45",
      operator: "Alice Johnson",
    },
    {
      id: "CALL-0002",
      caller: "Mary Johnson",
      phone: "555-987-6543",
      location: "456 Oak Ave, Building C",
      description: "Fire alarm triggered on 3rd floor",
      status: "In Progress",
      priority: "Medium",
      timestamp: "2023-05-15T14:15:00",
      duration: "3:20",
      operator: "Bob Williams",
    },
    {
      id: "CALL-0003",
      caller: "Robert Davis",
      phone: "555-456-7890",
      location: "789 Pine Rd, House 12",
      description: "Small kitchen fire, contained but smoke",
      status: "Dispatched",
      priority: "Medium",
      timestamp: "2023-05-15T14:00:00",
      duration: "4:10",
      operator: "Carol Martinez",
    },
    {
      id: "CALL-0004",
      caller: "Jennifer Wilson",
      phone: "555-789-0123",
      location: "101 Cedar Ln, Suite 200",
      description: "Electrical burning smell from office",
      status: "New",
      priority: "Low",
      timestamp: "2023-05-15T13:45:00",
      duration: "1:55",
      operator: "David Thompson",
    },
    {
      id: "CALL-0005",
      caller: "Michael Brown",
      phone: "555-234-5678",
      location: "202 Maple Dr, Warehouse 3",
      description: "Large fire in warehouse, spreading quickly",
      status: "Dispatched",
      priority: "High",
      timestamp: "2023-05-15T13:30:00",
      duration: "5:30",
      operator: "Emma Rodriguez",
    },
    {
      id: "CALL-0006",
      caller: "Sarah Garcia",
      phone: "555-345-6789",
      location: "303 Elm Blvd, School Building",
      description: "Fire alarm activated in gymnasium",
      status: "Resolved",
      priority: "Medium",
      timestamp: "2023-05-15T13:15:00",
      duration: "6:15",
      operator: "Frank Wilson",
    },
  ];

  useEffect(() => {
    setCalls(mockCalls);
    setFilteredCalls(mockCalls);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = calls;

    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(
        (call) =>
          call.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          call.caller.toLowerCase().includes(searchTerm.toLowerCase()) ||
          call.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          call.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Apply status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter((call) => call.status === statusFilter);
    }

    // Apply priority filter
    if (priorityFilter !== "All") {
      filtered = filtered.filter((call) => call.priority === priorityFilter);
    }

    setFilteredCalls(filtered);
  }, [calls, searchTerm, statusFilter, priorityFilter]);

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "info";
      case "In Progress":
        return "warning";
      case "Dispatched":
        return "success";
      case "Resolved":
        return "dark";
      default:
        return "default";
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
        return "default";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const columns = [
    { Header: "Call ID", accessor: "id", width: "10%" },
    {
      Header: "Caller",
      accessor: "caller",
      width: "15%",
      Cell: ({ row }) => (
        <MDBox display="flex" flexDirection="column">
          <MDTypography variant="button" fontWeight="medium">
            {row.original.caller}
          </MDTypography>
          <MDTypography variant="caption" color="text">
            {row.original.phone}
          </MDTypography>
        </MDBox>
      ),
    },
    {
      Header: "Details",
      accessor: "description",
      width: "25%",
      Cell: ({ row }) => (
        <MDBox display="flex" flexDirection="column">
          <MDTypography variant="button" fontWeight="medium">
            {row.original.description}
          </MDTypography>
          <MDTypography variant="caption" color="text">
            Location: {row.original.location}
          </MDTypography>
        </MDBox>
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
          variant="outlined"
        />
      ),
    },
    {
      Header: "Priority",
      accessor: "priority",
      width: "10%",
      Cell: ({ value }) => (
        <Chip label={value} color={getPriorityColor(value)} size="small" />
      ),
    },
    {
      Header: "Time",
      accessor: "timestamp",
      width: "15%",
      Cell: ({ row }) => (
        <MDBox display="flex" flexDirection="column">
          <MDTypography variant="caption" fontWeight="medium">
            {formatDate(row.original.timestamp)}
          </MDTypography>
          <MDTypography variant="caption" color="text">
            Duration: {row.original.duration}
          </MDTypography>
        </MDBox>
      ),
    },
    {
      Header: "Actions",
      accessor: "actions",
      width: "15%",
      Cell: ({ row }) => (
        <MDBox display="flex">
          <MDButton variant="text" color="info" size="small" sx={{ mr: 1 }}>
            <Icon>visibility</Icon>&nbsp;View
          </MDButton>
          <MDButton variant="text" color="dark" size="small">
            <Icon>edit</Icon>&nbsp;Edit
          </MDButton>
        </MDBox>
      ),
    },
  ];

  // Define prop types for the Cell components
  const cellPropTypes = {
    row: PropTypes.shape({
      original: PropTypes.shape({
        caller: PropTypes.string,
        phone: PropTypes.string,
        description: PropTypes.string,
        location: PropTypes.string,
        timestamp: PropTypes.string,
        duration: PropTypes.string,
      }),
    }),
    value: PropTypes.any,
  };

  // Assign prop types to each Cell component
  columns[0].Cell.propTypes = cellPropTypes;
  columns[1].Cell.propTypes = cellPropTypes;
  columns[2].Cell.propTypes = cellPropTypes;
  columns[3].Cell.propTypes = cellPropTypes;
  columns[4].Cell.propTypes = { value: PropTypes.string };
  columns[5].Cell.propTypes = { value: PropTypes.string };
  columns[6].Cell.propTypes = cellPropTypes;

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
                coloredShadow="error"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Emergency Phone Calls
                </MDTypography>
                <MDButton variant="gradient" color="dark">
                  <Icon>add</Icon>&nbsp;New Call
                </MDButton>
              </MDBox>
              <MDBox p={3}>
                <Grid container spacing={3} mb={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Search calls..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon>search</Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
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
                        <MenuItem value="Dispatched">Dispatched</MenuItem>
                        <MenuItem value="Resolved">Resolved</MenuItem>
                      </Select>
                    </FormControl>
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
                        <MenuItem value="High">High</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <DataTable
                  table={{ columns, rows: filteredCalls }}
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

export default PhoneCalls;

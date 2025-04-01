import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

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

function SocialMedia() {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Mock social media posts related to fire incidents
  const mockPosts = [
    {
      id: 1,
      platform: "twitter",
      username: "LocalNews24",
      handle: "@localnews24",
      content: "BREAKING: Fire reported at the downtown shopping mall. Fire department responding. #FireAlert",
      timestamp: "10 minutes ago",
      location: "Downtown",
      verified: true,
      relevance: "high",
    },
    {
      id: 2,
      platform: "facebook",
      username: "Jane Smith",
      handle: "",
      content: "Seeing smoke coming from the warehouse district. Anyone know what's happening? Stay safe everyone!",
      timestamp: "25 minutes ago",
      location: "Warehouse District",
      verified: false,
      relevance: "medium",
    },
    {
      id: 3,
      platform: "instagram",
      username: "city_photographer",
      handle: "@city_photographer",
      content: "Captured this image of firefighters responding to an incident at the office tower. Heroes at work! #FirstResponders",
      timestamp: "1 hour ago",
      location: "Business District",
      verified: true,
      relevance: "medium",
    },
    {
      id: 4,
      platform: "twitter",
      username: "FireDepartment",
      handle: "@cityfiredept",
      content: "We are currently responding to a fire incident at 123 Main St. Please avoid the area to allow emergency vehicles access.",
      timestamp: "15 minutes ago",
      location: "Main Street",
      verified: true,
      relevance: "high",
    },
    {
      id: 5,
      platform: "facebook",
      username: "Community Watch",
      handle: "",
      content: "ALERT: Small fire reported at the community center. Fire department on scene. Event has been evacuated as a precaution.",
      timestamp: "45 minutes ago",
      location: "Community Center",
      verified: true,
      relevance: "high",
    },
    {
      id: 6,
      platform: "twitter",
      username: "Weather Channel",
      handle: "@weatherchannel",
      content: "High fire danger today due to dry conditions and strong winds. Please exercise caution with any potential ignition sources.",
      timestamp: "3 hours ago",
      location: "Citywide",
      verified: true,
      relevance: "medium",
    },
  ];

  useEffect(() => {
    // Filter posts based on search term and tab
    let filtered = mockPosts;
    
    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by platform based on active tab
    if (tabValue === 1) {
      filtered = filtered.filter(post => post.platform === "twitter");
    } else if (tabValue === 2) {
      filtered = filtered.filter(post => post.platform === "facebook");
    } else if (tabValue === 3) {
      filtered = filtered.filter(post => post.platform === "instagram");
    }
    
    // Sort by relevance and timestamp
    filtered.sort((a, b) => {
      if (a.relevance === "high" && b.relevance !== "high") return -1;
      if (a.relevance !== "high" && b.relevance === "high") return 1;
      return 0;
    });
    
    setPosts(filtered);
  }, [searchTerm, tabValue]);

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "twitter":
        return "twitter";
      case "facebook":
        return "facebook";
      case "instagram":
        return "instagram";
      default:
        return "public";
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case "twitter":
        return "info";
      case "facebook":
        return "primary";
      case "instagram":
        return "warning";
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
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Social Media Monitoring for Fire Incidents
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2}>
                <TextField
                  fullWidth
                  label="Search social media posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon>search</Icon>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 3 }}
                />
                
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  textColor="primary"
                  indicatorColor="primary"
                  sx={{ borderBottom: 1, borderColor: 'divider' }}
                >
                  <Tab label="All Platforms" />
                  <Tab label="Twitter" />
                  <Tab label="Facebook" />
                  <Tab label="Instagram" />
                </Tabs>
                
                <TabPanel value={tabValue} index={0}>
                  <MDTypography variant="subtitle2" color="text" mb={2}>
                    Showing {posts.length} posts from all platforms
                  </MDTypography>
                  {renderPosts()}
                </TabPanel>
                
                <TabPanel value={tabValue} index={1}>
                  <MDTypography variant="subtitle2" color="text" mb={2}>
                    Showing {posts.length} posts from Twitter
                  </MDTypography>
                  {renderPosts()}
                </TabPanel>
                
                <TabPanel value={tabValue} index={2}>
                  <MDTypography variant="subtitle2" color="text" mb={2}>
                    Showing {posts.length} posts from Facebook
                  </MDTypography>
                  {renderPosts()}
                </TabPanel>
                
                <TabPanel value={tabValue} index={3}>
                  <MDTypography variant="subtitle2" color="text" mb={2}>
                    Showing {posts.length} posts from Instagram
                  </MDTypography>
                  {renderPosts()}
                </TabPanel>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );

  function renderPosts() {
    return (
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} key={post.id}>
            <Card>
              <MDBox p={3}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item>
                    <Avatar sx={{ bgcolor: getPlatformColor(post.platform) }}>
                      <Icon>{getPlatformIcon(post.platform)}</Icon>
                    </Avatar>
                  </Grid>
                  <Grid item xs>
                    <MDBox display="flex" alignItems="center">
                      <MDTypography variant="h6" fontWeight="medium">
                        {post.username}
                      </MDTypography>
                      {post.verified && (
                        <Icon color="info" fontSize="small" sx={{ ml: 1 }}>
                          verified
                        </Icon>
                      )}
                      {post.handle && (
                        <MDTypography variant="body2" color="text" ml={1}>
                          {post.handle}
                        </MDTypography>
                      )}
                    </MDBox>
                    <MDTypography variant="body2" color="text">
                      {post.timestamp} • {post.location}
                    </MDTypography>
                  </Grid>
                  <Grid item>
                    <MDBox display="flex">
                      <MDButton 
                        variant="outlined" 
                        color={post.relevance === "high" ? "error" : "info"} 
                        size="small"
                        sx={{ mr: 1 }}
                      >
                        {post.relevance === "high" ? "High Priority" : "Review"}
                      </MDButton>
                    </MDBox>
                  </Grid>
                </Grid>
                <MDBox mt={2}>
                  <MDTypography variant="body1">
                    {post.content}
                  </MDTypography>
                </MDBox>
                <MDBox mt={2} display="flex" justifyContent="flex-end">
                  <MDButton variant="text" color="dark" size="small" sx={{ mr: 1 }}>
                    <Icon>share</Icon>&nbsp;Share
                  </MDButton>
                  <MDButton variant="text" color="dark" size="small">
                    <Icon>flag</Icon>&nbsp;Flag
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        ))}
        {posts.length === 0 && (
          <Grid item xs={12}>
            <MDBox textAlign="center" py={5}>
              <Icon color="text" sx={{ fontSize: 60, opacity: 0.5 }}>search_off</Icon>
              <MDTypography variant="h5" color="text" mt={2}>
                No posts found
              </MDTypography>
              <MDTypography variant="body2" color="text">
                Try adjusting your search or filters
              </MDTypography>
            </MDBox>
          </Grid>
        )}
      </Grid>
    );
  }
}

export default SocialMedia; 
import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function TestPage() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <MDTypography variant="h1">Test Page</MDTypography>
        <MDTypography variant="body1">
          This is a test page to verify routing.
        </MDTypography>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default TestPage;

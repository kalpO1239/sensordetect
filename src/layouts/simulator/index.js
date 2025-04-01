/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
//import MasterCard from "examples/Cards/MasterCard";
//import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Billing page components
//import PaymentMethod from "layouts/billing/components/PaymentMethod";
//import Invoices from "layouts/billing/components/Invoices";
//import BillingInformation from "layouts/billing/components/BillingInformation";
//import Transactions from "layouts/billing/components/Transactions";

//SimulatorComponent
import SimulatorComponent from "./simulator";

function Simulator() {
  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} xl={6}></Grid>
                <Grid item xs={12} md={6} xl={3}></Grid>
                <Grid item xs={12} md={6} xl={3}></Grid>
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
                        Fire Alarm System Dashboard
                      </MDTypography>
                    </MDBox>
                    <SimulatorComponent />
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}></Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}></Grid>
            <Grid item xs={12} md={5}></Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Simulator;

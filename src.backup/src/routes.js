import Dashboard from "layouts/dashboard";
import Incidents from "layouts/incidents";
import Sensors from "layouts/sensors";
import Trending from "layouts/trending";
import Cameras from "layouts/cameras";
import SocialMedia from "layouts/social-media";
import PhoneCalls from "layouts/phone-calls";
import TestPage from "layouts/test";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import WarningIcon from "@mui/icons-material/Warning";
import SensorsIcon from "@mui/icons-material/Sensors";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import VideocamIcon from "@mui/icons-material/Videocam";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import Icon from "@mui/icons-material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <DashboardIcon fontSize="small" />,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Incidents",
    key: "incidents",
    icon: <WarningIcon fontSize="small" />,
    route: "/incidents",
    component: <Incidents />,
  },
  {
    type: "collapse",
    name: "Sensors",
    key: "sensors",
    icon: <SensorsIcon fontSize="small" />,
    route: "/sensors",
    component: <Sensors />,
  },
  {
    type: "collapse",
    name: "Trending",
    key: "trending",
    icon: <TrendingUpIcon fontSize="small" />,
    route: "/trending",
    component: <Trending />,
  },
  {
    type: "collapse",
    name: "Cameras",
    key: "cameras",
    icon: <VideocamIcon fontSize="small" />,
    route: "/cameras",
    component: <Cameras />,
  },
  {
    type: "collapse",
    name: "Social Media",
    key: "social-media",
    icon: <PublicIcon fontSize="small" />,
    route: "/social-media",
    component: <SocialMedia />,
  },
  {
    type: "collapse",
    name: "Phone Calls",
    key: "phone-calls",
    icon: <PhoneIcon fontSize="small" />,
    route: "/phone-calls",
    component: <PhoneCalls />,
  },
  {
    type: "collapse",
    name: "Test",
    key: "test",
    icon: <Icon>test</Icon>,
    route: "/test",
    component: <TestPage />,
  },
];

export default routes; 
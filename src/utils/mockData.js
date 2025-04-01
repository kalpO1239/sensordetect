// Generate random mock data for fire incidents

// List of possible locations
const locations = [
  "123 Main St, Building A",
  "456 Oak Ave, Apartment 302",
  "789 Pine Rd, Warehouse 5",
  "101 Cedar Ln, Office Tower",
  "202 Maple Dr, Shopping Mall",
  "303 Elm Blvd, School Building",
  "404 Birch St, Restaurant",
  "505 Spruce Ave, Hotel",
  "606 Willow Rd, Hospital Wing B",
  "707 Ash Ln, Factory",
  "808 Cherry Dr, Residential Complex",
  "909 Walnut Blvd, Gas Station",
  "1010 Chestnut St, Library",
  "1111 Sycamore Ave, Theater",
  "1212 Poplar Rd, Gym",
];

// List of possible descriptions
const descriptions = [
  "Smoke detected in kitchen area",
  "Fire alarm triggered on 3rd floor",
  "Sprinkler system activated",
  "Electrical fire reported",
  "Gas leak with potential fire hazard",
  "Small fire in trash container",
  "Smoke from HVAC system",
  "Chemical fire in laboratory",
  "Grease fire in cooking area",
  "Fire in server room",
  "Smoke from overheated equipment",
  "Vehicle fire in parking garage",
  "Wildfire approaching structure",
  "Lightning strike caused roof fire",
  "Explosion reported with subsequent fire",
];

// List of possible statuses
const statuses = ["New", "In Progress", "Contained", "Resolved"];

// List of possible priorities
const priorities = ["Low", "Medium", "High"];

// List of possible sensor types
const sensorTypes = ["Smoke", "Heat", "CO", "Flame", "Gas"];

// Generate a random date within the last 30 days
const getRandomDate = () => {
  const now = new Date();
  const pastDate = new Date(
    now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000,
  );
  return pastDate;
};

// Generate a random sensor ID
const generateSensorId = (type) => {
  const prefix = type.substring(0, 2).toUpperCase();
  const number = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `${prefix}-${number}`;
};

// Generate a list of random sensors for an incident
const generateSensors = () => {
  const count = Math.floor(Math.random() * 3) + 1; // 1-3 sensors
  const sensors = [];

  for (let i = 0; i < count; i++) {
    const type = sensorTypes[Math.floor(Math.random() * sensorTypes.length)];
    sensors.push(generateSensorId(type));
  }

  return sensors;
};

// Generate a single mock incident
const generateMockIncident = (id) => {
  const location = locations[Math.floor(Math.random() * locations.length)];
  const description =
    descriptions[Math.floor(Math.random() * descriptions.length)];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const priority = priorities[Math.floor(Math.random() * priorities.length)];
  const date = getRandomDate();
  const sensors = generateSensors();
  const responseTime = Math.floor(Math.random() * 20) + 1; // 1-20 minutes

  return {
    id: `INC-${id.toString().padStart(4, "0")}`,
    location,
    description,
    status,
    priority,
    date,
    sensors,
    responseTime,
  };
};

// Generate multiple mock incidents
export const generateMockIncidents = (count) => {
  const incidents = [];

  for (let i = 1; i <= count; i++) {
    incidents.push(generateMockIncident(i));
  }

  return incidents;
};

// Generate mock sensor data
export const generateMockSensors = (count) => {
  const sensors = [];

  for (let i = 1; i <= count; i++) {
    const type = sensorTypes[Math.floor(Math.random() * sensorTypes.length)];
    const id = generateSensorId(type);
    const location = locations[Math.floor(Math.random() * locations.length)];
    const status =
      Math.random() > 0.2
        ? "Online"
        : Math.random() > 0.5
        ? "Offline"
        : "Alert";
    const lastChecked = new Date(
      Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000),
    );
    const batteryLevel = Math.floor(Math.random() * 100);

    sensors.push({
      id,
      type,
      location,
      status,
      lastChecked,
      batteryLevel,
    });
  }

  return sensors;
};

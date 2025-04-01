import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function HeatMap({ data, center = { lat: 34.052235, lng: -118.243683 }, zoom = 13 }) {
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const heatmapRef = useRef(null);

  useEffect(() => {
    // Load Google Maps API script if not already loaded
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    function initMap() {
      // Create Google Map
      googleMapRef.current = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: zoom,
        mapTypeId: "satellite",
      });

      // Convert data to Google Maps heatmap format
      const heatmapData = data.map(
        (point) =>
          new window.google.maps.LatLng(point.lat, point.lng, point.weight)
      );

      // Create heatmap layer
      heatmapRef.current = new window.google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        map: googleMapRef.current,
        radius: 20,
        opacity: 0.7,
        gradient: [
          "rgba(0, 255, 255, 0)",
          "rgba(0, 255, 255, 1)",
          "rgba(0, 191, 255, 1)",
          "rgba(0, 127, 255, 1)",
          "rgba(0, 63, 255, 1)",
          "rgba(0, 0, 255, 1)",
          "rgba(0, 0, 223, 1)",
          "rgba(0, 0, 191, 1)",
          "rgba(0, 0, 159, 1)",
          "rgba(0, 0, 127, 1)",
          "rgba(63, 0, 91, 1)",
          "rgba(127, 0, 63, 1)",
          "rgba(191, 0, 31, 1)",
          "rgba(255, 0, 0, 1)",
        ],
      });
    }

    return () => {
      // Clean up
      if (heatmapRef.current) {
        heatmapRef.current.setMap(null);
      }
    };
  }, [data, center, zoom]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
}

HeatMap.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      weight: PropTypes.number,
    })
  ).isRequired,
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
  zoom: PropTypes.number,
};

export default HeatMap; 
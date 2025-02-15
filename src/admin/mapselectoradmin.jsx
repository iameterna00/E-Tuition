import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"; // Import the geocoder
import "mapbox-gl/dist/mapbox-gl.css"; // Mapbox CSS
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"; // Geocoder CSS

const MapSelector = ({ formData, setFormData }) => {
  const mapContainerRef = useRef(null); // Ref for the map container
  const mapRef = useRef(null); // Ref for the map instance
  const markerRef = useRef(null); // Ref for the marker instance

  useEffect(() => {
    // Set Mapbox access token
    mapboxgl.accessToken = "pk.eyJ1IjoiYW5pc2hoLWpvc2hpIiwiYSI6ImNrdWo5d2lhdDFkb2oybnJ1MDB4OG1oc2EifQ.pLrp8FmZSLVfT3pAVVPBPg";

    // Initialize the map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current, // Container ID
      style: "mapbox://styles/mapbox/streets-v11", // Map style
      center: [85.324, 27.7172], // Default center (Kathmandu)
      zoom: 12, // Default zoom level
    });

    // Initialize the geocoder with bounding box restriction for Kathmandu
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false, // Disable default marker
      bbox: [85.2, 27.65, 85.4, 27.75], // Restrict search to Kathmandu
      placeholder: "Search in Kathmandu...",
    });

    // Add geocoder to map
    mapRef.current.addControl(geocoder);

    // Handle geocoder result selection
    geocoder.on("result", (e) => {
      const { lng, lat } = e.result.center;

      // Move existing marker or create a new one
      if (markerRef.current) {
        markerRef.current.setLngLat([lng, lat]);
      } else {
        markerRef.current = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapRef.current);
      }

      // Update form data
      setFormData((prev) => ({ ...prev, lat, lng }));

      // Center map on selected location
      mapRef.current.setCenter([lng, lat]);
    });

    // Map click event to place marker
    mapRef.current.on("click", (e) => {
      const { lng, lat } = e.lngLat;

      if (markerRef.current) {
        markerRef.current.setLngLat([lng, lat]);
      } else {
        markerRef.current = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapRef.current);
      }

      setFormData((prev) => ({ ...prev, lat, lng }));
    });

    // Cleanup on component unmount
    return () => {
      if (mapRef.current) mapRef.current.remove();
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{
        maxWidth: "600px",
        height: "400px",
        width: "100%",
        borderRadius: "8px",
      }}
    />
  );
};

export default MapSelector;

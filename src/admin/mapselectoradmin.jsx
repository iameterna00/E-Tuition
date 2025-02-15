import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

// Mapbox CSS (required for rendering the map and markers)
import "mapbox-gl/dist/mapbox-gl.css";

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

    // Debug: Log when the map is loaded
    mapRef.current.on("load", () => {
      console.log("Map loaded successfully");
    });

    // Map click event to place or update marker
    mapRef.current.on("click", (e) => {
      const { lng, lat } = e.lngLat;
      console.log("Clicked coordinates: ", lng, lat); // Debug: Log clicked coordinates

      // If a marker already exists, move it to the new location
      if (markerRef.current) {
        console.log("Moving existing marker to new coordinates");
        markerRef.current.setLngLat([lng, lat]);
      } else {
        // Create a new marker if none exists
        console.log("Creating new marker");
        markerRef.current = new mapboxgl.Marker({
          draggable: false, // Marker is not draggable
        })
          .setLngLat([lng, lat])
          .addTo(mapRef.current);
      }

      // Update form data with new coordinates
      setFormData((prev) => {
        console.log("Updating form data with new coordinates:", { lat, lng });
        return { ...prev, lat, lng };
      });
    });

    // Cleanup function to remove the map when the component unmounts
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []); // Empty dependency array to run only once

  return (
    <div
      ref={mapContainerRef}
      style={{
        maxWidth: "600px",
        height: "300px",
        width: "100%",
      
      }}
    />
  );
};

export default MapSelector;
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"; 
import "mapbox-gl/dist/mapbox-gl.css"; 
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"; 

const EditableMapSelector = ({ editingVacancy, setEditingVacancy }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken =import.meta.env.VITE_API_MAP_BOX;

    // Initialize the map only once
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: editingVacancy.lat && editingVacancy.lng 
        ? [editingVacancy.lng, editingVacancy.lat] 
        : [85.324, 27.7172], // Default to Kathmandu
      zoom: 12,
    });

    // Add the geocoder
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
      bbox: [85.198611, 27.575000, 85.525556, 27.812222


      ], 
      placeholder: "Search in Kathmandu...",
    });

    mapRef.current.addControl(geocoder);

    // Add a marker if initial coordinates exist
    if (editingVacancy.lat && editingVacancy.lng) {
      markerRef.current = new mapboxgl.Marker()
        .setLngLat([editingVacancy.lng, editingVacancy.lat])
        .addTo(mapRef.current);
    }

    // Update vacancy on search result
    geocoder.on("result", (e) => {
      const { lng, lat } = e.result.center;

      setEditingVacancy((prev) => ({
        ...prev,
        lat,
        lng,
      }));
    });

    // Update vacancy on map click
    mapRef.current.on("click", (e) => {
      const { lng, lat } = e.lngLat;

      setEditingVacancy((prev) => ({
        ...prev,
        lat,
        lng,
      }));
    });

    return () => mapRef.current.remove();
  }, []); // Run only on mount

  useEffect(() => {
    if (!mapRef.current || editingVacancy.lat === undefined || editingVacancy.lng === undefined) return;

    if (!markerRef.current) {
      // Create a new marker only if it doesn't exist
      markerRef.current = new mapboxgl.Marker()
        .setLngLat([editingVacancy.lng, editingVacancy.lat])
        .addTo(mapRef.current);
    } else {
      // Move the existing marker
      markerRef.current.setLngLat([editingVacancy.lng, editingVacancy.lat]);
    }

    // Center map on new location
    mapRef.current.flyTo({ center: [editingVacancy.lng, editingVacancy.lat], essential: true });
  }, [editingVacancy.lat, editingVacancy.lng]); // Only update marker

  return <div ref={mapContainerRef} style={{ maxWidth: "600px", height: "400px", width: "100%", borderRadius: "8px" }} />;
};

export default EditableMapSelector;

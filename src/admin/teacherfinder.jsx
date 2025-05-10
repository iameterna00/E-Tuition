import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import axios from "axios";
import { webApi } from "../api";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const TeacherLocations = ({ vlat, vlng }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    axios
      .get(`${webApi}/api/teachers`)
      .then((res) => {
        if (res.data && Array.isArray(res.data.teachers)) {
          setTeachers(res.data.teachers);
        }
      })
      .catch((err) => console.error("Error fetching teachers:", err));
  }, []);

useEffect(() => {
  mapboxgl.accessToken = "pk.eyJ1IjoiYW5pc2hoLWpvc2hpIiwiYSI6ImNrdWo5d2lhdDFkb2oybnJ1MDB4OG1oc2EifQ.pLrp8FmZSLVfT3pAVVPBPg";

  const center = vlat && vlng ? [vlng, vlat] : [85.324, 27.7172];

  mapRef.current = new mapboxgl.Map({
    container: mapContainerRef.current,
    style: "mapbox://styles/mapbox/streets-v11",
    center: center,
    zoom: 13,
  });

  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    marker: false,
    bbox: [85.2, 27.65, 85.4, 27.75],
    placeholder: "Search in Kathmandu...",
  });

  mapRef.current.addControl(geocoder);

  if (vlat && vlng) {
    mapRef.current.on("load", () => {
      // Draw 2km radius circle
      mapRef.current.addSource("circle", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [vlng, vlat],
              },
            },
          ],
        },
      });

      mapRef.current.addLayer({
        id: "circle-fill",
        type: "circle",
        source: "circle",
        paint: {
          "circle-radius": {
            stops: [
              [0, 0],
              [20, 2000 / 0.075],
            ],
            base: 2,
          },
          "circle-color": "rgba(0,153,255,0.15)",
          "circle-stroke-color": "#0099ff",
          "circle-stroke-width": 2,
        },
      });

      // Add a special marker at the center point
      const centerEl = document.createElement('div');
      centerEl.style.width = '22px';
      centerEl.style.height = '22px';
      centerEl.style.background = 'rgb(0, 153, 255)';
      centerEl.style.border = '3px solid #fff';
      centerEl.style.borderRadius = '50%';
      centerEl.style.boxShadow = '0 0 12px #0099ff';
      centerEl.title = "Vacancy Center";

      new mapboxgl.Marker(centerEl)
        .setLngLat([vlng, vlat])
        .addTo(mapRef.current);
    });
  }

  return () => {
    if (mapRef.current) mapRef.current.remove();
  };
}, [vlat, vlng]);

  useEffect(() => {
    if (!mapRef.current || !teachers.length) return;

    // Remove existing markers if any
    if (mapRef.current.teacherMarkers) {
      mapRef.current.teacherMarkers.forEach(marker => marker.remove());
    }
    mapRef.current.teacherMarkers = [];

    teachers.forEach((teacher) => {
      if (teacher.latitude && teacher.longitude) {
        // Create a custom circle marker
        const el = document.createElement('div');
        el.style.width = '18px';
        el.style.height = '18px';
        el.style.background = 'rgb(59, 226, 137)';
        el.style.border = '2px solid #fff';
        el.style.borderRadius = '50%';
        el.style.boxShadow = '0 0 8px rgb(42, 255, 74)';
        el.title = teacher.name || "Teacher";

        const marker = new mapboxgl.Marker(el)
          .setLngLat([teacher.longitude, teacher.latitude])
          .addTo(mapRef.current);

        // Create popup
        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
          offset: 25
        }).setHTML(`
          <div>
            <strong>${teacher.name || "No Name"}</strong><br/>
            Email: ${teacher.email || "N/A"}<br/>
            Phone: ${teacher.phone || "N/A"}
          </div>
        `);

        // Show popup on hover
        el.addEventListener('mouseenter', () => {
          popup.addTo(mapRef.current).setLngLat([teacher.longitude, teacher.latitude]);
        });
        el.addEventListener('mouseleave', () => {
          popup.remove();
        });

        mapRef.current.teacherMarkers.push(marker);
      }
    });
  }, [teachers]);

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

export default TeacherLocations;
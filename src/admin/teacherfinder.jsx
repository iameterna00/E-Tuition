import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import axios from "axios";
import { webApi } from "../api";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { FaRegCopy } from "react-icons/fa";
import ReactDOMServer from "react-dom/server";
import { getAuth } from "firebase/auth";
import MoreTeachers from '../JSON/teachers_details.json'

const TeacherLocations = ({ vlat, vlng, useVacancyTeachers, moreTeacherSource }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
 const fetchTeachers = async () => {
  try {
    // If we're using MoreTeachers JSON instead of API
    if (moreTeacherSource) {
      const mapped = MoreTeachers.map((t, index) => ({
        uid: `local-${index}`,
        name: t.FullName,
        email: t.Email,
        phone: t.Phone,
        latitude: t.Latitude,
        longitude: t.Longitude,
        cvFileUrl: t.CV_URL,
        gender: t.Gender, 
      }));
      setTeachers(mapped);
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.warn("User not logged in");
      return;
    }

    const token = await user.getIdToken();

    const endpoint = useVacancyTeachers
      ? `${webApi}/api/vacancies/summary`
      : `${webApi}/api/teachers`;

    const res = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const teacherData = useVacancyTeachers ? res.data : res.data?.teachers;

    if (Array.isArray(teacherData)) {
      setTeachers(teacherData);
    } else {
      console.error("Unexpected teacher data format:", res.data);
    }
  } catch (err) {
    console.error("Error fetching teachers:", err);
  }
};


    fetchTeachers();
  }, [useVacancyTeachers , moreTeacherSource]);

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
      // Ignore teacher if latitude or longitude is missing
      if (!teacher.latitude || !teacher.longitude || !teacher.phone) {
        return; // Skip this teacher if essential data is missing
      }

      // Set marker color based on gender
      let bgColor = "rgb(0, 229, 237)"; // default green for male/other

      // Improved gender check
      if (teacher.gender) {
        const gender = teacher.gender.trim().toLowerCase();
        if (gender === "female" || gender === "f" || gender.startsWith("female")) {
          bgColor = "rgb(157, 0, 255)"; // pink for female
        }
      }

      const el = document.createElement('div');
      el.style.width = '12px';
      el.style.height = '12px';
      el.style.background = bgColor;
      el.style.border = '2px solid #fff';
      el.style.borderRadius = '50%';
      el.style.boxShadow = '0 0 8px ' + bgColor;
      el.title = teacher.name || "Teacher";

      const marker = new mapboxgl.Marker(el)
        .setLngLat([teacher.longitude, teacher.latitude])
        .addTo(mapRef.current);

      // Unique ID for the copy button
      const copyId = `copy-phone-${teacher.uid || teacher._id || Math.random()}`;

      // Render the React icon to SVG string
      const copyIconSVG = ReactDOMServer.renderToString(
        <FaRegCopy size={18} style={{ verticalAlign: "middle" }} />
      );

      // Create popup with copy icon SVG
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 25
      }).setHTML(`
        <div>
          ${useVacancyTeachers ? `<strong>Grade ${teacher.grade || "No grade"}</strong><br/>
          Sub: ${teacher.subject || "N/A"}<br/>` : `<strong>${teacher.name || "No Name"}</strong><br/>
          Email: ${teacher.email || "N/A"}<br/>`}
          Phone: ${teacher.phone || "N/A"}
          <span id="${copyId}" style="cursor:pointer; margin-left:8px; vertical-align:middle;" title="Copy phone">${copyIconSVG}</span>
          ${teacher.cvFileUrl ? `<br/><button onclick="window.open('${teacher.cvFileUrl}', '_blank')">View CV</button>` : ""}
        </div>
      `);
      // Show popup on hover
      el.addEventListener('mouseenter', () => {
        popup.addTo(mapRef.current).setLngLat([teacher.longitude, teacher.latitude]);
        // Add copy event after popup is added to DOM
        setTimeout(() => {
          const copyBtn = document.getElementById(copyId);
          if (copyBtn) {
            copyBtn.onclick = () => {
              navigator.clipboard.writeText(teacher.phone || "");
              copyBtn.innerHTML = "✅";
              setTimeout(() => { copyBtn.innerHTML = copyIconSVG; }, 1000);
            };
          }
        }, 0);
      });

      // Remove popup if clicking anywhere else on the map
      mapRef.current.on('click', (e) => {
        if (e.originalEvent.target !== el) {
          popup.remove();
        }
      });

      mapRef.current.teacherMarkers.push(marker);
    });
  }, [teachers]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        maxWidth: "800px",
        height: "400px",
        width: "100%",
        borderRadius: "8px",
      }}
    />
  );
};

export default TeacherLocations;

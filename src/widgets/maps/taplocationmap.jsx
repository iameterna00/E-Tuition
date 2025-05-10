import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

const TapLocationMap = ({ user, handleLatLngChange }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const geolocateRef = useRef(null);
  const locationInputRef = useRef(null);

  // MAP INITIALIZATION
  useEffect(() => {
    if (!user || !mapContainerRef.current) return;

    mapboxgl.accessToken =
      "pk.eyJ1IjoiYW5pc2hoLWpvc2hpIiwiYSI6ImNrdWo5d2lhdDFkb2oybnJ1MDB4OG1oc2EifQ.pLrp8FmZSLVfT3pAVVPBPg"; // Use your actual token

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [85.300140, 27.700769],
      zoom: 12,
      maxBounds: [
        [85.265, 27.591],
        [85.575, 27.858],
      ],
    });

    mapRef.current = map;

    // Initialize Geocoder
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: "Add your address...",
      countries: "np",
      bbox: [85.265, 27.591, 85.575, 27.858],
    });

    map.addControl(geocoder);

    // Handle geocoder result
    geocoder.on("result", (e) => {
      const locationName = e.result.place_name;
      if (locationInputRef.current) {
        locationInputRef.current.value = locationName;
      }
      const [longitude, latitude] = e.result.center;

      updateMarkerAndLatLng(longitude, latitude, locationName);
    });

    // GEO_LOCATE
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: false,
      showUserHeading: false,
      fitBoundsOptions: {
        zoom: 15,
      },
    });

    map.scrollZoom.disable();

    map.on("mousedown", () => {
      map.scrollZoom.enable();
    });

    map.on("drag", () => {
      map.scrollZoom.enable();
    });

    map.addControl(geolocate);
    geolocateRef.current = geolocate;

    geolocate.on("trackuserlocationend", () => {
      locationInputRef.current.value = null;
      if (geolocateRef.current) {
        geolocateRef.current.trigger();
      }
    });

    // Geolocate event to handle the location selection
    geolocate.on("geolocate", async (position) => {
      const { longitude, latitude } = position.coords;
      const locationName = await getLocationName(longitude, latitude);
      updateMarkerAndLatLng(longitude, latitude, locationName);
    });

    // HANDLE MAP CLICK
    map.on("click", async (e) => {
      const { lngLat } = e;
      const [longitude, latitude] = [lngLat.lng, lngLat.lat];
      const locationName = await getLocationName(longitude, latitude);
      updateMarkerAndLatLng(longitude, latitude, locationName);
    });

    return () => map.remove();
  }, [user]);

  // Update marker and latLng
  const updateMarkerAndLatLng = async (longitude, latitude, locationName) => {
    // Remove the previous marker (if exists)
    if (markerRef.current) {
      markerRef.current.remove();
    }

    // Create popup content
    const popupContent = `
      <div class="popup-content" style="color: white; text-align: center;">
        <h3>Selected  Location:</h3>
        <p>${locationName}</p>
      </div>`;

    // Create a new popup
    const popup = new mapboxgl.Popup({ offset: 30 }).setHTML(popupContent);

    // Create a new marker
    markerRef.current = new mapboxgl.Marker({
      color: "#008cbf",
      scale: 1,
    })
      .setLngLat([longitude, latitude])
      .setPopup(popup)
      .addTo(mapRef.current);

    popup.addTo(mapRef.current);

    // Pass the latLng data to the parent component
    handleLatLngChange({
      lat: latitude,
      lng: longitude,
      name: locationName,
    });
  };

  // Get location name based on latLng
  const getLocationName = async (longitude, latitude) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`
    );
    const data = await response.json();
    const place = {
      subLocality: data.features.find((f) => f.place_type.includes("region"))?.text,
      street: data.features.find((f) => f.place_type.includes("place"))?.text,
      locality: data.features.find((f) => f.place_type.includes("locality"))?.text,
    };

    return buildLocationName(place);
  };

  // Build location name
  const buildLocationName = (place) => {
    const locationParts = [];

    if (place.subLocality) {
      locationParts.push(place.subLocality);
    }

    if (place.street) {
      locationParts.push(place.street);
    }

    if (place.locality) {
      locationParts.push(place.locality);
    }

    return locationParts.join(", ");
  };

  return (
    <div
      ref={mapContainerRef}
      className="map-container"
      style={{ height: "400px", borderRadius: "10px" }}
    />
  );
};

export default TapLocationMap;

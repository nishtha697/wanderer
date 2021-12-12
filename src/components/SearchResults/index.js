import React, { useEffect, useRef, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";

import "./map.css";

const SearchResults = ({ search = "boston" }) => {
  const map = useRef(null);
  const mapContainerRef = useRef(null);
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic2FuYXRkIiwiYSI6ImNrd3c1ZHFjMDAwY20ybnJub2JwbXpzZ28ifQ.BdhcnhVjty1EWLcHzHVKhw";

  const fetchData = useCallback(() => {
    const geocodingClient = mbxGeocoding({
      accessToken: mapboxgl.accessToken,
    });

    // geocoding with countries
    return geocodingClient
      .forwardGeocode({
        query: search,
        countries: ["us"],
        limit: 2,
      })
      .send()
      .then((response) => {
        const match = response.body;
        const coordinates = match.features[0].geometry.coordinates;
        const placeName = match.features[0].place_name;
        const center = match.features[0].center;

        return {
          type: "Feature",
          center: center,
          geometry: {
            type: "Point",
            coordinates: coordinates,
          },
          properties: {
            description: placeName,
          },
        };
      });
  }, [search]);

  useEffect(() => {
    if (map.current) return; // Checks if there's an already existing map initialised.

    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/satellite-streets-v11",
      zoom: 9,
      center: [-71.0589, 42.3601],
    });

    // clean up on unmount
    return () => map.current.remove();
  }, []);

  useEffect(() => {
    if (!map.current) return; // Waits for the map to initialise

    const results = fetchData();

    results.then((marker) => {
      // create a HTML element for each feature
      const el = document.createElement("div");
      el.className = "circle";

      // make a marker for each feature and add it to the map
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offsetLeft: 25, offsetTop: 15 }) // add popups
            .setHTML("<p>" + marker.properties.description + "</p>")
        )
        .addTo(map.current);

      map.current.on("load", async () => {
        map.current.flyTo({
          center: marker.center,
        });
      });
    });
  }, [fetchData]);

  return (
    <div>
      <div ref={mapContainerRef} className="map-container" />
    </div>
  );
};

export default SearchResults;

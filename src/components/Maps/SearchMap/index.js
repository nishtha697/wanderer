import React, { useEffect } from "react";
import { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

const SearchMap = (props) => {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "50vh",
    latitude: 42.95,
    longitude: -74.23,
    zoom: 12,
  });

  useEffect(() => {
    setViewport({
      width: "100vw",
      height: "50vh",
      latitude: props.lat,
      longitude: props.lng,
      zoom: 12,
    });
  }, [props.lat, props.lng]);

  return (
    <ReactMapGL
      mapboxApiAccessToken="pk.eyJ1Ijoic2FuYXRkIiwiYSI6ImNrd3c1ZHFjMDAwY20ybnJub2JwbXpzZ28ifQ.BdhcnhVjty1EWLcHzHVKhw"
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
      transitionDuration="10"
    >
      <Marker
        latitude={props.lat}
        longitude={props.lng}
        offsetLeft={-20}
        offsetTop={-10}
      >
        <i
          className="fas fa-map-marker-alt"
          style={{
            fontSize: 2 * viewport.zoom,
            color: "orangered",
            cursor: "pointer",
          }}
        />
      </Marker>
    </ReactMapGL>
  );
};

export default SearchMap;

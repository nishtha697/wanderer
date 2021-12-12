import React from "react";
import { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

const Map = (props) => {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "50vh",
    latitude: props.lat,
    longitude: props.lng,
    zoom: 12,
  });

  return (
    <ReactMapGL
      mapboxApiAccessToken="pk.eyJ1Ijoic2FuYXRkIiwiYSI6ImNrd3c1ZHFjMDAwY20ybnJub2JwbXpzZ28ifQ.BdhcnhVjty1EWLcHzHVKhw"
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
    >
      <Marker
        latitude={props.lat}
        longitude={props.lng}
        offsetLeft={-20}
        offsetTop={-10}
      >
        <div>You are here</div>
      </Marker>
    </ReactMapGL>
  );
};

export default Map;

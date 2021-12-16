import React, { useEffect } from "react";
import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

const SearchMap = (props) => {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "50vh",
    latitude: 42.95,
    longitude: -74.23,
    zoom: 12,
  });

  const [popup, setPopup] = useState(false);

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
        onClick={() => setPopup(true)}
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
      {popup === true && <Popup
          key={0}
          latitude={props.lat}
          longitude={props.lng}
          closeButton={true}
          closeOnClick={false}
          anchor="left"
          onClose={() => setPopup(false)}
      >
        {props.search}
      </Popup>}
    </ReactMapGL>
  );
};

export default SearchMap;

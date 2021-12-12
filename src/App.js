import "./App.css";
import React, { useRef, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import mapboxgl from "mapbox-gl";
// import "bootstrap/dist/css/bootstrap.min.css";
import HomeScreen from "./components/HomeScreen";
import SearchResults from "./components/SearchResults";
import Map from "./components/Map";

function App() {
  // const mapContainer = useRef(null);
  // const map = useRef(null);
  // const [lng, setLng] = useState(-70.9);
  // const [lat, setLat] = useState(42.35);
  // const [zoom, setZoom] = useState(9);

  // useEffect(() => {
  //   if (map.current) return;
  //   map.current = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: "mapbox://styles/mapbox/streets-v11",
  //     center: [lng, lat],
  //     zoom: zoom,
  //   });
  // });

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

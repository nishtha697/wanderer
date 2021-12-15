import React, { useEffect, useState } from "react";
import "./index.css";
import ReactMapGL, { Marker } from "react-map-gl";
import Navbar from "../NavBar/Navbar";

const HomeScreen = () => {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "50vh",
    latitude: 42.95,
    longitude: -74.23,
    zoom: 12,
  });

  useEffect(() => {
    setViewport({
      width: "100%",
      height: "50vh",
      latitude: 42.3601,
      longitude: -71.0589,
      zoom: 12,
    });
  }, []);

  return (
    <>
      <Navbar />
      <ReactMapGL
        mapboxApiAccessToken="pk.eyJ1Ijoic2FuYXRkIiwiYSI6ImNrd3c1ZHFjMDAwY20ybnJub2JwbXpzZ28ifQ.BdhcnhVjty1EWLcHzHVKhw"
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
        transitionDuration="10"
      >
        <Marker
          latitude={42.3601}
          longitude={-71.0589}
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
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <img src="/images/connect.jpg" className="connect" />
            <h2>Connect</h2>
            <p>
              Want to share some of your best moments with everyone out there?
              Wandered lets you do that with just a click. Share places that you
              have visited and let others get a feel of the place...
            </p>
          </div>
          <div className="col-lg-4">
            <img src="/images/location.jpg" className="connect" />
            <h2>Experience</h2>
            <p>
              With Wanderer, you can explore places which you have never visited
              before. It can help you get reviews of any place anywhere in the
              world.
            </p>
          </div>
          <div className="col-lg-4">
            <img src="/images/service-provider.jpg" className="connect" />
            <h2>Business</h2>
            <p>
              Want to grow your business? Join us on Wanderer where you can
              register as a service provider and expand your business. With a
              very simplistic yet modern user interface, you get all the
              functionalities you may require to grow your market.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;

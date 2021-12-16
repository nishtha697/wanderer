import React from "react";
<<<<<<< HEAD
import Map from "../Map";
import Results from "../Results";

const SearchComponent = (props) => {
  return (
    <div>
      <Map lat={props.lat} lng={props.lng} />
      <div>
        <ul>
          <Results lat={props.lat} lng={props.lng} />
        </ul>
      </div>
    </div>
=======
import { useLocation, useParams } from "react-router-dom";
import SearchMap from "../Maps/SearchMap";
import Navbar from "../NavBar/Navbar";
import Results from "../Results";

const SearchComponent = () => {

  const location = useLocation();
  const { latitude, longitude } = location.state !== null && location.state;
  const pathname = location.pathname;

    const search = pathname.slice(8, pathname.length - 1)
  return (
    <>
      <Navbar />
      <div>
        <SearchMap lat={latitude} lng={longitude} search={search}/>
        <div>
          <ul>
            <Results lat={latitude} lng={longitude} search={search}/>
          </ul>
        </div>
      </div>
    </>
>>>>>>> 86728a3af7c557e417478399b0a23d80f6d2bcb7
  );
};

export default SearchComponent;

import React from "react";
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
  );
};

export default SearchComponent;

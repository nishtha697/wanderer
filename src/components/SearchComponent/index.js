import React from "react";
import { useLocation, useParams } from "react-router-dom";
import SearchMap from "../Map/SearchMap";
import Navbar from "../NavBar/Navbar";
import Results from "../Results";

const SearchComponent = () => {

  const location = useLocation();
  const { latitude, longitude } = location.state;
  const pathname = location.pathname;

    const search = pathname.slice(8, pathname.length - 1)
  return (
    <>
      <Navbar />
      <div>
        <SearchMap lat={latitude} lng={longitude} />
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

import React from "react";
import { useLocation, useParams } from "react-router-dom";
import SearchMap from "../Map/SearchMap";
import Navbar from "../NavBar/Navbar";
import Results from "../Results";

const SearchComponent = () => {
  //   console.log(props);
  //   const { latitude, longitude } = useParams();
  const location = useLocation();
  const { latitude, longitude } = location.state;
  //   const latitude = this.props.match.params.lat;
  //   const longitude = this.props.match.params.lng;

  return (
    <>
      <Navbar />
      <div>
        <SearchMap lat={latitude} lng={longitude} />
        <div>
          <ul>
            <Results lat={latitude} lng={longitude} />
          </ul>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;

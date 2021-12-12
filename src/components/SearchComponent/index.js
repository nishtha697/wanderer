import React from "react";
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
  );
};

export default SearchComponent;

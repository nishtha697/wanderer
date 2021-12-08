import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import MapboxAutocomplete from "react-mapbox-autocomplete";
import SearchComponent from "../SearchComponent";

import "./navbar.css";

const Navbar = ({ inMapMode }) => {
  let [lat, setLat] = useState(null);
  let [lng, setLng] = useState(null);
  let [result, setResult] = useState("");
  let [isSearched, setIsSearched] = useState(false);
  const _suggestionSelect = (result, lat, lng, text) => {
    setResult(result);
    const lt = Number(lat);
    const lang = Number(lng);
    setLat(lt);
    setLng(lang);

    setIsSearched(true);
  };


  const handleSearchClick = () => {
    setResult("");
  };

  return (
    <div className="nav justify-content-between sticky-top nav-pills shadow ps-5 pe-5 pb-2 pt-2 mb-2 menu">
      <Link to="/" className="navbar-brand">
        <img
          src={`${process.env.PUBLIC_URL}/images/wanderer.png`}
          alt=""
          height="50"
        />
      </Link>
      <div className=" navbar">
        <div className="wd-search">
          <span>
            <i className="fas fa-map-marker-alt" />
            <MapboxAutocomplete
              publicKey="pk.eyJ1Ijoic2FuYXRkIiwiYSI6ImNrd3c1ZHFjMDAwY20ybnJub2JwbXpzZ28ifQ.BdhcnhVjty1EWLcHzHVKhw"
              inputClass="wd-search-twitter form-control"
              onSuggestionSelect={_suggestionSelect}
              country="us"
              resetSearch={false}
            />
            {/* <input className="wd-search-twitter form-control" type="search"
                            placeholder="Search Location" /> */}
            <Link
              to={{
                pathname: `/search/${result}`,
                state: {
                  latitude: lat,
                  longitude: lng,
                  search: result,
                },
              }}
            >
              <button
                className={`btn btn-secondary wd-search-btn wd-round-btn `}
                onClick={handleSearchClick}
                disabled={!result}
              >
                {" "}
                Search
              </button>
            </Link>
   </span>
        </div>
        {inMapMode === true && (
          <div className="nav nav-item ps-2 pe-2">
            <Link
              className={`btn btn-secondary wd-round-btn`}
              to={`/profile`}
              exact={true}
            >
              Profile
            </Link>
          </div>
        )}
      </div>
      <ul className="nav navbar d-inline-flex justify-content-center">
        <li className="nav nav-item ps-2 pe-2">
          <Link
            className="logout btn btn-danger wd-logout-btn wd-round-btn"
            to="#"
          >
            Log out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

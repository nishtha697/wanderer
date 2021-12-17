import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import MapboxAutocomplete from "react-mapbox-autocomplete";
import SearchComponent from "../SearchComponent";

import "./navbar.css";

const Navbar = ({ inProfileMode = false }) => {
  let history = useHistory();
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    setUser(() => JSON.parse(localStorage.getItem("user")));
  }, [localStorage.getItem("user")]);

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

  const logoutHandler = () => {
    localStorage.clear();
    setUser(null);
    history.push("/");
  };

  const handleSearchClick = () => {
    setResult("");
  };

  return (
    <div className="nav justify-content-between sticky-top nav-pills shadow ps-5 pe-5 pt-2 pb-2 menu">
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
              countries="us ae"
              resetSearch={false}
            />
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
      </div>
      <ul className="nav navbar d-inline-flex justify-content-center">
        {user !== null ? (
          inProfileMode === false ? (
            <>
              {JSON.parse(localStorage.getItem("user")).role === "admin" && (
                <div className="nav nav-item ps-2 pe-2">
                  <Link
                    className={`btn wd-profile-icon`}
                    to={`/admin`}
                    exact={true}
                  >
                    <i className="fas fa-bell"></i>
                  </Link>
                </div>
              )}
              <div className="nav nav-item ps-2 pe-2">
                <Link
                  className={`btn wd-profile-icon`}
                  to={`/profile`}
                  exact={true}
                >
                  <i className="fas fa-user"></i>
                </Link>
              </div>
              <li className="nav nav-item ps-2 pe-2">
                <button
                  className="logout btn btn-danger wd-logout-btn wd-round-btn"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              {JSON.parse(localStorage.getItem("user")).role === "admin" && (
                <div className="nav nav-item ps-2 pe-2">
                  <Link
                    className={`btn wd-profile-icon`}
                    to={`/admin`}
                    exact={true}
                  >
                    <i className="fas fa-bell"></i>
                  </Link>
                </div>
              )}
              <li className="nav nav-item ps-2 pe-2">
                <button
                  className="logout btn btn-danger wd-logout-btn wd-round-btn"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </li>
            </>
          )
        ) : (
          <>
            <li className="nav nav-item ps-2 pe-2">
              <Link
                className="logout btn btn-success wd-logout-btn wd-round-btn"
                to="/login"
              >
                Login
              </Link>
            </li>
            <li className="nav nav-item ps-2 pe-2">
              <Link
                className="logout btn btn-primary wd-logout-btn wd-round-btn"
                to="/user"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;

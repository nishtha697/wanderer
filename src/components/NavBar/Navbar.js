import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import MapboxAutocomplete from "react-mapbox-autocomplete";
import Modal from "react-modal";
import Privacy from "../Privacy/Privacy";
import "./navbar.css";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "1000px",
    height: "500px",
  },
};

const Navbar = () => {
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

  const _suggestionSelect = (result, lat, lng, text) => {
    setResult(result);
    const lt = Number(lat);
    const lang = Number(lng);
    setLat(lt);
    setLng(lang);
  };

  const logoutHandler = () => {
    localStorage.clear();
    setUser(null);
    history.push("/");
  };

  const handleSearchClick = () => {
    setResult("");
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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
        <div
            type="button"
            className="wd-profile-icon nav nav-item ps-2 pe-2"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={openModal}
        >
          <i className="fas fa-file-signature"/>
        </div>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
          <Privacy />
          <button
              type="button"
              className="btn btn-primary"
              onClick={closeModal}
          >
            Close
          </button>
        </Modal>
        {user !== null ? (
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
            <li className="nav nav-item ps-3 pe-2">
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

import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useDispatch } from "react-redux";
import { deletePost, postNewPost } from "../../services/postService";
import { Link } from "react-router-dom";

import { format } from "timeago.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PROFILE_API = "http://18.222.87.70:4000/api/user";

const Maps = ({ posts }) => {
  const dispatch = useDispatch();
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 42.3601,
    longitude: -71.0589,
    zoom: 6,
  });

  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newLocation, setNewLocation] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [user, setUser] = useState({});

  const popupMarker = (post, lat, long) => {
    fetch(`${PROFILE_API}/${post.user_Id}`)
        .then((response) => response.json())
        .then((user) => setUser(user));
    setCurrentPlaceId(post._id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const addNewLocation = (error) => {
    const [longitude, latitude] = error.lngLat;
    setNewLocation({
      lat: latitude,
      long: longitude,
    });
  };

  const submitClickHandler = () => {
    if (title === "") {
      toast.error("Title cannot be empty!", { theme: "colored" });
    } else {
      postNewPost(dispatch, {
        title,
        description,
        user_Id: loggedUser._id,
        latitude: newLocation.lat,
        longitude: newLocation.long,
        visit_date: date,
      }).then(() => toast.success("Post saved.", {theme: "colored"}));
      setNewLocation(null);
      setDescription("");
    }
  };

  const deletePostClickHandler = (post) => {
    deletePost(dispatch, post).then(() => toast.info("Post deleted.", { theme: "colored" }));
  };

  const providerPosts = posts.filter((item) => item.location !== undefined);
  const uniqueLocations = [
    ...new Set(providerPosts.map((item) => item.location)),
  ];

  const serviceTitlesMapByLocation = new Map();
  uniqueLocations.map((location) => {
    serviceTitlesMapByLocation.set(
      location,
      providerPosts
        .filter((item) => item.location === location)
        .map((post) => post.title)
    );
  });

  return (
    <>
      <ToastContainer />
      <ReactMapGL
        className="wd-map"
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        transitionDuration="10"
        mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
        onViewportChange={(viewport) => setViewport(viewport)}
        onDblClick={addNewLocation}
      >
        {posts.map((post) => {
          const latitude = Number.isFinite(post.latitude)
            ? post.latitude
            : Number.parseFloat(post.latitude["$numberDouble"]);
          const longitude = Number.isFinite(post.longitude)
            ? post.longitude
            : Number.parseFloat(post.longitude["$numberDouble"]);

          return (
            <>
              <Marker
                latitude={latitude}
                longitude={longitude}
                offsetLeft={-3.5 * viewport.zoom}
                offsetTop={-7 * viewport.zoom}
              >
                <i
                  className="fas fa-map-marker-alt"
                  style={{
                    fontSize: 4 * viewport.zoom,
                    color:
                        loggedUser && (post.user_Id.toString() === loggedUser._id)
                        ? "dodgerblue"
                        : "orangered",
                    cursor: "pointer",
                  }}
                  onClick={() => popupMarker(post, latitude, longitude)}
                />
              </Marker>
              {post._id === currentPlaceId && post.visit_date !== undefined && (
                <Popup
                  key={post._id}
                  latitude={latitude}
                  longitude={longitude}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setCurrentPlaceId(null)}
                  anchor="left"
                >
                  <div
                    className="card"
                    style={{ border: "none", width: "auto", maxWidth: "500px" }}
                  >
                    <Link
                        className="wd-user"
                        to={{
                          pathname: `/profile/${user._id}`,
                          state: { user: user },
                        }}
                    >{user.firstName} {user.lastName}</Link>
                    <h6 className="wd-popup">{post.title}</h6>
                    <p className="wd-popup wd-popup-description">
                      {post.description}
                    </p>
                    <span className="wd-popup-date">
                      {format(post.createdAt)}
                    </span>
                    {loggedUser && (post.user_Id.toString() === loggedUser._id) && (
                      <button
                        className="btn btn-danger rounded-pill m-1 wd-tweet"
                        onClick={() => deletePostClickHandler(post)}
                      >
                        Delete Post
                      </button>
                    )}
                  </div>
                </Popup>
              )}
              {post._id === currentPlaceId &&
                post.location !== undefined &&
                post.visit_date === undefined && (
                  <Popup
                    key={post._id}
                    latitude={latitude}
                    longitude={longitude}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => setCurrentPlaceId(null)}
                    anchor="left"
                  >
                    <div
                      className="card"
                      style={{
                        border: "none",
                        width: "auto",
                        maxWidth: "500px",
                      }}
                    >
                      <h6 className="wd-popup me-2">Services available: </h6>
                      {serviceTitlesMapByLocation
                        .get(post.location)
                        .map((title) => (
                          <Link className="wd-popup wd-popup-description wd-profile-link" to={{
                            pathname: `/profile/${user._id}`,
                            state: { user: user },
                          }}>
                            {title}
                          </Link>
                        ))}
                    </div>
                  </Popup>
                )}
            </>
          );
        })}
        {newLocation && loggedUser.role === "user" && (
          <>
            <Marker
              latitude={newLocation.lat}
              longitude={newLocation.long}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            >
              <i
                className="fas fa-map-marker-alt"
                style={{
                  fontSize: 7 * viewport.zoom,
                  color: "dodgerblue",
                  cursor: "pointer",
                }}
              />
            </Marker>
            <Popup
              latitude={newLocation.lat}
              longitude={newLocation.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setNewLocation(null)}
              anchor="left"
            >
              <div className="wd-add-post">
                <label className="ms-1 mt-1 wd-input-label">Title:</label>
                <input
                  className="p-1 m-1 wd-add-input"
                  placeholder="Title"
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label className="ms-1 mt-1 wd-input-label">Visit date:</label>
                <input
                  type="date"
                  className="p-2 m-1 wd-add-input"
                  onChange={(e) => setDate(e.target.value)}
                />
                <label className="ms-1 mt-1 wd-input-label">Description:</label>
                <textarea
    className="p-1 m-1 wd-add-input"
    value={description}
    onChange={(event) => setDescription(event.target.value)}
    width="100%"
    rows="6"
    placeholder="Tell us about your experience"
    />
                <button
                  className="btn btn-primary rounded-pill m-1 wd-tweet"
                  onClick={submitClickHandler}
                >
                  Add Post
                </button>
              </div>
            </Popup>
          </>
        )}
      </ReactMapGL>
    </>
  );
};

export default Maps;

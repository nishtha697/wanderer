import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, postNewPost } from "../../services/postService";
import { getCurrentProfile } from "../../services/userService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Map = ({ posts }) => {
  const dispatch = useDispatch();
  const userData = (state) => state.user;
  const user = useSelector(userData);
  useEffect(
    () => getCurrentProfile(dispatch, "nishthagoswami697@gmail.com"),
    []
  );

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

  const popupMarker = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const addNewLocation = (error) => {
    debugger;
    const [longitude, latitude] = error.lngLat;
    setNewLocation({
      lat: latitude,
      long: longitude,
    });
  };

  debugger;
  const submitClickHandler = () => {
    postNewPost(dispatch, {
      title,
      description,
      user_Id: user._id,
      latitude: newLocation.lat,
      longitude: newLocation.long,
      visit_date: date,
    }).then(() => toast.success("Post saved.", { theme: "colored" }));
    setNewLocation(null);
  };

  const deletePostClickHandler = (post) => {
    deletePost(dispatch, post);
  };

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
                      post.user_Id.toString() === user._id
                        ? "dodgerblue"
                        : "orangered",
                    cursor: "pointer",
                  }}
                  onClick={() => popupMarker(post._id, latitude, longitude)}
                />
              </Marker>
              {post._id === currentPlaceId && (
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
                    <h6 className="wd-popup">{post.title}</h6>
                    <p className="wd-popup wd-popup-description">
                      {post.description}
                    </p>
                    <span className="wd-popup-date">1 hour ago</span>
                    {post.user_Id.toString() === user._id && (
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
            </>
          );
        })}
        {newLocation && (
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
                ></textarea>
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

export default Map;

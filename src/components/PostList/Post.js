import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { format } from "timeago.js";
import "../../css/profile.css";
import { Link } from "react-router-dom";
import { likePost } from "../../services/postService";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Post = ({ posts }) => {
  const latestPost =
    posts.length !== 0 &&
    posts.reduce((a, b) => (a.createdAt > b.createdAt ? a : b));
  const [user, setUser] = useState({});
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`http://18.222.87.70:4000/api/user/${latestPost.user_Id}`)
      .then((response) => response.json())
      .then((user) => setUser(user));
  }, []);

  const latestLatitude = Number.isFinite(latestPost.latitude)
    ? latestPost.latitude
    : Number.parseFloat(latestPost.latitude["$numberDouble"]);
  const latestLongitude = Number.isFinite(latestPost.longitude)
    ? latestPost.longitude
    : Number.parseFloat(latestPost.longitude["$numberDouble"]);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: 400,
    latitude: latestLatitude,
    longitude: latestLongitude,
    zoom: 8,
  });

  const [currentPlaceId, setCurrentPlaceId] = useState(null);

  const popupMarker = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  let history = useHistory();

  const dispatch = useDispatch();
  const likeClickHandler = (post) => {
    if (loggedUser) {
      likePost(dispatch, post);
    } else {
      history.push("/login");
    }
  };

  return (
      <>
  <li className="wd-post list-group-item">
      <div className="row">
        <div className="col-1">
          <img
            className="wd-profile-image"
            src={`http://18.222.87.70:4000/${user.profile_pic}`}
            alt="profile img"
          />
        </div>
        <div className="col-11 wd-image-content">
          <Link
            className="wd-user"
            to={{
              pathname: `/profile/${user._id}`,
              state: { user: user },
            }}
          >
            {user.firstName} {user.lastName}{" "}
          </Link>
          &middot;
          <span className="wd-timestamp">
            {new Date(latestPost.createdAt).toDateString()}
          </span>
          <p className="wd-popup-title">{latestPost.title}</p>
          <p>{latestPost.description}</p>
          <ReactMapGL
            className="wd-map"
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
            mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
            onViewportChange={(viewport) => setViewport(viewport)}
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
                        color: "orangered",
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
                        style={{
                          border: "none",
                          width: "auto",
                          maxWidth: "300px",
                        }}
                      >
                        <h6 className="wd-popup">{post.title}</h6>
                        <p className="wd-popup wd-popup-description">
                          {post.description}
                        </p>
                        <span className="wd-popup-date">
                          {format(post.createdAt)}
                        </span>
                        <div
                          className="wd-icon"
                          onClick={() => likeClickHandler(post)}
                        >
                          <div className="wd-post-icon">
                            {post.liked && (
                              <i
                                className="fas fa-heart me-2"
                                style={{ color: post.liked ? "red" : "white" }}
                              />
                            )}
                            {!post.liked && <i className="far fa-heart me-2" />}
                            <span className="wd-icon-text">{post.likes}</span>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  )}
                </>
              );
            })}
          </ReactMapGL>
        </div>
      </div>
    </li>
      </>
  );
};

export default Post;

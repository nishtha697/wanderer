import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import { format } from "timeago.js";
import "../../css/profile.css";

const Post = ({ posts }) => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: 400,
    latitude: 42.3601,
    longitude: -71.0589,
    zoom: 8,
  });
  const [currentPlaceId, setCurrentPlaceId] = useState(null);

  // const dispatch = useDispatch();
  // const deletePostClickHandler = () => {
  //     deletePost(dispatch, post);
  // };

  const popupMarker = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  return (
    <li className="wd-post list-group-item">
      <div className="row">
        <div className="col-1">
          <img
            className="wd-profile-image"
            src={`${process.env.PUBLIC_URL}/images/profile-image.png`}
            alt="profile img"
          />
        </div>
        <div className="col-11 wd-image-content">
          <h6 className="wd-user">Nishtha Goswami</h6>
          <p>
            Living my best life by checking the places in my bucket list off.
          </p>
          <ReactMapGL
            className="wd-map"
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
            mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
            onViewportChange={(viewport) => setViewport(viewport)}
          >
            {posts.map((post) => {
              return (
                <>
                  <Marker
                    latitude={post.latitude}
                    longitude={post.longitude}
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
                      onClick={() =>
                        popupMarker(post._id, post.latitude, post.longitude)
                      }
                    />
                  </Marker>
                  {post._id === currentPlaceId && (
                    <Popup
                      key={post._id}
                      latitude={post.latitude}
                      longitude={post.longitude}
                      closeButton={true}
                      closeOnClick={false}
                      onClose={() => setCurrentPlaceId(null)}
                      anchor="left"
                    >
                      <div
                        className="card"
                        style={{ border: "none", width: "150px" }}
                      >
                        <h6 className="wd-popup">{post.title}</h6>
                        <p className="wd-popup wd-popup-description">
                          {post.description}
                        </p>
                        <span className="wd-popup-date">1 hour ago</span>
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
  );
};

export default Post;

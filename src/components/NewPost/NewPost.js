import React, {useState} from "react";
import * as PropTypes from "prop-types";
import "../../css/addpost.css";
import MapboxAutocomplete from "react-mapbox-autocomplete";
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import {postNewPost} from "../../services/postService";
import {useDispatch} from "react-redux";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

MapboxAutocomplete.propTypes = {
    inputClass: PropTypes.string,
    resetSearch: PropTypes.bool,
    country: PropTypes.string,
    onSuggestionSelect: PropTypes.func,
    publicKey: PropTypes.string
};


const NewPost = ({userId, userRole}) => {
    let [lat, setLat] = useState(null);
    let [lng, setLng] = useState(null);
    let [result, setResult] = useState("");
    const [viewport, setViewport] = useState({
                                                 width: "100%",
                                                 height: 400,
                                                 latitude: 42.3601,
                                                 longitude: -71.0589,
                                                 zoom: 6,
                                             });
    const _suggestionSelect = (result, lat, lng, text) => {
        setResult(result);
        const lt = Number(lat);
        const lang = Number(lng);
        setLat(lt);
        setLng(lang);

        setViewport({...viewport, latitude: lt, longitude: lang})
    };

    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(null);


    const submitClickHandler = () => {
        postNewPost(dispatch, {
            title,
            description,
            user_Id: userId,
            latitude: lat,
            visitDate: date,
            longitude: lng,
            location: result
        }).then(() => toast.success("Post saved.", {theme: "colored"}))

        setTitle("")
        setDescription("")
        if (userRole !== "provider") {
            setResult("")
        }

    }

    const handleSearchClick = () => {
        setResult("");
    };

    return (
        <>
            <div
                id="wd-parent" className="nav nav-pills shadow ps-5 pe-5 pb-2 pt-2 mb-2 wd-add-post-search">
                <div className=" navbar">
                    <div className="wd-search">
          <span>
            <i className="fas fa-map-marker-alt"/>
              <ToastContainer/>
            <MapboxAutocomplete
                publicKey={process.env.REACT_APP_MAPBOX}
                inputClass="wd-search-twitter form-control "
                onSuggestionSelect={_suggestionSelect}
                country="us"
                resetSearch={false}
                placeholder="Search Location"
            />
              <button
                  className={`btn btn-primary wd-search-btn wd-round-btn `}
                  onClick={handleSearchClick}
                  disabled={!result}
              >
                {" "}
                  Add Pin
              </button>
          </span>
                    </div>
                </div>
                <ReactMapGL
                    className="wd-map"
                    {...viewport}
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
                    transitionDuration="10"
                    mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
                    onViewportChange={(viewport) => setViewport(viewport)}
                >
                    {result && <><Marker
                        latitude={lat}
                        longitude={lng}
                        offsetLeft={-3.5 * viewport.zoom}
                        offsetTop={-7 * viewport.zoom}
                    >
                        <i className="fas fa-map-marker-alt" style={{
                            fontSize: 4 * viewport.zoom,
                            color: "dodgerblue",
                            cursor: "pointer"
                        }}
                        />
                    </Marker>
                        {userRole !== "provider" && <Popup
                            latitude={lat}
                            longitude={lng}
                            closeButton={true}
                            closeOnClick={false}
                            onClose={() => setResult("")}
                            anchor="left"
                        >
                            <div className="wd-add-post">
                                <label
                                    className="ms-1 mt-1 wd-input-label">Title:</label>
                                <input className="p-1 m-1 wd-add-input"
                                       placeholder="Title"
                                       autoFocus
                                       onChange={(e) => setTitle(e.target.value)}
                                />
                                <label className="ms-1 mt-1 wd-input-label">Visit
                                    date:</label>
                                <input type="date" className="p-2 m-1 wd-add-input"
                                       onChange={(e) => setDate(e.target.value)}
                                />
                                <label
                                    className="ms-1 mt-1 wd-input-label">Description:</label>
                                <textarea className="p-1 m-1 wd-add-input"
                                          value={description}
                                          onChange={(event) =>
                                              setDescription(event.target.value)}
                                          width="100%"
                                          rows="6"
                                          placeholder="Tell us about your experience">
                    </textarea>
                                <button
                                    className="btn btn-primary rounded-pill m-1 wd-tweet"
                                    onClick={submitClickHandler}>
                                    Add Post
                                </button>
                            </div>
                        </Popup>}
                    </>}
                </ReactMapGL>
                {result && userRole === "provider" && <><div id="wd-add-provider-post" className="wd-add-provider-service">
                    <label
                        className="ms-1 mt-3 wd-input-label">Activity:</label>
                    <input className="p-1 m-1 wd-add-input"
                           placeholder="Service title"
                           value={title}
                           autoFocus
                           onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea className="p-1 m-1 wd-add-input"
                              value={description}
                              onChange={(event) =>
                                  setDescription(event.target.value)}
                              width="100%"
                              rows="4"
                              placeholder="Tell us more about this service (is it a tour, an activity, etc) ">
                    </textarea>
                </div>
                    <button
                        className="btn btn-primary rounded-pill m-1 wd-provider-btn"
                        onClick={submitClickHandler}>
                        Add Post
                    </button></>}
            </div>
        </>
    )
}

export default NewPost;
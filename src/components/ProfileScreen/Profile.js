import React, { useEffect, useState } from "react";
import "../../css/profile.css";
import PostList from "../PostList/PostList.js";
import { Link } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentProfile,
  updateCurrentProfile,
} from "../../services/userService";
import { useLocation } from "react-router-dom";
import NewPost from "../NewPost/NewPost";

function openEditProfile() {
  document.getElementById("wd-edit-profile-form").style.display = "block";
}

function closeEditProfile() {
  document.getElementById("wd-edit-profile-form").style.display = "none";
}

const Profile = () => {
  const userData = (state) => state.user;
  let user = useSelector(userData);
  const location = useLocation();
  let isFriendProfile = false;
  let friendUserId = undefined;

  let [cover, setCover] = useState(null);
  let [profile, setProfile] = useState(null);

  if (location.state !== undefined) {
    user = location.state.user;
    isFriendProfile = true;
    friendUserId = user._id;
  }
  const dispatch = useDispatch();
  useEffect(
    () => getCurrentProfile(dispatch, "nishthagoswami697@gmail.com"),
    []
  );

  const dob = new Date(Date.parse(user.dateOfBirth));
  const [active, setActive] = useState("feed");

  const getTabComponent = () => {
    if (active === "feed") {
      return <PostList userId={friendUserId} />;
    } else if (active === "add_post") {
      return <NewPost userId={user._id} />;
    }
  };

  const getProfileDetails = () => {
    return (
      <>
        <div className="profile-name">
          <h4>
            {user.firstName} {user.lastName}
          </h4>
          <div>{user.description}</div>
          <br />
          <i className="fas fa-birthday-cake me-1" /> {dob.toDateString()}
          <br />
        </div>
        {!isFriendProfile && (
          <>
            <button
              className="btn btn-light edit"
              onClick={() => openEditProfile()}
            >
              Edit profile
            </button>
            <EditProfile user={user} />
          </>
        )}
      </>
    );
  };

  const handleCoverEdit = (files) => {
    const data = new FormData();
    data.append("cover", files[0]);
    // console.log(data);
    // for (var key of data.entries()) {
    //   console.log(key[0] + ", " + key[1]);
    // }
    fetch(`http://localhost:4000/api/upload/cover/${user._id}`, {
      method: "PUT",
      body: data,
    })
      .then((res) => res.json())
      .then((js) => console.log(js))
      .catch((err) => console.log(err));
    console.log(files);
  };

  return (
    <>
      <Navbar inMapMode={false} />
      <div className="container">
        <div className="row">
          <div className="col-2" />
          <div className="col-8">
            <div className="profile-header">
              <img
                className={`rounded image ${!isFriendProfile && "editImage"}`}
                alt="banner"
                src={`http://localhost:4000/${user.cover_photo}.jpg`}
                width="100%"
              />
              {!friendUserId && (
                <div className="edit-banner">
                  {/* <button type="button" className="edit btn btn-primary">
                    <i className="fas fa-camera" /> Edit */}
                  <input
                    type="file"
                    className="edit btn btn-primary"
                    // style={{ display: "none" }}
                    onChange={(e) => handleCoverEdit(e.target.files)}
                  ></input>
                  {/* </button> */}
                </div>
              )}
            </div>
            <div className="profile">
              <div className="profile-image">
                <img
                  className={`rounded-circle imageProfile ${
                    !isFriendProfile && "editImageProfile"
                  }`}
                  alt="banner"
                  src={`http://localhost:4000/${user.profile_photo}.jpg`}
                  width="100px"
                  height="100px"
                  style={{ verticalAlign: "baseline" }}
                />
                {!friendUserId && (
                  <div className="edit-profile">
                    <button type="button" className="edit btn btn-primary">
                      <i className="fas fa-camera" />
                    </button>
                  </div>
                )}
              </div>
              {getProfileDetails()}

              <ul className="nav nav-tabs mt-2">
                <li className="nav-item">
                  <div
                    aria-current="page"
                    className={`nav-link wd-profile-tab ${
                      active === "feed" ? "active" : ""
                    }`}
                    onClick={() => setActive("feed")}
                  >
                    Feed
                  </div>
                </li>
                {!isFriendProfile && (
                  <li className="nav-item">
                    <div
                      className={`nav-link wd-profile-tab ${
                        active === "add_post" ? "active" : ""
                      }`}
                      onClick={() => setActive("add_post")}
                    >
                      New Post
                    </div>
                  </li>
                )}
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      active === "my_map" ? "active" : ""
                    }`}
                    to={{
                      pathname: `/mymap`,
                      state: { friendUserId: friendUserId },
                    }}
                    exact={true}
                  >
                    My Map
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      active === "super_map" ? "active" : ""
                    }`}
                    to={`/super`}
                    exact={true}
                  >
                    Super Map
                  </Link>
                </li>
              </ul>
            </div>
            {getTabComponent()}
          </div>

          <div className="col-2" />
        </div>
      </div>
    </>
  );
};

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const fullName = user.firstName + " " + user.lastName;
  const dob =
    new Date(user.dateOfBirth).getFullYear() +
    "-" +
    (new Date(user.dateOfBirth).getMonth() + 1) +
    "-" +
    new Date(user.dateOfBirth).getDate().toString().padStart(2, 0);
  const [name, setName] = useState(fullName);
  const nameChangeHandler = (event) => {
    const nameValue = event.target.value;
    setName(nameValue);
  };

  const [bio, setBio] = useState(user.description);
  const bioChangeHandler = (event) => {
    const value = event.target.value;
    setBio(value);
  };

  const [birthDate, setBirthDate] = useState(dob);
  const dobChangeHandler = (event) => {
    const value = event.target.value;
    setBirthDate(value);
  };

  const handleSaveProfile = () => {
    debugger;
    const updatedProfile = {
      ...user,
      firstName: name.substr(0, name.indexOf(" ")),
      lastName: name.substr(name.indexOf(" ") + 1),
      description: bio,
      // dateOfBirth: birthDate
    };

    debugger;
    updateCurrentProfile(dispatch, updatedProfile);
    closeEditProfile();
  };

  return (
    <div
      id="wd-edit-profile-form"
      className="shadow wd-form-popup pt-0 m-2 p-2"
    >
      <div className="row mb-2 wd-edit-header pb-2">
        <div
          className="col-1 mt-3"
          onClick={() => {
            closeEditProfile();
          }}
        >
          <i className="fas fa-times" />
        </div>
        <div className="col-9 wd-profile-name mt-3">Edit profile</div>
        <div className="col-2 mt-2">
          <button
            className="btn wd-profile-save rounded-pill"
            onClick={handleSaveProfile}
          >
            Save
          </button>
        </div>
      </div>
      <div className="form-floating mb-3 mt-3">
        <input
          className="form-control"
          id="floatingInput"
          value={name}
          onChange={nameChangeHandler}
        />
        <label htmlFor="floatingInput">Name</label>
      </div>
      <div className="form-floating mb-3">
        <textarea
          className="form-control"
          value={bio}
          id="floatingTextarea"
          onChange={bioChangeHandler}
        />
        <label htmlFor="floatingTextarea">Bio</label>
      </div>

      {/*<div className="form-floating mb-3">*/}
      {/*    <input type="date" className="form-control" id="floatingInput"*/}
      {/*           value={birthDate} onChange={dobChangeHandler}/>*/}
      {/*    <label htmlFor="floatingInput">Birth date</label>*/}
      {/*</div>*/}
    </div>
  );
};

export default Profile;

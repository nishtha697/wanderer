import React from 'react';
import "../css/profile.css";
import Navbar from "./NavBar/Navbar.js";

const Profile = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-2"/>
                    <div className="col-8">
                        <div className="profile-header">
                            <img className="rounded image" alt="banner"
                                 src={`${process.env.PUBLIC_URL}/images/profile_banner.png`}
                                 width="100%"/>
                            <div className="edit-banner">
                                <button type="button" className="edit btn btn-primary">
                                    <i className="fas fa-camera"/> Edit
                                </button>
                            </div>
                        </div>
                        <div className="profile align-middle">
                            <div className="profile-image">
                                <img className="rounded-circle imageProfile" alt="banner"
                                     src={`${process.env.PUBLIC_URL}/images/profile-image.png`}
                                     width="100px" height="100px"/>
                                <div className="edit-profile">
                                    <button type="button" className="edit btn btn-primary">
                                        <i className="fas fa-camera"/>
                                    </button>
                                </div>
                            </div>
                            <div className="profile-name">
                                <h4>
                                    Nishtha Goswami
                                </h4>
                                <div>123 Followers</div>
                            </div>
                            <button className="btn btn-primary edit">Edit profile</button>
                            <ul className="nav nav-tabs mt-2">
                                <li className="nav-item">
                                    <a aria-current="page" className="nav-link active" href="for-you.html">Feed</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="trending.html">New Post</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="news.html">Map</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-2"></div>
                </div>
            </div>
        </>

    );
}

export default Profile;
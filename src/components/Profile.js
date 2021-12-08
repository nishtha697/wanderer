import React from 'react';
import "../css/profile.css";
import {Link} from "react-router-dom";

const Profile = () => {
    return (
        <>
            <div
                className="nav justify-content-between sticky-top nav-pills shadow ps-5 pe-5 pb-2 pt-2 mb-2 menu">
                <Link className="navbar-brand" href="#">
                    <img src={`${process.env.PUBLIC_URL}/images/img_1.png`} alt=""
                         height="50"/>
                </Link>
                <ul className="nav navbar d-inline-flex justify-content-center ">
                    {/*<button className="btn btn-secondary dropdown-toggle" type="button"*/}
                    {/*        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"*/}
                    {/*        aria-expanded="false">*/}
                    {/*    Dropdown button*/}
                    {/*</button>*/}
                    <li className="nav nav-item ps-2 pe-2">
                        <Link className="nav-link" to="#">Edit profile</Link>
                    </li>
                    <li className="nav nav-item ps-2 pe-2 ">
                        <Link className="nav-link" to="#">New post</Link>
                    </li>
                    <li className="nav nav-item ps-2 pe-2 ">
                        <Link className="nav-link" to="#">Map</Link>
                    </li>
                </ul>
                <ul className="nav navbar d-inline-flex justify-content-center dropdown-item">
                    <li className="nav nav-item ps-2 pe-2">
                        <Link className="nav-link logout" to="#">Log out</Link>
                    </li>
                </ul>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-2"></div>
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
                                    <a className="nav-link" href="trending.html">Photos</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="news.html">Maps</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="sports.html">Search</a>
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
import React from 'react';
import "../../css/profile.css";
import Navbar from "../NavBar/Navbar.js";
import UserProfile from "./UserProfile";

const Profile = () => {
    return (
        <>
            <Navbar/>
            <div className="container">
                <div className="row">
                    <div className="col-2"/>
                    <UserProfile/>
                    <div className="col-2"/>
                </div>
            </div>
        </>
    );
}

export default Profile;
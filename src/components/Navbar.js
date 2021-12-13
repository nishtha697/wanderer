import React from "react";
import {Link} from "react-router-dom";

const Navbar = () => {

    return (
        <div
            className="nav justify-content-between sticky-top nav-pills shadow ps-5 pe-5 pb-2 pt-2 mb-2 menu">
            {/*<Link className="navbar-brand" href="#">*/}
            {/*    <img src={``} alt=""*/}
            {/*         height="50"/>*/}
            {/*</Link>*/}
            <div className=" navbar">
                <div className="wd-search">
                    <span><i className="fas fa-map-marker-alt"/>
                    <input className="wd-search-twitter form-control" type="search"
                           placeholder="Search Location"/></span>
                </div>
            </div>
            <ul className="nav navbar d-inline-flex justify-content-center">
                <li className="nav nav-item ps-2 pe-2">
                    <Link className="logout btn btn-danger wd-logout-btn" to="#">Log out</Link>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
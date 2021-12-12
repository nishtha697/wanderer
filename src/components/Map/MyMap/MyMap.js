import React, {useEffect, useState} from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import {fetchAllPosts} from "../../../services/postService";
import {useDispatch, useSelector} from "react-redux";
import Map from "../index.js";
import Navbar from "../../NavBar/Navbar";

const selectAllPosts = (state) => state.posts;
const MyMap = () => {

    const posts = useSelector(selectAllPosts);
    const dispatch = useDispatch();
    useEffect(() => fetchAllPosts(dispatch), [])

    const postList = posts.filter((item) => item.user_Id.toString() === "61b396240840f597b347b7eb");

    return (
        <>
            <Navbar inMapMode={true}/>
        <Map posts={postList}/>
            </>
    )
}

export default MyMap;
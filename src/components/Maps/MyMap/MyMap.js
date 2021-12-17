import React, {useState, useEffect} from "react";
import {fetchAllPosts} from "../../../services/postService";
import {useDispatch, useSelector} from "react-redux";
import Maps from "../index.js";
import Navbar from "../../NavBar/Navbar";
import {getCurrentProfile} from "../../../services/userService";
import {useLocation} from "react-router-dom";
const PROFILE_API = 'http://localhost:4000/api/user';

const selectAllPosts = (state) => state.posts;
const MyMap = () => {

    const posts = useSelector(selectAllPosts);
    const dispatch = useDispatch();
    useEffect(() => fetchAllPosts(dispatch), [])

    const user = JSON.parse(localStorage.getItem("user"));

    let userId = user._id;

    const location = useLocation()
    if (location.state !== undefined && location.state.friendUserId !== undefined) {
        userId = location.state.friendUserId;

    }

    const postList = posts.filter((item) => item.user_Id.toString() === userId);

    return (
        <>
            <Navbar inMapMode={true}/>
            <Maps posts={postList} userId={user._id}/>
        </>
    )
}

export default MyMap;
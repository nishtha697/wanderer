import React, {useEffect} from "react";
import {fetchAllPosts} from "../../../services/postService";
import {useDispatch, useSelector} from "react-redux";
import Map from "../index.js";
import Navbar from "../../NavBar/Navbar";
import {getCurrentProfile} from "../../../services/userService";
import {useLocation} from "react-router-dom";

const selectAllPosts = (state) => state.posts;
const MyMap = () => {

    const posts = useSelector(selectAllPosts);
    const dispatch = useDispatch();
    useEffect(() => fetchAllPosts(dispatch), [])

    const userData = (state) => state.user;
    const user = useSelector(userData);
    useEffect(() => getCurrentProfile(dispatch, "nishthagoswami697@gmail.com"), [])

    let userId = user._id;

    const location = useLocation()
    if (location.state !== undefined && location.state.friendUserId !== undefined) {
        userId = location.state.friendUserId;

    }

    const postList = posts.filter((item) => item.user_Id.toString() === userId);

    return (
        <>
            <Navbar inMapMode={true}/>
            <Map posts={postList}/>
        </>
    )
}

export default MyMap;
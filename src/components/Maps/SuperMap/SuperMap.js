import React, {useEffect} from "react";
import {fetchAllPosts} from "../../../services/postService";
import {useDispatch, useSelector} from "react-redux";
import Maps from "../index.js";
import Navbar from "../../NavBar/Navbar";

const selectAllPosts = (state) => state.posts;
const SuperMap = () => {

    const posts = useSelector(selectAllPosts);
    const dispatch = useDispatch();
    useEffect(() => fetchAllPosts(dispatch), [])

    return (
        <>
            <Navbar inMapMode={true}/>
            <Maps posts={posts}/>
        </>
    )
}

export default SuperMap;
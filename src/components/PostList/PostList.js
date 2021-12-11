import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Post from "./Post.js";
import {fetchAllPosts} from "../../services/postService";

const selectAllPosts = (state) => state.posts;

const PostList = () => {
    const posts = useSelector(selectAllPosts);
    const dispatch = useDispatch();
    useEffect(() => fetchAllPosts(dispatch), [])
    return (
        <ul className="list-group">
            {
                posts.map(post => {
                    return <Post post={post}/>
                })
            }
        </ul>
    );
}

export default PostList;
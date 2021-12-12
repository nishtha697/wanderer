import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Post from "./Post.js";
import {fetchAllPosts} from "../../services/postService";

const selectAllPosts = (state) => state.posts;

const PostList = () => {
    const posts = useSelector(selectAllPosts);
    const dispatch = useDispatch();
    useEffect(() => fetchAllPosts(dispatch), [])


    // const pins = posts.map(post => {
    //     return {
    //         post.latitude,
    //         post.longitude
    //     }
    // });

    posts.sort((a,b)=>new Date(a.createdAt).getTime()-new Date(b.createdAt).getTime());
    const uniqueUsers = [...new Set(posts.map(item => item.user_Id))];

    return (
        <ul className="list-group">
            {uniqueUsers.map(user => {
                const postList = posts.filter((item) => item.user_Id === user)
                return (<Post posts={postList}/>)
            })}

        </ul>
    );
}

export default PostList;
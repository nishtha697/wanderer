import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Post from "./Post.js";
import {fetchAllPosts} from "../../services/postService";
const POST_API = 'http://18.222.87.70:4000/api/posts';

const selectAllPosts = (state) => state.posts;

const PostList = ({userId}) => {
    debugger;
    // const [posts, setPosts] = useState([]);
    const posts = useSelector(selectAllPosts);
    const dispatch = useDispatch();
    useEffect(() => fetchAllPosts(dispatch), [])

    // useEffect(() => {
    //     fetch(POST_API)
    //         .then(response => response.json())
    //         .then(posts => {
    //             setPosts(posts)
    //             dispatch({
    //                          type: 'fetch-all-posts',
    //                          posts
    //                      }
    //             )})
    // }, [])

    //need to sort out filtering of new post
    const sortedPosts = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    let uniqueUsers = [...new Set(sortedPosts.map(item => item.user_Id))];

    if (userId !== undefined) {
        uniqueUsers = [userId]
    }
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
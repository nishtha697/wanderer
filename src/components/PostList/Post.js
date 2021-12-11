import React from "react";
import {useDispatch} from "react-redux";
import ReactMapGL from 'react-map-gl';
import { Container, Col, Row } from 'reactstrap';
import {deletePost}
    from "../../services/postService";

const mapStyle = {
    width: '100%',
    height: 600
}

const mapboxApiKey = 'YOUR MAPBOX API KEY';

const Post = ({post}) => {

    const dispatch = useDispatch();
    const deletePostClickHandler = () => {
        deletePost(dispatch, post);
    };

    return (

        <li className="wd-post list-group-item">
            <div className="row">
                <div className="col-1">
                    <img className="wd-profile-image" src={post['logo-image']}
                         alt="profile image"/>
                </div>

                <div className="wd-content col-11">
                    <i onClick={deletePostClickHandler}
                       className="fas fa-times fa-pull-right"/>

                    <span className="wd-user">
                    {post.userName}
                </span>
                    <span className="wd-user-handle"> @{post.handle} &middot; {post.time}</span>
                    <div className="wd-content-body">
                         {post.title}>
                    </div>
                    <div>
                        {post.post}
                    </div>
                    <div className="wd-image-content">
                        {
                            post.attachments && post.attachments.image &&
                            <img className="wd-content-image mt-2 wd-border-radius-20px"
                                 src={post.attachments.image}
                                 alt="content image" width="100%"/>
                        }
                        {
                            post.attachments && post.attachments.video &&
                            <iframe width="100%" height="350px"
                                    className="mt-2 wd-border-radius-20px"
                                    src={`https://www.youtube.com/embed/${post.attachments.video}`}
                                    title="YouTube video player" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen/>
                        }

                    </div>
                </div>
            </div>
        </li>
    );
}

export default Post;
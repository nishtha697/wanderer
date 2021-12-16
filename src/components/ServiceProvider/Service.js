import React from "react";
import {deletePost} from "../../services/postService";
import {useDispatch, useSelector} from "react-redux";

const Service = ({services}) => {

    return (
        <>
            <h6 className="mt-3">{services[0].location}</h6>
            {services.map(service => <ListItem service={service}/>
            )}
        </>
    )
}

const ListItem = ({service}) => {
    const userData = (state) => state.user;
    const user = useSelector(userData);
    const dispatch = useDispatch();

    const deletePostClickHandler = (post) => {
        deletePost(dispatch, post);
    };

    return (<li className="list-group-item row">
        <div className="row">
            <div className="col-11">
                <h6>{service.title}</h6>
                <p>{service.description}</p>
            </div>
            {user._id === service.user_Id && <div className="col-1">
                <button
                    className="btn rounded-pill m-1 wd-delete-service"
                    onClick={() => deletePostClickHandler(service)}>
                    <i className="fas fa-trash-alt"></i>
                </button>
            </div>}
        </div>
    </li>)
}

export default Service;
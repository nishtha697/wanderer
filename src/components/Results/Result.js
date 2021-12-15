import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const PROVIDER_API = "http://localhost:4000/api/providers";

const Result = ({post}) => {

    const [provider, setProvider] = useState({});
    useEffect(() => {
        fetch(`${PROVIDER_API}/${post.user_Id}`)
            .then((res) => res.json())
            .then((p) => setProvider(p));
    }, []);

    return (<li className="list-group-item wd-search-results">
        <Link className="wd-text" to={{
            pathname: `/profile/${provider._id}`,
            state: {user: provider}
        }}>{provider.firstName} {provider.lastName} </Link>
        &middot;
        <span className="wd-timestamp">{new Date(
            post.createdAt).toDateString()}</span>
        <h5>{post.title}</h5>
        <p>{post.description}</p>
    </li>);
}

export default Result;
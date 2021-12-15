import React, {useEffect} from "react";
import {useState} from "react/cjs/react.development";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllPosts} from "../../services/postService";
import "../../css/searchresults.css";
import Result from "./Result";

const SEARCH_API = "http://localhost:4000/api/search";

const test = [{title: "Hello World"}, {title: "Hello Again"}];

const Results = (props) => {
    let [posts, setPosts] = useState([]);

    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({latitude: props.lat, longitude: props.lng}),
    };

    useEffect(() => {
        fetch(SEARCH_API, requestOptions)
            .then((res) => res.json())
            .then((p) => setPosts(p));
    });

    const noResults = ([posts]) => {
        if (posts === undefined) {
            return <li className="list-group-item wd-search-results">No search results</li>
        }
    }

    return (

        <div className="container ">
            <div className="row">
                <div className="col-2" />
                <div className="col-8">
                    <h5 className="list-group-item  wd-search-results">Service providers for <span className="wd-text" >{props.search}</span></h5>
                    {
                        posts.map((post) =>
                                      <Result post={post} />
                        )
                    }
                    {noResults(posts)}
                </div>
                <div className="col-2" />
            </div>
        </div>

    )
};

export default Results;

import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../../services/postService";
import "../../css/searchresults.css";
import Result from "./Result";

const SEARCH_API = "http://localhost:4000/api/search";

const test = [{ title: "Hello World" }, { title: "Hello Again" }];

const Results = (props) => {
  let [posts, setPosts] = useState([]);

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ latitude: props.lat, longitude: props.lng }),
  };

  useEffect(() => {
    fetch(SEARCH_API, requestOptions)
      .then((res) => res.json())
      .then((p) => setPosts(p));
  }, []);

  const noResults = ([posts]) => {
    if (posts === undefined) {
      return (
        <li className="list-group-item wd-search-results">No search results</li>
      );
    }
  };

  const [user, setUser] = useState();
  // console.log(localStorage.getItem("user"));
  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, [user]);

  const servicePosts = posts.filter((item) => item.visit_date === undefined);

  const userPosts = posts.filter((item) => item.visit_date !== undefined);

  return (
    <div className="container ">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <h5 className="wd-text pt-3">{props.search}</h5>
          <div className="list-group">
            <h6 className="list-group-item  wd-search-results">
              Service providers
            </h6>
            {servicePosts.map((post) => (
              <Result post={post} />
            ))}
            {noResults(servicePosts)}
          </div>
          {user !== null  && <div className="list-group mt-5">
            <h6 className="list-group-item  wd-search-results">Posts</h6>
            {userPosts.map((post) => (
              <Result post={post} />
            ))}
            {noResults(userPosts)}
          </div>}
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default Results;

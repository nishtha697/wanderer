import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";

const SEARCH_API = "http://localhost:4000/api/search";

const test = [{ title: "Hello World" }, { title: "Hello Again" }];

const Results = (props) => {
  let [posts, setPosts] = useState([]);

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ latitude: 42.3546, longitude: -71.0708 }),
  };

  useEffect(() => {
    fetch(SEARCH_API, requestOptions)
      .then((res) => res.json())
      .then((p) => setPosts(p));
  });

  //   return posts.map((post) => <li>{post.title}</li>);

  return posts.map((post) => (
    <li>
      <h4>{post.title}</h4>
      <p>{post.description}</p>
    </li>
  ));
};

export default Results;

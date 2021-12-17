import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const USER_API = "http://18.222.87.70:4000/api/user";

const Result = ({ post }) => {
  debugger;
  const [provider, setProvider] = useState({});

  useEffect(() => {
    fetch(`${USER_API}/${post.user_Id}`)
      .then((res) => res.json())
      .then((p) => setProvider(p));
  }, []);

  return (
    <li className="list-group-item wd-search-results">
      <div className="row">
        <div className="col-1">
          <img
            className="wd-profile-image"
            src={`http://18.222.87.70:4000/${provider.profile_pic}`}
            alt="profile img"
          />
        </div>
        <div className="col-11 wd-image-content">
          <Link
            className="wd-text"
            to={{
              pathname: `/profile/${post.user_Id}`,
              state: { user: provider },
            }}
          >
            {provider.firstName} {provider.lastName}{" "}
          </Link>
          &middot;
          <span className="wd-timestamp">
            {new Date(post.createdAt).toDateString()}
          </span>
          <h5>{post.title}</h5>
          <p>{post.description}</p>
        </div>
      </div>
    </li>
  );
};

export default Result;

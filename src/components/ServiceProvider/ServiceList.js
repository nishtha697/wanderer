import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { fetchAllPosts } from "../../services/postService";
import Service from "./Service";

const selectAllPosts = (state) => state.posts;
const ServiceList = ({ userId }) => {
  const posts = useSelector(selectAllPosts);
  const dispatch = useDispatch();
  useEffect(() => fetchAllPosts(dispatch), [dispatch]);

  const postList = posts.filter((item) => item.user_Id.toString() === userId);

  const uniqueLocations = [...new Set(postList.map((item) => item.location))];

  return (
    <ul className="list-group mt-2 mb-2">
      {uniqueLocations.map((location) => {
        const services = postList.filter((item) => item.location === location);
        return <Service services={services} />;
      })}
    </ul>
  );
};

export default ServiceList;

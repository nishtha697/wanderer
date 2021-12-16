const SEARCH_API = "localhost:4000/api/posts";

export const fetchPosts = () => {
  fetch(SEARCH_API)
    .then((res) => res.json())
    .then((posts) => posts.json());
};

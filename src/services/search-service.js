const SEARCH_API = "http://18.222.87.70:4000/api/posts";

export const fetchPosts = () => {
  fetch(SEARCH_API)
    .then((res) => res.json())
    .then((posts) => posts.json());
};

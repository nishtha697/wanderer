const posts = (state = [], action) => {
  switch (action.type) {
    case "fetch-all-posts":
      return action.posts;

    case "like-post":
      return state.map((post) => {
        if (post._id === action.post._id) {
          if (post.likes === undefined) {
            post.likes = 0;
          }
          if (post.liked === true) {
            post.liked = false;
            post.likes--;
          } else {
            post.liked = true;
            post.likes++;
          }
          return post;
        } else {
          return post;
        }
      });

    case "delete-post":
      return state.filter((post) => post._id !== action.post._id);

    case "create-post":
      return [action.post, ...state];

    default:
      return state;
  }
};

export default posts;

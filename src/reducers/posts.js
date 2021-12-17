<<<<<<< HEAD
// import enteries from './data/enteries.json';

const posts = (state = [], action) => {
  switch (action.type) {
    case "fetch-all-posts":
      return action.posts;
      break;
=======

const posts = (state = [], action) => {
    switch (action.type) {
        case 'fetch-all-posts':
            return (action.posts)
            break;
>>>>>>> c90bdb79aa5281b1ccb6ee5e7d7a64994b6d0bd2

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
      break;

    case "delete-post":
      return state.filter((post) => post._id !== action.post._id);
      break;

    case "create-post":
      debugger;
      return [action.post, ...state];
      break;
    default:
      return state;
  }
};

export default posts;

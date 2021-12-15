import enteries from "./data/enteries.json";

const posts = (state = enteries, action) => {
<<<<<<< HEAD
    switch (action.type) {
        case "fetch-all-posts":
            return action.posts;

        case 'like-post':
            return state.map(post => {
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

        case "create-post":
            debugger;
            return [action.post, ...state];

        default:
            return state;
    }
=======
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
      debugger;
      return [action.post, ...state];
    default:
      return state;
  }
>>>>>>> a8cd7d5cd149ca596f7c6f2d9467e747e08a9301
};

export default posts;

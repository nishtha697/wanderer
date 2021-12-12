import enteries from './data/enteries.json';

const posts = (state = enteries, action) => {
    switch (action.type) {
        case 'fetch-all-posts':
            return (action.posts)
            break;

        case 'like-post':
            return state.map(post => {
                if (post._id === action.post._id) {
                    if (post.liked === true) {
                        post.liked = false;
                        post.stats.likes--;
                    } else {
                        post.liked = true;
                        post.stats.likes++;
                    }
                    return post;
                } else {
                    return post;
                }
            });
            break;

        case 'delete-post':
            return state.filter(post => post._id !== action.post._id);
            break;

        case 'create-post':
            debugger;
            return ([
                action.post,
                ...state,
            ]);
            break;
        default:
            return (state);
    }
};

export default posts;

const POST_API = 'http://localhost:4000/api/posts';

export const fetchAllPosts = (dispatch) =>
    fetch(POST_API)
        .then(response => response.json())
        .then(posts =>
                  dispatch({
                               type: 'fetch-all-posts',
                               posts
                           })
        );

export const postNewPost = (dispatch, newPost) =>
    fetch(POST_API, {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(post =>
                  dispatch({
                               type: 'create-post',
                               post
                           })
        );

export const deletePost = (dispatch, post) =>
    fetch(`${POST_API}/${post._id}`, {
        method: 'DELETE'
    }).then(response => dispatch({
                                     type: 'delete-post',
                                     post
                                 }));

export const likePost = (dispatch, post) => {
    console.log(post)
    fetch(`${POST_API}/${post._id}/like`, {
        method: 'PUT',
        body: JSON.stringify(post),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(
            dispatch({
                         type: 'like-post',
                         post
                     })).then(response => response.json());
}

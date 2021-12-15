const PROFILE_API = 'http://localhost:4000/api/users';

export const getCurrentProfile = (dispatch, email) =>

    fetch(`${PROFILE_API}/${email}`)
        .then(response => response.json())
        .then(user =>
                  dispatch({
                               type: 'get-profile',
                               user
                           })
        );

export const updateCurrentProfile = (dispatch, user) =>
    fetch(`${PROFILE_API}/${user.email}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(
                  dispatch({
                               type: 'save-profile',
                               user: user
                           })
        );

export const getProfileById = (dispatch, id) =>
    fetch(`${PROFILE_API}/${id}`)
        .then(response => response.json())

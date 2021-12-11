import {API_URL} from "../consts";

const URL = 'http://localhost:4000/api/providers';



export const findAllProviders = () =>
    fetch(URL)
        .then(response => response.json());

export const updateVerification = (id) =>
    fetch('${URL}/${_id}', {
        method: 'PUT',
        body: JSON.stringify(id),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());


export default {
    findAllProviders,
    updateVerification
};

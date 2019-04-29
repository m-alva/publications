/* eslint-disable no-restricted-globals */
import config from '../config/config';
import { authHeader } from '../helpers/auth-headers';

export const reactionService = {
    add,
};

function add(reaction) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(reaction)
    };

    return fetch(`${config.apiUrl}/reactions/add`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        console.log(text);
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                //logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
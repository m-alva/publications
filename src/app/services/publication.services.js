/* eslint-disable no-restricted-globals */
import config from '../config/config';
import { authHeader } from '../helpers/auth-headers';

export const publicationService = {
    getAll,
    add,
    update,
    remove
};

function getAll(){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`${config.apiUrl}/publications`, requestOptions).then(handleResponse);
}

function add(publication) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(publication)
    };

    return fetch(`${config.apiUrl}/publications/add`, requestOptions).then(handleResponse);
}

function update(publication) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(publication)
    };

    return fetch(`${config.apiUrl}/publications/${publication.id}`, requestOptions).then(handleResponse);;
}

function remove(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/publications/${id}`, requestOptions).then(handleResponse);
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
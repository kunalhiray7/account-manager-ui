import axios from 'axios';

export const config = {
    serverUrl: 'http://localhost:8080'
};

export const http = axios.create({
    baseURL: config.serverUrl,
    timeout: 5000,
});

export const get = ({ path, responseType, headers } = {}) => {
    return http.get(path, { responseType: responseType })
        .then(response => Promise.resolve(response.data))
        .catch(error => {
            return Promise.reject(error);
        });
};

export const post = ({ path, payload, headers } = {}) => {
    return http.post(path, payload)
        .then(response => {
            const responseData = { ...response.data, headers: response.headers };
            return Promise.resolve(responseData);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

export const put = ({ path, payload, headers } = {}) => {
    return http.put(path, payload)
        .then(response => {
            return Promise.resolve(response.data)
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

export const patch = ({path, payload, headers} = {}) => {
    return http.patch(path, payload)
        .then(response => {
            return Promise.resolve(response.data)
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

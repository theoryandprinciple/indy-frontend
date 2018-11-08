import Axios from 'axios'

const internals = {
    host: process.env.API_HOST || 'http://domain.com/',
    prefix: process.env.API_PREFIX || 'api',
    getApiBase: () => {

        const { host, prefix } = internals;

        return `${host}${prefix}`;
    }
};

const client = Axios.create({
    baseURL: internals.getApiBase(),
    responseType: 'json',
    headers: { common: {} }
});
export default client

client.batch = (requests) => {

    const prefix = internals.prefix;

    requests = requests.map((request) => {

        return {
            ...request,
            path: `${prefix}${request.path}`
        };
    });

    return client.post(internals.getApiBase(), { requests });
};

client.updateAuth = (newToken) => {

    const headers = client.defaults.headers.common;

    if (!newToken) {
        return delete headers.authorization;
    }

    headers.authorization = newToken;
};

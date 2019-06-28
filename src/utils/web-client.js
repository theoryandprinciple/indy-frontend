import Axios from 'axios';

const internals = {
    host:
        process.env.API_HOST
        || process.env.REACT_APP_API_HOST
        || '//user.theoryandprinciple.com/',
    prefix: process.env.API_PREFIX || 'api',
    getApiBase: () => {
        const { host, prefix } = internals;

        return `${host}${prefix}`;
    },
};

const client = Axios.create({
    baseURL: internals.getApiBase(),
    responseType: 'json',
    headers: { common: {} },
});
export default client;

client.batch = (reqs) => {
    const { prefix } = internals;

    const requests = reqs.map(request => ({
        ...request,
        path: `${prefix}${request.path}`,
    }));

    return client.post(internals.getApiBase(), { requests });
};

client.updateAuth = (newToken) => {
    const headers = client.defaults.headers.common;

    if (!newToken) {
        return delete headers.authorization;
    }

    headers.authorization = newToken;

    return true;
};

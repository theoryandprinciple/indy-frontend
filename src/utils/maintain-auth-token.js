import WebClient from './web-client';

const internals = {
    lastToken: null,
};

export default (store) => {
    internals.maintainAuthToken(store);

    return store.subscribe(() => internals.maintainAuthToken(store));
};

internals.maintainAuthToken = (store) => {
    const { auth } = store.getState();
    const newToken = (auth.isAuthenticated && auth.credentials && auth.credentials.token) || null;

    if (newToken === internals.lastToken) {
        return;
    }

    WebClient.updateAuth(newToken);

    internals.lastToken = newToken;
};

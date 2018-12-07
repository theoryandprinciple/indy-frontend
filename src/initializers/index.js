const internals = {
    initializers: [
        require('./auth-token'),
        require('./persist'),
        require('./checkAuthStatus')
    ]
};

export default (store) => {

    internals.initializers.forEach((init) => init.default(store));
};

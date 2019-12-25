import AuthToken from './maintain-auth-token';

const internals = {
    initializers: [AuthToken],
};

export default (store) => {
    internals.initializers.forEach(init => init(store));
};

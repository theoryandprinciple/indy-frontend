import AuthToken from './auth-token';
import CheckAuthStatus from './check-auth-status';

const internals = {
    initializers: [AuthToken, CheckAuthStatus],
};

export default (store) => {
    internals.initializers.forEach(init => init(store));
};

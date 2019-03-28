import AuthToken from './auth-token';
import CheckAuthStatus from './checkAuthStatus';

const internals = {
    initializers: [AuthToken, CheckAuthStatus],
};

export default (store) => {
    internals.initializers.forEach(init => init(store));
};

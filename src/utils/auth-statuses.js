import Mirror from './mirror-statuses';

export default Mirror('@@auth-status', {
    INIT: true,
    WAITING: true,
    WAITING_LOGOUT: true,
    FINISHED: true
});

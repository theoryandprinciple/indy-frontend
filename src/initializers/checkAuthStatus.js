import { noToken } from '../actions/auth';
import LocalStorageAvailable from '../utils/check-local-storage';

export default (store) => {
    // CHECK IN APP AUTH
    const { auth } = store.getState();
    if (!auth) { return; }
    const newToken = (auth.isAuthenticated && auth.credentials && auth.credentials.token)
        || null;

    if (newToken !== null) {
        // we have auth creds in the app, so no need to keep checking
        return;
    }

    // CHECK LOCAL STORAGE AUTH
    if (!LocalStorageAvailable()) {
        // no local storager available, so we know they can't have record of the app
        store.dispatch(noToken());
        return;
    }

    const checkLocalKey = key => JSON.parse(localStorage.getItem(key) || 'null');
    const token = checkLocalKey('persist:root');

    if (!token) {
        // no items in local storage, so likely the first time coming to the app
        store.dispatch(noToken());
    }
};

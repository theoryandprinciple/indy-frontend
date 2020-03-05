// AUTH Structured Inspired by:
// https://medium.com/trabe/implementing-private-routes-with-react-router-and-hooks-ed38d0cf93d5
import React, {
    createContext,
    useState,
    useEffect,
    useContext,
} from 'react';

import _ from 'lodash';

import LocalStorageAvailable from '../../../utils/check-local-storage';
import WebClient from '../../../utils/web-client';

const initialAuthData = {
    isAuthenticated: false,
};

export const AuthDataContext = createContext(null);

const AuthDataProvider = (props) => {
    const [authData, setAuthData] = useState(initialAuthData);

    // try to locate local storage values when first mounted
    useEffect(() => {
        if (LocalStorageAvailable()) {
            // local storage available, so let's check it
            const checkLocalKey = key => localStorage.getItem(key) || null;
            const localAuth = checkLocalKey('auth');
            if (localAuth) {
                // update token here to prevent race conditions from components that rely on authData
                if (localAuth.credentials && localAuth.credentials.token) {
                    WebClient.updateAuth(localAuth.credentials.token);
                }
                // if there is data stored, internalize it
                setAuthData(JSON.parse(localAuth));
            }
        }
    }, []);


    useEffect(() => {
        const storage = _.cloneDeep(authData);
        delete storage.user;
        localStorage.setItem('auth', JSON.stringify(storage));
        if (authData.credentials && authData.credentials.token) {
            WebClient.updateAuth(authData.credentials.token);
        }
    }, [authData]);

    const onLogout = newAuthData => setAuthData(newAuthData);
    const onLogin = newAuthData => setAuthData(newAuthData);

    // https://stackoverflow.com/questions/56943251/how-to-fix-nextcreate-is-not-a-function-setting-up-usememo-setting-up-authentica
    // const authDataValue = useMemo({ ...authData, onLogin, onLogout }, [authData]);

    return <AuthDataContext.Provider value={{ authData, onLogin, onLogout }} {...props} />;
};

export const useAuthDataContext = () => useContext(AuthDataContext);

export default AuthDataProvider;

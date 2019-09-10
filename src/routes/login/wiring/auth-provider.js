// AUTH Structured Inspired by:
// https://medium.com/trabe/implementing-private-routes-with-react-router-and-hooks-ed38d0cf93d5
import React, {
    createContext,
    useState,
    useEffect,
    useContext,
} from 'react';

import LocalStorageAvailable from '../../../utils/check-local-storage';

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
                // if there is data stored, internalize it
                setAuthData(JSON.parse(localAuth));
            }
        }
    }, []);


    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify(authData));
    }, [authData]);

    const onLogout = newAuthData => setAuthData(newAuthData);
    const onLogin = newAuthData => setAuthData(newAuthData);

    // https://stackoverflow.com/questions/56943251/how-to-fix-nextcreate-is-not-a-function-setting-up-usememo-setting-up-authentica
    // const authDataValue = useMemo({ ...authData, onLogin, onLogout }, [authData]);

    return <AuthDataContext.Provider value={{ authData, onLogin, onLogout }} {...props} />;
};

export const useAuthDataContext = () => useContext(AuthDataContext);

export default AuthDataProvider;

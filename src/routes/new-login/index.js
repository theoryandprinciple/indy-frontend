import React, { useRef, useState } from 'react';
import { useAuthDataContext } from '../../utils/auth-provider';
import { Login, Logout } from '../../utils/auth-api';

const SignInForm = () => {
    const { onLogin, onLogout } = useAuthDataContext();

    const [error, setError] = useState(null);

    /*
   * We use uncontrolled inputs to simplify the example
   */
    const emailInput = useRef();
    const pswInput = useRef();

    const handleSubmit = () => {
        const currentFormValue = {
            email: emailInput.current.value,
            password: pswInput.current.value,
        };

        Login(currentFormValue)
            .then((data) => {
                // we get here with or without errors
                setError(data.error ? data.errorMsg : null);
                // update the app's auth context regardless of success or error
                onLogin(data);
            });
    };
    const handleLogOut = () => {
        // use the values contained in the Logout function
        // pass those values to auth data context
        onLogout(Logout());
    };

    return (
        <div>
            {error ? (<span>{error}</span>) : null}
            <input ref={emailInput} type="text" name="email" />
            <input ref={pswInput} type="password" name="password" />
            <button type="button" onClick={handleSubmit}>Sign in</button>
            <button type="button" onClick={handleLogOut}>Sign out</button>
        </div>
    );
};

export default SignInForm;

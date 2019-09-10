import React, { useRef, useState } from 'react';
import { useAuthDataContext } from './wiring/auth-provider';
import { Login, Logout } from './wiring/auth-api';
import ValidateEmail from '../../utils/valid-email';

const SignInForm = () => {
    const { onLogin, onLogout } = useAuthDataContext();

    const [error, setError] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    /*
   * We use uncontrolled inputs to simplify the example
   */
    const emailInput = useRef();
    const pswInput = useRef();

    const handleSubmit = () => {
        // Validatation
        if (!ValidateEmail(emailInput.current.value)) {
            setError(true);
            setErrorMsg('Error: Email appears invalid');
            return;
        }
        if (pswInput.current.value === '') {
            setError(true);
            setErrorMsg('Error: Password appears invalid');
            return;
        }

        const currentFormValue = {
            email: emailInput.current.value,
            password: pswInput.current.value,
        };

        Login(currentFormValue)
            .then((data) => {
                // we get here with or without errors
                setError(data.error);
                setErrorMsg(data.error ? data.errorMsg : null);
                // update the app's auth context regardless of success or error
                onLogin(data);
            });
    };
    const handleLogout = () => {
        // use the values contained in the Logout function
        // pass those values to auth data context
        onLogout(Logout());
    };

    return (
        <div>
            {error ? (<span>{errorMsg}</span>) : null}
            {error === false ? (<span>success</span>) : null}
            <input ref={emailInput} type="text" name="email" />
            <input ref={pswInput} type="password" name="password" />
            <button type="button" onClick={handleSubmit}>Sign in</button>
            <button type="button" onClick={handleLogout}>Sign out</button>
        </div>
    );
};

export default SignInForm;

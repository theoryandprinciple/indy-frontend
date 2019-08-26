import React, { useRef, useState } from 'react';
import { ForgotPass } from '../../utils/auth-api';

const ForgotPassword = () => {
    const [error, setError] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    /*
   * We use uncontrolled inputs to simplify the example
   */
    const emailInput = useRef();

    const handleSubmit = () => {
        ForgotPass(emailInput.current.value)
            .then((data) => {
                // we get here with or without errors
                setError(data.error);
                setErrorMsg(data.error ? data.errorMsg : null);
                // TODO: add some success state
            });
    };

    return (
        <div>
            {error ? (<span>{errorMsg}</span>) : null}
            {error === false ? (<span>success</span>) : null}
            <input ref={emailInput} type="text" name="email" placeholder="email" />
            <button type="button" onClick={handleSubmit}>Reset Password</button>
        </div>
    );
};

export default ForgotPassword;

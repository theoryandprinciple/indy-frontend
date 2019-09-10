import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ResetPass } from './wiring/auth-api';
import GetParameterByName from '../../utils/get-param';
import ValidateEmail from '../../utils/valid-email';

const ResetPassword = ({ location }) => {
    const [error, setError] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [resetToken, setResetToken] = useState(null);

    /*
   * We use uncontrolled inputs to simplify the example
   */
    const emailInput = useRef();
    const newPassword = useRef();

    useEffect(() => {
        const tokenFromHash = GetParameterByName(
            't',

            location.search,
        );
        setResetToken(tokenFromHash);
    }, [location]);

    const handleSubmit = () => {
        // Validatation
        if (!ValidateEmail(emailInput.current.value)) {
            setError(true);
            setErrorMsg('Error: Email appears invalid');
            return;
        }
        if (newPassword.current.value === '') {
            setErrorMsg('Error: Password appears invalid');
            return;
        }
        if (!resetToken) {
            setErrorMsg('Error: The URL you used to get here appears invalid');
            return;
        }

        const currentFormValue = {
            email: emailInput.current.value,
            resetToken,
            newPassword: newPassword.current.value,
        };
        ResetPass(currentFormValue)
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
            <input ref={newPassword} type="password" name="password" placeholder="new password" />
            <button type="button" onClick={handleSubmit}>Reset Password</button>
        </div>
    );
};
ResetPassword.propTypes = {
    location: PropTypes.shape({ search: PropTypes.string.isRequired }).isRequired,
};

export default ResetPassword;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { ForgotPass } from './wiring/auth-api';
import ValidateEmail from '../../utils/valid-email';

import Styles from './styles';

const ForgotPassword = ({ classes }) => {
    const [values, setValues] = React.useState({ email: '' });
    const [error, setError] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const handleChange = prop => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = () => {
        // Validatation
        if (!ValidateEmail(values.email)) {
            setError(true);
            setErrorMsg('Error: Email appears invalid');
            return;
        }

        ForgotPass(values.email)
            .then((data) => {
                // we get here with or without errors
                setError(data.error);
                setErrorMsg(data.error ? data.errorMsg : null);
            });
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.formWrapper}>
                <Typography
                    variant="h3"
                    style={{ fontSize: 24, paddingBottom: 45 }}
                >
                    Reset Password
                </Typography>
                {error ? (<span>{errorMsg}</span>) : null}
                {error === false ? (<span>success, an email to complete the process has been sent.</span>) : null}
                <div className={classes.inputWrapper}>
                    <Input
                        className={classes.formInput}
                        placeholder="Email"
                        fullWidth
                        type="email"
                        value={values.email}
                        onChange={handleChange('email')}
                    />
                </div>
                <div className={classes.inputWrapper}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        fullWidth
                    >
                        Reset Password
                    </Button>
                </div>
            </div>
        </div>
    );
};

ForgotPassword.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(ForgotPassword);

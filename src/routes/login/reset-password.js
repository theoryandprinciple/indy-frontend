import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { ResetPass } from './wiring/auth-api';
import Validation from '../../utils/validation-schema-forgot-pass';
import Styles from './styles';

const ResetPassword = ({ classes }) => {
    const { resetToken } = useParams();
    const [values, setValues] = React.useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const handleSubmit = () => {
        // reset error states
        setError(null);
        setErrorMsg(null);
        let errored = false;

        // Validatation
        const emailError = Validation.validate({ email: values.email }).error;
        if (values.email === '') {
            setErrorMsg('Email is required');
            errored = true;
        } else if (emailError) {
            setErrorMsg('Email appears to invalid');
            errored = true;
        } else if (values.password === '') {
            setErrorMsg('Error: Password appears invalid');
            errored = true;
        } else if (!resetToken) {
            setErrorMsg('Error: The URL you used to get here appears invalid');
            errored = true;
        }

        // if we had a local error, stop the submission
        if (errored) {
            setError(true);
            return;
        }

        const currentFormValue = {
            email: values.email,
            resetToken,
            newPassword: values.password,
        };

        ResetPass(currentFormValue)
            .then((data) => {
                // we get here with or without errors
                setError(data.error);
                setErrorMsg(data.error ? data.errorMsg : null);
                // TODO: add some success state
            });
    };

    const handleChange = prop => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.formWrapper}>
                <Typography variant="h3" style={{ fontSize: 24, paddingBottom: 45 }}>Reset Password</Typography>
                {error ? (<span>{errorMsg}</span>) : null}
                {error === false ? (<span>success, proceed to login</span>) : null}
                <div className={classes.inputWrapper}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        autoComplete="on"
                        value={values.email}
                        onChange={handleChange('email')}
                        fullWidth
                        InputLabelProps={{
                            classes: {
                                root: classes.textInputLabelRoot,
                                focused: classes.textInputLabelFocused,
                                error: classes.textInputLabelError,
                            },
                        }}
                        InputProps={{
                            classes: {
                                root: classes.textInput,
                                notchedOutline: classes.notchedOutline,
                                error: classes.textInputError,
                            },
                            inputProps: {
                                'aria-label': 'Email',
                            },
                        }}
                    />
                </div>
                <div className={classes.inputWrapper}>
                    <TextField
                        label="Password"
                        variant="outlined"
                        autoComplete="off"
                        fullWidth
                        value={values.password}
                        onChange={handleChange('password')}
                        InputLabelProps={{
                            classes: {
                                root: classes.textInputLabelRoot,
                                focused: classes.textInputLabelFocused,
                                error: classes.textInputLabelError,
                            },
                        }}
                        InputProps={{
                            classes: {
                                root: classes.textInput,
                                notchedOutline: classes.notchedOutline,
                                error: classes.textInputError,
                            },
                            inputProps: {
                                'aria-label': 'Password',
                            },
                        }}
                        type="password"
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

ResetPassword.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(ResetPassword);

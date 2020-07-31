import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { ResetPass } from './wiring/auth-api';
import Validation from '../../utils/validation-schema-login';
import CombineStyles from '../../utils/combine-styles';
import InputStyles from '../../styles/inputs';
import Styles from './styles';

const ResetPassword = ({ classes }) => {
    const { resetToken } = useParams();
    const [values, setValues] = useState({ email: '', password: '' });
    const [errored, setErrored] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        document.title = 'Reset Password - [SITE]';
    }, []);

    const handleSubmit = useCallback(async () => {
        // reset error states
        setErrored(null);
        setErrorMsg(null);
        const { error } = Validation.reset.validate({ ...values, resetToken });

        if (error) {
            setErrorMsg(error.message);
            setErrored(true);
            return;
        }

        const currentFormValue = {
            email: values.email,
            resetToken,
            newPassword: values.password,
        };

        try {
            const data = await ResetPass(currentFormValue);

            // we get here with or without errors
            setErrored(data.error);
            setErrorMsg(data.error ? data.errorMsg : null);
            // TODO: add some success state
        } catch (requestError) {
            // do nothing - shouldn't happen
        }
    }, [values, resetToken]);

    const handleChange = prop => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.formWrapper}>
                <Typography variant="h3" style={{ fontSize: 24, paddingBottom: 45 }}>Reset Password</Typography>
                <div role="status" aria-live="polite">
                    {errored && <Typography variant="body1" className={classes.errorMessage}>{errorMsg}</Typography>}
                    {errored === false && <Typography variant="body1" className={classes.successMessage}>success, proceed to login</Typography>}
                </div>
                <div className={classes.inputWrapper}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        autoComplete="on"
                        value={values.email}
                        autoFocus
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

const combinedStyles = CombineStyles(Styles, InputStyles);
export default withStyles(combinedStyles)(ResetPassword);

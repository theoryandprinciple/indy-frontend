import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { useAuthDataContext } from './wiring/auth-provider';
import { Login } from './wiring/auth-api';

import Styles from './styles';
import Validation from '../../utils/validation-schema-login';

import useEventListener from '../../utils/use-event-listener';

const SignInForm = ({ classes }) => {
    const history = useHistory();
    const { onLogin, authData } = useAuthDataContext();

    const [error, setError] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [values, setValues] = useState({ password: '', email: '', showPassword: false });

    const handleChange = prop => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = () => {
        // reset error states
        setError(null);
        setErrorMsg(null);
        let errored = false;

        // Validatation
        // - validating just on field at a time, and offering feedback only on that field

        const emailError = Validation.validate({ email: values.email }).error;
        if (values.email === '') {
            setErrorMsg('Email is required');
            errored = true;
        } else if (emailError) {
            setErrorMsg('Email appears to invalid');
            errored = true;
            // joi can't handle custom error messages, so we still need to use offer our own
            // setErrorMsg(emailError.message);
        } else if (values.password === '') {
            setErrorMsg('Error: Password appears invalid');
            errored = true;
        }

        // if we had a local error, stop the submission
        if (errored) {
            setError(true);
            return;
        }

        const currentFormValue = {
            email: values.email,
            password: values.password,
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

    const passwordInputRef = useRef(null);
    const eventHandler = useCallback((event) => {
        // check to see if we are pressing the enter key
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            handleSubmit();
        }
    }, [handleSubmit]);

    useEventListener('keyup', eventHandler, passwordInputRef.current);

    useEffect(() => {
        if (authData.isAuthenticated) {
            history.push('/');
        }
    }, [authData.isAuthenticated]);

    return (
        <div className={classes.wrapper}>
            <div className={classes.formWrapper}>
                <Typography variant="h3" style={{ fontSize: 24, paddingBottom: 45 }}>Sign In</Typography>
                {error ? (<span>{errorMsg}</span>) : null}
                {error === false ? (<span>success</span>) : null}
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
                        ref={passwordInputRef}
                        label="Password"
                        variant="outlined"
                        type="password"
                        autoComplete="current-password"
                        fullWidth
                        value={values.password}
                        onChange={handleChange('password')}
                        id="passwordField"
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
                    />
                </div>
                <div className={classes.inputWrapper}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        fullWidth
                    >
                        Log In
                    </Button>
                </div>
                <div>
                    <Button
                        color="primary"
                        fullWidth
                        onClick={() => history.push('/login/forgot-password')}
                    >
                        Forgot Password
                    </Button>
                </div>
            </div>
        </div>
    );
};

SignInForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(SignInForm);

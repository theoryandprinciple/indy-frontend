import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import useQuery from '../../utils/use-query';

import { useAuthDataContext } from './wiring/auth-provider';
import { Login } from './wiring/auth-api';

import CombineStyles from '../../utils/combine-styles';
import InputStyles from '../../styles/inputs';
import Styles from './styles';
import Validation from '../../utils/validation-schema-login';

import useEventListener from '../../utils/use-event-listener';

const SignInForm = ({ classes }) => {
    const history = useHistory();
    const query = useQuery();
    const { onLogin, authData } = useAuthDataContext();

    const [errored, setErrored] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [values, setValues] = useState({ email: '', password: '' });

    const encodeQueryParam = x => (
        x.replace(/\s/g, '+')
    );

    useEffect(() => {
        document.title = 'Log in - [SITE]';

        // hydrate email address from URL
        if (query.get('email')) {
            if (values.email !== encodeQueryParam(query.get('email'))) {
                // populate email and must set password as controlled input
                setValues({
                    email: encodeQueryParam(query.get('email')),
                    password: '',
                });
                // clear query string
                history.push({ search: '' });
            }
        }
        // eslint-disable-next-line
   }, []);

    const handleChange = prop => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = useCallback(() => {
        // reset error states
        setErrored(null);
        setErrorMsg(null);

        // Validatation
        // - validating just on field at a time, and offering feedback only on that field
        const { error } = Validation.login.validate(values);

        if (error) {
            setErrorMsg(error.message);
            setErrored(true);
            return;
        }

        const currentFormValue = {
            email: values.email,
            password: values.password,
        };

        Login(currentFormValue)
            .then((data) => {
                // we get here with or without errors
                setErrored(data.error);
                setErrorMsg(data.error ? data.errorMsg : null);
                // update the app's auth context regardless of success or error
                onLogin(data);
            });
    }, [values]);

    const emailRef = useRef(null);
    const passRef = useRef(null);
    const eventHandler = useCallback((event) => {
        // check to see if we are pressing the enter key
        if (event.keyCode === 13) {
            // cancel the default action, if needed
            event.preventDefault();
            // trigger the button element with a click
            handleSubmit();
        }
    }, [handleSubmit]);

    useEventListener('keyup', eventHandler, emailRef.current);
    useEventListener('keyup', eventHandler, passRef.current);

    useEffect(() => {
        if (authData.isAuthenticated) {
            history.push('/');
        }
    }, [authData.isAuthenticated, history]);

    return (
        <div className={classes.wrapper}>
            <div className={classes.formWrapper}>
                <Typography variant="h3" style={{ fontSize: 24, paddingBottom: 45 }}>Sign In</Typography>
                <div role="status" aria-live="polite">
                    {errored && <Typography variant="body1" className={classes.errorMessage}>{errorMsg}</Typography>}
                </div>
                <div className={classes.inputWrapper}>
                    <TextField
                        ref={emailRef}
                        label="Email"
                        variant="outlined"
                        type="email"
                        autoComplete="on"
                        value={values.email}
                        onChange={handleChange('email')}
                        autoFocus={!values.email}
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
                        ref={passRef}
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
                        onClick={() => history.push(values.email ? `/login/forgot-password?email=${values.email}` : '/login/forgot-password')}
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

const combinedStyles = CombineStyles(Styles, InputStyles);
export default withStyles(combinedStyles)(SignInForm);

import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Login, ResetPassBegin, LoginBegin } from '../../actions/auth';
import Validation from '../../utils/validation-schema-login';

import CombineStyles from '../../utils/combine-styles';
import InputStyles from '../../styles/inputs';
import Styles from './styles';

import useEventListener from '../../utils/use-event-listener';

const SignInForm = ({ classes }) => {
    const loginError = useSelector(state => state.auth.error);
    const loginErrorMsg = useSelector(state => state.auth.errorMsg);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const resetpassCompleted = useSelector(state => state.auth.resetPass.completed);
    const resetpassError = useSelector(state => state.auth.resetPass.error);
    const dispatch = useDispatch();

    const history = useHistory();

    const [errorAPI, setErrorAPI] = useState(null);
    const [errorMsgAPI, setErrorMsgAPI] = useState(null);
    const [values, setValues] = useState({ password: '', email: '' });
    const [errors, setErrors] = useState({});
    const [validationActive, setValidationActive] = useState(false);

    useEffect(() => {
        document.title = '[SITE]: Log in';
        // clear errors on mount/dismount
        dispatch(LoginBegin({ error: false, errorMsg: '' }));
        return () => dispatch(LoginBegin({ error: false, errorMsg: '' }));
    }, []);

    useEffect(() => {
        setErrorAPI(loginError);
        if (loginError) {
            setErrorMsgAPI(loginErrorMsg);
        }
    }, [loginError]);

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/');
        }
    }, [isAuthenticated]);

    useEffect(() => {
        let timer = null;
        if (resetpassCompleted) {
            timer = setTimeout(() => {
                dispatch(ResetPassBegin());
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [resetpassCompleted]);

    const handleChange = prop => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const validate = () => {
        setValidationActive(true);

        const validationError = Validation.validate({ email: values.email, password: values.password }, { abortEarly: false }).error;

        if (validationError) {
            const currentErrors = {};
            validationError.details.forEach((detail) => {
                currentErrors[detail.context.key] = detail.type;
            });

            setErrors(currentErrors);
        } else {
            setErrors({});
        }
        return validationError;
    };

    useEffect(() => {
        if (validationActive) {
            validate();
        }
    }, [
        values.email,
        values.password,
    ]);

    const handleSubmit = () => {
        if (!validate()) {
            // no error
            // let's make an API Call
            dispatch(Login(values));
        }
    };

    const inputRef = useRef(null);
    const eventHandler = useCallback((event) => {
        // check to see if we are pressing the enter key
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            handleSubmit();
        }
    }, [handleSubmit]);

    useEventListener('keyup', eventHandler, inputRef.current);

    return (
        <div className={classes.wrapper}>
            <div className={classes.formWrapper}>
                <Typography variant="h3" style={{ fontSize: 24, paddingBottom: 45 }}>Sign In</Typography>
                <div role="status" aria-live="polite">
                    {errorAPI ? (<Typography variant="body1" className={classes.errorMessage} style={{ paddingBottom: 30 }}>{errorMsgAPI}</Typography>) : null}
                    {(resetpassCompleted && !resetpassError) && (<Typography variant="body1" className={classes.successMessage} style={{ paddingBottom: 30 }}>Success: Your password has successfully been updated.</Typography>)}
                </div>
                <div className={classes.inputWrapper}>
                    <TextField
                        placeholder="Email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        type="email"
                        autoComplete="on"
                        value={values.email}
                        error={errors.email !== undefined}
                        onChange={handleChange('email')}
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
                    <div className={classes.errorMessage} role="status" aria-live="polite">
                        {errors.email ? 'Please enter your email address' : ''}
                    </div>
                </div>
                <div className={classes.inputWrapper}>
                    <TextField
                        placeholder="Password"
                        label="Password"
                        variant="outlined"
                        fullWidth
                        id="adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        value={values.password}
                        error={errors.password !== undefined}
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
                    />
                    <div className={classes.errorMessage} role="status" aria-live="polite">
                        {errors.password ? 'Please enter your password' : ''}
                    </div>
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

const combinedStyles = CombineStyles(Styles, InputStyles);
export default withStyles(combinedStyles)(SignInForm);

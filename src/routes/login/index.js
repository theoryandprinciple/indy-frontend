import React, {
    useState,
    useRef,
    useEffect,
    useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Typography from '@material-ui/core/Typography';

import { Login } from '../../actions/auth';

import Styles from './styles';
import StyledInput from './styledComponents/input';
import Validation from '../../utils/validationSchema';

import useEventListener from '../../utils/use-event-listener';

const SignInForm = ({ classes }) => {
    const loginError = useSelector(state => state.auth.error);
    const loginErrorMsg = useSelector(state => state.auth.errorMsg);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const history = useHistory();

    const [error, setError] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [values, setValues] = React.useState({ password: '', email: '', showPassword: false });

    useEffect(() => {
        setError(loginError);
        if (loginError) {
            setErrorMsg(loginErrorMsg);
        }
    }, [loginError]);

    const handleChange = prop => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = () => {
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

        dispatch(Login(currentFormValue));
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


    return (
        <div className={classes.wrapper}>
            <div className={classes.formWrapper}>
                <Typography variant="h3" style={{ fontSize: 24, paddingBottom: 45 }}>Sign In</Typography>
                {error ? (<span>{errorMsg}</span>) : null}
                {isAuthenticated ? (<span>success</span>) : null}
                <div className={classes.inputWrapper}>
                    <StyledInput
                        className={classes.formInput}
                        placeholder="Email"
                        fullWidth
                        type="email"
                        value={values.email}
                        onChange={handleChange('email')}
                    />
                </div>
                <div className={classes.inputWrapper}>
                    <StyledInput
                        ref={passwordInputRef}
                        className={classes.formInput}
                        placeholder="Password"
                        fullWidth
                        id="adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={(
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )}
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

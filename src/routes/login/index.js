import React, {
    useState,
    useEffect,
    useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { useForm } from 'react-hook-form';
// eslint-disable-next-line import/no-unresolved
import { yupResolver } from '@hookform/resolvers';

import Validation from '../../utils/validation-schema-login';

import useQuery from '../../utils/use-query';

import { Login, ResetPassBegin, LoginBegin } from '../../actions/auth';

import CombineStyles from '../../utils/combine-styles';
import InputStyles from '../../styles/inputs';
import Styles from './styles';

const SignInForm = ({ classes }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const loginError = useSelector(state => state.auth.error);
    const loginErrorMsg = useSelector(state => state.auth.errorMsg);

    const resetpassCompleted = useSelector(state => state.auth.resetPass.completed);
    const resetpassError = useSelector(state => state.auth.resetPass.error);

    const dispatch = useDispatch();

    const history = useHistory();
    const query = useQuery();

    const [errorMsg, setErrorMsg] = useState(null);
    const [errorAPI, setErrorAPI] = useState(null);
    const [errorMsgAPI, setErrorMsgAPI] = useState(null);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        errors,
    } = useForm({
        resolver: yupResolver(Validation.login),
    });

    const encodeQueryParam = x => (
        x.replace(/\s/g, '+')
    );

    useEffect(() => {
        document.title = 'Log in - [SITE]';
        // clear errors on mount/dismount
        dispatch(LoginBegin({ error: false, errorMsg: '' }));
        // hydrate email address from URL
        if (query.get('email')) {
            if (getValues('email') !== encodeQueryParam(query.get('email'))) {
                // populate email and must set password as controlled input
                setValue('email', encodeQueryParam(query.get('email')));
                setValue('password', '');
                // clear query string
                history.push({ search: '' });
            }
        }
        dispatch(LoginBegin({ error: false, errorMsg: '' }));
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/');
        }
    }, [isAuthenticated, history]);

    useEffect(() => {
        setErrorAPI(loginError);
        if (loginError) {
            setErrorMsgAPI(loginErrorMsg);
        }
    }, [loginError, loginErrorMsg]);

    useEffect(() => {
        // Only show the first error message
        if (Object.keys(errors).length) {
            // Relies on Object.keys insertion order property ordering, not ideal
            setErrorMsg(errors[Object.keys(errors)[0]].message);
            setErrorAPI(null);
        }
    }, [errors]);

    useEffect(() => {
        let timer = null;
        if (resetpassCompleted) {
            timer = setTimeout(() => {
                dispatch(ResetPassBegin());
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [resetpassCompleted, dispatch]);

    const onSubmit = useCallback((data) => {
        setErrorMsg(null);
        dispatch(Login(data));
    });

    return (
        <div className={classes.wrapper}>
            <div className={classes.formWrapper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant="h3" style={{ fontSize: 24, paddingBottom: 45 }}>Sign In</Typography>
                    <div role="status" aria-live="polite">
                        {errorMsg && <Typography variant="body1" className={classes.errorMessage}>{errorMsg}</Typography>}
                        {errorAPI && <Typography variant="body1" className={classes.errorMessage}>{errorMsgAPI}</Typography>}
                        {(resetpassCompleted && !resetpassError) && (<Typography variant="body1" className={classes.successMessage} style={{ paddingBottom: 30 }}>Success: Your password has successfully been updated.</Typography>)}
                    </div>
                    <div className={classes.inputWrapper}>
                        <TextField
                            name="email"
                            inputRef={register}
                            placeholder="Email"
                            label="Email"
                            variant="outlined"
                            autoComplete="on"
                            autoFocus={!getValues('email')}
                            className={classes.fullWidth}
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
                            name="password"
                            inputRef={register}
                            placeholder="Password"
                            label="Password"
                            variant="outlined"
                            autoComplete="current-password"
                            type="password"
                            className={classes.fullWidth}
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
                            type="submit"
                            fullWidth
                        >
                            Log In
                        </Button>
                    </div>
                    <div className={classes.inputWrapper}>
                        <Button
                            color="primary"
                            fullWidth
                            onClick={() => {
                                history.push(getValues('email') ? `/login/forgot-password?email=${getValues('email')}` : '/login/forgot-password');
                            }}
                        >
                            Forgot Password
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

SignInForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

const combinedStyles = CombineStyles(Styles, InputStyles);
export default withStyles(combinedStyles)(SignInForm);

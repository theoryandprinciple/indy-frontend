import React, {
    useState,
    useEffect,
    useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import useQuery from '../../utils/use-query';

import { useAuthDataContext } from './wiring/auth-provider';
import { Login } from './wiring/auth-api';

import CombineStyles from '../../utils/combine-styles';
import InputStyles from '../../styles/inputs';
import Styles from './styles';

const SignInForm = ({ classes }) => {
    const history = useHistory();
    const query = useQuery();
    const { onLogin, authData } = useAuthDataContext();

    const [errorMsg, setErrorMsg] = useState(null);
    const [errorAPI, setErrorAPI] = useState(null);
    const [errorMsgAPI, setErrorMsgAPI] = useState(null);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        errors,
    } = useForm();

    const onSubmit = useCallback(async (data) => {
        try {
            const response = await Login(data);

            // we get here with or without errors
            setErrorAPI(response.error);
            setErrorMsgAPI(response.error ? response.errorMsg : null);
            // update the app's auth context regardless of success or error
            onLogin(response);
        } catch (requestError) {
            // do nothing - shouldn't happen
        }
    }, [onLogin]);

    const encodeQueryParam = x => (
        x.replace(/\s/g, '+')
    );

    useEffect(() => {
        document.title = 'Log in - [SITE]';

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
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (authData.isAuthenticated) {
            history.push('/');
        }
    }, [authData.isAuthenticated, history]);

    useEffect(() => {
        Object.values(errors).forEach((error) => {
            // TODO error precedence? show email validation error first while keeping dynamic
            if (error && error.message) {
                setErrorMsg(error.message);
            }
        });
    }, [errors]);

    return (
        <div className={classes.wrapper}>
            <div className={classes.formWrapper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant="h3" style={{ fontSize: 24, paddingBottom: 45 }}>Sign In</Typography>
                    <div role="status" aria-live="polite">
                        {!!Object.keys(errors).length && <Typography variant="body1" className={classes.errorMessage}>{errorMsg}</Typography>}
                        {errorAPI && <Typography variant="body1" className={classes.errorMessage}>{errorMsgAPI}</Typography>}
                    </div>
                    <div className={classes.inputWrapper}>
                        <TextField
                            name="email"
                            inputRef={register({
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: 'Email appears invalid',
                                },
                            })}
                            placeholder="Email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            autoComplete="on"
                            autoFocus={!getValues('email')}
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
                            inputRef={register({
                                required: 'Password required',
                            })}
                            placeholder="Password"
                            label="Password"
                            variant="outlined"
                            fullWidth
                            autoComplete="current-password"
                            type="password"
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

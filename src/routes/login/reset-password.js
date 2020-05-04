import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { ResetPass } from '../../actions/auth';
import Validation from '../../utils/validation-schema-login';

import CombineStyles from '../../utils/combine-styles';
import InputStyles from '../../styles/inputs';
import Styles from './styles';

const ResetPassword = ({ classes }) => {
    const resetpassError = useSelector(state => state.auth.resetPass.error);
    const resetpassErrorMsg = useSelector(state => state.auth.resetPass.errorMsg);
    const resetpassCompleted = useSelector(state => state.auth.resetPass.completed);
    const dispatch = useDispatch();

    const history = useHistory();

    const { resetToken } = useParams();
    const [values, setValues] = useState({ password: '', passwordConfirm: '', email: '' });
    const [errored, setErrored] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        document.title = '[SITE]: Reset Password';
    }, []);

    useEffect(() => {
        let timer = null;
        if (resetpassCompleted && !resetpassError) {
            timer = setTimeout(() => {
                history.push('/login');
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [resetpassCompleted, resetpassError, history]);

    const handleSubmit = () => {
        setErrored(null);
        setErrorMsg(null);
        const { error } = Validation.reset.validate({ ...values, resetToken });

        if (error) {
            setErrorMsg(error.message);
            setErrored(true);
            return;
        }
        // no error
        // let's make an API Call
        const currentFormValue = {
            email: values.email,
            resetToken,
            newPassword: values.password,
        };

        dispatch(ResetPass(currentFormValue));
    };

    const handleChange = prop => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.formWrapper}>
                <Typography variant="h3" style={{ fontSize: 24, paddingBottom: 45 }}>Reset Password</Typography>
                <div role="status" aria-live="polite">
                    {errored && <Typography variant="body1" className={classes.errorMessage}>{errorMsg}</Typography>}
                    {resetpassError && <Typography variant="body1" className={classes.errorMessage}>{resetpassErrorMsg}</Typography>}
                    {(resetpassCompleted && !resetpassError) && (<Typography variant="body1" className={classes.successMessage} style={{ paddingBottom: 30 }}>Success: Your password has successfully been updated.</Typography>)}
                </div>
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
                        aria-label="Password"
                        label="Password"
                        variant="outlined"
                        type="password"
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
                    />
                </div>
                <div className={classes.inputWrapper}>
                    <TextField
                        aria-label="Password"
                        label="Confirm Password"
                        variant="outlined"
                        type="password"
                        autoComplete="off"
                        fullWidth
                        value={values.passwordConfirm}
                        onChange={handleChange('passwordConfirm')}
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
                                'aria-label': 'Confirm Password',
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

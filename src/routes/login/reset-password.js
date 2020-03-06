import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { ResetPass } from '../../actions/auth';
import Validation from '../../utils/validation-schema-password-reset';

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
    const [errors, setErrors] = useState({});
    const [validationActive, setValidationActive] = useState(false);

    useEffect(() => {
        document.title = '[SITE]: Reset Password';
    }, []);

    useEffect(() => {
        setValues({ ...values, resetToken });
    }, [resetToken]);

    useEffect(() => {
        let timer = null;
        if (resetpassCompleted && !resetpassError) {
            timer = setTimeout(() => {
                history.push('/login');
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [resetpassCompleted, resetpassError]);

    const validate = () => {
        setValidationActive(true);

        const validationError = Validation.validate({ email: values.email, password: values.password, passwordConfirm: values.passwordConfirm }, { abortEarly: false }).error;

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
        values.passwordConfirm,
    ]);

    const handleSubmit = () => {
        if (!validate()) {
            // no error
            // let's make an API Call
            const currentFormValue = {
                email: values.email,
                resetToken,
                newPassword: values.password,
            };

            dispatch(ResetPass(currentFormValue));
        }
    };

    const handleChange = prop => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.formWrapper}>
                <Typography variant="h3" style={{ fontSize: 24, paddingBottom: 45 }}>Reset Password</Typography>
                <div role="status" aria-live="polite">
                    {resetpassError ? (<Typography variant="body1" className={classes.errorMessage} style={{ paddingBottom: 30 }}>{resetpassErrorMsg}</Typography>) : null}
                    {(resetpassCompleted && !resetpassError) && (<Typography variant="body1" className={classes.successMessage} style={{ paddingBottom: 30 }}>Success: Your password has successfully been updated.</Typography>)}
                </div>
                <div className={classes.inputWrapper}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        autoComplete="on"
                        value={values.email}
                        error={errors.email !== undefined}
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
                <div className={classes.errorMessage} role="status" aria-live="polite">
                    {errors.email ? 'Please enter your email address' : ''}
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
                </div>
                <div className={classes.errorMessage} role="status" aria-live="polite">
                    {errors.password ? 'Please enter a new password' : ''}
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
                        error={errors.passwordConfirm !== undefined}
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
                <div className={classes.errorMessage} role="status" aria-live="polite">
                    {errors.passwordConfirm ? 'Your passwords do not match' : ''}
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

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { ResetPass } from '../../actions/auth';
import Validation from '../../utils/validationSchema';
import Styles from './styles';
import StyledInput from './styledComponents/input';

const ResetPassword = ({ classes }) => {
    const resetpassError = useSelector(state => state.auth.resetPass.error);
    const resetpassErrorMsg = useSelector(state => state.auth.resetPass.errorMsg);
    const resetpassCompleted = useSelector(state => state.auth.resetPass.completed);
    const dispatch = useDispatch();

    const { resetToken } = useParams();
    const [values, setValues] = React.useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        setError(resetpassError);
        if (resetpassError) {
            setErrorMsg(resetpassErrorMsg);
        }
    }, [resetpassError]);

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

        dispatch(ResetPass(currentFormValue));
    };

    const handleChange = prop => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.formWrapper}>
                <Typography variant="h3" style={{ fontSize: 24, paddingBottom: 45 }}>Reset Password</Typography>
                {error ? (<span>{errorMsg}</span>) : null}
                {resetpassCompleted ? (<span>success, proceed to login</span>) : null}
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

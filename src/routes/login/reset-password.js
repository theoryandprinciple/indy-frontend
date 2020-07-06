import React, {
    useState,
    useEffect,
    useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { useForm } from 'react-hook-form';
// eslint-disable-next-line import/no-unresolved
import { yupResolver } from '@hookform/resolvers';

import Validation from '../../utils/validation-schema-login';

import { ResetPass } from '../../actions/auth';

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
    const [errorMsg, setErrorMsg] = useState(null);

    const {
        register,
        handleSubmit,
        setValue,
        errors,
    } = useForm({
        resolver: yupResolver(Validation.reset),
    });

    useEffect(() => {
        document.title = 'Reset Password - [SITE]';
        setValue('resetToken', resetToken);
    }, []);

    useEffect(() => {
        let timer = null;
        if (resetpassCompleted && !resetpassError) {
            timer = setTimeout(() => {
                history.push('/login');
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [resetpassCompleted, resetpassError]);

    useEffect(() => {
        // Only show the first error message
        if (Object.keys(errors).length) {
            // Relies on Object.keys insertion order property ordering, not ideal
            setErrorMsg(errors[Object.keys(errors)[0]].message);
        }
    }, [errors]);

    const onSubmit = useCallback((data) => {
        setErrorMsg(null);
        dispatch(ResetPass(data));
    });

    return (
        <div className={classes.wrapper}>
            <div className={classes.formWrapper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant="h3" style={{ fontSize: 24, paddingBottom: 45 }}>Reset Password</Typography>
                    <div role="status" aria-live="polite">
                        {errorMsg && <Typography variant="body1" className={classes.errorMessage}>{errorMsg}</Typography>}
                        {resetpassError && <Typography variant="body1" className={classes.errorMessage}>{resetpassErrorMsg}</Typography>}
                        {(resetpassCompleted && !resetpassError) && (<Typography variant="body1" className={classes.successMessage} style={{ paddingBottom: 30 }}>Success: Your password has successfully been updated.</Typography>)}
                    </div>
                    <div className={classes.inputWrapper}>
                        <TextField
                            name="email"
                            inputRef={register}
                            label="Email"
                            variant="outlined"
                            autoComplete="on"
                            autoFocus
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
                            aria-label="Password"
                            label="Password"
                            variant="outlined"
                            type="password"
                            autoComplete="off"
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
                        <TextField
                            name="passwordConfirm"
                            inputRef={register}
                            aria-label="Password"
                            label="Confirm Password"
                            variant="outlined"
                            type="password"
                            autoComplete="off"
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
                                    'aria-label': 'Confirm Password',
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
                            Reset Password
                        </Button>
                    </div>
                    <input name="resetToken" ref={register} type="hidden" />
                </form>
            </div>
        </div>
    );
};

ResetPassword.propTypes = {
    classes: PropTypes.object.isRequired,
};

const combinedStyles = CombineStyles(Styles, InputStyles);
export default withStyles(combinedStyles)(ResetPassword);

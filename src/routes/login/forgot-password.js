import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { ForgotPass, ForgotPassBegin } from '../../actions/auth';
import Validation from '../../utils/validation-schema-login';

import CombineStyles from '../../utils/combine-styles';
import InputStyles from '../../styles/inputs';
import Styles from './styles';

const ForgotPassword = ({ classes }) => {
    const forgotpassError = useSelector(state => state.auth.forgotPass.error);
    const forgotpassErrorMsg = useSelector(state => state.auth.forgotPass.errorMsg);
    const forgotpassCompleted = useSelector(state => state.auth.forgotPass.completed);
    const dispatch = useDispatch();
    const history = useHistory();

    const [values, setValues] = useState({ email: '' });
    const [errored, setErrored] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        document.title = '[SITE]: Forgot Password';
        // clear error messages when component loads
        dispatch(ForgotPassBegin());
        // eslint-disable-next-line
    }, []);

    const handleChange = prop => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = () => {
        setErrored(null);
        setErrorMsg(null);
        const { error } = Validation.forgot.validate(values);

        if (error) {
            setErrorMsg(error.message);
            setErrored(true);
            return;
        }
        // no error
        // let's make an API Call
        dispatch(ForgotPass(values.email));
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.formWrapper}>
                <Typography
                    variant="h3"
                    style={{ fontSize: 24, paddingBottom: 45 }}
                >
                    Reset Password
                </Typography>
                <div role="status" aria-live="polite">
                    {errored && <Typography variant="body1" className={classes.errorMessage}>{errorMsg}</Typography>}
                    {forgotpassError && <Typography variant="body1" className={classes.errorMessage}>{forgotpassErrorMsg}</Typography>}
                    {(forgotpassCompleted && !forgotpassError) && (<Typography variant="body1" className={classes.successMessage} style={{ paddingBottom: 30 }}>Success: A reset email has been sent to your account.</Typography>)}
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
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        fullWidth
                    >
                        Submit
                    </Button>
                </div>
                <div className={classes.inputWrapper}>
                    <Button
                        color="primary"
                        onClick={() => history.goBack()}
                        fullWidth
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

ForgotPassword.propTypes = {
    classes: PropTypes.object.isRequired,
};

const combinedStyles = CombineStyles(Styles, InputStyles);
export default withStyles(combinedStyles)(ForgotPassword);

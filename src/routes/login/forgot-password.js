import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { ForgotPass, ForgotPassBegin } from '../../actions/auth';
import Validation from '../../utils/validation-schema-forgot-pass';

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
    const [errors, setErrors] = useState({});
    const [validationActive, setValidationActive] = useState(false);

    useEffect(() => {
        document.title = '[SITE]: Forgot Password';
        // clear error messages when component loads
        dispatch(ForgotPassBegin());
    }, []);

    const handleChange = prop => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const validate = () => {
        setValidationActive(true);

        const validationError = Validation.validate({ email: values.email }).error;

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
    }, [values.email]);
    const handleSubmit = () => {
        if (!validate()) {
            // no error
            // let's make an API Call
            dispatch(ForgotPass(values.email));
        }
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
                    {forgotpassError ? (<Typography variant="body1" className={classes.errorMessage} style={{ paddingBottom: 30 }}>{forgotpassErrorMsg}</Typography>) : null}
                    {(forgotpassCompleted && !forgotpassError) && (<Typography variant="body1" className={classes.successMessage} style={{ paddingBottom: 30 }}>Success: A reset email has been sent to your account.</Typography>)}
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

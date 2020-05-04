import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { ForgotPass } from './wiring/auth-api';
import Validation from '../../utils/validation-schema-login';

import Styles from './styles';

const ForgotPassword = ({ classes }) => {
    const history = useHistory();
    const [values, setValues] = useState({ email: '' });
    const [errored, setErrored] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const handleChange = prop => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = () => {
        // reset error states
        setErrored(null);
        setErrorMsg(null);

        // Validatation
        const { error } = Validation.forgot.validate(values);

        if (error) {
            setErrorMsg(error.message);
            setErrored(true);
            return;
        }

        ForgotPass(values.email)
            .then((data) => {
                // we get here with or without errors
                setErrored(data.error);
                setErrorMsg(data.error ? data.errorMsg : null);
            });
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
                    {errored ? (<span>{errorMsg}</span>) : null}
                    {errored === false ? (<span>success, an email to complete the process has been sent.</span>) : null}
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
                        Reset Password
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

export default withStyles(Styles)(ForgotPassword);

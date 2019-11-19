import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { ForgotPass } from '../../actions/auth';
import Validation from '../../utils/validationSchema';

import Styles from './styles';
import StyledInput from './styledComponents/input';

const ForgotPassword = ({ classes }) => {
    const forgotpassError = useSelector(state => state.auth.forgotPass.error);
    const forgotpassErrorMsg = useSelector(state => state.auth.forgotPass.errorMsg);
    const forgotpassCompleted = useSelector(state => state.auth.forgotPass.completed);
    const dispatch = useDispatch();

    const history = useHistory();
    const [values, setValues] = React.useState({ email: '' });
    const [error, setError] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        setError(forgotpassError);
        if (forgotpassError) {
            setErrorMsg(forgotpassErrorMsg);
        }
    }, [forgotpassError]);

    const handleChange = prop => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

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
        }

        // if we had a local error, stop the submission
        if (errored) {
            setError(true);
            return;
        }

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
                {error ? (<span>{errorMsg}</span>) : null}
                {(forgotpassCompleted && !error) ? (<span>success, an email to complete the process has been sent.</span>) : null}
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

import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useQuery from '../../utils/use-query';

import { ForgotPass } from './wiring/auth-api';
import Validation from '../../utils/validation-schema-login';

import CombineStyles from '../../utils/combine-styles';
import InputStyles from '../../styles/inputs';
import Styles from './styles';

import useEventListener from '../../utils/use-event-listener';

const ForgotPassword = ({ classes }) => {
    const history = useHistory();
    const query = useQuery();
    const [values, setValues] = useState({ email: '' });
    const [errored, setErrored] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const encodeQueryParam = x => (
        x.replace(/\s/g, '+')
    );

    useEffect(() => {
        document.title = 'Forgot Password - [SITE]';
        // hydrate email address from URL
        if (query.get('email')) {
            setValues({ email: encodeQueryParam(query.get('email')) });
        }
        // eslint-disable-next-line
    }, []);

    const handleChange = prop => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = useCallback(async () => {
        // reset error states
        setErrored(null);
        setErrorMsg(null);

        // Validation
        const { error } = Validation.forgot.validate(values);

        if (error) {
            setErrorMsg(error.message);
            setErrored(true);
            return;
        }

        try {
            const data = await ForgotPass(values.email);
            // we get here with or without errors
            setErrored(data.error);
            setErrorMsg(data.error ? data.errorMsg : null);
        } catch (requestError) {
            // do nothing - shouldn't happen
        }
    }, [values]);

    const emailRef = useRef(null);
    const eventHandler = useCallback((event) => {
        // check to see if we are pressing the enter key
        if (event.keyCode === 13) {
            // cancel the default action, if needed
            event.preventDefault();
            // trigger the button element with a click
            handleSubmit();
        }
    }, [handleSubmit]);
    useEventListener('keyup', eventHandler, emailRef.current);

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
                    {errored === false && <Typography variant="body1" className={classes.successMessage}>success, an email to complete the process has been sent.</Typography>}

                </div>
                <div className={classes.inputWrapper}>
                    <TextField
                        ref={emailRef}
                        label="Email"
                        variant="outlined"
                        type="email"
                        autoComplete="on"
                        value={values.email}
                        onChange={handleChange('email')}
                        fullWidth
                        autoFocus
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
                        onClick={() => history.push(values.email ? `/login?email=${values.email}` : '/login')}
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

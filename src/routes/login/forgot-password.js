import React, {
    useState,
    useEffect,
    useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// eslint-disable-next-line import/no-unresolved
import { yupResolver } from '@hookform/resolvers';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import useQuery from '../../utils/use-query';

import { ForgotPass } from './wiring/auth-api';

import Validation from '../../utils/validation-schema-login';

import CombineStyles from '../../utils/combine-styles';
import InputStyles from '../../styles/inputs';
import Styles from './styles';

const ForgotPassword = ({ classes }) => {
    const history = useHistory();
    const query = useQuery();
    const [errorMsg, setErrorMsg] = useState(null);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        errors,
    } = useForm({
        resolver: yupResolver(Validation.login),
    });

    const encodeQueryParam = x => (
        x.replace(/\s/g, '+')
    );

    useEffect(() => {
        document.title = 'Forgot Password - [SITE]';
        // hydrate email address from query param in URL
        if (query.get('email')) {
            setValue('email', encodeQueryParam(query.get('email')));
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // Only show the first error message
        if (Object.keys(errors).length) {
            // Relies on Object.keys insertion order property ordering, not ideal
            setErrorMsg(errors[Object.keys(errors)[0]].message);
        }
    }, [errors]);

    const onSubmit = useCallback(async (data) => {
        setErrorMsg(null);
        try {
            const response = await ForgotPass(data);
            // we get here with or without errors
            setErrorMsg(response.error ? response.errorMsg : null);
        } catch (requestError) {
            // do nothing - shouldn't happen
        }
    });

    return (
        <div className={classes.wrapper}>
            <div className={classes.formWrapper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Typography
                        variant="h3"
                        style={{ fontSize: 24, paddingBottom: 45 }}
                    >
                        Reset Password
                    </Typography>
                    <div role="status" aria-live="polite">
                        {errorMsg && <Typography variant="body1" className={classes.errorMessage}>{errorMsg}</Typography>}
                        {!errorMsg && <Typography variant="body1" className={classes.successMessage}>success, an email to complete the process has been sent.</Typography>}
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
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                        >
                            Submit
                        </Button>
                    </div>
                    <div className={classes.inputWrapper}>
                        <Button
                            color="primary"
                            fullWidth
                            onClick={() => history.push(getValues('email') ? `/login?email=${getValues('email')}` : '/login')}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

ForgotPassword.propTypes = {
    classes: PropTypes.object.isRequired,
};

const combinedStyles = CombineStyles(Styles, InputStyles);
export default withStyles(combinedStyles)(ForgotPassword);

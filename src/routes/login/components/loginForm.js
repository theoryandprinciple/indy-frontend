import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import { history } from '../../../store';

import Styles from './loginStyles';

class LoginForm extends React.Component {
    static propTypes = {
        errored: PropTypes.bool.isRequired,
        login: PropTypes.func.isRequired,
        logout: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        isLoginPending: PropTypes.bool.isRequired,
        forgotPassError: PropTypes.bool.isRequired,
        forgotPassErrorMsg: PropTypes.string.isRequired,
        forgotPassComplete: PropTypes.bool.isRequired,
        forgotPass: PropTypes.func.isRequired,
        forgotPassCancel: PropTypes.func.isRequired,
        classes: PropTypes.shape({ button: PropTypes.string.isRequired }).isRequired,
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            email: '',
            password: '',
            forgotPassEmail: '',
            forgotPassword: false,
            emailError: true,

        };

        this.boundLoginUser = this.loginUser.bind(this);
        this.boundLogoutUser = this.logoutUser.bind(this);
        this.boundNewUser = this.newUser.bind(this);
        this.boundForgotPassword = this.forgotPassword.bind(this);
        this.forgotPasswordSubmit = this.forgotPasswordSubmit.bind(this);
    }

    onChange = (key, value) => {
        this.setState({ [key]: value });
    };

    loginUser = (event) => {
        event.preventDefault();
        const { login } = this.props;
        const { state } = this;
        login(state.email, state.password);
    };

    newUser = (event) => {
        event.preventDefault();
        history.push('/new-user');
    };

    logoutUser = (event) => {
        event.preventDefault();
        const { logout } = this.props;
        logout();
    };

    forgotPassword = (event) => {
        event.preventDefault();
        const { forgotPassCancel } = this.props;
        this.setState(prevState => ({ forgotPassword: !prevState.forgotPassword }));
        forgotPassCancel(); // clear any existing errors
    };

    forgotPasswordSubmit = (event) => {
        event.preventDefault();
        const { forgotPass } = this.props;
        const { state } = this;

        forgotPass(state.forgotPassEmail);
    };

    onEmailChange = async (value) => {
        await this.setState({ email: value });
        const expression = /\S+@\S+/;
        if (!expression.test(String(value).toLowerCase())) {
            this.setState({ emailError: true });
            this.setState({ emailErrorText: 'Email is not valid.' });
        } else {
            this.setState({ emailError: false });
            this.setState({ emailErrorText: 'Email Valid.' });
        }
    };

    render() {
        const { state } = this;
        const {
            errored,
            isLoggedIn,
            isLoginPending,
            forgotPassError,
            forgotPassErrorMsg,
            forgotPassComplete,
            classes,
        } = this.props;

        const { forgotPassword, emailError } = this.state;
        return (
            <React.Fragment>
                {forgotPassword && (
                    <React.Fragment>
                        {forgotPassError && (
                            <p style={{ color: 'red' }}>{forgotPassErrorMsg}</p>
                        )}
                        {forgotPassComplete && (
                            <p>
                                Please check your email for your reset password
                                link
                            </p>
                        )}
                        {!forgotPassComplete && (
                            <React.Fragment>
                                <form onSubmit={this.forgotPasswordSubmit}>
                                    <TextField
                                        placeholder="Email Address"
                                        type="email"
                                        className={classes.textField}
                                        onChange={evt => this.onChange(
                                            'forgotPassEmail',
                                            evt.target.value,
                                        )
                                        }
                                    />
                                    <br />
                                    <Button
                                        className={classes.button}
                                        onClick={this.boundForgotPassword}
                                        variant="contained"
                                        style={
                                            { margin: 15 }
                                        }
                                    >
                                        Cancel
                                    </Button>
                                    <br />
                                    <Button type="submit" variant="contained" className={classes.button} value="submit">
                                        Submit
                                    </Button>
                                </form>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                )}
                {!forgotPassword && (
                    <React.Fragment>
                        <div className={classes.formContainer}>
                            <form
                                onSubmit={
                                    isLoggedIn
                                        ? this.boundLogoutUser
                                        : this.boundLoginUser
                                }
                            >
                                {errored && (
                                    <p style={{ color: 'red' }}>
                                    Error: Failed Login
                                    </p>
                                )}
                                {isLoggedIn && (
                                    <p style={{ color: 'green' }}>
                                    Success: You Are Logged In
                                    </p>
                                )}
                                {isLoginPending && (
                                    <p style={{ color: 'orange' }}>
                                    Waiting: Login Processing
                                    </p>
                                )}

                                <div>
                                    <div>

                                        <div className={classes.containerBorder}>
                                            <FormControl className={classes.formControlEmail} error={emailError}>
                                                <Input
                                                    id="email"
                                                    placeholder="Email Address"
                                                    type="email"
                                                    value={state.email}
                                                    onChange={evt => this.onEmailChange(evt.target.value)
                                                    }
                                                    aria-describedby="email-error-text"
                                                />

                                                <FormHelperText id="email-error-text">{state.emailErrorText}</FormHelperText>

                                            </FormControl>
                                            <div className="form-group form-inline">
                                                <FormControl className={classes.formControl}>
                                                    <Input
                                                        id="password"
                                                        placeholder="Password"
                                                        type="password"
                                                        value={state.password1}
                                                        onChange={evt => this.onChange(
                                                            'password',
                                                            evt.target.value,
                                                        )
                                                        }
                                                    />
                                                </FormControl>

                                            </div>
                                        </div>

                                        <Button
                                            variant="contained"
                                            type="submit"
                                            className={classes.button}
                                            value="Submit"
                                        >
                                            {isLoggedIn ? 'Logout' : 'Login'}
                                        </Button>
                                        <br />
                                        <Button
                                            variant="contained"
                                            className={classes.button}
                                            onClick={this.boundForgotPassword}
                                        >
                                    Forgot Password
                                        </Button>

                                    </div>

                                </div>


                            </form>
                        </div>
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

// export default LoginForm;
export default withStyles(Styles)(LoginForm);

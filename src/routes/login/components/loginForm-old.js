import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
    };

    constructor(props, context) {
      super(props, context);

      this.state = {
        username: '',
        password: '',
        forgotPassEmail: '',
        forgotPassword: false,
      };

      this.boundLoginUser = this.loginUser.bind(this);
      this.boundLogoutUser = this.logoutUser.bind(this);
      this.boundForgotPassword = this.forgotPassword.bind(this);
      this.forgotPasswordSubmit = this.forgotPasswordSubmit.bind(this);
    }

    onChange = (key, value) => {
      this.setState({ [key]: value });
    };

    loginUser = (event, props, state) => {
      event.preventDefault();
      props.login(state.username, state.password);
    };

    logoutUser = (event) => {
      event.preventDefault();
      this.props.logout();
    };

    forgotPassword = (event) => {
      event.preventDefault();
      this.setState({ forgotPassword: !this.state.forgotPassword });
      this.props.forgotPassCancel(); // clear any existing errors
    };

    forgotPasswordSubmit = (event) => {
      event.preventDefault();
      this.props.forgotPass(this.state.forgotPassEmail);
    };

    render() {
      const {
        errored,
        isLoggedIn,
        isLoginPending,
        forgotPassError,
        forgotPassErrorMsg,
        forgotPassComplete,
      } = this.props;
      const { forgotPassword } = this.state;
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
                <p>forgot password loop</p>
                <form onSubmit={this._forgotPasswordSubmit}>
                  <TextField
                    placeholder="Email Address"
                    type="email"
                    onChange={evt => this.onChange(
                      'forgotPassEmail',
                      evt.target.value,
                    )
                                        }
                  />
                  <Button onClick={this._boundForgotPassword}>
                                        Cancel
                  </Button>
                  <Button type="submit" value="submit">
                                        Submit
                  </Button>
                </form>
              </React.Fragment>
              )}
            </React.Fragment>
          )}
          {!forgotPassword && (
            <React.Fragment>
              <form
                onSubmit={
                                isLoggedIn
                                  ? this._boundLogoutUser
                                  : this._boundLoginUser
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
                <TextField
                  placeholder="Username"
                  autoComplete="username"
                  onChange={evt => this.onChange('username', evt.target.value)
                                }
                />
                <TextField
                  placeholder="Password"
                  type="password"
                  autoComplete="current-password"
                  onChange={evt => this.onChange('password', evt.target.value)
                                }
                />
                <Button variant="contained" color="primary" type="submit" value="Submit">
                  {isLoggedIn ? 'Logout' : 'Login'}
                </Button>
                <Button onClick={this._boundForgotPassword}>
                                Forgot Password
                </Button>
              </form>
            </React.Fragment>
          )}
        </React.Fragment>
      );
    }
}

export default LoginForm;

import React from 'react'
import PropTypes from 'prop-types'

class LoginForm extends React.Component {

    static propTypes = {
        errored: PropTypes.bool.isRequired,
        login: PropTypes.func.isRequired,
        logout: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        isLoginPending: PropTypes.bool.isRequired,
        forgotPassError: PropTypes.bool.isRequired,
        forgotPassErrorMsg: PropTypes.string,
        forgotPassComplete: PropTypes.bool.isRequired,
        forgotPass: PropTypes.func.isRequired,
        forgotPassCancel: PropTypes.func.isRequired
    };
    constructor(props, context) {

        super(props, context);

        this.state = {
            username: '',
            password: '',
            forgotPassEmail: '',
            forgotPassword: false
        }

        this._boundLoginUser = this.loginUser.bind(this);
        this._boundLogoutUser = this.logoutUser.bind(this);
        this._boundForgotPassword = this.forgotPassword.bind(this);
        this._forgotPasswordSubmit = this.forgotPasswordSubmit.bind(this);
    }
    onChange = (key, value) => {
        this.setState({ [key]: value })
    }
    loginUser = (event) => {

        event.preventDefault();
        this.props.login(this.state.username, this.state.password)
    }
    logoutUser = (event) => {

        event.preventDefault();
        this.props.logout()
    }
    forgotPassword = (event) => {

        event.preventDefault();
        this.setState({ forgotPassword: !this.state.forgotPassword })
        this.props.forgotPassCancel() // clear any existing errors
    }
    forgotPasswordSubmit = (event) => {

        event.preventDefault();
        this.props.forgotPass(this.state.forgotPassEmail);
    }

    render() {

        const { errored, isLoggedIn, isLoginPending, forgotPassError, forgotPassErrorMsg, forgotPassComplete } = this.props
        const { forgotPassword } = this.state
      return (
          <React.Fragment>
        {forgotPassword &&
             <React.Fragment>
                {forgotPassError &&
                    <p style={{ color: 'red' }}>{forgotPassErrorMsg}</p>
                }
                {forgotPassComplete &&
                    <p>Please check your email for your reset password link</p>
                }
                {!forgotPassComplete &&
                    <React.Fragment>
                        <p>forgot password loop</p>
                        <form onSubmit={this._forgotPasswordSubmit}>
                            <input
                            placeholder='Email Address'
                            type='email'
                            onChange={evt => this.onChange('forgotPassEmail', evt.target.value)}
                            />
                            <button onClick={this._boundForgotPassword}>Cancel</button>
                            <button type="submit" value="submit">Submit</button>
                        </form>
                    </React.Fragment>
                }
             </React.Fragment>
        }
        {!forgotPassword &&
            <React.Fragment>
                <form onSubmit={isLoggedIn ? this._boundLogoutUser : this._boundLoginUser}>
                        {errored &&
                            <p style={{ color: 'red' }}>Error: Failed Login</p>
                        }
                        {isLoggedIn &&
                            <p style={{ color: 'green' }}>Success: You Are Logged In</p>
                        }
                        {isLoginPending &&
                            <p style={{ color: 'orange' }}>Waiting: Login Processing</p>
                        }
                      <input
                        placeholder='Username'
                        autoComplete="username"
                        onChange={evt => this.onChange('username', evt.target.value)}
                      />
                      <input
                        placeholder='Password'
                        type='password'
                        autoComplete="current-password"
                        onChange={evt => this.onChange('password', evt.target.value)}
                      />
                      <button type="submit" value="Submit">{isLoggedIn ? 'Logout' : 'Login'}</button>
                      <button onClick={this._boundForgotPassword}>Forgot Password</button>
                  </form>
              </React.Fragment>
        }
        </React.Fragment>
      )
  }
}

export default LoginForm

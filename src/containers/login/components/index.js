import React from 'react'
import PropTypes from 'prop-types'

class Login extends React.Component {

    static propTypes = {
        errored: PropTypes.bool.isRequired,
        login: PropTypes.func.isRequired,
        logout: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        isLoginPending: PropTypes.bool.isRequired
    };
    constructor(props, context) {

        super(props, context);

        this.state = {
            username: '',
            password: ''
        }

        this._boundLoginUser = this.loginUser.bind(this);
        this._boundLogoutUser = this.logoutUser.bind(this);
    }
    onChange = (key, value) => {
        this.setState({ [key]: value })
    }
    loginUser = () => {
        this.props.login(this.state.username, this.state.password)
    }
    logoutUser = () => {
        this.props.logout()
    }

    render() {
        const { errored, isLoggedIn, isLoginPending } = this.props;
      return (
          <React.Fragment>
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
                onChange={evt => this.onChange('username', evt.target.value)}
              />
              <input
                placeholder='Password'
                type='password'
                onChange={evt => this.onChange('password', evt.target.value)}
              />
              <button onClick={isLoggedIn ? this._boundLogoutUser : this._boundLoginUser}>{isLoggedIn ? 'Logout' : 'Login'}</button>
        </React.Fragment>
      )
  }
}

export default Login

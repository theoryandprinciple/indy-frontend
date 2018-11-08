import React from 'react'
import PropTypes from 'prop-types'

class Login extends React.Component {

    static propTypes = {
        errored: PropTypes.bool,
        login: PropTypes.func.isRequired,
    };
    constructor(props, context) {

        super(props, context);

        this.state = {
            username: '',
            password: ''
        }

        this._boundLoginUser = this.loginUser.bind(this);
    }
    onChange = (key, value) => {
        this.setState({ [key]: value })
    }
    loginUser = () => {
        this.props.login('test-username', 'test-password')
    }

    render() {
      return (
          <React.Fragment>
              <input
                placeholder='Username'
                onChange={evt => this.onChange('username', evt.target.value)}
              />
              <input
                placeholder='Password'
                type='password'
                onChange={evt => this.onChange('password', evt.target.value)}
              />
              <button onClick={this.loginUser}>Login</button>
        </React.Fragment>
      )
  }
}

export default Login

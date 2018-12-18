import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../containers/loginForm';

class LoginPage extends React.Component {
    static propTypes = {
        logout: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired
    };
    constructor(props, context) {
        super(props, context);

        this._boundLogoutUser = this.logoutUser.bind(this);
    }

    logoutUser = (event) => {
        this.props.logout();
        event.preventDefault();
    };

    render() {
        const { isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {!isLoggedIn && <LoginForm />}
                {isLoggedIn && (
                    <button onClick={this._boundLogoutUser}>Logout</button>
                )}
            </React.Fragment>
        );
    }
}

export default LoginPage;

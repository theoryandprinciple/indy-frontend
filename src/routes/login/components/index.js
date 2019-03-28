import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import LoginForm from '../containers/loginForm';

class LoginPage extends React.Component {
    static propTypes = {
        logout: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
    };

    constructor(props, context) {
        super(props, context);

        this.boundLogoutUser = this.logoutUser.bind(this);
    }

    logoutUser = (event) => {
        const { logout } = this.props;
        logout();

        event.preventDefault();
    };

    render() {
        const { isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {!isLoggedIn && <LoginForm />}
                {isLoggedIn && (
                    <Button onClick={this.boundLogoutUser}>Logout</Button>
                )}
            </React.Fragment>
        );
    }
}

export default LoginPage;

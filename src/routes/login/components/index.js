import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../containers/loginForm';
import Button from '@material-ui/core/Button';

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
                    <Button onClick={this._boundLogoutUser}>Logout</Button>
                )}
            </React.Fragment>
        );
    }
}

export default LoginPage;

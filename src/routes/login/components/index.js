import React from 'react';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import LoginForm from '../containers/loginForm';

const LoginPage = () => {
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const logout = useSelector(state => state.logout);
    return (
        <React.Fragment>
            {!isLoggedIn && <LoginForm />}
            {isLoggedIn && (
                <Button onClick={() => logout()}>Logout</Button>
            )}
        </React.Fragment>
    );
};

export default LoginPage;

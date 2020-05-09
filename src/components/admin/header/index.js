import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';

import Styles from './styles';
import Logo from './images/logo.png';

import { Logout } from '../../../actions/auth';

const AdminHeader = ({ classes }) => {
    const LogoLink = React.forwardRef((props, ref) => <NavLink activeClassName={classes.primaryLinkActive} exact to="/admin" {...ref} {...props} />);

    const dispatch = useDispatch();
    const LogoutFunc = () => dispatch(Logout());

    return (
        <header className={`container-fluid ${classes.wrapper}`}>
            <div className="row align-items-center" style={{ height: '100%' }}>
                <div className="col">
                    <img src={Logo} alt="" style={{ height: 48, paddingRight: 10, marginBottom: 10 }} />
                    <Typography variant="h1" style={{ fontSize: 20, fontWeight: 700, display: 'inline' }}>&gt; &nbsp;&nbsp;Demo App</Typography>
                </div>
                <div className="col text-center" style={{ height: '100%' }}>
                    <Button component={LogoLink} className={classes.primaryLink}>
                        Dashboard
                    </Button>
                </div>
                <div className="col text-right">
                    <button type="button" onClick={LogoutFunc} className={classes.primaryLink}>Log Out</button>
                </div>
            </div>
        </header>
    );
};

AdminHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(AdminHeader);

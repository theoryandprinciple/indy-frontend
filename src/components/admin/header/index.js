import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Logout } from '../../../routes/login/wiring/auth-api';
import Styles from './styles';


const AdminHeader = ({ classes }) => {
    const LogoLink = React.forwardRef((props, ref) => <NavLink activeClassName={classes.primaryLinkActive} to="/admin" {...ref} {...props} />);
    const FlowBuilderLink = React.forwardRef((props, ref) => <NavLink activeClassName={classes.primaryLinkActive} to="/admin/flow-builder" {...ref} {...props} />);


    return (
        <header className={classes.wrapper}>
            <Button component={LogoLink} className={classes.primaryLink}>
                Dashboard
            </Button>
            <Button component={FlowBuilderLink} className={classes.primaryLink}>
                Flow Builder
            </Button>

            <button type="button" onClick={Logout}>Log Out</button>
        </header>
    );
};

AdminHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(AdminHeader);

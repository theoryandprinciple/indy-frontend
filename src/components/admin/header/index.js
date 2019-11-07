import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

import { Logout } from '../../../actions/auth';
import Styles from './styles';

const AdminHeader = ({ classes }) => {
    const dispatch = useDispatch();
    const LogoLink = React.forwardRef((props, ref) => <NavLink activeClassName={classes.primaryLinkActive} to="/admin" {...ref} {...props} />);
    const FlowBuilderLink = React.forwardRef((props, ref) => <NavLink activeClassName={classes.primaryLinkActive} to="/admin/flow-builder" {...ref} {...props} />);
    const OutputBuilderLink = React.forwardRef((props, ref) => <NavLink activeClassName={classes.primaryLinkActive} to="/admin/output-builder" {...ref} {...props} />);

    const LogoutFunc = () => dispatch(Logout());

    return (
        <header className={`container-fluid ${classes.wrapper}`}>
            <div className="row" style={{ height: '100%' }}>
                <div className="col">Logo Here</div>
                <div className="col text-center">
                    <Button component={LogoLink} className={classes.primaryLink}>
                        Dashboard
                    </Button>
                    <Button component={FlowBuilderLink} className={classes.primaryLink}>
                        Flow Builder
                    </Button>
                    <Button component={OutputBuilderLink} className={classes.primaryLink}>
                        Output
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

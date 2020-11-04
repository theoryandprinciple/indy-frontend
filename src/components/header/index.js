import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { NavLink, useRouteMatch } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import LayoutStyles from '../../styles/layouts';
import Logo from './images/logo.png';

const Header = ({ classes }) => {
    const HomeLink = forwardRef((props, ref) => <NavLink exact to="/" {...ref} {...props} />);
    const PrivacyLink = forwardRef((props, ref) => <NavLink exact to="/privacy" {...ref} {...props} />);
    const privacyRoute = useRouteMatch('/privacy');

    return (
        <header className={`${classes.sectionWrapperPurple}`}>
            <div className="container" style={{ height: 70 }}>
                <div className="row align-items-center" style={{ height: '100%' }}>
                    <div className="col">
                        <Button component={HomeLink}>
                            <img src={Logo} alt="" style={{ height: 40 }} />
                        </Button>
                    </div>
                    <div className="col text-right">
                        {!privacyRoute && (
                            <Button component={PrivacyLink} style={{ color: 'white' }}>
                                Privacy Policy
                            </Button>
                        )}
                        {privacyRoute && (
                            <Button component={HomeLink} style={{ color: 'white' }}>
                                Back to Home
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(LayoutStyles)(Header);

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import LayoutStyles from '../../styles/layouts';
import Logo from './images/logo.png';

const Header = ({ classes }) => {
    const LogoLink = forwardRef((props, ref) => <NavLink activeClassName={classes.primaryLinkActive} exact to="/" {...ref} {...props} />);

    return (
        <header className={`${classes.sectionWrapperPurple}`}>
            <div className="container" style={{ height: 100 }}>
                <div className="row align-items-center" style={{ height: '100%' }}>
                    <div className="col">
                        <Button component={LogoLink} className={classes.primaryLink}>
                            <img src={Logo} alt="" style={{ height: 40, paddingRight: 10, marginBottom: 10 }} />
                        </Button>
                    </div>
                    <div className="col text-right" />
                </div>
            </div>
        </header>
    );
};

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(LayoutStyles)(Header);

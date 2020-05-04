import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import Styles from './styles';

const ErrorBoundry = ({ classes }) => {
    const history = useHistory();
    return (
        <main className={`container-fluid ${classes.wrapper}`}>
            <div className="row align-items-center" style={{ height: '100%' }}>
                <div className="col">
                    <Typography variant="h1">Ops, there was an error</Typography>

                    <Button onClick={() => history.push('/')}>
                        Reload Site
                    </Button>
                </div>
            </div>
        </main>
    );
};

ErrorBoundry.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(ErrorBoundry);

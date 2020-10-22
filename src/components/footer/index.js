import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Styles from './styles';

const currentYear = new Date().getFullYear();
const Footer = ({ classes }) => (
    <footer className="container mt-5 mb-5">
        <div className="row">
            <div className="col text-center">
                <Typography variant="body2">
                    &copy;
                    {currentYear}
                    &nbsp;Indy Eviction Help
                </Typography>
            </div>
        </div>
        <div className="row mt-3">
            <div className="col text-center">
                <Typography variant="body2">
                    While this tool will produce and submit the declaration in English, the National Low Income Housing Coalition has provided translations in a variety of languages.&nbsp;
                    <a href="https://nlihc.org/coronavirus-and-housing-homelessness/national-eviction-moratorium" target="_blank" rel="noopener noreferrer" className={classes.link}>
                        Find other languages here.
                    </a>
                </Typography>
            </div>
        </div>
    </footer>
);

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(Footer);

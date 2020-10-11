import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import LayoutStyles from '../../styles/layouts';

const Home = ({ classes }) => (
    <section className={`${classes.sectionWrapper} ${classes.sectionWrapperPurple} ${classes.sectionWrapperFullWidth}`}>
        <div className="container">
            <div className="row">
                <div className="col text-center">
                    <Typography component="h1" className={classes.title}>Are you facing an <span>eviction</span>? This tool can help.</Typography>
                    <Typography variant="body1">If you&apos;re having trouble keeping up with your rent payments, the Federal Government has issued an order that prevents landlords in the US from evicting many of their tenants until December 31, 2020. Use this tool to see if you are covered, and to produce the right letter (called a &quot;Declaration&quot;) to send to your landlord, as required by the order.</Typography>
                    <Button variant="contained" color="secondary">
                        Start Free Tool
                    </Button>
                </div>
            </div>
        </div>
    </section>
);

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(LayoutStyles)(Home);

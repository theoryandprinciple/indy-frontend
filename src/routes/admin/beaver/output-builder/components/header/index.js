import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Styles from './styles';

const SectionHeader = ({
    classes,
    title,
    save,
    cancel,
}) => (
    <section className={classes.wrapper}>
        <div className="container" style={{ height: '100%' }}>
            <div className="row align-items-center" style={{ height: '100%' }}>
                <div className="col align-items-center">
                    <Typography variant="h4">{title}</Typography>
                </div>
                <div className="col align-items-center text-right">
                    <button type="button" onClick={cancel}>Cancel</button>
                    <button type="button" onClick={save}>Save</button>
                </div>
            </div>
        </div>
    </section>
);

SectionHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    save: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};

export default withStyles(Styles)(SectionHeader);

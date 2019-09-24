import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import Styles from './styles';

const OutputBuilderCreateEmail = ({ classes, values, handleChange }) => (
    <div className="row">
        <div className={`col-9 ${classes.wrapper}`}>
            <TextField
                fullWidth
                placeholder="Type your subject here"
                className={classes.inputLabel}
                value={values.title}
                onChange={handleChange('title')}
            />
            <TextField
                fullWidth
                placeholder="Add the email address here"
                className={classes.inputLabel}
                value={values.emailAddress}
                onChange={handleChange('title')}
            />

            <TextField
                fullWidth
                placeholder="Add a description here..."
                multiline
                rows="4"
                className={classes.inputLabel}
                value={values.description}
                onChange={handleChange('description')}
            />
        </div>
        <div className={`col-3 ${classes.wrapper}`}>
            <p>settings</p>
        </div>
    </div>
);

OutputBuilderCreateEmail.propTypes = {
    classes: PropTypes.object.isRequired,
    values: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default withStyles(Styles)(OutputBuilderCreateEmail);

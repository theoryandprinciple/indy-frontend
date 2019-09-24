import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import Styles from './styles';

const OutputBuilderCreateContent = ({ classes, values, handleChange }) => (
    <div className={classes.wrapper}>
        <TextField
            fullWidth
            placeholder="Type your title here"
            className={classes.inputLabel}
            value={values.title}
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
);

OutputBuilderCreateContent.propTypes = {
    classes: PropTypes.object.isRequired,
    values: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default withStyles(Styles)(OutputBuilderCreateContent);

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Styles from './styles';

const QuestionTypeNumber = ({
    classes,
    handleUpdate,
    initialValues,
}) => {
    const [formValues, setFormValues] = useState('');

    const handleValidationUpdate = (key, value) => {
        // send validation updates to parent, where they will get blended with existing `settings` object
        handleUpdate(key, value);

        // update local state
        // setFormValues(key, value);
        // NOTE: we take local updates from `useEffect`, oppose to setting them here.
    };

    useEffect(() => {
        if (initialValues.numberType) {
            setFormValues(initialValues);
        }
    }, [initialValues]);

    return (
        <div>
            <div className="row">
                <div className="col">
                    <Select
                        className={classes.elementSelectMenu}
                        color="primary"
                        value={formValues.numberType || 'currency'}
                        onChange={event => handleValidationUpdate('numberType', event.target.value)}
                    >
                        <MenuItem value="currency">Currency</MenuItem>
                        <MenuItem value="phone">Phone</MenuItem>
                    </Select>
                </div>
            </div>
        </div>
    );
};

QuestionTypeNumber.propTypes = {
    classes: PropTypes.object.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
};

export default withStyles(Styles)(QuestionTypeNumber);

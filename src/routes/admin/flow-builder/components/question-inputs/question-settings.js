import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Styles from './styles';

const QuestionSettings = ({
    classes,
    handleUpdate,
    initialValues,
}) => {
    const [formValues, setFormValues] = useState([]);
    useEffect(() => {
        // populate internal state with data in useFlowDataContext,
        // this should only happen when API data comes in
        setFormValues(initialValues);
    }, [initialValues]);

    // if we do this, it causes an infinite loop, cause those changes want to come back down
    // useEffect(() => {// send updates to parent}, [formValues]);

    const handleFormUpdate = (key, value) => {
    //    console.log('key, value',key, value)

        // send parent to update
        // handleUpdate(temp);

        // update local state
        // setFormValues(temp);
    };
    if(formValues.validation){
        console.log('formValues', formValues.validation.required)
    }

    return (
        <div>
            <Typography variant="body2">Settings</Typography>
            <input onChange={handleFormUpdate('required', true)} name="required" type="checkbox" checked={formValues.validation && formValues.validation.required} />
            <Typography variant="body1" className={classes.inputLabel}>Reqiured</Typography>

            <Typography variant="body2">Advanced</Typography>
        </div>
    );
};

QuestionSettings.propTypes = {
    classes: PropTypes.object.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
};

export default withStyles(Styles)(QuestionSettings);

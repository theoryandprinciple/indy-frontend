import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

import Styles from './styles';

const QuestionTypeRadio = ({
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

    const handleValueChange = answerIndex => (event) => {
        const temp = [...formValues];
        // only update the value, so as not to override other params that may be attached to this object
        temp[answerIndex].value = event.target.value;

        // send parent to update
        handleUpdate(temp);

        // update local state
        setFormValues(temp);
    };

    const addElement = () => {
        const temp = [...formValues];
        temp.push({
            value: 'maybe',
        });

        // send parent to update
        handleUpdate(temp);

        // update local state
        setFormValues(temp);
    };

    const renderElement = (element, index) => (
        <div key={index}>
            <Checkbox disabled name="answer-set" value={element.value} />
            <TextField className={classes.inputLabel} value={element.value} onChange={handleValueChange(index)} />
        </div>
    );

    return (
        <div>
            {formValues && formValues.map((element, i) => renderElement(element, i))}
            <button type="button" onClick={addElement}>Add Answer</button>
        </div>
    );
};

QuestionTypeRadio.propTypes = {
    classes: PropTypes.object.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    initialValues: PropTypes.array.isRequired,
};

export default withStyles(Styles)(QuestionTypeRadio);

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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

    const renderElement = (element, index) => (
        <div key={index}>
            <input disabled name="answer-set" type="checkbox" value={element.value} />
            <Typography variant="body1" className={classes.inputLabel}>{element.value}</Typography>
        </div>
    );

    const addElement = () => {
        const temp = [...formValues];
        temp.push({
            id: temp.length + 1,
            value: 'maybe',
        });

        // send parent to update
        handleUpdate(temp);

        // update local state
        setFormValues(temp);
    };

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

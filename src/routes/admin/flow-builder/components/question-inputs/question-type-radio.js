import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import DuplicateIcon from '@material-ui/icons/AddToPhotos';
import AddIcon from '@material-ui/icons/AddCircle';
import Radio from '@material-ui/core/Radio';

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

    const handleContentUpdates = (type, answerIndex) => (event) => {
        const temp = [...formValues];
        // only update the value, so as not to override other params that may be attached to this object
        if (type === 'value') {
            temp[answerIndex].value = event.target.value;
        } else if (type === 'delete') { // 'delete' is a special type
            // delete stuff
            temp.splice(answerIndex, 1);
        } else if (type === 'duplicate') { // 'duplicate' is a special type
            // duplicate stuff (no mutation of original object)
            // need to replace id with null value, oppose to carrying it over
            const newAnswer = Object.assign({}, temp[answerIndex], { id: null });
            temp.push(newAnswer);
        }

        // send parent to update
        handleUpdate(temp);

        // update local state
        setFormValues(temp);
    };

    const addElement = () => {
        const temp = [...formValues];
        temp.push({
            value: 'New Answer',
        });

        // send parent to update
        handleUpdate(temp);

        // update local state
        setFormValues(temp);
    };

    const renderElement = (element, index) => (
        /*
            The radio element is really just a visual cue to the user, the important part of this element is the text TextField
            editing the text field updates the answer label that is presented in other areas of the app
        */
        <div key={index} className={`row ${classes.answerRow}`}>
            <div className="col">
                <Radio disabled name="answer-set" value={element.value} />
                <TextField className={classes.inputLabel} value={element.value} onChange={handleContentUpdates('value', index)} />
            </div>
            <div className={`col-auto ${classes.answerActions}`}>
                <button type="button" onClick={handleContentUpdates('duplicate', index)}><DuplicateIcon /></button>
                <button type="button" onClick={handleContentUpdates('delete', index)}><DeleteIcon /></button>
            </div>
        </div>
    );

    return (
        <div>
            {formValues && formValues.map((element, i) => renderElement(element, i))}
            <div className="row">
                <div className="col">
                    <button type="button" onClick={addElement} className={classes.addOptionBtn}>
                        <AddIcon color="primary" className={classes.addOptionIcon} />
                        Add option
                    </button>
                </div>
            </div>
        </div>
    );
};

QuestionTypeRadio.propTypes = {
    classes: PropTypes.object.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    initialValues: PropTypes.array.isRequired,
};

export default withStyles(Styles)(QuestionTypeRadio);

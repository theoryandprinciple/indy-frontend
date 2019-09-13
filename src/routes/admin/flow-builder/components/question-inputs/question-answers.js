import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import DuplicateIcon from '@material-ui/icons/AddToPhotos';
import AddIcon from '@material-ui/icons/AddCircle';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import useDebounce from '../../../../../utils/use-debounce';

import Styles from './styles';

const QuestionAnswers = ({
    classes,
    handleUpdate,
    initialValues,
    questionType,
}) => {
    const [formValues, setFormValues] = useState([]);
    const [initialBuildComplete, setInitialBuildComplete] = useState(false);
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

        // update local state
        setFormValues(temp);

        // without this flag, we find outselves in a infinite loop
        // likely because of a race condition with initialValues and formValues getting into the debouncedFormValues
        setInitialBuildComplete(true);
    };

    const debouncedFormValues = useDebounce(formValues, 500);
    useEffect(() => {
        // Make sure we have a value (user has entered something in input)
        // Make sure the length is greater than 0, if it's 0 then it's the intial value
        if (debouncedFormValues && formValues.length > 0 && initialBuildComplete) {
            // send parent to update
            handleUpdate(formValues);
        }
    },
    // This is the useEffect input array
    // Our useEffect function will only execute if this value changes ...
    // ... and thanks to our hook it will only change if the original ...
    // value (formValues) hasn't changed for more than 500ms.
    [debouncedFormValues]);

    const addElement = () => {
        const temp = [...formValues];
        temp.push({
            value: '',
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
                {questionType === 'radio'
                    && <Radio disabled name="answer-set" value={element.value} />
                }
                {questionType === 'checkbox'
                    && <Checkbox disabled name="answer-set" value={element.value} />
                }
                <TextField
                    placeholder="Answer Label..."
                    className={classes.inputLabel}
                    value={element.value}
                    onChange={handleContentUpdates('value', index)}
                />
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

QuestionAnswers.propTypes = {
    classes: PropTypes.object.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    initialValues: PropTypes.array.isRequired,
    questionType: PropTypes.string.isRequired,
};

export default withStyles(Styles)(QuestionAnswers);

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const QuestionTypeRadio = ({
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
            <input disabled name="answer-set" type="radio" value={element.value} />
            {element.value}
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
            <button type="button" onClick={addElement}>Add Answer</button>
            {formValues && formValues.map((element, i) => renderElement(element, i))}
        </div>
    );
};

QuestionTypeRadio.propTypes = {
    handleUpdate: PropTypes.func.isRequired,
    initialValues: PropTypes.array.isRequired,
};
export default QuestionTypeRadio;

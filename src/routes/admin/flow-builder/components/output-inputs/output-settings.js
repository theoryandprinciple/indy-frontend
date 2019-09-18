import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import update from 'immutability-helper';

import ConditionalLogicBuilder from '../question-inputs/conditional-logic-builder';

import Styles from './styles';

const QuestionSettings = ({
    classes,
    handleUpdate,
    initialValues,
}) => {
    const [formValues, setFormValues] = useState({});

    useEffect(() => {
        // populate internal state with data in useFlowDataContext,
        // this should only happen when API data comes in
        setFormValues(initialValues);
    }, [initialValues]);

    // if we do this, it causes an infinite loop, cause those changes want to come back down
    // useEffect(() => {// send updates to parent}, [formValues]);

    const handleAdvancedUpdate = (key, value) => {
        const temp = { ...formValues, advanced: { ...formValues.advanced, [key]: value } };
        // send parent to update
        handleUpdate(temp);

        // update local state
        setFormValues(temp);
    };
    const handleAdvancedConditionalLogicUpdate = (key, value, conditionalIndex = null) => {
        let temp;
        if (conditionalIndex !== null) {
            temp = update(formValues, { advanced: { conditionalLogic: { conditions: { [conditionalIndex]: { [key]: { $set: value } } } } } });
        } else {
            temp = {
                ...formValues,
                advanced: {
                    ...formValues.advanced,
                    conditionalLogic: {
                        ...formValues.advanced.conditionalLogic,
                        [key]: value,
                    },
                },
            };
        }

        // send parent to update
        handleUpdate(temp);

        // update local state
        setFormValues(temp);
    };

    const addAnotherCondition = () => {
        const emptyCondition = {};
        const temp = update(formValues, { advanced: { conditionalLogic: { conditions: { $push: [emptyCondition] } } } });

        // send parent to update
        handleUpdate(temp);

        // update local state
        setFormValues(temp);
    };
    const deleteCondition = (index) => {
        const temp = update(formValues, { advanced: { conditionalLogic: { conditions: { $splice: [[index, 1]] } } } });

        // send parent to update
        handleUpdate(temp);

        // update local state
        setFormValues(temp);
    };

    return (
        <div>
            <div>
                <Typography variant="body2">Advanced</Typography>
            </div>

            <div>
                <Checkbox
                    color="primary"
                    checked={formValues.advanced ? formValues.advanced.enableConditionalLogic : false}
                    onClick={() => handleAdvancedUpdate('enableConditionalLogic', !formValues.advanced.enableConditionalLogic)}
                />
                <Typography variant="body1" className={classes.inputLabel}>Enable Conditional Logic</Typography>
                <ConditionalLogicBuilder
                    initialValues={initialValues}
                    addAnotherCondition={addAnotherCondition}
                    deleteCondition={deleteCondition}
                    handleAdvancedConditionalLogicUpdate={handleAdvancedConditionalLogicUpdate}
                />
            </div>

        </div>
    );
};

QuestionSettings.propTypes = {
    classes: PropTypes.object.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
};

export default withStyles(Styles)(QuestionSettings);

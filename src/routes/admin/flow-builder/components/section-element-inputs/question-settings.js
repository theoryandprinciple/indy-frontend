import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import update from 'immutability-helper';

import QuestionTypes from '../../wiring/question-types';
import QuestionNumber from './question-type-number';

import ConditionalLogicBuilder from './conditional-logic-builder';

import { useFlowDataContext } from '../../wiring/flow-provider';

import Styles from './styles';

const QuestionSettings = ({
    classes,
    inputType,
    handleUpdate,
    initialValues,
}) => {
    const { localFlowData } = useFlowDataContext();
    const [flowQuestions, setFlowQuestions] = useState({});
    const [formValues, setFormValues] = useState({});

    useEffect(() => {
        // use local form data to create a list of questions within the current flow
        const questionArray = [];
        for (let i = 0; i < localFlowData.sections.length; i += 1) {
            for (let q = 0; q < localFlowData.sections[i].contents.length; q += 1) {
                if (localFlowData.sections[i].contents[q].type === 'question') {
                    questionArray.push(localFlowData.sections[i].contents[q]);
                }
            }
        }

        setFlowQuestions(questionArray);
    }, [localFlowData]);

    useEffect(() => {
        // populate internal state with data in useFlowDataContext,
        // this should only happen when API data comes in
        setFormValues(initialValues);
    }, [initialValues]);

    // if we do this, it causes an infinite loop, cause those changes want to come back down
    // useEffect(() => {// send updates to parent}, [formValues]);

    const handleValidationUpdate = (key, value) => {
        const temp = { ...formValues, validation: { ...formValues.validation, [key]: value } };
        // send parent to update
        handleUpdate(temp);

        // update local state
        setFormValues(temp);
    };
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
    const handleRootLevelUpdate = (key, value) => {
        const temp = { ...formValues, [key]: value };
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
            {inputType === QuestionTypes.NUMBER && (
                <QuestionNumber handleUpdate={handleValidationUpdate} initialValues={formValues.validation || {}} />
            )}
            <Typography variant="body2">Settings</Typography>
            <div>
                <Checkbox
                    color="primary"
                    checked={formValues.validation ? formValues.validation.required : false}
                    onClick={() => handleValidationUpdate('required', !formValues.validation.required)}
                />
                <Typography variant="body1" className={classes.inputLabel}>Required</Typography>
            </div>

            <div>
                <Checkbox
                    color="primary"
                    checked={formValues.enableDescription || false}
                    onClick={() => handleRootLevelUpdate('enableDescription', !formValues.enableDescription)}
                />
                <Typography variant="body1" className={classes.inputLabel}>Enable Description</Typography>
            </div>

            {/* REMOVE FOR MVP
            <div>
                <Checkbox
                    color="primary"
                    checked={formValues.enableVariableName || false}
                    onClick={() => handleRootLevelUpdate('enableVariableName', !formValues.enableVariableName)}
                />
                <Typography variant="body1" className={classes.inputLabel}>Enable Varible Name</Typography>
                {formValues.enableVariableName && (
                    <div>
                        <TextField className={classes.inputLabel} value={formValues.variableName} onChange={event => handleRootLevelUpdate('variableName', event.target.value)} />
                    </div>
                )}
            </div>
            */}

            <div>
                <Typography variant="body2">Advanced</Typography>
                {/* REMOVE FOR MVP
                    <Checkbox
                        color="primary"
                        checked={formValues.advanced ? formValues.advanced.populateDynamically : false}
                        onClick={() => handleAdvancedUpdate('populateDynamically', !formValues.advanced.populateDynamically)}
                    />
                    <Typography variant="body1" className={classes.inputLabel}>Allow field to be populated dynamically</Typography>
                */}
            </div>

            <div>
                <Checkbox
                    color="primary"
                    checked={formValues.advanced ? formValues.advanced.enableConditionalLogic : false}
                    onClick={() => handleAdvancedUpdate('enableConditionalLogic', !formValues.advanced.enableConditionalLogic)}
                />
                <Typography variant="body1" className={classes.inputLabel}>Enable Conditional Logic</Typography>
                <ConditionalLogicBuilder
                    initialValues={formValues}
                    addAnotherCondition={addAnotherCondition}
                    deleteCondition={deleteCondition}
                    handleAdvancedConditionalLogicUpdate={handleAdvancedConditionalLogicUpdate}
                />
            </div>

            {/* REMOVE FOR MVP
            <div>
                <Checkbox
                    color="primary"
                    checked={formValues.advanced ? formValues.advanced.enableCalculation : false}
                    onClick={() => handleAdvancedUpdate('enableCalculation', !formValues.advanced.enableCalculation)}
                />
                <Typography variant="body1" className={classes.inputLabel}>Enable Calculation</Typography>
            </div>
            */}

        </div>
    );
};

QuestionSettings.propTypes = {
    classes: PropTypes.object.isRequired,
    inputType: PropTypes.string.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
};

export default withStyles(Styles)(QuestionSettings);

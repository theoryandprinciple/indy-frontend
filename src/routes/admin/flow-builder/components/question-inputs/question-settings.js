import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { find } from 'lodash';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';

import update from 'immutability-helper';

import { useFlowDataContext } from '../../wiring/flow-provider';

import Styles from './styles';

const QuestionSettings = ({
    classes,
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
            <Typography variant="body2">Settings</Typography>
            <div>
                <Checkbox
                    color="primary"
                    checked={formValues.validation ? formValues.validation.required : false}
                    onClick={() => handleValidationUpdate('required', !formValues.validation.required)}
                />
                <Typography variant="body1" className={classes.inputLabel}>Reqiured</Typography>
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
                {(formValues.advanced && formValues.advanced.enableConditionalLogic) && (
                    <div>
                        <div>
                            <Select
                                className={classes.elementSelectMenu}
                                color="primary"
                                value={formValues.advanced.conditionalLogic.visiblity || 'show'}
                                onChange={event => handleAdvancedConditionalLogicUpdate('visiblity', event.target.value)}
                            >
                                <MenuItem value="show">Show</MenuItem>
                                <MenuItem value="hide">Hide</MenuItem>
                            </Select>
                            <Typography variant="body1" style={{ display: 'inline' }}>this field if</Typography>
                            <Select
                                style={{ marginLeft: 15 }}
                                className={classes.elementSelectMenu}
                                color="primary"
                                value={formValues.advanced.conditionalLogic.visiblityCondition || 'all'}
                                onChange={event => handleAdvancedConditionalLogicUpdate('visiblityCondition', event.target.value)}
                            >
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="some">Some</MenuItem>
                                <MenuItem value="none">None</MenuItem>
                            </Select>
                            <Typography variant="body1" style={{ display: 'inline' }}>of the following match:</Typography>
                        </div>
                        <div>
                            {formValues.advanced && formValues.advanced.conditionalLogic.conditions.map((logicBlock, i) => {
                                const selectedQuestion = find(flowQuestions, ['id', logicBlock.questionId]);

                                // only show `AddAnother` to the last condition in the list
                                let AddAnother;
                                if ((i + 1) === formValues.advanced.conditionalLogic.conditions.length || formValues.advanced.conditionalLogic.conditions.length === 0) {
                                    AddAnother = <button type="button" onClick={addAnotherCondition}><AddIcon /></button>;
                                }
                                return (
                                    <div key={`logicBlock-${i}`} className={classes.settingsConditionSet}>
                                        <Select
                                            className={classes.elementSelectMenu}
                                            color="primary"
                                            value={logicBlock.questionId || '1'}
                                            onChange={event => handleAdvancedConditionalLogicUpdate('questionId', event.target.value, i)}
                                        >
                                            {flowQuestions.map((question, q) => (
                                                <MenuItem
                                                    key={`${question.title}-${q}`}
                                                    value={question.id}
                                                >
                                                    {question.title}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <Select
                                            style={{ marginLeft: 15 }}
                                            className={classes.elementSelectMenu}
                                            color="primary"
                                            value={logicBlock.condition || 'is'}
                                            onChange={event => handleAdvancedConditionalLogicUpdate('condition', event.target.value, i)}
                                        >
                                            <MenuItem value="is">Is</MenuItem>
                                            <MenuItem value="is not">Is Not</MenuItem>
                                        </Select>
                                        <Select
                                            className={classes.elementSelectMenu}
                                            color="primary"
                                            value={logicBlock.answer || ''}
                                            onChange={event => handleAdvancedConditionalLogicUpdate('answer', event.target.value, i)}
                                        >
                                            {(logicBlock.questionId && selectedQuestion) && selectedQuestion.answers.map(answer => (
                                                <MenuItem
                                                    key={answer.value}
                                                    value={answer.value}
                                                >
                                                    {answer.value}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {AddAnother}
                                        <button className={classes.settingsConditionSetDelete} type="button" onClick={() => deleteCondition(i)}><DeleteIcon /></button>
                                    </div>
                                );
                            })}
                            {formValues.advanced && formValues.advanced.conditionalLogic.conditions.length === 0 && (
                                <button type="button" onClick={addAnotherCondition}><AddIcon /></button>
                            )}
                        </div>
                    </div>
                )}
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
    handleUpdate: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
};

export default withStyles(Styles)(QuestionSettings);

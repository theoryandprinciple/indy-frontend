import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { useFlowDataContext } from '../../wiring/flow-provider';

import Styles from './styles';

const QuestionSettings = ({
    classes,
    handleUpdate,
    initialValues,
}) => {
    const { localFlowData } = useFlowDataContext();
    const [flowQuestions, setFlowQuestions] = useState({});
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

    const [formValues, setFormValues] = useState({});
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
    const handleAdvancedConditionalLogicUpdate = (key, value) => {
        const temp = { ...formValues, advanced: { ...formValues.advanced, conditionalLogic: { ...formValues.advanced.conditionalLogic, [key]: value } } };
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
                {formValues.enableDescription && (
                    <div>
                        <TextField
                            fullWidth
                            multiline
                            rowsMax="4"
                            className={classes.inputLabel}
                            value={formValues.description}
                            onChange={event => handleRootLevelUpdate('description', event.target.value)}
                        />
                    </div>
                )}
            </div>

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

            <div>
                <Typography variant="body2">Advanced</Typography>
                <Checkbox
                    color="primary"
                    checked={formValues.advanced ? formValues.advanced.populateDynamically : false}
                    onClick={() => handleAdvancedUpdate('populateDynamically', !formValues.advanced.populateDynamically)}
                />
                <Typography variant="body1" className={classes.inputLabel}>Allow field to be populated dynamically</Typography>
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
                            {formValues.advanced && formValues.advanced.conditionalLogic.conditions.map((logicBlock, i) => (
                                <Select
                                    key={`logicBlock-${i}`}
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
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div>
                <Checkbox
                    color="primary"
                    checked={formValues.advanced ? formValues.advanced.enableCalculation : false}
                    onClick={() => handleAdvancedUpdate('enableCalculation', !formValues.advanced.enableCalculation)}
                />
                <Typography variant="body1" className={classes.inputLabel}>Enable Calculation</Typography>
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

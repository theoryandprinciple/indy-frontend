import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/AddCircle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { find } from 'lodash';

import { useFlowDataContext } from '../../../wiring/flow-provider';
import Styles from './styles';

const ConditionalLogicBuilder = ({
    classes,
    handleAdvancedConditionalLogicUpdate,
    deleteCondition,
    addAnotherCondition,
    initialValues,
}) => {
    const { localFlowData } = useFlowDataContext();
    const [flowQuestions, setFlowQuestions] = useState([]);

    useEffect(() => {
        // use local form data to create a list of questions within the current flow
        const questionArray = [];
        for (let i = 0; i < localFlowData.sections.length; i += 1) {
            if (!localFlowData.sections[i].contents) {
                // this is a new (or empty) section, so no contents to explore
                break;
            }
            for (let q = 0; q < localFlowData.sections[i].contents.length; q += 1) {
                if (localFlowData.sections[i].contents[q].type === 'question') {
                    questionArray.push(localFlowData.sections[i].contents[q]);
                }
            }
        }

        setFlowQuestions(questionArray);
    }, [localFlowData]);
console.log('conditional logic builder')
    return (
        <>
            {(initialValues.advanced && initialValues.advanced.enableConditionalLogic) && (
                <div>
                    <div>
                        <Select
                            className={classes.elementSelectMenu}
                            color="primary"
                            value={initialValues.advanced.conditionalLogic.visiblity || 'show'}
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
                            value={initialValues.advanced.conditionalLogic.visiblityCondition || 'all'}
                            onChange={event => handleAdvancedConditionalLogicUpdate('visiblityCondition', event.target.value)}
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="some">Some</MenuItem>
                            <MenuItem value="none">None</MenuItem>
                        </Select>
                        <Typography variant="body1" style={{ display: 'inline' }}>of the following match:</Typography>
                    </div>
                    <div>
                        {initialValues.advanced && initialValues.advanced.conditionalLogic.conditions.map((logicBlock, i) => {
                            const selectedQuestion = find(flowQuestions, ['id', logicBlock.questionId]);

                            // only show `AddAnother` to the last condition in the list
                            let AddAnother;
                            if ((i + 1) === initialValues.advanced.conditionalLogic.conditions.length || initialValues.advanced.conditionalLogic.conditions.length === 0) {
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
                        {initialValues.advanced && initialValues.advanced.conditionalLogic.conditions.length === 0 && (
                            <button type="button" onClick={addAnotherCondition}><AddIcon /></button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

ConditionalLogicBuilder.propTypes = {
    classes: PropTypes.object.isRequired,
    deleteCondition: PropTypes.func.isRequired,
    addAnotherCondition: PropTypes.func.isRequired,
    handleAdvancedConditionalLogicUpdate: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
};
export default withStyles(Styles)(ConditionalLogicBuilder);

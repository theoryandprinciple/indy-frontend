/* eslint quote-props: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { withStyles } from '@material-ui/core/styles';

import Output from './components/starter-elements/element-output';
import Question from './components/starter-elements/element-question';
import Section from './components/starter-elements/element-section';
import SectionWrapper from './components/builder-components/section-wrapper';
import { useFlowDataContext } from './wiring/flow-provider';
import Header from './components/header';
import QuestionTypes from './wiring/question-types';
import OutputTypes from './wiring/output-types';

import Styles from './styles';

const Flow = ({ classes }) => {
    const { remoteFlowData } = useFlowDataContext();

    return (
        <>
            <Header />
            <div className={`container ${classes.wrapper}`}>
                <DndProvider backend={HTML5Backend}>
                    <div className="row">
                        <div className="col-auto">
                            <div className="row">
                                <div className="col">
                                    <h5>SECTION BREAK</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <Section text="New Section" />
                                </div>
                                <div className="col-6" />
                            </div>

                            <div className="row">
                                <div className="col">
                                    <h5>QUESTION FIELDS</h5>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <Question text="Radio Buttons" questionType={QuestionTypes.RADIO} />
                                    <Question text="Checkboxes" questionType={QuestionTypes.CHECKBOX} />
                                    <Question text="Short Text" questionType={QuestionTypes.SHORT_TEXT} />
                                </div>
                                <div className="col-6">
                                    <Question text="Long Text" questionType={QuestionTypes.LONG_TEXT} />
                                    <Question text="Number" questionType={QuestionTypes.NUMBER} />
                                    {/* REMOVED FOR MVP
                                    <Question text="Date" questionType={QuestionTypes.DATE} />
                                    <Question text="File Uploader" questionType={QuestionTypes.FILE_UPLOAD} />
                                    <Question text="Jurisdiction" questionType={QuestionTypes.JURISDICTION} />
                                    <Question text="Legal Disclaimer" questionType={QuestionTypes.LEGAL_DISCLAIMER} />
                                    */}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <h5>OUTPUT</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <Output text="Email Generation" questionType={OutputTypes.EMAIL} />
                                </div>
                                <div className="col-6">
                                    <Output text="Content" questionType={OutputTypes.CONTENT} />
                                </div>
                            </div>

                        </div>
                        <div className="col">
                            <SectionWrapper data={remoteFlowData.sections} />
                        </div>
                    </div>
                </DndProvider>
            </div>
        </>
    );
};

Flow.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(Flow);

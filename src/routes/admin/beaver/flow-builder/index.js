import React from 'react';
import PropTypes from 'prop-types';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { withStyles } from '@material-ui/core/styles';

import Output from './components/starter-elements/element-output';
import Question from './components/starter-elements/element-question';
import Section from './components/starter-elements/element-section';
import SectionWrapper from './components/builder-components/section-wrapper';
import Header from './components/header';
import QuestionTypes from './wiring/question-types';
import OutputTypes from './wiring/output-types';

import Styles from './styles';

const Flow = ({ classes }) => (
    <>
        <Header />
        <div className={`container ${classes.wrapper}`}>
            <DndProvider backend={HTML5Backend}>
                <div className="row">
                    <div className="col-auto">
                        <div style={{ position: 'sticky', top: 0 }}>
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
                                    <Question text="Radio Buttons" inputType={QuestionTypes.RADIO} />
                                    <Question text="Checkboxes" inputType={QuestionTypes.CHECKBOX} />
                                    <Question text="Short Text" inputType={QuestionTypes.SHORT_TEXT} />
                                </div>
                                <div className="col-6">
                                    <Question text="Long Text" inputType={QuestionTypes.LONG_TEXT} />
                                    <Question text="Number" inputType={QuestionTypes.NUMBER} />
                                    {/* REMOVED FOR MVP
                                    <Question text="Date" inputType={QuestionTypes.DATE} />
                                    <Question text="File Uploader" inputType={QuestionTypes.FILE_UPLOAD} />
                                    <Question text="Jurisdiction" inputType={QuestionTypes.JURISDICTION} />
                                    <Question text="Legal Disclaimer" inputType={QuestionTypes.LEGAL_DISCLAIMER} />
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
                                    <Output text="Email Generation" inputType={OutputTypes.EMAIL} />
                                </div>
                                <div className="col-6">
                                    <Output text="Content" inputType={OutputTypes.CONTENT} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <SectionWrapper />
                    </div>
                </div>
            </DndProvider>
        </div>
    </>
);

Flow.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(Flow);

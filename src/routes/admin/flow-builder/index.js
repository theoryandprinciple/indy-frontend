/* eslint quote-props: 0 */
import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Question from './components/starter-elements/element-question';
import Section from './components/starter-elements/element-section';
import SectionWrapper from './components/builder-components/section-wrapper';
import { useFlowDataContext } from './wiring/flow-provider';
import Header from './components/header';
import QuestionTypes from './wiring/question-types';

const Flow = () => {
    const { remoteFlowData } = useFlowDataContext();

    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <Header />
                <div className="row">
                    <div className="col-auto">
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
                                <Question text="Long Text" questionType={QuestionTypes.LONG_TEXT} />
                                <Question text="Number" questionType={QuestionTypes.NUMBER} />
                            </div>
                            <div className="col-6">
                                <Question text="Date" questionType={QuestionTypes.DATE} />
                                <Question text="File Uploader" questionType={QuestionTypes.FILE_UPLOAD} />
                                <Question text="Jurisdiction" questionType={QuestionTypes.JURISDICTION} />
                                <Question text="Legal Disclaimer" questionType={QuestionTypes.LEGAL_DISCLAIMER} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6">
                                <Section text="Default Section Header" />
                            </div>
                            <div className="col-6">
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <SectionWrapper data={remoteFlowData.sections} />
                    </div>
                </div>
            </DndProvider>
        </div>
    );
};

export default Flow;

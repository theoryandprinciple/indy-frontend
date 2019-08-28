/* eslint quote-props: 0 */
import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Question from './components/element-question';
import Section from './components/element-section';
import SectionWrapper from './components/section-wrapper';

const SampleFlowData = {
    'id': 0,
    'title': 'flow title',
    'sections': [
        {
            'title': 'section title',
            'id': 0,
            'index': 0,
            'contents': [{
                'title': 'Title of question',
                'id': 0,
                'index': 0,
                'type': 'question',
                'questionType': 'Radio Question',
                'validation': {
                    'required': false,
                    'email': true,
                },
                'answers': [{
                    'id': 0,
                    'value': 'yes',
                }, {
                    'id': 1,
                    'value': 'no',
                }],
                'variableName': 'donuts',
                'showDescription': true,
                'descrition': 'this is my long description',
            },
            {
                'title': 'Are Dogs Cool?',
                'id': 1,
                'index': 1,
                'type': 'question',
                'questionType': 'Checkbox Question',
                'validation': {
                    'required': false,
                    'email': true,
                },
                'answers': [{
                    'id': 0,
                    'value': 'yes',
                }, {
                    'id': 1,
                    'value': 'no',
                }],
                'variableName': 'pizza',
                'showDescription': true,
                'descrition': 'this is my long description',
            }],
        },
        {
            'title': 'section title 2',
            'id': 1,
            'index': 2,
            'contents': [{
                'title': 'question 1 title',
                'id': 0,
                'index': 0,
                'type': 'question',
                'questionType': 'Radio Question',
                'validation': {
                    'required': false,
                    'email': true,
                },
                'answers': [{
                    'id': 0,
                    'value': 'yes',
                }, {
                    'id': 1,
                    'value': 'no',
                }],
                'variableName': 'donuts',
                'showDescription': true,
                'descrition': 'this is my long description',
            },
            {
                'title': 'question 2 title',
                'id': 1,
                'index': 1,
                'type': 'question',
                'questionType': 'Checkbox Question',
                'validation': {
                    'required': false,
                    'email': true,
                },
                'answers': [{
                    'id': 0,
                    'value': 'yes',
                }, {
                    'id': 1,
                    'value': 'no',
                }],
                'variableName': 'pizza',
                'showDescription': true,
                'descrition': 'this is my long description',
            }],
        },
    ],
};

const Flow = () => {
    const save = () => {
        // do something
    };
    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <h1>Basic Home Page</h1>
                <button type="button" onClick={save}>Save</button>
                <div>
                    <div style={{ display: 'inline-block', width: '49%', verticalAlign: 'top' }}>
                        <Question text="Radio Question" />
                        <Question text="Checkbox Question" />
                        <Section text="Default Section Header" />
                    </div>
                    <div style={{ display: 'inline-block', width: '49%' }}>
                        <SectionWrapper data={SampleFlowData.sections} />
                        {/* Demo reodering: https://react-dnd.github.io/react-dnd/examples/sortable/simple */}
                    </div>
                </div>
            </DndProvider>
        </div>
    );
};

export default Flow;

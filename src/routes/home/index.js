/* eslint quote-props: 0 */
import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Question from './components/element-question';
import Section from './components/element-section';
import SectionWrapper from './components/section-wrapper';
import { useFlowDataContext } from '../../utils/flow-provider';

const Flow = () => {
    const { remoteFlowData } = useFlowDataContext();

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
                        <SectionWrapper data={remoteFlowData.sections} />
                    </div>
                </div>
            </DndProvider>
        </div>
    );
};

export default Flow;

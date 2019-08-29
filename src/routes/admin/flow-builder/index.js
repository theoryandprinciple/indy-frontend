/* eslint quote-props: 0 */
import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Question from './components/starter-elements/element-question';
import Section from './components/starter-elements/element-section';
import SectionWrapper from './components/builder-components/section-wrapper';
import { useFlowDataContext } from './wiring/flow-provider';
import Header from './components/header';

const Flow = () => {
    const { remoteFlowData } = useFlowDataContext();

    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <h1>Basic Home Page</h1>
                <Header />
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

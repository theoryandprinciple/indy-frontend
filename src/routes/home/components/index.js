import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Question from './question';
import Section from './section';

const Admin = () => (
    <div>
        <DndProvider backend={HTML5Backend}>
            <h1>Basic Home Page</h1>
            <div style={{ display: 'inline-block', width: '49%' }}>
                <Question />
            </div>
            <div style={{ display: 'inline-block', width: '49%' }}>
                <Section />
                {/* Demo reodering: https://react-dnd.github.io/react-dnd/examples/sortable/simple */}
            </div>
        </DndProvider>
    </div>
);

export default Admin;

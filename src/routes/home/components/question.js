import React from 'react';
import { useDrag } from 'react-dnd';
import ElementTypes from './element-types';

const handleWrapperStyle = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    width: '20rem',
};
const handleStyle = {
    backgroundColor: 'green',
    width: '1rem',
    height: '1rem',
    display: 'inline-block',
    marginRight: '0.75rem',
    cursor: 'move',
};

const BoxWithHandle = () => {
    const [{ opacity }, drag, preview] = useDrag({
        item: { type: ElementTypes.QUESTION },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    });
    return (
        <div ref={preview} style={{ ...handleWrapperStyle, opacity }}>
            <div ref={drag} style={handleStyle} />
      NICHOLE IS A WEIRDO
        </div>
    );
};

export default BoxWithHandle;

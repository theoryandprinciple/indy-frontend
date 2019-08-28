import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import ElementTypes from './element-types';
import Section from './section';

const sectionStyle = {
    height: '100%',
    width: '100%',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
};

const SectionWrapper = ({ data }) => {
    const [sections, setSections] = useState([]);

    useEffect(() => {
        // populate internal state with external props
        setSections(data);
    }, [data]);

    // the return value currently has no value
    const onDrop = (item) => {
        // -1 is assigned as an id in element-section.js
        if (item.type === 'section' && item.id === -1) {
            setSections(
                update(sections, {
                    $push: [{ id: sections.length + 1 }],
                }),
            );
        }

        return { name: 'Section-Wrapper' };
    };
    const moveSection = useCallback(
        (dragIndex, hoverIndex) => {
            const dragSection = sections[dragIndex];
            setSections(
                update(sections, {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragSection]],
                }),
            );
        },
        [sections],
    );
    const renderElement = (section, index) => (
        <Section
            key={section.id}
            index={index}
            id={section.id}
            moveSection={moveSection}
            sectionTitle={section.title}
            initialContent={section.contents}
        />
    );

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: [ElementTypes.SECTION],
        drop: (item, monitor) => (onDrop(item, monitor)),
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });
    const isActive = canDrop && isOver;
    let backgroundColor = 'blue';
    if (isActive) {
        backgroundColor = 'yellow';
    } else if (canDrop) {
        backgroundColor = 'pink';
    }

    return (
        <div ref={drop} style={{ ...sectionStyle, backgroundColor }}>
            {isActive ? 'Release to drop' : 'Drag a box here'}
            <div style={{ width: 400 }}>{sections.map((section, i) => renderElement(section, i))}</div>
        </div>
    );
};
SectionWrapper.defaultProps = {
    data: [],
};
SectionWrapper.propTypes = {
    data: PropTypes.array,
};

export default SectionWrapper;

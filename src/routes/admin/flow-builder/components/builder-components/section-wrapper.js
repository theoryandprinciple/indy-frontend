import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { cloneDeep } from 'lodash';
import ElementTypes from '../starter-elements/element-types';
import Section from './section';
import { useFlowDataContext } from '../../wiring/flow-provider';

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
    const { localFlowData, updateLocalFlowData } = useFlowDataContext();

    useEffect(() => {
        // populate internal state with data in useFlowDataContext
        // this will either be from our API or local state, depending on when data is coming down
        setSections(data);
    }, [data]);

    const onDrop = (item) => {
        // -1 is assigned as an id in element-section.js
        if (item.type === 'section' && item.id === -1) {
            setSections(
                update(sections, {
                    $push: [{ ...item, id: sections.length + 1 }],
                }),
            );
        }

        return { name: 'Section-Wrapper' }; // the return value currently has no value
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

    const handleCardUpdates = (sectionIndex, updatedCards) => {
        // go into affected section, and replace cards
        const tempFlowData = cloneDeep(localFlowData);
        const tempSections = cloneDeep(sections);
        tempFlowData.sections = tempSections;
        tempFlowData.sections[sectionIndex].contents = updatedCards;
        updateLocalFlowData(tempFlowData);
    };
    const handleSectionUpdates = () => {
        // just replace sections
        const tempFlowData = cloneDeep(localFlowData);
        const tempSections = cloneDeep(sections);
        tempFlowData.sections = tempSections;
        updateLocalFlowData(tempFlowData);
    };
    useEffect(() => {
        handleSectionUpdates();
    }, [sections]);

    const renderElement = (section, index) => (
        <Section
            key={section.id}
            index={index}
            id={section.id}
            moveSection={moveSection}
            sectionTitle={section.title}
            initialContent={section.contents}
            handleCardUpdates={handleCardUpdates}
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

SectionWrapper.propTypes = {
    data: PropTypes.array.isRequired,
};

export default SectionWrapper;

import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { cloneDeep } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import ElementTypes from '../../wiring/element-types';
import Section from './section';
import { useFlowDataContext } from '../../wiring/flow-provider';
import Styles from './styles';
import IdGenerator from '../../wiring/unique-id-generator';

const SectionWrapper = ({ data, classes }) => {
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
                    $push: [{ ...item, id: IdGenerator }],
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

    const handleSectionElementUpdates = (sectionIndex, updatedSectionElements) => {
        // go into affected section, and replace cards
        const tempFlowData = cloneDeep(localFlowData);

        // TODO: can we avoid cloning all of sections, and just clone the section we are updating
        const tempSections = cloneDeep(sections);
        tempFlowData.sections = tempSections;
        tempFlowData.sections[sectionIndex].contents = updatedSectionElements;
        updateLocalFlowData(tempFlowData);
    };
    const handleSectionUpdates = () => {
        // just replace sections, not root level params
        const tempFlowData = cloneDeep(localFlowData);
        const tempSections = cloneDeep(sections);
        tempFlowData.sections = tempSections;
        updateLocalFlowData(tempFlowData);
    };

    const handleSectionTitleUpdate = (sectionIndex, titleValue) => {
        const tempFlowData = cloneDeep(localFlowData);
        tempFlowData.sections[sectionIndex].title = titleValue;
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
            handleSectionElementUpdates={handleSectionElementUpdates}
            handleSectionTitleUpdate={handleSectionTitleUpdate}
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
    let border = 'none';
    if (isActive) {
        border = 'dashed 1px grey';
    } else if (canDrop) {
        border = 'dashed 1px black';
    }

    return (
        <div ref={drop} style={{ border }} className={classes.sectionWrapperWrapper}>
            {isActive ? `${sections.length === 0 ? 'Release to drop' : ''}` : `${sections.length === 0 ? 'Start the party' : ''}`}
            <div>{sections.map((section, i) => renderElement(section, i))}</div>
        </div>
    );
};

SectionWrapper.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
};

export default withStyles(Styles)(SectionWrapper);

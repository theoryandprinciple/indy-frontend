import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import DeleteIcon from '@material-ui/icons/Delete';
import DuplicateIcon from '@material-ui/icons/AddToPhotos';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import ElementTypes from '../../wiring/element-types';
import OutputTypes from '../../wiring/output-types';
import IconList from '../../wiring/icon-list';

import Styles from './styles';

import OutputSettings from '../section-element-inputs/output-settings';

// mimics output data set (not flow data of type 'output')
// needed to determin what should be in the select menu
const SampleOutputData = [
    {
        'id': '85ff9e7d-ac4f-4ac7-800c-3aceb91c97fa',
        'type': 'email',
        'visiblity': 'published',
        'lastUpdated': '(date here)',
        'title': 'Engagement Email',
        'emailContent': {
            'shortDescription': '',
            'longDescription': '',
            'emailAddress': 'info@info.com',
            'emailBody': '<p>tester</p>',
        },
    },
    {
        'id': '85ff9e7d-ac4f-4ac7-801c-3aceb91c97fa',
        'type': 'email',
        'visiblity': 'published',
        'lastUpdated': '(date here)',
        'title': 'Follow-up Email',
        'emailContent': {
            'shortDescription': '',
            'longDescription': '',
            'emailAddress': 'info@info.com',
            'emailBody': '<p>tester</p>',
        },
    },
    {
        'id': '85ff9e7d-ac4f-4ac7-802c-3aceb91c97fa',
        'type': 'content',
        'visiblity': 'published',
        'lastUpdated': '(date here)',
        'title': 'Best Practices',
        'emailContent': {
            'shortDescription': 'Best Practices',
            'website': 'http://google.com',
            'content': '<p>tester</p>',
        },
    },
];

const SectionElementOutput = ({
    classes,
    initialValues,
    index,
    moveSectionElement,
    // monitorCardDrop,
    currentSectionIndex,
    handleContentUpdates,
}) => {
    const [sectionOpen, setSectionOpen] = useState(false);

    // Manage Question Dragging
    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: ElementTypes.SECTION_ELEMENT,
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }

            // we aren't yet supporting dragging between sections
            if (item.currentSectionIndex !== currentSectionIndex) {
                return;
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveSectionElement(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            // eslint-disable-next-line no-param-reassign
            item.index = hoverIndex;
        },
        // drop: () => (monitorCardDrop()), // only need if we want to bubble data up
    });

    const [{ isDragging }, drag] = useDrag({
        item: {
            type: ElementTypes.SECTION_ELEMENT,
            id: initialValues.id || null,
            index,
            currentSectionIndex, // we use this to track which section a card is in
            // TODO: figure out if we need to be setting defaults here
            // contents: [{ settings: { validation: { required: false } } }],
        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    // Manage Form Inputs
    // used by output-settings.js
    const updateSettings = (selectedId) => {
        handleContentUpdates('selectedOutput', index, selectedId);
    };

    const duplicateElement = () => {
        handleContentUpdates('duplicate', index);
    };
    const deleteElement = () => {
        handleContentUpdates('delete', index);
    };

    return (
        <div ref={ref} style={{ opacity }} className={`row ${classes.sectionElementWrapper} no-gutters`}>
            <div className="col-auto">
                <div className={`${classes.elementIconWrapper} ${classes.elementOutputIcon}`}>
                    {IconList[initialValues.inputType]}
                </div>
            </div>
            <div className="col">
                <div className={`row ${classes.elementHeader}`}>
                    <div className="col ml-3">
                        {(initialValues.inputType === OutputTypes.EMAIL && (
                            <Select
                                className={classes.elementSelectMenu}
                                color="primary"
                                value={initialValues.selectedOutput || ''}
                                onChange={event => updateSettings(event.target.value)}
                            >
                                {SampleOutputData.map((output, q) => (
                                    <MenuItem key={output.id} value={output.id}>
                                        {output.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        ))}
                    </div>
                    <div className="col-auto">
                        <button type="button" onClick={() => setSectionOpen(!sectionOpen)}>
                            { sectionOpen ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
                        </button>
                        <button type="button" onClick={duplicateElement}><DuplicateIcon /></button>
                        <button type="button" onClick={deleteElement}><DeleteIcon /></button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className={sectionOpen ? classes.sectionOpen : classes.sectionCollapsed}>
                            <hr className={classes.sectionElementBR} />
                            <OutputSettings handleUpdate={updateSettings} initialValues={initialValues} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

SectionElementOutput.propTypes = {
    classes: PropTypes.object.isRequired,
    initialValues: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    moveSectionElement: PropTypes.func.isRequired,
    // monitorCardDrop: PropTypes.func.isRequired,
    currentSectionIndex: PropTypes.number.isRequired,
    handleContentUpdates: PropTypes.func.isRequired,
};

export default withStyles(Styles)(SectionElementOutput);

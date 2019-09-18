import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import DeleteIcon from '@material-ui/icons/Delete';
import DuplicateIcon from '@material-ui/icons/AddToPhotos';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ElementTypes from '../../wiring/element-types';
import OutputTypes from '../../wiring/output-types';
import IconList from '../../wiring/icon-list';

import Styles from './styles';

import OutputSettings from '../output-inputs/output-settings';

const SectionElement = ({
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
    // used by question-settings.js
    const updateSettings = (formValues) => {
        handleContentUpdates('settings', index, formValues);
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
                        <p>input select menu</p>
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
                        <h3>OUTPUT</h3>
                        {(initialValues.inputType === OutputTypes.EMAIL && (
                            <h2>EMAIL</h2>
                        ))}
                        <OutputSettings handleUpdate={updateSettings} initialValues={initialValues} />
                    </div>
                </div>
            </div>
        </div>
    );
};

SectionElement.propTypes = {
    classes: PropTypes.object.isRequired,
    initialValues: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    moveSectionElement: PropTypes.func.isRequired,
    // monitorCardDrop: PropTypes.func.isRequired,
    currentSectionIndex: PropTypes.number.isRequired,
    handleContentUpdates: PropTypes.func.isRequired,
};

export default withStyles(Styles)(SectionElement);

import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import ElementTypes from '../../wiring/element-types';
import QuestionTypes from '../../wiring/question-types';
import IconList from '../../wiring/icon-list';

import RadioQuestion from '../question-inputs/question-type-radio';
import CheckboxQuestion from '../question-inputs/question-type-checkbox';
import QuestionSettings from '../question-inputs/question-settings';

import Styles from './styles';

const SectionElement = ({
    classes,
    initialValues,
    index,
    moveSectionElement,
    // monitorCardDrop,
    currentSectionIndex,
    handleContentUpdates,
}) => {
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
            id: initialValues.id,
            index,
            currentSectionIndex, // we use this to track which section a card is in
            contents: [],
        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    // Manage Form Inputs
    const updateAnswers = (formValues) => {
        handleContentUpdates('answers', index, formValues);
    };

    return (
        <div ref={ref} style={{ opacity }} className={`row ${classes.sectionElementWrapper}`}>
            <div className="col-auto">
                <div className={classes.sectionElementIconWrapper}>
                    {IconList[initialValues.questionType]}
                </div>
            </div>
            <div className="col">
                <Typography variant="body2">{initialValues.title}</Typography>
                {initialValues.type === ElementTypes.QUESTION && (
                    <>
                        {initialValues.questionType === QuestionTypes.RADIO && <RadioQuestion handleUpdate={updateAnswers} initialValues={initialValues.answers} />}
                        {initialValues.questionType === QuestionTypes.CHECKBOX && <CheckboxQuestion handleUpdate={updateAnswers} initialValues={initialValues.answers} />}
                        <hr className={classes.sectionElementBR} />
                        <QuestionSettings handleUpdate={updateAnswers} initialValues={initialValues.settings} />
                    </>
                )}
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

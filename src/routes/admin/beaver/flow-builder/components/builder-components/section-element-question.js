import React, { useRef, useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import DeleteIcon from '@material-ui/icons/Delete';
import DuplicateIcon from '@material-ui/icons/AddToPhotos';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ElementTypes from '../../wiring/element-types';
import QuestionTypes from '../../wiring/question-types';
import IconList from '../../../wiring/icon-list';

import QuestionAnswers from '../section-element-inputs/question-answers';
import QuestionSettings from '../section-element-inputs/question-settings';

import useDebounce from '../../../../../../utils/use-debounce';

import Styles from './styles';

const SectionElementQuestion = ({
    classes,
    initialValues,
    index,
    moveSectionElement,
    // monitorCardDrop,
    currentSectionIndex,
    handleContentUpdates,
}) => {
    // setup title useState
    const [titleValue, setTitleValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [initialBuildComplete, setInitialBuildComplete] = useState(false);
    const [sectionOpen, setSectionOpen] = useState(false);
    const [numberDisplay, setNumberDisplay] = useState('0.00');

    const debouncedTitleValue = useDebounce(titleValue, 1000, initialBuildComplete);
    const debouncedDescriptionValue = useDebounce(descriptionValue, 1000, initialBuildComplete);

    useEffect(() => {
        if (debouncedTitleValue) {
            handleContentUpdates('title', index, titleValue);
        }
    },
    [debouncedTitleValue]);

    useEffect(() => {
        if (debouncedDescriptionValue) {
            handleContentUpdates('description', index, descriptionValue);
        }
    },
    [debouncedDescriptionValue]);

    useEffect(() => { // debounce setup function
        const timer = setTimeout(() => {
            // without this flag, the component will get rerenedered twice because the initail debounces will get fired off
            setInitialBuildComplete(true);
        }, 1100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // populate internal state with data in parent
        // parent will update when values in this component are updated and set upward
        setTitleValue(initialValues.title);
        setDescriptionValue(initialValues.description);

        if (initialValues.inputType === 'number') {
            if (initialValues.settings.validation.numberType === 'currency') {
                setNumberDisplay('0.00');
            } else if (initialValues.settings.validation.numberType === 'phone') {
                setNumberDisplay('(555) 555 - 5555');
            }
        }
    }, [initialValues]);

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
    // used by question-answer.js
    const updateAnswers = (formValues) => {
        handleContentUpdates('answers', index, formValues);
    };

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
                {/* this conditional assumes we only have type QUESTION or OUTPUT */}
                <div className={`${classes.elementIconWrapper} ${classes.elementQuestionIcon}`}>
                    {IconList[initialValues.inputType]}
                </div>
            </div>
            <div className="col">
                <div className={`row ${classes.elementHeader}`}>
                    <div className="col ml-3">
                        <TextField
                            placeholder="Question Title..."
                            className={classes.inputLabel}
                            value={titleValue}
                            onChange={event => setTitleValue(event.target.value)}
                        />
                        {(initialValues.settings && initialValues.settings.enableDescription) && (
                            <TextField
                                placeholder="Question Description..."
                                fullWidth
                                multiline
                                rowsMax="4"
                                value={descriptionValue}
                                onChange={event => setDescriptionValue(event.target.value)}
                            />
                        )}
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
                        {(initialValues.inputType === QuestionTypes.RADIO || initialValues.inputType === QuestionTypes.CHECKBOX)
                            && <QuestionAnswers inputType={initialValues.inputType} handleUpdate={updateAnswers} initialValues={initialValues.answers} />
                        }
                        {(initialValues.inputType === QuestionTypes.SHORT_TEXT || initialValues.inputType === QuestionTypes.LONG_TEXT) && (
                            <TextField
                                placeholder={initialValues.inputType === QuestionTypes.SHORT_TEXT ? 'Short answer text' : 'Long answer text'}
                                disabled
                            />
                        )}
                        {(initialValues.inputType === QuestionTypes.NUMBER && (
                            <TextField
                                disabled
                                placeholder={numberDisplay}
                                className={classes.inputLabel}
                            />
                        ))}
                        <div className={sectionOpen ? classes.sectionOpen : classes.sectionCollapsed}>
                            <hr className={classes.sectionElementBR} />
                            <QuestionSettings inputType={initialValues.inputType} handleUpdate={updateSettings} initialValues={initialValues.settings} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

SectionElementQuestion.propTypes = {
    classes: PropTypes.object.isRequired,
    initialValues: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    moveSectionElement: PropTypes.func.isRequired,
    // monitorCardDrop: PropTypes.func.isRequired,
    currentSectionIndex: PropTypes.number.isRequired,
    handleContentUpdates: PropTypes.func.isRequired,
};

export default withStyles(Styles)(SectionElementQuestion);

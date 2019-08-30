import React, {
    useState,
    useCallback,
    useRef,
    useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { cloneDeep } from 'lodash';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import DragIcon from '@material-ui/icons/ZoomOutMap';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import SectionElement from './section-element';
import ElementTypes from '../starter-elements/element-types';
import Colors from '../../../../../styles/colors';
import Styles from './styles';

const Section = ({
    classes,
    id,
    index,
    moveSection,
    sectionTitle,
    initialContent,
    handleSectionElementUpdates,
}) => {
    const [sectionElements, setSectionElements] = useState(null);
    const [sectionOpen, setSectionOpen] = useState(true);


    // MANAGE FLOW DATA
    useEffect(() => {
        // tell parent to update local state
        // don't update if sectionElements are null (first run)
        if (sectionElements) {
            handleSectionElementUpdates(index, sectionElements);
        }
    }, [sectionElements]);

    useEffect(() => {
        // populate internal state with external props
        setSectionElements(initialContent);
    }, [initialContent]);

    const handleContentUpdates = (type, sectionElementIndex, values) => {
        const tempSectionElements = cloneDeep(sectionElements);
        if (type === 'answers') {
            tempSectionElements[sectionElementIndex].answers = values;
        }
        setSectionElements(tempSectionElements);
    };

    // MANAGE ELEMENT DRAG
    // this monitors the dropping of things into the section.
    const onDrop = (item) => {
        // we are only listing for QUESTIONS || SECTIONS
        // TODO: Add the new question to the place in the list where it was hovering before drop
        // TODO: make the section accept "sectionElement" (or existing questions), so we can move them between sections
        let newElement;
        // TODO: Add different components based on dropped question type (or some other param)
        if (item.type === 'question') {
            newElement = {
                id: sectionElements.length + 1,
                title: item.text,
                answers: [],
            };
        } else {
            // we just a section drop on top of a section, do nothing with the list
            return item;
        }

        setSectionElements(
            update(sectionElements, {
                $push: [newElement],
            }),
        );
        // TODO: unclear why we'd need a return value
        return { name: `Section${id}` };
    };
    // const monitorSectionElementDrop = () => {}; // if we want to bubble data up for storage in parent, this is a logical way to do it
    const moveSectionElement = useCallback(
        (dragIndex, hoverIndex) => {
            const dragSectionElement = sectionElements[dragIndex];
            setSectionElements(
                update(sectionElements, {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragSectionElement]],
                }),
            );
        },
        [sectionElements],
    );
    const renderElement = (sectionElement, sectionElementIndex) => (
        <SectionElement
            key={sectionElement.id}
            index={sectionElementIndex}
            initialValues={sectionElement}
            moveSectionElement={moveSectionElement}
            // monitorSectionElementDrop={monitorSectionElementDrop}
            currentSectionIndex={index}
            handleContentUpdates={handleContentUpdates}
        />
    );

    // MANAGE SECTION DRAG
    const ref = useRef(null);
    const [{ canDrop, isOver }, drop] = useDrop({
        // accept needs to cascading set of types
        accept: [ElementTypes.SECTION, ElementTypes.QUESTION],
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            // if we are not trying to "moveSection", then we should stop now
            if (item.type !== ElementTypes.SECTION) {
                return;
            }
            // if we are trying to drag a NEW section in, it wont have an index setup yet
            // TODO: dynamically manage indexes for new sectionElements?
            if (item.type === ElementTypes.SECTION && !item.index) {
                // console.log('TODO: Allow for dynamic insertion of new sections');
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
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
            moveSection(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            // eslint-disable-next-line no-param-reassign
            item.index = hoverIndex;
        },
        drop: (item, monitor) => (onDrop(item, monitor)),
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });
    const isActive = canDrop && isOver;
    let backgroundColor = Colors.darkGrey;
    if (isActive) {
        backgroundColor = '#666';
    } else if (canDrop) {
        backgroundColor = Colors.darkGrey;
    }

    const [{ isDragging }, drag, preview] = useDrag({
        item: { type: ElementTypes.SECTION, id, index },
        collect: monitor => ({
            // opacity: monitor.isDragging() ? 0.4 : 1, // (this consolidates the logic)
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0.4 : 1;

    drop(ref);

    // Manage UI

    return (
        <div ref={ref} style={{ opacity, backgroundColor, marginBottom: 30 }}>
            <div className="row no-gutters" style={{ backgroundColor: Colors.pageBackground }}>
                <div className="col text-left">
                    <div ref={drag} className={`${classes.sectionTabStyle} ${classes.dragHandleStyle}`}>
                        <DragIcon />
                    </div>
                </div>
                <div className="col text-right">
                    <div className={classes.sectionTabStyle} style={{ marginRight: 2 }}>
                        <button type="button" onClick={() => setSectionOpen(!sectionOpen)}>
                            <ExpandLessIcon />
                        </button>
                    </div>
                    <div className={classes.sectionTabStyle}>
                        <DeleteIcon />
                    </div>
                </div>
            </div>

            <div className="row no-gutters" style={{ padding: '15px 30px' }}>
                <Typography variant="h5">
                    {`${sectionTitle} (${sectionElements ? sectionElements.length : 0})`}
                </Typography>
            </div>

            <div className={`row no-gutters ${sectionOpen ? classes.sectionOpen : classes.sectionCollapsed}`} style={{ padding: '15px 30px' }}>
                <div ref={preview}>
                    {sectionElements && sectionElements.map((sectionElement, i) => renderElement(sectionElement, i))}
                </div>
            </div>
        </div>
    );
};
Section.defaultProps = {
    initialContent: [],
    sectionTitle: 'default title',
};
Section.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    moveSection: PropTypes.func.isRequired,
    sectionTitle: PropTypes.string,
    initialContent: PropTypes.array,
    handleSectionElementUpdates: PropTypes.func.isRequired,
};

export default withStyles(Styles)(Section);

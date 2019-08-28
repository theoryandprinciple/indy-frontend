import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import ElementTypes from './element-types';

const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
    color: 'black',
};
const Card = ({
    id,
    title,
    index,
    moveCard,
    monitorCardDrop,
    currentSectionIndex,
}) => {
    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: ElementTypes.CARD,
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
            moveCard(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            // eslint-disable-next-line no-param-reassign
            item.index = hoverIndex;
        },
        drop: () => (monitorCardDrop()), // only need if we want to bubble data up
    });

    const [{ isDragging }, drag] = useDrag({
        item: {
            type: ElementTypes.CARD,
            id,
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
    return (
        <div ref={ref} style={{ ...style, opacity }}>
            {title}
        </div>
    );
};

Card.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    moveCard: PropTypes.func.isRequired,
    monitorCardDrop: PropTypes.func.isRequired,
    currentSectionIndex: PropTypes.number.isRequired,
};
export default Card;

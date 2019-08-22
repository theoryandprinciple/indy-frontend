import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import update from 'immutability-helper';
import Card from './card';
import ElementTypes from './element-types';

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

const handleStyle = {
    backgroundColor: 'black',
    width: '1rem',
    height: '1rem',
    display: 'inline-block',
    marginRight: '0.75rem',
    cursor: 'move',
};

const Section = ({
    id,
    index,
    moveSection,
}) => {
    const [cards, setCards] = useState([
        {
            id: 1,
            text: 'Write a cool JS library',
            section: id,
        },
        {
            id: 2,
            text: 'Make it generic enough',
            section: id,
        },
        {
            id: 3,
            text: 'Write README',
            section: id,
        },
        {
            id: 4,
            text: 'Create some examples',
            section: id,
        },
        {
            id: 5,
            text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
            section: id,
        },
    ]);

    // this monitors the dropping of things into the section.
    // we are only listing for QUESTIONS || SECTIONS
    const onDrop = (item) => {
        // TODO: Add the new question to the place in the list where it was hovering before drop
        // TODO: make the section accept "CARD" (or existing questions), so we can move them between sections
        let newElement;
        // TODO: Add different components based on dropped question type (or some other param)
        if (item.type === 'question') {
            newElement = {
                id: cards.length + 1,
                text: item.text,
            };
        } else {
            // we just a section drop on top of a section, do nothing with the list
            return item;
        }

        setCards(
            update(cards, {
                $push: [newElement],
            }),
        );
        // TODO: unclear why we'd need a return value
        return { name: `Section${id}` };
    };
    const moveCard = useCallback(
        (dragIndex, hoverIndex) => {
            const dragCard = cards[dragIndex];
            setCards(
                update(cards, {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
                }),
            );
        },
        [cards],
    );
    const renderElement = (card, cardIndex) => (
        <Card
            key={card.id}
            index={cardIndex}
            id={card.id}
            text={card.text}
            moveCard={moveCard}
            currentSectionIndex={index}
        />
    );

    // THIS IS BEING ADDED SO THE SECTION IS DRAGGABLE
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
    let backgroundColor = '#222';
    if (isActive) {
        backgroundColor = 'darkgreen';
    } else if (canDrop) {
        backgroundColor = 'darkkhaki';
    }

    const [{ isDragging }, drag, preview] = useDrag({
        item: { type: ElementTypes.SECTION, id, index },
        collect: monitor => ({
            // opacity: monitor.isDragging() ? 0.4 : 1, // (this consolidates the logic)
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0.4 : 1;

    // this is used to create a reference to the current section being dragged
    // TODO: this is causing the entire block to be draggable, not just the handle
    // drag(drop(ref));
    drop(ref);
    return (
        <div ref={ref} style={{ ...sectionStyle, backgroundColor, opacity }}>
            <div ref={drag} style={handleStyle} />
            {isActive ? 'Release to drop' : 'Draggable Section'}
            <div ref={preview}>
                <div style={{ width: 400 }}>{cards.map((card, i) => renderElement(card, i))}</div>
            </div>
        </div>
    );
};
Section.propTypes = {
    id: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    moveSection: PropTypes.func.isRequired,
};

export default Section;

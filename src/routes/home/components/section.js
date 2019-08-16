import React, { useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import Card from './card';

const sectionStyle = {
    height: '12rem',
    width: '12rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
};


const Section = () => {
    const [elements, setElements] = useState([{ id: 0, type: 'question' }]);

    const onDrop = (item) => {
        setElements(...elements, item);
        return { name: 'Dustbin' };
    };

    const [cards, setCards] = useState([
        {
            id: 1,
            text: 'Write a cool JS library',
        },
        {
            id: 2,
            text: 'Make it generic enough',
        },
        {
            id: 3,
            text: 'Write README',
        },
        {
            id: 4,
            text: 'Create some examples',
        },
        {
            id: 5,
            text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
        },
    ]);
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
    const renderElement = (card, index) => (
        <Card
            key={card.id}
            index={index}
            id={card.id}
            text={card.text}
            moveCard={moveCard}
        />
    );

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ['question', 'farts'],
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
    return (
        <div ref={drop} style={{ ...sectionStyle, backgroundColor }}>
            {isActive ? 'Release to drop' : 'Drag a box here'}
            <div style={{ width: 400 }}>{cards.map((card, i) => renderElement(card, i))}</div>
        </div>
    );
};

export default Section;

"use client"
import React, { useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = 'ANSWER';
const DraggableItem = ({ answer, index, moveItem }) => {
    const [, drag] = useDrag({
      type: ItemType,
      item: { index },
    });
  
    return (
      <div ref={drag} 
      className='py-3 px-2 min-h-20 border border-solid min-w-52'
    //   style={{ padding: '8px', border: '1px solid gray', marginBottom: '4px' }}
      >
        {answer.text}
      </div>
    );
  };
  
  const DropTarget = ({ id, onDrop, children }) => {
    const [, drop] = useDrop({
      accept: ItemType,
      drop: (item) => onDrop(item.index, id),
    });
  
    return (
      <div ref={drop} 
      className='py-3 px-2 min-h-10 border border-dashed min-w-52'
    //   style={{ padding: '5px', border: '1px dashed gray', minHeight: '20px',minWidth:"80px" }}
      >
        {children}
      </div>
    );
  };
const DragAndDropGame = () => {
    const [answers, setAnswers] = useState([
        { id: 1, text: 'democracy' },
        { id: 2, text: 'justice' },
        { id: 3, text: 'equality' }
      ]);
    
      const [blanks, setBlanks] = useState([
        { id: 'blank1', filled: '' },
        { id: 'blank2', filled: '' },
        { id: 'blank3', filled: '' }
      ]);
    
      const handleDrop = (answerIndex, blankId) => {
        const newBlanks = blanks.map(blank =>
          blank.id === blankId ? { ...blank, filled: answers[answerIndex].text } : blank
        );
        setBlanks(newBlanks);
    
        // Optionally, remove the answer from the answer pool after dropping
        const newAnswers = answers.filter((_, index) => index !== answerIndex);
        setAnswers(newAnswers);
      };
    
      return (
        <DndProvider backend={HTML5Backend}>
          <div className='flex gap-5 my-20 justify-center'>
            <div className='w-[80vw] flex gap-4'>
              Our country believes in{' '}
              <div>
              <DropTarget id="blank1" onDrop={handleDrop}>
                {blanks[0].filled || ''}
              </DropTarget>
              </div>
              , providing{' '}
              <div>

              <DropTarget id="blank2" onDrop={handleDrop}>
                {blanks[1].filled || ''}
              </DropTarget>
              </div>
              , and ensuring{' '}
              <div>

              <DropTarget id="blank3" onDrop={handleDrop}>
                {blanks[2].filled || ''}
              </DropTarget>
              </div>
              for all citizens.
            </div>
    
            <div style={{ marginTop: '20px' }}>
              {answers.map((answer, index) => (
                <DraggableItem
                  key={answer.id}
                  answer={answer}
                  index={index}
                />
              ))}
            </div>
          </div>
        </DndProvider>
      );
}

export default DragAndDropGame



// https://geekflare.com/best-drag-and-drop-react-libraries/
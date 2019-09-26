import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'

const DropZone = ({questions, id, test, indexx, isDragDisabled, data}) => (
  <>
    <Droppable droppableId={id} isDropDisabled={false}>

      {provided => {
      return (
      <div className="menu list" {...provided.droppableProps} ref={provided.innerRef}>


        {
          questions.map(({question, isQuestion}, i) =>(
            isQuestion ?
              <Question isQuestion={isQuestion} key={question} name={question} index={i} isDragDisabled={isDragDisabled}/>
            :
              <Question isQuestion={isQuestion} key={question} name={question} index={i} isDragDisabled={false}/>
        ))}
            {provided.placeholder}
          </div>
        )
      }}
    </Droppable>
  </>
)

const Question = ({ name, index, isDragDisabled, isQuestion }) => (
  <Draggable isDragDisabled={isDragDisabled} key={name} draggableId={name} index={index}>
    {provided => {
      return (
        <div className={isQuestion ? 'dnd-card' : 'dnd-card answer'}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div>{name}</div>
        </div>
      )
    }}
  </Draggable>
)
export default DropZone
import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import {GAME_STATE} from './custom/util'

const DropZone = ({questions, questionsLength, id, isDragDisabled, gameState}) => (
  <>
    <Droppable droppableId={id} isDropDisabled={gameState === GAME_STATE.DONE ? true : questionsLength == 2 ? true : false} >
      {provided => {
      return (
      <div id={gameState === GAME_STATE.DONE && isDragDisabled === true ? (questions[0].isCorrect === true ? 'isCorrect' : 'isIncorrect') : ''} className={isDragDisabled ? 'menu menu-questions' : 'menu answers' }{...provided.droppableProps} ref={provided.innerRef}>
        {
          questions.map(({question, isQuestion}, i) =>(
            isQuestion ?
              <Question isQuestion={isQuestion} key={question} name={question} index={i} isDragDisabled={isDragDisabled} gameState={gameState}/>
            :
              <Question isQuestion={isQuestion} key={question} name={question} index={i} isDragDisabled={false} gameState={gameState}/>
        ))}
            {provided.placeholder}
          </div>
        )
      }}
    </Droppable>
  </>
)

const Question = ({ name, index, isDragDisabled, isQuestion, gameState }) => (
  <Draggable isDragDisabled={gameState === GAME_STATE.DONE ? true : isDragDisabled} key={name} draggableId={name} index={index}>
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
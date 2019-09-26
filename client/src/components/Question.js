import React from 'react'
import ContentEditable from "react-contenteditable"


const Question = ({questions, removeQuestion, handleEditAnswer, handleEditQuestion, getState, toggleEditable, showToggleEdit, activeCard}) =>{

  const questionList = questions.map((question, i) => {
    return(
      <div  className="question" key={question.q_id}>
        <div className="question-question">
          <label>Question #{i+1} </label>
          <ContentEditable
            className={activeCard === question.q_id && showToggleEdit === true ? 'editable show' : 'editable' }
            tagName="pre"
            disabled={!getState}
            html={question.q_value} // innerHTML of the editable div
            onBlur={ (e) => {handleEditQuestion(e, question.q_id)} } />    
        </div> 
        <div className="question-answer">
          <label>Answer </label>
          <ContentEditable
            className={activeCard === question.q_id && showToggleEdit === true ? 'editable show' : 'editable' }
            tagName="pre"
            disabled={!getState}
            html={question.q_answer} // innerHTML of the editable div
            onBlur={ (e) => {handleEditAnswer(e, question.q_id)} } />        
        </div> 
        <div className="question-buttons-container">
          <button onClick={(e) =>{toggleEditable(e, question.q_id)}}>
            {getState && activeCard === question.q_id ? "Apply Edit" : "Edit"}
          </button>
          <button onClick={ (e) => {removeQuestion(question.q_id)}}>Delete</button>
        </div>  
      </div>
    )
  })

  return(

    <div className='question-container'>
      {questionList}
    </div>
  )
}

export default Question;
import React from 'react'
import ContentEditable from "react-contenteditable"

const Quiz = ({questions, activeIndex, handleClick, isAfterQuestionDialogOpen}) =>{

  const questionList = questions.map((question, i) => {
    return(
      <div  className="question study" key={question.q_id}>
        <div className='question-question studycard'>
        <label>Question {i+1}</label>
          <ContentEditable
            className="editable"
            tagName="pre"
            disabled={true}
            html={question.q_value}/> 
        </div> 
      </div>
    )
  })

  const answerList = questions.map((question, i) => {
    var answers = []
    question.answers.map(answer =>{
      return answers.push(answer)
    })
    return(
      <div className="quizgame-buttons-container">
        <div className="quizgame-buttons-container-button">
          <span>A</span>
          <button className={isAfterQuestionDialogOpen ? 'disabled' : ''} onClick={(e) => {handleClick(e, answers[0], activeIndex)}}>{answers[0].answer}</button>
        </div>
        <div className="quizgame-buttons-container-button">
          <span>B</span>
        <button className={isAfterQuestionDialogOpen ? 'disabled' : ''}  onClick={(e) => {handleClick(e, answers[1], activeIndex)}}>{answers[1].answer}</button>
        </div>
        <div className="quizgame-buttons-container-button">
          <span>C</span>
        <button className={isAfterQuestionDialogOpen ? 'disabled' : ''}  onClick={(e) => {handleClick(e, answers[2], activeIndex)}}>{answers[2].answer}</button>
        </div>
        <div className="quizgame-buttons-container-button">
          <span>D</span>
        <button className={isAfterQuestionDialogOpen ? 'disabled' : ''}  onClick={(e) => {handleClick(e, answers[3], activeIndex)}}>{answers[3].answer}</button>
        </div>
      </div>
    )
  })

  return(
    <>
    {questionList[activeIndex]}
 
    {answerList[activeIndex]}

    </>
    
  )
}

export default Quiz;
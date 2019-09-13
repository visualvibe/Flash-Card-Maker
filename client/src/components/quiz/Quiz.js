import React from 'react'
import ContentEditable from "react-contenteditable"


const Quiz = ({questions, activeIndex, handleNext, handleBefore, 
  handleShowAnswer, handleShowQuestion, isQuestionVisible, isAnswerVisible}) =>{

  const questionList = questions.map((question, i) => {
    return(
      <div  className="question study" key={question.q_id}>
        <div className="question-question">
        <label>Question </label>
          <ContentEditable
            className="editable"
            tagName="pre"
            disabled={true}
            html={question.q_value}/> 
          <button onClick={handleShowAnswer}>Show Answer</button>
        </div> 
      </div>
    )
  })
  const answerList = questions.map((question, i) => {
    return(
      <div  className="question study" key={question.q_id}>
        <div className="question-question">
        <label>Answer </label>
          <ContentEditable
            className="editable"
            tagName="pre"
            disabled={true}
            html={question.q_answer}/>        

          <button onClick={handleShowQuestion}>Show Question</button>
        </div> 
      </div>
    )
  })

  return(
  <div>
    <div className='question-container quiz'>
    {isQuestionVisible ?
      <div className="question-container-question">
        {questionList[activeIndex]}
      </div> 
      : 
      <div className="question-container-question">
        {answerList[activeIndex]}
      </div> 
    }
    </div>
    <div className='quiz-buttons-container'>
      {activeIndex !== 0 ?       
        <button style={{zIndex: '125'}}onClick={(e) => handleBefore(e, activeIndex-1)}> &#8678;</button>
      :
        null
      }
      <span>Question {activeIndex+1}/{questionList.length}</span>
      {activeIndex !== questionList.length-1 ?       
        <button style={{zIndex: '125'}}onClick={(e) => handleNext(e, activeIndex+1)}> &#8680;</button>
      :
        null
      }
    </div>
    </div>
    
  )
}

export default Quiz;
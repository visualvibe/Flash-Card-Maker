import React from 'react'
import ContentEditable from "react-contenteditable"


const Quiz = ({questions, activeIndex, handleNext, handleBefore, 
  handleShowAnswer, handleShowQuestion, isQuestionVisible, isAnswerVisible, animation}) =>{

  const questionList = questions.map((question, i) => {
    return(
      <div  className="question study" key={question.q_id}>
        <div className={animation !== 1 ? 'question-question studycardx' : 'question-question studycard'}>
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
        <div className={animation !== 1 ? 'question-question studycardx' : 'question-question studycard'}>
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
  <>
    <div className='question-container quiz'>
    {isQuestionVisible ?
      <> {questionList[activeIndex]} </> :null }

    {!isQuestionVisible ? 
      <> {answerList[activeIndex]} </> : null}
    </div>
    <div className='quiz-buttons-container'>
      {activeIndex !== 0 ?       
        <button style={{zIndex: '125'}}onClick={(e) => handleBefore(e, activeIndex-1)}> &#8678;</button>
      :
      <button style={{zIndex: '125', color: 'grey', cursor: 'no-drop'}}> &#8678;</button>
      }
      <span>{activeIndex+1}/{questionList.length}</span>
      {activeIndex !== questionList.length-1 ?       
        <button style={{zIndex: '125'}}onClick={(e) => handleNext(e, activeIndex+1)}> &#8680;</button>
      :
        <button style={{zIndex: '125', color: 'grey', cursor: 'no-drop'}}> &#8680;</button>
      }
    </div>
    </>
    
  )
}

export default Quiz;
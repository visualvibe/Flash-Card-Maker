import React from 'react'

const AfterQuestionModal = ({handleClose, wasCorrect, correctAnswer, currentQuestion}) =>(
 <div className="modal after-question">
  <div className={wasCorrect == true ? "modal-header green" : "modal-header red"}>
   {wasCorrect == true ? 
    <span>Correct!</span>: 
    <span>Incorrect!</span>}
  </div>
  <div className="modal-content">
   {wasCorrect == false ?
   <> 
   <span>Question: {currentQuestion}</span>
   <span className="green">Correct answer: {correctAnswer}</span>
   </>
    : null }
   
  </div>
  <div className="modal-buttons">
   <button onClick={(e) =>{handleClose(e)}}>Next</button>
  </div>
 </div>
)

export default AfterQuestionModal
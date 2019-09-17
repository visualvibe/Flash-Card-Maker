import React from 'react'

const EndGameModal = ({correct, totalQuestions, handlePlayAgain}) =>(
 <div className="modal endgame">
  <div className="modal-header">
   <span>You have finished the quiz</span>
  </div>
  <div className="modal-content">
   <span>You answered <strong style={{color: 'green'}}>{correct}</strong> correctly out of {totalQuestions}</span>
  </div>
  <div className="modal-buttons">
   <button onClick={(e) => {handlePlayAgain(e)}}>Play again!</button>
  </div>
 </div>
)

export default EndGameModal
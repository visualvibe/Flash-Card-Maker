import React from 'react'

const EndGameModal = ({correct, totalQuestions, handleClose}) =>(
 <div className="modal endgame-dnd">
  <div className="modal-header">
   <span>You have finished the game!</span>
  </div>
  <div className="modal-content">
   <span>You matched <strong style={{color: 'green'}}>{correct}</strong> correctly out of 6 questions</span>
  </div>
  <div className="modal-buttons">
   <button onClick={(e) => {handleClose(e)}}>Close</button>
  </div>
 </div>
)

export default EndGameModal
import React from 'react'

const StartDNDModal = ({handlePlay, handleTimer, handleCancel, timerValue}) =>(
 <div className="modal startgame-dnd">
  <div className="modal-header">
   <span>Settings</span>
  </div>
  <div className="modal-content">
   <label>Set timer </label>
   <select value={timerValue} onChange={(e) => {handleTimer(e)}}>
    <option selected="selected" value='30'>30 seconds</option>
    <option value='60'>1 minute</option>
    <option value='120'>2 minute</option>
    <option value='180'>3 minute</option>
    <option value='240'>4 minute</option>
    <option value='300'> 5 minute</option>
   </select>
  </div>
  <div className="modal-buttons">
   <button onClick={(e) => {handleCancel(e)}}>Cancel</button>
   <button onClick={(e) => {handlePlay(e)}}>Play</button>
  </div>
 </div>
)

export default StartDNDModal
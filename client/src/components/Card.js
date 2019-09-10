import React from 'react'
import {NavLink} from 'react-router-dom';
import ContentEditable from "react-contenteditable"
import { withRouter } from 'react-router-dom';

const Card = ({cards, removeCard, getState, toggleEditable, handleEditTitle, handleEditSubject, x, history}) =>{
  const flashcardList = cards.map(card => {
  return(
  <div className="flashcard" key={card.set_id}>
    <div className="flashcard-title">
      <label>Title </label>
      <ContentEditable
        className="editable"
        tagName="pre"
        html={card.title}
        disabled={!getState}
        onChange={ (e) => {handleEditTitle(e, card.set_id)} } />    
    </div> 
    <div className="flashcard-subject">
      <label>Subject </label>
      <ContentEditable
        className="editable"
        tagName="pre"
        disabled={!getState}
        html={card.subject}
        onChange={ (e) => {handleEditSubject(e, card.set_id)} } />    
    </div> 
    <div className="flashcard-buttons">
      <NavLink to={{
      pathname: x + '/edit/flashcard/' + card.set_id,
      state:{
        title: card.title,
        subject: card.subject
      }}}>
      <button>View/Edit Card</button>
      </NavLink>

    
      <button onClick={toggleEditable}>
        {getState ? "Disable Edit" : "Edit"}
      </button>
        <button onClick={ () => {
          removeCard(card.set_id, x, history)
          }} >
          Delete 
        </button>
      </div>
    </div>
  )
  })
   

  return(
   <div className="container edit-card">
    <div className="container-header">
      <h1>Your Flashcards</h1>
    </div>
    <div className="flashcard-container">
      {flashcardList}
    </div>
   </div>
  )
}

export default withRouter(Card);
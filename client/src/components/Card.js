import React from 'react'
import {NavLink} from 'react-router-dom';
import ContentEditable from "react-contenteditable"
import { withRouter } from 'react-router-dom';

const Card = ({cards, removeCard, getState, toggleEditable, handleEditTitle, handleEditSubject, x}) =>{
 const flashcardList = cards.map(card => {
   return(
 

   <div className="flashcard" key={card.set_id}>
   <div>
     <label>Title: </label>
     <ContentEditable
          className="editable"
          tagName="pre"
          html={card.title}
          disabled={!getState}
          onChange={ (e) => {handleEditTitle(e, card.set_id)} } 
        />    
    </div> 
    <div>
     <label>Subject: </label>
     <ContentEditable
          className="editable"
          tagName="pre"
          disabled={!getState}
          html={card.subject}
          onChange={ (e) => {handleEditSubject(e, card.set_id)} } 
        />    
    </div> 
     
    <NavLink to={{
     pathname: x + '/edit/flashcard/' + card.set_id,
     state:{
      title: card.title,
      subject: card.subject
     }}}>
     <button>Edit Card</button>
    </NavLink>

   
   <button onClick={toggleEditable}>
    {getState ? "Disable Edit" : "Edit"}
   </button>
   <button onClick={ () => {
    removeCard(card.set_id)
    this.props.history.push(x)
    }} >
     Delete Flash Card
    </button>
   </div>
   )
   })
   

  return(
   <div>
    <h1>Cards</h1>
    {flashcardList}
   </div>
  )
}

export default withRouter(Card);
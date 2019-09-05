import React from 'react'
import {Link} from 'react-router-dom';
import ContentEditable from "react-contenteditable"

const Card = ({cards, removeCard, getState, toggleEditable, handleEditTitle, handleEditSubject}) =>{
 const flashcardList = cards.map(card => {
   return(
 

   <div className="flashcard" key={card.set_id}>
   <Link to={{
   pathname: '/flashcard/' + card.set_id,
   state: { 
    title: card.title,
    subject: card.subject
    }}}>
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
     
   View FlashCard </Link>
   
   <button onClick={toggleEditable}>
    {getState ? "Disable Edit" : "Edit"}
   </button>
   <button onClick={ () => {removeCard(card.set_id)}} >Delete Flash Card</button>
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

export default Card;
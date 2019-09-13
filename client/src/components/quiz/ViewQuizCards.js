import React from 'react'
import {NavLink} from 'react-router-dom';
import ContentEditable from "react-contenteditable"
import { withRouter } from 'react-router-dom';

const ViewQuizCards = ({cards, x, history}) =>{
  const flashcardList = cards.map(card => {
  return(
     <NavLink to={{
      pathname: x + '/study/flashcard/' + card.set_id,
      }} key={card.set_id} className="xx">
     <div className="flashcard study" >
      <div className="flashcard-title">
        <label>Title </label>
        <ContentEditable
          className="editable"
          tagName="pre"
          html={card.title}
          disabled={true}/>    
      </div> 
      <div className="flashcard-subject">
        <label>Subject </label>
        <ContentEditable
          className="editable"
          tagName="pre"
          disabled={true}
          html={card.subject} />    
      </div> 
     </div>
   </NavLink>
  )
  })
   

  return(
   <div className="container edit-card">
    <div className="container-header">
      <h1><span style={{ color: '#9c9996', fontSize: '1rem', wordSpacing: '10px' }}> Study</span>Your Flashcards </h1>
    </div>
    <div className="view-quiz-header">
     <h1>&#8681; Pick a Set To Study From</h1>
    </div>

    <div className="flashcard-container study">
      {flashcardList}
    </div>
   </div>
  )
}

export default withRouter(ViewQuizCards);
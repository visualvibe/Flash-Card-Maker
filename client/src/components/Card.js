import React from 'react'
import {NavLink} from 'react-router-dom';
import ContentEditable from "react-contenteditable"
import { withRouter } from 'react-router-dom';
import SearchBox from './SearchBox'

const Card = ({cards, removeCard, getState, toggleEditable, handleEditTitle, handleEditSubject, x, history, handleSearch}) =>{
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
        onBlur={ (e) => {handleEditTitle(e, card.set_id)} } />    
    </div> 
    <div className="flashcard-subject">
      <label>Subject </label>
      <ContentEditable
        className="editable"
        tagName="pre"
        disabled={!getState}
        html={card.subject}
        onBlur={ (e) => {handleEditSubject(e, card.set_id)} } />    
    </div> 
    <div className="flashcard-buttons">
      <NavLink to={{
        pathname: x + '/edit/flashcard/' + card.set_id,
      }}>
      <button>Edit Set</button>
      </NavLink>

    
      <button type="submit" onClick={toggleEditable}>
        {getState ? "Apply Edit" : "Edit"}
      </button>
        <button onClick={ (e) => {
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
    <div className="container-header profile">
      <h1><span style={{ color: '#9c9996', fontSize: '1rem', wordSpacing: '10px' }}> Edit</span>Your Flashcards<span style={{ color: '#9c9996', fontSize: '1rem' }}> Total</span> {flashcardList.length} Sets</h1>
      <div className="container-middle-header">
        <SearchBox handleSearch={handleSearch}/>
      </div>
    </div>

    <div className="flashcard-container">
      {flashcardList}
    </div>
   </div>
  )
}

export default withRouter(Card);
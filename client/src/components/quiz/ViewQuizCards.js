import React from 'react'
import {NavLink} from 'react-router-dom'
import ContentEditable from "react-contenteditable"
import { withRouter } from 'react-router-dom'
import SearchBox from '../SearchBox'

const ViewQuizCards = ({makeFavorite, cards, x, history, handleSearch, orderByFavorite, orderByNewest,
  orderByOldest, activeIndex}) =>{
  const flashcardList = cards.map(card => {
  return(
     <NavLink to={{
      pathname: x + '/quiz/flashcard/' + card.set_id}}  key={card.set_id} className="xx">
     <div className="flashcard study" >
     <div onClick={(e) =>{makeFavorite(e, card.set_id)}} style={{cursor:'pointer'}} className={card.isFavorite == 1 ? 'star yellow' : 'star'}>&#9733;</div>
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
    <div className="container-header profile">
      <h1><span style={{ color: '#9c9996', fontSize: '1rem', wordSpacing: '10px' }}> Quiz</span>Your Flashcards </h1>
      <div className="container-middle-header">
        <SearchBox handleSearch={handleSearch}/>
     </div>
    </div>
  
    <div className="view-quiz-header">
     <h1> Pick a set to take a multiple choice quiz</h1>
     <p>&#8681; Only flashcard sets with at least <strong>4 or more </strong> questions are playable!</p>
    </div>
    <div className="orderby-buttons-container studyquiz">
      <span>Order By</span>
      <button className={activeIndex === 0 ? 'activex' : '' } onClick={(e) => {orderByNewest(e)}}>Newest</button>
      <button className={activeIndex === 1 ? 'activex' : '' }  onClick={(e) => {orderByOldest(e)}}>Oldest</button>
      <button className={activeIndex === 2 ? 'activex' : '' }  onClick={(e) => {orderByFavorite(e)}}>Favorite</button>
    </div>
    <div className="flashcard-container studyquiz">
      {flashcardList}
    </div>
   </div>
  )
}

export default withRouter(ViewQuizCards);
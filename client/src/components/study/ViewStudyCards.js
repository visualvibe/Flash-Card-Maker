import React from 'react'
import {NavLink} from 'react-router-dom'
import ContentEditable from "react-contenteditable"
import { withRouter } from 'react-router-dom'
import SearchBox from '../SearchBox'

const ViewStudyCards = ({makeFavorite, cards, x, history, handleSearch, orderByFavorite, orderByNewest,
  orderByOldest, activeIndex}) =>{
  const flashcardList = cards.map(card => {
  return(
     <NavLink to={{
      pathname: x + '/study/flashcard/' + card.set_id,
      }} key={card.set_id} className="xx">
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
      <h1><span style={{ color: '#9c9996', fontSize: '1rem', wordSpacing: '10px' }}> Study</span>Your Flashcards </h1>
      <div className="container-middle-header">
        <SearchBox handleSearch={handleSearch}/>
     </div>
    </div>
  
    <div className="view-quiz-header">
     <h1>Pick a Set To Study From</h1>
    </div>
    <div className="orderby-buttons-container study">
      <span>Order By</span>
      <button className={activeIndex === 0 ? 'activex' : '' } onClick={(e) => {orderByNewest(e)}}>Newest</button>
      <button className={activeIndex === 1 ? 'activex' : '' }  onClick={(e) => {orderByOldest(e)}}>Oldest</button>
      <button className={activeIndex === 2 ? 'activex' : '' }  onClick={(e) => {orderByFavorite(e)}}>Favorite</button>
    </div>
    <div className="flashcard-container study">
      {flashcardList}
    </div>
   </div>
  )
}

export default withRouter(ViewStudyCards);
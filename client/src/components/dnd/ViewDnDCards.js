import React from 'react'
import {NavLink} from 'react-router-dom'
import ContentEditable from "react-contenteditable"
import { withRouter } from 'react-router-dom'
import SearchBox from '../SearchBox'
import info from '../../images/info.png'

const ViewDnDCards = ({makeFavorite, cards, x, handleSearch, orderByFavorite, orderByNewest,
  orderByOldest, activeIndex, showInfo, showInfoState, activeCard, openModal}) =>{

  const flashcardList = cards.map(card => {
    let date = card.date_created.split('T')
    return(
      <NavLink onClick={(e)=> {openModal(e, card.set_id)}} key={card.set_id} className="xx">
      <div className="flashcard study" >
      <div className="flashcard-header">
          <div onClick={(e) =>{makeFavorite(e, card.set_id)}} style={{cursor:'pointer'}} className={card.isFavorite == 1 ? 'star yellow' : 'star'}>&#9733;</div>
          <div onClick={(e)=>{showInfo(e, card.set_id)}} className="flashcard-header-right">
            <div className={showInfoState && activeCard === card.set_id ? 'flashcard-header-right-content show' : 'flashcard-header-right-content'}>
              <span>Date created: {date[0]}</span>
              <span style={{display: 'block'}}>Total questions: {card.numQuestions}</span>
            </div>
            <img id="xxx" src={info} alt=''></img>
          </div>
        </div>
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
      <h1><span style={{ color: '#9c9996', fontSize: '1rem', wordSpacing: '10px' }}> Match</span>Your Flashcards </h1>
      <div className="container-middle-header">
        <SearchBox handleSearch={handleSearch}/>
     </div>
    </div>
  
    <div className="view-quiz-header">
     <h1>Pick a set to play a drag and drop game</h1>
     <p>&#8681; Only flashcard sets with at least <strong>6 or more </strong> questions are playable!</p>
    </div>
    <div className="orderby-buttons-container studyquiz">
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

export default withRouter(ViewDnDCards);
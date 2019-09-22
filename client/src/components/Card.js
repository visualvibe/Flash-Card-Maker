import React from 'react'
import {NavLink} from 'react-router-dom';
import ContentEditable from "react-contenteditable"
import { withRouter } from 'react-router-dom';
import SearchBox from './SearchBox'
import info from '../images/info.svg'

const Card = ({cards, removeCard, getState,
    toggleEditable, handleEditTitle,
    handleEditSubject, x, history,
    handleSearch, makeFavorite,
    orderByFavorite, orderByNewest,
    orderByOldest, activeIndex,
    showInfo, showInfoState,
    activeCard, showToggleEdit}) =>{

  const flashcardList = cards.map(card => {
    let date = card.date_created.split('T')
    return(
    <div className="flashcard" key={card.set_id}>
      <div className="flashcard-header">
        <div onClick={(e) =>{makeFavorite(e, card.set_id)}} style={{cursor:'pointer'}} className={card.isFavorite == 1 ? 'star yellow' : 'star'}>&#9733;</div>
        <div className="flashcard-header-right">
          <div className={showInfoState && activeCard === card.set_id ? 'flashcard-header-right-content show' : 'flashcard-header-right-content'}>
            <span>Date created: {date[0]}</span>
            <span style={{display: 'block'}}>Total questions: {card.numQuestions}</span>
          </div>
          <img onClick={(e)=>{showInfo(e, card.set_id)}} id="xxx" src={info} alt=''></img>
        </div>
      </div>
      <div className="flashcard-title">
          <label>Title </label>
          <ContentEditable
            className={activeCard === card.set_id && showToggleEdit === true ? 'editable show' : 'editable' }
            tagName="pre"
            html={card.title}
            disabled={!getState}
            onBlur={ (e) => {handleEditTitle(e, card.set_id)} } />  
      </div> 
      <div className="flashcard-subject">
        <label>Subject </label>
        <ContentEditable
          className={activeCard === card.set_id && showToggleEdit === true ? 'editable show' : 'editable' }
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

      
        <button type="submit" onClick={(e) => {toggleEditable(e, card.set_id)}}>
          {getState && activeCard === card.set_id ? "Apply Edit" : "Edit"}
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
    <div className="orderby-buttons-container profile">
      <span>Order By</span>
      <button className={activeIndex === 0 ? 'activex' : '' } onClick={(e) => {orderByNewest(e)}}>Newest</button>
      <button className={activeIndex === 1 ? 'activex' : '' }  onClick={(e) => {orderByOldest(e)}}>Oldest</button>
      <button className={activeIndex === 2 ? 'activex' : '' }  onClick={(e) => {orderByFavorite(e)}}>Favorite</button>
    </div>
    <div className="flashcard-container profile">
      {flashcardList}
    </div>
   </div>
  )
}

export default withRouter(Card);
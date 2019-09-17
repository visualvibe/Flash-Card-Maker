import axios from 'axios'
import { GET_CARDS, TOGGLE_EDIT, CARDS_LOADING, ADD_CARD, DELETE_CARD, HANDLE_EDIT_TITLE, HANDLE_EDIT_SUBJECT } from './types'

//Function to retrieve cards from the backend to put into redux store
export const getCards = (user_id) => (dispatch, getState) =>{
 dispatch(setCardsLoading());
 axios({
  method: 'POST', 
  url:'/api/cards', 
  'content-type': 'application/json',
  data: {
    user_id: user_id
  }
  })
  .then(res =>  
   dispatch({
    type: GET_CARDS,
    payload: res.data
   })
   
  )
}

//Function that handles adding a new card
export function addCard(card){

 return function (dispatch, getState){
 return axios({
  method: 'POST', 
  url:'/api/addcard', 
  'content-type': 'application/json',
  data: {
    user_id: getState().auth.user_id,
    title: card.title,
    subject: card.subject
  }
 })
 .then(res=>{
  const newCard = {
   user_id: getState().auth.user_id,
   set_id: res.data.insertId,
   title: card.title,
   subject: card.subject,
   }  
   dispatch({
   type: ADD_CARD,
   payload: newCard
  })
  return res
  })

 }
}


//Function that handles deleting of a card
export const deleteCard = (id, url, history) => (dispatch, getState) =>{
  axios({
    method: 'POST', 
    url:'/api/removecard', 
    'content-type': 'application/json',
    data: {
    set_id: id
    } 
  })
  .then(res=>
    dispatch({
    type: DELETE_CARD,
    payload: id
    }))
}

//Handles title edit of card
export const handleEditTitle = (e, index) => (dispatch, getState)=>{
  const title = e.target.textContent
  axios({
    method: 'POST', 
    url:'/api/edittitle', 
    'content-type': 'application/json',
    data: {
      title: e.target.textContent,
      set_id: index
    }
  })
  .then(res => {
    var card = [...getState().cards.cards]
    var i = card.findIndex(obj => obj.set_id === index)
    card[i].title = title
    dispatch({
      type: HANDLE_EDIT_TITLE,
      payload: card
    })
  })
  
}

//Handles edits subject of card 
export const handleEditSubject = (e, index) => (dispatch, getState)=>{
  const subject = e.target.textContent
  axios({
    method: 'POST', 
    url:'/api/editsubject', 
    'content-type': 'application/json',
    data: {
      subject: subject,
      set_id: index
    }
  })
  .then(res => {
    var card = [...getState().cards.cards]
    var i = card.findIndex(obj => obj.set_id === index)
    card[i].subject = subject
    dispatch({
    type: HANDLE_EDIT_SUBJECT,
    payload: card
    })
  })
}

//Toggles edit button
export const toggleEdit = () => (dispatch, getState) =>{
 dispatch({type: TOGGLE_EDIT})
}

export const setCardsLoading = () => {
 return {
   type: CARDS_LOADING
 }
}
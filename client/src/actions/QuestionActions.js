import axios from 'axios'
import { GET_QUESTIONS, TOGGLE_EDIT, GET_CARD_INFO, ADD_QUESTION, EDIT_QUESTION, EDIT_ANSWER, DELETE_QUESTION } from './types'

//Function to get questions from back end
export const getQuestions = (set_id) => (dispatch,getState) =>{
 axios({
  method: 'POST', 
  url:'/api/cards/questions', 
  'content-type': 'application/json',
  data: {
   set_id: set_id
  }
 })
 .then(res =>{

  dispatch({
   type: GET_QUESTIONS,
   payload: res.data
  })
 })
}

//Retrieves specific card info 
export const getCardInfo = (set_id) => (dispatch,getState) =>{
 axios({
  method: 'POST', 
  url:'/api/cards/info', 
  'content-type': 'application/json',
  data: {
   set_id: set_id
  }
 })
 .then(res =>{
  dispatch({
   type: GET_CARD_INFO,
   payload: res.data
  })
 })
}


//Handles adding a question to specific card
export const addQuestion = (question, set_id) => (dispatch, getState) =>{
 axios({
  method: 'POST', 
  url:'/api/addquestion', 
  'content-type': 'application/json',
  data: {
      q_value: question.question,
      q_answer: question.answer,
      set_id: set_id
  }
}).then(res =>{
 var newQuestion = {
  q_id: res.data.insertId,
  q_value: question.question,
  q_answer: question.answer,
  set_id: set_id
 }
 dispatch({
  type: ADD_QUESTION,
  payload: newQuestion
 })
})
}

//Function that handles removing a question from a card
export const removeQuestion = (id) => (dispatch, getState) =>{
  axios({
    method: 'POST', 
    url:'/api/removequestion', 
    'content-type': 'application/json',
    data: {
    q_id: id
    }
  })
  .then(res =>{
    dispatch({
      type: DELETE_QUESTION,
      payload: id
    })
  })
}

//Handles editing of the question
export const handleEditQuestion = (e, index) => (dispatch, getState)=>{
  const question = e.target.textContent
  axios({
    method: 'POST', 
    url:'/api/editquestion', 
    'content-type': 'application/json',
    data: {
      q_value: question,
      q_id: index
    }
  })
  .then(res => {
    var question = [...getState().questions.questions]
    var i = question.findIndex(obj => obj.q_id === index)
    question[i].q_value = question
    dispatch({
    type: EDIT_QUESTION,
    payload: question
    })
  })
}

//Handles editing of the question
export const handleEditAnswer = (e, index) => (dispatch, getState)=>{
  const answer = e.target.textContent

  axios({
    method: 'POST', 
    url:'/api/editanswer', 
    'content-type': 'application/json',
    data: {
      q_answer: answer,
      q_id: index
    }
  })
  .then(res => {
    var question = [...getState().questions.questions]
    var i = question.findIndex(obj => obj.q_id === index)
    question[i].q_answer = answer
    dispatch({
    type: EDIT_ANSWER,
    payload: question
    })
  })
}

//Toggles edit button
export const toggleEdit = () => (dispatch, getState) =>{
  dispatch({type: TOGGLE_EDIT})
}
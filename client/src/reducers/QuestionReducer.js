import { GET_QUESTIONS, TOGGLE_EDIT, GET_CARD_INFO, ADD_QUESTION, EDIT_QUESTION, EDIT_ANSWER, DELETE_QUESTION } from '../actions/types'

const initState = {
 title: '',
 subject: '',
 set_id: '',
 editable: false,
 questions: []
}

export default function(state = initState, action){
 switch(action.type){
  case GET_QUESTIONS:
   return{
    ...state,
    questions: action.payload
   }
  case ADD_QUESTION:
   return{
    ...state,
    questions: [action.payload, ...state.questions]
   }
  case DELETE_QUESTION:
   return{
    ...state,
    questions: state.questions.filter(question => question.q_id !== action.payload)
   }
  case TOGGLE_EDIT:
   return{
    ...state,
    editable: !state.editable
  }
  case GET_CARD_INFO:
  return{
   ...state,
   ...action.payload
  }
  case EDIT_QUESTION:
    return{
     ...state,
     questions: action.payload
    }
   case EDIT_ANSWER:
    return{
     ...state,
     questions: action.payload
    }
  default:
   return state
 }
}
import { QUESTIONS_LOADING, UNLOAD_QUESTIONS, GET_QUESTIONS, TOGGLE_EDIT, GET_CARD_INFO, ADD_QUESTION, EDIT_QUESTION, EDIT_ANSWER, DELETE_QUESTION } from '../actions/types'

const initState = {
 title: '',
 subject: '',
 set_id: '',
 editable: false,
 isLoading: false,
 isLoaded: false,
 questions: []
}

export default function(state = initState, action){
 switch(action.type){
  case QUESTIONS_LOADING:
    return{
     ...state,
     isLoading: true
    }
  case GET_QUESTIONS:
   return{
    ...state,
    questions: action.payload,
    isLoading: false,
    isLoaded: true
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
    case UNLOAD_QUESTIONS:
      return{
        ...state,
        isLoaded: false
      }
  default:
   return state
 }
}
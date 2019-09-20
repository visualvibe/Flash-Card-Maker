import { GET_CARDS, TOGGLE_EDIT, 
  CARDS_LOADING, ADD_CARD, 
  DELETE_CARD, HANDLE_EDIT_TITLE, 
  HANDLE_EDIT_SUBJECT, MAKE_FAVORITE } from '../actions/types'

const initState = {
 cards: [],
 editable: false,
 loading: false
}

export default function(state = initState, action){
 switch(action.type){
  case GET_CARDS:
   return{
    ...state,
    cards: action.payload
   }
   case ADD_CARD:
    return{
     ...state,
     cards: [action.payload, ...state.cards]
    }
   case DELETE_CARD:
    return{
     ...state,
     cards: state.cards.filter(card => card.set_id !== action.payload)
    }
   case TOGGLE_EDIT:
    return{
     ...state,
     editable: !state.editable
    }
   case CARDS_LOADING:
     return {
       ...state,
       loading: true
     }
   case HANDLE_EDIT_TITLE:
    return{
     ...state,
     cards: action.payload
    }
  case HANDLE_EDIT_SUBJECT:
    return{
      ...state,
      cards: action.payload
    }
  case MAKE_FAVORITE:
    return{
      ...state,
      cards: action.payload
    }
  default:
    return state }
}
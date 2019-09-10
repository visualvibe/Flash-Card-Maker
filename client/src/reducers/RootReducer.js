import { combineReducers} from 'redux'
import AuthReducer from './AuthReducer'
import ErrorReducer from './ErrorReducer'
import CardReducer from './CardReducer'
import QuestionReducer from './QuestionReducer'

export default combineReducers({
 auth: AuthReducer,
 error: ErrorReducer,
 cards: CardReducer,
 questions: QuestionReducer
})
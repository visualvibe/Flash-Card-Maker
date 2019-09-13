import { USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL} from '../actions/types'


const initState = {
 token: localStorage.getItem('usertoken'),
 isAuthenticated: null,
 isLoading: false,
 user: null
}

export default function(state = initState, action){
  switch(action.type){
    case USER_LOADING:
      return{
        ...state,
        isLoading: true
      }
    case USER_LOADED:
      return{
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return{
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      }
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('token')
      return{
        isAuthenticated: null,
        state: undefined,
        initState: null
      }
    default:
      return state
  }
}
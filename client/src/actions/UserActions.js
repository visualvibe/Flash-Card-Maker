import axios from 'axios'
import {returnErrors} from './ErrorActions'
import { USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL} from './types'

export const loadUser = () => (dispatch, getState) =>{
  dispatch({ type: USER_LOADING})

  //Get token from local storage
  const token = getState().auth.token

  // Headers
  const config = {
    headers: {
      "content-type": "application/json"
    }
  }

  if(token){
    config.headers['x-auth-token'] = token
  }

  console.log(tokenConfig)

}

// Login User
export const login = ({ username, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ username, password });

  
  axios.post('/api/login', body, config)
    .then(res =>{
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
      })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};
//Setup config/headers token
export const tokenConfig = getState =>{

  const token = getState().auth.token

  const config = {
    headers: {
      'content-type': 'application/json'
    }
  }

    if(token){
      config.headers['x-auth-token'] = token
    }

    return config
}

//Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};
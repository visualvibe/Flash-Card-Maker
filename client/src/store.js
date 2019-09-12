import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import RootReducer from './reducers/RootReducer'

const middleware = [thunk]

function saveToLocalStorage(state){
 try{
  const serializedState = JSON.stringify(state)
  localStorage.setItem('state', serializedState)
 }
 catch(e){
  console.log(e)
 }
}

function loadFromLocalStorage(){
 try{
  const serializedState = localStorage.getItem('state')
  if(serializedState === null) return undefined
  return JSON.parse(serializedState)
 }
 catch(e){
  console.log(e)
  return undefined
 }
}

const persistedState = loadFromLocalStorage()

const store = createStore(
 RootReducer, 
 persistedState, 
 compose(applyMiddleware(...middleware),
 window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f))

store.subscribe(() => saveToLocalStorage(store.getState()))
export default store
import React from 'react';
import { NavLink} from 'react-router-dom';
import Logout from './Logout'
import burger from '../images/burger.png'
import exit from '../images/x.png'

const UserNavBar = ({x, width, isBurgerActive, toggleBurger}) =>{
  
  if(width >= 1053){
    return(
    <div className={"user-navbar"}>
      <NavLink id="addcard-button" className="left-link" to={{
        pathname:   x + '/add/flashcard/'
      }}>
        Add Set
      </NavLink>
      <NavLink id="editcard-button" className="left-link" to={{
        pathname:  x + '/edit/flashcards/'
      }}>
        Edit Sets
      </NavLink>
      <NavLink id="studycard-button" className="left-link" to={{
        pathname:  x + '/study/flashcards/'
      }}>
        Study
      </NavLink>
      <NavLink id="quizcard-button" className="left-link" to={{
        pathname:  x + '/quiz/flashcards/'
      }}>
        Quiz
      </NavLink>
      <NavLink id="dnd-button" className="left-link" to={{
        pathname:  x + '/dnd/flashcards/'
      }}>
        Match Game
      </NavLink>
      
      <Logout />
    </div>
    )
  }else{
    return(
      <div className={"user-navbar burger"}>
          <button onClick={(e)=> {toggleBurger(e)}}>
            {isBurgerActive ? <img src={exit} alt=""></img> : <img src={burger} alt=""></img>}
          </button>
        <div className={isBurgerActive ? 'burger-menu dropped' : 'burger-menu'}>
          <NavLink onClick={(e)=> {toggleBurger(e)}} id="addcard-button" className="left-link" to={{
            pathname:   x + '/add/flashcard/'
          }}>
            Add Set
          </NavLink>
          <NavLink onClick={(e)=> {toggleBurger(e)}} id="editcard-button" className="left-link" to={{
            pathname:  x + '/edit/flashcards/'
          }}>
            Edit Sets
          </NavLink>
          <NavLink onClick={(e)=> {toggleBurger(e)}} id="studycard-button" className="left-link" to={{
            pathname:  x + '/study/flashcards/'
          }}>
            Study
          </NavLink>
          <NavLink onClick={(e)=> {toggleBurger(e)}} id="quizcard-button" className="left-link" to={{
            pathname:  x + '/quiz/flashcards/'
          }}>
            Quiz
          </NavLink>
          <NavLink id="dnd-button" className="left-link" to={{
            pathname:  x + '/dnd/flashcards/'
          }}>
            Match Game
          </NavLink>
          <Logout />
        </div>
      </div>
    )
  }
}

export default UserNavBar;
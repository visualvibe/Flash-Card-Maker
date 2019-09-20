import React from 'react';
import { NavLink} from 'react-router-dom';
import Logout from './Logout'

const UserNavBar = (x) =>{
  return(
  <div className="user-navbar">
    <NavLink id="addcard-button" className="left-link" to={{
      pathname:   x.x + '/add/flashcard/'
    }}>
      Add Set
    </NavLink>
    <NavLink id="editcard-button" className="left-link" to={{
      pathname:  x.x + '/edit/flashcards/'
    }}>
      Edit Sets
    </NavLink>
    <NavLink id="studycard-button" className="left-link" to={{
      pathname:  x.x + '/study/flashcards/'
    }}>
      Study
    </NavLink>
    <NavLink id="quizcard-button" className="left-link" to={{
      pathname:  x.x + '/quiz/flashcards/'
    }}>
      Quiz
    </NavLink>
    <Logout />
  </div>
  )
}

export default UserNavBar;
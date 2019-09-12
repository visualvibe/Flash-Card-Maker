import React from 'react';
import { NavLink} from 'react-router-dom';
import Logout from './Logout'

const UserNavBar = (x) =>{
  return(
  <div className="user-navbar">
    <NavLink id="addcard-button" className="left-link" to={{
      pathname:   x.x + '/add/flashcard/'
    }}>
      Add New Card
    </NavLink>
    <NavLink id="editcard-button" className="left-link" to={{
      pathname:  x.x + '/view/flashcards/'
    }}>
      Edit/View Cards
    </NavLink>
    <Logout />
  </div>
  )
}

export default UserNavBar;
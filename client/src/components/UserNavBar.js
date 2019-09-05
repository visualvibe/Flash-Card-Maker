import React from 'react';
import { NavLink} from 'react-router-dom';

const NavBar = () =>{
  return(
   <nav className="navigation">
    <ul>
     <li><NavLink to="/addcard">Add New Card</NavLink></li>
     <li><NavLink to="/viewcards">View/Edit Card</NavLink></li>
    </ul>
   </nav>
  )
}

export default NavBar;
import React from 'react';
import { NavLink} from 'react-router-dom';


const NavBar = () =>{
  return(
   <nav className="navigation">
    <ul>
     <li><NavLink to="/flashcard">Home</NavLink></li>
     <li><NavLink to="/flashcard/register">Register</NavLink></li>
    </ul>
   </nav>
  )
}

export default NavBar;
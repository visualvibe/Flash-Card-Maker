import React from 'react';
import { NavLink} from 'react-router-dom';


const NavBar = () =>{
  return(
   <nav className="navigation">
    <ul>
     <li><NavLink to="/">Home</NavLink></li>
     <li><NavLink to="/login ">Login</NavLink></li>
     <li><NavLink to="/register">Register</NavLink></li>
    </ul>
   </nav>
  )
}

export default NavBar;
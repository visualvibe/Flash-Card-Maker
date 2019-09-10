import React from 'react';
import Login from './Login'

const Home = () =>{
  return(
   <div className="home-container">
    <span>Welcome to Flash Cards Maker </span>
    <span style={{display: 'block'}}>This website is still a WIP, login with "test" for the username & password to see what I've done so far!</span>
    <div>
      <Login />
    </div>
   </div>
  )
}

export default Home;
import React from 'react'
import Login from './Login'
import Register from './Register'

const Home = ({activeIndex, isLoginVisible, isHomeVisible, toggleHome, isRegisterVisible, toggleLogin, toggleRegister}) =>{
  return(
    <div className="wrapper">
      <div className="home-main-container">
        <div className="home-left-container">
          <div className="home-buttons-container">
            <button id="home-button" className={activeIndex !== 0 ? 'left-link' : 'left-link active'} 
              onClick={ () => toggleHome(0)}>Home</button>
            <button id="login-button" className={activeIndex !== 1 ? 'left-link' : 'left-link active'} 
              onClick={ () => toggleLogin(1)}>Login</button>
            <button id="register-button" className={activeIndex !== 2 ? 'left-link' : 'left-link active'} 
              onClick={ () => toggleRegister(2)}>Register</button>
          </div>
      </div>
      <div className="home-right-container">
          <div>
          {isHomeVisible ?
            <div className="home-container">
              <div className="container-header" style={{padding: '0.2rem', height: '50px', background: 'none', boxShadow: 'none'}}>
                <h1 style={{color: 'black'}}>Welcome to Flash Cards Builder </h1>
              </div>
              <span style={{display: 'block'}}>This website is still a WIP, login with "test" for the username & password to see what I've done so far!</span> 
            </div> : null }
            {isRegisterVisible ? <Register /> : null }
            {isLoginVisible ? <Login /> : null }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
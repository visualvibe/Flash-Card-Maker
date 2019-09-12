import React, { Component } from 'react';
import axios from 'axios';


class Register extends Component{

 handleSubmit = (e) =>{
  e.preventDefault();
  const username = document.getElementById('username').value;
  const firstname = document.getElementById('firstname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
   axios({
     method: 'POST', 
     url:'/api/register', 
     'content-type': 'application/json',
     data: {
         username: username,   
         firstname: firstname,  
         email: email,
         password: password
     }
  }).then((response)=>{
      if (response.data.msg === 'Username or Email already in use!'){
       alert(response.data.msg); 
   }else if(response.data.msg === 'Successfully registered'){
       alert(response.data.msg);
       this.redirectLogin();
   }
   });
 }
 redirectLogin() {
  this.props.history.push("/flashcard/login");
}

  render(){
   return(
    <div className="register-container">
  
     <form className="login-form" onSubmit={this.handleSubmit.bind(this)} method='POST'>
      <div className="container-header login" >
        <h1>User Registration </h1>
      </div>
      <div className="login-form-bottom">
        <input placeholder="Username" type="text" id="username"/>
        <input placeholder="First Name" type="text" id="firstname"/>
        <input placeholder="Email" type="email" id="email"/>
        <input placeholder="Password" type="password" id="password"/>
      </div>    
      <div className="login-form-bottom2">
        <button type="submit">Register</button>
      </div>
     </form>
    </div>
   )
 }
}

export default Register;
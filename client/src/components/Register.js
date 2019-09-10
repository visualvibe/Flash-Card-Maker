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
     <span>Register Page</span>
     <form onSubmit={this.handleSubmit.bind(this)} method='POST'>
      <label>Username</label>
      <input type="text" id="username"/>
      <label>First Name</label>
      <input type="text" id="firstname"/>
      <label>Email</label>
      <input type="text" id="email"/>
      <label>Password</label>
      <input type="text" id="password"/>
      <button type="submit">Register</button>
     </form>
    </div>
   )
 }
}

export default Register;
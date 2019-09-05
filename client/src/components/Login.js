import React, { Component } from 'react';
import { login } from './UserFunctions';

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username : '',
      password: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e){
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    }

    login(user).then(res =>{
      if(res){
        this.props.history.push('/profile');
      }
    })
  }

 render(){
  return(
   <div className="login-container">
    <span>Login page</span>
    <form onSubmit={this.handleSubmit}>
      <label>Username</label>
      <input type="text" id="username" name="username" value={this.state.username}  onChange={this.onChange}/>
      <label>Password</label>
      <input type="password" id="password" name="password" value={this.state.password}  onChange={this.onChange}/>
      <button type="submit">Login</button>
     </form>
   </div>
  )
 }
}

export default Login;
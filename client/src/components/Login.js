import React, { Component } from 'react';
import { login } from '../actions/UserActions';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import compose from 'recompose/compose'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username : '',
      password: '',
      msg: null
    }
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = async(e) =>{
    e.preventDefault();
    const { username, password} = this.state
    const user = {
      username,
      password
    }
    await this.props.login(user)
    this.props.history.replace('/flashcard/' + username + '/edit/flashcards')
    /*
 
    login(user).then(res =>{
      if(res){
        this.props.history.push('/profile');
      }
    })
    */
  }

  render(){
    return(
      <div className="login-container">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <div className="container-header login">
            <h1>User Login</h1>
          </div>
          <div className="login-form-bottom">
            <input placeholder="Username" type="text" id="username" name="username" value={this.state.username}  onChange={this.onChange}/>
            <input placeholder="Password" type="password" id="password" name="password" value={this.state.password}  onChange={this.onChange}/>
        </div>
        <div className="login-form-bottom2">
          <button type="submit">Login</button>
        </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})
const enhance = compose(
  withRouter,
  connect(mapStateToProps, {login})
)
export default enhance(Login)
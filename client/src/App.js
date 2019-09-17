import React, { Component} from 'react';
import { Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Profile from './components/Profile';
import { connect } from 'react-redux';
import {getCards} from './actions/CardActions'
import { withRouter } from 'react-router-dom'
import compose from 'recompose/compose'

class App extends Component {
  
  state = {
    isLoginVisible: false,
    isRegisterVisible: false,
    isHomeVisible: true,
    activeIndex: 0
  }

  componentWillMount(){
    //Checks if user is logged in/authenticated
    if(this.props.isAuthenticated === true){
      this.props.history.push('/flashcard/' + this.props.username)
    } 
  }
  componentDidMount(){
    //Checks if user is logged in/authenticated
    if(this.props.isAuthenticated === true){
      this.props.history.push('/flashcard/' + this.props.username)
    } 
    //If user not authenticated/ push to main page
    if(this.props.isAuthenticated !== true){
      this.props.history.push('/flashcard/')
    } 
  }
  
  componentWillReceiveProps(){
    //Retrieves user data if user is authenticated
    if(this.props.isAuthenticated === true){
      this.props.getCards(this.props.user_id)
    } 
  
  }


  //Toggles Login component to view and mark button as active
  toggleLogin = (index) =>{
    this.setState({
      activeIndex: index,
      isLoginVisible: true,
      isRegisterVisible: false,
      isHomeVisible: false,
    })
  }

  //Toggles Register component to view and mark button as active
  toggleRegister = (index) =>{
    this.setState({
      activeIndex: index,
      isLoginVisible: false,
      isRegisterVisible: true,
      isHomeVisible: false
    })
  }

  //Toggles Home component to view and mark button as active
  toggleHome = (index) =>{
    this.setState({
      activeIndex: 0,
      isLoginVisible: false,
      isRegisterVisible: false,
      isHomeVisible: true
    })
  }


  render() {
    return (
    
          <div className="App">
            <div className="header">
              <div className="header-text">
                <span style={{fontWeight: 'lighter'}}>Flashcard <span style={{fontWeight: 'bolder'}}>Builder</span></span>
              </div>
            </div>
            <Switch>
              <Route exact path="/flashcard/"
                render={(props) => <Home {...props}
                isLoginVisible={this.state.isLoginVisible}
                isRegisterVisible={this.state.isRegisterVisible}
                isHomeVisible={this.state.isHomeVisible}
                toggleLogin={this.toggleLogin}
                toggleRegister={this.toggleRegister}
                toggleHome={this.toggleHome}
                activeIndex={this.state.activeIndex} /> } />
              <Route path="/flashcard/register" component={Register}/>
              <Route path="/flashcard/:username" component={Profile}/>
            </Switch>
          </div>

    );
  }
}

const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated,
  username: state.auth.username,
  user_id: state.auth.user_id
})
const enhance = compose(
  withRouter,
  connect(mapStateToProps, {getCards})
)
export default enhance(App);

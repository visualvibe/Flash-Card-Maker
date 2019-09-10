import React, { Component } from 'react'
import Card from './Card'
import AddCard from './AddCard'
import FlashCard from './FlashCard'
import Logout from './Logout'
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCards, toggleEdit, addCard, deleteCard, handleEditTitle, handleEditSubject } from '../actions/CardActions'
import { NavLink} from 'react-router-dom';
import UserNavBar from './UserNavBar';

class Profile extends Component{
  state = {
    isCardsVisible: false,
    isAddVisible: false
  }


  componentWillMount(){
    //Checks if user is logged in/authenticated
    if(this.props.isAuthenticated === true){
      this.props.getCards(this.props.user_id)
    }
  }

  //Toggles edit button
  toggleEditable = () =>{
    this.props.toggleEdit()
    var editable = document.getElementsByClassName('editable')
    editable.addClass('x')
  }

  render(){
    return(
      <div className="wrapper"> 
        <div className="container profile-container">
          <div className="profile-left-container">
              <div className="profile-left-container-header">
                <h1>Welcome {this.props.username}</h1>
              </div>
              <UserNavBar x={this.props.match.url}/>
          </div>
          
          <div className="container profile-right-container">
            
              <Switch>
                <Route 
                  path={`${this.props.match.path}/edit/flashcard/:card_id`} 
                  component={FlashCard} />
                <Route 
                  path={`${this.props.match.path}/add/flashcard/`} 
                  render={(props) => <AddCard {...props} 
                    addCard={this.props.addCard} 
                    thisUrl={this.props.match.url} /> } />
                <Route 
                  path={`${this.props.match.path}/view/flashcards/`} 
                  render={(props) => <Card {...props} 
                  cards={this.props.cards} 
                  removeCard={this.props.deleteCard}
                  getState={this.props.editable}
                  toggleEditable={this.toggleEditable}
                  handleEditTitle={this.props.handleEditTitle}
                  handleEditSubject={this.props.handleEditSubject}
                  x={this.props.match.url}
                  history={this.props.history} /> } />
              </Switch>
            
          </div>
        </div> 
      </div>
    )
  }
}

const mapStateToProps = state =>({
  cards: state.cards.cards,
  editable: state.cards.editable,
  isAuthenticated: state.auth.isAuthenticated,
  user_id: state.auth.user_id,
  username: state.auth.username
})

export default connect(mapStateToProps, {getCards, 
  toggleEdit, 
  addCard, 
  deleteCard,
  handleEditTitle,
  handleEditSubject })(Profile);
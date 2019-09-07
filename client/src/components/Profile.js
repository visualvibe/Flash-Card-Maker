import React, { Component } from 'react'
import Card from './Card'
import AddCard from './AddCard'
import FlashCard from './FlashCard'
import Logout from './Logout'
import { BrowserRouter,Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCards, toggleEdit, addCard, deleteCard, handleEditTitle, handleEditSubject } from '../actions/CardActions'


class Profile extends Component{
  state = {
    isCardsVisible: false,
    isAddVisible: false
  }


  componentDidMount(){
    this.props.getCards(this.props.user_id)
  }

  //Toggles edit button
  toggleEditable = () =>{
    this.props.toggleEdit()
  }

  render(){
    return(
        <div>
          <h2>Hi {this.props.username}</h2>
          
          <div className="user-buttons">
            <button onClick={() => this.setState({ isCardsVisible: true, isAddVisible: false })}>View Cards</button>
            <button onClick={() => this.setState({ isAddVisible: true, isCardsVisible: false })}>Add New Card</button>
            <button><Logout /></button>
          </div>
          {this.state.isCardsVisible ? <Card 
            cards={this.props.cards} 
            removeCard={this.props.deleteCard}
            getState={this.props.editable}
            toggleEditable={this.toggleEditable}
            handleEditTitle={this.props.handleEditTitle}
            handleEditSubject={this.props.handleEditSubject}
            x={this.props.match.url} />: null }

          {this.state.isAddVisible ? 
          <AddCard addCard={this.props.addCard} thisUrl={this.props.match.url}/> : null }
          
          <Switch>
            <Route path={`${this.props.match.path}/edit/flashcard/:card_id`} component={FlashCard}/>
          </Switch>
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
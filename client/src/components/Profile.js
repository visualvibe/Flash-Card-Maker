import React, { Component } from 'react'
import Card from './Card'
import AddCard from './AddCard'
import FlashCard from './FlashCard'
import ViewQuizCards from './quiz/ViewQuizCards'
import QuizCard from './quiz/QuizCard'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCards, toggleEdit, addCard, deleteCard, handleEditTitle, handleEditSubject } from '../actions/CardActions'
import UserNavBar from './UserNavBar'

class Profile extends Component{
  constructor(){
    super()
      this.state = {
        searchCard: ''
      }
  }

  /*
  componentWillMount(){
    if(this.props.isAuthenticated === undefined) {
      this.props.history.replace('/flashcard')
    }
  }
  */



  componentWillMount(){
    if(this.props.isAuthenticated === true){
      this.props.getCards(this.props.user_id)
    } 
  }
  componentWillReceiveProps(){
    //If user authenticated, retrieve data from redux store

    this.setState({
      searchCard: ''
    })
  }
  //Toggles edit button
  toggleEditable = () =>{
    this.props.toggleEdit()
    console.log(this.state)
  }

  handleSearch = (e) =>{
    this.setState({
      searchCard: e.target.value
    })

  }
  render(){
    //Filters card when user inputs value into search box
    let filteredCards = this.props.cards.filter((card) => {
      console.log(card)
      //Joins carc.title & card.subject into array
      var c = [card.title.toLowerCase(), card.subject.toLowerCase()]
      return c[0].includes(this.state.searchCard.toLowerCase())
    })
    return(
      <div className="wrapper"> 
        <div className="container profile-container">
          <div className="profile-left-container">
              <div className="profile-left-container-header">
                <h1 id="user-button">{this.props.username}</h1>
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
                  path={`${this.props.match.path}/edit/flashcards/`} 
                  render={(props) => <Card {...props} 
                  cards={filteredCards} 
                  removeCard={this.props.deleteCard}
                  getState={this.props.editable}
                  toggleEditable={this.toggleEditable}
                  handleEditTitle={this.props.handleEditTitle}
                  handleEditSubject={this.props.handleEditSubject}
                  x={this.props.match.url}
                  history={this.props.history}
                  handleSearch={this.handleSearch} /> } />
                <Route 
                  path={`${this.props.match.path}/study/flashcards/`} 
                  render={(props) => <ViewQuizCards {...props} 
                  cards={filteredCards} 
                  x={this.props.match.url}
                  history={this.props.history}
                  handleSearch={this.handleSearch} /> } />
                  <Route 
                  path={`${this.props.match.path}/study/flashcard/:card_id/`} 
                  component={QuizCard} /> } />
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
  username: state.auth.username,
  isLoading: state.auth.isLoading,
  token: state.auth.token
})

export default connect(mapStateToProps, {getCards, 
  toggleEdit, 
  addCard, 
  deleteCard,
  handleEditTitle,
  handleEditSubject })(Profile);
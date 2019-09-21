import React, { Component } from 'react'
import Card from './Card'
import AddCard from './AddCard'
import FlashCard from './FlashCard'
import ViewStudyCards from './study/ViewStudyCards'
import StudyCard from './study/StudyCard'
import ViewQuizCards from './quiz/ViewQuizCards'
import QuizCard from './quiz/QuizCard'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeFavorite, getCards, 
  toggleEdit, addCard, 
  deleteCard, handleEditTitle, 
  handleEditSubject, orderByFavorite, orderByOldest } from '../actions/CardActions'
import UserNavBar from './UserNavBar'

class Profile extends Component{
  constructor(props){
    super(props)
      this.state = {
        searchCard: '',
        orderBy: 0,
        orderedCards: [],
        activeIndex: 0,
        showInfo: false,
        activeCard: 0,
        toggleEdit: false
      }
  }

  componentDidUpdate(prevProps, nextProps){
    
    //if the previous cards is the same as the last then update cards
    if(JSON.stringify(prevProps.user_id) !== JSON.stringify(this.props.user_id) && this.props.isAuthenticated === true && this.props.isLoading == false){
      this.props.getCards(this.props.user_id)


    }
  }

  componentWillReceiveProps(){
    this.setState({
      searchCard: '',
      orderBy: 0
    })
  }


  componentWillMount(){
    //Checks if user is authenticated and if so make call to back end for data
    if(this.props.isAuthenticated === true){
      this.props.getCards(this.props.user_id)
    } 
  }

  

  showInfo = (e, i) =>{
    console.log(this.state.activeCard)
    console.log(this.state.showInfo)
    this.setState({
      showInfo: !this.state.showInfo,
      activeCard: i
    })
  }

  //Toggles edit button
  toggleEditable = (e, i) =>{
    e.preventDefault()
    this.setState({
      showInfo: 0,
      activeCard: i,
      toggleEdit: !this.state.toggleEdit    
    })
    this.props.toggleEdit()
  }

  //Handles search input
  handleSearch = (e) =>{
    this.setState({
      searchCard: e.target.value,
      orderBy: 0
    })
  }

  //Toggles favorite star
  handleMakeFavorite = (e, i) =>{
    e.preventDefault()
    this.props.makeFavorite(i);
  }

  //Handles the order by newest button
  orderByNewest = (e) =>{
    e.preventDefault()
    console.log("yeet")

    this.setState({
      orderBy: 0,
      searchCard: '',
      activeIndex: 0
    })
  }

  //Handles order by oldest button
  orderByOldest = (e) =>{
    e.preventDefault()
    orderByOldest(this.props.user_id).then(res=>{
      this.setState({
        orderedCards: res,
        orderBy: 1,
        activeIndex: 1
      })
    })
  }
  //Handles the order by favorite button
  orderByFavorite = (e) =>{
    e.preventDefault()

    orderByFavorite(this.props.user_id).then(res=>{
      this.setState({
        orderedCards: res,
        orderBy: 1,
        activeIndex: 2
      })
    })
  }


  render(){
    //Filters card when user inputs value into search box
    let filteredCards = this.props.cards.filter((card) => {
      //Joins carc.title & card.subject into array
      var c = [card.title.toLowerCase(), card.subject.toLowerCase()]
      return c[0].includes(this.state.searchCard.toLowerCase())
    })
    if (this.props.username === this.props.match.params.username) {
    return(
      <div className="wrapper"> 
        <div className="container profile-container">
          <div className="profile-left-container">
              <div className="profile-left-container-header">
                <h1 id="user-button" style={{fontFamily: 'Manjari, sans-serif', fontWeight: 'bold'}}>{this.props.username}</h1>
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
                  cards={this.state.orderBy === 0 ? filteredCards : this.state.orderedCards} 
                  removeCard={this.props.deleteCard}
                  getState={this.props.editable}
                  toggleEditable={this.toggleEditable}
                  handleEditTitle={this.props.handleEditTitle}
                  handleEditSubject={this.props.handleEditSubject}
                  x={this.props.match.url}
                  history={this.props.history}
                  handleSearch={this.handleSearch}
                  makeFavorite={this.handleMakeFavorite}
                  orderByFavorite={this.orderByFavorite}
                  orderByNewest={this.orderByNewest}
                  orderByOldest={this.orderByOldest}
                  activeIndex={this.state.activeIndex} 
                  showInfo={this.showInfo}
                  showInfoState={this.state.showInfo}
                  activeCard={this.state.activeCard}
                  showToggleEdit={this.state.toggleEdit} /> } />
                <Route 
                  path={`${this.props.match.path}/study/flashcards/`} 
                  render={(props) => <ViewStudyCards {...props} 
                  cards={this.state.orderBy === 0 ? filteredCards : this.state.orderedCards} 
                  x={this.props.match.url}
                  history={this.props.history}
                  handleSearch={this.handleSearch}
                  makeFavorite={this.handleMakeFavorite}
                  orderByFavorite={this.orderByFavorite}
                  orderByNewest={this.orderByNewest}
                  orderByOldest={this.orderByOldest}
                  activeIndex={this.state.activeIndex}
                  showInfo={this.showInfo}
                  showInfoState={this.state.showInfo}
                  activeCard={this.state.activeCard} /> } />
                  <Route 
                  path={`${this.props.match.path}/study/flashcard/:card_id/`} 
                  render={(props) => <StudyCard {...props} x={this.props.match.url}/> } />
                <Route 
                  path={`${this.props.match.path}/quiz/flashcards/`} 
                  render={(props) => <ViewQuizCards {...props} 
                  cards={this.state.orderBy === 0 ? filteredCards : this.state.orderedCards} 
                  x={this.props.match.url}
                  history={this.props.history}
                  handleSearch={this.handleSearch}
                  makeFavorite={this.handleMakeFavorite} 
                  orderByFavorite={this.orderByFavorite}
                  orderByNewest={this.orderByNewest}
                  orderByOldest={this.orderByOldest}
                  activeIndex={this.state.activeIndex} /> } />
                <Route 
                  path={`${this.props.match.path}/quiz/flashcard/:card_id/`} 
                  render={(props) => <QuizCard {...props} 
                  x={this.props.match.url} /> } />
              </Switch>
          </div>
        </div> 
      </div>
      )
    } else{
      return(
        <div className="loading-container">
          <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      )
    }
    
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
  handleEditSubject,
  makeFavorite })(Profile);
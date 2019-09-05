import React, { Component } from 'react'
import Card from './Card'
import AddCard from './AddCard'
import UserNavBar from './UserNavBar'
import FlashCard from './FlashCard'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Redirect} from 'react-router'
import {push} from 'react-router-redirect';

class Profile extends Component{
  constructor(){
    super()
    this.state = {
      user_id: '',
      first_name: '',
      email: '',
      cards: localStorage.getItem('cards'),
      editable: false
    }
  }

  componentWillMount(){
    localStorage.getItem('cards') && this.setState({
      cards: JSON.parse(localStorage.getItem('cards'))
    })
  }
  componentDidMount(){
    const token = localStorage.usertoken;

    const decoded = jwt_decode(token);
    this.setState({
      user_id: decoded.user_id,
      first_name: decoded.first_name,
      email: decoded.email
      
    });
    //Post method to retrieve/view cards
    axios({
      method: 'POST', 
      url:'/cards', 
      'content-type': 'application/json',
      data: {
        user_id: decoded.user_id
      }
      }).then(res =>  {
          localStorage.setItem('cards', JSON.stringify(res.data))
          const n = localStorage.getItem('cards')
          const cards = JSON.parse(n)
          this.setState({cards: cards});
      })
  }

  componentWillUpdate(nextProps, nextState){
    console.log(nextState.cards)
    localStorage.setItem('cards', JSON.stringify(nextState.cards))

  }

  //Function that handles adding a new card
  addCard = (card) =>{
    axios({
      method: 'POST', 
      url:'/addcard', 
      'content-type': 'application/json',
      data: {
        user_id: this.state.user_id,
        title: card.title,
        subject: card.subject
    }
    }).then(res =>  {
      var newCard = {
      set_id: res.data.insertId,
      title: card.title,
      subject: card.subject,
      user_id: this.state.user_id
      }
      let cards = [...this.state.cards, newCard]
      this.setState({cards: cards})
      card.set_id = res.data.insertId
      
      this.props.history.push({
        pathname: '/flashcard/' + card.set_id,
        state: 
        this.state
    
      });
    });
  }

  //Function that handles removing a card
  removeCard = (id) =>{
    axios({
      method: 'POST', 
      url:'/removecard', 
      'content-type': 'application/json',
      data: {
      set_id: id
    }
    }).then(res =>  {
      let cards = this.state.cards.filter(card => {
      return card.set_id !== id
    })
    this.setState({cards: cards})
  });
  }

  //Toggles edit button
  toggleEditable = () =>{
    this.setState({ editable: !this.state.editable });
  }

  //Function that Edits card title
  handleEditTitle = (e, index) =>{
    axios({
    method: 'POST', 
    url:'/edittitle', 
    'content-type': 'application/json',
    data: {
      title: e.target.value,
      set_id: index
    }
    }).then(res =>  {
      var card = [...this.state.cards]
      var i = card.findIndex(obj => obj.set_id === index)
      card[i].title = e.target.value
      this.setState({card})
    });
  }

  //Function that edits subject title
  handleEditSubject = (e, index) =>{
    axios({
    method: 'POST', 
    url:'/editSubject', 
    'content-type': 'application/json',
    data: {
      subject: e.target.value,
      set_id: index
    }
    }).then(res =>  {
      var card = [...this.state.cards]
      var i = card.findIndex(obj => obj.set_id === index)
      card[i].subject = e.target.value
      this.setState({card})
    });
  }

  render(){
    return(
      <BrowserRouter>
        <div>
          <UserNavBar />
          <h2>Hi {this.state.first_name}</h2>
          <Switch>
            <Route path="/addcard" render={props => <AddCard addCard={this.addCard}/>} />
            <Route path="/viewcards" render={props =>
            <Card cards={this.state.cards} 
              removeCard={this.removeCard}
              getState={this.state.editable}
              toggleEditable={this.toggleEditable}
              handleEditTitle={this.handleEditTitle}
              handleEditSubject={this.handleEditSubject} />} />
              <Route path="/flashcard/:card_id" component={FlashCard}/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default Profile;
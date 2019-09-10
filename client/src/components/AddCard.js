import React, {Component} from 'react'
import { withRouter } from 'react-router-dom';

class AddCard extends Component{
 constructor(props){

  super(props)
  this.state = {
   title: '',
   subject: '',
   user_id: ''
  }
 }

 //Updates the state whenever a change is made in the input boxes
 handleChange = (e) =>{
  this.setState({
   [e.target.id]: e.target.value
  })
 }

  //Calls addCard function in Profile.js
  handleSubmit =  (e) =>{
    e.preventDefault()
    this.props.addCard(this.state).then(res =>{
      if(res){
        console.log(res.data.insertId)
        this.props.history.replace(this.props.thisUrl + '/edit/flashcard/' + res.data.insertId)
      }
    })
  }

  render(){
    return(
    <div className="inside-wrapper">
      <div className="add-container">
      <div className="container-header">
        <h1>Add new card</h1>
      </div>
      <form onSubmit={this.handleSubmit.bind(this)} method='POST'>
          <label>Title</label>
          <input type="text" id="title" onChange={this.handleChange}/>
          <label>Subject</label>
          <input type="text" id="subject" onChange={this.handleChange}/>

          <button type="submit">Add</button>
        </form>
      </div>
    </div>
    )
  }
}

export default withRouter(AddCard);
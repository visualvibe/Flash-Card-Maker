import React, {Component} from 'react'

class AddQuestion extends Component{
 constructor(props){
  super(props)
  this.state = {
   question: '',
   answer: '',
  }
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
 }

 //Updates the state whenever a change is made in the input boxes
 handleChange = (e) =>{
  this.setState({
   [e.target.id]: e.target.value
  })
 }

 //Calls addCard function in Profile.js
 handleSubmit = (e) =>{
  e.preventDefault()
  this.props.addQuestion(this.state, this.props.set_id)
 }

 render(){
  return(
   <div className="addquestion-container">
   <h1>Add new question</h1>
    <form className="addquestion-form" onSubmit={this.handleSubmit.bind(this)} method='POST'>
      <div className="addquestion-form-container">
        <textarea placeholder="Enter question..." type="text" id="question" onChange={this.handleChange}/>
      </div>
      <div>
        <textarea placeholder="Enter answer..."type="text" id="answer" onChange={this.handleChange}/>
      </div>
      <button type="submit">Add</button>
    </form>
   </div>
  )
 }
}

export default AddQuestion;
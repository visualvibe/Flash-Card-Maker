import React, {Component} from 'react'
import axios from 'axios'
import Question from './Question'
import AddQuestion from './AddQuestion'

class FlashCard extends Component{
 constructor(){
  super()
  this.state = {
   title: '',
   subject: '',
   set_id: '',
   editable: false,
   questions: []
  }
  this.addQuestion = this.addQuestion.bind(this);
  this.removeQuestion = this.removeQuestion.bind(this);
  this.handleEditAnswer = this.handleEditAnswer.bind(this);
  this.handleEditQuestion = this.handleEditQuestion.bind(this);

 }


 
 //Fills the state with user flashcard/question/answer
 componentDidMount(){
  console.log(this.props)
  let id = this.props.match.params.card_id;
  console.log(id)
   //API call to backend
   axios({
    method: 'POST', 
    url:'/cards/questions', 
    'content-type': 'application/json',
    data: {
        set_id: id
    }
  }).then(res =>  {
   //After getting response, populate the state
   this.setState({questions: res.data});
   this.setState({
    title: this.props.location.state.title,
    subject: this.props.location.state.subject,
    set_id: id
   })
  }) 
 }
 
 //Function that handles adding a new question
 addQuestion = (question) =>{
  axios({
   method: 'POST', 
   url:'/addquestion', 
   'content-type': 'application/json',
   data: {
       q_value: question.question,
       q_answer: question.answer,
       set_id: this.state.set_id
   }
 }).then(res =>  {
  var newQuestion = {
   q_id: res.data.insertId,
   q_value: question.question,
   q_answer: question.answer,
   set_id: this.state.set_id,
  }
  let questions = [...this.state.questions, newQuestion]
  this.setState({questions: questions})
 });
 }

 //Function that handles removing a question
 removeQuestion = (id) =>{
  axios({
   method: 'POST', 
   url:'/removequestion', 
   'content-type': 'application/json',
   data: {
       q_id: id
   }
 }).then(res =>  {
  let questions = this.state.questions.filter(question => {
   return question.q_id !== id
  })
  this.setState({questions: questions})
 });

 }
 
 //Function that handles editing answer
 handleEditAnswer = (e, index) =>{
  axios({
   method: 'POST', 
   url:'/editanswer', 
   'content-type': 'application/json',
   data: {
       q_answer: e.target.value,
       q_id: index
   }
 }).then(res =>  {
  var question = [...this.state.questions]
  var i = question.findIndex(obj => obj.q_id === index)
  question[i].q_answer = e.target.value
  this.setState({question})
 });
 }

 //Function that handles Editing a Question
 handleEditQuestion = (e, index) =>{
  axios({
   method: 'POST', 
   url:'/editquestion', 
   'content-type': 'application/json',
   data: {
       q_value: e.target.value,
       q_id: index
   }
 }).then(res =>  {
  var question = [...this.state.questions]
  var i = question.findIndex(obj => obj.q_id === index)
  question[i].q_value = e.target.value
  this.setState({question})
 });
 }

 //Toggles the edit button for question/answer edit
 toggleEditable = () =>{
  this.setState({ editable: !this.state.editable });
 }

 render(){

  return(
   <div>
   <h1>Title -{this.state.title} Subject - {this.state.subject} </h1>
   <AddQuestion addQuestion={this.addQuestion} />
   <Question questions={this.state.questions} 
    removeQuestion={this.removeQuestion} 
    handleEditAnswer={this.handleEditAnswer} 
    handleEditQuestion={this.handleEditQuestion}
    getState={this.state.editable}
    toggleEditable={this.toggleEditable} />
   </div>
  )
 }
}

export default FlashCard
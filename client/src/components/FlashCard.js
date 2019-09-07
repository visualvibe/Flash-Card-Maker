import React, {Component} from 'react'
import axios from 'axios'
import Question from './Question'
import AddQuestion from './AddQuestion'
import { connect } from 'react-redux';
import { getQuestions, getCardInfo, toggleEdit, addQuestion, removeQuestion, handleEditQuestion, handleEditAnswer} from '../actions/QuestionActions'

class FlashCard extends Component{

 componentDidUpdate(){
  this.props.getQuestions(this.props.match.params.card_id)
  this.props.getCardInfo(this.props.match.params.card_id)

 }

 componentDidMount(){

 }
 

 //Toggles the edit button for question/answer edit
 toggleEditable = () =>{
  this.props.toggleEdit()
}


 render(){
  return(
   <div>
   <h1>Title: {this.props.title} Subject: {this.props.subject}  </h1>
   <AddQuestion addQuestion={this.props.addQuestion} set_id={this.props.set_id}/>
   <Question questions={this.props.questions} 
    removeQuestion={this.props.removeQuestion} 
    handleEditAnswer={this.props.handleEditAnswer} 
    handleEditQuestion={this.props.handleEditQuestion}
    getState={this.props.editable}
    toggleEditable={this.toggleEditable} />
   </div>
  )
 }
}

const mapStateToProps = state =>({
 questions: state.questions.questions,
 editable: state.questions.editable,
 title: state.questions.title,
 subject: state.questions.subject,
 set_id: state.questions.set_id,
 isAuthenticated: state.auth.isAuthenticated

})

export default connect(mapStateToProps, 
 {
  getQuestions,
  addQuestion, 
  toggleEdit,
  removeQuestion,
  getCardInfo,
  handleEditAnswer,
  handleEditQuestion
 })(FlashCard)
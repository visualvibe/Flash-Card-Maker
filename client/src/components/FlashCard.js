import React, {Component} from 'react'
import Question from './Question'
import AddQuestion from './AddQuestion'
import { connect } from 'react-redux';
import { getQuestions, getCardInfo, toggleEdit, addQuestion, removeQuestion, handleEditQuestion, handleEditAnswer} from '../actions/QuestionActions'

class FlashCard extends Component{

componentWillReceiveProps(){
  this.props.getQuestions(this.props.match.params.card_id)
  this.props.getCardInfo(this.props.match.params.card_id)
}

 componentDidMount(){
  this.props.getQuestions(this.props.match.params.card_id)
  this.props.getCardInfo(this.props.match.params.card_id)
 }
 

 //Toggles the edit button for question/answer edit
 toggleEditable = () =>{
  this.props.toggleEdit()
}


 render(){
  return(
    <div>
      <div className="container-header ">
        <h1>{this.props.title} <span style={{ color: 'darkgrey' }}>{this.props.subject}  </span></h1>

      </div>
      <Question questions={this.props.questions} 
      removeQuestion={this.props.removeQuestion} 
      handleEditAnswer={this.props.handleEditAnswer} 
      handleEditQuestion={this.props.handleEditQuestion}
      getState={this.props.editable}
      toggleEditable={this.toggleEditable} />
      <AddQuestion addQuestion={this.props.addQuestion} set_id={this.props.set_id}/>

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
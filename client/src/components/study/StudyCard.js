import React, {Component} from 'react'
import { connect } from 'react-redux';
import Study from './Study'
import { getQuestions, getCardInfo} from '../../actions/QuestionActions'


class StudyCard extends Component {
 constructor(){
  super()
  this.state ={
   activeIndex: 0,
   isQuestionVisible: true,
   animation: 0
  }
 }
 
 componentDidMount(){
  this.props.getQuestions(this.props.match.params.card_id)
  this.props.getCardInfo(this.props.match.params.card_id)
}

 //Handles the clicking of previous button
 handleNext = (e, i) =>{
  this.setState({
   activeIndex: i,
   isQuestionVisible: true,
   animation: 0
  })
 }
  //Handles the clicking of next button
  handleBefore = (e, i) =>{
   this.setState({
    activeIndex: i,
    isQuestionVisible: true,
    animation: 0
   })
 }

 //Handles clicking show question
 handleShowQuestion = () =>{
  this.setState({
   isQuestionVisible: true,
   animation: 1
  })
 }

 //Handles clicking show answer
 handleShowAnswer = (e) =>{
  this.setState({
   isQuestionVisible: false,
   animation: 1
  })
 }
 
 render(){
  return(
  <div className="container questions">
   <div className="container-header">
          <h1 style={{fontFamily: 'Manjari', padding: '0.4rem'}}><span style={{ color: '#9c9996', fontSize: '1rem' }}> Title</span> {this.props.title} <span style={{ color: '#9c9996', fontSize: '1rem' }}> Subject</span> {this.props.subject} <span style={{ color: '#9c9996', fontSize: '1rem' }}> Questions</span> {this.props.questions.length}</h1>
    </div>
    <Study questions={this.props.questions} activeIndex={this.state.activeIndex}
     handleNext={this.handleNext} handleBefore={this.handleBefore}
     handleShowQuestion={this.handleShowQuestion} handleShowAnswer={this.handleShowAnswer}
     isQuestionVisible={this.state.isQuestionVisible} isAnswerVisible={this.state.isAnswerVisible}
     animation={this.state.animation}/>
  </div>
  )
 }

}
const mapStateToProps = state =>({
 questions: state.questions.questions,
 title: state.questions.title,
 subject: state.questions.subject,
 set_id: state.questions.set_id,

})
export default connect(mapStateToProps, 
 {
   getQuestions,
   getCardInfo,
 })(StudyCard)
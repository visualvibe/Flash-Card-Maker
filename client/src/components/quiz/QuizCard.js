import React, {Component} from 'react'
import { connect } from 'react-redux';
import Quiz from './Quiz'
import { getQuestions, getCardInfo} from '../../actions/QuestionActions'


class QuizCard extends Component {
 constructor(){
  super()
  this.state ={
   activeIndex: 0,
   isQuestionVisible: true
  }
 }
 
 componentDidMount(){
  this.props.getQuestions(this.props.match.params.card_id)
  this.props.getCardInfo(this.props.match.params.card_id)
}

 handleNext = (e, i) =>{
  this.setState({
   activeIndex: i
  })
 }
  handleBefore = (e, i) =>{
   this.setState({
    activeIndex: i
   })
 }

 handleShowQuestion = () =>{
  this.setState({
   isQuestionVisible: true,
  })
 }
 handleShowAnswer = (e) =>{
  this.setState({
   isQuestionVisible: false,
  })
 }
 
 render(){
  return(
  <div className="container questions">
   <div className="container-header">
          <h1 style={{fontFamily: 'Manjari', padding: '0.4rem'}}><span style={{ color: '#9c9996', fontSize: '1rem' }}> Title</span> {this.props.title} <span style={{ color: '#9c9996', fontSize: '1rem' }}> Subject</span> {this.props.subject} <span style={{ color: '#9c9996', fontSize: '1rem' }}> Questions</span> {this.props.questions.length}</h1>
    </div>
    <Quiz questions={this.props.questions} activeIndex={this.state.activeIndex}
     handleNext={this.handleNext} handleBefore={this.handleBefore}
     handleShowQuestion={this.handleShowQuestion} handleShowAnswer={this.handleShowAnswer}
     isQuestionVisible={this.state.isQuestionVisible} isAnswerVisible={this.state.isAnswerVisible}/>
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
 })(QuizCard)
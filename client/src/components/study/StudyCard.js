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

  componentDidUpdate(prev){
    //Checks if the previous props is same as current and then calls back end
    if(JSON.stringify(prev.questions) === (this.props.questions)){
      this.loadData()
    }
  }

  componentWillMount(){

    this.loadData()
  }

loadData = async () =>{
  await this.props.getQuestions(this.props.match.params.card_id)
  await   this.props.getCardInfo(this.props.match.params.card_id)
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

  //Handles redirect of flashcard set if set does not container at least 1 question
  pushBack = () => {
    setTimeout(() => {
      this.props.history.replace(this.props.x + '/study/flashcards/')
    }, 3000)
  }

  render(){
    if(this.props.questions.length != 0){
      if (this.props.questions[0].set_id == this.props.match.params.card_id) {
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
    else{
      return(
        <div className="loading-container">
          <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      )
    }
  }else{
    return(
      <div className="loading-container">
        <span>There is nothing to study! Perhaps add some questions/answers to this flashcard set. </span>
        <span>Redirecting in 3 seconds...</span>
        {this.pushBack()}
    </div>
    )
    }
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
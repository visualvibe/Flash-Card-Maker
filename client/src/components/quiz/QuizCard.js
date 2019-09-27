import React, {Component} from 'react'
import { connect } from 'react-redux';
import Quiz from './Quiz'
import { getQuestions, getCardInfo, unloadQuestions} from '../../actions/QuestionActions'
import {shuffleQuestions} from './Shuffle'
import EndGameModal from './modals/EndGameModal'
import AfterQuestionModal from './modals/AfterQuestionModal'



class QuizCard extends Component {
  

  constructor(props){
  super(props)

  this.state = {
    set_id: '',
    activeIndex: 0,
    isQuestionVisible: true,
    dataSet: [],
    correct: 0,
    incorrect: 0,
    wasCorrect: false,
    title: '',
    subject: '',
    correctAnswer: '',
    currentQuestion: '',
    isDialogOpen: false,
    isAfterQuestionDialogOpen: false
  }
  

  }
  
  
  //Runs whenever the component updates
  async componentDidUpdate(prevProps, nextProps){
    //Compares if the previous questions is the same as the current questions
    //Runs if it isn't, so it loads new data
    if(JSON.stringify(prevProps.questions) !== JSON.stringify(this.props.questions)){
      await this.loadData()    
    }
  }
  
  

  //Runs when page initially renders, filling the the state with data
  async componentDidMount(){
    await this.props.getQuestions(this.props.match.params.card_id)
    await this.props.getCardInfo(this.props.match.params.card_id)
    this.loadData()
  }


  //Function that loads data
  loadData = async () =>{
    await this.props.getQuestions(this.props.match.params.card_id)
    await this.props.getCardInfo(this.props.match.params.card_id)
    let shuffledQuestions = [...this.props.questions]

    //Shuffles the questions/answers into new array
    shuffleQuestions(shuffledQuestions).then(data =>{
      this.setState({
        dataSet: data,
      })
    })
  }

  //Handles the answer selection of quez
  handleClick = (e, answer, index) =>{
    e.preventDefault()
    

    if(this.state.dataSet[index].q_id === answer.q_id){

      this.setState({
        correct: this.state.correct + 1,
        isAfterQuestionDialogOpen: true,
        wasCorrect: true,

      })
    } else{
      this.setState({
        incorrect: this.state.incorrect + 1,
        isAfterQuestionDialogOpen: true,
        wasCorrect: false,
        correctAnswer: this.state.dataSet[index].q_answer,
        currentQuestion: this.state.dataSet[index].q_value
      })
    }
    //Ends game showing modal of final score

  }


  handleClose = (e, i) =>{
    this.setState({ 
      isAfterQuestionDialogOpen: false,
      activeIndex: this.state.activeIndex + 1
    })
     //Ends game showing modal of final score
    if(i === this.state.dataSet.length-1){
      this.openDialog()
    }
  }
  openDialog = () => this.setState({ isDialogOpen: true })


  //Handles redirect of flashcard set if set does not container at least 4 questions
  pushBack = () => {
    setTimeout(() => {
      this.props.history.replace(this.props.x + '/quiz/flashcards/')
    }, 3000);
  }

  //Handles play again button
  handlePlayAgain = (e) =>{
    e.preventDefault()
    this.props.history.replace(this.props.x + '/quiz/flashcards/')

  } 

  render(){
    if(this.props.questions.length >= 4){
      if (this.props.questions[0].set_id == this.props.match.params.card_id) {
      return(
      <div className="container questions">
        <div className="container-header">
              <h1 style={{fontFamily: 'Manjari', padding: '0.4rem'}}><span style={{ color: '#9c9996', fontSize: '1rem' }}> Title</span> {this.props.title} <span style={{ color: '#9c9996', fontSize: '1rem' }}> Subject</span> {this.props.subject} <span style={{ color: '#9c9996', fontSize: '1rem' }}> Questions</span> {this.props.questions.length}</h1>
        </div>
        {this.state.isDialogOpen == false &&(
          <div className="quiz-score-container">
          <span className={this.state.correct > this.state.incorrect ? 'green' : '' }>Correct: {this.state.correct} </span>
          <span className={this.state.correct >= this.state.incorrect ? '' : 'red' }>Incorrect: {this.state.incorrect} </span>
        </div>
        )}
        {this.state.isDialogOpen == true &&(
          <EndGameModal handlePlayAgain={this.handlePlayAgain} correct={this.state.correct} totalQuestions={this.state.dataSet.length}/>
        )}
        {this.state.isAfterQuestionDialogOpen == true &&(
          <AfterQuestionModal handleClose={this.handleClose} activeIndex={this.state.activeIndex} wasCorrect={this.state.wasCorrect} correctAnswer={this.state.correctAnswer} currentQuestion={this.state.currentQuestion}/>
        )}
        <Quiz questions={this.state.dataSet} activeIndex={this.state.activeIndex}
          handleClick={this.handleClick} isAfterQuestionDialogOpen={this.state.isAfterQuestionDialogOpen} />
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
    } else{
      return(
        <div className="loading-container">
          <span>This flashcard set does not have at least 4 questions! </span>
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
   unloadQuestions
 })(QuizCard)
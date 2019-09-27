import React, { Component } from 'react'
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd'
import { getQuestions, getCardInfo } from '../../actions/QuestionActions'
import DropZone from './DropZone'
import {move, shuffle, GAME_STATE, getTimeLeft, getSeconds, GAME_DURATION} from './custom/util'
import EndGameModal from './modals/EndGameModal'

const initState = {
  question1: [],
  question2: [],
  question3: [],
  question4: [],
  question5: [],
  question6: [],
  answers: [],
  numCorrect: 0,
  isEndGameModalOpen: false,
  gameState: GAME_STATE.READY,
  timeLeft: 0
}

class DNDGame extends Component {
  
  state = initState

  //Runs whenever the component updates
  async componentDidUpdate(prevProps, nextProps){
    //Compares if the previous questions is the same as the current questions
    //Runs if it isn't, so it loads new data
    if(JSON.stringify(prevProps.questions) !== JSON.stringify(this.props.questions)){
      await this.loadData()    
    }
  }
  //Runs when page initially renders, filling the the state with data
  componentDidMount(){
    this.loadData()
    this.startGame()
  }

  componentWillUnmount(){
    this.setState(initState)
  }

  startGame = () => {

    this.currentDeadline = Date.now() + GAME_DURATION(this.props.location.state.timerValue);

    this.setState(
      {
        gameState: GAME_STATE.PLAYING,
        timeLeft: getTimeLeft(this.currentDeadline),
      },
      this.gameLoop
    );
  };

  gameLoop = () => {
    this.timer = setInterval(() => {
      const timeLeft = getTimeLeft(this.currentDeadline);
      const isTimeout = timeLeft <= 0;
      if (isTimeout && this.timer) {
        clearInterval(this.timer);
      }

      this.setState({
        timeLeft: isTimeout ? 0 : timeLeft,
        ...(isTimeout ? { gameState: GAME_STATE.DONE, isEndGameModalOpen: true } : {}),
      });
    }, 1000);
  };

  //Function that loads data
  loadData = async () =>{
    await this.props.getQuestions(this.props.match.params.card_id)
    await this.props.getCardInfo(this.props.match.params.card_id)
    let shuffleQuestions = [...this.props.questions]

    //Shuffles questions
    let shuffledQuestions = await shuffle(shuffleQuestions)
    //Prepares shuffled questions to store into state
    let stateQuestions = shuffledQuestions.map(question =>({
      question: question.q_value,
      id: question.q_id,
      isQuestion: true,
      isCorrect: false
    }))
    //Prepares shuffled answers to store into state
    let stateAnswers = shuffledQuestions.slice(0,10).map((question, i) => (
      {
      question: question.q_answer,
      id: question.q_id
    }))
    //Stores shuffled questions/answers into state
    this.setState({
      answers: stateAnswers
    })
    for(let i = 1; i<=6; i++){
      let y = 'question' + i
      this.setState({
        [y]: [stateQuestions[i]]
      })
    }
  }

  //Function to handle the end of a drag
  onDragEnd = ({ source, destination }) => {
    if (!destination) {
      return;
    }
    this.setState(state => {
      return move(state, source, destination);
    });
  };

  //Handles redirect of flashcard set if set does not container at least 4 questions
  pushBack = () => {
    setTimeout(() => {
      this.props.history.replace(this.props.x + '/dnd/flashcards/')
    }, 3000);
  }

  //Handles submit
  handleSubmit = () =>{
    for(let i=1; i<=6; i++){
      let x = 'question' + i
      //Checks if question state has two elements inside
      if(this.state[x].length == 2){
        //Compares two elements if same q_id then correct answer
        if(this.state[x][0].id === this.state[x][1].id){
          this.state[x][0].isCorrect = true
          this.setState({
            numCorrect: this.state.numCorrect + 1,
          })
        }
      } else{
        continue
      }
    }
  this.setState({
    isEndGameModalOpen: true,
    gameState: GAME_STATE.DONE,
    timeLeft: 0
  })
  //Ends timer if user clicks submit
  clearInterval(this.timer)
  }

  //handles play again button
  handlePlayAgain = (e) =>{
    e.preventDefault()
    this.props.history.replace(this.props.x + '/dnd/flashcards/')
  } 

  handleClose = (e) =>{
    this.setState({
      isEndGameModalOpen: false
    })
  }

  render(){
    if(this.props.questions.length >= 6){
      if (this.props.questions[0].set_id == this.props.match.params.card_id) {
        return(
          <>
            {this.state.isEndGameModalOpen === true &&(
              <EndGameModal handleClose={this.handleClose} correct={this.state.numCorrect}/>
            )}
            <div className="view-quiz-header dndgame">
              <h1>Match the questions with their correct answers</h1>
              <div className="dnd-container">
                <p>Time left: {getSeconds(this.state.timeLeft)}s</p>
                {this.state.gameState === GAME_STATE.DONE ?
                  <button onClick={this.handlePlayAgain}>Play Again</button>
                :
                  <button onClick={this.handleSubmit}>Submit</button>
                }
              </div>
            </div>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <div className="dnd">
                <div className="dnd-questions-container">
                  <span id="dnd-question-header">Questions</span>
                  <DropZone 
                    id="question1"
                    questions={this.state.question1}
                    questionsLength={this.state.question1.length}
                    gameState={this.state.gameState}
                    isDragDisabled={true}
                  />
                  <DropZone 
                    id="question2"
                    questions={this.state.question2}
                    questionsLength={this.state.question2.length}
                    gameState={this.state.gameState}
                    isDragDisabled={true}
                  />
                  <DropZone 
                    id="question3"
                    questions={this.state.question3}
                    questionsLength={this.state.question3.length}
                    gameState={this.state.gameState}
                    isDragDisabled={true}
                  />
                  <DropZone 
                    id="question4"
                    questions={this.state.question4}
                    questionsLength={this.state.question4.length}
                    gameState={this.state.gameState}
                    isDragDisabled={true}
                  />
                  <DropZone 
                    id="question5"
                    questions={this.state.question5}
                    questionsLength={this.state.question5.length}
                    gameState={this.state.gameState}
                    isDragDisabled={true}
                  />
                  <DropZone 
                    id="question6"
                    questions={this.state.question6}
                    questionsLength={this.state.question6.length}
                    gameState={this.state.gameState}
                    isDragDisabled={true}
                  />
                </div>
                <div className="dnd-answers-container">
                <span id="dnd-question-header">Answers</span>
                  <DropZone 
                    id="answers"
                    questions={this.state.answers}
                    gameState={this.state.gameState}
                    isDragDisabled={false}
                  />
                </div>
              </div>
            </DragDropContext>
          </>
      )}
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
          <span>This flashcard set does not have at least 6 questions! </span>
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
  {getQuestions, getCardInfo})(DNDGame)
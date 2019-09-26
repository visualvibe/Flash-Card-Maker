import React, { Component } from 'react'
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd'
import { getQuestions, getCardInfo } from '../../actions/QuestionActions'
import DropZone from './DropZone'
import {move, shuffle} from './custom/util'
import {CARDS} from './custom/data'

class DNDGame extends Component {
  constructor(){
    super()
    this.state = {
      question1: [{question: '', id: '', isQuestion: true}],
      question2: [{question: '', id: '', isQuestion: true}],
      question3: [{question: '', id: '', isQuestion: true}],
      question4: [{question: '', id: '', isQuestion: true}],
      question5: [{question: '', id: '', isQuestion: true}],
      question6: [{question: '', id: '', isQuestion: true}],
      answers: [
        {question: '2', id: '1'},
        {question: '4', id: '2'},
        {question: '6', id: '3'}
      ],
      y: [{question: '1+1', id: '1', isQuestion: true},
          {question: '2+2', id: '2', isQuestion: true}]
    }
  }
  componentDidMount(){
    this.loadData()

    let stateQuestions = this.props.questions.map(question =>({
      question: question.q_value,
      id: question.q_id,
      isQuestion: true
    }))

    let stateAnswers = this.props.questions.map(question => ({
      question: question.q_answer,
      id: question.q_id
    }))

    this.setState({answers: stateAnswers})

    for(let i = 1; i<=6; i++){
      let y = 'question' + i
      this.setState({
        [y]: [stateQuestions[i]]
      })
    
    }
 
  }

  onDragEnd = ({ source, destination }) => {
    console.log(destination)
    if (!destination) {
      return;
    }

    this.setState(state => {
      return move(state, source, destination);
    });
  };

  //Function that loads data
  loadData = async () =>{
    await this.props.getQuestions(this.props.match.params.card_id)
    await this.props.getCardInfo(this.props.match.params.card_id)
  }

  render(){

    console.log(this.state)



   

    return(
      <>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="dnd">
            <div className="dnd-questions-container">
              <span id="dnd-question-header">Questions</span>
              <DropZone 
                id="question1"
                questions={this.state.question1}
                isDragDisabled={true}
              />
              <DropZone 
                id="question2"
                questions={this.state.question2}
                isDragDisabled={true}
              />
              <DropZone 
                id="question3"
                questions={this.state.question3}
                isDragDisabled={true}
              />
              <DropZone 
                id="question4"
                questions={this.state.question4}
                isDragDisabled={true}
              />
              <DropZone 
                id="question5"
                questions={this.state.question5}
                isDragDisabled={true}
              />
              <DropZone 
                id="question6"
                questions={this.state.question6}
                isDragDisabled={true}
              />
            </div>
            <div className="dnd-answers-container">
              <DropZone 
                id="answers"
                questions={this.state.answers}
                isDragDisabled={false}
              />
            </div>
          </div>
        </DragDropContext>
      </>
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
  {getQuestions, getCardInfo})(DNDGame)
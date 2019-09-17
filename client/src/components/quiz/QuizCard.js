import React, {Component} from 'react'
import { connect } from 'react-redux';
import Quiz from './Quiz'
import { getQuestions, getCardInfo, unloadQuestions} from '../../actions/QuestionActions'
import {shuffleQuestions} from './Shuffle'


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
    title: '',
    subject: '',
  }
  

  }
  
  
  
  async componentDidUpdate(prevProps, nextProps){
    if(JSON.stringify(prevProps.questions) !== JSON.stringify(this.props.questions)){
 
      await this.loadData()    
    }
  }
  
  

  async componentDidMount(){
    await this.props.getQuestions(this.props.match.params.card_id)
    await this.props.getCardInfo(this.props.match.params.card_id)
    this.loadData()
  }



  loadData = async () =>{
    await this.props.getQuestions(this.props.match.params.card_id)
    await this.props.getCardInfo(this.props.match.params.card_id)
    let shuffledQuestions = [...this.props.questions]

    shuffleQuestions(shuffledQuestions).then(data =>{
      this.setState({
        dataSet: data,
      })
    })
  }

  handleClick = (e, answer, index) =>{
    e.preventDefault()
    if(this.state.dataSet[index].q_id === answer.q_id){
      console.log('yeet')
      this.setState({
        activeIndex: this.state.activeIndex + 1,
        correct: this.state.correct + 1
      })
    } else{

      this.setState({
        activeIndex: this.state.activeIndex + 1,
        incorrect: this.state.correct + 1
      })
    }
  }

  render(){
    if(this.props.questions.length != 0){
      if (this.props.questions[0].set_id == this.props.match.params.card_id) {
      return(
      <div className="container questions">
        <div className="container-header">
              <h1 style={{fontFamily: 'Manjari', padding: '0.4rem'}}><span style={{ color: '#9c9996', fontSize: '1rem' }}> Title</span> {this.props.title} <span style={{ color: '#9c9996', fontSize: '1rem' }}> Subject</span> {this.props.subject} <span style={{ color: '#9c9996', fontSize: '1rem' }}> Questions</span> {this.props.questions.length}</h1>
        </div>
        <div className="quiz-score-container">
          {this.state.correct}
          {this.state.incorrect}
        </div>
        <Quiz questions={this.state.dataSet} activeIndex={this.state.activeIndex}
          handleClick={this.handleClick}/>
        </div>
      )
      }
      else{
        return(
        <div>loading</div>
        )
      }
    } else{
      return(
      <div>loading</div>
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
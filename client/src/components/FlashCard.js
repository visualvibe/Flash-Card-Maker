import React, {Component} from 'react'
import Question from './Question'
import AddQuestion from './AddQuestion'
import { connect } from 'react-redux';
import { getQuestions, getCardInfo, toggleEdit, addQuestion, removeQuestion, handleEditQuestion, handleEditAnswer} from '../actions/QuestionActions'

class FlashCard extends Component{

  state={
    isLoading: true
  }

  componentDidUpdate(prev){
    //Checks if the previous props is same as current and then calls back end
    if(JSON.stringify(prev.questions) === (this.props.questions)){
      this.loadData().then(()=>{
        this.setState({
          isLoading: false
        })
      })
    }
  }

  componentWillMount(){
    this.setState({
      isLoading: true
    })
    this.loadData()
  }


  loadData = async () =>{
    this.props.getQuestions(this.props.match.params.card_id)
    this.props.getCardInfo(this.props.match.params.card_id)
    setTimeout(() =>{
      this.setState({
        isLoading: false
      })
    }, 500)
  }


 //Toggles the edit button for question/answer edit
  toggleEditable = () =>{
    this.props.toggleEdit()
  }


  render(){
    console.log(this.state.isLoading)
    if(this.state.isLoading == true) {
      return(
        <div className="loading-container">
          <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      )
    }
    else{
      return(
        <div className="container questions">
          <div className="container-header">
            <h1 style={{fontFamily: 'Manjari', padding: '0.4rem'}}><span style={{ color: '#9c9996', fontSize: '1rem' }}> Title</span> {this.props.title} <span style={{ color: '#9c9996', fontSize: '1rem' }}> Subject</span> {this.props.subject} <span style={{ color: '#9c9996', fontSize: '1rem' }}> Questions</span> {this.props.questions.length}</h1>
          </div>
          <div className="question-main-container">
            <Question questions={this.props.questions} 
            removeQuestion={this.props.removeQuestion} 
            handleEditAnswer={this.props.handleEditAnswer} 
            handleEditQuestion={this.props.handleEditQuestion}
            getState={this.props.editable}
            toggleEditable={this.toggleEditable}
            test={this.test} />
            <AddQuestion addQuestion={this.props.addQuestion} set_id={this.props.set_id}/>
          </div>
        </div>
      )
    }
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
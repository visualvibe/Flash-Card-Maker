import React, {Component} from 'react'
import Question from './Question'
import AddQuestion from './AddQuestion'
import { connect } from 'react-redux';
import { getQuestions, getCardInfo, toggleEdit, addQuestion, removeQuestion, handleEditQuestion, handleEditAnswer} from '../actions/QuestionActions'
import SearchBox from './SearchBox'

class FlashCard extends Component{

  state={
    isLoading: true,
    activeCard: 0,
    toggleEdit: false,
    searchCard: ''
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
  toggleEditable = (e, i) =>{
    e.preventDefault()
    this.setState({
      activeCard: i,
      toggleEdit: !this.state.toggleEdit    
    })
    this.props.toggleEdit()
  }

  //Handles search input
  handleSearch = (e) =>{
    this.setState({
      searchCard: e.target.value
    })
  }


  render(){
    let filteredQuestions = this.props.questions.filter((question) => {
      //Joins questio.q_vlaue & question.q_answer into array
      let c = [question.q_value.toLowerCase(), question.q_answer.toLowerCase()]
      let c2 = c[0].concat(c[1])
      return c2.includes(this.state.searchCard.toLowerCase())
    })
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
          <div className="container-header profile">
            <h1 style={{fontFamily: 'Manjari', padding: '0.4rem'}}><span style={{ color: '#9c9996', fontSize: '1rem' }}> Title</span> {this.props.title} <span style={{ color: '#9c9996', fontSize: '1rem' }}> Subject</span> {this.props.subject} <span style={{ color: '#9c9996', fontSize: '1rem' }}> Questions</span> {this.props.questions.length}</h1>
            <div className="container-middle-header">
              <SearchBox handleSearch={this.handleSearch} question={true}/>
            </div>
          </div>
            <AddQuestion addQuestion={this.props.addQuestion} set_id={this.props.set_id}/>
            <Question questions={filteredQuestions} 
            removeQuestion={this.props.removeQuestion} 
            handleEditAnswer={this.props.handleEditAnswer} 
            handleEditQuestion={this.props.handleEditQuestion}
            getState={this.props.editable}
            toggleEditable={this.toggleEditable}
            test={this.test} activeCard={this.state.activeCard}
            showToggleEdit={this.state.toggleEdit} />

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
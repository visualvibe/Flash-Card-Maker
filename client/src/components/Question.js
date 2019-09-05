import React from 'react'
import ContentEditable from "react-contenteditable"


const Question = ({questions, removeQuestion, handleEditAnswer, handleEditQuestion, getState, toggleEditable}) =>{

 const questionList = questions.map(question => {
  return(
   <div  className="question" key={question.q_id}>
    
    <div>
     <label>Question: </label>
     <ContentEditable
          className="editable"
          tagName="pre"
          disabled={!getState}
          html={question.q_value} // innerHTML of the editable div
          onChange={ (e) => {handleEditQuestion(e, question.q_id)} } // handle innerHTML change
        />    
     </div> 
     <div>
      <label>Answer: </label>
      <ContentEditable
          className="editable"
          tagName="pre"
          disabled={!getState}
          html={question.q_answer} // innerHTML of the editable div
          onChange={ (e) => {handleEditAnswer(e, question.q_id)} } // handle innerHTML change
        />        
       <button onClick={toggleEditable}>
         {getState ? "Disable Edit" : "Edit"}
       </button>
     </div> 
    <button onClick={ () => {removeQuestion(question.q_id)}}>Delete</button>
   </div>
  )
 })

 return(
  <div>
   {questionList}
  </div>
 )
}

export default Question;
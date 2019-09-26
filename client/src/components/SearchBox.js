import React from 'react'

const SearchBox = ({handleSearch, question}) =>{

 return(
  <div className="searchbox-container">
   {question ?
    <input className="search-input" placeholder="Search by Question/Answer" onChange={handleSearch} type="text"></input>
   :    
    <input className="search-input" placeholder="Search by Title/Subject" onChange={handleSearch} type="text"></input>
   }
  </div>
 )
}

export default SearchBox
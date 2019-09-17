import React from 'react'

const SearchBox = ({handleSearch}) =>{

 return(
  <div className="searchbox-container">
   <input className="search-input" placeholder="Search by Title/Subject" onChange={handleSearch} type="text"></input>
  </div>
 )
}

export default SearchBox
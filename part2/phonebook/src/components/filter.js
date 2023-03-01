import React from "react";

const Filter = ({newSearch, searchName}) =>{
return(
    <div>
    <h2>Phonebook</h2>
    <div>Filter shown with <input value={newSearch} onChange={searchName}/></div>
    </div>
)
}

export default Filter
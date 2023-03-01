import React from "react";

const Form= ({addName, newName, nameChange, newNumber, numberChange}) =>{
return(
    <>
    <h2>Add a new</h2>
    <form onSubmit={addName}>
        <div>
        name: <input value={newName} onChange={nameChange}/>
        </div>
        <div>
        number: <input value={newNumber} onChange={numberChange}/>
        </div>
        <div>
        <button type="submit">add</button>
        </div>
    </form>
    </>
)
}

export default Form
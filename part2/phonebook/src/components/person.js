import React from "react"

const Persons = ({per, deleteEntry})=>{
    return(
    <div>
        {per.name} {per.number}
        <button onClick={() =>deleteEntry(per.name, per.name)}>Delete</button>
    </div>
    )
}

const Person=({showFilter, deleteEntry}) =>{
return(
<div>
<h2>Numbers</h2>
{showFilter.map(per => 
<Persons key = {per.name} per={per} deleteEntry={deleteEntry} />)}
</div>
)}

export default Person
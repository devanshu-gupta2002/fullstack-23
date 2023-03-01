import React from "react"

const Persons = ({per})=>{
    return(
    <div>
        {per.name} {per.number}
    </div>
    )
}

const Person=({showFilter}) =>{
return(
<div>
<h2>Numbers</h2>
{showFilter.map(per => 
<Persons key = {per.id} per={per} />)}
</div>
)}

export default Person
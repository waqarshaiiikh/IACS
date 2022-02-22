import React from 'react'
import Dashboard from './Dashboard'

const InternshipForm = ()=>{
    return(
        <>
           <h1>Internship</h1>
        </>
    )
}
const Internship = () => {
    return (
        <>
        <Dashboard field={<InternshipForm/>}/>
    </>
    )
}

export default Internship

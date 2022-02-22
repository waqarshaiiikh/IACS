import React from 'react'
import Dashboard from './Dashboard'
import ServiceCard from './ServiceCard'
const Internship = () => {
    return (
        <>
        <Dashboard field={<ServiceCard/>}/>
    </>
    )
}

export default Internship

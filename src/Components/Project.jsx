import React from 'react'
import Dashboard from './Dashboard'
import ServiceCard from './ServiceCard'

const Project = () => {
    return (
        <>
        <Dashboard field={<ServiceCard/>}/>
        </>
    )
}

export default Project

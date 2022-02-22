import React from 'react'
import Dashboard from './Dashboard'
import ServiceCard from './ServiceCard'

const Job = () => {
    return (
        <>
            <Dashboard field={<ServiceCard/>}/>
        </>
    )
}

export default Job

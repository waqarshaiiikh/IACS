import React from 'react'
import Dashboard from './Dashboard'
import ServiceCard from './ServiceCard';

const SoftwareHouse = () => {

    return (
        <>
            <Dashboard field={<ServiceCard />} />
        </>
    )
}

export default SoftwareHouse

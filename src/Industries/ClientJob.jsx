import React from 'react'
import ClientDashboard from './ClientDashboard'
import ServiceCard from '../Components/ServiceCard'

const ClientJob = () => {
  return (
    <>
        <ClientDashboard field={<ServiceCard/>} />
    </>
  )
}

export default ClientJob
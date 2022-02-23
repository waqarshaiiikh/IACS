import React from 'react'
import ClientDashboard from './ClientDashboard'
import ServiceCard from '../Components/ServiceCard'

const ClientProject = () => {
  return (
    <>
        <ClientDashboard field={<ServiceCard/>} />
    </>
  )
}

export default ClientProject
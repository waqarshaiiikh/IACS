import React from 'react'
import ClientDashboard from './ClientDashboard'
import ServiceCard from '../Components/ServiceCard'

const ClientInternship = () => {
  return (
    <>
        <ClientDashboard field={<ServiceCard/>} />
    </>
  )
}

export default ClientInternship
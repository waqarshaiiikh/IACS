import React from 'react'
import ClientDashboard from './ClientDashboard'
import ServiceCard from '../Components/ServiceCard'

const ClientStudent = () => {
  return (
    <>
        <ClientDashboard field={<ServiceCard/>} />
    </>
  )
}

export default ClientStudent
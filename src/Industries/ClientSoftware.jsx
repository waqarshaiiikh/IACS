import React from 'react'
import ClientDashboard from './ClientDashboard'
import ServiceCard from '../Components/ServiceCard'

const ClientSoftware = () => {
  return (
    <ClientDashboard field={<ServiceCard/>} />
  )
}

export default ClientSoftware
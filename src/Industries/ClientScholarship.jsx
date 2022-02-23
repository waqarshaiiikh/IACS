import React from 'react'
import ClientDashboard from './ClientDashboard'
import ServiceCard from '../Components/ServiceCard'

const ClientScholarship = () => {
  return (
    <>
        <ClientDashboard field={<ServiceCard/>} />
    </>
  )
}

export default ClientScholarship
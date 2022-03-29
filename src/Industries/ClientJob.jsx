import React from 'react'
import ServiceCard from '../Components/ServiceCard'
import ClientNavbar from './ClientNavbar'

const ClientJob = () => {
  return (
    <>
      <ClientNavbar/>
      <h1>Client Jobs</h1>
      <ServiceCard/>
    </>
  )
}

export default ClientJob
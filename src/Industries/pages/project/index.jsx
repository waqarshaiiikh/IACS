import React from 'react'
import ClientNavbar from "../../ClientNavbar"
import "../../../CSS/Utils.css"
 
import Projects from "./component/Projects";
import MetaData from '../../../MetaData';

const ClientProject = () => {
  return (
    <>
     <MetaData title="Projects"/>
        <ClientNavbar/>
        <Projects/>
    </>
  )
}

export default ClientProject
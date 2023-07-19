import React from 'react'
import "../../CSS/Utils.css"
 
import Projects from "./component/Projects";
import Navbar from '../Navbar';
import MetaData from '../../MetaData';

const Project = () => {
  return (
    <>
     <MetaData title="Projects"/>
        <Navbar/>
        <Projects/>
    </>
  )
}

export default Project
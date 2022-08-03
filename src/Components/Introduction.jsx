import React, { useContext } from 'react'
import "../App.css"
import "../CSS/SignIn.css"
import "../CSS/Dashboard.css"
import Home from '../Pages/Home'
import Navbar from './Navbar';
import { Routes, Route } from "react-router-dom";
import MetaData from '../MetaData'
import ClientNavbar from '../Industries/ClientNavbar';
import noteContext from '../context/notes/noteContext'



const Introduction = () => {

    const a = useContext(noteContext)
    const user = a.UserType;
    
    return (
        <div>
            <MetaData title="IACS"/>
            {user==='student' ? <Navbar /> : <ClientNavbar /> }
            <Routes>
                <Route path='/' exact element={<Home />} />
            </Routes>
        </div>
    )
}

export default Introduction

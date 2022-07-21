import React from 'react'
import "../App.css"
import "../CSS/SignIn.css"
import "../CSS/Dashboard.css"
import Home from '../Pages/Home'
import Navbar from './Navbar';
import { Routes, Route } from "react-router-dom";
import MetaData from '../MetaData'

const Introduction = () => {
    return (
        <div>
            <MetaData title="IACS"/>
            <Navbar />
            <Routes>
                <Route path='/' exact element={<Home />} />
            </Routes>
        </div>
    )
}

export default Introduction

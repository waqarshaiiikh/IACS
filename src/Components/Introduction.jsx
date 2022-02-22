import React from 'react'
import "../App.css"
import "../CSS/SignIn.css"
import "../CSS/Dashboard.css"
import Home from '../Pages/Home'
import Navbar from '../Pages/Navbar'
import { Routes, Route } from "react-router-dom";

const Introduction = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/' exact element={<Home />} />
            </Routes>
        </div>
    )
}

export default Introduction

import React from 'react'
import "../CSS/Introduction.css"
import "../CSS/SignIn.css"
import About from '../Pages/About'
import Contact from '../Pages/Contact'
import Home from '../Pages/Home'
import Navbar from '../Pages/Navbar'
import Service from '../Pages/Service'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignIn from "../Pages/SignIn"
import SignUp from "../Pages/SignUp"

const Introduction = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/signup" component={SignUp} />
            </Routes>
            <Home />
            <About />
            <Service />
            <Contact />
        </div>
    )
}

export default Introduction

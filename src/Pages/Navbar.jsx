import React from 'react'
import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';

const Navbar = () => {
    const toggle = document.getElementById('toggle');
    const navbar = document.getElementById('navbar');

    const toggles = ()=>{
        toggle.classList.toggle('active')
        navbar.classList.toggle('active')
    }
    return (
        <>
            <header id="header">
                <a href="#" className="logo">IACS</a>
                <div id="toggle" onClick={toggles}></div>
                <div id="navbar">
                    <ul>
                        <li><Link to="home">Home</Link></li>
                        <li><Link to="about">About</Link></li>
                        <li><Link to="services">Service</Link></li>
                        <li><Link to="#contact">Contact</Link></li>
                        <li><NavLink className="sign-in" to="/signin" target="blank">Sign In</NavLink></li>
                        <li><NavLink className="join" to="/signup">Join Us</NavLink></li>
                    </ul>
                </div>
            </header>
        </>
    )
}

export default Navbar

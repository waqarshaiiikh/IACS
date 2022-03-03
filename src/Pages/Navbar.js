import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Navbar.css';

function Navbar() {

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand navLogo" href="/">IACS <i className='fab fa-typo3' /></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav"
            aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Sign Up now 
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to="/signup" className='signin'>
                  <a className="dropdown-item" href="#">Student Sign Up</a>
                </Link>
                <Link to="/industrysignup" className='signin'>
                  <a className="dropdown-item" href="#">Industry Sign Up</a>
                </Link>
                </div>
              </li>
              <li>
                <button className="btn my-2 my-sm-0 buttonColor" type="submit">
                  <Link to="/signin" className='signin'>Student Login</Link>
                </button>
              </li>
              <li>
                <button className="btn my-2 my-sm-0 buttonColor" type="submit">
                  <Link to="/industrysignin" className='signin'>Industry Login</Link>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>

  )
}

export default Navbar;
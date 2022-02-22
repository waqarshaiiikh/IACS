import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Navbar.css';

function Navbar() {

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand navLogo" href="/">IACS <i class='fab fa-typo3' /></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div class={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li>
              <button class="btn my-2 my-sm-0 buttonColor" type="submit">
                <Link to="/signin" className='signin'>Sign In</Link>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  )
}

export default Navbar;
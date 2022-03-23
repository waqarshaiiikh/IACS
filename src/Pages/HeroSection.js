import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import '../CSS/HeroSection.css';

function HeroSection() {
  return (
    <>
      <div className='hero-container'>
        <h1>DON'T BUSY BE PRODUCTIVE</h1>
        <p>What are you waiting for?</p>
        <div className='hero-btns'>
          <Link to="signup" className='getStartLink'>
          <span className='getStart'>
              POST JOBS ?
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
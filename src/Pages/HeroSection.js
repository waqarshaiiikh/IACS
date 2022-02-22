import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import '../CSS/HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-2.mp4' autoPlay loop muted />
      <h1>DON'T BUSY BE PRODUCTIVE</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Link to="/signup" className='getStartLink'>
          <span className='getStart'>
            GET STARTED
          </span>
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;
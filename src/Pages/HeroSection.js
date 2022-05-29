import React from 'react';
import '../App.css';
import '../CSS/HeroSection.css';
import slider1 from "../Images/slider/slider1.png";
import slider2 from "../Images/slider/slider2.png";
import slider3 from "../Images/slider/slider3.png";
import slider4 from "../Images/slider/slider4.png";
import slider5 from "../Images/slider/slider5.png";

function HeroSection() {
  return (
    <>
      <div classNameName='hero-container'>
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className='slider-image w-100' src={slider1} alt="First slide" />
            </div>
            <div className="carousel-item">
              <img className='slider-image w-100' src={slider2} alt="Third slide" />
            </div>
            <div className="carousel-item">
              <img className='slider-image w-100' src={slider3} alt="Third slide" />
            </div>
            <div className="carousel-item">
              <img className='slider-image w-100' src={slider4} alt="Third slide" />
            </div>
            <div className="carousel-item">
              <img className='slider-image w-100' src={slider5} alt="Third slide" />
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </>
  );
}

export default HeroSection;

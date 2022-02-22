import React from 'react';
import '../CSS/Cards.css';
import CardItem from './CardItem';
import job from "../Images/jobServices.jpg"
import intership from '../Images/internshipServices.jpg'
import project from "../Images/projectService.jpg"
import Learning from "../Images/learningService.jpg"
import scholarship from "../Images/scholarshipService.jpg"
function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these EPIC Services</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src={job}
              text='Your desire Full time, Part time Job'
              label='Job'
              path='/signup'
            />
            <CardItem
              src={intership}
              text='Get Experience through Internship'
              label='Interhsip'
              path='/signup'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src={scholarship}
              text='Set Sail in the Atlantic Ocean visiting Uncharted Waters'
              label='Scholarhsip'
              path='/signup'
            />
            <CardItem
              src={project}
              text='Experience Football on Top of the Himilayan Mountains'
              label='Project'
              path='/signup'
            />
            <CardItem
              src={Learning}
              text='Ride through the Sahara Desert on a guided camel tour'
              label='Learning'
              path='/signup'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards
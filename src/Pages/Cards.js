import React from 'react';
import '../CSS/Cards.css';
import { Grid, Container } from '@mui/material';
import CardItem from './CardItem';
import jobsService from "../Images/jobServ.png";
import internService from "../Images/internhsipServ.png";
import trainService from "../Images/trainingServ.png";
import fundService from "../Images/fundingServ.png";
import scholarService from "../Images/scholarshipServ.png";

function Cards() {

  return (
    <div className='cards'>
      <h1>Check out these EPIC Services</h1>
      <Container>
        <Grid container spacing={4} display="flex" justifyContent="center" alignItem="center" sx={{ marginTop: '20px' }}>
          <Grid item lg={4} xs={8} >
            <CardItem
              image={jobsService}
              service="Job"
              description="We provide best job for you, that would be perfect match for your skills and help you to move forward."
            />
          </Grid>
          <Grid item lg={4} xs={8} >
            <CardItem
              image={internService}
              service="Internhsip"
              description="Students can get intenrship flexible with their university timing. They can take exposure of indsutry."
            />
          </Grid>
          <Grid item lg={4} xs={8} >
            <CardItem
              image={trainService}
              service="Training"
              description="We provide exclusive training session. Student can get advanced skills through the training sessions."
            />
          </Grid>
          <Grid item lg={4} xs={8} >
            <CardItem
              image={fundService}
              service="Project Funding"
              description="Students can find the best invertor for financing their final year project. We help students to get enough finance for their projects."
            />
          </Grid>
          <Grid item lg={4} xs={8} >
            <CardItem
              image={scholarService}
              service="Scholarship"
              description="Students can get scholarships which help them in their studies. They can continue their education without problems"
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Cards
import React from 'react'
import { Container, Grid } from '@mui/material';
import { Link } from "react-router-dom"
import office from "../Images/office.png"
import student from "../Images/student.png"
import job from "../Images/job.png"
import project from "../Images/idea.png"
import scholarship from "../Images/scholarship.png"
import internship from "../Images/internship.png"
import "../CSS/DashboardCard.css"

const Card = () => {
    return (
        <>
            <Container>
                <Grid container spacing={5} justifyContent="center" alignItems="center">
                    <Grid item lg={4}>
                        <div className="card">
                            <Link to="/softwarehouse" className='link'>
                                <img src={office} alt="" />
                                <label htmlFor="">Software House</label>
                            </Link>
                        </div>
                    </Grid>
                    <Grid item lg={4}>
                        <div className="card">
                            <Link to="/student" className='link'>
                                <img src={student} alt="" />
                                <label htmlFor="">Students</label>
                            </Link>
                        </div>
                    </Grid>
                    <Grid item lg={4}>
                        <div className="card">
                            <Link to="/job" className='link'>
                                <img src={job} alt="" />
                                <label htmlhtmlFor="">Jobs</label>
                            </Link>
                        </div>
                    </Grid>
                    <Grid item lg={4}>
                        <div className="card">
                            <Link to="/internship" className='link'>
                                <img src={internship} alt="" />
                                <label htmlFor="">Internship</label>
                            </Link>
                        </div>
                    </Grid>
                    <Grid item lg={4}>
                        <div className="card">
                            <Link to="/project" className='link'>
                                <img src={project} alt="" />
                                <label htmlFor="">Projects</label>
                            </Link>
                        </div>
                    </Grid>
                    <Grid item lg={4}>
                        <div className="card">
                            <Link to="/scholarship" className='link'>
                                <img src={scholarship} alt="" />
                                <label htmlFor="">Scholarship</label>
                            </Link>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Card

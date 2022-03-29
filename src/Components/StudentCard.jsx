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

const StudentCard = () => {
    return (
        <>
            <Container>
                <Grid container spacing={5} justifyContent="center" alignItems="center">
                    <Grid item lg={4}>
                        <div className="card">
                            <Link to="/softwarehouse" className='link'>
                                <img src={office} alt="software house" />
                                <label htmlFor="">Software House</label>
                            </Link>
                        </div>
                    </Grid>
                    <Grid item lg={4}>
                        <div className="card">
                            <Link to="/stdjob" className='link'>
                                <img src={job} alt="student job" />
                                <label htmlhtmlFor="">Jobs</label>
                            </Link>
                        </div>
                    </Grid>
                    <Grid item lg={4}>
                        <div className="card">
                            <Link to="/stdinternship" className='link'>
                                <img src={internship} alt="student internship" />
                                <label htmlFor="">Internship</label>
                            </Link>
                        </div>
                    </Grid>
                    <Grid item lg={4}>
                        <div className="card">
                            <Link to="/stdproject" className='link'>
                                <img src={project} alt="student project" />
                                <label htmlFor="">Projects</label>
                            </Link>
                        </div>
                    </Grid>
                    <Grid item lg={4}>
                        <div className="card">
                            <Link to="/stdscholarship" className='link'>
                                <img src={scholarship} alt="student scholarship" />
                                <label htmlFor="">Scholarship</label>
                            </Link>
                        </div>
                    </Grid>
                    <Grid item lg={4}>
                        <div className="card">
                            <Link to="/stdtraining" className='link'>
                                <img src={student} alt="student training" />
                                <label htmlFor="">Student Taining</label>
                            </Link>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default StudentCard

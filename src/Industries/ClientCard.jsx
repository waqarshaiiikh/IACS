import React from 'react'
import { Container, Grid } from '@mui/material';
import { Link } from "react-router-dom"
// import office from "../Images/office.png"
import student from "../Images/student.png"
import job from "../Images/job.png"
import project from "../Images/idea.png"
import scholarship from "../Images/scholarship.png"
import internship from "../Images/internship.png"
import "../CSS/DashboardCard.css"

const ClientCard = () => {
    return (
        <>
            <Container>
                <Grid container spacing={5} justifyContent="center" alignItems="center">
                    <Grid item lg={4}>
                        <div className="card">
                            <Link to="/clistudent" className='link'>
                                <img src={student} alt="" />
                                <label htmlFor="">Students</label>
                            </Link>
                        </div>
                    </Grid>
                    <Grid item lg={4}>
                        <div className="card">
                            <Link to="/clijob" className='link'>
                                <img src={job} alt="" />
                                <label htmlhtmlFor="">Jobs</label>
                            </Link>
                        </div>
                    </Grid>
                    <Grid item lg={4}>
                        <div className="card">
                            <Link to="/cliinternship" className='link'>
                                <img src={internship} alt="" />
                                <label htmlFor="">Internship</label>
                            </Link>
                        </div>
                    </Grid>
                    <Grid item lg={4}>
                        <div className="card">
                            <Link to="/cliproject" className='link'>
                                <img src={project} alt="" />
                                <label htmlFor="">Projects</label>
                            </Link>
                        </div>
                    </Grid>
                    <Grid item lg={4}>
                        <div className="card">
                            <Link to="/clischolarship" className='link'>
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

export default ClientCard

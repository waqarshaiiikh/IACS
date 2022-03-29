import React from 'react'
import userData from "../local-json/userData.json"
import { Container, Grid } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import "../CSS/ServiceCard.css"

function ServiceCard() {
    return (
        <div className="service-container">
            <Container >
                <Grid container spacing={5} justifyContent="center" alignItems="center">
                    {
                        userData && userData.map((jobs) => {
                            return(<Grid item lg={4}>
                                <div className="job-tile">
                                    <div className="top">
                                        <img src={jobs.logo} alt="No canvas" />
                                        <span className="material-icons more_horiz"><MoreHorizIcon/></span>
                                    </div>
                                    <div className="rolename">
                                        <span>{jobs.roleName}</span>
                                    </div>
                                    <div className="description">
                                        <span>{jobs.requirements.content}</span>
                                    </div>
                                    <div className="buttons">
                                        <div className="button apply-now">Apply Now</div>
                                    </div>
                                </div>
                            </Grid>)
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default ServiceCard
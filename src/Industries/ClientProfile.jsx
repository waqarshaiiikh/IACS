import React, { useState } from 'react'
import { Container, Grid, Box, Typography, Button, Chip } from '@mui/material';
import { ProfileData, ServiceData } from "./ClientData"
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@material-ui/styles';
import ClientNavbar from './ClientNavbar';
import client from "../Images/job.png"
import MetaData from '../MetaData';
import "../CSS/Utils.css";

const services = ["Web Development", "Mobile App Development",
    "Graphis Designing",
    "Data Analytics",
    "Desktop Development",
    "Devops",
    "SQA",
    "Database",
    "Digital Media Marketing",
    "Artificial Intelligence",
    "Blockchain",
    "AWS",
    "Cloud & Web Hosting"]

const useStyles = makeStyles({
    typography: {
        textAlign: 'center',
        margin: '10px',
        fontSize: '1.2rem !important',
        fontWeight: 'bold',
        letterSpacing: '1px !important',
    },
    about: {
        textAlign: 'justify !important',
        margin: '10px',
        fontSize: '1.2rem !important',
        fontWeight: 'bold',
        letterSpacing: '1px !important',
    },
    experience: {
        marginBottom: '10px !important',
        letterSpacing: '1px !important',
    },
    profile: {
        margin: '0.5rem',
        width: '200px',
        height: 'auto'
    },
    personalInfo: {
        textAlign: 'left',
        fontSize: '1.5rem !important',
        letterSpacing: '3px !important',
    },
    edit: {
        cursor: 'pointer',
    },
})



const ClientProfile = () => {
    const classes = useStyles();
    // Open Update Profile Form
    const [profile, setProfile] = useState(false);
    const openProfile = () => setProfile(true);
    const closeProfile = () => setProfile(false);

    // Open Service Form
    const [service, setService] = useState(false);
    const openService = () => setService(true);
    const closeService = () => setService(false);
    return (
        <>
            <MetaData title="Client Profile"/>
            <ClientNavbar />
            <ProfileData open={profile} handleClose={closeProfile} />
            <ServiceData open={service} handleClose={closeService} />
            <Container maxWidth="xl">
                <Grid container>
                    <Grid item lg={4} xs={12}>
                        <Box sx={{
                            width: '100%',
                            height: 'auto',
                            margin: 0,
                            padding: 5,
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <Grid>
                                <Grid item lg={12} >
                                    <img src={client} alt="" className={classes.profile} />
                                    <Typography variant='h6' className={classes.typography}>
                                        HR Name
                                    </Typography>
                                    <Typography variant='h6' className={classes.typography}>
                                        ABC Software House
                                    </Typography>
                                    <Typography variant='h6' className={classes.typography}>
                                        <Button variant="contained" sx={{ marginTop: '10px' }} onClick={openProfile}>Update Profile</Button>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item lg={8} xs={12}>
                        <Box sx={{
                            width: '100%',
                            height: '100%',
                            padding: { lg: 5, xs: 1 },
                        }}>
                            <Grid container>
                                <Grid item lg={12}>
                                    <h3 className='mobileHeading'>
                                        About Us
                                    </h3>
                                </Grid>
                                <Grid item lg={12} >
                                    <Typography variant='p' className={classes.about} >
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis voluptatem aliquam distinctio saepe repellendus mollitia harum temporibus ipsa sint autem inventore, amet maiores sit, excepturi exercitationem doloremque non aut sequi.
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis voluptatem aliquam distinctio saepe repellendus mollitia harum temporibus ipsa sint autem inventore, amet maiores sit, excepturi exercitationem doloremque non aut sequi.
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis voluptatem aliquam distinctio saepe repellendus mollitia harum temporibus ipsa sint autem inventore, amet maiores sit, excepturi exercitationem doloremque non aut sequi.
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis voluptatem aliquam distinctio saepe repellndus mollitia harum temporibus ipsa sint autem inventore, amet maiores sit, excepturi exercitationem doloremque non aut sequi.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item lg={12}>
                        <Grid container spacing={2} sx={{ marginBottom: '10px' }}>
                            <Grid item lg={12}>
                                <h3 className='mobileHeading'>
                                    Services <EditIcon className={classes.edit} onClick={openService} />
                                </h3>
                            </Grid>
                            <Grid item lg={12}>
                                <Grid container>
                                    {
                                        services && services.map((service, i) => (
                                            <Grid item>
                                                <Chip label={service} sx={{ marginRight: '10px', marginBottom: '5px' }} />
                                            </Grid>))
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default ClientProfile
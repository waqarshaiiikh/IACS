import React, { useContext, useState } from 'react'
import { Container, Grid, Box, Typography, Button, Chip, Avatar, IconButton, Badge } from '@mui/material';
import { ProfileData, ExperienceData, SkillData } from "./ProfileData"
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@material-ui/styles';
import MetaData from '../MetaData';
import "../CSS/Utils.css";
import { DateRangePicker, LocalizationProvider } from '@mui/lab/';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { styled } from '@material-ui/styles';
import Navbar from "./Navbar";
import noteContext from '../context/notes/noteContext';

// import { useEffect } from 'react';
// import std from "../Images/student.png"
// import std from "../Images/IMG_20191029_175656.JPG"
const { Api } = require('../integration/apiCall');
const Data = Api.getApi();


const Input = styled('input')({
    display: 'none',
});


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
    }
})


const StudentProfile = () => {
    
    const a = useContext(noteContext);
    
    const classes = useStyles();

    // Open Update Profile Form
    const [profile, setProfile] = useState(false);
    const openProfile  = () => setProfile(true) ;
    const closeProfile = () => setProfile(false);
    
    // Open Experience Form
    const [experience, setExperience] = useState(false);
    const [experienceField, setExperienceField] = useState({});
    const openExperience = (obj) => { setExperienceField(obj); setExperience(true); };
    const closeExperience = () => setExperience(false);
    
    // Open Skills Form
    const [skill, setSkill] = useState(false);
    const openSkill = () => setSkill(true);
    const closeSkill = () => setSkill(false);
    
    
    const imageUploadHandler = event => {


        const file = event.target.files[0];

        (Data.picture).then((picture)=>{
            picture.setUrl(file).then((check)=>{
               if(check){
                   a.gettingPicData().then(()=>console.log("updated pic") )
               }
            })
            .catch(e=>{
                console.log(e)
            });

        });
    }



    return (     
        <>
        <MetaData title="Student Profile"/>
            <Navbar />
            <ProfileData open={profile} handleClose={closeProfile} />
            {experience && <ExperienceData open={experience} handleClose={closeExperience} experienceObj={experienceField} status={experienceField.companyName === null ? "Add" : "Update"} />}
            <SkillData open={skill} handleClose={closeSkill} />

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

                                    <Badge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        badgeContent={
                                            <label htmlFor="icon-button-file">
                                                <Input accept="image/*" onChange={imageUploadHandler} id="icon-button-file" type="file" />
                                                <IconButton aria-label="upload picture" component="span" variant="outlined">
                                                    <Avatar sx={{ bgcolor: 'rgb(216, 218, 223)' }}>
                                                        <CameraAltIcon sx={{ color: 'rgb(28, 29, 33)' }} />
                                                    </Avatar>
                                                </IconButton>
                                            </label>
                                        }
                                    >

                                        <Avatar alt={a.username[0]} src={ a.url} sx={{ width: 170, height: 170, bgcolor: 'rgb(66, 182, 238)' }}>{a.username[0]}
                                        </Avatar>

                                    </Badge>

                                    <Typography variant='h6' className={classes.typography}>
                                        {a.username}
                                    </Typography>
                                    <Typography variant='h6' className={classes.typography}>
                                        {a.departmentName}
                                    </Typography>
                                    <Typography variant='h6' className={classes.typography}>
                                        {a.university}
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
                                        About Me
                                    </h3>
                                </Grid>
                                <Grid item lg={12} >
                                    <Typography variantMapping='p' className={classes.about} >
                                        <br />
                                        {a.aboutUs}
                                        <br />
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item lg={12}>
                        <Grid container spacing={2} sx={{ marginBottom: '10px' }}>
                            <Grid item lg={12}>
                                <h3 className='mobileHeading'>
                                    Skills <EditIcon className={classes.edit} onClick={openSkill} />
                                </h3>
                            </Grid>
                            <Grid item lg={12}>
                                <Grid container>
                                    {
                                        a.haveSkills && a.haveSkills.map((skill, i) => (
                                        <Grid item>
                                            <Chip label={skill.title} sx={{ marginRight: '10px', marginBottom: '5px' }} />
                                        </Grid>))
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={12}>
                        <Grid container spacing={2}>

                            <Grid item lg={12}>
                                <h3 className='mobileHeading'>
                                    Experience
                                    <Button variant="text" onClick={() => { openExperience({ companyName: null, jobRole: null, startDate: null, endDate: null, Description: null }) }} > ADD </Button>
                                </h3>
                            </Grid>

                            <Grid item lg={12}>
                                {
                                    a.haveExperience && a.haveExperience.map((Experience, i) => (
                                        <Box
                                            sx={{
                                                width: '100%',
                                                background: '#F6F6F6',
                                                borderRadius: '5px',
                                                'boxShadow': 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                                                padding: 3,
                                                marginBottom: 3,
                                            }}>
                                            <Typography variant='h4'>
                                                {Experience.companyName}  <EditIcon className={classes.edit} onClick={() => { openExperience(Experience) }} />
                                            </Typography>
                                            <Typography variant='h6' className={classes.experience}>
                                                {Experience.jobRole}
                                            </Typography>
                                            <LocalizationProvider
                                                dateAdapter={AdapterDateFns}
                                            >
                                                <DateRangePicker
                                                    disabled
                                                    value={[Experience.startDate, Experience.endDate]}
                                                    renderInput={(startProps, endProps) => {
                                                        return  (
                                                        <React.Fragment>
                                                                <Typography className={classes.experience}>
                                                                    {startProps.inputProps.value}  
                                                                </Typography>
                                                                <Box sx={{ mx: 1 }}> to </Box>
                                                                <Typography className={classes.experience}>
                                                                    {endProps.inputProps.value}  
                                                                </Typography>
                                                        </React.Fragment>
                                                    )
                                                }}
                                                />
                                            </LocalizationProvider>

                                            <Typography variant='p'>
                                                {Experience.Description}
                                            </Typography>
                                        </Box>
                                    ))
                                }
                            </Grid>

                        </Grid>
                    </Grid>

                </Grid>
            </Container>
        </>
    )
}


export default StudentProfile
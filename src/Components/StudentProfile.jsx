import React, { useState } from 'react'
import { Container, Grid, Box, Typography, Button, Chip,Avatar, IconButton, Badge } from '@mui/material';
import {ProfileData, ExperienceData, SkillData} from "./ProfileData"
import EditIcon from '@mui/icons-material/Edit';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { makeStyles } from '@material-ui/styles';
import { styled } from '@material-ui/styles';
import Navbar from "./Navbar";
// import std from "../Images/IMG_20191029_175656.JPG"


const Input = styled('input')({
    display: 'none',
});


const { Api } = require('../integration/apiCall');
const   Data  = Api.getApi();


let haveSkills     ;
let haveExperience ;


const useStyles = makeStyles({
    typography: {
        textAlign: 'center',
        margin: '10px',
        fontSize: '1.2rem !important',
        fontWeight: 'bold',
        letterSpacing: '1px !important',
    },
    about:{
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


const getData=()=>{
    haveSkills       =  Data.skill.client      ;
    haveExperience   =  Data.experience.client ;
}


const StudentProfile = () => {
    getData();

    const classes = useStyles();

    // Open Update Profile Form
    const [profile, setProfile] = useState(false);
    const openProfile  = () => setProfile(true);
    const closeProfile = () => setProfile(false);

    // Open Experience Form
    const [experience, setExperience] = useState(false);
    const [experienceField, setExperienceField] = useState({});
    const openExperience  = (obj) =>  { setExperienceField(obj); setExperience(true);};
    const closeExperience  = () => setExperience(false);

    // Open Skills Form
    const [skill, setSkill] = useState(false);
    const openSkill  = () => setSkill(true);
    const closeSkill = () => setSkill(false);
    

    const fd = new  FormData();
    const [url, setUrl] = useState(null);
    

    const imageUploadHandler = event =>{
        fd.append('image', event.target.files[0], event.target.files[0] );
        setUrl( URL.createObjectURL(event.target.files[0])) 
    }
    
    return (
        <>
            <Navbar />
            <ProfileData    open={profile}    handleClose={closeProfile}/>
            { experience && <ExperienceData open={experience} handleClose={closeExperience} experienceObj={experienceField} status={ experienceField.companyName===null ?  "Add" : "Update"} />}
            <SkillData      open={skill}      handleClose={closeSkill}/>

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
                                                    <Avatar sx={{ bgcolor: 'rgb(216, 218, 223)'}}>
                                                        <CameraAltIcon sx={{ color: 'rgb(28, 29, 33)' }} />
                                                    </Avatar>
                                                </IconButton>
                                            </label>
                                        }
                                    >
                                        <Avatar
                                            alt="Muhammad Waqar"
                                            src={url}
                                            sx={{ width: 170, height: 170 }}
                                        />
                                    </Badge>



                                    <Typography variant='h6' className={classes.typography}>
                                        Muhammad Khalid
                                    </Typography>
                                    <Typography variant='h6' className={classes.typography}>
                                        Software Engineering
                                    </Typography>
                                    <Typography variant='h6' className={classes.typography}>
                                        NED University
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
                            padding: {lg:5,xs:1},
                        }}> 
                            <Grid container>
                                <Grid item lg={12}>
                                    <Typography variant='h3' >
                                        About Me
                                    </Typography>
                                </Grid>
                                <Grid item lg={12} >
                                    <Typography variant='p' className={classes.about} >
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis voluptatem aliquam distinctio saepe repellendus mollitia harum temporibus ipsa sint autem inventore, amet maiores sit, excepturi exercitationem doloremque non aut sequi.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item lg={12}>
                        <Grid container spacing={2} sx={{ marginBottom: '10px' }}>
                            <Grid item lg={12}>
                                <Typography variant='h3'>
                                    Skills <EditIcon className={classes.edit} onClick={openSkill}/>
                                </Typography>
                            </Grid>
                            <Grid item lg={12}>
                                <Grid container>
                                    {
                                        haveSkills && haveSkills.map((skill, i) => (
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
                                <Typography variant='h3'>
                                    Experience
                                    <Button variant="text" onClick={ ()=> { openExperience( {companyName :null , jobRole : null, startDate :null , endDate :null , Description :null } )} } > ADD </Button>
                                </Typography>
                            </Grid>

                            <Grid item lg={12}>                                
                            {
                                haveExperience && haveExperience.map((Experience, i) => (
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
                                                {Experience.companyName}  <EditIcon className={classes.edit} onClick={ ()=> { openExperience(Experience) }  } />
                                            </Typography>
                                            <Typography variant='h6' className={classes.experience}>
                                                {Experience.jobRole}
                                            </Typography>
                                            <Typography className={classes.experience}>
                                                {Experience.startDate} to {Experience.endDate}
                                            </Typography>
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
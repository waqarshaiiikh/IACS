import React, { useEffect, useState } from 'react'
import { Container, Grid, Box, Typography, Button, Chip, Avatar, IconButton, Badge } from '@mui/material';
import { ProfileData, ExperienceData, SkillData } from "./ProfileData"
import EditIcon from '@mui/icons-material/Edit';
import { DateRangePicker, LocalizationProvider } from '@mui/lab/';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { makeStyles } from '@material-ui/styles';
import { styled } from '@material-ui/styles';
import Navbar from "./Navbar";
const { Api } = require('../integration/apiCall');

const Input = styled('input')({
    display: 'none',
});

const Data = Api.getApi();

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

// let basicInfo       ;
// let username        = "loading";
// let departmentName  = "loading...";




// const getData = async () => {

    // haveSkills = Data.skill.client;
    // haveExperience = Data.experience.client;
    // basicInfo      = Data.profile.client;
    // username       = Data.profile.username;
    // departmentName = Data.profile.departmentName;

// }


const StudentProfile = () => {
    
    const [ departmentName , UpdatedepartmentName ] = useState("Loading...");
    const [ username       , updateUsername       ] = useState("Loading...");
    const [ university     , update_university    ] = useState("Loading...");
    const [ aboutUs        , update_aboutUs       ] = useState("Loading...");
    const [ url            , setUrl               ] = useState();
    const [ haveSkills     , update_haveSkills    ] = useState();
    const [ haveExperience , update_haveExperience] = useState();
    
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
        const picture =  URL.createObjectURL(event.target.files[0]);
        setUrl(picture);
    }

    useEffect(() => {
        const getProfileData = async () => {
            
            //getting data from basicInfo Class
            const profileInstance = await (await Data.profile);
            const basicInfo = await profileInstance.client;
            update_university(basicInfo.university)
            update_aboutUs(basicInfo.aboutUs)
            const username = (await profileInstance.username);
            updateUsername(username || "loading...");
            const departmentName = await profileInstance.departmentName;
            UpdatedepartmentName(departmentName || 'loading ...');
            (Data.skill).then((skill)=>{
                (skill.client).then(skills=>update_haveSkills(skills));
            });
             (Data.experience).then((exp)=>{
                (exp.client).then(exp=>update_haveExperience(exp));
            });


            //getting data from picture class
            const picURL = await (await Data.picture).url;
            setUrl(picURL);

        }
        getProfileData();
    }, []);

    return (
        <>
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

                                        <Avatar alt={username[0]} src={ url} sx={{ width: 170, height: 170, bgcolor: 'rgb(66, 182, 238)' }}>{username[0]}
                                        </Avatar>

                                    </Badge>

                                    <Typography variant='h6' className={classes.typography}>
                                        {username}
                                    </Typography>
                                    <Typography variant='h6' className={classes.typography}>
                                        {departmentName}
                                    </Typography>
                                    <Typography variant='h6' className={classes.typography}>
                                        {university}
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
                                    <Typography variant='h3' >
                                        About Me
                                    </Typography>
                                </Grid>
                                <Grid item lg={12} >
                                    <Typography variantMapping='p' className={classes.about} >
                                        <br />
                                        {aboutUs}
                                        <br />
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item lg={12}>
                        <Grid container spacing={2} sx={{ marginBottom: '10px' }}>
                            <Grid item lg={12}>
                                <Typography variant='h3'>
                                    Skills <EditIcon className={classes.edit} onClick={openSkill} />
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
                                    <Button variant="text" onClick={() => { openExperience({ companyName: null, jobRole: null, startDate: null, endDate: null, Description: null }) }} > ADD </Button>
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
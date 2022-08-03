import React, { useContext, useState } from 'react'
import { Container, Grid, Box, Typography, Button, Chip, Avatar, IconButton, Badge } from '@mui/material';
import { ProfileData, ServiceData } from "./ClientData"
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@material-ui/styles';
import MetaData from '../MetaData';
import "../CSS/Utils.css";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { styled } from '@material-ui/styles';
import noteContext from '../context/notes/noteContext';
import ClientNavbar from './ClientNavbar';

const Input = styled('input')({
    display: 'none',
});

const { Api } = require('../integration/apiCall');
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



const ClientProfile = () => {

    const a = useContext(noteContext);
    const services = a.industry.haveService;

    const classes = useStyles();

    // Open Update Profile Form
    const [profile, setProfile] = useState(false);
    const openProfile = () => setProfile(true);
    const closeProfile = () => setProfile(false);

    // Open Service Form
    const [service, setService] = useState(false);
    const openService = () => setService(true);
    const closeService = () => setService(false);


    
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
        // const picture =  URL.createObjectURL(event.target.files[0]);
        // a.setUrl(picture);
    }



    return (
        <>
        <MetaData title="Client Profile" />
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

                                        <Avatar alt={a?.insdustry?.CompanyName[0]} src={a.url} sx={{ width: 170, height: 170, bgcolor: 'rgb(66, 182, 238)' }}>{a?.insdustry?.CompanyName[0]}
                                        </Avatar>

                                    </Badge>


                                    <Typography variant='h6' className={classes.typography}>
                                        {a?.insdustry?.hrName}
                                    </Typography>
                                    <Typography variant='h6' className={classes.typography}>
                                        {a?.insdustry?.CompanyName}
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
                                        <br />
                                        a.aboutUs
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
                                    Services <EditIcon className={classes.edit} onClick={openService} />
                                </h3>
                            </Grid>
                            <Grid item lg={12}>
                                <Grid container>
                                    {
                                        services && services.map((service, i) => (
                                            <Grid item>
                                                <Chip label={service.title} sx={{ marginRight: '10px', marginBottom: '5px' }} />
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









/***
 * 
 * 
 




 */
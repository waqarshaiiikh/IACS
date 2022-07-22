import React, { useState } from 'react';
import Navbar from './Navbar';
import {
    // Container, Accordion, AccordionSummary,  AccordionDetails,
    Grid, Box, Button, Typography,
    Modal, TextField, TextareaAutosize, FormControl
} from '@mui/material';
import MetaData from '../MetaData';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { makeStyles } from '@material-ui/styles';
// import SearchIcon from '@mui/icons-material/Search';
// import softwareHouse from "../Images/softwareHouselogo.png";

// const useStyles = makeStyles({
//     searching: {
//         width: '100%',
//         border: '1px solid',
//         borderRadius: '10px',
//     },
//     search_div: {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: '80%',
//         height: '40px',
//         border: '1px solid black',
//         boxSizing: 'border-box'
//     },
//     search: {
//         width: '100%',
//         fontSize: '1.1rem',
//         padding: '5px',
//         border: 'none',
//         outline: 'none'
//     },
//     search_icon: {
//         margin: '0',
//         width: '50px',
//         height: '100%',
//         fontSize: '1.5rem',
//         background: 'hsl(0, 0%, 18.82%)',
//         color: 'white',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         cursor: 'pointer'
//     },
//     software_title: {
//         display: 'flex',
//         justifyContent: 'space-between',

//     },
//     software_image: {
//         width: '100px',
//         height: '100px'
//     },
// });

const requestStyle = {
    position: 'absolute',
    top: { lg: '50%', xs: '80%' },
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '95%', lg: 'auto' },
    bgcolor: 'background.paper',
    borderRadius: '10px',
    border: '1px solid #000',
    boxShadow: 24,
    p: { lg: 4, xs: 1 },
}

const PostInternship = (props) => {
    return (
        <>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                sx={{ overflow: { xs: 'scroll' } }}
            >
                <Box sx={requestStyle}>
                    <Typography variant="h5" sx={{ textAlign: 'center', fontSize: '2rem', }}>
                        Request Scholarship
                    </Typography>
                    <FormControl>
                        <Grid container spacing={1}>
                            <Grid item lg={6} xs={12}>
                                <TextField id="name" fullWidth label="Full Name" type='text' variant="outlined" required />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <TextField id="year" fullWidth label="Year" type='number' variant="outlined" required />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <TextField id="email" fullWidth label="Email" type="email" variant="outlined" required />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <TextField id="linkedin" fullWidth label="Linked In" type="text" variant="outlined" required />
                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <TextareaAutosize
                                    id="Experience"
                                    maxRows={5}
                                    required
                                    style={{ width: '100%', padding: '10px' }}
                                    placeholder="Write About your skills and interest with in 200 words"
                                />
                            </Grid>
                            <Grid item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'right' }}>
                                <Button variant="contained" onClick={props.handleClose}>Post</Button>
                            </Grid>
                        </Grid>
                    </FormControl>
                </Box>
            </Modal>
        </>
    )
}


const StudentScholarship = () => {
    // const classes = useStyles();

    const [requestJob, setRequestJob] = useState(false);
    // const openRequest = () => setRequestJob(true);
    const closeRequest = () => setRequestJob(false);
    return (
        <>
            <MetaData title="Scholarships" />
            <Navbar />
            <PostInternship open={requestJob} handleClose={closeRequest} />
            <div className='center_utils'>
                <h1 className='main_heading'>Scholarship Coming Soon</h1>
            </div>
            {/* <Container maxWidth="xl" sx={{ padding: '0' }}>
                <Grid container spacing={2}>
                    <Grid item lg={2} sx={{ display: { lg: 'block' }, textAlign: 'center', width: { xs: '100%' } }}>
                        <h1>Scholarship</h1>
                    </Grid>
                    <Grid item lg={8} xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className={classes.search_div}>
                            <input type="text" id="search-student" name="search-student" className={classes.search} />
                            <div className={classes.search_icon}>
                                <SearchIcon />
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={2} sx={{ width: { xs: '100%' }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button variant='contained' onClick={openRequest}>Request Scholarship</Button>
                    </Grid>
                    <Grid item lg={12} xs={12} >
                        <Grid container spacing={2}>
                            <Grid item lg={6}>
                                <Box sx={{ borderRadius: '10px', padding: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                                    <div className={classes.software_title}>
                                        <div>
                                            <h1>Ehsas Scholarship</h1>
                                            <p>Fully Funded</p>
                                        </div>
                                        <img className={classes.software_image} src={softwareHouse} alt="student" />
                                    </div>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="about"
                                        >
                                            <Typography>Description</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt alias impedit quasi dolorum sed provident ab et illum itaque exercitationem, obcaecati iure vero quisquam earum quo fugiat dicta? Libero, doloremque. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus earum dolorum explicabo sapiente cum eius nam nemo consequatur inventore. Quam consequuntur quae facere id at voluptate quaerat dignissimos doloribus soluta?
                                            </p>
                                        </AccordionDetails>
                                    </Accordion>
                                </Box>
                            </Grid>
                            <Grid item lg={6}>
                                <Box sx={{ borderRadius: '10px', padding: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                                    <div className={classes.software_title}>
                                        <div>
                                            <h1>NED Scholars</h1>
                                            <p>Fully Funded</p>
                                        </div>
                                        <img className={classes.software_image} src={softwareHouse} alt="student" />
                                    </div>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="about"
                                        >
                                            <Typography>Description</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt alias impedit quasi dolorum sed provident ab et illum itaque exercitationem, obcaecati iure vero quisquam earum quo fugiat dicta? Libero, doloremque. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus earum dolorum explicabo sapiente cum eius nam nemo consequatur inventore. Quam consequuntur quae facere id at voluptate quaerat dignissimos doloribus soluta?
                                            </p>
                                        </AccordionDetails>
                                    </Accordion>
                                </Box>
                            </Grid>
                            <Grid item lg={6}>
                                <Box sx={{ borderRadius: '10px', padding: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                                    <div className={classes.software_title}>
                                        <div>
                                            <h1>Suleman Habib Scholarship</h1>
                                            <p>Fully Funded</p>
                                        </div>
                                        <img className={classes.software_image} src={softwareHouse} alt="student" />
                                    </div>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="about"
                                        >
                                            <Typography>Description</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt alias impedit quasi dolorum sed provident ab et illum itaque exercitationem, obcaecati iure vero quisquam earum quo fugiat dicta? Libero, doloremque. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus earum dolorum explicabo sapiente cum eius nam nemo consequatur inventore. Quam consequuntur quae facere id at voluptate quaerat dignissimos doloribus soluta?
                                            </p>
                                        </AccordionDetails>
                                    </Accordion>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container> */}
        </>
    )
}

export default StudentScholarship;

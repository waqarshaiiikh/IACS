import React from 'react';
import { Box, Typography, Modal, Grid, Button, TextField, TextareaAutosize, FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material/';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BeenhereIcon from '@mui/icons-material/Beenhere';

const style = {
    position: 'absolute',
    top: { lg: '50%', xs: '50%' },
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '95%', lg: 'auto' },
    bgcolor: 'background.paper',
    borderRadius: '10px',
    border: '1px solid #000',
    boxShadow: 24,
    p: { lg: 4, xs: 1 },
};

const skillStyle = {
    position: 'absolute',
    top: { lg: '50%', xs: '50%' },
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', lg: 'auto' },
    bgcolor: 'background.paper',
    borderRadius: '10px',
    border: '1px solid #000',
    boxShadow: 24,
    p: { lg: 4, xs: 1 },
}

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

function ProfileData(props) {
    return (
        <>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                sx={{ overflow: { xs: 'scroll' } }}
            >
                <Box sx={style}>
                    <Typography variant="h5" sx={{ textAlign: 'center', fontSize: '2rem', }}>
                        Update Profile <AccountCircleIcon sx={{ fontSize: '2rem' }} />
                    </Typography>
                    <FormControl>
                        <Grid container spacing={1}>
                            <Grid item lg={6} xs={12}>
                                <TextField id="email" fullWidth label="Email" type="email" variant="outlined" required />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <TextField id="phoneNumber" fullWidth label="Phone No" type='number' variant="outlined" required />
                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <TextField id="address" fullWidth label="Address" type="text" variant="outlined" required />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <TextField id="website" fullWidth label="Website" type="text" variant="outlined" required />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <TextField id="linkedin" fullWidth label="Linked In" type="text" variant="outlined" required />
                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <label for="profile" style={{ marginRight: "10px" }}>Company Logo</label>
                                <input accept="image/*" type="file" id="profile" required />
                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <TextareaAutosize
                                    id="about"
                                    maxRows={5}
                                    required
                                    style={{ width: '100%', padding: '10px' }}
                                    placeholder="Write About yourself with in 200 words"
                                />
                            </Grid>
                            <Grid item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'right' }}>
                                <Button variant="contained" onClick={props.handleClose}>Save</Button>
                            </Grid>
                        </Grid>
                    </FormControl>
                </Box>
            </Modal>
        </>
    )
}

function ServiceData(props) {
    return (
        <>
            <Modal
                open={props.open}
                onClose={props.handleClose}
            >
                <Box sx={skillStyle}>
                    <Typography variant="h5" sx={{ textAlign: 'center', fontSize: '2rem', }}>
                        Update Services <BeenhereIcon />
                    </Typography>
                    <FormControl>
                        <FormGroup>
                            <Grid container>
                                {
                                    services.map((service, index) => (
                                        <Grid item lg={4}>
                                            <FormControlLabel key={index} control={<Checkbox />} label={service} />
                                        </Grid>
                                    ))
                                }
                                <Grid item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'right' }}>
                                    <Button variant="contained" onClick={props.handleClose}>Save</Button>
                                </Grid>
                            </Grid>
                        </FormGroup>
                    </FormControl>
                </Box>
            </Modal>
        </>
    )
}

export { ProfileData, ServiceData}
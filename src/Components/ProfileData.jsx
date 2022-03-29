import React, { useState } from 'react';
import { Box, Typography, Modal, Grid, Button, TextField, MenuItem, TextareaAutosize, FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material/';
import { DateRangePicker, LocalizationProvider} from '@mui/lab/';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import WorkIcon from '@mui/icons-material/Work';

const style = {
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

const skills = ["HTML", "CSS",
    "JavaScript",
    "React Js",
    "Python",
    "C / C++",
    "Java",
    "Web Developer",
    "React Native",
    "MongoDB",
    "Node Js",
    "Express Js",
    "Oracle"]

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
                            <Grid item lg={4} xs={12}>
                                <TextField id="enrollnment" fullWidth label="Enrollnment No" type='text' variant="outlined" required />
                            </Grid>
                            <Grid item lg={4} xs={12}>
                                <TextField id="year" fullWidth label="Year" variant="outlined" required select>
                                    <MenuItem key="first" value="first">First</MenuItem>
                                    <MenuItem key="second" value="second">Second</MenuItem>
                                    <MenuItem key="third" value="third">Third</MenuItem>
                                    <MenuItem key="final" value="final">Final</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item lg={4} xs={12}>
                                <TextField id="gpa" fullWidth label="CGPA" type='number' variant="outlined" required />
                            </Grid>
                            <Grid item lg={4} xs={12}>
                                <TextField id="semester" fullWidth label="Semester" variant="outlined" required select>
                                    <MenuItem key="first" value="first">Fall / First</MenuItem>
                                    <MenuItem key="second" value="second">Spring / Second</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item lg={4} xs={12}>
                                <TextField id="age" fullWidth label="Age" type='number' inputProps={{ inputProps: { min: 16, max: 30 } }} variant="outlined" required />
                            </Grid>
                            <Grid item lg={4} xs={12}>
                                <TextField id="gender" fullWidth label="Gender" variant="outlined" required select>
                                    <MenuItem key="male" value="male">Male</MenuItem>
                                    <MenuItem key="female" value="female">Female</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <TextField id="address" fullWidth label="Address" type="text" variant="outlined" required />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <TextField id="github" fullWidth label="Github" type="text" variant="outlined" required />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <TextField id="linkedin" fullWidth label="Linked In" type="text" variant="outlined" required />
                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <label for="profile" style={{ marginRight: "10px" }}>Profile Picture</label>
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

function SkillData(props) {
    return (
        <>
            <Modal
                open={props.open}
                onClose={props.handleClose}
            >
                <Box sx={skillStyle}>
                    <Typography variant="h5" sx={{ textAlign: 'center', fontSize: '2rem', }}>
                        Update Skills <BeenhereIcon />
                    </Typography>
                    <FormControl>
                        <FormGroup>
                            <Grid container>
                                {
                                    skills.map((skill, index) => (
                                        <Grid item lg={3}>
                                            <FormControlLabel key={index} control={<Checkbox />} label={skill} />
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

function ExperienceData(props) {
    const [value, setValue] = useState([null, null]);
    return (
        <>
            <Modal
                open={props.open}
                onClose={props.handleClose}
            >
                <Box sx={skillStyle}>
                    <Typography variant="h5" sx={{ textAlign: 'center', fontSize: '2rem', }}>
                        Update Experience <WorkIcon />
                    </Typography>
                    <FormControl>
                        <Grid container spacing={1}>
                            <Grid item lg={6} xs={12}>
                                <TextField id="company" fullWidth label="Company Name" type="text" variant="outlined" required />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <TextField id="role" fullWidth label="Job Role" type="text" variant="outlined" required />
                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateRangePicker
                                        startText="Start Date"
                                        endText="End Date"
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(startProps, endProps) => (
                                            <React.Fragment>
                                                <TextField {...startProps} />
                                                <Box sx={{ mx: 2 }}> to </Box>
                                                <TextField {...endProps} />
                                            </React.Fragment>
                                        )}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <TextareaAutosize
                                    id="about"
                                    maxRows={5}
                                    required
                                    style={{ width: '100%', padding: '10px' }}
                                    placeholder="Write Description About your Job in 200 words"
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




export { ProfileData, SkillData, ExperienceData }
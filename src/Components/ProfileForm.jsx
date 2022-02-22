import React from 'react'
import { Container, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { MenuItem, FormControl, Input } from '@mui/material';
import Button from '@mui/material/Button';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import "../CSS/ProfileForm.css"

const ProfileForm = () => {
    return (
        <>
            <Container>
                <FormControl>
                    <Grid container spacing={3}>
                        <Grid item lg={6}>
                            <div className="input-box">
                                <TextField fullWidth id="name" label="Full Name" variant="standard" placeholder="Enter your Name" required />
                            </div>
                        </Grid>
                        <Grid item lg={6}>
                            <div className="input-box">
                                <TextField fullWidth id="email" type="email" label="Email" variant="standard" placeholder="Enter your Email" required />
                            </div>
                        </Grid>
                        <Grid item lg={6}>
                            <div className="input-box">
                                <TextField fullWidth id="mobileNo" type="tel" label="Mobile No" variant="standard" pattern="[0-9]{4}-[0-9]{7}" placeholder="03XX-XXXXXXX" required />
                            </div>
                        </Grid>
                        <Grid item lg={6}>
                            <div className="input-box">
                                <TextField fullWidth id="enrollment" label="Enrollment Number" variant="standard" placeholder="Enter your Enrollment Number" required />
                            </div>
                        </Grid>
                        <Grid item lg={6}>
                            <div className="input-box">
                                <TextField
                                    fullWidth
                                    id="gender"
                                    select
                                    label="Gender"
                                    helperText="Please select your gender"
                                >
                                    <MenuItem key="male" value="male">Male</MenuItem>
                                    <MenuItem key="female" value="female">Female</MenuItem>
                                </TextField>
                            </div>
                        </Grid>
                        <Grid item lg={6}>
                            <div className="input-box">
                                <TextField
                                    fullWidth
                                    id="age"
                                    label="Age"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                    required
                                />
                            </div>
                        </Grid>
                        <Grid item lg={6}>
                            <div className="input-box">
                                <TextField
                                    fullWidth
                                    id="year"
                                    select
                                    label="Year"
                                    helperText="Please select your year"
                                >
                                    <MenuItem key="first" value="first">First</MenuItem>
                                    <MenuItem key="second" value="second">Second</MenuItem>
                                    <MenuItem key="third" value="third">Third</MenuItem>
                                    <MenuItem key="final" value="final">Final</MenuItem>
                                </TextField>
                            </div>
                        </Grid>
                        <Grid item lg={6}>
                            <div className="input-box">
                                <TextField fullWidth id="university" label="University Name" variant="standard" placeholder="Enter University Name" required />
                            </div>
                        </Grid>
                        <Grid item lg={6}>
                            <div className="input-box">
                                <TextField fullWidth id="discipline" label="Discipline Name" variant="standard" placeholder="Enter Discipline Name" required />
                            </div>
                        </Grid>
                        <Grid item lg={6}>
                            <div className="input-box">
                                <TextField fullWidth id="skills" label="Skill" variant="standard" placeholder="Enter your skill" required />
                            </div>
                        </Grid>
                        <Grid item lg={6}>
                            <div className="file-box">
                                <Input accept="image/png, image/jpeg" id="profile-picture" multiple type="file" required />
                                <label htmlFor="profile-picture">
                                    <AddAPhotoIcon /> Upload Picture
                                </label>
                            </div>
                        </Grid>
                        <Grid item lg={6}>
                            <div className="file-box">
                                <Input accept="application/pdf" id="resume" multiple type="file" required />
                                <label htmlFor="resume">
                                    <UploadFileIcon /> Upload Resume
                                </label>
                            </div>
                        </Grid>
                        <Grid item lg={12}>
                            <div className="input-box">
                                <TextField
                                    id="standard-multiline-flexible"
                                    label="Bio"
                                    multiline
                                    fullWidth
                                    required
                                    maxRows={4}
                                    variant="standard"
                                />
                            </div>
                        </Grid>
                        <Grid item lg={12} display='flex' justifyContent='right'>
                            <div className="profile-submit">
                                <Button variant="contained">Submit</Button>
                            </div>
                        </Grid>
                    </Grid>
                </FormControl>
            </Container>
        </>
    )
}

export default ProfileForm

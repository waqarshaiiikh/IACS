import React from 'react'
import { Container, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { MenuItem, FormControl} from '@mui/material';
import Button from '@mui/material/Button';
import "../CSS/ProfileForm.css"

const ClientPost = () => {
    return (
        <>
            <Container>
                <FormControl>
                    <Grid container spacing={5}>
                        <Grid item lg={12}>
                            <div className="input-box">
                                <TextField fullWidth id="title" label="Title" variant="standard" placeholder="Enter your title" required />
                            </div>
                        </Grid>
                        <Grid item lg={12}>
                            <div className="input-box">
                                <TextField
                                    id="post"
                                    label="Post"
                                    multiline
                                    fullWidth
                                    required
                                    maxRows={4}
                                    variant="standard"
                                />
                            </div>
                        </Grid>
                        <Grid item lg={6}>
                            <div className="input-box">
                                <TextField
                                    fullWidth
                                    id="category"
                                    select
                                    label="category"
                                    helperText="Please select your Category"
                                >
                                    <MenuItem key="job" value="job">Job</MenuItem>
                                    <MenuItem key="internship" value="internship">Internship</MenuItem>
                                    <MenuItem key="scholarship" value="scholarship">Scholarship</MenuItem>
                                    <MenuItem key="project" value="project"Project></MenuItem>
                                </TextField>
                            </div>
                        </Grid>
                        <Grid item lg={6}>
                            <div className="input-box">
                                <TextField fullWidth id="hrname" label="HR Name" variant="standard" placeholder="Enter HR Name" required />
                            </div>
                        </Grid>
                        <Grid item lg={12} display='flex' justifyContent='right'>
                            <div className="profile-submit">
                                <Button variant="contained">Post</Button>
                            </div>
                        </Grid>
                    </Grid>
                </FormControl>
            </Container>
        </>
    )
}

export default ClientPost
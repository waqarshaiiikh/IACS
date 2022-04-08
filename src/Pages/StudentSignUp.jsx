import React, {useState} from 'react'
import axios from 'axios';
import { Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom'
import { makeStyles } from '@mui/styles';
import { Typography } from '@material-ui/core';
import { MenuItem, FormControl, TextField, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";


const port = 8393;
axios.defaults.withCredentials = true;


const useStyles = makeStyles({
   
    button:{
        background: '#42b6EE !important',
        border: '0 !important',
        borderRadius: '3 !important',
        color: 'white !important',
        height: 48,
        padding: '0 30px !important',
    }

});
const StudentSignUp = () => {

    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const email = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // handle button click of login form
    const handleLogin = async () => {
        setError(null);
        setLoading(true);

        // email: email.value, password: password.value
        // const json = JSON.stringify({ email: "waqarshaiiikh", password: "225" })

        axios.post(`http://localhost:${port}/api/login`, { email: email.value, password: password.value , clientName: "student"}, 
            {
                headers: {  'Content-Type': 'application/json' }
            },
            {
                withCredentials: true,
            }
        ).then(response => {
            setLoading(false);
            navigate('/'); 
        })
        .catch(error => {
            setLoading(false);
                try{
                    if(error.response.status>=400 || error.response.status<= 499 )
                        setError("Invalid Cridential");
                }
                catch{
                    setError("Something went wrong. Please try again later.")
                }
            });
    }


    return (
        <>
            <Container sx={{m:{xs:2, lg:'none'}}}>
                <FormControl>
                    <Grid container spacing={3}>
                        <Grid item lg={12} xs={12} display='flex' justifyContent='center'>
                            <Typography variant='h4'>
                                Student SignUp 
                            </Typography>
                        </Grid>
                        <Grid item lg={6} xs={12}>
                            <TextField id="name" fullWidth label="Full Name" type="text" variant="outlined" required />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                            <TextField id="email" fullWidth label="Email" type="email" variant="outlined" required />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                            <TextField id="phoneNumber" fullWidth label="Phone No" type='number' variant="outlined" required />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                            <TextField id="enrollnment" fullWidth label="Enrollnment No" type='text' variant="outlined" required />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                            <TextField id="univeristy" fullWidth label="University" type='text' variant="outlined" required />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                            <TextField id="department" fullWidth label="Department" type='text' variant="outlined" required />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                            <TextField id="year" fullWidth label="Year" variant="outlined" required select>
                                <MenuItem key="first" value="first">First</MenuItem>
                                <MenuItem key="second" value="second">Second</MenuItem>
                                <MenuItem key="third" value="third">Third</MenuItem>
                                <MenuItem key="final" value="final">Final</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item lg={6} xs={12}>
                            <TextField id="semester" fullWidth label="Semester" variant="outlined" required select>
                                <MenuItem key="first" value="first">Fall / First</MenuItem>
                                <MenuItem key="second" value="second">Spring / Second</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item lg={6} xs={12}>
                            <TextField id="gpa" fullWidth label="CGPA" type='number' variant="outlined" required />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                            <TextField id="password" fullWidth label="Password" type='password' variant="outlined" required />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                            <TextField id="cpassword" fullWidth label="Confirm Password" type='password' variant="outlined" required />
                        </Grid>
                        <Grid item lg={6} xs={12} display='flex' justifyContent='right' >
                            <Button className={classes.button} component={Link} to="/v1/signup" outline="none" sx={{background:'42b6EE'}}>Sign Up</Button>
                        </Grid>
                    </Grid>
                </FormControl>
            </Container>
        </>
    )
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}

export default StudentSignUp

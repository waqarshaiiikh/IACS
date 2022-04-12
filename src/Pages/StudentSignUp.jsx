import React, {useState} from 'react'
import apiCAll from '../integration/apiCall';
import { Container, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Typography } from '@material-ui/core';
import { MenuItem, FormControl, TextField, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";


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
    const [error, setError] = useState(null);
    const navigate      = useNavigate();

    const fname         = useFormInput('');
    const lname         = useFormInput('');
    const email         = useFormInput('@cloud.neduet.edu.pk');
    const phoneNumber   = useFormInput('+92');
    const enrollment    = useFormInput('NED/');
    const university    = useFormInput('NEDUET');
    const department    = useFormInput('');
    const CGPA          = useFormInput('');
    const semester      = useFormInput('1');
    const year          = useFormInput('1');
    const password      = useFormInput('');
    const cpassword     = useFormInput('');


    // handle button click of login form
    const handleLogin = async () => {
        setError(null);
        setLoading(true);

        const reqData = { 
            fname         : fname.value,
            lname         : lname.value,
            email         : email.value,
            phoneNumber   : phoneNumber.value,
            enrollment    : enrollment.value,
            university    : university.value,
            department    : department.value,
            CGPA          : CGPA.value,
            semester      : semester.value,
            year          : year.value,
            password      : password.value, 
            clientName    : "student"
        };

        apiCAll(`/api/signup`,reqData)
        .then(response => {
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
                            <TextField id="fname" fullWidth label="First Name" {...fname} type="text" variant="outlined" required />
                        </Grid>
                        
                        <Grid item lg={6} xs={12}>
                            <TextField id="lname" fullWidth label="Last Name" {...lname} type="text" variant="outlined" required />
                        </Grid>
                        
                        <Grid item lg={6} xs={12}>
                            <TextField id="email" fullWidth label="Email" placeholder='abc@cloud.neduet.edu.pk' {...email} type="email" variant="outlined" required />
                        </Grid>
                        
                        <Grid item lg={6} xs={12}>
                            <TextField id="phoneNumber" fullWidth label="Phone No" {...phoneNumber} type='tel' variant="outlined" required />
                        </Grid>
                        
                        <Grid item lg={6} xs={12}>
                            <TextField id="enrollnment" fullWidth label="Enrollnment No" {...enrollment} type='text' variant="outlined" required />
                        </Grid>
                        
                        <Grid item lg={6} xs={12}>
                            <TextField id="univeristy" fullWidth label="University" {...university} type='text' variant="outlined" required />
                        </Grid>
                        
                        <Grid item lg={6} xs={12}>
                            <TextField id="department" fullWidth label="Department" {...department} type='text' variant="outlined" required />
                        </Grid>
                        
                        <Grid item lg={6} xs={12}>
                            <TextField id="year" fullWidth label="Year" {...year} variant="outlined" required select>
                                <MenuItem key="first" value="1">First</MenuItem>
                                <MenuItem key="second" value="2">Second</MenuItem>
                                <MenuItem key="third" value="3">Third</MenuItem>
                                <MenuItem key="final" value="4">Final</MenuItem>
                            </TextField>
                        </Grid>
                        
                        <Grid item lg={6} xs={12}>
                            <TextField id="semester" fullWidth label="Semester" {...semester} variant="outlined" required select>
                                <MenuItem key="first" value="1">Fall / First</MenuItem>
                                <MenuItem key="second" value="2">Spring / Second</MenuItem>
                            </TextField>
                        </Grid>
                        
                        <Grid item lg={6} xs={12}>
                            <TextField id="gpa" fullWidth label="CGPA" type='number' {...CGPA} variant="outlined" required />
                        </Grid>
                        
                        <Grid item lg={6} xs={12}>
                            <TextField id="password" fullWidth label="Password" type='password' {...password} variant="outlined" required />
                        </Grid>

                        <Grid item lg={6} xs={12}>
                            <TextField id="cpassword" fullWidth label="Confirm Password" type='password' {...cpassword} variant="outlined" required />
                        </Grid>

                        {
                            error &&
                            <Grid item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <> <small style={{ color: 'red' }}>{error}</small> </>
                            </Grid>
                        }

                        <Grid item lg={6} xs={12} display='flex' justifyContent='right' >
                            <Button className={classes.button} onClick={handleLogin} disabled={loading} outline="none" sx={{background:'42b6EE'}}>
                            {
                                loading ? "uploading..." : "Sign Up" 
                            }
                           
                            </Button>
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



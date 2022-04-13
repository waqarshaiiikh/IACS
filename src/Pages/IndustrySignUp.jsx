import React, {useState} from 'react'
import { makeStyles } from '@mui/styles';
import { Typography } from '@material-ui/core';
import { FormControl, TextField, Button, Container, Grid } from '@mui/material';
import apiCAll from '../integration/apiCall';
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

const IndustrySignUp = () => {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate      = useNavigate();

    const companyName   = useFormInput('');
    const hrName        = useFormInput('');
    const email         = useFormInput('');
    const phoneNumber   = useFormInput('+92');
    const cnic          = useFormInput('');
    const city          = useFormInput('');
    const country       = useFormInput('Pakistan');
    const password      = useFormInput('');
    const cpassword     = useFormInput('');

    // handle button click of login form
    const handleLogin = async () => {
        setError(null);
        setLoading(true);

        const reqData = { 
            email         : email.value,
            companyName   : companyName.value,
            hrName        : hrName.value,
            phoneNumber   : phoneNumber.value,
            cnic          : cnic.value,
            city          : city.value,
            country       : country.value,
            password      : password.value,
            clientName    : "industry"
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
                                Industry SignUp 
                            </Typography>
                        </Grid>
                        
                        <Grid item lg={6} xs={12}>
                            <TextField id="cname" fullWidth label="Company Name" {...companyName} type="text" variant="outlined" required />
                        </Grid>
                        
                        <Grid item lg={6} xs={12}>
                            <TextField id="hrname" fullWidth label="HR Name" {...hrName } type='text' variant="outlined" required />
                        </Grid>
                        
                        <Grid item lg={6} xs={12}>
                            <TextField id="email" fullWidth label="Email" {...email } type="email" variant="outlined" required />
                        </Grid>
                        
                        <Grid item lg={6} xs={12}>
                            <TextField id="phoneNumber" fullWidth label="Phone No" {...phoneNumber } type='tel' variant="outlined" required />
                        </Grid>
                        
                        <Grid item lg={6} xs={12}>
                            <TextField id="cnic" fullWidth label="CNIC / NTN" {...cnic } type='number' variant="outlined" required />
                        </Grid>
                        
                        <Grid item lg={6} xs={12}>
                            <TextField id="city" fullWidth label="City" {...city } type='text' variant="outlined" required />
                        </Grid>
                        
                        <Grid item lg={6} xs={12}>
                            <TextField id="country" fullWidth label="Country" {...country } type='text' variant="outlined" required />
                        </Grid>
                        
                        <Grid item lg={6} xs={12}>
                            <TextField id="password" fullWidth label="Password" {...password } type='password' variant="outlined" required />
                        </Grid>

                        <Grid item lg={6} xs={12}>
                            <TextField id="cpassword" fullWidth label="Confirm Password"  {...cpassword } type='password' variant="outlined" required />
                        </Grid>

                        <Grid item lg={6} xs={12}>
                            <TextField id="otp" fullWidth label="Generate OTP"  type='number' variant="outlined" required />
                        </Grid>
                        
                        {
                            error &&
                            <Grid item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <> <small style={{ color: 'red' }}>{error}</small> </>
                            </Grid>
                        }

                        <Grid item lg={12} xs={12} display='flex' justifyContent='right' >
                            <Button className={classes.button}  outline="none" sx={{background:'42b6EE', marginRight:'10px'}}>
                                Generate OTP
                            </Button>
                            <Button className={classes.button} onClick={handleLogin} disabled={loading} outline="none" sx={{background:'42b6EE'}}>
                           { loading ? "uploading..." : "Sign Up" }
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


export default IndustrySignUp


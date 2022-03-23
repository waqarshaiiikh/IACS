import React, { useState } from 'react'
import axios from 'axios';
import { makeStyles } from "@material-ui/core";
import { FormControl, TextField, Button, Container, Grid, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom'

const port = 8393;
axios.defaults.withCredentials = true;

const useStyles = makeStyles({
    button: {
      letterSpacing: '2px',
      color: 'white !important',
      fontSize: '1rem !important',
      fontWeight: 'bold',
      margin: '0px 20px !important',
  
      '&:focus': {
        outline: 'none',
      }
    }
  });

const StudentSignIn = () => {
    const classes=useStyles();
    const [loading, setLoading] = useState(false);
    const email = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);

    // handle button click of login form
    const handleLogin = async () => {
        setError(null);
        setLoading(true);

        // email: email.value, password: password.value
        // const json = JSON.stringify({ email: "waqarshaiiikh", password: "225" })

        axios.post(`http://localhost:${port}/api/login`, { email: email.value, password: password.value }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
            , {
                withCredentials: true,
            }
        ).then(response => {
            setLoading(false);
            alert(`${response.status} login successfull`);
            // setUserSession(response.data.token, response.data.user);
            // props.history.push('/dashboard');
        })
            .catch(error => {
                setLoading(false);
                if (error.response.status === 401 || 400)
                    alert(`${error.response.status} Invalid Crediential`);
                //    setError(error.response.data.message);
                else
                    alert('server Fail to connect');
                setError("Something went wrong. Please try again later.");
            });

    }

    return (
        <>
            <Container>
                <FormControl>
                    <Box
                        sx={{
                            width: { lg: "500px", xs: 'auto' },
                            background: '#F6F6F6', padding: '15px',
                            display: 'flex', justifyContent: 'center',
                            borderRadius: '10px',
                            'boxShadow': 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                        }}>
                        <Grid container spacing={3}>
                            <Grid item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'center', textAlign:'center' }} >
                                <Typography variant="h4">
                                    Student LogIn
                                </Typography>
                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <TextField id="email" type='password' {...email} fullWidth label="Email" variant="outlined" required />
                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <TextField id="password" type='password' {...password} fullWidth label="Password" variant="outlined" required />
                            </Grid>
                            <Grid item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button className={classes.button} onClick={handleLogin} variant="contained" component={Link} to="/dashboard">
                                    Log In
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
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

export default StudentSignIn

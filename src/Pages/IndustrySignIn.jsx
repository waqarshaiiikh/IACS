import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from "@material-ui/core";
import { FormControl, TextField, Button, Container, Grid, Box, Typography } from '@mui/material';

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

const IndustrySignIn = () => {

    const classes = useStyles();
    return (
        <>
            <Container>
                <FormControl>
                    <Box 
                    sx={{ width: { lg: "500px", xs: 'auto' }, 
                    background: '#F6F6F6', padding: '15px', 
                    display: 'flex', justifyContent: 'center', 
                    borderRadius:'10px',
                    'boxShadow': 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', }}>
                        <Grid container spacing={3}>
                            <Grid item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'center', textAlign:'center' }} >
                                <Typography variant="h4">
                                    Industry LogIn
                                </Typography>
                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <TextField id="email" type='password' fullWidth label="Email" variant="outlined" required />
                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <TextField id="password" type='password' fullWidth label="Password" variant="outlined" required />
                            </Grid>
                            <Grid item lg={12} xs={12} sx={{display: 'flex', justifyContent: 'center' }}>
                                <Button className={classes.button} variant="contained" component={Link} to="/dashboard">
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

export default IndustrySignIn
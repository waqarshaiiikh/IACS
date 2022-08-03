import React, { useState , useContext} from 'react';
import { makeStyles } from '@material-ui/styles';
import { FormControl, TextField, Button, Container, Grid, Box, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import noteContext from '../context/notes/noteContext';
import { apiCAll } from '../integration/apiCall';


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
    const [loading, setLoading] = useState(false);
    const email = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    
    const a = useContext(noteContext);
    const gettingData = a.industry.gettingIndData;



    // handle button click of login form
    const handleLogin = async () => {

        setError(null);
        setLoading(true);

        const reqData = { email: email.value, password: password.value , clientName: "industry"};
        apiCAll(`/api/login`,'post', reqData)
        .then( async response => {
            await gettingData();
            a.setUserType("industry")
            a.setSignin(true);
            localStorage.setItem('UserType', JSON.stringify("industry"));
            localStorage.setItem('Signin', JSON.stringify(true));
            setLoading(false);
            navigate('/'); 
        })
        .catch(error => {
            setLoading(false);
            try{
                if(error.response.status>=400 || error.response.status<= 499 )
                    setError("Wrong Password");
            }
            catch{
                setError("Something went wrong. Please try again later.")
            }
        });
    }



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
                                <TextField id="email" type='text'  {...email}  fullWidth label="Email" variant="outlined" required />
                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <TextField id="password" type='password'  {...password} fullWidth label="Password" variant="outlined" required />
                            </Grid>
                            {
                            error &&
                            <Grid item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <> <small style={{ color: 'red' }}>{error}</small> </>
                            </Grid>
                            }
                            <Grid item lg={12} xs={12} sx={{display: 'flex', justifyContent: 'center' }}>
                                <Button className={classes.button}   onClick={handleLogin} disabled={loading} variant="contained">
                                {loading ? 'Loading...' : 'Login'}
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


export default IndustrySignIn
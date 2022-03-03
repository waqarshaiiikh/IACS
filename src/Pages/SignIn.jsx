import React, {useState} from 'react'
import axios from 'axios';

import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const port = 8393;
axios.defaults.withCredentials= true;

const SignIn = () => {
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
        
    axios.post(`http://localhost:${port}/api/login`, { email : email.value , password: password.value },{
        headers: {
          'Content-Type': 'application/json'
        }}
        ,{
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
        //  setError("Something went wrong. Please try again later.");
      });
   
    }

    return (
        <>
            <div className="signIn-form">
                <h1>Student Login</h1>
                <div className="signin-info">
                    {/* <label htmlFor="fullname" className="form-label">
                        Email
                    </label> */}
                    <TextField id="email" type='text' {...email} fullWidth label="Email" variant="outlined" required />
                </div>
                <div className="signin-info">
                    {/* <label htmlFor="email" className="form-label">
                        Password
                    </label> */}
                    <TextField id='password' {...password} fullWidth label="Password" type='password' variant="outlined" required />
                </div>
                <div className="submit">
                    <Link to="/dashboard">
                        <Button variant="contained" onClick={handleLogin}>Log In</Button>
                    </Link>
                </div>
            </div>
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

export default SignIn

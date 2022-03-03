import React from 'react'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const SignUp = () => {
    return (
        <>
            <div className="signIn-form">
                <h1>Student Sign Up</h1>
                <div className="signin-info">
                    <TextField id="email" fullWidth label="Email" variant="outlined" required />
                </div>
                <div className="signin-info">
                    <TextField id="enrollnment" fullWidth label="Enrollnment" variant="outlined" required />
                </div>
                <div className="signin-info">
                    <TextField id="password" fullWidth label="Password" type='password' variant="outlined" required />
                </div>
                <div className="submit">
                    <Link to="/">
                        <Button variant="contained">Sign Up</Button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default SignUp

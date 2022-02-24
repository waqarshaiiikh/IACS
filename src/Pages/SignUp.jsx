import React from 'react'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const SignUp = () => {
    return (
        <>
            <div className="signIn-form">
                <h1>Sign Up</h1>
                <div className="signin-info">
                    <label htmlFor="fullname" className="form-label">
                        Id
                    </label>
                    <TextField id="email" fullWidth label="Id" variant="outlined" required />
                </div>
                <div className="signin-info">
                    <label htmlFor="email" className="form-label">
                        Password
                    </label>
                    <TextField id="outlined-basic" fullWidth label="Password" type='password' variant="outlined" required />
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

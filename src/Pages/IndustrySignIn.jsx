import React from 'react'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const IndustrySignIn = () => {
    return (
        <>
            <div className="signIn-form">
                <h1>Software House Login</h1>
                <div className="signin-info">
                    <label htmlFor="fullname" className="form-label">
                        Email
                    </label>
                    <TextField id="email" fullWidth label="Email" variant="outlined" required />
                </div>
                <div className="signin-info">
                    <label htmlFor="email" className="form-label">
                        Password
                    </label>
                    <TextField id="password" fullWidth label="Password" type='password' variant="outlined" required />
                </div>
                <div className="submit">
                    <Link to="/">
                        <Button variant="contained">Log In</Button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default IndustrySignIn
import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Password = () => {
    return (
        <>
            <div className="signIn-form">
                <h1>Change Password</h1>
                <div className="signin-info">
                    <label htmlFor="email" className="form-label">
                        New Password
                    </label>
                    <TextField id="email" fullWidth label="New password" type="password" variant="outlined" required />
                </div>
                <div className="signin-info">
                    <label htmlFor="email" className="form-label">
                        Confirm Password
                    </label>
                    <TextField id="email" fullWidth label="Confirm password" type="password" variant="outlined" required />
                </div>
                <div className="submit">
                <Button variant="contained">Change</Button>
                </div>
            </div>
        </>
    )
}

export default Password

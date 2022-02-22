import React from 'react'
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import "../CSS/Request.css"

const Request = () => {
    return (
        <>
            <div className="request-container">
                <div className="request-title">
                    <span>Request to Admin</span>
                </div>
                <div className="request-form">
                    <form action="">
                        <div className="request-box">
                            <textarea name="" id="" cols="30" rows="10"></textarea>
                        </div>
                        <div className="request-option">
                            <TextField
                                id="year"
                                select
                                label="Request for"
                                helperText="Please select your year"
                                required
                            >
                                <MenuItem key="first" value="job">Job</MenuItem>
                                <MenuItem key="second" value="internship">Internship</MenuItem>
                                <MenuItem key="third" value="scholarship">Scholarship</MenuItem>
                                <MenuItem key="final" value="project">Project</MenuItem>
                            </TextField>
                            <Button variant="contained">Submit</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Request

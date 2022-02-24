import React from 'react'
import { Container, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { MenuItem, FormControl, Input } from '@mui/material';
import Button from '@mui/material/Button';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import "../CSS/ProfileForm.css"

const ClientProfileForm = () => {
  return (
    <>
      <Container>
        <FormControl>
          <Grid container spacing={3}>
            <Grid item lg={6}>
              <div className="input-box">
                <TextField fullWidth id="name" label="Company Name" variant="standard" placeholder="Enter your Name" required />
              </div>
            </Grid>
            <Grid item lg={6}>
              <div className="input-box">
                <TextField fullWidth id="email" type="email" label="Email" variant="standard" placeholder="Enter your Email" required />
              </div>
            </Grid>
            <Grid item lg={6}>
              <div className="input-box">
                <TextField fullWidth id="mobileNo" type="tel" label="Mobile No" variant="standard" pattern="[0-9]{4}-[0-9]{7}" placeholder="03XX-XXXXXXX" required />
              </div>
            </Grid>
            <Grid item lg={6}>
              <div className="input-box">
                <TextField fullWidth id="nannumber" label="NAN Number" variant="standard" placeholder="Enter your Enrollment Number" required />
              </div>
            </Grid>
            <Grid item lg={6}>
              <div className="input-box">
                <TextField
                  fullWidth
                  id="category"
                  select
                  label="category"
                  helperText="Please select your Category"
                >
                  <MenuItem key="national" value="national">National</MenuItem>
                  <MenuItem key="international" value="international">International</MenuItem>
                  <MenuItem key="hybrid" value="hybrid">Hybrid</MenuItem>
                </TextField>
              </div>
            </Grid>
            <Grid item lg={6}>
              <div className="input-box">
                <TextField fullWidth id="hrname" label="HR Name" variant="standard" placeholder="Enter HR Name" required />
              </div>
            </Grid>
            <Grid item lg={12}>
              <div className="input-box">
                <TextField fullWidth id="address" label="Address" variant="standard" placeholder="Enter Complete Address" required />
              </div>
            </Grid>
            <Grid item lg={12}>
              <div className="input-box">
                <TextField
                  id="aboutCompany"
                  label="About your company"
                  multiline
                  fullWidth
                  required
                  maxRows={4}
                  variant="standard"
                />
              </div>
            </Grid>
            <Grid item lg={6}>
              <div className="file-box">
                <Input accept="image/png, image/jpeg" id="profile-picture" multiple type="file" required />
                <label htmlFor="profile-picture">
                  <AddAPhotoIcon /> Upload Picture
                </label>
              </div>
            </Grid>
            <Grid item lg={12} display='flex' justifyContent='right'>
              <div className="profile-submit">
                <Button variant="contained">Submit</Button>
              </div>
            </Grid>
          </Grid>
        </FormControl>
      </Container>
    </>

  )
}

export default ClientProfileForm
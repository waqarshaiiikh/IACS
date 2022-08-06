import React from 'react';
import { Container, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { FormControl} from '@mui/material';
import Button from '@mui/material/Button';
import '../App.css';
import "../CSS/ContactUs.css"

function ContactUs() {
  return (
    <>
      <div className="contact">
        <h1>Contact US</h1>
        <div className="contact_Container">
          <Container>
            <FormControl>
              <Grid container spacing={3}>
                <Grid item lg={12} xs={12}>
                  <div className="input-box">
                    <TextField fullWidth id="name" label="Full Name" variant="standard" placeholder="Enter your Name" required />
                  </div>
                </Grid>
                <Grid item lg={12} xs={12}>
                  <div className="input-box">
                    <TextField fullWidth id="name" label="Email" variant="standard" placeholder="Enter your Name" required />
                  </div>
                </Grid>
                <Grid item lg={12} xs={12}>
                  <div className="input-box">
                    <TextField
                      id="standard-multiline-flexible"
                      label="Message"
                      multiline
                      fullWidth
                      required
                      maxRows={6}
                      variant="standard"
                    />
                  </div>
                </Grid>
                <Grid item lg={12} xs={12} display='flex' justifyContent='right'>
                  <div className="profile-submit">
                    <Button variant="contained">Submit</Button>
                  </div>
                  
                </Grid>
              </Grid>
            </FormControl>
          </Container>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
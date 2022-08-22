import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { FormControl} from '@mui/material';
import Button from '@mui/material/Button';
import '../App.css';
import "../CSS/ContactUs.css"
import { apiCAll } from '../integration/apiCall';

function ContactUs() {
  const [email, setEmail]         = useState("")
  const [fullName, setFullName]   = useState("")
  const [messageData, setMessageData]     = useState("")
  
  
  
  const handleSubmit = (e)=>{

    e.preventDefault();

    const message = { fullName, email, messageData }
    apiCAll('/api/user/message/post', 'post', { message }).then(
      (response) => {
        if (response.data) {
          setEmail("");
          setFullName("");
          setMessageData("");
          alert("message has sucessfully send")
        }
      }
    ).catch(
      (e)=>{
        console.log(e)        
        alert("Try again later")
      }
    )
  }


  return (
    <>
      <div className="contact">
        <h1>Contact US</h1>
        <div className="contact_Container">
          <Container>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>


                <Grid item lg={12} xs={12}>
                  <div className="input-box">
                    <TextField fullWidth id="name" value={fullName} label="Full Name" 
                    onChange={e => setFullName(e.target.value)}
                    inputProps={{
                                        maxLength: 40,
                                        minLength: 4
                                    }} 
                                    variant="standard" placeholder="Enter your Name" required />
                  </div>
                </Grid>
                <Grid item lg={12} xs={12}>
                  <div className="input-box">
                    <TextField fullWidth id="name" label="email" value={email}
                      onChange={e=>setEmail(e.target.value)}
                      variant="standard" placeholder="Enter your Name" required />
                  </div>
                </Grid>
                <Grid item lg={12} xs={12}>
                  <div className="input-box">
                    <TextField
                      id="standard-multiline-flexible"
                      label="messageData"
                      value={messageData}
                      onChange={e=>setMessageData(e.target.value)}
                      inputProps={{
                        maxLength: 200,
                        minLength: 10
                    }} 
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
                    <Button variant="contained" type="submit">Submit</Button>
                  </div>

                </Grid>

              <FormControl/>


              </Grid>
            </form>
          </Container>
        </div>
      </div>
    </>
  );
}



export default ContactUs;
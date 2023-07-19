import React, { useState, useContext } from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
  Grid,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Modal,
  MenuItem,
  Typography,
  TextField,
  TextareaAutosize,
} from '@mui/material';
import "../../../../CSS/Utils.css";
import { apiCAll } from '../../../../integration/apiCall';
import noteContext from '../../../../context/notes/noteContext';



const requestStyle = {
  position: 'absolute',
  top: { lg: '50%', xs: '80%' },
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '95%', lg: 'auto' },
  bgcolor: 'background.paper',
  borderRadius: '10px',
  border: '1px solid #000',
  boxShadow: 24,
  p: { lg: 4, xs: 1 },
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const PostJob = (props) => {


    const [tittle, setTittle] = useState("")
    const [duration, setDuration] = useState("")
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("")
    const [linkedin, setLinkedin] = useState("")
    const [skill, setSkill] = useState()
  
    const a = useContext(noteContext)
  
  
    const handleSubmit = (e) => {
  
      e.preventDefault();
      const jobPostData = { tittle, duration, location, skill, linkedin, description };
      console.log(jobPostData)
  
      apiCAll('/api/user/job/post', 'post', { jobPostData }).then(
        (response) => {
          if (response.data) {
            setDuration("")
            setLocation("")
            setDescription("");
            setTittle("")
            setLinkedin("")
            setSkill()
            props.handleClose()
            alert("Your Requeest has Submited")
          }
        }
      ).catch(
        (e) => {
          console.log(e.response)
          alert(e.response.data)
        }
      )
    }
  
    return (
      <>
        <Modal
          open={props.open}
          onClose={props.handleClose}
          sx={{ overflow: { xs: 'scroll' } }}
        >
          <Box sx={requestStyle}>
            <Typography variant="h5" sx={{ textAlign: 'center', fontSize: '2rem', }}>
              Post Project
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid item lg={6} xs={12}>
                  <TextField id="title" fullWidth label="Project Title" placeholder='Full Stack' type='text' value={tittle} onChange={e => { setTittle(e.target.value) }} variant="outlined" required />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <TextField id="title" fullWidth label="Project Statement" placeholder='Full Stack' type='text' value={tittle} onChange={e => { setTittle(e.target.value) }} variant="outlined" required />
                </Grid>
                <Grid item lg={12} xs={12}>
                  <Autocomplete
                    multiple
                    required
                    id="Skills"
                    options={a.industry.skilloptions}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.title}
                    value={skill}
                    onChange={(e, value) => setSkill(value)}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.title}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} label="Skills" placeholder="Skills" />
                    )}
                  />
                </Grid>
                <Grid item lg={12} xs={12}>
                  <TextareaAutosize
                    id="Project Description"
                    maxRows={5}
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    style={{ width: '100%', padding: '10px' }}
                    placeholder="Project Description"
                  />
                </Grid>
                <Grid item lg={12} xs={12}>
                  <TextareaAutosize
                    id="Project Scope"
                    maxRows={5}
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    style={{ width: '100%', padding: '10px' }}
                    placeholder="Project Scope"
                  />
                </Grid>
                <Grid item lg={12} xs={12}>
                  <TextareaAutosize
                    id="Deliverables"
                    maxRows={5}
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    style={{ width: '100%', padding: '10px' }}
                    placeholder="Deliverables"
                  />
                </Grid>
                <Grid item lg={12} xs={12}>
                  <TextareaAutosize
                    id="Methodology"
                    maxRows={5}
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    style={{ width: '100%', padding: '10px' }}
                    placeholder="Methodology"
                  />
                </Grid>
                
                <Grid item lg={12} xs={12}>
                  <TextareaAutosize
                    id="Teams Composition"
                    maxRows={5}
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    style={{ width: '100%', padding: '10px' }}
                    placeholder="Teams Compositions"
                  />
                </Grid>

                <Grid item lg={12} xs={12}>
                  <Autocomplete
                    multiple
                    required
                    id="Department"
                    options={a.industry.skilloptions}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.title}
                    value={skill}
                    onChange={(e, value) => setSkill(value)}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.title}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} label="Department" placeholder="Department" />
                    )}
                  />
                </Grid>
                
                <Grid item lg={6} xs={12}>
                  <TextField id="contact" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}  fullWidth label="Contact Information" placeholder='Contact' type='tel' value={tittle} onChange={e => { setTittle(e.target.value) }} variant="outlined" required />
                </Grid>

                <Grid item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'right' }}>
                  <Button variant="contained" type='submit'>Post</Button>
                </Grid>
  
              </Grid>
            </form>
          </Box>
        </Modal>
      </>
    )
  }
  

export default PostJob
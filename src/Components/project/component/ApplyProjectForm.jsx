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
  createFilterOptions,
} from '@mui/material';
import "../../../CSS/Utils.css";
import { apiCAll } from '../../../integration/apiCall';
import noteContext from '../../../context/notes/noteContext';


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

const filter = createFilterOptions();

const skillsOptionsStatic = [
{"id": 1, "skillName":"HTML CSS & JAVASCRIPT"},
{"id": 2, "skillName":"C# .Net"},
{"id": 3, "skillName":"C / C++"},
{"id": 4, "skillName":"Java"},
{"id": 5, "skillName":"Swift"},
{"id": 6, "skillName":"Python"},
];

const departmentsOptions  = [
  {id: 1, departmentName: "1"},
  {id: 2, departmentName: "2"},
  {id: 3, departmentName: "3"},
]


const ApplyProjectForm = (props) => {

    /**
     * OverHere skills name is present instead of ids
     */
    // const {fname , lname , rollNo, Skills, studentContact } = props;
    /**
     * useContext for global state
     */

    /**
     * these are the state for form.
     */
    const [fullName, setFullName] = useState( `${props.fname } ${ props.lname}`);
    const [rollNo, setRollNo] = useState(props.rollNo);
    const [skills, setSkills] = useState(props.skills);
    const [experience, setExperience] = useState();
    const [contact , setContact] = useState("");
    const [advisorName, setAdvisorName] = useState("");
    const [advisorEmail, setAdvisorEmail] = useState("");
    const [advisorContact, setAdvisorContact] = useState("");

  
    const handleSubmit = (e) => {
  
      e.preventDefault();
      const bodyData = {
        name : fullName,
        rollNo : rollNo,
        skills : skills,
        experience: experience,
        contact : contact,
        advisorName: advisorName,
        advisorEmail: advisorEmail,
        advisorContact: advisorContact,
        studentId: 123
      };

      // props.setProjects(bodyData);
      console.log(bodyData)
      props.handleClose();
      
      // const jobPostData = { tittle, duration, location, skill, linkedin, description };
      // console.log(jobPostData)
  
      // apiCAll('/api/user/job/post', 'post', { jobPostData }).then(
      //   (response) => {
      //     if (response.data) {
      //       setDuration("")
      //       setLocation("")
      //       setDescription("");
      //       setTittle("")
      //       setLinkedin("")
      //       setSkill()
      //       props.handleClose()
      //       alert("Your Requeest has Submited")
      //     }
      //   }
      // ).catch(
      //   (e) => {
      //     console.log(e.response)
      //     alert(e.response.data)
      //   }
      // )
    }
  
    return (
      <>
        <Modal
          open={props.open}
          onClose={props.handleClose}
          sx={{ overflow: { xs: 'scroll' } }}
        >
          <Box sx={requestStyle}>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid item  xs={12}>
                  <TextField id="Name" fullWidth label="Full Name" placeholder='Full Name' type='text' value={fullName} disabled onChange={e => { setFullName(e.target.value) }} variant="outlined" required />
                </Grid>

                <Grid item  xs={12}>
                  <TextField id="rollNumber" fullWidth label="Roll Number" placeholder='Roll No' type='text' value={rollNo} disabled onChange={e => { setRollNo(e.target.value) }} variant="outlined" required />
                </Grid>

                <Grid item lg={12} xs={12}>
                  <Autocomplete
                    multiple
                    required
                    id="Skills"
                    value={skills}
        
                    onChange={(event, newValue) => {
                      setSkills(newValue);
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);
                      const { inputValue } = params;
                    
                      // Suggest the creation of a new value
                      const isExisting = options.some((option) => inputValue === option);
                      if (inputValue !== '' && !isExisting) {
                        filtered.push(inputValue);
                      }
                      return filtered;
                    }}
                    
                    options={skills}
                    freeSolo
                    getOptionLabel={(option) => option}

                    renderOption={(props, option) => {
                      if(skills.filter(o=> o===option).length===0)
                        return <li {...props}>{`Add "${option}"`}</li>;
                      return  <li {...props}>{option}</li>
                  }}

                    renderInput={(params) => (
                      <TextField {...params} label="Skills" />
                    )}
                  />
                </Grid>
              

                <Grid item lg={12} xs={12}>
                  <TextareaAutosize
                    id="Experience"
                    maxRows={5}
                    required
                    value={experience}
                    onChange={e => setExperience(e.target.value)}
                    style={{ width: '100%', padding: '10px' }}
                    placeholder="Experience"
                  />
                </Grid>
                
                <Grid item  xs={12}>
                  <TextField id="contact" fullWidth label="contact" placeholder='mobile number' type='text' value={contact} onChange={e => { setContact(e.target.value) }} variant="outlined" required />
                </Grid>
                
                <Grid item  xs={12}>
                  <TextField id="AdvisorName" fullWidth label="Advisor Name" placeholder='Advisor Name' type='text' value={advisorName} onChange={e => { setAdvisorName(e.target.value) }} variant="outlined" required />
                </Grid>

                <Grid item  xs={12}>
                  <TextField id="AdvisorEmail" fullWidth label="Advisor Email" placeholder='Advisor Email' type='text' value={advisorEmail} onChange={e => { setAdvisorEmail(e.target.value) }} variant="outlined" required />
                </Grid>
                
                <Grid item  xs={12}>
                  <TextField id="AdvisorContactNo" fullWidth label="Advisor Contact" placeholder='Advisor Contact No' type='text' value={advisorContact} onChange={e => { setAdvisorContact(e.target.value) }} variant="outlined" required />
                </Grid>
                
                <Grid item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'right' }}>
                  <Button variant="contained" type='submit'>Apply</Button>
                </Grid>
  
              </Grid>
            </form>
          </Box>
        </Modal>
      </>
    )
  }
  

export default ApplyProjectForm
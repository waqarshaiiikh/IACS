import React, { useState, useContext, useEffect } from 'react';
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
import useFetchData from '../../../Hook/useFetchData';
import moment from 'moment';


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

const convertExperiencesToString = (experiences) => {
  if (!Array.isArray(experiences) || experiences.length === 0) {
    return "";
  }

  const formattedExperiences = experiences.map((experience) => {
    return `
      Company Name: ${experience.companyName}
      Job Role: ${experience.jobRole}
      Start Date: ${new Date(experience.startDate).toDateString()}
      End Date: ${new Date(experience.endDate).toDateString()}
      Description: ${experience.Description}
      
    `;
  });

  return formattedExperiences.join("\n");
};


const ApplyProjectForm = (props) => {

  
    const { data: skillOptions, fetchData: getsSkills } = useFetchData();
   
    const {fname, lname}  = JSON.parse(localStorage.getItem('Profile_constData'));
    const studentExperience = JSON.parse(localStorage.getItem('Experience_client'));
    const {enrollment, phoneNumber} = JSON.parse(localStorage.getItem('Profile_client'));
    const { data: projectsData, loading: projectLoading, error: projectError, fetchData: applyProject } = useFetchData();


    // const { data: studentData, fetchData: getStudentData } = useFetchData();
    const [skill, setSkill] = useState([]);

    useEffect(() => {
      getsSkills('/skill');
      // getStudentData('/student/detail?id='+localStorage.getItem('userId'))
    },[])
  
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

    // const [fullName, setFullName] = useState();
    // const [rollNo, setRollNo] = useState(props.rollNo);
    const [experience, setExperience] = useState(convertExperiencesToString(studentExperience));
    const [contact , setContact] = useState(phoneNumber);
    const [advisorName, setAdvisorName] = useState("");
    const [advisorEmail, setAdvisorEmail] = useState("");
    const [advisorContact, setAdvisorContact] = useState("");
    const [teamComposition, setTeamComposition] = useState([])

  
    const handleSubmit = (e) => {
  
      e.preventDefault();
      //   {
      //     "departmentRollNumber": "ABC123",
      //     "contact": "1234567890",
      //     "skillsId": [1, 2, 3],
      //     "experience": "Some experience details",
      //     "advisorName": "John Doe",
      //     "advisorEmail": "john.doe@example.com",
      //     "advisorContact": "9876543210"
      // }

      const bodyData = {
        name : `${fname } ${ lname}`,
        departmentRollNumber : enrollment,
        skillsName: skill,
        experience: experience,
        contact : contact,
        advisorName: advisorName,
        advisorEmail: advisorEmail,
        advisorContact: advisorContact,
        teamComposition: teamComposition
      };


      applyProject( `/student/applied?studentId=${localStorage.getItem('userId')}&projectId=${props.projectId}` , 'POST', bodyData)
       .then((res)=>{
         props.setApplyProjects(props.projectId);
         props.handleClose();
        })
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
              <Grid container spacing={1} sx={{
                padding: '10px !important',
              }}>
                <Grid item  xs={12}>
                  <TextField id="Name" fullWidth label="Full Name" placeholder='Full Name' type='text' value={`${fname } ${ lname}`} disabled  variant="outlined" required />
                </Grid>

                <Grid item  xs={12}>
                  <TextField id="rollNumber" fullWidth label="Roll Number" placeholder='Roll No' type='text' value={enrollment} disabled  variant="outlined" required />
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



                <Grid item lg={12} xs={12}>
                <Autocomplete
                  multiple
                  required
                  id="sKill"
                  value={skill}
                  onChange={(event, newValue) => {
                    setSkill(newValue);
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

                  options={skill}
                  freeSolo
                  getOptionLabel={(option) => option}

                  renderOption={(props, option) => {
                    if (skill.filter(o => o === option).length === 0)
                      return <li {...props}>{`Add "${option}"`}</li>;
                    return <li {...props}>{option}</li>
                  }}

                  renderInput={(params) => (
                    <TextField {...params} label="Skills" required={skill.length===0} />
                  )}
                />
              </Grid>


              <Grid item lg={12} xs={12}>
                <Autocomplete
                  multiple
                  required
                  id="Teams Compositions"
                  value={teamComposition}

                  onChange={(event, newValue) => {
                    setTeamComposition(newValue);
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

                  options={teamComposition}
                  freeSolo
                  getOptionLabel={(option) => option}

                  renderOption={(props, option) => {
                    if (teamComposition.filter(o => o === option).length === 0)
                      return <li {...props}>{`Add "${option}"`}</li>;
                    return <li {...props}>{option}</li>
                  }}

                  renderInput={(params) => (
                    <TextField {...params} label="Teams Compositions" required={teamComposition.length===0} />
                  )}
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
                
                {projectError &&
                (<Grid item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography color='red'>Server Error</Typography>
                </Grid>)
                }


                <Grid item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'right' }}>
                  <Button disabled={projectLoading}  variant="contained" type='submit'>Apply</Button>
                </Grid>
  
              </Grid>
            </form>
          </Box>
        </Modal>
      </>
    )
  }
  

export default ApplyProjectForm
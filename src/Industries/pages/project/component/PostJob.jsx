import React, { useState, useContext, useCallback, useEffect } from 'react';
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
import "../../../../CSS/Utils.css";
import useFetchData from '../Hook/useFetchData';



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


const PostJob = (props) => {

  const { data: projectsData, loading: projectLoading, error: projectError, fetchData: postProjects } = useFetchData();

  const { data: skillOptions, fetchData: getsSkills } = useFetchData();
  const { data: departmentOptions, fetchData: getsDepartments } = useFetchData();

  useEffect(() => { getsSkills('/skill') },[])
  useEffect(() => { getsDepartments('/department')},[])



  /**
   * useContext for global state
   */

  // const a = useContext(noteContext)

  /**
   * these are the state for form.
   */
  const [tittle, setTittle] = useState("Tittle of the Project 01");
  const [statement, setStatement] = useState("lorem ipsum dolor r  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et");
  /**
   * its contains the array of objects 
   */
  const [skill, setSkill] = useState([
    { "id": 6, "skillname": "Python" }
  ]);
  const [description, setDescription] = useState("lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et");
  const [scope, setScope] = useState("lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et");
  const [deliverables, setDeliverables] = useState("lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et");
  const [methodology, setMethodology] = useState("lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et");
  const [teamComposition, setTeamComposition] = useState(["waqar", "ali"]);
  const [department, setDepartment] = useState();
  const [contact, setContact] = useState("03423446805");


  const handleSubmit = (e) => {

    e.preventDefault();

    const bodyData = {
      "title": tittle,
      "skillsId": skill.map(skill => skill.id),
      "statement": statement,
      "description": description,
      "scope": scope,
      "deliverables": deliverables,
      "methodology": methodology,
      "teamComposition": teamComposition,
      "departmentId": department.id,
      "contact": contact,
      "active": true,
      "industryId": localStorage.getItem('userId')
    }

    console.log(bodyData)

    postProjects('/project', 'POST', bodyData).then(res => {
      props.setProjects(res);
      // console.log(res)
      props.handleClose();
    });
  }

  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        sx={{ overflow: { xs: 'scroll' } }}
      >
        <Box sx={requestStyle}>
          <Typography variant="h5" sx={{ textAlign: 'center', fontSize: '2rem', marginBottom: '20px' }}>
            Post Project
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item lg={6} xs={12}>
                <TextField id="tittle" fullWidth label="Project Tittle" placeholder='Project Tittle' type='text' value={tittle} onChange={e => { setTittle(e.target.value) }} variant="outlined" required />
              </Grid>
              <Grid item lg={6} xs={12}>
                <TextField id="title" fullWidth label="Project Statement" placeholder='Project Statement' type='text' value={statement} onChange={e => { setStatement(e.target.value) }} variant="outlined" required />
              </Grid>
              <Grid item lg={12} xs={12}>
                <Autocomplete
                  multiple
                  required
                  id="Skills"
                  options={skillOptions ? skillOptions : []}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.skillname}
                  value={skill}
                  onChange={(e, value) => { setSkill(value); }}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.skillname}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="Skills" />
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
                  value={scope}
                  onChange={e => setScope(e.target.value)}
                  style={{ width: '100%', padding: '10px' }}
                  placeholder="Project Scope"
                />
              </Grid>
              <Grid item lg={12} xs={12}>
                <TextareaAutosize
                  id="Deliverables"
                  maxRows={5}
                  required
                  value={deliverables}
                  onChange={e => setDeliverables(e.target.value)}
                  style={{ width: '100%', padding: '10px' }}
                  placeholder="Deliverables"
                />
              </Grid>
              <Grid item lg={12} xs={12}>
                <TextareaAutosize
                  id="Methodology"
                  maxRows={5}
                  required
                  value={methodology}
                  onChange={e => setMethodology(e.target.value)}
                  style={{ width: '100%', padding: '10px' }}
                  placeholder="Methodology"
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
                    <TextField {...params} label="Teams Compositions" />
                  )}
                />
              </Grid>

              <Grid item lg={12} xs={12}>
                <Autocomplete
                  // multiple
                  required
                  id="Department"
                  options={departmentOptions ? departmentOptions : []}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.departmentName}
                  value={department}
                  onChange={(e, value) => setDepartment(value)}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.departmentName}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="Department" />
                  )}
                />
              </Grid>

              <Grid item lg={12} xs={12}>
                <TextField id="contact" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} fullWidth label="Contact Information" placeholder='Contact' type='tel' value={contact} onChange={e => { setContact(e.target.value) }} variant="outlined" required />
              </Grid>

              {projectError &&
                (<Grid item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography color='red'>Server Error</Typography>
                </Grid>)
              }

              <Grid item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'right' }}>
                <Button disabled={projectLoading} variant="contained" type='submit'>Post</Button>
              </Grid>


            </Grid>
          </form>
        </Box>
      </Modal>
    </>
  )
}


export default PostJob
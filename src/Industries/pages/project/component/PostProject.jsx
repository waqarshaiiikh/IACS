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
import useFetchData from '../../../../Hook/useFetchData';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
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
  '& textarea': {
    border: '1px solid #0000004f',
    borderRadius: '3px',
    ':hover': {
      border: '1px solid black',
    }
  }
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const filter = createFilterOptions();


const PostProject = (props) => {

  const { data: projectsData, loading: projectLoading, error: projectError, fetchData: postProjects } = useFetchData();

  // const { data: skillOptions, fetchData: getsSkills } = useFetchData();
  const { data: departmentOptions, fetchData: getsDepartments } = useFetchData();

  // useEffect(() => { getsSkills('/skill') },[])
  useEffect(() => { getsDepartments('/department') }, [])



  /**
   * useContext for global state
   */

  // const a = useContext(noteContext)

  /**
   * these are the state for form.
   */
  const [tittle, setTittle] = useState("");
  const [statement, setStatement] = useState();
  /**
   * its contains the array of objects 
   */
  const [skill, setSkill] = useState([]);
  const [description, setDescription] = useState();
  const [scope, setScope] = useState();
  const [deliverables, setDeliverables] = useState();
  const [methodology, setMethodology] = useState();
  const [department, setDepartment] = useState();
  const [contact, setContact] = useState();
  const [deadlineDate, setDeadlineDate] = useState(moment(new Date()).add(12, 'M'));

  const handleSubmit = (e) => {

    e.preventDefault();

    const bodyData = {
      "title": tittle,
      "skillsName": skill,
      "statement": statement,
      "description": description,
      "scope": scope,
      "deliverables": deliverables,
      "methodology": methodology,
      "departmentId": department.id,
      "contact": contact,
      "active": true,
      "industryId": localStorage.getItem('userId'),
      postDate: new Date(),
      deadlineDate: deadlineDate
    }


    postProjects('/project', 'POST', bodyData).then(res => {
      props.setProjects(res);
      props.handleClose();
    });
  }

  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        sx={{ overflow: 'scroll' }}
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

              <Grid item lg={12} xs={12} className={requestStyle.gridItem}>
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
                    <TextField {...params} label="Skills" required={skill.length === 0} />
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
                  // multiple
                  // required
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
                    <TextField {...params} label="Department" required={department === ''} />
                  )}
                />
              </Grid>

              <Grid item lg={12} xs={12}>
                <TextField id="contact" fullWidth label="Contact Information" placeholder='Contact' type='tel' value={contact} onChange={e => { setContact(e.target.value) }} variant="outlined" required />
              </Grid>

              <Grid item lg={12} xs={12}>
                {/* <TextField id="deadlineDate" fullWidth label="Deadline" placeholder='Contact' type='date' value={deadlineDate} onChange={e => { setDeadlineDate(e.target.value) }} variant="outlined" required /> */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>

                  <DatePicker
                    disablePast
                    inputFormat='dd/MM/yyyy'
                    label="Deadline"
                    openTo="year"
                    views={['year', 'month', 'day']}
                    disableHighlightToday
                    value={deadlineDate}
                    pl
                    
                    onChange={(newValue) => {

                      setDeadlineDate(new Date(newValue));

                    }}
                    renderInput={(params) => <TextField {...params}  variant="outlined" required fullWidth/>}
                  />
                </LocalizationProvider>
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


export default PostProject
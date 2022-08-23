import React, { useState, useEffect, useContext } from 'react';
import ClientNavbar from './ClientNavbar';
import Pagination from '../Pages/Pagination';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
  Grid,
  Accordion,
  Autocomplete,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  Backdrop,
  Chip,
  Checkbox,
  Container,
  CircularProgress,
  FormControl,
  Modal,
  MenuItem,
  Typography,
  TextField,
  TextareaAutosize,
  Select,
  InputLabel
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@mui/icons-material/Search';
import MetaData from "../MetaData";
import "../CSS/Utils.css";
import { apiCAll, apiJson } from '../integration/apiCall';
import noteContext from '../context/notes/noteContext';

const useStyles = makeStyles({
  searching: {
    width: '100%',
    border: '1px solid',
    borderRadius: '10px',
  },
  search_div: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: '40px',
    border: '1px solid black',
    boxSizing: 'border-box'
  },
  search: {
    width: '100%',
    fontSize: '1.1rem',
    padding: '5px',
    border: 'none',
    outline: 'none'
  },
  search_icon: {
    margin: '0',
    width: '50px',
    height: '100%',
    fontSize: '1.5rem',
    background: 'hsl(0, 0%, 18.82%)',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  },
  software_title: {
    display: 'flex',
    justifyContent: 'space-between',

  },
  software_image: {
    width: '100px',
    height: '100px'
  },
});

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
            Post Job
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item lg={6} xs={12}>
                <TextField id="title" fullWidth label="Job Title" placeholder='Full Stack' type='text' value={tittle} onChange={e => { setTittle(e.target.value) }} variant="outlined" required />
              </Grid>
              <Grid item lg={6} xs={12}>
                <TextField id="jobType" fullWidth label="Duration" value={duration} onChange={e => setDuration(e.target.value)} variant="outlined" required select>
                  <MenuItem key="fulltime" value="Full Time">Full Time</MenuItem>
                  <MenuItem key="parttime" value="Part Time">Part Time</MenuItem>
                </TextField>
              </Grid>
              <Grid item lg={6} xs={12}>
                <TextField id="jobType" fullWidth label="Location" value={location} onChange={e => setLocation(e.target.value)} variant="outlined" required select>
                  <MenuItem key="remote" value="Remote">Remote</MenuItem>
                  <MenuItem key="onsite" value="Onsite">Onsite</MenuItem>
                </TextField>
              </Grid>


              <Grid item lg={6} xs={12}>
                <TextField id="links" fullWidth label="Linked In" value={linkedin} onChange={e => setLinkedin(e.target.value)} type="text" variant="outlined" />
              </Grid>

              <Grid item lg={12} xs={12}>
                <Autocomplete
                  multiple
                  required
                  id="internshipSkills"
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
                  id="Experience"
                  maxRows={5}
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  style={{ width: '100%', padding: '10px' }}
                  placeholder="Write Description with in 600 words"
                />
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

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ClientJob = () => {
  const classes = useStyles();

  const [search, setSearch] = useState(1);
  const [jobRole, setJobRole] = useState('');
  const [jobType, setJobType] = useState('');
  const [requestJob, setRequestJob] = useState(false);
  const openRequest = () => setRequestJob(true);
  const closeRequest = () => setRequestJob(false);

  const [jobs, setJobs] = useState(null);
  const [postCount, setPostCount] = useState(null)
  const [showPerPage] = useState(4)
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage
  });
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const onPaginationChange = (start, end) => {
    setPagination({
      start: start,
      end: end
    })
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value);
  };

  const handleJobRole = (event) => {
    console.log(event.target.value)
    setJobRole(event.target.value);
  };

  const handleJobType = (event) => {
    console.log(event.target.value)
    setJobType(event.target.value);
  };

  const loadJobs = async (start = 0, end = showPerPage) => {
    await apiCAll(`/api/user/student/get`, 'post', { pagination: { starts: start, totalRows: end - start } }).then((res) => {
      console.log(res?.data);
      setJobs(res?.data.data);
      setTotal(res?.data.total);
      setPostCount(res?.data.total);
    }).catch((err) => {
      console.log(err);
    })
    setLoading(false);
  }

  const handleSearch = async (e, start = 0, end = showPerPage) => {
    setLoading(true)
    e?.preventDefault();

    switch (search) {
      case 1: {
        await apiCAll(`/api/user/student/searchBy/name`, 'post', { pagination: { starts: start, totalRows: end - start }, name: { query: value }, }).then((res) => {
          console.log(res?.data);
          setJobs(res?.data.data);
          setPostCount(res?.data.total);
          setTotal(res?.data.total);
        }).catch((err) => {
          console.log(err);
        })
        setLoading(false);
      } break;
      case 2: {
        await apiCAll(`/api/user/student/searchBy/depart`, 'post', { pagination: { starts: start, totalRows: end - start }, depart: { query: value }, }).then((res) => {
          console.log(res?.data);
          setJobs(res?.data.data);
          setTotal(res?.data.total);
          setPostCount(res?.data.total);
        }).catch((err) => {
          console.log(err);
        })
        setLoading(false);
      } break;
      case 3: {
        await apiCAll(`/api/user/student/searchBy/depart`, 'post', { pagination: { starts: start, totalRows: end - start }, depart: { query: value }, }).then((res) => {
          console.log(res?.data);
          setJobs(res?.data.data);
          setTotal(res?.data.total);
          setPostCount(res?.data.total);
        }).catch((err) => {
          console.log(err);
        })
        setLoading(false);
      } break;
      case 4: {
        await apiCAll(`/api/user/student/searchBy/depart`, 'post', { pagination: { starts: start, totalRows: end - start }, depart: { query: value }, }).then((res) => {
          console.log(res?.data);
          setJobs(res?.data.data);
          setTotal(res?.data.total);
          setPostCount(res?.data.total);
        }).catch((err) => {
          console.log(err);
        })
        setLoading(false);
      } break;
      case 5: {
        await apiCAll(`/api/user/student/searchBy/depart`, 'post', { pagination: { starts: start, totalRows: end - start }, depart: { query: value }, }).then((res) => {
          console.log(res?.data);
          setJobs(res?.data.data);
          setTotal(res?.data.total);
          setPostCount(res?.data.total);
        }).catch((err) => {
          console.log(err);
        })
        setLoading(false);
      } break;
      default: {
        alert("Please select the category")
      }
    }


    // if (value) {
    //     await apiJson(`/jobs?q=${value}`).then((res) => {
    //         setJobs(res.data);
    //         setTotal(res?.data.length);
    //         setPostCount(res?.data.length);
    //         setValue("");
    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // }
    // else {
    //     alert("Enter text to search");
    // }
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true);
    loadJobs();
  }, [])

  return (
    <>
      <MetaData title="Jobs" />
      <ClientNavbar />
      <PostJob open={requestJob} handleClose={closeRequest} />
      <Container maxWidth="xl" sx={{ padding: '0' }}>
        <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          <Grid item lg={12} sx={{ display: { xs: 'none', lg: 'block' }, marginTop: '10px' }}>
            <h1>Jobs</h1>
          </Grid>
          <Grid item
            lg={12}
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: { lg: 'none', xs: "10px" }
            }}>
            <div>
              {
                (search == 4 ?
                  (<Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Job Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={jobType}
                        label="Search"
                        onChange={handleJobType}
                        sx={{ marginRight: '10px', width: { lg: 500, xs: 250 } }}
                      >
                        <MenuItem value="onsite">Onsite</MenuItem>
                        <MenuItem value="remote">Remote</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>) :
                  (<TextField
                    id="search"
                    label="search"
                    variant="outlined"
                    size='medium'
                    value={value}
                    sx={{ marginRight: '10px', width: { lg: 500, xs: 250 } }}
                    onChange={(e) => { setValue(e.target.value) }}
                    onKeyPress={(e) => { if (e.key === "Enter") { handleSearch() } }}
                  />))
              }
            </div>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Search By</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={search}
                  label="Search"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Company Name</MenuItem>
                  <MenuItem value={2}>Job Title</MenuItem>
                  <MenuItem value={3}>Address</MenuItem>
                  <MenuItem value={4}>Location</MenuItem>
                  <MenuItem value={5}>Skills</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <SearchIcon
              fontSize='large'
              onClick={handleSearch}
              sx={{
                color: '#42b6EE',
                cursor: 'pointer',
                marginTop: { lg: 'none', xs: '10px' },
              }} />
          </Grid>
          <Grid item lg={12}>
            <Button variant='contained' sx={{ marginTop: '10px' }} onClick={openRequest}>Post Job</Button>
          </Grid>
          <Grid item lg={10} xs={12} >
            <Grid container spacing={2}>
              {
                loading ?
                  (
                    <Backdrop
                      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
                      <CircularProgress color="inherit" />
                    </Backdrop>
                  ) :
                  ((postCount === 0) ?
                    (<div className='Post_center'>
                      <h1 className='main_heading'>No Result Found</h1>
                    </div>) :
                    (jobs && jobs.map((job, index) => (
                      <Grid item lg={12} key={index}>
                        <Box sx={{ borderRadius: '10px', padding: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                          <div className={classes.software_title}>
                            <div>
                              <h3 className='mobileHeading'>{job.COMPANYNAME}</h3>
                              <Typography>{job.TITLE}</Typography>
                              <Typography>{job.ADDRESS}</Typography>
                              <div>
                                <Typography sx={{ display: 'inline-block' }}>{job.DURATION}</Typography>,&nbsp;
                                <Typography sx={{ display: 'inline-block' }}>{job.LOCATION}</Typography>
                                <a style={{ display: 'block' }} href="https://www.google.com/" target={"_blank"}>Detail</a>
                              </div>
                            </div>
                            <div>
                              <Typography sx={{ display: 'block', textAlign: 'right', color: '#d3d3d3' }}>24-8-22</Typography>
                              <img className={classes.software_image} src={job.IMAGE} alt="student" />
                            </div>
                          </div>
                          <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="about"
                            >
                              <Typography>Description</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>
                                {job.DESCRIPTION}
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                          <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="skills"
                            >
                              <Typography>Required Skills</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>
                                {
                                  job.requiredSkills && job.requiredSkills.map((skill, i) => (
                                    <Chip label={skill} sx={{ marginRight: '10px', marginBottom: '5px' }} />))
                                }
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        </Box>
                      </Grid>
                    ))
                    ))
              }

            </Grid>
          </Grid>
          <Box sx={{ margin: '20px 0px' }}>
            <Pagination showPerPage={showPerPage}
              onPaginationChange={onPaginationChange}
              numberOfButtons={Math.ceil(total / showPerPage)}
            />
          </Box>
        </Grid>
      </Container>
    </>
  )
}

export default ClientJob







/***
 * 
 import React, { useState, useEffect } from 'react'
import ClientNavbar from './ClientNavbar';
import {
  Container,
  Grid,
  TextField,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
  CircularProgress,
  Backdrop,
  InputLabel,
  FormControl,
  MenuItem,
  Select
} from '@mui/material';
import Pagination from '../Pages/Pagination';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@mui/icons-material/Search';
import MetaData from '../MetaData';
import { Api, apiCAll, apiJson } from '../integration/apiCall';


const useStyles = makeStyles({
  searching: {
    width: '100%',
    border: '1px solid',
    borderRadius: '10px',
  },
  search_div: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '800px',
    height: '40px',
    marginRight: '10px',
    border: '1px solid black',
    boxSizing: 'border-box'
  },
  search: {
    width: '100%',
    fontSize: '1.1rem',
    padding: '5px',
    border: 'none',
    outline: 'none'
  },
  search_icon: {
    margin: '0',
    width: '50px',
    height: '100%',
    fontSize: '1.5rem',
    background: 'hsl(0, 0%, 18.82%)',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  },
  student_title: {
    display: 'flex',
    justifyContent: 'space-between',

  },
  student_image: {
    width: '100px',
    height: '100px'
  }
});


const ClientStudent = () => {

  const [studentData, setStudentData] = useState()

  const classes = useStyles();
  const [search, setSearch] = useState();
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('')

  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState();
  const [students, setStudents] = useState(false);
  const [postCount, setPostCount] = useState();
  const [showPerPage] = useState(4)
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage
  });

  const handleChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    console.log(event.target.value)
    setValue(event.target.value);
    setDepartment(event.target.value);
  };

  const handleYearChange = (event) => {
    console.log(event.target.value)
    setValue(event.target.value);
    setYear(event.target.value);
  };

  const onPaginationChange =  (start, end) => {
    
    setPagination({
      start: start,
      end: end
    }); 
    handleSearch(null, start, end).then(()=>{
    });
  }

  const getStudentYear = (studentYear) => {
    switch (studentYear) {
      case "1":
        return "First year";
        break;
      case "2":
        return "Second Year";
        break;
      case "3":
        return "Third Year";
        break;
      case "4":
        return "Final year";
        break;
      default:
        return "None"
    }
  }
  const updateStudentSkill = async (expanded, index, student) => {
    if (!studentData[index]?.skills && expanded) {
      await apiCAll(`/api/user/student/skill/get`, 'post', { student:{ id : student.ID } }).then((res) => {

        let st = studentData;
        let skill_STD = st[index];
        skill_STD = { ...skill_STD, skills: res?.data };
        st[index] = skill_STD;
        setStudentData([...st])
        // console.log(res?.data);
        // console.log(studentData)
        
      }).catch((err) => {
        console.log(err);
      })

    }
  }

  const updateStudentExperience = async (expanded, index, student) => {
    if (!studentData[index]?.experience && expanded) {

      await apiCAll(`/api/user/student/experience/get`, 'post', { student:{ id : student.ID } }).then((res) => {

        let st = studentData;
        let experience_STD = st[index];
        experience_STD = { ...experience_STD, experience:  res?.data  };
        st[index] = experience_STD;
        setStudentData([...st])

        // console.log(res?.data);
        // console.log(studentData)
        
      }).catch((err) => {
        console.log(err);
      })

    }
  }

  const loadStudent = async ( start = 0, end=showPerPage) => {

    await apiCAll(`/api/user/student/get`, 'post', { pagination: { starts: start, totalRows: end-start } }).then((res) => {
      console.log(res?.data);
      setStudentData(res?.data.data);
      // setStudents(res?.data);
      setTotal(res?.data.total);
      setPostCount(res?.data.total);
    }).catch((err) => {
      console.log(err);
    })
    setLoading(false);
  }



  const handleSearch = async (e,start = 0, end=showPerPage) => {
    setLoading(true)
    e?.preventDefault();
    console.log(value, search)
    if (!value || !search) {
      return await loadStudent(start, end).then(() => {
        setLoading(false)
        return null;
      });
    }

    switch (search) {
      case 1: {
        await apiCAll(`/api/user/student/searchBy/name`, 'post', { pagination: { starts: start, totalRows: end-start },name: {query: value}, }).then((res) => {
          console.log(res?.data);
          setStudentData(res?.data.data);
          // setStudents(res?.data);
            setPostCount(res?.data.total);
          setTotal(res?.data.total);
        }).catch((err) => {
          console.log(err);
        })
        setLoading(false);

      } break;
      case 2: {
        await apiCAll(`/api/user/student/searchBy/depart`, 'post', { pagination: { starts: start, totalRows: end-start },depart: {query: value}, }).then((res) => {
          console.log(res?.data);
          setStudentData(res?.data.data);
          // setStudents(res?.data);
          setTotal(res?.data.total);
          setPostCount(res?.data.total);
        }).catch((err) => {
          console.log(err);
        })
        setLoading(false);

      } break;
      case 3: {
        await apiCAll(`/api/user/student/searchBy/year`, 'post', { pagination: { starts: start, totalRows: end-start },year: {query: value}, }).then((res) => {
          console.log(res?.data);
          setStudentData(res?.data.data);
          // setStudents(res?.data);
          setTotal(res?.data.total);
          setPostCount(res?.data.total);
        }).catch((err) => {
          console.log(err);
        })
        setLoading(false);
      } break;
      case 4: {
        
        await apiCAll(`/api/user/student/searchBy/university`, 'post', { pagination: { starts: start, totalRows: end-start },university: {query: value}, }).then((res) => {
          console.log(res?.data);
          setStudentData(res?.data.data);
          // setStudents(res?.data);
          setTotal(res?.data.total);
          setPostCount(res?.data.total);
        }).catch((err) => {
          console.log(err);
        })
        setLoading(false);

      } break;
      case 5: {

        
        await apiCAll(`/api/user/student/searchBy/skill`, 'post', { pagination: { starts: start, totalRows: end-start },skill: {query: value}, }).then((res) => {
          console.log(res?.data);
          setStudentData(res?.data.data);
          // setStudents(res?.data);
          setTotal(res?.data.total);
          setPostCount(res?.data.total);
        }).catch((err) => {
          console.log(err);
        })
        setLoading(false);

      } break;
      default: {
        alert("Please select the category")
      }
    }

    setLoading(false)


  }


  useEffect(() => {
    loadStudent();
    setLoading(true)
  }, [])
  
  return (
    <>
      <MetaData title="Students" />
      <ClientNavbar />
      <div>
        <Container maxWidth="xl" sx={{ padding: '0' }}>
          <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
            <Grid item lg={12} sx={{ display: { xs: 'none', lg: 'block' }, marginTop: '10px' }}>
              <h1>Students</h1>
            </Grid>
            <Grid item lg={12} xs={12} sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, justifyContent: 'space-between', alignItems: 'center', marginTop: { lg: 'none', xs: "10px" } }}>
              <div>
                {search == 2 ?
                  (<Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Department</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        size='medium'
                        sx={{ marginRight: '10px', width: { lg: 500, xs: 250 } }}
                        value={department}
                        label="Department"
                        onChange={handleDepartmentChange}
                      >
                        <MenuItem key="Software Engineering                  " value="SE"     > Software Engineering                  </MenuItem>
                        <MenuItem key="Computer Science                      " value="CT"     > Computer Science                      </MenuItem>
                        <MenuItem key="Computer Systems Engineering          " value="CS"     > Computer Systems Engineering          </MenuItem>
                        <MenuItem key="Computational Finance                 " value="CF"     > Computational Finance                 </MenuItem>
                        <MenuItem key="Telecommunications Engineering        " value="TC"     > Telecommunications Engineering        </MenuItem>
                        <MenuItem key="Economics & Finance                   " value="EC"     > Economics & Finance                   </MenuItem>
                        <MenuItem key="Electronic Engineering                " value="EL"     > Electronic Engineering                </MenuItem>
                        <MenuItem key="Civil Engineering                     " value="CE"     > Civil Engineering                     </MenuItem>
                        <MenuItem key="Petroleum Engineering                 " value="PE"     > Petroleum Engineering                 </MenuItem>
                        <MenuItem key="Mechanical Engineering                " value="ME"     > Mechanical Engineering                </MenuItem>
                        <MenuItem key="Textile Engineering                   " value="TE"     > Textile Engineering                   </MenuItem>
                        <MenuItem key="Industrial & Manufacturing Engineering" value="IM"     > Industrial & Manufacturing Engineering</MenuItem>
                        <MenuItem key="Automotive Engineering                " value="AU"     > Automotive Engineering                </MenuItem>
                        <MenuItem key="Electrical Engineering                " value="EE"     > Electrical Engineering                </MenuItem>
                        <MenuItem key="Materials Engineering                 " value="MM"     > Materials Engineering                 </MenuItem>
                        <MenuItem key="Chemical Engineering                  " value="CH"     > Chemical Engineering                  </MenuItem>
                        <MenuItem key="Metallurgical Engineering             " value="MY"     > Metallurgical Engineering             </MenuItem>
                        <MenuItem key="Polymer & Petrochemical Engineering   " value="PP"     > Polymer & Petrochemical Engineering   </MenuItem>
                        <MenuItem key="Biomedical Engineering                " value="BM"     > Biomedical Engineering                </MenuItem>
                        <MenuItem key="Food Engineering                      " value="FD"     > Food Engineering                      </MenuItem>
                        <MenuItem key="Architecture                          " value="BArch" > Architecture                          </MenuItem>
                        <MenuItem key="Textile Sciences                      " value="TS"     > Textile Sciences                      </MenuItem>
                        <MenuItem key="Development Studies                   " value="DS"     > Development Studies                   </MenuItem>
                        <MenuItem key="Management Sciences                   " value="MG"     > Management Sciences                   </MenuItem>
                        <MenuItem key="Industrial Chemistry                  " value="IC"     > Industrial Chemistry                  </MenuItem>
                        <MenuItem key="Applied Physics                       " value="AP"     > Applied Physics                       </MenuItem>
                        <MenuItem key="English Linguistics                   " value="EG"     > English Linguistics                   </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>) :
                  (search == 3 ?
                    (<Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Year</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          size='medium'
                          sx={{ marginRight: '10px', width: { lg: 500, xs: 250 } }}
                          value={year}
                          label="Department"
                          onChange={handleYearChange}
                        >
                          <MenuItem value="1">First Year</MenuItem>
                          <MenuItem value="2">Second Year</MenuItem>
                          <MenuItem value="3">Third Year</MenuItem>
                          <MenuItem value="4">Final Year</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>) :
                    (<TextField
                      id="search"
                      label="Search"
                      variant="outlined"
                      value={value}
                      onChange={(e) => { setValue(e.target.value) }}
                      onKeyPress={(e) => { if (e.key === "Enter") { handleSearch() } }}
                      size='medium' sx={{ marginRight: '10px', width: { lg: 500, xs: 250 } }} />))
                }
              </div>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Search By</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={search}
                    label="Search"
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>Name</MenuItem>
                    <MenuItem value={2}>Department</MenuItem>
                    <MenuItem value={3}>Year</MenuItem>
                    <MenuItem value={4}>University</MenuItem>
                    <MenuItem value={5}>Skills</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <SearchIcon
                fontSize='large'
                onClick={handleSearch}
                sx={{ color: '#42b6EE', cursor: 'pointer', marginTop: { lg: 'none', xs: '10px' }, }} />
            </Grid>
            <Grid item lg={12} xs={12} className={classes.studentList} >
              <Grid container spacing={3} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                {loading ? (
                  <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
                    <CircularProgress color="inherit" />
                  </Backdrop>
                ) : ((postCount === 0) ?
                  (<div className='Post_center'>
                    <h1 className='main_heading'>No Result Found</h1>
                  </div>) : (
                    // studentData && studentData.slice(pagination.start, pagination.end).map((student, index1) => (
                      studentData && studentData.map((student, index1) => (
                      <Grid Grid item lg={10}>
                        <Box sx={{ borderRadius: '10px', padding: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                          <div className={classes.student_title}>
                            <img className={classes.student_image} src={student.IMAGE} alt="student" />
                            <div>
                              <Typography variant='h6'>{student.FNAME + " " + student.LNAME}</Typography>
                              <Typography>{Api.DEPARTMENT[student.DEPARTMENT]}</Typography>
                              <Typography>{getStudentYear(student.YEAR)}</Typography>
                              <Typography>{student.UNIVERSITY}</Typography>
                            </div>
                          </div>
                          <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="about"
                            >
                              <Typography>About</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>
                                {student.ABOUTUS}
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                          <Accordion onChange={(e, expanded) => updateStudentSkill(expanded, index1, student)}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="skills"
                            >
                              <Typography>Skills</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>
                                {
                                  studentData[index1].skills && studentData[index1].skills.map((skill, index) => (
                                    <Chip label={skill.title} key={index} sx={{ marginRight: '10px', marginBottom: '5px' }} />))

                                }
                              </Typography>
                            </AccordionDetails>
                          </Accordion>

                          <Accordion onChange={(e, expanded) => updateStudentExperience(expanded, index1, student)}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="skills"
                            >
                              <Typography>Experience</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              {
                                studentData[index1 ].experience && studentData[index1].experience.map((exp, index) => (
                                  <Typography style={{ marginBottom: '10px' }}>
                                    <Typography variant='h6' style={{ fontWeight: 'bold' }}>{exp.companyName}</Typography>
                                    <Typography style={{ fontWeight: 'bold' }}>{exp.jobRole}</Typography>
                                    <Typography style={{ fontWeight: 'bold' }}>{exp.startDate.split('T')[0]} to {exp.endDate.split('T')[0]}</Typography>
                                    <Typography>{exp.Description}</Typography>
                                  </Typography>
                                ))
                              }
                            </AccordionDetails>
                          </Accordion>

                        </Box>
                      </Grid>
                    ))
                  ))
                }
              </Grid>
            </Grid>
            <Box sx={{ margin: '20px 0px' }}>
              <Pagination showPerPage={showPerPage}
                onPaginationChange={onPaginationChange}
                numberOfButtons={Math.ceil(total / showPerPage)}
              />
            </Box>
          </Grid>
        </Container>
      </div>

    </>
  )
}

export default ClientStudent



 */
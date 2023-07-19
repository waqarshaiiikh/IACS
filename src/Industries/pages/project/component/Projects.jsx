import React, { useState, useEffect } from 'react';
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Link,
  Button,
  Backdrop,
  Chip,
  Container,
  CircularProgress,
  FormControl,
  MenuItem,
  Typography,
  TextField,
  Select,
  InputLabel
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@mui/icons-material/Search';
import "../../../../CSS/Utils.css";
import { apiCAll } from '../../../../integration/apiCall';
import Pagination from '../../../../Pages/Pagination';
import PostJob from './PostJob';

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


const ClientJob = () => {
  const classes = useStyles();

  const [search, setSearch] = useState(1);

  const [requestJob, setRequestJob] = useState(false);
  const openRequest = () => setRequestJob(true);
  const closeRequest = () => setRequestJob(false);

  const [jobs, setJobs] = useState([]);
  const [postCount, setPostCount] = useState(null)
  const [showPerPage] = useState(4)
  const [total, setTotal] = useState(0);
  
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const onPaginationChange = (start, end) => {
  
    handleSearch(null, start, end).then(()=>{
    });
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value);
  };


  const handleJobType = (event) => {
    console.log(event.target.value)
    setValue(event.target.value);
  };

  const updateJobSkill = async (expanded, index, job) => {
    if (!jobs[index]?.skills && expanded) {
      await apiCAll(`/api/user/job/skill/get`, 'post', { job:{ id : job.ID } }).then((res) => {

        console.log(res.data);
        let st = jobs;
        let skill_STD = st[index];
        skill_STD = { ...skill_STD, skills: res?.data };
        st[index] = skill_STD;
        setJobs([...st])
      }).catch((err) => {
        console.log(err);
      })

    }
  }

  const loadJobs = async (start = 0, end = showPerPage) => {
    await apiCAll(`/api/user/job/get`, 'post', { pagination: { starts: start, totalRows: end - start } }).then((res) => {
      
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

   console.log(value, search)
    if (!value || !search) {
      return await loadJobs(start, end).then(() => {
        setLoading(false)
        return null;
      });
    }

    switch (search) {
      case 1: {
        await apiCAll(`/api/user/job/searchBy/companyName`, 'post', { pagination: { starts: start, totalRows: end - start }, companyName: { query: value }, }).then((res) => {
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
        await apiCAll(`/api/user/job/searchBy/tittle`, 'post', { pagination: { starts: start, totalRows: end - start }, tittle: { query: value }, }).then((res) => {
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
        await apiCAll(`/api/user/job/searchBy/address`, 'post', { pagination: { starts: start, totalRows: end - start }, address: { query: value }, }).then((res) => {
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
        await apiCAll(`/api/user/job/searchBy/location`, 'post', { pagination: { starts: start, totalRows: end - start }, location: { query: value }, }).then((res) => {
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
        await apiCAll(`/api/user/job/searchBy/skill`, 'post', { pagination: { starts: start, totalRows: end - start }, skill: { query: value }, }).then((res) => {
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

    setLoading(false)
  }

  useEffect(() => {
    setLoading(true);
    loadJobs();
  }, [])

  const  addJob = (job) =>{
    setJobs(prev=>{
      console.log(prev)
      return [job, ...prev];
    });
  }

  return (
    <>
      {/* <ClientNavbar /> */}
      <PostJob open={requestJob} handleClose={closeRequest} setProjects={addJob} />
      <Container maxWidth="xl" >
        <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          <Grid item lg={12} sx={{ display: { xs: 'none', lg: 'block' }, marginTop: '10px' }}>
            <h1>Projects</h1>
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
                (search === 4 ?
                  (<Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Job Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={value}
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
                  <MenuItem value={1}>Tittle</MenuItem>
                  <MenuItem value={2}>Department</MenuItem>
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
            <Button variant='contained' sx={{ marginTop: '10px' }} onClick={openRequest}>Post Project</Button>
          </Grid>
          <Grid item lg={10} xs={12} >
            <Grid container spacing={2} >
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
                              <Typography>{job.TITTLE}</Typography>
                              <Typography>{job.ADDRESS}</Typography>
                              <div>
                                <Typography sx={{ display: 'inline-block' }}>{job.DURATION}</Typography>,&nbsp;
                                <Typography sx={{ display: 'inline-block' }}>{job.LOCATION}</Typography>
                                <Link style={{ display: 'block'}} underline='none' href={job.LINKS} target={"_blank"}>more...</Link>                                  
                              </div>
                            </div>
                            <div>
                              <Typography sx={{ display: 'block', textAlign: 'right', color: '#d3d3d3' }}>
                                {job?.POSTDATE?.split('T')[0]}
                              </Typography>
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
                          <Accordion onChange={(e, expanded) => updateJobSkill(expanded, index, job)}>
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
                                  jobs[index].skills && jobs[index].skills.map((skill, i) => (
                                    <Chip label={skill.title} sx={{ marginRight: '10px', marginBottom: '5px' }} />))
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

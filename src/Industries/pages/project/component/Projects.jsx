import React, { useState, useEffect, useCallback } from 'react';
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
  InputLabel,
  Pagination
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@mui/icons-material/Search';
import "../../../../CSS/Utils.css";
import { apiCAll } from '../../../../integration/apiCall';
import PostProject from './PostProject';
import moment from 'moment/moment';
import useFetchData from '../../../../Hook/useFetchData';

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
    flexDirection: 'column',
    gap: '10px'
    // justifyContent: 'space-between',

  },
  software_image: {
    width: '100px',
    height: '100px'
  },
  logoDateContainer: {
    display: 'flex',
    justifyContent: 'space-between',

  },
  studentImageTag:
  {
    width: '100%',
    aspectRatio: 1,
    objectPosition: 'center ',
    borderRadius: '10px',
    objectFit: 'none',
  },
  studentImg: {
    img: {
      width: '100px',
      height: '100px'
    }
  }

});


const Project = () => {
  const classes = useStyles();


  const { data: projectList, loading: projectListLoading, error: projectListError, fetchData: gettingFetchingList } = useFetchData();


  const [requestJob, setRequestJob] = useState(false);
  const openRequest = () => setRequestJob(true);
  const closeRequest = () => setRequestJob(false);

  const [showPerPage] = useState(4)
  const [search, setSearch] = useState('title');

  const [projects, setProjects] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [projectDataSearch, setProjectDataSearch] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [value, setValue] = useState("");


  useEffect(() => {
    const id = localStorage.getItem('userId');
    gettingFetchingList('/project/industry?id=' + id).then(res => {



      setProjectDataSearch(res)
      setProjectData(res)
      setProjects(res.slice(0, showPerPage))
    })
  }, [])

  const handleChange = (event) => {
    setSearch(event.target.value);

  };


  const handleSearch = async () => {

    const searchData = projectDataSearch.filter(project => project[search] === value);
    setProjectData(searchData);
    setProjects(searchData.slice(0, showPerPage));
    setCurrentPage(1); // Reset pagination to the first page


  }

  const searchingTextEmpty = (text) => {

    if (text === "") {
      setProjectData(projectDataSearch);
      setProjects(projectDataSearch.slice(0, showPerPage));
    }
  }




  const addProjects = (project) => {
    setProjectDataSearch(prev => {

      const updatedData = [project, ...prev];
      setProjectData(updatedData); // Add this line to update projectData
      setProjects(updatedData.slice(0, showPerPage))
      setCurrentPage(1)
      return updatedData;
    });
  }

  const handlePaginationChange = (e, pageNumber) => {
    setCurrentPage(pageNumber);
    const startingIndex = (pageNumber - 1) * showPerPage;
    const endingIndex = startingIndex + showPerPage <= projectData.length ? startingIndex + showPerPage : projectData.length;

    console.log(startingIndex, endingIndex);
    setProjects(projectData.slice(startingIndex, endingIndex));

  }
  return (
    <>
      {/* <ClientNavbar /> */}
      {requestJob && <PostProject open={requestJob} handleClose={closeRequest} projectModal={requestJob} setProjects={addProjects} />}
      {projectListError && <Box> <Typography color={'red'}>Server Error </Typography></Box>}
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
            <TextField
              id="search"
              label="search"
              variant="outlined"
              size='medium'
              value={value}
              sx={{ marginRight: '10px', width: { lg: 500, xs: 250 } }}
              onChange={(e) => { setValue(e.target.value); searchingTextEmpty(e.target.value); }}
              onKeyPress={(e) => { if (e.key === "Enter") { handleSearch() } }}
            />
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
                  <MenuItem value={'title'}>Title</MenuItem>
                  <MenuItem value={'departmentName'}>Department</MenuItem>
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
                projectListLoading ?
                  (
                    <Backdrop
                      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
                      <CircularProgress color="inherit" />
                    </Backdrop>
                  ) :
                  ((projects.length === 0) ?
                    (<div className='Post_center'>
                      <h1 className='main_heading'>No Result Found</h1>
                    </div>) :
                    (projects && projects.map((data, index) => (
                      <Grid item lg={12} key={index}>
                        <Box sx={{ borderRadius: '10px', padding: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                          <div className={classes.software_title}>
                            <div className={classes.logoDateContainer}>
                              <div className="logo">
                                <img
                                  className={classes.software_image}
                                  // src={data.companyLogo} 
                                  src={`https://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/industry/${data.industryId}.jpg`}
                                  alt="companyLogo" />
                              </div>
                              <Typography sx={{ display: 'block', opacity: 0.5, fontSize: '0.7rem', fontStyle: 'italic' }}>
                                {moment(data?.postDate).format('DD MMM YYYY')}
                              </Typography>
                            </div>


                            <Box>
                              <Box sx={{ marginTop: '20px' }}>
                                <Typography variant='h5' sx={{ display: 'inline', fontWeight: 'bold' }} >{data.title}</Typography>
                                {/* <Typography  sx={{display: 'inline', marginLeft: '10px'}}>{data.title}</Typography> */}
                              </Box>

                              <Typography sx={{ marginTop: '20px' }} variant='h6' >{"Project Statement"}</Typography>
                              <Typography>{data.statement}</Typography>

                              <Box sx={{ marginTop: '20px', marginBottom: '10px' }}>
                                <Typography variant='h6' sx={{ display: 'inline', marginTop: '20px' }}>{"Skills"} </Typography>

                                <Typography sx={{ display: 'inline', marginLeft: '10px' }}>
                                  {
                                    data.skillsName && data.skillsName.map((skillsName, i) => (
                                      <Chip key={i} label={skillsName} color='primary' sx={{ marginRight: '10px', marginBottom: '5px', height: '20px !important', borderRadius: '3px !important' }} />))
                                  }
                                </Typography>

                              </Box>

                              <Box sx={{ marginTop: '20px' , opacity: 0.6, textAlign: 'end'}}>
                                <Typography  sx={{ display: 'inline', fontWeight: 'bold', fontSize: '0.7rem', fontStyle: '', marginRight: '10px' }}> {"Dead Line :"} </Typography>
                                <Typography sx={{ display: 'inline', fontSize: '0.7rem' }}> {moment(data?.deadlineDate).format('DD MMM YYYY')} </Typography>
                              </Box>
                            </Box>



                          </div>

                          <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="Detail"
                            >
                              <Typography>Details</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography variant='h6' sx={{ marginTop: '20px' }}> {"Description"} </Typography>
                              <Typography> {data.description} </Typography>
                              <Typography variant='h6' sx={{ marginTop: '20px' }}> {"Scope"} </Typography>
                              <Typography> {data.scope} </Typography>
                              <Typography variant='h6' sx={{ marginTop: '20px' }}> {"Deliverables"} </Typography>
                              <Typography> {data.deliverables} </Typography>
                              <Typography variant='h6' sx={{ marginTop: '20px' }}> {"Methodology"} </Typography>
                              <Typography> {data.methodology} </Typography>

                              <Box sx={{ marginTop: '20px' }}>
                                <Typography variant='h6' sx={{ display: 'inline' }}> {"Department"} </Typography>
                                <Typography sx={{ display: 'inline' }}> {data.departmentName} </Typography>
                              </Box>
                              <Box sx={{ marginTop: '20px' }}>

                                <Typography variant='h6' sx={{ display: 'inline', marginRight: '10px' }}> {"Contact "} </Typography>
                                <Typography sx={{ display: 'inline' }}> {data.contact} </Typography>
                              </Box>



                            </AccordionDetails>
                          </Accordion>



                          <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="Applications"
                            >
                              <Typography>Applications</Typography>
                            </AccordionSummary>
                            <AccordionDetails>

                              {/*
                                Students Applications List
                               */}
                              <Grid container spacing={2} >
                                {
                                  data.appliedStudents && data.appliedStudents.map((data, index) => (
                                    <Grid item lg={12} sm={12} key={index}>
                                      <Box sx={{ borderRadius: '10px', padding: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                                        <div className={classes.software_title}>


                                          <Grid container spacing={2}>
                                            <Grid item className={classes.studentImg}  >
                                              <img
                                                className={classes.studentImageTag}
                                                src={`http://res.cloudinary.com/dksfpant5/image/upload/${data.student.pic}`}
                                                alt="studentImage" />
                                            </Grid>
                                            <Grid item xs={9} className="studentDetail">
                                              <Typography variant='h5' sx={{ textTransform: 'uppercase', fontWeight: '500', }}>{data.student.fname + " " + data.student.lname}</Typography>

                                              <Typography color='#0085c6'>{data.student.email}</Typography>
                                              <Typography>{data.student.enrollment}</Typography>
                                              <Typography variant='p' sx={{ display: 'inline', marginTop: '20px', fontWeight: '500', textTransform: 'uppercase' }}>{"Skills :"}</Typography>
                                              <Typography sx={{ display: 'inline', marginLeft: '10px' }}>
                                                {
                                                  data.skillsName && data.skillsName.map((skill, i) => (
                                                    <Chip label={skill} color='primary'
                                                      key={i}
                                                      sx={{ marginRight: '10px', marginBottom: '5px', height: '20px !important', borderRadius: '3px !important' }} />))
                                                }
                                              </Typography>
                                            </Grid>

                                          </Grid>

                                          <div>

                                            <Typography variant='h6'>{"Experience"}</Typography>
                                            <Typography>{data.experience}</Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: "20px" }}>
                                              <Typography variant='h6'  >{"Contact :"}</Typography>
                                              <Typography color='#0085c6'>{data.student.phonenumber}</Typography>
                                            </Box>

                                            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: "20px" }}>
                                              <Typography variant='h6' sx={{ marginBottom: '30px' }}> {"Team Composition"} </Typography>

                                              <Typography  >
                                                {
                                                  data.teamComposition && data.teamComposition.map((person, i) => (
                                                    <Chip label={person} color="primary"
                                                      sx={{ marginRight: '10px', marginBottom: '5px', height: '20px !important', borderRadius: '3px !important' }}
                                                      key={i} />))
                                                }
                                              </Typography>
                                            </Box>


                                            <Typography variant='h5' sx={{ margin: '20px 0', textTransform: 'uppercase', fontWeight: '500' }} >{"Advisor Detail"}</Typography>

                                            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: "20px" }}>
                                              <Typography variant='h6'> Name : </Typography>
                                              <Typography sx={{ fontWeight: '500', textTransform: 'uppercase' }}> {data.advisorName}</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: "20px" }}>
                                              <Typography variant='h6'> Email :</Typography>
                                              <Typography color='#0085c6'> {data.advisorEmail}</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: "20px" }}>
                                              <Typography variant='h6'> Contact No :</Typography>
                                              <Typography color='#0085c6'> {data.advisorContact}</Typography>
                                            </Box>

                                          </div>
                                        </div>
                                      </Box>
                                    </Grid>
                                  ))
                                }
                              </Grid>


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
            <Pagination
              count={Math.ceil(projectData?.length / showPerPage)}
              shape='rounded'
              onChange={handlePaginationChange}
              page={currentPage}
            />
          </Box>
        </Grid>
      </Container>
    </>
  )
}

export default Project

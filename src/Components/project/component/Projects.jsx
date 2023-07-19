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
import "../../../CSS/Utils.css";
// import { apiCAll } from '../../../../integration/apiCall';
import moment from 'moment/moment';

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
  logoDateContainer:{
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
  }

});



const projectsStatic = [
  {
    id: 1,
    title: 'tittle1',
    companyLogo: '',
    statement: 'statement', 
    skills: ['CSS', 'HTML', 'JavaScript'], 
    description: 'description',
    scope: 'scope',
    deliverables: 'deliverables',
    methodology:  'methodology',
    teamComposition : ["teamComposition", "teamComposition"],
    department: "Software Engineer1",
    contact : "03423446805",
    date: new Date(),
    appliedStudents:  [
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",
        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css','HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805' 
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css','HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805' 
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css','HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805' 
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css','HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805' 
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css','HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805' 
      },
    ]
  }, {
    id: 2,
    title: 'tittle2',
    companyLogo: '',
    statement: 'statement', 
    skills: ['CSS', 'HTML', 'JavaScript'], 
    description: 'description',
    scope: 'scope',
    deliverables: 'deliverables',
    methodology:  'methodology',
    teamComposition : ["teamComposition", "teamComposition"],
    department: "Software Engineer",
    contact : "03423446805",
    date: new Date(),
    appliedStudents:  [
      
    ]
  }, {
    id: 3,
    title: 'tittle2',
    companyLogo: '',
    statement: 'statement', 
    skills: ['CSS', 'HTML', 'JavaScript'], 
    description: 'description',
    scope: 'scope',
    deliverables: 'deliverables',
    methodology:  'methodology',
    teamComposition : ["teamComposition", "teamComposition"],
    department: "Software Engineer",
    contact : "03423446805",
    date: new Date(),
    appliedStudents:  [
      
    ]
  }, {
    id: 4,
    title: 'tittle2',
    companyLogo: '',
    statement: 'statement', 
    skills: ['CSS', 'HTML', 'JavaScript'], 
    description: 'description',
    scope: 'scope',
    deliverables: 'deliverables',
    methodology:  'methodology',
    teamComposition : ["teamComposition", "teamComposition"],
    department: "Software Engineer",
    contact : "03423446805",
    date: new Date(),
    appliedStudents:  [
      
    ]
  }, {
    id: 5,
    title: 'tittle2',
    companyLogo: '',
    statement: 'statement', 
    skills: ['CSS', 'HTML', 'JavaScript'], 
    description: 'description',
    scope: 'scope',
    deliverables: 'deliverables',
    methodology:  'methodology',
    teamComposition : ["teamComposition", "teamComposition"],
    department: "Software Engineer",
    contact : "03423446805",
    date: new Date(),
    appliedStudents:  [
      
    ]
  },
  {
    id: 6,
    title: 'tittle2',
    statement: 'statement', 
    skills: ['CSS', 'HTML', 'JavaScript'], 
    description: 'description',
    scope: 'scope',
    deliverables: 'deliverables',
    methodology:  'methodology',
    teamComposition : ["teamComposition", "teamComposition"],
    department: "Software Engineer",
    contact : "03423446805",
    date: new Date(),
    appliedStudents:  [
      
    ]
    },
]
const ClientJob = () => {
  const classes = useStyles();

  
  const [requestJob, setRequestJob] = useState(false);
  const openRequest = () => setRequestJob(true);
  const closeRequest = () => setRequestJob(false);

  const [showPerPage] = useState(4)
  const [search, setSearch] = useState('title');
  
  const [projects , setProjects  ] = useState(projectsStatic.slice(0, showPerPage));
  const [projectData , setProjectData] = useState(projectsStatic);
  const [projectDataSearch, setProjectDataSearch] = useState(projectsStatic);

  // const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");



  const handleChange = (event) => {
    setSearch(event.target.value);

  };

  // const loadJobs = async (start = 0, end = showPerPage) => {
  //   await apiCAll(`/api/user/job/get`, 'post', { pagination: { starts: start, totalRows: end - start } }).then((res) => {
      
  //     console.log(res?.data);
  //     setJobs(res?.data.data);
  //     setTotal(res?.data.total);
  //     setPostCount(res?.data.total);
  //   }).catch((err) => {
  //     console.log(err);
  //   })
  //   setLoading(false);
  // }

  const handleSearch = async () => {

    const searchData  =  projectDataSearch.filter(project => project[search] === value );
    setProjectData(searchData);
    setProjects(searchData.slice(0, showPerPage));



  }

  const searchingTextEmpty = (text) => {

    if (text === "") {
      setProjectData(projectDataSearch);
      setProjects(projectDataSearch.slice(0, showPerPage));
    }
  }

  useEffect(() => {
    // setLoading(true);
    // loadJobs();
  }, [])




  const  addProjects = (project) =>{
    setProjects(prev=>{
      return [project, ...prev];
    });
  }

  const handlePaginationChange = (e, pageNumber)=>{
    const startingIndex = (pageNumber - 1) * showPerPage;
    const endingIndex = startingIndex + showPerPage <= projectData.length ? startingIndex + showPerPage : projectData.length;

    console.log(startingIndex, endingIndex);
    setProjects(projectData.slice(startingIndex, endingIndex));

  }
  return (
    <>
      {/* <ClientNavbar /> */}
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
                  <MenuItem value={'title'}>Tittle</MenuItem>
                  <MenuItem value={'department'}>Department</MenuItem>
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
                  ((projects.length === 0) ?
                    (<div className='Post_center'>
                      <h1 className='main_heading'>No Result Found</h1>
                    </div>) :
                    (projects && projects.map((data, index) => (
                      <Grid item lg={12} key={index}>
                        <Box sx={{ borderRadius: '10px', padding: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                          <div className={classes.software_title}>
                          <div  className={classes.logoDateContainer}>
                              <div className="logo">
                                <img
                                className={classes.software_image} 
                                // src={data.companyLogo} 
                                src='https://pakistanplacement-employers.s3.amazonaws.com/149146986110p%20Logo%203.png'
                                alt="companyLogo" />
                              </div>
                              <Typography sx={{ display: 'block', color: '#d3d3d3' }}>
                                {moment(data?.date).format('DD MMM YYYY')}
                              </Typography>
                            </div>


                            <div>
                              <Typography>{"Project Title"}</Typography>
                              <Typography>{data.title}</Typography>
                              <Typography>{"Project Statement"}</Typography>
                              <Typography>{data.statement}</Typography>
                              <Typography>{"Skills"}</Typography>
                              <Typography>
                                {
                                  data.skills && data.skills.map((skill, i) => (
                                    <Chip label={skill} sx={{ marginRight: '10px', marginBottom: '5px' }} />))
                                }
                              </Typography>

                            </div>

                           

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
                                <Typography> {"Description"} </Typography>
                                <Typography> {data.description} </Typography>
                                <Typography> {"Scope"} </Typography>
                                <Typography> {data.scope} </Typography>
                                <Typography> {"Deliverables"} </Typography>
                                <Typography> {data.deliverables} </Typography>
                                <Typography> {"Methodology"} </Typography>
                                <Typography> {data.methodology} </Typography>
                                <Typography> {"Team Composition"} </Typography>
                                <Typography>
                                {
                                  data.teamComposition && data.teamComposition.map((person, i) => (
                                    <Chip label={person} sx={{ marginRight: '10px', marginBottom: '5px' }} key={i} />))
                                }
                              </Typography>
                                <Typography> {"Department"} </Typography>
                                <Typography> {data.department} </Typography>

                                <Typography> {"Contact "} </Typography>
                                <Typography> {data.contact} </Typography>


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
            count={Math.ceil(projectData.length / showPerPage) }
            shape='rounded'
            onChange={handlePaginationChange}
            />
          </Box>
        </Grid>
      </Container>
    </>
  )
}

export default ClientJob

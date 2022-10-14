import React, { useState, useEffect, useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Pagination from '../Pages/Pagination';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AdminNavbar from './AdminNavbar';
import {
  Grid,
  Accordion,
  Autocomplete,
  Link,
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

const drawerWidth = 200;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


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

const AdminJobs = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [search, setSearch] = useState(1);
  const [jobRole, setJobRole] = useState('');
  const [jobType, setJobType] = useState('');
  const [requestJob, setRequestJob] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


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
    handleSearch(null, start, end).then(() => {
    });
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
    setValue(event.target.value);
  };

  const updateJobSkill = async (expanded, index, job) => {
    if (!jobs[index]?.skills && expanded) {
      await apiCAll(`/api/user/job/skill/get`, 'post', { job: { id: job.ID } }).then((res) => {

        console.log(res.data);
        let st = jobs;
        let skill_STD = st[index];
        skill_STD = { ...skill_STD, skills: res?.data };
        st[index] = skill_STD;
        setJobs([...st])
        // console.log(res?.data);
        // console.log(studentData)

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

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <AdminNavbar open={open}
          handleDrawerClose={handleDrawerClose}
          handleDrawerOpen={handleDrawerOpen}
          theme={theme} />
        <Main open={open}>
          <DrawerHeader />
          <MetaData title="Jobs" />
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
                      <MenuItem value={1}>Company Name</MenuItem>
                      <MenuItem value={2}>Tittle</MenuItem>
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
                                  <Typography>{job.TITTLE}</Typography>
                                  <Typography>{job.ADDRESS}</Typography>
                                  <div>
                                    <Typography sx={{ display: 'inline-block' }}>{job.DURATION}</Typography>,&nbsp;
                                    <Typography sx={{ display: 'inline-block' }}>{job.LOCATION}</Typography>
                                    <Link style={{ display: 'block'}} underline='none' href={job.LINKS} target={"_blank"}>more...</Link>                                  
                                  </div>
                                </div>
                                <div>
                                  <Typography sx={{ display: 'block', textAlign: 'right', color: '#d3d3d3' }}>{jobs?.POSTDATE?.split('T')[0]}</Typography>
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
        </Main>
      </Box>


    </>
  )
}

export default AdminJobs

// import React, { useState, useEffect } from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import axios from "axios";
// import Pagination from '../Pages/Pagination';
// import AdminNavbar from './AdminNavbar';
// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Backdrop,
//   Chip,
//   Container,
//   CircularProgress,
//   Grid,
//   Typography,
//   TextField,
//   Select,
//   InputLabel,
//   FormControl,
//   MenuItem
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { makeStyles } from '@material-ui/styles';
// import SearchIcon from '@mui/icons-material/Search';
// import MetaData from '../MetaData';
// import "../CSS/Utils.css"
// import { apiCAll, apiJson } from '../integration/apiCall';

// const useStyles = makeStyles({
//   searching: {
//     width: '100%',
//     border: '1px solid',
//     borderRadius: '10px',
//   },
//   search_div: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '80%',
//     height: '40px',
//     border: '1px solid black',
//     boxSizing: 'border-box'
//   },
//   search: {
//     width: '100%',
//     fontSize: '1.1rem',
//     padding: '5px',
//     border: 'none',
//     outline: 'none'
//   },
//   search_icon: {
//     margin: '0',
//     width: '50px',
//     height: '100%',
//     fontSize: '1.5rem',
//     background: 'hsl(0, 0%, 18.82%)',
//     color: 'white',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     cursor: 'pointer'
//   },
//   software_title: {
//     display: 'flex',
//     justifyContent: 'space-between',

//   },
//   software_image: {
//     width: '100px',
//     height: '100px'
//   },
// });


// const drawerWidth = 200;

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   }),
// );


// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-end',
// }));


// const AdminJobs = () => {
//   const classes = useStyles();
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   const [search, setSearch] = useState(1);
//   const [jobRole, setJobRole] = useState('');
//   const [jobType, setJobType] = useState('');
//   const [jobs, setJobs] = useState();
//   const [postCount, setPostCount] = useState(null);
//   const [showPerPage] = useState(4);
//   const [total, setTotal] = useState(0);
//   const [pagination, setPagination] = useState({
//     start: 0,
//     end: showPerPage
//   });
//   const [loading, setLoading] = useState(false);
//   const [value, setValue] = useState();

//   const onPaginationChange = (start, end) => {
//     setPagination({
//       start: start,
//       end: end
//     })
//   }

//   const handleChange = (event) => {
//     console.log(event.target.value)
//     setSearch(event.target.value);
//   };

//   const handleJobRole = (event) => {
//     console.log(event.target.value)
//     setJobRole(event.target.value);
//   };

//   const handleJobType = (event) => {
//     console.log(event.target.value)
//     setJobType(event.target.value);
//   };

//   const loadJobs = async (start = 0, end = showPerPage) => {
//     await apiCAll(`/api/user/student/get`, 'post', { pagination: { starts: start, totalRows: end - start } }).then((res) => {
//       console.log(res?.data);
//       setJobs(res?.data.data);
//       setTotal(res?.data.total);
//       setPostCount(res?.data.total);
//     }).catch((err) => {
//       console.log(err);
//     })
//     setLoading(false);
//   }

//   const handleSearch = async (e, start = 0, end = showPerPage) => {
//     setLoading(true);
//     e?.preventDefault();

//     switch (search) {
//       case 1: {
//         await apiCAll(`/api/user/student/searchBy/name`, 'post', { pagination: { starts: start, totalRows: end - start }, name: { query: value }, }).then((res) => {
//           console.log(res?.data);
//           setJobs(res?.data.data);
//           setPostCount(res?.data.total);
//           setTotal(res?.data.total);
//         }).catch((err) => {
//           console.log(err);
//         })
//         setLoading(false);
//       } break;
//       case 2: {
//         await apiCAll(`/api/user/student/searchBy/depart`, 'post', { pagination: { starts: start, totalRows: end - start }, depart: { query: value }, }).then((res) => {
//           console.log(res?.data);
//           setJobs(res?.data.data);
//           setTotal(res?.data.total);
//           setPostCount(res?.data.total);
//         }).catch((err) => {
//           console.log(err);
//         })
//         setLoading(false);
//       } break;
//       case 3: {
//         await apiCAll(`/api/user/student/searchBy/depart`, 'post', { pagination: { starts: start, totalRows: end - start }, depart: { query: value }, }).then((res) => {
//           console.log(res?.data);
//           setJobs(res?.data.data);
//           setTotal(res?.data.total);
//           setPostCount(res?.data.total);
//         }).catch((err) => {
//           console.log(err);
//         })
//         setLoading(false);
//       } break;
//       case 4: {
//         await apiCAll(`/api/user/student/searchBy/depart`, 'post', { pagination: { starts: start, totalRows: end - start }, depart: { query: value }, }).then((res) => {
//           console.log(res?.data);
//           setJobs(res?.data.data);
//           setTotal(res?.data.total);
//           setPostCount(res?.data.total);
//         }).catch((err) => {
//           console.log(err);
//         })
//         setLoading(false);
//       } break;
//       case 5: {
//         await apiCAll(`/api/user/student/searchBy/depart`, 'post', { pagination: { starts: start, totalRows: end - start }, depart: { query: value }, }).then((res) => {
//           console.log(res?.data);
//           setJobs(res?.data.data);
//           setTotal(res?.data.total);
//           setPostCount(res?.data.total);
//         }).catch((err) => {
//           console.log(err);
//         })
//         setLoading(false);
//       } break;
//       default: {
//         alert("Please select the category")
//       }
//     }


//     if (value) {
//       await apiJson(`/jobs?q=${value}`).then((res) => {
//         setJobs(res.data);
//         console.log(res?.data)
//         setTotal(res?.data.length);
//         setPostCount(res?.data.length);
//         setValue("");
//       }).catch((err) => {
//         console.log(err);
//       })
//     }
//     else {
//       alert("Please Enter text to search");
//     }
//     setLoading(false);
//   }


//   useEffect(() => {
//     loadJobs();
//     setLoading(true);
//   }, [])


//   return (
//     <Box sx={{ display: 'flex' }}>
//       <AdminNavbar open={open}
//         handleDrawerClose={handleDrawerClose}
//         handleDrawerOpen={handleDrawerOpen}
//         theme={theme} />
//       <Main open={open}>
//         <DrawerHeader />
//         <MetaData title="Admin Jobs" />
//         <Container maxWidth="xl" sx={{ padding: '0' }}>
//           <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Grid item lg={10} sx={{ display: { xs: 'none', lg: 'block' }, marginTop: '10px' }}>
//               <h1>Jobs</h1>
//             </Grid>
//             <Grid item lg={12} xs={12} sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, justifyContent: 'space-between', alignItems: 'center', marginTop: { lg: 'none', xs: "10px" } }}>
//               <div>
//                 {
//                   search == 2 ?
//                     (<Box sx={{ minWidth: 120 }}>
//                       <FormControl fullWidth>
//                         <InputLabel id="demo-simple-select-label">Job Role</InputLabel>
//                         <Select
//                           labelId="demo-simple-select-label"
//                           id="demo-simple-select"
//                           value={jobRole}
//                           label="Job Role"
//                           onChange={handleJobRole}
//                           sx={{ marginRight: '10px', width: { lg: 500, xs: 250 } }}
//                         >
//                           <MenuItem value="fullStack">Full Stack Developer</MenuItem>
//                           <MenuItem value="frontend">Front End Developer</MenuItem>
//                           <MenuItem value="backend">Back End Developer</MenuItem>
//                           <MenuItem value="database">Database Engineer</MenuItem>
//                           <MenuItem value="softwareEngineer">Software Engineer</MenuItem>
//                         </Select>
//                       </FormControl>
//                     </Box>) :
//                     (search == 4 ?
//                       (<Box sx={{ minWidth: 120 }}>
//                         <FormControl fullWidth>
//                           <InputLabel id="demo-simple-select-label">Job Type</InputLabel>
//                           <Select
//                             labelId="demo-simple-select-label"
//                             id="demo-simple-select"
//                             value={jobType}
//                             label="Search"
//                             onChange={handleJobType}
//                             sx={{ marginRight: '10px', width: { lg: 500, xs: 250 } }}
//                           >
//                             <MenuItem value="onsite">Onsite</MenuItem>
//                             <MenuItem value="remote">Remote</MenuItem>
//                           </Select>
//                         </FormControl>
//                       </Box>) :
//                       (<TextField
//                         id="search"
//                         label="search"
//                         variant="outlined"
//                         size='medium'
//                         value={value}
//                         onChange={(e) => { setValue(e.target.value) }}
//                         onKeyPress={(e) => { if (e.key === "Enter") { handleSearch() } }}
//                         sx={{ marginRight: '10px', width: { lg: 500, xs: 250 } }} />))
//                 }

//               </div>
//               <Box sx={{ minWidth: 120 }}>
//                 <FormControl fullWidth>
//                   <InputLabel id="demo-simple-select-label">Search By</InputLabel>
//                   <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     value={search}
//                     label="Search"
//                     onChange={handleChange}
//                   >
//                     <MenuItem value={1}>Company Name</MenuItem>
//                     <MenuItem value={2}>Title</MenuItem>
//                     <MenuItem value={3}>Address</MenuItem>
//                     <MenuItem value={4}>Location</MenuItem>
//                     <MenuItem value={5}>Skills</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Box>
//               <SearchIcon
//                 fontSize='large'
//                 onClick={handleSearch}
//                 sx={{ color: '#42b6EE', cursor: 'pointer', marginTop: { lg: 'none', xs: '10px' }, }} />
//             </Grid>
//             <Grid item lg={10} xs={12} >
//               <Grid container spacing={2}>
//                 {
//                   loading ?
//                     (
//                       <Backdrop
//                         sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
//                         <CircularProgress color="inherit" />
//                       </Backdrop>
//                     ) : ((postCount === 0) ?
//                       (
//                         <div className='Post_center'>
//                           <h1 className='main_heading'>No Result Found</h1>
//                         </div>
//                       ) :
//                       (jobs && jobs.map((job, index) => (
//                         <Grid item lg={12} key={index}>
//                           <Box sx={{ borderRadius: '10px', padding: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
//                             <div className={classes.software_title}>
//                               <div>
//                                 <h3 className='mobileHeading'>{job.COMPANYNAME}</h3>
//                                 <Typography>{job.TITTLE}</Typography>
//                                 <Typography>{job.ADDRESS}</Typography>
//                                 <div>
//                                   <Typography sx={{ display: 'inline-block' }}>{job.DURATION}</Typography>,&nbsp;
//                                   <Typography sx={{ display: 'inline-block' }}>{job.LOCATION}</Typography>
//                                   <a style={{ display: 'block' }} href={job.LINKS} target={"_blank"}>Detail</a>
//                                 </div>
//                               </div>
//                               <div>
//                                 <div>
//                                   <Typography sx={{ display: 'block', textAlign: 'right', color: '#d3d3d3' }}>{job.POSTDATE.split('T')[0]}</Typography>
//                                   <img className={classes.software_image} src={job.IMAGE} alt="student" />
//                                 </div>
//                               </div>
//                             </div>
//                             <Accordion>
//                               <AccordionSummary
//                                 expandIcon={<ExpandMoreIcon />}
//                                 aria-controls="panel1a-content"
//                                 id="about"
//                               >
//                                 <Typography>Description</Typography>
//                               </AccordionSummary>
//                               <AccordionDetails>
//                                 <Typography>
//                                   {job.DESCRIPTION}
//                                 </Typography>
//                               </AccordionDetails>
//                             </Accordion>
//                             <Accordion>
//                               <AccordionSummary
//                                 expandIcon={<ExpandMoreIcon />}
//                                 aria-controls="panel1a-content"
//                                 id="skills"
//                               >
//                                 <Typography>Required Skills</Typography>
//                               </AccordionSummary>
//                               <AccordionDetails>
//                                 <Typography>
//                                   {
//                                     job.requiredSkill && job.requiredSkill.map((services, i) => (
//                                       <Chip label={services} sx={{ marginRight: '10px', marginBottom: '5px' }} />))
//                                   }
//                                 </Typography>
//                               </AccordionDetails>
//                             </Accordion>
//                           </Box>

//                         </Grid>
//                       )))
//                     )
//                 }
//               </Grid>
//             </Grid>
//             <Box sx={{ margin: '20px 0px' }}>
//               <Pagination showPerPage={showPerPage}
//                 onPaginationChange={onPaginationChange}
//                 numberOfButtons={Math.ceil(total / showPerPage)}
//               />
//             </Box>
//           </Grid>
//         </Container>
//       </Main>
//     </Box>
//   )
// }

// export default AdminJobs
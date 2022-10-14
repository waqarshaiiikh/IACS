import React, { useState, useEffect, useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import axios from "axios";
import Pagination from '../Pages/Pagination';
import AdminNavbar from './AdminNavbar';
import {
  Accordion,
  Autocomplete,
  AccordionSummary,
  AccordionDetails,
  Button,
  Link,
  Backdrop,
  Chip,
  Checkbox,
  Container,
  CircularProgress,
  FormControl,
  Grid,
  Modal,
  MenuItem,
  Typography,
  TextField,
  TextareaAutosize,
  Select,
  InputLabel
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@material-ui/styles';
import MetaData from '../MetaData';
import "../CSS/Utils.css";
import { apiCAll } from '../integration/apiCall';


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


const AdminInternships = () => {
  
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  const [requestInternship, setRequestInternship] = useState(false);
  const openRequest = () => setRequestInternship(true);
  const closeRequest = () => setRequestInternship(false);

  const [search, setSearch] = useState(1);
  const [internshipRole, setInternshipRole] = useState('');
  const [internshipType, setInternshipType] = useState('');

  const [internships, setInternships] = useState(null);
  const [postCount, setPostCount] = useState(null);
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

  const handleInternshipRole = (event) => {
      console.log(event.target.value)
      setInternshipRole(event.target.value);
  };

  const handleInternshipType = (event) => {
      console.log(event.target.value)
      setInternshipType(event.target.value);
      setValue(event.target.value);
  };

  
  const updateJobSkill = async (expanded, index, interns) => {
      if (!internships[index]?.skills && expanded) {
          await apiCAll(`/api/user/internship/skill/get`, 'post', { job: { id: interns.ID } }).then((res) => {

              console.log(res.data);
              let st = internships;
              let skill_STD = st[index];
              skill_STD = { ...skill_STD, skills: res?.data };
              st[index] = skill_STD;
              setInternships([...st])

          }).catch((err) => {
              console.log(err);
          })

      }
  }


  const loadJobs = async (start = 0, end = showPerPage) => {
      await apiCAll(`/api/user/internship/get`, 'post', { pagination: { starts: start, totalRows: end - start } }).then((res) => {

          console.log(res?.data);
          setInternships(res?.data.data);
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
              await apiCAll(`/api/user/internship/searchBy/companyName`, 'post', { pagination: { starts: start, totalRows: end - start }, companyName: { query: value }, }).then((res) => {
                  console.log(res?.data);
                  setInternships(res?.data.data);
                  setPostCount(res?.data.total);
                  setTotal(res?.data.total);
              }).catch((err) => {
                  console.log(err);
              })
              setLoading(false);
          } break;
          case 2: {
              await apiCAll(`/api/user/internship/searchBy/tittle`, 'post', { pagination: { starts: start, totalRows: end - start }, tittle: { query: value }, }).then((res) => {
                  console.log(res?.data);
                  setInternships(res?.data.data);
                  setTotal(res?.data.total);
                  setPostCount(res?.data.total);
              }).catch((err) => {
                  console.log(err);
              })
              setLoading(false);
          } break;
          case 3: {
              await apiCAll(`/api/user/internship/searchBy/address`, 'post', { pagination: { starts: start, totalRows: end - start }, address: { query: value }, }).then((res) => {
                  console.log(res?.data);
                  setInternships(res?.data.data);
                  setTotal(res?.data.total);
                  setPostCount(res?.data.total);
              }).catch((err) => {
                  console.log(err);
              })
              setLoading(false);
          } break;
          case 4: {
              await apiCAll(`/api/user/internship/searchBy/location`, 'post', { pagination: { starts: start, totalRows: end - start }, location: { query: value }, }).then((res) => {
                  console.log(res?.data);
                  setInternships(res?.data.data);
                  setTotal(res?.data.total);
                  setPostCount(res?.data.total);
              }).catch((err) => {
                  console.log(err);
              })
              setLoading(false);
          } break;
          case 5: {
              await apiCAll(`/api/user/internship/searchBy/skill`, 'post', { pagination: { starts: start, totalRows: end - start }, skill: { query: value }, }).then((res) => {
                  console.log(res?.data);
                  setInternships(res?.data.data);
                  setTotal(res?.data.total);
                  setPostCount(res?.data.total);
              }).catch((err) => {
                  console.log(err);
              })
              setLoading(false);
          } break;
          default: {
              alert("Enter text to search");
          }
      }

      setLoading(false)
  }

  useEffect(() => {
      setLoading(true)
      loadJobs();
  }, [])


  return (
    <Box sx={{ display: 'flex' }}>
      <MetaData title="Internhsips" />
      <AdminNavbar open={open}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
        theme={theme} />
      <Main open={open}>
        <DrawerHeader />
        <MetaData title="Admin Internships" />
        <Container maxWidth="xl" sx={{ padding: '0' }}>
          <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
            <Grid item lg={12} sx={{ display: { xs: 'none', lg: 'block' }, marginTop: '10px' }}>
              <h1>Internships</h1>
            </Grid>
            <Grid item lg={12} xs={12}
              sx={{
                display: 'flex', flexDirection: { xs: 'column', lg: 'row' },
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
                          onChange={handleInternshipType}
                          sx={{ marginRight: '10px', width: { lg: 500, xs: 250 } }}
                        >
                          <MenuItem value="onsite">Onsite</MenuItem>
                          <MenuItem value="remote">Remote</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>) :
                    (<TextField
                      id="search"
                      label="Search"
                      variant="outlined"
                      size='medium'
                      value={value}
                      onChange={(e) => { setValue(e.target.value) }}
                      onKeyPress={(e) => { if (e.key === "Enter") { handleSearch() } }}
                      sx={{
                        marginRight: '10px',
                        width: { lg: 500, xs: 250 }
                      }} />))
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
                    <MenuItem value={2}>Title</MenuItem>
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
                      (
                        <div className='Post_center'>
                          <h1 className='main_heading'>No Result Found</h1>
                        </div>
                      ) :
                      (
                        internships && internships.map((internship, index) => (
                          <Grid item lg={12} key={index}>
                            <Box sx={{ borderRadius: '10px', padding: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                              <div className={classes.software_title}>
                                <div>
                                  <h3 className='mobileHeading'>{internship.COMPANYNAME}</h3>
                                  <Typography>{internship.TITTLE}</Typography>
                                  <Typography>{internship.ADDRESS}</Typography>
                                  <div>
                                    <Typography sx={{ display: 'inline-block' }}>{internship.DURATION}</Typography>,&nbsp;
                                    <Typography sx={{ display: 'inline-block' }}>{internship.LOCATION}</Typography>
                                    <Link style={{ display: 'block' }} underline='none' href={internship.LINKS} target={"_blank"}>more...</Link>                                  
                                  </div>
                                </div>
                                <div>

                                  <Typography sx={{ display: 'block', textAlign: 'right', color: '#d3d3d3' }}>{
                                    internship?.POSTDATE?.split('T')[0]
                                  }</Typography>
                                  <img className={classes.software_image} src={internship.IMAGE} alt="student" />
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
                                    {internship.DESCRIPTION}
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                              <Accordion onChange={(e, expanded) => updateJobSkill(expanded, index, internship)} >
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
                                      internships[index].skills && internships[index].skills.map((skill, i) => (
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
  )
}

export default AdminInternships
import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
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
import AdminNavbar from './AdminNavbar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@mui/icons-material/Search';
import MetaData from '../MetaData';
import { Api, apiCAll, apiJson } from '../integration/apiCall';
import ClientNavbar from '../Industries/ClientNavbar';

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


const AdminStudents = () => {

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [studentData, setStudentData] = useState()

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

  const onPaginationChange = (start, end) => {

    setPagination({
      start: start,
      end: end
    });
    handleSearch(null, start, end).then(() => {
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
      await apiCAll(`/api/user/student/skill/get`, 'post', { student: { id: student.ID } }).then((res) => {

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

      await apiCAll(`/api/user/student/experience/get`, 'post', { student: { id: student.ID } }).then((res) => {

        let st = studentData;
        let experience_STD = st[index];
        experience_STD = { ...experience_STD, experience: res?.data };
        st[index] = experience_STD;
        setStudentData([...st])

        // console.log(res?.data);
        // console.log(studentData)

      }).catch((err) => {
        console.log(err);
      })

    }
  }

  const loadStudent = async (start = 0, end = showPerPage) => {

    await apiCAll(`/api/user/student/get`, 'post', { pagination: { starts: start, totalRows: end - start } }).then((res) => {
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



  const handleSearch = async (e, start = 0, end = showPerPage) => {
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
        await apiCAll(`/api/user/student/searchBy/name`, 'post', { pagination: { starts: start, totalRows: end - start }, name: { query: value }, }).then((res) => {
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
        await apiCAll(`/api/user/student/searchBy/depart`, 'post', { pagination: { starts: start, totalRows: end - start }, depart: { query: value }, }).then((res) => {
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
        await apiCAll(`/api/user/student/searchBy/year`, 'post', { pagination: { starts: start, totalRows: end - start }, year: { query: value }, }).then((res) => {
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

        await apiCAll(`/api/user/student/searchBy/university`, 'post', { pagination: { starts: start, totalRows: end - start }, university: { query: value }, }).then((res) => {
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


        await apiCAll(`/api/user/student/searchBy/skill`, 'post', { pagination: { starts: start, totalRows: end - start }, skill: { query: value }, }).then((res) => {
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
      <Box sx={{ display: 'flex' }}>
        <AdminNavbar open={open}
          handleDrawerClose={handleDrawerClose}
          handleDrawerOpen={handleDrawerOpen}
          theme={theme} />
        <Main open={open}>
          <DrawerHeader />
          <MetaData title="Students" />
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
                                  studentData[index1].experience && studentData[index1].experience.map((exp, index) => (
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
        </Main>
      </Box>
      <div>

      </div>

    </>
  )
}

export default AdminStudents
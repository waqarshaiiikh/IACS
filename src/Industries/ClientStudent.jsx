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
import studentPic from "../Images/student.png";
import MetaData from '../MetaData';
import { Api, apiCAll, apiJson } from '../integration/apiCall';

let student = [
  {
    "id": undefined,
    "fname": "",
    "lname": "",
    "department": "",
    "year": "",
    "university": "",
    "image": "",
    "about": "",
    "skills": [],
    "experience": []
  }
]

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
  const [search, setSearch] = useState(1);

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

  const onPaginationChange = (start, end) => {

    setPagination({
      start: start,
      end: end
    })
  }

  const updateStudentSkill = async (expanded, index, student) => {
    if (!studentData[index]?.skills && expanded) {

      await apiJson(`/skills?id=${student.id}`).then((res) => {

        let st = studentData;
        let skill_STD = st[index];
        skill_STD = { ...skill_STD, skills: res.data[0].skills };
        st[index] = skill_STD;
        setStudentData([...st])
        console.log(studentData)

      }).catch((err) => {
        console.log(err);
      })

    }
  }

  const updateStudentExperience = async (expanded, index, student) => {
    if (!studentData[index]?.experience && expanded) {

      await apiJson(`/experience?id=${student.id}`).then((res) => {

        let st = studentData;
        let experience_STD = st[index];
        experience_STD = { ...experience_STD, experience: res.data[0].experience };
        st[index] = experience_STD;
        setStudentData([...st])
        console.log(studentData)

      }).catch((err) => {
        console.log(err);
      })

    }
  }

  const loadStudent = async () => {

    await apiCAll(`/api/user/student/get`, 'post', {pagination :{starts:0, totalRows: 2 }}).then((res) => {
      console.log(res?.data);
      setStudentData(res?.data.data);
      // setStudents(res?.data);
      setTotal(res?.data.total);
    }).catch((err) => {
      console.log(err);
    })
    setLoading(false);
  }

  const handleSearch = async (e) => {
    setLoading(true)
    e?.preventDefault();
    

    switch (search){
      case 1:{
        await apiJson(`/students?q=${value}`).then((res) => {
          console.log(res?.data)
          setStudents(res.data);
          setTotal(res?.data.length);
          setPostCount(res?.data.length);
          setValue("");
        }).catch((err) => {
          console.log(err);
        })
      } break;
      case 2:{
        await apiJson(`/students?q=${value}`).then((res) => {
          console.log(res?.data)
          setStudents(res.data);
          setTotal(res?.data.length);
          setPostCount(res?.data.length);
          setValue("");
        }).catch((err) => {
          console.log(err);
        })
      } break;
      case 3:{
        await apiJson(`/students?q=${value}`).then((res) => {
          console.log(res?.data)
          setStudents(res.data);
          setTotal(res?.data.length);
          setPostCount(res?.data.length);
          setValue("");
        }).catch((err) => {
          console.log(err);
        })
      } break;
      case 4:{
        await apiJson(`/students?q=${value}`).then((res) => {
          console.log(res?.data)
          setStudents(res.data);
          setTotal(res?.data.length);
          setPostCount(res?.data.length);
          setValue("");
        }).catch((err) => {
          console.log(err);
        })
      } break;
      case 5:{
        await apiJson(`/students?q=${value}`).then((res) => {
          console.log(res?.data)
          setStudents(res.data);
          setTotal(res?.data.length);
          setPostCount(res?.data.length);
          setValue("");
        }).catch((err) => {
          console.log(err);
        })
      } break;
      default:{
        alert("Please select the category")
      }
    }


    if (value) {
      await apiJson(`/students?q=${value}`).then((res) => {
        console.log(res?.data)
        setStudents(res.data);
        setTotal(res?.data.length);
        setPostCount(res?.data.length);
        setValue("");
      }).catch((err) => {
        console.log(err);
      })
    }
    else {
      alert("Enter text to search");
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
                <TextField
                  id="search"
                  label="Search"
                  variant="outlined"
                  value={value}
                  onChange={(e) => { setValue(e.target.value) }}
                  onKeyPress={(e) => { if (e.key === "Enter") { handleSearch() } }}
                  size='medium' sx={{ marginRight: '10px', width: { lg: 500, xs: 250 } }} />
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
                    studentData && studentData.slice(pagination.start, pagination.end).map((student, index1) => (
                      <Grid Grid item lg={10}>
                        <Box sx={{ borderRadius: '10px', padding: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                          <div className={classes.student_title}>
                            <img className={classes.student_image} src={studentPic} alt="student" />
                            <div>
                              <Typography variant='h6'>{student.fname + " " + student.lname}</Typography>
                              <Typography>{Api.DEPARTMENT[student.department]}</Typography>
                              <Typography>{student.year}</Typography>
                              <Typography>{student.university}</Typography>
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
                                {student.about}
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                          <Accordion onChange={(e, expanded) => updateStudentSkill(expanded, index1+pagination.start, student)}>
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

                                  studentData[ index1+pagination.start].skills && studentData[ index1+pagination.start].skills.map((skill, index) => (
                                    <Chip label={skill} key={index} sx={{ marginRight: '10px', marginBottom: '5px' }} />))

                                }
                              </Typography>
                            </AccordionDetails>
                          </Accordion>

                          <Accordion onChange={(e, expanded) => updateStudentExperience(expanded,  index1+pagination.start, student)}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="skills"
                            >
                              <Typography>Experience</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              {
                                studentData[ index1+pagination.start].experience && studentData[ index1+pagination.start].experience.map((exp, index) => (
                                  <Typography style={{ marginBottom: '10px' }}>
                                    <Typography variant='h6' style={{ fontWeight: 'bold' }}>{exp.companyName}</Typography>
                                    <Typography style={{ fontWeight: 'bold' }}>{exp.jobRole}</Typography>
                                    <Typography style={{ fontWeight: 'bold' }}>{exp.startDate} to {exp.endDate}</Typography>
                                    <Typography>{exp.description}</Typography>
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
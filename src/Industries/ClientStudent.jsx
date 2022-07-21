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
  Backdrop
} from '@mui/material';
import axios from 'axios';
import Pagination from '../Pages/Pagination';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@mui/icons-material/Search';
import studentPic from "../Images/student.png";
import MetaData from '../MetaData';

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
  const classes = useStyles();

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

  const onPaginationChange = (start, end) => {
    setPagination({
      start: start,
      end: end
    })
  }

  const loadStudent = async () => {
    await axios.get(`http://localhost:3001/students`).then((res) => {
      setStudents(res?.data);
      setTotal(res?.data.length);
    }).catch((err) => {
      console.log(err);
    })
    setLoading(false);
  }

  const handleSearch = async (e) => {
    setLoading(true)
    e?.preventDefault();
    if (value) {
      await axios.get(`http://localhost:3001/students?q=${value}`).then((res) => {
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
              <h1>Client Students</h1>
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
                    students && students.slice(pagination.start, pagination.end).map((student, index) => (
                      <Grid Grid item lg={10}>
                        <Box sx={{ borderRadius: '10px', padding: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                          <div className={classes.student_title}>
                            <img className={classes.student_image} src={studentPic} alt="student" />
                            <div>
                              <Typography variant='h6'>{student.name}</Typography>
                              <Typography>{student.department}</Typography>
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
                          <Accordion>
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
                                  student.skills && student.skills.map((skill, index) => (
                                    <Chip label={skill} key={index} sx={{ marginRight: '10px', marginBottom: '5px' }} />))
                                }
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                          {
                            student.experience ? (
                              <Accordion>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1a-content"
                                  id="skills"
                                >
                                  <Typography>Experience</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  {
                                    student.experience && student.experience.map((exp, index) => (
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
                            ) : null
                          }
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
import React from 'react'
import ClientNavbar from './ClientNavbar'
import {
  Container, Grid, FormGroup, FormControlLabel,
  Checkbox, Box, Accordion, AccordionSummary,
  AccordionDetails, Typography, Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@mui/icons-material/Search';
import student from "../Images/student.png";

const searchSkill = ["HTML", "CSS",
  "JavaScript",
  "React Js",
  "Python",
  "C / C++",
  "Java",
  "Web Developer",
  "React Native",
  "MongoDB",
  "Node Js",
  "Express Js",
  "Oracle"]

const useStyles = makeStyles({
  searching: {
    width: '100%',
    border: '1px solid',
    borderRadius: '10px',
  },
  studentList: {
    // background: 'green !important',
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
  return (
    <>
      <ClientNavbar />
      <Container maxWidth="xl" sx={{ padding: '0' }}>
        <Grid container spacing={2}>
          <Grid item lg={4} sx={{ display: { xs: 'none', lg: 'block' } }}>
            <h1>Client Student</h1>
          </Grid>
          <Grid item lg={8} xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className={classes.search_div}>
              <input type="text" id="search-student" name="search-student" className={classes.search} />
              <div className={classes.search_icon}>
                <SearchIcon />
              </div>
            </div>
          </Grid>
          <Grid item lg={2} sx={{ display: { xs: 'none', lg: 'block' }, textAlign: 'left' }} className={classes.searching}>
            <h1>Skills</h1>
            <FormGroup>
              {
                searchSkill.map((skill, index) => (
                  <FormControlLabel control={<Checkbox />} label={skill} key={index} />
                ))
              }
            </FormGroup>
          </Grid>
          <Grid item lg={10} xs={12} className={classes.studentList}>
            <Grid container spacing={2}>
              <Grid item lg={12}>
                <Box sx={{ borderRadius: '10px', padding: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                  <div className={classes.student_title}>
                    <img className={classes.student_image} src={student} alt="student" />
                    <div>
                      <p>Muhammad Khalid</p>
                      <p>Software Engineering</p>
                      <p>Final Year, NEDUET</p>
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
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt alias impedit quasi dolorum sed provident ab et illum itaque exercitationem, obcaecati iure vero quisquam earum quo fugiat dicta? Libero, doloremque. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus earum dolorum explicabo sapiente cum eius nam nemo consequatur inventore. Quam consequuntur quae facere id at voluptate quaerat dignissimos doloribus soluta?
                      </p>
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
                      <p>
                        {
                          searchSkill && searchSkill.map((skill, i) => (
                              <Chip label={skill} sx={{ marginRight: '10px', marginBottom:'5px'}} />))
                        }
                      </p>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </Grid>
              <Grid item lg={12}>
                <Box sx={{ borderRadius: '10px', padding: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                  <div className={classes.student_title}>
                    <img className={classes.student_image} src={student} alt="student" />
                    <div>
                      <p>Muhammad Khalid</p>
                      <p>Software Engineering</p>
                      <p>Final Year, NEDUET</p>
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
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt alias impedit quasi dolorum sed provident ab et illum itaque exercitationem, obcaecati iure vero quisquam earum quo fugiat dicta? Libero, doloremque. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus earum dolorum explicabo sapiente cum eius nam nemo consequatur inventore. Quam consequuntur quae facere id at voluptate quaerat dignissimos doloribus soluta?
                      </p>
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
                      <p>
                        {
                          searchSkill && searchSkill.map((skill, i) => (
                              <Chip label={skill} sx={{ marginRight: '10px', marginBottom:'5px'}} />))
                        }
                      </p>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </Grid>
              
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default ClientStudent
import React from 'react'
import ClientNavbar from './ClientNavbar'
import { Container, Grid, FormGroup, FormControlLabel, Checkbox, Box } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@mui/icons-material/Search';
import student from "../Images/student.png";

const searchSkill = ["3rd Year", "Final Year", "GPA Above 3.0", "Web developer", "Mobile App Developer", "React Developer", "MERN Stack", "Machine Learning"];
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
            <Grid container>
              <Grid item lg={12}>
                <Box sx={{ border: '1px solid', borderRadius: '10px' }}>
                  <div>
                    <img className={classes.student_image} src={student} alt="student" />
                    <span>Name</span>
                  </div>
                  <div>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis quisquam qui accusantium explicabo molestias, enim, reiciendis eum et dolor harum doloribus cumque necessitatibus unde distinctio voluptate. Itaque aperiam reprehenderit ipsa!
                  </div>
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
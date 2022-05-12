import React, { useState } from 'react'
import ClientNavbar from './ClientNavbar';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
  Container, Grid, Autocomplete, TextField,
  Checkbox, Box, Accordion, AccordionSummary,
  AccordionDetails, Typography, Chip, Select, MenuItem
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@mui/icons-material/Search';
import student from "../Images/student.png";

const searchSkill = [
  "HTML",
  "CSS",
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
  "Oracle"];

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

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const ClientStudent = () => {
  const classes = useStyles();
  const [search, setSearch] = useState(1);

  const searchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <ClientNavbar />
      <div>
        <Container maxWidth="xl" sx={{ padding: '0' }}>
          <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
            <Grid item lg={12} sx={{ display: { xs: 'none', lg: 'block' }, marginTop: '10px' }}>
              <h1>Client Students</h1>
            </Grid>
            <Grid item lg={12} xs={12} sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, justifyContent: 'space-between', alignItems: 'center',  marginTop: { lg: 'none', xs: "10px" } }}>
              <div>
                {
                  (search === 1) ? (
                    <Autocomplete
                      sx={{ marginRight: '10px',  width: { lg: 500, xs: 250 } }}
                      multiple
                      id="skill-search"
                      options={searchSkill}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option}
                        </li>
                      )}
                      style={{ width: { lg: 500, xs: 250 } }}
                      renderInput={(params) => (
                        <TextField {...params} label="Search by Skills" placeholder="Favorites" size='medium' />
                      )}
                    />
                  ) :
                    (
                      <TextField id="search" label="Search" variant="outlined" size='medium' sx={{ marginRight: '10px', width: { lg: 500, xs: 250 } }} />
                    )
                }
              </div>
              <Select
                value={search}
                onChange={searchChange}
                displayEmpty
                sx={{ width: 120, marginRight: '10px' }}
              >
                <MenuItem value={1}>Skill</MenuItem>
                <MenuItem value={2}>University</MenuItem>
                <MenuItem value={3}>GPA</MenuItem>
                <MenuItem value={4}>Year</MenuItem>
              </Select>
              <SearchIcon fontSize='large' sx={{ color: '#42b6EE', cursor: 'pointer', marginTop:{lg:'none', xs:'10px'}, }} />
            </Grid>
            <Grid item lg={12} xs={12} className={classes.studentList} >
              <Grid container spacing={3} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                <Grid item lg={10}>
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
                            searchSkill && searchSkill.map((skill, index) => (
                              <Chip label={skill} key={index} sx={{ marginRight: '10px', marginBottom: '5px' }} />))
                          }
                        </p>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="skills"
                      >
                        <Typography>Experience</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <p>
                          <h4 style={{ fontWeight: 'bold' }}>10 Pearls</h4>
                          <h5>Web Developer</h5>
                          <h6>Dec-2021 to Feb-2022</h6>
                          <p>ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt alias impedit quasi dolorum sed provident ab et illum itaque exercitationem, obcaecati iure vero quisquam earum quo fugiat dicta? Libero, doloremque. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus earum dolorum explicabo sapiente cum eius nam nemo consequatur inventore.</p>
                        </p>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </Grid>
                <Grid item lg={10}>
                  <Box sx={{ borderRadius: '10px', padding: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                    <div className={classes.student_title}>
                      <img className={classes.student_image} src={student} alt="student" />
                      <div>
                        <p>Muhammad Waqar</p>
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
                              <Chip label={skill} sx={{ marginRight: '10px', marginBottom: '5px' }} />))
                          }
                        </p>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="skills"
                      >
                        <Typography>Experience</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <p>
                          <h4 style={{ fontWeight: 'bold' }}>10 Pearls</h4>
                          <h5>Web Developer</h5>
                          <h6>Dec-2021 to Feb-2022</h6>
                          <p>ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt alias impedit quasi dolorum sed provident ab et illum itaque exercitationem, obcaecati iure vero quisquam earum quo fugiat dicta? Libero, doloremque. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus earum dolorum explicabo sapiente cum eius nam nemo consequatur inventore.</p>
                        </p>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>

    </>
  )
}

export default ClientStudent
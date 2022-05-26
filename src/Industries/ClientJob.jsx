import React, { useState } from 'react';
import ClientNavbar from './ClientNavbar';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
    Container, Grid, Autocomplete, Select,
    Checkbox, Box, Accordion, AccordionSummary,
    AccordionDetails, Chip, Button, Typography,
    Modal, TextField, MenuItem, TextareaAutosize, FormControl
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@mui/icons-material/Search';
import softwareHouse from "../Images/softwareHouselogo.png";

const jobSkills = [
    "Web Development", 
    "Mobile App Development",
    "Graphis Designing",
    "Data Analytics",
    "Desktop Development",
    "Devops",
    "SQA",
    "Database",
    "Digital Media Marketing",
    "Artificial Intelligence",
    "Blockchain",
    "AWS",
    "Cloud & Web Hosting"
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

const requestStyle= {
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

const PostJob = (props) => {
    return (
        <>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                sx={{ overflow: { xs: 'scroll' } }}
            >
                <Box sx={requestStyle}>
                    <Typography variant="h5" sx={{ textAlign: 'center', fontSize: '2rem', }}>
                        Post Job
                    </Typography>
                    <FormControl>
                        <Grid container spacing={1}>
                            <Grid item lg={6} xs={12}>
                                <TextField id="title" fullWidth label="Job Title" placeholder='Full Stack' type='text' variant="outlined" required />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <TextField id="jobType" fullWidth label="Job Type" variant="outlined" required select>
                                    <MenuItem key="fulltime" value="full">Full Time</MenuItem>
                                    <MenuItem key="parttime" value="part">Part Time</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <TextField id="github" fullWidth label="Github" type="text" variant="outlined" required />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <TextField id="linkedin" fullWidth label="Linked In" type="text" variant="outlined" required />
                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <TextareaAutosize
                                    id="Experience"
                                    maxRows={5}
                                    required
                                    style={{ width: '100%', padding: '10px' }}
                                    placeholder="Write About yourself with in 200 words"
                                />
                            </Grid>
                            <Grid item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'right' }}>
                                <Button variant="contained" onClick={props.handleClose}>Post</Button>
                            </Grid>
                        </Grid>
                    </FormControl>
                </Box>
            </Modal>
        </>
    )
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ClientJob = () => {
    const classes = useStyles();

    const [requestJob, setRequestJob] = useState(false);
    const openRequest = () => setRequestJob(true);
    const closeRequest = () => setRequestJob(false);

    const [search, setSearch] = useState(1);

    const searchChange = (event) => {
        setSearch(event.target.value);
    };

    return (
        <>
            <ClientNavbar />
            <PostJob open={requestJob} handleClose={closeRequest}/>
            <Container maxWidth="xl" sx={{ padding: '0' }}>
                <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Grid item lg={12} sx={{ display: { xs: 'none', lg: 'block' }, marginTop: '10px' }}>
                        <h1>Jobs</h1>
                    </Grid>
                    <Grid item lg={12} xs={12} sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, justifyContent: 'space-between', alignItems: 'center', marginTop: { lg: 'none', xs: "10px" } }}>
                        <div>
                            {
                                (search === 1) ? (
                                    <Autocomplete
                                        sx={{ marginRight: '10px', width: { lg: 500, xs: 250 } }}
                                        multiple
                                        id="skill-search"
                                        options={jobSkills}
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
                                        <TextField id="search" label="search" variant="outlined" size='medium' sx={{ marginRight: '10px', width: { lg: 500, xs: 250 } }} />
                                    )
                            }
                        </div>
                        <Select
                            value={search}
                            onChange={searchChange}
                            displayEmpty
                            sx={{ width: 180, marginRight: '10px' }}
                        >
                            <MenuItem value={1}>Skill</MenuItem>
                            <MenuItem value={2}>Title</MenuItem>
                            <MenuItem value={3}>Software House</MenuItem>
                            <MenuItem value={4}>City</MenuItem>
                        </Select>
                        <SearchIcon fontSize='large' sx={{ color: '#42b6EE', cursor: 'pointer', marginTop: { lg: 'none', xs: '10px' }, }} />
                    </Grid>
                    <Grid item lg={12}>
                        <Button variant='contained' sx={{ marginTop: '10px' }} onClick={openRequest}>Post Job</Button>
                    </Grid>
                    <Grid item lg={10} xs={12} >
                        <Grid container spacing={2}>
                            <Grid item lg={12}>
                                <Box sx={{ borderRadius: '10px', padding: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                                    <div className={classes.software_title}>
                                        <div>
                                            <h1>10 Pearls</h1>
                                            <p>Full Stack Developer</p>
                                            <p>Karachi, Pakistan</p>
                                        </div>
                                        <img className={classes.software_image} src={softwareHouse} alt="student" />
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
                                            <Typography>Required Skills</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <p>
                                                {
                                                    jobSkills && jobSkills.map((services, i) => (
                                                        <Chip label={services} sx={{ marginRight: '10px', marginBottom: '5px' }} />))
                                                }
                                            </p>
                                        </AccordionDetails>
                                    </Accordion>
                                </Box>
                            </Grid>
                            <Grid item lg={12}>
                                <Box sx={{ borderRadius: '10px', padding: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                                    <div className={classes.software_title}>
                                        <div>
                                            <h1>Contour Software</h1>
                                            <p>Karachi, Pakistan</p>
                                            <p>Front end Developer</p>
                                        </div>
                                        <img className={classes.software_image} src={softwareHouse} alt="student" />
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
                                            <Typography>Required Skills</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <p>
                                                {
                                                    jobSkills && jobSkills.map((services, i) => (
                                                        <Chip label={services} sx={{ marginRight: '10px', marginBottom: '5px' }} />))
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

export default ClientJob 

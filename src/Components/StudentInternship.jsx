import React, { useState, useEffect } from 'react';
import axios from "axios";
import Pagination from '../Pages/Pagination';
import Navbar from './Navbar';
import {
    Accordion,
    Autocomplete,
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
    Grid,
    Modal,
    MenuItem,
    Typography,
    TextField,
    TextareaAutosize,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@material-ui/styles';
import MetaData from '../MetaData';
import "../CSS/Utils.css";
import { apiJson } from '../integration/apiCall';

const internshipSkills = [
    "HTML CSS & JavaScript",
    "C# .Net",
    "C / C++",
    "Java",
    "Swift",
    "Python",
    "React Js",
    "Angular",
    "Next JS",
    "Rest API",
    "React Native",
    "Flutter",
    "Kotlin",
    "Machine Learning",
    "Artificial Intelligence",
    "Data Science",
    "Data Analytics",
    "MERN Stack",
    "SQL",
    "MongoDB",
    "Oracle",
    "Firebase",
    "iOS Development",
    "Android Development",
    "Desktop Development",
    "Frontend Development",
    "Backned Development",
    "SQA",
    "Digital Media Marketing",
    "Blockchain",
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

const PostInternship = (props) => {
    return (
        <>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                sx={{ overflow: { xs: 'scroll' } }}
            >
                <Box sx={requestStyle}>
                    <Typography variant="h5" sx={{ textAlign: 'center', fontSize: '2rem', }}>
                        Request Internship
                    </Typography>
                    <FormControl>
                        <Grid container spacing={1}>
                            <Grid item lg={6} xs={12}>
                                <TextField id="title" fullWidth label="Internship Title" placeholder='Full Stack' type='text' variant="outlined" required />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <TextField id="internshipType" fullWidth label="Internship Type" variant="outlined" required select>
                                    <MenuItem key="remote" value="remote">Remote</MenuItem>
                                    <MenuItem key="onsite" value="onsite">Onsite</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <TextField id="github" fullWidth label="Github" type="text" variant="outlined" required />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <TextField id="linkedin" fullWidth label="Linked In" type="text" variant="outlined" required />
                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <Autocomplete
                                    multiple
                                    id="internshipSkills"
                                    options={internshipSkills}
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
                                    renderInput={(params) => (
                                        <TextField {...params} label="Skills" placeholder="Skills" />
                                    )}
                                />
                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <TextareaAutosize
                                    id="Experience"
                                    maxRows={5}
                                    required
                                    style={{ width: '100%', padding: '10px' }}
                                    placeholder="Write About your skills and interest with in 200 words"
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

const StudentInternship = () => {
    const classes = useStyles();

    const [requestJob, setRequestJob] = useState(false);
    const openRequest = () => setRequestJob(true);
    const closeRequest = () => setRequestJob(false);

    const [internships, setInternships] = useState();
    const [postCount, setPostCount] = useState(null);
    const [showPerPage] = useState(4);
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
    }

    const loadInternship = async () => {
        
        await apiJson(`/internships`).then((res) => {
            setInternships(res.data);
            setTotal(res?.data.length);
        }).catch((err) => {
            console.log(err);
        })
        setLoading(false)
    }

    const handleSearch = async (e) => {
        setLoading(true);
        e?.preventDefault();
        if (value) {
            await apiJson(`/internships?q=${value}`).then((res) => {
                setInternships(res.data);
                setTotal(res?.data.length);
                setPostCount(res?.data.length);
                setValue("")
            }).catch((err) => {
                console.log(err);
            })
        }
        else {
            alert("Please Enter text to search");
        }
        setLoading(false);
    }

    useEffect(() => {
        loadInternship();
        setLoading(true);
    }, [])
    return (
        <>
            <MetaData title="Internships" />
            <Navbar />
            <PostInternship open={requestJob} handleClose={closeRequest} />
            <Container maxWidth="xl" sx={{ padding: '0', }}>
                <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Grid item lg={12} sx={{ display: { xs: 'none', lg: 'block' }, marginTop: '10px' }}>
                        <h1>Internship</h1>
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
                            <SearchIcon
                                fontSize='large'
                                onClick={handleSearch}
                                sx={{ color: '#42b6EE', cursor: 'pointer', marginTop: { lg: 'none', xs: '10px' }, }} />
                        </div>
                    </Grid>
                    <Grid item lg={12} sx={{ width: { xs: '100%' }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button variant='contained' onClick={openRequest}>Request Internhsip</Button>
                    </Grid>
                    <Grid item lg={10} xs={12} >
                        <Grid container spacing={2}>
                            {loading ? (
                                <Backdrop
                                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
                                    <CircularProgress color="inherit" />
                                </Backdrop>
                            ) :
                                ((postCount === 0) ?
                                    (<div className='Post_center'>
                                        <h1 className='main_heading'>No Result Found</h1>
                                    </div>) :
                                    (internships && internships.slice(pagination.start, pagination.end).map((intern, index) => (
                                        <Grid item lg={12} key={index}>
                                            <Box sx={{ borderRadius: '10px', padding: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                                                <div className={classes.software_title}>
                                                    <div>
                                                        <h3 className='mobileHeading'>{intern.companyName}</h3>
                                                        <Typography>{intern.jobRole}</Typography>
                                                        <Typography>{intern.city}</Typography>
                                                        <Typography>{intern.type}</Typography>
                                                    </div>
                                                    <img className={classes.software_image} src={intern.image} alt="student" />
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
                                                            {intern.description}
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
                                                                intern.requiredSkill && intern.requiredSkill.map((skills, i) => (
                                                                    <Chip label={skills} sx={{ marginRight: '10px', marginBottom: '5px' }} />))
                                                            }
                                                        </p>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </Box>
                                        </Grid>
                                    ))))
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
        </>
    )
}

export default StudentInternship;

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
    Select,
    InputLabel
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@material-ui/styles';
import MetaData from '../MetaData';
import "../CSS/Utils.css";
import { apiCAll, apiJson } from '../integration/apiCall';

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

    const [tittle, setTittle] = useState("")
    const [duration, setDuration] = useState("")
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("")

    const handleSubmit = (e) => {

        e.preventDefault();
        const jobRequest = { tittle, duration, location, description, type: "INTERNSHIP" };
        console.log(JSON.stringify(jobRequest))

        apiCAll('/api/user/internship/request', 'post', { jobRequest }).then(
            (response) => {
                if (response.data) {
                    setDuration("")
                    setLocation("")
                    setDescription("");
                    setTittle("")
                    props.handleClose()
                    alert("Your Requeest has Submited")
                }
            }
        ).catch(
            (e) => {
                console.log(e.response)
                alert(e.response.data)
            }
        )
    }

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
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={1}>
                            <Grid item lg={6} xs={12}>
                                <TextField id="title" fullWidth label="Job Title" placeholder='Full Stack' type='text' value={tittle} onChange={e => { setTittle(e.target.value) }} variant="outlined" required />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <TextField id="jobType" fullWidth label="Duration" value={duration} onChange={e => setDuration(e.target.value)} variant="outlined" required select>
                                    <MenuItem key="fulltime" value="Full Time">Full Time</MenuItem>
                                    <MenuItem key="parttime" value="Part Time">Part Time</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <TextField id="jobType" fullWidth label="Location" value={location} onChange={e => setLocation(e.target.value)} variant="outlined" required select>
                                    <MenuItem key="remote" value="Remote">Remote</MenuItem>
                                    <MenuItem key="onsite" value="Onsite">Onsite</MenuItem>
                                </TextField>
                            </Grid>


                            <Grid item lg={12} xs={12}>
                                <TextareaAutosize
                                    id="Experience"
                                    maxRows={5}
                                    required
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    style={{ width: '100%', padding: '10px' }}
                                    placeholder="Write Description with in 600 words"
                                />
                            </Grid>
                            <Grid item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'right' }}>
                                <Button variant="contained" type='submit'>Post</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Modal>
        </>
    )
}

/***
 * 
 * 


    

    

    return (
        <>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                sx={{ overflow: { xs: 'scroll' } }}
            >
                <Box sx={requestStyle}>
                    <Typography variant="h5" sx={{ textAlign: 'center', fontSize: '2rem', }}>
                        Request Job
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={1}>
                            <Grid item lg={6} xs={12}>
                                <TextField id="title" fullWidth label="Job Title" placeholder='Full Stack' type='text' value={tittle} onChange={e=>{setTittle(e.target.value)}} variant="outlined" required />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <TextField id="jobType" fullWidth label="Duration" value={duration} onChange={e=>setDuration(e.target.value)} variant="outlined" required select>
                                    <MenuItem key="fulltime" value="Full Time">Full Time</MenuItem>
                                    <MenuItem key="parttime" value="Part Time">Part Time</MenuItem>
                                </TextField>
                            </Grid>
                             <Grid item lg={6} xs={12}>
                                <TextField id="jobType" fullWidth label="Location" value={location} onChange={e=>setLocation(e.target.value)} variant="outlined" required select>
                                    <MenuItem key="remote" value="Remote">Remote</MenuItem>
                                    <MenuItem key="onsite" value="Onsite">Onsite</MenuItem>
                                </TextField>
                            </Grid>
                            
                           
                            <Grid item lg={12} xs={12}>
                                <TextareaAutosize
                                    id="Experience"
                                    maxRows={5}
                                    required
                                    value={description}  
                                    onChange={e=>setDescription(e.target.value)}
                                    style={{ width: '100%', padding: '10px' }}
                                    placeholder="Write Description with in 200 words"
                                />
                            </Grid>
                            <Grid item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'right' }}>
                                <Button variant="contained" type='submit'>Post</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Modal>
        </>
    )



 */




const StudentInternship = () => {
    const classes = useStyles();

    const [requestJob, setRequestJob] = useState(false);
    const openRequest = () => setRequestJob(true);
    const closeRequest = () => setRequestJob(false);

    const [search, setSearch] = useState(1);
    const [internshipRole, setInternshipRole] = useState('');
    const [internshipType, setInternshipType] = useState('');

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
    };

    const loadInternship = async (start = 0, end = showPerPage) => {
        await apiCAll(`/api/user/student/get`, 'post', { pagination: { starts: start, totalRows: end - start } }).then((res) => {
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
        setLoading(true);
        e?.preventDefault();

        switch (search) {
            case 1: {
                await apiCAll(`/api/user/student/searchBy/name`, 'post', { pagination: { starts: start, totalRows: end - start }, name: { query: value }, }).then((res) => {
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
                await apiCAll(`/api/user/student/searchBy/depart`, 'post', { pagination: { starts: start, totalRows: end - start }, depart: { query: value }, }).then((res) => {
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
                await apiCAll(`/api/user/student/searchBy/year`, 'post', { pagination: { starts: start, totalRows: end - start }, year: { query: value }, }).then((res) => {
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
                await apiCAll(`/api/user/student/searchBy/university`, 'post', { pagination: { starts: start, totalRows: end - start }, university: { query: value }, }).then((res) => {
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
                await apiCAll(`/api/user/student/searchBy/skill`, 'post', { pagination: { starts: start, totalRows: end - start }, skill: { query: value }, }).then((res) => {
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
                alert("Please select the category")
            }
        }


        // if (value) {
        //     await apiJson(`/internships?q=${value}`).then((res) => {
        //         setInternships(res.data);
        //         setTotal(res?.data.length);
        //         setPostCount(res?.data.length);
        //         setValue("")
        //     }).catch((err) => {
        //         console.log(err);
        //     })
        // }
        // else {
        //     alert("Please Enter text to search");
        // }
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
                            {
                                search == 2 ?
                                    (<Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Job Role</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={internshipRole}
                                                label="Job Role"
                                                onChange={handleInternshipRole}
                                                sx={{ marginRight: '10px', width: { lg: 500, xs: 250 } }}
                                            >
                                                <MenuItem value="fullStack">Full Stack Developer</MenuItem>
                                                <MenuItem value="frontend">Front End Developer</MenuItem>
                                                <MenuItem value="backend">Back End Developer</MenuItem>
                                                <MenuItem value="database">Database Engineer</MenuItem>
                                                <MenuItem value="softwareEngineer">Software Engineer</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>) :
                                    (search == 4 ?
                                        (<Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Job Type</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={internshipType}
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
                                    <MenuItem value={1}>Company Name</MenuItem>
                                    <MenuItem value={2}>Internship Role</MenuItem>
                                    <MenuItem value={3}>City</MenuItem>
                                    <MenuItem value={4}>Type</MenuItem>
                                    <MenuItem value={5}>Skills</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <SearchIcon
                            fontSize='large'
                            onClick={handleSearch}
                            sx={{ color: '#42b6EE', cursor: 'pointer', marginTop: { lg: 'none', xs: '10px' }, }} />
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
                                    (internships && internships.map((intern, index) => (
                                        <Grid item lg={12} key={index}>
                                            <Box sx={{ borderRadius: '10px', padding: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                                                <div className={classes.software_title}>
                                                    <div>
                                                        <h3 className='mobileHeading'>{intern.COMPANYNAME}</h3>
                                                        <Typography>{intern.TITTLE}</Typography>
                                                        <Typography>{intern.ADDRESS}</Typography>
                                                        <div>
                                                            <Typography sx={{ display: 'inline-block' }}>{intern.DURATION}</Typography>,&nbsp;
                                                            <Typography sx={{ display: 'inline-block' }}>{intern.LOCATION}</Typography>
                                                            <a style={{ display: 'block' }} href="https://www.google.com/" target={"_blank"}>Detail</a>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Typography sx={{ display: 'block', textAlign: 'right', color: '#d3d3d3' }}>{
                                                            intern.POSTDATE.split('T')[0]
                                                        }</Typography>
                                                        <img className={classes.software_image} src={intern.IMAGE} alt="student" />
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
                                                        <p>
                                                            {intern.DESCRIPTION}
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

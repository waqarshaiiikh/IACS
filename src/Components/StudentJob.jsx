import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from "axios";
import Pagination from '../Pages/Pagination';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Autocomplete,
    Button,
    Backdrop,
    Box,
    Chip,
    Container,
    Checkbox,
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
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@mui/icons-material/Search';
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

const PostJob = (props) => {
    const [tittle, setTittle]                    = useState("")
    const [duration,    setDuration     ]        = useState("")
    const [location,    setLocation     ]        = useState("")
    const [description, setDescription  ]        = useState("")
    

    const handleSubmit = (e) => {

        e.preventDefault();
        const jobRequest = { tittle, duration, location,   description ,  type : "JOB" };
        console.log(JSON.stringify(jobRequest))
       
        apiCAll('/api/user/job/request', 'post', { jobRequest }).then(
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

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const StudentJob = () => {
    const classes = useStyles();

    const [requestJob, setRequestJob] = useState(false);
    const openRequest = () => setRequestJob(true);
    const closeRequest = () => setRequestJob(false);

    const [jobs, setJobs] = useState();
    const [postCount, setPostCount] = useState(null);
    const [showPerPage] = useState(4);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({
        start: 0,
        end: showPerPage
    });
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState();

    const onPaginationChange = (start, end) => {
        setPagination({
            start: start,
            end: end
        })
    }

    const loadJobs = async () => {
        
        await apiJson(`/jobs`).then((res) => {
            setJobs(res.data);
            setTotal(res?.data.length);
        }).catch((err) => {
            console.log(err);
        })
        setLoading(false);
    }

    const handleSearch = async (e) => {
        setLoading(true);
        e?.preventDefault();
        if (value) {
            await apiJson(`/jobs?q=${value}`).then((res) => {
                setJobs(res.data);
                console.log(res?.data)
                setTotal(res?.data.length);
                setPostCount(res?.data.length);
                setValue("");
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
        loadJobs();
        setLoading(true);
    }, [])
    return (
        <>
            <MetaData title="Jobs" />
            <Navbar />
            <PostJob open={requestJob} handleClose={closeRequest} />
            <Container maxWidth="xl" sx={{ padding: '0' }}>
                <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Grid item lg={10} sx={{ display: { xs: 'none', lg: 'block' }, marginTop: '10px' }}>
                        <h1>Jobs</h1>
                    </Grid>
                    <Grid item lg={12} xs={12} sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, justifyContent: 'space-between', alignItems: 'center', marginTop: { lg: 'none', xs: "10px" } }}>
                        <div>
                            <TextField
                                id="search"
                                label="search"
                                variant="outlined"
                                size='medium'
                                value={value}
                                onChange={(e) => { setValue(e.target.value) }}
                                onKeyPress={(e) => { if (e.key === "Enter") { handleSearch() } }}
                                sx={{ marginRight: '10px', width: { lg: 500, xs: 250 } }} />
                            <SearchIcon
                                fontSize='large'
                                onClick={handleSearch}
                                sx={{ color: '#42b6EE', cursor: 'pointer', marginTop: { lg: 'none', xs: '10px' }, }} />
                        </div>
                    </Grid>
                    <Grid item lg={12} xs={12}>
                        <Button variant='contained' sx={{ marginTop: '10px' }} onClick={openRequest}>Request Job</Button>
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
                                    ) : ((postCount === 0) ?
                                        (
                                            <div className='Post_center'>
                                                <h1 className='main_heading'>No Result Found</h1>
                                            </div>
                                        ) :
                                        (jobs && jobs.slice(pagination.start, pagination.end).map((job, index) => (
                                            <Grid item lg={12} key={index}>
                                                <Box sx={{ borderRadius: '10px', padding: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                                                    <div className={classes.software_title}>
                                                        <div>
                                                            <h3 className='mobileHeading'>{job.companyName}</h3>
                                                            <Typography>{job.jobRole}</Typography>
                                                            <Typography>{job.city}</Typography>
                                                            <Typography>{job.type}</Typography>
                                                        </div>
                                                        <img className={classes.software_image} src={job.image} alt="student" />
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
                                                                {job.description}
                                                            </Typography>
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
                                                            <Typography>
                                                                {
                                                                    job.requiredSkill && job.requiredSkill.map((services, i) => (
                                                                        <Chip label={services} sx={{ marginRight: '10px', marginBottom: '5px' }} />))
                                                                }
                                                            </Typography>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </Box>
                                            </Grid>
                                        )))
                                    )
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

export default StudentJob 

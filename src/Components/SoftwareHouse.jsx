import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import Pagination from '../Pages/Pagination';
import {
    Container,
    Grid,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Chip,
    TextField,
    CircularProgress,
    Backdrop,
    Select,
    InputLabel,
    MenuItem,
    FormControl,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@mui/icons-material/Search';
import MetaData from '../MetaData';
import "../CSS/Utils.css"
import { apiCAll } from '../integration/apiCall';

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
    }
});


const SoftwareHouse = () => {
    
    const [softwareHouse, setSoftwareHouse] = useState(null);
    const classes = useStyles();
    const [search, setSearch] = useState();
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState("");
    const [postCount, setPostCount] = useState(null)
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
        });
        handleSearch(null, start, end).then(() => {
        });
    }

    const updateServices = async (expanded, index, softwareHouses) => {
        if (!softwareHouse[index]?.services && expanded) {
          await apiCAll(`/api/user/softwareHouse/service/get`, 'post', { industries :{ id : softwareHouses.ID } }).then((res) => {
            console.log(res.data)
            let st = softwareHouse;
            let skill_STD = st[index];
            skill_STD = { ...skill_STD, services: res?.data };
            st[index] = skill_STD;
            setSoftwareHouse([...st])
            console.log(st)
            // console.log(res?.data);
            // console.log(studentData)
            
          }).catch((err) => {
            console.log(err);
          })
    
        }
      }
    
    const loadPost = async (start = 0, end = showPerPage) => {
        await apiCAll(`/api/user/softwareHouse/get`, 'post', { pagination: { starts: start, totalRows: end - start } }).then((res) => {
            console.log(res?.data);
            setSoftwareHouse(res?.data.data);
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
            return await loadPost(start, end).then(() => {
                setLoading(false)
                return null;
            });
        }


        switch (search) {
            case 1: {
                await apiCAll(`/api/user/softwareHouse/searchBy/companyName`, 'post', { pagination: { starts: start, totalRows: end - start }, companyName: { query: value }, }).then((res) => {
                    console.log(res?.data);
                    setSoftwareHouse(res?.data.data);
                    // setStudents(res?.data);
                    setPostCount(res?.data.total);
                    setTotal(res?.data.total);
                }).catch((err) => {
                    console.log(err);
                })
                setLoading(false);

            } break;
            case 2: {
                await apiCAll(`/api/user/softwareHouse/searchBy/address`, 'post', { pagination: { starts: start, totalRows: end - start }, address: { query: value }, }).then((res) => {
                    console.log(res?.data);
                    setSoftwareHouse(res?.data.data);
                    // setStudents(res?.data);
                    setTotal(res?.data.total);
                    setPostCount(res?.data.total);
                }).catch((err) => {
                    console.log(err);
                })
                setLoading(false);

            } break;
            case 3: {
                await apiCAll(`/api/user/softwareHouse/searchBy/service`, 'post', { pagination: { starts: start, totalRows: end - start }, services: { query: value }, }).then((res) => {
                    console.log(res?.data);
                    setSoftwareHouse(res?.data.data);
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
        loadPost();
        setLoading(true);
    }, [])
    return (
        <>
            <Navbar />
            <Container maxWidth="xl" sx={{ padding: '0' }}>
                <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Grid item lg={12} sx={{ display: { xs: 'none', lg: 'block' }, marginTop: '10px' }}>
                        <h1>Companies</h1>
                    </Grid>
                    <Grid item lg={12}
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', lg: 'row' },
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: { lg: 'none', xs: "10px" }
                        }}>
                        <div>
                            <TextField
                                id="search"
                                label="Search"
                                variant="outlined"
                                size='medium'
                                value={value}
                                onChange={(e) => { setValue(e.target.value) }}
                                sx={{ marginRight: '10px', width: { lg: 500, xs: 250 } }}
                                onKeyPress={(e) => { if (e.key === "Enter") { handleSearch() } }} />

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
                                    <MenuItem value={2}>Address</MenuItem>
                                    <MenuItem value={3}>Services</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <SearchIcon
                            fontSize='large'
                            onClick={handleSearch}
                            sx={{
                                color: '#42b6EE',
                                cursor: 'pointer',
                                marginTop: { lg: 'none', xs: '10px' },
                            }} />
                    </Grid>
                    <Grid item lg={10} xs={12} >
                        <Grid container spacing={2}>
                            <MetaData title="Software Houses" />
                            {
                                loading ? (
                                    <Backdrop
                                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
                                        <CircularProgress color="inherit" />
                                    </Backdrop>
                                ) : ((postCount === 0) ?
                                    (<div className='Post_center'>
                                        <h1 className='main_heading'>No Result Found</h1>
                                    </div>) :
                                    (softwareHouse && softwareHouse.map((softwareHouses, index1) => (
                                        <Grid item lg={12} xs={12} key={index1}>
                                            <Box sx={{ borderRadius: '10px', padding: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                                                <div className={classes.software_title}>
                                                    <div>
                                                        <h3 className='mobileHeading'>{softwareHouses.NAME}</h3>
                                                        <Typography>{softwareHouses.ADDRESS}</Typography>
                                                    </div>
                                                    <img className={classes.software_image} src={softwareHouses.IMAGE} alt="software" />
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
                                                            {softwareHouses.ABOUT}
                                                        </Typography>
                                                    </AccordionDetails>
                                                </Accordion>
                                                <Accordion onChange={(e, expanded) => updateServices(expanded, index1, softwareHouses)}>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1a-content"
                                                        id="skills"
                                                    >
                                                        <Typography>Services</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Typography>
                                                            {
                                                                softwareHouse[index1]?.services && softwareHouse[index1].services.map((service, index) => (
                                                                    <Chip label={service.title} key={index} sx={{ marginRight: '10px', marginBottom: '5px' }} />))
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

export default SoftwareHouse


